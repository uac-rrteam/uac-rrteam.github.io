import type { Lang } from "@/i18n/dictionary";

/* Ce que fait l'équipe, en une seule source.

   Relevé sur ratheil.info (pages Recherche, Publications, Encadrements), sur le
   dépôt uac-rrteam/papers-and-posters et sur la plateforme publique du projet
   MPVRP-CC. Rien n'est arrondi ni reformulé au-delà de la traduction : un
   financement, une année ou un état de thèse se vérifient à la source.

   Comme pour l'équipe, ce qui ne se traduit pas vit à part : les références
   bibliographiques gardent le titre d'origine de leur publication, quelle que
   soit la langue de lecture du site. */

export interface Axe {
  titre: string;
  dit: string;
}

export interface Projet {
  nom: string;
  annees: string;
  /** Ce que Ratheil y fait : coordonnateur, responsable de lot, membre. */
  role: string;
  financement: string;
  dit: string;
}

export interface Piece {
  nom: string;
  dit: string;
}

export interface Champ {
  nom: string;
  pieces: Piece[];
}

export interface These {
  titre: string;
  qui: string;
  /** Renseigné quand la personne a sa page sur ce site. */
  slug?: string;
  cadre: string;
  annees?: string;
  etat?: string;
}

export interface Publication {
  annee: number;
  titre: string;
  ref: string;
}

export interface Chiffre {
  valeur: string;
  libelle: string;
}

export interface Vitrine {
  titre: string;
  soustitre: string;
  auteurs: string[];
  propos: string[];
  chiffres: Chiffre[];
}

export interface Recherche {
  titre: string;
  chapo: string;
  axesTitre: string;
  axes: Axe[];
  projetsTitre: string;
  projetsChapo: string;
  projets: Projet[];
  vitrineTitre: string;
  vitrine: Vitrine;
  thesesTitre: string;
  thesesChapo: string;
  theses: These[];
  coencadrementsTitre: string;
  coencadrements: These[];
  piecesTitre: string;
  piecesChapo: string;
  champs: Champ[];
  publicationsTitre: string;
  publicationsChapo: string;
  motAccepte: string;
  motDonnees: string;
}

/** Les liens de la vitrine et des dépôts : les mêmes dans les deux langues. */
export const LIENS_VITRINE = [
  { intitule: "La plateforme publique", vers: "https://ifri-ai-classes.github.io/MPVRP-CC/index.html" },
  { intitule: "Le poster", vers: "https://github.com/uac-rrteam/papers-and-posters/tree/main/posters/2026_deep_learning_indaba" },
];

/** Les répertoires où l'on retrouve la production complète. */
export const REPERTOIRES = [
  { intitule: "Google Scholar", vers: "https://scholar.google.com/citations?user=36wbP8kAAAAJ&hl=en" },
  { intitule: "DBLP", vers: "https://dblp.org/pid/150/4939" },
  { intitule: "ORCID", vers: "https://orcid.org/0000-0002-5467-9448" },
];

/* Les références gardent leur titre d'origine : une publication ne se traduit
   pas, elle se cite. Seules les deux mentions d'état sont dans les textes. */
