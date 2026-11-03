// Questions for the home pages of both drafts. The answers use only facts from his website
// and reviews; they promise no prices, durations or guarantees.
export interface Faq {
  q: string;
  a: string;
}

export const faqs: { home: Faq[] } = {
  home: [
    {
      q: "In welchen Orten arbeiten Sie?",
      a: "In München und Umgebung. Kunden haben uns zum Beispiel in Gauting, Olching, Ottobrunn, Baldham und Moosinning beauftragt.",
    },
    {
      q: "Kommen Sie vor dem Angebot vorbei?",
      a: "Ja. Beim Vor-Ort-Termin sehen wir uns die Fläche oder den Raum an und besprechen die Möglichkeiten. Danach erhalten Sie ein Festpreis-Angebot.",
    },
    {
      q: "Was kostet eine gepflasterte Einfahrt?",
      a: "Das hängt vor allem von Fläche, Untergrund, Unterbau, Material und Zufahrt ab. Nach dem Vor-Ort-Termin nennen wir Ihnen einen Festpreis.",
    },
    {
      q: "Welche Materialien verlegen Sie?",
      a: "Draußen Pflaster aus Naturstein, Beton und Verbundpflaster. Drinnen Parkett, Laminat, PVC, Linoleum, Teppich und Fliesen.",
    },
    {
      q: "Übernehmen Sie auch Aushub und Entsorgung?",
      a: "Ja. Erdaushub und Bauschutt transportieren wir ab und entsorgen sie fachgerecht.",
    },
    {
      q: "Wie schnell antworten Sie auf eine Anfrage?",
      a: "In der Regel innerhalb von 24 Stunden.",
    },
  ],
};
