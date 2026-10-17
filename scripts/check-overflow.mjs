/*
 * Fails when an indexable page ends up wider than the screen on a phone or desktop once its reveals
 * and illustrations have played. An invisible wrapper left past the edge widens the page enough to
 * push the header controls off a phone screen, which no HTML check can see.
 *
 * Usage, after `bun run build`: bun run check:overflow [paths…]
 * Without paths it checks every page in the sitemap, which takes several minutes; paths such as
 * `/en` or `services/seo` check just those. Needs Chrome or Chromium; set CHROME_PATH if it is not in
 * a standard location.
 */
import { launchChrome, pagePaths, playThrough, sitemapPaths, startPreview } from "./lib/browser.mjs";

const widths = [390, 1280];
const server = await startPreview(4320);
const browser = await launchChrome();
const failures = [];
try {
  const requested = pagePaths(process.argv.slice(2));
  // One page at a time: parallel tabs compete for frames and stop animations at different points.
  const tab = await browser.newPage();
  for (const path of requested.length ? requested : await sitemapPaths(server.origin))
    for (const width of widths) {
      await tab.setViewport({ width, height: 844 });
      await tab.goto(server.origin + path, { waitUntil: "networkidle0" });
      const { width: pageWidth, viewport } = await playThrough(tab);
      const label = `${path} at ${width}px`;
      const headerProblems = await tab.evaluate(() => {
        const header = document.querySelector("header[data-navigation-enhanced]");
        if (!header) return [];
        const problems = [];
        const box = header.getBoundingClientRect();
        if (box.left < 0 || box.right > innerWidth) problems.push("header extends beyond the viewport");
        const nav = header.querySelector("nav");
        if (nav && getComputedStyle(nav).display !== "none") {
          for (const item of nav.querySelectorAll(":scope > a, :scope > [data-services] > button")) {
            for (const node of item.childNodes) {
              if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(node);
              if (range.getClientRects().length > 1) problems.push(`header label wraps: ${node.textContent.trim()}`);
            }
          }
        }
        return problems;
      });
      failures.push(...headerProblems.map((problem) => `${label}: ${problem}`));
      if (pageWidth > viewport) failures.push(`${label}: the page is ${pageWidth - viewport}px wider than the screen`);
      else console.log(`${label}: OK`);
    }
} finally {
  await browser.close();
  await server.stop();
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
