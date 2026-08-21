import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import portraitRatheil from "../../content/people/vinasetan-ratheil-houndji/images/vinasetan-ratheil.webp?url";
import portraitRatheilPetit from "../../content/people/vinasetan-ratheil-houndji/images/vinasetan-ratheil-520.webp?url";
import "./Direction.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * L'entaille, en pourcentage du cadre.
 *
 * Elle est au coin haut-DROIT et non haut-gauche : c'est le seul coin du
 * portrait où il n'y a que du fond. À gauche, elle mordait sur le bonnet, et
 * une entaille qui coupe le sujet n'est plus une entaille, c'est un accident.
 */
const MARCHE = 74;
const ENTAILLE = 11;

export interface Meneur {
  nom: string;
  fonction: string;
  propos: string[];
  /** Les charges qu'il exerce, une par ligne. */
  charges: string[];
  versEquipe: string;
}

/**
 * Celui qui mène l'équipe.
 *
 * Une équipe de recherche se présente d'abord par les gens qui la font, et
 * celle-ci porte le nom du sien. Le portrait tient la moitié de l'écran :
 * c'est la première photographie du site, elle a donc le droit d'être grande.
 *
 * Le portrait se découvre par la même marche que le reste du site, du bas vers
 * le haut. La section s'ouvre sur la page de l'équipe, où chacun aura la
 * sienne.
 */
export function Direction({ meneur }: { meneur: Meneur }) {
  const zoneRef = useRef<HTMLElement>(null);
  const { path } = useLang();

  useGSAP(
    () => {
      const zone = zoneRef.current;
      if (!zone) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cadre = zone.querySelector<HTMLElement>(".dir-cadre");
      const scene = gsap.timeline({
        scrollTrigger: { trigger: zone, start: "top 68%", once: true },
      });

      if (cadre) {
        // La marche monte, le grand pan de gauche avant le petit de droite.
        // Elle ne finit pas à plat : le pan droit s'arrête sur l'entaille, si
        // bien que la révélation et la forme du panneau sont le même geste.
        const bords = { droite: 100, gauche: 100 };
        const poser = () => {
          cadre.style.clipPath = `polygon(0 ${bords.gauche}%, ${MARCHE}% ${bords.gauche}%, ${MARCHE}% ${bords.droite}%, 100% ${bords.droite}%, 100% 100%, 0 100%)`;
        };
        poser();

        scene.to(bords, { gauche: 0, duration: 1.1, ease: "power3.inOut", onUpdate: poser }, 0);
        scene.to(bords, { droite: ENTAILLE, duration: 1.1, ease: "power3.inOut", onUpdate: poser }, 0.22);
      }

      scene.fromTo(
        ".dir-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.85, ease: "power3.out", stagger: 0.08 },
        0.45,
      );

      scene.fromTo(
        ".dir-fonction, .dir-propos p",
        { yPercent: 35, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.09 },
        0.62,
      );

      scene.fromTo(
        ".dir-charges li",
        { xPercent: -4, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.07 },
        0.85,
      );

      scene.fromTo(
        ".dir-vers",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" },
        1.2,
      );

      return () => {
        scene.scrollTrigger?.kill();
        scene.kill();
      };
    },
    { scope: zoneRef },
  );

  return (
    <section id="direction" className="dir" ref={zoneRef}>
      <div className="dir-cadre">
        <img
          className="dir-portrait"
          src={portraitRatheil}
          srcSet={`${portraitRatheilPetit} 520w, ${portraitRatheil} 852w`}
          sizes="(max-width: 46rem) 78vw, 42vw"
          width={852}
          height={990}
          alt={`Portrait de ${meneur.nom}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="dir-mots">
        <h2 className="dir-nom">
          {meneur.nom.split(" ").map((mot) => (
            <span key={mot} className="dir-ligne">
              <span>{mot}</span>
            </span>
          ))}
        </h2>

        <p className="dir-fonction">{meneur.fonction}</p>

        <div className="dir-propos">
          {meneur.propos.map((paragraphe) => (
            <p key={paragraphe}>{paragraphe}</p>
          ))}
        </div>

        <ul className="dir-charges">
          {meneur.charges.map((charge) => (
            <li key={charge}>{charge}</li>
          ))}
        </ul>

        <Link className="dir-vers" to={path("/people")}>
          {meneur.versEquipe}
        </Link>
      </div>
    </section>
  );
}
