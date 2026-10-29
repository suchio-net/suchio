import { expect, test } from "bun:test";
import { alternatePath, localizePath } from "../src/lib/locale-path";
import { publicRoutes, legacyServiceRoutes } from "../src/lib/public-routes";
import { GET as sitemap } from "../src/pages/sitemap.xml";

test("locale switching preserves page paths and gives German an unprefixed URL", () => {
  expect(localizePath("/", "de")).toBe("/");
  expect(localizePath("/", "en")).toBe("/en");
  expect(alternatePath("/fr/services/seo/", "de")).toBe("/services/seo");
  expect(alternatePath("/services/seo", "fr")).toBe("/fr/services/seo");
  expect(alternatePath("/en/contact?draft=1", "fr")).toBe("/fr/contact?draft=1");
  expect(new Set(publicRoutes.map(({ pathname }) => pathname)).size).toBe(publicRoutes.length);
});

test("legacy service slugs have a destination in each published locale", () => {
  expect(legacyServiceRoutes).toHaveLength(12);
  const paths = new Set(publicRoutes.map(({ pathname }) => pathname));
  for (const { from, to } of legacyServiceRoutes) {
    expect(from).not.toBe(to);
    expect(paths.has(to)).toBe(true);
  }
  expect(legacyServiceRoutes).toContainEqual({ from: "/fr/services/seo-ai-visibility", to: "/fr/services/seo" });
});

test("sitemap excludes legal pages and drafts and gives every URL reciprocal language alternates", async () => {
  const response = await sitemap({} as Parameters<typeof sitemap>[0]);
  const xml = await response.text();
  const entries = [...xml.matchAll(/<url>(.*?)<\/url>/g)].map(([, entry]) => entry);
  expect(entries).toHaveLength(33);
  expect(xml).not.toContain("/privacy");
  expect(xml).not.toContain("/entwurf/");
  expect(xml).not.toContain("/projekte/");
  expect(xml).not.toContain("/examples/hotels/flughotel-nordtor");
  for (const prefix of ["", "/en", "/fr"]) {
    expect(xml).toContain(`<loc>https://suchio.net${prefix}/examples</loc>`);
    expect(xml).toContain(`<loc>https://suchio.net${prefix}/examples/hotels</loc>`);
    expect(xml).toContain(`<loc>https://suchio.net${prefix}/references</loc>`);
    expect(xml).toContain(`<loc>https://suchio.net${prefix}/references/handwerker-work</loc>`);
  }
  for (const entry of entries) {
    for (const language of ["de", "en", "fr", "x-default"]) expect(entry).toContain(`hreflang="${language}"`);
    expect(entry).toContain("<loc>https://suchio.net/");
  }
});
