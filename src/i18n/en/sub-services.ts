import type { SubServiceCopy } from "../sub-services";
import type { SubServiceId } from "@/lib/sub-service-routes";

const entries: readonly SubServiceCopy[] = [
  {
    id: "business-websites",
    name: "Business websites",
    summary: "Websites that explain what you offer and lead visitors to get in touch.",
    metaTitle: "Business Website Design and Development",
    metaDescription:
      "Get a business website built: one page for each service and location, fast on a phone, with enquiry tracking. The finished website belongs to you.",
    title: "Get a website built for your business",
    intro:
      "We build websites that explain what you offer and lead visitors to get in touch. They load fast, work on a phone, and belong to you at the end.",
    sections: [
      {
        heading: "How we plan the pages",
        paragraphs: [
          "First, we clarify which enquiries you want and what your customers search for. That gives us the page structure: one page for each service and, if you work locally, for each important area.",
          "A dedicated page answers the questions about one service and can appear on Google for exactly that service. Every page has one goal, such as a call, an enquiry, or a booking.",
        ],
      },
      {
        heading: "Text, images, and design",
        paragraphs: [
          "We write the text with you, because you know the specialist details best. We add photos of your work. We design on real pages with real content. You see every interim version at a preview address and approve it.",
        ],
      },
      {
        heading: "Technology and operation",
        paragraphs: [
          "We choose the technology for your project and do not commit to one system. Every website gets its own page titles, structured data, and enquiry tracking. Phone, WhatsApp, and the form are within easy reach on every page.",
          "After launch, you change text, images, and new pages yourself. We also take care of hosting and updates.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "Page structure based on your customers’ search terms",
        "Design for phone and desktop",
        "Text written together with you",
        "A content management system for your own changes",
        "Enquiry tracking",
        "Source code, designs, content, and all logins",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a short conversation, you get a written proposal with scope, price, and dates.",
      factors: [
        "Number of pages",
        "Features such as booking or login",
        "Text and photos",
        "Connections to the software you already use",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "We rebuilt the WordPress website of a renovation business. The mobile Lighthouse performance score rose from 65 to 100. The main content now appears after 1.8 seconds instead of 10.1.",
      link: "See the reference",
    },
    faqs: [
      {
        id: "how-many-pages",
        question: "How many pages does our website need?",
        answer:
          "As many as you have services and important areas, plus contact, about, and the legally required pages. We set the exact number after analyzing the search terms.",
      },
      {
        id: "existing-content",
        question: "Can we reuse our existing text and images?",
        answer: "Yes. We check what still fits and revise the rest with you. We write any missing text together.",
      },
      {
        id: "which-system",
        question: "Which system do you use?",
        answer:
          "That depends on the project. We choose the technology based on your workflows and on who will maintain the content later. Either way, you get all logins and the source code.",
      },
    ],
    related: [
      { to: "relaunch", text: "Already have a website? Then this is a relaunch." },
      { to: "technical-seo", text: "How we find the problems that hold you back on Google." },
      { to: "hosting-maintenance", text: "Operation and updates after launch." },
    ],
  },
  {
    id: "relaunch",
    name: "Website relaunch",
    summary: "A new website where every old address stays in place or redirects.",
    metaTitle: "Website Relaunch Without Losing Rankings",
    metaDescription:
      "A website relaunch with tested redirects: we check every old address, set up 301 redirects, and monitor Google indexing after launch.",
    title: "A website relaunch that protects your rankings",
    intro:
      "In a relaunch, pages that bring in enquiries today can disappear from Google. That is why we check every old address before the rebuild and monitor after launch whether Google picks up the new pages.",
    sections: [
      {
        heading: "Before the rebuild: check every address",
        paragraphs: [
          "We record every address of the old website and check content, page titles, error pages, crawler access, and how pages look on a phone. Google Search Console shows which pages bring in visitors today. We handle those pages first in the rebuild.",
          "The result is a list of all findings, sorted by urgency, and a table that sets where each old address will lead.",
        ],
      },
      {
        heading: "At launch: redirects and tests",
        paragraphs: [
          "Old addresses stay the same or redirect with a 301 to the right new page. We test every redirect before the new website goes live. We also plan for email inboxes and the domain, so no message gets lost during the move.",
        ],
      },
      {
        heading: "After launch: monitoring in Search Console",
        paragraphs: [
          "We submit the new sitemap and check which pages Google picks up, which errors appear, and how the main search terms develop. We fix problems directly. Nobody can guarantee rankings, and they can fluctuate for a while even after a clean relaunch.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A check of all old addresses with a list of findings",
        "A table of all redirects",
        "A new website with tested 301 redirects",
        "A submitted sitemap and indexing checks",
        "Source code, designs, content, and all logins",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "We know the scope after a first look at the old website. You then get a written proposal.",
      factors: [
        "Number of old addresses",
        "Scope of the new pages and text",
        "Moving the domain, hosting, and email",
        "Technical debt in the old website",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "We checked 64 addresses and recorded 45 findings. Today, all old addresses are reachable or redirect, and Google reports 32 of the 33 sitemap pages as indexed (as of 28 October 2026).",
      link: "See the reference",
    },
    faqs: [
      {
        id: "lose-rankings",
        question: "Will we lose our rankings in a relaunch?",
        answer:
          "The risk comes mainly from missing redirects and lost content, which is why we check every address. There is no guarantee, and rankings can fluctuate for a while after launch.",
      },
      {
        id: "keep-urls",
        question: "Do our addresses have to change?",
        answer:
          "No. Where an old address works well, we keep it. We only suggest a change if it improves the website’s structure, and we then redirect the old address.",
      },
      {
        id: "keep-email",
        question: "What happens to our email inboxes?",
        answer:
          "You can stay with your current provider or move them too. We settle this before launch, so no message gets lost during the switch.",
      },
    ],
    related: [
      { to: "technical-seo", text: "You can also get the technical check without a new website." },
      { to: "business-websites", text: "How we plan and build the new pages." },
      { to: "hosting-maintenance", text: "Operation and updates after the relaunch." },
    ],
  },
  {
    id: "landing-pages",
    name: "Landing pages",
    summary: "A dedicated page for each campaign, with exactly one goal.",
    metaTitle: "Landing Page Design and Development",
    metaDescription:
      "Get a landing page built: one page for one campaign, with one clear goal, fast on a phone, and with enquiry tracking for Google Ads and social ads.",
    title: "Get a landing page built",
    intro:
      "Anyone who clicks an ad should land on a page that picks up exactly that offer. We build landing pages with one goal and measure how many enquiries they bring in.",
    sections: [
      {
        heading: "One page, one goal",
        paragraphs: [
          "The heading, structure, and form lead to one step: a call, an enquiry, or a booking. The page picks up the words of the ad and answers the questions people still have before they decide, such as the process, the price, and the service area.",
          "It loads fast on a phone too, because you pay for every click.",
        ],
      },
      {
        heading: "Measure and improve",
        paragraphs: [
          "We set up the tracking at the same time. You see how many enquiries a campaign brings in and what an enquiry costs. We can test two versions of a page against each other if the campaign brings enough visitors.",
          "The pages work for campaigns on Google, Meta, and LinkedIn. We also run the campaigns themselves.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "Text and structure for one offer",
        "Design for phone and desktop",
        "A form or appointment booking",
        "Conversion tracking with consent",
        "Variants for testing, if the budget allows it",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a short conversation, you get a written proposal.",
      factors: [
        "Number of pages and variants",
        "Text, photos, and videos",
        "Forms and CRM connection",
        "Tracking setup",
      ],
    },
    faqs: [
      {
        id: "landing-vs-website",
        question: "Why isn’t our normal website enough?",
        answer:
          "A normal page often explains several services and offers many paths. A landing page picks up the offer from the ad and leads to one step. You pay less for visitors who don’t find what they came for.",
      },
      {
        id: "landing-domain",
        question: "Does the landing page run on our domain?",
        answer: "Yes, usually on your domain or a subdomain. It belongs to you, and you get all logins.",
      },
      {
        id: "landing-seo",
        question: "Does a landing page also rank on Google?",
        answer:
          "It is usually built for ads and has little text for that reason. If a page should appear in regular search long term, we plan it as a service page with more content.",
      },
    ],
    related: [
      { to: "google-ads", text: "The campaigns that bring visitors to the page." },
      { to: "ads-tracking", text: "How we measure which clicks become enquiries." },
      { to: "business-websites", text: "If you need more than a single page." },
    ],
  },
  {
    id: "online-shops",
    name: "Online shops",
    summary: "Shops where customers reach checkout quickly, connected to shipping and inventory.",
    metaTitle: "Online Shop Design and Development",
    metaDescription:
      "Get an online shop built: product pages, checkout, and payment methods, connected to shipping and inventory, with e-commerce tracking. The system fits your catalogue.",
    title: "Get an online shop built",
    intro:
      "We build shops for products, subscriptions, and digital goods. Customers reach payment quickly, and orders go straight into the software you already use.",
    sections: [
      {
        heading: "Ready-made shop system or custom build",
        paragraphs: [
          "We decide between a ready-made shop system and a custom build based on your catalogue, workflows, and budget. We do not commit to a system in advance. That is why we start with a conversation about products, variants, shipping, and what your team does every day.",
        ],
      },
      {
        heading: "From product to checkout",
        paragraphs: [
          "We build categories, product pages, search, cart, and checkout with the payment methods your customers use. Checkout stays short on a phone. Required details such as prices, shipping costs, and the right of withdrawal appear where customers need them.",
        ],
      },
      {
        heading: "Connections and tracking",
        paragraphs: [
          "Stock and orders run through your inventory system, so nobody maintains them twice. We connect your shipping providers. We set up e-commerce tracking and consent so you see which channels bring in revenue.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A shop with categories, product pages, and checkout",
        "Payment methods and shipping rules",
        "Connection to inventory and shipping",
        "Import of your product data",
        "E-commerce tracking with consent",
        "Training for your team and all logins",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation about your catalogue and workflows, you get a written proposal. Ongoing fees for the shop system and payment providers are listed separately.",
      factors: [
        "Number of products and variants",
        "Payment methods and shipping rules",
        "Connection to inventory and other software",
        "Ready-made system or custom build",
      ],
    },
    faqs: [
      {
        id: "shop-move",
        question: "Can you move our existing shop?",
        answer:
          "Yes. We carry over products, customers, and orders as far as the system allows, and we redirect old addresses to the new pages.",
      },
      {
        id: "shop-edit",
        question: "Can we manage products ourselves?",
        answer: "Yes. You change products, prices, and content yourself. After launch, we show your team how.",
      },
      {
        id: "shop-accessibility",
        question: "Does our shop have to be accessible?",
        answer:
          "Since 28 June 2025, many consumer shops in Germany fall under the German Accessibility Act (BFSG). We build shops that work with a keyboard and a screen reader, and we clarify with you whether the law applies to you.",
      },
    ],
    related: [
      { to: "accessibility", text: "What the German Accessibility Act means for shops." },
      { to: "google-ads", text: "Shopping campaigns for your products." },
      { to: "workflows", text: "Pass on orders and data automatically." },
    ],
  },
  {
    id: "accessibility",
    name: "Accessible websites",
    summary: "Websites and shops that also work with a keyboard and a screen reader.",
    metaTitle: "Accessible Website Design (BFSG and WCAG)",
    metaDescription:
      "Get an accessible website built or audited: contrast, forms, keyboard, and screen reader. Since 28 June 2025, Germany’s BFSG applies to many shops and online services.",
    title: "Get an accessible website built",
    intro:
      "We build and revise websites so people can also use them with a keyboard and a screen reader. Since 28 June 2025, the German Accessibility Act has required this of many shops and online services.",
    sections: [
      {
        heading: "Who the law applies to",
        paragraphs: [
          "The German Accessibility Act (BFSG) mainly covers offers for consumers, such as online shops and websites where customers can conclude a contract. Microenterprises that provide services are exempt.",
          "We discuss whether the law applies to you in the first conversation. This does not replace legal advice. The work pays off even without an obligation, because a clearly structured website is easier for every visitor to use.",
        ],
      },
      {
        heading: "What we check",
        paragraphs: [
          "We use the WCAG level AA criteria as the standard. We check contrast, form labels, heading order, image descriptions, and full keyboard operation. We add automated tests and manual tests with a screen reader.",
        ],
      },
      {
        heading: "What happens next",
        paragraphs: [
          "You get a list of the problems, sorted by urgency. We fix them ourselves or hand the list to your agency. For a new website, we plan accessibility from the start, which is usually simpler than correcting it later. We also draft the accessibility statement the law requires.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "An audit against the WCAG level AA criteria",
        "A list of problems, sorted by urgency",
        "Fixes in code and design",
        "A draft accessibility statement",
        "Tests with a keyboard and a screen reader",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a first look at the website, you get a written proposal.",
      factors: [
        "Number of page types",
        "Forms, checkout, and login",
        "Documents such as PDFs",
        "Audit only, or audit and fixes",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "The home page, the contact page, and the bathroom renovation page for Bad Nauheim score 100 for accessibility in every mobile Lighthouse measurement. Automated tests do not find every problem, so we also check by hand.",
      link: "See the reference",
    },
    faqs: [
      {
        id: "bfsg-applies",
        question: "Does the BFSG apply to our website?",
        answer:
          "That depends on whether you offer consumers a service, such as a shop or a contract you can conclude online, and on the size of your business. A purely informational website is often not covered. If in doubt, ask a legal adviser.",
      },
      {
        id: "lighthouse-enough",
        question: "Is a Lighthouse score of 100 enough?",
        answer:
          "No. Lighthouse finds only some of the problems. Only a manual test shows whether a form can really be completed with a screen reader.",
      },
      {
        id: "accessibility-existing",
        question: "Can you make an existing website accessible?",
        answer: "Usually, yes. After the audit, we tell you what can be fixed and where a rebuild would cost less.",
      },
    ],
    related: [
      { to: "online-shops", text: "Shops are among the offers the law covers." },
      { to: "relaunch", text: "Plan accessibility into the rebuild from the start." },
      { to: "customer-portals", text: "Portals must also work with a keyboard." },
    ],
  },
  {
    id: "hosting-maintenance",
    name: "Hosting and maintenance",
    summary: "Operation, updates, backups, and new features after launch.",
    metaTitle: "Website Maintenance and Hosting",
    metaDescription:
      "Website maintenance and hosting: we run your website, install updates, back up your data, and build new features. The website stays yours.",
    title: "Website maintenance and hosting",
    intro:
      "After launch, a website has to run securely and grow with your business. We take care of hosting, updates, and backups, and we build new pages and features.",
    sections: [
      {
        heading: "What we do on an ongoing basis",
        paragraphs: [
          "We run the website, install updates, back up the data, and monitor whether it is reachable. If something fails, we get an alert and deal with it. This applies to websites we built and, after a review, to existing websites too.",
        ],
      },
      {
        heading: "What you change yourself",
        paragraphs: [
          "You change text, images, and opening hours yourself in the content management system. We build new pages and features on the existing system, so you don’t have to start over.",
        ],
      },
      {
        heading: "You stay independent",
        paragraphs: [
          "The website belongs to you. You get the source code, designs, content, and all logins, and you can continue with another agency or in-house at any time. The domain and hosting are in your name.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "Hosting and uptime monitoring",
        "Updates and security fixes",
        "Regular backups",
        "A direct contact person when problems come up",
        "New pages and features as agreed",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "Ongoing costs are listed separately in the proposal. We quote larger extensions individually.",
      factors: [
        "Size and technology of the website",
        "Shop, login, and other features",
        "Frequency of updates and backups",
        "Scope of ongoing changes",
      ],
    },
    faqs: [
      {
        id: "take-over-existing",
        question: "Do you also take over websites others have built?",
        answer:
          "Yes. We first check the technology, the logins, and the state of the updates. We then tell you what we can take over and what has to be fixed first.",
      },
      {
        id: "cancel",
        question: "What happens if we end the contract?",
        answer: "You get all data and logins and can keep running the website with another provider.",
      },
      {
        id: "edit-without-us",
        question: "Do we have to ask you for every text change?",
        answer: "No. You change text and images yourself in the content management system. We show you how.",
      },
    ],
    related: [
      { to: "business-websites", text: "How we plan and build new websites." },
      { to: "technical-seo", text: "Find technical problems and fix them by urgency." },
    ],
  },
  {
    id: "web-apps",
    name: "Web apps",
    summary: "Browser applications your team or your customers use every day.",
    metaTitle: "Web App Development",
    metaDescription:
      "Get a web app developed: from a clickable prototype to a finished browser application, with login, roles, and connections to your software.",
    title: "Get a web app developed",
    intro:
      "A web app runs in the browser and needs no installation. We build applications for workflows that live in spreadsheets and emails today, and we connect them to your software.",
    sections: [
      {
        heading: "The prototype first",
        paragraphs: [
          "We write down who will use the application and which tasks it has to handle. We then create a clickable prototype that your team tests before we write any code. You see early whether the workflow is right, and changes cost little.",
        ],
      },
      {
        heading: "Then the application",
        paragraphs: [
          "We build login, roles and permissions, the database, and connections to the software you already use. We choose the technology based on the task and the number of users. We build in stages, so you regularly see a usable version.",
        ],
      },
      {
        heading: "Operation and further development",
        paragraphs: [
          "After launch, we take care of operation, monitoring, and backups, and we build new features. You get the source code and documentation and can also continue the application with others.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A clickable prototype for testing",
        "An application with login, roles, and permissions",
        "Connections to your existing software",
        "Operation, monitoring, and backups",
        "Source code and documentation",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After the prototype, the scope is easy to estimate. You get a written proposal, which can also be split into stages.",
      factors: [
        "Number of tasks and roles",
        "Connections to other software",
        "Data protection and security requirements",
        "Ongoing operation",
      ],
    },
    faqs: [
      {
        id: "web-vs-native",
        question: "A web app or an app from the app store?",
        answer:
          "A web app runs on any device without installation and is quicker to change. An app from the app store is worth it if you rely heavily on the camera, notifications, or offline use, or want to be found there.",
      },
      {
        id: "replace-excel",
        question: "Is a web app worth it compared with Excel?",
        answer:
          "Often it is when several people maintain the same data, errors are expensive, or customers should enter something themselves. For a few people and simple workflows, a spreadsheet or an automation is enough.",
      },
      {
        id: "web-app-owner",
        question: "Do we own the source code?",
        answer: "Yes. You get the source code, documentation, and all logins.",
      },
    ],
    related: [
      { to: "customer-portals", text: "If your customers should use the application." },
      { to: "mobile-apps", text: "If the application should go in the app store." },
      { to: "ai-features", text: "Build AI features into your application." },
    ],
  },
  {
    id: "customer-portals",
    name: "Customer portals",
    summary: "Customers book appointments, follow orders, and upload documents without calling.",
    metaTitle: "Customer Portal Development",
    metaDescription:
      "Get a customer portal built: customers book appointments, see the status of their orders, and upload documents. With secure login and connections to your software.",
    title: "Get a customer portal built",
    intro:
      "In a customer portal, your customers handle what they call or email about today. Your team works with the same data and maintains nothing twice.",
    sections: [
      {
        heading: "What customers do there",
        paragraphs: [
          "Typical tasks are booking appointments, seeing the status of an order, uploading and downloading documents, getting invoices, and writing messages. We start with the questions your team answers most often, because that is where the portal saves the most work.",
        ],
      },
      {
        heading: "Connection to your software",
        paragraphs: [
          "The portal pulls data from your CRM, inventory system, or accounting software and writes changes back. Customers see the same status as your team. If there is no interface, we look for another way and tell you beforehand what that means.",
        ],
      },
      {
        heading: "Security and data protection",
        paragraphs: [
          "Each customer sees only their own data. Before we build, we settle roles, storage location, deletion periods, and the providers involved. The portal works with a keyboard and a screen reader. We start with a clickable prototype that you can test with real customers.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A clickable prototype for testing",
        "A portal with secure login and customer accounts",
        "Connections to your CRM and other software",
        "Email notifications",
        "Operation, monitoring, and backups",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After the first conversation, you get a written proposal. It often makes sense to start with a few features.",
      factors: [
        "Number of features",
        "Connections to your existing software",
        "Roles and approvals",
        "Data protection requirements",
      ],
    },
    faqs: [
      {
        id: "portal-adoption",
        question: "Will our customers actually use a portal?",
        answer:
          "We test that with a prototype before we build. A portal works best when it shortens something customers do anyway, such as booking an appointment or finding an invoice.",
      },
      {
        id: "portal-data",
        question: "Where is the data stored?",
        answer:
          "We decide that with you before we build. We choose providers and storage location based on your legal requirements and document the decision.",
      },
      {
        id: "portal-website",
        question: "Is the portal part of our website?",
        answer: "It can run on its own address, such as portal.your-domain.com, and match the design of your website.",
      },
    ],
    related: [
      { to: "web-apps", text: "If the application is mainly for your team." },
      { to: "leads-crm", text: "Bring enquiries into your CRM automatically." },
      { to: "accessibility", text: "How we check accessibility." },
    ],
  },
  {
    id: "mobile-apps",
    name: "iOS and Android apps",
    summary: "Apps for iPhone and Android, from prototype to launch in the app store.",
    metaTitle: "App Development for iOS and Android",
    metaDescription:
      "Get an app developed for iOS and Android: clickable prototype, development, connections to your systems, and publication on the App Store and Google Play.",
    title: "Get an app developed for iOS and Android",
    intro:
      "We develop apps for iPhone and Android, from a clickable prototype to publication on the App Store and Google Play. First, we clarify whether you really need an app or whether a web app is enough.",
    sections: [
      {
        heading: "Do you need an app?",
        paragraphs: [
          "An app is worth it if people open it often or if it needs the camera, location, notifications, or offline use. For everything else, a web app is often cheaper and quicker to change. We tell you that even if it argues against a larger project.",
        ],
      },
      {
        heading: "One codebase or two",
        paragraphs: [
          "With a cross-platform solution, one codebase runs on both systems. That saves time and money. Native development for each system makes sense if the app needs a lot of computing power or very specific device features. We decide based on what your app has to do.",
        ],
      },
      {
        heading: "Publication and maintenance",
        paragraphs: [
          "We prepare the listings on the App Store and Google Play and see the app through review. New versions of iOS and Android can require changes, so we plan updates and bug fixes from the start.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A clickable prototype for testing",
        "An app for iOS and Android",
        "Connections to your data and software",
        "Publication on the App Store and Google Play",
        "Updates and bug fixes",
        "Source code and logins",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After the prototype, the scope is easy to estimate. You get a written proposal. Ongoing app store fees are listed separately.",
      factors: [
        "Number of features and screens",
        "Cross-platform or native",
        "Login, payment, and offline use",
        "Connections to other systems",
      ],
    },
    faqs: [
      {
        id: "app-vs-web",
        question: "Wouldn’t a web app be enough?",
        answer:
          "Often, yes. A web app runs in the browser without installation. An app from the app store is worth it if people open it often or if it needs device features such as notifications or offline use.",
      },
      {
        id: "app-store-account",
        question: "Whose name is the app listed under?",
        answer: "Yours. The Apple and Google accounts belong to you, and we set them up with you.",
      },
      {
        id: "app-existing",
        question: "Can you take over an existing app?",
        answer:
          "Yes. We first check the code, logins, and dependencies. We then tell you whether further development is worth it or a rebuild is better.",
      },
    ],
    related: [
      { to: "web-apps", text: "The alternative without installation." },
      { to: "customer-portals", text: "If customers mainly need to see orders and documents." },
      { to: "ai-features", text: "Build AI features into your app." },
    ],
  },
  {
    id: "desktop-apps",
    name: "Desktop apps",
    summary: "Programs for Windows and Mac, when the browser isn’t enough.",
    metaTitle: "Desktop App Development",
    metaDescription:
      "Get a desktop app developed for Windows and Mac: with access to files and devices, offline use, and automatic updates. Also as a replacement for old programs.",
    title: "Get a desktop app developed",
    intro:
      "We build programs for Windows and Mac when an application needs local files or devices, or has to run offline. We also replace old programs that nobody maintains anymore.",
    sections: [
      {
        heading: "When a desktop app is worth it",
        paragraphs: [
          "A desktop app makes sense if it processes large files, controls printers, scanners, or machines, or has to run without internet. If the browser is enough, we recommend a web app, because it needs no installation and is easier to change.",
        ],
      },
      {
        heading: "Replacing old programs",
        paragraphs: [
          "Many businesses work with programs that only run on one old computer or whose developer can no longer be reached. We write down what the program does today, carry over the data, and build a successor that keeps the familiar workflows where they work well.",
        ],
      },
      {
        heading: "Distribution and updates",
        paragraphs: [
          "We deliver an installation package for your computers and set up automatic updates. For connections to servers or other software, we settle access rights and backups in advance.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A clickable prototype for testing",
        "A program for Windows, Mac, or both",
        "Transfer of your existing data",
        "An installation package and automatic updates",
        "Source code and documentation",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation and the prototype, you get a written proposal.",
      factors: [
        "Number of features",
        "Windows, Mac, or both",
        "Connections to devices and other software",
        "Transfer of old data",
      ],
    },
    faqs: [
      {
        id: "desktop-vs-web",
        question: "A desktop app or a web app?",
        answer:
          "A web app is enough if users have internet and need no local devices or large files. A desktop app is worth it if that isn’t the case.",
      },
      {
        id: "old-software",
        question: "Our old program only runs on one computer. What should we do?",
        answer:
          "Back up the data first. We then check how it can be read and write down what the program does. After that, we plan the successor.",
      },
      {
        id: "desktop-mac-windows",
        question: "Does the program run on Windows and Mac?",
        answer: "We can do that with a shared codebase. If you only need one system, development is usually simpler.",
      },
    ],
    related: [
      { to: "web-apps", text: "The alternative without installation." },
      { to: "workflows", text: "Connect the program to your other software." },
    ],
  },
  {
    id: "technical-seo",
    name: "Technical SEO and audit",
    summary: "We find the problems that hold back Google and AI crawlers and sort them by urgency.",
    metaTitle: "Technical SEO and SEO Audit",
    metaDescription:
      "Technical SEO and SEO audit: we check crawling, indexing, redirects, loading time, and structured data. You get a list of findings sorted by urgency.",
    title: "Technical SEO and SEO audit",
    intro:
      "We check every address of your website and find the problems that hold back Google and AI crawlers. You get a list sorted by urgency. We fix the problems ourselves or hand the list to your agency.",
    sections: [
      {
        heading: "What we check",
        paragraphs: [
          "We check crawling and indexing, redirects, error pages, duplicate content, page titles, internal links, structured data, the robots.txt, the sitemap, and loading time on a phone. We also read your data from Google Search Console, because it shows which pages Google actually picks up.",
        ],
      },
      {
        heading: "What you have afterwards",
        paragraphs: [
          "Each finding names the affected pages, the consequence, and a specific instruction. The list is sorted by urgency, so you see what to fix now and what can wait. Many problems can be fixed quickly. We plan larger rebuilds as a separate project.",
        ],
      },
      {
        heading: "For AI crawlers too",
        paragraphs: [
          "We check whether crawlers such as GPTBot may read your pages and whether your host or firewall blocks them. A blocked website can hardly appear as a source in AI answers.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A check of every address on your website",
        "A list of findings sorted by urgency",
        "A specific instruction for each finding",
        "Fixes by us or a handover to your agency",
        "A check in Search Console after the fixes",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a first look at the website, you get a written proposal.",
      factors: [
        "Number of addresses",
        "The website’s technology",
        "Audit only, or audit and fixes",
        "Access to Search Console and the server",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "Across 64 checked addresses, we recorded 45 findings, including an error page linked from five pages and a robots.txt that blocked CSS and JavaScript. Google now reports 32 of the 33 sitemap pages as indexed (as of 28 October 2026).",
      link: "See the reference",
    },
    faqs: [
      {
        id: "audit-tool",
        question: "Isn’t an SEO tool enough?",
        answer:
          "A tool finds many technical problems but doesn’t say which ones matter for you. We check the results by hand and sort them by their effect on your pages.",
      },
      {
        id: "audit-access",
        question: "What access do you need?",
        answer:
          "For a complete audit, we need read access to Google Search Console. A first look is possible without access, because most checks run from the outside.",
      },
      {
        id: "audit-agency",
        question: "We already have an agency. Can this still work?",
        answer: "Yes. You get the list and can pass it on to your agency.",
      },
    ],
    related: [
      { to: "relaunch", text: "If the check points to a rebuild." },
      { to: "seo-content", text: "If the technology is fine but content is missing." },
      { to: "geo", text: "How your business appears in AI answers." },
    ],
  },
  {
    id: "local-seo",
    name: "Local SEO",
    summary: "So customers find you in Google Maps and in searches with a place name.",
    metaTitle: "Local SEO and Google Business Profile",
    metaDescription:
      "Local SEO for local businesses: Google Business Profile, location pages with real content, directory listings, and a simple way to get more reviews.",
    title: "Local SEO: get found in Google Maps",
    intro:
      "If you work locally, people find you through Google Maps and searches with a place name. We maintain your Google Business Profile, build location pages with real content, and help you get more reviews.",
    sections: [
      {
        heading: "Google Business Profile",
        paragraphs: [
          "We keep your profile complete: categories, services, opening hours, photos, and posts. We align your name, address, and phone number on your website and in business directories, so the same details appear everywhere.",
        ],
      },
      {
        heading: "Location pages with real content",
        paragraphs: [
          "Each important place gets its own page with content that only applies there, such as districts, distance, or local regulations. Pages where only the place name changes help neither customers nor Google. That is why we build only as many pages as we can fill with real details.",
        ],
      },
      {
        heading: "Reviews",
        paragraphs: [
          "We set up a simple way for you to ask satisfied customers for a review, for example with a link or a QR code. You reply to reviews yourself or with our draft. Bought or invented reviews are not part of our work.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A fully maintained Google Business Profile",
        "Consistent details in important directories",
        "Location pages with real content",
        "A link or QR code for reviews",
        "A report on calls, directions, and visits",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a short conversation, you get a written proposal.",
      factors: [
        "Number of locations and service areas",
        "State of your profile and website",
        "Number of new location pages",
        "One-time setup or ongoing maintenance",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "Four old location pages shared 85 to 90 percent of their text. The new pages name the distance, districts, the local supplier’s water hardness, and monument protection. Shared text: 19 to 28 percent.",
      link: "See the reference",
    },
    faqs: [
      {
        id: "local-no-office",
        question: "We don’t have a shop. Can local SEO still work?",
        answer:
          "Yes. Businesses that travel to their customers can also have a business profile with a service area, and pages for the important places.",
      },
      {
        id: "local-pages-count",
        question: "How many location pages should we have?",
        answer:
          "As many as you really work in and can fill with your own details. Many near-identical pages are more likely to hurt than help.",
      },
      {
        id: "local-reviews",
        question: "May we ask customers for reviews?",
        answer: "Yes. You may ask, but you may not offer anything in return or buy reviews.",
      },
    ],
    related: [
      { to: "seo-content", text: "Text for your service and location pages." },
      { to: "business-websites", text: "A website with its own page for each place." },
      { to: "google-ads", text: "Get visible while your rankings are still growing." },
    ],
  },
  {
    id: "geo",
    name: "AI visibility (GEO)",
    summary: "So ChatGPT, Perplexity, and Google’s AI Overview can find and name your business.",
    metaTitle: "GEO Agency: Visibility in ChatGPT and AI Search",
    metaDescription:
      "GEO and AI visibility: we check what ChatGPT, Perplexity, and Google’s AI Overview say about your business and make your details easy to cite.",
    title: "GEO: get visible in ChatGPT and AI answers",
    intro:
      "Some customers now ask an AI whom to hire. We check what ChatGPT, Perplexity, and Google’s AI Overview say about your business, and we make your details easy to find and cite.",
    sections: [
      {
        heading: "What GEO is",
        paragraphs: [
          "GEO stands for Generative Engine Optimization. The goal is for AI services to know and name your business when someone asks about your service. GEO builds on SEO and doesn’t replace it. A page that Google can’t find and crawlers may not read is also hard for an AI to use.",
        ],
      },
      {
        heading: "How we measure the current state",
        paragraphs: [
          "We ask AI services the questions your customers ask and record whom they name and which sources they cite. You see where your business is missing and which other sites shape the answers. AI answers fluctuate, so we repeat the measurement and look at the trend.",
        ],
      },
      {
        heading: "What we change",
        paragraphs: [
          "We give AI crawlers access, write clear answers to real questions, add structured data, and make details about services and location unambiguous. We also work on mentions on other sites, because AI services rely on several sources. Nobody can guarantee a specific mention.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A measurement of your visibility in AI answers",
        "A list of the sources AI services name",
        "A check of access for AI crawlers",
        "Revised content and structured data",
        "A plan for mentions on other sites",
        "Repeated measurement and a report",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a short conversation, you get a written proposal.",
      factors: [
        "Number of questions and services we measure",
        "State of the technology and content",
        "Scope of new content",
        "One-time check or ongoing work",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "OpenAI’s GPTBot crawler got a 429 error from the old host, and the robots.txt blocked important folders. Today, search engines and AI crawlers may read every page. This creates the precondition but does not guarantee a mention.",
      link: "See the reference",
    },
    faqs: [
      {
        id: "geo-vs-seo",
        question: "Do we need GEO in addition to SEO?",
        answer:
          "GEO adds to SEO. The basics are the same: reachable pages, clear content, and unambiguous details. On top of that come the measurement in AI services and the sources they rely on.",
      },
      {
        id: "geo-guarantee",
        question: "Can you guarantee a mention in ChatGPT?",
        answer:
          "No, nobody can. AI answers change with the question and the time. We improve the preconditions and measure whether your business is named more often.",
      },
      {
        id: "geo-block",
        question: "Should we block AI crawlers?",
        answer:
          "If you want to appear in AI answers, you should at least allow your public pages. You can exclude content you sell. We decide that together.",
      },
    ],
    related: [
      { to: "technical-seo", text: "The technology GEO builds on." },
      { to: "seo-content", text: "Content that answers questions clearly." },
    ],
  },
  {
    id: "seo-content",
    name: "SEO content",
    summary: "Pages for your customers’ search terms, from research to finished text.",
    metaTitle: "SEO Content Writing",
    metaDescription:
      "SEO content: we research what your customers search for, plan the pages, and write service pages and guides, with specialist details checked with you.",
    title: "SEO content that answers real questions",
    intro:
      "We find out what your customers search for and write the pages that are missing for it. We check specialist details with you, so every text is correct.",
    sections: [
      {
        heading: "Research",
        paragraphs: [
          "We analyze search terms, search volume, and the intent behind them: does someone want to buy, compare, or learn? We then look at what your competitors show for these terms and what your website already ranks for.",
          "You get a plan: which page covers which term, which new pages to create, and in what order. Terms with a lot of search volume but no intent to buy come far down the list.",
        ],
      },
      {
        heading: "Writing and revising",
        paragraphs: [
          "We write service pages and guides and revise existing pages. Each page gets its own title, a description, a logical heading order, and internal links. If several pages cover the same topic, we merge them.",
          "Before we write, we talk to you, because no text from the web can replace the experience from your projects. We use AI as an aid and publish only what a person has checked.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A list of search terms with search intent",
        "A plan: which page for which term",
        "Finished text or briefs for your team",
        "Page titles, descriptions, and internal links",
        "An analysis after publication",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After the research, we know how many pages are worth it. You get a written proposal.",
      factors: [
        "Number and length of the pages",
        "How specialized the topic is",
        "New text or revision",
        "One-time project or ongoing work",
      ],
    },
    faqs: [
      {
        id: "content-ai",
        question: "Do you write the text with AI?",
        answer:
          "AI helps us with research and drafts. We check every text and confirm specialist details with you. We do not publish unchecked AI text.",
      },
      {
        id: "content-length",
        question: "How long does an SEO text have to be?",
        answer:
          "There is no fixed length. A text is long enough when it answers the questions on the topic. We go by the questions your customers ask.",
      },
      {
        id: "content-time",
        question: "How much time do we need to plan for?",
        answer: "Usually one conversation per topic and one review of the draft. We handle the rest.",
      },
    ],
    related: [
      { to: "technical-seo", text: "If good pages don’t reach Google." },
      { to: "local-seo", text: "Content for your location pages." },
      { to: "geo", text: "How text becomes a source for AI answers." },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    summary: "Search and Shopping ads for people looking for your offer right now.",
    metaTitle: "Google Ads Agency: Campaigns and Management",
    metaDescription:
      "Google Ads from an agency: search terms, Search and Shopping campaigns, ad copy, and enquiry tracking. We review and take over existing accounts.",
    title: "Google Ads: ads for active searches",
    intro:
      "Google ads reach people who are looking for your offer right now. We build and manage Search and Shopping campaigns and measure what an enquiry costs.",
    sections: [
      {
        heading: "Building the campaigns",
        paragraphs: [
          "We research the search terms and estimate click prices in your industry and region. We then build Search campaigns, plus Shopping campaigns for online shops, write ad copy and assets, and set where the ads appear.",
        ],
      },
      {
        heading: "Ongoing management",
        paragraphs: [
          "We read the actual search terms, exclude the ones that don’t fit, and adjust bids and budgets. We test ads in variants. We use automated bidding when the account delivers enough reliable data.",
        ],
      },
      {
        heading: "Existing accounts",
        paragraphs: [
          "We review an existing account first: does it count real enquiries, what are you paying for right now, and does the page match the ad? We then decide what stays, what we clean up, and what we rebuild. The account and data stay with you.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "Research of search terms and click prices",
        "Search and Shopping campaigns",
        "Ad copy and assets",
        "Conversion tracking for enquiries and purchases",
        "A regular report with the cost per enquiry",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "Ad budget and our fee are listed separately in the proposal. You pay the budget directly to Google.",
      factors: [
        "Number of campaigns and offers",
        "New build or account takeover",
        "Tracking setup",
        "Scope of ongoing management",
      ],
    },
    faqs: [
      {
        id: "google-budget",
        question: "How much budget do we need for Google Ads?",
        answer:
          "That depends on click prices in your industry and region. Before launch, we estimate them and tell you which budget a meaningful test requires.",
      },
      {
        id: "google-vs-seo",
        question: "Google Ads or SEO?",
        answer:
          "Ads bring visitors immediately and stop when the budget stops. SEO takes longer and then brings visitors without click costs. Often both make sense: ads for the start, SEO for the time after.",
      },
      {
        id: "google-account-owner",
        question: "Who owns the Google Ads account?",
        answer: "You do. We work with access to your account. You keep all data, even if you change agencies.",
      },
    ],
    related: [
      { to: "landing-pages", text: "The page where the ad lands." },
      { to: "ads-tracking", text: "How we connect clicks and enquiries." },
      { to: "social-ads", text: "Reach people before they start searching." },
    ],
  },
  {
    id: "social-ads",
    name: "Social ads",
    summary: "Ads on Meta, LinkedIn, and other networks for people who aren’t searching yet.",
    metaTitle: "Social Ads Agency: Meta and LinkedIn",
    metaDescription:
      "Social ads on Facebook, Instagram, LinkedIn, and other networks: audiences, ads, retargeting, and enquiry tracking, measured by the cost per enquiry.",
    title: "Social ads on Meta, LinkedIn, and more",
    intro:
      "Social ads reach people before they start searching. We choose the networks based on your customers, design the ads, and measure the enquiries they bring in.",
    sections: [
      {
        heading: "The right network",
        paragraphs: [
          "For private customers, that is usually Facebook and Instagram. For business customers, it is more often LinkedIn. We check other networks if your customers are there. We choose audiences by region, interests, or profession.",
        ],
      },
      {
        heading: "New audiences and retargeting",
        paragraphs: [
          "We separate campaigns for new audiences from retargeting for people who have already visited your website. We adapt the format and message to the channel. We move budget to the placements that bring in enquiries.",
        ],
      },
      {
        heading: "Ads in variants",
        paragraphs: [
          "We write and design image and video ads. Each variant tests an assumption, for example whether the price or quick availability brings more enquiries. Ads lose effect over time, so we plan new ones regularly.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A choice of networks and audiences",
        "Image, video, and text ads in variants",
        "Campaigns for new audiences and retargeting",
        "Tracking with consent",
        "A regular report with the cost per enquiry",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "Ad budget and our fee are listed separately in the proposal. You pay the budget directly to the network.",
      factors: [
        "Number of networks",
        "Production of images and videos",
        "Tracking setup",
        "Scope of ongoing management",
      ],
    },
    faqs: [
      {
        id: "social-b2b",
        question: "Do social ads also work for B2B?",
        answer:
          "Yes, LinkedIn allows audiences by profession and industry. Clicks are often more expensive there, so we first check whether a test makes sense for your budget.",
      },
      {
        id: "social-organic",
        question: "Do you also manage our regular social media channels?",
        answer: "Our focus is paid ads. You can also use content from the ads on your own channels.",
      },
      {
        id: "social-tracking",
        question: "May we track without consent?",
        answer:
          "For marketing tracking, you usually need consent. We set up consent and tracking so the two work together.",
      },
    ],
    related: [
      { to: "google-ads", text: "Reach people who are actively searching." },
      { to: "landing-pages", text: "The page after the click." },
      { to: "ads-tracking", text: "Tracking with consent and platform signals." },
    ],
  },
  {
    id: "ads-tracking",
    name: "Tracking and conversion",
    summary: "You see which campaign brings in enquiries and what an enquiry costs.",
    metaTitle: "Conversion Tracking Setup",
    metaDescription:
      "Get conversion tracking set up: measure forms, calls, and purchases, with consent and the signals for Google and Meta. You see the cost per enquiry.",
    title: "Reliable conversion tracking",
    intro:
      "Without reliable tracking, you and the bidding strategies of Google and Meta decide on the wrong numbers. We set up tracking that connects ad spend to real enquiries and purchases.",
    sections: [
      {
        heading: "What we measure",
        paragraphs: [
          "We measure forms, calls, bookings, and purchases and agree with you what counts as a good enquiry. Clicks and page views alone say little. Where possible, we match enquiries with the outcome in your CRM, so you see which campaign leads to orders.",
        ],
      },
      {
        heading: "Consent and data protection",
        paragraphs: [
          "We set up consent so that choices are respected, and we pass Google and Meta the signals they may use on that basis. We also check whether your contact form works without marketing cookies. You clarify legal questions with your data protection adviser.",
        ],
      },
      {
        heading: "Reports that say something",
        paragraphs: [
          "The report shows spend, enquiries, cost per enquiry, and the next steps for each channel. We also explain where tracking has gaps, because visitors who decline cookies are missing from the data.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A review of your existing tracking",
        "Measurement of forms, calls, and purchases",
        "Consent and platform signals",
        "Matching with your CRM where possible",
        "A report with the cost per enquiry",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a look at your website and accounts, you get a written proposal.",
      factors: [
        "Number of websites and forms",
        "Number of ad accounts",
        "CRM connection",
        "One-time setup or ongoing maintenance",
      ],
    },
    proof: {
      heading: "Example: Handwerker.work",
      text: "On the old website, the contact form only worked if visitors allowed marketing cookies. Anyone who declined couldn’t send an enquiry. Today, the form works without cookie consent.",
      link: "See the reference",
    },
    faqs: [
      {
        id: "tracking-loss",
        question: "Why do Google Ads and Analytics show different numbers?",
        answer:
          "They count differently, for example in timing and in how they assign a channel. Visitors without consent add to the difference. We set which number applies to which decision.",
      },
      {
        id: "tracking-phone",
        question: "Can calls be measured too?",
        answer:
          "Yes. We measure clicks on the phone number and, if needed, calls through a dedicated number for the campaign.",
      },
      {
        id: "tracking-seo",
        question: "Do we need this without ads too?",
        answer:
          "Yes, if you want to know which pages and channels bring in enquiries. The same tracking also shows what SEO brings in.",
      },
    ],
    related: [
      { to: "google-ads", text: "Campaigns based on real enquiries." },
      { to: "leads-crm", text: "Bring enquiries into your CRM automatically." },
      { to: "landing-pages", text: "Pages whose enquiries can be measured." },
    ],
  },
  {
    id: "leads-crm",
    name: "Enquiries and CRM",
    summary: "New enquiries reach the right person immediately, without retyping.",
    metaTitle: "CRM Automation for Enquiries",
    metaDescription:
      "CRM automation: enquiries from your website, campaigns, and email land in your CRM automatically, get scored, and go to the right person.",
    title: "Bring enquiries into your CRM automatically",
    intro:
      "Enquiries from your website, campaigns, or email go automatically into your CRM and to the right person. Nobody retypes anything, and no enquiry gets left behind.",
    sections: [
      {
        heading: "From enquiry to the right person",
        paragraphs: [
          "The system creates the contact, adds missing data, scores the enquiry by request and urgency, and passes it on. The customer gets a confirmation immediately. An AI reads free text from forms and emails, and a simple rule handles fixed fields.",
        ],
      },
      {
        heading: "Follow-up and overview",
        paragraphs: [
          "If an enquiry sits untouched, the system sends a reminder. The pipeline status stays up to date. You see how many enquiries are open, where they come from, and which become orders. Proposals and callbacks stay with your team.",
        ],
      },
      {
        heading: "With the CRM you use",
        paragraphs: [
          "We connect the CRM you already use. If you don’t have one yet, we suggest one that fits your size. Before launch, we settle who can access which data and which providers are involved.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A written record of today’s workflow",
        "Automatic transfer from all channels",
        "Scoring and routing of enquiries",
        "Reminders and pipeline status",
        "Error alerts and documentation",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation about the workflow, you get a written proposal. Ongoing software costs are listed separately.",
      factors: [
        "Number of channels such as form, email, and campaign",
        "The CRM and its interfaces",
        "Rules and exceptions",
        "Use of AI",
      ],
    },
    faqs: [
      {
        id: "crm-which",
        question: "Which CRM do you recommend?",
        answer:
          "That depends on your size and workflows. If you already use one, we usually stay with it and connect it to your channels.",
      },
      {
        id: "crm-control",
        question: "Does the AI decide which enquiries we accept?",
        answer: "No. It sorts and prepares. Your team makes the decision.",
      },
      {
        id: "crm-existing-data",
        question: "What happens to our existing contacts?",
        answer: "We move them into the CRM and remove duplicates as far as they can be identified reliably.",
      },
    ],
    related: [
      { to: "documents-email", text: "Read emails and documents automatically." },
      { to: "ads-tracking", text: "See which campaign leads to orders." },
      { to: "customer-portals", text: "Customers see the status of their enquiry themselves." },
    ],
  },
  {
    id: "documents-email",
    name: "Documents and emails",
    summary: "AI reads emails, invoices, and forms and prepares them for your team.",
    metaTitle: "Automate Document Processing and Emails",
    metaDescription:
      "Process invoices, delivery notes, and emails automatically: AI reads the data, transfers it to the right software, and writes drafts. Your team checks.",
    title: "Automate document processing and emails",
    intro:
      "AI reads invoices, delivery notes, and emails, pulls out the important data, and transfers it to the right software. Your team checks the cases where the system is unsure.",
    sections: [
      {
        heading: "Documents",
        paragraphs: [
          "The system recognizes and files invoices, delivery notes, forms, and contracts. The important fields, such as supplier, amount, and date, go into your accounting software, ERP, or CRM. For uncertain documents, the system asks instead of guessing.",
        ],
      },
      {
        heading: "Emails",
        paragraphs: [
          "The inbox sorts itself by request and forwards messages to the person responsible. For common questions, the AI writes a draft that your team checks and sends. We only send automatically what you have approved in advance.",
        ],
      },
      {
        heading: "Test first, then use",
        paragraphs: [
          "We test with your real documents and measure how often the AI is right before the workflow goes live. You see in advance how much manual work remains. Before launch, we clarify which providers see the data and where it is stored.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A test with your real documents",
        "Reading and transfer of the data",
        "Sorting and reply drafts for emails",
        "A review step for uncertain cases",
        "Error alerts and documentation",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation and a look at sample documents, you get a written proposal. Ongoing AI model costs are listed separately.",
      factors: [
        "Number of document types",
        "Volume per month",
        "Software the data goes into",
        "Data protection requirements",
      ],
    },
    faqs: [
      {
        id: "documents-accuracy",
        question: "How reliably does the AI read our documents?",
        answer:
          "We measure that on your own documents before the workflow goes live. Uncertain cases go to your team, so errors don’t pass unnoticed.",
      },
      {
        id: "documents-gobd",
        question: "What about retention requirements?",
        answer:
          "The originals stay in the system where you have to keep them. We align the workflow with your tax adviser or your document system.",
      },
      {
        id: "email-auto-send",
        question: "Does the AI answer emails on its own?",
        answer:
          "Not by default. It writes drafts that your team checks. Simple confirmations can go out automatically if you approve that.",
      },
    ],
    related: [
      { to: "leads-crm", text: "Bring enquiries from emails into your CRM automatically." },
      { to: "workflows", text: "Pass data between programs automatically." },
      { to: "ai-assistants", text: "Answer questions about your documents with sources." },
    ],
  },
  {
    id: "workflows",
    name: "Workflows and integrations",
    summary: "Fixed rules take over repetitive steps, and your programs exchange data.",
    metaTitle: "Workflow Automation and Integrations",
    metaDescription:
      "Workflow automation: we connect your software through interfaces, take over repetitive steps with fixed rules, and monitor operation.",
    title: "Automate workflows and connect your software",
    intro:
      "Passing on data, creating tasks, notifying colleagues: fixed rules handle such steps reliably. We connect your software so nobody maintains data twice.",
    sections: [
      {
        heading: "The workflow first",
        paragraphs: [
          "We write down how the task runs today, where the exceptions are, and which decisions a person has to make. That gives us the triggers, rules, and approvals. We often find that a step can be removed entirely.",
        ],
      },
      {
        heading: "Rule or AI",
        paragraphs: [
          "For fixed rules, conventional automation is usually more reliable and cheaper than AI. We use AI when a task involves language or unstructured text. We choose the technology based on the software you use.",
        ],
      },
      {
        heading: "Operation",
        paragraphs: [
          "Access rights allow only what the workflow needs. Logs show what happened. If a step fails, your team gets a message and takes over by hand. You get documentation and can change the rules later.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A written record of the workflow and exceptions",
        "Automation with rules and approvals",
        "Interfaces between your programs",
        "Logs and error alerts",
        "Documentation and handover",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation about the workflow, you get a written proposal. Ongoing tool costs are listed separately.",
      factors: [
        "Number of programs",
        "Number of rules and exceptions",
        "Available interfaces",
        "Support during operation",
      ],
    },
    faqs: [
      {
        id: "workflow-replace",
        question: "Do we have to replace our software?",
        answer:
          "Usually not. We connect the software you already use first. We only suggest a rebuild if it is more stable and cheaper.",
      },
      {
        id: "workflow-no-api",
        question: "What if a program has no interface?",
        answer:
          "There are often other ways, such as a data export or a sync through email. We check this beforehand and tell you how reliable the route is.",
      },
      {
        id: "workflow-worth",
        question: "When is automation worth it?",
        answer:
          "When a task comes up often, follows fixed rules, and errors cost money. We work this out with you before we build anything.",
      },
    ],
    related: [
      { to: "leads-crm", text: "The most common starting point: enquiries into your CRM." },
      { to: "documents-email", text: "When text and documents are involved." },
      { to: "web-apps", text: "When you need an interface of your own." },
    ],
  },
  {
    id: "ai-assistants",
    name: "Internal AI assistants",
    summary: "Your team asks and gets an answer from your documents, with the source.",
    metaTitle: "AI Assistant for Businesses",
    metaDescription:
      "An AI assistant for your business: your team asks in plain language and gets answers from manuals and wikis, with sources and the right access permissions.",
    title: "An AI assistant for your business",
    intro:
      "Your team asks a question in plain language and gets an answer from your own documents. Every answer names its source, and each person sees only what they may see.",
    sections: [
      {
        heading: "What the assistant can do",
        paragraphs: [
          "The assistant searches manuals, proposals, contracts, or wikis and answers in plain language. Every answer names the document it comes from, so your team can check it. If it finds no source, it says so.",
        ],
      },
      {
        heading: "Access and data protection",
        paragraphs: [
          "The assistant shows only what the person asking may see. Before we build, we clarify which data it uses, where that data is stored, and which providers and models are involved. We choose the model based on risk and legal requirements.",
        ],
      },
      {
        heading: "Testing with real questions",
        paragraphs: [
          "We build assistants for specific roles, for example sales or support. Before your team uses one, we test it with real questions and measure how often the answers are right. After launch, we collect feedback and improve the sources.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "An assistant for one or more roles",
        "A connection to your documents",
        "Answers with sources",
        "Permissions by person or role",
        "A test with real questions and a quality measurement",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After a conversation, you get a written proposal. Ongoing AI model costs are listed separately.",
      factors: [
        "Volume and type of documents",
        "Connection to your systems",
        "Permissions",
        "Data protection requirements",
      ],
    },
    faqs: [
      {
        id: "assistant-training",
        question: "Is our data used to train AI models?",
        answer:
          "We choose providers and contracts under which your data is not used for training, and we document the decision.",
      },
      {
        id: "assistant-wrong",
        question: "What if the assistant says something wrong?",
        answer:
          "That can happen. That is why every answer names its source, and we measure quality with real questions. Important decisions stay with your team.",
      },
      {
        id: "assistant-vs-chatgpt",
        question: "Why not just use ChatGPT?",
        answer:
          "ChatGPT doesn’t know your internal documents and permissions. Your own assistant answers from your sources and shows only what the person may see.",
      },
    ],
    related: [
      { to: "documents-email", text: "Read and file documents automatically." },
      { to: "ai-features", text: "AI features for your customers." },
    ],
  },
  {
    id: "ai-features",
    name: "AI features",
    summary: "Features for your customers, such as a product advisor or a search that understands questions.",
    metaTitle: "Add AI to Your Website or App",
    metaDescription:
      "AI features for websites and apps: a product advisor, a search that understands questions, and more. We set quality criteria, connect the model, and measure costs.",
    title: "AI features for your website or app",
    intro:
      "A product advisor, a search that understands questions, or an assistant in the customer area: we build AI features for your customers and measure quality and costs.",
    sections: [
      {
        heading: "Set the task and the quality",
        paragraphs: [
          "We settle what the feature should do and how we measure its quality. That includes what it may not say or do. A prototype shows early whether the idea works, before you invest much.",
        ],
      },
      {
        heading: "Model and interface",
        paragraphs: [
          "We then connect the right model and build the interface into your website or app. We choose the model based on the task, costs, and data protection, and we keep it replaceable. Users see that they are talking to an AI.",
        ],
      },
      {
        heading: "Operation and costs",
        paragraphs: [
          "After launch, we measure usage, quality, and the cost per request. Limits protect you from misuse and unexpected bills. You see what the feature does and what it costs.",
        ],
      },
    ],
    deliverables: {
      heading: "What you get",
      items: [
        "A description of the task and quality criteria",
        "A prototype with a feasibility test",
        "Model connection and interface",
        "Protection against misuse and cost limits",
        "Measurement of quality, usage, and costs",
      ],
    },
    costs: {
      heading: "What determines the price",
      text: "After the prototype, you get a written proposal. Ongoing model costs depend on usage and are listed separately.",
      factors: ["Complexity of the task", "Data the feature accesses", "Interface and integration", "Expected usage"],
    },
    faqs: [
      {
        id: "ai-feature-model",
        question: "Which AI model do you use?",
        answer:
          "That depends on the task, costs, and data protection. We test several models and build the feature so the model can be changed later.",
      },
      {
        id: "ai-feature-cost",
        question: "What does ongoing operation cost?",
        answer: "That depends on usage. After the prototype, we estimate the cost per request and set limits.",
      },
      {
        id: "ai-feature-law",
        question: "Do we have to tell users about the AI?",
        answer:
          "In a chat with an AI, users should be able to recognize it, and the EU AI Act requires this in many cases. We build in the notice. You clarify the legal details with your adviser.",
      },
    ],
    related: [
      { to: "web-apps", text: "The application around the AI feature." },
      { to: "ai-assistants", text: "If the feature is meant for your team." },
    ],
  },
];

export default Object.fromEntries(entries.map((entry) => [entry.id, entry])) as Record<SubServiceId, SubServiceCopy>;
