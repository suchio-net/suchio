import type { Locale } from "./config";
import de from "./de/examples";
import en from "./en/examples";
import fr from "./fr/examples";

type PageCopy = { title: string; description: string; h1: string; intro: string };
type Item = { title: string; copy: string };
export type ExamplesCopy = {
  overview: PageCopy & { cardTitle: string; cardText: string; cardLink: string };
  hotels: PageCopy & {
    concept: { label: string; title: string; text: string; link: string };
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
