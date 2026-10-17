import { siteOrigin } from "../src/lib/site-config.ts";
import { defaultLocale, locales } from "../src/i18n/config.ts";
import { indexableBasePaths, publicRoutes, legacyServiceRoutes } from "../src/lib/public-routes.ts";
import { alternatePath } from "../src/lib/locale-path.ts";

const project = "/projekte/handwerker-work";
const serviceSlugs = ["badsanierung", "sanitaer-heizung", "elektro", "fliesen", "renovierung"];
const draftSuffixes = [
  "leistungen",
  ...serviceSlugs.map((slug) => `leistungen/${slug}`),
  "gebaeudebetreuung",
  "referenzen",
  "kontakt",
  "konzept",
];
const websiteATarget = (suffix) =>
  suffix === "konzept" ? `${project}/website-b/konzept` : `${project}/website-a#${suffix.replace("leistungen/", "")}`;
const movedPages = [
  ["/entwurf/hw", project],
  ["/entwurf/hw/analyse", `${project}/analyse`],
  ["/entwurf/hw/v1", `${project}/website-a`],
  ["/entwurf/hw/v2", `${project}/website-b`],
  ...draftSuffixes.map((suffix) => [`/entwurf/hw/v1/${suffix}`, websiteATarget(suffix)]),
  ...draftSuffixes.map((suffix) => [`/entwurf/hw/v2/${suffix}`, `${project}/website-b/${suffix}`]),
];
const movedAssets = [
  ["analyse.pdf", "analyse.pdf"],
  ["favicon.svg", "favicon.svg"],
  ["img/og-handwerker-work.jpg", "img/og-handwerker-work.jpg"],
  ["img/bad-led-480.webp", "img/bad-led-480.webp"],
  ["img/bad-led-480.avif", "img/bad-led-480.avif"],
  ["badges/check24-2019.svg", "badges/check24-2019.svg"],
  ["v1/img/bad-led-480.webp", "img/bad-led-480.webp"],
  ["v1/badges/myhammer.webp", "badges/myhammer.webp"],
  ["v1/favicon.svg", "favicon.svg"],
  ["v1/fonts/dm-sans-latin-opsz-normal.woff2", "website-a/fonts/dm-sans-latin-opsz-normal.woff2"],
  ["v2/fonts/d-din.woff2", "website-b/fonts/d-din.woff2"],
];

