import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PanneauEncoche } from "@/components/likova/PanneauEncoche";
import { PisteRelais } from "@/components/likova/PisteRelais";
import { FiletSegmente } from "@/components/likova/FiletSegmente";
import { MotifDomaine, type Motif } from "@/components/visuels/MotifDomaine";
import { SEUIL_EMPILE, useEmpile } from "@/hooks/useEmpile";
import "./Domaines.css";

gsap.registerPlugin(ScrollTrigger);

export interface Domaine {
  motif: Motif;
  titre: string[];
  /** Ce sur quoi l'équipe travaille dans ce domaine, un sujet par ligne. */
  sujets: string[];
}

/** Le déplacement d'un motif qui sort ou qui entre, en pourcentage de sa hauteur. */
const GLISSADE = 62;

/**
 * Les domaines de recherche, un par écran.
 *
 * Le plan reste au bleu nuit pendant toute la section et porte le motif du
 * domaine courant ; le panneau à encoche se pose dessus et porte les mots. On
 * lit un domaine à la fois, jamais quatre cartes côte à côte.
 *
 * Chaque domaine tient un écran et demi de défilement. À un seul écran, un
 * coup de molette suffisait à passer au suivant et la section fuyait sous les
 * doigts : ces sujets demandent qu'on s'arrête, la course leur en laisse le
 * temps.
 */
export function Domaines({ domaines }: { domaines: Domaine[] }) {
  const empile = useEmpile();

  return (
    <section id="domaines" className="dom">
      <PisteRelais nombre={domaines.length} course={1.7} className="dom-scene">
        {(rang) => (
          <>
            {/* Empilé, chaque domaine porte son seul motif : la relève n'a plus
                lieu d'être, et garder les quatre montés quatre fois ferait
                seize dessins pour n'en montrer qu'un. */}
            {empile ? (
              <PlanSeul motif={domaines[rang].motif} />
            ) : (
              <PlanMotifs domaines={domaines} rang={rang} />
            )}
            <Carte domaine={domaines[rang]} rang={rang} total={domaines.length} />
          </>
        )}
      </PisteRelais>
    </section>
  );
}

/** Le plan d'un seul domaine, sans relève : ce qu'il faut sur un téléphone. */
function PlanSeul({ motif }: { motif: Motif }) {
  return (
    <div className="dom-plan">
      <div className="dom-vue" data-vue-seule="">
        <MotifDomaine motif={motif} />
      </div>
    </div>
  );
}

/**
 * Le plan de fond, et le passage d'un motif au suivant.
 *
 * Les quatre motifs restent en place et se relaient : le sortant s'en va du
 * côté d'où l'on vient, l'entrant arrive de l'autre, et le mouvement suit donc
 * le sens du défilement. Un simple remplacement faisait clignoter le dessin, ce
 * qui était le plus brutal de la section.
 *
 * C'est aussi pour cela qu'ils ne sont pas démontés : il faut les deux, le
 * partant et l'arrivant, pour que la relève se voie.
 */
