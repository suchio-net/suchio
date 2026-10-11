import type { AuditUi } from "../audit-ui";

const audit = {
  label: "Audit individuel de site web",
  date: "Vérifié le 8 septembre 2026",
  assessment: "Notre appréciation",
  findings: "Ce que nous modifierions",
  observation: "Constat",
  action: "Notre proposition",
  priorities: "Dans cet ordre",
  flow: "Un parcours de demande plus clair",
  measurements: "Les mesures techniques",
  scores: ["Performance", "Accessibilité", "Bonnes pratiques", "SEO technique"],
  metricLabels: ["Plus grand élément visible (LCP)", "Temps de blocage total (TBT)", "Déplacements de contenu (CLS)"],
  metricHelp: [
    "Jusqu'à 2,5 s est considéré comme bon. Valeur de laboratoire simulée, pas une statistique de visiteurs réels.",
    "Durée pendant laquelle de longues tâches bloquent le fil principal. Ne remplace pas la mesure réelle des interactions INP.",
    "Jusqu'à 0,10 est considéré comme bon. Valeur sans unité pouvant inclure le dialogue de cookies.",
  ],
  scoreNote:
    "Les catégories évaluent différents aspects techniques. Même 100 points ne mesurent ni la qualité persuasive des textes ni le nombre de demandes. Il n'existe pas de note globale commune.",
  incomplete:
    "Pas de scores globaux fiables : les deux tests Lighthouse ont atteint la limite de chargement. Nous n'en tirons donc pas de jugement chiffré de performance.",
  methodology: "Périmètre et interprétation",
  method:
    "Échantillon public avec Lighthouse 13.4.1, complété par des contrôles navigateur, DOM et HTTP si nécessaire. Chaque résultat affiché provient d'un test mobile par URL avec un profil neuf, 412 × 823 pixels CSS, une connexion Slow 4G simulée et un processeur ralenti quatre fois. Les cookies facultatifs n'ont pas été acceptés volontairement pendant la mesure. Les résultats varient selon appareil, connexion et consentement.",
  search:
    "Des recherches Google directes ont été tentées mais bloquées par le contrôle anti-robot. Une recherche web générale a aussi été utilisée. Nous ne prétendons pas connaître un classement Google ou des demandes réellement perdues. Aucun accès à Search Console, Analytics ou aux réservations internes. Aucun formulaire ni réservation n'a été envoyé.",
  own: "Les conséquences commerciales sont notre appréciation professionnelle de l'utilisation observée, pas des pertes de chiffre d'affaires mesurées. Les recommandations sont des propositions dont l'effet doit être vérifié après réalisation.",
  validationTitle: "Comment vérifier les améliorations",
  validation:
    "Parcourir le chemin principal du premier écran à la demande sur téléphone et ordinateur, aussi au clavier. Comparer ensuite plusieurs tests mobiles dans les mêmes conditions. Les taux de demande ou de réservation nécessitent des données de l'exploitant collectées légalement.",
  sources: "Sources et pages contrôlées",
  sourcePage: "Site contrôlé / source technique",
  report:
    "Rapport Lighthouse local et vérification navigateur du 8 septembre 2026. Mesures ci-dessus ; rapport disponible sur demande.",
  contactTitle: "Définir ensemble la première étape",
  contact: "Discuter de cet audit",
  email: "Envoyer un e-mail",
  privacy: "Confidentialité du courrier publicitaire",
  websitePrivacy: "Confidentialité du site",
  linkNote:
    "Préparé pour l'entreprise destinataire. Ce lien individuel n'est pas protégé par mot de passe et peut être partagé.",
  campaignTitle: "Confidentialité du courrier publicitaire",
  campaignIntro:
    "Informations selon l'article 14 du RGPD sur nos audits individuels et cette action publicitaire postale ponctuelle.",
  privacySections: [
    [
      "Responsable et contact",
      "Aleks Tsenov, suchio, Bergstraße 41, 65795 Hattersheim am Main, Allemagne. E-mail : contact@suchio.net. Téléphone : +49 176 42767348. Ces coordonnées permettent aussi de demander gratuitement ces informations sur papier.",
    ],
    [
      "Données et sources",
      "Nous utilisons les contenus professionnels publiés, noms d’entreprises, coordonnées et adresses professionnelles ainsi que les constats techniques. Les adresses proviennent de coordonnées professionnelles ou de magasins publiées volontairement et d’annuaires professionnels publics. Les mentions légales obligatoires ne servent pas de source d’adresse pour la prospection postale. La source précise de l’adresse est disponible sur demande. Le site figure dans le courrier et l’audit individuel, qui énumère les pages examinées. Nous n’utilisons ni profils d’intérêts privés, ni catégories particulières de données, ni listes de contacts enrichies.",
    ],
    [
      "Finalité et base juridique",
      "La finalité est une présentation ponctuelle de services web pertinents au moyen d'un audit individuel. Pour les informations concernant des personnes physiques, nous nous fondons sur l'article 6, paragraphe 1, point f du RGPD. Notre intérêt est une prise de contact professionnelle limitée et pertinente. Nous considérons les attentes, limitons les données au contexte professionnel et respectons les refus de publicité visibles. La disponibilité publique seule ne remplace pas la mise en balance des intérêts.",
    ],
    [
      "Destinataires et traitement hors EEE",
      "Suchio imprime les courriers sur un copieur en magasin dm via USB ou smartphone et les distribue. Aucun service d’impression en ligne, CRM ou commerce d’adresses n’est utilisé. Le service Codex d’OpenAI sert à la recherche et à la rédaction de cette campagne. Certains contenus professionnels publiés et adresses sont transmis à OpenAI à cette fin. Un traitement hors EEE peut avoir lieu. Des informations complémentaires sur OpenAI figurent dans la politique liée ci-dessous.",
    ],
    [
      "Mise à disposition de l'audit",
      "L'audit est accessible par un lien individuel difficile à deviner sur suchio.net, absent de la navigation et du sitemap et marqué noindex. Ce n'est pas un mot de passe : toute personne ayant le lien peut lire et partager ce rapport. Les adresses postales des destinataires ne sont pas publiées sur ces pages. Cloudflare héberge les pages et traite contenus et données techniques d'accès. Notre politique générale décrit Cloudflare, les transferts et journaux du site. Une consultation est comptée uniquement après un consentement explicite et facultatif dans le rapport. Sans consentement, aucun comptage. Les détails et le retrait figurent dans la rubrique de mesure des audits.",
    ],
    [
      "Conservation",
      "Les fichiers de travail, d'impression et l'audit en ligne sont supprimés après l'action et un délai de réponse de 30 jours, sauf besoin précis de clarification ou de preuve. Seules les informations nécessaires restent alors conservées. Une trace minimale d’opposition est conservée. Un relevé minimal du nom d’entreprise, du domaine et du statut évite les doublons tant qu’il est nécessaire à cette fin ; il ne contient ni adresse postale ni texte de rapport. La suppression auprès du fournisseur d'IA est demandée séparément et reste soumise à ses règles et exceptions légales. Les demandes ultérieures suivent les finalités et délais de notre politique générale.",
    ],
    [
      "Droits et opposition publicitaire",
      "Vous pouvez vous opposer à tout moment, sans motif, au traitement pour prospection. Écrivez à contact@suchio.net ou à l'adresse postale ci-dessus. Vos données ne seront alors plus utilisées pour cette finalité. Sous les conditions légales, vous disposez des droits d'accès, rectification, effacement et limitation. Vous pouvez saisir une autorité de contrôle, par exemple le commissaire à la protection des données et à la liberté d'information de Hesse. Aucune décision automatisée n'a d'effet juridique ou similaire significatif.",
    ],
  ],
} satisfies AuditUi;

export default audit;
