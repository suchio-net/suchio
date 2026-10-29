import type { Locale } from "./config";
import de from "./de/references";
import en from "./en/references";
import fr from "./fr/references";

type Item = { title: string; copy: string };
/** A measured value before and after the project; `label` names the measurement. */
type Result = { label: string; before: string; after: string };
type Link = { label: string; href: string; copy: string };
export type ReferencesCopy = {
  /** Short link text for the footer and the service pages. */
  link: string;
  handwerkerWork: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    /** Name of the client, used in breadcrumbs. */
    name: string;
    visit: string;
    resultsHeading: string;
    beforeLabel: string;
    results: Result[];
    resultsNote: string;
    startHeading: string;
    startText: string;
    start: string[];
    workHeading: string;
    work: Item[];
    pagesHeading: string;
    pages: Link[];
    cta: { heading: string; text: string; button: string };
  };
};

const references = { de, en, fr } satisfies Record<Locale, ReferencesCopy>;
export function getReferencesCopy(locale: Locale): ReferencesCopy {
  return references[locale];
}
