import type { Locale } from "./config";
import de from "./de/services";
import en from "./en/services";
import fr from "./fr/services";

export type ServiceId = "websites-apps" | "seo-ai-visibility" | "paid-campaigns" | "ai-automation";

export type WebExperienceAnimationCopy = {
  desktopLabel: string;
  mobileLabel: string;
  headline: string;
  cta: string;
};

export type OptimizationAnimationCopy = {
  query: string;
  resultLabel: string;
  rankLabel: string;
  topRankedLabel: string;
  winnerDescription: string;
  descriptions: readonly string[];
};

export type CampaignAnimationCopy = { metricLabel: string };

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

type CopyRow = readonly [label: string, copy: string];
type ContentItem = { id: string; title: string; copy: string };
export type ScopeGroup = { id: string; title: string; copy: string; items: readonly string[] };
type FaqItem = { id: string; question: string; answer: string };

export type ServiceCopy = {
  id: ServiceId;
  name: string;
  navDescription: string;
  summary: string;
  rows: readonly CopyRow[];
  cta: string;
  page: {
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
