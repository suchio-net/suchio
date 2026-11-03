import { hotelConcepts } from "@/examples/hotels/concepts";
import { tradesConcepts } from "@/examples/trades/concepts";

/**
 * The industries under /examples, in display order. Each one has a page at `/examples/<slug>`
 * and copy under the same key in `src/i18n/examples.ts`. Its first concept's preview stands for it on cards.
 */
export const industries = { hotels: hotelConcepts, trades: tradesConcepts } as const;

export type IndustrySlug = keyof typeof industries;
export const industrySlugs = Object.keys(industries) as IndustrySlug[];

export const industryConcepts = (industry: IndustrySlug): Record<string, { preview: string; live: string }> =>
  industries[industry];
export const industryPreview = (industry: IndustrySlug) => Object.values(industryConcepts(industry))[0]!.preview;
