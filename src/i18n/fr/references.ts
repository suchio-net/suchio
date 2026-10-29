import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  link: "Référence : Handwerker.work",
  handwerkerWork: {
    title: "Référence Handwerker.work : nouveau site et SEO pour une entreprise artisanale | Suchio",
    description:
      "Comment nous avons reconstruit le site WordPress de Handwerker.work à Bad Nauheim : Lighthouse mobile de 65 à 93, toutes les anciennes URL conservées, 32 pages sur 33 indexées par Google.",
    h1: "Un nouveau site pour Handwerker.work",
    intro:
      "Handwerker.work réalise rénovations, rénovations de salles de bains, travaux d’électricité et équipements techniques à Bad Nauheim, en Wetterau et à Francfort. Nous avons reconstruit son site WordPress en site Astro rapide et nous nous occupons du SEO et des nouvelles pages.",
    name: "Handwerker.work",
    visit: "Voir le site",
    resultsHeading: "Avant et après",
    beforeLabel: "avant",
    results: [
      { label: "Lighthouse mobile, page d’accueil", before: "65", after: "93" },
      { label: "Contenu principal chargé (LCP), mobile", before: "10,1 s", after: "3,0 s" },
      { label: "Accessibilité, Lighthouse", before: "82", after: "100" },
      { label: "Pages du sitemap indexées par Google", before: "", after: "32 sur 33" },
    ],
    resultsNote:
      "Lighthouse mobile le 21 octobre 2026 sur l’ancien site et le 29 octobre 2026 sur le nouveau. Les six pages mesurées obtiennent 91 à 99 points en performance et 100 en accessibilité, bonnes pratiques et SEO. Indexation selon Google Search Console le 28 octobre 2026.",
    startHeading: "L’ancien site",
    startText: "Le 21 octobre 2026, nous avons vérifié les 64 URL connues et noté 45 constats. Les principaux :",
    start: [
      "Sur mobile, le contenu principal de la page d’accueil n’apparaissait qu’après 10,1 secondes.",
      "Sur mobile, la page d’accueil était plus large que l’écran et défilait sur le côté.",
      "Une fenêtre pop-up et un bandeau de cookies masquaient le premier écran sur toutes les pages vérifiées.",
      "Une page de service renvoyait une erreur 404 et était liée depuis la page d’accueil et quatre pages locales.",
      "Les pages de service n’avaient pas de données structurées pour Google.",
    ],
    workHeading: "Ce que nous avons fait",
    work: [
      {
        title: "Reconstruit sans WordPress",
        copy: "Des pages Astro statiques sur Cloudflare. Depuis le 28 octobre 2026, le site ne contient plus de code WordPress.",
      },
      {
        title: "Aucune adresse perdue",
        copy: "Toutes les anciennes URL sont restées. Les pages à nouvelle adresse redirigent en 301, pour que liens et résultats de recherche continuent de fonctionner.",
      },
      {
        title: "Nouvelles pages de service",
        copy: "Chauffage, pompe à chaleur, cloisons sèches, rénovation complète, carrelage, zone d’intervention et une page dédiée à Bad Nauheim.",
      },
      {
        title: "Des demandes avec le détail du projet",
        copy: "Le formulaire demande d’abord le projet. Les calculateurs de coûts des pages de service envoient leurs réponses avec la demande. Chaque demande arrive par e-mail, avec protection anti-spam.",
      },
      {
        title: "Les mêmes coordonnées partout",
        copy: "Nom, adresse et un seul numéro de téléphone sont identiques sur chaque page.",
      },
      {
        title: "Un SEO fondé sur les données de recherche",
        copy: "Les mots, la liste des pages et leur ordre suivent les données de Google Search Console et une comparaison avec les concurrents.",
      },
    ],
    pagesHeading: "Pages à consulter",
    pages: [
      {
        label: "Rénovation de salle de bains à Bad Nauheim",
        href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        copy: "Page locale avec avis et questions fréquentes, en allemand.",
      },
      {
        label: "Rénovation complète",
        href: `${site}/komplettsanierung/`,
        copy: "L’une des nouvelles pages de service, en allemand.",
      },
      {
        label: "Demande",
        href: `${site}/kontakt/`,
        copy: "Le formulaire qui demande d’abord le projet, en allemand.",
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
