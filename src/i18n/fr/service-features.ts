import type { ServiceFeaturesCopy } from "../service-features";

const features = {
  siteEditor: {
    heading: "Vous modifiez vous-même les textes et les horaires",
    copy: "Si vous le souhaitez, nous construisons votre site avec un système de gestion de contenu. Vous modifiez alors vous-même les titres, les horaires et les annonces, et vous les publiez en un clic. Essayez ici.",
    panelTitle: "Modifier la page d’accueil",
    headlineLabel: "Titre",
    headlineDefault: "Votre nouvelle salle de bains par une seule équipe",
    hoursLabel: "Horaires",
    hoursDefault: "Lun–ven 8 h–17 h",
    noticeLabel: "Annonce en haut de la page",
    noticeText: "Il reste des dates libres en décembre.",
    publish: "Publier",
    published: "Publié",
    draft: "Brouillon",
    live: "En ligne",
    pageCopy: "Conception, démolition, carrelage et plomberie par une seule entreprise à Hofheim.",
    pageCta: "Envoyer une demande",
    hoursPrefix: "Ouvert",
    photoAlt: "Mur carrelé d’une salle de bains",
  },
  searchSources: {
    heading: "Ce que Google, Maps et les assistants IA lisent sur votre site",
    copy: "Tous les trois lisent la même page, mais chacun en lit une autre partie. Choisissez un endroit et voyez quelle partie y apparaît.",
    tabsLabel: "Endroit où les clients cherchent",
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
  adCalculator: {
    heading: "Ce que coûte une demande",
    copy: "Nous évaluons les campagnes au coût par demande, pas au nombre de clics. Modifiez les valeurs et voyez ce que change une meilleure page d’atterrissage.",
    budget: "Budget par mois",
    cpc: "Prix par clic",
    rate: "Visiteurs qui font une demande",
    clicks: "clics",
    enquiries: "demandes",
    perEnquiry: "par demande",
    noEnquiry: "aucune demande",
    compareHeading: "Coût par demande",
    today: "Avec cette page d’atterrissage",
    better: "Si {points} points de pourcentage de plus font une demande",
    note: "Exemple de calcul. Le prix des clics dépend du secteur, du lieu et de la concurrence. Nous vous donnons des valeurs réalistes avant le lancement.",
  },
  enquiryLanes: {
    heading: "Ce qui se fait automatiquement et ce qui reste chez vous",
    copy: "L’automatisation se charge de la saisie, du tri et des rappels. Le conseil, les mesures et le devis restent chez votre équipe. Un exemple avec une demande de rénovation de salle de bains :",
    lanes: { auto: "Automatique", team: "Votre équipe" },
    steps: [
      {
        time: "lundi, 19 h 42",
        lane: "auto",
        items: [
          {
            title: "La demande arrive",
            detail: "Rénovation de salle de bains à Hofheim, trois photos envoyées par le formulaire",
          },
        ],
      },
      {
        time: "une minute plus tard",
        lane: "auto",
        items: [
          { title: "Confirmation à la cliente", detail: "« Nous vous répondons d’ici mardi, 12 h. »" },
          { title: "Fiche dans le CRM", detail: "Nom, service, lieu et photos, sans ressaisie" },
          { title: "Message pour vous", detail: "Nouvelle demande avec un lien vers la fiche" },
        ],
      },
      {
        time: "mardi, 9 h 15",
        lane: "team",
        items: [{ title: "Rappel et rendez-vous", detail: "Vous conseillez et fixez la prise de mesures" }],
      },
      {
        time: "après la prise de mesures",
        lane: "team",
        items: [{ title: "Devis", detail: "Vous calculez et envoyez le devis" }],
      },
      {
        time: "cinq jours sans réponse",
        lane: "auto",
        items: [{ title: "Rappel avec un brouillon", detail: "Un e-mail de relance est prêt, vous le validez" }],
      },
    ],
  },
} satisfies ServiceFeaturesCopy;

export default features;
