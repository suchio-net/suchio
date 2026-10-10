// schema.org graph as it would ship on handwerker.work. One business entity,
// referenced by every page, so search engines and AI answers resolve the same facts.
import { company, liveOrigin, places, services, type Faq } from "./data";

const id = (fragment: string) => `${liveOrigin}/#${fragment}`;
const url = (path: string) => `${liveOrigin}${path}`;
/** Planned live URL of a service page; old URLs are redirected (see the pitch page). */
export const servicePath = (slug: string) => `/leistungen/${slug}/`;

export function businessNode() {
  return {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": id("business"),
    name: company.name,
    url: url("/"),
    logo: url("/logo.svg"),
    image: url("/og-handwerker-work.jpg"),
    description: "Meisterbetrieb aus Bad Nauheim für Badsanierung, Renovierung, Fliesen, Elektro sowie Sanitär und Heizung. Ein fester Ansprechpartner koordiniert alle Gewerke in der Wetterau, in Frankfurt und im Rhein-Main-Gebiet.",
    telephone: company.phone.e164,
    email: company.email,
    address: { "@type": "PostalAddress", streetAddress: company.street, postalCode: company.postalCode, addressLocality: company.city, addressRegion: company.region, addressCountry: "DE" },
    geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
    openingHoursSpecification: company.hours.map(slot => ({ "@type": "OpeningHoursSpecification", dayOfWeek: slot.schemaDays, opens: slot.opens, closes: slot.closes })),
    areaServed: places.map(place => ({ "@type": "City", name: place.name })),
    hasCredential: ["Elektrotechnik", "Installateur und Heizungsbauer", "Fliesen-, Platten- und Mosaikleger"].map(trade => ({ "@type": "EducationalOccupationalCredential", credentialCategory: "Eintragung in die Handwerksrolle (Meisterbetrieb)", about: { "@type": "DefinedTerm", name: trade } })),
    knowsAbout: ["Badsanierung", "Barrierefreies Bad", "Abdichtung nach DIN 18534", "Elektroinstallation", "Fußbodenheizung", "Technische Gebäudebetreuung"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map(service => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.name, url: url(servicePath(service.slug)) } })),
    },
    sameAs: ["https://g.page/handwerker-works", "https://profis.check24.de/profil/handwerker-work/wqxmjr"],
  };
}

export function websiteNode() {
  return { "@type": "WebSite", "@id": id("website"), url: url("/"), name: company.name, inLanguage: "de-DE", publisher: { "@id": id("business") } };
}

export function webPageNode(path: string, name: string, description: string, crumbs?: { name: string; path: string }[]) {
  const page: Record<string, unknown> = { "@type": "WebPage", "@id": `${url(path)}#webpage`, url: url(path), name, description, inLanguage: "de-DE", isPartOf: { "@id": id("website") }, about: { "@id": id("business") } };
  if (crumbs) page.breadcrumb = { "@id": `${url(path)}#breadcrumb` };
  return page;
}

export function breadcrumbNode(path: string, crumbs: { name: string; path: string }[]) {
  return { "@type": "BreadcrumbList", "@id": `${url(path)}#breadcrumb`, itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: url(crumb.path) })) };
}

export function serviceNode(path: string, name: string, description: string, serviceType: string) {
  return { "@type": "Service", "@id": `${url(path)}#service`, name, description, serviceType, provider: { "@id": id("business") }, areaServed: places.map(place => ({ "@type": "City", name: place.name })), url: url(path) };
}

export function faqNode(path: string, faqs: Faq[]) {
  return { "@type": "FAQPage", "@id": `${url(path)}#faq`, mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a.join(" ") } })) };
}
