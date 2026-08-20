import type { Lang } from "@/i18n/dictionary";

/** Un travail de recherche, tel qu'il est déclaré par la personne qui le mène. */
export interface Travail {
  titre: string;
  contributeurs: string[];
  annee: number;
  description: string;
  /** Le dépôt du code, quand il est ouvert. */
  code?: string;
  /** L'article, quand il est publié. */
  article?: string;
}

export interface Lien {
  intitule: string;
  vers: string;
}

/**
 * Une personne de l'équipe.
 *
 * Ce qui manque est absent, pas rempli : personne ne reçoit de portrait ni de
 * notice inventés. Une fiche courte reste courte jusqu'à ce que l'intéressé
 * donne sa matière.
 */
export interface Personne {
  /** Stable d'une langue à l'autre : c'est lui qui fait l'URL. */
  slug: string;
  nom: string;
  statut: string;
  sujet: string;
  /** L'année d'arrivée dans l'équipe. */
  arrivee?: number;
  /** Le nom du fichier dans /imgs/people, sans extension ni taille. */
  portrait?: string;
  /** La notice, un paragraphe par entrée. */
  propos?: string[];
  /** Les charges et responsabilités, une par ligne. */
  charges?: string[];
  travaux?: Travail[];
  liens?: Lien[];
}

/* Sources : ratheil.info pour le responsable, le profil public de l'intéressée
   pour Marianne Balogoun, qui n'a pas d'onglet dans le registre, et le registre de l'équipe tenu
   par ses membres (document de travail partagé, onglets par personne) pour tous
   les autres. Les notices y sont rédigées en anglais par les intéressés : la
   version française en est la traduction, pas une réécriture.

   Les portraits en viennent aussi : trois personnes en ont déposé un, les
   autres pas encore.

   Le registre s'ouvre sur une fiche d'exemple empruntée à un autre laboratoire
   (Aayush Verma, forecasting viral) qui sert de gabarit de saisie : elle n'est
   pas reprise ici. Rosas Behoundja y a un onglet encore vide ; il n'apparaît
   donc que comme contributeur du travail auquel il a participé. */

/** Ce qui ne se traduit pas : liens, portraits, dates. Une seule fois. */
const SOCLE: Record<string, { arrivee?: number; portrait?: string; liens: Lien[] }> = {
  "vinasetan-ratheil-houndji": {
    portrait: "vinasetan-ratheil",
    liens: [
      { intitule: "ratheil.info", vers: "https://ratheil.info" },
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/vinasetan" },
    ],
  },
  "marie-melene-tonou": {
    arrivee: 2025,
    portrait: "marie-melene-tonou",
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/marie-melene-tonou/" },
      { intitule: "GitHub", vers: "https://github.com/melene26" },
      { intitule: "melenetonou@gmail.com", vers: "mailto:melenetonou@gmail.com" },
    ],
  },
  "maryse-gahou": {
    arrivee: 2025,
    portrait: "maryse-gahou",
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/maryse-gahou/" },
      { intitule: "Google Scholar", vers: "https://scholar.google.com/citations?hl=fr&user=ipP515YAAAAJ" },
      { intitule: "GitHub", vers: "https://github.com/MaryseGAHOU" },
      { intitule: "Site personnel", vers: "https://www.self.so/maryse-gahou" },
    ],
  },
  "linuse-tikpon": {
    arrivee: 2025,
    portrait: "linuse-tikpon",
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/linuse-tikpon-80a1b81a5/" },
      { intitule: "GitHub", vers: "https://github.com/LinuseTikpon" },
      { intitule: "linuse.tikpon@gmail.com", vers: "mailto:linuse.tikpon@gmail.com" },
    ],
  },
  "marianne-omonlola-balogoun": {
    // Vignette de deux cents pixels, la seule dont on dispose : elle est plus
    // douce que les autres portraits, à remplacer dès qu'un original arrive.
    portrait: "marianne-omonlola-balogoun",
    liens: [
      {
        intitule: "LinkedIn",
        vers: "https://www.linkedin.com/in/marianne-a-omonlola-balogoun-3bbb00175/",
      },
    ],
  },
  "merveilleux-azihou": {
    arrivee: 2026,
    portrait: "merveilleux-azihou",
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/merveilleux-azihou/" },
      { intitule: "Google Scholar", vers: "https://scholar.google.com/citations?user=dWOzNV4AAAAJ&hl=fr" },
      { intitule: "GitHub", vers: "https://github.com/merveilleuxazihou" },
    ],
  },
  "phoris-agbozognigbe": {
    arrivee: 2026,
    liens: [
      { intitule: "GitHub", vers: "https://github.com/Apasize" },
      { intitule: "agbozognigbeandy3@gmail.com", vers: "mailto:agbozognigbeandy3@gmail.com" },
    ],
  },
  "livingstone-gbozo": {
    arrivee: 2026,
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/livingstone-gbozo-aiot/" },
      { intitule: "GitHub", vers: "https://github.com/Glom-Companies" },
    ],
  },
  "peniel-ahouansou": {
    arrivee: 2026,
    portrait: "peniel-ahouansou",
    liens: [
      { intitule: "LinkedIn", vers: "https://www.linkedin.com/in/péniel-ahouansou-43b1482a1/" },
      { intitule: "GitHub", vers: "https://github.com/peniel-09" },
      {
        intitule: "penielesperatahouansou@gmail.com",
        vers: "mailto:penielesperatahouansou@gmail.com",
      },
    ],
  },
  "precieux-adanlienclounon": {
    arrivee: 2026,
    liens: [
      {
        intitule: "adanlienclounonprecieux877@gmail.com",
        vers: "mailto:adanlienclounonprecieux877@gmail.com",
      },
      { intitule: "GitHub", vers: "https://github.com/MKPA877" },
    ],
  },
};

