// Brenneck Bad & Haustechnik, a fictional business in the made-up town of Erlenbrück.
// A single page; navigation jumps to its sections.
import { navItems, tfm as tfmContent, type Company, type Faq, type Review } from "../shared/content";
export * from "../shared/content";

export const base = "/examples/trades/brenneck-bad";

export const sections = {
  leistungen: `${base}#leistungen`,
  gebaeudebetreuung: `${base}#gebaeudebetreuung`,
  referenzen: `${base}#referenzen`,
  kontakt: `${base}#kontakt`,
};

export const serviceHref = (slug: string) => `${base}#${slug}`;

export const tfm = { ...tfmContent, href: sections.gebaeudebetreuung };

export const nav = navItems.map((item) => ({ ...item, href: sections[item.key] }));

export const company: Company = {
  name: "Brenneck Bad & Haustechnik",
  owner: "Jonas Brenneck",
  ownerRole: "Inhaber, Installateur- und Heizungsbauermeister",
  street: "Mühlbachweg 14",
  city: "Erlenbrück",
  phone: { display: "030 23125 418", href: "tel:+493023125418", e164: "+49 30 23125418" },
  whatsapp: { display: "0176 040690 18", href: "https://wa.me/4917604069018" },
  email: "info@brenneck-bad.example",
  hours: [
    { days: "Montag bis Freitag", short: "Mo–Fr", opens: "07:30", closes: "17:00" },
    { days: "Samstag", short: "Sa", opens: "09:00", closes: "13:00" },
  ],
  rating: { value: "4,9", count: 37 },
  credentials: "Sanitär, Heizung und Fliesen",
  since: 2009,
};

/** Districts of the made-up town, shown in the moving band. */
export const places = [
  "Altstadt",
  "Neustadt",
  "Weststadt",
  "Nordviertel",
  "Südring",
  "Am Mühlbach",
  "Lindenhöhe",
  "Gartenstadt",
  "Bahnhofsviertel",
  "Oberdorf",
  "Unterdorf",
  "Hafenviertel",
].map((name) => ({ name }));

// Invented for the concept and labelled as examples on the page.
export const testimonials: Review[] = [
  {
    author: "Katrin M.",
    quote: "Unser Bad war nach drei Wochen fertig, so wie im Plan. Jeden Freitag gab es ein kurzes Update, wie weit alles ist.",
    topic: "Komplettbad",
    stars: 5,
  },
  {
    author: "Dieter S.",
    quote: "Die Wanne ist raus, die Dusche ist bodengleich. Für meine Mutter ist das ein großer Unterschied.",
    topic: "Barrierefreie Dusche",
    stars: 5,
  },
  {
    author: "Aylin T.",
    quote: "Sehr saubere Baustelle. Abends war alles abgedeckt, und der Staub blieb im Bad.",
    topic: "Teilsanierung",
    stars: 5,
  },
  {
    author: "Marco R.",
    quote: "Das Angebot war genau, am Ende kam kein Posten dazu. Die Fliesen sind sauber verlegt.",
    topic: "Fliesen",
    stars: 5,
  },
  {
    author: "Helga W.",
    quote: "Die Heizung lief am Sonntag nicht mehr. Am Montag früh war jemand da und hat das Ventil getauscht.",
    topic: "Heizung",
    stars: 4,
  },
  {
    author: "Familie Ott",
    quote: "Wir haben das Bad im 3D-Plan gesehen, bevor es losging. So sieht es jetzt auch aus.",
    topic: "Badplanung",
    stars: 5,
  },
];

export const faqsHome: Faq[] = [
  {
    q: "Übernehmen Sie die komplette Badsanierung?",
    a: ["Ja. Vom Rückbau über Leitungen und Elektrik bis zu den Fliesen machen wir das ganze Bad und stimmen alle Gewerke ab."],
  },
  {
    q: "Wo sind Sie im Einsatz?",
    a: ["In allen Stadtteilen von Erlenbrück und in den Orten im Umkreis von etwa 25 Kilometern."],
  },
  {
    q: "Ist die Besichtigung kostenlos?",
    a: ["Ja. Besichtigung und Angebot kosten nichts und verpflichten Sie zu nichts."],
  },
  {
    q: "Wie frage ich ein Projekt an?",
    a: ["Per Telefon, WhatsApp oder E-Mail. Mit ein paar Fotos können wir den Aufwand schneller einschätzen."],
  },
];
