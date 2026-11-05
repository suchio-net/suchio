import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  serviceTour: {
    heading: "Was wir für Ihre Website übernehmen",
    copy: "Wir gestalten und entwickeln die Website, machen sie schnell, bauen Formulare und Terminbuchung ein und betreuen sie nach dem Start.",
    tabsLabel: "Teil der Leistung",
    steps: {
      design: {
        title: "Gestaltung",
        text: "Jede Seite entsteht für Handy und Desktop, mit Ihren Leistungen, Fotos und Texten statt einer Vorlage.",
      },
      speed: {
        title: "Ladezeit",
        text: "Wir bauen schlanke Seiten. Der Hauptinhalt steht unter 2,5 Sekunden, der Grenze, ab der Google eine Seite als schnell bewertet.",
      },
      enquiry: {
        title: "Anfragen",
        text: "Formulare und Terminbuchung lassen sich auf dem Handy in einer Minute ausfüllen. Jede Anfrage kommt bei Ihnen an.",
      },
      care: {
        title: "Pflege",
        text: "Texte, Bilder und Öffnungszeiten ändern Sie selbst. Hosting, Updates und Sicherungen übernehmen wir.",
      },
    },
    domain: "mustermann-baeder.de",
    nav: ["Leistungen", "Projekte", "Kontakt"],
    headline: "Ihr neues Bad in drei Wochen",
    sub: "Planung, Rückbau, Fliesen und Sanitär aus einem Betrieb in Hofheim.",
    cta: "Anfrage senden",
    cards: ["Badsanierung", "Barrierefreies Bad", "Fliesen"],
    speedLabel: "Hauptinhalt sichtbar",
    speedGood: "gut bis 2,5 s",
    speedPoor: "langsam ab 4 s",
    speedReady: "geladen",
    formTitle: "Anfrage für Ihr Bad",
    formFields: [
      { label: "Vorhaben", value: "Badsanierung" },
      { label: "Ort", value: "65719 Hofheim" },
      { label: "Telefon", value: "0176 …" },
    ],
    formSubmit: "Anfrage senden",
    formSent: "Anfrage gesendet",
    formSentText: "Wir melden uns bis morgen, 12 Uhr.",
    careLabel: "Öffnungszeiten",
    careBefore: "Mo–Fr 8–17 Uhr",
    careAfter: "Mo–Fr 7–18 Uhr, Sa 9–13 Uhr",
    careSaved: "Gespeichert und live",
  },
  searchPlaces: {
    heading: "Was Google, Maps und KI-Assistenten von Ihrer Website lesen",
    copy: "Alle drei lesen dieselbe Seite, aber jeweils andere Teile davon. Wir pflegen jeden dieser Teile.",
    tabsLabel: "Ort, an dem Kunden suchen",
    domainPath: "mustermann-baeder.de/badsanierung-hofheim",
    forSearch: "Für Suchmaschinen",
    seoTitle: "Badsanierung in Hofheim | Mustermann Bäder",
    seoDescription: "Neues Bad in etwa drei Wochen, mit Planung, Fliesen und Sanitär aus einem Betrieb.",
    pageTitle: "Badsanierung in Hofheim",
    pageCopy: "Wir planen Ihr Bad, bauen das alte zurück und übergeben das neue fertig gefliest.",
    address: "Musterstraße 12, 65719 Hofheim",
    hours: "Mo–Fr 8–17 Uhr",
    faqQuestion: "Wie lange dauert eine Badsanierung?",
    faqAnswer: "Ein kleines Bad bauen wir meist in drei Wochen um, vom Rückbau bis zu den Fliesen.",
    places: {
      google: {
        label: "Google-Suche",
        explain:
          "Google zeigt den Seitentitel und die Beschreibung. Wir geben jeder Seite einen eigenen Titel mit Leistung und Ort und prüfen in der Search Console, ob Google die Seite aufgenommen hat.",
      },
      maps: {
        label: "Google Maps",
        explain:
          "Maps zeigt Ihr Unternehmensprofil. Wir sorgen dafür, dass Name, Adresse und Zeiten auf der Website, im Profil und in Verzeichnissen gleich lauten, und pflegen Kategorien und Fotos im Profil.",
      },
      ai: {
        label: "KI-Antwort",
        explain:
          "KI-Assistenten übernehmen am ehesten Sätze, die eine Frage direkt beantworten. Wir schreiben solche Antworten auf Ihre Seiten, beschreiben sie mit strukturierten Daten und lassen die Crawler der Assistenten zu.",
      },
    },
    mapsCategory: "Badausstatter in Hofheim",
    mapsOpen: "Geöffnet bis 17 Uhr",
    mapsActions: ["Route", "Anrufen", "Website"],
    aiQuestion: "Wie lange dauert eine Badsanierung in Hofheim?",
    aiAnswer:
      "Bei Mustermann Bäder in Hofheim dauert ein kleines Bad meist drei Wochen, vom Rückbau bis zu den Fliesen.",
  },
  clickEnquiry: {
    heading: "Vom Klick bis zur Anfrage",
    copy: "Wir schreiben die Anzeigen, bauen die Zielseite und messen jede Anfrage bis zur Anzeige zurück. So sehen Sie, was eine Anfrage kostet.",
    steps: [
      {
        title: "Anzeige",
        text: "Wir wählen Suchbegriffe mit Kaufabsicht und schreiben Anzeigen mit Ihrem Angebot und Ort.",
      },
      {
        title: "Zielseite",
        text: "Jede Anzeige führt auf eine Seite zu genau diesem Angebot, mit einem kurzen Formular.",
      },
      {
        title: "Messung",
        text: "Jede gesendete Anfrage wird der Anzeige zugeordnet, die sie gebracht hat.",
      },
      {
        title: "Auswertung",
        text: "Wir verschieben das Budget zu den Anzeigen mit den niedrigsten Kosten pro Anfrage.",
      },
    ],
    query: "badsanierung hofheim",
    sponsored: "Gesponsert",
    adTitle: "Badsanierung in Hofheim, fertig in drei Wochen",
    adText: "Planung, Fliesen und Sanitär aus einem Betrieb. Jetzt Termin vereinbaren.",
    domain: "mustermann-baeder.de",
    pageHeadline: "Ihr neues Bad in Hofheim",
    pageFields: ["Badsanierung", "65719 Hofheim"],
    pageSubmit: "Anfrage senden",
    pageSent: "Anfrage gesendet",
    dashboardTitle: "Kampagne Badsanierung",
    dashboardExample: "Beispielwerte",
    clicks: "Klicks",
    enquiries: "Anfragen",
    costPerEnquiry: "Kosten pro Anfrage",
  },
  toolMap: {
    heading: "Wir verbinden die Programme, die Sie schon nutzen",
    copy: "Formular, Postfach, CRM, Kalender, Team-Chat und Dokumente arbeiten zusammen, ohne dass jemand Daten abtippt. Wählen Sie ein Programm und sehen Sie, was wir dort automatisieren.",
    hub: "Ihre Automatisierung",
    toolsLabel: "Programm",
    replay: "Ablauf noch einmal zeigen",
    tools: {
      form: {
        name: "Website-Formular",
        event: "Neue Anfrage",
        examples: [
          "Anfragen mit Leistung, Ort und Fotos weitergeben",
          "Pflichtangaben prüfen, bevor etwas weiterläuft",
          "Spam aussortieren",
        ],
      },
      mail: {
        name: "E-Mail-Postfach",
        event: "Bestätigung gesendet",
        examples: [
          "Eingangsbestätigung mit den nächsten Schritten",
          "E-Mails nach Thema sortieren und zuweisen",
          "Antwortentwürfe, die Ihr Team freigibt",
        ],
      },
      crm: {
        name: "CRM",
        event: "Kontakt angelegt",
        examples: [
          "Kontakt und Anfrage ohne Abtippen anlegen",
          "Status in der Pipeline nachführen",
          "Erinnern, wenn ein Angebot unbeantwortet bleibt",
        ],
      },
      calendar: {
        name: "Kalender",
        event: "Termin vorgeschlagen",
        examples: [
          "Freie Termine für Rückruf oder Aufmaß anbieten",
          "Bestätigung und Erinnerung an den Kunden",
          "Termine dem richtigen Mitarbeiter zuweisen",
        ],
      },
      chat: {
        name: "Team-Chat",
        event: "Team benachrichtigt",
        examples: [
          "Neue Anfragen mit Link zum CRM-Eintrag melden",
          "Dringende Fälle an die zuständige Person",
          "Tägliche Übersicht offener Anfragen",
        ],
      },
      documents: {
        name: "Dokumente & Rechnungen",
        event: "Fotos abgelegt",
        examples: [
          "Daten aus Rechnungen und Lieferscheinen auslesen",
          "Dateien im richtigen Ordner ablegen",
          "Angebote aus Vorlagen vorbereiten",
        ],
      },
    },
  },
} satisfies ServiceFeaturesCopy;

export default features;
