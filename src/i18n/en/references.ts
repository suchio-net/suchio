import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Case studies",
  overview: {
    title: "Case studies: websites and SEO with measured results | Suchio",
    description:
      "Projects by Suchio with measured results. Handwerker.work from Bad Nauheim: a new website, Lighthouse mobile from 65 to 100, every old URL kept.",
    h1: "Case studies",
    intro:
      "Projects we have delivered, with the figures before and after launch. Below them, concepts that show what a website for an industry can look like.",
    kind: "Renovation, bathrooms and building services in Bad Nauheim",
    summary:
      "A WordPress website rebuilt as a fast Astro website without losing a single address. Plus SEO based on search data and new service pages.",
    link: "View the case study",
    conceptsHeading: "Concepts by industry",
    conceptsText:
      "Examples of what a website for an industry can look like. The businesses are made up; they are not client projects.",
    conceptsLink: "All concepts",
  },
  teaser: {
    heading: "A new website, every address kept",
    text: "A renovation business in Bad Nauheim. We rebuilt its WordPress website and have since managed SEO and further development.",
    link: "Read the full case study",
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
      caption: "After, 31 October 2026",
      alt: "Home page of the new website with the headline, three ways to get in touch and a photo of one of its own bathrooms.",
      changes:
        "Headline, services and three ways to get in touch on the first screen. A photo of the client’s own work on the first screen. No pop-up, no cookie banner.",
    },
    viewer: {
      open: "Enlarge image",
      dialog: "Image viewer",
      close: "Close",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      reset: "Fit to window",
      previous: "Previous image",
      next: "Next image",
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
    findingsHeading: "What we found and what we changed",
    findingsText:
      "Before the rebuild, we checked all 64 addresses of the old website and recorded 45 findings. Here are six of them, next to the current state.",
    topicLabel: "Area",
    beforeLabel: "Before",
    afterLabel: "After",
    findings: [
      {
        title: "Enquiries",
        before:
          "The contact form only worked if visitors accepted marketing cookies. Anyone who declined could not send an enquiry.",
        after:
          "The form works without cookie consent. Only the project, location, phone or email and the privacy confirmation are required.",
      },
      {
        title: "Page titles",
        before:
          "The homepage title started with “Handwerker Frankfurt”, although the business is based in Bad Nauheim. One page carried another page’s title, and many ended with the same slogan.",
        after:
          "Every page has its own title with service and location. The homepage is called “Sanierung, Bad & Elektro in Bad Nauheim”.",
      },
      {
        title: "Addresses",
        before:
          "One service page returned a 404 error and was linked from five pages. On top of that came 223 WordPress system addresses such as feeds and attachments.",
        after:
          "Every old address works or redirects with a 301. The 223 system addresses follow fixed rules, and we tested every one of them.",
      },
      {
        title: "Location pages",
        before: "Four location pages shared 85 to 90 percent of their text.",
        after:
          "The new pages for Friedberg, Bad Vilbel, Karben, Bad Homburg and Butzbach give the distance, the districts, the local water hardness and the rules for listed buildings. Shared text: 19 to 28 percent.",
      },
      {
        title: "Crawlers",
        before:
          "robots.txt blocked the CSS and JavaScript folders. The host answered OpenAI’s GPTBot crawler with error 429.",
        after: "Search engines and AI crawlers may read every page. Cloudflare blocks no AI crawlers.",
      },
      {
        title: "Structured data",
        before: "Only the homepage and the blog had structured data. The service pages had none.",
        after: "Every service page describes the service, the page and its breadcrumb path for search engines.",
      },
    ],
    logHeading: "How the project went",
    logText: "Eleven days passed between the analysis on 21 October and the finished enquiry path on 31 October.",
    log: [
      {
        date: "2026-10-21",
        title: "Analysis",
        copy: "We check all 64 addresses of the old website, mobile Lighthouse on five pages, crawler access and the layout on phones. Result: 45 findings, sorted by urgency.",
      },
      {
        date: "2026-10-23",
        title: "Move without losing an address",
        copy: "The website runs as an Astro site on Cloudflare. Every old address stays the same, and the mailboxes keep running with the existing provider.",
      },
      {
        date: "2026-10-24",
        title: "New service pages",
        copy: "Separate pages for heating, heat pumps, drywall, full renovation and tiling, plus the service area and Bad Nauheim. Old location and service addresses redirect to the new pages with a 301.",
        link: {
          label: "Bathroom renovation in Bad Nauheim (German)",
          href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        },
      },
      {
        date: "2026-10-28",
        title: "No WordPress code left",
        copy: "Every page is rebuilt in the design of the new homepage. Google reports 32 of 33 sitemap pages as indexed.",
      },
      {
        date: "2026-10-29",
        title: "Loading time",
        copy: "AVIF images with separate crops for phones, a smaller font file, and spam protection that only loads at the first form input. The homepage, contact page and Bad Nauheim bathroom page score 100 in mobile Lighthouse.",
      },
      {
        date: "2026-10-30",
        title: "Copy based on search data",
        copy: "The bathroom renovation and tiling pages follow the wording and order of search queries from Google Search Console. Every page header shows the Google rating.",
      },
      {
        date: "2026-10-31",
        title: "Location pages, projects and enquiries",
        copy: "Location pages for five towns in the Wetterau and the Taunus, four project pages with the company’s own photos, and an enquiry form in six steps.",
        link: { label: "See the enquiry form (German)", href: `${site}/kontakt/` },
      },
    ],
    nowHeading: "What we measure now",
    nowText:
      "Before the rebuild, the website did not count enquiries. Since 31 October it counts calls, WhatsApp clicks and sent enquiries, without cookies and without a banner. Over the coming months this shows which pages bring enquiries. We continue to look after SEO and further development.",
    servicesLabel: "Services in this project",
    cta: {
      heading: "A website like this for your business?",
      text: "Tell us what your website doesn’t do today.",
      button: "Send an enquiry",
    },
  },
} satisfies ReferencesCopy;

export default references;
