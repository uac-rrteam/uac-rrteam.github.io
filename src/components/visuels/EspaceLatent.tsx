import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./EspaceLatent.css";

/**
 * Les quatre domaines, tels qu'un modèle les sépare.
 *
 * Chaque grappe a son centre, son étendue et son inclinaison : ce sont quatre
 * groupes de travaux qui ne se ressemblent pas, pas quatre copies du même
 * nuage déplacé.
 */
const GRAPPES = [
  { x: 268, y: 196, etendue: 76, inclinaison: -18, aplat: 0.62 },
  { x: 706, y: 170, etendue: 84, inclinaison: 14, aplat: 0.7 },
  { x: 760, y: 452, etendue: 72, inclinaison: -9, aplat: 0.66 },
  { x: 300, y: 466, etendue: 80, inclinaison: 23, aplat: 0.58 },
];

const PAR_GRAPPE = 32;
const LARGEUR = 1000;
const HAUTEUR = 620;

/** Suite pseudo-aléatoire reproductible : la même projection à chaque visite. */
function graine(valeur: number) {
  return () => {
    valeur = (valeur + 0x6d2b79f5) | 0;
    let t = Math.imul(valeur ^ (valeur >>> 15), 1 | valeur);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Point {
  x: number;
  y: number;
  rayon: number;
  opacite: number;
  grappe: number;
  /** D'où le point vient avant que le modèle ne l'ait rangé. */
  dx: number;
  dy: number;
}

/**
 * L'espace latent.
 *
 * C'est la figure que produit n'importe quelle équipe qui projette ses données
 * en deux dimensions pour voir ce que son modèle a compris : un semis de
 * points où les catégories se détachent en grappes. Ici les quatre grappes
 * sont les quatre domaines, et le chiffre annonce exactement cela, que les
 * travaux se répartissent.
 *
 * L'animation est l'apprentissage lui-même : les points entrent en désordre,
 * puis migrent vers leur grappe, et les ellipses de dispersion se referment
 * dessus une fois l'espace organisé. Elle joue une fois puis s'arrête.
 *
 * Les grappes se touchent aux bords, et c'est voulu : un travail sur la santé
 * scolaire appartient à deux domaines à la fois, et une projection honnête le
 * montre au lieu de tracer quatre îles séparées.
 */
export function EspaceLatent() {
  const zoneRef = useRef<SVGSVGElement>(null);
  const points = useMemo(construire, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();

      // Les points rejoignent leur place. On anime la transformation, pas cx
      // et cy : le navigateur n'a alors aucune géométrie à recalculer, ce qui
      // compte avec cent vingt-huit points sur un téléphone.
      scene.fromTo(
        ".lat-point",
        {
          opacity: 0,
          x: (_rang, cible: HTMLElement) => Number(cible.dataset.dx),
          y: (_rang, cible: HTMLElement) => Number(cible.dataset.dy),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: { each: 0.005, from: "random" },
        },
        0,
      );

      // Le contour est en pointillé, donc on ne peut pas le tracer par
      // stroke-dashoffset sans écraser ce pointillé. Il se resserre sur sa
      // grappe à la place, ce qui dit mieux ce qu'il est : une estimation qui
      // se précise.
      scene.fromTo(
        ".lat-contour",
        { opacity: 0, scale: 1.35, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", stagger: 0.12 },
        1.1,
      );

      scene.fromTo(
        ".lat-centre",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.09 },
        1.6,
      );

      return () => scene.kill();
    },
    { scope: zoneRef },
  );

  return (
    <svg
      ref={zoneRef}
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      className="lat"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {GRAPPES.map((grappe, rang) => (
        <ellipse
          key={`c${rang}`}
          cx={grappe.x}
          cy={grappe.y}
          rx={grappe.etendue * 1.95}
          ry={grappe.etendue * grappe.aplat * 1.95}
          transform={`rotate(${grappe.inclinaison} ${grappe.x} ${grappe.y})`}
          className="lat-contour"
        />
      ))}

      {points.map((point) => (
        <circle
          key={`${point.grappe}-${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={point.rayon}
          opacity={point.opacite}
          data-dx={point.dx}
          data-dy={point.dy}
          className="lat-point"
        />
      ))}

      {GRAPPES.map((grappe, rang) => (
        <circle key={`m${rang}`} cx={grappe.x} cy={grappe.y} r={8} className="lat-centre" />
      ))}
    </svg>
  );
}

function construire(): Point[] {
  const tirage = graine(20260819);
  const points: Point[] = [];

  for (const [rang, grappe] of GRAPPES.entries()) {
    const angle = (grappe.inclinaison * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (let compte = 0; compte < PAR_GRAPPE; compte += 1) {
      // Box-Muller : une vraie gaussienne, dense au centre et clairsemée sur
      // les bords. Un tirage uniforme ferait une tache plate qui ne ressemble
      // à aucune projection réelle.
      const distance = Math.sqrt(-2 * Math.log(tirage() || 1e-9));
      const direction = 2 * Math.PI * tirage();
      const brutX = distance * Math.cos(direction) * grappe.etendue;
      const brutY = distance * Math.sin(direction) * grappe.etendue * grappe.aplat;

      const x = grappe.x + brutX * cos - brutY * sin;
      const y = grappe.y + brutX * sin + brutY * cos;

      // Plus un point est loin du centre de sa grappe, plus il s'efface : la
      // densité se lit alors sans avoir à compter les points.
      const ecart = Math.min(distance / 2.4, 1);

      points.push({
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        rayon: Number((5 - ecart * 1.8).toFixed(2)),
        opacite: Number((0.62 - ecart * 0.38).toFixed(2)),
        grappe: rang,
        dx: Number(((tirage() - 0.5) * 420).toFixed(1)),
        dy: Number(((tirage() - 0.5) * 340).toFixed(1)),
      });
    }
  }

  return points;
}
