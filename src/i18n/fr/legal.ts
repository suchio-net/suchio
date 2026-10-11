import { publicContactEmail, publicContactPhone, publicContactPhoneHref } from "@/lib/contact";
import { type LegalContent, updatedLabel, cloudflareLinks, resendLinks } from "../legal-shared";

const legal: LegalContent = {
  imprint: {
    eyebrow: "Informations juridiques",
    title: "Mentions légales",
    intro: "Identification de l’éditeur et coordonnées de Suchio.",
    updated: updatedLabel("fr"),
    sections: [
      {
        id: "information-pursuant-to-section-5-ddg",
        title: "Informations conformément à l’article 5 du DDG allemand",
        paragraphs: ["Aleks Tsenov\nNom commercial : Suchio\nBergstraße 41\n65795 Hattersheim am Main\nAllemagne"],
      },
      {
        id: "contact",
        title: "Contact",
        details: [
          { label: "Téléphone", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "E-mail", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "business-details",
        title: "Informations sur l’entreprise",
        paragraphs: [
          "Entreprise individuelle non inscrite au registre du commerce allemand.\nPropriétaire : Aleks Tsenov",
        ],
      },
      {
        id: "responsible-for-content",
        title: "Responsable du contenu",
        paragraphs: ["Aleks Tsenov\nBergstraße 41\n65795 Hattersheim am Main\nAllemagne"],
      },
      {
        id: "consumer-dispute-resolution",
        title: "Règlement des litiges de consommation",
        paragraphs: [
          "Nous ne sommes ni disposés ni tenus de participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Informations juridiques",
    title: "Politique de confidentialité",
    intro:
      "Cette politique explique comment Suchio traite les données personnelles lors de votre visite du site ou d’une prise de contact.",
    updated: updatedLabel("fr"),
    sections: [
      {
        id: "1-controller",
        title: "1. Responsable du traitement",
        paragraphs: ["Aleks Tsenov\nSuchio\nBergstraße 41\n65795 Hattersheim am Main\nAllemagne"],
        details: [
          { label: "Téléphone", value: publicContactPhone, href: publicContactPhoneHref },
          { label: "E-mail", value: publicContactEmail, href: `mailto:${publicContactEmail}` },
        ],
      },
      {
        id: "2-hosting-delivery-and-server-logs",
        title: "2. Hébergement, diffusion et journaux serveur",
        paragraphs: [
          "Le site est diffusé à l’aide de Cloudflare Workers et Cloudflare Static Assets. Lors d’une consultation, Cloudflare traite notamment l’adresse IP, la date et l’heure, l’URL demandée, le statut HTTP, le référent, les informations sur le navigateur et l’appareil ainsi que des données techniques de réseau et de sécurité. Ce traitement permet une diffusion sûre et rapide, l’analyse des erreurs et la prévention des abus.",
          "La base juridique est l’article 6, paragraphe 1, point f) du RGPD. Notre intérêt légitime est d’assurer un fonctionnement sûr, stable et efficace du site. Avec l’offre Workers Free actuellement utilisée, les journaux Workers sont en principe conservés jusqu’à trois jours puis supprimés automatiquement, sauf nécessité exceptionnelle liée à un incident de sécurité ou à la défense de droits en justice.",
          "Le prestataire est Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis. Le traitement peut avoir lieu hors de l’Espace économique européen. Cloudflare encadre les transferts vers les États-Unis par le cadre UE–États-Unis de protection des données et, si nécessaire, par les clauses contractuelles types de l’UE.",
        ],
        links: cloudflareLinks,
      },
      {
        id: "3-contact-form-and-email-communication",
        title: "3. Formulaire de contact et communications par e-mail",
        paragraphs: [
          "Pendant que vous remplissez le formulaire, votre brouillon est conservé dans le stockage de session de cet onglet afin de survivre aux changements de page et de langue. Il ne nous est transmis qu’au moment de l’envoi. Le brouillon est supprimé après un envoi réussi ou à la fin de la session de l’onglet. Si le stockage du navigateur est désactivé, il reste uniquement en mémoire sur la page actuelle.",
          "Lorsque vous nous contactez, nous traitons les informations fournies. Il peut s’agir du nom, de l’adresse e-mail, de l’entreprise, de son site web, du service souhaité, de la tranche budgétaire, du message et de la langue. Un champ invisible de type honeypot sert uniquement à lutter contre le spam. Ces informations ne sont pas enregistrées dans une base de données propre au site.",
          "Le traitement sert à gérer votre demande et à y répondre. L’article 6, paragraphe 1, point b) du RGPD s’applique lorsqu’elle concerne un contrat ou des mesures précontractuelles. Dans les autres cas, il repose sur l’article 6, paragraphe 1, point f) du RGPD ; notre intérêt légitime est de répondre de manière appropriée aux demandes professionnelles.",
          "Nous utilisons Resend, un service de Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, États-Unis, pour envoyer le message. Resend traite au minimum les adresses de l’expéditeur et du destinataire, le contenu du message et les métadonnées d’envoi et conserve, selon sa documentation, les données d’e-mail pendant 30 jours en principe. Les transferts sont encadrés par le cadre UE–États-Unis de protection des données et les clauses contractuelles types de l’UE.",
          "La demande reste également dans la boîte e-mail du responsable. Nous supprimons la correspondance lorsque la demande est définitivement traitée, sauf obligation légale de conservation ou intérêt légitime à conserver une preuve. Merci de ne pas transmettre de catégories particulières de données au sens de l’article 9 du RGPD par le formulaire.",
        ],
        links: resendLinks,
      },
      {
        id: "4-language-preference",
        title: "4. Préférence linguistique",
        paragraphs: [
          "Le site enregistre la langue choisie dans le cookie « suchio-locale ». Il contient uniquement le code de langue, s’applique à l’ensemble du site et expire après un an. Il est nécessaire pour conserver la version linguistique expressément choisie lors des visites ultérieures.",
          "Ce stockage ne requiert pas de consentement en vertu de l’article 25, paragraphe 2, point 2 du TDDDG allemand. Lorsque le code peut être rattaché à une personne, la base juridique est l’article 6, paragraphe 1, point f) du RGPD. Vous pouvez supprimer le cookie à tout moment dans les réglages du navigateur.",
        ],
      },
      {
        id: "5-no-analytics-or-marketing-services",
        title: "5. Mesure facultative des audits",
        paragraphs: [
          "Nous n’utilisons aucun traceur publicitaire ni pixel de réseau social. Sur les pages d’audit individuelles, vous pouvez consentir librement au comptage d’une consultation. Sans consentement, aucune mesure n’est enregistrée. Les détails et le retrait figurent ci-dessous dans la rubrique de mesure facultative des consultations d’audit.",
        ],
      },
      {
        id: "6-encryption",
        title: "6. Chiffrement",
        paragraphs: [
          "Les échanges entre votre navigateur et le site sont chiffrés via HTTPS/TLS. Une connexion chiffrée se reconnaît au cadenas et à « https:// » dans la barre d’adresse.",
        ],
      },
      {
        id: "7-your-rights",
        title: "7. Vos droits",
        paragraphs: [
          "Lorsque les conditions légales sont remplies, vous disposez des droits suivants auprès du responsable :",
        ],
        items: [
          "Accès à vos données personnelles (article 15 du RGPD)",
          "Rectification des données inexactes (article 16 du RGPD)",
          "Effacement (article 17 du RGPD)",
          "Limitation du traitement (article 18 du RGPD)",
          "Portabilité des données (article 20 du RGPD)",
          "Opposition aux traitements fondés sur un intérêt légitime (article 21 du RGPD)",
        ],
      },
      {
        id: "8-right-to-object",
        title: "8. Droit d’opposition",
        paragraphs: [
          "Vous pouvez vous opposer à un traitement fondé sur l’article 6, paragraphe 1, point f) du RGPD pour des raisons tenant à votre situation particulière. Nous cesserons alors le traitement, sauf motifs légitimes impérieux ou nécessité liée à la constatation, à l’exercice ou à la défense de droits en justice.",
        ],
      },
      {
        id: "9-right-to-complain",
        title: "9. Droit d’introduire une réclamation",
        paragraphs: [
          "Vous pouvez déposer une réclamation auprès d’une autorité de protection des données. L’autorité compétente pour le siège de Suchio est le Commissaire de Hesse à la protection des données et à la liberté d’information, Gustav-Stresemann-Ring 1, 65189 Wiesbaden, Allemagne.",
        ],
        links: [{ href: "https://datenschutz.hessen.de/", label: "Autorité de protection des données de Hesse" }],
      },
      {
        id: "10-providing-data-and-automated-decisions",
        title: "10. Fourniture des données et décisions automatisées",
        paragraphs: [
          "L’utilisation du formulaire est facultative. Sans les champs marqués comme obligatoires, nous ne pouvons pas traiter la demande par ce moyen ; un contact par e-mail ou téléphone reste possible. Aucune décision automatisée, y compris aucun profilage, n’est réalisée.",
        ],
      },
      {
        id: "11-changes-to-this-policy",
        title: "11. Modification de cette politique",
        paragraphs: [
          "Nous mettons cette politique à jour lorsque le site, les services utilisés ou les exigences juridiques évoluent. La version publiée sur cette page s’applique.",
        ],
      },
    ],
  },
};

export default legal;
