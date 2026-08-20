import type { Lang } from "@/i18n/dictionary";

/* Les actualités de l'équipe.

   Relevé sur ratheil.info, section « Actualités et activités », dans les deux
   langues du site. Chaque entrée garde sa date d'origine et ses liens ; rien
   n'est reformulé au-delà de ce que la source dit.

   Les entrées sont dans l'ordre du plus récent au plus ancien, celui de la
   source. L'ordre est porté par le tableau, pas par un tri : une date de mois
   ne se trie pas sans inventer un jour. */

export interface Actualite {
  /** L'identifiant sert de clé stable, la date affichée reste du texte. */
  cle: string;
  quand: string;
  titre: string;
  dit: string;
  liens?: { intitule: string; vers: string }[];
}

export interface Actualites {
  titre: string;
  chapo: string;
  entrees: Actualite[];
  ailleursTitre: string;
  ailleurs: { intitule: string; vers: string }[];
}

/** Les répertoires où suivre la production complète, hors du site. */
const AILLEURS = [
  { intitule: "Le site du BWAI", vers: "https://bwai-ifri-uac.bj/" },
  { intitule: "FRIARE", vers: "https://friare.org" },
  { intitule: "L'IFRI", vers: "https://uac-ifri.bj/" },
  { intitule: "La chaîne des démonstrations", vers: "https://www.youtube.com/channel/UC24YKysMzmerMK2a1PSlYwA" },
];

const fr: Actualites = {
  titre: "Actualités",
  chapo:
    "Ce que l'équipe prépare, présente et anime. Les entrées les plus récentes d'abord.",
  entrees: [
    {
      cle: "bwai-2026",
      quand: "Novembre 2026",
      titre: "BWAI 2026, préparation de la prochaine édition",
      dit: "En qualité de general chair, préparation du prochain Benin Workshop on Artificial Intelligence, prévu du 23 au 27 novembre 2026. L'événement réunit chercheurs, étudiants, professionnels et acteurs publics autour de la recherche, de la formation et des usages de l'intelligence artificielle au Bénin.",
      liens: [{ intitule: "Le site du BWAI", vers: "https://bwai-ifri-uac.bj/" }],
    },
    {
      cle: "cari-2026",
      quand: "Octobre 2026",
      titre: "CARI 2026, à venir",
      dit: "La 18e édition du Colloque africain sur la recherche en informatique et les mathématiques appliquées se tiendra du 21 au 24 octobre à l'Université d'Abomey-Calavi. Ce rendez-vous scientifique panafricain est consacré aux avancées de la recherche et à leurs applications.",
      liens: [{ intitule: "Le site du CARI 2026", vers: "https://cari-conf.bj/" }],
    },
    {
      cle: "opencs4dev-forces",
      quand: "Septembre 2026",
      titre: "Coordination des projets OpenCS4Dev et ForCES",
      dit: "Coordination Sud de deux projets soutenus par l'ARES. OpenCS4Dev vise la production et la mutualisation de ressources pédagogiques ouvertes pour l'enseignement de l'informatique. ForCES, mené avec l'ULB et l'Université Cheikh Anta Diop de septembre 2026 à août 2028, doit co-construire une infrastructure de formation continue en pédagogie universitaire numérique au Bénin et au Sénégal.",
    },
    {
      cle: "neuro-symbolique",
      quand: "Août 2026",
      titre: "Intelligence artificielle neuro-symbolique : concepts et applications",
      dit: "Communication présentée à l'École d'été sur l'intelligence artificielle de Bénin Excellence. Une introduction à la complémentarité entre apprentissage neuronal et raisonnement symbolique, aux principales architectures neuro-symboliques et à leurs applications en santé, agriculture, éducation, cybersécurité et optimisation.",
    },
    {
      cle: "gouvernance",
      quand: "Juillet 2026",
      titre: "Gouvernance responsable de l'intelligence artificielle dans l'enseignement supérieur africain",
      dit: "Communication présentée au colloque « IA, éducation et éthique » de la Commission permanente Éducation et Éthique de l'Académie nationale des sciences, arts et lettres du Bénin. Elle propose des principes, des dispositifs de gouvernance et un cycle opérationnel fondés sur les risques, la souveraineté des données, l'intégrité académique, l'audit et les voies de recours.",
    },
    {
      cle: "ia-parcours",
      quand: "Juillet 2026",
      titre: "L'IA au service de mon parcours académique : opportunités et pièges à éviter",
      dit: "Atelier animé lors du lancement de la stratégie d'intelligence artificielle de l'Université d'Abomey-Calavi. Destiné aux étudiants, il aborde l'usage académique responsable de l'IA générative, la formulation des requêtes, les biais, les hallucinations, la confidentialité, la déclaration des usages, ainsi que les droits et obligations prévus par le cadre éthique de l'UAC.",
    },
    {
      cle: "fipun-icteam",
      quand: "Mai 2026",
      titre: "Expertise et enseignement international",
      dit: "Contribution à la stratégie nationale de l'éducation fondée sur le numérique. Intervention comme formateur à la FIPUN auprès d'enseignants-chercheurs de neuf pays, et séjour comme professeur invité à l'institut ICTEAM de l'UCLouvain pour des échanges scientifiques en intelligence artificielle et en optimisation.",
      liens: [{ intitule: "ICTEAM, UCLouvain", vers: "https://www.uclouvain.be/en/research-institutes/icteam" }],
    },
    {
      cle: "acp-2025",
      quand: "Août 2025",
      titre: "20e école d'été de l'ACP, première édition africaine",
      dit: "General chair et coorganisateur avec John Aoga de l'école tenue du 25 au 29 août à l'IFRI. Consacrée à la programmation par contraintes pour le développement durable, elle a réuni cinquante participants, dont 86 % d'Africains, et attribué quatorze bourses complètes et trente bourses partielles.",
    },
  ],
  ailleursTitre: "Suivre l'équipe",
  ailleurs: AILLEURS,
};

