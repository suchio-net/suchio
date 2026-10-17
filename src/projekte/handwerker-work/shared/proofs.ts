// Quality evidence from the current site (home and /leistungen-handwerker-leistungen-rhein-main-gebiet/,
// checked 10.10.2026). The CHECK24 and MyHammer profile links there no longer resolve
// (404 and a redirect to the search page), so both marks are shown without links until
// the client sends the current profile addresses.

// "Qualität und Zertifizierungen" on the current overview page. The energy line named
// EnEV/GEG; since 29.07.2026 the Gebäudemodernisierungsgesetz applies.
export const qualityStandards = [
  "Ausführung nach den aktuellen DIN-Normen und VDE-Richtlinien",
  "Einhaltung der geltenden Energievorgaben (Gebäudemodernisierungsgesetz)",
  "Gewährleistung nach VOB und BGB",
  "Versicherungsschutz durch Betriebshaftpflicht",
  "Verwendung hochwertiger Markenprodukte",
  "Fortlaufende Schulungen und Weiterbildungen",
];

export const platformBadges = [
  { key: "check24", file: "check24-2019.svg", alt: "CHECK24 Profi seit 2019", width: 225, height: 195 },
  { key: "myhammer", file: "myhammer.webp", alt: "MyHammer", width: 251, height: 73 },
] as const;
