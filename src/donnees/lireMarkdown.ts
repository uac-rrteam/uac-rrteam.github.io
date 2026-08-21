/* Lecture des fichiers Markdown du dossier `content/`.

   Le principe tient en une phrase : un fichier déposé est une page publiée.
   Vite lit le dossier au moment de la construction, donc rien n'est cherché
   sur le réseau au chargement du site, et une faute de frappe dans un nom de
   fichier se voit à la construction plutôt que chez le visiteur.

   L'en-tête de chaque fichier est lu à la main. Une bibliothèque de plus pour
   quinze lignes de code ne se justifie pas, et celles qui existent supposent
   toutes un environnement Node, absent du navigateur. */

/** Ce qu'un fichier déclare entre les deux lignes de tirets. */
export type Entete = Record<string, string | string[]>;

export interface Article {
  /** Le nom du dossier de contenu : il sert d'adresse. */
  slug: string;
  langue: string;
  entete: Entete;
  /** Le texte, en Markdown, une fois l'en-tête retiré. */
  corps: string;
}

/**
 * Sépare l'en-tête du corps.
 *
 * Un fichier sans en-tête reste valable : il est simplement publié sans date
 * ni titre déclarés, et l'appelant décidera quoi en faire. Mieux vaut une
 * page incomplète qu'une page absente sans explication.
 */
export function separer(brut: string): { entete: Entete; corps: string } {
  const texte = brut.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  if (!texte.startsWith("---\n")) return { entete: {}, corps: texte.trim() };

  const fin = texte.indexOf("\n---", 4);
  if (fin === -1) return { entete: {}, corps: texte.trim() };

  const entete: Entete = {};
  for (const ligne of texte.slice(4, fin).split("\n")) {
    const coupure = ligne.indexOf(":");
    if (coupure === -1) continue;

    const cle = ligne.slice(0, coupure).trim();
    let valeur = ligne.slice(coupure + 1).trim();
    if (!cle) continue;

    // Les guillemets sont facultatifs : on les retire s'ils encadrent la valeur.
    if (
      (valeur.startsWith('"') && valeur.endsWith('"')) ||
      (valeur.startsWith("'") && valeur.endsWith("'"))
    ) {
      valeur = valeur.slice(1, -1);
    }

    // Une liste entre crochets, comme les mots-clés.
    if (valeur.startsWith("[") && valeur.endsWith("]")) {
      entete[cle] = valeur
        .slice(1, -1)
        .split(",")
        .map((morceau) => morceau.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    entete[cle] = valeur;
  }

  return { entete, corps: texte.slice(fin + 4).trim() };
}

/** Le premier mot d'une valeur d'en-tête, quand on en attend une seule. */
export function champ(entete: Entete, cle: string, defaut = ""): string {
  const valeur = entete[cle];
  if (Array.isArray(valeur)) return valeur[0] ?? defaut;
  return valeur ?? defaut;
}

/**
 * Rassemble les fichiers d'un dossier, rangés du plus récent au plus ancien.
 *
 * Le nom du fichier porte la langue : `mon-article/index.fr.md`. Sans elle, le
 * fichier est servi dans les deux langues, ce qui vaut mieux que de le laisser
 * invisible parce qu'une extension manquait.
 */
export function rassembler(fichiers: Record<string, string>, langue: string): Article[] {
  const articles: Article[] = [];

  for (const [chemin, brut] of Object.entries(fichiers)) {
    const segments = chemin.split("/");
    const nom = segments.pop() ?? "";
    const morceaux = nom.replace(/\.md$/, "").split(".");
    const langueDite = morceaux.length > 1 ? morceaux.pop()! : "";
    if (langueDite && langueDite !== langue) continue;

    const base = morceaux.join(".");
    const slug = base === "index" ? (segments.pop() ?? "") : base;

    const { entete, corps } = separer(brut);
    // Un brouillon reste dans le dépôt sans paraître sur le site.
    if (champ(entete, "brouillon") === "oui" || champ(entete, "draft") === "true") continue;

    articles.push({ slug, langue: langueDite || langue, entete, corps });
  }

  // La date de l'en-tête décide de l'ordre ; à défaut, le nom du fichier, que
  // la convention veut préfixé de sa date.
  return articles.sort((a, b) => {
    const da = champ(a.entete, "date") || a.slug;
    const db = champ(b.entete, "date") || b.slug;
    return db.localeCompare(da);
  });
}
