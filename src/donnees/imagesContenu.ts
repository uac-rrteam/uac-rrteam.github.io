import { champ, type Entete } from "./lireMarkdown";

const IMAGES = import.meta.glob(
  "../../content/**/images/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/**
 * Transforme un chemin relatif déclaré dans le Markdown en URL construite
 * par Vite. La même convention fonctionne pour chaque collection éditoriale.
 */
export function imageContenu(
  entete: Entete,
  collection: string,
  slug: string,
  variante = "",
): string | undefined {
  const declaree = champ(entete, "image").trim();
  if (!declaree) return undefined;
  if (/^(https?:)?\/\//.test(declaree) || declaree.startsWith("/")) {
    return variante ? undefined : declaree;
  }

  const chemin = declaree.replace(/^\.\//, "");
  const relative = variante
    ? chemin.replace(/(\.[^./]+)$/, `${variante}$1`)
    : chemin;
  const fin = `/content/${collection}/${slug}/${relative}`;
  return Object.entries(IMAGES).find(([chemin]) => chemin.endsWith(fin))?.[1];
}
