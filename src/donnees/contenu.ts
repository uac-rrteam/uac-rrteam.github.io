import type { Lang } from "@/i18n/dictionary";
import { champ, rassembler, type Article, type Entete } from "./lireMarkdown";

const PERSONNES = import.meta.glob("../../content/people/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const PROJETS = import.meta.glob("../../content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const EVENEMENTS = import.meta.glob("../../content/events/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const PAGES = import.meta.glob("../../content/pages/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export interface LienContenu {
  intitule: string;
  vers: string;
}

function liens(entete: Entete): LienContenu[] {
  const resultat: LienContenu[] = [];
  for (let rang = 1; rang <= 8; rang += 1) {
    const valeur = champ(entete, `lien${rang}`);
    const coupure = valeur.indexOf("|");
    if (coupure < 0) continue;
    resultat.push({
      intitule: valeur.slice(0, coupure).trim(),
      vers: valeur.slice(coupure + 1).trim(),
    });
  }
  return resultat;
}

function nombre(entete: Entete, cle: string, defaut = 999): number {
  const valeur = Number(champ(entete, cle));
  return Number.isFinite(valeur) ? valeur : defaut;
}

function avecRepli(fichiers: Record<string, string>, lang: Lang): Article[] {
  const demandes = rassembler(fichiers, lang);
  const francais = lang === "fr" ? [] : rassembler(fichiers, "fr");
  const slugs = new Set(demandes.map((article) => article.slug));
  return [...demandes, ...francais.filter((article) => !slugs.has(article.slug))];
}

export interface PersonneContenu {
  slug: string;
  nom: string;
  statut: string;
  sujet: string;
  arrivee?: number;
  portrait?: string;
  ordre: number;
  projets: string[];
  liens: LienContenu[];
  corps: string;
}

export function personnes(lang: Lang): PersonneContenu[] {
  return avecRepli(PERSONNES, lang)
    .map((article) => ({
      slug: article.slug,
      nom: champ(article.entete, "nom") || article.slug,
      statut: champ(article.entete, "statut"),
      sujet: champ(article.entete, "sujet"),
      arrivee: champ(article.entete, "arrivee")
        ? nombre(article.entete, "arrivee")
        : undefined,
      portrait: champ(article.entete, "portrait") || undefined,
      ordre: nombre(article.entete, "ordre"),
      projets: Array.isArray(article.entete.projets) ? article.entete.projets : [],
      liens: liens(article.entete),
      corps: article.corps,
    }))
    .sort((a, b) => a.ordre - b.ordre || a.nom.localeCompare(b.nom));
}

export function personne(lang: Lang, slug: string | undefined): PersonneContenu | undefined {
  return personnes(lang).find((membre) => membre.slug === slug);
}

export function personneSuivante(lang: Lang, slug: string): PersonneContenu {
  const membres = personnes(lang);
  const rang = membres.findIndex((membre) => membre.slug === slug);
  return membres[(rang + 1 + membres.length) % membres.length];
}

export interface ProjetContenu {
  slug: string;
  titre: string;
  periode: string;
  role?: string;
  financement?: string;
  collaborateurs: string[];
  resume: string;
  ordre: number;
  liens: LienContenu[];
  corps: string;
}

export function projets(lang: Lang): ProjetContenu[] {
  return avecRepli(PROJETS, lang)
    .map((article) => ({
      slug: article.slug,
      titre: champ(article.entete, "titre") || champ(article.entete, "title") || article.slug,
      periode: champ(article.entete, "periode") || champ(article.entete, "period"),
      role: champ(article.entete, "role") || undefined,
      financement: champ(article.entete, "financement") || undefined,
      collaborateurs: Array.isArray(article.entete.collaborateurs)
        ? article.entete.collaborateurs
        : [],
      resume: champ(article.entete, "resume") || champ(article.entete, "summary"),
      ordre: nombre(article.entete, "ordre"),
      liens: liens(article.entete),
      corps: article.corps,
    }))
    .sort((a, b) => a.ordre - b.ordre || a.titre.localeCompare(b.titre));
}

export function projet(lang: Lang, slug: string | undefined): ProjetContenu | undefined {
  return projets(lang).find((item) => item.slug === slug);
}

export interface EvenementContenu {
  slug: string;
  titre: string;
  date: string;
  periode: string;
  lieu: string;
  resume: string;
  ordre: number;
  liens: LienContenu[];
  corps: string;
}

export function evenementsContenu(lang: Lang): EvenementContenu[] {
  return avecRepli(EVENEMENTS, lang)
    .map((article) => ({
      slug: article.slug,
      titre: champ(article.entete, "titre") || champ(article.entete, "title") || article.slug,
      date: champ(article.entete, "date"),
      periode: champ(article.entete, "periode") || champ(article.entete, "period"),
      lieu: champ(article.entete, "lieu") || champ(article.entete, "place"),
      resume: champ(article.entete, "resume") || champ(article.entete, "summary"),
      ordre: nombre(article.entete, "ordre", 0),
      liens: liens(article.entete),
      corps: article.corps,
    }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.ordre - b.ordre);
}

export function evenement(lang: Lang, slug: string | undefined): EvenementContenu | undefined {
  return evenementsContenu(lang).find((item) => item.slug === slug);
}

export interface PageContenu {
  titre: string;
  resume: string;
  corps: string;
}

export function pageContenu(lang: Lang, slug: string): PageContenu | undefined {
  const article = avecRepli(PAGES, lang).find((item) => item.slug === slug);
  if (!article) return undefined;
  return {
    titre: champ(article.entete, "titre") || champ(article.entete, "title") || slug,
    resume: champ(article.entete, "resume") || champ(article.entete, "summary"),
    corps: article.corps,
  };
}