function PlanMotifs({ domaines, rang }: { domaines: Domaine[]; rang: number }) {
  const planRef = useRef<HTMLDivElement>(null);
  const veille = useRef<number | null>(null);

  useGSAP(
    () => {
      const plan = planRef.current;
      if (!plan) return;

      const avant = veille.current;
      veille.current = rang;

      const doux = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (avant === null) {
        // Premier passage : seul le motif courant est là, et il monte quand la
        // section arrive. C'est ce qui raccorde le plan au volet qui vient de
        // l'ouvrir, au lieu de le trouver déjà posé.
        gsap.set(`.dom-vue[data-rang="${rang}"]`, { opacity: 1 });
        if (!doux) return;

        const arrivee = gsap.fromTo(
          `.dom-vue[data-rang="${rang}"]`,
          { yPercent: GLISSADE, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            // Le motif entre pendant que le volet se retire, pas avant : sinon
            // il monterait derrière lui et l'on découvrirait un dessin déjà posé.
            scrollTrigger: { trigger: "#domaines", start: "top top-=15%", once: true },
          },
        );

        return () => {
          arrivee.scrollTrigger?.kill();
          arrivee.kill();
        };
      }

      if (avant === rang || !doux) return;

      // On descend : le sortant part vers le haut et l'entrant vient du bas.
      // En remontant, tout s'inverse, sinon le geste contredit la molette.
      const descend = rang > avant;

      gsap.to(`.dom-vue[data-rang="${avant}"]`, {
        yPercent: descend ? -GLISSADE : GLISSADE,
        opacity: 0,
        duration: 0.9,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        `.dom-vue[data-rang="${rang}"]`,
        { yPercent: descend ? GLISSADE : -GLISSADE, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.inOut" },
      );
    },
    { scope: planRef, dependencies: [rang] },
  );

  return (
    <div ref={planRef} className="dom-plan" data-derive="80">
      {domaines.map((domaine, position) => (
        <div key={domaine.motif} className="dom-vue" data-rang={position}>
          <MotifDomaine motif={domaine.motif} actif={position === rang} />
        </div>
      ))}
    </div>
  );
}

/**
 * Un domaine en place.
 *
 * Tout entre dans l'ordre où cela se lit : le panneau se pose, son titre
 * remonte ligne à ligne depuis son masque, puis les sujets se découvrent l'un
 * après l'autre. C'est le mouvement du site de référence, où rien n'apparaît
 * d'un bloc.
 */
function Carte({ domaine, rang, total }: { domaine: Domaine; rang: number; total: number }) {
  const carteRef = useRef<HTMLDivElement>(null);
  const veille = useRef<number | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Au premier domaine, l'entrée attend qu'on arrive sur la section. Sans
      // cela elle jouait au chargement de la page, très loin plus haut, et le
      // panneau était déjà posé quand le volet s'ouvrait dessus.
      const premier = veille.current === null;
      veille.current = rang;

      // Empilé, chaque carte attend qu'on arrive sur elle : elles sont toutes
      // montées d'un coup, et sans cela les quatre joueraient au chargement.
      let reglage: gsap.TimelineVars = {};
      if (window.matchMedia(SEUIL_EMPILE).matches) {
        reglage = { scrollTrigger: { trigger: carteRef.current, start: "top 80%", once: true } };
      } else if (premier) {
        reglage = { scrollTrigger: { trigger: "#domaines", start: "top top-=15%", once: true } };
      }

      const scene = gsap.timeline(reglage);

      scene.fromTo(
        ".dom-panneau",
        { yPercent: 4, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        0,
      );

      scene.fromTo(
        ".dom-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.07 },
        0.12,
      );

      scene.fromTo(
        ".dom-sujets li",
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 },
        0.24,
      );

      scene.fromTo(
        ".dom-compte",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" },
        0.6,
      );

      return () => {
        scene.scrollTrigger?.kill();
        scene.kill();
      };
    },
    // Le rang, et non le domaine : c'est le passage d'un domaine au suivant
    // qui doit rejouer le mouvement.
    { scope: carteRef, dependencies: [rang] },
  );

  return (
    <div ref={carteRef} className="dom-carte">
      <PanneauEncoche
        coin="haut-gauche"
        ton="clair"
        entaille={{ x: 34, y: 15 }}
        className="dom-panneau"
        data-derive="-34"
      >
        <h2 className="dom-titre">
          {domaine.titre.map((ligne) => (
            <span key={ligne} className="dom-ligne">
              <span>{ligne}</span>
            </span>
          ))}
        </h2>

        <ul className="dom-sujets">
          {domaine.sujets.map((sujet) => (
            <li key={sujet}>{sujet}</li>
          ))}
        </ul>

        <FiletSegmente total={total} rang={rang} />

        <div className="dom-compte">
          <span>{rang + 1}</span>
          <span className="dom-total">/ {total}</span>
        </div>
      </PanneauEncoche>
    </div>
  );
}
