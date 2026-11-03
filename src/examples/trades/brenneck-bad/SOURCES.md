# Quellen der Bilder und Schriften

Konzept „Brenneck Bad & Haustechnik“ von Suchio. Der Betrieb ist fiktiv: Name, Ort, Adresse, Telefonnummern, Personen und Bewertungen sind ausgedacht. Die Telefonnummern stammen aus den Rufnummernbereichen, die die Bundesnetzagentur für Film- und Fernsehproduktionen freihält. Die Fotos zeigen keine Arbeiten dieses oder eines anderen bestimmten Betriebs.

## Fotos

Die Originale liegen in `src/examples/trades/photos/` und gelten für beide Handwerk-Konzepte. Sie sind auf höchstens 2000 Pixel Breite verkleinert, sonst unverändert. Die Integration `src/integrations/draft-images.ts` erzeugt daraus beim Start des Dev-Servers und beim Build AVIF und WebP in mehreren Breiten unter `public/examples/trades/img/`. Breiten und Grundfarbe stehen in `src/examples/trades/shared/images.json`.

Lizenz: [Unsplash License](https://unsplash.com/license). Kein Foto stammt aus Unsplash+.

| Datei                      | Motiv                               | Fotograf/in     | Quelle                                                                                          | Lizenz           |
| -------------------------- | ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------- | ---------------- |
| `bad-wanne.jpg`            | Freistehende Badewanne              | Jared Rice      | https://unsplash.com/photos/white-ceramic-bathtub-PibraWHb4h8                                   | Unsplash License |
| `bad-hell.jpg`             | Helles Bad mit Wanne                | Jessica Hearn   | https://unsplash.com/photos/a-bathroom-with-a-tub-and-sink-ODU4mXpF-5I                          | Unsplash License |
| `bad-holz.jpg`             | Bad mit Doppelwaschtisch und Dusche | Peter Muniz     | https://unsplash.com/photos/modern-bathroom-with-double-vanity-and-walk-in-shower-6YEMkA-2ji8   | Unsplash License |
| `bad-waschtisch.jpg`       | Langer Waschtisch mit Dusche        | Peter Muniz     | https://unsplash.com/photos/modern-bathroom-with-a-long-vanity-and-shower-VJ1pilUtw9o           | Unsplash License |
| `bad-doppelwaschtisch.jpg` | Waschtisch mit Spiegel              | Zac Gudakov     | https://unsplash.com/photos/white-ceramic-sink-with-mirror-d5yfKfMSk9o                          | Unsplash License |
| `dusche-nische.jpg`        | Wanne mit Duschvorhang              | Alexander Fife  | https://unsplash.com/photos/white-bathtub-with-shower-curtain-rDSwQ_6XFUs                       | Unsplash License |
| `dusche-brause.jpg`        | Duschkopf                           | kevin Baquerizo | https://unsplash.com/photos/grey-stainless-steel-shower-head-lJewNo29uf0                        | Unsplash License |
| `fliesen-verlegung.jpg`    | Fliesen an der Wand                 | charlesdeluvio  | https://unsplash.com/photos/person-pressing-white-wall-c2thq3SXJiA                              | Unsplash License |
| `fliesen-mosaik.jpg`       | Mosaikwand mit Nische               | Bernd Dittrich  | https://unsplash.com/photos/mosaic-tile-wall-with-a-recessed-square-niche-CNKA3e5ZsGU           | Unsplash License |
| `vorwand-rohbau.jpg`       | Offene Leitungen in der Wand        | Olek Buzunov    | https://unsplash.com/photos/exposed-plumbing-pipes-and-electrical-conduit-in-a-wall-gd8HUp22NgM | Unsplash License |

## Schriften

Die Dateien liegen in `public/examples/trades/brenneck-bad/fonts/`.

DM Sans (Variable Font, lateinischer und erweiterter lateinischer Zeichensatz) in `dm-sans-latin-opsz-normal.woff2` und `dm-sans-latin-ext-opsz-normal.woff2`. Lizenz: SIL Open Font License 1.1, Text in `DM-Sans-OFL.txt`.

JetBrains Mono (400, lateinischer Zeichensatz) in `jetbrains-mono-latin-400-normal.woff2`. Lizenz: SIL Open Font License 1.1, Text in `JetBrains-Mono-OFL.txt`.

## 3D-Bad

Das Bad im ersten Bild ist ein Modell aus `hero/` und wird mit three.js im Browser gezeichnet. Es nutzt keine Fotos und keine Texturen von Dritten.
