import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEUIL_EMPILE } from "@/hooks/useEmpile";
import "./VoletRevelation.css";

gsap.registerPlugin(ScrollTrigger);

/** Les trois colonnes du volet, et le niveau où le pied de chacune s'arrête. */
interface Assise {
  /** Les deux abscisses où le bord change de niveau, en % de la fenêtre. */
  coupures: [number, number];
  /** Le niveau final du pied de chaque colonne, en % de la hauteur. */
  pieds: [number, number, number];
}

/** À défaut de panneau à épouser : une marche unique à mi-écran, et rien qui reste. */
const SANS_PANNEAU: Assise = { coupures: [50, 50], pieds: [0, 0, 0] };

/**
 * Le volet de révélation.
 *
 * C'est le mouvement que le site de référence répète à chaque changement de
 * section : la section qui arrive ne pousse pas la précédente, elle s'ouvre
 * par-dessus, et son bord d'ouverture n'est pas droit mais en marche. La
 * droite se découvre avant la gauche.
 *
 * Ce n'est pas un ornement de plus : la marche est la même forme que l'encoche
 * des panneaux, donc le même propos. Un domaine se réduit, et il se réduit par
 * paliers.
 *
 * Le volet ne se retire pas jusqu'à disparaître. Son pied s'arrête sur la
 * silhouette du panneau qu'il découvre : au ras du panneau à droite, au fond
 * de l'encoche au milieu, et seulement à gauche il remonte tout à fait pour
 * libérer le motif. Le nuit qui reste et le creux du panneau forment alors
 * deux équerres imbriquées. C'est la même figure que le logo, et elle n'est
 * dessinée par aucun bloc : elle est ce que le volet a cessé de couvrir.
 *
 * Le volet est du même bleu que le plan qu'il annonce ; quand sa course finit,
 * il n'y a donc rien à raccorder.
 */
interface Props {
  /** La section que le volet découvre. */
  cible: string;
  /** Le panneau dont le pied du volet épouse la silhouette. */
  panneau?: string;
  /** Les quatre repères lus pendant la course, sous le monogramme. */
  reperes?: { cle: string; valeur: string }[];
}

