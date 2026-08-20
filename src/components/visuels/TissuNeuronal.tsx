import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./TissuNeuronal.css";

const LARGEUR = 1000;
const HAUTEUR = 620;

/**
 * Cinq corps cellulaires posés hors de tout alignement. Un réseau vivant n'a
 * pas de colonnes : dès qu'on aligne, le dessin retombe dans le schéma de
 * manuel qu'on cherche justement à quitter.
 */
const SOMAS = [
  { x: 246, y: 214, taille: 13, racines: 5 },
  { x: 612, y: 152, taille: 11, racines: 4 },
  { x: 764, y: 424, taille: 14, racines: 5 },
  { x: 352, y: 468, taille: 12, racines: 4 },
  { x: 508, y: 322, taille: 9, racines: 4 },
];

/** Les liaisons longues entre corps cellulaires : ce sont elles qui portent le signal. */
const AXONES = [
  [0, 4],
  [4, 2],
  [1, 4],
  [3, 4],
  [0, 1],
  [3, 2],
];

/** Suite pseudo-aléatoire reproductible : le même tissu à chaque visite. */
function graine(valeur: number) {
  return () => {
    valeur = (valeur + 0x6d2b79f5) | 0;
    let t = Math.imul(valeur ^ (valeur >>> 15), 1 | valeur);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Toutes les branches d'un même niveau, réunies en un seul tracé. */
interface Niveau {
  profondeur: number;
  d: string;
  epaisseur: number;
  opacite: number;
}

/**
 * Le tissu neuronal.
 *
 * Des corps cellulaires, leurs dendrites ramifiées, et les axones qui les
 * relient. C'est l'image que tout le monde reconnaît comme celle d'un réseau
 * de neurones, à cette différence près qu'elle est tracée et non rendue : pas
 * de halo bleu de banque d'images, le trait du site et le miel pour ce qui
 * s'allume.
 *
 * La vie du dessin tient à une seule chose, les impulsions qui parcourent les
 * axones. Un segment court glisse le long du chemin par stroke-dashoffset :
 * six propriétés animées en tout, ce qui tient sur un téléphone modeste là où
 * un rendu lumineux ne tiendrait pas.
 */
/* Le tissu ne depend d'aucune donnee : on le calcule une fois pour toutes au
   chargement du module. Le refaire a chaque montage coutait une demi-seconde
   sur une machine modeste, en plein changement de chiffre. */
const { dendrites, axones } = construire();

export function TissuNeuronal() {
  const zoneRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();

      // Les niveaux de ramification se tracent l'un après l'autre, du tronc
      // vers les pointes : la croissance se lit mieux ainsi qu'en désordre, et
      // cela ne demande que trois tracés au lieu de deux cents.
      const niveaux = gsap.utils.toArray<SVGPathElement>(".tis-dendrite");
      for (const [rang, niveau] of niveaux.entries()) {
        const longueur = niveau.getTotalLength();
        scene.fromTo(
          niveau,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: 1.1, ease: "power1.out" },
          rang * 0.22,
        );
      }

      const liaisons = gsap.utils.toArray<SVGPathElement>(".tis-axone");
      for (const [rang, liaison] of liaisons.entries()) {
        const longueur = liaison.getTotalLength();
        scene.fromTo(
          liaison,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
          0.3 + rang * 0.1,
        );
      }

      scene.fromTo(
        ".tis-soma, .tis-halo",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.7, ease: "back.out(1.7)", stagger: 0.08 },
        0.9,
      );

      // Les impulsions. Elles seules tournent en boucle, chacune à son rythme :
      // des départs réguliers donneraient un clignotant, pas un tissu vivant.
      const boucles: gsap.core.Tween[] = [];
      const trainees = gsap.utils.toArray<SVGPathElement>(".tis-impulsion");
      for (const [rang, trainee] of trainees.entries()) {
        const longueur = trainee.getTotalLength();
        gsap.set(trainee, { strokeDasharray: `${longueur * 0.14} ${longueur}` });
        const boucle = gsap.fromTo(
          trainee,
          { strokeDashoffset: longueur * 0.14 },
          {
            strokeDashoffset: -longueur,
            duration: 2.4 + rang * 0.45,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 0.8 + rang * 0.6,
            delay: 1.6 + rang * 0.5,
          },
        );
        boucles.push(boucle);
      }

      // Hors de l'écran, ces boucles feraient travailler la machine pour un
      // dessin que personne ne regarde. L'observateur les suspend.
      const guetteur = new IntersectionObserver(
        ([vue]) => {
          for (const boucle of boucles) {
            if (vue.isIntersecting) boucle.resume();
            else boucle.pause();
          }
        },
        { threshold: 0 },
      );
      if (zoneRef.current) guetteur.observe(zoneRef.current);

      return () => {
        guetteur.disconnect();
        for (const boucle of boucles) boucle.kill();
        scene.kill();
      };
    },
    { scope: zoneRef },
  );

  return (
    <svg
      ref={zoneRef}
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      className="tis"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Le tissu s'efface vers les bords, et davantage a gauche, ou se
            tient le texte. Un masque plutot qu'une decoupe : une coupe nette
            au bord du cadre trahirait le dessin genere. */}
        <radialGradient id="tis-etendue" cx="58%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="58%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id="tis-masque">
          <rect width={LARGEUR} height={HAUTEUR} fill="url(#tis-etendue)" />
        </mask>

        {/* Un seul dégradé pour tous les corps cellulaires : le halo est un
            disque rempli de ce dégradé, jamais un filtre de flou, qui coûterait
            une passe de rendu par image. */}
        <radialGradient id="tis-lueur">
          <stop offset="0%" stopColor="hsl(var(--miel))" stopOpacity="0.4" />
          <stop offset="55%" stopColor="hsl(var(--miel))" stopOpacity="0.09" />
          <stop offset="100%" stopColor="hsl(var(--miel))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Un tracé par niveau de ramification : toutes les branches d'un même
          niveau partagent épaisseur et encre, elles tiennent donc dans un seul
          élément. */}
      <g mask="url(#tis-masque)">
        {dendrites.map((niveau) => (
          <path
            key={niveau.profondeur}
            d={niveau.d}
            strokeWidth={niveau.epaisseur}
            opacity={niveau.opacite}
            className="tis-dendrite"
          />
        ))}
      </g>

      {axones.map((axone) => (
        <path key={axone} d={axone} className="tis-axone" />
      ))}

      {axones.map((axone) => (
        <path key={`i${axone}`} d={axone} className="tis-impulsion" />
      ))}

      {SOMAS.map((soma) => (
        <circle
          key={`h${soma.x}`}
          cx={soma.x}
          cy={soma.y}
          r={soma.taille * 3.4}
          fill="url(#tis-lueur)"
          className="tis-halo"
        />
      ))}

      {SOMAS.map((soma) => (
        <circle key={`s${soma.x}`} cx={soma.x} cy={soma.y} r={soma.taille} className="tis-soma" />
      ))}
    </svg>
  );
}

