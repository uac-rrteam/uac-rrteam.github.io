import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Elevation } from "@/components/visuels/Elevation";
import { useEmpile } from "@/hooks/useEmpile";
import "./Ouverture.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  /** Les deux phrases qui se succèdent à droite. */
  these: string[][];
  /** La troisième, sur téléphone seulement : elle se pose à mi-hauteur des tours. */
  tierce?: string[];
}

/**
 * L'ouverture.
 *
 * Relevée image par image sur le site de référence : la scène est épinglée
 * pendant trois écrans, et quatre couches y montent à quatre vitesses
 * différentes.
 *
 * 1. Le bandeau du logotype part le premier, à la vitesse du défilement, et
 *    pendant qu'il monte le nom rétrécit jusqu'à venir se poser exactement à
 *    la place qu'il occupera dans l'en-tête. Le relais est invisible.
 * 2. L'élévation monte deux fois moins vite : c'est ce décalage qui donne la
 *    profondeur, et c'est en la laissant sortir que le bleu nuit du site
 *    finit par occuper tout l'écran.
 * 3. Le cartouche monte trois fois moins vite encore.
 * 4. La phrase de droite s'efface tôt, une seconde prend sa place.
 *
 * Le nom est en fusion « différence » : il s'écrit sombre tant qu'il est sur
 * le gris os du bandeau, clair dès qu'il passe sur la nuit. Une seule couleur
 * déclarée, deux lectures.
 *
 * Sur un téléphone, la scène garde sa course mais change de sujet. C'est la
 * seule de la page à rester épinglée, et ce qu'on épingle est le bâtiment :
 * debout, au sol, il grandit sur place pendant que la coiffe le découvre et
 * que trois textes se relaient, le dernier venant se poser contre les tours. Le nom ne rejoint plus l'en-tête, qui n'y
 * montre que le trait du menu : il sort par le haut avec la coiffe.
 */
