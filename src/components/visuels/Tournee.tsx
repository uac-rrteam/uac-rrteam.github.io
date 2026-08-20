import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Tournee.css";

const LARGEUR = 1000;
const HAUTEUR = 620;

/**
 * Le contour du Bénin.
 *
 * Tracé d'après les frontières administratives ouvertes de geoBoundaries,
 * simplifié à soixante-dix-neuf sommets par Douglas-Peucker, puis projeté en
 * équirectangulaire avec la longitude resserrée par le cosinus de la latitude
 * moyenne : sans ce facteur le pays paraîtrait plus large qu'il n'est.
 */
const CONTOUR =
  "M655.2 571.0 L656.3 554.6 L660.9 548.8 L656.0 539.5 L655.4 522.6 L661.0 517.4 L656.7 484.6 L662.1 477.0 L655.3 471.9 L658.3 415.5 L654.7 402.4 L662.1 335.5 L690.2 329.3 L697.3 312.4 L695.2 297.3 L706.3 280.2 L713.4 278.0 L712.0 266.9 L729.6 260.7 L738.5 249.5 L743.9 234.7 L736.0 222.0 L740.4 209.0 L753.2 210.5 L758.6 195.0 L758.3 185.3 L749.4 176.1 L749.0 148.7 L745.2 149.3 L727.3 127.6 L734.4 90.7 L724.6 77.1 L709.7 74.5 L701.9 60.3 L663.9 26.0 L652.9 29.0 L652.3 36.2 L643.5 35.5 L633.2 42.2 L626.5 39.9 L635.8 66.1 L630.4 67.9 L621.1 95.6 L594.3 115.1 L580.9 113.2 L557.4 119.3 L551.7 113.9 L540.4 113.3 L531.1 123.1 L531.9 128.6 L524.8 127.1 L524.0 133.6 L513.2 131.7 L513.8 141.9 L506.8 145.3 L511.1 153.9 L498.9 149.1 L497.2 157.2 L493.4 157.4 L489.4 175.4 L483.1 182.7 L481.4 199.5 L482.0 211.0 L531.6 248.4 L530.9 287.7 L538.4 308.1 L556.3 335.3 L560.7 477.1 L559.5 523.0 L552.9 523.2 L558.7 545.8 L554.5 553.5 L565.8 564.7 L575.2 586.3 L558.2 590.0 L559.8 594.0 L639.9 583.2 L655.1 579.3 L655.2 571.0 Z";

interface Ville {
  nom: string;
  x: number;
  y: number;
}

/**
 * Dix-neuf villes du pays, à leur place réelle.
 *
 * Cotonou vient en premier : c'est le port, donc le dépôt d'où part et où
 * revient la tournée. Les autres suivent du sud au nord.
 */
const VILLES: Ville[] = [
  { nom: "Cotonou", x: 629.3, y: 579.8 },
  { nom: "Porto-Novo", x: 648.3, y: 568.3 },
  { nom: "Ouidah", x: 599.1, y: 580.3 },
  { nom: "Grand-Popo", x: 575.5, y: 588.0 },
  { nom: "Lokossa", x: 565.9, y: 555.2 },
  { nom: "Abomey", x: 590.7, y: 505.2 },
  { nom: "Bohicon", x: 597.5, y: 505.8 },
  { nom: "Dassa-Zoumè", x: 608.0, y: 453.5 },
  { nom: "Savalou", x: 589.3, y: 437.2 },
  { nom: "Savè", x: 635.4, y: 427.4 },
  { nom: "Parakou", x: 648.4, y: 308.1 },
  { nom: "Djougou", x: 561.2, y: 274.1 },
  { nom: "Nikki", x: 700.9, y: 252.9 },
  { nom: "Natitingou", x: 535.4, y: 219.5 },
  { nom: "Tanguiéta", x: 525.2, y: 190.3 },
  { nom: "Kandi", x: 676.3, y: 143.5 },
  { nom: "Banikoara", x: 631.1, y: 128.5 },
  { nom: "Ségbana", x: 744.5, y: 162.2 },
  { nom: "Malanville", x: 717.1, y: 76.3 },
];

/** Combien de voisins proches chaque ville garde dans le graphe candidat. */
const VOISINS = 4;

/* Le dessin ne depend d'aucune donnee : on le calcule une fois pour toutes au
   chargement du module. Le refaire a chaque montage, en plein changement de
   chiffre, coutait une demi-seconde sur une machine modeste. */
const { trame, circuit } = construire();

