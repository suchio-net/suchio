import localeConfig from "../../src/i18n/config.json" with { type: "json" };

import routes from "../../src/lib/localized-route-table.json" with { type: "json" };

const locales = Object.keys(localeConfig.locales);

export function affectedPaths(files) {
  if (!files.length) return null;
  const paths = new Set();
  for (const file of files) {
    // Only direct localized page edits have a known scope. Shared files require all pages.
    const match = /^src\/pages\/\[\.\.\.locale\]\/([a-z0-9/-]+)\.astro$/.exec(file);
    if (!match) return null;
    const route = match[1].replace(/(^|\/)index$/, "").replace(/\/$/, "");
    for (const locale of locales) {
      const prefix = locale === localeConfig.defaultLocale ? "" : `/${locale}`;
      paths.add(routes[`/${route}`]?.[locale] ?? (`${prefix}${route ? `/${route}` : ""}` || "/"));
    }
  }
  return [...paths].sort();
}

export function selectOverflowPaths(sitemap, requested, shard = "1/1") {
  const match = /^([1-9]\d*)\/([1-9]\d*)$/.exec(shard);
  if (!match || Number(match[1]) > Number(match[2])) throw new Error("Invalid overflow shard; use N/TOTAL.");
  const [, index, total] = match.map(Number);
  if (!sitemap.length) throw new Error("The overflow sitemap contains no pages.");
  // A removed, redirected or non-indexable route cannot safely narrow the existing sitemap checks.
  const paths = requested?.length && requested.every((path) => sitemap.includes(path)) ? requested : sitemap;
  const base = (path) => {
    for (const [key, translations] of Object.entries(routes))
      if (Object.values(translations).includes(path)) return key;
    const parts = path.split("/");
    if (locales.includes(parts[1])) parts.splice(1, 1);
    return parts.join("/") || "/";
  };
  // Keep translations together so each runner receives similar page templates and animation costs.
  return [...new Set(paths)]
    .sort((a, b) => base(a).localeCompare(base(b)) || a.localeCompare(b))
    .filter((_, position) => position % total === index - 1);
}
