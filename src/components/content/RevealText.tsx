import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Un mot du texte revele. `color` teinte le mot avec la charte du logo :
 * "blue" = bleu LRSIA, "red" = rouge LRSIA. Sinon il prend la couleur du texte.
 */
export interface Token {
  text: string;
  color?: "blue" | "red";
}

/**
 * Texte grand format qui se revele au scroll : chaque mot part faible (donc
 * gris) et monte en pleine opacite au fil du defilement, en cascade. Comme la
 * couleur finale est deja posee (blanc/noir, ou bleu/rouge pour les mots de
 * marque), l'opacite fait tout : faible = gris, pleine = teinte vive.
 *
 * C'est l'effet de la reference : le texte "s'allume" a mesure qu'on descend.
 * Respecte prefers-reduced-motion (tout est affiche, sans animation).
 */
export function RevealText({ tokens, className }: { tokens: Token[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          // Plage de scroll large (top 82% -> bottom 12%) : la revelation
          // s'etale sur presque toute la traversee de la section, donc lente.
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 12%",
            scrub: 0.8,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [tokens]);

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <span
          key={i}
          data-word
          className={cn(t.color === "blue" && "text-primary", t.color === "red" && "text-accent")}
        >
          {t.text}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
