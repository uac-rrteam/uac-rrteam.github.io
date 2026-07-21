import { Hero } from "@/sections/Hero";
import { Laboratoire } from "@/sections/Laboratoire";
import { Membres } from "@/sections/Membres";

/**
 * Page d'accueil, en cours de transformation en landing complete : toutes les
 * sections (labo, equipe, recherche, evenements) s'empilent ici. Les Actualites
 * (blog) restent sur leur propre page.
 */
export function Home() {
  return (
    <>
      {/* Parallax de recouvrement facon reference : le hero reste epingle
          (sticky) pendant que la section suivante remonte par-dessus. */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
        <div className="relative z-10">
          <Laboratoire />
        </div>
      </div>
      <Membres />
    </>
  );
}
