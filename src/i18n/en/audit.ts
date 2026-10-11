import type { AuditUi } from "../audit-ui";

const audit = {
  label: "Individual website audit",
  date: "Checked on 8 September 2026",
  assessment: "Our assessment",
  findings: "What we would change",
  observation: "Observation",
  action: "Our proposal",
  priorities: "The order we would work in",
  flow: "A clearer enquiry journey",
  measurements: "Technical measurements",
  scores: ["Performance", "Accessibility", "Best Practices", "Technical SEO"],
  metricLabels: ["Largest Contentful Paint (LCP)", "Total Blocking Time (TBT)", "Cumulative Layout Shift (CLS)"],
  metricHelp: [
    "Up to 2.5 s is good. This is a simulated lab value, not a real visitor statistic.",
    "Time during which long tasks block the main thread. It does not replace real interaction measurement with INP.",
    "Up to 0.10 is good. The unitless value can include consent dialogs.",
  ],
  scoreNote:
    "These categories test different technical aspects. Even 100 points do not measure persuasive content or enquiry volume. There is no combined overall grade.",
  incomplete:
    "No reliable aggregate scores: both Lighthouse runs reached the loading time limit. We therefore do not publish a performance judgement derived from them.",
  methodology: "Scope and interpretation",
  method:
    "Public sample using Lighthouse 13.4.1, with browser, DOM and where needed HTTP checks. Each displayed result uses one mobile run per URL with a fresh profile, 412 × 823 CSS pixels, simulated Slow 4G and 4× CPU slowdown. Optional cookies were not deliberately accepted in the measurement run. Values can differ by device, connection and consent state.",
  search:
    "Direct Google searches were attempted but blocked by Google's bot challenge. General web search was also used. We claim no Google position or actual lost enquiries. We had no access to Search Console, Analytics or internal booking data. Forms and bookings were not submitted.",
  own: "Business implications are our professional assessment of observed usability, not measured revenue losses. Recommendations are implementation proposals whose effect needs checking afterwards.",
  validationTitle: "How we would verify improvements",
  validation:
    "Review the main journey from the first screen to an enquiry on phone and desktop, including keyboard use. Then compare several mobile runs under the same conditions. Enquiry or booking rates can only be assessed using lawfully collected operator data.",
  sources: "Sources and checked pages",
  sourcePage: "Checked website / technical source",
  report:
    "Local Lighthouse report and browser checks from 8 September 2026. Measurements are shown above; the report is available on request.",
  contactTitle: "Agree the first step together",
  contact: "Discuss this audit",
  email: "Send an email",
  privacy: "Privacy for postal outreach",
  websitePrivacy: "Website privacy",
  linkNote: "Prepared for the addressed business. This individual link is not password-protected and can be shared.",
  campaignTitle: "Privacy for postal outreach",
  campaignIntro:
    "Information under Article 14 GDPR about our individual website audits and one-off postal advertising.",
  privacySections: [
    [
      "Controller and contact",
      "Aleks Tsenov, suchio, Bergstraße 41, 65795 Hattersheim am Main, Germany. Email: contact@suchio.net. Phone: +49 176 42767348. You can also request this information on paper free of charge through these contacts.",
    ],
    [
      "Data and sources",
      "We use published business website content, company names, business contact and address details, and technical findings. Postal addresses come from voluntarily published business contact or store information and public business directories. Mandatory legal identification details are not used as address sources for postal advertising. The specific address source is available on request. The relevant website is named in the letter and individual audit, whose sources list the pages checked. We do not use private interest profiles, special categories of personal data or enriched contact lists.",
    ],
    [
      "Purpose and legal basis",
      "The purpose is a one-off introduction to relevant website services using an individual audit. Where information concerns natural persons, processing relies on Article 6(1)(f) GDPR. Our interest is limited, relevant business outreach. We consider reasonable expectations, minimise data to the business context and respect visible advertising objections. Public availability alone does not replace a balancing assessment.",
    ],
    [
      "Recipients and processing outside the EEA",
      "Suchio prints the letters at a copier in a dm store using USB or a smartphone and distributes them. No online printing service, CRM or address trading is used. The OpenAI service Codex is used to research and draft this campaign. Selected published business content and addresses are transmitted to OpenAI for that purpose. Processing outside the EEA may occur. Further information about OpenAI's processing is linked below.",
    ],
    [
      "Providing the audit",
      "The audit is available through an individual, hard-to-guess link on suchio.net, excluded from navigation and the sitemap and marked noindex. This is not password protection: anyone with the link can read and share that report. Recipient postal addresses are not published on audit pages. Cloudflare hosts the pages and processes content and technical access data. Our general privacy policy describes Cloudflare, transfers and website logs. Optional counting after explicit consent is described in the audit-measurement section. Without consent there is no such counting.",
    ],
    [
      "Retention",
      "Working files, print files and the online audit are removed after the campaign and a 30-day response period, unless a specific clarification or evidentiary need exists. Only necessary information is retained in that case. A minimal suppression record is kept for advertising objections. A minimal company-name, domain and processing-status record prevents duplicate outreach while needed for that purpose; it contains no postal addresses or report text. Deletion at the AI provider is requested separately and remains subject to its retention rules and legal exceptions. Subsequent enquiries follow the purposes and periods in our general privacy policy.",
    ],
    [
      "Your rights and advertising objections",
      "You can object to processing for direct marketing at any time without giving reasons. Email contact@suchio.net or write to the postal address above. We then stop using your data for direct marketing. Subject to legal conditions, you have rights of access, rectification, erasure and restriction. You may complain to a data protection authority, such as the Hessian Commissioner for Data Protection and Freedom of Information. There is no automated decision with legal or similarly significant effects.",
    ],
  ],
} satisfies AuditUi;

export default audit;
