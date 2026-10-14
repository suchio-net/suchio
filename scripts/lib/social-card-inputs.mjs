/*
 * What the social cards in public/social are made from. scripts/social-cards.mjs records these inputs
 * in scripts/social-cards.json; `bun run check:preview` compares them with the current build, so a
 * changed headline or illustration fails until the cards are regenerated.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
export const recordFile = new URL("scripts/social-cards.json", root);

// The illustrations, wordmark and type drawn on the cards, and the generator that lays them out.
const sources = [
  "src/components/offer-animations",
  "src/assets/fonts/dm-sans-latin-standard-normal.woff2",
  "src/assets/fonts/dm-sans-latin-ext-standard-normal.woff2",
  "public/suchio-logo-light.svg",
  "scripts/social-cards.mjs",
];

async function files(path) {
  if (!(await stat(new URL(path, root))).isDirectory()) return [path];
  const entries = await readdir(new URL(`${path}/`, root));
  return (await Promise.all(entries.map((entry) => files(`${path}/${entry}`)))).flat();
}

export async function sourceHash() {
  const hash = createHash("sha256");
  for (const path of (await Promise.all(sources.map(files))).flat().sort()) {
    const bytes = await readFile(new URL(path, root));
    // Line endings depend on the checkout, not on what the card shows.
    hash
      .update(path)
      .update("\0")
      .update(path.endsWith(".woff2") ? bytes : bytes.toString().replaceAll("\r", ""));
  }
  return hash.digest("hex");
}

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** The text of a page's headline, as built HTML contains it. */
export function headlineText(html) {
  const inner = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
  return inner
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x?[\da-f]+|\w+);/gi, (match, name) =>
      name[0] === "#"
        ? String.fromCodePoint(Number.parseInt(name.slice(name[1] === "x" ? 2 : 1), name[1] === "x" ? 16 : 10))
        : (entities[name] ?? match),
    )
    .replace(/\s+/g, " ")
    .trim();
}

/** The headline of every page with a card, keyed by path. */
export async function pageHeadlines(origin, paths) {
  const entries = await Promise.all(
    paths.map(async (path) => [path, headlineText(await (await fetch(origin + path)).text())]),
  );
  return Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)));
}