/** Ce qui se traduit. L'ordre est celui de la lecture : le responsable ouvre. */
type Texte = Omit<Personne, "arrivee" | "portrait" | "liens">;

const fr: Texte[] = [
  {
    slug: "vinasetan-ratheil-houndji",
    nom: "Vinasétan Ratheil HOUNDJI",
    statut: "Maître de conférences CAMES en intelligence artificielle",
    sujet: "Programmation par contraintes et optimisation combinatoire",
    propos: [
      "Docteur en sciences de l'ingénieur de l'UCLouvain et de l'Université d'Abomey-Calavi depuis 2017, il travaille l'apprentissage automatique, la programmation par contraintes et l'optimisation combinatoire, avec des applications en santé, en agriculture et en éducation.",
      "Plus de dix ans de recherche fondamentale et appliquée, et un engagement constant pour l'enseignement, l'encadrement et les collaborations scientifiques qui font avancer l'intelligence artificielle en Afrique.",
    ],
    charges: [
      "Chef du département de génie logiciel, IFRI",
      "Coordonnateur des filières licence et master, IFRI",
      "Président de l'association FRIARE",
      "Président du Benin Workshop on Artificial Intelligence",
    ],
    travaux: [
      {
        titre:
          "Résolution du problème de tournées de véhicules multi-produits avec coûts de changement par programmation linéaire en nombres entiers mixtes",
        contributeurs: ["Vinasétan Ratheil HOUNDJI", "Rosas BEHOUNDJA"],
        annee: 2025,
        description:
          "Le problème de tournées de véhicules multi-produits avec coûts de changement se pose dans le pétrole, la chimie et la distribution alimentaire : des véhicules livrent plusieurs produits depuis plusieurs dépôts vers des clients dispersés, et chaque changement de produit entre deux voyages coûte un nettoyage et une préparation. La formulation proposée traite ensemble la distribution multi-dépôts, les flottes hétérogènes, les livraisons fractionnées, les contraintes de stock aux dépôts, les voyages multiples bornés et les coûts de changement. Elle organise les opérations en mini-tournées propres à chaque produit, reliées par des transferts entre dépôts, la structure bornée des voyages servant à contenir l'espace de recherche. Le modèle est évalué avec Gurobi sur cent cinquante instances synthétiques représentant des configurations réalistes, et s'accompagne d'une plateforme expérimentale ouverte pour la génération d'instances, la visualisation, la vérification de faisabilité et l'évaluation en ligne.",
        code: "https://ifri-ai-classes.github.io/MPVRP-CC/index.html",
      },
    ],
  },
  {
    slug: "marie-melene-tonou",
    nom: "Marie Mélène Sèmèvo TONOU",
    statut: "Doctorante et assistante de recherche",
    sujet: "Intelligence artificielle appliquée à la santé",
    propos: [
      "Doctorante et assistante de recherche au LRSIA, elle travaille l'intelligence artificielle appliquée à la santé. Elle est diplômée ingénieure de l'École Nationale Supérieure de Génie Mathématique et Modélisation, à l'Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques du Bénin.",
      "Ses intérêts vont de l'intelligence artificielle en santé à l'éthique de l'intelligence artificielle, en passant par l'analyse de données et le bien-être humain. Hors du laboratoire, elle est bénévole à FRIARE, association consacrée à l'éthique et à la responsabilité en intelligence artificielle, et enseigne à temps partiel les algorithmes d'apprentissage automatique et l'analyse de données.",
    ],
    travaux: [
      {
        titre:
          "Détection automatique des types de crises épileptiques à partir d'électroencéphalogrammes",
        contributeurs: ["Marie Mélène Sèmèvo TONOU"],
        annee: 2025,
        description:
          "Le travail vise un outil de détection automatique des types de crises épileptiques à partir d'électroencéphalogrammes. Les contributions attendues sont la constitution d'un corpus local d'EEG épileptiques et de nouvelles approches pour l'analyse automatique de l'EEG en épilepsie. Il se tient à l'intersection de la neurologie, des neurosciences, de l'informatique et de l'intelligence artificielle.",
      },
    ],
  },
  {
    slug: "maryse-gahou",
    nom: "Maryse Fortune Doloresse GAHOU",
    statut: "Doctorante",
    sujet:
      "Apprentissage automatique interprétable pour la détection précoce de l'insuffisance rénale chronique",
    propos: [
      "Doctorante à l'École doctorale des sciences de l'ingénieur de l'Université d'Abomey-Calavi, elle développe un système d'apprentissage automatique interprétable pour la détection précoce de l'insuffisance rénale chronique, à partir des données cliniques du service de néphrologie du CNHU-HKM, hôpital national de référence du Bénin. Sa thèse est dirigée par le Dr Vinasétan Ratheil HOUNDJI et co-dirigée par le Pr Jacques Vigan, chef du service de néphrologie et d'hémodialyse du CNHU-HKM.",
    ],
    charges: [
      "Responsable adjointe de l'informatique, FRIARE",
      "Enseignante vacataire, IFRI",
    ],
  },
  {
    slug: "linuse-tikpon",
    nom: "Linuse Mevic Jézugnon TIKPON",
    statut: "Doctorante",
    sujet: "Intelligence artificielle appliquée à l'éducation et à la pédagogie",
    propos: [
      "Doctorante au LRSIA, elle travaille l'intelligence artificielle appliquée à l'éducation, et plus précisément à la pédagogie. Elle a obtenu son master à l'Institut de formation et de recherche en informatique de l'Université d'Abomey-Calavi.",
      "Elle mène aujourd'hui sa thèse et enseigne le génie logiciel à l'IFRI, portée par le souci d'avoir un impact, de susciter l'innovation et de viser l'excellence.",
    ],
    charges: ["Enseignante de génie logiciel, IFRI"],
  },
  {
    slug: "marianne-omonlola-balogoun",
    nom: "Marianne Omonlola BALOGOUN",
    statut: "Doctorante",
    sujet: "Apprentissage automatique appliqué à la propagation des ondes électromagnétiques",
    propos: [
      "Doctorante en technologies de l'information et de la communication à l'Institut de mathématiques et de sciences physiques, elle travaille, avec le soutien de la bourse PASET-RSIF, sur la modélisation de la propagation des ondes électromagnétiques dans les réseaux de communication sans fil par apprentissage automatique. Elle cherche à concilier impact sociétal, en travaillant sur la télévision numérique terrestre, et impact scientifique, en étudiant les technologies de la 5G à la 6G et au-delà.",
      "Elle suit de près les questions d'éthique, de responsabilité et de sécurité en intelligence artificielle, avec pour objectif de promouvoir l'usage des technologies émergentes au service du bien commun.",
    ],
    charges: [
      "Co-responsable du département innovation, recherche et développement, FRIARE Africa",
      "Ingénieure drive test, URPHORAN",
      "Assistante d'enseignement en intelligence artificielle, IFRI, IMSP, Pigier et HECM",
    ],
  },
  {
    slug: "merveilleux-azihou",
    nom: "Merveilleux Gandaho AZIHOU",
    statut: "Étudiant en master",
    sujet:
      "Architectures logicielles modulaires pour l'orchestration de modèles d'apprentissage appliqués à l'EEG",
    propos: [
      "Étudiant en master de génie logiciel à l'IFRI, il est stagiaire de recherche au LRSIA, où il travaille sur la conception d'architectures logicielles modulaires pour l'orchestration de modèles d'apprentissage automatique appliqués à l'analyse de signaux EEG.",
      "Il a fait sa licence en systèmes informatiques et génie logiciel à l'École supérieure Le Faucon de Calavi, diplômé avec les félicitations du jury. Il a été développeur web chez Case&Co., agent d'exploitation informatique chez Ressources Plus, et a mené plusieurs stages en génie logiciel et développement web. Ses intérêts portent sur l'architecture logicielle, les systèmes d'apprentissage automatique, le génie logiciel scientifique, l'intelligence artificielle explicable et les plateformes extensibles et reproductibles pour l'analyse de données.",
    ],
  },
  {
    slug: "phoris-agbozognigbe",
    nom: "Phoris Andy AGBOZOGNIGBE",
    statut: "Stagiaire de recherche",
    sujet: "Intelligence artificielle appliquée à l'outillage de la recherche académique",
    propos: [
      "Stagiaire de recherche au LRSIA, il travaille au sein de l'équipe sur l'intelligence artificielle appliquée à l'outillage de la recherche académique. Il achève un master professionnel en systèmes d'information et réseaux à l'IFRI.",
      "Pendant son stage, il a co-développé IFRI Mémoires, une plateforme de recherche sémantique qui rend enfin explorable le fonds de mémoires de l'institut, et produit un rapport de veille technologique évaluant les outils d'intelligence artificielle pour la revue de littérature scientifique.",
      "Hors du laboratoire, il construit à l'intersection de l'intelligence artificielle, de la sécurité informatique, de l'internet des objets et de la robotique, coordonne un club AIoT, s'intéresse à une intelligence artificielle responsable en contexte africain et touche au game design. Son travail porte sur une architecture d'internet des objets médicaux pour la prévention des maladies non transmissibles en environnement contraint, comme au Bénin.",
    ],
  },
  {
    slug: "livingstone-gbozo",
    nom: "Livingstone Othniel Mawunu GBOZO",
    statut: "Étudiant en licence, troisième année",
    sujet: "Conception d'un système ouvert d'acquisition de signaux EEG",
    propos: [
      "Étudiant en licence de systèmes embarqués et internet des objets à l'IFRI, il effectue un stage académique au LRSIA, où il travaille à la conception d'un système ouvert d'acquisition de signaux EEG.",
    ],
  },
  {
    slug: "peniel-ahouansou",
    nom: "Péniel AHOUANSOU",
    statut: "Étudiante en licence, troisième année, et stagiaire de recherche",
    sujet: "Conception d'un système d'acquisition de signaux EEG",
    propos: [
      "Étudiante en licence de systèmes embarqués et internet des objets à l'IFRI depuis 2023, elle effectue un stage académique au LRSIA sur la conception d'un système d'acquisition de signaux EEG.",
      "Elle conçoit des systèmes intelligents pour des problèmes réels : intelligence artificielle embarquée, technologies de santé et internet des objets industriel.",
    ],
    charges: [
      "Team lead du département internet des objets, United Student Developers",
      "Contributrice, FRIARE Africa",
      "Atelier d'initiation à l'internet des objets, Agence universitaire de la Francophonie",
    ],
  },
  {
    slug: "precieux-adanlienclounon",
    nom: "Précieux ADANLIENCLOUNON",
    statut: "Étudiant en licence, troisième année",
    sujet: "Analyse de données pour la prévention de l'insuffisance rénale chronique",
    propos: [
      "Étudiant en licence d'intelligence artificielle à l'IFRI, il effectue un stage académique au LRSIA, où il analyse des données afin d'en dégager les facteurs qui comptent pour la prévention de l'insuffisance rénale chronique.",
    ],
  },
];

