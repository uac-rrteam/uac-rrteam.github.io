import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Voile "brume qui monte", repris du front SOVREAN (Landing.tsx) et adapte a
 * nos tokens HSL. Il appartient a la SECTION QUI MONTE : accroche au-dessus
 * d'elle (`bottom: calc(100% - 4px)`), il deborde vers le haut et balaie le
 * hero du bas vers le haut au fil du defilement.
 *
 * Deux bandes qui ne forment qu'un voile a l'oeil, mais separees pour la perf :
 * - `brume` : un aplat degrade (couleur de la page) dont l'opacite monte au
 *   scrub, puis qui se DEPLOIE tout seul (scaleY) une fois un seuil franchi,
 *   jusqu'a recouvrir le hero.
 * - `flou` : un `backdrop-filter` (le bord flou du voile) qui NE s'etire pas
 *   (le flou coute cher, proportionnel a sa surface). On le coupe des que le
 *   recouvrement est fini, car il resterait actif et couteux sous l'aplat.
 *
 * A placer en tete du bloc de contenu `relative z-10`, le hero etant `sticky`
 * en dessous (voir Home).
 */
export function HeroVeil({ triggerId = "hero" }: { triggerId?: string }) {
  const brume = useRef<HTMLDivElement>(null);
  const flou = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = brume.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setFlou = (valeur: string) => {
      const bande = flou.current;
      if (!bande) return;
      bande.style.setProperty("backdrop-filter", valeur);
      bande.style.setProperty("-webkit-backdrop-filter", valeur);
    };

    const ctx = gsap.context(() => {
      // 1) Les deux bandes montent ensemble en opacite (au scrub), avant le
      //    deploiement, pour que celui-ci n'etire pas une brume transparente.
      gsap.fromTo(
        [el, flou.current].filter(Boolean),
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: `#${triggerId}`, start: "top top", end: "16% top", scrub: true },
        },
      );

      // 2) Le deploiement, joue une fois au passage du seuil (autonome).
      const deploiement = gsap.to(el, {
        scaleY: 8,
        duration: 1.15,
        ease: "power2.inOut",
        paused: true,
        onComplete: () => setFlou("none"),
      });

      ScrollTrigger.create({
        trigger: `#${triggerId}`,
        start: "30% top",
        onEnter: () => deploiement.play(),
        onLeaveBack: () => {
          setFlou("");
          deploiement.reverse();
        },
      });
    });

    return () => ctx.revert();
  }, [triggerId]);

  return (
    <>
      {/* Bande floutee : le bord du voile. Hauteur fixe, ne s'etire jamais. */}
      <div
        ref={flou}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-20 h-[19vh] backdrop-blur-[6px]"
        style={{
          bottom: "calc(100% - 4px)",
          opacity: 0,
          WebkitMaskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
          maskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
        }}
      />
      {/* Brume : l'aplat degrade qui se deploie pour recouvrir le hero. */}
      <div
        ref={brume}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-20 h-[19vh]"
        style={{ bottom: "calc(100% - 4px)", opacity: 0, transformOrigin: "bottom center" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top,
              hsl(var(--background)) 0%,
              hsl(var(--background) / 0.92) 26%,
              hsl(var(--background) / 0.6) 55%,
              hsl(var(--background) / 0.22) 80%,
              transparent 100%)`,
          }}
        />
      </div>
    </>
  );
}
