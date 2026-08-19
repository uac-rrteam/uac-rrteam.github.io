import { Hero } from "@/sections/Hero";
import { HeroVeil } from "@/components/layout/HeroVeil";
import { Laboratoire } from "@/sections/Laboratoire";
import { Membres } from "@/sections/Membres";

/**
 * Page d'accueil, landing complete.
 *
 * Recouvrement du hero (facon gemini.google / SOVREAN) : le hero reste colle
 * en haut (`sticky`, z-0), et tout le contenu vient se poser DESSUS (`z-10`,
 * fond opaque). Le voile "brume qui monte" (HeroVeil) fait la transition entre
 * les deux, du bas vers le haut.
 */
export function Home() {
  return (
    <>
      <div className="sticky top-0 z-0 h-[100dvh] overflow-hidden">
        <Hero />
      </div>

      {/* Le contenu qui monte. Fond opaque pour couvrir entierement le hero
          (y compris les petits interstices entre panneaux). */}
      <div className="relative z-10 bg-background">
        <HeroVeil triggerId="hero" />
        <Laboratoire />
        <Membres />
      </div>
    </>
  );
}
