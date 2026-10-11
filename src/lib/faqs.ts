import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

export type Faq = CollectionEntry<"faqs">["data"];

const signature = (faqs: Faq[]) =>
  faqs.map(({ translationKey, slug, order }) => `${translationKey}|${slug}|${order}`).join();

/** FAQs of one locale in display order. Every locale must translate the same questions. */
export async function getFaqs(locale: Locale): Promise<Faq[]> {
  const entries = await getCollection("faqs");
  const byLocale = (candidate: Locale) =>
    entries
      .map((entry) => entry.data)
      .filter((faq) => faq.locale === candidate)
      .sort((a, b) => a.order - b.order);
  const reference = signature(byLocale(defaultLocale));
  for (const candidate of locales) {
    if (signature(byLocale(candidate)) !== reference)
      throw new Error(`FAQs in ${candidate} do not match ${defaultLocale}.`);
  }
  return byLocale(locale);
}
