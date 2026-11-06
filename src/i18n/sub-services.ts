import type { Locale } from "./config";
import type { ServiceId } from "./services";
import type { SubServiceId } from "@/lib/sub-service-routes";
import de from "./de/sub-services";
import en from "./en/sub-services";
import fr from "./fr/sub-services";
export type SubServiceCopy = {
  id: SubServiceId;
  name: string;
  /** One sentence for lists on the area page. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  deliverables: { heading: string; items: readonly string[] };
  costs: { heading: string; text: string; factors: readonly string[] };
  /** Measured facts from the reference project. Omit when none apply. */
  proof?: { heading: string; text: string; link: string };
  faqs: readonly { id: string; question: string; answer: string }[];
  related: readonly { to: SubServiceId | ServiceId; text: string }[];
};
const copy = { de, en, fr };
export function getSubServiceCopy(locale: Locale, id: SubServiceId): SubServiceCopy {
  return copy[locale][id];
}
