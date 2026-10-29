import { expect, test } from "bun:test";
import sharp from "sharp";
import { publicRoutes } from "../src/lib/public-routes";
import { socialImagePath } from "../src/lib/social-image";

test("every public page has a 1200×630 social card", async () => {
  const cards = new Set(publicRoutes.map(({ pathname, locale }) => socialImagePath(pathname, locale)));
  expect(cards.size).toBe(30);
  for (const card of cards) {
    const { width, height, format } = await sharp(`public${card}`).metadata();
    expect({ card, width, height, format }).toEqual({ card, width: 1200, height: 630, format: "png" });
  }
});

test("search and home screen icons have the sizes their link tags declare", async () => {
  const icons = {
    "suchio-favicon-32x32.png": 32,
    "suchio-favicon-48x48.png": 48,
    "suchio-favicon-96x96.png": 96,
    "suchio-favicon-192x192.png": 192,
    "apple-touch-icon.png": 180,
    "suchio-icon-512.png": 512,
    "suchio-icon-maskable-512.png": 512,
  };
  for (const [file, size] of Object.entries(icons)) {
    const { width, height } = await sharp(`public/${file}`).metadata();
    expect({ file, width, height }).toEqual({ file, width: size, height: size });
  }
  expect(await Bun.file("public/favicon.ico").exists()).toBe(true);
});
