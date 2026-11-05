import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  siteEditor: {
    heading: "You change the text and opening hours yourself",
    copy: "If you want, we build your website with a content management system. You then change headings, opening hours, and notices yourself and publish them with one click. Try it here.",
    panelTitle: "Edit home page",
    headlineLabel: "Heading",
    headlineDefault: "Your new bathroom from one team",
    hoursLabel: "Opening hours",
    hoursDefault: "Mon–Fri 8 am–5 pm",
    noticeLabel: "Notice at the top of the page",
    noticeText: "We still have dates free in December.",
    publish: "Publish",
    published: "Published",
    draft: "Draft",
    live: "Live",
    pageCopy: "Planning, removal, tiling, and plumbing from one business in Hofheim.",
    pageCta: "Send an enquiry",
    hoursPrefix: "Open",
    photoAlt: "Tiled bathroom wall",
  },
  searchSources: {
    heading: "What Google, Maps, and AI assistants read on your website",
    copy: "All three read the same page, but each reads a different part of it. Pick a place and see which part appears there.",
    tabsLabel: "Place where customers search",
    forSearch: "For search engines",
    seoTitle: "Bathroom renovation in Hofheim | Mustermann Bäder",
    seoDescription: "A new bathroom in about three weeks, with planning, tiling, and plumbing from one team.",
    pageTitle: "Bathroom renovation in Hofheim",
    pageCopy: "We plan your bathroom, remove the old one, and hand over the new one fully tiled.",
    address: "Musterstraße 12, 65719 Hofheim",
    hours: "Mon–Fri 8 am–5 pm",
    faqQuestion: "How long does a bathroom renovation take?",
    faqAnswer: "We usually renovate a small bathroom in three weeks, from removal to tiling.",
    places: {
      google: {
        label: "Google Search",
        explain:
          "Google shows the page title and the description. We give every page its own title with the service and the place, and we check in Search Console that Google has indexed the page.",
      },
      maps: {
        label: "Google Maps",
        explain:
          "Maps shows your Business Profile. We make sure your name, address, and hours match on the website, in the profile, and in directories, and we keep the profile’s categories and photos up to date.",
      },
      ai: {
        label: "AI answer",
        explain:
          "AI assistants are most likely to use sentences that answer a question directly. We write such answers on your pages, describe them with structured data, and allow the assistants’ crawlers.",
      },
    },
    mapsCategory: "Bathroom supply store in Hofheim",
    mapsOpen: "Open until 5 pm",
    mapsActions: ["Directions", "Call", "Website"],
    aiQuestion: "How long does a bathroom renovation in Hofheim take?",
    aiAnswer: "At Mustermann Bäder in Hofheim, a small bathroom usually takes three weeks, from removal to tiling.",
  },
  adCalculator: {
    heading: "What an enquiry costs",
    copy: "We judge campaigns by the cost per enquiry, not by clicks. Change the values and see how much a better landing page changes.",
    budget: "Budget per month",
    cpc: "Cost per click",
    rate: "Visitors who enquire",
    clicks: "clicks",
    enquiries: "enquiries",
    perEnquiry: "per enquiry",
    noEnquiry: "no enquiry",
    compareHeading: "Cost per enquiry",
    today: "With this landing page",
    better: "If {points} percentage points more enquire",
    note: "Example calculation. Click prices depend on the industry, the location, and the competition. We give you realistic values before the start.",
  },
  enquiryLanes: {
    heading: "What runs automatically and what stays with you",
    copy: "Automation does the typing, sorting, and reminding. Advice, measuring up, and the quote stay with your team. An example with one enquiry for a bathroom renovation:",
    lanes: { auto: "Automatic", team: "Your team" },
    steps: [
      {
        time: "Monday, 7:42 pm",
        lane: "auto",
        items: [{ title: "Enquiry arrives", detail: "Bathroom renovation in Hofheim, three photos through the form" }],
      },
      {
        time: "one minute later",
        lane: "auto",
        items: [
          { title: "Confirmation to the customer", detail: "“We’ll get back to you by Tuesday, 12 noon.”" },
          { title: "Entry in the CRM", detail: "Name, service, place, and photos, without retyping" },
          { title: "Message to you", detail: "New enquiry with a link to the entry" },
        ],
      },
      {
        time: "Tuesday, 9:15 am",
        lane: "team",
        items: [{ title: "Call back and appointment", detail: "You give advice and arrange the measuring visit" }],
      },
      {
        time: "after measuring up",
        lane: "team",
        items: [{ title: "Quote", detail: "You calculate and send the quote" }],
      },
      {
        time: "five days without a reply",
        lane: "auto",
        items: [{ title: "Reminder with a draft", detail: "A follow-up email is ready, and you approve it" }],
      },
    ],
  },
} satisfies ServiceFeaturesCopy;

export default features;
