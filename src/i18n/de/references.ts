import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Referenzen",
  overview: {
    title: "Referenzen: Websites und SEO mit gemessenen Ergebnissen | Suchio",
    description:
      "Projekte von Suchio mit gemessenen Ergebnissen. Handwerker.work aus Bad Nauheim: neue Website, Lighthouse mobil von 65 auf 100, alle alten URLs erhalten.",
    h1: "Referenzen",
    intro:
      "Projekte, die wir umgesetzt haben, mit den Werten vor und nach dem Start. Darunter Konzepte, die zeigen, wie eine Website für eine Branche aussehen kann.",
    kind: "Sanierung, Bad und Haustechnik in Bad Nauheim",
    summary:
      "WordPress-Website als schnelle Astro-Website neu gebaut, ohne eine Adresse zu verlieren. Dazu SEO nach Suchdaten und neue Leistungsseiten.",
    link: "Referenz ansehen",
    conceptsHeading: "Konzepte nach Branche",
    conceptsText:
      "Beispiele, wie eine Website für eine Branche aussehen kann. Die Betriebe sind ausgedacht, es sind keine Kundenprojekte.",
    conceptsLink: "Alle Konzepte",
  },
  teaser: {
    heading: "Handwerker.work: neue Website, keine Adresse verloren",
    text: "Ein Sanierungsbetrieb aus Bad Nauheim. Wir haben die WordPress-Website neu gebaut und betreuen seitdem SEO und den weiteren Ausbau.",
    link: "Ganze Referenz ansehen",
  },
  serviceLink: "Referenz ansehen: Handwerker.work",
  handwerkerWork: {
    title: "Referenz Handwerker.work: neue Website und SEO für einen Handwerksbetrieb | Suchio",
    description:
      "Wie wir die WordPress-Website von Handwerker.work aus Bad Nauheim neu gebaut haben: Lighthouse mobil von 65 auf 100, alle alten URLs erhalten, 32 von 33 Seiten bei Google indexiert.",
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
      caption: "Nachher, 31. Oktober 2026",
      alt: "Startseite der neuen Website mit Überschrift, drei Kontaktwegen und einem Foto eines eigenen Bads.",
      changes:
        "Überschrift, Leistungen und drei Kontaktwege im ersten Bild. Ein Foto eines eigenen Projekts im ersten Bild. Kein Pop-up, kein Cookie-Banner.",
    },
    viewer: {
      open: "Bild vergrößern",
      dialog: "Bildansicht",
      close: "Schließen",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      reset: "Auf Fenstergröße zurücksetzen",
      previous: "Vorheriges Bild",
      next: "Nächstes Bild",
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
      desktop: "Am Desktop",
      desktopText:
        "Neue Website, Startseite, mit den Desktop-Einstellungen von Lighthouse. Die alte Website wurde nur mobil gemessen.",
      bestPractices: "Best Practices",
    },
    pagesHeading: "Drei Seiten im Vergleich",
    pagesText: "Performance-Wert in Lighthouse mobil, alte und neue Fassung derselben Seite.",
    pages: { home: "Startseite", contact: "Kontakt", badNauheim: "Badsanierung Bad Nauheim" },
    sourceNote:
      "Lighthouse-Labormessungen der live erreichbaren Website: alte Fassung am 21.10.2026 (nur mobil), neue Fassung am 29.10.2026 mit je drei mobilen und drei Desktop-Messungen pro Seite; gezeigt ist der Median. Mobil erreichen Startseite, Kontakt und Badsanierung Bad Nauheim in jeder Messung 100 Punkte in Performance, Barrierefreiheit, Best Practices und SEO. Die Werte können zwischen Messungen schwanken. 32 von 33 Seiten der Sitemap sind laut Google Search Console indexiert (28.10.2026).",
    findingsHeading: "Was wir vorgefunden und geändert haben",
    findingsText:
      "Vor dem Neubau haben wir alle 64 Adressen der alten Website geprüft und 45 Befunde notiert. Sechs davon im Vergleich mit dem heutigen Stand.",
    topicLabel: "Bereich",
    beforeLabel: "Vorher",
    afterLabel: "Nachher",
    findings: [
      {
        title: "Anfragen",
        before:
          "Das Kontaktformular funktionierte nur, wenn Besucher Marketing-Cookies erlaubten. Wer ablehnte, konnte nicht anfragen.",
        after:
          "Das Formular funktioniert ohne Zustimmung zu Cookies. Pflicht sind nur Vorhaben, Ort, Telefon oder E-Mail und die Datenschutz-Bestätigung.",
      },
      {
        title: "Seitentitel",
        before:
          "Der Titel der Startseite begann mit „Handwerker Frankfurt“, obwohl der Betrieb in Bad Nauheim sitzt. Eine Seite trug den Titel einer anderen, viele endeten mit demselben Werbespruch.",
        after:
          "Jede Seite hat einen eigenen Titel mit Leistung und Ort. Die Startseite heißt „Sanierung, Bad & Elektro in Bad Nauheim“.",
      },
      {
        title: "Adressen",
        before:
          "Eine Leistungsseite lieferte den Fehler 404 und war von fünf Seiten verlinkt. Dazu kamen 223 WordPress-Systemadressen wie Feeds und Dateianhänge.",
        after:
          "Alle alten Adressen sind erreichbar oder leiten per 301 weiter. Für die 223 Systemadressen gelten feste Regeln, und wir haben jede einzelne getestet.",
      },
      {
        title: "Ortsseiten",
        before: "Vier Ortsseiten hatten zu 85 bis 90 Prozent denselben Text.",
        after:
          "Die neuen Ortsseiten für Friedberg, Bad Vilbel, Karben, Bad Homburg und Butzbach nennen Entfernung, Stadtteile, die Wasserhärte des Versorgers und den Denkmalschutz. Gleicher Text: 19 bis 28 Prozent.",
      },
      {
        title: "Crawler",
        before:
          "Die robots.txt sperrte die Ordner mit CSS und JavaScript. Der Crawler GPTBot von OpenAI bekam vom Hoster den Fehler 429.",
        after: "Suchmaschinen und KI-Crawler dürfen jede Seite lesen. Cloudflare blockiert keine KI-Crawler.",
      },
      {
        title: "Strukturierte Daten",
        before: "Strukturierte Daten gab es nur auf der Startseite und im Blog. Die Leistungsseiten hatten keine.",
        after: "Jede Leistungsseite beschreibt für Suchmaschinen die Leistung, die Seite und den Navigationspfad.",
      },
    ],
    logHeading: "Der Ablauf",
    logText: "Zwischen der Analyse am 21. Oktober und dem fertigen Anfrageweg am 31. Oktober lagen elf Tage.",
    log: [
      {
        date: "2026-10-21",
        title: "Analyse",
        copy: "Wir prüfen alle 64 Adressen der alten Website, Lighthouse mobil auf fünf Seiten, den Zugriff von Crawlern und die Darstellung auf dem Handy. Ergebnis: 45 Befunde, nach Dringlichkeit sortiert.",
      },
      {
        date: "2026-10-23",
        title: "Umzug ohne Adressverlust",
        copy: "Die Website läuft als Astro-Seite auf Cloudflare. Alle alten Adressen bleiben gleich, und die Postfächer laufen beim bisherigen Anbieter weiter.",
      },
      {
        date: "2026-10-24",
        title: "Neue Leistungsseiten",
        copy: "Eigene Seiten für Heizung, Wärmepumpe, Trockenbau, Komplettsanierung und Fliesenleger, dazu Einsatzgebiet und Bad Nauheim. Alte Orts- und Leistungsadressen leiten per 301 auf die neuen Seiten.",
        link: { label: "Badsanierung in Bad Nauheim", href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/` },
      },
      {
        date: "2026-10-28",
        title: "Kein WordPress-Code mehr",
        copy: "Alle Seiten sind neu gebaut, im Design der neuen Startseite. Google meldet 32 von 33 Seiten der Sitemap als indexiert.",
      },
      {
        date: "2026-10-29",
        title: "Ladezeit",
        copy: "Bilder als AVIF mit eigenen Zuschnitten fürs Handy, eine kleinere Schriftdatei, und der Spamschutz lädt erst bei der ersten Eingabe ins Formular. Startseite, Kontakt und Badsanierung Bad Nauheim erreichen mobil 100 Punkte in Lighthouse.",
      },
      {
        date: "2026-10-30",
        title: "Texte nach Suchdaten",
        copy: "Die Seiten zu Badsanierung und Fliesenleger folgen in Wortwahl und Reihenfolge den Suchanfragen aus der Google Search Console. Jeder Seitenkopf zeigt die Google-Bewertung.",
      },
      {
        date: "2026-10-31",
        title: "Ortsseiten, Projekte und Anfrageweg",
        copy: "Ortsseiten für fünf Städte in der Wetterau und im Taunus, vier Projektseiten mit eigenen Fotos des Betriebs und ein Anfrageformular in sechs Schritten.",
        link: { label: "Zum Anfrageformular", href: `${site}/kontakt/` },
      },
    ],
    nowHeading: "Was wir jetzt messen",
    nowText:
      "Vor dem Neubau zählte die Website keine Anfragen. Seit dem 31. Oktober zählt sie Anrufe, WhatsApp-Klicks und abgeschickte Anfragen, ohne Cookies und ohne Banner. So sehen wir in den nächsten Monaten, welche Seiten Anfragen bringen. SEO und den weiteren Ausbau betreuen wir weiter.",
    servicesLabel: "Leistungen in diesem Projekt",
    cta: {
      heading: "Eine Website wie diese für deinen Betrieb?",
      text: "Erzähl uns, was deine Website heute nicht leistet.",
      button: "Anfrage senden",
    },
  },
} satisfies ReferencesCopy;

export default references;
