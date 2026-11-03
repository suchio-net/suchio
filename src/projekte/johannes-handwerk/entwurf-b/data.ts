// Entwurf B has a page per navigation item and one page per core service. Service scope comes
// from his five service pages; the process steps and price factors describe the work in general
// terms and name no prices, durations or guarantees.
import { project } from "../shared/content";
import type { Faq } from "../shared/faqs";

export const base = `${project}/entwurf-b`;

export const nav = [
  { key: "leistungen", label: "Leistungen", href: `${base}/leistungen` },
  { key: "projekte", label: "Projekte", href: `${base}/projekte` },
  { key: "kontakt", label: "Kontakt", href: `${base}/kontakt` },
];

export const requestHref = (service?: string) => `${base}/kontakt${service ? `?leistung=${service}` : ""}#anfrage`;

export interface Service {
  slug: string;
  name: string;
  /** Short name for menus and the request form. */
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  summary: string;
  image: string;
  scope: { title: string; items: string[] }[];
  steps: string[];
  priceFactors: string[];
  faqs: Faq[];
}

export const services: Service[] = [
  {
    slug: "pflasterarbeiten",
    name: "Pflasterarbeiten",
    short: "Pflasterarbeiten",
    title: "Pflasterarbeiten in München | Johannes-Handwerk",
    description:
      "Wege, Innenhöfe und Flächen pflastern in München und Umgebung: Naturstein, Betonpflaster und Verbundpflaster mit fachgerechtem Unterbau.",
    h1: "Pflasterarbeiten in München",
    intro:
      "Wege, Innenhöfe und Flächen aus Naturstein, Betonpflaster oder Verbundpflaster. Wir bauen den Unterbau fachgerecht auf, verlegen jeden Stein exakt und verfugen sauber.",
    summary: "Wege, Innenhöfe und Flächen aus Naturstein, Beton oder Verbundpflaster.",
    image: "pflaster-verlegen",
    scope: [
      {
        title: "Flächen",
        items: [
          "Wege und Gartenwege",
          "Innenhöfe und Hofflächen",
          "Neuanlage von Flächen",
          "Reparatur bestehender Flächen",
        ],
      },
      { title: "Material", items: ["Naturstein", "Betonpflaster", "Verbundpflaster"] },
      {
        title: "Dazu",
        items: ["Aushub und Entsorgung", "Fundamente aller Art", "Rollrasen und Ansaat neben der Fläche"],
      },
    ],
    steps: [
      "Vor-Ort-Termin und Aufmaß",
      "Aushub bis auf tragfähigen Boden",
      "Frostschutz- und Tragschicht einbauen und verdichten",
      "Bettung aus Splitt abziehen",
      "Pflaster verlegen",
      "Fugen füllen und abrütteln",
    ],
    priceFactors: [
      "Größe und Form der Fläche",
      "Zugang für Maschinen und Material",
      "Zustand des Untergrunds und Tiefe des Aushubs",
      "Entsorgung von Aushub und altem Belag",
      "Material, Format und Verlegemuster",
      "Gefälle, Kanten und Anschlüsse an Haus und Beete",
    ],
    faqs: [
      {
        q: "Pflastern Sie auch kleine Flächen?",
        a: "Ja. Ob Gartenweg oder ganze Hoffläche: Schicken Sie uns Ort, ungefähre Fläche und ein Foto. Dann melden wir uns mit einem Termin.",
      },
      {
        q: "Welches Pflaster passt zu meiner Fläche?",
        a: "Das hängt von der Nutzung und vom Stil des Hauses ab. Beim Vor-Ort-Termin beraten wir Sie zu Naturstein, Betonpflaster und Verbundpflaster.",
      },
      {
        q: "Können Sie eine bestehende Fläche reparieren?",
        a: "Ja. Wir übernehmen Neuanlagen und Reparaturen bestehender Flächen.",
      },
      {
        q: "Wer entsorgt den Aushub?",
        a: "Wir. Erdaushub und Bauschutt transportieren wir ab und entsorgen sie fachgerecht.",
      },
    ],
  },
  {
    slug: "terrassen",
    name: "Terrassen",
    short: "Terrasse",
    title: "Terrassen bauen und sanieren in München | Johannes-Handwerk",
    description:
      "Terrassen in München und Umgebung: Neuanlage und Sanierung aus Naturstein, Beton oder Verbundpflaster, auf Wunsch mit Terrassen-Überdachung.",
    h1: "Terrassen in München",
    intro:
      "Neue Terrassen und Terrassensanierung aus Naturstein, Beton oder Verbundpflaster, mit tragfähigem Unterbau. Auf Wunsch mit Überdachung als Wetter- und Sonnenschutz.",
    summary: "Neuanlage und Sanierung, auf Wunsch mit Überdachung.",
    image: "terrasse-platten",
    scope: [
      { title: "Terrasse", items: ["Neue Terrassen anlegen", "Bestehende Terrassen sanieren", "Fundamente"] },
      {
        title: "Rund um die Terrasse",
        items: ["Terrassen-Überdachungen", "Wege und Zugänge", "Rollrasen und Ansaat", "Gartenhäuser aufbauen"],
      },
    ],
    steps: [
      "Vor-Ort-Termin, Größe und Material festlegen",
      "Aushub und alten Belag entfernen",
      "Unterbau einbauen und verdichten",
      "Bettung mit Gefälle vom Haus weg anlegen",
      "Belag verlegen",
      "Fugen und Anschlüsse fertigstellen",
    ],
    priceFactors: [
      "Größe und Form der Terrasse",
      "Zugang zum Garten",
      "Untergrund und Tiefe des Aushubs",
      "Rückbau und Entsorgung einer alten Terrasse",
      "Material und Format",
      "Stufen, Höhenunterschiede und Überdachung",
    ],
    faqs: [
      {
        q: "Sanieren Sie auch alte Terrassen?",
        a: "Ja. Wir entfernen den alten Belag, prüfen den Unterbau und bauen die Terrasse neu auf.",
      },
      {
        q: "Bauen Sie auch eine Überdachung?",
        a: "Ja. Wir bauen Terrassen-Überdachungen als Wetter- und Sonnenschutz, passend zum bestehenden Haus.",
      },
      {
        q: "Welches Material eignet sich für die Terrasse?",
        a: "Naturstein, Beton und Verbundpflaster haben je eigene Vorteile in Optik, Pflege und Preis. Wir beraten Sie beim Vor-Ort-Termin.",
      },
      {
        q: "Übernehmen Sie auch den Rasen neben der Terrasse?",
        a: "Ja. Wir verlegen Rollrasen oder säen neu an.",
      },
    ],
  },
  {
    slug: "einfahrten",
    name: "Einfahrten und Stellplätze",
    short: "Einfahrt oder Stellplatz",
    title: "Einfahrt pflastern in München | Johannes-Handwerk",
    description:
      "Einfahrten, Zufahrten und Stellplätze pflastern in München und Umgebung. Fachgerechter Unterbau aus Frostschutz- und Tragschicht, Festpreis-Angebot nach Vor-Ort-Termin.",
    h1: "Einfahrten und Stellplätze in München",
    intro:
      "Einfahrten, Zufahrten und Stellplätze, die das Gewicht von Autos dauerhaft tragen. Entscheidend ist der Unterbau. Den bauen wir Schicht für Schicht auf.",
    summary: "Zufahrten und Stellplätze mit tragfähigem Unterbau.",
    image: "einfahrt-haus",
    scope: [
      {
        title: "Flächen",
        items: ["Einfahrten und Zufahrten", "Stellplätze und Parkplätze", "Erneuerung alter Einfahrten"],
      },
      { title: "Material", items: ["Betonpflaster", "Verbundpflaster", "Naturstein"] },
      { title: "Dazu", items: ["Aushub und Entsorgung", "Zäune und Sichtschutz an der Zufahrt"] },
    ],
    steps: [
      "Vor-Ort-Termin und Aufmaß",
      "Aushub bis auf den Untergrund",
      "Frostschutzschicht einbauen und verdichten",
      "Tragschicht einbauen und verdichten",
      "Bettung aus Splitt abziehen",
      "Pflaster verlegen, Fugen füllen und abrütteln",
    ],
    priceFactors: [
      "Größe der Fläche",
      "Belastung durch Auto, Transporter oder Wohnmobil",
      "Tiefe des Aushubs und Entsorgung",
      "Zustand des Untergrunds",
      "Material, Format und Verlegemuster",
      "Gefälle und Entwässerung",
      "Zugang für Bagger und Lkw",
    ],
    faqs: [
      {
        q: "Warum ist der Unterbau so wichtig?",
        a: "Eine Einfahrt trägt das Gewicht von Fahrzeugen. Verdichtete Frostschutz- und Tragschichten verteilen die Last, damit sich das Pflaster nicht setzt.",
      },
      {
        q: "Können Sie eine alte Einfahrt erneuern?",
        a: "Ja. Wir nehmen den alten Belag auf, entsorgen ihn und bauen die Einfahrt neu auf.",
      },
      {
        q: "Was kostet eine gepflasterte Einfahrt?",
        a: "Das hängt von den Faktoren oben ab, vor allem von Fläche, Aushub und Material. Nach dem Vor-Ort-Termin nennen wir Ihnen einen Festpreis.",
      },
      {
        q: "Wie lange dauert eine neue Einfahrt?",
        a: "Das hängt von Fläche und Unterbau ab. Den Zeitplan nennen wir Ihnen mit dem Angebot.",
      },
    ],
  },
  {
    slug: "zaeune",
    name: "Zäune und Fundamente",
    short: "Zaun oder Fundament",
    title: "Zaunbau und Fundamente in München | Johannes-Handwerk",
    description:
      "Doppelstabmattenzäune, Sichtschutz und Fundamente in München und Umgebung. Dazu Gartenhausmontage und Entsorgung alter Zäune und Hecken.",
    h1: "Zäune und Fundamente in München",
    intro:
      "Doppelstabmattenzäune und Sichtschutz auf soliden Fundamenten. Dazu Fundamente von der Mülltonnenbox bis zum Mauersockel und der Aufbau von Gartenhäusern.",
    summary: "Doppelstabmattenzäune, Sichtschutz, Fundamente und Gartenhäuser.",
    image: "zaun-holz",
    scope: [
      { title: "Zäune", items: ["Doppelstabmattenzäune", "Sichtschutz"] },
      { title: "Fundamente", items: ["Fundamente für Mülltonnenboxen", "Mauersockel", "Fundamente aller Art"] },
      { title: "Garten", items: ["Gartenhäuser aufbauen und umbauen", "Hecken und Sträucher entfernen"] },
    ],
    steps: [
      "Vor-Ort-Termin und Verlauf festlegen",
      "Alten Zaun und Bewuchs entfernen",
      "Fundamente setzen",
      "Pfosten ausrichten",
      "Zaunfelder und Sichtschutz montieren",
      "Abnahme durch Sie",
    ],
    priceFactors: [
      "Länge und Höhe des Zauns",
      "Zauntyp und Sichtschutz",
      "Anzahl und Größe der Fundamente",
      "Bodenbeschaffenheit und Gefälle",
      "Rückbau und Entsorgung des alten Zauns",
      "Zugang zum Grundstück",
    ],
    faqs: [
      {
        q: "Entfernen Sie auch den alten Zaun?",
        a: "Ja. Wir bauen den alten Zaun zurück und entsorgen ihn. Auf Wunsch entfernen wir auch Hecken und Sträucher.",
      },
      { q: "Welche Zäune bauen Sie?", a: "Doppelstabmattenzäune und Sichtschutz." },
      {
        q: "Setzen Sie auch Fundamente für ein Gartenhaus?",
        a: "Ja. Wir setzen das Fundament und bauen das Gartenhaus auf.",
      },
      {
        q: "Was brauchen Sie für ein Angebot?",
        a: "Die ungefähre Länge, ein paar Fotos des Verlaufs und Ihren Wunsch zum Sichtschutz. Den Rest klären wir beim Vor-Ort-Termin.",
      },
    ],
  },
  {
    slug: "innenausbau",
    name: "Boden und Innenausbau",
    short: "Boden, Fliesen, Bad oder Küche",
    title: "Boden, Fliesen und Innenausbau in München | Johannes-Handwerk",
    description:
      "Parkett, Laminat, PVC und Fliesen verlegen in München. Dazu Bad- und Küchensanierung, Trockenbau, Türen und Malerarbeiten.",
    h1: "Boden, Fliesen und Innenausbau in München",
    intro:
      "Parkett, Laminat, PVC und Fliesen, sauber verlegt und exakt verfugt. Dazu Bad- und Küchensanierung, Trockenbau, Türen und Malerarbeiten.",
    summary: "Parkett, Laminat und Fliesen. Dazu Bad, Küche und Türen.",
    image: "parkett",
    scope: [
      {
        title: "Boden",
        items: [
          "Parkett schwimmend oder vollflächig verklebt",
          "Laminat verlegen und austauschen",
          "Teppich, PVC und Linoleum",
          "Sockelleisten",
        ],
      },
      {
        title: "Fliesen, Bad und Küche",
        items: [
          "Wand- und Bodenfliesen",
          "Fugen erneuern",
          "Bad- und Küchensanierung",
          "Trockenwandsanierung",
          "Sanitärinstallation mit Fachpartnern",
        ],
      },
      {
        title: "Außerdem",
        items: ["Türen einbauen und austauschen", "Streichen und Tapezieren", "Entkernung und Entsorgung"],
      },
    ],
    steps: [
      "Vor-Ort-Termin und Materialauswahl",
      "Alten Belag entfernen und entsorgen",
      "Untergrund prüfen und vorbereiten",
      "Boden oder Fliesen verlegen",
      "Leisten, Fugen und Übergänge",
      "Abnahme durch Sie",
    ],
    priceFactors: [
      "Größe und Anzahl der Räume",
      "Material und Format",
      "Zustand des Untergrunds",
      "Rückbau und Entsorgung des alten Belags",
      "Zuschnitt an Türen, Nischen und Treppen",
      "Verlegemuster",
    ],
    faqs: [
      {
        q: "Verlegen Sie Parkett schwimmend oder verklebt?",
        a: "Beides. Welche Verlegung passt, hängt vom Untergrund und vom Parkett ab. Das klären wir beim Vor-Ort-Termin.",
      },
      { q: "Entfernen Sie den alten Boden?", a: "Ja. Wir entfernen den alten Belag und entsorgen ihn fachgerecht." },
      {
        q: "Sanieren Sie auch komplette Bäder?",
        a: "Ja. Fliesen, Trockenbau und Umbau übernehmen wir selbst, die Sanitärinstallation mit Fachpartnern.",
      },
      { q: "Tauschen Sie auch Türen aus?", a: "Ja. Wir bauen neue Zimmer- und Wohnungstüren passgenau ein." },
    ],
  },
];

/** Areas without their own page; the services overview lists them in full. */
export const otherKeys = ["maler", "abriss"];
