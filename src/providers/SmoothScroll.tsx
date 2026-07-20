import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll fluide (Lenis) branche sur GSAP ScrollTrigger.
 *
 * Pourquoi les deux ensemble : Lenis remplace le scroll natif par une
 * interpolation douce, mais du coup ScrollTrigger ne "voit" plus le vrai
 * defilement. On lui redonne la main a chaque frame de Lenis
 * (ScrollTrigger.update) et on laisse gsap.ticker piloter l'horloge de Lenis.
 * C'est ce couplage qui permet le parallax, le reveal de texte et le
 * chevauchement des sections sans a-coups.
 *
 * Accessibilite : si l'utilisateur demande moins de mouvement, on n'active
 * PAS le scroll fluide. Le site garde alors le defilement natif du navigateur.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Mode "lerp" plutot que "duration" : le scroll suit le doigt/la molette
    // de pres (lerp 0.1) au lieu de glisser longtemps apres l'arret. Plus
    // smooth ET plus reactif, sans la sensation de lourdeur.
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // gsap.ticker compte en secondes, Lenis attend des millisecondes.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
