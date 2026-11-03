import type { AboutCopy } from "../about";

const about = {
  sections: [
    {
      heading: "Webdesign, SEO, Werbung und Automatisierung",
      paragraphs: [
        [
          "Wir planen und bauen ",
          { text: "Websites und Web-Apps", to: "websites-apps" },
          " für Unternehmen und betreuen sie nach dem Start weiter. Mit ",
          { text: "SEO und KI-Sichtbarkeit", to: "seo-ai-visibility" },
          " sorgen wir dafür, dass Ihre Seiten bei Google und in den Antworten von KI-Assistenten erscheinen. Wir schalten ",
          { text: "Werbekampagnen", to: "paid-campaigns" },
          " auf Google und in sozialen Netzwerken und bewerten sie nach den Kosten pro Anfrage. Mit ",
          { text: "Automatisierung", to: "ai-automation" },
          " verbinden wir Formulare, CRM, E-Mails und Dokumente, damit niemand Anfragen von Hand abtippt.",
        ],
        [
          "Diese Leistungen hängen voneinander ab. Eine langsame Website rankt schlechter und verschenkt bezahlte Klicks. Eine Anfrage, die zwei Tage im Postfach liegt, ist oft verloren. Deshalb sehen wir uns den ganzen Weg an, von der Suche bis zur Antwort an Ihren Kunden. Ins Angebot kommt trotzdem nur, was Ihr Projekt braucht.",
        ],
      ],
    },
    {
      heading: "Wie wir arbeiten",
      paragraphs: [
        [
          "Wir beginnen mit einer Bestandsaufnahme Ihrer Website, Ihrer Suchdaten und des Wegs, den eine Anfrage heute nimmt. Bei Handwerker.work waren das alle 64 Adressen der alten Website, Lighthouse-Messungen und der Zugriff von Crawlern.",
        ],
        [
          "Danach entscheiden Daten: Suchanfragen aus der Google Search Console, Messwerte aus Lighthouse und die Rückmeldungen Ihrer Kunden. Wenn es um Gestaltung geht, begründen wir unsere Vorschläge.",
        ],
        [
          "Wir schlagen keine Leistung vor, nur weil wir sie anbieten. Wenn Sie eine Website brauchen, erhalten Sie ein Angebot für eine Website. Ein neues Werkzeug setzen wir nur ein, wenn es ein konkretes Problem löst und wir es getestet haben.",
        ],
      ],
    },
    {
      heading: "Was wir bauen, gehört Ihnen",
      paragraphs: [
        [
          "Sie erhalten Quellcode, Designs, Inhalte und alle Zugänge. Danach sind Sie nicht an uns gebunden. Sie können die Website mit einer anderen Agentur oder im eigenen Haus weiterführen.",
        ],
      ],
    },
    {
      heading: "Schnelle Websites mit Astro und Cloudflare",
      paragraphs: [
        [
          "Diese Website und die Website von Handwerker.work sind mit Astro gebaut. Astro liefert fertige HTML-Seiten aus und lädt JavaScript nur dort, wo eine Seite es braucht. Die Seiten laufen auf Cloudflare und kommen aus einem Rechenzentrum in der Nähe des Besuchers.",
        ],
        [
          "Das Ergebnis lässt sich messen. Die neue Startseite von Handwerker.work erreicht in Lighthouse mobil 100 statt 65 Punkte, und ihr größtes Element erscheint nach 1,8 statt 10,1 Sekunden.",
        ],
        [
          "Anfragen messen wir, wo es möglich ist, ohne Cookies und ohne Banner. Seit dem 31. Oktober zählt die Website von Handwerker.work Anrufe, WhatsApp-Klicks und abgeschickte Formulare.",
        ],
      ],
    },
    {
      heading: "Ein Projekt im Detail: Handwerker.work",
      paragraphs: [
        [
          "Handwerker.work ist ein Sanierungsbetrieb aus Bad Nauheim. Wir haben die WordPress-Website neu gebaut, ohne eine alte Adresse zu verlieren, und betreuen seitdem SEO und den weiteren Ausbau. Ende Oktober waren 32 von 33 Seiten bei Google indexiert. ",
          { text: "Die ganze Referenz", to: "reference" },
          " zeigt jeden Befund und jeden Schritt mit Datum.",
        ],
      ],
    },
    {
      heading: "Aus Hattersheim am Main für Unternehmen in ganz Deutschland",
      paragraphs: [
        [
          "Unser Studio sitzt in Hattersheim am Main, zwischen Frankfurt, Wiesbaden und Mainz. Im Rhein-Main-Gebiet treffen wir uns gern auch vor Ort. Mit Unternehmen aus anderen Regionen und aus dem Ausland arbeiten wir per Videocall, Telefon und E-Mail.",
        ],
      ],
    },
  ],
} satisfies AboutCopy;

export default about;
