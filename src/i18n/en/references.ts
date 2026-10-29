import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  link: "Case study: Handwerker.work",
  handwerkerWork: {
    title: "Case study Handwerker.work: new website and SEO for a trades business | Suchio",
    description:
      "How we rebuilt the WordPress website of Handwerker.work from Bad Nauheim: Lighthouse mobile from 65 to 93, every old URL kept, 32 of 33 pages indexed by Google.",
    h1: "A new website for Handwerker.work",
    intro:
      "Handwerker.work does renovation, bathroom renovation, electrical and building services work in Bad Nauheim, the Wetterau and Frankfurt. We rebuilt its WordPress website as a fast Astro website and look after SEO and further pages.",
    name: "Handwerker.work",
    visit: "Visit the website",
    resultsHeading: "Before and after",
    beforeLabel: "before",
    results: [
      { label: "Lighthouse mobile, home page", before: "65", after: "93" },
      { label: "Main content loaded (LCP), mobile", before: "10.1 s", after: "3.0 s" },
      { label: "Accessibility, Lighthouse", before: "82", after: "100" },
      { label: "Sitemap pages indexed by Google", before: "", after: "32 of 33" },
    ],
    resultsNote:
      "Lighthouse mobile on 21 October 2026 on the old website and on 29 October 2026 on the new one. All six measured pages score 91 to 99 for performance and 100 for accessibility, best practices and SEO. Indexing according to Google Search Console on 28 October 2026.",
    startHeading: "The old website",
    startText: "On 21 October 2026 we checked all 64 known URLs and recorded 45 findings. The main ones:",
    start: [
      "On phones, the main content of the home page appeared only after 10.1 seconds.",
      "On phones, the home page was wider than the screen and scrolled sideways.",
      "A pop-up and a cookie banner covered the first screen on every page we checked.",
      "One service page returned a 404 error and was linked from the home page and four location pages.",
      "The service pages had no structured data for Google.",
    ],
    workHeading: "What we did",
    work: [
      {
        title: "Rebuilt without WordPress",
        copy: "Static Astro pages on Cloudflare. Since 28 October 2026 the website contains no WordPress code.",
      },
      {
        title: "No address lost",
        copy: "Every old URL stayed. Pages with a new address redirect with a 301, so links and search results keep working.",
      },
      {
        title: "New service pages",
        copy: "Heating, heat pumps, drywall, full renovation, tiling, service area and a separate page for Bad Nauheim.",
      },
      {
        title: "Enquiries with project details",
        copy: "The enquiry form asks about the project first. Cost calculators on the service pages send their answers along. Every enquiry arrives by email, with spam protection.",
      },
      {
        title: "The same business details everywhere",
        copy: "Name, address and a single phone number are the same on every page.",
      },
      {
        title: "SEO based on search data",
        copy: "Wording, page list and order follow the data from Google Search Console and a comparison with competitors.",
      },
    ],
    pagesHeading: "Pages to look at",
    pages: [
      {
        label: "Bathroom renovation in Bad Nauheim",
        href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        copy: "Location page with reviews and common questions, in German.",
      },
      {
        label: "Full renovation",
        href: `${site}/komplettsanierung/`,
        copy: "One of the new service pages, in German.",
      },
      {
        label: "Enquiry",
        href: `${site}/kontakt/`,
        copy: "The form that asks about the project first, in German.",
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
