import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  siteEditor: {
    heading: "Texte und Zeiten ändern Sie selbst",
    copy: "Auf Wunsch bauen wir Ihre Website mit einem Redaktionssystem. Dann ändern Sie Überschriften, Öffnungszeiten und Hinweise selbst und veröffentlichen sie mit einem Klick. Probieren Sie es hier aus.",
    panelTitle: "Startseite bearbeiten",
    headlineLabel: "Überschrift",
    headlineDefault: "Ihr neues Bad aus einer Hand",
    hoursLabel: "Öffnungszeiten",
    hoursDefault: "Mo–Fr 8–17 Uhr",
    noticeLabel: "Hinweis oben auf der Seite",
    noticeText: "Im Dezember sind noch Termine frei.",
    publish: "Veröffentlichen",
    published: "Veröffentlicht",
    draft: "Entwurf",
    live: "Live",
    pageCopy: "Planung, Rückbau, Fliesen und Sanitär aus einem Betrieb in Hofheim.",
    pageCta: "Anfrage senden",
    hoursPrefix: "Geöffnet",
    photoAlt: "Fliesenwand eines Bads",
  },
  searchSources: {
    heading: "Was Google, Maps und KI-Assistenten von Ihrer Website lesen",
    copy: "Alle drei lesen dieselbe Seite, aber jeweils andere Teile davon. Wählen Sie einen Ort und sehen Sie, welcher Teil dort erscheint.",
    tabsLabel: "Ort, an dem Kunden suchen",
    forSearch: "Für Suchmaschinen",
    seoTitle: "Badsanierung in Hofheim | Mustermann Bäder",
    seoDescription: "Neues Bad in etwa drei Wochen, mit Planung, Fliesen und Sanitär aus einer Hand.",
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
  adCalculator: {
    heading: "Was eine Anfrage kostet",
    copy: "Wir bewerten Kampagnen nach den Kosten pro Anfrage, nicht nach Klicks. Ändern Sie die Werte und sehen Sie, wie viel eine bessere Zielseite ausmacht.",
    budget: "Budget pro Monat",
    cpc: "Preis pro Klick",
    rate: "Besucher, die anfragen",
    clicks: "Klicks",
    enquiries: "Anfragen",
    perEnquiry: "pro Anfrage",
    noEnquiry: "keine Anfrage",
    compareHeading: "Kosten pro Anfrage",
    today: "Mit dieser Zielseite",
    better: "Wenn {points} Prozentpunkte mehr anfragen",
    note: "Rechenbeispiel. Klickpreise hängen von Branche, Ort und Wettbewerb ab. Wir nennen Ihnen vor dem Start realistische Werte.",
  },
  enquiryLanes: {
    heading: "Was automatisch läuft und was bei Ihnen bleibt",
    copy: "Automatisierung übernimmt das Abtippen, Sortieren und Erinnern. Beratung, Aufmaß und Angebot bleiben bei Ihrem Team. Ein Beispiel mit einer Anfrage für eine Badsanierung:",
    lanes: { auto: "Automatisch", team: "Ihr Team" },
    steps: [
      {
        time: "Montag, 19:42",
        lane: "auto",
        items: [{ title: "Anfrage kommt an", detail: "Badsanierung in Hofheim, drei Fotos über das Formular" }],
      },
      {
        time: "eine Minute später",
        lane: "auto",
        items: [
          { title: "Bestätigung an die Kundin", detail: "„Wir melden uns bis Dienstag, 12 Uhr.“" },
          { title: "Eintrag im CRM", detail: "Name, Leistung, Ort und Fotos, ohne Abtippen" },
          { title: "Nachricht an Sie", detail: "Neue Anfrage mit Link zum Eintrag" },
        ],
      },
      {
        time: "Dienstag, 9:15",
        lane: "team",
        items: [{ title: "Rückruf und Termin", detail: "Sie beraten und vereinbaren das Aufmaß" }],
      },
      {
        time: "nach dem Aufmaß",
        lane: "team",
        items: [{ title: "Angebot", detail: "Sie kalkulieren und schicken das Angebot" }],
      },
      {
        time: "fünf Tage ohne Antwort",
        lane: "auto",
        items: [{ title: "Erinnerung mit Entwurf", detail: "Eine Nachfass-E-Mail liegt bereit, Sie geben sie frei" }],
      },
    ],
  },
} satisfies ServiceFeaturesCopy;

export default features;