const PUBLICATIONS: Publication[] = [
  {
    annee: 2026,
    titre:
      "Spectral prototype-based spatial reweighting for robust crop classification via Sentinel-1 and Sentinel-2 data fusion",
    ref: "E. Adje, A. Lakoussa, V. R. Houndji, S. A. R. M. Ahouandjinou. CARI 2026.",
  },
  {
    annee: 2026,
    titre:
      "Spatiotemporal modeling and uncertainty quantification of reference evapotranspiration using machine learning and Bayesian model averaging in Benin",
    ref: "B. C. F. Mizele, M. Meliho, V. R. Houndji, S. A. R. M. Ahouandjinou, C. A. Orlando. Geomatics, 6(4), art. 73.",
  },
  {
    annee: 2025,
    titre: "Machine learning techniques for tomato yield prediction: a comprehensive analysis",
    ref: "K. A. Odah, S. C. A. Houetohossou, V. R. Houndji, R. L. G. Kakaï. Smart Agricultural Technology, 12, 101067.",
  },
  {
    annee: 2025,
    titre: "Machine learning-based path loss models: towards a unified methodology",
    ref: "M. A. O. Balogoun, M. Dossou, V. R. Houndji, A.-C. Honfoga. IEEE ICETCI 2025, pp. 1–9.",
  },
  {
    annee: 2025,
    titre: "Towards a fully-fletched African register of implanted pacemakers",
    ref: "S. O. F. Kouzonde, G. Kpadjouda, V. R. Houndji, S. A. R. M. Ahouandjinou, J. Degila, M. L. Ba. InterSol 2025, LNICST, pp. 204–216.",
  },
  {
    annee: 2025,
    titre:
      "Cotton jassid pests severity discrimination using single image super resolution, data fusion and machine learning",
    ref: "S. Bah, V. R. Houndji, E. W. G. Megnigbeto, E. C. Ezin, N. G. Gouwakinnou. IEEE AICSIP 2025, pp. 1–7.",
  },
  {
    annee: 2025,
    titre: "Effects of weather scenarios and fertilizer on maize growth and yield: insights from a greenhouse experiment",
    ref: "S. P. G. Tahi, K. V. Salako, V. R. Houndji, R. Glèlè Kakaï. PLOS ONE, 20(3), e0318121.",
  },
  {
    annee: 2025,
    titre: "RiceSeg-5932: complete pixel-level segmentation masks for rice leaf disease images samples",
    ref: "K. M. S. Zinsou, V. R. Houndji. Mendeley Data, version 1.",
  },
  {
    annee: 2024,
    titre:
      "Cotton jassid infestation monitoring using Sentinel-2 MSI, Landsat 9 TIRS, and PlanetScope imagery with machine learning and data fusion",
    ref: "S. Bah, M. D. T. M. Houegbe, E. W. G. Megnigbeto, V. R. Houndji, B. N. Kouton, N. G. Gouwakinnou, E. C. Ezin. IEEE ICCA 2024, pp. 1–9.",
  },
  {
    annee: 2024,
    titre: "An experimental analysis of traditional machine learning algorithms for maize yield prediction",
    ref: "S. P. G. Tahi, C. G. Hounmenou, V. R. Houndji, R. G. Kakaï. Contemporary Mathematics, 5(4), pp. 6208–6224.",
  },
  {
    annee: 2024,
    titre: "Using pattern mining to determine fine climatic parameters for maize yield in Benin",
    ref: "S. P. G. Tahi, V. R. Houndji, C. G. Hounmenou, R. G. Kakaï. IAES IJAI, 13(4), pp. 3930–3941.",
  },
  {
    annee: 2024,
    titre: "Genetic algorithms for solving the pigment sequencing problem",
    ref: "V. R. Houndji, T. Gna. African Journal of Research in Computer Science and Applied Mathematics, 40.",
  },
  {
    annee: 2024,
    titre: "Empirical performance of deep learning models with class imbalance for crop disease classification",
    ref: "S. C. A. Houetohossou, C. G. Hounmenou, V. R. Houndji, R. G. Kakaï. DeLTA 2024, CCIS, 2172, pp. 118–135.",
  },
  {
    annee: 2024,
    titre: "NextVision, an intelligent video surveillance system based on computer vision and natural language processing",
    ref: "V. R. Houndji, P. G. Guedje. ICICT 2024, LNNS, 1055, pp. 271–281.",
  },
  {
    annee: 2024,
    titre:
      "Finding optimum climatic parameters for high tomato yield in Benin (West Africa) using frequent pattern growth algorithm",
    ref: "A. Houetohossou, V. R. Houndji, R. Sikirou, R. G. Glèlè Kakaï. PLOS ONE, 19(2), e0297983.",
  },
  {
    annee: 2024,
    titre: "Machine learning techniques for cereal crops yield prediction: a comprehensive review",
    ref: "S. P. G. Tahi, V. R. Houndji, K. V. Salako, C. G. Hounmenou, R. G. Kakaï. Applications of Modelling and Simulation, 8, pp. 174–190.",
  },
  {
    annee: 2023,
    titre: "Radio coverage prediction in wireless networks: a bibliometric study",
    ref: "M. A. O. Balogoun, V. R. Houndji, M. Dossou, A.-C. Honfoga. ICICT 2023, LNNS, 696, pp. 341–361.",
  },
  {
    annee: 2023,
    titre: "Advancements in video-based insect tracking: a bibliometric analysis to a short survey",
    ref: "E. A. Adjé, A. S. R. M. Ahouandjinou, G. Delmaire, G. Roussel, R. V. Houndji. ICAIP 2023, pp. 75–82.",
  },
  {
    annee: 2023,
    titre: "Time-constrained DL8.5 using limited discrepancy search",
    ref: "H. Kiossou, P. Schaus, S. Nijssen, V. R. Houndji. ECML PKDD 2022, LNCS, 13717, pp. 443–459.",
  },
  {
    annee: 2023,
    titre: "C-Elect, an automatic candidate selection tool using constraint programming",
    ref: "V. R. Houndji, K. B. Selegbe. IEEE ICECET 2023, Le Cap, pp. 1–4.",
  },
  {
    annee: 2023,
    titre: "UMLDesigner: an automatic UML diagram design tool",
    ref: "V. R. Houndji, G. Akotenou. DeLTA 2023, CCIS, 1875, pp. 340–350.",
  },
  {
    annee: 2023,
    titre: "GrailSolver, à la dernière itération de l'obtention du graal de la programmation",
    ref: "V. R. Houndji, G. Akotenou, A. M. Kousse, K. Bonou Selegbe. Journées Francophones de Programmation par Contraintes, Strasbourg.",
  },
  {
    annee: 2023,
    titre:
      "Deep learning methods for biotic and abiotic stresses detection and classification in fruits and vegetables",
    ref: "S. C. A. Houetohossou, V. R. Houndji, C. G. Hounmenou, R. Sikirou, R. L. G. Kakaï. Artificial Intelligence in Agriculture, 9, pp. 46–60.",
  },
  {
    annee: 2023,
    titre: "Use of artificial intelligence in cardiology: where are we in Africa?",
    ref: "F. Lo Niang, V. R. Houndji, M. Lo, J. Degila, M. L. Ba. AFRICOMM 2022, LNICST, 499, pp. 473–486.",
  },
  {
    annee: 2022,
    titre: "Performance profiles to refine analysis of machine learning models",
    ref: "V. R. Houndji, B. Zossou. International Seminar on Machine Learning, Optimization, and Data Science.",
  },
  {
    annee: 2022,
    titre: "Features analysis of internet traffic classification using interpretable machine learning models",
    ref: "E. A. Adjé, V. R. Houndji, M. Dossou. IAES IJAI, 11(3), pp. 1175–1183.",
  },
  {
    annee: 2022,
    titre: "Automatic UML defects detection based on image of diagram",
    ref: "M. S. Lokonon, V. R. Houndji. DeLTA, pp. 193–198.",
  },
  {
    annee: 2022,
    titre: "A bibliometric analysis of the trends in the research on wearable technologies for cardiovascular diseases",
    ref: "G. E. A. Kpadjouda Job, J. Degila, S. A. Ahouandjinou, V. R. Houndji, M. L. Ba. pHealth, Studies in Health Technology and Informatics.",
  },
  {
    annee: 2020,
    titre: "Prediction of the purchase intention of users on e-commerce platforms using gradient boosting",
    ref: "Y. Kiki, V. R. Houndji. International Journal of Engineering and Advanced Technology, 10(1), pp. 446–450.",
  },
  {
    annee: 2020,
    titre: "Using an interpretable machine learning approach to study the drivers of international migration",
    ref: "H. Kiossou, Y. Schenk, F. Docquier, V. R. Houndji, S. Nijssen, P. Schaus. Harvard CRCS Workshop on AI for Social Good.",
  },
  {
    annee: 2020,
    titre: "AmonAI: a students academic performances prediction system",
    ref: "I. Houndayi, V. R. Houndji, P.-J. Zohou, E. C. Ezin. AFRICOMM, LNICST, 311, pp. 212–218.",
  },
  {
    annee: 2019,
    titre: "The item-dependent StockingCost constraint",
    ref: "V. R. Houndji, P. Schaus, L. Wolsey. Constraints, 24, pp. 183–209.",
  },
  {
    annee: 2019,
    titre: "Sorghum yield prediction using machine learning",
    ref: "G. Zannou, V. R. Houndji. IEEE BioSMART, pp. 152–155.",
  },
  {
    annee: 2019,
    titre: "Awale game: application programming interface and augmented reality interface",
    ref: "P. Houessou, V. R. Houndji, E. C. Ezin, P. Kiki, H. Kiossou, J.-B. Sossou, F. Zoumarou Walis. LNICST, 260, pp. 147–154.",
  },
  {
    annee: 2018,
    titre: "Generic heuristic for the mnk games",
    ref: "A.-H. Abdoulaye, V. R. Houndji, E. C. Ezin, G. Aglin. CARI 2018, pp. 265–275.",
  },
  {
    annee: 2017,
    titre: "The weighted arborescence constraint",
    ref: "V. R. Houndji, P. Schaus, M. N. Hounkonnou, L. Wolsey. CPAIOR 2017, LNCS, 10335, pp. 185–201.",
  },
  {
    annee: 2014,
    titre: "The StockingCost constraint",
    ref: "V. R. Houndji, P. Schaus, L. Wolsey, Y. Deville. CP 2014, LNCS, 8656, pp. 382–397.",
  },
];

