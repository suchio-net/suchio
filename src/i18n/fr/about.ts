import type { AboutCopy } from "../about";

const about = {
  sections: [
    {
      heading: "Création de sites, SEO, publicité et automatisation",
      paragraphs: [
        [
          "Nous concevons et développons des ",
          { text: "sites et applications web", to: "websites-apps" },
          " pour les entreprises, et nous continuons à nous en occuper après la mise en ligne. Avec le ",
          { text: "SEO et la visibilité dans l’IA", to: "seo-ai-visibility" },
          ", nous faisons en sorte que vos pages apparaissent sur Google et dans les réponses des assistants IA. Nous gérons des ",
          { text: "campagnes publicitaires", to: "paid-campaigns" },
          " sur Google et les réseaux sociaux, et nous les évaluons au coût par demande. Avec l’",
          { text: "automatisation", to: "ai-automation" },
          ", nous relions formulaires, CRM, e-mails et documents, pour que personne ne ressaisisse les demandes à la main.",
        ],
        [
          "Ces services dépendent les uns des autres. Un site lent est moins bien classé et gaspille des clics payants. Une demande qui reste deux jours dans une boîte mail est souvent perdue. C’est pourquoi nous regardons tout le parcours, de la recherche jusqu’à la réponse à votre client. La proposition ne contient pourtant que ce dont votre projet a besoin.",
        ],
      ],
    },
    {
      heading: "Notre façon de travailler",
      paragraphs: [
        [
          "Nous commençons par un état des lieux de votre site, de vos données de recherche et du parcours que suit une demande aujourd’hui. Pour Handwerker.work, cela comprenait les 64 adresses de l’ancien site, des mesures Lighthouse et l’accès des robots d’exploration.",
        ],
        [
          "Ensuite, les données décident : les requêtes de la Google Search Console, les mesures Lighthouse et les retours de vos clients. Pour le design, nous expliquons nos propositions.",
        ],
        [
          "Nous ne proposons pas un service simplement parce que nous l’offrons. Si vous avez besoin d’un site web, vous recevez une proposition pour un site web. Nous n’utilisons un nouvel outil que s’il résout un problème concret et que nous l’avons testé.",
        ],
      ],
    },
    {
      heading: "Ce que nous créons vous appartient",
      paragraphs: [
        [
          "Vous recevez le code source, les maquettes, les contenus et tous les accès. Vous n’êtes ensuite pas lié à nous. Vous pouvez faire évoluer le site avec une autre agence ou en interne.",
        ],
      ],
    },
    {
      heading: "Des sites rapides avec Astro et Cloudflare",
      paragraphs: [
        [
          "Ce site et celui de Handwerker.work sont développés avec Astro. Astro livre des pages HTML prêtes et ne charge du JavaScript que là où une page en a besoin. Les pages tournent sur Cloudflare et sont servies depuis un centre de données proche du visiteur.",
        ],
        [
          "Le résultat se mesure. Sur mobile, la nouvelle page d’accueil de Handwerker.work obtient 100 au lieu de 65 dans Lighthouse, et son plus grand élément s’affiche après 1,8 seconde au lieu de 10,1.",
        ],
        [
          "Lorsque c’est possible, nous mesurons les demandes sans cookies ni bandeau. Depuis le 31 octobre, le site de Handwerker.work compte les appels, les clics WhatsApp et les formulaires envoyés.",
        ],
      ],
    },
    {
      heading: "Un projet en détail : Handwerker.work",
      paragraphs: [
        [
          "Handwerker.work est une entreprise de rénovation à Bad Nauheim. Nous avons reconstruit son site WordPress sans perdre une seule ancienne adresse, et nous nous occupons depuis du SEO et de la suite du développement. Fin octobre, Google avait indexé 32 pages sur 33. ",
          { text: "La référence complète", to: "reference" },
          " montre chaque constat et chaque étape avec sa date.",
        ],
      ],
    },
    {
      heading: "Depuis Hattersheim am Main, pour des entreprises de toute l’Allemagne",
      paragraphs: [
        [
          "Notre studio est situé à Hattersheim am Main, entre Francfort, Wiesbaden et Mayence. Dans la région Rhin-Main, nous nous déplaçons volontiers pour un rendez-vous. Avec les entreprises d’autres régions et de l’étranger, nous travaillons par visio, téléphone et e-mail.",
        ],
      ],
    },
  ],
} satisfies AboutCopy;

export default about;
