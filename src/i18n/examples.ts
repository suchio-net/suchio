import type { Locale } from "./config";
import de from "./de/examples";
import en from "./en/examples";
import fr from "./fr/examples";

type PageCopy = { title: string; description: string; h1: string; intro: string };
type Item = { title: string; copy: string };
/** One concept of an industry, shown as a tile on the industry page that opens the concept. */
export type ConceptCopy = { slug: string; name: string; kind: string; summary: string; link: string };
export type ExamplesCopy = {
  /** `label` is the short name breadcrumbs use. */
  overview: PageCopy & { label: string; cardTitle: string; cardText: string; cardLink: string };
  hotels: PageCopy & {
    conceptsHeading: string;
    conceptsText: string;
    conceptLabel: string;
    concepts: ConceptCopy[];
    requirementsHeading: string;
    requirements: Item[];
    costsHeading: string;
    costs: string[];
    costsAfter: string;
    processHeading: string;
    process: Item[];
    faqHeading: string;
    faqs: { question: string; answer: string; linkText?: string }[];
    cta: { heading: string; text: string; button: string };
  };
  websitesLink: string;
};

const examples = { de, en, fr } satisfies Record<Locale, ExamplesCopy>;
export function getExamplesCopy(locale: Locale): ExamplesCopy {
  return examples[locale];
}
