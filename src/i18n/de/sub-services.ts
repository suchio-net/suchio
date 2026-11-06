import type { SubServiceCopy } from "../sub-services";
import type { SubServiceId } from "@/lib/sub-service-routes";

const entries: readonly SubServiceCopy[] = [
  {
    id: "business-websites",
    name: "Unternehmenswebsites",
    summary: "Websites, die erklären, was Sie anbieten, und Besucher zur Anfrage führen.",
    metaTitle: "Website erstellen lassen für Unternehmen",
    metaDescription:
      "Unternehmenswebsite erstellen lassen: eine eigene Seite für jede Leistung und jeden Ort, schnell auf dem Handy, mit Messung der Anfragen. Die Website gehört Ihnen.",
    title: "Unternehmenswebsite erstellen lassen",
    intro:
      "Wir bauen Websites, die erklären, was Sie anbieten, und Besucher zur Anfrage führen. Sie laden schnell, funktionieren auf dem Handy und gehören am Ende Ihnen.",
    sections: [
      {
        heading: "So planen wir die Seiten",
        paragraphs: [
          "Zuerst klären wir, welche Anfragen Sie wollen und wonach Ihre Kunden suchen. Daraus entsteht die Seitenstruktur: eine eigene Seite für jede Leistung und, wenn Sie vor Ort arbeiten, für jedes wichtige Einsatzgebiet.",
          "Eine eigene Seite beantwortet genau die Fragen zu einer Leistung und kann bei Google für genau diese Leistung erscheinen. Jede Seite hat ein Ziel, etwa einen Anruf, eine Anfrage oder eine Buchung.",
        ],
      },
      {
        heading: "Texte, Bilder und Design",
        paragraphs: [
          "Die Texte schreiben wir mit Ihnen, denn die fachlichen Details kennen Sie am besten. Fotos Ihrer Arbeit bauen wir ein. Das Design entsteht an echten Seiten mit echten Inhalten. Jeden Zwischenstand sehen Sie unter einer Vorschau-Adresse und geben ihn frei.",
        ],
      },
      {
        heading: "Technik und Betrieb",
        paragraphs: [
          "Die Technik wählen wir nach Ihrem Projekt und legen uns nicht auf ein System fest. Jede Website erhält eigene Seitentitel, strukturierte Daten und eine Messung der Anfragen. Telefon, WhatsApp und Formular sind auf jeder Seite schnell erreichbar.",
          "Texte, Bilder und neue Seiten ändern Sie danach selbst. Hosting und Updates übernehmen wir ebenfalls.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Seitenstruktur nach den Suchbegriffen Ihrer Kunden",
        "Design für Handy und Desktop",
        "Texte, gemeinsam mit Ihnen geschrieben",
        "Redaktionssystem für Ihre eigenen Änderungen",
        "Messung der Anfragen",
        "Quellcode, Designs, Inhalte und alle Zugänge",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem kurzen Gespräch erhalten Sie ein schriftliches Angebot mit Umfang, Preis und Termin.",
      factors: [
        "Zahl der Seiten",
        "Funktionen wie Buchung oder Login",
        "Texte und Fotos",
        "Anbindung an vorhandene Programme",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Wir haben die WordPress-Website eines Sanierungsbetriebs neu gebaut. In Lighthouse auf dem Handy stieg die Performance von 65 auf 100. Der Hauptinhalt erscheint nach 1,8 statt nach 10,1 Sekunden.",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "how-many-pages",
        question: "Wie viele Seiten braucht unsere Website?",
        answer:
          "So viele, wie Sie Leistungen und wichtige Einsatzgebiete haben, dazu Kontakt, Über uns und die Pflichtseiten. Die genaue Zahl legen wir nach der Analyse der Suchbegriffe fest.",
      },
      {
        id: "existing-content",
        question: "Können wir vorhandene Texte und Bilder weiterverwenden?",
        answer:
          "Ja. Wir prüfen, was noch passt, und überarbeiten den Rest mit Ihnen. Fehlende Texte schreiben wir gemeinsam.",
      },
      {
        id: "which-system",
        question: "Welches System verwenden Sie?",
        answer:
          "Das hängt vom Projekt ab. Wir wählen die Technik nach Ihren Abläufen und danach, wer die Inhalte später pflegt. Sie erhalten in jedem Fall alle Zugänge und den Quellcode.",
      },
    ],
    related: [
      { to: "relaunch", text: "Sie haben schon eine Website? Dann geht es um einen Relaunch." },
      { to: "technical-seo", text: "Wie wir Fehler finden, die Google bremsen." },
      { to: "hosting-maintenance", text: "Betrieb und Updates nach dem Start." },
    ],
  },
  {
    id: "relaunch",
    name: "Website-Relaunch",
    summary: "Eine neue Website, bei der jede alte Adresse erhalten bleibt oder weiterleitet.",
    metaTitle: "Website-Relaunch ohne Ranking-Verlust",
    metaDescription:
      "Website-Relaunch mit geprüften Weiterleitungen: Wir prüfen jede alte Adresse, leiten per 301 weiter und kontrollieren nach dem Start die Indexierung bei Google.",
    title: "Website-Relaunch, ohne Ihre Rankings zu riskieren",
    intro:
      "Bei einem Relaunch können Seiten, die heute Anfragen bringen, aus Google verschwinden. Deshalb prüfen wir vor dem Neubau jede alte Adresse und kontrollieren nach dem Start, ob Google die neuen Seiten aufnimmt.",
    sections: [
      {
        heading: "Vor dem Neubau: jede Adresse prüfen",
        paragraphs: [
          "Wir erfassen alle Adressen der alten Website und prüfen Inhalte, Seitentitel, Fehlerseiten, den Zugriff von Crawlern und die Darstellung auf dem Handy. In der Google Search Console sehen wir, welche Seiten heute Besucher bringen. Diese Seiten behandeln wir beim Neubau zuerst.",
          "Das Ergebnis ist eine Liste aller Befunde, sortiert nach Dringlichkeit, und eine Tabelle, die für jede alte Adresse festlegt, wohin sie künftig führt.",
        ],
      },
      {
        heading: "Beim Start: Weiterleitungen und Tests",
        paragraphs: [
          "Alte Adressen bleiben gleich oder leiten per 301 auf die passende neue Seite. Wir testen jede Weiterleitung, bevor die neue Website online geht. E-Mail-Postfächer und Domain planen wir mit ein, damit beim Umzug keine Nachricht verloren geht.",
        ],
      },
      {
        heading: "Nach dem Start: Kontrolle in der Search Console",
        paragraphs: [
          "Wir reichen die neue Sitemap ein und prüfen, welche Seiten Google aufnimmt, welche Fehler auftreten und wie sich die wichtigsten Suchbegriffe entwickeln. Probleme beheben wir direkt. Rankings kann niemand garantieren, und auch nach einem sauberen Relaunch können sie zeitweise schwanken.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Prüfung aller alten Adressen mit Befundliste",
        "Tabelle aller Weiterleitungen",
        "Neue Website mit getesteten 301-Weiterleitungen",
        "Eingereichte Sitemap und Kontrolle der Indexierung",
        "Quellcode, Designs, Inhalte und alle Zugänge",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Den Umfang kennen wir nach einem ersten Blick auf die alte Website. Danach erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der alten Adressen",
        "Umfang der neuen Seiten und Texte",
        "Umzug von Domain, Hosting und E-Mail",
        "Technische Altlasten der alten Website",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Wir haben 64 Adressen geprüft und 45 Befunde notiert. Heute sind alle alten Adressen erreichbar oder leiten weiter, und Google meldet 32 von 33 Seiten der Sitemap als indexiert (Stand 28.10.2026).",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "lose-rankings",
        question: "Verlieren wir bei einem Relaunch unsere Rankings?",
        answer:
          "Das Risiko entsteht vor allem durch fehlende Weiterleitungen und verlorene Inhalte. Wir prüfen deshalb jede Adresse. Eine Garantie gibt es nicht, und Rankings können nach dem Start zeitweise schwanken.",
      },
      {
        id: "keep-urls",
        question: "Müssen sich unsere Adressen ändern?",
        answer:
          "Nein. Wo eine alte Adresse gut funktioniert, behalten wir sie. Eine Änderung schlagen wir nur vor, wenn sie die Struktur der Website verbessert, und dann leiten wir die alte Adresse weiter.",
      },
      {
        id: "keep-email",
        question: "Was passiert mit unseren E-Mail-Postfächern?",
        answer:
          "Sie können beim bisherigen Anbieter bleiben oder mit umziehen. Wir klären das vor dem Start, damit beim Wechsel keine Nachricht verloren geht.",
      },
    ],
    related: [
      { to: "technical-seo", text: "Die technische Prüfung gibt es auch ohne neue Website." },
      { to: "business-websites", text: "Wie wir die neuen Seiten planen und bauen." },
      { to: "hosting-maintenance", text: "Betrieb und Updates nach dem Relaunch." },
    ],
  },
  {
    id: "landing-pages",
    name: "Landingpages",
    summary: "Eine eigene Seite für jede Kampagne, mit genau einem Ziel.",
    metaTitle: "Landingpage erstellen lassen",
    metaDescription:
      "Landingpage erstellen lassen: eine Seite für eine Kampagne, mit einem klaren Ziel, schnell auf dem Handy und mit Messung der Anfragen für Google Ads und Social Ads.",
    title: "Landingpage erstellen lassen",
    intro:
      "Wer auf eine Anzeige klickt, sollte auf einer Seite landen, die genau dieses Angebot aufgreift. Wir bauen Landingpages mit einem Ziel und messen, wie viele Anfragen sie bringen.",
    sections: [
      {
        heading: "Eine Seite, ein Ziel",
        paragraphs: [
          "Überschrift, Aufbau und Formular führen zu einem Schritt: Anruf, Anfrage oder Buchung. Die Seite greift die Worte der Anzeige auf und beantwortet die Fragen, die vor der Entscheidung offen sind, etwa zu Ablauf, Preis und Einsatzgebiet.",
          "Sie lädt auch auf dem Handy schnell, weil Sie für jeden Klick bezahlen.",
        ],
      },
      {
        heading: "Messen und verbessern",
        paragraphs: [
          "Die Messung richten wir gleich mit ein. So sehen Sie, wie viele Anfragen eine Kampagne bringt und was eine Anfrage kostet. Zwei Varianten einer Seite können wir gegeneinander testen, wenn die Kampagne genug Besucher bringt.",
          "Die Seiten eignen sich für Kampagnen auf Google, Meta und LinkedIn. Die Kampagnen selbst übernehmen wir ebenfalls.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Text und Aufbau für ein Angebot",
        "Design für Handy und Desktop",
        "Formular oder Terminbuchung",
        "Conversion-Tracking mit Consent",
        "Varianten für Tests, wenn das Budget dafür reicht",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem kurzen Gespräch erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Seiten und Varianten",
        "Texte, Fotos und Videos",
        "Formulare und Anbindung ans CRM",
        "Einrichtung der Messung",
      ],
    },
    faqs: [
      {
        id: "landing-vs-website",
        question: "Warum reicht unsere normale Website nicht?",
        answer:
          "Eine normale Seite erklärt oft mehrere Leistungen und bietet viele Wege. Eine Landingpage nimmt das Angebot der Anzeige auf und führt zu einem Schritt. So zahlen Sie weniger für Besucher, die nichts finden.",
      },
      {
        id: "landing-domain",
        question: "Läuft die Landingpage auf unserer Domain?",
        answer:
          "Ja, in der Regel auf Ihrer Domain oder einer Subdomain. Sie gehört Ihnen, und Sie erhalten alle Zugänge.",
      },
      {
        id: "landing-seo",
        question: "Rankt eine Landingpage auch bei Google?",
        answer:
          "Meist ist sie für Anzeigen gebaut und hat dafür wenig Text. Soll eine Seite dauerhaft in der normalen Suche erscheinen, planen wir sie als Leistungsseite mit mehr Inhalt.",
      },
    ],
    related: [
      { to: "google-ads", text: "Die Kampagnen, die Besucher auf die Seite bringen." },
      { to: "ads-tracking", text: "Wie wir messen, welche Klicks zu Anfragen werden." },
      { to: "business-websites", text: "Wenn Sie mehr als eine einzelne Seite brauchen." },
    ],
  },
  {
    id: "online-shops",
    name: "Onlineshops",
    summary: "Shops, in denen Kunden schnell bis zur Zahlung kommen, angebunden an Versand und Warenwirtschaft.",
    metaTitle: "Onlineshop erstellen lassen",
    metaDescription:
      "Onlineshop erstellen lassen: Produktseiten, Checkout und Zahlungsarten, angebunden an Versand und Warenwirtschaft, mit E-Commerce-Tracking. Das System passt zu Ihrem Sortiment.",
    title: "Onlineshop erstellen lassen",
    intro:
      "Wir bauen Shops für Produkte, Abos und digitale Angebote. Kunden kommen schnell bis zur Zahlung, und Bestellungen laufen direkt in die Programme, die Sie schon nutzen.",
    sections: [
      {
        heading: "Fertiges Shopsystem oder eigene Lösung",
        paragraphs: [
          "Ob ein fertiges Shopsystem oder eine eigene Lösung passt, entscheiden wir nach Sortiment, Abläufen und Budget. Wir legen uns nicht vorab auf ein System fest. Am Anfang steht deshalb ein Gespräch über Produkte, Varianten, Versand und das, was Ihr Team täglich tut.",
        ],
      },
      {
        heading: "Vom Produkt bis zum Checkout",
        paragraphs: [
          "Wir bauen Kategorien, Produktseiten, Suche, Warenkorb und Checkout mit den Zahlungsarten Ihrer Kunden. Auf dem Handy bleibt der Checkout kurz. Pflichtangaben wie Preise, Versandkosten und Widerruf stehen dort, wo Kunden sie brauchen.",
        ],
      },
      {
        heading: "Anbindung und Messung",
        paragraphs: [
          "Bestände und Bestellungen laufen über Ihre Warenwirtschaft, damit niemand sie doppelt pflegt. Versanddienstleister binden wir an. E-Commerce-Tracking und Consent richten wir so ein, dass Sie sehen, welche Kanäle Umsatz bringen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Shop mit Kategorien, Produktseiten und Checkout",
        "Zahlungsarten und Versandregeln",
        "Anbindung an Warenwirtschaft und Versand",
        "Import Ihrer Produktdaten",
        "E-Commerce-Tracking mit Consent",
        "Einweisung für Ihr Team und alle Zugänge",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch über Sortiment und Abläufe erhalten Sie ein schriftliches Angebot. Laufende Gebühren für Shopsystem und Zahlungsanbieter stehen getrennt darin.",
      factors: [
        "Zahl der Produkte und Varianten",
        "Zahlungsarten und Versandregeln",
        "Anbindung an Warenwirtschaft und andere Programme",
        "Fertiges System oder eigene Lösung",
      ],
    },
    faqs: [
      {
        id: "shop-move",
        question: "Können Sie unseren bestehenden Shop umziehen?",
        answer:
          "Ja. Wir übernehmen Produkte, Kunden und Bestellungen, soweit das System es zulässt, und leiten alte Adressen auf die neuen Seiten weiter.",
      },
      {
        id: "shop-edit",
        question: "Können wir Produkte selbst pflegen?",
        answer:
          "Ja. Produkte, Preise und Inhalte ändern Sie selbst. Nach dem Start zeigen wir Ihrem Team, wie das geht.",
      },
      {
        id: "shop-accessibility",
        question: "Muss unser Shop barrierefrei sein?",
        answer:
          "Viele Shops für Endkunden fallen seit dem 28. Juni 2025 unter das Barrierefreiheitsstärkungsgesetz. Wir bauen Shops so, dass sie sich mit Tastatur und Screenreader bedienen lassen, und klären mit Ihnen, ob das Gesetz für Sie gilt.",
      },
    ],
    related: [
      { to: "accessibility", text: "Was das Barrierefreiheitsstärkungsgesetz für Shops bedeutet." },
      { to: "google-ads", text: "Shopping-Kampagnen für Ihre Produkte." },
      { to: "workflows", text: "Bestellungen und Daten automatisch weitergeben." },
    ],
  },
  {
    id: "accessibility",
    name: "Barrierefreie Websites",
    summary: "Websites und Shops, die sich auch mit Tastatur und Screenreader bedienen lassen.",
    metaTitle: "Barrierefreie Website erstellen (BFSG)",
    metaDescription:
      "Barrierefreie Website erstellen oder prüfen lassen: Kontraste, Formulare, Tastatur und Screenreader. Seit dem 28. Juni 2025 gilt das BFSG für viele Shops und Online-Dienste.",
    title: "Barrierefreie Website erstellen lassen",
    intro:
      "Wir bauen und überarbeiten Websites so, dass Menschen sie auch mit Tastatur und Screenreader bedienen können. Seit dem 28. Juni 2025 verlangt das Barrierefreiheitsstärkungsgesetz das von vielen Shops und Online-Diensten.",
    sections: [
      {
        heading: "Für wen das Gesetz gilt",
        paragraphs: [
          "Das Barrierefreiheitsstärkungsgesetz (BFSG) betrifft vor allem Angebote für Verbraucher, etwa Onlineshops und Websites, über die Kunden einen Vertrag abschließen können. Kleinstunternehmen, die Dienstleistungen anbieten, sind ausgenommen.",
          "Ob das Gesetz für Sie gilt, besprechen wir im ersten Gespräch. Eine Rechtsberatung ersetzt das nicht. Auch ohne Pflicht lohnt sich die Arbeit, denn eine klar aufgebaute Website ist für alle Besucher leichter zu bedienen.",
        ],
      },
      {
        heading: "Was wir prüfen",
        paragraphs: [
          "Als Maßstab nutzen wir die WCAG-Kriterien der Stufe AA. Wir prüfen Kontraste, Beschriftung von Formularen, die Reihenfolge der Überschriften, Texte zu Bildern und die vollständige Bedienung per Tastatur. Dazu kommen automatische Tests und Tests von Hand mit einem Screenreader.",
        ],
      },
      {
        heading: "Was danach passiert",
        paragraphs: [
          "Sie erhalten eine Liste der Mängel, sortiert nach Dringlichkeit. Die Fehler beheben wir selbst oder übergeben die Liste an Ihre Agentur. Bei einer neuen Website planen wir die Barrierefreiheit von Anfang an ein, das ist meist einfacher als eine spätere Korrektur. Wir entwerfen auch die Erklärung zur Barrierefreiheit, die das Gesetz verlangt.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Prüfung nach den WCAG-Kriterien der Stufe AA",
        "Liste der Mängel, nach Dringlichkeit sortiert",
        "Behebung der Fehler im Code und Design",
        "Entwurf der Erklärung zur Barrierefreiheit",
        "Tests per Tastatur und Screenreader",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem ersten Blick auf die Website erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Seitentypen",
        "Formulare, Checkout und Login",
        "Dokumente wie PDFs",
        "Prüfung allein oder Prüfung und Behebung",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Startseite, Kontakt und die Seite zur Badsanierung in Bad Nauheim erreichen in Lighthouse mobil in jeder Messung 100 Punkte für Barrierefreiheit. Automatische Tests finden nicht alle Probleme, deshalb prüfen wir zusätzlich von Hand.",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "bfsg-applies",
        question: "Gilt das BFSG für unsere Website?",
        answer:
          "Das hängt davon ab, ob Sie Verbrauchern einen Dienst anbieten, zum Beispiel einen Shop oder einen Vertragsabschluss online, und wie groß Ihr Unternehmen ist. Eine reine Informationsseite ist oft nicht betroffen. Im Zweifel fragen Sie eine Rechtsberatung.",
      },
      {
        id: "lighthouse-enough",
        question: "Reichen 100 Punkte in Lighthouse aus?",
        answer:
          "Nein. Lighthouse findet nur einen Teil der Probleme. Ob sich ein Formular mit einem Screenreader wirklich ausfüllen lässt, zeigt erst ein Test von Hand.",
      },
      {
        id: "accessibility-existing",
        question: "Können Sie eine bestehende Website barrierefrei machen?",
        answer: "Meist ja. Nach der Prüfung sagen wir Ihnen, was sich beheben lässt und wo ein Neubau günstiger wäre.",
      },
    ],
    related: [
      { to: "online-shops", text: "Shops gehören zu den Angeboten, die das Gesetz betrifft." },
      { to: "relaunch", text: "Barrierefreiheit gleich beim Neubau mit einplanen." },
      { to: "customer-portals", text: "Auch Portale müssen sich per Tastatur bedienen lassen." },
    ],
  },
  {
    id: "hosting-maintenance",
    name: "Hosting und Wartung",
    summary: "Betrieb, Updates, Datensicherung und neue Funktionen nach dem Start.",
    metaTitle: "Website-Wartung und Hosting",
    metaDescription:
      "Website-Wartung und Hosting: Wir betreiben Ihre Website, spielen Updates ein, sichern die Daten und bauen neue Funktionen. Die Website gehört weiter Ihnen.",
    title: "Website-Wartung und Hosting",
    intro:
      "Nach dem Start muss eine Website sicher laufen und mit Ihrem Betrieb mitwachsen. Wir übernehmen Hosting, Updates und Datensicherung und bauen neue Seiten und Funktionen.",
    sections: [
      {
        heading: "Was wir laufend tun",
        paragraphs: [
          "Wir betreiben die Website, spielen Updates ein, sichern die Daten und beobachten, ob sie erreichbar ist. Fällt etwas aus, erhalten wir eine Warnung und kümmern uns darum. Das gilt für Websites, die wir gebaut haben, und nach einer Prüfung auch für bestehende Websites.",
        ],
      },
      {
        heading: "Was Sie selbst ändern",
        paragraphs: [
          "Texte, Bilder und Öffnungszeiten ändern Sie selbst im Redaktionssystem. Neue Seiten und Funktionen bauen wir auf dem bestehenden System weiter, sodass Sie nicht von vorn anfangen müssen.",
        ],
      },
      {
        heading: "Sie bleiben unabhängig",
        paragraphs: [
          "Die Website gehört Ihnen. Sie erhalten Quellcode, Designs, Inhalte und alle Zugänge und können sie jederzeit mit einer anderen Agentur oder im eigenen Haus weiterführen. Domain und Hosting laufen auf Ihren Namen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Hosting und Überwachung der Erreichbarkeit",
        "Updates und Sicherheitskorrekturen",
        "Regelmäßige Datensicherung",
        "Ein direkter Ansprechpartner bei Problemen",
        "Neue Seiten und Funktionen nach Absprache",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Die laufenden Kosten stehen getrennt im Angebot. Größere Erweiterungen bieten wir einzeln an.",
      factors: [
        "Größe und Technik der Website",
        "Shop, Login und andere Funktionen",
        "Häufigkeit von Updates und Sicherungen",
        "Umfang der laufenden Änderungen",
      ],
    },
    faqs: [
      {
        id: "take-over-existing",
        question: "Übernehmen Sie auch Websites, die andere gebaut haben?",
        answer:
          "Ja. Zuerst prüfen wir Technik, Zugänge und den Stand der Updates. Danach sagen wir Ihnen, was wir übernehmen und was vorher behoben werden muss.",
      },
      {
        id: "cancel",
        question: "Was passiert, wenn wir den Vertrag beenden?",
        answer:
          "Sie erhalten alle Daten und Zugänge und können die Website bei einem anderen Anbieter weiterbetreiben.",
      },
      {
        id: "edit-without-us",
        question: "Müssen wir für jede Textänderung bei Ihnen anfragen?",
        answer: "Nein. Texte und Bilder ändern Sie selbst im Redaktionssystem. Wir zeigen Ihnen, wie das geht.",
      },
    ],
    related: [
      { to: "business-websites", text: "Wie wir neue Websites planen und bauen." },
      { to: "technical-seo", text: "Technische Fehler finden und nach Dringlichkeit beheben." },
    ],
  },
  {
    id: "web-apps",
    name: "Web-Apps",
    summary: "Anwendungen im Browser, die Ihr Team oder Ihre Kunden täglich nutzen.",
    metaTitle: "Web-App entwickeln lassen",
    metaDescription:
      "Web-App entwickeln lassen: vom klickbaren Prototyp bis zur fertigen Anwendung im Browser, mit Login, Rollen und Anbindung an Ihre Programme.",
    title: "Web-App entwickeln lassen",
    intro:
      "Eine Web-App läuft im Browser und braucht keine Installation. Wir bauen Anwendungen für Abläufe, die heute in Tabellen und E-Mails stecken, und verbinden sie mit Ihren Programmen.",
    sections: [
      {
        heading: "Erst der Prototyp",
        paragraphs: [
          "Wir schreiben auf, wer die Anwendung nutzt und welche Aufgaben sie erledigen soll. Danach entsteht ein klickbarer Prototyp, den Ihr Team testet, bevor wir programmieren. So sehen Sie früh, ob der Ablauf stimmt, und Änderungen kosten wenig.",
        ],
      },
      {
        heading: "Dann die Anwendung",
        paragraphs: [
          "Wir bauen Login, Rollen und Rechte, die Datenbank und die Anbindung an Programme, die Sie schon nutzen. Die Technik wählen wir nach Aufgabe und Nutzerzahl. Wir bauen in Abschnitten, sodass Sie regelmäßig einen nutzbaren Stand sehen.",
        ],
      },
      {
        heading: "Betrieb und Weiterentwicklung",
        paragraphs: [
          "Nach dem Start übernehmen wir Betrieb, Überwachung und Datensicherung und bauen neue Funktionen. Sie erhalten den Quellcode und die Dokumentation und können die Anwendung auch mit anderen weiterführen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Klickbarer Prototyp zum Testen",
        "Anwendung mit Login, Rollen und Rechten",
        "Anbindung an vorhandene Programme",
        "Betrieb, Überwachung und Datensicherung",
        "Quellcode und Dokumentation",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach dem Prototyp lässt sich der Umfang gut einschätzen. Sie erhalten ein schriftliches Angebot, das sich auch in Abschnitte teilen lässt.",
      factors: [
        "Zahl der Aufgaben und Rollen",
        "Anbindung an andere Programme",
        "Anforderungen an Datenschutz und Sicherheit",
        "Laufender Betrieb",
      ],
    },
    faqs: [
      {
        id: "web-vs-native",
        question: "Web-App oder App aus dem App Store?",
        answer:
          "Eine Web-App läuft auf jedem Gerät ohne Installation und lässt sich schneller ändern. Eine App aus dem App Store lohnt sich, wenn Sie Kamera, Benachrichtigungen oder Offline-Nutzung stark brauchen oder dort gefunden werden wollen.",
      },
      {
        id: "replace-excel",
        question: "Lohnt sich eine Web-App statt Excel?",
        answer:
          "Oft dann, wenn mehrere Personen dieselben Daten pflegen, Fehler teuer sind oder Kunden selbst etwas eingeben sollen. Bei wenigen Personen und einfachen Abläufen reicht eine Tabelle oder eine Automatisierung.",
      },
      {
        id: "web-app-owner",
        question: "Gehört uns der Quellcode?",
        answer: "Ja. Sie erhalten Quellcode, Dokumentation und alle Zugänge.",
      },
    ],
    related: [
      { to: "customer-portals", text: "Wenn Ihre Kunden die Anwendung nutzen sollen." },
      { to: "mobile-apps", text: "Wenn die Anwendung in den App Store soll." },
      { to: "ai-features", text: "KI-Funktionen in Ihre Anwendung einbauen." },
    ],
  },
  {
    id: "customer-portals",
    name: "Kundenportale",
    summary: "Kunden buchen Termine, verfolgen Aufträge und laden Dokumente hoch, ohne anzurufen.",
    metaTitle: "Kundenportal erstellen lassen",
    metaDescription:
      "Kundenportal erstellen lassen: Kunden buchen Termine, sehen den Stand ihrer Aufträge und laden Dokumente hoch. Mit sicherem Login und Anbindung an Ihre Programme.",
    title: "Kundenportal erstellen lassen",
    intro:
      "In einem Kundenportal erledigen Ihre Kunden selbst, wofür sie heute anrufen oder mailen. Ihr Team arbeitet mit denselben Daten und muss nichts doppelt pflegen.",
    sections: [
      {
        heading: "Was Kunden dort tun",
        paragraphs: [
          "Typisch sind Termine buchen, den Stand eines Auftrags sehen, Dokumente hoch- und herunterladen, Rechnungen abrufen und Nachrichten schreiben. Wir beginnen mit den Fragen, die Ihr Team am häufigsten beantwortet, denn dort spart das Portal am meisten Arbeit.",
        ],
      },
      {
        heading: "Anbindung an Ihre Programme",
        paragraphs: [
          "Das Portal holt Daten aus dem CRM, der Warenwirtschaft oder der Buchhaltung und schreibt Änderungen zurück. So sehen Kunden denselben Stand wie Ihr Team. Fehlt eine Schnittstelle, suchen wir einen anderen Weg und sagen Ihnen vorher, was das bedeutet.",
        ],
      },
      {
        heading: "Sicherheit und Datenschutz",
        paragraphs: [
          "Jeder Kunde sieht nur seine eigenen Daten. Vor dem Bau klären wir Rollen, Speicherort, Löschfristen und beteiligte Anbieter. Das Portal lässt sich mit Tastatur und Screenreader bedienen. Wir beginnen mit einem klickbaren Prototyp, den Sie mit echten Kunden testen können.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Klickbarer Prototyp zum Testen",
        "Portal mit sicherem Login und Kundenkonten",
        "Anbindung an CRM und andere Programme",
        "Benachrichtigungen per E-Mail",
        "Betrieb, Überwachung und Datensicherung",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Sie erhalten nach dem ersten Gespräch ein schriftliches Angebot. Oft ist es sinnvoll, mit wenigen Funktionen zu starten.",
      factors: [
        "Zahl der Funktionen",
        "Anbindung an vorhandene Programme",
        "Rollen und Freigaben",
        "Anforderungen an Datenschutz",
      ],
    },
    faqs: [
      {
        id: "portal-adoption",
        question: "Nutzen unsere Kunden so ein Portal überhaupt?",
        answer:
          "Das testen wir vor dem Bau mit einem Prototyp. Am besten funktioniert ein Portal, wenn es einen Weg kürzer macht, den Kunden ohnehin gehen, etwa einen Termin zu buchen oder eine Rechnung zu finden.",
      },
      {
        id: "portal-data",
        question: "Wo liegen die Daten?",
        answer:
          "Das legen wir vor dem Bau mit Ihnen fest. Wir wählen Anbieter und Speicherort nach Ihren rechtlichen Vorgaben und dokumentieren die Entscheidung.",
      },
      {
        id: "portal-website",
        question: "Ist das Portal Teil unserer Website?",
        answer:
          "Es lässt sich auf einer eigenen Adresse wie portal.ihre-domain.de betreiben und im Design Ihrer Website gestalten.",
      },
    ],
    related: [
      { to: "web-apps", text: "Wenn die Anwendung vor allem für Ihr Team gedacht ist." },
      { to: "leads-crm", text: "Anfragen automatisch ins CRM übernehmen." },
      { to: "accessibility", text: "Wie wir Barrierefreiheit prüfen." },
    ],
  },
  {
    id: "mobile-apps",
    name: "iOS- und Android-Apps",
    summary: "Apps für iPhone und Android, vom Prototyp bis zum Start im App Store.",
    metaTitle: "App entwickeln lassen: iOS und Android",
    metaDescription:
      "App entwickeln lassen für iOS und Android: klickbarer Prototyp, Entwicklung, Anbindung an Ihre Systeme und Veröffentlichung im App Store und bei Google Play.",
    title: "App entwickeln lassen für iOS und Android",
    intro:
      "Wir entwickeln Apps für iPhone und Android, vom klickbaren Prototyp bis zur Veröffentlichung im App Store und bei Google Play. Vorher klären wir, ob Sie wirklich eine App brauchen oder ob eine Web-App reicht.",
    sections: [
      {
        heading: "Brauchen Sie eine App?",
        paragraphs: [
          "Eine App lohnt sich, wenn Nutzer sie oft öffnen oder wenn sie Kamera, Standort, Benachrichtigungen oder Offline-Nutzung braucht. Für alles andere ist eine Web-App oft günstiger und schneller geändert. Das sagen wir Ihnen auch, wenn es gegen einen größeren Auftrag spricht.",
        ],
      },
      {
        heading: "Eine Codebasis oder zwei",
        paragraphs: [
          "Mit einer Cross-Platform-Lösung läuft eine Codebasis auf beiden Systemen. Das spart Zeit und Geld. Native Entwicklung für jedes System ist sinnvoll, wenn die App viel Rechenleistung oder sehr spezielle Gerätefunktionen braucht. Wir entscheiden das nach den Anforderungen Ihrer App.",
        ],
      },
      {
        heading: "Veröffentlichung und Pflege",
        paragraphs: [
          "Wir bereiten die Einträge im App Store und bei Google Play vor und begleiten die Prüfung. Neue Versionen von iOS und Android können Anpassungen nötig machen. Deshalb planen wir Updates und Fehlerkorrekturen von Anfang an mit ein.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Klickbarer Prototyp zum Testen",
        "App für iOS und Android",
        "Anbindung an Ihre Daten und Programme",
        "Veröffentlichung im App Store und bei Google Play",
        "Updates und Fehlerkorrekturen",
        "Quellcode und Zugänge",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach dem Prototyp lässt sich der Umfang gut einschätzen. Sie erhalten ein schriftliches Angebot. Laufende Gebühren der App Stores stehen getrennt darin.",
      factors: [
        "Zahl der Funktionen und Bildschirme",
        "Cross-Platform oder nativ",
        "Login, Zahlung und Offline-Nutzung",
        "Anbindung an andere Systeme",
      ],
    },
    faqs: [
      {
        id: "app-vs-web",
        question: "Reicht nicht auch eine Web-App?",
        answer:
          "Oft ja. Eine Web-App läuft ohne Installation im Browser. Eine App aus dem App Store lohnt sich, wenn Nutzer sie oft öffnen oder wenn sie Gerätefunktionen wie Benachrichtigungen oder Offline-Nutzung braucht.",
      },
      {
        id: "app-store-account",
        question: "Auf wessen Namen läuft die App im Store?",
        answer: "Auf Ihren. Die Konten bei Apple und Google gehören Ihnen, wir richten sie mit Ihnen ein.",
      },
      {
        id: "app-existing",
        question: "Können Sie eine bestehende App übernehmen?",
        answer:
          "Ja. Wir prüfen zuerst Code, Zugänge und Abhängigkeiten. Danach sagen wir Ihnen, ob sich die Weiterentwicklung lohnt oder ein Neubau besser ist.",
      },
    ],
    related: [
      { to: "web-apps", text: "Die Alternative ohne Installation." },
      { to: "customer-portals", text: "Wenn Kunden vor allem Aufträge und Dokumente sehen sollen." },
      { to: "ai-features", text: "KI-Funktionen in Ihre App einbauen." },
    ],
  },
  {
    id: "desktop-apps",
    name: "Desktop-Apps",
    summary: "Programme für Windows und Mac, wenn der Browser nicht ausreicht.",
    metaTitle: "Desktop-App entwickeln lassen",
    metaDescription:
      "Desktop-App für Windows und Mac entwickeln lassen: mit Zugriff auf Dateien und Geräte, Offline-Nutzung und automatischen Updates. Auch als Ablösung alter Programme.",
    title: "Desktop-App entwickeln lassen",
    intro:
      "Wir bauen Programme für Windows und Mac, wenn eine Anwendung auf lokale Dateien oder Geräte zugreifen oder offline laufen muss. Auch alte Programme, die niemand mehr pflegt, lösen wir ab.",
    sections: [
      {
        heading: "Wann sich eine Desktop-App lohnt",
        paragraphs: [
          "Eine Desktop-App ist sinnvoll, wenn sie große Dateien verarbeitet, Drucker, Scanner oder Maschinen ansteuert oder ohne Internet laufen muss. Reicht der Browser, empfehlen wir eine Web-App, denn sie braucht keine Installation und lässt sich leichter ändern.",
        ],
      },
      {
        heading: "Alte Programme ablösen",
        paragraphs: [
          "Viele Betriebe arbeiten mit Programmen, die nur noch auf einem alten Rechner laufen oder deren Entwickler nicht mehr erreichbar ist. Wir schreiben auf, was das Programm heute tut, übernehmen die Daten und bauen einen Nachfolger, der die vertrauten Abläufe beibehält, wo sie gut funktionieren.",
        ],
      },
      {
        heading: "Verteilung und Updates",
        paragraphs: [
          "Wir liefern ein Installationspaket für Ihre Rechner und richten automatische Updates ein. Bei der Anbindung an Server oder andere Programme klären wir vorab Zugriffsrechte und Datensicherung.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Klickbarer Prototyp zum Testen",
        "Programm für Windows, Mac oder beide",
        "Übernahme der vorhandenen Daten",
        "Installationspaket und automatische Updates",
        "Quellcode und Dokumentation",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch und dem Prototyp erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Funktionen",
        "Windows, Mac oder beide",
        "Anbindung an Geräte und andere Programme",
        "Übernahme alter Daten",
      ],
    },
    faqs: [
      {
        id: "desktop-vs-web",
        question: "Desktop-App oder Web-App?",
        answer:
          "Eine Web-App reicht, wenn Nutzer Internet haben und keine lokalen Geräte oder großen Dateien brauchen. Eine Desktop-App lohnt sich, wenn das nicht zutrifft.",
      },
      {
        id: "old-software",
        question: "Unser altes Programm läuft nur noch auf einem Rechner. Was tun?",
        answer:
          "Sichern Sie zuerst die Daten. Dann prüfen wir, wie sie sich auslesen lassen, und schreiben auf, was das Programm tut. Danach planen wir den Nachfolger.",
      },
      {
        id: "desktop-mac-windows",
        question: "Läuft das Programm auf Windows und Mac?",
        answer:
          "Das können wir mit einer gemeinsamen Codebasis lösen. Brauchen Sie nur ein System, wird die Entwicklung meist einfacher.",
      },
    ],
    related: [
      { to: "web-apps", text: "Die Alternative ohne Installation." },
      { to: "workflows", text: "Das Programm mit Ihren anderen Programmen verbinden." },
    ],
  },
  {
    id: "technical-seo",
    name: "Technisches SEO und Audit",
    summary: "Wir finden die Fehler, die Google und KI-Crawler bremsen, und sortieren sie nach Dringlichkeit.",
    metaTitle: "Technisches SEO und SEO-Audit",
    metaDescription:
      "Technisches SEO und SEO-Audit: Wir prüfen Crawling, Indexierung, Weiterleitungen, Ladezeit und strukturierte Daten. Sie erhalten eine Befundliste nach Dringlichkeit.",
    title: "Technisches SEO und SEO-Audit",
    intro:
      "Wir prüfen jede Adresse Ihrer Website und finden die Fehler, die Google und KI-Crawler bremsen. Sie erhalten eine Liste nach Dringlichkeit. Die Fehler beheben wir selbst oder geben die Liste an Ihre Agentur.",
    sections: [
      {
        heading: "Was wir prüfen",
        paragraphs: [
          "Wir prüfen Crawling und Indexierung, Weiterleitungen, Fehlerseiten, doppelte Inhalte, Seitentitel, interne Links, strukturierte Daten, die robots.txt, die Sitemap und die Ladezeit auf dem Handy. Dazu lesen wir Ihre Daten aus der Google Search Console, denn sie zeigen, welche Seiten Google tatsächlich aufnimmt.",
        ],
      },
      {
        heading: "Was Sie danach in der Hand haben",
        paragraphs: [
          "Jeder Befund nennt die betroffenen Seiten, die Folge und eine konkrete Anweisung. Die Liste ist nach Dringlichkeit sortiert. Sie sehen also, was Sie sofort beheben sollten und was warten kann. Vieles lässt sich schnell beheben. Größere Umbauten planen wir als eigenes Projekt.",
        ],
      },
      {
        heading: "Auch für KI-Crawler",
        paragraphs: [
          "Wir prüfen, ob Crawler wie GPTBot Ihre Seiten lesen dürfen und ob Hoster oder Firewall sie sperren. Eine gesperrte Website kann in KI-Antworten kaum als Quelle erscheinen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Prüfung aller Adressen Ihrer Website",
        "Befundliste nach Dringlichkeit",
        "Konkrete Anweisung für jeden Befund",
        "Behebung durch uns oder Übergabe an Ihre Agentur",
        "Kontrolle in der Search Console nach den Korrekturen",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem ersten Blick auf die Website erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Adressen",
        "Technik der Website",
        "Audit allein oder Audit und Behebung",
        "Zugang zu Search Console und Server",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Bei 64 geprüften Adressen haben wir 45 Befunde notiert, darunter eine von fünf Seiten verlinkte Fehlerseite und eine robots.txt, die CSS und JavaScript sperrte. Google meldet heute 32 von 33 Seiten der Sitemap als indexiert (Stand 28.10.2026).",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "audit-tool",
        question: "Reicht nicht ein SEO-Tool?",
        answer:
          "Ein Tool findet viele technische Fehler, sagt aber nicht, welche bei Ihnen wichtig sind. Wir prüfen die Ergebnisse von Hand und sortieren sie nach ihrer Wirkung auf Ihre Seiten.",
      },
      {
        id: "audit-access",
        question: "Welche Zugänge brauchen Sie?",
        answer:
          "Für ein vollständiges Audit brauchen wir Lesezugriff auf die Google Search Console. Ein erster Blick ist auch ohne Zugang möglich, denn die meisten Prüfungen laufen von außen.",
      },
      {
        id: "audit-agency",
        question: "Wir haben schon eine Agentur. Geht das trotzdem?",
        answer: "Ja. Sie erhalten die Liste und können sie an Ihre Agentur weitergeben.",
      },
    ],
    related: [
      { to: "relaunch", text: "Wenn die Prüfung einen Neubau nahelegt." },
      { to: "seo-content", text: "Wenn die Technik stimmt, aber Inhalte fehlen." },
      { to: "geo", text: "Wie Ihr Betrieb in KI-Antworten erscheint." },
    ],
  },
  {
    id: "local-seo",
    name: "Lokales SEO",
    summary: "Damit Kunden Sie in Google Maps und bei Suchen mit Ortsnamen finden.",
    metaTitle: "Lokales SEO und Google-Unternehmensprofil",
    metaDescription:
      "Lokales SEO für Betriebe vor Ort: Google-Unternehmensprofil, Ortsseiten mit echten Inhalten, Einträge in Verzeichnissen und ein einfacher Weg zu mehr Bewertungen.",
    title: "Lokales SEO: in Google Maps gefunden werden",
    intro:
      "Wer vor Ort arbeitet, wird über Google Maps und Suchen mit Ortsnamen gefunden. Wir pflegen Ihr Google-Unternehmensprofil, bauen Ortsseiten mit echten Inhalten und helfen Ihnen zu mehr Bewertungen.",
    sections: [
      {
        heading: "Google-Unternehmensprofil",
        paragraphs: [
          "Wir pflegen Ihr Profil vollständig: Kategorien, Leistungen, Öffnungszeiten, Fotos und Beiträge. Name, Adresse und Telefonnummer stimmen wir auf Ihrer Website und in Branchenverzeichnissen ab, damit überall dieselben Angaben stehen.",
        ],
      },
      {
        heading: "Ortsseiten mit echten Inhalten",
        paragraphs: [
          "Für jeden wichtigen Ort entsteht eine eigene Seite mit Inhalten, die nur dort gelten, etwa Stadtteile, Entfernung oder örtliche Vorschriften. Seiten, auf denen nur der Ortsname wechselt, helfen weder Kunden noch Google. Deshalb bauen wir nur so viele Seiten, wie wir mit echten Angaben füllen können.",
        ],
      },
      {
        heading: "Bewertungen",
        paragraphs: [
          "Wir richten einen einfachen Weg ein, mit dem Sie zufriedene Kunden um eine Bewertung bitten, zum Beispiel per Link oder QR-Code. Auf Bewertungen antworten Sie selbst oder mit unserem Entwurf. Gekaufte oder erfundene Bewertungen gehören nicht zu unserer Arbeit.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Vollständig gepflegtes Google-Unternehmensprofil",
        "Einheitliche Angaben in wichtigen Verzeichnissen",
        "Ortsseiten mit echten Inhalten",
        "Link oder QR-Code für Bewertungen",
        "Bericht zu Anrufen, Routen und Besuchen",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem kurzen Gespräch erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Standorte und Einsatzgebiete",
        "Zustand von Profil und Website",
        "Zahl der neuen Ortsseiten",
        "Einmalige Einrichtung oder laufende Pflege",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Vier alte Ortsseiten hatten zu 85 bis 90 Prozent denselben Text. Die neuen Seiten nennen Entfernung, Stadtteile, die Wasserhärte des Versorgers und den Denkmalschutz. Gleicher Text: 19 bis 28 Prozent.",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "local-no-office",
        question: "Wir haben kein Ladengeschäft. Geht lokales SEO trotzdem?",
        answer:
          "Ja. Auch Betriebe, die zum Kunden fahren, können ein Unternehmensprofil mit Einsatzgebiet führen und Seiten für die wichtigen Orte haben.",
      },
      {
        id: "local-pages-count",
        question: "Wie viele Ortsseiten sollten wir haben?",
        answer:
          "So viele, wie Sie dort wirklich arbeiten und mit eigenen Angaben füllen können. Viele fast gleiche Seiten schaden eher, als dass sie helfen.",
      },
      {
        id: "local-reviews",
        question: "Dürfen wir Kunden um Bewertungen bitten?",
        answer: "Ja. Sie dürfen darum bitten, aber keine Gegenleistung dafür anbieten und keine Bewertungen kaufen.",
      },
    ],
    related: [
      { to: "seo-content", text: "Texte für Ihre Leistungs- und Ortsseiten." },
      { to: "business-websites", text: "Eine Website mit eigenen Seiten für jeden Ort." },
      { to: "google-ads", text: "Sichtbar werden, solange die Rankings noch wachsen." },
    ],
  },
  {
    id: "geo",
    name: "KI-Sichtbarkeit (GEO)",
    summary: "Damit ChatGPT, Perplexity und Googles KI-Übersicht Ihren Betrieb finden und nennen können.",
    metaTitle: "GEO-Agentur: Sichtbar in ChatGPT und KI-Suche",
    metaDescription:
      "GEO und KI-Sichtbarkeit: Wir prüfen, was ChatGPT, Perplexity und Googles KI-Übersicht über Ihren Betrieb sagen, und machen Ihre Angaben leicht zitierbar.",
    title: "GEO: sichtbar in ChatGPT und KI-Antworten",
    intro:
      "Manche Kunden fragen heute eine KI, wen sie beauftragen sollen. Wir prüfen, was ChatGPT, Perplexity und Googles KI-Übersicht über Ihren Betrieb sagen, und machen Ihre Angaben leicht auffindbar und zitierbar.",
    sections: [
      {
        heading: "Was GEO ist",
        paragraphs: [
          "GEO steht für Generative Engine Optimization. Ziel ist, dass KI-Dienste Ihren Betrieb kennen und nennen, wenn jemand nach Ihrer Leistung fragt. GEO baut auf SEO auf und ersetzt es nicht: Eine Seite, die Google nicht findet und die Crawler nicht lesen dürfen, kann auch eine KI schwer verwenden.",
        ],
      },
      {
        heading: "Wie wir den Stand messen",
        paragraphs: [
          "Wir stellen den KI-Diensten die Fragen Ihrer Kunden und halten fest, wen sie nennen und welche Quellen sie zitieren. So sehen Sie, wo Ihr Betrieb fehlt und welche Seiten anderer die Antworten prägen. KI-Antworten schwanken. Deshalb wiederholen wir die Messung und achten auf die Tendenz.",
        ],
      },
      {
        heading: "Was wir ändern",
        paragraphs: [
          "Wir geben KI-Crawlern Zugriff, schreiben klare Antworten auf echte Fragen, ergänzen strukturierte Daten und machen Angaben zu Leistungen und Standort eindeutig. Dazu kommen Erwähnungen auf anderen Seiten, denn KI-Dienste stützen sich auf mehrere Quellen. Eine bestimmte Nennung kann niemand garantieren.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Messung Ihrer Sichtbarkeit in KI-Antworten",
        "Liste der Quellen, die KI-Dienste nennen",
        "Prüfung des Zugriffs für KI-Crawler",
        "Überarbeitete Inhalte und strukturierte Daten",
        "Plan für Erwähnungen auf anderen Seiten",
        "Wiederholte Messung und Bericht",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem kurzen Gespräch erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Fragen und Dienste, die wir messen",
        "Zustand von Technik und Inhalten",
        "Umfang der neuen Inhalte",
        "Einmalige Prüfung oder laufende Arbeit",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Der Crawler GPTBot von OpenAI bekam vom alten Hoster den Fehler 429, und die robots.txt sperrte wichtige Ordner. Heute dürfen Suchmaschinen und KI-Crawler jede Seite lesen. Das schafft die Voraussetzung, garantiert aber keine Nennung.",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "geo-vs-seo",
        question: "Brauchen wir GEO zusätzlich zu SEO?",
        answer:
          "GEO ergänzt SEO. Die Grundlagen sind dieselben: erreichbare Seiten, klare Inhalte und eindeutige Angaben. Dazu kommen die Messung in KI-Diensten und die Quellen, auf die sie sich stützen.",
      },
      {
        id: "geo-guarantee",
        question: "Können Sie eine Nennung in ChatGPT garantieren?",
        answer:
          "Nein, das kann niemand. KI-Antworten ändern sich je nach Frage und Zeitpunkt. Wir verbessern die Voraussetzungen und messen, ob Ihr Betrieb häufiger genannt wird.",
      },
      {
        id: "geo-block",
        question: "Sollten wir KI-Crawler sperren?",
        answer:
          "Wer in KI-Antworten erscheinen will, sollte zumindest die öffentlichen Seiten freigeben. Inhalte, die Sie verkaufen, können Sie davon ausnehmen. Das entscheiden wir gemeinsam.",
      },
    ],
    related: [
      { to: "technical-seo", text: "Die Technik, auf der GEO aufbaut." },
      { to: "seo-content", text: "Inhalte, die Fragen klar beantworten." },
    ],
  },
  {
    id: "seo-content",
    name: "SEO-Texte und Inhalte",
    summary: "Seiten zu den Suchbegriffen Ihrer Kunden, von der Recherche bis zum fertigen Text.",
    metaTitle: "SEO-Texte schreiben lassen",
    metaDescription:
      "SEO-Texte und Inhalte: Wir recherchieren, wonach Ihre Kunden suchen, planen die Seiten und schreiben Leistungsseiten und Ratgeber, fachlich mit Ihnen abgestimmt.",
    title: "SEO-Texte, die echte Fragen beantworten",
    intro:
      "Wir finden heraus, wonach Ihre Kunden suchen, und schreiben die Seiten, die dafür fehlen. Fachliche Details stimmen wir mit Ihnen ab, damit jeder Text stimmt.",
    sections: [
      {
        heading: "Recherche",
        paragraphs: [
          "Wir werten Suchbegriffe, Suchvolumen und die Absicht dahinter aus: Will jemand kaufen, vergleichen oder sich informieren? Dann sehen wir uns an, was Ihre Wettbewerber zu diesen Begriffen zeigen und wofür Ihre Website heute schon rankt.",
          "Sie erhalten einen Plan: welche Seite für welchen Begriff zuständig ist, welche neuen Seiten entstehen und in welcher Reihenfolge. Begriffe mit viel Suchvolumen, aber ohne Kaufabsicht, stehen weit hinten.",
        ],
      },
      {
        heading: "Schreiben und überarbeiten",
        paragraphs: [
          "Wir schreiben Leistungsseiten und Ratgeber und überarbeiten bestehende Seiten. Jede Seite erhält einen eigenen Titel, eine Beschreibung, eine logische Reihenfolge der Überschriften und interne Links. Behandeln mehrere Seiten dasselbe Thema, führen wir sie zusammen.",
          "Bevor wir schreiben, sprechen wir mit Ihnen, denn die Erfahrung aus Ihren Aufträgen kann kein Text aus dem Netz ersetzen. KI nutzen wir als Hilfe, veröffentlicht wird nur, was ein Mensch geprüft hat.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Liste der Suchbegriffe mit Suchabsicht",
        "Plan: welche Seite für welchen Begriff",
        "Fertige Texte oder Briefings für Ihr Team",
        "Seitentitel, Beschreibungen und interne Links",
        "Auswertung nach der Veröffentlichung",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach der Recherche wissen wir, wie viele Seiten sich lohnen. Sie erhalten ein schriftliches Angebot.",
      factors: [
        "Zahl und Länge der Seiten",
        "Fachlicher Aufwand im Thema",
        "Neue Texte oder Überarbeitung",
        "Einmaliges Projekt oder laufende Arbeit",
      ],
    },
    faqs: [
      {
        id: "content-ai",
        question: "Schreiben Sie die Texte mit KI?",
        answer:
          "KI hilft uns bei Recherche und Entwürfen. Wir prüfen jeden Text und stimmen fachliche Details mit Ihnen ab. Ungeprüfte KI-Texte veröffentlichen wir nicht.",
      },
      {
        id: "content-length",
        question: "Wie lang muss ein SEO-Text sein?",
        answer:
          "Eine feste Länge gibt es nicht. Ein Text ist lang genug, wenn er die Fragen zum Thema beantwortet. Wir orientieren uns an den Fragen Ihrer Kunden.",
      },
      {
        id: "content-time",
        question: "Wie viel Zeit müssen wir einplanen?",
        answer: "Meist ein Gespräch pro Thema und eine Prüfung des Entwurfs. Den Rest übernehmen wir.",
      },
    ],
    related: [
      { to: "technical-seo", text: "Wenn gute Seiten nicht bei Google ankommen." },
      { to: "local-seo", text: "Inhalte für Ihre Ortsseiten." },
      { to: "geo", text: "Wie aus Texten Quellen für KI-Antworten werden." },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    summary: "Such- und Shopping-Anzeigen für Menschen, die gerade nach Ihrem Angebot suchen.",
    metaTitle: "Google-Ads-Agentur: Kampagnen und Betreuung",
    metaDescription:
      "Google Ads von der Agentur: Suchbegriffe, Such- und Shopping-Kampagnen, Anzeigentexte und Messung der Anfragen. Bestehende Konten prüfen und übernehmen wir.",
    title: "Google Ads: Anzeigen für aktive Suchen",
    intro:
      "Google-Anzeigen erreichen Menschen, die gerade nach Ihrem Angebot suchen. Wir bauen und betreuen Such- und Shopping-Kampagnen und messen, was eine Anfrage kostet.",
    sections: [
      {
        heading: "Aufbau der Kampagnen",
        paragraphs: [
          "Wir recherchieren die Suchbegriffe und schätzen die Klickpreise in Ihrer Branche und Region. Dann bauen wir Suchkampagnen, bei Onlineshops auch Shopping-Kampagnen, schreiben Anzeigentexte und Erweiterungen und legen fest, wo die Anzeigen erscheinen.",
        ],
      },
      {
        heading: "Laufende Betreuung",
        paragraphs: [
          "Wir lesen die tatsächlichen Suchbegriffe, schließen unpassende aus und passen Gebote und Budgets an. Anzeigen testen wir in Varianten. Automatische Gebotsstrategien nutzen wir, wenn das Konto genug verlässliche Daten liefert.",
        ],
      },
      {
        heading: "Bestehende Konten",
        paragraphs: [
          "Ein bestehendes Konto prüfen wir zuerst: Zählt es echte Anfragen, wofür zahlen Sie gerade und passt die Seite zur Anzeige? Danach entscheiden wir, was bleibt, was wir aufräumen und was wir neu aufbauen. Konto und Daten bleiben bei Ihnen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Recherche der Suchbegriffe und Klickpreise",
        "Such- und Shopping-Kampagnen",
        "Anzeigentexte und Erweiterungen",
        "Conversion-Tracking für Anfragen und Käufe",
        "Regelmäßiger Bericht mit Kosten pro Anfrage",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Werbebudget und unser Honorar stehen getrennt im Angebot. Das Budget zahlen Sie direkt an Google.",
      factors: [
        "Zahl der Kampagnen und Angebote",
        "Neuaufbau oder Übernahme eines Kontos",
        "Einrichtung der Messung",
        "Umfang der laufenden Betreuung",
      ],
    },
    faqs: [
      {
        id: "google-budget",
        question: "Wie viel Budget brauchen wir für Google Ads?",
        answer:
          "Das hängt von den Klickpreisen in Ihrer Branche und Region ab. Vor dem Start schätzen wir sie und sagen Ihnen, welches Budget für einen aussagekräftigen Test nötig ist.",
      },
      {
        id: "google-vs-seo",
        question: "Google Ads oder SEO?",
        answer:
          "Anzeigen bringen sofort Besucher und enden, wenn das Budget endet. SEO braucht länger und bringt danach Besucher ohne Klickkosten. Oft ist beides sinnvoll: Anzeigen für den Start, SEO für die Zeit danach.",
      },
      {
        id: "google-account-owner",
        question: "Wem gehört das Google-Ads-Konto?",
        answer:
          "Ihnen. Wir arbeiten mit Zugriff auf Ihr Konto. So behalten Sie alle Daten, auch wenn Sie die Agentur wechseln.",
      },
    ],
    related: [
      { to: "landing-pages", text: "Die Seite, auf der die Anzeige landet." },
      { to: "ads-tracking", text: "Wie wir Klicks und Anfragen verbinden." },
      { to: "social-ads", text: "Menschen erreichen, bevor sie aktiv suchen." },
    ],
  },
  {
    id: "social-ads",
    name: "Social Ads",
    summary: "Anzeigen auf Meta, LinkedIn und anderen Netzwerken für Menschen, die noch nicht aktiv suchen.",
    metaTitle: "Social-Ads-Agentur: Meta und LinkedIn",
    metaDescription:
      "Social Ads auf Facebook, Instagram, LinkedIn und anderen Netzwerken: Zielgruppen, Anzeigen, Retargeting und Messung der Anfragen, gemessen an den Kosten pro Anfrage.",
    title: "Social Ads auf Meta, LinkedIn und mehr",
    intro:
      "Social Ads erreichen Menschen, bevor sie aktiv suchen. Wir wählen die Netzwerke nach Ihren Kunden, gestalten die Anzeigen und messen, was daraus an Anfragen entsteht.",
    sections: [
      {
        heading: "Das passende Netzwerk",
        paragraphs: [
          "Für Privatkunden sind das meist Facebook und Instagram, für Geschäftskunden eher LinkedIn. Andere Netzwerke prüfen wir, wenn Ihre Kunden dort sind. Zielgruppen wählen wir nach Region, Interessen oder Beruf.",
        ],
      },
      {
        heading: "Neue Zielgruppen und Retargeting",
        paragraphs: [
          "Wir trennen Kampagnen für neue Zielgruppen von Retargeting für Menschen, die Ihre Website schon besucht haben. Format und Botschaft passen wir an den Kanal an. Budget verschieben wir zu den Platzierungen, die Anfragen bringen.",
        ],
      },
      {
        heading: "Anzeigen in Varianten",
        paragraphs: [
          "Wir texten und gestalten Bild- und Videoanzeigen. Jede Variante prüft eine Annahme, zum Beispiel ob der Preis oder die schnelle Verfügbarkeit mehr Anfragen bringt. Weil Anzeigen mit der Zeit weniger wirken, planen wir regelmäßig neue ein.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Auswahl von Netzwerken und Zielgruppen",
        "Bild-, Video- und Textanzeigen in Varianten",
        "Kampagnen für neue Zielgruppen und Retargeting",
        "Tracking mit Consent",
        "Regelmäßiger Bericht mit Kosten pro Anfrage",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Werbebudget und unser Honorar stehen getrennt im Angebot. Das Budget zahlen Sie direkt an das Netzwerk.",
      factors: [
        "Zahl der Netzwerke",
        "Produktion von Bildern und Videos",
        "Einrichtung des Trackings",
        "Umfang der laufenden Betreuung",
      ],
    },
    faqs: [
      {
        id: "social-b2b",
        question: "Funktionieren Social Ads auch für B2B?",
        answer:
          "Ja, LinkedIn erlaubt Zielgruppen nach Beruf und Branche. Die Klicks sind dort oft teurer. Deshalb prüfen wir vorher, ob ein Test für Ihr Budget sinnvoll ist.",
      },
      {
        id: "social-organic",
        question: "Betreuen Sie auch unsere normalen Social-Media-Kanäle?",
        answer:
          "Unser Schwerpunkt sind bezahlte Anzeigen. Inhalte aus den Anzeigen können Sie auch auf Ihren Kanälen nutzen.",
      },
      {
        id: "social-tracking",
        question: "Dürfen wir ohne Einwilligung tracken?",
        answer:
          "Für Marketing-Tracking brauchen Sie in der Regel eine Einwilligung. Wir richten Consent und Messung so ein, dass beides zusammenpasst.",
      },
    ],
    related: [
      { to: "google-ads", text: "Menschen erreichen, die gerade aktiv suchen." },
      { to: "landing-pages", text: "Die Seite nach dem Klick." },
      { to: "ads-tracking", text: "Messung mit Consent und Plattform-Signalen." },
    ],
  },
  {
    id: "ads-tracking",
    name: "Tracking und Conversion",
    summary: "Sie sehen, welche Kampagne Anfragen bringt und was eine Anfrage kostet.",
    metaTitle: "Conversion-Tracking einrichten lassen",
    metaDescription:
      "Conversion-Tracking einrichten lassen: Formulare, Anrufe und Käufe messen, mit Consent und den Signalen für Google und Meta. So sehen Sie die Kosten pro Anfrage.",
    title: "Verlässliches Conversion-Tracking",
    intro:
      "Ohne verlässliche Messung entscheiden Sie und die Gebotsstrategien von Google und Meta nach falschen Zahlen. Wir richten Tracking ein, das Werbeausgaben mit echten Anfragen und Käufen verbindet.",
    sections: [
      {
        heading: "Was wir messen",
        paragraphs: [
          "Wir messen Formulare, Anrufe, Buchungen und Käufe und legen gemeinsam fest, was als gute Anfrage zählt. Klicks und Seitenaufrufe allein sagen wenig. Wo es möglich ist, gleichen wir Anfragen mit dem Ergebnis im CRM ab, damit Sie sehen, welche Kampagne zu Aufträgen führt.",
        ],
      },
      {
        heading: "Consent und Datenschutz",
        paragraphs: [
          "Wir richten Consent so ein, dass Einwilligungen beachtet werden, und übergeben Google und Meta die Signale, die sie auf dieser Grundlage nutzen dürfen. Wir prüfen auch, ob Ihr Kontaktformular ohne Marketing-Cookies funktioniert. Rechtliche Fragen klären Sie mit Ihrer Datenschutzberatung.",
        ],
      },
      {
        heading: "Berichte, die etwas sagen",
        paragraphs: [
          "Im Bericht stehen Ausgaben, Anfragen, Kosten pro Anfrage und die nächsten Schritte für jeden Kanal. Wir erklären auch, wo die Messung Lücken hat, denn Besucher, die Cookies ablehnen, fehlen in den Daten.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Prüfung des vorhandenen Trackings",
        "Messung von Formularen, Anrufen und Käufen",
        "Consent und Plattform-Signale",
        "Abgleich mit dem CRM, wo möglich",
        "Bericht mit Kosten pro Anfrage",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Blick auf Website und Konten erhalten Sie ein schriftliches Angebot.",
      factors: [
        "Zahl der Websites und Formulare",
        "Zahl der Werbekonten",
        "Anbindung ans CRM",
        "Einmalige Einrichtung oder laufende Pflege",
      ],
    },
    proof: {
      heading: "Beispiel: Handwerker.work",
      text: "Auf der alten Website funktionierte das Kontaktformular nur, wenn Besucher Marketing-Cookies erlaubten. Wer ablehnte, konnte nicht anfragen. Heute funktioniert das Formular ohne Zustimmung zu Cookies.",
      link: "Referenz ansehen",
    },
    faqs: [
      {
        id: "tracking-loss",
        question: "Warum zeigen Google Ads und Analytics andere Zahlen?",
        answer:
          "Sie zählen unterschiedlich, etwa beim Zeitpunkt und bei der Zuordnung zu einem Kanal. Dazu kommen Besucher ohne Einwilligung. Wir legen fest, welche Zahl für welche Entscheidung gilt.",
      },
      {
        id: "tracking-phone",
        question: "Lassen sich auch Anrufe messen?",
        answer:
          "Ja. Wir messen Klicks auf die Telefonnummer und je nach Bedarf Anrufe über eine eigene Nummer für die Kampagne.",
      },
      {
        id: "tracking-seo",
        question: "Brauchen wir das auch ohne Anzeigen?",
        answer:
          "Ja, wenn Sie wissen wollen, welche Seiten und Kanäle Anfragen bringen. Dieselbe Messung zeigt auch, was SEO bringt.",
      },
    ],
    related: [
      { to: "google-ads", text: "Kampagnen, die auf echten Anfragen beruhen." },
      { to: "leads-crm", text: "Anfragen automatisch ins CRM übernehmen." },
      { to: "landing-pages", text: "Seiten, deren Anfragen sich messen lassen." },
    ],
  },
  {
    id: "leads-crm",
    name: "Anfragen und CRM",
    summary: "Neue Anfragen landen sofort bei der richtigen Person, ohne Abtippen.",
    metaTitle: "CRM-Automatisierung für Anfragen",
    metaDescription:
      "CRM-Automatisierung: Anfragen aus Website, Kampagne und E-Mail landen automatisch im CRM, werden bewertet und an die richtige Person weitergeleitet.",
    title: "Anfragen automatisch ins CRM",
    intro:
      "Anfragen aus Website, Kampagne oder E-Mail gehen automatisch ins CRM und bei der richtigen Person ein. Niemand tippt ab, und keine Anfrage bleibt liegen.",
    sections: [
      {
        heading: "Von der Anfrage bis zur Person",
        paragraphs: [
          "Das System legt den Kontakt an, ergänzt fehlende Daten, bewertet die Anfrage nach Anliegen und Dringlichkeit und leitet sie weiter. Der Kunde erhält sofort eine Bestätigung. Freitext aus Formularen und E-Mails liest eine KI aus, feste Felder übernimmt eine einfache Regel.",
        ],
      },
      {
        heading: "Nachfassen und Überblick",
        paragraphs: [
          "Bleibt eine Anfrage liegen, erinnert das System daran. Der Status in der Pipeline bleibt aktuell. So sehen Sie, wie viele Anfragen offen sind, woher sie kommen und welche zu Aufträgen werden. Angebot und Rückruf bleiben bei Ihrem Team.",
        ],
      },
      {
        heading: "Mit dem CRM, das Sie nutzen",
        paragraphs: [
          "Wir binden das CRM an, das Sie schon nutzen. Haben Sie noch keins, schlagen wir eins vor, das zu Ihrer Größe passt. Vor dem Start legen wir fest, wer auf welche Daten zugreift und welche Anbieter beteiligt sind.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Aufschrieb des heutigen Ablaufs",
        "Automatische Übernahme aus allen Eingängen",
        "Bewertung und Weiterleitung von Anfragen",
        "Erinnerungen und Status in der Pipeline",
        "Warnung bei Fehlern und Dokumentation",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch über den Ablauf erhalten Sie ein schriftliches Angebot. Laufende Kosten für Programme stehen getrennt darin.",
      factors: [
        "Zahl der Eingänge wie Formular, E-Mail und Kampagne",
        "Das CRM und seine Schnittstellen",
        "Regeln und Ausnahmen",
        "Einsatz von KI",
      ],
    },
    faqs: [
      {
        id: "crm-which",
        question: "Welches CRM empfehlen Sie?",
        answer:
          "Das hängt von Ihrer Größe und Ihren Abläufen ab. Wenn Sie schon eines nutzen, bleiben wir meist dabei und verbinden es mit Ihren Eingängen.",
      },
      {
        id: "crm-control",
        question: "Entscheidet die KI, welche Anfragen wir annehmen?",
        answer: "Nein. Sie sortiert und bereitet vor. Die Entscheidung trifft Ihr Team.",
      },
      {
        id: "crm-existing-data",
        question: "Was passiert mit unseren vorhandenen Kontakten?",
        answer:
          "Wir übernehmen sie in das CRM und bereinigen doppelte Einträge, soweit sich das sicher erkennen lässt.",
      },
    ],
    related: [
      { to: "documents-email", text: "E-Mails und Dokumente automatisch auslesen." },
      { to: "ads-tracking", text: "Sehen, welche Kampagne zu Aufträgen führt." },
      { to: "customer-portals", text: "Kunden sehen den Stand ihrer Anfrage selbst." },
    ],
  },
  {
    id: "documents-email",
    name: "Dokumente und E-Mails",
    summary: "KI liest E-Mails, Rechnungen und Formulare und bereitet sie für Ihr Team vor.",
    metaTitle: "Belegverarbeitung und E-Mails automatisieren",
    metaDescription:
      "Rechnungen, Lieferscheine und E-Mails automatisch verarbeiten: KI liest die Daten aus, überträgt sie ins richtige Programm und schreibt Entwürfe. Ihr Team prüft.",
    title: "Belegverarbeitung und E-Mails automatisieren",
    intro:
      "KI liest Rechnungen, Lieferscheine und E-Mails, zieht die wichtigen Daten heraus und überträgt sie ins richtige Programm. Ihr Team prüft die Fälle, bei denen das System unsicher ist.",
    sections: [
      {
        heading: "Dokumente",
        paragraphs: [
          "Rechnungen, Lieferscheine, Formulare und Verträge werden erkannt und abgelegt. Die wichtigen Felder, etwa Lieferant, Betrag und Datum, gehen in Buchhaltung, ERP oder CRM. Bei unsicheren Dokumenten fragt das System nach, statt zu raten.",
        ],
      },
      {
        heading: "E-Mails",
        paragraphs: [
          "Das Postfach sortiert sich nach Anliegen und leitet Nachrichten an die zuständige Person weiter. Für häufige Fragen schreibt die KI einen Entwurf, den Ihr Team prüft und absendet. Automatisch verschicken wir nur, was Sie vorher freigegeben haben.",
        ],
      },
      {
        heading: "Erst testen, dann einsetzen",
        paragraphs: [
          "Wir testen mit Ihren echten Dokumenten und messen, wie oft die KI richtig liegt, bevor der Ablauf live geht. So sehen Sie vorher, wie viel Handarbeit bleibt. Vor dem Start klären wir, welche Anbieter die Daten sehen und wo sie gespeichert werden.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Test mit Ihren echten Dokumenten",
        "Auslesen und Übertragen der Daten",
        "Sortierung und Antwortentwürfe für E-Mails",
        "Prüfschritt für unsichere Fälle",
        "Warnung bei Fehlern und Dokumentation",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch und einem Blick auf Beispieldokumente erhalten Sie ein schriftliches Angebot. Laufende Kosten für KI-Modelle stehen getrennt darin.",
      factors: [
        "Zahl der Dokumentarten",
        "Menge pro Monat",
        "Programme, in die die Daten gehen",
        "Anforderungen an den Datenschutz",
      ],
    },
    faqs: [
      {
        id: "documents-accuracy",
        question: "Wie zuverlässig liest die KI unsere Dokumente?",
        answer:
          "Das messen wir an Ihren eigenen Dokumenten, bevor der Ablauf live geht. Unsichere Fälle gehen an Ihr Team, damit Fehler nicht unbemerkt weiterlaufen.",
      },
      {
        id: "documents-gobd",
        question: "Was ist mit Aufbewahrungspflichten?",
        answer:
          "Die Originale bleiben im System, in dem Sie sie aufbewahren müssen. Wir stimmen den Ablauf mit Ihrer Steuerberatung oder Ihrem Dokumentensystem ab.",
      },
      {
        id: "email-auto-send",
        question: "Beantwortet die KI E-Mails allein?",
        answer:
          "Standardmäßig nicht. Sie schreibt Entwürfe, die Ihr Team prüft. Einfache Bestätigungen lassen sich automatisch versenden, wenn Sie das freigeben.",
      },
    ],
    related: [
      { to: "leads-crm", text: "Anfragen aus E-Mails automatisch ins CRM übernehmen." },
      { to: "workflows", text: "Daten automatisch zwischen Programmen weitergeben." },
      { to: "ai-assistants", text: "Fragen zu Ihren Dokumenten mit Quellenangabe beantworten." },
    ],
  },
  {
    id: "workflows",
    name: "Workflows und Schnittstellen",
    summary: "Feste Regeln übernehmen wiederkehrende Schritte, und Ihre Programme tauschen Daten aus.",
    metaTitle: "Workflow-Automatisierung und Schnittstellen",
    metaDescription:
      "Workflow-Automatisierung: Wir verbinden Ihre Programme über Schnittstellen, übernehmen wiederkehrende Schritte mit festen Regeln und überwachen den Betrieb.",
    title: "Abläufe automatisieren, Programme verbinden",
    intro:
      "Daten weitergeben, Aufgaben anlegen, Kollegen benachrichtigen: Solche Schritte erledigen feste Regeln zuverlässig. Wir verbinden Ihre Programme, damit niemand Daten doppelt pflegt.",
    sections: [
      {
        heading: "Erst der Ablauf",
        paragraphs: [
          "Wir schreiben auf, wie die Aufgabe heute läuft, wo es Ausnahmen gibt und welche Entscheidungen ein Mensch treffen muss. Daraus entstehen Auslöser, Regeln und Freigaben. Oft zeigt sich dabei, dass sich ein Schritt ganz streichen lässt.",
        ],
      },
      {
        heading: "Regel oder KI",
        paragraphs: [
          "Für feste Regeln ist eine klassische Automatisierung meist zuverlässiger und günstiger als KI. KI setzen wir ein, wenn eine Aufgabe Sprache oder unstrukturierte Texte enthält. Die Technik wählen wir nach den Programmen, die Sie nutzen.",
        ],
      },
      {
        heading: "Betrieb",
        paragraphs: [
          "Zugriffsrechte erlauben nur, was der Ablauf braucht. Logs zeigen, was passiert ist. Schlägt ein Schritt fehl, erhält Ihr Team eine Nachricht und übernimmt von Hand. Sie erhalten eine Dokumentation und können die Regeln später ändern.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Aufschrieb des Ablaufs und der Ausnahmen",
        "Automatisierung mit Regeln und Freigaben",
        "Schnittstellen zwischen Ihren Programmen",
        "Logs und Warnungen bei Fehlern",
        "Dokumentation und Übergabe",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch über den Ablauf erhalten Sie ein schriftliches Angebot. Laufende Kosten für Werkzeuge stehen getrennt darin.",
      factors: [
        "Zahl der Programme",
        "Zahl der Regeln und Ausnahmen",
        "Verfügbare Schnittstellen",
        "Betreuung im laufenden Betrieb",
      ],
    },
    faqs: [
      {
        id: "workflow-replace",
        question: "Müssen wir unsere Programme ersetzen?",
        answer:
          "Meistens nicht. Wir verbinden zuerst die Programme, die Sie schon nutzen. Einen Neubau schlagen wir nur vor, wenn er stabiler und günstiger ist.",
      },
      {
        id: "workflow-no-api",
        question: "Was ist, wenn ein Programm keine Schnittstelle hat?",
        answer:
          "Oft gibt es andere Wege, etwa einen Datenexport oder einen Abgleich über E-Mail. Wir prüfen das vorher und sagen Ihnen, wie zuverlässig der Weg ist.",
      },
      {
        id: "workflow-worth",
        question: "Wann lohnt sich eine Automatisierung?",
        answer:
          "Wenn eine Aufgabe oft vorkommt, nach festen Regeln abläuft und Fehler Geld kosten. Wir rechnen das mit Ihnen durch, bevor wir etwas bauen.",
      },
    ],
    related: [
      { to: "leads-crm", text: "Der häufigste Einstieg: Anfragen automatisch ins CRM." },
      { to: "documents-email", text: "Wenn Texte und Dokumente im Spiel sind." },
      { to: "web-apps", text: "Wenn eine eigene Oberfläche fehlt." },
    ],
  },
  {
    id: "ai-assistants",
    name: "Interne KI-Assistenten",
    summary: "Ihr Team fragt und erhält eine Antwort aus Ihren Dokumenten, mit Quelle.",
    metaTitle: "KI-Assistent für Unternehmen",
    metaDescription:
      "KI-Assistent für Ihr Unternehmen: Ihr Team fragt in normaler Sprache und erhält Antworten aus Handbüchern und Wikis, mit Quellenangabe und passenden Zugriffsrechten.",
    title: "KI-Assistent für Ihr Unternehmen",
    intro:
      "Ihr Team stellt eine Frage in normaler Sprache und erhält eine Antwort aus Ihren eigenen Dokumenten. Jede Antwort nennt ihre Quelle, und jeder sieht nur, was er sehen darf.",
    sections: [
      {
        heading: "Was der Assistent kann",
        paragraphs: [
          "Der Assistent durchsucht Handbücher, Angebote, Verträge oder Wikis und antwortet in normaler Sprache. Jede Antwort nennt das Dokument, aus dem sie stammt, damit Ihr Team sie prüfen kann. Findet er keine Quelle, sagt er das.",
        ],
      },
      {
        heading: "Zugriff und Datenschutz",
        paragraphs: [
          "Der Assistent zeigt nur, was die fragende Person sehen darf. Vor dem Bau klären wir, welche Daten er verwendet, wo sie liegen und welche Anbieter und Modelle beteiligt sind. Das Modell wählen wir nach Risiko und rechtlichen Vorgaben.",
        ],
      },
      {
        heading: "Testen mit echten Fragen",
        paragraphs: [
          "Wir bauen Assistenten für einzelne Rollen, zum Beispiel für Vertrieb oder Support. Bevor Ihr Team ihn nutzt, testen wir ihn mit echten Fragen und messen, wie oft die Antworten stimmen. Nach dem Start sammeln wir Rückmeldungen und verbessern die Quellen.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Assistent für eine oder mehrere Rollen",
        "Anbindung an Ihre Dokumente",
        "Antworten mit Quellenangabe",
        "Berechtigungen nach Person oder Rolle",
        "Test mit echten Fragen und Messung der Qualität",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach einem Gespräch erhalten Sie ein schriftliches Angebot. Laufende Kosten für das KI-Modell stehen getrennt darin.",
      factors: [
        "Menge und Art der Dokumente",
        "Anbindung an Ihre Systeme",
        "Berechtigungen",
        "Anforderungen an den Datenschutz",
      ],
    },
    faqs: [
      {
        id: "assistant-training",
        question: "Werden unsere Daten zum Training von KI-Modellen genutzt?",
        answer:
          "Wir wählen Anbieter und Verträge, bei denen Ihre Daten nicht zum Training verwendet werden, und dokumentieren die Entscheidung.",
      },
      {
        id: "assistant-wrong",
        question: "Was ist, wenn der Assistent etwas Falsches sagt?",
        answer:
          "Das kann passieren. Deshalb nennt jede Antwort ihre Quelle, und wir messen die Qualität mit echten Fragen. Wichtige Entscheidungen bleiben bei Ihrem Team.",
      },
      {
        id: "assistant-vs-chatgpt",
        question: "Warum nicht einfach ChatGPT?",
        answer:
          "ChatGPT kennt Ihre internen Dokumente und Berechtigungen nicht. Ein eigener Assistent antwortet aus Ihren Quellen und zeigt nur, was die Person sehen darf.",
      },
    ],
    related: [
      { to: "documents-email", text: "Dokumente automatisch auslesen und ablegen." },
      { to: "ai-features", text: "KI-Funktionen für Ihre Kunden." },
    ],
  },
  {
    id: "ai-features",
    name: "KI-Funktionen",
    summary: "Funktionen für Ihre Kunden, etwa eine Produktberatung oder eine Suche, die Fragen versteht.",
    metaTitle: "KI in Website oder App integrieren",
    metaDescription:
      "KI-Funktionen für Website und App: Produktberatung, Suche, die Fragen versteht, und mehr. Wir legen Qualitätskriterien fest, binden das Modell an und messen Kosten.",
    title: "KI-Funktionen für Ihre Website oder App",
    intro:
      "Eine Produktberatung, eine Suche, die Fragen versteht, oder ein Assistent im Kundenbereich: Wir bauen KI-Funktionen für Ihre Kunden und messen Qualität und Kosten.",
    sections: [
      {
        heading: "Aufgabe und Qualität festlegen",
        paragraphs: [
          "Wir legen fest, was die Funktion leisten soll und woran wir die Qualität messen. Dazu gehört auch, was sie nicht sagen oder tun darf. Ein Prototyp zeigt früh, ob die Idee funktioniert, bevor Sie viel investieren.",
        ],
      },
      {
        heading: "Modell und Oberfläche",
        paragraphs: [
          "Dann binden wir das passende Modell an und bauen die Oberfläche in Ihre Website oder App ein. Das Modell wählen wir nach Aufgabe, Kosten und Datenschutz, und wir halten es austauschbar. Nutzer sehen, dass sie mit einer KI sprechen.",
        ],
      },
      {
        heading: "Betrieb und Kosten",
        paragraphs: [
          "Nach dem Start messen wir Nutzung, Qualität und Kosten pro Anfrage. Grenzen schützen Sie vor Missbrauch und unerwarteten Rechnungen. So sehen Sie, was die Funktion leistet und was sie kostet.",
        ],
      },
    ],
    deliverables: {
      heading: "Was Sie erhalten",
      items: [
        "Beschreibung der Aufgabe und Qualitätskriterien",
        "Prototyp mit Machbarkeitstest",
        "Modellanbindung und Oberfläche",
        "Schutz vor Missbrauch und Kostengrenzen",
        "Messung von Qualität, Nutzung und Kosten",
      ],
    },
    costs: {
      heading: "Was den Preis bestimmt",
      text: "Nach dem Prototyp erhalten Sie ein schriftliches Angebot. Laufende Kosten für das Modell hängen von der Nutzung ab und stehen getrennt darin.",
      factors: [
        "Komplexität der Aufgabe",
        "Daten, auf die die Funktion zugreift",
        "Oberfläche und Einbau",
        "Erwartete Nutzung",
      ],
    },
    faqs: [
      {
        id: "ai-feature-model",
        question: "Welches KI-Modell verwenden Sie?",
        answer:
          "Das hängt von Aufgabe, Kosten und Datenschutz ab. Wir testen mehrere Modelle und bauen die Funktion so, dass sich das Modell später wechseln lässt.",
      },
      {
        id: "ai-feature-cost",
        question: "Was kostet der laufende Betrieb?",
        answer:
          "Das hängt von der Nutzung ab. Nach dem Prototyp schätzen wir die Kosten pro Anfrage und legen Grenzen fest.",
      },
      {
        id: "ai-feature-law",
        question: "Müssen wir Nutzer auf die KI hinweisen?",
        answer:
          "Bei einem Chat mit einer KI sollten Nutzer das erkennen können, und die KI-Verordnung der EU verlangt das in vielen Fällen. Wir bauen den Hinweis ein. Rechtliche Details klären Sie mit Ihrer Beratung.",
      },
    ],
    related: [
      { to: "web-apps", text: "Die Anwendung rund um die KI-Funktion." },
      { to: "ai-assistants", text: "Wenn die Funktion für Ihr Team gedacht ist." },
    ],
  },
];

export default Object.fromEntries(entries.map((entry) => [entry.id, entry])) as Record<SubServiceId, SubServiceCopy>;
