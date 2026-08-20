import type { Lang } from "@/i18n/dictionary";
import { champ, rassembler } from "./lireMarkdown";

/* Les actualités de l'équipe.

   Le contenu ne vit plus dans ce fichier : chaque nouvelle est un fichier
   Markdown de `content/actualites/`, et le déposer suffit à la publier. Ce
   module ne garde que les libellés de la page.

   La marche à suivre est écrite dans `PUBLIER.md`, à la racine du dépôt.

   Les fichiers sont lus au moment de la construction, pas au chargement de la
   page : rien ne part sur le réseau chez le visiteur, et une faute dans un nom
   de fichier se voit au build plutôt que chez lui. */
const FICHIERS = import.meta.glob("../../content/actualites/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

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
  entrees: [],
  ailleursTitre: "Suivre l'équipe",
  ailleurs: AILLEURS,
};

const en: Actualites = {
  titre: "News",
  chapo: "What the team is preparing, presenting and running. Most recent first.",
  entrees: [],
  ailleursTitre: "Follow the team",
  ailleurs: [
    { intitule: "The BWAI website", vers: "https://bwai-ifri-uac.bj/" },
    { intitule: "FRIARE", vers: "https://friare.org" },
    { intitule: "IFRI", vers: "https://uac-ifri.bj/" },
    { intitule: "The demonstrations channel", vers: "https://www.youtube.com/channel/UC24YKysMzmerMK2a1PSlYwA" },
  ],
};

export function actualites(lang: Lang): Actualites {
  const mots = lang === "en" ? en : fr;

  const entrees: Actualite[] = rassembler(FICHIERS, lang).map((article) => {
    // Les liens se déclarent lien1, lien2… sous la forme « intitulé | adresse ».
    const liens: { intitule: string; vers: string }[] = [];
    for (let rang = 1; rang <= 4; rang += 1) {
      const brut = champ(article.entete, `lien${rang}`);
      if (!brut.includes("|")) continue;
      const [intitule, vers] = brut.split("|");
      liens.push({ intitule: intitule.trim(), vers: vers.trim() });
    }

    return {
      cle: article.slug,
      quand: champ(article.entete, "periode") || champ(article.entete, "date"),
      titre: champ(article.entete, "titre") || champ(article.entete, "title") || article.slug,
      dit: article.corps,
      liens: liens.length ? liens : undefined,
    };
  });

  return { ...mots, entrees };
}
