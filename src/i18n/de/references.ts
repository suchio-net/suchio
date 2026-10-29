import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Referenzen",
  overview: {
    title: "Referenzen: Websites und SEO mit gemessenen Ergebnissen | Suchio",
    description:
      "Projekte von Suchio mit gemessenen Ergebnissen. Handwerker.work aus Bad Nauheim: neue Website, Lighthouse mobil von 65 auf 93, alle alten URLs erhalten.",
    h1: "Referenzen",
    intro: "Projekte, die wir umgesetzt haben, mit den Werten vor und nach dem Start.",
    kind: "Sanierung, Bad und Haustechnik in Bad Nauheim",
    summary:
      "WordPress-Website als schnelle Astro-Website neu gebaut, ohne eine Adresse zu verlieren. Dazu SEO nach Suchdaten und neue Leistungsseiten.",
    link: "Referenz ansehen",
  },
  serviceLink: "Referenz ansehen: Handwerker.work",
  handwerkerWork: {
    title: "Referenz Handwerker.work: neue Website und SEO für einen Handwerksbetrieb | Suchio",
    description:
      "Wie wir die WordPress-Website von Handwerker.work aus Bad Nauheim neu gebaut haben: Lighthouse mobil von 65 auf 93, alle alten URLs erhalten, 32 von 33 Seiten bei Google indexiert.",
    h1: "Neue Website für Handwerker.work",
    intro:
      "Handwerker.work übernimmt Sanierung, Badsanierung, Elektro und Haustechnik in Bad Nauheim, der Wetterau und Frankfurt. Wir haben die WordPress-Website neu gebaut und kümmern uns um SEO und den weiteren Ausbau.",
    name: "Handwerker.work",
    visit: "Website ansehen",
    beforeShot: {
      caption: "Vorher, 8. Oktober 2026",
      alt: "Startseite der alten Website. Ein Werbe-Pop-up verdeckt die linke Hälfte des ersten Bildschirms.",
      findings:
        "Ein Pop-up verdeckte den Einstieg. Auf dem Handy war die Seite breiter als der Bildschirm. Eine verlinkte Leistungsseite lieferte einen Fehler 404. Bei unserer Prüfung von 64 Adressen kamen 45 Befunde zusammen.",
    },
    afterShot: {
      caption: "Nachher, 29. Oktober 2026",
      alt: "Startseite der neuen Website mit Überschrift, drei Kontaktwegen und einem Foto eines eigenen Bads.",
      changes:
        "Überschrift, Leistungen und drei Kontaktwege im ersten Bild. Ein Foto eines eigenen Projekts im ersten Bild. Kein Pop-up, kein Cookie-Banner.",
    },
    lighthouse: {
      heading: "Lighthouse mobil, Startseite",
      text: "Googles Messwerkzeug, vor und nach dem Neubau jeweils mobil gemessen.",
      legend: "Äußerer Ring: neue Website. Innerer Ring: alte Website.",
      before: "vorher",
      performance: "Performance",
      accessibility: "Barrierefreiheit",
      seo: "SEO",
      lcp: "Bis der Hauptinhalt sichtbar ist (LCP)",
      lcpScale: "Google bewertet bis 2,5 s als gut, ab 4 s als schlecht.",
      weight: "Datenmenge der Startseite",
      oldSite: "alt",
      newSite: "neu",
    },
    pagesHeading: "Drei Seiten im Vergleich",
    pagesText: "Performance-Wert in Lighthouse mobil, alte und neue Fassung derselben Seite.",
    pages: { home: "Startseite", contact: "Kontakt", badNauheim: "Badsanierung Bad Nauheim" },
    sourceNote:
      "Gemessen am 21.10.2026 auf der alten und am 29.10.2026 auf der neuen Website. Alle sechs neu gemessenen Seiten erreichen 91 bis 99 Punkte für Performance und 100 für Barrierefreiheit, Best Practices und SEO. 32 von 33 Seiten der Sitemap sind laut Google Search Console indexiert (28.10.2026).",
    workHeading: "Was wir gemacht haben",
    work: [
      {
        title: "Technik",
        copy: "Statische Astro-Seiten auf Cloudflare, seit dem 28.10.2026 ohne WordPress-Code. Alle alten URLs sind geblieben; Seiten mit neuer Adresse leiten per 301 weiter, damit Links und Suchergebnisse weiter funktionieren.",
      },
      {
        title: "Inhalte",
        copy: "Neue Seiten für Heizung, Wärmepumpe, Trockenbau, Komplettsanierung, Fliesenleger, Einsatzgebiet und Bad Nauheim. Wortwahl und Reihenfolge richten sich nach Daten aus der Google Search Console. Name, Adresse und eine einzige Telefonnummer stehen überall gleich.",
        link: { label: "Badsanierung in Bad Nauheim", href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/` },
      },
      {
        title: "Anfragen",
        copy: "Das Anfrageformular fragt zuerst nach dem Projekt. Kostenrechner auf den Leistungsseiten senden ihre Angaben mit. Jede Anfrage kommt per E-Mail an, mit Spamschutz.",
        link: { label: "Zum Anfrageformular", href: `${site}/kontakt/` },
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
