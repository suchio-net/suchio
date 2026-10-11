import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import sharp from "sharp";
import { publicRoutes } from "../lib/public-routes";
import { socialImagePath } from "../lib/social-image";

// Text uses the existing DM Sans outlines so rendering needs no system fonts or remote service.
function textRun(font, text, size) {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  return { ...run, scale, width: run.positions.reduce((sum, position) => sum + position.xAdvance, 0) * scale };
}

function lines(font, text, size, width) {
  const result = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textRun(font, candidate, size).width > width) {
      result.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) result.push(line);
  return result;
}

function outlines(font, text, size, x, y, color) {
  const { glyphs, positions, scale } = textRun(font, text, size);
  let cursor = 0;
  return glyphs
    .map((glyph, index) => {
      const position = positions[index];
      const transform = `translate(${x + (cursor + position.xOffset) * scale} ${y - position.yOffset * scale}) scale(${scale} ${-scale})`;
      cursor += position.xAdvance;
      return `<path d="${glyph.path.toSVG()}" transform="${transform}" fill="${color}"/>`;
    })
    .join("");
}

const decode = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

export function socialImagesIntegration() {
  let root;
  return {
    name: "suchio:social-images",
    hooks: {
      "astro:config:done": ({ config }) => {
        root = config.root;
      },
      "astro:build:done": async ({ dir, logger }) => {
        const font = fontkit.openSync(fileURLToPath(new URL("scripts/fonts/DMSans-var.ttf", root)));
        const headingFont = font.getVariation({ opsz: 40, wght: 600 });
        const bodyFont = font.getVariation({ opsz: 14, wght: 400 });
        const logo = (await readFile(new URL("public/suchio-logo-light.svg", root))).toString("base64");
        await mkdir(new URL("social/", dir), { recursive: true });
        let count = 0;
        for (const { pathname, locale } of publicRoutes) {
          const image = socialImagePath(pathname, locale);
          if (!image) continue;
          const html = await readFile(new URL(`${pathname.slice(1)}.html`, dir), "utf8");
          const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "").replace(/ \| Suchio$/, "");
          const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "");
          if (!title || !description) throw new Error(`Missing social image copy for ${pathname}`);
          let headingSize = 72;
          let headingLines = lines(headingFont, title, headingSize, 1040);
          while (headingLines.length > 3 && headingSize > 48) {
            headingSize -= 4;
            headingLines = lines(headingFont, title, headingSize, 1040);
          }
          const headingBottom = 238 + (headingLines.length - 1) * (headingSize + 8);
          const descriptionLines = lines(bodyFont, description, 28, 1040);
          if (headingBottom + 62 + descriptionLines.length * 37 > 548)
            throw new Error(`Social image copy overflows for ${pathname}`);
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
            <rect width="1200" height="630" fill="#faf9f6"/>
            <rect width="1200" height="10" fill="#0062d1"/>
            <image x="80" y="64" width="208" height="68" href="data:image/svg+xml;base64,${logo}"/>
            ${headingLines.map((line, index) => outlines(headingFont, line, headingSize, 80, 238 + index * (headingSize + 8), "#171717")).join("")}
            ${descriptionLines.map((line, index) => outlines(bodyFont, line, 28, 80, headingBottom + 62 + index * 37, "#525252")).join("")}
            <path d="M80 554H1120" stroke="#d4d4d4"/>
            ${outlines(bodyFont, "suchio.net", 22, 80, 590, "#0062d1")}
            ${outlines(bodyFont, locale.toUpperCase(), 22, 1080, 590, "#525252")}
          </svg>`;
          const png = await sharp(Buffer.from(svg)).png().toBuffer();
          await writeFile(new URL(image.slice(1), dir), png);
          count++;
        }
        logger.info(`Generated ${count} localized page social images.`);
      },
    },
  };
}