const en: Actualites = {
  titre: "News",
  chapo: "What the team is preparing, presenting and running. Most recent first.",
  entrees: [
    {
      cle: "bwai-2026",
      quand: "November 2026",
      titre: "BWAI 2026, preparing the next edition",
      dit: "As general chair, preparation of the next Benin Workshop on Artificial Intelligence, taking place from 23 to 27 November 2026. The event brings together researchers, students, professionals and public-sector actors around AI research, education and applications in Benin.",
      liens: [{ intitule: "The BWAI website", vers: "https://bwai-ifri-uac.bj/" }],
    },
    {
      cle: "cari-2026",
      quand: "October 2026",
      titre: "CARI 2026, coming soon",
      dit: "The 18th African Conference on Research in Computer Science and Applied Mathematics will take place from 21 to 24 October at the University of Abomey-Calavi. This pan-African scientific forum is devoted to research advances and their applications.",
      liens: [{ intitule: "The CARI 2026 website", vers: "https://cari-conf.bj/" }],
    },
    {
      cle: "opencs4dev-forces",
      quand: "September 2026",
      titre: "Coordination of the OpenCS4Dev and ForCES projects",
      dit: "Southern coordination of two ARES-supported projects. OpenCS4Dev develops and shares open educational resources for computer science teaching. ForCES, conducted with ULB and Cheikh Anta Diop University from September 2026 to August 2028, will co-design a continuing professional development infrastructure for digital university pedagogy in Benin and Senegal.",
    },
    {
      cle: "neuro-symbolique",
      quand: "August 2026",
      titre: "Neuro-symbolic artificial intelligence: concepts and applications",
      dit: "Talk delivered at the Benin Excellence Summer School on Artificial Intelligence. An introduction to the complementary strengths of neural learning and symbolic reasoning, the main neuro-symbolic architectures, and their applications in health, agriculture, education, cybersecurity and optimization.",
    },
    {
      cle: "gouvernance",
      quand: "July 2026",
      titre: "Responsible governance of artificial intelligence in African higher education",
      dit: "Talk delivered at the “AI, Education and Ethics” symposium of the Permanent Commission on Education and Ethics of Benin's National Academy of Sciences, Arts and Letters. It proposes governance principles, institutional mechanisms and an operational cycle covering risk levels, data sovereignty, academic integrity, auditing and avenues for appeal.",
    },
    {
      cle: "ia-parcours",
      quand: "July 2026",
      titre: "AI in support of my academic journey: opportunities and pitfalls",
      dit: "Workshop delivered during the launch of the University of Abomey-Calavi's artificial intelligence strategy. Designed for students, it covers responsible academic use of generative AI, prompt design, bias, hallucinations, confidentiality, disclosure of AI use, and the rights and obligations set by UAC's ethical framework.",
    },
    {
      cle: "fipun-icteam",
      quand: "May 2026",
      titre: "Expertise and international teaching",
      dit: "Contribution to the national digital education strategy. Delivery of FIPUN training for lecturers and researchers from nine countries, and a visiting professorship at UCLouvain's ICTEAM institute for scientific exchanges in artificial intelligence and optimization.",
      liens: [{ intitule: "ICTEAM, UCLouvain", vers: "https://www.uclouvain.be/en/research-institutes/icteam" }],
    },
    {
      cle: "acp-2025",
      quand: "August 2025",
      titre: "20th ACP Summer School, first African edition",
      dit: "General chair and co-organizer with John Aoga of the school held from 25 to 29 August at IFRI. Devoted to constraint programming for sustainable development, it welcomed fifty participants, 86% of them African, and awarded fourteen full and thirty partial scholarships.",
    },
  ],
  ailleursTitre: "Follow the team",
  ailleurs: [
    { intitule: "The BWAI website", vers: "https://bwai-ifri-uac.bj/" },
    { intitule: "FRIARE", vers: "https://friare.org" },
    { intitule: "IFRI", vers: "https://uac-ifri.bj/" },
    { intitule: "The demonstrations channel", vers: "https://www.youtube.com/channel/UC24YKysMzmerMK2a1PSlYwA" },
  ],
};

export function actualites(lang: Lang): Actualites {
  return lang === "en" ? en : fr;
}
