import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import "./ChampDeContraintes.css";

/** Suite pseudo-aleatoire reproductible : le meme champ a chaque visite. */
function graine(valeur: number) {
  return () => {
    valeur = (valeur + 0x6d2b79f5) | 0;
    let t = Math.imul(valeur ^ (valeur >>> 15), 1 | valeur);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Barre = { hauteur: number; assignee: boolean };

/**
 * Le champ de contraintes : le plan de fond de l'ouverture.
 *
 * Likova pose sous son panneau un rendu d'architecture en pleine largeur.
 * On n'a pas de photographie, et surtout la DA reserve la photographie aux
 * personnes et aux evenements. Le plan est donc dessine : un domaine de
 * valeurs, chacune une barre verticale, dont quelques-unes ont ete assignees
 * et brillent au miel tandis que les autres restent ouvertes.
 *
 * Il joue une fois a l'arrivee puis ne bouge plus. Aucune boucle ne tourne au
 * repos : c'est un site universitaire beninois avant d'etre une vitrine.
 */
export function ChampDeContraintes({ colonnes = 96 }: { colonnes?: number }) {
  const zoneRef = useRef<HTMLDivElement>(null);

  const barres = useMemo<Barre[]>(() => {
    const tirage = graine(20260819);
    return Array.from({ length: colonnes }, () => {
      // Deux tirages multiplies : beaucoup de valeurs basses, quelques hautes.
      const brut = tirage() * tirage();
      return { hauteur: 0.12 + brut * 0.88, assignee: tirage() > 0.94 };
    });
  }, [colonnes]);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = zone.querySelectorAll(".champ-barre");
    const scene = gsap.fromTo(
      elements,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.6,
        ease: "power4.out",
        stagger: { each: 0.012, from: "start" },
        delay: 0.15,
      },
    );

    return () => {
      scene.kill();
    };
  }, []);

  return (
    <div ref={zoneRef} className="champ" aria-hidden="true">
      <div className="champ-domaine">
        {barres.map((barre, rang) => (
          <span
            key={rang}
            className="champ-barre"
            data-assignee={barre.assignee ? "" : undefined}
            style={{ height: `${(barre.hauteur * 100).toFixed(1)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
