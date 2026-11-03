import type { Locale } from "./config";
import type { ServiceId } from "./services";
import de from "./de/about";
import en from "./en/about";
import fr from "./fr/about";

/** A link inside a paragraph points at a service page, the Handwerker.work reference or the contact page. */
export type AboutLinkTarget = ServiceId | "reference" | "contact";
export type AboutSpan = string | { text: string; to: AboutLinkTarget };

export type AboutCopy = {
  sections: {
    heading: string;
    paragraphs: AboutSpan[][];
  }[];
};

const about = { de, en, fr } satisfies Record<Locale, AboutCopy>;
export function getAboutCopy(locale: Locale): AboutCopy {
  return about[locale];
}
