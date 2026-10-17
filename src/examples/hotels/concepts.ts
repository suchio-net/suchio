/**
 * The files behind each hotel concept, keyed by the slug its copy uses. A new concept needs its
 * folder here, a thin route in `src/pages/examples/hotels/`, a first-screen preview and an entry in the copy.
 */
export const hotelConcepts = {
  "flughotel-nordtor": {
    preview: "/examples/hotels/flughotel-nordtor-preview",
    live: "/examples/hotels/flughotel-nordtor",
  },
} as const;

export type HotelConceptSlug = keyof typeof hotelConcepts;