/**
 * La tournée.
 *
 * Le problème du voyageur de commerce posé sur le pays réel : dix-neuf villes
 * du Bénin à leur place, et le circuit qui part de Cotonou, les visite toutes
 * une fois et revient au port. C'est le sujet même de l'école d'été que le
 * chiffre annonce, et c'est aussi ce que l'équipe traite en optimisation, des
 * tournées de véhicules appliquées à la logistique.
 *
 * La trame de fond n'est pas le graphe complet mais le graphe candidat, celui
 * que tout solveur construit d'abord : chaque ville garde ses quatre voisins
 * les plus proches. Les cent soixante-et-onze trajets possibles auraient fait
 * une bouillie sur un pays aussi étroit, et aucun solveur ne les examine tous.
 *
 * Le circuit n'est pas dessiné à la main. Il est construit au plus proche
 * voisin, décroisé par 2-opt puis corrigé par Or-opt, et il changerait donc si
 * l'on ajoutait une ville.
 */
export function Tournee() {
  const zoneRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scene = gsap.timeline();
      let vehicule: gsap.core.Tween | null = null;

      // Le pays se dessine d'abord : c'est le cadre dans lequel tout le reste
      // prend son sens.
      const frontiere = zoneRef.current?.querySelector<SVGPathElement>(".tou-pays");
      if (frontiere) {
        const tour = frontiere.getTotalLength();
        scene.fromTo(
          frontiere,
          { strokeDasharray: tour, strokeDashoffset: tour },
          { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" },
          0,
        );
      }

      scene.fromTo(".tou-arete", { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power1.out" }, 0.9);

      // Le groupe entier, et non chaque ville : dix-neuf lectures de style
      // calculé de moins, et c'est ce que le profil désignait.
      scene.fromTo(".tou-villes", { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, 1.1);

      const trace = zoneRef.current?.querySelector<SVGPathElement>(".tou-circuit");
      if (trace) {
        const longueur = trace.getTotalLength();
        scene.fromTo(
          trace,
          { strokeDasharray: longueur, strokeDashoffset: longueur },
          { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" },
          1.7,
        );

        // Le véhicule fait ensuite sa tournée en boucle. Un seul segment
        // animé : c'est ce qui donne la vie sans rien coûter.
        const passage = zoneRef.current?.querySelector<SVGPathElement>(".tou-passage");
        if (passage) {
          gsap.set(passage, { strokeDasharray: `${longueur * 0.07} ${longueur}` });
          vehicule = gsap.fromTo(
            passage,
            { strokeDashoffset: longueur * 0.07 },
            {
              strokeDashoffset: -longueur,
              duration: 7,
              ease: "none",
              repeat: -1,
              delay: 4.2,
            },
          );
        }
      }

      // Hors de l'écran, la tournée du véhicule ferait travailler la machine
      // pour un dessin que personne ne regarde. L'observateur la suspend.
      const guetteur = new IntersectionObserver(
        ([vue]) => {
          if (!vehicule) return;
          if (vue.isIntersecting) vehicule.resume();
          else vehicule.pause();
        },
        { threshold: 0 },
      );
      if (zoneRef.current) guetteur.observe(zoneRef.current);

      return () => {
        guetteur.disconnect();
        vehicule?.kill();
        scene.kill();
      };
    },
    { scope: zoneRef },
  );

  return (
    <svg
      ref={zoneRef}
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      className="tou"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={CONTOUR} className="tou-pays" />

      {/* Les trajets candidats, ceux que le solveur a pesés puis écartés. Ils
          partagent tous la même encre, donc un seul tracé les porte. */}
      <path d={trame} className="tou-arete" />

      <path d={circuit} className="tou-circuit" />
      <path d={circuit} className="tou-passage" />

      <g className="tou-villes">
        {VILLES.map((ville, rang) => (
          <circle
            key={ville.nom}
            cx={ville.x}
            cy={ville.y}
            r={rang === 0 ? 7 : 3.6}
            className={rang === 0 ? "tou-ville tou-depot" : "tou-ville"}
          />
        ))}
      </g>
    </svg>
  );
}

function construire() {
  const morceaux: string[] = [];
  const vues = new Set<string>();

  // Le graphe candidat : chaque ville retient ses plus proches voisins. Une
  // arête déjà posée dans l'autre sens n'est pas redessinée.
  for (let depart = 0; depart < VILLES.length; depart += 1) {
    const proches = VILLES.map((_, rang) => rang)
      .filter((rang) => rang !== depart)
      .sort(
        (un, deux) => distance(VILLES[depart], VILLES[un]) - distance(VILLES[depart], VILLES[deux]),
      )
      .slice(0, VOISINS);

    for (const arrivee of proches) {
      const cle = depart < arrivee ? `${depart}-${arrivee}` : `${arrivee}-${depart}`;
      if (vues.has(cle)) continue;
      vues.add(cle);
      morceaux.push(
        `M${VILLES[depart].x} ${VILLES[depart].y} L${VILLES[arrivee].x} ${VILLES[arrivee].y}`,
      );
    }
  }

  let ordre = ameliorer(plusProcheVoisin(0), VILLES);
  let meilleure = longueurTotale(ordre, VILLES);

  // Un départ sur quatre suffit. Repartir des dix-neuf villes donnait le même
  // circuit pour bien plus de calcul, et ce calcul tombe en plein défilement.
  for (let depart = 3; depart < VILLES.length; depart += 4) {
    const candidat = ameliorer(plusProcheVoisin(depart), VILLES);
    const mesure = longueurTotale(candidat, VILLES);
    if (mesure < meilleure) {
      meilleure = mesure;
      ordre = candidat;
    }
  }

  // Cotonou reste la première ville dessinée, quel que soit le départ qui a
  // gagné : c'est le port, et c'est lui qu'on marque au miel.
  const place = ordre.indexOf(0);
  ordre = [...ordre.slice(place), ...ordre.slice(0, place)];

  const etapes = ordre.map((rang) => `${VILLES[rang].x} ${VILLES[rang].y}`);
  return { trame: morceaux.join(" "), circuit: `M${etapes.join(" L")} Z` };
}

function distance(un: Ville, deux: Ville) {
  return Math.hypot(un.x - deux.x, un.y - deux.y);
}

function longueurTotale(ordre: number[], villes: Ville[]) {
  let cumul = 0;
  for (let rang = 0; rang < ordre.length; rang += 1) {
    cumul += distance(villes[ordre[rang]], villes[ordre[(rang + 1) % ordre.length]]);
  }
  return cumul;
}

/** Un premier circuit : on part d'une ville et on va toujours au plus proche. */
function plusProcheVoisin(depart: number) {
  const restantes = VILLES.map((_, rang) => rang).filter((rang) => rang !== depart);
  const ordre = [depart];

  while (restantes.length > 0) {
    const courante = VILLES[ordre[ordre.length - 1]];
    let meilleure = 0;
    for (let rang = 1; rang < restantes.length; rang += 1) {
      if (
        distance(courante, VILLES[restantes[rang]]) < distance(courante, VILLES[restantes[meilleure]])
      ) {
        meilleure = rang;
      }
    }
    ordre.push(restantes[meilleure]);
    restantes.splice(meilleure, 1);
  }

  return ordre;
}

/**
 * 2-opt puis Or-opt, en alternance. Le premier décroise les arêtes, le second
 * déplace une ville mal placée ailleurs sur le circuit : sans lui il reste des
 * crochets en V qu'aucun solveur du domaine ne laisserait passer.
 */
function ameliorer(depart: number[], villes: Ville[]) {
  let ordre = depart;
  let tours = 0;
  let progresse = true;

  while (progresse && tours < 40) {
    tours += 1;
    progresse = decroiser(ordre, villes);
    const deplace = reinserer(ordre, villes);
    if (deplace) {
      ordre = deplace;
      progresse = true;
    }
  }

  return ordre;
}

/** 2-opt : deux arêtes qui se croisent se décroisent en inversant le tronçon. */
function decroiser(ordre: number[], villes: Ville[]) {
  const total = ordre.length;
  let progresse = false;
  let tours = 0;

  let encore = true;
  while (encore && tours < 60) {
    encore = false;
    tours += 1;

    for (let un = 1; un < total - 1; un += 1) {
      for (let deux = un + 1; deux < total; deux += 1) {
        const avant =
          distance(villes[ordre[un - 1]], villes[ordre[un]]) +
          distance(villes[ordre[deux]], villes[ordre[(deux + 1) % total]]);
        const apres =
          distance(villes[ordre[un - 1]], villes[ordre[deux]]) +
          distance(villes[ordre[un]], villes[ordre[(deux + 1) % total]]);

        if (apres < avant - 0.01) {
          const troncon = ordre.slice(un, deux + 1).reverse();
          ordre.splice(un, troncon.length, ...troncon);
          encore = true;
          progresse = true;
        }
      }
    }
  }

  return progresse;
}

/**
 * Or-opt : on retire une ville et on la replace là où elle coûte le moins.
 * C'est ce qui supprime les allers-retours vers un point isolé, que le 2-opt
 * ne sait pas défaire parce qu'aucune arête ne s'y croise.
 */
function reinserer(ordre: number[], villes: Ville[]) {
  const reference = longueurTotale(ordre, villes);

  for (let place = 0; place < ordre.length; place += 1) {
    const reste = [...ordre];
    const [ville] = reste.splice(place, 1);

    for (let cible = 0; cible <= reste.length; cible += 1) {
      if (cible === place) continue;
      const essai = [...reste.slice(0, cible), ville, ...reste.slice(cible)];
      if (longueurTotale(essai, villes) < reference - 0.01) return essai;
    }
  }

  return null;
}
