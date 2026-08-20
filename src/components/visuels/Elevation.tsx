import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Elevation.css";

/**
 * Les volumes, alignés au sol. Un bloc, un domaine.
 *
 * `assignees` sont les valeurs déjà fixées, visibles d'emblée. `tardives` sont
 * celles que la propagation fixera ensuite, de proche en proche : elles
 * attendent, éteintes, qu'on descende dans la page.
 */
const VOLUMES = [
  { x: 30, y: 336, largeur: 196, assignees: [3, 4], tardives: [5, 11, 19] },
  { x: 226, y: 198, largeur: 158, assignees: [8], tardives: [7, 9, 14] },
  { x: 384, y: 258, largeur: 122, assignees: [2], tardives: [1, 3, 10] },
  { x: 506, y: 96, largeur: 244, assignees: [5, 6, 14], tardives: [4, 7, 13, 24, 30] },
  { x: 750, y: 176, largeur: 168, assignees: [3], tardives: [2, 4, 16] },
  { x: 918, y: 66, largeur: 132, assignees: [7, 8], tardives: [6, 9, 15] },
  { x: 1050, y: 288, largeur: 212, assignees: [4, 12], tardives: [3, 13, 22] },
  { x: 1262, y: 214, largeur: 148, assignees: [9], tardives: [8, 10, 17] },
];

/**
 * Les mêmes volumes, debout.
 *
 * Une élévation large réduite à 400 px de large ne peint plus qu'une bande de
 * 172 px : le reste de sa boîte est du vide, et le bâtiment n'a plus de
 * hauteur à donner à la page. En portrait, ce sont donc cinq tours étroites,
 * la maîtresse quatre fois plus haute que large.
 *
 * Le cadre épouse le dessin, sans marge au-dessus : le dessin se cale au bas
 * de sa boîte, donc toute unité vide en tête du cadre deviendrait du vide à
 * l'écran, et la silhouette monterait moins haut qu'elle ne le peut. Le
 * bâtiment fait ainsi la largeur de l'écran, et sa hauteur suit.
 */
const TOURS = [
  { x: 6, y: 230, largeur: 88, assignees: [3, 7], tardives: [1, 5, 9] },
  { x: 94, y: 116, largeur: 70, assignees: [4], tardives: [2, 6, 8] },
  { x: 164, y: 16, largeur: 102, assignees: [2, 8, 11], tardives: [0, 4, 6, 9] },
  { x: 266, y: 180, largeur: 60, assignees: [3], tardives: [1, 5] },
  { x: 326, y: 82, largeur: 88, assignees: [6], tardives: [2, 4, 8, 10] },
];

const PAYSAGE = { volumes: VOLUMES, sol: 620, vue: "0 0 1440 620" };
const PORTRAIT = { volumes: TOURS, sol: 420, vue: "0 0 420 420" };

const PAS = 7;

/**
 * L'élévation.
 *
 * Le site de référence pose un bâtiment sous tout ce qu'il raconte, et c'est
 * ce bâtiment qui donne au site sa profondeur. Nous n'en avons pas à
 * photographier, alors on le dessine, et on le dessine avec ce qu'on a :
 * chaque volume est un domaine, chaque lame de façade une valeur possible, et
 * les quelques lames au miel sont les valeurs qui ont été assignées.
 *
 * Ce n'est donc pas un décor emprunté. C'est la même primitive que partout
 * ailleurs sur le site, montée en volumes.
 *
 * La construction se fait par un volet de découpe qui monte du sol, un par
 * volume. Pas de transform sur les groupes : sur un SVG, GSAP y laisse une
 * translation résiduelle égale à la hauteur du groupe, et les volumes
 * finissent en l'air.
 *
 * Deux cadrages : couché pour un grand écran, debout pour un téléphone. Le
 * choix vient de l'appelant et non d'une règle de style, parce que la même
 * élévation sert aussi de plan de fond à un chiffre, dans une bande large où
 * les tours n'auraient pas de sens.
 */
export function Elevation({ debout = false }: { debout?: boolean }) {
  const zoneRef = useRef<SVGSVGElement>(null);
  const { volumes, sol, vue } = debout ? PORTRAIT : PAYSAGE;
  // Deux élévations peuvent coexister sur la page : leurs découpes ne doivent
  // pas porter le même identifiant.
  const cle = useId().replace(/:/g, "");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".elv-volet", { attr: { y: (_i, el) => el.dataset.haut, height: (_i, el) => el.dataset.hauteur } });
        return;
      }

      const scene = gsap.timeline();

      scene.fromTo(
        ".elv-volet",
        { attr: { y: sol, height: 0 } },
        {
          attr: { y: (_i, el) => el.dataset.haut, height: (_i, el) => el.dataset.hauteur },
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.09,
        },
      );

      scene.fromTo(".elv-assignee", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.06 }, 0.9);

      return () => scene.kill();
    },
    { scope: zoneRef, dependencies: [debout] },
  );

  return (
    <svg
      ref={zoneRef}
      viewBox={vue}
      className="elv"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
    >
      <defs>
        {volumes.map((volume) => (
          <clipPath key={volume.x} id={`${cle}-${volume.x}`}>
            <rect
              className="elv-volet"
              x={volume.x}
              y={sol}
              width={volume.largeur}
              height={0}
              data-haut={volume.y}
              data-hauteur={sol - volume.y}
            />
          </clipPath>
        ))}
      </defs>

      {volumes.map((volume) => (
        <g key={volume.x} clipPath={`url(#${cle}-${volume.x})`}>
          <Volume {...volume} sol={sol} />
        </g>
      ))}
    </svg>
  );
}

function Volume({
  x,
  y,
  largeur,
  assignees,
  tardives,
  sol,
}: {
  x: number;
  y: number;
  largeur: number;
  assignees: number[];
  tardives: number[];
  sol: number;
}) {
  const hauteur = sol - y;
  const lames = [];
  const nombre = Math.floor((largeur - 6) / PAS);

  for (let rang = 0; rang < nombre; rang += 1) {
    let classe = "elv-lame";
    if (assignees.includes(rang)) classe = "elv-lame elv-assignee";
    else if (tardives.includes(rang)) classe = "elv-lame elv-tardive";

    lames.push(
      <rect
        key={rang}
        x={x + 3 + rang * PAS}
        y={y + 7}
        width={2.5}
        height={hauteur - 7}
        className={classe}
      />,
    );
  }

  // Les planchers : ils disent l'échelle du volume, rien d'autre.
  const planchers = [];
  for (let niveau = y + 46; niveau < sol; niveau += 46) {
    planchers.push(
      <line key={niveau} x1={x + 3} y1={niveau} x2={x + largeur - 3} y2={niveau} className="elv-plancher" />,
    );
  }

  return (
    <>
      <rect x={x} y={y} width={largeur} height={hauteur} className="elv-masse" />
      {lames}
      {planchers}
    </>
  );
}
