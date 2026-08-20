import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEUIL_EMPILE } from "@/hooks/useEmpile";

gsap.registerPlugin(ScrollTrigger);

/* La dérive des images : elles montent un peu moins vite que la page.

   Six pour cent de leur hauteur, pas davantage. Au-delà, le décalage se
   remarque et le lecteur regarde le mouvement au lieu de la photographie ;
   en deçà, il ne se voit plus du tout. C'est le même écart que celui du
   portrait de l'ouverture, et il donne aux pages leur profondeur sans qu'on
   sache dire d'où elle vient. */
const ECART = 6;

/**
 * Fait dériver un ensemble d'images au défilement.
 *
 * Le mouvement porte sur le cadre, jamais sur l'image : celle-ci garde son
 * échelle pour le survol, et deux transformations sur le même élément se
 * chassent l'une l'autre.
 *
 * Rien sur téléphone. Une dérive est une composition de couche par image, et
 * une page qui en montre huit les recompose toutes à chaque pas de défilement.
 */
export function deriveDouce(racine: HTMLElement, selecteur: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  if (window.matchMedia(SEUIL_EMPILE).matches) return () => {};

  const cadres = [...racine.querySelectorAll<HTMLElement>(selecteur)];
  if (!cadres.length) return () => {};

  const derives = cadres.map((cadre) =>
    gsap.fromTo(
      cadre,
      { yPercent: ECART / 2 },
      {
        yPercent: -ECART / 2,
        ease: "none",
        scrollTrigger: {
          trigger: cadre,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    ),
  );

  return () => {
    for (const derive of derives) {
      derive.scrollTrigger?.kill();
      derive.kill();
    }
  };
}
