import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Case studies",
  overview: {
    title: "Case studies: websites and SEO with measured results | Suchio",
    description:
      "Projects by Suchio with measured results. Handwerker.work from Bad Nauheim: a new website, Lighthouse mobile from 65 to 100, every old URL kept.",
    h1: "Case studies",
    intro: "Projects we have delivered, with the figures before and after launch.",
    kind: "Renovation, bathrooms and building services in Bad Nauheim",
    summary:
      "A WordPress website rebuilt as a fast Astro website without losing a single address. Plus SEO based on search data and new service pages.",
    link: "View the case study",
  },
  serviceLink: "View the case study: Handwerker.work",
  handwerkerWork: {
    title: "Case study Handwerker.work: new website and SEO for a trades business | Suchio",
    description:
      "How we rebuilt the WordPress website of Handwerker.work from Bad Nauheim: Lighthouse mobile from 65 to 100, every old URL kept, 32 of 33 pages indexed by Google.",
    h1: "A new website for Handwerker.work",
    intro:
      "Handwerker.work does renovation, bathroom renovation, electrical and building services work in Bad Nauheim, the Wetterau and Frankfurt. We rebuilt its WordPress website and look after SEO and further pages.",
    name: "Handwerker.work",
    visit: "Visit the website",
    beforeShot: {
      caption: "Before, 8 October 2026",
      alt: "Home page of the old website. An advertising pop-up covers the left half of the first screen.",
      findings:
        "A pop-up covered the first screen. On phones the page was wider than the screen. A linked service page returned a 404 error. Our check of 64 addresses found 45 issues.",
    },
    afterShot: {
      caption: "After, 29 October 2026",
      alt: "Home page of the new website with the headline, three ways to get in touch and a photo of one of its own bathrooms.",
      changes:
        "Headline, services and three ways to get in touch on the first screen. A photo of the client’s own work on the first screen. No pop-up, no cookie banner.",
    },
    lighthouse: {
      heading: "Lighthouse mobile, home page",
      text: "Google’s measuring tool, run in mobile mode before and after the rebuild.",
      legend: "Outer ring: new website. Inner ring: old website.",
      before: "before",
      performance: "Performance",
      accessibility: "Accessibility",
      seo: "SEO",
      lcp: "Time until the main content shows (LCP)",
      lcpScale: "Google rates up to 2.5 s as good and 4 s or more as poor.",
      weight: "Data size of the home page",
      oldSite: "old",
      newSite: "new",
      desktop: "On desktop",
      desktopText:
        "New website, home page, with Lighthouse's desktop settings. The old website was measured on mobile only.",
      bestPractices: "Best practices",
    },
    pagesHeading: "Three pages compared",
    pagesText: "Lighthouse mobile performance score, old and new version of the same page.",
    pages: { home: "Home page", contact: "Contact", badNauheim: "Bathroom renovation Bad Nauheim" },
    sourceNote:
      "Lighthouse lab measurements of the live website: the old version on 21 October 2026 (mobile only), the new version on 29 October 2026 with three mobile and three desktop runs per page; the charts show the median. On mobile, the home, contact and Bad Nauheim bathroom pages score 100 for performance, accessibility, best practices and SEO in every run. Scores can vary between runs. 32 of 33 sitemap pages are indexed according to Google Search Console (28 October 2026).",
    workHeading: "What we did",
    work: [
      {
        title: "Technology",
        copy: "Static Astro pages on Cloudflare, with no WordPress code since 28 October 2026. Every old URL stayed; pages with a new address redirect with a 301, so links and search results keep working.",
      },
      {
        title: "Content",
        copy: "New pages for heating, heat pumps, drywall, full renovation, tiling, service area and Bad Nauheim. Wording and order follow data from Google Search Console. Name, address and a single phone number are the same everywhere.",
        link: {
          label: "Bathroom renovation in Bad Nauheim (German)",
          href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        },
      },
      {
        title: "Enquiries",
        copy: "The enquiry form asks about the project first. Cost calculators on the service pages send their answers along. Every enquiry arrives by email, with spam protection.",
        link: { label: "See the enquiry form (German)", href: `${site}/kontakt/` },
      },
    ],
    cta: {
      heading: "A website like this for your business?",
      text: "Tell us what your website doesn’t do today.",
      button: "Send an enquiry",
    },
  },
} satisfies ReferencesCopy;

export default references;
