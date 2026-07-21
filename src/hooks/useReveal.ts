import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Revele au scroll les elements marques [data-reveal] dans le conteneur.
 * Entree "lourde" facon agence : montee ample, fondu et leger flou qui se
 * resorbe, sur une courbe a forte deceleration (power4.out). Chaque element se
 * declenche a son entree dans le viewport, une seule fois.
 * Respecte prefers-reduced-motion (rien ne bouge, tout reste visible).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((item) => {
        gsap.from(item, {
          y: 44,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
