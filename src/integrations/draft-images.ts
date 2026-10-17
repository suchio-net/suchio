import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import type { AstroIntegration } from "astro";
import manifest from "../projekte/handwerker-work/shared/images.json";

const balancedPhotos = new Set(["dusche-led", "bad-wc-fertig", "bad-led"]);
const heroPhotos = new Set(["bad-wanne-holz", "bad-eckwanne"]);

// Keep the approved sharpening, formats, widths and quality. The stock Astro image service
// would change this treatment. Only originals are committed; both drafts use these outputs.
export function draftImagesIntegration(): AstroIntegration {
  return {
    name: "suchio:draft-images",
    hooks: {
      "astro:config:setup": async ({ config, logger }) => {
        const destination = new URL("projekte/handwerker-work/img/", config.publicDir);
        await mkdir(destination, { recursive: true });
        const entries = Object.entries(manifest);
        // Bound native encoder concurrency to keep dev startup and CI memory predictable.
        for (let offset = 0; offset < entries.length; offset += 2) {
          await Promise.all(
            entries.slice(offset, offset + 2).map(async ([name, entry]) => {
              const original = new URL(`src/projekte/handwerker-work/photos/${entry.source}`, config.root);
              const bytes = await readFile(original);
              // These three photos received the approved white-balance treatment after
              // the original resize pass; the extra hero widths use a lighter encoding.
              let gains: number[] | undefined;
              if (balancedPhotos.has(name)) {
                const { channels } = await sharp(bytes).stats();
                const means = channels.slice(0, 3).map((channel) => channel.mean);
                const average = (means[0] + means[1] + means[2]) / 3;
                gains = means.map((mean) => 1 + 0.85 * (average / mean - 1));
              }
              const key = createHash("sha256")
                .update(bytes)
                .update(
                  JSON.stringify({
                    widths: entry.widths,
                    sharp: sharp.versions,
                    avif: 52,
                    webp: 74,
                    sigma: 0.5,
                    effort: 6,
                    colorGains: gains,
                    heroQuality: heroPhotos.has(name) ? { widths: [640, 1000], avif: 50, webp: 72 } : undefined,
                  }),
                )
                .digest("hex");
              const cache = new URL(`.astro/draft-images/${key}/`, config.root);
              await mkdir(cache, { recursive: true });
              for (const width of entry.widths) {
                for (const format of ["avif", "webp"] as const) {
                  const filename = `${name}-${width}.${format}`;
                  const cached = new URL(filename, cache);
                  try {
                    await copyFile(cached, new URL(filename, destination));
                  } catch (error) {
                    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
                    let pipeline = sharp(bytes).rotate().resize({ width, withoutEnlargement: true });
                    if (gains)
                      pipeline = pipeline
                        .recomb([
                          [gains[0], 0, 0],
                          [0, gains[1], 0],
                          [0, 0, gains[2]],
                        ])
                        .modulate({ saturation: 0.82, brightness: 1.03 });
                    const heroSize = heroPhotos.has(name) && (width === 640 || width === 1000);
                    await pipeline
                      .sharpen({ sigma: 0.5 })
                      .toFormat(format, {
                        quality: format === "avif" ? (heroSize ? 50 : 52) : heroSize ? 72 : 74,
                        effort: 6,
                      })
                      .toFile(fileURLToPath(cached));
                    await copyFile(cached, new URL(filename, destination));
                  }
                }
              }
            }),
          );
        }
        logger.info(`Prepared responsive assets for ${entries.length} shared draft photos.`);
      },
      "astro:build:done": async ({ dir }) => {
        // The adapter appends its page redirects to public/_redirects. Put static rules
        // ahead of asset wildcards so Cloudflare can take its faster static match path.
        const file = new URL("_redirects", dir);
        const lines = (await readFile(file, "utf8")).trim().split("\n");
        const comments = lines.filter((line) => line.startsWith("#"));
        const rules = lines.filter((line) => line.trim() && !line.startsWith("#"));
        const dynamic = (line: string) => /\*|:\w/.test(line.trim().split(/\s+/)[0]);
        await writeFile(
          file,
          [...comments, ...rules.filter((line) => !dynamic(line)), ...rules.filter(dynamic)].join("\n") + "\n",
        );
      },
    },
  };
}
