import type { Lang } from "@/i18n/dictionary";

/* Les rendez-vous de l'équipe.

   Relevé sur bwai-ifri-uac.bj (page d'accueil, programme, appel à
   contributions) et sur ratheil.info. Les photographies viennent du site du
   BWAI, avec l'accord de son organisateur.

   ⚠ Les dates du BWAI 2026 se contredisent d'une page à l'autre du site
   officiel : son bandeau annonce le 20 au 24 août 2026 depuis la base, ses
   informations pratiques le 23 au 27 novembre 2026. Novembre est retenu ici,
   parce que ratheil.info l'annonce aussi, et parce que les dates d'août ont
   toutes les apparences d'un jeu d'essai (inscriptions ouvertes quatre jours,
   clôturées cinq jours avant l'ouverture). À confirmer auprès de Ratheil. */

export interface Format {
  categorie: string;
  nom: string;
  dit: string;
}

export interface Membre {
  nom: string;
  /** Renseigné quand la personne a sa page sur ce site. */
  slug?: string;
  role?: string;
}

export interface Pole {
  nom: string;
  intitule: string;
  membres: Membre[];
}

export interface Vue {
  fichier: string;
  alt: string;
  /** Vrai quand la source est trop étroite pour une variante réduite. */
  seule?: boolean;
}

export interface Rendezvous {
  nom: string;
  quand: string;
  ou: string;
  dit: string;
  vers?: string;
}

export interface Evenements {
  titre: string;
  chapo: string;

  afficheTitre: string;
  edition: string;
  /* Le rang de l'édition. Le site du BWAI se contredit : son bandeau annonce
     la cinquième, son texte la sixième. C'est le second qui a raison, la
     cinquième s'étant tenue du 17 au 21 novembre 2025 (archive du dépôt). */
  rang: string;
  dates: string;
  lieu: string;
  presentation: string[];
  liens: { intitule: string; vers: string }[];

  formatsTitre: string;
  formatsChapo: string;
  formats: Format[];

  comiteTitre: string;
  comiteChapo: string;
  poles: Pole[];

  imagesTitre: string;
  imagesChapo: string;

  autresTitre: string;
  autresChapo: string;
  autres: Rendezvous[];
}

/** Les photographies de l'édition précédente, dans l'ordre du récit. */
export const VUES: Vue[] = [
  { fichier: "speaker", alt: "Un intervenant prend la parole devant les participants du BWAI 2025" },
  { fichier: "audience", alt: "Des participants suivent une présentation du BWAI 2025" },
  { fichier: "session", alt: "Une intervenante anime une session du BWAI 2025" },
  { fichier: "robotics", alt: "Démonstration d'un bras robotique pendant le BWAI 2025" },
  { fichier: "collaboration", alt: "Trois participants collaborent autour d'un ordinateur pendant le BWAI 2025" },
  { fichier: "workshop", alt: "Un participant prend des notes devant son ordinateur pendant un atelier", seule: true },
  { fichier: "speaker-woman", alt: "Une intervenante présente ses travaux au BWAI 2025", seule: true },
  { fichier: "guests", alt: "Des invités réunis devant l'affiche du BWAI 2025" },
];

