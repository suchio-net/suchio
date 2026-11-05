// Renders the fallback images for the home hero light from the running dev server into public/hero.
// Run this after a change to src/components/hero-aura/hero-aura.ts: node scripts/hero-aura-still.mjs
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/browser.mjs";

const stills = [
  { file: "aura-wide.webp", viewport: { width: 1440, height: 860 } },
  { file: "aura-narrow.webp", viewport: { width: 390, height: 844, isMobile: true, hasTouch: true } },
];
// Grain comes from CSS on top of the image, so the image itself stays clean and small.
const onlyTheLight = `
  header, astro-dev-toolbar, [data-hero-text] { visibility: hidden !important; }
  .hero-aura::after { display: none; }
  .hero-aura canvas { transition: none; }
`;

await mkdir("public/hero", { recursive: true });
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
for (const { file, viewport } of stills) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "load", timeout: 120000 });
  await page.waitForSelector(".hero-aura[data-ready]", { timeout: 60000 });
  await page.addStyleTag({ content: onlyTheLight });
  const hero = await page.$(".hero-aura");
  await hero.screenshot({ path: `public/hero/${file}`, type: "webp", quality: 82 });
  await page.close();
}
await browser.close();
