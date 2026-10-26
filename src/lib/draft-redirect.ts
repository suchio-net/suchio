// The Handwerker.work drafts moved from /entwurf/hw/ to /projekte/handwerker-work/ on 2026-10-17.
// In production the broad /entwurf/hw/* wildcard in public/_redirects won over the narrower asset
// wildcards listed before it, so old asset URLs ended on 404s; local wrangler matched in file order and
// did not show it. The Worker mapping does not depend on rule order: the most specific prefix comes first.
const project = "/projekte/handwerker-work";
const moves: [from: string, to: string][] = [
  ["/entwurf/hw/v1/img/", `${project}/img/`],
  ["/entwurf/hw/v1/badges/", `${project}/badges/`],
  ["/entwurf/hw/v1/fonts/", `${project}/website-a/fonts/`],
  ["/entwurf/hw/v2/fonts/", `${project}/website-b/fonts/`],
  ["/entwurf/hw/", `${project}/`],
];

/** A permanent redirect for a request below /entwurf/hw/ that no exact page redirect handled. */
export function draftRedirect(url: URL) {
  const move = moves.find(([from]) => url.pathname.startsWith(from));
  if (!move) return undefined;
  const location = move[1] + url.pathname.slice(move[0].length) + url.search;
  return new Response(null, { status: 308, headers: { location } });
}