const fr: Recherche = {
  titre: "Recherche",
  chapo:
    "Apprentissage automatique, programmation par contraintes et optimisation combinatoire, appliqués à des problèmes qui se posent ici : la santé, l'agriculture, l'éducation et la logistique.",

  axesTitre: "Nos axes",
  axes: [
    {
      titre: "Apprentissage automatique",
      dit: "Conception, expérimentation et évaluation de systèmes intelligents.",
    },
    {
      titre: "Programmation par contraintes",
      dit: "Algorithmes de filtrage, algorithmes de recherche et modélisation de problèmes combinatoires.",
    },
    {
      titre: "Optimisation combinatoire",
      dit: "Planification, ordonnancement, recherche opérationnelle et aide à la décision.",
    },
    {
      titre: "Intelligence artificielle responsable",
      dit: "Équité, interprétabilité et adaptation des systèmes aux contextes africains.",
    },
  ],

  projetsTitre: "Les projets en cours",
  projetsChapo:
    "Huit projets, financés par des agences belges, françaises, européennes et par l'Université d'Abomey-Calavi elle-même.",
  projets: [
    {
      nom: "OpenCS4Dev",
      annees: "depuis 2026",
      role: "Coordonnateur Sud",
      financement: "ARES, Belgique",
      dit: "Mutualisation durable de ressources pédagogiques en informatique entre l'UCLouvain et l'Université d'Abomey-Calavi.",
    },
    {
      nom: "ForCES",
      annees: "depuis 2026",
      role: "Coordonnateur Sud pour le Bénin",
      financement: "ARES, Belgique",
      dit: "Analyse des politiques et des pratiques, puis co-construction d'une infrastructure de formation continue en pédagogie universitaire numérique au Bénin et au Sénégal.",
    },
    {
      nom: "STOP-MNT",
      annees: "depuis 2025",
      role: "Responsable du lot 2, intelligence artificielle et objets connectés",
      financement: "Fonds compétitifs de l'UAC",
      dit: "Développement d'une stratégie intégrée pour la prévention des maladies non transmissibles au Bénin.",
    },
    {
      nom: "AI4CKD",
      annees: "depuis 2024",
      role: "Chef de projet",
      financement: "Google",
      dit: "Système de prédiction des stades de la maladie rénale chronique, adapté au contexte béninois.",
    },
    {
      nom: "Opti'Plan",
      annees: "2024 à 2025",
      role: "Coordonnateur Sud",
      financement: "ARES, Belgique",
      dit: "Méthodes et outils de planification automatique des soutenances, pour les formations à grands effectifs des universités béninoises.",
    },
    {
      nom: "IoT4Pest",
      annees: "depuis 2024",
      role: "Membre",
      financement: "Inria, France",
      dit: "Surveillance des ravageurs agricoles en Afrique subsaharienne au moyen de réseaux de capteurs.",
    },
    {
      nom: "PATH",
      annees: "depuis 2024",
      role: "Membre",
      financement: "Union européenne",
      dit: "Mobilité académique et renforcement des compétences de jeunes scientifiques africains en agriculture de précision.",
    },
    {
      nom: "AI4Cardio",
      annees: "depuis 2021",
      role: "Membre",
      financement: "AFD, France",
      dit: "Prévention et surveillance des maladies cardiovasculaires par intelligence artificielle, au Bénin et au Sénégal.",
    },
  ],

  vitrineTitre: "Le travail du moment",
  vitrine: {
    titre: "Tournées de véhicules multi-produits avec coûts de changement",
    soustitre: "Présenté au Deep Learning Indaba 2026, poster GP-141",
    auteurs: [
      "Vinasétan Ratheil HOUNDJI",
      "Rosas BEHOUNDJA",
      "Jean-Eudes CODO",
      "Godright ADOHOUNBLESSI",
      "Fédel FOLLY",
      "Marc-André AKOUETE",
    ],
    propos: [
      "Le problème se pose dans le transport de produits pétroliers, chimiques et alimentaires : une flotte hétérogène doit livrer plusieurs types de produits depuis plusieurs dépôts vers un réseau de stations. Chaque changement de produit dans une citerne coûte un nettoyage, donc il faut arbitrer en permanence entre allonger un trajet pour garder le même produit et payer la préparation.",
      "Le modèle est une formulation linéaire en nombres entiers mixtes qui traite ensemble la distribution multi-dépôts, les livraisons fractionnées, les contraintes de stock, les voyages multiples bornés et les coûts de changement. Il est résolu avec Gurobi et évalué sur cent cinquante instances aux caractéristiques variées : configurations de flotte, asymétries de demande, topologies de réseau.",
      "La suite est déjà posée : des modèles par programmation par contraintes et métaheuristiques pour les grandes instances, un partenariat avec une entreprise de logistique pour éprouver le modèle sur des opérations réelles, et une compétition ouverte adossée à la plateforme.",
    ],
    chiffres: [
      { valeur: "150", libelle: "instances de référence, publiques" },
      { valeur: "6", libelle: "auteurs, tous de l'IFRI et du LRSIA" },
    ],
  },

  thesesTitre: "Les thèses en cours",
  thesesChapo:
    "Cinq thèses dirigées à l'Université d'Abomey-Calavi. Les noms qui portent un lien mènent à la page de la personne.",
  theses: [
    {
      titre: "Système multi-agents immersif en réalité virtuelle pour la formation pédagogique des enseignants universitaires",
      qui: "Linuse Mevic Jézugnon TIKPON",
      slug: "linuse-tikpon",
      cadre: "École doctorale des sciences de l'ingénieur, UAC",
    },
    {
      titre: "Détection automatique des types de crises d'épilepsie à partir d'électroencéphalogrammes",
      qui: "Marie Mélène Sèmèvo TONOU",
      slug: "marie-melene-tonou",
      cadre: "École doctorale des sciences de l'ingénieur, UAC",
    },
    {
      titre: "Système d'aide au dépistage précoce de l'insuffisance rénale chronique au Bénin fondé sur l'apprentissage automatique",
      qui: "Maryse Fortune Doloresse GAHOU",
      slug: "maryse-gahou",
      cadre: "École doctorale des sciences de l'ingénieur, UAC",
    },
    {
      titre: "Détection automatique de la trypanosomiase à partir d'images de frottis sanguins",
      qui: "Grace KISAMBU NSELE",
      cadre: "École doctorale des sciences de l'ingénieur, UAC",
    },
    {
      titre:
        "Identification de biomarqueurs pharmacogénomiques et algorithmes décisionnels pour un traitement personnalisé du diabète de type 2",
      qui: "Noël Christi HONZOUNNON",
      cadre: "École doctorale des sciences de la vie et de la terre, UAC",
    },
  ],

  coencadrementsTitre: "Les thèses co-encadrées",
  coencadrements: [
    {
      titre: "Prédiction de la couverture radio par apprentissage automatique : la télévision numérique terrestre au Bénin",
      qui: "Marianne Omonlola BALOGOUN",
      slug: "marianne-omonlola-balogoun",
      cadre: "École doctorale des sciences de l'ingénieur, UAC",
      annees: "depuis 2022",
      etat: "En cours",
    },
    {
      titre:
        "Détection des ravageurs de cultures par apprentissage automatique et données satellitaires ouvertes : les jassides du coton au nord du Bénin",
      qui: "Souleymane BAH",
      cadre: "Institut de mathématiques et de sciences physiques, UAC",
      annees: "depuis 2022",
      etat: "En cours",
    },
    {
      titre:
        "Système d'information médical intelligent : détection et prise en charge précoces des maladies cardiovasculaires au Sénégal",
      qui: "Fatou LO NIANG",
      cadre: "Université Gaston Berger de Saint-Louis, Sénégal",
      annees: "depuis 2022",
      etat: "En cours",
    },
    {
      titre:
        "Optimisation des paramètres des techniques d'apprentissage automatique pour la prédiction du rendement du maïs",
      qui: "Ariane HOUETOHOSSOU",
      cadre: "École doctorale des sciences agronomiques et de l'eau, UAC",
      annees: "2021 à 2024",
      etat: "Soutenue",
    },
    {
      titre:
        "Évaluation empirique des techniques d'apprentissage automatique pour la détection des maladies et la prédiction du rendement de la tomate",
      qui: "Peace TAHI",
      cadre: "École doctorale des sciences agronomiques et de l'eau, UAC",
      annees: "2021 à 2024",
      etat: "Soutenue",
    },
  ],

  piecesTitre: "Ce que ça donne",
  piecesChapo:
    "Les prototypes issus des travaux de l'équipe et des mémoires encadrés, rangés par terrain. Plusieurs ont leur démonstration en vidéo.",
  champs: [
    {
      nom: "Agriculture",
      pieces: [
        { nom: "Sorghum yield prediction", dit: "Estimation du rendement agricole à partir d'images de drones et de modèles d'apprentissage." },
        { nom: "Rice Diseases Detector", dit: "Application mobile qui identifie trois maladies des feuilles de riz." },
        { nom: "Spodoptera frugiperda detection", dit: "Localisation par drones des zones de maïs infestées." },
      ],
    },
    {
      nom: "Santé",
      pieces: [
        { nom: "KINÉGAN", dit: "Environnement virtuel immersif où le patient fait ses exercices de rééducation, suivi par son kinésithérapeute." },
        { nom: "Surgical VR", dit: "Simulation en réalité virtuelle d'une appendicectomie laparoscopique, pour la formation pratique." },
      ],
    },
    {
      nom: "Éducation",
      pieces: [
        { nom: "AmonAI", dit: "Prédiction des performances académiques, pour repérer les difficultés avant qu'il ne soit trop tard." },
        { nom: "ARGeo", dit: "Expériences en réalité augmentée pour l'enseignement de la géologie au secondaire." },
      ],
    },
    {
      nom: "Sécurité",
      pieces: [
        { nom: "NextVision", dit: "Vidéosurveillance associant vision par ordinateur, traitement du langage et détection d'objets en temps réel." },
        { nom: "Filtrage automatique de scènes", dit: "Détection et suppression automatiques de séquences vidéo sensibles." },
      ],
    },
    {
      nom: "Patrimoine et modélisation 3D",
      pieces: [
        { nom: "WASETAN", dit: "Visite géolocalisée et augmentée de la Route des Esclaves, à Ouidah." },
        { nom: "ARGuide", dit: "Guide en réalité augmentée du monument de l'Amazone, à Cotonou." },
        { nom: "PNROuidah", dit: "Parcours web immersif de la Porte du Non-Retour, pour préserver la mémoire du site." },
        { nom: "Houenouho", dit: "Restitution en réalité augmentée de scènes liées à la traite négrière sur les sites béninois." },
        { nom: "Kondo", dit: "Plateforme web de reconstruction de modèles 3D à partir d'images." },
      ],
    },
    {
      nom: "Commerce en ligne",
      pieces: [
        { nom: "AI for e-commerce", dit: "Prédiction de l'intention d'achat à partir des données de navigation." },
      ],
    },
  ],

  publicationsTitre: "Les publications",
  publicationsChapo:
    "Articles de revue, actes de conférences, communications et jeux de données, du plus récent au plus ancien.",
  motAccepte: "Article accepté",
  motDonnees: "Jeu de données de recherche",
};