export async function checkSite(origin = siteOrigin, transport = fetch) {
  const checks = [
    ...publicRoutes.map((route) => ({
      path: route.pathname,
      status: 200,
      locale: route.locale,
      canonical: route.pathname,
      indexable: indexableBasePaths.includes(route.basePath),
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
    { path: "/favicon.ico", status: 200 },
    { path: "/site.webmanifest", status: 200 },
    // A local preview may intentionally have no mail credentials. Its readiness contract still must work.
    { path: "/api/health", status: origin === siteOrigin ? 200 : [200, 503] },
    ...["/entwurf/parkhotel", "/entwurf/parkhotel/", "/entwurf/parkhotel/index.html"].map((path) => ({
      path,
      status: 308,
      destination: "/examples/hotels",
    })),
    { path: "/examples/hotels/flughotel-nordtor", status: 200, draft: true },
    ...[
      project,
      `${project}/analyse`,
      `${project}/website-a`,
      `${project}/website-b`,
      ...draftSuffixes.map((suffix) => `${project}/website-b/${suffix}`),
    ].map((path) => ({ path, status: 200, draft: true })),
    ...movedPages.flatMap(([from, destination]) =>
      [from, `${from}.html`].map((path) => ({ path, status: 308, destination })),
    ),
    ...draftSuffixes.flatMap((suffix) =>
      [suffix, `${suffix}.html`].map((path) => ({
        path: `${project}/website-a/${path}`,
        status: 302,
        destination: websiteATarget(suffix),
      })),
    ),
    ...movedAssets.flatMap(([from, to]) => [
      { path: `/entwurf/hw/${from}`, status: 308, destination: `${project}/${to}` },
      { path: `${project}/${to}`, status: 200, ...(to === "analyse.pdf" ? { contentType: "application/pdf" } : {}) },
    ]),
    {
      path: "/entwurf/hw/v2/kontakt?hinweise",
      status: 308,
      destination: `${project}/website-b/kontakt?hinweise`,
    },
    {
      path: "/entwurf/hw/v1/leistungen/badsanierung.html?hinweise",
      status: 308,
      destination: `${project}/website-a?hinweise#badsanierung`,
    },
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
          if (check.contentType && !response.headers.get("content-type")?.startsWith(check.contentType))
            throw new Error(`expected content type ${check.contentType}`);
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
            if (check.draft) {
              if (!/<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow(?:, noarchive)?"/.test(body))
                throw new Error("missing draft robots meta");
              if (response.headers.get("x-robots-tag") !== "noindex, nofollow, noarchive")
                throw new Error("missing draft robots header");
              if (
                response.headers.has("content-security-policy") ||
                response.headers.has("content-security-policy-report-only") ||
                /<meta\b[^>]*http-equiv="Content-Security-Policy"/.test(body)
              )
                throw new Error("draft unexpectedly received the public site CSP");
              if (body.includes("/entwurf/hw")) throw new Error("draft still links to its old location");
              if (body.includes('type="application/ld+json"')) {
                const canonical = body.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
                const ogUrl = body.match(/<meta\b[^>]*property="og:url"[^>]*content="([^"]+)"/)?.[1];
                if (canonical !== new URL(check.path, siteOrigin).href || ogUrl !== canonical)
                  throw new Error("draft canonical or Open Graph URL uses the wrong location");
                const graph = body.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1];
                if (!graph?.includes(`${siteOrigin}${project}/website-`) || graph.includes('"https://handwerker.work/'))
                  throw new Error("draft schema URLs use the wrong location");
              }
            }
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
              for (const language of [...locales, "x-default"]) {
                const href = new URL(
                  alternatePath(check.canonical, language === "x-default" ? defaultLocale : language),
                  siteOrigin,
                ).href;
                if (!body.includes(`hreflang="${language}" href="${href}"`))
                  throw new Error(`missing ${language} language alternate`);
              }
              if (check.indexable && /\bname="robots"[^>]*content="noindex/.test(body))
                throw new Error("public page unexpectedly marked noindex");
              if (/\/examples\/hotels$/.test(check.canonical)) {
                const graph =
                  JSON.parse(
                    body.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1] ?? "{}",
                  )["@graph"] ?? [];
                for (const type of ["WebPage", "FAQPage", "BreadcrumbList"])
                  if (!graph.some((node) => node["@type"] === type)) throw new Error(`missing ${type} schema`);
                const faq = graph.find((node) => node["@type"] === "FAQPage");
                if (faq.mainEntity?.length !== 6) throw new Error("incorrect hotel FAQ schema");
                const prefix = check.locale === defaultLocale ? "" : `/${check.locale}`;
                if (!body.includes(`href="${prefix}/contact?service=websites-apps"`))
                  throw new Error("missing hotel contact service preselection");
                if (!body.includes(`href="${prefix}/services/seo"`)) throw new Error("missing hotel SEO link");
              }
            }
            if (check.path === "/robots.txt" && !body.includes(`Sitemap: ${siteOrigin}/sitemap.xml`))
              throw new Error("missing sitemap directive");
            if (check.path === "/sitemap.xml" && !body.includes(`<loc>${siteOrigin}/fr/contact</loc>`))
              throw new Error("missing localized sitemap entry");
            if (check.path === "/sitemap.xml") {
              if (["/projekte/", "/entwurf/", "/examples/hotels/flughotel-nordtor"].some((path) => body.includes(path)))
                throw new Error("concept leaked into sitemap");
              for (const prefix of ["", "/en", "/fr"])
                for (const path of ["/examples", "/examples/hotels"])
                  if (!body.includes(`<loc>${siteOrigin}${prefix}${path}</loc>`))
                    throw new Error("missing examples sitemap entry");
            }
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
