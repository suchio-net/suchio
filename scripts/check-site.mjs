import { siteOrigin } from "../src/lib/site-config.ts";
import { defaultLocale, locales } from "../src/i18n/config.ts";
import { publicRoutes, legacyServiceRoutes } from "../src/lib/public-routes.ts";

export async function checkSite(origin = siteOrigin, transport = fetch) {
  const checks = [
    ...publicRoutes.map((route) => ({
      path: route.pathname,
      status: 200,
      locale: route.locale,
      canonical: route.pathname,
    })),
    ...locales.map((locale) => ({
      path: `${locale === defaultLocale ? "" : `/${locale}`}/__availability-missing-page`,
      status: 404,
      locale,
    })),
    ...legacyServiceRoutes.map((route) => ({ path: route.from, status: 308, destination: route.to })),
    { path: "/de/about", status: 307, destination: "/about" },
    { path: "/?check=locale", headers: { cookie: "suchio-locale=fr" }, status: 307, destination: "/fr?check=locale" },
    {
      path: "/",
      headers: { cookie: "suchio-locale=fr", "sec-fetch-site": "same-origin" },
      status: 200,
      locale: "de",
      canonical: "/",
    },
    {
      path: "/de/contact?draft=1",
      method: "HEAD",
      status: 307,
      destination: "/contact?draft=1",
      cookie: "suchio-locale=de",
    },
    { path: "/robots.txt", status: 200 },
    { path: "/sitemap.xml", status: 200 },
    { path: "/llms.txt", status: 200 },
    // A local preview may intentionally have no mail credentials. Its readiness contract still must work.
    { path: "/api/health", status: origin === siteOrigin ? 200 : [200, 503] },
    { path: "/entwurf/parkhotel", status: 200 },
    { path: "/entwurf/hw/v1", status: 200 },
    { path: "/entwurf/hw/v2", status: 200 },
    { path: "/entwurf/hw/v2/referenzen", status: 200 },
    { path: "/entwurf/parkhotel/index.html", status: 301, destination: "/entwurf/parkhotel" },
    {
      path: "/entwurf/handwerker-work/img/bad-led-480.webp",
      status: 301,
      destination: "/entwurf/hw/img/bad-led-480.webp",
    },
    { path: "/entwurf/hw/v1/img/bad-led-480.webp", status: 301, destination: "/entwurf/hw/img/bad-led-480.webp" },
    { path: "/entwurf/hw/img/bad-led-480.webp", status: 200 },
    ...(origin === siteOrigin
      ? [
          {
            path: "http://suchio.net/en/contact?check=canonical",
            status: 308,
            destination: `${siteOrigin}/en/contact?check=canonical`,
          },
          { path: "https://www.suchio.net/fr/about", status: 308, destination: `${siteOrigin}/fr/about` },
        ]
      : []),
  ];
  const failures = [];
  // Bound parallelism and check all routes even when an earlier check fails.
  for (let offset = 0; offset < checks.length; offset += 4) {
    await Promise.all(
      checks.slice(offset, offset + 4).map(async (check) => {
        try {
          const url = new URL(check.path, origin);
          const response = await transport(url, {
            method: check.method,
            headers: check.headers,
            redirect: "manual",
            signal: AbortSignal.timeout(10_000),
          });
          if (
            !(Array.isArray(check.status) ? check.status.includes(response.status) : response.status === check.status)
          )
            throw new Error(`expected ${check.status}, received ${response.status}`);
          if (check.destination) {
            const destination = response.headers.get("location");
            if (!destination || new URL(destination, url).href !== new URL(check.destination, origin).href)
              throw new Error("incorrect redirect destination");
            if (check.cookie && !response.headers.get("set-cookie")?.includes(check.cookie))
              throw new Error("missing locale preference cookie");
            await response.body?.cancel();
          } else if (check.path === "/api/health") {
            const { ok } = await response.json();
            if (ok !== (response.status === 200)) throw new Error("incorrect contact readiness response");
          } else {
            const body = await response.text();
            if (check.locale && (!body.includes(`lang="${check.locale}"`) || (body.match(/<h1\b/g) ?? []).length !== 1))
              throw new Error("missing localized page content");
            if (
              check.locale &&
              !/<link\b[^>]*rel="preload"[^>]*href="\/_astro\/dm-sans-latin-standard-normal\.[^"]+\.woff2"/.test(body)
            )
              throw new Error("missing DM Sans Latin preload");
            if (check.canonical) {
              const canonical = body.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
              if (!canonical || new URL(canonical).href !== new URL(check.canonical, siteOrigin).href)
                throw new Error("missing canonical URL");
              const image = body.match(/<meta\b[^>]*property="og:image"[^>]*content="([^"]+)"/)?.[1];
              if (!image) throw new Error("missing social image");
              const imageResponse = await transport(new URL(new URL(image).pathname, origin), {
                signal: AbortSignal.timeout(10_000),
              });
              if (imageResponse.status !== 200 || !imageResponse.headers.get("content-type")?.startsWith("image/png"))
                throw new Error("social image is unavailable");
              await imageResponse.body?.cancel();
            }
            if (check.path === "/robots.txt" && !body.includes(`Sitemap: ${siteOrigin}/sitemap.xml`))
              throw new Error("missing sitemap directive");
            if (check.path === "/sitemap.xml" && !body.includes(`<loc>${siteOrigin}/fr/contact</loc>`))
              throw new Error("missing localized sitemap entry");
            if (
              check.path === "/llms.txt" &&
              (!body.startsWith("# Suchio") || !body.includes(`${siteOrigin}/en/services/seo`))
            )
              throw new Error("missing machine-readable service information");
          }
          console.log(`${check.path}: OK`);
        } catch (error) {
          failures.push(`${check.path}: ${error instanceof Error ? error.message : "check failed"}`);
        }
      }),
    );
  }
  if (failures.length) throw new Error(failures.join("\n"));
}

if (import.meta.main) await checkSite(process.argv[2] ?? siteOrigin);
