import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Références",
  overview: {
    title: "Références : sites web et SEO aux résultats mesurés | Suchio",
    description:
      "Projets de Suchio aux résultats mesurés. Handwerker.work à Bad Nauheim : nouveau site, Lighthouse mobile de 65 à 93, toutes les anciennes URL conservées.",
    h1: "Références",
    intro: "Des projets que nous avons réalisés, avec les valeurs avant et après la mise en ligne.",
    kind: "Rénovation, salles de bains et équipements techniques à Bad Nauheim",
    summary:
      "Un site WordPress reconstruit en site Astro rapide, sans perdre une seule adresse. Avec un SEO fondé sur les données de recherche et de nouvelles pages de service.",
    link: "Voir la référence",
  },
  serviceLink: "Voir la référence : Handwerker.work",
  handwerkerWork: {
    title: "Référence Handwerker.work : nouveau site et SEO pour une entreprise artisanale | Suchio",
    description:
      "Comment nous avons reconstruit le site WordPress de Handwerker.work à Bad Nauheim : Lighthouse mobile de 65 à 93, toutes les anciennes URL conservées, 32 pages sur 33 indexées par Google.",
    h1: "Un nouveau site pour Handwerker.work",
    intro:
      "Handwerker.work réalise rénovations, rénovations de salles de bains, travaux d’électricité et équipements techniques à Bad Nauheim, en Wetterau et à Francfort. Nous avons reconstruit son site WordPress et nous nous occupons du SEO et des nouvelles pages.",
    name: "Handwerker.work",
    visit: "Voir le site",
    beforeShot: {
      caption: "Avant, 8 octobre 2026",
      alt: "Page d’accueil de l’ancien site. Une fenêtre publicitaire masque la moitié gauche du premier écran.",
      findings:
        "Une fenêtre pop-up masquait le premier écran. Sur mobile, la page était plus large que l’écran. Une page de service liée renvoyait une erreur 404. Notre vérification de 64 adresses a relevé 45 constats.",
    },
    afterShot: {
      caption: "Après, 29 octobre 2026",
      alt: "Page d’accueil du nouveau site avec le titre, trois moyens de contact et la photo d’une salle de bains réalisée par l’entreprise.",
      changes:
        "Titre, services et trois moyens de contact dès le premier écran. Une photo de ses propres chantiers dès le premier écran. Pas de pop-up, pas de bandeau de cookies.",
    },
    lighthouse: {
      heading: "Lighthouse mobile, page d’accueil",
      text: "L’outil de mesure de Google, en mode mobile avant et après la reconstruction.",
      legend: "Anneau extérieur : nouveau site. Anneau intérieur : ancien site.",
      before: "avant",
      performance: "Performance",
      accessibility: "Accessibilité",
      seo: "SEO",
      lcp: "Temps jusqu’à l’affichage du contenu principal (LCP)",
      lcpScale: "Google juge bon jusqu’à 2,5 s et mauvais à partir de 4 s.",
      weight: "Poids de la page d’accueil",
      oldSite: "ancien",
      newSite: "nouveau",
    },
    pagesHeading: "Trois pages comparées",
    pagesText: "Score de performance Lighthouse mobile, ancienne et nouvelle version de la même page.",
    pages: { home: "Page d’accueil", contact: "Contact", badNauheim: "Salle de bains Bad Nauheim" },
    sourceNote:
      "Mesuré le 21 octobre 2026 sur l’ancien site et le 29 octobre 2026 sur le nouveau. Les six pages mesurées sur le nouveau site obtiennent 91 à 99 points en performance et 100 en accessibilité, bonnes pratiques et SEO. 32 pages du sitemap sur 33 sont indexées selon Google Search Console (28 octobre 2026).",
    workHeading: "Ce que nous avons fait",
    work: [
      {
        title: "Technique",
        copy: "Des pages Astro statiques sur Cloudflare, sans code WordPress depuis le 28 octobre 2026. Toutes les anciennes URL sont restées ; les pages à nouvelle adresse redirigent en 301, pour que liens et résultats de recherche continuent de fonctionner.",
      },
      {
        title: "Contenus",
        copy: "De nouvelles pages pour le chauffage, la pompe à chaleur, les cloisons sèches, la rénovation complète, le carrelage, la zone d’intervention et Bad Nauheim. Les mots et l’ordre suivent les données de Google Search Console. Nom, adresse et un seul numéro de téléphone sont identiques partout.",
        link: {
          label: "Rénovation de salle de bains à Bad Nauheim (en allemand)",
          href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        },
      },
      {
        title: "Demandes",
        copy: "Le formulaire demande d’abord le projet. Les calculateurs de coûts des pages de service envoient leurs réponses avec la demande. Chaque demande arrive par e-mail, avec protection anti-spam.",
        link: { label: "Voir le formulaire (en allemand)", href: `${site}/kontakt/` },
      },
    ],
    cta: {
      heading: "Un site comme celui-ci pour votre entreprise ?",
      text: "Dites-nous ce que votre site ne fait pas aujourd’hui.",
      button: "Envoyer une demande",
    },
  },
} satisfies ReferencesCopy;

export default references;
