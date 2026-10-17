// Website A is a single-page draft for now. Keep old entry points on the new design.
export const base = "/projekte/handwerker-work/website-a";

export const sections = {
  leistungen: `${base}#leistungen`,
  gebaeudebetreuung: `${base}#gebaeudebetreuung`,
  referenzen: `${base}#referenzen`,
  kontakt: `${base}#kontakt`,
};

export const serviceHref = (slug) => `${base}#${slug}`;

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
  "/konzept": "/projekte/handwerker-work/website-b/konzept",
};

export const v1Destination = (suffix) => destinations[suffix] ?? base;

// Temporary redirects allow Website A subpages to return later without cached 301s.
export const redirects = Object.fromEntries(
  Object.entries(destinations).flatMap(([suffix, destination]) =>
    [suffix, `${suffix}.html`].map((path) => [`${base}${path}`, { status: 302, destination }]),
  ),
);

// Previously shared client links go straight to the current page or section.
const project = "/projekte/handwerker-work";
const legacyPages = {
  "/entwurf/hw": project,
  "/entwurf/hw/analyse": `${project}/analyse`,
  "/entwurf/hw/v1": base,
  "/entwurf/hw/v2": `${project}/website-b`,
  ...Object.fromEntries(
    Object.entries(destinations).map(([suffix, destination]) => [`/entwurf/hw/v1${suffix}`, destination]),
  ),
  ...Object.fromEntries(
    Object.keys(destinations).map((suffix) => [`/entwurf/hw/v2${suffix}`, `${project}/website-b${suffix}`]),
  ),
};

export const legacyRedirects = {
  ...Object.fromEntries(
    Object.entries(legacyPages).flatMap(([path, destination]) =>
      [path, `${path}.html`].map((source) => [source, { status: 308, destination }]),
    ),
  ),
  "/entwurf/hw/analyse.pdf": { status: 308, destination: `${project}/analyse.pdf` },
  "/entwurf/hw/v1/favicon.svg": { status: 308, destination: `${project}/favicon.svg` },
};
