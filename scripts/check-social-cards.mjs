import { readFile } from "node:fs/promises";
import { sitemapPaths } from "./lib/browser.mjs";
import { pageHeadlines, recordFile, sourceHash } from "./lib/social-card-inputs.mjs";

/** Fails when the built pages or illustration sources no longer match what the social cards show. */
export async function checkSocialCards(origin) {
  const record = JSON.parse(await readFile(recordFile, "utf8"));
  const headlines = await pageHeadlines(origin, await sitemapPaths(origin));
  const stale = Object.entries(headlines)
    .filter(([path, headline]) => record.headlines[path] !== headline)
    .map(([path, headline]) => `${path}: card shows "${record.headlines[path] ?? "no card"}", page says "${headline}"`);
  if ((await sourceHash()) !== record.sources) stale.push("illustration, font, logo or generator sources changed");
  if (stale.length)
    throw new Error(
      `Social cards are out of date; run \`bun run build\`, then \`bun run social-cards\`, and commit the result.\n${stale.join("\n")}`,
    );
  console.log("social cards: OK");
}
