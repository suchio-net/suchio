import type { APIRoute } from "astro";
import { defaultLocale, locales } from "@/i18n/config";
import { localizePath } from "@/lib/locale-path";
import { indexableBasePaths } from "@/lib/public-routes";
import { absoluteUrl } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = () => {
  const urls = indexableBasePaths
    .flatMap((basePath) => {
      const alternates = [
        ...locales.map((locale) => [locale, absoluteUrl(localizePath(basePath, locale))] as const),
        ["x-default", absoluteUrl(localizePath(basePath, defaultLocale))] as const,
      ];
      return locales.map((locale) => ({ url: absoluteUrl(localizePath(basePath, locale)), alternates }));
    })
    .sort((left, right) => left.url.localeCompare(right.url))
    .map(({ url, alternates }) => {
      const links = alternates.map(
        ([language, href]) =>
          `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href)}"/>`,
      );
      return `  <url><loc>${escapeXml(url)}</loc>${links.join("")}</url>`;
    });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
