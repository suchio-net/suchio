/*
 * Generates the Suchio icon set in public/ from the approved mark: the wordmark's DM Sans "s"
 * and magnifying glass in white and blue on the dark tile.
 *
 * Every file is drawn from the same geometry, so tabs, search results, home screens and
 * structured data show one consistent mark. The mark is optically centred and kept inside
 * the circle that Android and some search result layouts crop icons to.
 *
 * Usage: bun scripts/generate-icons.mjs
 */
import * as fontkit from "fontkit";
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = fontkit.openSync(join(root, "scripts/fonts/DMSans-var.ttf"));
// The cut the wordmark was designed at.
const glyph = font.getVariation({ opsz: 40, wght: 500 }).layout("s").glyphs[0];

// Wordmark geometry (240px design frame): baseline 202, lens r55 with a 19px stroke at y140.
const FONT_SIZE = 240;
const BASELINE = 202;
const scale = FONT_SIZE / font.unitsPerEm;
const LENS = { cy: 140, r: 55, stroke: 19 };
const GAP = 14; // visible gap between the "s" and the lens, as between letters in the wordmark
const sBox = {
  x1: glyph.bbox.minX * scale,
  x2: glyph.bbox.maxX * scale,
  y1: BASELINE - glyph.bbox.maxY * scale,
  y2: BASELINE - glyph.bbox.minY * scale,
};
const outer = LENS.r + LENS.stroke / 2;
const lensCx = sBox.x2 + GAP + outer;
const handle = { x1: lensCx + 38.89, y1: LENS.cy + 38.89, x2: lensCx + 92, y2: LENS.cy + 92 };
const ink = {
  x1: sBox.x1,
  y1: Math.min(sBox.y1, LENS.cy - outer),
  x2: handle.x2 + LENS.stroke / 2,
  y2: Math.max(sBox.y2, handle.y2 + LENS.stroke / 2),
};
const inkWidth = ink.x2 - ink.x1;
const inkHeight = ink.y2 - ink.y1;

const colors = { tile: "#101010", letter: "#FFFFFF", lens: "#52AEFF", glass: "rgba(255,255,255,0.12)" };

/**
 * The mark on a square tile of `size` units.
 * @param {object} options
 * @param {number} options.size viewBox size
 * @param {number} options.markWidth share of the tile the mark spans
 * @param {number} options.radius corner radius as a share of the tile (0 for full-bleed)
 */
function iconSvg({ size = 512, markWidth, radius }) {
  const markScale = (size * markWidth) / inkWidth;
  // Centre the ink box, nudged up slightly: the handle adds visual weight at the bottom right.
  const x = (size - inkWidth * markScale) / 2 - ink.x1 * markScale;
  const y = (size - inkHeight * markScale) / 2 - ink.y1 * markScale - size * 0.01;
  const r = (n) => Number(n.toFixed(3));
  const tile = radius
    ? `<rect width="${size}" height="${size}" rx="${r(size * radius)}" fill="${colors.tile}"/>`
    : `<rect width="${size}" height="${size}" fill="${colors.tile}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Suchio">
  ${tile}
  <g transform="translate(${r(x)} ${r(y)}) scale(${r(markScale)})">
    <path fill="${colors.letter}" transform="translate(0 ${BASELINE}) scale(${r(scale)} ${-r(scale)})" d="${glyph.path.toSVG()}"/>
    <circle cx="${r(lensCx)}" cy="${LENS.cy}" r="${LENS.r}" fill="${colors.glass}" stroke="${colors.lens}" stroke-width="${LENS.stroke}"/>
    <line x1="${r(handle.x1)}" y1="${r(handle.y1)}" x2="${r(handle.x2)}" y2="${r(handle.y2)}" stroke="${colors.lens}" stroke-width="${LENS.stroke}" stroke-linecap="round"/>
  </g>
</svg>
`;
}

// Browser tabs and search results: rounded tile with transparent corners.
const favicon = iconSvg({ markWidth: 0.74, radius: 0.22 });
// Small sizes get a slightly larger mark so the "s" stays legible at 16px.
const smallFavicon = iconSvg({ markWidth: 0.9, radius: 0.18 });
// iOS and Android add their own rounding or masks, so these fill the square;
// the maskable mark stays inside the 80% safe circle.
const fullBleed = iconSvg({ markWidth: 0.62, radius: 0 });
const maskable = iconSvg({ markWidth: 0.52, radius: 0 });

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** An ICO file that embeds PNG images (supported by all current browsers). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const out = (file, data) => {
  writeFileSync(join(root, "public", file), data);
  console.log(`public/${file}`);
};

out("suchio-favicon.svg", favicon);
out(
  "favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(smallFavicon, size) })))),
);
// Google Search uses square favicons in multiples of 48px.
for (const size of [32, 48, 96, 192])
  out(`suchio-favicon-${size}x${size}.png`, await png(size < 48 ? smallFavicon : favicon, size));
out("apple-touch-icon.png", await png(fullBleed, 180));
out("suchio-icon-512.png", await png(fullBleed, 512));
out("suchio-icon-maskable-512.png", await png(maskable, 512));
// Square brand image kept at its published URL.
out("suchio-twitter-card.png", await png(fullBleed, 400));
