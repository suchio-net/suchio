// V1 is a single page; navigation jumps to its sections.
import { navItems, tfm as tfmContent } from "../shared/content";
import { sections } from "./routes.mjs";
export * from "../shared/content";
export { base, sections, serviceHref } from "./routes.mjs";

export const tfm = { ...tfmContent, href: sections.gebaeudebetreuung };

export const nav = navItems.map((item) => ({ ...item, href: sections[item.key] }));
