import type { Locale } from "./config";

export type LegalPageKind = "imprint" | "privacy";

export interface LegalDetail {
  label: string;
  value: string;
  href?: string;
}

export interface LegalLink {
  href: string;
  label: string;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  details?: LegalDetail[];
  items?: string[];
  links?: LegalLink[];
}

export interface LegalPageContent {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export type LegalContent = Record<LegalPageKind, LegalPageContent>;

export const legalUpdatedAt = "2026-10-11";
export const updatedLabel = (locale: Locale) => {
  const prefix = { de: "Stand: ", en: "Last updated: ", fr: "Mise à jour : " }[locale];
  const date = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${legalUpdatedAt}T00:00:00Z`));
  return `${prefix}${date}`;
};

export const cloudflareLinks = [
  { href: "https://www.cloudflare.com/privacypolicy/", label: "Cloudflare Privacy Policy" },
  { href: "https://www.cloudflare.com/cloudflare-customer-dpa/", label: "Cloudflare Data Processing Addendum" },
];

export const resendLinks = [
  { href: "https://resend.com/legal/privacy-policy", label: "Resend Privacy Policy" },
  { href: "https://resend.com/legal/dpa", label: "Resend Data Processing Addendum" },
];