export function Ouverture({ these, tierce }: Props) {
  const pisteRef = useRef<HTMLDivElement>(null);
  const empile = useEmpile();

  useGSAP(
    () => {
      const piste = pisteRef.current;
      if (!piste) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Sur téléphone, la scène s'épingle elle aussi, mais elle est la seule
      // de la page à le faire. Le bâtiment y est debout et ne quitte jamais le
      // sol : il grandit sur place pendant qu'on descend, les deux phrases se
      // relaient au-dessus de lui, et il ne lâche l'écran qu'au moment où le
      // texte suivant arrive par le bas.
      if (empile) {
        const coiffeM = piste.querySelector<HTMLElement>(".ouv-coiffe")!;
        const nomM = piste.querySelector<HTMLElement>(".ouv-nom")!;
        // Le nom part avec la coiffe et de la même distance qu'elle : posé
        // contre son bord bas, il quitte l'écran à l'instant où elle achève de
        // le découvrir.
        const remontee = coiffeM.offsetHeight;

        const arrivee = gsap.timeline();
        arrivee.fromTo(
          ".ouv-these-a",
          { yPercent: 30, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.1,
        );
        arrivee.fromTo(
          nomM,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.25,
        );

        const course = gsap.timeline({
          scrollTrigger: { trigger: piste, start: "top top", end: "bottom bottom", scrub: 0.4 },
        });

        course.to(coiffeM, { yPercent: -100, ease: "none", duration: 0.42 }, 0);
        course.to(nomM, { y: -remontee, ease: "none", duration: 0.42 }, 0);

        // Le zoom se fait sol au sol : une translation ferait décoller le
        // bâtiment et découvrirait du vide sous lui.
        //
        // Son ampleur se mesure au lieu d'être fixée. Le dessin se cale sur la
        // largeur de l'écran, donc sa hauteur au repos ne dépend pas de celle
        // de l'écran : un même facteur remplit un téléphone court et laisse un
        // tiers de nuit vide sur un téléphone long. On vise une hauteur
        // d'arrivée, et on en déduit le facteur.
        const boite = piste.querySelector<HTMLElement>(".ouv-plan")!;
        const dessin = boite.querySelector<SVGSVGElement>(".elv")!;
        const cadre = dessin.viewBox.baseVal;
        const auRepos =
          cadre.height * Math.min(boite.clientWidth / cadre.width, boite.clientHeight / cadre.height);
        const zoom = Math.min(1.9, Math.max(1.3, (0.86 * boite.clientHeight) / auRepos));

        course.to(
          ".ouv-plan",
          { scale: zoom, transformOrigin: "50% 100%", ease: "power1.in", duration: 1 },
          0,
        );

        course.fromTo(
          ".ouv-plan .elv-tardive",
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: 0.7, stagger: { each: 0.02, from: "start" } },
          0.12,
        );

        // Les deux phrases se relaient, la seconde une fois le nom sorti :
        // posés tous deux dans le haut de l'écran, ils se croisaient.
        course.to(".ouv-these-a", { autoAlpha: 0, y: -24, ease: "none", duration: 0.12 }, 0.1);
        course.fromTo(
          ".ouv-these-b",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, ease: "none", duration: 0.14 },
          0.3,
        );

        // Troisième temps : l'identité s'efface et le propos vient se poser
        // contre les tours, à gauche et à mi-hauteur. Sans lui, la seconde
        // moitié de la course n'était plus qu'un décor qui grossit.
        course.to(".ouv-these-b", { autoAlpha: 0, y: -20, ease: "none", duration: 0.1 }, 0.6);
        course.fromTo(
          ".ouv-tierce",
          { autoAlpha: 0, x: -18 },
          { autoAlpha: 1, x: 0, ease: "none", duration: 0.14 },
          0.7,
        );

        return () => {
          course.scrollTrigger?.kill();
          course.kill();
          arrivee.kill();
        };
      }

      const nom = piste.querySelector<HTMLElement>(".ouv-nom")!;
      const cible = document.querySelector<HTMLElement>(".ent-tete-nom");

      // Où le nom doit atterrir : la place exacte du logotype de l'en-tête. On
      // la mesure plutôt que de la coder, sinon le raccord ne tiendrait que
      // sur une seule largeur d'écran.
      let ecart: { x: number; y: number; echelle: number } | null = null;
      if (cible && cible.getBoundingClientRect().width > 0) {
        const depart = nom.getBoundingClientRect();
        const arrivee = cible.getBoundingClientRect();
        ecart = {
          x: arrivee.left - depart.left,
          y: arrivee.top - depart.top,
          echelle: arrivee.width / depart.width,
        };
      }

      const scene = gsap.timeline({
        scrollTrigger: { trigger: piste, start: "top top", end: "bottom bottom", scrub: 0.4 },
      });

      // La coiffe et le nom : sortis au tiers de la course.
      const coiffe = piste.querySelector<HTMLElement>(".ouv-coiffe")!;
      scene.to(coiffe, { yPercent: -100, ease: "none", duration: 0.34 }, 0);
      scene.to(".ouv-descendre", { autoAlpha: 0, ease: "none", duration: 0.14 }, 0);
      if (ecart) {
        scene.to(nom, { x: ecart.x, y: ecart.y, scale: ecart.echelle, ease: "none", duration: 0.34 }, 0);
      } else {
        scene.to(nom, { y: -(nom.offsetTop + nom.offsetHeight), ease: "none", duration: 0.34 }, 0);
      }

      // L'élévation ne sort pas par le haut : elle grossit, sol au sol. C'est
      // le travelling du site de référence, on s'approche du bâtiment. Une
      // translation seule laisserait un vide sous elle à mi-course.
      scene.to(
        ".ouv-plan",
        { scale: 1.3, y: "-5%", transformOrigin: "50% 100%", ease: "power1.in", duration: 1 },
        0,
      );

      // La propagation : des valeurs se fixent de proche en proche pendant
      // qu'on descend. C'est un mouvement qui dit quelque chose de vrai, une
      // résolution qui avance, et c'est le seul endroit du site où le miel
      // gagne du terrain.
      scene.fromTo(
        ".ouv-plan .elv-tardive",
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.8, stagger: { each: 0.02, from: "start" } },
        0.1,
      );

      // Le cartouche, le plus lent des quatre. Il n'est pas là au chargement :
      // il se découvre pendant que la coiffe claire remonte, et se lit donc
      // quand le bleu a repris tout l'écran, jamais avant.
      scene.fromTo(
        ".ouv-cartouche",
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "none", duration: 0.14 },
        0.16,
      );
      scene.to(".ouv-cartouche", { yPercent: -26, ease: "none", duration: 1 }, 0);

      // Les deux phrases se relaient.
      scene.to(".ouv-these-a", { autoAlpha: 0, y: -28, ease: "none", duration: 0.1 }, 0);
      scene.fromTo(
        ".ouv-these-b",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, ease: "none", duration: 0.12 },
        0.14,
      );
      scene.to(".ouv-these-b", { autoAlpha: 0, ease: "none", duration: 0.12 }, 0.74);

      return () => {
        scene.scrollTrigger?.kill();
        scene.kill();
      };
    },
    { scope: pisteRef, dependencies: [empile] },
  );

  function descendre() {
    document.getElementById("these")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="ouverture" className="ouv">
      <div ref={pisteRef} className="ouv-piste" data-empile={empile ? "" : undefined}>
        <div className="ouv-scene">
          <div className="ouv-plan">
            <Elevation debout={empile} />
          </div>

          <div className="ouv-cartouche">
            <p>Bénin</p>
            <strong>229</strong>
          </div>

          {/* La coiffe : le haut de la page est clair, et son bord bas fait une
              marche, plus bas du côté du logotype. C'est la même encoche que
              les panneaux, à l'échelle de l'écran. */}
          <div className="ouv-coiffe" />

          <h1 className="ouv-nom">Ratheil Research Team</h1>

          <button type="button" className="ouv-descendre" onClick={descendre} aria-label="Descendre">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          {/* Deux classes explicites plutôt qu'un `:first-of-type` : la troisième
              phrase est un paragraphe elle aussi, et elle avait discrètement
              pris le `:last-of-type` de la seconde, qui ne s'animait plus. */}
          {these.map((lignes, rang) => (
            <p key={lignes[0]} className={rang === 0 ? "ouv-these ouv-these-a" : "ouv-these ouv-these-b"}>
              {lignes.map((ligne) => (
                <span key={ligne}>{ligne}</span>
              ))}
            </p>
          ))}

          {empile && tierce ? (
            <p className="ouv-tierce">
              {tierce.map((ligne) => (
                <span key={ligne}>{ligne}</span>
              ))}
            </p>
          ) : null}
        </div>

        <div className="ouv-jalon" />
        <div className="ouv-jalon" />
      </div>
    </section>
  );
}
