import type { Locale } from "./config";
import de from "./de/services";
import en from "./en/services";
import fr from "./fr/services";

export type ServiceId = "websites-apps" | "seo-ai-visibility" | "paid-campaigns" | "ai-automation";

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

type ContentItem = { id: string; title: string; copy: string };
export type ScopeGroup = { id: string; title: string; copy: string; items: readonly string[] };
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
    outcomesHeading: string;
    outcomesIntro: string;
    outcomes: readonly ContentItem[];
    scopeHeading: string;
    scopeIntro: string;
    scopeGroups: readonly ScopeGroup[];
    /** What the service covers in detail. When present it replaces the scope grid. */
    details?: { heading: string; intro: string; items: readonly ProseSection[] };
    proof?: ServiceProof;
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
