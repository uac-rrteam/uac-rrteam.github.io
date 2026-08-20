import { JaugeDefilement, type Repere } from "@/components/layout/JaugeDefilement";
import { VoletRevelation } from "@/components/likova/VoletRevelation";
import { PiedDePage } from "@/components/layout/PiedDePage";
import { Ouverture } from "@/sections/Ouverture";
import { These } from "@/sections/These";
import { Chiffres, type Chiffre } from "@/sections/Chiffres";
import { Domaines, type Domaine } from "@/sections/Domaines";
import { Direction, type Meneur } from "@/sections/Direction";
import { useLang } from "@/i18n/lang";

/* Le contenu de l'accueil. Il bouge peu et tient sur une page, il reste donc
   ici ; ce qui s'ajoute au fil du temps (personnes, actualités, événements)
   vit en Markdown dans content/, jamais dans un composant.

   Sources : assets/docs/about-ratheil-team-work.md pour les domaines,
   about-lrsia.md et events.md pour les chiffres. Aucun n'est arrondi. */

interface Contenu {
  ouverture: string[][];
  /* L'écran de raccord du R229 : quatre repères, pas une section de plus. */
  raccord: { cle: string; valeur: string }[];
  /* La troisième étape de l'ouverture, sur téléphone seulement : une fois le
     nom et l'identité passés, elle dit à quoi tout cela sert. */
  ouvertureTierce: string[];
  these: string;
  signature: string;
  chiffres: Chiffre[];
  domaines: Domaine[];
  meneur: Meneur;
  reperes: Repere[];
}

const fr: Contenu = {
  ouverture: [
    ["L'intelligence artificielle", "au service de l'impact sociétal"],
    ["Équipe de recherche du LRSIA,", "à l'IFRI, Université d'Abomey-Calavi,", "Cotonou"],
  ],
  ouvertureTierce: ["Agriculture, santé,", "éducation, optimisation", "pour le bien commun"],
  raccord: [
    { cle: "L'équipe", valeur: "Ratheil Research Team" },
    { cle: "Le laboratoire", valeur: "LRSIA, IFRI" },
    { cle: "L'université", valeur: "Abomey-Calavi" },
    { cle: "L'indicatif", valeur: "Bénin, 229" },
  ],
  these:
    "Nous concevons des méthodes d'intelligence artificielle et d'optimisation combinatoire pour des problèmes concrets, dans un contexte de ressources limitées.",
  signature: "Équipe animée par le Dr Vinasétan Ratheil HOUNDJI, LRSIA, IFRI, Université d'Abomey-Calavi",
  chiffres: [
    {
      valeur: "2017",
      libelle: "Le laboratoire mène ses recherches",
      precision: "depuis",
      note: "LRSIA, Laboratoire de Recherche en Sciences Informatiques et Applications, à l'IFRI",
      illustration: "elevation",
    },
    {
      valeur: "4",
      libelle: "Les travaux de l'équipe se répartissent",
      precision: "en",
      note: "Domaines : agriculture, santé, éducation, optimisation pour le bien commun",
      illustration: "reseau",
    },
    {
      valeur: "5",
      libelle: "Le Benin Workshop on Artificial Intelligence compte",
      precision: "déjà",
      note: "Éditions, la cinquième du 23 au 27 novembre 2026 à l'UAC",
      illustration: "sigle",
      embleme: {
        fichier: "logobwai",
        alt: "Logo du Benin Workshop on Artificial Intelligence",
        vers: "https://bwai-ifri-uac.bj/",
      },
    },
    {
      valeur: "2025",
      libelle: "L'école d'été de l'Association for Constraint Programming s'est tenue au Bénin",
      precision: "en",
      note: "Constraint Programming for Sustainable Development, cinq jours à l'IFRI",
      illustration: "tournee",
    },
  ],
  domaines: [
    {
      motif: "parcelle",
      titre: ["L'intelligence artificielle", "pour l'agriculture"],
      sujets: [
        "Modélisation des rendements",
        "Détection des maladies des cultures",
        "Détection des ravageurs",
      ],
    },
    {
      motif: "signal",
      titre: ["L'intelligence artificielle", "pour la santé"],
      sujets: [
        "Maladies cardiovasculaires",
        "Maladie rénale chronique",
        "Maladies non transmissibles",
        "Épilepsie",
      ],
    },
    {
      motif: "cohorte",
      titre: ["L'intelligence artificielle", "pour l'éducation"],
      sujets: [
        "Analyse des performances des étudiants",
        "Détection de la triche",
        "Systèmes de recommandation pour l'apprentissage",
      ],
    },
    {
      motif: "graphe",
      titre: ["L'optimisation", "pour le bien commun"],
      sujets: [
        "Équité des jeux de données et des modèles",
        "Tournées de véhicules appliquées à la logistique",
      ],
    },
  ],
  meneur: {
    nom: "Vinasétan Ratheil HOUNDJI",
    fonction: "Maître de conférences CAMES en intelligence artificielle",
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
    versEquipe: "Toute l'équipe",
  },
  reperes: [
    { id: "ouverture", titre: "Ouverture" },
    { id: "these", titre: "Ce que nous cherchons" },
    { id: "chiffres", titre: "En chiffres" },
    { id: "domaines", titre: "Nos domaines" },
    { id: "direction", titre: "Qui nous mène" },
  ],
};

