import type { ReferencesCopy } from "../references";

const site = "https://handwerker.work";

const references = {
  label: "Références",
  overview: {
    title: "Références : sites web et SEO aux résultats mesurés | Suchio",
    description:
      "Projets de Suchio aux résultats mesurés. Handwerker.work à Bad Nauheim : nouveau site, Lighthouse mobile de 65 à 100, toutes les anciennes URL conservées.",
    h1: "Références",
    intro:
      "Des projets que nous avons réalisés, avec les valeurs avant et après la mise en ligne. Plus bas, des concepts qui montrent à quoi peut ressembler un site pour un secteur.",
    kind: "Rénovation, salles de bains et équipements techniques à Bad Nauheim",
    summary:
      "Un site WordPress reconstruit en site Astro rapide, sans perdre une seule adresse. Avec un SEO fondé sur les données de recherche et de nouvelles pages de service.",
    link: "Voir la référence",
    conceptsHeading: "Concepts par secteur",
    conceptsText:
      "Des exemples de ce à quoi peut ressembler un site pour un secteur. Les entreprises sont fictives, ce ne sont pas des projets clients.",
    conceptsLink: "Tous les concepts",
  },
  teaser: {
    heading: "Un nouveau site, aucune adresse perdue",
    text: "Une entreprise de rénovation à Bad Nauheim. Nous avons refait son site WordPress et assurons depuis le SEO et les évolutions du site.",
    link: "Voir la référence complète",
  },
  serviceLink: "Voir la référence : Handwerker.work",
  handwerkerWork: {
    title: "Référence Handwerker.work : nouveau site et SEO pour une entreprise artisanale | Suchio",
    description:
      "Comment nous avons reconstruit le site WordPress de Handwerker.work à Bad Nauheim : Lighthouse mobile de 65 à 100, toutes les anciennes URL conservées, 32 pages sur 33 indexées par Google.",
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
      caption: "Après, 31 octobre 2026",
      alt: "Page d’accueil du nouveau site avec le titre, trois moyens de contact et la photo d’une salle de bains réalisée par l’entreprise.",
      changes:
        "Titre, services et trois moyens de contact dès le premier écran. Une photo de ses propres chantiers dès le premier écran. Pas de pop-up, pas de bandeau de cookies.",
    },
    viewer: {
      open: "Agrandir l’image",
      dialog: "Visionneuse d’images",
      close: "Fermer",
      zoomIn: "Zoom avant",
      zoomOut: "Zoom arrière",
      reset: "Ajuster à la fenêtre",
      previous: "Image précédente",
      next: "Image suivante",
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
      desktop: "Sur ordinateur",
      desktopText:
        "Nouveau site, page d’accueil, avec les réglages ordinateur de Lighthouse. L’ancien site n’a été mesuré que sur mobile.",
      bestPractices: "Bonnes pratiques",
    },
    pagesHeading: "Trois pages comparées",
    pagesText: "Score de performance Lighthouse mobile, ancienne et nouvelle version de la même page.",
    pages: { home: "Page d’accueil", contact: "Contact", badNauheim: "Salle de bains Bad Nauheim" },
    sourceNote:
      "Mesures Lighthouse en laboratoire du site en ligne : ancienne version le 21 octobre 2026 (mobile uniquement), nouvelle version le 29 octobre 2026 avec trois mesures mobiles et trois mesures ordinateur par page ; les graphiques montrent la médiane. Sur mobile, l’accueil, le contact et la page salle de bains Bad Nauheim obtiennent 100 en performance, accessibilité, bonnes pratiques et SEO à chaque mesure. Les scores peuvent varier entre les mesures. 32 pages du sitemap sur 33 sont indexées selon Google Search Console (28 octobre 2026).",
    findingsHeading: "Ce que nous avons trouvé et changé",
    findingsText:
      "Avant la refonte, nous avons vérifié les 64 adresses de l’ancien site et noté 45 constats. En voici six, à côté de l’état actuel.",
    topicLabel: "Domaine",
    beforeLabel: "Avant",
    afterLabel: "Après",
    findings: [
      {
        title: "Demandes",
        before:
          "Le formulaire de contact ne fonctionnait que si le visiteur acceptait les cookies marketing. Sans cet accord, impossible d’envoyer une demande.",
        after:
          "Le formulaire fonctionne sans consentement aux cookies. Seuls le projet, le lieu, le téléphone ou l’e-mail et l’accord de confidentialité sont obligatoires.",
      },
      {
        title: "Titres de page",
        before:
          "Le titre de la page d’accueil commençait par « Handwerker Frankfurt », alors que l’entreprise est à Bad Nauheim. Une page portait le titre d’une autre, et beaucoup finissaient par le même slogan.",
        after:
          "Chaque page a son propre titre avec le service et le lieu. La page d’accueil s’appelle « Sanierung, Bad & Elektro in Bad Nauheim ».",
      },
      {
        title: "Adresses",
        before:
          "Une page de service renvoyait une erreur 404 et était liée depuis cinq pages. S’y ajoutaient 223 adresses système de WordPress, comme les flux et les pièces jointes.",
        after:
          "Toutes les anciennes adresses fonctionnent ou redirigent en 301. Les 223 adresses système suivent des règles fixes, et nous les avons toutes testées.",
      },
      {
        title: "Pages locales",
        before: "Quatre pages locales partageaient 85 à 90 % de leur texte.",
        after:
          "Les nouvelles pages pour Friedberg, Bad Vilbel, Karben, Bad Homburg et Butzbach indiquent la distance, les quartiers, la dureté de l’eau du fournisseur local et la protection du patrimoine. Texte commun : 19 à 28 %.",
      },
      {
        title: "Robots d’indexation",
        before:
          "Le fichier robots.txt bloquait les dossiers CSS et JavaScript. L’hébergeur répondait au robot GPTBot d’OpenAI avec l’erreur 429.",
        after:
          "Les moteurs de recherche et les robots d’IA peuvent lire chaque page. Cloudflare ne bloque aucun robot d’IA.",
      },
      {
        title: "Données structurées",
        before:
          "Seuls la page d’accueil et le blog avaient des données structurées. Les pages de service n’en avaient pas.",
        after: "Chaque page de service décrit pour les moteurs de recherche le service, la page et son fil d’Ariane.",
      },
    ],
    logHeading: "Le déroulement",
    logText: "Onze jours séparent l’analyse du 21 octobre du parcours de demande terminé le 31 octobre.",
    log: [
      {
        date: "2026-10-21",
        title: "Analyse",
        copy: "Nous vérifions les 64 adresses de l’ancien site, Lighthouse mobile sur cinq pages, l’accès des robots et l’affichage sur téléphone. Résultat : 45 constats, classés par urgence.",
      },
      {
        date: "2026-10-23",
        title: "Migration sans perte d’adresse",
        copy: "Le site fonctionne comme site Astro sur Cloudflare. Toutes les anciennes adresses restent identiques, et les boîtes mail continuent chez le fournisseur actuel.",
      },
      {
        date: "2026-10-24",
        title: "Nouvelles pages de service",
        copy: "Des pages propres pour le chauffage, la pompe à chaleur, les cloisons sèches, la rénovation complète et le carrelage, plus la zone d’intervention et Bad Nauheim. Les anciennes adresses locales et de service redirigent en 301 vers les nouvelles pages.",
        link: {
          label: "Rénovation de salle de bains à Bad Nauheim (en allemand)",
          href: `${site}/einsatzgebiet/bad-nauheim/badsanierung/`,
        },
      },
      {
        date: "2026-10-28",
        title: "Plus de code WordPress",
        copy: "Toutes les pages sont refaites dans le design de la nouvelle page d’accueil. Google indique 32 des 33 pages du sitemap comme indexées.",
      },
      {
        date: "2026-10-29",
        title: "Temps de chargement",
        copy: "Des images AVIF avec des recadrages propres au mobile, un fichier de police plus léger, et une protection anti-spam qui ne se charge qu’à la première saisie. L’accueil, le contact et la page salle de bains de Bad Nauheim obtiennent 100 dans Lighthouse mobile.",
      },
      {
        date: "2026-10-30",
        title: "Des textes fondés sur les recherches",
        copy: "Les pages rénovation de salle de bains et carrelage suivent les mots et l’ordre des recherches de Google Search Console. Chaque en-tête de page affiche la note Google.",
      },
      {
        date: "2026-10-31",
        title: "Pages locales, projets et demandes",
        copy: "Des pages locales pour cinq villes de la Wetterau et du Taunus, quatre pages de projets avec les propres photos de l’entreprise et un formulaire de demande en six étapes.",
        link: { label: "Voir le formulaire (en allemand)", href: `${site}/kontakt/` },
      },
    ],
    nowHeading: "Ce que nous mesurons maintenant",
    nowText:
      "Avant la refonte, le site ne comptait pas les demandes. Depuis le 31 octobre, il compte les appels, les clics WhatsApp et les demandes envoyées, sans cookies et sans bannière. Les prochains mois montreront quelles pages apportent des demandes. Nous continuons à suivre le SEO et les évolutions du site.",
    servicesLabel: "Services dans ce projet",
    cta: {
      heading: "Un site comme celui-ci pour votre entreprise ?",
      text: "Dites-nous ce que votre site ne fait pas aujourd’hui.",
      button: "Envoyer une demande",
    },
  },
} satisfies ReferencesCopy;

export default references;