const fr: Evenements = {
  titre: "Événements",
  chapo:
    "L'équipe organise et anime des rendez-vous scientifiques au Bénin. Le principal est le Benin Workshop on Artificial Intelligence, porté par l'IFRI à l'Université d'Abomey-Calavi.",

  afficheTitre: "Le prochain rendez-vous",
  edition: "Benin Workshop on Artificial Intelligence",
  rang: "Sixième édition",
  dates: "23 au 27 novembre 2026",
  lieu: "IFRI, campus d'Abomey-Calavi",
  presentation: [
    "Cinq jours de conférences, de communications scientifiques et de rencontres autour de l'intelligence artificielle. Le BWAI réunit étudiants, chercheurs, entreprises, institutions publiques et acteurs de l'innovation.",
    "Il met en lumière les travaux scientifiques, les initiatives locales et les usages concrets de l'intelligence artificielle qui répondent aux besoins du Bénin et du continent. L'inscription est gratuite, et une partie des interventions se suit à distance.",
  ],
  liens: [
    { intitule: "Le site du BWAI", vers: "https://bwai-ifri-uac.bj/" },
    { intitule: "L'appel à contributions", vers: "https://bwai-ifri-uac.bj/call-for-papers" },
    { intitule: "Le programme", vers: "https://bwai-ifri-uac.bj/program" },
  ],

  formatsTitre: "Ce qu'on peut y présenter",
  formatsChapo:
    "Les propositions portent sur des résultats scientifiques, nouveaux ou déjà publiés, des projets en cours, des outils ou des retours d'expérience.",
  formats: [
    {
      categorie: "Recherche",
      nom: "Communications scientifiques",
      dit: "Travaux de recherche, résultats expérimentaux ou études de cas.",
    },
    {
      categorie: "Académique",
      nom: "Posters",
      dit: "Travaux préliminaires, mémoires, projets de recherche et initiatives étudiantes.",
    },
    {
      categorie: "Technique",
      nom: "Démonstrations",
      dit: "Prototypes, applications, jeux de données, plateformes et solutions en service.",
    },
    {
      categorie: "Pratique",
      nom: "Ateliers et tutoriels",
      dit: "Sessions destinées à transmettre une méthode, un outil ou une compétence.",
    },
  ],

  comiteTitre: "Qui le fait tenir",
  comiteChapo:
    "Trente-cinq personnes réparties en cinq pôles. Six sont de l'équipe : leurs noms mènent à leur page.",
  poles: [
    {
      nom: "Direction",
      intitule: "Coordination générale",
      membres: [
        { nom: "Vinasétan Ratheil HOUNDJI", slug: "vinasetan-ratheil-houndji", role: "General chairman" },
        { nom: "Gaston EDAH" },
        { nom: "Arnaud AHOUANDJINOU" },
        { nom: "Sébastien TOHOUN" },
      ],
    },
    {
      nom: "Recherche",
      intitule: "Comité scientifique",
      membres: [
        { nom: "Eugène C. EZIN", role: "Président du comité" },
        { nom: "Pélagie HOUNGUE" },
        { nom: "Maurice COMLAN" },
        { nom: "Abel KONNON" },
        { nom: "Fréjus SANYA" },
        { nom: "Patrick SOTINDJO" },
        { nom: "Géraud AZEHOUN-PAZOU" },
        { nom: "Michael MOUSSE" },
      ],
    },
    {
      nom: "Programme",
      intitule: "Planification et sessions",
      membres: [
        { nom: "Ida TOGNISSE" },
        { nom: "Nelson SAHO" },
        { nom: "Peace TAHI" },
        { nom: "Marianne BALOGOUN", slug: "marianne-omonlola-balogoun" },
        { nom: "Linuse TIKPON", slug: "linuse-tikpon" },
        { nom: "Mélène TONOU", slug: "marie-melene-tonou" },
        { nom: "Maryse GAHOU", slug: "maryse-gahou" },
        { nom: "Grâce NSELE" },
      ],
    },
    {
      nom: "Média",
      intitule: "Communication et relations",
      membres: [
        { nom: "Apoline DOSSOU" },
        { nom: "Olaniyi David EKPE" },
        { nom: "Karen HOUEHA" },
        { nom: "Stéphane GNACADJA" },
        { nom: "Erika ATTEREY" },
        { nom: "Nicos HOUNVIO" },
        { nom: "Lazare FAGBOHOUN" },
      ],
    },
    {
      nom: "Opérations",
      intitule: "Logistique et organisation",
      membres: [
        { nom: "Cindy AGBAZAHOU" },
        { nom: "Gildas AKOUTA" },
        { nom: "Estelle NOUDJENOUME" },
        { nom: "Nitaël KOUGBO" },
        { nom: "Phoris AGBOZOGNIGBE", slug: "phoris-agbozognigbe" },
        { nom: "Romuald AMEGBEDJI" },
        { nom: "Boris MIGAN" },
        { nom: "Derrick ADOKO" },
      ],
    },
  ],

  imagesTitre: "L'édition précédente",
  imagesChapo:
    "Conférences, ateliers, démonstrations et rencontres. Photographies du BWAI 2025, fournies par l'organisation.",

  autresTitre: "Les autres rendez-vous",
  autresChapo: "Ce à quoi l'équipe prend part au-delà du BWAI.",
  autres: [
    {
      nom: "CARI 2026",
      quand: "Octobre 2026",
      ou: "Bénin",
      dit: "Colloque africain sur la recherche en informatique et en mathématiques appliquées.",
      vers: "https://cari-conf.bj/",
    },
    {
      nom: "Deep Learning Indaba 2026",
      quand: "Août 2026",
      ou: "Afrique",
      dit: "Présentation du modèle de tournées de véhicules multi-produits, poster GP-141.",
    },
    {
      nom: "20e école d'été de l'ACP",
      quand: "Août 2025",
      ou: "Bénin",
      dit: "École d'été de programmation par contraintes, présidée par Ratheil Houndji avec John Aoga.",
    },
    {
      nom: "OpenCS4Dev et ForCES",
      quand: "Depuis septembre 2026",
      ou: "Bénin, Belgique, Sénégal",
      dit: "Deux programmes de coopération universitaire soutenus par l'ARES, avec l'UCLouvain et l'Université Cheikh Anta Diop.",
    },
  ],
};

