import type { APIRoute } from "astro";
import { publicBusinessAddress, publicContactEmail, publicContactPhone } from "@/lib/contact";
import { localeConfig, localizePath, locales, t } from "@/lib/i18n";
import { getServiceCatalog } from "@/lib/service-catalog";
import { absoluteUrl } from "@/lib/site";

// A plain-text summary for language models (https://llmstxt.org), written from the English copy.
export const GET: APIRoute = () => {
  const services = getServiceCatalog("en");
  const address = publicBusinessAddress;
  const body = [
    "# Suchio",
    "",
    `> ${t("en", "meta.aboutDescription")}`,
    "",
    t("en", "home.heroDescription"),
    "",
    `Contact: ${publicContactEmail}, ${publicContactPhone}, ${address.streetAddress}, ${address.postalCode} ${address.addressLocality}, Germany.`,
    "",
    "## Services",
    "",
    ...services.map(({ copy, href }) => `- [${copy.name}](${absoluteUrl(href)}): ${copy.page.metaDescription}`),
    "",
    "## Company",
    "",
    `- [About](${absoluteUrl(localizePath("/about", "en"))}): ${t("en", "meta.aboutDescription")}`,
    `- [Contact](${absoluteUrl(localizePath("/contact", "en"))}): ${t("en", "meta.contactDescription")}`,
    "",
    "## Languages",
    "",
    ...locales.map((locale) => `- [${localeConfig[locale].name}](${absoluteUrl(localizePath("/", locale))})`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
