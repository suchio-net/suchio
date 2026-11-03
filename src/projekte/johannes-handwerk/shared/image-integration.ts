import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import type { AstroIntegration } from "astro";
import { formats, imageNames, widths } from "./images";

const quality = { avif: 50, webp: 74, jpg: 78 } as const;

// Writes every placeholder photo in four widths as AVIF, WebP and JPEG. Only the originals
// are committed; outputs are cached under .astro/ by content hash, like the shared draft photos.
export function johannesImagesIntegration(): AstroIntegration {
  return {
    name: "suchio:johannes-images",
    hooks: {
      "astro:config:setup": async ({ config, logger, command }) => {
        // `astro check` and `astro sync` only generate types and do not need the image outputs.
        if (command === "sync") return;
        const destination = new URL("projekte/johannes-handwerk/img/", config.publicDir);
        await mkdir(destination, { recursive: true });
        for (let offset = 0; offset < imageNames.length; offset += 2) {
          await Promise.all(
            imageNames.slice(offset, offset + 2).map(async (name) => {
              const original = new URL(`src/projekte/johannes-handwerk/photos/${name}.jpg`, config.root);
              const bytes = await readFile(original);
              const key = createHash("sha256")
                .update(bytes)
                .update(JSON.stringify({ widths, quality, sharp: sharp.versions }))
                .digest("hex");
              const cache = new URL(`.astro/johannes-images/${key}/`, config.root);
              await mkdir(cache, { recursive: true });
              for (const width of widths) {
                for (const format of formats) {
                  const filename = `${name}-${width}.${format}`;
                  const cached = new URL(filename, cache);
                  try {
                    await copyFile(cached, new URL(filename, destination));
                  } catch (error) {
                    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
                    const pipeline = sharp(bytes)
                      .rotate()
                      .resize({ width, withoutEnlargement: true })
                      .sharpen({ sigma: 0.5 });
                    if (format === "jpg") pipeline.jpeg({ quality: quality.jpg, mozjpeg: true, progressive: true });
                    else pipeline.toFormat(format, { quality: quality[format], effort: format === "avif" ? 5 : 6 });
                    await pipeline.toFile(fileURLToPath(cached));
                    await copyFile(cached, new URL(filename, destination));
                  }
                }
              }
            }),
          );
        }
        logger.info(`Prepared responsive assets for ${imageNames.length} Johannes-Handwerk photos.`);
      },
    },
  };
}
