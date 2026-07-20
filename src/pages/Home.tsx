import { Hero } from "@/sections/Hero";

/**
 * Page d'accueil.
 * Pour l'instant : la section d'ouverture seule. Les sections a effet
 * (parallax de recouvrement, reveal de texte grise, vitrine des travaux,
 * projets horizontaux qui se chevauchent) viendront s'empiler ici, dans
 * l'ordre de la maquette de reference, une fois l'architecture validee.
 */
export function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
