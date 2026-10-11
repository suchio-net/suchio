const audit = {
  label: "Individueller Website-Audit",
  date: "Geprüft am 08.09.2026",
  assessment: "Unsere Einschätzung",
  findings: "Was wir konkret ändern würden",
  observation: "Beobachtung",
  action: "Unser Vorschlag",
  priorities: "In dieser Reihenfolge würden wir starten",
  flow: "Ein klarerer Weg zur Anfrage",
  measurements: "Die technischen Messwerte",
  scores: ["Performance", "Zugänglichkeit", "Best Practices", "Technisches SEO"],
  metricLabels: ["Größtes sichtbares Element (LCP)", "Blockierte Reaktionszeit (TBT)", "Layoutverschiebungen (CLS)"],
  metricHelp: [
    "Bis 2,5 s gilt als gut. Hier ein simulierter Laborwert, keine reale Besucherstatistik.",
    "Zeit, in der lange Aufgaben den Hauptthread blockieren. Kein Ersatz für die reale Interaktionsmessung INP.",
    "Bis 0,10 gilt als gut. Der Wert hat keine Einheit und kann auch Cookie-Dialoge einschließen.",
  ],
  scoreNote:
    "Die vier Kategorien prüfen unterschiedliche technische Aspekte. Auch 100 Punkte sagen nichts darüber aus, wie überzeugend Inhalte sind oder wie viele Anfragen entstehen. Es gibt keine gemeinsame Gesamtnote.",
  incomplete:
    "Keine belastbaren Gesamtpunktzahlen: Beide Lighthouse-Läufe erreichten das Ladezeitlimit. Wir veröffentlichen deshalb keine daraus abgeleitete Performance-Bewertung.",
  methodology: "Prüfumfang und Einordnung",
  method:
    "Öffentliche Stichprobe mit Lighthouse 13.4.1, ergänzender Browser-, DOM- und bei Bedarf HTTP-Prüfung. Je URL ein für die angezeigten Werte verwendeter Mobiltest mit frischem Profil, 412 × 823 CSS-Pixeln, simuliertem Slow 4G und vierfacher CPU-Verlangsamung. Optionale Cookies wurden im Messlauf nicht bewusst akzeptiert. Werte können je Gerät, Verbindung und Einwilligungszustand abweichen.",
  search:
    "Direkte Google-Suchabfragen wurden versucht, aber durch Googles Bot-Prüfung blockiert. Ergänzend wurde eine allgemeine Websuche genutzt. Wir behaupten keine Google-Platzierung oder tatsächlich verlorene Anfragen. Es gab keinen Zugang zu Search Console, Analytics oder internen Buchungsdaten. Formulare und Buchungen wurden nicht abgesendet.",
  own: "Die geschäftlichen Auswirkungen sind unsere fachliche Einschätzung anhand der beobachteten Bedienung. Sie sind keine gemessenen Umsatzverluste. Empfehlungen sind Vorschläge für die Umsetzung; die Wirkung muss danach geprüft werden.",
  validationTitle: "Woran wir eine Verbesserung prüfen würden",
  validation:
    "Den wichtigsten Weg vom ersten Bildschirm bis zur Anfrage auf Handy und Computer durchgehen, zusätzlich mit Tastatur. Danach unter gleichen Bedingungen mehrere mobile Messläufe vergleichen. Anfrage- oder Buchungsquoten lassen sich erst mit rechtmäßig erhobenen Daten des Betreibers bewerten.",
  sources: "Quellen und geprüfte Stellen",
  sourcePage: "Geprüfte Website / Fachquelle",
  report:
    "Lokaler Lighthouse-Bericht und Browserprüfung vom 08.09.2026. Die konkreten Messwerte stehen oben; den Bericht stellen wir auf Anfrage bereit.",
  contactTitle: "Den ersten Schritt gemeinsam festlegen",
  contact: "Über diesen Audit sprechen",
  email: "E-Mail schreiben",
  privacy: "Datenschutz zur Briefansprache",
  websitePrivacy: "Datenschutz beim Websitebesuch",
  linkNote:
    "Für das angeschriebene Unternehmen erstellt. Der individuelle Link ist nicht passwortgeschützt und kann weitergegeben werden.",
  campaignTitle: "Datenschutz zur Briefansprache",
  campaignIntro:
    "Informationen nach Art. 14 DSGVO zu unseren individuellen Website-Audits und der einmaligen Briefwerbung.",
  privacySections: [
    [
      "Verantwortlicher und Kontakt",
      "Aleks Tsenov, suchio, Bergstraße 41, 65795 Hattersheim am Main, Deutschland. E-Mail: contact@suchio.net. Telefon: +49 176 42767348. Die vollständigen Informationen sind über diese Kontaktwege auch kostenfrei in Papierform erhältlich.",
    ],
    [
      "Welche Daten und aus welchen Quellen",
      "Wir verwenden veröffentlichte geschäftliche Website-Inhalte, Unternehmensbezeichnungen, geschäftliche Kontakt- und Adressangaben sowie technische Prüfbefunde. Die Anschriften stammen aus freiwillig veröffentlichten geschäftlichen Kontakt- oder Filialangaben sowie öffentlichen Branchenverzeichnissen. Pflichtangaben aus einem Impressum dienen nicht als Adressquelle für Briefwerbung. Die konkrete Anschriftquelle ist bei Bedarf auf Anfrage erhältlich. Die jeweilige Website ist im Brief und im individuellen Audit benannt; konkrete geprüfte Seiten stehen dort unter Quellen. Wir verwenden keine privaten Interessenprofile, besonderen Kategorien personenbezogener Daten oder angereicherten Kontaktlisten.",
    ],
    [
      "Zweck und Rechtsgrundlage",
      "Zweck ist die einmalige Vorstellung passender Website-Dienstleistungen anhand eines individuellen Audits. Soweit Informationen natürliche Personen betreffen, stützen wir die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO. Unser Interesse liegt in einer sachlich passenden, begrenzten geschäftlichen Ansprache. Wir berücksichtigen die Erwartungen der Betroffenen, beschränken die Daten auf den geschäftlichen Bezug und beachten erkennbare Werbeablehnung. Eine öffentliche Fundstelle allein ersetzt keine Interessenabwägung.",
    ],
    [
      "Empfänger und Verarbeitung außerhalb des EWR",
      "Suchio druckt die Briefe am Kopierer im dm-Markt per USB oder Smartphone und verteilt sie. Ein Online-Druckdienst, CRM oder Adresshandel wird nicht eingesetzt. Für Recherche und Texterstellung dieser Aktion wird der OpenAI-Dienst Codex verwendet. Dafür werden ausgewählte veröffentlichte geschäftliche Inhalte und Anschriften an OpenAI übermittelt. Eine Verarbeitung außerhalb des EWR kann stattfinden. Weitere Angaben zur Verarbeitung durch OpenAI stehen in der unten verlinkten Datenschutzerklärung.",
    ],
    [
      "Bereitstellung des Audits",
      "Der Audit wird über einen individuellen, schwer erratbaren Link auf suchio.net bereitgestellt. Er wird nicht in Navigation oder Sitemap aufgenommen und erhält noindex. Dies ist kein Passwortschutz: Jeder mit dem Link kann den betreffenden Bericht lesen und weitergeben. Empfängeranschriften werden nicht auf der Auditseite veröffentlicht. Cloudflare hostet die Seiten und verarbeitet dabei Inhalte und technische Zugriffsdaten. Angaben zu Cloudflare, Übermittlungen und Websiteprotokollen enthält unsere allgemeine Datenschutzerklärung. Nur nach ausdrücklicher freiwilliger Zustimmung im Bericht wird ein bestätigter Aufruf gezählt. Ohne Zustimmung erfolgt keine Zählung. Details und Widerruf stehen im Abschnitt zur Audit-Auswertung.",
    ],
    [
      "Speicherdauer",
      "Die Arbeits- und Druckdateien sowie der Online-Audit werden nach Abschluss der Briefaktion einschließlich einer Rückmeldefrist von 30 Tagen entfernt, soweit kein konkreter Klärungs- oder Nachweisbedarf besteht. In diesem Fall verbleibt nur das Erforderliche. Für einen Werbewiderspruch bleibt die minimale Sperrinformation erhalten. Ein minimaler Vermerk aus Unternehmensname, Webdomain und Bearbeitungsstatus verhindert doppelte Akquise, solange dies dafür benötigt wird. Anschriften und Berichttexte gehören nicht zu diesem Vermerk. Die Löschung beim KI-Dienst wird gesondert veranlasst; dessen Aufbewahrungsregeln und gesetzliche Ausnahmen gelten zusätzlich. Bei einer anschließenden Anfrage gelten die in der allgemeinen Datenschutzerklärung genannten Zwecke und Fristen.",
    ],
    [
      "Ihre Rechte und Werbewiderspruch",
      "Sie können der Verarbeitung für Direktwerbung jederzeit ohne Begründung widersprechen. Eine Nachricht an contact@suchio.net oder die oben genannte Postanschrift genügt. Danach verwenden wir Ihre Daten nicht weiter für Direktwerbung. Unter den gesetzlichen Voraussetzungen bestehen Rechte auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren, etwa beim Hessischen Beauftragten für Datenschutz und Informationsfreiheit. Es gibt keine automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung.",
    ],
  ],
};

export default audit;
