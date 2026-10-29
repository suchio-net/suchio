import { locales } from "../i18n/config";
import { localizePath } from "./locale-path";
import { serviceOrder, serviceRouteSlugs } from "./service-routes";

// Shared by the sitemap, the Astro redirects and the production availability check.
export const indexableBasePaths = [
  "/",
  "/about",
  "/contact",
  "/examples",
  "/examples/hotels",
  "/references/handwerker-work",
  ...serviceOrder.map((id) => `/services/${serviceRouteSlugs[id]}`),
] as const;
export const legalBasePaths = ["/imprint", "/privacy"] as const;
export const publicRoutes = locales.flatMap((locale) =>
  [...indexableBasePaths, ...legalBasePaths].map((basePath) => ({
    locale,
    basePath,
    pathname: localizePath(basePath, locale),
  })),
);
export const legacyServiceRoutes = locales.flatMap((locale) =>
  serviceOrder.map((id) => ({
    from: localizePath(`/services/${id}`, locale),
    to: localizePath(`/services/${serviceRouteSlugs[id]}`, locale),
  })),
);
