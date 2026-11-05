import type { Locale } from "./config";
import de from "./de/service-features";
import en from "./en/service-features";
import fr from "./fr/service-features";

// Each service page has one interactive section that shows the service at work. The business in every
// demo is the made-up Mustermann Bäder from the home page.

export type TourStepId = "design" | "speed" | "enquiry" | "care";

export type ServiceTourCopy = {
  heading: string;
  copy: string;
  tabsLabel: string;
  steps: Record<TourStepId, { title: string; text: string }>;
  domain: string;
  nav: readonly [string, string, string];
  headline: string;
  sub: string;
  cta: string;
  cards: readonly [string, string, string];
  speedLabel: string;
  speedGood: string;
  speedPoor: string;
  speedReady: string;
  formTitle: string;
  formFields: readonly { label: string; value: string }[];
  formSubmit: string;
  formSent: string;
  formSentText: string;
  careLabel: string;
  careBefore: string;
  careAfter: string;
  careSaved: string;
};

export type SearchPlace = "google" | "maps" | "ai";

export type SearchPlacesCopy = {
  heading: string;
  copy: string;
  tabsLabel: string;
  forSearch: string;
  domainPath: string;
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

export type ClickEnquiryCopy = {
  heading: string;
  copy: string;
  steps: readonly [
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
    { title: string; text: string },
  ];
  query: string;
  sponsored: string;
  adTitle: string;
  adText: string;
  domain: string;
  pageHeadline: string;
  pageFields: readonly [string, string];
  pageSubmit: string;
  pageSent: string;
  dashboardTitle: string;
  dashboardExample: string;
  clicks: string;
  enquiries: string;
  costPerEnquiry: string;
};

export type ToolId = "form" | "mail" | "crm" | "calendar" | "chat" | "documents";

export type ToolMapCopy = {
  heading: string;
  copy: string;
  hub: string;
  toolsLabel: string;
  replay: string;
  tools: Record<ToolId, { name: string; event: string; examples: readonly string[] }>;
};

export type ServiceFeaturesCopy = {
  serviceTour: ServiceTourCopy;
  searchPlaces: SearchPlacesCopy;
  clickEnquiry: ClickEnquiryCopy;
  toolMap: ToolMapCopy;
};

const features = { de, en, fr } satisfies Record<Locale, ServiceFeaturesCopy>;

export function getServiceFeaturesCopy(locale: Locale): ServiceFeaturesCopy {
  return features[locale];
}
