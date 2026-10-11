import { publicContactEmail, publicContactPhone, publicContactPhoneHref } from "@/lib/contact";
import { type LegalContent, updatedLabel, cloudflareLinks, resendLinks } from "../legal-shared";

const legal: LegalContent = {
  imprint: {
    eyebrow: "Rechtliches",
    title: "Impressum",
    intro: "Anbieterkennzeichnung und Kontaktangaben für Suchio.",
    updated: updatedLabel("de"),
    sections: [
      {
        id: "information-pursuant-to-section-5-ddg",
        title: "Angaben gemäß § 5 DDG",
        paragraphs: [
          "Aleks Tsenov\nGeschäftsbezeichnung: Suchio\nBergstraße 41\n65795 Hattersheim am Main\nDeutschland",
        ],
      },
      {
        id: "contact",
        title: "Kontakt",
        details: [
          { label: "Telefon", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "E-Mail", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "business-details",
        title: "Unternehmensangaben",
        paragraphs: ["Nicht in das Handelsregister eingetragenes Einzelunternehmen.\nInhaber: Aleks Tsenov"],
      },
      {
        id: "responsible-for-content",
        title: "Verantwortlich für die Inhalte",
        paragraphs: ["Aleks Tsenov\nBergstraße 41\n65795 Hattersheim am Main\nDeutschland"],
      },
      {
        id: "consumer-dispute-resolution",
        title: "Verbraucherstreitbeilegung",
        paragraphs: [
          "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Rechtliches",
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung beschreibt, wie Suchio personenbezogene Daten beim Besuch der Website und bei einer Kontaktaufnahme verarbeitet.",
    updated: updatedLabel("de"),
    sections: [
      {
        id: "1-controller",
        title: "1. Verantwortlicher",
        paragraphs: ["Aleks Tsenov\nSuchio\nBergstraße 41\n65795 Hattersheim am Main\nDeutschland"],
        details: [
          { label: "Telefon", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "E-Mail", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "2-hosting-delivery-and-server-logs",
        title: "2. Hosting, Auslieferung und Serverprotokolle",
        paragraphs: [
          "Die Website wird über Cloudflare Workers und Cloudflare Static Assets ausgeliefert. Beim Aufruf verarbeitet Cloudflare insbesondere IP-Adresse, Datum und Uhrzeit, angeforderte URL, HTTP-Status, Referrer, Browser- und Geräteangaben sowie technische Netzwerk- und Sicherheitsdaten. Die Verarbeitung dient der sicheren und schnellen Auslieferung, der Fehleranalyse und der Abwehr missbräuchlicher Zugriffe.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren, stabilen und effizienten Betrieb dieser Website. Auf dem aktuell eingesetzten Workers-Free-Tarif werden Workers-Protokolle grundsätzlich bis zu drei Tage gespeichert und anschließend automatisch gelöscht, sofern sie nicht ausnahmsweise zur Aufklärung eines Sicherheitsvorfalls oder zur Rechtsverfolgung länger benötigt werden.",
          "Anbieter ist Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA. Eine Verarbeitung kann auch außerhalb des Europäischen Wirtschaftsraums stattfinden. Cloudflare stützt Übermittlungen in die USA auf das EU-U.S. Data Privacy Framework und, soweit erforderlich, auf EU-Standardvertragsklauseln.",
        ],
        links: cloudflareLinks,
      },
      {
        id: "3-contact-form-and-email-communication",
        title: "3. Kontaktformular und E-Mail-Kommunikation",
        paragraphs: [
          "Während du das Formular ausfüllst, wird dein Entwurf im Sitzungsspeicher dieses Browser-Tabs gesichert, damit er bei Seiten- und Sprachwechseln erhalten bleibt. Er wird erst beim Absenden an uns übertragen. Nach erfolgreichem Versand oder am Ende der Tab-Sitzung wird der Entwurf gelöscht. Ist der Browserspeicher deaktiviert, bleibt er nur im Arbeitsspeicher der aktuellen Seite.",
          "Bei einer Anfrage verarbeiten wir die von dir eingegebenen Daten. Dazu können Name, E-Mail-Adresse, Unternehmen, Unternehmenswebsite, gewünschte Leistung, Budgetrahmen, Nachricht und Sprache gehören. Ein unsichtbares Honeypot-Feld dient ausschließlich der Spam-Abwehr. Die Angaben werden nicht in einer eigenen Website-Datenbank gespeichert.",
          "Die Verarbeitung erfolgt zur Bearbeitung deiner Anfrage und zur Kommunikation. Geht es um einen Vertrag oder vorvertragliche Maßnahmen, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. In anderen Fällen beruht sie auf Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die sachgerechte Beantwortung geschäftlicher Anfragen.",
          "Für den Versand nutzen wir Resend, einen Dienst der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Resend verarbeitet mindestens Absender- und Empfängeradresse, Nachrichteninhalt und Versandmetadaten und hält E-Mail-Daten nach eigener Dokumentation grundsätzlich 30 Tage vor. Übermittlungen in die USA werden über das EU-U.S. Data Privacy Framework und EU-Standardvertragsklauseln abgesichert.",
          "Die Anfrage verbleibt außerdem im E-Mail-Postfach des Verantwortlichen. Wir löschen Korrespondenz, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Nachweisinteressen entgegenstehen. Bitte übermittle über das Formular keine besonderen Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO.",
        ],
        links: resendLinks,
      },
      {
        id: "4-language-preference",
        title: "4. Spracheinstellung",
        paragraphs: [
          "Die Website speichert die gewählte Sprache im Cookie „suchio-locale“. Das Cookie enthält nur den Sprachcode, gilt für die gesamte Website und wird nach einem Jahr gelöscht. Es ist erforderlich, damit die ausdrücklich gewählte Sprachversion bei späteren Aufrufen erhalten bleibt.",
          "Die Speicherung ist nach § 25 Abs. 2 Nr. 2 TDDDG ohne Einwilligung zulässig. Soweit der Sprachcode einer Person zugeordnet werden kann, ist Art. 6 Abs. 1 lit. f DSGVO die Rechtsgrundlage. Das Cookie kann jederzeit über die Browsereinstellungen gelöscht werden.",
        ],
      },
      {
        id: "5-no-analytics-or-marketing-services",
        title: "5. Freiwillige Audit-Auswertung",
        paragraphs: [
          "Wir verwenden keine Werbetracker oder Social-Media-Pixel. Auf individuellen Auditseiten können Sie freiwillig der Zählung eines Aufrufs zustimmen. Ohne Zustimmung entsteht kein Messeintrag. Einzelheiten und Widerrufsmöglichkeiten stehen unten unter der freiwilligen Auswertung der Audit-Aufrufe.",
        ],
      },
      {
        id: "6-encryption",
        title: "6. Verschlüsselung",
        paragraphs: [
          "Die Übertragung zwischen deinem Browser und der Website erfolgt verschlüsselt über HTTPS/TLS. Eine verschlüsselte Verbindung ist am Schloss-Symbol und an „https://“ in der Adresszeile erkennbar.",
        ],
      },
      {
        id: "7-your-rights",
        title: "7. Deine Rechte",
        paragraphs: [
          "Soweit die gesetzlichen Voraussetzungen erfüllt sind, hast du gegenüber dem Verantwortlichen folgende Rechte:",
        ],
        items: [
          "Auskunft über deine personenbezogenen Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
          "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)",
        ],
      },
      {
        id: "8-right-to-object",
        title: "8. Widerspruchsrecht",
        paragraphs: [
          "Du kannst einer Verarbeitung, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen widersprechen, die sich aus deiner besonderen Situation ergeben. Wir verarbeiten die betroffenen Daten dann nicht weiter, sofern keine zwingenden schutzwürdigen Gründe oder Gründe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen überwiegen.",
        ],
      },
      {
        id: "9-right-to-complain",
        title: "9. Beschwerderecht",
        paragraphs: [
          "Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren. Die für den Sitz von Suchio zuständige Behörde ist der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Deutschland.",
        ],
        links: [{ href: "https://datenschutz.hessen.de/", label: "Datenschutzaufsicht Hessen" }],
      },
      {
        id: "10-providing-data-and-automated-decisions",
        title: "10. Bereitstellung der Daten und automatisierte Entscheidungen",
        paragraphs: [
          "Die Nutzung des Kontaktformulars ist freiwillig. Ohne die als erforderlich markierten Angaben können wir die Anfrage nicht über das Formular bearbeiten; eine Kontaktaufnahme per E-Mail oder Telefon bleibt möglich. Es findet keine automatisierte Entscheidungsfindung einschließlich Profiling statt.",
        ],
      },
      {
        id: "11-changes-to-this-policy",
        title: "11. Änderungen dieser Erklärung",
        paragraphs: [
          "Wir aktualisieren diese Datenschutzerklärung, wenn sich die Website, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Es gilt die auf dieser Seite veröffentlichte Fassung.",
        ],
      },
    ],
  },
};

export default legal;
