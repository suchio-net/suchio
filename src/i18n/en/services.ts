import type { ServicesCopy } from "../services";

const services: ServicesCopy = {
  services: [
    {
      id: "websites-apps",
      name: "Websites",
      navDescription: "Get a website or online shop built.",
      homeDescription:
        "Business websites, online shops, and landing pages that load fast, are accessible, and belong to you.",
      headline: "Websites that bring in enquiries.",
      summary:
        "We build websites and online shops that load fast on a phone and lead visitors to get in touch. Afterwards, you edit text and images yourself.",
      highlights: [
        "Business websites and landing pages",
        "Online shops with payment and shipping",
        "Enquiry forms and online booking",
        "Technical SEO basics included",
      ],
      cta: "More on websites",
      page: {
        metaTitle: "Web Design Agency Frankfurt: Websites and Shops",
        metaDescription:
          "Web design agency for Frankfurt and the Rhine-Main area: business websites, relaunches, landing pages, and online shops. Fast, accessible, and yours.",
        title: "Fast web design that brings in enquiries.",
        intro:
          "We design and build websites and online shops for businesses in Frankfurt, the Rhine-Main area, and across Germany. From the first draft to after launch, you work with the same people.",
        showcase: {
          heading: "Websites from our studio",
          copy: "Three concepts for fictional businesses, built like a client project.",
          tabsLabel: "Example websites",
          open: "Open website",
        },
        details: {
          heading: "What we build",
          intro: "Each service has its own page with the process, the result, and what determines the price.",
          items: [],
        },
        proof: {
          heading: "An example: Handwerker.work",
          text: "We rebuilt the WordPress website of a renovation business from Bad Nauheim. Before and after, measured with Lighthouse on a phone.",
          beforeLabel: "Before",
          afterLabel: "After",
          facts: [
            { label: "Performance", before: "65", after: "100" },
            { label: "Main content visible", before: "10.1 s", after: "1.8 s" },
            { label: "Linked pages with a 404 error", before: "1", after: "0" },
          ],
          link: "See the full reference",
        },
        stages: {
          heading: "How a website project runs",
          intro: "You see every interim version at a preview address and approve it.",
          items: [
            {
              title: "Conversation and proposal",
              copy: "You tell us about your customers and goals. You then get a written proposal with scope, price, and dates.",
            },
            {
              title: "Analysis",
              copy: "We check the existing website’s technology, content, and display on a phone, and we set the page structure.",
            },
            {
              title: "Design and text",
              copy: "You see the design and text on real pages, not on samples, and you approve them.",
            },
            {
              title: "Build and test",
              copy: "We build the pages, connect forms and software, and test on phone and desktop.",
            },
            {
              title: "Launch",
              copy: "We put the website online, redirect old addresses, and check whether Google picks up the pages.",
            },
          ],
        },
        faqHeading: "Website FAQs",
        faqs: [
          {
            id: "website-cost",
            question: "What does a website cost?",
            answer:
              "The price depends on the number of pages, on features such as a shop, booking, or login, on text and photos, and on the software we connect the website to. After a short conversation, you get a written proposal with scope, price, and dates. Ongoing costs for hosting and maintenance are listed separately.",
          },
          {
            id: "how-long-does-a-website-take",
            question: "How long does it take to build a website?",
            answer:
              "A landing page is ready sooner than a business website with many service and location pages. A shop or a customer portal takes the longest. For Handwerker.work, eleven days passed between the analysis and the finished enquiry path. The start and launch dates are in the proposal.",
          },
          {
            id: "what-we-need",
            question: "What do you need from us?",
            answer:
              "A conversation about your customers and services, your logo, photos of your work, and the logins for the old website and the domain. We write any missing text with you. You see every interim version at a preview address and approve it.",
          },
          {
            id: "can-we-edit-the-website-ourselves",
            question: "Can we edit the website ourselves afterwards?",
            answer:
              "Yes. You edit text, images, services, and new pages yourself in the content management system. After launch, we show you how.",
          },
          {
            id: "do-we-own-the-website",
            question: "Do we own the website afterwards?",
            answer:
              "Yes. You get the source code, designs, content, and all logins. You can continue the website with another agency or in-house.",
          },
          {
            id: "only-frankfurt",
            question: "Do you only work with businesses from Frankfurt?",
            answer:
              "No. Our studio is in Hattersheim am Main, between Frankfurt, Wiesbaden, and Mainz. We like to meet businesses from the Rhine-Main area in person. We work with businesses from other regions and abroad by video call, phone, and email.",
          },
        ],
        finalTitle: "Tell us what you want to build.",
        finalCopy: "A short description is enough. We will reply with our view and a suggested first step.",
        finalCta: "Discuss your project",
      },
    },
    {
      id: "apps",
      name: "Apps & Software",
      navDescription: "Web apps, customer portals, mobile apps, and desktop programs.",
      homeDescription: "Web apps, customer portals, apps for iOS and Android, and programs for Windows and Mac.",
      headline: "Software for your workflows.",
      summary:
        "We develop applications for workflows that live in spreadsheets and emails today. First, you test a clickable prototype.",
      highlights: [
        "Web apps and customer portals",
        "Apps for iOS and Android",
        "Desktop programs for Windows and Mac",
        "Connections to your software",
      ],
      cta: "More on apps and software",
      page: {
        metaTitle: "App Development Frankfurt: Apps and Software",
        metaDescription:
          "App development for Frankfurt and the Rhine-Main area: web apps, customer portals, iOS and Android apps, and desktop programs, from clickable prototype to operation.",
        title: "Apps and software that fit your workflows.",
        intro:
          "We develop web apps, customer portals, apps for iOS and Android, and programs for Windows and Mac. You test a clickable prototype first and get the source code at the end.",
        details: {
          heading: "What we develop",
          intro:
            "Each type of application has its own page with the process, the result, and what determines the price.",
          items: [],
        },
        table: {
          heading: "Which application fits you?",
          intro: "The type of application determines cost and maintenance. We settle this before the first prototype.",
          columns: ["Type", "Runs on", "Fits if", "Fits less if"],
          rows: [
            {
              title: "Web app",
              cells: [
                "Any device in the browser, without installation.",
                "Several people work with the same data and workflows change often.",
                "You rely heavily on device features or offline use.",
              ],
            },
            {
              title: "Customer portal",
              cells: [
                "The browser, with a login for your customers.",
                "Customers should handle appointments, orders, and documents themselves.",
                "Customers rarely need anything from you.",
              ],
            },
            {
              title: "iOS and Android app",
              cells: [
                "iPhone and Android, from the app store.",
                "Users open it often or need the camera, location, and notifications.",
                "Users rarely need it and the browser is enough.",
              ],
            },
            {
              title: "Desktop app",
              cells: [
                "Windows and Mac, installed.",
                "The app works with local files or devices or has to run offline.",
                "The app needs no local devices and internet is always available.",
              ],
            },
          ],
        },
        faqHeading: "Apps and software FAQs",
        faqs: [
          {
            id: "what-does-an-app-cost",
            question: "What does an app cost?",
            answer:
              "The price depends on the number of features, the systems, and the connections to your software. After the prototype, the scope is easy to estimate, and you get a written proposal.",
          },
          {
            id: "why-prototype",
            question: "Why a prototype first?",
            answer:
              "With a clickable prototype, your team sees whether the workflow is right before we write any code. Changes cost little at this stage.",
          },
          {
            id: "who-owns-the-code",
            question: "Who owns the source code?",
            answer: "You do. You get the source code, documentation, and all logins.",
          },
          {
            id: "take-over-software",
            question: "Do you take over existing software?",
            answer:
              "Yes. We first check the code, data, and dependencies. We then tell you whether further development is worth it or a rebuild is better.",
          },
          {
            id: "work-with-it-team",
            question: "Do you work with our IT team?",
            answer:
              "Yes. We align access, interfaces, and operation with your IT team and hand the documentation to them.",
          },
        ],
        finalTitle: "Which workflow should software handle?",
        finalCopy:
          "Tell us briefly who will use the application and what it should do. We will tell you which type fits and what the first step looks like.",
        finalCta: "Discuss your application",
      },
    },
    {
      id: "seo-ai-visibility",
      name: "SEO & AI Visibility",
      navDescription: "Get found on Google and in AI answers.",
      homeDescription: "Technical work and content to help you appear on Google and in AI answers.",
      headline: "Get found where customers search.",
      summary:
        "We fix technical problems, write content for your customers’ questions, and maintain your Google Business Profile. That way people find you on Google, in Maps, and in ChatGPT.",
      highlights: [
        "Technical SEO audit with a priority list",
        "Google Business Profile and local pages",
        "Content for real search queries",
        "Visible in ChatGPT and Google’s AI Overviews",
      ],
      cta: "More on SEO & AI Visibility",
      page: {
        metaTitle: "SEO Frankfurt: Google & AI Visibility",
        metaDescription:
          "SEO for businesses in Frankfurt and the Rhine-Main area: technical SEO, Google Business Profile, content, and visibility in ChatGPT and AI answers.",
        title: "SEO for Google and AI answers.",
        intro:
          "We fix technical problems, write content for real search queries, and maintain your Google Business Profile. That way customers find you in regular search, in Google Maps, and in AI answers.",
        details: {
          heading: "Our SEO services",
          intro:
            "This is the order we usually work in: the technology first, then the content, then Maps and AI answers.",
          items: [
            {
              id: "seo-measurement",
              heading: "Measurement and reports",
              paragraphs: [
                "We set up Search Console and analytics and separate organic enquiries from those from paid ads. You regularly get a short report in plain language: what has changed, what we did, and what comes next.",
              ],
            },
          ],
        },
        findings: {
          heading: "What an SEO audit finds",
          intro: "Five of the 45 findings from our audit for Handwerker.work, with today’s status.",
          link: "See the full reference",
        },
        faqHeading: "SEO & AI Visibility FAQs",
        faqs: [
          {
            id: "what-does-seo-cost",
            question: "What does SEO cost?",
            answer:
              "The price depends on the state of your website, the number of pages and locations, and the competition in your industry. After a short conversation, you get a written proposal with scope and price.",
          },
          {
            id: "seo-vs-google-ads",
            question: "What is the difference between SEO and Google Ads?",
            answer:
              "Google Ads are paid ads. They appear immediately and disappear as soon as you stop paying. SEO improves your position in the regular search results. That takes longer, but you don’t pay per click.",
          },
          {
            id: "when-will-we-see-results",
            question: "How long does SEO take to work?",
            answer:
              "Technical problems can often be fixed quickly. New pages usually take months to rank on Google, depending on competition in your industry and region. After the analysis, we tell you what to expect.",
          },
          {
            id: "can-you-improve-local-search-visibility",
            question: "How do we get found more on Google Maps?",
            answer:
              "Through a complete Google Business Profile, a page for each location and service, listings in business directories, and regular reviews. We take care of all of it.",
          },
          {
            id: "what-does-geo-mean",
            question: "What do GEO and AI visibility mean?",
            answer:
              "GEO stands for Generative Engine Optimization. The aim is for ChatGPT, Perplexity, or Google’s AI Overview to name your business when someone asks about your service. GEO rests on the same basics as SEO.",
          },
          {
            id: "can-you-create-the-content-too",
            question: "Do you write the content too?",
            answer:
              "Yes. We write new pages and revise existing ones. We check specialist details, such as those about your services, with you.",
          },
        ],
        finalTitle: "Make your offer easier to find.",
        finalCopy: "We will show you what is holding your visibility back, what to fix first, and what can wait.",
        finalCta: "Discuss your SEO project",
      },
    },
    {
      id: "paid-campaigns",
      name: "Paid Campaigns",
      navDescription: "Google Ads and social ads that bring in enquiries.",
      homeDescription: "Google Ads and social ads with reliable tracking, measured by the cost per enquiry.",
      headline: "Advertising that shows what it brings in.",
      summary:
        "We plan Google Ads and social ads, test several ad variants, and optimize the page behind them. Tracking shows you which clicks turn into enquiries.",
      highlights: [
        "Ads targeted to your region and audience",
        "Several ad variants tested against each other",
        "Landing pages that deliver what the ad promised",
        "Cost per enquiry in every report",
      ],
      cta: "More on Paid Campaigns",
      page: {
        metaTitle: "Performance Marketing Agency: Google and Social Ads",
        metaDescription:
          "Google Ads and social ads for businesses in the Frankfurt Rhine-Main area: campaign setup, ads, landing pages, and tracking that turn clicks into enquiries.",
        title: "Google and social ads that bring in enquiries.",
        intro:
          "We plan your campaigns, write and design the ads, optimize the page behind them, and measure which clicks turn into enquiries.",
        details: {
          heading: "What we do for your campaigns",
          intro: "First the channels, then what decides whether a campaign succeeds.",
          items: [
            {
              id: "campaign-strategy",
              heading: "Strategy and budget",
              paragraphs: [
                "Before money goes into ads, we set the audience, offer, and message. From your order value, we calculate the most an enquiry may cost. If the budget isn’t enough for a meaningful test, we tell you before launch.",
              ],
            },
            {
              id: "ad-creative",
              heading: "Ads and messages",
              paragraphs: [
                "We write and design image, video, and text ads in several variants. Each variant tests an assumption. We stop weak variants and expand good ones.",
              ],
            },
          ],
        },
        checks: {
          heading: "What we check in your account",
          intro:
            "Six questions before we change anything. You then know what stays, what we clean up, and what we rebuild.",
          items: [
            {
              title: "Does the account count real enquiries?",
              copy: "We check whether conversions measure forms, calls, and purchases, or only page views. Wrong data also sends automated bidding in the wrong direction.",
            },
            {
              title: "What are you paying for right now?",
              copy: "The search terms report shows which searches your ads appeared for and which of them have nothing to do with your offer.",
            },
            {
              title: "Is the budget going to the right place?",
              copy: "We compare campaigns, regions, devices, and times of day and see what gets the money and what brings in the enquiries.",
            },
            {
              title: "Does the page match the ad?",
              copy: "We click every important ad ourselves, on a phone too. If it promises something other than the page behind it, you pay for visitors who leave straight away.",
            },
            {
              title: "How old are the ads?",
              copy: "We check the age and variants of the ads, and whether assets such as calls and locations are maintained.",
            },
            {
              title: "Who owns the account and data?",
              copy: "We clarify logins, billing details, and account ownership, so the data stays with you, even if you change agencies.",
            },
          ],
        },
        faqHeading: "Google Ads & Social Ads FAQs",
        faqs: [
          {
            id: "how-much-ad-budget-do-we-need",
            question: "How much ad budget do we need?",
            answer:
              "It depends on how expensive clicks are in your industry and region. Before launch, we estimate click prices and tell you which budget allows a meaningful test.",
          },
          {
            id: "is-advertising-spend-included-in-your-fee",
            question: "Is ad spend included in your fee?",
            answer:
              "No. Ad spend, our fee, and other third-party costs are listed separately in the proposal. You see exactly what goes into ads and what comes to us.",
          },
          {
            id: "how-do-we-know-the-ads-work",
            question: "How do we know whether the ads are working?",
            answer:
              "By the cost per enquiry. We set up conversion tracking so you see how many enquiries come from the ads and what each one cost.",
          },
          {
            id: "which-platforms-do-you-manage",
            question: "Which platforms do you manage?",
            answer:
              "Mainly Google Ads with Search and Shopping ads, plus social ads. For local businesses, search ads are usually the best start because they reach people who are actively searching.",
          },
          {
            id: "can-you-take-over-existing-advertising-accounts",
            question: "Can you take over our existing Google Ads account?",
            answer:
              "Yes. We review the structure, tracking, past data, and access, then decide what stays, what we clean up, and what we rebuild.",
          },
        ],
        finalTitle: "Let’s plan your next campaign.",
        finalCopy:
          "Tell us what you sell, who you want to reach, and what you have tried so far. We will tell you where we would start.",
        finalCta: "Discuss a campaign",
      },
    },
    {
      id: "ai-automation",
      name: "AI & Automation",
      navDescription: "Connect your software and automate manual work.",
      homeDescription: "Connect forms, CRM, emails, and documents so nobody has to retype information.",
      headline: "Automate routine work.",
      summary:
        "We connect your software so nobody has to retype enquiries, invoices, or emails. We use AI where it saves measurable time.",
      highlights: [
        "Enquiries land in your CRM or calendar automatically",
        "Data pulled from invoices and documents automatically",
        "Reply drafts for common emails",
        "Your team keeps the final say",
      ],
      cta: "More on AI & Automation",
      page: {
        metaTitle: "AI & Automation for Businesses near Frankfurt",
        metaDescription:
          "AI and automation for businesses in the Frankfurt Rhine-Main area: process enquiries, emails, and documents automatically and save manual work.",
        title: "AI and automation under your control.",
        intro:
          "We connect your software, automate repetitive tasks, and use AI where it takes work off your team, for example with enquiries, emails, and documents.",
        details: {
          heading: "What we automate",
          intro: "What we do, what you get, and who decides at the end is on the page for each service.",
          items: [],
        },
        table: {
          heading: "Who handles what: rule, AI, and your team",
          intro: "Five typical workflows. In each one, your team keeps the final decision.",
          columns: ["Workflow", "Fixed rule", "AI", "Your team"],
          rows: [
            {
              title: "Enquiry through the form",
              cells: [
                "Creates the contact in the CRM and sends the confirmation.",
                "Recognizes the request, place, and urgency in free text.",
                "Calls back and writes the proposal.",
              ],
            },
            {
              title: "Invoice by email",
              cells: [
                "Files it and reports the due date.",
                "Reads the supplier, amount, and date.",
                "Approves the payment.",
              ],
            },
            {
              title: "Email to the shared inbox",
              cells: [
                "Forwards it to the person responsible.",
                "Sorts by request and writes a reply draft.",
                "Checks the draft and sends it.",
              ],
            },
            {
              title: "Appointment booking",
              cells: [
                "Adds the appointment to the calendar and reminds the customer.",
                "Not needed.",
                "Decides on exceptions and cancellations.",
              ],
            },
            {
              title: "Question about internal knowledge",
              cells: [
                "Checks who may see which documents.",
                "Finds the answer and names the source.",
                "Checks the answer and reports errors.",
              ],
            },
          ],
        },
        faqHeading: "AI & Automation FAQs",
        faqs: [
          {
            id: "what-does-automation-cost",
            question: "What does an automation cost?",
            answer:
              "The price depends on how many programs we connect, how many exceptions there are, and whether AI is needed. Ongoing costs for tools and AI models are listed separately in the proposal.",
          },
          {
            id: "what-can-we-automate",
            question: "What can we automate in our business?",
            answer:
              "Typical examples are website enquiries that land in your CRM or calendar automatically, invoices that are read and filed, and reply drafts for common emails. We look at your workflows and tell you what is worth it.",
          },
          {
            id: "when-is-ai-genuinely-useful",
            question: "When do we need AI, and when is simple automation enough?",
            answer:
              "AI helps when a task involves language, unstructured text, or judgment calls. For fixed rules, conventional automation is usually more reliable and cheaper.",
          },
          {
            id: "do-we-need-to-replace-our-existing-systems",
            question: "Do we need to replace the software we use?",
            answer:
              "Usually not. We connect the software you already use first. We only suggest rebuilding when that is more stable and cheaper.",
          },
          {
            id: "how-do-you-handle-sensitive-data",
            question: "How do you handle sensitive data?",
            answer:
              "Before we build anything, we agree with you who can access which data, where it is stored, and which providers are involved. We choose the technical approach based on the risk and legal requirements.",
          },
          {
            id: "can-you-add-an-ai-feature-to-our-website-or-app",
            question: "Can you add an AI feature to our website or app?",
            answer:
              "Yes. We build the AI logic, connect the model, and measure quality. If needed, we design and build the interface for it too.",
          },
        ],
        finalTitle: "Which task costs you the most time?",
        finalCopy:
          "Describe it to us. We will tell you whether automating it is worth it and what that would look like.",
        finalCta: "Discuss automation",
      },
    },
  ],
  overview: {
    metaTitle: "Services: Websites, Apps, SEO, Ads, and AI",
    metaDescription:
      "All Suchio services: websites and online shops, apps and software, SEO and AI visibility, paid campaigns, and AI and automation.",
    title: "All services",
    intro:
      "Five areas, 22 services. Each service has its own page with the process, the result, and what determines the price.",
    finalTitle: "Not sure what you need yet?",
    finalCopy: "Tell us briefly what your goal is. We will tell you where we would start.",
    finalCta: "Discuss your project",
  },
  contact: {
    heading: "Direct contact",
    text: "You talk to the people who do the work. You get an answer within one working day at the latest.",
  },
  webExperienceAnimation: {
    nav: ["Work", "Services", "Contact"],
    kicker: "Websites",
    headline: "Clear. Fast. Useful.",
    intro: "Pages that load instantly, read clearly, and turn visits into enquiries.",
    cta: "Start an enquiry",
    cards: ["Strategy", "Design", "Build"],
  },
  optimizationAnimation: {
    question: "Who can build us a fast website that gets found?",
    answerLabel: "AI answer",
    answerBefore: "For a fast website with solid SEO and AI visibility, ",
    answerAfter: " is a good fit: clear structure, quick pages, and content that answers real questions.",
    resultsLabel: "Search results",
    searching: "Searching the web",
    winnerDescription: "Websites, campaigns, and automation",
    descriptions: [
      "Strategy and digital campaigns",
      "Digital experiences for growing brands",
      "Performance marketing and optimization",
    ],
  },
  campaignAnimation: {
    period: "Last 12 weeks",
    metricLabel: "qualified enquiries",
    week: "Wk",
    channels: "Channels",
    active: "Live",
    cost: "Cost per enquiry",
    costNote: "since launch",
  },
  automationAnimation: {
    inbox: "Inbox",
    crm: "CRM",
    sender: "Jana Müller",
    time: "2 min ago",
    subject: "Roof renovation enquiry",
    body: "Hi, we’d like to have our [roof renovated], about [120 m²]. Could you come by [next week] for an on-site visit?",
    attachment: "roof.jpg",
    lead: "New lead",
    fields: [
      { label: "Name", value: "Jana Müller" },
      { label: "Request", value: "Roof renovation" },
      { label: "Area", value: "120 m²" },
      { label: "Preferred date", value: "Next week" },
    ],
    followUp: "Callback scheduled",
    followUpTime: "Tue, 10:30 am",
  },
};

export default services;
