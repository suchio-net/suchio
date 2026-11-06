import { readFile } from "node:fs/promises";
import { sitemapPaths } from "./lib/browser.mjs";
import routes from "../src/lib/localized-route-table.json" with { type: "json" };
const alternatePath = (path, locale) => {
  const key = path.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  return routes[key]?.[locale] ?? path;
};
import { pageHeadlines, recordFile, sourceHash } from "./lib/social-card-inputs.mjs";

/** Fails when the built pages or illustration sources no longer match what the social cards show. */
export async function checkSocialCards(origin) {
  const record = JSON.parse(await readFile(recordFile, "utf8"));
  const current = new Set(await sitemapPaths(origin));
  const paths = Object.keys(record.headlines).map((path) =>
    alternatePath(path, path.split("/")[1] === "en" ? "en" : path.split("/")[1] === "fr" ? "fr" : "de"),
  );
  const headlines = await pageHeadlines(
    origin,
    paths.filter((path) => current.has(path)),
  );
  const localizedHeadlines = Object.fromEntries(
    Object.entries(record.headlines).map(([path, headline]) => [
      alternatePath(path, path.split("/")[1] === "en" ? "en" : path.split("/")[1] === "fr" ? "fr" : "de"),
      headline,
    ]),
  );
  const stale = Object.entries(headlines)
    .filter(([path, headline]) => localizedHeadlines[path] !== headline)
    .map(
      ([path, headline]) => `${path}: card shows "${localizedHeadlines[path] ?? "no card"}", page says "${headline}"`,
    );
  if ((await sourceHash()) !== record.sources) stale.push("illustration, font, logo or generator sources changed");
  if (stale.length)
    throw new Error(
      `Social cards are out of date; run \`bun run build\`, then \`bun run social-cards\`, and commit the result.\n${stale.join("\n")}`,
    );
  console.log("social cards: OK");
}
