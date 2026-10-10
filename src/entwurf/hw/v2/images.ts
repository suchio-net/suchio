import manifest from "./images.json";
import { assetBase } from "./data";

export interface ImageEntry { width: number; height: number; widths: number[]; color: string; credit?: string }
const images: Record<string, ImageEntry> = manifest;

export function image(name: string): ImageEntry {
  const entry = images[name];
  if (!entry) throw new Error(`Unknown draft image "${name}"`);
  return entry;
}

export function imageSources(name: string) {
  const entry = image(name);
  const set = (format: "avif" | "webp") => entry.widths.map(width => `${assetBase}/img/${name}-${width}.${format} ${width}w`).join(", ");
  const fallbackWidth = entry.widths.find(width => width >= 1000) ?? entry.widths.at(-1)!;
  return { avif: set("avif"), webp: set("webp"), src: `${assetBase}/img/${name}-${fallbackWidth}.webp`, zoom: `${assetBase}/img/${name}-${entry.widths.at(-1)}.webp`, ...entry };
}
