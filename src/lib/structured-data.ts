import type { ServiceCopy } from "@/i18n/services";
import { publicBusinessAddress, publicContactEmail, publicContactPhone, publicXProfile } from "@/lib/contact";
import { localizePath, locales, t, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

// schema.org nodes for the JSON-LD graph of each indexable page. Every node is identified by an
// @id so pages can reference the organization without repeating it.
export type SchemaNode = Record<string, unknown>;

const organizationId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");
const ownerId = absoluteUrl("/#owner");

const ownerTitle = { de: "Inhaber", en: "Owner", fr: "Propriétaire" } satisfies Record<Locale, string>;

/** The studio, its website and its owner as named in the imprint. */
export function siteNodes(locale: Locale, serviceNames: readonly string[]): SchemaNode[] {
  return [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Suchio",
      url: absoluteUrl("/"),
      description: t(locale, "meta.aboutDescription"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/apple-touch-icon.png"), width: 180, height: 180 },
      email: publicContactEmail,
      telephone: publicContactPhone,
      address: { "@type": "PostalAddress", ...publicBusinessAddress },
      sameAs: [publicXProfile],
      knowsAbout: serviceNames,
    },
    {
      "@type": "Person",
      "@id": ownerId,
      name: "Aleks Tsenov",
      jobTitle: ownerTitle[locale],
      worksFor: { "@id": organizationId },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: "Suchio",
      inLanguage: locales,
      publisher: { "@id": organizationId },
    },
  ];
}

/** A page of the website; `type` is a schema.org WebPage subtype such as AboutPage. */
export function pageNode(locale: Locale, pathname: string, name: string, type = "WebPage", extra: SchemaNode = {}) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(pathname)}#page`,
    url: absoluteUrl(pathname),
    name,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    ...extra,
  };
}

export function breadcrumbNode(locale: Locale, trail: readonly { name: string; path: string }[]): SchemaNode {
  const items = [{ name: "Suchio", path: localizePath("/", locale) }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(locale: Locale, service: ServiceCopy, path: string): SchemaNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.name,
    description: service.page.metaDescription,
    serviceType: service.name,
    url: absoluteUrl(path),
    inLanguage: locale,
    provider: { "@id": organizationId },
  };
}

/** Questions and answers for the mainEntity of an FAQPage. */
export function faqEntities(items: readonly { question: string; answer: string }[]) {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  }));
}

export const organizationReference = { "@id": organizationId };
