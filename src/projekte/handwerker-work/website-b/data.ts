// V2 has a page per navigation item.
import { navItems, tfm as tfmContent } from "../shared/content";
export * from "../shared/content";

export const base = "/projekte/handwerker-work/website-b";

export const tfm = { ...tfmContent, href: `${base}/gebaeudebetreuung` };

export const nav = navItems.map((item) => ({ ...item, href: `${base}/${item.key}` }));
