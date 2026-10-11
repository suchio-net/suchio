import { alternatePath } from "./locale-path";
import { indexableBasePaths } from "./public-routes";
import type { Locale } from "../i18n/config";

export function socialImagePath(pathname: string, locale: Locale) {
  const base = alternatePath(pathname, "de");
  if (base === "/" || !indexableBasePaths.some((path) => path === base)) return undefined;
  return `/social/${locale}-${base.slice(1).replaceAll("/", "-")}.png`;
}