const en: Recherche = {
  titre: "Research",
  chapo:
    "Machine learning, constraint programming and combinatorial optimization, applied to problems that arise here: health, agriculture, education and logistics.",

  axesTitre: "Our areas",
  axes: [
    { titre: "Machine learning", dit: "Design, experimentation and evaluation of intelligent systems." },
    {
      titre: "Constraint programming",
      dit: "Filtering algorithms, tree search, and modeling of combinatorial problems.",
    },
    {
      titre: "Combinatorial optimization",
      dit: "Planning, scheduling, operations research and decision support.",
    },
    {
      titre: "Responsible artificial intelligence",
      dit: "Fairness, interpretability, and adaptation of systems to African contexts.",
    },
  ],

  projetsTitre: "Current projects",
  projetsChapo:
    "Eight projects, funded by Belgian, French and European agencies, and by the University of Abomey-Calavi itself.",
  projets: [
    {
      nom: "OpenCS4Dev",
      annees: "since 2026",
      role: "Southern coordinator",
      financement: "ARES, Belgium",
      dit: "Sustainable pooling of computer science learning resources between UCLouvain and the University of Abomey-Calavi.",
    },
    {
      nom: "ForCES",
      annees: "since 2026",
      role: "Southern coordinator for Benin",
      financement: "ARES, Belgium",
      dit: "Analysis of policies and practices, then co-development of a continuing professional development infrastructure for digital university pedagogy in Benin and Senegal.",
    },
    {
      nom: "STOP-MNT",
      annees: "since 2025",
      role: "Leader of work package 2, artificial intelligence and connected devices",
      financement: "UAC Competitive Research Fund",
      dit: "An integrated strategy for preventing non-communicable diseases in Benin.",
    },
    {
      nom: "AI4CKD",
      annees: "since 2024",
      role: "Principal investigator",
      financement: "Google",
      dit: "A system for predicting chronic kidney disease stages, fitted to the Beninese context.",
    },
    {
      nom: "Opti'Plan",
      annees: "2024 to 2025",
      role: "Southern coordinator",
      financement: "ARES, Belgium",
      dit: "Methods and tools for automatic thesis-defense scheduling, for large university programs in Benin.",
    },
    {
      nom: "IoT4Pest",
      annees: "since 2024",
      role: "Member",
      financement: "Inria, France",
      dit: "Monitoring agricultural pests in sub-Saharan Africa using sensor networks.",
    },
    {
      nom: "PATH",
      annees: "since 2024",
      role: "Member",
      financement: "European Union",
      dit: "Academic mobility and capacity building for young African scientists in precision agriculture.",
    },
    {
      nom: "AI4Cardio",
      annees: "since 2021",
      role: "Member",
      financement: "AFD, France",
      dit: "AI-based prevention and monitoring of cardiovascular disease, in Benin and Senegal.",
    },
  ],

  vitrineTitre: "Work in the spotlight",
  vitrine: {
    titre: "Multi-product vehicle routing with changeover costs",
    soustitre: "Presented at the Deep Learning Indaba 2026, poster GP-141",
    auteurs: [
      "Vinasétan Ratheil HOUNDJI",
      "Rosas BEHOUNDJA",
      "Jean-Eudes CODO",
      "Godright ADOHOUNBLESSI",
      "Fédel FOLLY",
      "Marc-André AKOUETE",
    ],
    propos: [
      "The problem arises in the transport of petroleum, chemical and food products: a heterogeneous fleet must deliver several product types from several depots to a network of service stations. Every product changeover in a tank costs a cleaning, so the trade-off is constant between making a detour to keep the same product and paying for on-site preparation.",
      "The model is a mixed-integer linear programming formulation that handles multi-depot distribution, split deliveries, depot stock constraints, bounded multiple trips and changeover costs together. It is solved with Gurobi and evaluated on one hundred and fifty instances with varied characteristics: fleet configurations, demand asymmetries, network topologies.",
      "What comes next is already set: constraint programming and metaheuristic models for large instances, a partnership with a logistics company to test the model on real operations, and an open competition built on the platform.",
    ],
    chiffres: [
      { valeur: "150", libelle: "public benchmark instances" },
      { valeur: "6", libelle: "authors, all from IFRI and LRSIA" },
    ],
  },

  thesesTitre: "Ongoing PhD theses",
  thesesChapo:
    "Five theses supervised at the University of Abomey-Calavi. Names that carry a link lead to the person's page.",
  theses: [
    {
      titre: "An immersive multi-agent virtual reality system for the pedagogical training of university teachers",
      qui: "Linuse Mevic Jézugnon TIKPON",
      slug: "linuse-tikpon",
      cadre: "Doctoral School of Engineering Sciences, UAC",
    },
    {
      titre: "Automatic detection of epileptic seizure types from electroencephalograms",
      qui: "Marie Mélène Sèmèvo TONOU",
      slug: "marie-melene-tonou",
      cadre: "Doctoral School of Engineering Sciences, UAC",
    },
    {
      titre: "A machine learning-based decision-support system for early chronic kidney disease screening in Benin",
      qui: "Maryse Fortune Doloresse GAHOU",
      slug: "maryse-gahou",
      cadre: "Doctoral School of Engineering Sciences, UAC",
    },
    {
      titre: "Automatic detection of trypanosomiasis from blood smear images",
      qui: "Grace KISAMBU NSELE",
      cadre: "Doctoral School of Engineering Sciences, UAC",
    },
    {
      titre:
        "Pharmacogenomic biomarkers and decision-making algorithms for personalized treatment of type 2 diabetes",
      qui: "Noël Christi HONZOUNNON",
      cadre: "Doctoral School of Life and Earth Sciences, UAC",
    },
  ],

  coencadrementsTitre: "Co-supervised theses",
  coencadrements: [
    {
      titre: "Radio coverage prediction using machine learning: digital terrestrial television in Benin",
      qui: "Marianne Omonlola BALOGOUN",
      slug: "marianne-omonlola-balogoun",
      cadre: "Doctoral School of Engineering Sciences, UAC",
      annees: "since 2022",
      etat: "Ongoing",
    },
    {
      titre: "Crop pest detection using machine learning and open satellite data: cotton jassids in northern Benin",
      qui: "Souleymane BAH",
      cadre: "Institute of Mathematics and Physical Sciences, UAC",
      annees: "since 2022",
      etat: "Ongoing",
    },
    {
      titre:
        "An intelligent medical information system: early detection and management of cardiovascular disease in Senegal",
      qui: "Fatou LO NIANG",
      cadre: "Université Gaston Berger, Saint-Louis, Senegal",
      annees: "since 2022",
      etat: "Ongoing",
    },
    {
      titre: "Tuning machine learning techniques for maize yield prediction",
      qui: "Ariane HOUETOHOSSOU",
      cadre: "Doctoral School of Agronomic and Water Sciences, UAC",
      annees: "2021 to 2024",
      etat: "Defended",
    },
    {
      titre:
        "An empirical evaluation of machine learning techniques for disease detection and yield prediction in tomato",
      qui: "Peace TAHI",
      cadre: "Doctoral School of Agronomic and Water Sciences, UAC",
      annees: "2021 to 2024",
      etat: "Defended",
    },
  ],

  piecesTitre: "What it produces",
  piecesChapo:
    "Prototypes from the team's work and from supervised theses, sorted by ground. Several have a video demonstration.",
  champs: [
    {
      nom: "Agriculture",
      pieces: [
        { nom: "Sorghum yield prediction", dit: "Estimating crop yields from drone imagery and machine learning models." },
        { nom: "Rice Diseases Detector", dit: "A mobile application that identifies three rice leaf diseases." },
        { nom: "Spodoptera frugiperda detection", dit: "Locating infested maize areas using drones." },
      ],
    },
    {
      nom: "Health",
      pieces: [
        { nom: "KINÉGAN", dit: "An immersive virtual environment where patients do their rehabilitation exercises, supervised by their therapist." },
        { nom: "Surgical VR", dit: "A virtual-reality laparoscopic appendectomy simulation, for practical training." },
      ],
    },
    {
      nom: "Education",
      pieces: [
        { nom: "AmonAI", dit: "Predicting academic performance, to spot difficulties before it is too late." },
        { nom: "ARGeo", dit: "Augmented-reality experiences for secondary-school geology teaching." },
      ],
    },
    {
      nom: "Security",
      pieces: [
        { nom: "NextVision", dit: "Video surveillance combining computer vision, natural language processing and real-time object detection." },
        { nom: "Automatic scene filtering", dit: "Automatic detection and removal of sensitive video sequences." },
      ],
    },
    {
      nom: "Heritage and 3D modeling",
      pieces: [
        { nom: "WASETAN", dit: "A geolocated augmented tour of the Slave Route, in Ouidah." },
        { nom: "ARGuide", dit: "An augmented-reality guide to the Amazon monument, in Cotonou." },
        { nom: "PNROuidah", dit: "An immersive web experience of the Door of No Return, preserving the memory of the site." },
        { nom: "Houenouho", dit: "Augmented-reality reconstructions of scenes tied to the slave trade at Beninese sites." },
        { nom: "Kondo", dit: "A web platform for reconstructing 3D models from images." },
      ],
    },
    {
      nom: "E-commerce",
      pieces: [{ nom: "AI for e-commerce", dit: "Predicting purchase intention from browsing data." }],
    },
  ],

  publicationsTitre: "Publications",
  publicationsChapo:
    "Journal articles, conference proceedings, talks and datasets, from the most recent to the oldest.",
  motAccepte: "Accepted",
  motDonnees: "Research dataset",
};

export function recherche(lang: Lang): Recherche {
  return lang === "en" ? en : fr;
}

export function publications(): Publication[] {
  return PUBLICATIONS;
}
