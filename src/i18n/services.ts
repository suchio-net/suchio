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
  metricLabel: string;
  events: readonly [string, string, string];
};

export type AutomationAnimationCopy = {
  trigger: string;
  agent: string;
  extract: string;
  condition: string;
  success: string;
  notify: string;
  fallback: string;
  model: string;
  context: string;
  research: string;
  yes: string;
  review: string;
};

type ContentItem = { id: string; title: string; copy: string };
export type ScopeGroup = { id: string; title: string; copy: string; items: readonly string[] };
type FaqItem = { id: string; question: string; answer: string };

export type ServiceCopy = {
  id: ServiceId;
  name: string;
  navDescription: string;
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
    processHeading: string;
    processIntro: string;
    process: readonly ContentItem[];
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
