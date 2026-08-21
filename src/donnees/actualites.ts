import type { Lang } from "@/i18n/dictionary";
import { champ, rassembler } from "./lireMarkdown";
import { imageContenu } from "./imagesContenu";

const FICHIERS = import.meta.glob("../../content/actualites/*/index.*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export interface Actualite {
  cle: string;
  date: string;
  quand: string;
  titre: string;
  image?: string;
  dit: string;
  liens?: { intitule: string; vers: string }[];
}

/** Structure les nouvelles intégrées à la chronologie des événements. */
export function actualites(lang: Lang): Actualite[] {
  return rassembler(FICHIERS, lang).map((article) => {
    const liens: { intitule: string; vers: string }[] = [];
    for (let rang = 1; rang <= 4; rang += 1) {
      const brut = champ(article.entete, `lien${rang}`);
      if (!brut.includes("|")) continue;
      const [intitule, vers] = brut.split("|");
      liens.push({ intitule: intitule.trim(), vers: vers.trim() });
    }
    return {
      cle: article.slug,
      date: champ(article.entete, "date"),
      quand: champ(article.entete, "periode") || champ(article.entete, "date"),
      titre: champ(article.entete, "titre") || champ(article.entete, "title") || article.slug,
      image: imageContenu(article.entete, "actualites", article.slug),
      dit: article.corps,
      liens: liens.length ? liens : undefined,
    };
  });
}
