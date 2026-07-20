import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Revele au scroll les elements marques [data-reveal] dans le conteneur.
 * Base commune des entrees de section : montee douce + fondu, en cascade.
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
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
