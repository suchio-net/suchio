import type { Locale } from "./config";
import de from "./de/services";
import en from "./en/services";
import fr from "./fr/services";

export type ServiceId = "websites-apps" | "apps" | "seo-ai-visibility" | "paid-campaigns" | "ai-automation";

export type WebExperienceAnimationCopy = {
  nav: readonly [string, string, string];
  kicker: string;
  headline: string;
  intro: string;
  cta: string;
  cards: readonly [string, string, string];
};

export type OptimizationAnimationCopy = {
  question: string;
  answerLabel: string;
  answerBefore: string;
  answerAfter: string;
  resultsLabel: string;
  searching: string;
  winnerDescription: string;
  descriptions: readonly string[];
};

export type CampaignAnimationCopy = {
  period: string;
  metricLabel: string;
  week: string;
  channels: string;
  active: string;
  cost: string;
  costNote: string;
};

export type AutomationField = { label: string; value: string };

export type AutomationAnimationCopy = {
  inbox: string;
  crm: string;
  sender: string;
  time: string;
  subject: string;
  // Square brackets mark the phrases the agent picks out; they fill `fields` after the name, in order.
  body: string;
  attachment: string;
  lead: string;
  fields: readonly [AutomationField, AutomationField, AutomationField, AutomationField];
  followUp: string;
  followUpTime: string;
};

type FaqItem = { id: string; question: string; answer: string };
/** A heading with plain paragraphs; used for the long-form parts of a service page. */
export type ProseSection = { id: string; heading: string; paragraphs: readonly string[] };
/** Before-and-after facts from a real project, linked to its reference page. */
export type ServiceProof = {
  heading: string;
  text: string;
  facts: readonly { label: string; before: string; after: string }[];
  beforeLabel: string;
  afterLabel: string;
  link: string;
};

export type ServiceCopy = {
  id: ServiceId;
  name: string;
  navDescription: string;
  homeDescription: string;
  /** Home card: a short claim, a two-sentence explanation and a visible checklist. */
  headline: string;
  summary: string;
  highlights: readonly string[];
  cta: string;
  page: {
    /** Search result title; the page heading stays in `title`. */
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    /** The links to the sub-service pages and the open text blocks below them. */
    details: { heading: string; intro: string; items: readonly ProseSection[] };
    proof?: ServiceProof;
    /** The stages of a project in order, each with what the client sees. */
    stages?: { heading: string; intro: string; items: readonly { title: string; copy: string }[] };
    /** Real audit findings of the reference project, shown as a table. */
    findings?: { heading: string; intro: string; link: string };
    /** Questions we answer before we change anything in an existing account. */
    checks?: { heading: string; intro: string; items: readonly { title: string; copy: string }[] };
    /** A table with one row for each typical task. */
    table?: {
      heading: string;
      intro: string;
      columns: readonly string[];
      rows: readonly { title: string; cells: readonly string[] }[];
    };
    /** A large browser window that switches between the example sites we built. */
    showcase?: { heading: string; copy: string; tabsLabel: string; open: string };
    faqHeading: string;
    faqs: readonly FaqItem[];
    finalTitle: string;
    finalCopy: string;
    finalCta: string;
  };
};

export type ServicesCopy = {
  services: readonly ServiceCopy[];
  /** The overview page of all areas and sub-services. */
  overview: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    finalTitle: string;
    finalCopy: string;
    finalCta: string;
  };
  /** Shown beside the final call to action on every service page. */
  contact: { heading: string; text: string };
  webExperienceAnimation: WebExperienceAnimationCopy;
  optimizationAnimation: OptimizationAnimationCopy;
  campaignAnimation: CampaignAnimationCopy;
  automationAnimation: AutomationAnimationCopy;
};

export const servicesContent = { de, en, fr } satisfies Record<Locale, ServicesCopy>;

export function getServiceCopy(locale: Locale, id: ServiceId): ServiceCopy {
  const service = servicesContent[locale].services.find((entry) => entry.id === id);
  if (!service) throw new Error(`Missing ${id} service copy for ${locale}.`);
  return service;
}
