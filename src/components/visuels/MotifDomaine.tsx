import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Les quatre familles de motifs, une par domaine de recherche. */
export type Motif = "parcelle" | "signal" | "cohorte" | "graphe";

/**
 * Le motif d'un domaine, au trait.
 *
 * Chaque domaine reçoit une forme tirée de la résolution sous contraintes, de
 * sorte qu'on les distingue au coup d'œil sans lire l'étiquette : la parcelle
 * pour l'agriculture, le signal pour la santé, la cohorte pour l'éducation, le
 * graphe pour l'optimisation.
 *
 * Tout est calculé, aucun tracé n'est écrit à la main : c'est ce qui garde les
 * quatre dessins de la même famille.
 *
 * Le motif se dessine quand il arrive, une seule fois. Le mouvement dit ce que
 * fait la forme : le trait se trace de bout en bout, les valeurs assignées
 * s'allument de proche en proche, les sites de la tournée se posent après le
 * chemin qui les relie. Rien ne boucle une fois en place.
 *
 * Les quatre motifs restent montés tous ensemble pour que la relève de l'un à
 * l'autre se voie. C'est `actif` qui dit lequel est à l'écran : les trois
 * autres ne dessinent rien, et celui qui reprend la main se redessine.
 */
export function MotifDomaine({ motif, actif = true }: { motif: Motif; actif?: boolean }) {
  const zoneRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!actif) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();

      // Les tracés continus se dessinent : on masque la ligne par un tiret
      // aussi long qu'elle, puis on fait glisser le masque.
      const traces = gsap.utils.toArray<SVGGeometryElement>(".mot-trace");
      for (const trace of traces) {
        const longueur = trace.getTotalLength();
        scene.fromTo(
          trace,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
          0,
        );
      }

      // Les valeurs encore ouvertes affleurent, sans bouger : elles sont le
      // fond sur lequel les autres se détachent.
      scene.fromTo(
        ".mot-cellule, .mot-filet",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out", stagger: { each: 0.008, from: "start" } },
        0,
      );

      // Les valeurs assignées s'allument en cascade, dans l'ordre où la
      // propagation les a fixées.
      scene.fromTo(
        ".mot-plein",
        { opacity: 0, scale: 0.4, transformOrigin: "center" },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.022 },
        0.25,
      );

      // Les sites de la tournée se posent une fois le chemin tracé.
      scene.fromTo(
        ".mot-site",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.45, ease: "power3.out", stagger: 0.05 },
        0.9,
      );

      return () => scene.kill();
    },
    // `actif` compte autant que `motif` : c'est en reprenant la main qu'un
    // dessin doit se refaire.
    { scope: zoneRef, dependencies: [motif, actif] },
  );

  return (
    <svg ref={zoneRef} viewBox="0 0 200 120" className="mot" aria-hidden="true" fill="none">
      {dessiner(motif)}
    </svg>
  );
}

function dessiner(motif: Motif) {
  if (motif === "parcelle") return <Parcelle />;
  if (motif === "signal") return <Signal />;
  if (motif === "cohorte") return <Cohorte />;
  return <Tournees />;
}

/* Agriculture : une grille de rendement qui se remplit. Les cellules pleines
   sont les valeurs déjà assignées. */
function Parcelle() {
  const colonnes = 14;
  const lignes = 8;
  const vides = [];
  const pleines = [];

  for (let ligne = 0; ligne < lignes; ligne += 1) {
    for (let colonne = 0; colonne < colonnes; colonne += 1) {
      // Une diagonale de remplissage, plutôt qu'un tirage : la parcelle se
      // remplit d'un coin vers l'autre, comme une propagation.
      const pleine = colonne + lignes - ligne < 11;
      const cellule = (
        <rect
          key={`${ligne}-${colonne}`}
          x={30 + colonne * 10}
          y={22 + ligne * 10}
          width={7}
          height={7}
          className={pleine ? "mot-plein" : "mot-cellule"}
        />
      );
      // Les pleines sont sorties de l'ordre de la grille et rangées par
      // diagonale : c'est dans cet ordre-là que la cascade doit les allumer.
      if (pleine) pleines.push({ rang: colonne + ligne, cellule });
      else vides.push(cellule);
    }
  }

  pleines.sort((a, b) => a.rang - b.rang);

  return (
    <>
      {vides}
      {pleines.map((entree) => entree.cellule)}
    </>
  );
}

/* Santé : une série temporelle. L'EEG de l'épilepsie est littéral, la crise
   se voit au milieu du tracé. */