function construire() {
  const tirage = graine(20260819);
  // Les branches se rangent par profondeur : trois seaux, trois tracés.
  const seaux = new Map<number, string[]>();

  for (const soma of SOMAS) {
    // Les racines partent en éventail depuis le corps, avec un écart tiré au
    // sort : un éventail parfaitement régulier ferait une roue de vélo.
    const depart = tirage() * Math.PI * 2;
    for (let racine = 0; racine < soma.racines; racine += 1) {
      const angle = depart + (racine / soma.racines) * Math.PI * 2 + (tirage() - 0.5) * 0.7;
      ramifier(soma.x, soma.y, angle, 78 + tirage() * 34, 3, tirage, seaux);
    }
  }

  const dendrites: Niveau[] = [];
  for (const [profondeur, morceaux] of [...seaux.entries()].sort((a, b) => b[0] - a[0])) {
    dendrites.push({
      profondeur,
      d: morceaux.join(" "),
      epaisseur: Number((profondeur * 0.42).toFixed(2)),
      opacite: Number((0.055 + profondeur * 0.042).toFixed(3)),
    });
  }

  const axones = AXONES.map(([depart, arrivee]) => {
    const un = SOMAS[depart];
    const deux = SOMAS[arrivee];
    // La courbure éloigne le trait de la corde : aucun axone ne traverse le
    // dessin en ligne droite, ce qu'aucun vrai tissu ne fait.
    const ecartX = deux.x - un.x;
    const ecartY = deux.y - un.y;
    const flexion = (tirage() - 0.5) * 0.42;
    const pivotX = (un.x + deux.x) / 2 - ecartY * flexion;
    const pivotY = (un.y + deux.y) / 2 + ecartX * flexion;
    return `M${un.x} ${un.y} Q${pivotX.toFixed(1)} ${pivotY.toFixed(1)} ${deux.x} ${deux.y}`;
  });

  return { dendrites, axones };
}

/**
 * Une branche, puis deux branches plus courtes à son extrémité, jusqu'à la
 * profondeur voulue. L'épaisseur et l'opacité diminuent à chaque niveau, comme
 * dans un vrai arbre dendritique.
 *
 * Chaque branche va dans le seau de son niveau : elles y seront réunies en un
 * seul tracé, car elles partagent toutes la même épaisseur et la même encre.
 */
function ramifier(
  x: number,
  y: number,
  angle: number,
  longueur: number,
  profondeur: number,
  tirage: () => number,
  seaux: Map<number, string[]>,
) {
  if (profondeur === 0) return;

  const boutX = x + Math.cos(angle) * longueur;
  const boutY = y + Math.sin(angle) * longueur;

  const courbure = (tirage() - 0.5) * 0.55;
  const pivotX = (x + boutX) / 2 + Math.cos(angle + Math.PI / 2) * longueur * courbure;
  const pivotY = (y + boutY) / 2 + Math.sin(angle + Math.PI / 2) * longueur * courbure;

  const seau = seaux.get(profondeur) ?? [];
  seau.push(
    `M${x.toFixed(1)} ${y.toFixed(1)} Q${pivotX.toFixed(1)} ${pivotY.toFixed(1)} ${boutX.toFixed(1)} ${boutY.toFixed(1)}`,
  );
  seaux.set(profondeur, seau);

  const ouverture = 0.42 + tirage() * 0.26;
  const suivante = longueur * (0.58 + tirage() * 0.14);

  // Une branche sur cinq poursuit seule. Sans cela toutes les fourches se
  // valent et le dessin prend l'air d'un fractal de demonstration.
  if (tirage() < 0.2) {
    ramifier(boutX, boutY, angle + (tirage() - 0.5) * 0.5, suivante, profondeur - 1, tirage, seaux);
    return;
  }

  ramifier(boutX, boutY, angle - ouverture, suivante, profondeur - 1, tirage, seaux);
  ramifier(boutX, boutY, angle + ouverture, suivante, profondeur - 1, tirage, seaux);
}
