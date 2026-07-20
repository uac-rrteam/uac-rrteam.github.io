import { Hero } from "@/sections/Hero";
import { Laboratoire } from "@/sections/Laboratoire";

/**
 * Page d'accueil, en cours de transformation en landing complete : toutes les
 * sections (labo, equipe, recherche, evenements) s'empilent ici. Les Actualites
 * (blog) restent sur leur propre page.
 */
export function Home() {
  return (
    <>
      <Hero />
      <Laboratoire />
    </>
  );
}