function Signal() {
  const points = [];
  for (let pas = 0; pas <= 120; pas += 1) {
    const x = 20 + pas * 1.33;
    const t = pas / 120;
    const fond = Math.sin(t * 34) * 6 + Math.sin(t * 11) * 4;
    // La crise : une enveloppe qui gonfle au tiers du tracé puis retombe.
    const crise = Math.exp(-Math.pow((t - 0.42) * 7, 2)) * 26;
    const y = 60 - fond - Math.sin(t * 90) * crise;
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return (
    <>
      <line x1="20" y1="60" x2="180" y2="60" className="mot-filet" />
      <polyline points={points.join(" ")} className="mot-trace" />
    </>
  );
}

/* Éducation : une cohorte qui se répartit. Une distribution, pas un palmarès. */
function Cohorte() {
  const barres = [];
  const total = 22;

  for (let rang = 0; rang < total; rang += 1) {
    const centre = (rang - (total - 1) / 2) / 4.2;
    const hauteur = 4 + Math.exp(-centre * centre) * 62;
    barres.push(
      <line
        key={rang}
        x1={22 + rang * 7.2}
        y1={100}
        x2={22 + rang * 7.2}
        y2={100 - hauteur}
        className={rang > 6 && rang < 15 ? "mot-trace" : "mot-filet"}
      />,
    );
  }

  return (
    <>
      {barres}
      <line x1="18" y1="100" x2="182" y2="100" className="mot-filet" />
    </>
  );
}

/* Optimisation : une tournée sur un semis de points. Le chemin passe une fois
   par chaque site et revient. */
/**
 * Optimisation : trois tournées qui partent du même dépôt et se partagent les
 * clients à parts égales.
 *
 * C'est le dessin le plus proche des deux sujets du domaine. Les tournées de
 * véhicules s'y lisent directement, et l'équité aussi : les trois boucles
 * desservent le même nombre de points, ce que les trois barres du bas
 * rappellent d'un coup d'œil. Un polygone seul ne disait ni l'un ni l'autre.
 *
 * Le partage se fait par balayage angulaire autour du dépôt, la méthode que
 * tout le monde emploie pour amorcer un problème de tournées, puis chaque part
 * est ordonnée au plus proche voisin.
 */
/* Optimisation : la tournée et le véhicule qui la fait.

   C'est le seul motif dessiné et non calculé. Les trois autres montrent une
   méthode, celui-ci montre ce à quoi elle sert : une tournée résolue en haut,
   la route qui en descend, et le camion posé dessus. Un semis aléatoire de
   clients disait la même chose en moins clair.

   Les deux sujets du domaine tiennent dans le même objet : le circuit dit les
   tournées de véhicules, et les trois piles de même hauteur dans la caisse
   disent l'équité des charges. */

/** Le circuit, dans l'ordre où le véhicule le parcourt. Le dépôt ouvre et ferme. */
const ARRETS = [
  { x: 58, y: 52 },
  { x: 30, y: 44 },
  { x: 14, y: 26 },
  { x: 34, y: 10 },
  { x: 62, y: 12 },
  { x: 82, y: 26 },
  { x: 78, y: 46 },
];

const DEPOT = ARRETS[0];
const CIRCUIT = `M${ARRETS.map((a) => `${a.x} ${a.y}`).join(" L")} Z`;

/* Le sol du camion et la route du dépôt ne font qu'une ligne : la courbe part
   du dépôt, s'aplatit, et devient l'horizontale sur laquelle le camion roule. */
const ROUTE = "M58 52 C 66 78, 78 96, 104 104 L200 104";

/** Le contour du camion, arrière à gauche, museau à droite, sol à 104. */
const CARROSSERIE = "M108 92 L108 66 L160 66 L160 74 L173 74 L186 84 L192 84 L192 92 Z";

/** Les trois charges. Même largeur, même hauteur : c'est le propos. */
const PILES = [114, 128, 142];

function Tournees() {
  return (
    <>
      <path d={ROUTE} className="mot-trace mot-route" />
      <path d={CIRCUIT} className="mot-trace mot-tournee" />

      {ARRETS.slice(1).map((arret) => (
        <circle key={`${arret.x}-${arret.y}`} cx={arret.x} cy={arret.y} r={2.4} className="mot-site" />
      ))}

      <circle cx={DEPOT.x} cy={DEPOT.y} r={4.2} className="mot-depot" />

      <path d={CARROSSERIE} className="mot-trace" />
      {/* La cloison entre la caisse et la cabine, puis la portière. */}
      <path d="M160 74 L160 92" className="mot-trace" />
      <path d="M171 76 L171 92" className="mot-cellule" />
      <path d="M164 86 L167 86" className="mot-cellule" />
      {/* Les deux vitres : celle de la portière, et celle que taille
          l'inclinaison du pare-brise. */}
      <rect x={162} y={77} width={7} height={6} className="mot-cellule" />
      <path d="M174 77 L181 82 L174 82 Z" className="mot-cellule" />
      <rect x={190} y={86} width={2} height={3} className="mot-plein" />

      {/* La caisse en coupe : on voit ce qu'elle transporte. */}
      <rect x={112} y={70} width={44} height={18} className="mot-cellule" />
      {PILES.map((x, rang) => (
        <rect
          key={x}
          x={x}
          y={74}
          width={12}
          height={14}
          className="mot-plein mot-charge"
          data-part={rang}
        />
      ))}

      {[124, 176].map((x) => (
        <g key={x}>
          <circle cx={x} cy={98} r={6} className="mot-trace" />
          <circle cx={x} cy={98} r={3.2} className="mot-cellule" />
          <circle cx={x} cy={98} r={1.3} className="mot-site" />
        </g>
      ))}
    </>
  );
}
