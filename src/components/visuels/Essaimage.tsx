import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Essaimage.css";

const LARGEUR = 1000;
const HAUTEUR = 620;

/** Le noyau est décentré vers la droite : le texte de la section tient à gauche. */
const NOYAU = { x: 566, y: 312 };

/**
 * Une couronne par édition. Chacune est plus peuplée et plus large que la
 * précédente, ce qui est exactement ce que le chiffre raconte : un atelier
 * qui a rassemblé plus de monde à chaque fois.
 */
const EDITIONS = [
  { rayon: 58, membres: 5 },
  { rayon: 114, membres: 8 },
  { rayon: 172, membres: 12 },
  { rayon: 228, membres: 16 },
  { rayon: 282, membres: 21 },
];

/** L'ecrasement des couronnes, qui suit le format du cadre. */
const LARGE = 1.22;
const HAUT = 0.82;

/* La communaute ne depend d'aucune donnee : on la calcule une fois pour toutes
   au chargement du module, et non a chaque montage du composant. */
const { membres, attaches } = construire();

/** Suite pseudo-aléatoire reproductible : la même communauté à chaque visite. */
function graine(valeur: number) {
  return () => {
    valeur = (valeur + 0x6d2b79f5) | 0;
    let t = Math.imul(valeur ^ (valeur >>> 15), 1 | valeur);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Membre {
  x: number;
  y: number;
  edition: number;
}

interface Attache {
  d: string;
  edition: number;
}

/**
 * L'essaimage.
 *
 * Cinq éditions du Benin Workshop on Artificial Intelligence, cinq couronnes.
 * Chaque personne d'une édition se rattache à quelqu'un de l'édition
 * précédente : c'est ainsi qu'une communauté scientifique grandit, par
 * proche-en-proche, et non par recrutement depuis le centre.
 *
 * La dernière couronne est la seule au miel. Les quatre autres sont là, mais
 * en retrait : on lit du premier coup où en est l'atelier, tout en voyant d'où
 * il vient.
 *
 * L'animation part du noyau et gagne les couronnes une par une, une édition
 * après l'autre. Elle joue une fois puis s'arrête.
 */
export function Essaimage() {
  const zoneRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();

      scene.fromTo(
        ".ess-noyau",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.6, ease: "back.out(2)" },
        0,
      );

      // Une édition après l'autre : d'abord le cercle de l'année, puis les
      // rattachements, puis les personnes. L'ordre compte, c'est celui dans
      // lequel les choses se sont produites.
      for (let edition = 0; edition < EDITIONS.length; edition += 1) {
        const debut = 0.4 + edition * 0.55;

        scene.fromTo(
          `.ess-anneau[data-edition="${edition}"]`,
          { scale: 0.72, opacity: 0, transformOrigin: "center" },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          debut,
        );

        scene.fromTo(
          `.ess-attache[data-edition="${edition}"]`,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.02 },
          debut + 0.15,
        );

        // C'est le groupe de l'édition qui bouge, pas chacun de ses membres.
        // Animer soixante-deux cercles obligeait GSAP à lire soixante-deux
        // styles calculés, et ces lectures bloquaient le défilement.
        scene.fromTo(
          `.ess-couronne[data-edition="${edition}"]`,
          { scale: 0.86, opacity: 0, transformOrigin: `${NOYAU.x}px ${NOYAU.y}px` },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.6)" },
          debut + 0.28,
        );
      }

      return () => scene.kill();
    },
    { scope: zoneRef },
  );

  return (
    <svg
      ref={zoneRef}
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      className="ess"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Le dessin s'efface vers les bords, et davantage a gauche, ou se
            tient le texte de la section. */}
        <radialGradient id="ess-etendue" cx="57%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id="ess-masque">
          <rect width={LARGEUR} height={HAUTEUR} fill="url(#ess-etendue)" />
        </mask>
      </defs>

      <g mask="url(#ess-masque)">
        {EDITIONS.map((edition, rang) => (
          <ellipse
            key={`a${rang}`}
            cx={NOYAU.x}
            cy={NOYAU.y}
            rx={edition.rayon * LARGE}
            ry={edition.rayon * HAUT}
            data-edition={rang}
            className={rang === EDITIONS.length - 1 ? "ess-anneau ess-derniere" : "ess-anneau"}
          />
        ))}

        {/* Un trace par edition : les rattachements d'une meme annee partagent
            encre et epaisseur, ils tiennent donc dans un seul element. */}
        {attaches.map((attache) => (
          <path
            key={attache.edition}
            d={attache.d}
            data-edition={attache.edition}
            className="ess-attache"
          />
        ))}

        {/* Un groupe par edition : c'est lui qu'on anime, pas ses membres. */}
        {EDITIONS.map((_, rang) => (
          <g
            key={`c${rang}`}
            data-edition={rang}
            className={rang === EDITIONS.length - 1 ? "ess-couronne ess-recente" : "ess-couronne"}
          >
            {membres
              .filter((membre) => membre.edition === rang)
              .map((membre) => (
                <circle
                  key={`${membre.x}-${membre.y}`}
                  cx={membre.x}
                  cy={membre.y}
                  r={rang === EDITIONS.length - 1 ? 6 : 4.5}
                  className="ess-membre"
                />
              ))}
          </g>
        ))}
      </g>

      <circle cx={NOYAU.x} cy={NOYAU.y} r={11} className="ess-noyau" />
    </svg>
  );
}

function construire() {
  const tirage = graine(20260819);
  const membres: Membre[] = [];
  const attaches: Attache[] = [];

  let precedente: Membre[] = [];

  for (const [rang, edition] of EDITIONS.entries()) {
    const couronne: Membre[] = [];
    // Un décalage propre à chaque couronne, sinon les personnes se rangent en
    // rayons bien alignés et l'ensemble prend l'air d'une cible.
    const depart = tirage() * Math.PI * 2;

    for (let place = 0; place < edition.membres; place += 1) {
      const angle = depart + (place / edition.membres) * Math.PI * 2 + (tirage() - 0.5) * 0.34;
      const distance = edition.rayon + (tirage() - 0.5) * 30;
      couronne.push({
        x: Number((NOYAU.x + Math.cos(angle) * distance * LARGE).toFixed(1)),
        y: Number((NOYAU.y + Math.sin(angle) * distance * HAUT).toFixed(1)),
        edition: rang,
      });
    }

    const liens: string[] = [];
    for (const membre of couronne) {
      // Chacun se rattache au plus proche de l'édition d'avant, ou au noyau
      // pour la première : la filiation se voit sans avoir à la légender.
      const parent = precedente.length > 0 ? plusProche(membre, precedente) : NOYAU;
      const pivotX = (membre.x + parent.x) / 2 + (tirage() - 0.5) * 26;
      const pivotY = (membre.y + parent.y) / 2 + (tirage() - 0.5) * 26;
      liens.push(
        `M${parent.x} ${parent.y} Q${pivotX.toFixed(1)} ${pivotY.toFixed(1)} ${membre.x} ${membre.y}`,
      );
    }

    attaches.push({ d: liens.join(" "), edition: rang });

    membres.push(...couronne);
    precedente = couronne;
  }

  return { membres, attaches };
}

function plusProche(membre: Membre, candidats: Membre[]) {
  let retenu = candidats[0];
  let ecart = Math.hypot(membre.x - retenu.x, membre.y - retenu.y);

  for (const candidat of candidats) {
    const mesure = Math.hypot(membre.x - candidat.x, membre.y - candidat.y);
    if (mesure < ecart) {
      ecart = mesure;
      retenu = candidat;
    }
  }

  return retenu;
}
