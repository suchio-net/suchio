import { alternatePath, defaultLocale, localeConfig, locales, t, type Locale } from "@/lib/i18n";
import { siteOrigin } from "@/lib/site-config";
import { socialImagePath } from "@/lib/social-image";

export { siteOrigin } from "@/lib/site-config";

type PageMetadataInput = {
  locale: Locale;
  pathname: string;
  title?: string;
  description: string;
};

export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin).toString();
}

export function pageMetadata({ locale, pathname, title, description }: PageMetadataInput) {
  const pageTitle = title ? `${title} | Suchio` : t(locale, "meta.siteTitle");
  const pageImage = socialImagePath(pathname, locale);
  const openGraphImage = absoluteUrl(pageImage ?? "/suchio-social-card.png");
  const twitterImage = absoluteUrl(pageImage ?? "/suchio-twitter-card.png");
  const languageAlternates = Object.fromEntries(
    locales.map((candidate) => [candidate, absoluteUrl(alternatePath(pathname, candidate))]),
  );
  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: absoluteUrl(pathname),
      languages: {
        ...languageAlternates,
        "x-default": absoluteUrl(alternatePath(pathname, defaultLocale)),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Suchio",
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeConfig[candidate].openGraphLocale),
      title: pageTitle,
      description,
      url: absoluteUrl(pathname),
      images: [{ url: openGraphImage, width: 1200, height: 630, alt: pageImage ? pageTitle : "Suchio" }],
    },
    twitter: {
      card: pageImage ? "summary_large_image" : "summary",
      title: pageTitle,
      description,
      images: [
        {
          url: twitterImage,
          width: pageImage ? 1200 : 400,
          height: pageImage ? 630 : 400,
          alt: pageImage ? pageTitle : "Suchio",
        },
      ],
    },
  };
}
