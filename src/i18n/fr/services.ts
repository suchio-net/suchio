import type { ServicesCopy } from "../services";

const services: ServicesCopy = {
  services: [
    {
      id: "websites-apps",
      name: "Sites web",
      navDescription: "Faire créer un site web ou une boutique en ligne.",
      homeDescription:
        "Des sites d’entreprise, boutiques en ligne et pages de destination rapides, accessibles et qui vous appartiennent.",
      headline: "Des sites web qui apportent des demandes.",
      summary:
        "Nous créons des sites web et des boutiques en ligne qui se chargent vite sur mobile et amènent les visiteurs à vous contacter. Ensuite, vous modifiez textes et images vous-même.",
      highlights: [
        "Sites d’entreprise et pages de destination",
        "Boutiques en ligne avec paiement et livraison",
        "Formulaires de demande et réservation en ligne",
        "Bases techniques du SEO incluses",
      ],
      cta: "En savoir plus sur les sites web",
      page: {
        metaTitle: "Agence web Francfort : sites et boutiques en ligne",
        metaDescription:
          "Agence web pour Francfort et la région Rhin-Main : sites d’entreprise, refontes, pages de destination et boutiques en ligne. Rapides, accessibles et à vous.",
        title: "Un webdesign rapide qui apporte des demandes.",
        intro:
          "Nous concevons et développons des sites web et des boutiques en ligne pour les entreprises de Francfort, de la région Rhin-Main et de toute l’Allemagne. Du premier projet à l’après-lancement, vous travaillez avec les mêmes personnes.",
        showcase: {
          heading: "Des sites web de notre studio",
          copy: "Trois concepts pour des entreprises fictives, réalisés comme un projet client.",
          tabsLabel: "Sites d’exemple",
          open: "Ouvrir le site",
        },
        details: {
          heading: "Ce que nous créons",
          intro: "Chaque service a sa propre page avec le déroulement, le résultat et ce qui détermine le prix.",
          items: [],
        },
        proof: {
          heading: "Un exemple : Handwerker.work",
          text: "Nous avons reconstruit le site WordPress d’une entreprise de rénovation de Bad Nauheim. Avant et après, mesuré avec Lighthouse sur mobile.",
          beforeLabel: "Avant",
          afterLabel: "Après",
          facts: [
            { label: "Performance", before: "65", after: "100" },
            { label: "Contenu principal visible", before: "10,1 s", after: "1,8 s" },
            { label: "Pages liées avec erreur 404", before: "1", after: "0" },
          ],
          link: "Voir toute la référence",
        },
        stages: {
          heading: "Comment se déroule un projet de site web",
          intro: "Vous voyez chaque étape sur une adresse de prévisualisation et vous la validez.",
          items: [
            {
              title: "Échange et devis",
              copy: "Vous nous parlez de vos clients et de vos objectifs. Vous recevez ensuite un devis écrit avec le périmètre, le prix et les dates.",
            },
            {
              title: "Analyse",
              copy: "Nous vérifions la technique, les contenus et l’affichage sur mobile du site actuel, et nous fixons la structure des pages.",
            },
            {
              title: "Design et textes",
              copy: "Vous voyez le design et les textes sur de vraies pages, pas sur des modèles, et vous les validez.",
            },
            {
              title: "Développement et tests",
              copy: "Nous développons les pages, raccordons les formulaires et les logiciels, et testons sur mobile et ordinateur.",
            },
            {
              title: "Lancement",
              copy: "Nous mettons le site en ligne, redirigeons les anciennes adresses et vérifions que Google intègre les pages.",
            },
          ],
        },
        faqHeading: "Questions sur les sites web",
        faqs: [
          {
            id: "website-cost",
            question: "Combien coûte un site web ?",
            answer:
              "Le prix dépend du nombre de pages, de fonctions comme une boutique, une réservation ou une connexion, des textes et des photos, et des logiciels auxquels nous relions le site. Après un court échange, vous recevez un devis écrit avec le périmètre, le prix et les dates. Les coûts récurrents d’hébergement et de maintenance y figurent séparément.",
          },
          {
            id: "how-long-does-a-website-take",
            question: "Combien de temps faut-il pour créer un site web ?",
            answer:
              "Une page de destination est prête plus vite qu’un site d’entreprise avec de nombreuses pages de services et pages locales. Une boutique ou un portail client prend le plus de temps. Pour Handwerker.work, onze jours ont séparé l’analyse du parcours de demande terminé. Les dates de début et de lancement figurent dans le devis.",
          },
          {
            id: "what-we-need",
            question: "De quoi avez-vous besoin de notre part ?",
            answer:
              "D’un échange sur vos clients et vos services, de votre logo, de photos de votre travail et des accès à l’ancien site et au domaine. Nous rédigeons les textes manquants avec vous. Vous voyez chaque étape sur une adresse de prévisualisation et vous la validez.",
          },
          {
            id: "can-we-edit-the-website-ourselves",
            question: "Pourrons-nous modifier le site nous-mêmes ?",
            answer:
              "Oui. Vous modifiez vous-même les textes, les images, les services et les nouvelles pages dans le système de gestion de contenu. Après le lancement, nous vous montrons comment faire.",
          },
          {
            id: "do-we-own-the-website",
            question: "Le site nous appartient-il ensuite ?",
            answer:
              "Oui. Vous recevez le code source, les designs, les contenus et tous les accès. Vous pouvez poursuivre le site avec une autre agence ou en interne.",
          },
          {
            id: "only-frankfurt",
            question: "Travaillez-vous seulement avec des entreprises de Francfort ?",
            answer:
              "Non. Notre studio se trouve à Hattersheim am Main, entre Francfort, Wiesbaden et Mayence. Nous rencontrons volontiers sur place les entreprises de la région Rhin-Main. Avec les entreprises d’autres régions et de l’étranger, nous travaillons par visioconférence, téléphone et e-mail.",
          },
        ],
        finalTitle: "Dites-nous ce que vous voulez créer.",
        finalCopy: "Une brève description suffit. Nous revenons vers vous avec notre avis et une première étape.",
        finalCta: "Parler de votre projet",
      },
    },
    {
      id: "apps",
      name: "Applications & logiciels",
      navDescription: "Applications web, portails clients, applications mobiles et logiciels desktop.",
      homeDescription:
        "Applications web, portails clients, applications iOS et Android et programmes pour Windows et Mac.",
      headline: "Des logiciels pour vos processus.",
      summary:
        "Nous développons des applications pour des processus qui passent aujourd’hui par des tableurs et des e-mails. Vous testez d’abord un prototype cliquable.",
      highlights: [
        "Applications web et portails clients",
        "Applications pour iOS et Android",
        "Logiciels desktop pour Windows et Mac",
        "Raccordement à vos logiciels",
      ],
      cta: "En savoir plus sur les applications",
      page: {
        metaTitle: "Développement d’applications, région de Francfort",
        metaDescription:
          "Développement d’applications pour Francfort et la région Rhin-Main : applications web, portails clients, applications iOS et Android et logiciels desktop, du prototype à l’exploitation.",
        title: "Des logiciels adaptés à vos processus.",
        intro:
          "Nous développons des applications web, des portails clients, des applications iOS et Android et des programmes pour Windows et Mac. Vous testez d’abord un prototype cliquable et recevez le code source à la fin.",
        details: {
          heading: "Ce que nous développons",
          intro:
            "Chaque type d’application a sa propre page avec le déroulement, le résultat et ce qui détermine le prix.",
          items: [],
        },
        table: {
          heading: "Quelle application vous convient ?",
          intro:
            "Le type d’application détermine les coûts et l’entretien. Nous le clarifions avant le premier prototype.",
          columns: ["Type", "Fonctionne sur", "Convient si", "Convient moins si"],
          rows: [
            {
              title: "Application web",
              cells: [
                "Tout appareil dans le navigateur, sans installation.",
                "Plusieurs personnes travaillent avec les mêmes données et les processus changent souvent.",
                "Vous dépendez fortement des fonctions de l’appareil ou de l’usage hors ligne.",
              ],
            },
            {
              title: "Portail client",
              cells: [
                "Le navigateur, avec une connexion pour vos clients.",
                "Les clients doivent gérer eux-mêmes rendez-vous, commandes et documents.",
                "Les clients ont rarement besoin de vous.",
              ],
            },
            {
              title: "Application iOS et Android",
              cells: [
                "iPhone et Android, depuis les stores.",
                "Les utilisateurs l’ouvrent souvent ou ont besoin de l’appareil photo, de la localisation et des notifications.",
                "Les utilisateurs en ont rarement besoin et le navigateur suffit.",
              ],
            },
            {
              title: "Application desktop",
              cells: [
                "Windows et Mac, installée.",
                "L’application utilise des fichiers ou appareils locaux ou doit fonctionner hors ligne.",
                "L’application n’a pas besoin d’appareils locaux et internet est toujours disponible.",
              ],
            },
          ],
        },
        faqHeading: "Questions sur les applications",
        faqs: [
          {
            id: "what-does-an-app-cost",
            question: "Combien coûte une application ?",
            answer:
              "Le prix dépend du nombre de fonctions, des systèmes et du raccordement à vos logiciels. Après le prototype, le périmètre s’estime facilement et vous recevez un devis écrit.",
          },
          {
            id: "why-prototype",
            question: "Pourquoi d’abord un prototype ?",
            answer:
              "Avec un prototype cliquable, votre équipe voit si le processus est juste avant le développement. Les changements coûtent peu à ce stade.",
          },
          {
            id: "who-owns-the-code",
            question: "À qui appartient le code source ?",
            answer: "À vous. Vous recevez le code source, la documentation et tous les accès.",
          },
          {
            id: "take-over-software",
            question: "Reprenez-vous des logiciels existants ?",
            answer:
              "Oui. Nous vérifions d’abord le code, les données et les dépendances. Nous vous disons ensuite si la poursuite du développement vaut la peine ou si une reconstruction est préférable.",
          },
          {
            id: "work-with-it-team",
            question: "Travaillez-vous avec notre service informatique ?",
            answer:
              "Oui. Nous accordons les accès, les interfaces et l’exploitation avec votre service informatique et lui transmettons la documentation.",
          },
        ],
        finalTitle: "Quel processus confier à un logiciel ?",
        finalCopy:
          "Dites-nous brièvement qui utilisera l’application et ce qu’elle doit faire. Nous vous dirons quel type convient et à quoi ressemble la première étape.",
        finalCta: "Parler de votre application",
      },
    },
    {
      id: "seo-ai-visibility",
      name: "SEO & visibilité IA",
      navDescription: "Être trouvé sur Google et dans les réponses IA.",
      homeDescription: "La technique et les contenus pour apparaître sur Google et dans les réponses des IA.",
      headline: "Être trouvé là où vos clients cherchent.",
      summary:
        "Nous corrigeons les problèmes techniques, rédigeons des textes sur les questions de vos clients et entretenons votre fiche d’établissement Google. On vous trouve ainsi sur Google, dans Maps et dans ChatGPT.",
      highlights: [
        "Audit SEO technique avec liste de priorités",
        "Fiche d’établissement Google et pages locales",
        "Textes pour de vraies recherches",
        "Visible dans ChatGPT et les aperçus IA de Google",
      ],
      cta: "En savoir plus sur le SEO",
      page: {
        metaTitle: "Référencement SEO près de Francfort",
        metaDescription:
          "SEO pour les entreprises de la région de Francfort : SEO technique, fiche Google, contenus et visibilité dans ChatGPT et les réponses IA.",
        title: "Le SEO pour Google et les réponses IA.",
        intro:
          "Nous corrigeons les problèmes techniques, rédigeons des contenus pour de vraies recherches et entretenons votre fiche d’établissement Google. Vos clients vous trouvent ainsi dans la recherche classique, dans Google Maps et dans les réponses IA.",
        details: {
          heading: "Nos services SEO",
          intro:
            "Nous travaillons le plus souvent dans cet ordre : d’abord la technique, puis les contenus, puis Maps et les réponses IA.",
          items: [
            {
              id: "seo-measurement",
              heading: "Mesure et rapports",
              paragraphs: [
                "Nous mettons en place la Search Console et les statistiques et séparons les demandes organiques de celles issues de la publicité payante. Vous recevez régulièrement un court rapport en langage clair : ce qui a changé, ce que nous avons fait et ce qui vient ensuite.",
              ],
            },
          ],
        },
        findings: {
          heading: "Ce qu’un audit SEO trouve",
          intro: "Cinq des 45 constats de notre audit pour Handwerker.work, avec la situation actuelle.",
          link: "Voir toute la référence",
        },
        faqHeading: "Questions sur le SEO et l’IA",
        faqs: [
          {
            id: "what-does-seo-cost",
            question: "Combien coûte le SEO ?",
            answer:
              "Le prix dépend de l’état de votre site, du nombre de pages et d’établissements et de la concurrence dans votre secteur. Après un court échange, vous recevez un devis écrit avec le périmètre et le prix.",
          },
          {
            id: "seo-vs-google-ads",
            question: "Quelle est la différence entre le SEO et Google Ads ?",
            answer:
              "Google Ads, ce sont des annonces payantes. Elles apparaissent immédiatement et disparaissent dès que vous arrêtez de payer. Le SEO améliore votre position dans les résultats de recherche classiques. C’est plus long, mais vous ne payez rien par clic.",
          },
          {
            id: "when-will-we-see-results",
            question: "Combien de temps faut-il pour que le SEO fasse effet ?",
            answer:
              "Les problèmes techniques se corrigent souvent rapidement. Il faut en général plusieurs mois pour que de nouvelles pages se positionnent sur Google, selon la concurrence dans votre secteur et votre région. Après l’analyse, nous vous disons à quoi vous attendre.",
          },
          {
            id: "can-you-improve-local-search-visibility",
            question: "Comment être mieux trouvé sur Google Maps ?",
            answer:
              "Grâce à une fiche d’établissement Google complète, une page pour chaque adresse et chaque service, des inscriptions dans les annuaires professionnels et des avis réguliers. Nous nous occupons de tout cela.",
          },
          {
            id: "what-does-geo-mean",
            question: "Que signifient GEO et visibilité IA ?",
            answer:
              "GEO signifie Generative Engine Optimization. L’objectif est que ChatGPT, Perplexity ou l’aperçu IA de Google citent votre entreprise quand quelqu’un s’intéresse à votre service. Le GEO repose sur les mêmes bases que le SEO.",
          },
          {
            id: "can-you-create-the-content-too",
            question: "Rédigez-vous aussi les textes ?",
            answer:
              "Oui. Nous rédigeons de nouvelles pages et retravaillons les pages existantes. Nous validons avec vous les détails métier, par exemple sur vos services.",
          },
        ],
        finalTitle: "Rendez votre offre plus facile à trouver.",
        finalCopy:
          "Nous vous montrons ce qui freine votre visibilité, ce qu’il faut corriger en premier et ce qui peut attendre.",
        finalCta: "Parler de votre projet SEO",
      },
    },
    {
      id: "paid-campaigns",
      name: "Campagnes payantes",
      navDescription: "Google Ads et publicités sur les réseaux sociaux qui apportent des demandes.",
      homeDescription:
        "Google Ads et publicités sur les réseaux sociaux avec un suivi fiable, évalués au coût par demande.",
      headline: "Une publicité dont vous voyez les résultats.",
      summary:
        "Nous planifions vos campagnes Google Ads et vos publicités sur les réseaux sociaux, testons plusieurs annonces et optimisons la page vers laquelle elles mènent. Le suivi vous montre quels clics deviennent des demandes.",
      highlights: [
        "Annonces ciblées sur votre région et votre public",
        "Plusieurs variantes d’annonces comparées entre elles",
        "Pages de destination qui tiennent la promesse de l’annonce",
        "Coût par demande dans chaque rapport",
      ],
      cta: "En savoir plus sur les campagnes",
      page: {
        metaTitle: "Agence Google Ads et publicité sur les réseaux",
        metaDescription:
          "Google Ads et réseaux sociaux pour les entreprises de la région Rhin-Main : campagnes, annonces, pages de destination et suivi des demandes.",
        title: "Une publicité qui apporte des demandes.",
        intro:
          "Nous planifions vos campagnes, rédigeons et concevons les annonces, optimisons la page qui suit et mesurons quels clics deviennent des demandes.",
        details: {
          heading: "Ce que nous faisons pour vos campagnes",
          intro: "D’abord les canaux, puis ce qui décide de la réussite d’une campagne.",
          items: [
            {
              id: "campaign-strategy",
              heading: "Stratégie et budget",
              paragraphs: [
                "Avant de dépenser pour des annonces, nous fixons le public, l’offre et le message. À partir de la valeur de vos commandes, nous calculons ce qu’une demande peut coûter au maximum. Si le budget ne suffit pas pour un test significatif, nous vous le disons avant le lancement.",
              ],
            },
            {
              id: "ad-creative",
              heading: "Annonces et messages",
              paragraphs: [
                "Nous rédigeons et concevons des annonces image, vidéo et texte en plusieurs variantes. Chaque variante teste une hypothèse. Nous arrêtons les variantes faibles et développons les bonnes.",
              ],
            },
          ],
        },
        checks: {
          heading: "Ce que nous vérifions dans votre compte",
          intro:
            "Six questions avant de changer quoi que ce soit. Vous savez ensuite ce qui reste, ce que nous nettoyons et ce que nous reconstruisons.",
          items: [
            {
              title: "Mesure-t-on de vraies demandes ?",
              copy: "Nous vérifions si les conversions mesurent les formulaires, les appels et les achats, ou seulement les pages vues. Des données fausses orientent aussi les enchères automatiques dans la mauvaise direction.",
            },
            {
              title: "Que payez-vous en ce moment ?",
              copy: "Le rapport sur les termes de recherche montre pour quelles recherches vos annonces sont apparues et lesquelles n’ont rien à voir avec votre offre.",
            },
            {
              title: "Le budget va-t-il au bon endroit ?",
              copy: "Nous comparons les campagnes, les régions, les appareils et les heures et voyons ce qui reçoit l’argent et ce qui apporte les demandes.",
            },
            {
              title: "La page correspond-elle à l’annonce ?",
              copy: "Nous cliquons nous-mêmes sur chaque annonce importante, aussi sur mobile. Si elle promet autre chose que la page qui suit, vous payez pour des visiteurs qui repartent aussitôt.",
            },
            {
              title: "Quel âge ont les annonces ?",
              copy: "Nous vérifions l’âge et les variantes des annonces, et si les extensions comme les appels et les adresses sont entretenues.",
            },
            {
              title: "À qui appartiennent le compte et les données ?",
              copy: "Nous clarifions les accès, les données de facturation et la propriété du compte, afin que les données restent chez vous, même si vous changez d’agence.",
            },
          ],
        },
        faqHeading: "Questions sur la publicité",
        faqs: [
          {
            id: "how-much-ad-budget-do-we-need",
            question: "De quel budget publicitaire avons-nous besoin ?",
            answer:
              "Cela dépend du prix des clics dans votre secteur et votre région. Avant le lancement, nous estimons les coûts par clic et vous indiquons le budget qui permet un test significatif.",
          },
          {
            id: "is-advertising-spend-included-in-your-fee",
            question: "Le budget publicitaire est-il inclus dans vos honoraires ?",
            answer:
              "Non. Le budget publicitaire, nos honoraires et les autres frais de tiers figurent séparément dans le devis. Vous voyez exactement ce qui va aux annonces et ce qui nous revient.",
          },
          {
            id: "how-do-we-know-the-ads-work",
            question: "Comment savoir si la publicité fonctionne ?",
            answer:
              "Au coût par demande. Nous mettons en place le suivi des conversions pour que vous voyiez combien de demandes viennent des annonces et ce que chacune a coûté.",
          },
          {
            id: "which-platforms-do-you-manage",
            question: "Quelles plateformes gérez-vous ?",
            answer:
              "Surtout Google Ads, avec des annonces Search et Shopping, ainsi que les réseaux sociaux. Pour une entreprise locale, les annonces Search sont souvent le meilleur point de départ, car elles touchent les personnes qui cherchent activement.",
          },
          {
            id: "can-you-take-over-existing-advertising-accounts",
            question: "Pouvez-vous reprendre notre compte Google Ads existant ?",
            answer:
              "Oui. Nous examinons la structure, le suivi, les données passées et les accès, puis décidons ce qui reste, ce que nous nettoyons et ce que nous reconstruisons.",
          },
        ],
        finalTitle: "Planifions votre prochaine campagne.",
        finalCopy:
          "Dites-nous ce que vous proposez, qui vous voulez toucher et ce que vous avez déjà essayé. Nous vous dirons par quoi nous commencerions.",
        finalCta: "Parler d’une campagne",
      },
    },
    {
      id: "ai-automation",
      name: "IA & automatisation",
      navDescription: "Relier vos outils et automatiser le travail manuel.",
      homeDescription: "Relier formulaires, CRM, e-mails et documents pour éviter les ressaisies.",
      headline: "Automatisez le travail de routine.",
      summary:
        "Nous relions vos outils pour que personne n’ait plus à ressaisir demandes, factures ou e-mails. Nous utilisons l’IA là où elle fait gagner un temps mesurable.",
      highlights: [
        "Les demandes arrivent automatiquement dans le CRM ou l’agenda",
        "Données des factures et documents extraites automatiquement",
        "Brouillons de réponse aux e-mails fréquents",
        "Votre équipe garde le dernier mot",
      ],
      cta: "En savoir plus sur l’automatisation",
      page: {
        metaTitle: "IA & automatisation pour PME, région de Francfort",
        metaDescription:
          "IA et automatisation pour les entreprises de la région Rhin-Main : traiter demandes, e-mails et documents automatiquement et réduire le travail manuel.",
        title: "IA et automatisation sous votre contrôle.",
        intro:
          "Nous relions vos outils, automatisons les tâches répétitives et utilisons l’IA là où elle soulage votre équipe, par exemple pour les demandes, les e-mails et les documents.",
        details: {
          heading: "Ce que nous automatisons",
          intro:
            "Ce que nous faisons, ce que vous recevez et qui décide à la fin figure sur la page de chaque service.",
          items: [],
        },
        table: {
          heading: "Qui fait quoi : règle, IA et votre équipe",
          intro: "Cinq processus typiques. Dans chacun, la décision finale reste à votre équipe.",
          columns: ["Processus", "Règle fixe", "IA", "Votre équipe"],
          rows: [
            {
              title: "Demande par formulaire",
              cells: [
                "Crée le contact dans le CRM et envoie la confirmation.",
                "Reconnaît l’objet, le lieu et l’urgence dans le texte libre.",
                "Rappelle et établit le devis.",
              ],
            },
            {
              title: "Facture par e-mail",
              cells: [
                "La classe et signale l’échéance.",
                "Lit le fournisseur, le montant et la date.",
                "Valide le paiement.",
              ],
            },
            {
              title: "E-mail dans la boîte commune",
              cells: [
                "Le transmet à la personne responsable.",
                "Trie selon l’objet et rédige un brouillon de réponse.",
                "Vérifie le brouillon et l’envoie.",
              ],
            },
            {
              title: "Prise de rendez-vous",
              cells: [
                "Inscrit le rendez-vous dans l’agenda et rappelle le client.",
                "Pas nécessaire.",
                "Décide en cas d’exception ou d’annulation.",
              ],
            },
            {
              title: "Question sur le savoir interne",
              cells: [
                "Vérifie qui peut voir quels documents.",
                "Cherche la réponse et indique la source.",
                "Vérifie la réponse et signale les erreurs.",
              ],
            },
          ],
        },
        faqHeading: "Questions sur l’automatisation",
        faqs: [
          {
            id: "what-does-automation-cost",
            question: "Combien coûte une automatisation ?",
            answer:
              "Le prix dépend du nombre de logiciels à relier, du nombre d’exceptions et du besoin d’IA. Les coûts récurrents des outils et des modèles d’IA figurent séparément dans le devis.",
          },
          {
            id: "what-can-we-automate",
            question: "Que peut-on automatiser dans notre entreprise ?",
            answer:
              "Exemples courants : les demandes du formulaire du site qui arrivent automatiquement dans le CRM ou l’agenda, les factures lues et classées, et des brouillons de réponse aux e-mails fréquents. Nous examinons vos processus et vous disons ce qui vaut la peine.",
          },
          {
            id: "when-is-ai-genuinely-useful",
            question: "Quand faut-il de l’IA, et quand une automatisation simple suffit-elle ?",
            answer:
              "L’IA aide quand une tâche implique du langage, des textes non structurés ou des décisions d’appréciation. Pour des règles fixes, une automatisation classique est souvent plus fiable et moins chère.",
          },
          {
            id: "do-we-need-to-replace-our-existing-systems",
            question: "Devons-nous remplacer nos logiciels actuels ?",
            answer:
              "Le plus souvent, non. Nous relions d’abord les outils que vous utilisez déjà. Nous ne proposons de reconstruire que si c’est plus stable et moins cher.",
          },
          {
            id: "how-do-you-handle-sensitive-data",
            question: "Comment gérez-vous les données sensibles ?",
            answer:
              "Avant de construire quoi que ce soit, nous convenons avec vous de qui accède à quelles données, où elles sont stockées et quels prestataires interviennent. Nous choisissons l’approche technique selon le risque et les exigences légales.",
          },
          {
            id: "can-you-add-an-ai-feature-to-our-website-or-app",
            question: "Pouvez-vous ajouter une fonction d’IA à notre site ou application ?",
            answer:
              "Oui. Nous développons la logique IA, connectons le modèle et mesurons la qualité. Si nécessaire, nous concevons et développons aussi l’interface.",
          },
        ],
        finalTitle: "Quelle tâche vous prend le plus de temps ?",
        finalCopy: "Décrivez-la-nous. Nous vous dirons si l’automatiser en vaut la peine et à quoi cela ressemblerait.",
        finalCta: "Parler d’automatisation",
      },
    },
  ],
  overview: {
    metaTitle: "Services : sites web, applications, SEO, publicité et IA",
    metaDescription:
      "Tous les services de Suchio : sites web et boutiques en ligne, applications et logiciels, SEO et visibilité IA, campagnes payantes, IA et automatisation.",
    title: "Tous les services",
    intro:
      "Cinq domaines, 22 services. Chaque service a sa propre page avec le déroulement, le résultat et ce qui détermine le prix.",
    finalTitle: "Vous ne savez pas ce qu’il vous faut ?",
    finalCopy: "Décrivez-nous brièvement votre objectif. Nous vous dirons par où nous commencerions.",
    finalCta: "Parler de votre projet",
  },
  contact: {
    heading: "Contact direct",
    text: "Vous parlez aux personnes qui font le travail. Vous recevez une réponse au plus tard sous un jour ouvré.",
  },
  webExperienceAnimation: {
    nav: ["Projets", "Services", "Contact"],
    kicker: "Sites web",
    headline: "Clair. Rapide. Utile.",
    intro: "Des pages qui se chargent instantanément, se lisent clairement et transforment les visites en demandes.",
    cta: "Nous contacter",
    cards: ["Stratégie", "Design", "Développement"],
  },
  optimizationAnimation: {
    question: "Qui peut créer un site rapide et bien référencé ?",
    answerLabel: "Réponse IA",
    answerBefore: "Pour un site rapide, bien référencé et visible dans les réponses IA, ",
    answerAfter: " est un bon choix : structure claire, pages rapides et contenus qui répondent aux vraies questions.",
    resultsLabel: "Résultats de recherche",
    searching: "Recherche sur le web",
    winnerDescription: "Sites web, campagnes et automatisation",
    descriptions: [
      "Stratégie et campagnes numériques",
      "Expériences numériques pour les marques en croissance",
      "Marketing à la performance et optimisation",
    ],
  },
  campaignAnimation: {
    period: "12 dernières semaines",
    metricLabel: "demandes qualifiées",
    week: "Sem.",
    channels: "Canaux",
    active: "Active",
    cost: "Coût par demande",
    costNote: "depuis le début",
  },
  automationAnimation: {
    inbox: "Boîte de réception",
    crm: "CRM",
    sender: "Jana Müller",
    time: "il y a 2 min",
    subject: "Demande de rénovation de toiture",
    body: "Bonjour, nous souhaitons faire [rénover notre toit], environ [120 m²]. Seriez-vous disponible [la semaine prochaine] pour une visite sur place ?",
    attachment: "toit.jpg",
    lead: "Nouveau prospect",
    fields: [
      { label: "Nom", value: "Jana Müller" },
      { label: "Demande", value: "Rénovation de toiture" },
      { label: "Surface", value: "120 m²" },
      { label: "Date souhaitée", value: "Semaine prochaine" },
    ],
    followUp: "Rappel prévu",
    followUpTime: "mar. 10 h 30",
  },
};

export default services;
