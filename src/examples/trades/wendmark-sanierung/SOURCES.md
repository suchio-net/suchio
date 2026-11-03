# Quellen der Bilder und Schriften

Konzept „Wendmark Sanierung“ von Suchio. Der Betrieb ist fiktiv: Name, Ort, Adresse, Telefonnummern, Personen und Bewertungen sind ausgedacht. Die Telefonnummern stammen aus den Rufnummernbereichen, die die Bundesnetzagentur für Film- und Fernsehproduktionen freihält. Die Fotos zeigen keine Arbeiten dieses oder eines anderen bestimmten Betriebs.

## Fotos

Die Originale liegen in `src/examples/trades/photos/` und gelten für beide Handwerk-Konzepte. Sie sind auf höchstens 2000 Pixel Breite verkleinert, sonst unverändert. Die Integration `src/integrations/draft-images.ts` erzeugt daraus beim Start des Dev-Servers und beim Build AVIF und WebP in mehreren Breiten unter `public/examples/trades/img/`. Breiten und Grundfarbe stehen in `src/examples/trades/shared/images.json`.

Lizenz: [Unsplash License](https://unsplash.com/license). Kein Foto stammt aus Unsplash+.

| Datei                      | Motiv                               | Fotograf/in      | Quelle                                                                                             | Lizenz           |
| -------------------------- | ----------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------- | ---------------- |
| `bad-wanne.jpg`            | Freistehende Badewanne              | Jared Rice       | https://unsplash.com/photos/white-ceramic-bathtub-PibraWHb4h8                                      | Unsplash License |
| `bad-hell.jpg`             | Helles Bad mit Wanne                | Jessica Hearn    | https://unsplash.com/photos/a-bathroom-with-a-tub-and-sink-ODU4mXpF-5I                             | Unsplash License |
| `bad-fenster.jpg`          | Badewanne am Fenster                | Chastity Cortijo | https://unsplash.com/photos/white-ceramic-bathtub-near-white-framed-window-6TY_WrJTwSI             | Unsplash License |
| `bad-holz.jpg`             | Bad mit Doppelwaschtisch und Dusche | Peter Muniz      | https://unsplash.com/photos/modern-bathroom-with-double-vanity-and-walk-in-shower-6YEMkA-2ji8      | Unsplash License |
| `bad-waschtisch.jpg`       | Langer Waschtisch mit Dusche        | Peter Muniz      | https://unsplash.com/photos/modern-bathroom-with-a-long-vanity-and-shower-VJ1pilUtw9o              | Unsplash License |
| `bad-doppelwaschtisch.jpg` | Waschtisch mit Spiegel              | Zac Gudakov      | https://unsplash.com/photos/white-ceramic-sink-with-mirror-d5yfKfMSk9o                             | Unsplash License |
| `dusche-nische.jpg`        | Wanne mit Duschvorhang              | Alexander Fife   | https://unsplash.com/photos/white-bathtub-with-shower-curtain-rDSwQ_6XFUs                          | Unsplash License |
| `dusche-brause.jpg`        | Duschkopf                           | kevin Baquerizo  | https://unsplash.com/photos/grey-stainless-steel-shower-head-lJewNo29uf0                           | Unsplash License |
| `dusche-armatur.jpg`       | Armatur an grauer Wand              | Sven Brandsma    | https://unsplash.com/photos/white-cross-on-gray-wall-Sg3lqSEQi_A                                   | Unsplash License |
| `fliesen-verlegung.jpg`    | Fliesen an der Wand                 | charlesdeluvio   | https://unsplash.com/photos/person-pressing-white-wall-c2thq3SXJiA                                 | Unsplash License |
| `fliesen-mosaik.jpg`       | Mosaikwand mit Nische               | Bernd Dittrich   | https://unsplash.com/photos/mosaic-tile-wall-with-a-recessed-square-niche-CNKA3e5ZsGU              | Unsplash License |
| `vorwand-rohbau.jpg`       | Offene Leitungen in der Wand        | Olek Buzunov     | https://unsplash.com/photos/exposed-plumbing-pipes-and-electrical-conduit-in-a-wall-gd8HUp22NgM    | Unsplash License |
| `heizungsraum.jpg`         | Rohre und Ventile im Technikraum    | Immo Wegmann     | https://unsplash.com/photos/pipes-and-valves-in-a-room-with-orange-table-U0jpGKtMtWE               | Unsplash License |
| `heizkreisverteiler.jpg`   | Techniker am Heizkreisverteiler     | Marc Zeman       | https://unsplash.com/photos/a-man-in-a-yellow-jacket-working-on-a-computer-kB67fMuSiIs             | Unsplash License |
| `elektro-verteiler.jpg`    | Verteilerkasten                     | mostafa mahmoudi | https://unsplash.com/photos/a-bunch-of-wires-are-plugged-into-a-switch-box-47jO5Y8nsYo             | Unsplash License |
| `rueckbau.jpg`             | Raum im Rückbau mit Stützen         | Stefan Lehner    | https://unsplash.com/photos/room-renovation-with-metal-support-poles-biRt6RXejuk                   | Unsplash License |
| `trockenbau.jpg`           | Trockenbau mit Metallständern       | Olek Buzunov     | https://unsplash.com/photos/interior-construction-with-metal-studs-and-exposed-ceiling-OuN-dH5v_vA | Unsplash License |
| `renovierung-raum.jpg`     | Raum mit Heizkörper und Fenster     | Yauheni Flerman  | https://unsplash.com/photos/a-room-with-a-radiator-and-a-window-E5wmN37rTtg                        | Unsplash License |
| `fassade.jpg`              | Hausfassade                         | K8               | https://unsplash.com/photos/brown-and-white-concrete-building-6YTyk3BFsHI                          | Unsplash License |

## Schriften

Die Dateien liegen in `public/examples/trades/wendmark-sanierung/fonts/`.

D-DIN, D-DIN Bold und D-DIN Condensed Bold in `d-din.woff2`, `d-din-bold.woff2` und `d-din-condensed-bold.woff2`. Lizenz: SIL Open Font License 1.1, Text in `D-DIN-OFL.txt`.

## 3D-Badplaner

Der Badplaner auf der Seite Badsanierung zeichnet sein Modell aus `bath3d/scene.ts` mit three.js im Browser. Er nutzt keine Fotos und keine Texturen von Dritten.
