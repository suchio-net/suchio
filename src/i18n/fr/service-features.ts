import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  serviceTour: {
    heading: "Ce que nous prenons en charge pour votre site",
    copy: "Nous concevons et développons le site, le rendons rapide, intégrons formulaires et prise de rendez-vous, et nous en occupons après la mise en ligne.",
    tabsLabel: "Partie du service",
    steps: {
      design: {
        title: "Design",
        text: "Chaque page est conçue pour mobile et ordinateur, avec vos services, vos photos et vos textes plutôt qu’un modèle.",
      },
      speed: {
        title: "Chargement",
        text: "Nous construisons des pages légères. Le contenu principal s’affiche en moins de 2,5 secondes, la limite à partir de laquelle Google juge une page rapide.",
      },
      enquiry: {
        title: "Demandes",
        text: "Formulaires et prise de rendez-vous se remplissent en une minute sur mobile. Chaque demande vous parvient.",
      },
      care: {
        title: "Entretien",
        text: "Vous modifiez vous-même textes, images et horaires. Nous nous chargeons de l’hébergement, des mises à jour et des sauvegardes.",
      },
    },
    domain: "mustermann-baeder.de",
    nav: ["Services", "Projets", "Contact"],
    headline: "Votre nouvelle salle de bains en trois semaines",
    sub: "Conception, démolition, carrelage et plomberie par une seule entreprise à Hofheim.",
    cta: "Envoyer une demande",
    cards: ["Rénovation", "Salle de bains accessible", "Carrelage"],
    speedLabel: "Contenu principal visible",
    speedGood: "bon jusqu’à 2,5 s",
    speedPoor: "lent dès 4 s",
    speedReady: "chargé",
    formTitle: "Demande pour votre salle de bains",
    formFields: [
      { label: "Projet", value: "Rénovation" },
      { label: "Lieu", value: "65719 Hofheim" },
      { label: "Téléphone", value: "0176 …" },
    ],
    formSubmit: "Envoyer une demande",
    formSent: "Demande envoyée",
    formSentText: "Nous vous répondons demain avant 12 h.",
    careLabel: "Horaires",
    careBefore: "Lun–ven 8 h–17 h",
    careAfter: "Lun–ven 7 h–18 h, sam 9 h–13 h",
    careSaved: "Enregistré et en ligne",
  },
  searchPlaces: {
    heading: "Ce que Google, Maps et les assistants IA lisent sur votre site",
    copy: "Tous les trois lisent la même page, mais chacun en lit une autre partie. Nous nous occupons de chacune de ces parties.",
    tabsLabel: "Endroit où les clients cherchent",
    domainPath: "mustermann-baeder.de/badsanierung-hofheim",
    forSearch: "Pour les moteurs de recherche",
    seoTitle: "Rénovation de salle de bains à Hofheim | Mustermann Bäder",
    seoDescription:
      "Une nouvelle salle de bains en trois semaines environ, conception, carrelage et plomberie compris.",
    pageTitle: "Rénovation de salle de bains à Hofheim",
    pageCopy: "Nous concevons votre salle de bains, démontons l’ancienne et livrons la nouvelle entièrement carrelée.",
    address: "Musterstraße 12, 65719 Hofheim",
    hours: "Lun–ven 8 h–17 h",
    faqQuestion: "Combien de temps dure une rénovation de salle de bains ?",
    faqAnswer: "Nous rénovons en général une petite salle de bains en trois semaines, de la démolition au carrelage.",
    places: {
      google: {
        label: "Recherche Google",
        explain:
          "Google affiche le titre de la page et sa description. Nous donnons à chaque page son propre titre avec le service et le lieu, et nous vérifions dans la Search Console que Google a indexé la page.",
      },
      maps: {
        label: "Google Maps",
        explain:
          "Maps affiche votre fiche d’établissement. Nous veillons à ce que le nom, l’adresse et les horaires soient identiques sur le site, dans la fiche et dans les annuaires, et nous tenons à jour les catégories et les photos de la fiche.",
      },
      ai: {
        label: "Réponse IA",
        explain:
          "Les assistants IA reprennent le plus souvent des phrases qui répondent directement à une question. Nous écrivons ces réponses sur vos pages, nous les décrivons avec des données structurées et nous autorisons les robots des assistants.",
      },
    },
    mapsCategory: "Magasin de salles de bains à Hofheim",
    mapsOpen: "Ouvert jusqu’à 17 h",
    mapsActions: ["Itinéraire", "Appeler", "Site web"],
    aiQuestion: "Combien de temps dure une rénovation de salle de bains à Hofheim ?",
    aiAnswer:
      "Chez Mustermann Bäder à Hofheim, une petite salle de bains prend en général trois semaines, de la démolition au carrelage.",
  },
  clickEnquiry: {
    heading: "Du clic à la demande",
    copy: "Nous rédigeons les annonces, créons la page d’atterrissage et rattachons chaque demande à son annonce. Vous voyez ainsi ce que coûte une demande.",
    steps: [
      {
        title: "Annonce",
        text: "Nous choisissons des mots-clés avec une intention d’achat et rédigeons des annonces avec votre offre et votre lieu.",
      },
      {
        title: "Page d’atterrissage",
        text: "Chaque annonce mène à une page consacrée à cette offre, avec un formulaire court.",
      },
      {
        title: "Mesure",
        text: "Chaque demande envoyée est attribuée à l’annonce qui l’a apportée.",
      },
      {
        title: "Analyse",
        text: "Nous déplaçons le budget vers les annonces au coût par demande le plus bas.",
      },
    ],
    query: "rénovation salle de bains hofheim",
    sponsored: "Sponsorisé",
    adTitle: "Rénovation de salle de bains à Hofheim, en trois semaines",
    adText: "Conception, carrelage et plomberie par une seule entreprise. Prenez rendez-vous.",
    domain: "mustermann-baeder.de",
    pageHeadline: "Votre nouvelle salle de bains à Hofheim",
    pageFields: ["Rénovation", "65719 Hofheim"],
    pageSubmit: "Envoyer une demande",
    pageSent: "Demande envoyée",
    dashboardTitle: "Campagne rénovation",
    dashboardExample: "Valeurs d’exemple",
    clicks: "Clics",
    enquiries: "Demandes",
    costPerEnquiry: "Coût par demande",
  },
  toolMap: {
    heading: "Nous relions les outils que vous utilisez déjà",
    copy: "Formulaire, messagerie, CRM, agenda, chat d’équipe et documents travaillent ensemble, sans ressaisie. Choisissez un outil et voyez ce que nous y automatisons.",
    hub: "Votre automatisation",
    toolsLabel: "Outil",
    replay: "Rejouer le déroulé",
    tools: {
      form: {
        name: "Formulaire du site",
        event: "Nouvelle demande",
        examples: [
          "Transmettre les demandes avec service, lieu et photos",
          "Vérifier les informations obligatoires avant la suite",
          "Écarter le spam",
        ],
      },
      mail: {
        name: "Messagerie",
        event: "Confirmation envoyée",
        examples: [
          "Accusé de réception avec les prochaines étapes",
          "Trier les e-mails par sujet et les attribuer",
          "Brouillons de réponse validés par votre équipe",
        ],
      },
      crm: {
        name: "CRM",
        event: "Contact créé",
        examples: [
          "Créer le contact et la demande sans ressaisie",
          "Tenir à jour le statut dans le pipeline",
          "Relancer quand un devis reste sans réponse",
        ],
      },
      calendar: {
        name: "Agenda",
        event: "Rendez-vous proposé",
        examples: [
          "Proposer des créneaux pour un rappel ou une visite",
          "Confirmation et rappel pour le client",
          "Attribuer les rendez-vous à la bonne personne",
        ],
      },
      chat: {
        name: "Chat d’équipe",
        event: "Équipe prévenue",
        examples: [
          "Signaler les nouvelles demandes avec un lien vers le CRM",
          "Envoyer les cas urgents à la bonne personne",
          "Récapitulatif quotidien des demandes ouvertes",
        ],
      },
      documents: {
        name: "Documents et factures",
        event: "Photos classées",
        examples: [
          "Extraire les données des factures et bons de livraison",
          "Classer les fichiers dans le bon dossier",
          "Préparer des devis à partir de modèles",
        ],
      },
    },
  },
} satisfies ServiceFeaturesCopy;

export default features;