const en: Contenu = {
  ouverture: [
    ["Artificial Intelligence", "for Societal Impact"],
    ["A research team of the LRSIA,", "at IFRI, Université d'Abomey-Calavi,", "Cotonou"],
  ],
  ouvertureTierce: ["Agriculture, health,", "education, optimisation", "for the common good"],
  raccord: [
    { cle: "The team", valeur: "Ratheil Research Team" },
    { cle: "The laboratory", valeur: "LRSIA, IFRI" },
    { cle: "The university", valeur: "Abomey-Calavi" },
    { cle: "The dialling code", valeur: "Benin, 229" },
  ],
  these:
    "We design artificial intelligence and combinatorial optimisation methods for concrete problems, in a resource-constrained setting.",
  signature: "Team led by Dr Vinasétan Ratheil HOUNDJI, LRSIA, IFRI, Université d'Abomey-Calavi",
  chiffres: [
    {
      valeur: "2017",
      libelle: "The laboratory has been running its research",
      precision: "since",
      note: "LRSIA, Laboratoire de Recherche en Sciences Informatiques et Applications, at IFRI",
      illustration: "elevation",
    },
    {
      valeur: "4",
      libelle: "The team's work is spread across",
      precision: "",
      note: "Areas: agriculture, health, education, optimisation for the common good",
      illustration: "reseau",
    },
    {
      valeur: "5",
      libelle: "The Benin Workshop on Artificial Intelligence already counts",
      precision: "",
      note: "Editions, the fifth from 23 to 27 November 2026 at UAC",
      illustration: "sigle",
      embleme: {
        fichier: "logobwai",
        alt: "Benin Workshop on Artificial Intelligence logo",
        vers: "https://bwai-ifri-uac.bj/",
      },
    },
    {
      valeur: "2025",
      libelle: "The Association for Constraint Programming summer school was hosted in Benin",
      precision: "in",
      note: "Constraint Programming for Sustainable Development, five days at IFRI",
      illustration: "tournee",
    },
  ],
  domaines: [
    {
      motif: "parcelle",
      titre: ["Artificial intelligence", "for agriculture"],
      sujets: ["Yield modelling", "Crop disease detection", "Pest detection"],
    },
    {
      motif: "signal",
      titre: ["Artificial intelligence", "for health"],
      sujets: [
        "Cardiovascular disease",
        "Chronic kidney disease",
        "Non-communicable diseases",
        "Epilepsy",
      ],
    },
    {
      motif: "cohorte",
      titre: ["Artificial intelligence", "for education"],
      sujets: [
        "Student performance analysis",
        "Cheating detection",
        "Recommender systems for learning",
      ],
    },
    {
      motif: "graphe",
      titre: ["Optimisation", "for the common good"],
      sujets: ["Fairness of datasets and models", "Vehicle routing applied to logistics"],
    },
  ],
  meneur: {
    nom: "Vinasétan Ratheil HOUNDJI",
    fonction: "Associate professor (CAMES) in artificial intelligence",
    propos: [
      "He holds a PhD in engineering sciences from UCLouvain and Université d'Abomey-Calavi, awarded in 2017, and works on machine learning, constraint programming and combinatorial optimisation, with applications in health, agriculture and education.",
      "Over ten years of fundamental and applied research, and a lasting commitment to teaching, mentoring and the scientific collaborations that advance artificial intelligence across Africa.",
    ],
    charges: [
      "Head of the software engineering department, IFRI",
      "Coordinator of the bachelor's and master's programmes, IFRI",
      "President of the FRIARE association",
      "General chairman of the Benin Workshop on Artificial Intelligence",
    ],
    versEquipe: "Meet the team",
  },
  reperes: [
    { id: "ouverture", titre: "Opening" },
    { id: "these", titre: "What we work on" },
    { id: "chiffres", titre: "In numbers" },
    { id: "domaines", titre: "Our areas" },
    { id: "direction", titre: "Who leads us" },
  ],
};

/**
 * L'accueil.
 *
 * Quatre écrans, une idée par écran : qui nous sommes, ce que nous cherchons,
 * ce que ça pèse, sur quoi nous travaillons.
 */
export function Accueil() {
  const { lang } = useLang();
  const contenu = lang === "en" ? en : fr;

  return (
    <>
      <JaugeDefilement reperes={contenu.reperes} />
      <Ouverture these={contenu.ouverture} tierce={contenu.ouvertureTierce} />
      <These texte={contenu.these} signature={contenu.signature} />
      <Chiffres chiffres={contenu.chiffres} />
      {/* Le passage du gris os au bleu nuit est le seul moment du site où une
          section s'ouvre par-dessus la précédente. */}
      <VoletRevelation cible="domaines" panneau=".dom-panneau" reperes={contenu.raccord} />
      <Domaines domaines={contenu.domaines} />
      <Direction meneur={contenu.meneur} />
      {/* Le pied de page appartient à l'accueil : c'est lui qui conclut le
          parcours. Les autres pages se terminent sur leur propre sortie. */}
      <PiedDePage />
    </>
  );
}
