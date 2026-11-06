import type { SubServiceCopy } from "../sub-services";
import type { SubServiceId } from "@/lib/sub-service-routes";

const entries: readonly SubServiceCopy[] = [
  {
    id: "business-websites",
    name: "Sites d’entreprise",
    summary: "Des sites qui expliquent ce que vous proposez et mènent les visiteurs vers une demande.",
    metaTitle: "Création de site web pour entreprise",
    metaDescription:
      "Faites créer le site de votre entreprise : une page pour chaque service et chaque lieu, rapide sur mobile, avec mesure des demandes. Le site vous appartient.",
    title: "Faire créer le site web de votre entreprise",
    intro:
      "Nous créons des sites qui expliquent ce que vous proposez et mènent les visiteurs vers une demande. Ils se chargent vite, fonctionnent sur mobile et vous appartiennent à la fin du projet.",
    sections: [
      {
        heading: "Comment nous planifions les pages",
        paragraphs: [
          "Nous clarifions d’abord les demandes que vous souhaitez et ce que vos clients recherchent. Nous en tirons la structure du site : une page pour chaque service et, si vous intervenez localement, pour chaque zone importante.",
          "Une page dédiée répond aux questions sur un service et peut apparaître sur Google pour ce service précis. Chaque page a un objectif, comme un appel, une demande ou une réservation.",
        ],
      },
      {
        heading: "Textes, images et design",
        paragraphs: [
          "Nous rédigeons les textes avec vous, car vous connaissez le mieux les détails de votre métier. Nous intégrons des photos de votre travail. Nous concevons le design sur de vraies pages avec de vrais contenus. Vous voyez chaque étape sur une adresse de prévisualisation et vous la validez.",
        ],
      },
      {
        heading: "Technique et exploitation",
        paragraphs: [
          "Nous choisissons la technique selon votre projet et ne nous limitons pas à un seul système. Chaque site reçoit ses propres titres de page, des données structurées et une mesure des demandes. Le téléphone, WhatsApp et le formulaire restent accessibles sur chaque page.",
          "Après la mise en ligne, vous modifiez vous-même les textes, les images et les nouvelles pages. Nous prenons aussi en charge l’hébergement et les mises à jour.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une structure de pages fondée sur les recherches de vos clients",
        "Un design pour mobile et ordinateur",
        "Des textes rédigés avec vous",
        "Un système de gestion de contenu pour vos propres modifications",
        "Une mesure des demandes",
        "Le code source, les designs, les contenus et tous les accès",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un court échange, vous recevez un devis écrit avec le périmètre, le prix et les dates.",
      factors: [
        "Le nombre de pages",
        "Les fonctions comme la réservation ou la connexion",
        "Les textes et les photos",
        "Le raccordement à vos logiciels actuels",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Nous avons reconstruit le site WordPress d’une entreprise de rénovation. Le score de performance Lighthouse sur mobile est passé de 65 à 100. Le contenu principal apparaît après 1,8 seconde au lieu de 10,1.",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "how-many-pages",
        question: "De combien de pages notre site a-t-il besoin ?",
        answer:
          "Autant que vous avez de services et de zones importantes, plus le contact, la présentation et les pages légales. Nous fixons le nombre exact après l’analyse des recherches.",
      },
      {
        id: "existing-content",
        question: "Pouvons-nous réutiliser nos textes et images actuels ?",
        answer:
          "Oui. Nous vérifions ce qui convient encore et retravaillons le reste avec vous. Nous rédigeons ensemble les textes manquants.",
      },
      {
        id: "which-system",
        question: "Quel système utilisez-vous ?",
        answer:
          "Cela dépend du projet. Nous choisissons la technique selon vos processus et selon la personne qui gérera les contenus. Dans tous les cas, vous recevez tous les accès et le code source.",
      },
    ],
    related: [
      { to: "relaunch", text: "Vous avez déjà un site ? Il s’agit alors d’une refonte." },
      { to: "technical-seo", text: "Comment nous trouvons les erreurs qui vous freinent sur Google." },
      { to: "hosting-maintenance", text: "L’exploitation et les mises à jour après le lancement." },
    ],
  },
  {
    id: "relaunch",
    name: "Refonte de site web",
    summary: "Un nouveau site où chaque ancienne adresse reste en place ou redirige.",
    metaTitle: "Refonte de site web sans perte de positions",
    metaDescription:
      "Refonte de site web avec des redirections testées : nous vérifions chaque ancienne adresse, redirigeons en 301 et contrôlons l’indexation Google après le lancement.",
    title: "Une refonte de site sans risquer vos positions",
    intro:
      "Lors d’une refonte, des pages qui apportent des demandes aujourd’hui peuvent disparaître de Google. Nous vérifions donc chaque ancienne adresse avant la reconstruction et nous contrôlons après le lancement que Google intègre les nouvelles pages.",
    sections: [
      {
        heading: "Avant la refonte : vérifier chaque adresse",
        paragraphs: [
          "Nous relevons toutes les adresses de l’ancien site et vérifions les contenus, les titres de page, les pages d’erreur, l’accès des robots et l’affichage sur mobile. La Google Search Console montre quelles pages apportent des visiteurs aujourd’hui. Nous traitons ces pages en premier.",
          "Le résultat est une liste de tous les constats, triée par urgence, et un tableau qui fixe la destination de chaque ancienne adresse.",
        ],
      },
      {
        heading: "Au lancement : redirections et tests",
        paragraphs: [
          "Les anciennes adresses restent identiques ou redirigent en 301 vers la bonne nouvelle page. Nous testons chaque redirection avant la mise en ligne. Nous planifions aussi les boîtes e-mail et le domaine, afin qu’aucun message ne se perde pendant le transfert.",
        ],
      },
      {
        heading: "Après le lancement : contrôle dans la Search Console",
        paragraphs: [
          "Nous soumettons le nouveau sitemap et vérifions quelles pages Google intègre, quelles erreurs apparaissent et comment évoluent les principales recherches. Nous corrigeons les problèmes directement. Personne ne peut garantir des positions, et elles peuvent varier un temps, même après une refonte propre.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une vérification de toutes les anciennes adresses avec une liste de constats",
        "Un tableau de toutes les redirections",
        "Un nouveau site avec des redirections 301 testées",
        "Un sitemap soumis et un contrôle de l’indexation",
        "Le code source, les designs, les contenus et tous les accès",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Nous connaissons le périmètre après un premier regard sur l’ancien site. Vous recevez ensuite un devis écrit.",
      factors: [
        "Le nombre d’anciennes adresses",
        "L’ampleur des nouvelles pages et des textes",
        "Le transfert du domaine, de l’hébergement et des e-mails",
        "L’héritage technique de l’ancien site",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Nous avons vérifié 64 adresses et noté 45 constats. Aujourd’hui, toutes les anciennes adresses sont accessibles ou redirigent, et Google indique 32 des 33 pages du sitemap comme indexées (au 28 octobre 2026).",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "lose-rankings",
        question: "Allons-nous perdre nos positions lors d’une refonte ?",
        answer:
          "Le risque vient surtout des redirections manquantes et des contenus perdus. C’est pourquoi nous vérifions chaque adresse. Il n’y a pas de garantie, et les positions peuvent varier un temps après le lancement.",
      },
      {
        id: "keep-urls",
        question: "Nos adresses doivent-elles changer ?",
        answer:
          "Non. Lorsqu’une ancienne adresse fonctionne bien, nous la gardons. Nous ne proposons un changement que s’il améliore la structure du site, et nous redirigeons alors l’ancienne adresse.",
      },
      {
        id: "keep-email",
        question: "Que deviennent nos boîtes e-mail ?",
        answer:
          "Vous pouvez rester chez votre fournisseur actuel ou les transférer aussi. Nous le réglons avant le lancement, afin qu’aucun message ne se perde.",
      },
    ],
    related: [
      { to: "technical-seo", text: "La vérification technique existe aussi sans nouveau site." },
      { to: "business-websites", text: "Comment nous planifions et construisons les nouvelles pages." },
      { to: "hosting-maintenance", text: "L’exploitation et les mises à jour après la refonte." },
    ],
  },
  {
    id: "landing-pages",
    name: "Pages de destination",
    summary: "Une page dédiée à chaque campagne, avec un seul objectif.",
    metaTitle: "Création de page de destination",
    metaDescription:
      "Faites créer une page de destination : une page pour une campagne, un objectif clair, rapide sur mobile, avec mesure des demandes pour Google Ads et les réseaux sociaux.",
    title: "Faire créer une page de destination",
    intro:
      "Une personne qui clique sur une annonce doit arriver sur une page qui reprend exactement cette offre. Nous créons des pages de destination avec un seul objectif et mesurons les demandes qu’elles apportent.",
    sections: [
      {
        heading: "Une page, un objectif",
        paragraphs: [
          "Le titre, la structure et le formulaire mènent à une seule étape : un appel, une demande ou une réservation. La page reprend les mots de l’annonce et répond aux questions encore ouvertes avant la décision, comme le déroulement, le prix et la zone d’intervention.",
          "Elle se charge vite, même sur mobile, car vous payez chaque clic.",
        ],
      },
      {
        heading: "Mesurer et améliorer",
        paragraphs: [
          "Nous mettons la mesure en place en même temps. Vous voyez combien de demandes une campagne apporte et ce que coûte une demande. Nous pouvons tester deux versions d’une page si la campagne apporte assez de visiteurs.",
          "Les pages conviennent aux campagnes sur Google, Meta et LinkedIn. Nous gérons aussi les campagnes elles-mêmes.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Le texte et la structure pour une offre",
        "Un design pour mobile et ordinateur",
        "Un formulaire ou une prise de rendez-vous",
        "Un suivi des conversions avec consentement",
        "Des variantes pour les tests, si le budget le permet",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un court échange, vous recevez un devis écrit.",
      factors: [
        "Le nombre de pages et de variantes",
        "Les textes, photos et vidéos",
        "Les formulaires et le raccordement au CRM",
        "La mise en place de la mesure",
      ],
    },
    faqs: [
      {
        id: "landing-vs-website",
        question: "Pourquoi notre site habituel ne suffit-il pas ?",
        answer:
          "Une page habituelle explique souvent plusieurs services et propose de nombreux chemins. Une page de destination reprend l’offre de l’annonce et mène à une seule étape. Vous payez moins pour des visiteurs qui ne trouvent rien.",
      },
      {
        id: "landing-domain",
        question: "La page de destination est-elle sur notre domaine ?",
        answer:
          "Oui, en général sur votre domaine ou un sous-domaine. Elle vous appartient et vous recevez tous les accès.",
      },
      {
        id: "landing-seo",
        question: "Une page de destination se positionne-t-elle aussi sur Google ?",
        answer:
          "Elle est le plus souvent conçue pour les annonces et contient peu de texte. Si une page doit apparaître durablement dans la recherche classique, nous la planifions comme une page de service avec plus de contenu.",
      },
    ],
    related: [
      { to: "google-ads", text: "Les campagnes qui amènent les visiteurs sur la page." },
      { to: "ads-tracking", text: "Comment nous mesurons quels clics deviennent des demandes." },
      { to: "business-websites", text: "Si vous avez besoin de plus d’une seule page." },
    ],
  },
  {
    id: "online-shops",
    name: "Boutiques en ligne",
    summary:
      "Des boutiques où les clients arrivent vite au paiement, reliées à la livraison et à la gestion des stocks.",
    metaTitle: "Création de boutique en ligne",
    metaDescription:
      "Faites créer votre boutique en ligne : pages produits, paiement et livraison, reliés à votre gestion des stocks, avec suivi e-commerce. Le système s’adapte à votre catalogue.",
    title: "Faire créer une boutique en ligne",
    intro:
      "Nous créons des boutiques pour des produits, des abonnements et des offres numériques. Les clients arrivent vite au paiement, et les commandes entrent directement dans les logiciels que vous utilisez déjà.",
    sections: [
      {
        heading: "Solution existante ou développement sur mesure",
        paragraphs: [
          "Nous choisissons entre une solution de boutique existante et un développement sur mesure selon votre catalogue, vos processus et votre budget. Nous ne nous limitons pas à un système à l’avance. Nous commençons donc par parler des produits, des variantes, de la livraison et du travail quotidien de votre équipe.",
        ],
      },
      {
        heading: "Du produit au paiement",
        paragraphs: [
          "Nous créons les catégories, les pages produits, la recherche, le panier et le paiement avec les moyens de paiement de vos clients. Le paiement reste court sur mobile. Les mentions obligatoires, comme les prix, les frais de livraison et le droit de rétractation, figurent là où les clients en ont besoin.",
        ],
      },
      {
        heading: "Raccordement et mesure",
        paragraphs: [
          "Les stocks et les commandes passent par votre gestion des stocks, afin que personne ne les saisisse deux fois. Nous raccordons vos transporteurs. Nous mettons en place le suivi e-commerce et le consentement pour que vous voyiez quels canaux apportent du chiffre d’affaires.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une boutique avec catégories, pages produits et paiement",
        "Les moyens de paiement et les règles de livraison",
        "Le raccordement aux stocks et à la livraison",
        "L’import de vos données produits",
        "Un suivi e-commerce avec consentement",
        "Une formation pour votre équipe et tous les accès",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange sur votre catalogue et vos processus, vous recevez un devis écrit. Les frais récurrents de la boutique et des prestataires de paiement y figurent séparément.",
      factors: [
        "Le nombre de produits et de variantes",
        "Les moyens de paiement et les règles de livraison",
        "Le raccordement aux stocks et à d’autres logiciels",
        "Une solution existante ou un développement sur mesure",
      ],
    },
    faqs: [
      {
        id: "shop-move",
        question: "Pouvez-vous transférer notre boutique actuelle ?",
        answer:
          "Oui. Nous reprenons les produits, les clients et les commandes dans la mesure où le système le permet, et nous redirigeons les anciennes adresses vers les nouvelles pages.",
      },
      {
        id: "shop-edit",
        question: "Pouvons-nous gérer les produits nous-mêmes ?",
        answer:
          "Oui. Vous modifiez vous-même les produits, les prix et les contenus. Après le lancement, nous montrons à votre équipe comment faire.",
      },
      {
        id: "shop-accessibility",
        question: "Notre boutique doit-elle être accessible ?",
        answer:
          "Depuis le 28 juin 2025, de nombreuses boutiques destinées aux particuliers en Allemagne relèvent de la loi allemande sur l’accessibilité (BFSG). Nous créons des boutiques utilisables au clavier et avec un lecteur d’écran, et nous clarifions avec vous si la loi vous concerne.",
      },
    ],
    related: [
      { to: "accessibility", text: "Ce que la loi allemande sur l’accessibilité signifie pour les boutiques." },
      { to: "google-ads", text: "Des campagnes Shopping pour vos produits." },
      { to: "workflows", text: "Transmettre automatiquement les commandes et les données." },
    ],
  },
  {
    id: "accessibility",
    name: "Sites accessibles",
    summary: "Des sites et boutiques utilisables aussi au clavier et avec un lecteur d’écran.",
    metaTitle: "Création de site web accessible (BFSG, WCAG)",
    metaDescription:
      "Faites créer ou auditer un site accessible : contrastes, formulaires, clavier et lecteur d’écran. Depuis le 28 juin 2025, la loi allemande BFSG vise de nombreux services en ligne.",
    title: "Faire créer un site web accessible",
    intro:
      "Nous créons et retravaillons des sites pour que chacun puisse aussi les utiliser au clavier et avec un lecteur d’écran. Depuis le 28 juin 2025, la loi allemande sur l’accessibilité l’exige de nombreuses boutiques et de nombreux services en ligne.",
    sections: [
      {
        heading: "À qui s’applique la loi",
        paragraphs: [
          "La loi allemande sur l’accessibilité (BFSG) concerne surtout les offres destinées aux particuliers, comme les boutiques en ligne et les sites où les clients peuvent conclure un contrat. Les microentreprises qui fournissent des services sont exemptées.",
          "Nous voyons lors du premier échange si la loi vous concerne. Cela ne remplace pas un conseil juridique. Le travail est utile même sans obligation, car un site bien structuré est plus simple à utiliser pour tous les visiteurs.",
        ],
      },
      {
        heading: "Ce que nous vérifions",
        paragraphs: [
          "Nous utilisons les critères WCAG du niveau AA comme référence. Nous vérifions les contrastes, les libellés des formulaires, l’ordre des titres, les textes des images et l’utilisation complète au clavier. Nous ajoutons des tests automatiques et des tests manuels avec un lecteur d’écran.",
        ],
      },
      {
        heading: "Ce qui se passe ensuite",
        paragraphs: [
          "Vous recevez une liste des défauts, triée par urgence. Nous les corrigeons nous-mêmes ou transmettons la liste à votre agence. Pour un nouveau site, nous prévoyons l’accessibilité dès le début, ce qui est souvent plus simple qu’une correction ultérieure. Nous rédigeons aussi le projet de déclaration d’accessibilité exigée par la loi.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un audit selon les critères WCAG du niveau AA",
        "Une liste des défauts, triée par urgence",
        "La correction des erreurs dans le code et le design",
        "Un projet de déclaration d’accessibilité",
        "Des tests au clavier et avec un lecteur d’écran",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un premier regard sur le site, vous recevez un devis écrit.",
      factors: [
        "Le nombre de types de pages",
        "Les formulaires, le paiement et la connexion",
        "Les documents comme les PDF",
        "L’audit seul ou l’audit et la correction",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "La page d’accueil, la page de contact et la page sur la rénovation de salle de bains à Bad Nauheim obtiennent 100 pour l’accessibilité dans chaque mesure Lighthouse sur mobile. Les tests automatiques ne trouvent pas tous les problèmes, nous vérifions donc aussi à la main.",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "bfsg-applies",
        question: "La loi BFSG s’applique-t-elle à notre site ?",
        answer:
          "Cela dépend si vous proposez un service aux particuliers, comme une boutique ou un contrat en ligne, et de la taille de votre entreprise. Un site purement informatif n’est souvent pas concerné. En cas de doute, demandez un conseil juridique.",
      },
      {
        id: "lighthouse-enough",
        question: "Un score Lighthouse de 100 suffit-il ?",
        answer:
          "Non. Lighthouse ne trouve qu’une partie des problèmes. Seul un test manuel montre si un formulaire se remplit vraiment avec un lecteur d’écran.",
      },
      {
        id: "accessibility-existing",
        question: "Pouvez-vous rendre un site existant accessible ?",
        answer:
          "Le plus souvent, oui. Après l’audit, nous vous disons ce qui peut être corrigé et où une reconstruction coûterait moins cher.",
      },
    ],
    related: [
      { to: "online-shops", text: "Les boutiques font partie des offres visées par la loi." },
      { to: "relaunch", text: "Prévoir l’accessibilité dès la refonte." },
      { to: "customer-portals", text: "Les portails doivent aussi s’utiliser au clavier." },
    ],
  },
  {
    id: "hosting-maintenance",
    name: "Hébergement et maintenance",
    summary: "L’exploitation, les mises à jour, les sauvegardes et les nouvelles fonctions après le lancement.",
    metaTitle: "Maintenance et hébergement de site web",
    metaDescription:
      "Maintenance et hébergement de site web : nous exploitons votre site, installons les mises à jour, sauvegardons les données et créons de nouvelles fonctions. Le site reste à vous.",
    title: "Maintenance et hébergement de site web",
    intro:
      "Après le lancement, un site doit fonctionner en sécurité et évoluer avec votre activité. Nous prenons en charge l’hébergement, les mises à jour et les sauvegardes, et nous créons de nouvelles pages et fonctions.",
    sections: [
      {
        heading: "Ce que nous faisons en continu",
        paragraphs: [
          "Nous exploitons le site, installons les mises à jour, sauvegardons les données et surveillons sa disponibilité. Si une panne survient, nous recevons une alerte et nous nous en occupons. Cela vaut pour les sites que nous avons créés et, après vérification, pour les sites existants.",
        ],
      },
      {
        heading: "Ce que vous modifiez vous-même",
        paragraphs: [
          "Vous modifiez vous-même les textes, les images et les horaires dans le système de gestion de contenu. Nous créons les nouvelles pages et fonctions sur le système existant, sans repartir de zéro.",
        ],
      },
      {
        heading: "Vous restez indépendant",
        paragraphs: [
          "Le site vous appartient. Vous recevez le code source, les designs, les contenus et tous les accès, et vous pouvez continuer avec une autre agence ou en interne à tout moment. Le domaine et l’hébergement sont à votre nom.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "L’hébergement et la surveillance de la disponibilité",
        "Les mises à jour et correctifs de sécurité",
        "Des sauvegardes régulières",
        "Un interlocuteur direct en cas de problème",
        "De nouvelles pages et fonctions selon accord",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Les coûts récurrents figurent séparément dans le devis. Nous chiffrons individuellement les évolutions importantes.",
      factors: [
        "La taille et la technique du site",
        "La boutique, la connexion et les autres fonctions",
        "La fréquence des mises à jour et des sauvegardes",
        "L’ampleur des modifications courantes",
      ],
    },
    faqs: [
      {
        id: "take-over-existing",
        question: "Reprenez-vous aussi des sites créés par d’autres ?",
        answer:
          "Oui. Nous vérifions d’abord la technique, les accès et l’état des mises à jour. Nous vous disons ensuite ce que nous reprenons et ce qu’il faut corriger avant.",
      },
      {
        id: "cancel",
        question: "Que se passe-t-il si nous mettons fin au contrat ?",
        answer:
          "Vous recevez toutes les données et tous les accès et vous pouvez continuer à exploiter le site chez un autre prestataire.",
      },
      {
        id: "edit-without-us",
        question: "Devons-nous vous contacter pour chaque modification de texte ?",
        answer:
          "Non. Vous modifiez vous-même les textes et les images dans le système de gestion de contenu. Nous vous montrons comment faire.",
      },
    ],
    related: [
      { to: "business-websites", text: "Comment nous planifions et construisons les nouveaux sites." },
      { to: "technical-seo", text: "Trouver les erreurs techniques et les corriger par urgence." },
    ],
  },
  {
    id: "web-apps",
    name: "Applications web",
    summary: "Des applications dans le navigateur, utilisées chaque jour par votre équipe ou vos clients.",
    metaTitle: "Développement d’application web",
    metaDescription:
      "Faites développer une application web : du prototype cliquable à l’application finale dans le navigateur, avec connexion, rôles et raccordement à vos logiciels.",
    title: "Faire développer une application web",
    intro:
      "Une application web fonctionne dans le navigateur et ne demande aucune installation. Nous créons des applications pour des processus qui passent aujourd’hui par des tableurs et des e-mails, et nous les relions à vos logiciels.",
    sections: [
      {
        heading: "D’abord le prototype",
        paragraphs: [
          "Nous notons qui utilisera l’application et quelles tâches elle doit accomplir. Nous créons ensuite un prototype cliquable que votre équipe teste avant le développement. Vous voyez tôt si le processus est juste, et les changements coûtent peu.",
        ],
      },
      {
        heading: "Ensuite l’application",
        paragraphs: [
          "Nous développons la connexion, les rôles et les droits, la base de données et le raccordement aux logiciels que vous utilisez déjà. Nous choisissons la technique selon la tâche et le nombre d’utilisateurs. Nous avançons par étapes, et vous voyez régulièrement une version utilisable.",
        ],
      },
      {
        heading: "Exploitation et évolutions",
        paragraphs: [
          "Après le lancement, nous prenons en charge l’exploitation, la surveillance et les sauvegardes, et nous créons de nouvelles fonctions. Vous recevez le code source et la documentation et pouvez aussi poursuivre l’application avec d’autres.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un prototype cliquable à tester",
        "Une application avec connexion, rôles et droits",
        "Le raccordement à vos logiciels actuels",
        "L’exploitation, la surveillance et les sauvegardes",
        "Le code source et la documentation",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après le prototype, le périmètre s’estime facilement. Vous recevez un devis écrit, qui peut aussi être découpée en étapes.",
      factors: [
        "Le nombre de tâches et de rôles",
        "Le raccordement à d’autres logiciels",
        "Les exigences de protection des données et de sécurité",
        "L’exploitation courante",
      ],
    },
    faqs: [
      {
        id: "web-vs-native",
        question: "Application web ou application sur les stores ?",
        answer:
          "Une application web fonctionne sur tout appareil sans installation et se modifie plus vite. Une application sur les stores se justifie si vous dépendez fortement de l’appareil photo, des notifications ou de l’usage hors ligne, ou si vous voulez y être trouvé.",
      },
      {
        id: "replace-excel",
        question: "Une application web vaut-elle mieux qu’Excel ?",
        answer:
          "Souvent, si plusieurs personnes gèrent les mêmes données, si les erreurs coûtent cher ou si les clients doivent saisir eux-mêmes des informations. Avec peu de personnes et des processus simples, un tableur ou une automatisation suffit.",
      },
      {
        id: "web-app-owner",
        question: "Le code source nous appartient-il ?",
        answer: "Oui. Vous recevez le code source, la documentation et tous les accès.",
      },
    ],
    related: [
      { to: "customer-portals", text: "Si vos clients doivent utiliser l’application." },
      { to: "mobile-apps", text: "Si l’application doit aller sur les stores." },
      { to: "ai-features", text: "Intégrer des fonctions d’IA à votre application." },
    ],
  },
  {
    id: "customer-portals",
    name: "Portails clients",
    summary: "Les clients prennent rendez-vous, suivent leurs commandes et envoient des documents sans appeler.",
    metaTitle: "Création de portail client",
    metaDescription:
      "Faites créer un portail client : vos clients prennent rendez-vous, voient l’état de leurs commandes et envoient des documents. Avec connexion sécurisée et raccordement à vos logiciels.",
    title: "Faire créer un portail client",
    intro:
      "Dans un portail client, vos clients font eux-mêmes ce pour quoi ils appellent ou écrivent aujourd’hui. Votre équipe travaille avec les mêmes données et ne saisit rien deux fois.",
    sections: [
      {
        heading: "Ce que les clients y font",
        paragraphs: [
          "Les usages typiques sont de prendre rendez-vous, voir l’état d’une commande, envoyer et télécharger des documents, consulter des factures et écrire des messages. Nous commençons par les questions auxquelles votre équipe répond le plus souvent, car le portail y économise le plus de travail.",
        ],
      },
      {
        heading: "Raccordement à vos logiciels",
        paragraphs: [
          "Le portail récupère les données du CRM, de la gestion des stocks ou de la comptabilité et y réécrit les changements. Les clients voient ainsi le même état que votre équipe. S’il manque une interface, nous cherchons une autre voie et vous expliquons ce qu’elle implique.",
        ],
      },
      {
        heading: "Sécurité et protection des données",
        paragraphs: [
          "Chaque client ne voit que ses propres données. Avant le développement, nous fixons les rôles, le lieu de stockage, les délais de suppression et les prestataires impliqués. Le portail s’utilise au clavier et avec un lecteur d’écran. Nous commençons par un prototype cliquable que vous pouvez tester avec de vrais clients.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un prototype cliquable à tester",
        "Un portail avec connexion sécurisée et comptes clients",
        "Le raccordement au CRM et à d’autres logiciels",
        "Des notifications par e-mail",
        "L’exploitation, la surveillance et les sauvegardes",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après le premier échange, vous recevez un devis écrit. Il est souvent judicieux de commencer avec peu de fonctions.",
      factors: [
        "Le nombre de fonctions",
        "Le raccordement à vos logiciels actuels",
        "Les rôles et les validations",
        "Les exigences de protection des données",
      ],
    },
    faqs: [
      {
        id: "portal-adoption",
        question: "Nos clients utiliseront-ils vraiment un portail ?",
        answer:
          "Nous le testons avec un prototype avant le développement. Un portail fonctionne le mieux lorsqu’il raccourcit une démarche que les clients font de toute façon, comme prendre rendez-vous ou retrouver une facture.",
      },
      {
        id: "portal-data",
        question: "Où sont stockées les données ?",
        answer:
          "Nous le fixons avec vous avant le développement. Nous choisissons les prestataires et le lieu de stockage selon vos obligations légales et nous documentons la décision.",
      },
      {
        id: "portal-website",
        question: "Le portail fait-il partie de notre site ?",
        answer:
          "Il peut fonctionner sur sa propre adresse, comme portail.votre-domaine.fr, et reprendre le design de votre site.",
      },
    ],
    related: [
      { to: "web-apps", text: "Si l’application est surtout destinée à votre équipe." },
      { to: "leads-crm", text: "Les demandes directement dans le CRM." },
      { to: "accessibility", text: "Comment nous vérifions l’accessibilité." },
    ],
  },
  {
    id: "mobile-apps",
    name: "Applications iOS et Android",
    summary: "Des applications pour iPhone et Android, du prototype au lancement sur les stores.",
    metaTitle: "Développement d’application iOS et Android",
    metaDescription:
      "Faites développer une application iOS et Android : prototype cliquable, développement, raccordement à vos systèmes et publication sur l’App Store et Google Play.",
    title: "Application iOS et Android sur mesure",
    intro:
      "Nous développons des applications pour iPhone et Android, du prototype cliquable à la publication sur l’App Store et Google Play. Nous clarifions d’abord si vous avez vraiment besoin d’une application ou si une application web suffit.",
    sections: [
      {
        heading: "Avez-vous besoin d’une application ?",
        paragraphs: [
          "Une application se justifie si les utilisateurs l’ouvrent souvent ou si elle a besoin de l’appareil photo, de la localisation, des notifications ou d’un usage hors ligne. Pour le reste, une application web est souvent moins chère et plus vite modifiée. Nous vous le disons, même si cela va contre un projet plus important.",
        ],
      },
      {
        heading: "Une base de code ou deux",
        paragraphs: [
          "Avec une solution multiplateforme, une seule base de code fonctionne sur les deux systèmes. Cela économise du temps et de l’argent. Le développement natif pour chaque système se justifie si l’application demande beaucoup de puissance ou des fonctions très particulières de l’appareil. Nous décidons selon les besoins de votre application.",
        ],
      },
      {
        heading: "Publication et maintenance",
        paragraphs: [
          "Nous préparons les fiches sur l’App Store et Google Play et accompagnons la vérification. Les nouvelles versions d’iOS et d’Android peuvent exiger des adaptations. Nous prévoyons donc les mises à jour et les corrections dès le début.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un prototype cliquable à tester",
        "Une application pour iOS et Android",
        "Le raccordement à vos données et logiciels",
        "La publication sur l’App Store et Google Play",
        "Les mises à jour et corrections",
        "Le code source et les accès",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après le prototype, le périmètre s’estime facilement. Vous recevez un devis écrit. Les frais récurrents des stores y figurent séparément.",
      factors: [
        "Le nombre de fonctions et d’écrans",
        "Multiplateforme ou natif",
        "La connexion, le paiement et l’usage hors ligne",
        "Le raccordement à d’autres systèmes",
      ],
    },
    faqs: [
      {
        id: "app-vs-web",
        question: "Une application web ne suffirait-elle pas ?",
        answer:
          "Souvent, oui. Une application web fonctionne dans le navigateur sans installation. Une application sur les stores se justifie si les utilisateurs l’ouvrent souvent ou si elle a besoin de fonctions de l’appareil, comme les notifications ou l’usage hors ligne.",
      },
      {
        id: "app-store-account",
        question: "À quel nom l’application est-elle publiée ?",
        answer: "Au vôtre. Les comptes Apple et Google vous appartiennent, et nous les créons avec vous.",
      },
      {
        id: "app-existing",
        question: "Pouvez-vous reprendre une application existante ?",
        answer:
          "Oui. Nous vérifions d’abord le code, les accès et les dépendances. Nous vous disons ensuite si la poursuite du développement vaut la peine ou si une reconstruction est préférable.",
      },
    ],
    related: [
      { to: "web-apps", text: "L’alternative sans installation." },
      { to: "customer-portals", text: "Si les clients doivent surtout voir leurs commandes et documents." },
      { to: "ai-features", text: "Intégrer des fonctions d’IA à votre application." },
    ],
  },
  {
    id: "desktop-apps",
    name: "Applications desktop",
    summary: "Des programmes pour Windows et Mac, lorsque le navigateur ne suffit pas.",
    metaTitle: "Développement d’application desktop",
    metaDescription:
      "Faites développer une application desktop pour Windows et Mac : accès aux fichiers et appareils, usage hors ligne et mises à jour automatiques. Aussi pour remplacer d’anciens programmes.",
    title: "Faire développer une application desktop",
    intro:
      "Nous créons des programmes pour Windows et Mac lorsqu’une application a besoin de fichiers ou d’appareils locaux, ou doit fonctionner hors ligne. Nous remplaçons aussi les anciens programmes que plus personne n’entretient.",
    sections: [
      {
        heading: "Quand une application desktop se justifie",
        paragraphs: [
          "Une application desktop se justifie si elle traite de gros fichiers, pilote des imprimantes, des scanners ou des machines, ou doit fonctionner sans internet. Si le navigateur suffit, nous recommandons une application web, car elle ne demande aucune installation et se modifie plus facilement.",
        ],
      },
      {
        heading: "Remplacer d’anciens programmes",
        paragraphs: [
          "De nombreuses entreprises utilisent des programmes qui ne tournent plus que sur un vieil ordinateur ou dont le développeur n’est plus joignable. Nous notons ce que fait le programme aujourd’hui, reprenons les données et créons un successeur qui garde les processus familiers là où ils fonctionnent bien.",
        ],
      },
      {
        heading: "Déploiement et mises à jour",
        paragraphs: [
          "Nous livrons un paquet d’installation pour vos ordinateurs et mettons en place des mises à jour automatiques. Pour le raccordement à des serveurs ou à d’autres logiciels, nous clarifions à l’avance les droits d’accès et les sauvegardes.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un prototype cliquable à tester",
        "Un programme pour Windows, Mac ou les deux",
        "La reprise de vos données existantes",
        "Un paquet d’installation et des mises à jour automatiques",
        "Le code source et la documentation",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange et le prototype, vous recevez un devis écrit.",
      factors: [
        "Le nombre de fonctions",
        "Windows, Mac ou les deux",
        "Le raccordement à des appareils et à d’autres logiciels",
        "La reprise des anciennes données",
      ],
    },
    faqs: [
      {
        id: "desktop-vs-web",
        question: "Application desktop ou application web ?",
        answer:
          "Une application web suffit si les utilisateurs ont internet et n’ont besoin ni d’appareils locaux ni de gros fichiers. Une application desktop se justifie dans le cas contraire.",
      },
      {
        id: "old-software",
        question: "Notre ancien programme ne tourne plus que sur un ordinateur. Que faire ?",
        answer:
          "Sauvegardez d’abord les données. Nous vérifions ensuite comment les lire et notons ce que fait le programme. Nous planifions ensuite le successeur.",
      },
      {
        id: "desktop-mac-windows",
        question: "Le programme fonctionne-t-il sur Windows et Mac ?",
        answer:
          "Nous pouvons le faire avec une base de code commune. Si vous n’avez besoin que d’un système, le développement est souvent plus simple.",
      },
    ],
    related: [
      { to: "web-apps", text: "L’alternative sans installation." },
      { to: "workflows", text: "Relier le programme à vos autres logiciels." },
    ],
  },
  {
    id: "technical-seo",
    name: "SEO technique et audit",
    summary: "Nous trouvons les erreurs qui freinent Google et les robots d’IA et les trions par urgence.",
    metaTitle: "SEO technique et audit SEO",
    metaDescription:
      "SEO technique et audit SEO : nous vérifions l’exploration, l’indexation, les redirections, le temps de chargement et les données structurées. Vous recevez des constats triés par urgence.",
    title: "SEO technique et audit SEO",
    intro:
      "Nous vérifions chaque adresse de votre site et trouvons les erreurs qui freinent Google et les robots d’IA. Vous recevez une liste triée par urgence. Nous corrigeons les erreurs nous-mêmes ou transmettons la liste à votre agence.",
    sections: [
      {
        heading: "Ce que nous vérifions",
        paragraphs: [
          "Nous vérifions l’exploration et l’indexation, les redirections, les pages d’erreur, les contenus dupliqués, les titres de page, les liens internes, les données structurées, le fichier robots.txt, le sitemap et le temps de chargement sur mobile. Nous lisons aussi vos données de la Google Search Console, car elles montrent quelles pages Google intègre réellement.",
        ],
      },
      {
        heading: "Ce que vous avez ensuite en main",
        paragraphs: [
          "Chaque constat indique les pages concernées, la conséquence et une consigne précise. La liste est triée par urgence : vous voyez ce qu’il faut corriger tout de suite et ce qui peut attendre. Beaucoup de points se corrigent vite. Nous planifions les transformations plus lourdes comme un projet à part.",
        ],
      },
      {
        heading: "Aussi pour les robots d’IA",
        paragraphs: [
          "Nous vérifions si des robots comme GPTBot peuvent lire vos pages et si l’hébergeur ou le pare-feu les bloque. Un site bloqué peut difficilement apparaître comme source dans les réponses des IA.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une vérification de toutes les adresses de votre site",
        "Une liste de constats triée par urgence",
        "Une consigne précise pour chaque constat",
        "La correction par nos soins ou la transmission à votre agence",
        "Un contrôle dans la Search Console après les corrections",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un premier regard sur le site, vous recevez un devis écrit.",
      factors: [
        "Le nombre d’adresses",
        "La technique du site",
        "L’audit seul ou l’audit et la correction",
        "L’accès à la Search Console et au serveur",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Sur 64 adresses vérifiées, nous avons noté 45 constats, dont une page d’erreur liée depuis cinq pages et un fichier robots.txt qui bloquait le CSS et le JavaScript. Google indique aujourd’hui 32 des 33 pages du sitemap comme indexées (au 28 octobre 2026).",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "audit-tool",
        question: "Un outil SEO ne suffit-il pas ?",
        answer:
          "Un outil trouve beaucoup d’erreurs techniques, mais ne dit pas lesquelles comptent pour vous. Nous vérifions les résultats à la main et les trions selon leur effet sur vos pages.",
      },
      {
        id: "audit-access",
        question: "De quels accès avez-vous besoin ?",
        answer:
          "Pour un audit complet, nous avons besoin d’un accès en lecture à la Google Search Console. Un premier regard est possible sans accès, car la plupart des vérifications se font de l’extérieur.",
      },
      {
        id: "audit-agency",
        question: "Nous avons déjà une agence. Est-ce possible quand même ?",
        answer: "Oui. Vous recevez la liste et vous pouvez la transmettre à votre agence.",
      },
    ],
    related: [
      { to: "relaunch", text: "Si la vérification conseille une reconstruction." },
      { to: "seo-content", text: "Si la technique est bonne, mais que les contenus manquent." },
      { to: "geo", text: "Comment votre entreprise apparaît dans les réponses des IA." },
    ],
  },
  {
    id: "local-seo",
    name: "SEO local",
    summary: "Pour que les clients vous trouvent dans Google Maps et dans les recherches avec un nom de lieu.",
    metaTitle: "SEO local et fiche d’établissement Google",
    metaDescription:
      "SEO local pour les entreprises de proximité : fiche d’établissement Google, pages locales au contenu réel, annuaires et une méthode simple pour obtenir plus d’avis.",
    title: "SEO local : être trouvé dans Google Maps",
    intro:
      "Si vous travaillez localement, on vous trouve par Google Maps et par des recherches avec un nom de lieu. Nous entretenons votre fiche d’établissement Google, créons des pages locales au contenu réel et vous aidons à obtenir plus d’avis.",
    sections: [
      {
        heading: "Fiche d’établissement Google",
        paragraphs: [
          "Nous tenons votre fiche complète : catégories, services, horaires, photos et publications. Nous harmonisons le nom, l’adresse et le téléphone sur votre site et dans les annuaires, afin que les mêmes informations figurent partout.",
        ],
      },
      {
        heading: "Des pages locales au contenu réel",
        paragraphs: [
          "Chaque lieu important reçoit sa propre page avec des contenus valables uniquement là, comme les quartiers, la distance ou les règles locales. Des pages où seul le nom du lieu change n’aident ni les clients ni Google. Nous ne créons donc que le nombre de pages que nous pouvons remplir d’informations réelles.",
        ],
      },
      {
        heading: "Avis",
        paragraphs: [
          "Nous mettons en place un moyen simple de demander un avis à vos clients satisfaits, par exemple par lien ou par QR code. Vous répondez aux avis vous-même ou avec notre projet de réponse. Les avis achetés ou inventés ne font pas partie de notre travail.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une fiche d’établissement Google complète et entretenue",
        "Des informations cohérentes dans les annuaires importants",
        "Des pages locales au contenu réel",
        "Un lien ou un QR code pour les avis",
        "Un rapport sur les appels, les itinéraires et les visites",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un court échange, vous recevez un devis écrit.",
      factors: [
        "Le nombre d’établissements et de zones d’intervention",
        "L’état de la fiche et du site",
        "Le nombre de nouvelles pages locales",
        "La mise en place unique ou l’entretien continu",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Quatre anciennes pages locales partageaient 85 à 90 pour cent de leur texte. Les nouvelles pages indiquent la distance, les quartiers, la dureté de l’eau du fournisseur et la protection du patrimoine. Texte identique : 19 à 28 pour cent.",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "local-no-office",
        question: "Nous n’avons pas de magasin. Le SEO local reste-t-il possible ?",
        answer:
          "Oui. Les entreprises qui se déplacent chez le client peuvent aussi avoir une fiche avec une zone d’intervention, et des pages pour les lieux importants.",
      },
      {
        id: "local-pages-count",
        question: "Combien de pages locales devrions-nous avoir ?",
        answer:
          "Autant que de lieux où vous travaillez vraiment et que vous pouvez remplir d’informations propres. De nombreuses pages presque identiques nuisent plus qu’elles n’aident.",
      },
      {
        id: "local-reviews",
        question: "Pouvons-nous demander des avis à nos clients ?",
        answer: "Oui. Vous pouvez les demander, mais sans offrir de contrepartie et sans acheter d’avis.",
      },
    ],
    related: [
      { to: "seo-content", text: "Des textes pour vos pages de services et vos pages locales." },
      { to: "business-websites", text: "Un site avec une page pour chaque lieu." },
      { to: "google-ads", text: "Être visible pendant que vos positions progressent." },
    ],
  },
  {
    id: "geo",
    name: "Visibilité IA (GEO)",
    summary: "Pour que ChatGPT, Perplexity et l’aperçu IA de Google puissent trouver et citer votre entreprise.",
    metaTitle: "Agence GEO : visibilité dans ChatGPT et les IA",
    metaDescription:
      "GEO et visibilité IA : nous vérifions ce que ChatGPT, Perplexity et l’aperçu IA de Google disent de votre entreprise, et nous rendons vos informations faciles à citer.",
    title: "GEO : visible dans ChatGPT et les IA",
    intro:
      "Certains clients demandent aujourd’hui à une IA qui engager. Nous vérifions ce que ChatGPT, Perplexity et l’aperçu IA de Google disent de votre entreprise, et nous rendons vos informations faciles à trouver et à citer.",
    sections: [
      {
        heading: "Ce qu’est le GEO",
        paragraphs: [
          "GEO signifie Generative Engine Optimization. L’objectif est que les services d’IA connaissent et citent votre entreprise lorsque quelqu’un demande votre service. Le GEO s’appuie sur le SEO et ne le remplace pas. Une page que Google ne trouve pas et que les robots ne peuvent pas lire est aussi difficile à utiliser pour une IA.",
        ],
      },
      {
        heading: "Comment nous mesurons la situation",
        paragraphs: [
          "Nous posons aux services d’IA les questions de vos clients et notons qui ils citent et quelles sources ils utilisent. Vous voyez où votre entreprise manque et quels autres sites influencent les réponses. Les réponses des IA varient. Nous répétons donc la mesure et regardons la tendance.",
        ],
      },
      {
        heading: "Ce que nous changeons",
        paragraphs: [
          "Nous donnons accès aux robots d’IA, écrivons des réponses claires à de vraies questions, ajoutons des données structurées et rendons les informations sur les services et le lieu sans ambiguïté. Nous travaillons aussi les mentions sur d’autres sites, car les services d’IA s’appuient sur plusieurs sources. Personne ne peut garantir une citation précise.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une mesure de votre visibilité dans les réponses des IA",
        "Une liste des sources citées par les services d’IA",
        "Une vérification de l’accès des robots d’IA",
        "Des contenus et données structurées retravaillés",
        "Un plan pour les mentions sur d’autres sites",
        "Une mesure répétée et un rapport",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un court échange, vous recevez un devis écrit.",
      factors: [
        "Le nombre de questions et de services mesurés",
        "L’état de la technique et des contenus",
        "L’ampleur des nouveaux contenus",
        "La vérification unique ou le travail continu",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Le robot GPTBot d’OpenAI recevait l’erreur 429 de l’ancien hébergeur, et le fichier robots.txt bloquait des dossiers importants. Aujourd’hui, les moteurs de recherche et les robots d’IA peuvent lire chaque page. Cela crée la condition, mais ne garantit aucune citation.",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "geo-vs-seo",
        question: "Avons-nous besoin du GEO en plus du SEO ?",
        answer:
          "Le GEO complète le SEO. Les bases sont les mêmes : des pages accessibles, des contenus clairs et des informations sans ambiguïté. S’y ajoutent la mesure dans les services d’IA et les sources sur lesquelles ils s’appuient.",
      },
      {
        id: "geo-guarantee",
        question: "Pouvez-vous garantir une citation dans ChatGPT ?",
        answer:
          "Non, personne ne le peut. Les réponses des IA changent selon la question et le moment. Nous améliorons les conditions et mesurons si votre entreprise est citée plus souvent.",
      },
      {
        id: "geo-block",
        question: "Devons-nous bloquer les robots d’IA ?",
        answer:
          "Si vous voulez apparaître dans les réponses des IA, autorisez au moins vos pages publiques. Vous pouvez exclure les contenus que vous vendez. Nous le décidons ensemble.",
      },
    ],
    related: [
      { to: "technical-seo", text: "La technique sur laquelle s’appuie le GEO." },
      { to: "seo-content", text: "Des contenus qui répondent clairement aux questions." },
    ],
  },
  {
    id: "seo-content",
    name: "Contenus SEO",
    summary: "Des pages pour les recherches de vos clients, de l’analyse au texte final.",
    metaTitle: "Rédaction de contenus SEO",
    metaDescription:
      "Contenus SEO : nous analysons ce que recherchent vos clients, planifions les pages et rédigeons des pages de services et des guides, en validant les détails métier avec vous.",
    title: "Des contenus SEO qui répondent à vos clients",
    intro:
      "Nous découvrons ce que recherchent vos clients et rédigeons les pages qui manquent. Nous validons les détails métier avec vous, afin que chaque texte soit juste.",
    sections: [
      {
        heading: "Analyse",
        paragraphs: [
          "Nous analysons les recherches, le volume et l’intention : la personne veut-elle acheter, comparer ou s’informer ? Nous regardons ensuite ce que montrent vos concurrents pour ces termes et ce pour quoi votre site se positionne déjà.",
          "Vous recevez un plan : quelle page couvre quel terme, quelles nouvelles pages créer et dans quel ordre. Les termes à fort volume sans intention d’achat passent en dernier.",
        ],
      },
      {
        heading: "Rédiger et retravailler",
        paragraphs: [
          "Nous rédigeons des pages de services et des guides et retravaillons les pages existantes. Chaque page reçoit son titre, une description, un ordre logique de titres et des liens internes. Si plusieurs pages traitent le même sujet, nous les réunissons.",
          "Avant d’écrire, nous parlons avec vous, car aucun texte du web ne remplace l’expérience de vos missions. Nous utilisons l’IA comme aide et ne publions que ce qu’une personne a vérifié.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une liste de recherches avec leur intention",
        "Un plan : quelle page pour quel terme",
        "Des textes finis ou des briefs pour votre équipe",
        "Les titres de page, descriptions et liens internes",
        "Une analyse après la publication",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après l’analyse, nous savons combien de pages valent la peine. Vous recevez un devis écrit.",
      factors: [
        "Le nombre et la longueur des pages",
        "Le niveau de spécialisation du sujet",
        "De nouveaux textes ou une révision",
        "Un projet unique ou un travail continu",
      ],
    },
    faqs: [
      {
        id: "content-ai",
        question: "Rédigez-vous les textes avec l’IA ?",
        answer:
          "L’IA nous aide pour la recherche et les ébauches. Nous vérifions chaque texte et validons les détails métier avec vous. Nous ne publions pas de textes d’IA non vérifiés.",
      },
      {
        id: "content-length",
        question: "Quelle longueur doit avoir un texte SEO ?",
        answer:
          "Il n’y a pas de longueur fixe. Un texte est assez long lorsqu’il répond aux questions sur le sujet. Nous nous guidons sur les questions de vos clients.",
      },
      {
        id: "content-time",
        question: "Combien de temps devons-nous prévoir ?",
        answer: "En général, un échange par sujet et une relecture de l’ébauche. Nous nous occupons du reste.",
      },
    ],
    related: [
      { to: "technical-seo", text: "Si de bonnes pages n’arrivent pas jusqu’à Google." },
      { to: "local-seo", text: "Des contenus pour vos pages locales." },
      { to: "geo", text: "Comment les textes deviennent des sources pour les réponses IA." },
    ],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    summary: "Des annonces Search et Shopping pour les personnes qui cherchent votre offre maintenant.",
    metaTitle: "Agence Google Ads : campagnes et gestion",
    metaDescription:
      "Google Ads par une agence : mots-clés, campagnes Search et Shopping, textes d’annonces et mesure des demandes. Nous vérifions et reprenons aussi les comptes existants.",
    title: "Google Ads : toucher ceux qui cherchent",
    intro:
      "Les annonces Google touchent les personnes qui cherchent votre offre à ce moment précis. Nous créons et gérons des campagnes Search et Shopping et mesurons ce que coûte une demande.",
    sections: [
      {
        heading: "Création des campagnes",
        paragraphs: [
          "Nous analysons les recherches et estimons le prix des clics dans votre secteur et votre région. Nous créons ensuite des campagnes Search, et des campagnes Shopping pour les boutiques en ligne, rédigeons les textes et les extensions d’annonces et fixons où elles apparaissent.",
        ],
      },
      {
        heading: "Gestion continue",
        paragraphs: [
          "Nous lisons les recherches réelles, excluons celles qui ne conviennent pas et ajustons les enchères et les budgets. Nous testons les annonces en variantes. Nous utilisons les enchères automatiques lorsque le compte fournit assez de données fiables.",
        ],
      },
      {
        heading: "Comptes existants",
        paragraphs: [
          "Nous vérifions d’abord un compte existant : compte-t-il de vraies demandes, que payez-vous en ce moment et la page correspond-elle à l’annonce ? Nous décidons ensuite ce qui reste, ce que nous nettoyons et ce que nous reconstruisons. Le compte et les données restent chez vous.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une analyse des recherches et des prix des clics",
        "Des campagnes Search et Shopping",
        "Des textes et extensions d’annonces",
        "Un suivi des conversions pour les demandes et les achats",
        "Un rapport régulier avec le coût par demande",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Le budget publicitaire et nos honoraires figurent séparément dans le devis. Vous payez le budget directement à Google.",
      factors: [
        "Le nombre de campagnes et d’offres",
        "Une création ou la reprise d’un compte",
        "La mise en place de la mesure",
        "L’ampleur de la gestion continue",
      ],
    },
    faqs: [
      {
        id: "google-budget",
        question: "Quel budget nous faut-il pour Google Ads ?",
        answer:
          "Cela dépend du prix des clics dans votre secteur et votre région. Avant le lancement, nous les estimons et vous disons quel budget permet un test parlant.",
      },
      {
        id: "google-vs-seo",
        question: "Google Ads ou SEO ?",
        answer:
          "Les annonces apportent des visiteurs immédiatement et s’arrêtent avec le budget. Le SEO prend plus de temps, puis apporte des visiteurs sans coût par clic. Les deux se justifient souvent : les annonces pour le démarrage, le SEO pour la suite.",
      },
      {
        id: "google-account-owner",
        question: "À qui appartient le compte Google Ads ?",
        answer:
          "À vous. Nous travaillons avec un accès à votre compte. Vous gardez toutes les données, même si vous changez d’agence.",
      },
    ],
    related: [
      { to: "landing-pages", text: "La page sur laquelle arrive l’annonce." },
      { to: "ads-tracking", text: "Comment nous relions les clics et les demandes." },
      { to: "social-ads", text: "Toucher les personnes avant qu’elles ne cherchent." },
    ],
  },
  {
    id: "social-ads",
    name: "Publicité sociale",
    summary: "Des annonces sur Meta, LinkedIn et d’autres réseaux pour les personnes qui ne cherchent pas encore.",
    metaTitle: "Agence publicité sociale : Meta et LinkedIn",
    metaDescription:
      "Publicité sur Facebook, Instagram, LinkedIn et d’autres réseaux : audiences, annonces, reciblage et mesure des demandes, évalués selon le coût par demande.",
    title: "Publicité sur Meta, LinkedIn et plus",
    intro:
      "La publicité sociale touche les personnes avant qu’elles ne cherchent. Nous choisissons les réseaux selon vos clients, concevons les annonces et mesurons les demandes qu’elles apportent.",
    sections: [
      {
        heading: "Le bon réseau",
        paragraphs: [
          "Pour les particuliers, ce sont le plus souvent Facebook et Instagram, et pour les professionnels plutôt LinkedIn. Nous vérifions d’autres réseaux si vos clients s’y trouvent. Nous choisissons les audiences selon la région, les centres d’intérêt ou la profession.",
        ],
      },
      {
        heading: "Nouvelles audiences et reciblage",
        paragraphs: [
          "Nous séparons les campagnes pour de nouvelles audiences du reciblage des personnes qui ont déjà visité votre site. Nous adaptons le format et le message au canal. Nous déplaçons le budget vers les emplacements qui apportent des demandes.",
        ],
      },
      {
        heading: "Des annonces en variantes",
        paragraphs: [
          "Nous rédigeons et concevons des annonces image et vidéo. Chaque variante teste une hypothèse, par exemple si le prix ou la disponibilité rapide apporte plus de demandes. Les annonces perdent de leur effet avec le temps, nous en prévoyons donc régulièrement de nouvelles.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Le choix des réseaux et des audiences",
        "Des annonces image, vidéo et texte en variantes",
        "Des campagnes pour de nouvelles audiences et le reciblage",
        "Un suivi avec consentement",
        "Un rapport régulier avec le coût par demande",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Le budget publicitaire et nos honoraires figurent séparément dans le devis. Vous payez le budget directement au réseau.",
      factors: [
        "Le nombre de réseaux",
        "La production d’images et de vidéos",
        "La mise en place du suivi",
        "L’ampleur de la gestion continue",
      ],
    },
    faqs: [
      {
        id: "social-b2b",
        question: "La publicité sociale fonctionne-t-elle aussi en B2B ?",
        answer:
          "Oui, LinkedIn permet de cibler selon la profession et le secteur. Les clics y sont souvent plus chers. Nous vérifions donc d’abord si un test a du sens pour votre budget.",
      },
      {
        id: "social-organic",
        question: "Gérez-vous aussi nos réseaux sociaux habituels ?",
        answer:
          "Notre priorité est la publicité payante. Vous pouvez aussi utiliser les contenus des annonces sur vos propres canaux.",
      },
      {
        id: "social-tracking",
        question: "Pouvons-nous suivre les visiteurs sans consentement ?",
        answer:
          "Pour le suivi marketing, il vous faut en général un consentement. Nous mettons en place le consentement et la mesure pour qu’ils fonctionnent ensemble.",
      },
    ],
    related: [
      { to: "google-ads", text: "Toucher les personnes qui cherchent activement." },
      { to: "landing-pages", text: "La page après le clic." },
      { to: "ads-tracking", text: "Une mesure avec consentement et signaux des plateformes." },
    ],
  },
  {
    id: "ads-tracking",
    name: "Suivi et conversions",
    summary: "Vous voyez quelle campagne apporte des demandes et ce que coûte une demande.",
    metaTitle: "Mise en place du suivi des conversions",
    metaDescription:
      "Faites mettre en place le suivi des conversions : formulaires, appels et achats mesurés, avec consentement et les signaux pour Google et Meta. Vous voyez le coût par demande.",
    title: "Un suivi des conversions fiable",
    intro:
      "Sans mesure fiable, vous et les stratégies d’enchères de Google et Meta décidez sur de mauvais chiffres. Nous mettons en place un suivi qui relie les dépenses publicitaires aux vraies demandes et aux vrais achats.",
    sections: [
      {
        heading: "Ce que nous mesurons",
        paragraphs: [
          "Nous mesurons les formulaires, les appels, les réservations et les achats, et nous fixons ensemble ce qui compte comme une bonne demande. Les clics et les pages vues seuls disent peu de choses. Lorsque c’est possible, nous comparons les demandes au résultat dans le CRM, afin que vous voyiez quelle campagne mène à des commandes.",
        ],
      },
      {
        heading: "Consentement et protection des données",
        paragraphs: [
          "Nous mettons en place le consentement pour que les choix soient respectés, et nous transmettons à Google et Meta les signaux qu’ils peuvent utiliser sur cette base. Nous vérifions aussi si votre formulaire de contact fonctionne sans cookies marketing. Vous clarifiez les questions juridiques avec votre conseil en protection des données.",
        ],
      },
      {
        heading: "Des rapports qui disent quelque chose",
        paragraphs: [
          "Le rapport indique les dépenses, les demandes, le coût par demande et les prochaines étapes pour chaque canal. Nous expliquons aussi où la mesure a des lacunes, car les visiteurs qui refusent les cookies manquent dans les données.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une vérification du suivi existant",
        "La mesure des formulaires, appels et achats",
        "Le consentement et les signaux des plateformes",
        "La comparaison avec le CRM lorsque c’est possible",
        "Un rapport avec le coût par demande",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un regard sur votre site et vos comptes, vous recevez un devis écrit.",
      factors: [
        "Le nombre de sites et de formulaires",
        "Le nombre de comptes publicitaires",
        "Le raccordement au CRM",
        "La mise en place unique ou l’entretien continu",
      ],
    },
    proof: {
      heading: "Exemple : Handwerker.work",
      text: "Sur l’ancien site, le formulaire de contact ne fonctionnait que si les visiteurs autorisaient les cookies marketing. Les personnes qui refusaient ne pouvaient pas envoyer de demande. Aujourd’hui, le formulaire fonctionne sans consentement aux cookies.",
      link: "Voir la référence",
    },
    faqs: [
      {
        id: "tracking-loss",
        question: "Pourquoi Google Ads et Analytics affichent-ils des chiffres différents ?",
        answer:
          "Ils comptent différemment, par exemple pour le moment de la conversion et l’attribution à un canal. S’y ajoutent les visiteurs sans consentement. Nous fixons quel chiffre vaut pour quelle décision.",
      },
      {
        id: "tracking-phone",
        question: "Peut-on aussi mesurer les appels ?",
        answer:
          "Oui. Nous mesurons les clics sur le numéro de téléphone et, si besoin, les appels via un numéro propre à la campagne.",
      },
      {
        id: "tracking-seo",
        question: "En avons-nous besoin sans annonces ?",
        answer:
          "Oui, si vous voulez savoir quelles pages et quels canaux apportent des demandes. La même mesure montre aussi ce qu’apporte le SEO.",
      },
    ],
    related: [
      { to: "google-ads", text: "Des campagnes fondées sur de vraies demandes." },
      { to: "leads-crm", text: "Les demandes directement dans le CRM." },
      { to: "landing-pages", text: "Des pages dont les demandes se mesurent." },
    ],
  },
  {
    id: "leads-crm",
    name: "Demandes et CRM",
    summary: "Les nouvelles demandes arrivent immédiatement chez la bonne personne, sans ressaisie.",
    metaTitle: "Automatisation CRM pour les demandes",
    metaDescription:
      "Automatisation CRM : les demandes issues du site, des campagnes et des e-mails arrivent automatiquement dans le CRM, sont évaluées et transmises à la bonne personne.",
    title: "Les demandes directement dans le CRM",
    intro:
      "Les demandes issues du site, des campagnes ou des e-mails arrivent automatiquement dans le CRM et chez la bonne personne. Personne ne ressaisit rien, et aucune demande ne reste en attente.",
    sections: [
      {
        heading: "De la demande à la bonne personne",
        paragraphs: [
          "Le système crée le contact, complète les données manquantes, évalue la demande selon son objet et son urgence et la transmet. Le client reçoit immédiatement une confirmation. Une IA lit le texte libre des formulaires et des e-mails, et une règle simple reprend les champs fixes.",
        ],
      },
      {
        heading: "Relances et vue d’ensemble",
        paragraphs: [
          "Si une demande reste sans suite, le système envoie un rappel. Le statut dans le pipeline reste à jour. Vous voyez combien de demandes sont ouvertes, d’où elles viennent et lesquelles deviennent des commandes. Le devis et le rappel restent à votre équipe.",
        ],
      },
      {
        heading: "Avec le CRM que vous utilisez",
        paragraphs: [
          "Nous raccordons le CRM que vous utilisez déjà. Si vous n’en avez pas encore, nous en proposons un adapté à votre taille. Avant le lancement, nous fixons qui accède à quelles données et quels prestataires sont impliqués.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une description écrite du processus actuel",
        "Une reprise automatique depuis tous les canaux",
        "L’évaluation et la transmission des demandes",
        "Des rappels et le statut dans le pipeline",
        "Des alertes en cas d’erreur et une documentation",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange sur le processus, vous recevez un devis écrit. Les coûts récurrents des logiciels y figurent séparément.",
      factors: [
        "Le nombre de canaux comme le formulaire, l’e-mail et les campagnes",
        "Le CRM et ses interfaces",
        "Les règles et les exceptions",
        "L’usage de l’IA",
      ],
    },
    faqs: [
      {
        id: "crm-which",
        question: "Quel CRM recommandez-vous ?",
        answer:
          "Cela dépend de votre taille et de vos processus. Si vous en utilisez déjà un, nous le gardons le plus souvent et le relions à vos canaux.",
      },
      {
        id: "crm-control",
        question: "L’IA décide-t-elle quelles demandes nous acceptons ?",
        answer: "Non. Elle trie et prépare. Votre équipe prend la décision.",
      },
      {
        id: "crm-existing-data",
        question: "Que deviennent nos contacts existants ?",
        answer:
          "Nous les reprenons dans le CRM et supprimons les doublons dans la mesure où ils se reconnaissent de façon sûre.",
      },
    ],
    related: [
      { to: "documents-email", text: "Lire automatiquement les e-mails et les documents." },
      { to: "ads-tracking", text: "Voir quelle campagne mène à des commandes." },
      { to: "customer-portals", text: "Les clients voient eux-mêmes l’état de leur demande." },
    ],
  },
  {
    id: "documents-email",
    name: "Documents et e-mails",
    summary: "L’IA lit les e-mails, factures et formulaires et les prépare pour votre équipe.",
    metaTitle: "Automatiser les documents et les e-mails",
    metaDescription:
      "Traitez automatiquement factures, bons de livraison et e-mails : l’IA lit les données, les transfère dans le bon logiciel et rédige des brouillons. Votre équipe vérifie.",
    title: "Automatiser documents et e-mails",
    intro:
      "L’IA lit les factures, les bons de livraison et les e-mails, extrait les données importantes et les transfère dans le bon logiciel. Votre équipe vérifie les cas où le système a un doute.",
    sections: [
      {
        heading: "Documents",
        paragraphs: [
          "Le système reconnaît et classe les factures, les bons de livraison, les formulaires et les contrats. Les champs importants, comme le fournisseur, le montant et la date, vont dans la comptabilité, l’ERP ou le CRM. Pour les documents incertains, le système demande au lieu de deviner.",
        ],
      },
      {
        heading: "E-mails",
        paragraphs: [
          "La boîte se trie selon l’objet et transmet les messages à la personne responsable. Pour les questions fréquentes, l’IA rédige un brouillon que votre équipe vérifie et envoie. Nous n’envoyons automatiquement que ce que vous avez validé à l’avance.",
        ],
      },
      {
        heading: "Tester d’abord, utiliser ensuite",
        paragraphs: [
          "Nous testons avec vos vrais documents et mesurons à quelle fréquence l’IA a raison avant la mise en service. Vous voyez à l’avance combien de travail manuel reste. Avant le lancement, nous clarifions quels prestataires voient les données et où elles sont stockées.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un test avec vos vrais documents",
        "La lecture et le transfert des données",
        "Le tri et des brouillons de réponse pour les e-mails",
        "Une étape de vérification pour les cas incertains",
        "Des alertes en cas d’erreur et une documentation",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange et un regard sur des exemples de documents, vous recevez un devis écrit. Les coûts récurrents des modèles d’IA y figurent séparément.",
      factors: [
        "Le nombre de types de documents",
        "Le volume par mois",
        "Les logiciels qui reçoivent les données",
        "Les exigences de protection des données",
      ],
    },
    faqs: [
      {
        id: "documents-accuracy",
        question: "Avec quelle fiabilité l’IA lit-elle nos documents ?",
        answer:
          "Nous le mesurons sur vos propres documents avant la mise en service. Les cas incertains vont à votre équipe, afin que les erreurs ne passent pas inaperçues.",
      },
      {
        id: "documents-gobd",
        question: "Qu’en est-il des obligations de conservation ?",
        answer:
          "Les originaux restent dans le système où vous devez les conserver. Nous accordons le processus avec votre conseil fiscal ou votre système documentaire.",
      },
      {
        id: "email-auto-send",
        question: "L’IA répond-elle seule aux e-mails ?",
        answer:
          "Pas par défaut. Elle rédige des brouillons que votre équipe vérifie. De simples confirmations peuvent partir automatiquement si vous l’autorisez.",
      },
    ],
    related: [
      { to: "leads-crm", text: "Intégrer automatiquement au CRM les demandes reçues par e-mail." },
      { to: "workflows", text: "Transmettre automatiquement les données entre logiciels." },
      { to: "ai-assistants", text: "Répondre aux questions sur vos documents, avec la source." },
    ],
  },
  {
    id: "workflows",
    name: "Workflows et interfaces",
    summary: "Des règles fixes prennent en charge les étapes répétitives, et vos logiciels échangent des données.",
    metaTitle: "Automatisation de workflows et interfaces",
    metaDescription:
      "Automatisation de workflows : nous relions vos logiciels par des interfaces, reprenons les étapes répétitives avec des règles fixes et surveillons le fonctionnement.",
    title: "Automatiser et relier vos logiciels",
    intro:
      "Transmettre des données, créer des tâches, prévenir des collègues : des règles fixes font ces étapes de façon fiable. Nous relions vos logiciels pour que personne ne saisisse les données deux fois.",
    sections: [
      {
        heading: "D’abord le processus",
        paragraphs: [
          "Nous notons comment la tâche se déroule aujourd’hui, où sont les exceptions et quelles décisions une personne doit prendre. Nous en tirons les déclencheurs, les règles et les validations. Il apparaît souvent qu’une étape peut être supprimée.",
        ],
      },
      {
        heading: "Règle ou IA",
        paragraphs: [
          "Pour des règles fixes, une automatisation classique est le plus souvent plus fiable et moins chère que l’IA. Nous utilisons l’IA lorsqu’une tâche contient du langage ou des textes non structurés. Nous choisissons la technique selon les logiciels que vous utilisez.",
        ],
      },
      {
        heading: "Exploitation",
        paragraphs: [
          "Les droits d’accès n’autorisent que ce dont le processus a besoin. Les journaux montrent ce qui s’est passé. Si une étape échoue, votre équipe reçoit un message et prend le relais à la main. Vous recevez une documentation et pouvez modifier les règles plus tard.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une description écrite du processus et des exceptions",
        "Une automatisation avec règles et validations",
        "Des interfaces entre vos logiciels",
        "Des journaux et des alertes en cas d’erreur",
        "Une documentation et une transmission",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange sur le processus, vous recevez un devis écrit. Les coûts récurrents des outils y figurent séparément.",
      factors: [
        "Le nombre de logiciels",
        "Le nombre de règles et d’exceptions",
        "Les interfaces disponibles",
        "L’accompagnement en exploitation",
      ],
    },
    faqs: [
      {
        id: "workflow-replace",
        question: "Devons-nous remplacer nos logiciels ?",
        answer:
          "Le plus souvent, non. Nous relions d’abord les logiciels que vous utilisez déjà. Nous ne proposons une reconstruction que si elle est plus stable et moins chère.",
      },
      {
        id: "workflow-no-api",
        question: "Et si un logiciel n’a pas d’interface ?",
        answer:
          "D’autres voies existent souvent, comme un export de données ou une synchronisation par e-mail. Nous le vérifions à l’avance et vous disons à quel point cette voie est fiable.",
      },
      {
        id: "workflow-worth",
        question: "Quand une automatisation vaut-elle la peine ?",
        answer:
          "Lorsqu’une tâche revient souvent, suit des règles fixes et que les erreurs coûtent de l’argent. Nous faisons le calcul avec vous avant de construire quoi que ce soit.",
      },
    ],
    related: [
      { to: "leads-crm", text: "Le point de départ le plus fréquent : les demandes dans le CRM." },
      { to: "documents-email", text: "Lorsque des textes et des documents sont en jeu." },
      { to: "web-apps", text: "Lorsqu’il manque une interface propre." },
    ],
  },
  {
    id: "ai-assistants",
    name: "Assistants IA internes",
    summary: "Votre équipe pose une question et reçoit une réponse tirée de vos documents, avec la source.",
    metaTitle: "Assistant IA pour les entreprises",
    metaDescription:
      "Un assistant IA pour votre entreprise : votre équipe pose ses questions en langage courant et reçoit des réponses tirées des manuels et wikis, avec sources et droits d’accès adaptés.",
    title: "Un assistant IA pour votre entreprise",
    intro:
      "Votre équipe pose une question en langage courant et reçoit une réponse tirée de vos propres documents. Chaque réponse indique sa source, et chacun ne voit que ce qu’il a le droit de voir.",
    sections: [
      {
        heading: "Ce que l’assistant sait faire",
        paragraphs: [
          "L’assistant cherche dans les manuels, les devis, les contrats ou les wikis et répond en langage courant. Chaque réponse indique le document d’origine, afin que votre équipe puisse la vérifier. S’il ne trouve pas de source, il le dit.",
        ],
      },
      {
        heading: "Accès et protection des données",
        paragraphs: [
          "L’assistant ne montre que ce que la personne qui demande a le droit de voir. Avant le développement, nous clarifions quelles données il utilise, où elles se trouvent et quels prestataires et modèles sont impliqués. Nous choisissons le modèle selon le risque et les obligations légales.",
        ],
      },
      {
        heading: "Tester avec de vraies questions",
        paragraphs: [
          "Nous créons des assistants pour des rôles précis, par exemple la vente ou le support. Avant que votre équipe ne les utilise, nous les testons avec de vraies questions et mesurons la fréquence des bonnes réponses. Après le lancement, nous recueillons les retours et améliorons les sources.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Un assistant pour un ou plusieurs rôles",
        "Le raccordement à vos documents",
        "Des réponses avec source",
        "Des droits par personne ou par rôle",
        "Un test avec de vraies questions et une mesure de la qualité",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après un échange, vous recevez un devis écrit. Les coûts récurrents du modèle d’IA y figurent séparément.",
      factors: [
        "Le volume et le type de documents",
        "Le raccordement à vos systèmes",
        "Les droits d’accès",
        "Les exigences de protection des données",
      ],
    },
    faqs: [
      {
        id: "assistant-training",
        question: "Nos données servent-elles à entraîner des modèles d’IA ?",
        answer:
          "Nous choisissons des prestataires et des contrats où vos données ne servent pas à l’entraînement, et nous documentons la décision.",
      },
      {
        id: "assistant-wrong",
        question: "Et si l’assistant dit quelque chose de faux ?",
        answer:
          "Cela peut arriver. C’est pourquoi chaque réponse indique sa source et nous mesurons la qualité avec de vraies questions. Les décisions importantes restent à votre équipe.",
      },
      {
        id: "assistant-vs-chatgpt",
        question: "Pourquoi ne pas simplement utiliser ChatGPT ?",
        answer:
          "ChatGPT ne connaît ni vos documents internes ni vos droits d’accès. Votre propre assistant répond à partir de vos sources et ne montre que ce que la personne a le droit de voir.",
      },
    ],
    related: [
      { to: "documents-email", text: "Lire et classer automatiquement les documents." },
      { to: "ai-features", text: "Des fonctions d’IA pour vos clients." },
    ],
  },
  {
    id: "ai-features",
    name: "Fonctions d’IA",
    summary: "Des fonctions pour vos clients, comme un conseil produit ou une recherche qui comprend les questions.",
    metaTitle: "Intégrer l’IA à votre site ou application",
    metaDescription:
      "Fonctions d’IA pour sites et applications : conseil produit, recherche qui comprend les questions, et plus. Nous fixons les critères de qualité, relions le modèle et mesurons les coûts.",
    title: "Des fonctions d’IA pour site ou application",
    intro:
      "Un conseil produit, une recherche qui comprend les questions ou un assistant dans l’espace client : nous créons des fonctions d’IA pour vos clients et mesurons la qualité et les coûts.",
    sections: [
      {
        heading: "Fixer la tâche et la qualité",
        paragraphs: [
          "Nous fixons ce que la fonction doit faire et comment nous mesurons sa qualité. Cela inclut ce qu’elle ne doit ni dire ni faire. Un prototype montre tôt si l’idée fonctionne, avant que vous n’investissiez beaucoup.",
        ],
      },
      {
        heading: "Modèle et interface",
        paragraphs: [
          "Nous relions ensuite le bon modèle et intégrons l’interface à votre site ou application. Nous choisissons le modèle selon la tâche, les coûts et la protection des données, et nous le gardons remplaçable. Les utilisateurs voient qu’ils parlent à une IA.",
        ],
      },
      {
        heading: "Exploitation et coûts",
        paragraphs: [
          "Après le lancement, nous mesurons l’usage, la qualité et le coût par requête. Des limites vous protègent des abus et des factures inattendues. Vous voyez ce que la fonction apporte et ce qu’elle coûte.",
        ],
      },
    ],
    deliverables: {
      heading: "Ce que vous recevez",
      items: [
        "Une description de la tâche et des critères de qualité",
        "Un prototype avec un test de faisabilité",
        "Le raccordement du modèle et l’interface",
        "Une protection contre les abus et des limites de coûts",
        "La mesure de la qualité, de l’usage et des coûts",
      ],
    },
    costs: {
      heading: "Ce qui détermine le prix",
      text: "Après le prototype, vous recevez un devis écrit. Les coûts récurrents du modèle dépendent de l’usage et y figurent séparément.",
      factors: [
        "La complexité de la tâche",
        "Les données auxquelles la fonction accède",
        "L’interface et l’intégration",
        "L’usage attendu",
      ],
    },
    faqs: [
      {
        id: "ai-feature-model",
        question: "Quel modèle d’IA utilisez-vous ?",
        answer:
          "Cela dépend de la tâche, des coûts et de la protection des données. Nous testons plusieurs modèles et construisons la fonction pour que le modèle puisse être changé plus tard.",
      },
      {
        id: "ai-feature-cost",
        question: "Que coûte l’exploitation courante ?",
        answer: "Cela dépend de l’usage. Après le prototype, nous estimons le coût par requête et fixons des limites.",
      },
      {
        id: "ai-feature-law",
        question: "Devons-nous signaler l’IA aux utilisateurs ?",
        answer:
          "Dans un chat avec une IA, les utilisateurs doivent pouvoir le reconnaître, et le règlement européen sur l’IA l’exige dans de nombreux cas. Nous intégrons la mention. Vous clarifiez les détails juridiques avec votre conseil.",
      },
    ],
    related: [
      { to: "web-apps", text: "L’application autour de la fonction d’IA." },
      { to: "ai-assistants", text: "Si la fonction est destinée à votre équipe." },
    ],
  },
];

export default Object.fromEntries(entries.map((entry) => [entry.id, entry])) as Record<SubServiceId, SubServiceCopy>;
