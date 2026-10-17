// Generates the responsive photos of the Flughotel Nordtor concept from the originals in
// src/examples/hotels/flughotel-nordtor/photos. Output: public/examples/hotels/flughotel-nordtor/img.
// Run with `bun scripts/flughotel-images.mjs`. The output is deterministic: the same originals and
// settings reproduce the same files byte for byte.

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const photosDir = fileURLToPath(new URL("../src/examples/hotels/flughotel-nordtor/photos/", import.meta.url));
const outDir = fileURLToPath(new URL("../public/examples/hotels/flughotel-nordtor/img/", import.meta.url));

// The slot-04 original is committed with its licence plates already blurred, so no readable plate is
// stored in the repository.

// Widths are the 1x and 2x rendered widths of each slot in CSS pixels at phone and desktop size (the
// tablet width sits between them), capped at the original width: nothing is enlarged. `sizes` tells the
// browser the rendered width at each viewport so it picks the smallest sufficient file.
const SLOTS = [
  { id: "01", widths: [390, 780, 1440, 2880], sizes: "100vw" },
  { id: "02", widths: [252, 433, 504, 866], sizes: "(max-width: 760px) 72vw, (max-width: 1080px) 60vw, 433px" },
  { id: "03", widths: [161, 276, 322, 552], sizes: "(max-width: 760px) 46vw, (max-width: 1080px) 30vw, 276px" },
  { id: "04", widths: [350, 655, 700, 1310], sizes: "(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 655px" },
  { id: "05", widths: [410, 742, 820, 1484], sizes: "(max-width: 760px) 110vw, (max-width: 1080px) 60vw, 742px" },
  { id: "06", widths: [410, 530, 820, 1060], sizes: "(max-width: 760px) 110vw, (max-width: 1080px) 40vw, 530px" },
  { id: "07", widths: [410, 530, 820, 1060], sizes: "(max-width: 760px) 110vw, (max-width: 1080px) 40vw, 530px" },
  { id: "08", widths: [410, 820], sizes: "110vw" },
  { id: "09", widths: [410, 820], sizes: "110vw" },
  { id: "10", widths: [1230, 1490, 2000], sizes: "(max-width: 1080px) 110vw, 1490px" },
  { id: "11", widths: [350, 610, 700, 1220], sizes: "(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 610px" },
];

const FORMATS = [
  { ext: "avif", encode: (image) => image.avif({ quality: 50, effort: 4 }) },
  { ext: "webp", encode: (image) => image.webp({ quality: 80, effort: 4 }) },
  { ext: "jpg", encode: (image) => image.jpeg({ quality: 82, mozjpeg: true }) },
];

async function prepare({ id }) {
  const original = await readFile(`${photosDir}slot-${id}.jpg`);
  return sharp(original).rotate().png().toBuffer();
}

// Remove the previous outputs of this script so a changed width list leaves no stale files behind.
await mkdir(outDir, { recursive: true });
for (const name of await readdir(outDir)) {
  if (/^slot-\d{2}-w\d+\.(avif|webp|jpg)$/.test(name)) await rm(`${outDir}${name}`);
}

const written = [];
for (const slot of SLOTS) {
  const base = await prepare(slot);
  const { width: originalWidth } = await sharp(base).metadata();
  const widths = slot.widths.filter((width) => width <= originalWidth);
  for (const width of widths) {
    for (const format of FORMATS) {
      const buffer = await format.encode(sharp(base).resize({ width })).toBuffer();
      const name = `slot-${slot.id}-w${width}.${format.ext}`;
      await writeFile(`${outDir}${name}`, buffer);
      written.push(`${name} ${buffer.length}`);
    }
  }
  if (widths.length !== slot.widths.length) {
    console.warn(`slot-${slot.id}: widths above the original ${originalWidth}px were skipped`);
  }
}

console.log(`Wrote ${written.length} files to ${outDir}`);
