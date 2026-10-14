/*
 * Shared helpers for scripts that look at the built site in Chrome: they start their own preview of
 * `dist` on a port of their choosing and close it again, so they never touch a running dev server.
 */
import { existsSync } from "node:fs";
import { preview } from "astro";
import puppeteer from "puppeteer-core";

const root = new URL("../../", import.meta.url);

export function findChrome() {
  const chrome = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((path) => path && existsSync(path));
  if (!chrome) throw new Error("Chrome was not found; set CHROME_PATH.");
  return chrome;
}

/** Serves the built site; run `bun run build` first. */
export async function startPreview(port) {
  if (!existsSync(new URL("dist/server/wrangler.json", root))) throw new Error("No build found; run `bun run build`.");
  const server = await preview({
    root: root.pathname.replace(/^\/([A-Za-z]:)/, "$1"),
    logLevel: "error",
    server: { host: "127.0.0.1", port },
  });
  return { origin: `http://127.0.0.1:${server.port}`, stop: () => server.stop() };
}

export function launchChrome() {
  return puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--font-render-hinting=none"] });
}

/**
 * Page paths from command-line arguments. Git Bash turns `/services/seo` into
 * `C:/Program Files/Git/services/seo`, so that prefix is removed and `services/seo` works as well.
 */
export function pagePaths(args) {
  return args
    .filter((arg) => !arg.startsWith("--"))
    .map((arg) => `/${arg.replace(/^[A-Za-z]:[\\/].*?[\\/]Git[\\/]/i, "").replace(/^\/+|\/+$/g, "")}`);
}

/** Paths listed in the built sitemap: every indexable page in every language. */
export async function sitemapPaths(origin) {
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  return [...sitemap.matchAll(/<loc>https:\/\/suchio\.net([^<]*)<\/loc>/g)].map(([, path]) => path || "/");
}

/**
 * Scrolls through the page so every reveal starts, then holds each offer illustration in view until
 * its animation (about 3–4 s) has finished. Returns the document width once everything has settled:
 * an element left past the edge widens the page even when nothing visible sticks out. Mid-animation
 * widths are not reported; they depend on how many frames the machine manages.
 */
export async function playThrough(page, { settle = 4500 } = {}) {
  return page.evaluate(async (settle) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.6) {
      scrollTo(0, y);
      await sleep(300);
    }
    for (const visual of document.querySelectorAll("[data-offer-visual]")) {
      visual.scrollIntoView({ block: "center" });
      await sleep(settle);
    }
    await sleep(500);
    return { width: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth };
  }, settle);
}
