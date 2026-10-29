import type { Locale } from "./config";
import de from "./de/references";
import en from "./en/references";
import fr from "./fr/references";

/**
 * Lighthouse results for handwerker.work. The old site was measured on 21 October 2026, on mobile
 * only. The new one was measured live on 29 October 2026 (deployment a234df0), three runs per page
 * on mobile and three on desktop; the values are the medians. The contact and Bad Nauheim pages
 * are the same pages; the old Bad Nauheim address redirects to the new one.
 */
export const handwerkerWorkMeasurements = {
  scores: { performance: [65, 100], accessibility: [82, 100], seo: [92, 100] },
  lcpSeconds: [10.1, 1.8],
  transferMegabytes: [1.99, 0.11],
  pages: { home: [65, 100], contact: [71, 100], badNauheim: [86, 100] },
  desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100, lcpSeconds: 0.5 },
} as const;

type Group = { title: string; copy: string; link?: { label: string; href: string } };
export type ReferencesCopy = {
  label: string;
  overview: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    kind: string;
    summary: string;
    link: string;
  };
  /** Short link text for the service pages. */
  serviceLink: string;
  handwerkerWork: {
    title: string;
    description: string;
    h1: string;
    intro: string;
    /** Name of the client, used in breadcrumbs. */
    name: string;
    visit: string;
    beforeShot: { caption: string; alt: string; findings: string };
    afterShot: { caption: string; alt: string; changes: string };
    lighthouse: {
      heading: string;
      text: string;
      legend: string;
      before: string;
      performance: string;
      accessibility: string;
      seo: string;
      lcp: string;
      lcpScale: string;
      weight: string;
      oldSite: string;
      newSite: string;
      /** Heading and note of the desktop figures, which exist only for the new site. */
      desktop: string;
      desktopText: string;
      bestPractices: string;
    };
    pagesHeading: string;
    pagesText: string;
    pages: { home: string; contact: string; badNauheim: string };
    sourceNote: string;
    workHeading: string;
    work: Group[];
    cta: { heading: string; text: string; button: string };
  };
};

const references = { de, en, fr } satisfies Record<Locale, ReferencesCopy>;
export function getReferencesCopy(locale: Locale): ReferencesCopy {
  return references[locale];
}
