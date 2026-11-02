// Wendmark Sanierung, a fictional business in the made-up town of Talmünde.
// A page per navigation item.
import { navItems, tfm as tfmContent, type Company, type Faq, type Review } from "../shared/content";
export * from "../shared/content";

export const base = "/examples/trades/wendmark-sanierung";

export const tfm = { ...tfmContent, href: `${base}/gebaeudebetreuung` };

export const nav = navItems.map((item) => ({ ...item, href: `${base}/${item.key}` }));

export const company: Company = {
  name: "Wendmark Sanierung",
  owner: "Lena Wendmark",
  ownerRole: "Inhaberin, Installateur- und Heizungsbauermeisterin",
  street: "Gerberstraße 7",
  city: "Talmünde",
  phone: { display: "040 66969 237", href: "tel:+494066969237", e164: "+49 40 66969237" },
  whatsapp: { display: "0171 3920047", href: "https://wa.me/491713920047" },
  email: "kontakt@wendmark.example",
  hours: [
    { days: "Montag bis Freitag", short: "Mo–Fr", opens: "07:00", closes: "17:30" },
    { days: "Samstag", short: "Sa", opens: "08:00", closes: "12:00" },
  ],
  rating: { value: "4,8", count: 52 },
  credentials: "Sanitär, Heizung und Elektrotechnik",
  since: 2014,
};

/** Districts of the made-up town and its neighbouring villages, named on the contact page. */
export const places = [
  "Talmünde",
  "Altstadt",
  "Am Wehr",
  "Kirchberg",
  "Neue Mitte",
  "Schlossviertel",
  "Talaue",
  "Ostend",
  "Westend",
  "Oberdorf",
].map((name) => ({ name }));

// Invented for the concept and labelled as examples on the page.
export const testimonials: Review[] = [
  {
    author: "Sandra K.",
    quote:
      "Frau Wendmark hat uns das Bad im 3D-Plan gezeigt, bevor die erste Fliese raus war. Das fertige Bad sieht genauso aus.",
    topic: "Komplettbad",
    stars: 5,
  },
  {
    author: "Thomas B.",
    quote: "Wanne raus, bodengleiche Dusche rein, in neun Arbeitstagen. Die Handwerker haben jeden Abend aufgeräumt.",
    topic: "Barrierefreie Dusche",
    stars: 5,
  },
  {
    author: "Hausverwaltung Ruland",
    quote: "Wartung und kleine Reparaturen in vier Häusern laufen über einen Ansprechpartner. Die Berichte kommen pünktlich.",
    topic: "Gebäudebetreuung",
    stars: 5,
  },
  {
    author: "Mehmet A.",
    quote: "Neue Elektrik in der ganzen Wohnung, mit einem klaren Angebot vorher. Am Ende wurde es nicht teurer.",
    topic: "Elektro",
    stars: 5,
  },
  {
    author: "Ines F.",
    quote: "Der Kostenrechner auf der Website lag nah am späteren Angebot. So konnten wir früh planen.",
    topic: "Badsanierung",
    stars: 4,
  },
  {
    author: "Peter und Uta L.",
    quote: "Nach dem Wasserschaden waren sie am nächsten Morgen da. Trocknung, Estrich und Fliesen aus einer Hand.",
    topic: "Sanierung",
    stars: 5,
  },
];

export const faqsHome: Faq[] = [
  {
    q: `Übernimmt ${company.name} die komplette Badsanierung?`,
    a: ["Ja. Vom Rückbau über Leitungen und Elektrik bis zu den Fliesen machen wir das ganze Bad und stimmen alle Gewerke ab."],
  },
  {
    q: "Übernehmen Sie auch Sanierungen ganzer Wohnungen?",
    a: ["Ja. Wir sanieren Wohnungen und Häuser, mit einem Ansprechpartner für alle Arbeiten."],
  },
  {
    q: "Wo sind Sie im Einsatz?",
    a: [`In ${company.city} und den Orten im Umkreis von etwa 30 Kilometern.`],
  },
  {
    q: "Ist die Besichtigung kostenlos?",
    a: ["Ja. Besichtigung und Angebot kosten nichts und verpflichten Sie zu nichts."],
  },
  {
    q: "Wie frage ich ein Projekt an?",
    a: ["Über das Anfrageformular, per Telefon, WhatsApp oder E-Mail. Mit ein paar Fotos können wir den Aufwand schneller einschätzen."],
  },
];
