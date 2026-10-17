# Quellen der Bilder und Schriften

Konzept „Flughotel Nordtor“ von Suchio. Das Hotel ist fiktiv. Alle Fotos stammen von den genannten Fotografinnen und Fotografen und sind frei nutzbar.

## Fotos

Die Originale liegen in `photos/` (`slot-XX.jpg`). Die ausgelieferten Dateien in `public/examples/hotels/flughotel-nordtor/img/` entstehen aus diesen Originalen mit `bun scripts/flughotel-images.mjs`. Ausgabe: AVIF, WebP und JPEG in mehreren Breiten. Die Originale werden nicht verändert.

Lizenzen: [Unsplash License](https://unsplash.com/license) für Unsplash-Fotos, [Pexels License](https://www.pexels.com/license/) für Pexels-Fotos.

| Slot | Verwendung | Fotograf/in | Quelle | Lizenz |
| --- | --- | --- | --- | --- |
| 01 | Titelbild | frank-rietsch-135445060 (Pexels) | https://www.pexels.com/photo/wall-of-hotel-building-18308569/ | Pexels License |
| 02 | Einleitung, Frühstücksbuffet | Jill Sauve | https://unsplash.com/photos/a-table-with-a-bunch-of-food-on-it-stHOZOzZOEQ | Unsplash License |
| 03 | Einleitung, Sitzecke | Trac Vu | https://unsplash.com/photos/black-and-gray-chairs-and-table-near-glass-window-vi59jclwSko | Unsplash License |
| 04 | Park, Sleep & Fly, Parkplatz | Christian Lue | https://unsplash.com/photos/a-parking-lot-filled-with-lots-of-parked-cars-2fI0x0P4FVg | Unsplash License |
| 05 | Zimmer A, Doppelzimmer | Point3D Commercial Imaging Ltd. | https://unsplash.com/photos/white-bed-linen-on-bed-oxeCZrodz78 | Unsplash License |
| 06 | Zimmer B, Fensterzimmer | Giorgio Trovato | https://unsplash.com/photos/white-bed-near-white-window-curtain-gSZclvkR4Ok | Unsplash License |
| 07 | Zimmer C, Arbeitsplatz | Aquilion Property | https://unsplash.com/photos/a-hotel-room-with-a-bed-desk-chairs-and-a-television-1EJXSLUfqU0 | Unsplash License |
| 08 | Zimmer D, Lounge (nur mobil) | Erik Mclean | https://unsplash.com/photos/a-hotel-lobby-with-chairs-tables-and-a-fountain-YSSmyqup2Pk | Unsplash License |
| 09 | Zimmer E, warmes Licht (nur mobil) | Federico Garcia | https://unsplash.com/photos/a-hotel-room-with-two-beds-and-a-chair-IV5xvcLq7FA | Unsplash License |
| 10 | Frühstück, Vollbild | keeganjchecks (Pexels) | https://www.pexels.com/photo/assorted-breakfast-buffet-with-juices-and-cereals-29086305/ | Pexels License |
| 11 | Tagungsraum | Benjamin Child | https://unsplash.com/photos/rectangular-brown-wooden-table-with-chair-lot-inside-building-0sT9YhNgSEs | Unsplash License |

Bearbeitung: In Slot 04 sind alle lesbaren Kennzeichen unscharf gemacht, bereits im Original `photos/slot-04.jpg`.

## Schrift

Schibsted Grotesk (Variable Font, lateinischer Zeichensatz) in `fonts/schibsted-grotesk-latin-wght-normal.woff2`, bezogen über `@fontsource-variable/schibsted-grotesk` von jsDelivr. Lizenz: SIL Open Font License 1.1, Text in `fonts/OFL.txt`.

## Skript

`js/motion.mjs` ist Motion 12.23.12 (MIT), gebündelt aus dem npm-Paket mit `bun build --target browser --minify` und `process.env.NODE_ENV="production"`. Lizenz in `js/LICENSE-motion.md`.
