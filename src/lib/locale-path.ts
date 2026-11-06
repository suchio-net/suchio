import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import routes from "./localized-route-table.json";
export const localizedRoutes: Record<string, Record<Locale, string>> = routes;
/** Resolve a public path or internal route key to its stable internal key. */
export function routeKey(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  for (const [key, paths] of Object.entries(localizedRoutes)) {
    if (key === path || Object.values(paths).includes(path)) return key;
  }
  const [first, ...rest] = path.split("/").filter(Boolean);
  return hasLocale(first) ? `/${rest.join("/")}` : path;
}
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized.match(/[?#].*$/)?.[0] ?? "";
  const key = routeKey(normalized);
  const translated = localizedRoutes[key]?.[locale];
  if (translated) return translated + suffix;
  const base = locale === defaultLocale ? key : key === "/" ? `/${locale}` : `/${locale}${key}`;
  return base + suffix;
}
export function alternatePath(pathname: string, locale: Locale): string {
  return localizePath(pathname, locale);
}
