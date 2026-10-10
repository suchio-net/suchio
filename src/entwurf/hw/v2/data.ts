// Content for the handwerker.work draft. Every business statement comes from the
// client's current website (audit of 08.10.2026, tmp/hw-assets/facts.md); legal and
// subsidy facts come from the October 2026 research. Values still to be confirmed
// by the client are flagged through pitch notes, not invented.

import { googleRating } from "../google-reviews";
export { google, googleReviews as testimonials } from "../google-reviews";

export const base = "/entwurf/hw/v2";
export const assetBase = "/entwurf/handwerker-work";
export const liveOrigin = "https://handwerker.work";

export const company = {
  name: "Handwerker.work",
  owner: "Cenk Aybas",
  ownerRole: "Geschäftsführer",
  street: "Bad Nauheimer Str. 13",
  postalCode: "61231",
  city: "Bad Nauheim",
  region: "Hessen",
  geo: { lat: 50.39571, lng: 8.74696 },
  phone: { display: "069 260 292 09", href: "tel:+496926029209", e164: "+49 69 26029209" },
  whatsapp: { display: "0176 806 682 93", href: "https://wa.me/4917680668293" },
  email: "info@handwerker.work",
  // Footer version of the current site; its structured data claims 7 days 09–17.
  hours: [
    { days: "Montag bis Freitag", short: "Mo–Fr", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:30" },
    { days: "Samstag", short: "Sa", schemaDays: ["Saturday"], opens: "09:00", closes: "15:00" },
  ],
  rating: googleRating,
  credentials: "Elektrotechnik, Sanitär-Heizung und Fliesen",
} as const;

export interface Faq { q: string; a: string[] }
export interface Group { title: string; items: string[] }

export interface Service {
  slug: string;
  name: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  summary: string;
  image: string;
  imageAlt: string;
  gallery: { name: string; alt: string }[];
  groups: Group[];
  points?: { title: string; items: string[]; sequence?: boolean };
  faqs: Faq[];
  livePath: string;
  formValue: string;
}

const pflege = "Bei anerkanntem Pflegegrad kann die Pflegekasse einen barrierefreien Badumbau mit bis zu 4.180 € je Maßnahme bezuschussen (§ 40 Abs. 4 SGB XI). Den Antrag stellen Sie vor Beginn der Arbeiten.";
const kfw = "Der KfW-Zuschuss 455-B nimmt seit dem 31.07.2026 keine Anträge mehr an. Der zinsgünstige KfW-Kredit 159 „Altersgerecht Umbauen“ bleibt möglich. Stand: Oktober 2026.";
const steuer = "Ja. Nach § 35a EStG mindern 20 % der Arbeitskosten Ihre Einkommensteuer, höchstens 1.200 € im Jahr. Voraussetzung sind eine Rechnung und die Zahlung per Überweisung. Für Maßnahmen, die mit einem zinsverbilligten Darlehen oder steuerfreien Zuschuss gefördert werden, entfällt der Bonus.";

export const services: Service[] = [
  {
    slug: "badsanierung",
    name: "Badsanierung",
    nav: "Badsanierung",
    title: "Badsanierung Bad Nauheim & Wetterau – Komplettbad aus einer Hand | Handwerker.work",
    description: "Badsanierung vom Meisterbetrieb in Bad Nauheim, Friedberg und der Wetterau: Sanitär, Elektro, Fliesen und Boden aus einer Hand. Kostenrechner, 3D-Planung, kostenlose Besichtigung.",
    h1: "Badsanierung in Bad Nauheim und der Wetterau",
    intro: [
      "Als Meisterbetrieb und Generalunternehmen übernehmen wir einzelne Arbeiten genauso wie die komplette Badsanierung. Sanitär, Elektro, Fliesen, Boden und Innenausbau werden zentral koordiniert.",
      "Sie müssen nicht für jeden Arbeitsschritt einen anderen Betrieb suchen. Auch in Frankfurt und im Rhein-Main-Gebiet.",
    ],
    summary: "Komplettbad oder Teilsanierung, bodengleiche Duschen, barrierefreie Bäder.",
    image: "bad-eckwanne",
    imageAlt: "Saniertes Bad mit Eckwanne, wandhängendem WC, Bidet und Aufsatzwaschbecken",
    gallery: [
      { name: "bad-doppelwaschtisch", alt: "Bad mit Doppelwaschtisch, wandhängendem WC und Holzoptik-Boden im Fischgrätmuster" },
      { name: "bad-mosaik", alt: "Bad mit Mosaikfliesen, weißem Handtuchheizkörper und Einbauwanne" },
      { name: "dusche-nische", alt: "Begehbare Glasdusche mit Mosaikband und Wandnische" },
    ],
    groups: [
      { title: "Komplettbad", items: ["Planung und 3D-Visualisierung", "Komplette Badsanierung inklusive Entkernung", "Barrierefreie Badgestaltung", "Bodengleiche Duschen", "Regendusche und Wellness-Elemente", "Badmöbel und Spiegelschränke", "Beleuchtungskonzepte", "Lüftung und Entfeuchtung"] },
      { title: "Modernisierung", items: ["Umbau von Wanne zu Dusche", "Austausch von Sanitärobjekten und Armaturen", "Fugensanierung und Silikon", "Reparatur von Wasserschäden"] },
      { title: "Alle Gewerke im Bad", items: ["Sanitär-, Heizungs- und Wasserinstallation", "Fliesen, Großformat und Naturstein", "Estrich, Boden und elektrische Fußbodenheizung", "Steckdosen, Beleuchtung und Lichtkonzepte", "Trockenbau, Spachtel- und Malerarbeiten", "Rückbau, Entsorgung und Entrümpelung"] },
    ],
    points: { title: "So läuft eine Badsanierung ab", sequence: true, items: ["Beratung und Konzeptentwicklung", "Planung und Budgetfestlegung", "Abbruch und Vorbereitung", "Installationen und Fliesenarbeiten", "Einbau von Sanitäreinrichtungen und Armaturen", "Abschlussarbeiten und Qualitätskontrolle"] },
    faqs: [
      { q: "Was kostet eine Badsanierung?", a: ["Das hängt von Größe, Zustand der Leitungen, Ausstattung, Fliesen und Sanitärobjekten ab. Eine Marktübersicht (Aroundhome, Stand 02/2026) nennt rund 1.200 € pro Quadratmeter für eine Standardausstattung und rund 2.000 € für gehobene Bäder. Ein verbindliches Angebot erhalten Sie nach der kostenlosen Besichtigung."] },
      { q: "Muss ich Fliesenleger, Installateur und Elektriker selbst beauftragen?", a: ["Nein. Wir koordinieren die beteiligten Gewerke als Generalunternehmen. Sie haben einen festen Ansprechpartner für das gesamte Bad."] },
      { q: "Welche Zuschüsse gibt es für ein barrierefreies Bad?", a: [pflege, kfw] },
      { q: "Kann ich die Handwerkerkosten von der Steuer absetzen?", a: [steuer] },
    ],
    livePath: "/badsanierung-bad-nauheim/",
    formValue: "bad",
  },
  {
    slug: "sanitaer-heizung",
    name: "Sanitär & Heizung",
    nav: "Sanitär & Heizung",
    title: "Sanitär, Heizung & Klima vom SHK-Meisterbetrieb | Handwerker.work",
    description: "Heizungs- und Sanitäranlagen aus einer Hand: Trinkwasser, Abwasser, Fußbodenheizung, Wärmepumpen und Heizungsregelung. Kostenlose Bestandsaufnahme vor Ort.",
    h1: "Sanitär, Heizung und Klima",
    intro: [
      "Moderne Heizungs- und Sanitäranlagen aus einer Hand, vom ersten Konzept bis zur Ausführung. Seit über acht Jahren als SHK-Meisterbetrieb in Frankfurt und im Main-Taunus-Kreis tätig.",
      "Der Besuch zur Bestandsaufnahme und das Angebot sind kostenlos und unverbindlich. Sie erhalten eine transparente Kostenaufstellung ohne versteckte Gebühren. Erst dann entscheiden Sie.",
    ],
    summary: "Trinkwasser und Abwasser, Fußbodenheizung, Wärmepumpen und Heizungsregelung.",
    image: "fussbodenheizung",
    imageAlt: "Verlegte Rohre einer Fußbodenheizung vor dem Estrich",
    gallery: [
      { name: "vorwand-rohbau", alt: "Vorwandinstallation mit WC-Element und Rohrleitungen" },
      { name: "bad-wc-fertig", alt: "Fertiges Bad mit wandhängendem WC und grauen Großformatfliesen" },
    ],
    groups: [
      { title: "Sanitär", items: ["Trinkwasser- und Abwasserinstallation", "Sanitärobjekte und Armaturen", "Legionellenprüfung", "Hebeanlagen", "Rohr- und Kanalreinigung", "Dichtheitsprüfung nach DIN EN 1610"] },
      { title: "Heizung und Warmwasser", items: ["Fußboden-, Wand- und Deckenheizung", "Wärmepumpen mit Eignungsprüfung und Dimensionierung", "Heizungsregelung mit Smart-Home-Integration und Fernwartung", "Speicher, Durchlauferhitzer, Solarthermie und Frischwasserstation", "Hydraulischer Abgleich"] },
      { title: "Service und Wartung", items: ["Störungsbehebung", "Rohrbruch- und Leckageortung", "Heizungswartung und Wartungsverträge", "Wartungsberichte"] },
    ],
    points: { title: "Worauf Sie sich verlassen können", items: ["Normgerechte Umsetzung nach geltenden DIN-Vorgaben", "Schalloptimierte Installation", "Wartungsfreundliche Leitungsführung", "Langlebige Markenprodukte aus dem Fachhandel", "Qualitätssicherung mit vollständiger Dokumentation"] },
    faqs: [
      { q: "Muss ich meine funktionierende Öl- oder Gasheizung austauschen?", a: ["Nicht pauschal. Oft ist ein Teilaustausch oder eine Reparatur wirtschaftlicher als eine neue Anlage. Seit dem 29.07.2026 gilt das Gebäudemodernisierungsgesetz, das das GEG ersetzt. Welche Regeln für Ihr Gebäude gelten, klären wir technologieoffen bei der Beratung."] },
      { q: "Lohnt sich eine Wärmepumpe?", a: ["Das hängt vom Gebäude und vom Wärmebedarf ab. Wir prüfen die Eignung und dimensionieren die Anlage passend. Bei Fernwärme kommt es zusätzlich auf den Netzbetreiber an."] },
      { q: "Brauchen Klimaanlage oder Wärmepumpe eine Genehmigung?", a: ["Je nach Abmessung, Schall und Sichtbarkeit kann nach der Hessischen Bauordnung eine Genehmigung nötig sein. Das klären wir vor der Installation."] },
    ],
    livePath: "/sanitar/",
    formValue: "sanitaer",
  },
  {
    slug: "elektro",
    name: "Elektroinstallation",
    nav: "Elektro",
    title: "Elektroinstallation vom Meisterbetrieb in Wetterau & Frankfurt | Handwerker.work",
    description: "Elektroinstallation für Alt- und Neubau: Grundinstallation nach DIN VDE 0100, Beleuchtung, Smart Home, Netzwerk, Wallbox und Photovoltaik. Kostenvoranschlag vor Ort.",
    h1: "Elektroinstallation für Altbau und Neubau",
    intro: [
      "Vom zusätzlichen Steckdosenkreis bis zur kompletten Elektrik eines Hauses: Wir verkabeln, installieren und prüfen nach DIN VDE 0100.",
      "Den Aufwand schätzen wir nicht pauschal. Nach einer Begehung erhalten Sie einen Kostenvoranschlag.",
    ],
    summary: "Grundinstallation, Beleuchtung, Smart Home, Netzwerk und Wallbox.",
    image: "elektro-raum",
    imageAlt: "Ausgebauter Raum mit neuer Elektroinstallation, Wandleuchte und Einbauschränken",
    gallery: [],
    groups: [
      { title: "Grundinstallation", items: ["Verkabelung im Alt- und Neubau nach DIN VDE 0100", "FI/LS-Schutz und Potentialausgleich", "Überspannungsschutz", "E-Check", "Steckdosen und Schalter, auch für Feuchträume", "Fehlersuche und Reparatur"] },
      { title: "Licht und Smart Home", items: ["LED-Beleuchtung, Lichtspots und Strips", "Außen- und Notbeleuchtung", "Smart Home mit KNX, WLAN, Zigbee oder Z-Wave", "Sprachsteuerung und Zeitschaltuhren", "Bewegungsmelder"] },
      { title: "Netzwerk und Sicherheit", items: ["Netzwerk mit Cat 6/7 und WLAN-Accesspoints", "SAT, Kabel und Multiroom", "Telefon- und Türsprechanlagen", "Alarmanlagen und IP-Kameras", "Rauch- und CO-Melder"] },
      { title: "Energie", items: ["Wallbox mit Lastmanagement", "Photovoltaik und Wechselrichter", "Batteriespeicher und Energiemanagement"] },
    ],
    faqs: [
      { q: "Was kostet die Elektrik für ein Haus?", a: ["Das hängt von Größe, Umfang und Technik ab. Nach einer Begehung erhalten Sie einen genauen Kostenvoranschlag."] },
      { q: "Warum sollte die Elektroanlage regelmäßig geprüft werden?", a: ["Eine regelmäßige Prüfung wie der E-Check senkt das Ausfallrisiko, verlängert die Lebensdauer der Anlage und erhöht die Sicherheit."] },
      { q: "Lässt sich Smart Home in einen Altbau nachrüsten?", a: ["Ja. Funklösungen wie Zigbee oder Z-Wave kommen oft ohne neue Leitungen aus. Für eine Neuinstallation eignet sich KNX. Wir beraten Sie, was zu Ihrem Haus passt."] },
    ],
    livePath: "/elektriker-gesucht/",
    formValue: "elektro",
  },
  {
    slug: "fliesen",
    name: "Fliesenarbeiten",
    nav: "Fliesen",
    title: "Fliesenleger vom Meisterbetrieb in Wetterau & Frankfurt | Handwerker.work",
    description: "Fliesenarbeiten vom Meisterbetrieb: Wand- und Bodenfliesen, Großformat, Feinsteinzeug, Mosaik und Naturstein, Abdichtung nach DIN 18534. Bad Nauheim, Friedberg, Bad Homburg, Frankfurt.",
    h1: "Fliesenarbeiten vom Meisterbetrieb",
    intro: [
      "Wir planen, schneiden und verlegen Fliesen nach Ihren Wünschen, von der Wand im Bad bis zum großformatigen Boden.",
      "In Bad Nauheim, Friedberg, Bad Homburg, Frankfurt und den umliegenden Orten.",
    ],
    summary: "Großformat, Feinsteinzeug, Mosaik und Naturstein, abgedichtet nach DIN 18534.",
    image: "fliesen-verlegung",
    imageAlt: "Wand im Bad wird im Chevron-Muster gefliest, mit Fliesenkreuzen",
    gallery: [
      { name: "fliesen-stemmen", alt: "Alte Bodenfliesen werden mit Hammer und Meißel entfernt" },
      { name: "naturstein-wand", alt: "Wand und Säule mit Natursteinverblendung" },
      { name: "fliesen-nische-rohbau", alt: "Wandfliesen mit Fliesenkreuzen und vorbereiteter Nische" },
    ],
    groups: [
      { title: "Verlegung", items: ["Wand- und Bodenfliesen", "Großformat und Feinsteinzeug", "Mosaik und Bordüren", "Naturstein", "Fliesenspiegel in der Küche", "Spezialverlegungen"] },
      { title: "Nassbereiche", items: ["Bad, Dusche und Küche", "Abdichtung nach DIN 18534", "Verfugung mit Zement, Epoxid und Silikon"] },
      { title: "Reparatur", items: ["Ersatz beschädigter Fliesen", "Fugen erneuern", "Pflege von Naturstein"] },
    ],
    faqs: [
      { q: "Was kostet ein Fliesenleger?", a: ["Das hängt vom Material, vom Format und vom Aufwand der Verlegung ab. Wir sehen uns die Fläche an und nennen Ihnen danach einen Preis."] },
      { q: "Kann man neue Fliesen auf alte Fliesen legen?", a: ["Das ist möglich, wenn der alte Belag fest haftet und tragfähig ist. Wir prüfen das vorher und grundieren bei Bedarf."] },
      { q: "Matte oder glänzende Fliesen?", a: ["Glänzende Fliesen zeigen Flecken und Kalk stärker. Matte Fliesen verzeihen mehr, können in porösen Oberflächen aber Schmutz halten."] },
    ],
    livePath: "/fliesenleger-frankfurt-rhein-main/",
    formValue: "fliesen",
  },
  {
    slug: "renovierung",
    name: "Renovierung & Innenausbau",
    nav: "Renovierung",
    title: "Renovierung, Sanierung & Innenausbau aus einer Hand | Handwerker.work",
    description: "Renovierung und Komplettsanierung in Bad Nauheim, der Wetterau und Frankfurt: Kernsanierung, Trockenbau, Estrich, Böden, Parkett und Malerarbeiten aus einer Hand.",
    h1: "Renovierung, Sanierung und Innenausbau",
    intro: [
      "Wir renovieren und sanieren Wohnungen, Häuser und Gewerbeflächen, vom einzelnen Raum bis zur Kernsanierung. Sie haben einen festen Ansprechpartner, der alle Arbeiten koordiniert.",
      "Unsere Kalkulation ist transparent und für Sie jederzeit nachvollziehbar.",
    ],
    summary: "Kernsanierung, Trockenbau, Estrich, Böden und Malerarbeiten.",
    image: "renovierung-raum",
    imageAlt: "Raum während der Renovierung mit neuem Wandanstrich, Heizkörpern und Leiter",
    gallery: [
      { name: "fassade", alt: "Eingerüstete Fassade eines Stadthauses während der Renovierung" },
      { name: "theke-led", alt: "Theke mit Holzverkleidung und LED-Beleuchtung im Innenausbau" },
    ],
    groups: [
      { title: "Sanierung", items: ["Kernsanierung und Entkernung", "Rückbau und Entsorgung", "Wanddurchbrüche"] },
      { title: "Innenausbau", items: ["Trockenbau: Trennwände, abgehängte Decken, Schallschutz", "Estrich: Zement-, Fließ- und Trockenestrich, auch mit Fußbodenheizung", "Bodenverlegung und Parkett", "Türen einbauen"] },
      { title: "Oberflächen", items: ["Spachteln, Tapezieren und Streichen", "Feuchtraumfarben", "Schönheitsreparaturen"] },
    ],
    faqs: [
      { q: "Was ist der Unterschied zwischen Sanierung und Renovierung?", a: ["Eine Sanierung behebt Schäden oder bringt die Substanz auf den aktuellen Stand, etwa Leitungen oder Estrich. Eine Renovierung verbessert die Oberflächen. Oft gehört beides zu einem Projekt."] },
      { q: "Wer ist in einer Mietwohnung für die Renovierung zuständig?", a: ["Schönheitsreparaturen übernimmt in der Regel der Mieter, größere Arbeiten der Vermieter. Bei Projekten in Mietobjekten stimmen wir uns mit beiden Seiten ab."] },
      { q: "Was kostet eine komplette Renovierung?", a: ["Das hängt von den Maßnahmen ab. Nach der Besichtigung erhalten Sie eine detaillierte Kalkulation."] },
    ],
    livePath: "/renovierung/",
    formValue: "renovierung",
  },
];

export const tfm = {
  name: "Technische Gebäudebetreuung",
  nav: "Gebäudebetreuung",
  href: `${base}/gebaeudebetreuung`,
  livePath: "/technical-facility-management-rhein-main/",
  summary: "Wartung, Kleinreparaturen und Notfälle für Hausverwaltungen und Gewerbe.",
};

export const nav = [
  { label: "Leistungen", href: `${base}/leistungen`, key: "leistungen" },
  { label: "Gebäudebetreuung", href: tfm.href, key: "gebaeudebetreuung" },
  { label: "Referenzen", href: `${base}/referenzen`, key: "referenzen" },
  { label: "Kontakt", href: `${base}/kontakt`, key: "kontakt" },
];

// Service area named on the current site (home, Bad Nauheim and Fliesen pages).
export const places = [
  { name: "Bad Nauheim", group: "wetterau" },
  { name: "Friedberg", group: "wetterau" },
  { name: "Butzbach", group: "wetterau" },
  { name: "Ober-Mörlen", group: "wetterau" },
  { name: "Wölfersheim", group: "wetterau" },
  { name: "Rosbach vor der Höhe", group: "wetterau" },
  { name: "Karben", group: "wetterau" },
  { name: "Nidderau", group: "rhein-main" },
  { name: "Friedrichsdorf", group: "rhein-main" },
  { name: "Bad Homburg", group: "rhein-main" },
  { name: "Oberursel", group: "rhein-main" },
  { name: "Kronberg", group: "rhein-main" },
  { name: "Eschborn", group: "rhein-main" },
  { name: "Frankfurt am Main", group: "rhein-main" },
  { name: "Offenbach", group: "rhein-main" },
  { name: "Maintal", group: "rhein-main" },
  { name: "Hanau", group: "rhein-main" },
];

// From the current homepage FAQ, condensed.
export const faqsHome: Faq[] = [
  { q: "Kann Handwerker.work meine komplette Badsanierung übernehmen?", a: ["Ja. Von der Demontage über Sanitär- und Elektroinstallation bis zu den Fliesen übernehmen wir das ganze Bad und koordinieren alle Gewerke."] },
  { q: "Übernehmen Sie auch Komplettsanierungen in der Wetterau?", a: ["Ja. Wir renovieren und sanieren in Bad Nauheim und der Wetterau aus einer Hand, mit einem festen Ansprechpartner."] },
  { q: "In welchen Orten sind Sie im Einsatz?", a: ["Unser Schwerpunkt liegt in Bad Nauheim und der Wetterau, etwa in Friedberg, Butzbach, Wölfersheim und Rosbach vor der Höhe, sowie in Frankfurt am Main, Bad Homburg und dem Rhein-Main-Gebiet."] },
  { q: "Ist die Besichtigung kostenlos?", a: ["Ja. Besichtigung und Angebot sind für Sie kostenlos und unverbindlich."] },
  { q: "Wie frage ich ein Projekt an?", a: ["Über das Anfrageformular, per Telefon, WhatsApp oder E-Mail. Mit ein paar Fotos können wir den Aufwand schneller einschätzen."] },
];

export const sources = [
  { label: "§ 40 SGB XI", href: "https://www.gesetze-im-internet.de/sgb_11/__40.html" },
  { label: "KfW-Meldung vom 31.07.2026", href: "https://www.kfw.de/%C3%9Cber-die-KfW/Newsroom/Aktuelles/News-Details_903232.html" },
  { label: "§ 35a EStG", href: "https://www.gesetze-im-internet.de/estg/__35a.html" },
  { label: "Aroundhome, Stand 18.02.2026", href: "https://www.aroundhome.de/badezimmer/preise-kosten/" },
];

// Project photos from the current site's reference gallery, described by what they show.
export const referenceTopics = [
  { key: "bad", label: "Bäder" },
  { key: "fliesen", label: "Fliesen und Naturstein" },
  { key: "baustelle", label: "Auf der Baustelle" },
  { key: "innenausbau", label: "Innenausbau und Renovierung" },
] as const;

export type ReferenceTopic = (typeof referenceTopics)[number]["key"];

export const references: { name: string; alt: string; topic: ReferenceTopic }[] = [
  { name: "bad-wanne-holz", alt: "Bad mit eingebauter Wanne, Natursteinwand und schwebendem Holzwaschtisch", topic: "bad" },
  { name: "bad-eckwanne", alt: "Bad mit Eckwanne, wandhängendem WC, Bidet und Aufsatzwaschbecken", topic: "bad" },
  { name: "bad-doppelwaschtisch", alt: "Bad mit Doppelwaschtisch und Holzoptik-Boden im Fischgrätmuster", topic: "bad" },
  { name: "bad-mosaik", alt: "Bad mit Mosaikfliesen, Handtuchheizkörper und Einbauwanne", topic: "bad" },
  { name: "bad-wc-fertig", alt: "Bad mit wandhängendem WC, grauen Großformatfliesen und LED-Ablage", topic: "bad" },
  { name: "dusche-nische", alt: "Begehbare Glasdusche mit Mosaikband und Wandnische", topic: "bad" },
  { name: "dusche-regen", alt: "Dusche mit Regenbrause und grauen Großformatfliesen", topic: "bad" },
  { name: "bad-led", alt: "Bad mit Glasdusche, LED-Säule und Badewanne", topic: "bad" },
  { name: "naturstein-wand", alt: "Wand und Säule mit Natursteinverblendung", topic: "fliesen" },
  { name: "fliesen-verlegung", alt: "Wandfliesen im Chevron-Muster während der Verlegung", topic: "baustelle" },
  { name: "fliesen-stemmen", alt: "Alte Bodenfliesen werden entfernt", topic: "baustelle" },
  { name: "fliesen-nische-rohbau", alt: "Wandfliesen mit Fliesenkreuzen und vorbereiteter Nische", topic: "baustelle" },
  { name: "vorwand-rohbau", alt: "Vorwandinstallation mit WC-Element und Rohrleitungen", topic: "baustelle" },
  { name: "rueckbau-wc", alt: "WC-Raum im Rückbau mit teilweise entfernten Fliesen", topic: "baustelle" },
  { name: "fussbodenheizung", alt: "Verlegte Fußbodenheizung vor dem Estrich", topic: "baustelle" },
  { name: "theke-led", alt: "Theke mit Holzverkleidung und LED-Beleuchtung", topic: "innenausbau" },
  { name: "elektro-raum", alt: "Ausgebauter Raum mit Elektroinstallation und Einbauschränken", topic: "innenausbau" },
  { name: "renovierung-raum", alt: "Raum während der Renovierung mit neuem Wandanstrich", topic: "innenausbau" },
  { name: "fassade", alt: "Eingerüstete Fassade eines Stadthauses", topic: "innenausbau" },
];
