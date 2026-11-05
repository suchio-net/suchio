import type { Locale } from "./config";
import de from "./de/service-features";
import en from "./en/service-features";
import fr from "./fr/service-features";

// Each service page has one section of its own that shows how the service works. The business in
// every demo is the made-up Mustermann Bäder from the home page.

export type SiteEditorCopy = {
  heading: string;
  copy: string;
  panelTitle: string;
  headlineLabel: string;
  headlineDefault: string;
  hoursLabel: string;
  hoursDefault: string;
  noticeLabel: string;
  noticeText: string;
  publish: string;
  published: string;
  draft: string;
  live: string;
  pageCopy: string;
  pageCta: string;
  hoursPrefix: string;
  photoAlt: string;
};

export type SearchPlace = "google" | "maps" | "ai";

export type SearchSourcesCopy = {
  heading: string;
  copy: string;
  tabsLabel: string;
  forSearch: string;
  seoTitle: string;
  seoDescription: string;
  pageTitle: string;
  pageCopy: string;
  address: string;
  hours: string;
  faqQuestion: string;
  faqAnswer: string;
  places: Record<SearchPlace, { label: string; explain: string }>;
  mapsCategory: string;
  mapsOpen: string;
  mapsActions: readonly [string, string, string];
  aiQuestion: string;
  aiAnswer: string;
};

export type AdCalculatorCopy = {
  heading: string;
  copy: string;
  budget: string;
  cpc: string;
  rate: string;
  clicks: string;
  enquiries: string;
  perEnquiry: string;
  noEnquiry: string;
  compareHeading: string;
  today: string;
  /** `{points}` is replaced with the number of percentage points. */
  better: string;
  note: string;
};

export type EnquiryLane = "auto" | "team";

export type EnquiryLanesCopy = {
  heading: string;
  copy: string;
  lanes: Record<EnquiryLane, string>;
  steps: readonly { time: string; lane: EnquiryLane; items: readonly { title: string; detail: string }[] }[];
};

export type ServiceFeaturesCopy = {
  siteEditor: SiteEditorCopy;
  searchSources: SearchSourcesCopy;
  adCalculator: AdCalculatorCopy;
  enquiryLanes: EnquiryLanesCopy;
};

const features = { de, en, fr } satisfies Record<Locale, ServiceFeaturesCopy>;

export function getServiceFeaturesCopy(locale: Locale): ServiceFeaturesCopy {
  return features[locale];
}