const en: Texte[] = [
  {
    slug: "vinasetan-ratheil-houndji",
    nom: "Vinasétan Ratheil HOUNDJI",
    statut: "Associate professor (CAMES) in artificial intelligence",
    sujet: "Constraint programming and combinatorial optimisation",
    propos: [
      "He holds a PhD in engineering sciences from UCLouvain and Université d'Abomey-Calavi, awarded in 2017, and works on machine learning, constraint programming and combinatorial optimisation, with applications in health, agriculture and education.",
      "Over ten years of fundamental and applied research, and a lasting commitment to teaching, mentoring and the scientific collaborations that advance artificial intelligence across Africa.",
    ],
    charges: [
      "Head of the software engineering department, IFRI",
      "Coordinator of the bachelor's and master's programmes, IFRI",
      "President of the FRIARE association",
      "President of the Benin Workshop on Artificial Intelligence",
    ],
    travaux: [
      {
        titre:
          "Solving the multi-product vehicle routing problem with changeover costs using mixed integer linear programming",
        contributeurs: ["Vinasétan Ratheil HOUNDJI", "Rosas BEHOUNDJA"],
        annee: 2025,
        description:
          "The multi-product vehicle routing problem with changeover costs arises in petroleum, chemical manufacturing and food distribution: vehicles deliver several products from several depots to geographically dispersed customers, and every product change between successive trips costs cleaning and preparation. The proposed mixed-integer linear programming formulation jointly handles multi-depot distribution, heterogeneous fleets, split deliveries, depot inventory constraints, bounded multi-trip operations and changeover costs. It organises vehicle operations into product-specific mini-routes connected through depot transfers, the bounded-trip structure serving to control the search space. The model is evaluated with Gurobi on 150 synthetic benchmark instances representing realistic supply chain configurations, and comes with an open experimental platform for benchmark generation, visualisation, feasibility checking and online evaluation.",
        code: "https://ifri-ai-classes.github.io/MPVRP-CC/index.html",
      },
    ],
  },
  {
    slug: "marie-melene-tonou",
    nom: "Marie Mélène Sèmèvo TONOU",
    statut: "PhD student and research assistant",
    sujet: "Artificial intelligence applied to healthcare",
    propos: [
      "A PhD student and research assistant at LRSIA, she works on artificial intelligence applied to healthcare. She completed her engineering degree at the École Nationale Supérieure de Génie Mathématique et Modélisation, Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques, in Benin.",
      "Her interests span artificial intelligence in healthcare, ethics of artificial intelligence, data analytics and human well-being. Outside the laboratory she volunteers at FRIARE, an association focused on ethics and responsibility in artificial intelligence, and teaches machine learning algorithms and data analytics part time.",
    ],
    travaux: [
      {
        titre: "Automatic detection of epileptic seizure types from electroencephalograms",
        contributeurs: ["Marie Mélène Sèmèvo TONOU"],
        annee: 2025,
        description:
          "The work aims at a tool for the automatic detection of epileptic seizure types from electroencephalograms. Expected contributions are a local corpus of epileptic EEG recordings and new approaches to the automatic analysis of EEG in epilepsy. It sits at the intersection of neurology, neuroscience, computer science and artificial intelligence.",
      },
    ],
  },
  {
    slug: "maryse-gahou",
    nom: "Maryse Fortune Doloresse GAHOU",
    statut: "PhD student",
    sujet: "Interpretable machine learning for the early detection of chronic kidney disease",
    propos: [
      "A PhD student at the École Doctorale des Sciences de l'Ingénieur, Université d'Abomey-Calavi, she is developing an interpretable machine learning system for the early detection of chronic kidney disease, using clinical data from the nephrology department of CNHU-HKM, Benin's national referral hospital. Her work is supervised by Dr Vinasétan Ratheil HOUNDJI and co-supervised by Prof. Jacques Vigan, head of the nephrology and haemodialysis department at CNHU-HKM.",
    ],
    charges: ["Deputy head of IT, FRIARE", "Part-time lecturer, IFRI"],
  },
  {
    slug: "linuse-tikpon",
    nom: "Linuse Mevic Jézugnon TIKPON",
    statut: "PhD student",
    sujet: "Artificial intelligence applied to education and pedagogy",
    propos: [
      "A PhD student at LRSIA, she works on artificial intelligence applied to education, and to pedagogy in particular. She earned her master's degree at the Institute for Training and Research in Computer Science, Université d'Abomey-Calavi.",
      "She is now writing her doctoral thesis and teaching software engineering at IFRI, driven by a desire to make an impact, foster innovation and strive for excellence.",
    ],
    charges: ["Software engineering lecturer, IFRI"],
  },
  {
    slug: "marianne-omonlola-balogoun",
    nom: "Marianne Omonlola BALOGOUN",
    statut: "PhD student",
    sujet: "Machine learning for electromagnetic wave propagation",
    propos: [
      "A PhD student in information and communication technologies at the Institut de Mathématiques et de Sciences Physiques, she works, with the support of the PASET-RSIF grant, on modelling electromagnetic wave propagation in wireless communication networks using machine learning. She seeks to reconcile societal impact, by working on digital terrestrial television, and scientific impact, by studying cutting-edge technologies from 5G to 6G and beyond.",
      "She closely follows questions of ethics, responsibility and security in artificial intelligence, with the goal of promoting the use of emerging technologies for social good.",
    ],
    charges: [
      "Co-lead of the innovation, research and development department, FRIARE Africa",
      "Drive test engineer, URPHORAN",
      "Teaching assistant in artificial intelligence, IFRI, IMSP, Pigier and HECM",
    ],
  },
  {
    slug: "merveilleux-azihou",
    nom: "Merveilleux Gandaho AZIHOU",
    statut: "Master's student",
    sujet: "Modular software architectures for orchestrating machine learning models on EEG",
    propos: [
      "A master's student in software engineering at IFRI, he is a research intern at LRSIA, where he works on the design of modular software architectures for the orchestration of machine learning models applied to EEG signal analysis.",
      "He completed his undergraduate studies in computer systems and software engineering at Le Faucon de Calavi Higher School, graduating with highest honours and the jury's congratulations. He previously worked as a web developer at Case&Co. and an IT operations agent at Ressources Plus, and completed several academic internships in software engineering and web development. His research interests include software architecture, machine learning systems, scientific software engineering, explainable artificial intelligence, and extensible, reproducible software platforms for data analysis.",
    ],
  },
  {
    slug: "phoris-agbozognigbe",
    nom: "Phoris Andy AGBOZOGNIGBE",
    statut: "Research intern",
    sujet: "Artificial intelligence applied to academic research tooling",
    propos: [
      "A research intern at LRSIA, he works within the team on applied artificial intelligence for academic research tooling. He is completing a professional master's in information systems and networks at IFRI.",
      "During his internship he co-developed IFRI Mémoires, a semantic search platform that makes the institute's thesis archive genuinely discoverable, and produced a technology-watch report evaluating artificial intelligence tools for scientific literature review.",
      "Outside the lab he builds at the intersection of artificial intelligence, IT security, the internet of things and robotics, coordinates an AIoT club, cares about responsible artificial intelligence in African contexts and dabbles in game design. His work focuses on an internet of medical things architecture for the prevention of non-communicable diseases in constrained environments such as Benin.",
    ],
  },
  {
    slug: "livingstone-gbozo",
    nom: "Livingstone Othniel Mawunu GBOZO",
    statut: "Third-year undergraduate",
    sujet: "Design of an open-source EEG signal acquisition system",
    propos: [
      "A bachelor's student in embedded systems and the internet of things at IFRI, he is completing an academic internship at LRSIA, working on the design of an open-source EEG signal acquisition system.",
    ],
  },
  {
    slug: "peniel-ahouansou",
    nom: "Péniel AHOUANSOU",
    statut: "Third-year undergraduate and research intern",
    sujet: "Design of an EEG signal acquisition system",
    propos: [
      "A bachelor's student in embedded systems and the internet of things at IFRI since 2023, she is completing an academic internship at LRSIA on the design of an EEG signal acquisition system.",
      "She designs intelligent systems for real-world problems: edge artificial intelligence, health technology and the industrial internet of things.",
    ],
    charges: [
      "Team lead of the internet of things department, United Student Developers",
      "Contributor, FRIARE Africa",
      "Internet of things introductory workshop, Agence universitaire de la Francophonie",
    ],
  },
  {
    slug: "precieux-adanlienclounon",
    nom: "Précieux ADANLIENCLOUNON",
    statut: "Third-year undergraduate",
    sujet: "Data analysis for the prevention of chronic kidney disease",
    propos: [
      "A bachelor's student in artificial intelligence at IFRI, he is completing an academic internship at LRSIA, analysing data to find the features that matter for the prevention of chronic kidney disease.",
    ],
  },
];

function assembler(textes: Texte[]): Personne[] {
  return textes.map((texte) => ({ ...texte, ...SOCLE[texte.slug] }));
}

const listes: Record<Lang, Personne[]> = { fr: assembler(fr), en: assembler(en) };

/** L'équipe dans l'ordre où elle se lit : le responsable, puis les autres par rang. */
export function equipe(lang: Lang) {
  return listes[lang] ?? listes.fr;
}

export function personne(lang: Lang, slug: string | undefined) {
  return equipe(lang).find((membre) => membre.slug === slug);
}

/** Qui vient après, pour enchaîner d'un profil au suivant sans repasser par la liste. */
export function suivante(lang: Lang, slug: string) {
  const liste = equipe(lang);
  const rang = liste.findIndex((membre) => membre.slug === slug);
  if (rang < 0) return liste[0];
  return liste[(rang + 1) % liste.length];
}
