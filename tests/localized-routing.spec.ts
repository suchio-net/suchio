import { expect, test } from "bun:test";
import { alternatePath, localizePath, localizedRoutes } from "../src/lib/locale-path";
import { publicRoutes, localizedRedirects, conceptRedirects, indexableBasePaths } from "../src/lib/public-routes";
import { subServiceRoutes, getSubServicePath } from "../src/lib/sub-service-routes";
import { getServicePath, serviceOrder } from "../src/lib/service-routes";
import { getServiceCatalog } from "../src/lib/service-catalog";
import { getSubServiceCopy } from "../src/i18n/sub-services";
import { pageMetadata } from "../src/lib/site";
import { draftRedirect } from "../src/lib/draft-redirect";
import { GET as sitemap } from "../src/pages/sitemap.xml";

test("the URL table has the required localized public paths", () => {
  const rows = [
    ["/", "/", "/en", "/fr"],
    ["/about", "/ueber-uns", "/en/about", "/fr/a-propos"],
    ["/contact", "/kontakt", "/en/contact", "/fr/contact"],
    ["/examples", "/beispiele", "/en/examples", "/fr/exemples"],
    ["/examples/hotels", "/beispiele/hotels", "/en/examples/hotels", "/fr/exemples/hotels"],
    ["/examples/trades", "/beispiele/handwerk", "/en/examples/trades", "/fr/exemples/artisans"],
    ["/references", "/referenzen", "/en/references", "/fr/references"],
    [
      "/references/handwerker-work",
      "/referenzen/handwerker-work",
      "/en/references/handwerker-work",
      "/fr/references/handwerker-work",
    ],
    ["/imprint", "/impressum", "/en/imprint", "/fr/mentions-legales"],
    ["/privacy", "/datenschutz", "/en/privacy", "/fr/confidentialite"],
    ["/services", "/leistungen", "/en/services", "/fr/services"],
    ["/services/websites", "/leistungen/websites", "/en/services/websites", "/fr/services/sites-web"],
    ["/services/apps", "/leistungen/apps", "/en/services/apps", "/fr/services/applications"],
    ["/services/seo", "/leistungen/seo", "/en/services/seo", "/fr/services/seo"],
    ["/services/ads", "/leistungen/werbekampagnen", "/en/services/ads", "/fr/services/publicite"],
    ["/services/automation", "/leistungen/automatisierung", "/en/services/automation", "/fr/services/automatisation"],
  ];
  for (const [key, de, en, fr] of rows) {
    expect([localizePath(key, "de"), localizePath(key, "en"), localizePath(key, "fr")]).toEqual([de, en, fr]);
  }
  expect(new Set(publicRoutes.map(({ pathname }) => pathname)).size).toBe(publicRoutes.length);
});

test("all routes switch languages reciprocally and preserve query strings and fragments", () => {
  for (const paths of Object.values(localizedRoutes))
    for (const source of Object.values(paths)) {
      for (const locale of ["de", "en", "fr"] as const) {
        expect(alternatePath(source + "/", locale)).toBe(paths[locale]);
        expect(alternatePath(source + "?service=apps#form", locale)).toBe(paths[locale] + "?service=apps#form");
      }
    }
  expect(localizePath("/audit/code", "fr")).toBe("/fr/audit/code");
});

test("old routes redirect directly to published URLs without chains", () => {
  const redirects = [...localizedRedirects, ...conceptRedirects];
  const sources = new Set(redirects.map(({ from }) => from));
  const published = new Set([...publicRoutes.map(({ pathname }) => pathname), ...conceptRedirects.map(({ to }) => to)]);
  for (const { from, to } of redirects) {
    expect(from).not.toBe(to);
    expect(sources.has(to)).toBe(false);
    expect(published.has(to)).toBe(true);
  }
  expect(redirects).toContainEqual({ from: "/contact", to: "/kontakt" });
  expect(redirects).toContainEqual({ from: "/services/websites-apps", to: "/leistungen/websites" });
  expect(draftRedirect(new URL("https://suchio.net/entwurf/parkhotel/?service=apps"))?.headers.get("location")).toBe(
    "/beispiele/hotels?service=apps",
  );
});

test("sub-services have localized paths, parent areas, copy, sitemap entries and reciprocal metadata", async () => {
  expect(subServiceRoutes).toHaveLength(22);
  expect(serviceOrder).toEqual(["websites-apps", "apps", "seo-ai-visibility", "paid-campaigns", "ai-automation"]);
  const xml = await (await sitemap({} as Parameters<typeof sitemap>[0])).text();
  expect([...xml.matchAll(/<url>/g)]).toHaveLength(indexableBasePaths.length * 3);
  for (const locale of ["de", "en", "fr"] as const) {
    expect(getServiceCatalog(locale)).toHaveLength(5);
    for (const route of subServiceRoutes) {
      const path = getSubServicePath(route.id, locale);
      expect(path).toBe(`${getServicePath(route.area, locale)}/${route.slugs[locale]}`);
      expect(getSubServiceCopy(locale, route.id).id).toBe(route.id);
      expect(xml).toContain(`<loc>https://suchio.net${path}</loc>`);
      const metadata = pageMetadata({ locale, pathname: path, description: "test" });
      for (const language of ["de", "en", "fr"] as const) {
        const href = `https://suchio.net${getSubServicePath(route.id, language)}`;
        expect(metadata.alternates.languages[language]).toBe(href);
        expect(xml).toContain(`hreflang="${language}" href="${href}"`);
      }
    }
  }
  for (const path of ["/projekte/", "/audit/", "/entwurf/", "/beispiele/handwerk/wendmark-sanierung"])
    expect(xml).not.toContain(path);
});
