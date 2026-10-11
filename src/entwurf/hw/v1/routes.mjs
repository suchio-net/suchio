// V1 is a single-page draft for now. Keep old entry points on the new design.
export const base = "/entwurf/hw/v1";

export const sections = {
  leistungen: `${base}#leistungen`,
  gebaeudebetreuung: `${base}#gebaeudebetreuung`,
  referenzen: `${base}#referenzen`,
  kontakt: `${base}#kontakt`,
};

export const serviceHref = slug => `${base}#${slug}`;

const destinations = {
  "/leistungen": sections.leistungen,
  "/leistungen/badsanierung": serviceHref("badsanierung"),
  "/leistungen/sanitaer-heizung": serviceHref("sanitaer-heizung"),
  "/leistungen/elektro": serviceHref("elektro"),
  "/leistungen/fliesen": serviceHref("fliesen"),
  "/leistungen/renovierung": serviceHref("renovierung"),
  "/gebaeudebetreuung": sections.gebaeudebetreuung,
  "/referenzen": sections.referenzen,
  "/kontakt": sections.kontakt,
  "/konzept": "/entwurf/hw/v2/konzept",
};

export const v1Destination = suffix => destinations[suffix] ?? base;

// Temporary redirects allow V1 subpages to return later without cached 301s.
export const redirects = Object.fromEntries(Object.entries(destinations).flatMap(([suffix, destination]) =>
  [suffix, `${suffix}.html`].map(path => [`${base}${path}`, { status: 302, destination }]),
));
