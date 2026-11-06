import { locales } from "../i18n/config";
import { localizePath, localizedRoutes } from "./locale-path";
import { serviceOrder, serviceRouteSlugs } from "./service-routes";
export const legalBasePaths = ["/imprint", "/privacy"] as const;
export const indexableBasePaths = Object.keys(localizedRoutes).filter(
  (path) => !legalBasePaths.some((legal) => legal === path),
);
export const publicRoutes = locales.flatMap((locale) =>
  [...indexableBasePaths, ...legalBasePaths].map((basePath) => ({
    locale,
    basePath,
    pathname: localizePath(basePath, locale),
  })),
);
const oldPath = (path: string, locale: string) => (locale === "de" ? path : `/${locale}${path}`);
export const legacyServiceRoutes = locales.flatMap((locale) =>
  serviceOrder
    .filter((id) => id !== "apps")
    .map((id) => ({
      from: oldPath(`/services/${id}`, locale),
      to: localizePath(`/services/${serviceRouteSlugs[id]}`, locale),
    })),
);
export const localizedRedirects = [
  ...publicRoutes
    .filter(({ basePath }) => basePath !== "/" && basePath !== "/services" && basePath.split("/").length <= 3)
    .map(({ basePath, locale, pathname }) => ({ from: oldPath(basePath, locale), to: pathname }))
    .filter(({ from, to }) => from !== to),
  ...legacyServiceRoutes,
  ...(["en", "fr"] as const).map((locale) => ({
    from: `/${locale}/datenschutz`,
    to: localizePath("/privacy", locale),
  })),
];

export const conceptRedirects = [
  { from: "/examples/trades/brenneck-bad", to: "/beispiele/handwerk/brenneck-bad" },
  { from: "/examples/hotels/flughotel-nordtor", to: "/beispiele/hotels/flughotel-nordtor" },
  {
    from: "/examples/trades/wendmark-sanierung/gebaeudebetreuung",
    to: "/beispiele/handwerk/wendmark-sanierung/gebaeudebetreuung",
  },
  { from: "/examples/trades/wendmark-sanierung", to: "/beispiele/handwerk/wendmark-sanierung" },
  { from: "/examples/trades/wendmark-sanierung/kontakt", to: "/beispiele/handwerk/wendmark-sanierung/kontakt" },
  { from: "/examples/trades/wendmark-sanierung/referenzen", to: "/beispiele/handwerk/wendmark-sanierung/referenzen" },
  { from: "/examples/trades/wendmark-sanierung/leistungen", to: "/beispiele/handwerk/wendmark-sanierung/leistungen" },
  {
    from: "/examples/trades/wendmark-sanierung/leistungen/badsanierung",
    to: "/beispiele/handwerk/wendmark-sanierung/leistungen/badsanierung",
  },
  {
    from: "/examples/trades/wendmark-sanierung/leistungen/sanitaer-heizung",
    to: "/beispiele/handwerk/wendmark-sanierung/leistungen/sanitaer-heizung",
  },
  {
    from: "/examples/trades/wendmark-sanierung/leistungen/elektro",
    to: "/beispiele/handwerk/wendmark-sanierung/leistungen/elektro",
  },
  {
    from: "/examples/trades/wendmark-sanierung/leistungen/fliesen",
    to: "/beispiele/handwerk/wendmark-sanierung/leistungen/fliesen",
  },
  {
    from: "/examples/trades/wendmark-sanierung/leistungen/renovierung",
    to: "/beispiele/handwerk/wendmark-sanierung/leistungen/renovierung",
  },
];
