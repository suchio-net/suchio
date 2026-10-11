import { publicContactEmail, publicContactPhone, publicContactPhoneHref } from "@/lib/contact";
import { type LegalContent, updatedLabel, cloudflareLinks, resendLinks } from "../legal-shared";

const legal: LegalContent = {
  imprint: {
    eyebrow: "Legal",
    title: "Legal notice",
    intro: "Provider identification and contact details for Suchio.",
    updated: updatedLabel("en"),
    sections: [
      {
        id: "information-pursuant-to-section-5-ddg",
        title: "Information pursuant to section 5 DDG",
        paragraphs: ["Aleks Tsenov\nTrading name: Suchio\nBergstraße 41\n65795 Hattersheim am Main\nGermany"],
      },
      {
        id: "contact",
        title: "Contact",
        details: [
          { label: "Phone", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "Email", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "business-details",
        title: "Business details",
        paragraphs: ["Sole proprietorship not registered in the German commercial register.\nOwner: Aleks Tsenov"],
      },
      {
        id: "responsible-for-content",
        title: "Responsible for content",
        paragraphs: ["Aleks Tsenov\nBergstraße 41\n65795 Hattersheim am Main\nGermany"],
      },
      {
        id: "consumer-dispute-resolution",
        title: "Consumer dispute resolution",
        paragraphs: [
          "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    intro: "This policy explains how Suchio processes personal data when you visit the website or contact us.",
    updated: updatedLabel("en"),
    sections: [
      {
        id: "1-controller",
        title: "1. Controller",
        paragraphs: ["Aleks Tsenov\nSuchio\nBergstraße 41\n65795 Hattersheim am Main\nGermany"],
        details: [
          { label: "Phone", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "Email", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "2-hosting-delivery-and-server-logs",
        title: "2. Hosting, delivery, and server logs",
        paragraphs: [
          "The website is delivered through Cloudflare Workers and Cloudflare Static Assets. When you access the site, Cloudflare processes data including your IP address, date and time, requested URL, HTTP status, referrer, browser and device information, and technical network and security data. This processing supports secure and fast delivery, error analysis, and protection against misuse.",
          "The legal basis is Article 6(1)(f) GDPR. Our legitimate interest is the secure, stable, and efficient operation of this website. On the Workers Free plan currently in use, Workers logs are generally retained for up to three days and then deleted automatically unless they are exceptionally needed for longer to investigate a security incident or establish legal claims.",
          "The provider is Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA. Processing may take place outside the European Economic Area. Cloudflare relies on the EU-U.S. Data Privacy Framework and, where required, the EU Standard Contractual Clauses for transfers to the United States.",
        ],
        links: cloudflareLinks,
      },
      {
        id: "3-contact-form-and-email-communication",
        title: "3. Contact form and email communication",
        paragraphs: [
          "While you fill in the form, your draft is saved in this browser tab’s session storage so it survives page and language changes. It is not sent to us until you submit. The draft is removed after a successful submission or when the tab session ends. If browser storage is disabled, it remains only in the current page’s memory.",
          "When you contact us, we process the information you provide. This may include your name, email address, company, company website, selected service, budget range, message, and language. An invisible honeypot field is used only to prevent spam. The information is not stored in a separate website database.",
          "We process this information to handle and respond to your enquiry. Article 6(1)(b) GDPR applies where the enquiry concerns a contract or pre-contractual steps. In other cases, Article 6(1)(f) GDPR applies; our legitimate interest is responding appropriately to business enquiries.",
          "We use Resend, a service of Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA, to send the message. Resend processes at least sender and recipient addresses, message content, and delivery metadata and, according to its documentation, generally retains email data for 30 days. Transfers to the United States are safeguarded through the EU-U.S. Data Privacy Framework and the EU Standard Contractual Clauses.",
          "The enquiry also remains in the controller’s email inbox. We delete correspondence once the enquiry has been fully handled unless statutory retention duties or legitimate evidentiary interests require further storage. Please do not submit special categories of personal data under Article 9 GDPR through the form.",
        ],
        links: resendLinks,
      },
      {
        id: "4-language-preference",
        title: "4. Language preference",
        paragraphs: [
          "The website stores your chosen language in the “suchio-locale” cookie. It contains only the language code, applies across the website, and expires after one year. It is necessary to retain the language version you expressly selected for later visits.",
          "Storage does not require consent under section 25(2)(2) TDDDG. Where the language code can be linked to a person, Article 6(1)(f) GDPR is the legal basis. You can delete the cookie at any time in your browser settings.",
        ],
      },
      {
        id: "5-no-analytics-or-marketing-services",
        title: "5. Optional audit measurement",
        paragraphs: [
          "We use no advertising trackers or social media pixels. On individual audit pages you may voluntarily consent to counting a visit. Without consent no measurement entry is created. Details and withdrawal options appear below under optional measurement of audit visits.",
        ],
      },
      {
        id: "6-encryption",
        title: "6. Encryption",
        paragraphs: [
          "Data transmitted between your browser and the website is encrypted using HTTPS/TLS. You can recognise an encrypted connection by the lock symbol and “https://” in the address bar.",
        ],
      },
      {
        id: "7-your-rights",
        title: "7. Your rights",
        paragraphs: ["Where the statutory conditions are met, you have the following rights against the controller:"],
        items: [
          "Access to your personal data (Article 15 GDPR)",
          "Rectification of inaccurate data (Article 16 GDPR)",
          "Erasure (Article 17 GDPR)",
          "Restriction of processing (Article 18 GDPR)",
          "Data portability (Article 20 GDPR)",
          "Objection to processing based on legitimate interests (Article 21 GDPR)",
        ],
      },
      {
        id: "8-right-to-object",
        title: "8. Right to object",
        paragraphs: [
          "You may object to processing based on Article 6(1)(f) GDPR for reasons arising from your particular situation. We will then stop processing the relevant data unless compelling legitimate grounds or the establishment, exercise, or defence of legal claims override your interests.",
        ],
      },
      {
        id: "9-right-to-complain",
        title: "9. Right to complain",
        paragraphs: [
          "You may lodge a complaint with a data protection authority. The authority responsible for Suchio’s place of establishment is the Hessian Commissioner for Data Protection and Freedom of Information, Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Germany.",
        ],
        links: [{ href: "https://datenschutz.hessen.de/", label: "Hessian data protection authority" }],
      },
      {
        id: "10-providing-data-and-automated-decisions",
        title: "10. Providing data and automated decisions",
        paragraphs: [
          "Using the contact form is voluntary. Without the fields marked as required, we cannot process the enquiry through the form; you can still contact us by email or phone. We do not use automated decision-making, including profiling.",
        ],
      },
      {
        id: "11-changes-to-this-policy",
        title: "11. Changes to this policy",
        paragraphs: [
          "We update this privacy policy when the website, the services used, or legal requirements change. The version published on this page applies.",
        ],
      },
    ],
  },
};

export default legal;
