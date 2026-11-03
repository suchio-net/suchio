// Facts for both Johannes-Handwerk drafts. Source: the Suchio analysis of 2 November 2026,
// his current website, his Google profile and his MyHammer profile. Nothing here is invented;
// the figures marked "confirm" come from his website and need his confirmation before launch.

export const project = "/projekte/johannes-handwerk";
export const assetBase = project;

export const company = {
  name: "Johannes-Handwerk",
  owner: "Johannes Ciubotaru",
  slogan: "Wir packen an.",
  mobile: { display: "0176 81318236", href: "tel:+4917681318236" },
  landline: { display: "089 41172411", href: "tel:+498941172411" },
  email: "info@johannes-handwerk.de",
  // Google profile and imprint. The current website shows a second address (open question).
  street: "Dönnigesstraße 13",
  postalCode: "81379",
  city: "München",
  area: "München und Umgebung",
  imprint: "https://www.johannes-handwerk.de/impressum.html",
  privacy: "https://www.johannes-handwerk.de/datenschutz.html",
};

export const ratings = {
  asOf: "Stand: 2. November 2026",
  google: {
    platform: "Google",
    value: "5,0",
    count: 53,
    unit: "Rezensionen",
    href: "https://www.google.com/maps/search/?api=1&query=Johannes%20Handwerk&query_place_id=ChIJ-0u9NeXZnUcRrOQtSCxqxuQ",
  },
  myhammer: {
    platform: "MyHammer",
    value: "4,9",
    count: 84,
    unit: "Bewertungen",
    href: "https://www.my-hammer.de/auftragnehmer/johannes-handwerk/bewertungen",
  },
};

/** Figures from his current website. Confirm before launch. */
export const figures = [
  { value: "15+", label: "Jahre Handwerks­erfahrung" },
  { value: "2420+", label: "abgeschlossene Projekte" },
  { value: "24 h", label: "Antwortzeit auf Anfragen" },
];

/** Places named in his reviews. */
export const places = ["München", "Freimann", "Gauting", "Olching", "Ottobrunn", "Baldham", "Moosinning"];

export interface Review {
  quote: string;
  name?: string;
  place?: string;
  service?: string;
  platform: "Google" | "MyHammer";
}

/** The six MyHammer quotes from his current home page, as shown there. */
export const myhammerReviews: Review[] = [
  {
    quote:
      "Alle Arbeiten wurden zügig, zuverlässig und zu unserer vollsten Zufriedenheit erledigt. Besser geht es nicht!",
    name: "Herbert G.",
    service: "Zaunbau & Fundament",
    platform: "MyHammer",
  },
  {
    quote:
      "Seltenst ist uns ein Handwerker begegnet, der so schnell und sorgfältig zu einem passenden Preis ein Projekt umgesetzt hat.",
    name: "Andrea",
    place: "Gauting",
    service: "Terrassenbau",
    platform: "MyHammer",
  },
  {
    quote:
      "Johannes hatte für uns eine Baustelle nach Kernsanierung übernommen. Die Zusammenarbeit verlief sehr angenehm — gerne wieder.",
    name: "Thomas",
    place: "Olching",
    service: "Innenausbau",
    platform: "MyHammer",
  },
  {
    quote:
      "Endlich einen Handwerker gefunden, den wir guten Gewissens weiterempfehlen können. Termingerecht, professionell, gründlich.",
    name: "Korinna",
    place: "München",
    service: "Türen & Malerarbeiten",
    platform: "MyHammer",
  },
  {
    quote: "Pünktliche Ausführung und Leistung hat genau unserer Erwartungshaltung entsprochen.",
    name: "Philipp",
    place: "Ottobrunn",
    service: "Pflasterarbeiten",
    platform: "MyHammer",
  },
  {
    quote: "Sehr gute Kommunikation, schnell ausgeführt, ordentlich gearbeitet. Passt!",
    name: "MyHammer-Kunde",
    place: "Baldham",
    service: "Bodenverlegung",
    platform: "MyHammer",
  },
];

/** Verbatim excerpts from three named reviews on his Google profile, read on 3 November 2026.
 *  Google shows no place; Freimann comes from the review text. */
