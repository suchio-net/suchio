// V2 has a page per navigation item.
import { navItems, tfm as tfmContent } from "../content";
export * from "../content";

export const base = "/entwurf/hw/v2";

export const tfm = { ...tfmContent, href: `${base}/gebaeudebetreuung` };

export const nav = navItems.map((item) => ({ ...item, href: `${base}/${item.key}` }));
