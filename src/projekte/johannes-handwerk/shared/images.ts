import manifest from "./images.json";
import { assetBase } from "./content";

export interface ImageEntry {
  width: number;
  height: number;
  color: string;
  alt: string;
}
const images: Record<string, ImageEntry> = manifest;

/** Output widths for every photo; the integration writes AVIF, WebP and JPEG for each. */
export const widths = [480, 800, 1200, 1600];
export const formats = ["avif", "webp", "jpg"] as const;

export function image(name: string): ImageEntry {
  const entry = images[name];
  if (!entry) throw new Error(`Unknown Johannes-Handwerk image "${name}"`);
  return entry;
}

export const imageNames = Object.keys(images);

export function imageSources(name: string) {
  const entry = image(name);
  const set = (format: (typeof formats)[number]) =>
    widths.map((width) => `${assetBase}/img/${name}-${width}.${format} ${width}w`).join(", ");
  return { avif: set("avif"), webp: set("webp"), jpg: set("jpg"), src: `${assetBase}/img/${name}-1200.jpg`, ...entry };
}
