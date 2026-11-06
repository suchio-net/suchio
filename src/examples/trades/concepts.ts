/**
 * The files behind each trades concept, keyed by the slug its copy uses. A new concept needs its
 * folder here, thin routes in `src/pages/examples/trades/`, a first-screen preview and an entry in the copy.
 */
export const tradesConcepts = {
  "brenneck-bad": {
    preview: "/examples/trades/brenneck-bad-preview",
    live: "/beispiele/handwerk/brenneck-bad",
  },
  "wendmark-sanierung": {
    preview: "/examples/trades/wendmark-sanierung-preview",
    live: "/beispiele/handwerk/wendmark-sanierung",
  },
} as const;

export type TradesConceptSlug = keyof typeof tradesConcepts;
