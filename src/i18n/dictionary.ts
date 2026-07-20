/** Les deux langues du site. Le francais est la langue par defaut. */
export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

/* Un seul objet par langue, mises a plat par cle "section.champ".
   Le francais fait foi : toute cle absente de l'anglais retombe dessus
   (voir traduire() dans lang.tsx). */
const fr = {
  "nav.lab": "Le laboratoire",
  "nav.team": "L'equipe",
  "nav.research": "Recherche",
  "nav.people": "Membres",
  "nav.events": "Evenements",
  "nav.blog": "Actualites",

  "hero.eyebrow": "LRSIA, IFRI, Universite d'Abomey-Calavi",
  "hero.title": "L'intelligence artificielle au service de l'impact societal",
  "hero.lead":
    "La Ratheil Research Team concoit des methodes d'intelligence artificielle et d'optimisation combinatoire pour des problemes concrets, dans un contexte de ressources limitees.",
  "hero.lead2": "Agriculture, sante, education, optimisation pour le bien commun.",
  "hero.cta": "Decouvrir nos travaux",
  "hero.ctaSecondary": "Rencontrer l'equipe",
  "hero.ledBy": "Equipe animee par le Dr Vinasetan Ratheil Houndji",
} as const;

const en: Partial<Record<keyof typeof fr, string>> = {
  "nav.lab": "The lab",
  "nav.team": "The team",
  "nav.research": "Research",
  "nav.people": "People",
  "nav.events": "Events",
  "nav.blog": "News",

  "hero.eyebrow": "LRSIA, IFRI, University of Abomey-Calavi",
  "hero.title": "Artificial Intelligence for Societal Impact",
  "hero.lead":
    "The Ratheil Research Team designs artificial intelligence and combinatorial optimisation methods for concrete problems, in a low-resource setting.",
  "hero.lead2": "Agriculture, health, education, optimisation for the common good.",
  "hero.cta": "Explore our work",
  "hero.ctaSecondary": "Meet the team",
  "hero.ledBy": "Team led by Dr Vinasetan Ratheil Houndji",
};

export type TranslationKey = keyof typeof fr;

export const dictionaries = { fr, en } as const;
