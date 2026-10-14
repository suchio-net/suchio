/*
 * Screenshots pages for a visual check, after their reveals and illustrations have finished.
 *
 *   bun run capture [paths…] [--locales=de,en,fr] [--widths=390,1440] [--visuals] [--dev]
 *
 * Paths are unprefixed (`/`, `services/seo`) and are captured in every requested locale; the default
 * is the home page in German at phone and desktop width. `--visuals` also captures the offer
 * illustrations on each page side by side, one sheet per locale and width. Without `--dev` the script
 * serves the last build (`bun run build` first) on its own port and closes it afterwards; `--dev` uses
 * the running dev server on port 3000 instead. Files go to tmp/captures/, and each page reports
 * whether it grew wider than the screen.
 */
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import i18n from "../src/i18n/config.json" with { type: "json" };
import { launchChrome, pagePaths, playThrough, startPreview } from "./lib/browser.mjs";

const args = process.argv.slice(2);
const option = (name, fallback) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;
const paths = pagePaths(args);
const locales = option("locales", i18n.defaultLocale).split(",");
const widths = option("widths", "390,1440").split(",").map(Number);
const outDir = new URL("../tmp/captures/", import.meta.url);
const outFile = (name) => fileURLToPath(new URL(name, outDir));

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const server = args.includes("--dev") ? { origin: "http://127.0.0.1:3000", stop() {} } : await startPreview(4340);
const browser = await launchChrome();
try {
  for (const path of paths.length ? paths : ["/"])
    for (const locale of locales)
      for (const width of widths) {
        const localized = locale === i18n.defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;
        const name = `${locale}${path === "/" ? "-home" : path.replaceAll("/", "-")}-${width}`;
        const tab = await browser.newPage();
        await tab.setViewport({ width, height: 844, deviceScaleFactor: 2 });
        await tab.goto(server.origin + localized, { waitUntil: "networkidle0" });
        const { width: pageWidth, viewport } = await playThrough(tab);
        await tab.evaluate(() => scrollTo(0, 0));
        await tab.screenshot({ path: outFile(`${name}.png`), fullPage: true });
        const visuals = args.includes("--visuals") ? await tab.$$("[data-offer-visual]") : [];
        if (visuals.length) {
          const shots = await Promise.all(visuals.map((visual) => visual.screenshot()));
          const tiles = await Promise.all(shots.map((shot) => sharp(shot).resize({ width: 800 }).toBuffer()));
          const sizes = await Promise.all(tiles.map((tile) => sharp(tile).metadata()));
          const height = Math.max(...sizes.map((size) => size.height));
          await sharp({ create: { width: 820 * tiles.length, height, channels: 3, background: "#d4d4d4" } })
            .composite(tiles.map((input, index) => ({ input, left: index * 820, top: 0 })))
            .png()
            .toFile(outFile(`${name}-visuals.png`));
        }
        const overflow = pageWidth > viewport ? `, ${pageWidth - viewport}px wider than the screen` : "";
        console.log(`tmp/captures/${name}.png${visuals.length ? " (+ -visuals.png)" : ""}${overflow}`);
        await tab.close();
      }
} finally {
  await browser.close();
  await server.stop();
}
