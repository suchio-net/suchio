import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  link: "Referenz: Handwerker.work",
  handwerkerWork: {
    title: "Referenz Handwerker.work: neue Website und SEO für einen Handwerksbetrieb | Suchio",
    description:
      "Wie wir die WordPress-Website von Handwerker.work aus Bad Nauheim neu gebaut haben: Lighthouse mobil von 65 auf 93, alle alten URLs erhalten, 32 von 33 Seiten bei Google indexiert.",
    h1: "Neue Website für Handwerker.work",
    intro:
      "Handwerker.work übernimmt Sanierung, Badsanierung, Elektro und Haustechnik in Bad Nauheim, der Wetterau und Frankfurt. Wir haben die WordPress-Website als schnelle Astro-Website neu gebaut und kümmern uns um SEO und den weiteren Ausbau.",
    name: "Handwerker.work",
    visit: "Website ansehen",
    resultsHeading: "Vorher und nachher",
    beforeLabel: "vorher",
    results: [
      { label: "Lighthouse mobil, Startseite", before: "65", after: "93" },
      { label: "Hauptinhalt geladen (LCP), mobil", before: "10,1 s", after: "3,0 s" },
      { label: "Barrierefreiheit, Lighthouse", before: "82", after: "100" },
      { label: "Seiten der Sitemap bei Google indexiert", before: "", after: "32 von 33" },
    ],
    resultsNote:
      "Lighthouse mobil am 21.10.2026 auf der alten Website und am 29.10.2026 auf der neuen. Alle sechs gemessenen Seiten erreichen 91 bis 99 Punkte für Performance und 100 für Barrierefreiheit, Best Practices und SEO. Indexierung laut Google Search Console am 28.10.2026.",
    startHeading: "Die alte Website",
    startText: "Am 21.10.2026 haben wir alle 64 bekannten URLs geprüft und 45 Befunde aufgeschrieben. Die wichtigsten:",
    start: [
      "Auf dem Handy erschien der Hauptinhalt der Startseite erst nach 10,1 Sekunden.",
      "Die Startseite war auf dem Handy breiter als der Bildschirm und ließ sich seitlich verschieben.",
      "Ein Pop-up und ein Cookie-Banner verdeckten auf allen geprüften Seiten den Einstieg.",
      "Eine Leistungsseite lieferte einen Fehler 404 und war von der Startseite und vier Ortsseiten verlinkt.",
      "Die Leistungsseiten hatten keine strukturierten Daten für Google.",
    ],
    workHeading: "Was wir gemacht haben",
    work: [
      {
        title: "Neubau ohne WordPress",
        copy: "Statische Astro-Seiten auf Cloudflare. Seit dem 28.10.2026 enthält die Website keinen WordPress-Code mehr.",
      },
      {
        title: "Keine Adresse verloren",
        copy: "Alle alten URLs sind geblieben. Seiten mit neuer Adresse leiten per 301 weiter, damit Links und Suchergebnisse weiter funktionieren.",
      },
      {
        title: "Neue Leistungsseiten",
        copy: "Heizung, Wärmepumpe, Trockenbau, Komplettsanierung, Fliesenleger, Einsatzgebiet und eine eigene Seite für Bad Nauheim.",
      },
      {
        title: "Anfragen mit Projektangaben",
        copy: "Das Anfrageformular fragt zuerst nach dem Projekt. Kostenrechner auf den Leistungsseiten senden ihre Angaben mit. Jede Anfrage kommt per E-Mail an, mit Spamschutz.",
      },
      {
        title: "Gleiche Firmendaten überall",
        copy: "Name, Adresse und eine einzige Telefonnummer stehen auf jeder Seite gleich.",
      },
      {
        title: "SEO nach Suchdaten",
        copy: "Wortwahl, Seitenliste und Reihenfolge richten sich nach den Daten aus der Google Search Console und einem Vergleich mit Mitbewerbern.",
      },
    ],
    pagesHeading: "Seiten zum Ansehen",
    pages: [
      {
        label: "Badsanierung in Bad Nauheim",
        href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        copy: "Ortsseite mit Bewertungen und häufigen Fragen.",
      },
      {
        label: "Komplettsanierung",
        href: `${site}/komplettsanierung/`,
        copy: "Eine der neuen Leistungsseiten.",
      },
      {
        label: "Anfrage",
        href: `${site}/kontakt/`,
        copy: "Das Formular, das zuerst nach dem Projekt fragt.",
      },
    ],
    cta: {
      heading: "Eine Website wie diese für deinen Betrieb?",
      text: "Erzähl uns, was deine Website heute nicht leistet.",
      button: "Anfrage senden",
    },
  },
} satisfies ReferencesCopy;

export default references;