const en: Evenements = {
  titre: "Events",
  chapo:
    "The team organizes and runs scientific gatherings in Benin. The main one is the Benin Workshop on Artificial Intelligence, hosted by IFRI at the University of Abomey-Calavi.",

  afficheTitre: "Next gathering",
  edition: "Benin Workshop on Artificial Intelligence",
  rang: "Sixth edition",
  dates: "23 to 27 November 2026",
  lieu: "IFRI, Abomey-Calavi campus",
  presentation: [
    "Five days of talks, scientific communications and encounters around artificial intelligence. BWAI brings together students, researchers, companies, public institutions and innovation actors.",
    "It puts forward scientific work, local initiatives and concrete uses of artificial intelligence that answer the needs of Benin and of the continent. Registration is free, and part of the programme can be followed remotely.",
  ],
  liens: [
    { intitule: "The BWAI website", vers: "https://bwai-ifri-uac.bj/" },
    { intitule: "Call for contributions", vers: "https://bwai-ifri-uac.bj/call-for-papers" },
    { intitule: "Programme", vers: "https://bwai-ifri-uac.bj/program" },
  ],

  formatsTitre: "What can be presented",
  formatsChapo:
    "Proposals may cover scientific results, new or already published, ongoing projects, tools, or field experience.",
  formats: [
    {
      categorie: "Research",
      nom: "Scientific communications",
      dit: "Research work, experimental results or case studies.",
    },
    {
      categorie: "Academic",
      nom: "Posters",
      dit: "Preliminary work, theses, research projects and student initiatives.",
    },
    {
      categorie: "Technical",
      nom: "Demonstrations",
      dit: "Prototypes, applications, datasets, platforms and working solutions.",
    },
    {
      categorie: "Practical",
      nom: "Workshops and tutorials",
      dit: "Sessions meant to pass on a method, a tool or a skill.",
    },
  ],

  comiteTitre: "Who makes it happen",
  comiteChapo:
    "Thirty-five people across five units. Six are from the team: their names lead to their page.",
  poles: [
    {
      nom: "Direction",
      intitule: "General coordination",
      membres: [
        { nom: "Vinasétan Ratheil HOUNDJI", slug: "vinasetan-ratheil-houndji", role: "General chairman" },
        { nom: "Gaston EDAH" },
        { nom: "Arnaud AHOUANDJINOU" },
        { nom: "Sébastien TOHOUN" },
      ],
    },
    {
      nom: "Research",
      intitule: "Scientific committee",
      membres: [
        { nom: "Eugène C. EZIN", role: "Committee chair" },
        { nom: "Pélagie HOUNGUE" },
        { nom: "Maurice COMLAN" },
        { nom: "Abel KONNON" },
        { nom: "Fréjus SANYA" },
        { nom: "Patrick SOTINDJO" },
        { nom: "Géraud AZEHOUN-PAZOU" },
        { nom: "Michael MOUSSE" },
      ],
    },
    {
      nom: "Programme",
      intitule: "Planning and sessions",
      membres: [
        { nom: "Ida TOGNISSE" },
        { nom: "Nelson SAHO" },
        { nom: "Peace TAHI" },
        { nom: "Marianne BALOGOUN", slug: "marianne-omonlola-balogoun" },
        { nom: "Linuse TIKPON", slug: "linuse-tikpon" },
        { nom: "Mélène TONOU", slug: "marie-melene-tonou" },
        { nom: "Maryse GAHOU", slug: "maryse-gahou" },
        { nom: "Grâce NSELE" },
      ],
    },
    {
      nom: "Media",
      intitule: "Communication and relations",
      membres: [
        { nom: "Apoline DOSSOU" },
        { nom: "Olaniyi David EKPE" },
        { nom: "Karen HOUEHA" },
        { nom: "Stéphane GNACADJA" },
        { nom: "Erika ATTEREY" },
        { nom: "Nicos HOUNVIO" },
        { nom: "Lazare FAGBOHOUN" },
      ],
    },
    {
      nom: "Operations",
      intitule: "Logistics and organization",
      membres: [
        { nom: "Cindy AGBAZAHOU" },
        { nom: "Gildas AKOUTA" },
        { nom: "Estelle NOUDJENOUME" },
        { nom: "Nitaël KOUGBO" },
        { nom: "Phoris AGBOZOGNIGBE", slug: "phoris-agbozognigbe" },
        { nom: "Romuald AMEGBEDJI" },
        { nom: "Boris MIGAN" },
        { nom: "Derrick ADOKO" },
      ],
    },
  ],

  imagesTitre: "The previous edition",
  imagesChapo:
    "Talks, workshops, demonstrations and encounters. Photographs from BWAI 2025, provided by the organizers.",

  autresTitre: "Other gatherings",
  autresChapo: "What the team takes part in beyond BWAI.",
  autres: [
    {
      nom: "CARI 2026",
      quand: "October 2026",
      ou: "Benin",
      dit: "African conference on research in computer science and applied mathematics.",
      vers: "https://cari-conf.bj/",
    },
    {
      nom: "Deep Learning Indaba 2026",
      quand: "August 2026",
      ou: "Africa",
      dit: "Presentation of the multi-product vehicle routing model, poster GP-141.",
    },
    {
      nom: "20th ACP Summer School",
      quand: "August 2025",
      ou: "Benin",
      dit: "Constraint programming summer school, chaired by Ratheil Houndji with John Aoga.",
    },
    {
      nom: "OpenCS4Dev and ForCES",
      quand: "Since September 2026",
      ou: "Benin, Belgium, Senegal",
      dit: "Two university cooperation programmes supported by ARES, with UCLouvain and Université Cheikh Anta Diop.",
    },
  ],
};

export function evenements(lang: Lang): Evenements {
  return lang === "en" ? en : fr;
}
