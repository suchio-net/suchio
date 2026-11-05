import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  serviceTour: {
    heading: "What we take care of for your website",
    copy: "We design and build the website, make it fast, add forms and online booking, and look after it once it is live.",
    tabsLabel: "Part of the service",
    steps: {
      design: {
        title: "Design",
        text: "Every page is designed for phone and desktop, with your services, photos, and text instead of a template.",
      },
      speed: {
        title: "Load time",
        text: "We build lean pages. The main content appears in under 2.5 seconds, the limit at which Google rates a page as fast.",
      },
      enquiry: {
        title: "Enquiries",
        text: "Forms and online booking take a minute to fill in on a phone. Every enquiry reaches you.",
      },
      care: {
        title: "Upkeep",
        text: "You change text, images, and opening hours yourself. We take care of hosting, updates, and backups.",
      },
    },
    domain: "mustermann-baeder.de",
    nav: ["Services", "Projects", "Contact"],
    headline: "Your new bathroom in three weeks",
    sub: "Planning, removal, tiling, and plumbing from one business in Hofheim.",
    cta: "Send an enquiry",
    cards: ["Bathroom renovation", "Accessible bathroom", "Tiling"],
    speedLabel: "Main content visible",
    speedGood: "good up to 2.5 s",
    speedPoor: "slow from 4 s",
    speedReady: "loaded",
    formTitle: "Enquiry for your bathroom",
    formFields: [
      { label: "Project", value: "Bathroom renovation" },
      { label: "Location", value: "65719 Hofheim" },
      { label: "Phone", value: "0176 …" },
    ],
    formSubmit: "Send an enquiry",
    formSent: "Enquiry sent",
    formSentText: "We’ll get back to you by 12 noon tomorrow.",
    careLabel: "Opening hours",
    careBefore: "Mon–Fri 8 am–5 pm",
    careAfter: "Mon–Fri 7 am–6 pm, Sat 9 am–1 pm",
    careSaved: "Saved and live",
  },
  searchPlaces: {
    heading: "What Google, Maps, and AI assistants read on your website",
    copy: "All three read the same page, but each reads a different part of it. We look after every one of these parts.",
    tabsLabel: "Place where customers search",
    domainPath: "mustermann-baeder.de/badsanierung-hofheim",
    forSearch: "For search engines",
    seoTitle: "Bathroom renovation in Hofheim | Mustermann Bäder",
    seoDescription: "A new bathroom in about three weeks, with planning, tiling, and plumbing from one business.",
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
  clickEnquiry: {
    heading: "From the click to the enquiry",
    copy: "We write the ads, build the landing page, and trace every enquiry back to its ad. That way you see what an enquiry costs.",
    steps: [
      {
        title: "Ad",
        text: "We choose search terms with buying intent and write ads with your offer and location.",
      },
      {
        title: "Landing page",
        text: "Every ad leads to a page about exactly that offer, with a short form.",
      },
      {
        title: "Tracking",
        text: "Every enquiry sent is assigned to the ad that brought it.",
      },
      {
        title: "Review",
        text: "We move the budget to the ads with the lowest cost per enquiry.",
      },
    ],
    query: "bathroom renovation hofheim",
    sponsored: "Sponsored",
    adTitle: "Bathroom renovation in Hofheim, done in three weeks",
    adText: "Planning, tiling, and plumbing from one business. Book an appointment now.",
    domain: "mustermann-baeder.de",
    pageHeadline: "Your new bathroom in Hofheim",
    pageFields: ["Bathroom renovation", "65719 Hofheim"],
    pageSubmit: "Send an enquiry",
    pageSent: "Enquiry sent",
    dashboardTitle: "Bathroom renovation campaign",
    dashboardExample: "Example values",
    clicks: "Clicks",
    enquiries: "Enquiries",
    costPerEnquiry: "Cost per enquiry",
  },
  toolMap: {
    heading: "We connect the tools you already use",
    copy: "Your form, inbox, CRM, calendar, team chat, and documents work together without anyone retyping data. Pick a tool and see what we automate there.",
    hub: "Your automation",
    toolsLabel: "Tool",
    replay: "Play the flow again",
    tools: {
      form: {
        name: "Website form",
        event: "New enquiry",
        examples: [
          "Pass on enquiries with service, location, and photos",
          "Check required details before anything moves on",
          "Filter out spam",
        ],
      },
      mail: {
        name: "Email inbox",
        event: "Confirmation sent",
        examples: [
          "Confirmation of receipt with the next steps",
          "Sort emails by topic and assign them",
          "Reply drafts that your team approves",
        ],
      },
      crm: {
        name: "CRM",
        event: "Contact created",
        examples: [
          "Create the contact and enquiry without retyping",
          "Keep the pipeline status up to date",
          "Send a reminder when a quote gets no reply",
        ],
      },
      calendar: {
        name: "Calendar",
        event: "Appointment offered",
        examples: [
          "Offer free slots for a call back or a site visit",
          "Confirmation and reminder for the customer",
          "Assign appointments to the right person",
        ],
      },
      chat: {
        name: "Team chat",
        event: "Team notified",
        examples: [
          "Report new enquiries with a link to the CRM entry",
          "Send urgent cases to the person in charge",
          "Daily overview of open enquiries",
        ],
      },
      documents: {
        name: "Documents & invoices",
        event: "Photos filed",
        examples: [
          "Read data from invoices and delivery notes",
          "File documents in the right folder",
          "Prepare quotes from templates",
        ],
      },
    },
  },
} satisfies ServiceFeaturesCopy;

export default features;