export const googleReviews: Review[] = [
  {
    quote:
      "Trotz wirklich grausigem Wetter wurde Alles pünktlich im Dezember vor unserem Einzugstermin innerhalb von zwei Tagen fertig!",
    name: "Jakob A.",
    place: "München-Freimann",
    service: "Pflasterarbeiten",
    platform: "Google",
  },
  {
    quote: "Der Auftrag wurde mit viel Tatkraft, in sehr kurzer Zeit und absolut zuverlässig umgesetzt.",
    name: "Reinhold K.",
    service: "Kellerabdichtung",
    platform: "Google",
  },
  {
    quote: "Johannes hat uns bei der Planung kompetent beraten. … Der Preis ist äußerst fair.",
    name: "Andreas K.",
    service: "Gartengestaltung",
    platform: "Google",
  },
];

/** The four steps from his current home page, written as "wir". */
export const process = [
  { title: "Anfrage stellen", text: "Rufen Sie an oder schreiben Sie uns. Schildern Sie kurz, was zu tun ist." },
  { title: "Vor-Ort-Termin", text: "Wir sehen uns die Situation an und besprechen die Möglichkeiten mit Ihnen." },
  { title: "Festpreis-Angebot", text: "Sie erhalten ein faires, unverbindliches Angebot ohne versteckte Kosten." },
  { title: "Umsetzung", text: "Termintreu, sauber und in der vereinbarten Qualität, bis zur Abnahme durch Sie." },
];

export interface ServiceGroup {
  key: string;
  name: string;
  summary: string;
  items: string[];
}

/** Service areas and sub-services from his five service pages. */
export const serviceGroups: ServiceGroup[] = [
  {
    key: "aussenanlagen",
    name: "Außenanlagen und Pflaster",
    summary: "Terrassen, Einfahrten und Wege aus Naturstein, Beton oder Verbundpflaster. Dazu Zäune und Fundamente.",
    items: [
      "Flächen, Wege und Innenhöfe pflastern",
      "Einfahrten und Stellplätze",
      "Terrassen",
      "Zäune und Sichtschutz",
      "Fundamente aller Art",
      "Terrassen-Überdachungen",
      "Rollrasen und Ansaat",
      "Gartenhäuser aufbauen",
    ],
  },
  {
    key: "innenausbau",
    name: "Boden und Innenausbau",
    summary: "Parkett, Laminat und Fliesen. Dazu Bad- und Küchensanierung, Trockenbau und Türen.",
    items: [
      "Parkett und Laminat verlegen",
      "Teppich, PVC und Linoleum",
      "Wand- und Bodenfliesen",
      "Fugen erneuern",
      "Bad- und Küchensanierung",
      "Trockenwandsanierung",
      "Türen einbauen und austauschen",
    ],
  },
  {
    key: "maler",
    name: "Maler- und Renovierungsarbeiten",
    summary: "Streichen, Tapezieren und Ausbessern, von der Einzelwand bis zur ganzen Wohnung.",
    items: [
      "Streicharbeiten und Wandanstrich",
      "Tapezierarbeiten",
      "Vertäfelung und Wandgestaltung",
      "Kleine und große Renovierungen",
      "Instandsetzungen",
    ],
  },
  {
    key: "abriss",
    name: "Abriss, Entkernung und Entsorgung",
    summary: "Wir reißen ab, räumen auf und entsorgen fachgerecht. Auch Erdaushub und Bauschutt.",
    items: [
      "Abrissarbeiten und Entkernung",
      "Abtransport und Entrümpelung",
      "Haushalts- und Geschäftsauflösung",
      "Erdaushub und Bauschutt entsorgen",
      "Hecken und Sträucher entfernen",
    ],
  },
];

export interface ExampleProject {
  title: string;
  /** Place from the review, if the review names one. */
  place?: string;
  photo: string;
  service: string;
}

/** Example projects: title and place come from his reviews. Photos are placeholders. */
export const exampleProjects: ExampleProject[] = [
  { title: "Pflasterung am Neubau", place: "München-Freimann", photo: "einfahrt-haus", service: "einfahrten" },
  { title: "Terrassenbau", place: "Gauting", photo: "terrasse-platten", service: "terrassen" },
  { title: "Pflasterarbeiten", place: "Ottobrunn", photo: "pflaster-verlegen", service: "pflasterarbeiten" },
  { title: "Zaunbau und Fundament", photo: "zaun-holz", service: "zaeune" },
  { title: "Neubau-Garten", photo: "weg-pflaster", service: "pflasterarbeiten" },
  { title: "Bodenverlegung", place: "Baldham", photo: "parkett", service: "innenausbau" },
  { title: "Innenausbau nach Kernsanierung", place: "Olching", photo: "boden-verlegen", service: "innenausbau" },
];

export const placeholderNote = "Platzhalter für Ihr Projektfoto";
