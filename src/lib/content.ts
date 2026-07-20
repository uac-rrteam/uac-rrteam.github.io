import type { Lang } from "@/i18n/dictionary";

/**
 * Chargement des articles depuis content/blog/*.md.
 *
 * Regle du projet : ajouter un article = deposer un fichier .md dans
 * content/blog/. Aucun code a toucher. Vite les ramasse tous a la
 * compilation via import.meta.glob : la liste n'est ecrite nulle part.
 *
 * Convention de nom : <slug>.<lang>.md  (ex: cp4sd-2025.fr.md).
 * La langue est deduite du nom, pas d'un champ a remplir a la main.
 */

export interface Article {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  summary: string;
  author?: string;
  cover?: string;
  tags: string[];
  /** Corps Markdown, sans le frontmatter. */
  body: string;
}

// eager: true -> les fichiers sont inlines dans le bundle. Un site vitrine a
// peu d'articles ; pas besoin de charger chaque .md en requete separee.
const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Parseur de frontmatter minimal (bloc --- en tete).
 * Volontairement simple : cle: valeur par ligne, et les tags en liste
 * "[a, b, c]". Pas de YAML complet, on n'en a pas besoin et une lib de plus
 * serait du poids pour rien.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }
  return { data, body: match[2] };
}

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const articles: Article[] = Object.entries(files)
  .map(([path, raw]) => {
    const name = path.split("/").pop() ?? "";
    const [slug, lang] = name.replace(/\.md$/, "").split(".");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      lang: (lang === "en" ? "en" : "fr") as Lang,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      author: data.author,
      cover: data.cover,
      tags: parseTags(data.tags),
      body: body.trim(),
    };
  })
  // Plus recent d'abord.
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Tous les articles d'une langue, du plus recent au plus ancien. */
export function listArticles(lang: Lang): Article[] {
  const inLang = articles.filter((a) => a.lang === lang);
  // Repli sur le francais si une langue n'a encore aucun article traduit.
  return inLang.length > 0 ? inLang : articles.filter((a) => a.lang === "fr");
}

/** Un article precis, avec repli sur la version francaise si besoin. */
export function getArticle(slug: string, lang: Lang): Article | undefined {
  return (
    articles.find((a) => a.slug === slug && a.lang === lang) ??
    articles.find((a) => a.slug === slug && a.lang === "fr")
  );
}