export function VoletRevelation({ cible, panneau, reperes }: Props) {
  const voletRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const volet = voletRef.current;
    if (!volet) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Sur un téléphone, le volet coûte trois écrans de défilement pour un
    // raccord qu'on ne voit qu'une fraction de seconde. Les sections s'y
    // suivent simplement.
    if (window.matchMedia(SEUIL_EMPILE).matches) return;

    const section = document.getElementById(cible);
    if (!section) return;

    /**
     * Où le panneau tombe dans son écran.
     *
     * On mesure plutôt que de recopier les valeurs du CSS : le panneau change
     * de largeur avec la fenêtre, et deux jeux de mesures finissent toujours
     * par diverger.
     */
    function jauger(): Assise {
      const cadre = panneau ? document.querySelector<HTMLElement>(panneau) : null;
      const ecran = cadre?.closest<HTMLElement>(".rel-scene");
      if (!cadre || !ecran) return SANS_PANNEAU;

      // Les proportions de l'encoche appartiennent à la carte, qui les pose
      // aussi sur le panneau lui-même.
      const reglages = getComputedStyle(cadre.parentElement ?? cadre);
      const creuxX = Number.parseFloat(reglages.getPropertyValue("--pan-creux-x")) || 0.34;
      const creuxY = Number.parseFloat(reglages.getPropertyValue("--pan-creux-y")) || 0.15;

      const boite = cadre.getBoundingClientRect();
      const scene = ecran.getBoundingClientRect();
      if (!scene.width || !scene.height) return SANS_PANNEAU;

      const large = (boite.width / scene.width) * 100;
      const haut = (boite.height / scene.height) * 100;
      const gauche = 100 - large;
      const sommet = 100 - haut;

      // Sur écran étroit le panneau prend toute la largeur : il ne reste aucune
      // colonne à gauche pour découvrir le motif, et un volet qui s'arrête sur
      // son bord haut le couvrirait sans qu'on voie pourquoi. Là, il se retire
      // entièrement.
      if (gauche < 8) return SANS_PANNEAU;

      return {
        coupures: [gauche, gauche + large * creuxX],
        // À gauche du panneau, rien ne reste ; dans l'encoche, le pied descend
        // jusqu'à son fond ; sur le panneau, il s'arrête à son bord haut.
        pieds: [0, sommet + haut * creuxY, sommet],
      };
    }

    let assise = jauger();

    // Six avancées, de 0 (fermé) à 1 (arrivé) : trois pour le bord haut, qui
    // ouvre le volet, trois pour le bord bas, qui le retire. Le décalage entre
    // colonnes fait l'escalier. Tout est en proportion, jamais en pixels,
    // sinon le volet ne tiendrait que sur un seul écran.
    const bords = { h0: 0, h1: 0, h2: 0, b0: 0, b1: 0, b2: 0 };

    function poser() {
      const { coupures, pieds } = assise;
      const x = [0, coupures[0], coupures[1], 100];
      const hauts = [bords.h0, bords.h1, bords.h2];
      const bas = [bords.b0, bords.b1, bords.b2];

      const points: string[] = [];
      // Le bord haut, de gauche à droite.
      for (let colonne = 0; colonne < 3; colonne += 1) {
        const niveau = 100 - hauts[colonne] * 100;
        points.push(`${x[colonne]}% ${niveau}%`, `${x[colonne + 1]}% ${niveau}%`);
      }
      // Puis le bord bas, en sens inverse, pour refermer le tracé.
      for (let colonne = 2; colonne >= 0; colonne -= 1) {
        const niveau = 100 - bas[colonne] * (100 - pieds[colonne]);
        points.push(`${x[colonne + 1]}% ${niveau}%`, `${x[colonne]}% ${niveau}%`);
      }

      volet!.style.clipPath = `polygon(${points.join(", ")})`;
    }

    poser();

    // La fenêtre change, le panneau aussi : on remesure, sinon le pied du
    // volet s'arrête à côté de l'encoche.
    function remesurer() {
      assise = jauger();
      poser();
    }

    window.addEventListener("resize", remesurer);
    ScrollTrigger.addEventListener("refresh", remesurer);

    const scene = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        // La course tient sur trois écrans : le premier ouvre le volet pendant
        // que la section précédente est encore épinglée, le deuxième le laisse
        // plein le temps qu'elle remonte derrière lui, le troisième le retire
        // par le haut et découvre la section. Sans le temps mort du milieu, on
        // reverrait passer la précédente entre les deux.
        start: "top bottom+=150%",
        end: "top top-=50%",
        scrub: 0.5,
        // Hors de sa course, le volet ne doit plus exister : au-delà, c'est le
        // plan de la section elle-même qui occupe l'écran, du même bleu.
        onToggle: ({ isActive }) => {
          volet!.style.visibility = isActive ? "visible" : "hidden";
        },
      },
      onUpdate: poser,
    });

    // L'ouverture : le volet monte et couvre l'écran, colonne après colonne
    // depuis la droite. L'escalier qui se dessine au passage est déjà celui de
    // l'encoche.
    scene.to(bords, { h2: 1, duration: 1, ease: "none" }, 0);
    scene.to(bords, { h1: 1, duration: 0.6, ease: "none" }, 0.35);
    scene.to(bords, { h0: 1, duration: 0.6, ease: "none" }, 0.5);

    // Le temps mort : le volet reste plein le temps que la section précédente
    // remonte derrière lui.
    scene.to({}, { duration: 1 }, 1);

    // Le retrait, qui est le geste inverse : le bas du volet monte à son tour
    // et découvre ce qu'il cachait, la droite avant la gauche. Chaque colonne
    // s'arrête où le panneau commence, et la dernière seule remonte tout à
    // fait.
    scene.to(bords, { b2: 1, duration: 1, ease: "none" }, 2);
    scene.to(bords, { b1: 1, duration: 0.6, ease: "none" }, 2.35);
    scene.to(bords, { b0: 1, duration: 0.6, ease: "none" }, 2.5);

    // Le monogramme arrive avec le volet et s'en va avant lui. Sans cette
    // sortie il restait plein écran jusqu'à ce que le volet passe en
    // visibility hidden, et disparaissait alors d'un coup : c'était la
    // cassure entre les deux écrans.
    scene.fromTo(
      ".vol-sigle",
      { opacity: 0, yPercent: 14 },
      { opacity: 1, yPercent: 0, duration: 0.6, ease: "none" },
      0.35,
    );
    scene.to(".vol-sigle", { opacity: 0, yPercent: -16, duration: 0.65, ease: "none" }, 1.35);

    return () => {
      window.removeEventListener("resize", remesurer);
      ScrollTrigger.removeEventListener("refresh", remesurer);
      scene.scrollTrigger?.kill();
      scene.kill();
    };
  }, [cible, panneau]);

  return (
    <div ref={voletRef} className="vol" aria-hidden="true">
      {/* Le centrage tient au conteneur, pas au monogramme : sa propre
          transformation est réservée à l'animation, qui l'écraserait sinon. */}
      <div className="vol-centre">
        {/* Le monogramme, et sous lui ce qu'il abrège. L'écran de raccord ne
            dure que le temps d'une course : quatre repères courts s'y lisent,
            une phrase n'y aurait pas le temps. */}
        <p className="vol-sigle">
          R<sup>229</sup>
        </p>
        {reperes ? (
          <dl className="vol-reperes">
            {reperes.map((repere) => (
              <div key={repere.cle}>
                <dt>{repere.cle}</dt>
                <dd>{repere.valeur}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </div>
  );
}
