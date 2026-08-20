import { useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BENIN, CADRE } from "./beninChemin";
import "./LogoTrace.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Le logo du BWAI, tracé avant d'être montré.
 *
 * La frontière du Bénin se dessine d'un trait continu, du sud vers le nord et
 * jusqu'à revenir à son point de départ, puis le logo se découvre par-dessus
 * pendant que le trait s'efface. Les deux sont dans le même repère et à la
 * même échelle : le tracé n'est pas un décor posé à côté du dessin, c'est son
 * contour.
 *
 * Les teintes du dégradé sont relevées sur le logo lui-même, à cinq hauteurs :
 * orange en haut, rouge sur la côte est, jaune vers le sud.
 */
export function LogoTrace({ alt }: { alt: string }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  // Deux logos peuvent coexister : leurs dégradés ne doivent pas partager
  // le même identifiant.
  const cle = useId().replace(/:/g, "");

  useGSAP(
    () => {
      const zone = zoneRef.current;
      if (!zone) return;

      const trait = zone.querySelector<SVGPathElement>(".ltr-trait")!;
      const image = zone.querySelector<HTMLImageElement>(".ltr-image")!;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(image, { autoAlpha: 1 });
        gsap.set(trait, { autoAlpha: 0 });
        return;
      }

      // La longueur du chemin se demande au navigateur : la calculer à la main
      // reviendrait à refaire son travail, et faux d'un pour cent le tracé
      // finirait avant ou après son point de départ.
      const longueur = trait.getTotalLength();
      gsap.set(trait, { strokeDasharray: longueur, strokeDashoffset: longueur, autoAlpha: 1 });
      gsap.set(image, { autoAlpha: 0 });

      let scene: gsap.core.Timeline | undefined;

      function lancer() {
        scene = gsap.timeline({
          scrollTrigger: { trigger: zone!, start: "top 85%", once: true },
        });

        scene.to(trait, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" });
        // Le dessin prend le relais du trait : ils se croisent, donc on ne voit
        // jamais deux contours l'un sur l'autre.
        scene.to(image, { autoAlpha: 1, duration: 0.9, ease: "power2.out" }, "-=0.2");
        scene.to(trait, { autoAlpha: 0, duration: 0.7, ease: "power2.out" }, "<");
      }

      /* L'écran d'entrée couvre la page pendant sept secondes au premier
         chargement. Lancé tout de suite, le tracé se jouerait entièrement
         derrière lui et l'on découvrirait un logo déjà posé. On attend donc
         que le voile se soit retiré, quand il y en a un ; en navigation
         interne il n'y en a pas, et le tracé part aussitôt. */
      const voile = document.querySelector<HTMLElement>(".ent");
      let guetteur: MutationObserver | undefined;

      if (voile && voile.style.display !== "none") {
        guetteur = new MutationObserver(() => {
          if (voile.style.display === "none" || !voile.isConnected) {
            guetteur?.disconnect();
            lancer();
          }
        });
        guetteur.observe(voile, { attributes: true, attributeFilter: ["style"] });
        if (voile.parentElement) {
          guetteur.observe(voile.parentElement, { childList: true });
        }
      } else {
        lancer();
      }

      return () => {
        guetteur?.disconnect();
        scene?.scrollTrigger?.kill();
        scene?.kill();
      };
    },
    { scope: zoneRef },
  );

  return (
    <div className="ltr" ref={zoneRef}>
      <svg
        className="ltr-carte"
        viewBox={`0 0 ${CADRE.largeur} ${CADRE.hauteur}`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${cle}-teintes`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff9f0a" />
            <stop offset="0.22" stopColor="#f03510" />
            <stop offset="0.45" stopColor="#ec460a" />
            <stop offset="0.72" stopColor="#f6dd0b" />
            <stop offset="1" stopColor="#ffdf01" />
          </linearGradient>
        </defs>
        <path
          className="ltr-trait"
          d={BENIN}
          stroke={`url(#${cle}-teintes)`}
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <img
        className="ltr-image"
        src="/imgs/logos/logobwai-clair.webp"
        srcSet="/imgs/logos/logobwai-clair-280.webp 280w, /imgs/logos/logobwai-clair.webp 437w"
        sizes="(max-width: 46rem) 40vw, 12rem"
        width={CADRE.largeur}
        height={CADRE.hauteur}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
