import type { NotFoundCopy } from "../not-found";

const notFound = {
  title: "Seite nicht gefunden.",
  copy: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
  back: "Zurück zur Startseite",
} satisfies NotFoundCopy;

export default notFound;
