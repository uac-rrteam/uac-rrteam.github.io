import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./SigleBwai.css";

const LARGEUR = 1000;
const HAUTEUR = 620;

/* Le filet segmenté de la section passe aux quarante-quatre centièmes du plan.
   Le sigle est centré dessus, et l'arc est posé de sorte que la ligne tombe
   dans l'interstice entre le W et le A : elle coupe le sigle en deux moitiés
   égales au lieu de traverser une pastille. */

/**
 * Les quatre pastilles du sigle, en arc ouvert vers la gauche comme sur
 * l'emblème de l'atelier. Chacune sort une tige, et cette tige aboutit à un
 * neurone.
 */
const PASTILLES = [
  { lettre: "B", x: 716, y: 123, tige: "M676 113 L646 95 H586", bout: { x: 566, y: 95 } },
  { lettre: "W", x: 786, y: 223, tige: "M746 223 H620", bout: { x: 608, y: 223 } },
  { lettre: "A", x: 786, y: 323, tige: "M746 323 H620", bout: { x: 608, y: 323 } },
  { lettre: "I", x: 716, y: 423, tige: "M676 433 L646 451 H586", bout: { x: 566, y: 451 } },
];

const RAYON = 40;

/* Les nœuds du tissu, en amont des quatre bouts de tige. Aucun ne descend dans
   la colonne de gauche sous la ligne : c'est là que la phrase du chiffre et la
   plaque de l'emblème se tiennent. */
const NOEUDS = [
  { x: 462, y: 102 },
  { x: 344, y: 152 },
  { x: 500, y: 188 },
  { x: 286, y: 232 },
  { x: 424, y: 258 },
  { x: 300, y: 318 },
  { x: 392, y: 352 },
  { x: 486, y: 386 },
  { x: 344, y: 430 },
];

/**
 * Les liaisons, par indices : un nombre négatif désigne le bout de tige d'une
 * pastille, un positif un nœud du tissu. Les écrire ainsi évite de recopier
 * seize paires de coordonnées qui devraient toutes suivre le moindre
 * déplacement.
 */
const LIAISONS: Array<[number, number]> = [
  [-1, 0],
  [0, 1],
  [1, 2],
  [2, -2],
  [-2, 4],
  [4, 2],
  [4, 7],
  [7, -3],
  [-3, 6],
  [6, 3],
  [3, 1],
  [6, 8],
  [8, -4],
  [-4, 7],
  [5, 3],
  [5, 6],
];

/** Où tombe un indice de liaison : bout de pastille si négatif, nœud sinon. */
function situer(indice: number) {
  if (indice < 0) return PASTILLES[-indice - 1].bout;
  return NOEUDS[indice];
}

/* Le tracé des liaisons ne dépend d'aucune donnée : une seule fois au
   chargement du module, et non à chaque montage. */
const TISSU = LIAISONS.reduce((trace, [depart, arrivee]) => {
  const un = situer(depart);
  const deux = situer(arrivee);
  return `${trace}M${un.x} ${un.y} L${deux.x} ${deux.y}`;
}, "");

/**
 * Le sigle de l'atelier, en tissu.
 *
 * L'emblème du BWAI porte ses quatre lettres dans des pastilles, chacune
 * reliée par une tige à ce qu'elle désigne. On garde cette forme et on la
 * prolonge : au bout de chaque tige, un neurone, et les neurones tiennent
 * ensemble par un tissu de liaisons. Les lettres ne flottent donc pas, elles
 * sont accrochées à quelque chose.
 *
 * Rien ne boucle. Le dessin se fait à l'arrivée du chiffre, dans l'ordre où on
 * le lit : le tissu d'abord, les tiges ensuite, les lettres en dernier, parce
 * que ce sont elles le résultat.
 */
export function SigleBwai() {
  const zoneRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();

      // Les traits se dessinent : on masque la ligne par un tiret aussi long
      // qu'elle, puis on fait glisser le masque.
      for (const trait of gsap.utils.toArray<SVGGeometryElement>(".bwa-trait")) {
        const longueur = trait.getTotalLength();
        scene.fromTo(
          trait,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
          0,
        );
      }

      scene.fromTo(
        ".bwa-noeud",
        { opacity: 0, scale: 0.3, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.05 },
        0.3,
      );

      scene.fromTo(
        ".bwa-tige",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power1.out", stagger: 0.07 },
        0.7,
      );

      // Les pastilles se posent l'une après l'autre, dans l'ordre des lettres.
      scene.fromTo(
        ".bwa-pastille",
        { opacity: 0, scale: 0.72, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 },
        0.9,
      );

      return () => scene.kill();
    },
    { scope: zoneRef },
  );

  return (
    <svg
      ref={zoneRef}
      className="bwa"
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      aria-hidden="true"
      fill="none"
    >
      <path d={TISSU} className="bwa-trait bwa-tissu" />

      {NOEUDS.map((noeud) => (
        <g key={`${noeud.x}-${noeud.y}`} className="bwa-noeud">
          <circle cx={noeud.x} cy={noeud.y} r={8} className="bwa-halo" />
          <circle cx={noeud.x} cy={noeud.y} r={2.6} className="bwa-coeur" />
        </g>
      ))}

      {/* Le bout de chaque tige : c'est un neurone, plus dense que les autres,
          puisque c'est là qu'une lettre vient s'accrocher. */}
      {PASTILLES.map((pastille) => (
        <g key={`b${pastille.lettre}`} className="bwa-noeud">
          <circle cx={pastille.bout.x} cy={pastille.bout.y} r={13} className="bwa-halo" />
          <circle cx={pastille.bout.x} cy={pastille.bout.y} r={4.5} className="bwa-vif" />
        </g>
      ))}

      {PASTILLES.map((pastille) => (
        <path key={`t${pastille.lettre}`} d={pastille.tige} className="bwa-tige" />
      ))}

      {PASTILLES.map((pastille) => (
        <g key={pastille.lettre} className="bwa-pastille">
          <circle cx={pastille.x} cy={pastille.y} r={RAYON} className="bwa-anneau" />
          <text x={pastille.x} y={pastille.y} className="bwa-lettre">
            {pastille.lettre}
          </text>
        </g>
      ))}
    </svg>
  );
}
