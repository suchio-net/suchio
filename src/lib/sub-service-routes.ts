import type { Locale } from "@/i18n/config";
import { localizePath } from "./locale-path";
export const subServiceRoutes = [
  {
    id: "business-websites",
    area: "websites-apps",
    slugs: {
      de: "unternehmenswebsites",
      en: "business-websites",
      fr: "sites-entreprise",
    },
    basePath: "/services/websites/business-websites",
  },
  {
    id: "relaunch",
    area: "websites-apps",
    slugs: {
      de: "relaunch",
      en: "relaunch",
      fr: "refonte",
    },
    basePath: "/services/websites/relaunch",
  },
  {
    id: "landing-pages",
    area: "websites-apps",
    slugs: {
      de: "landingpages",
      en: "landing-pages",
      fr: "pages-de-destination",
    },
    basePath: "/services/websites/landing-pages",
  },
  {
    id: "online-shops",
    area: "websites-apps",
    slugs: {
      de: "onlineshops",
      en: "online-shops",
      fr: "boutiques-en-ligne",
    },
    basePath: "/services/websites/online-shops",
  },
  {
    id: "accessibility",
    area: "websites-apps",
    slugs: {
      de: "barrierefreiheit",
      en: "accessibility",
      fr: "accessibilite",
    },
    basePath: "/services/websites/accessibility",
  },
  {
    id: "hosting-maintenance",
    area: "websites-apps",
    slugs: {
      de: "hosting-wartung",
      en: "hosting-maintenance",
      fr: "hebergement-maintenance",
    },
    basePath: "/services/websites/hosting-maintenance",
  },
  {
    id: "web-apps",
    area: "apps",
    slugs: {
      de: "web-apps",
      en: "web-apps",
      fr: "applications-web",
    },
    basePath: "/services/apps/web-apps",
  },
  {
    id: "customer-portals",
    area: "apps",
    slugs: {
      de: "kundenportale",
      en: "customer-portals",
      fr: "portails-clients",
    },
    basePath: "/services/apps/customer-portals",
  },
  {
    id: "mobile-apps",
    area: "apps",
    slugs: {
      de: "ios-android-apps",
      en: "ios-android-apps",
      fr: "applications-ios-android",
    },
    basePath: "/services/apps/mobile-apps",
  },
  {
    id: "desktop-apps",
    area: "apps",
    slugs: {
      de: "desktop-apps",
      en: "desktop-apps",
      fr: "applications-desktop",
    },
    basePath: "/services/apps/desktop-apps",
  },
  {
    id: "technical-seo",
    area: "seo-ai-visibility",
    slugs: {
      de: "technisches-seo",
      en: "technical-seo",
      fr: "seo-technique",
    },
    basePath: "/services/seo/technical-seo",
  },
  {
    id: "local-seo",
    area: "seo-ai-visibility",
    slugs: {
      de: "lokales-seo",
      en: "local-seo",
      fr: "seo-local",
    },
    basePath: "/services/seo/local-seo",
  },
  {
    id: "geo",
    area: "seo-ai-visibility",
    slugs: {
      de: "geo",
      en: "geo",
      fr: "geo",
    },
    basePath: "/services/seo/geo",
  },
  {
    id: "seo-content",
    area: "seo-ai-visibility",
    slugs: {
      de: "seo-texte",
      en: "seo-content",
      fr: "contenus-seo",
    },
    basePath: "/services/seo/seo-content",
  },
  {
    id: "google-ads",
    area: "paid-campaigns",
    slugs: {
      de: "google-ads",
      en: "google-ads",
      fr: "google-ads",
    },
    basePath: "/services/ads/google-ads",
  },
  {
    id: "social-ads",
    area: "paid-campaigns",
    slugs: {
      de: "social-ads",
      en: "social-ads",
      fr: "social-ads",
    },
    basePath: "/services/ads/social-ads",
  },
  {
    id: "ads-tracking",
    area: "paid-campaigns",
    slugs: {
      de: "tracking",
      en: "tracking",
      fr: "suivi-conversions",
    },
    basePath: "/services/ads/ads-tracking",
  },
  {
    id: "leads-crm",
    area: "ai-automation",
    slugs: {
      de: "anfragen-crm",
      en: "leads-crm",
      fr: "demandes-crm",
    },
    basePath: "/services/automation/leads-crm",
  },
  {
    id: "documents-email",
    area: "ai-automation",
    slugs: {
      de: "dokumente-emails",
      en: "documents-email",
      fr: "documents-e-mails",
    },
    basePath: "/services/automation/documents-email",
  },
  {
    id: "workflows",
    area: "ai-automation",
    slugs: {
      de: "workflows",
      en: "workflows",
      fr: "workflows",
    },
    basePath: "/services/automation/workflows",
  },
  {
    id: "ai-assistants",
    area: "ai-automation",
    slugs: {
      de: "ki-assistenten",
      en: "ai-assistants",
      fr: "assistants-ia",
    },
    basePath: "/services/automation/ai-assistants",
  },
  {
    id: "ai-features",
    area: "ai-automation",
    slugs: {
      de: "ki-funktionen",
      en: "ai-features",
      fr: "fonctions-ia",
    },
    basePath: "/services/automation/ai-features",
  },
] as const;
export type SubServiceId = (typeof subServiceRoutes)[number]["id"];
export const subServiceOrder = subServiceRoutes.map(({ id }) => id);
export function getSubServicePath(id: SubServiceId, locale: Locale): string {
  const route = subServiceRoutes.find((entry) => entry.id === id)!;
  return localizePath(route.basePath, locale);
}
