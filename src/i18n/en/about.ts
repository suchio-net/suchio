import type { AboutCopy } from "../about";

const about = {
  sections: [
    {
      heading: "Web design, SEO, advertising, and automation",
      paragraphs: [
        [
          "We plan and build ",
          { text: "websites and web apps", to: "websites-apps" },
          " for businesses and keep looking after them after launch. With ",
          { text: "SEO and AI visibility", to: "seo-ai-visibility" },
          ", we make sure your pages appear on Google and in answers from AI assistants. We run ",
          { text: "ad campaigns", to: "paid-campaigns" },
          " on Google and social networks and judge them by the cost per enquiry. With ",
          { text: "automation", to: "ai-automation" },
          ", we connect forms, CRM, email, and documents, so nobody retypes enquiries by hand.",
        ],
        [
          "These services depend on each other. A slow website ranks worse and wastes paid clicks. An enquiry that sits in an inbox for two days is often lost. So we look at the whole path, from the search to the reply to your customer. The proposal still only includes what your project needs.",
        ],
      ],
    },
    {
      heading: "How we work",
      paragraphs: [
        [
          "We start with an audit of your website, your search data, and the path an enquiry takes today. For Handwerker.work, that meant all 64 addresses of the old website, Lighthouse measurements, and crawler access.",
        ],
        [
          "After that, data decides: search queries from Google Search Console, Lighthouse measurements, and feedback from your customers. When it comes to design, we explain our suggestions.",
        ],
        [
          "We don’t suggest a service just because we offer it. If you need a website, you get a proposal for a website. We only use a new tool if it solves a specific problem and we have tested it.",
        ],
      ],
    },
    {
      heading: "What we build belongs to you",
      paragraphs: [
        [
          "You get the source code, designs, content, and every login. You are not tied to us afterwards. You can continue the website with another agency or in-house.",
        ],
      ],
    },
    {
      heading: "Technology that fits your project",
      paragraphs: [
        [
          "We don’t commit to one system. A landing page needs different technology than an online shop with payment and shipping, a customer portal, or an app. We choose the technology by what your project has to do and who will maintain the content later.",
        ],
        [
          "For Handwerker.work, that was an Astro website on Cloudflare. On mobile, the new home page scores 100 instead of 65 in Lighthouse, and its largest element appears after 1.8 instead of 10.1 seconds.",
        ],
        [
          "Where possible, we measure enquiries without cookies and without a banner. Since 31 October, the Handwerker.work website counts calls, WhatsApp clicks, and sent forms.",
        ],
      ],
    },
    {
      heading: "One project in detail: Handwerker.work",
      paragraphs: [
        [
          "Handwerker.work is a renovation business in Bad Nauheim. We rebuilt its WordPress website without losing a single old address and have looked after SEO and further development since. At the end of October, Google had indexed 32 of 33 pages. ",
          { text: "The full case study", to: "reference" },
          " shows every finding and every step with its date.",
        ],
      ],
    },
    {
      heading: "From Hattersheim am Main, for businesses across Germany",
      paragraphs: [
        [
          "Our studio is in Hattersheim am Main, between Frankfurt, Wiesbaden, and Mainz. In the Rhine-Main area, we are happy to meet in person. We work with businesses in other regions and abroad by video call, phone, and email.",
        ],
      ],
    },
  ],
} satisfies AboutCopy;

export default about;
