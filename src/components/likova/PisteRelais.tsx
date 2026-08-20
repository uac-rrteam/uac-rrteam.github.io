import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEmpile } from "@/hooks/useEmpile";
import "./PisteRelais.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  /** Combien de contenus se succèdent sur la piste. */
  nombre: number;
  /**
   * Combien d'écrans de plus à la fin gardent le dernier contenu en place.
   *
   * Ils servent de temps mort : la scène reste immobile pendant qu'autre chose
   * se joue par-dessus, une révélation par exemple. Sans eux, la section
   * suivante monterait en même temps que le volet qui l'annonce, et l'on ne
   * verrait rien du mouvement. Il en faut autant que le volet occupe d'écrans,
   * sinon celui-ci s'ouvre sur le dernier contenu et le masque.
   */
  queue?: number;
  /**
   * Combien d'écrans de défilement dure chaque contenu.
   *
   * À 1, un seul coup de molette fait passer au suivant et la section paraît
   * fuir sous les doigts. Au-delà, le contenu tient en place plus longtemps :
   * on a le temps de le lire, et le passage au suivant se mérite.
   */
  course?: number;
  className?: string;
  children: (rang: number) => ReactNode;
}

/**
 * La piste de relais : une scène épinglée dont le contenu se remplace.
 *
 * C'est le mouvement dominant du site de référence, et il vaut pour tout ce
 * qui se lit un élément à la fois : les chiffres comme les domaines. La scène
 * reste en place pendant qu'on défile, et des jalons invisibles, un par
 * contenu, disent lequel on regarde en croisant le milieu de l'écran.
 *
 * Rien ne tourne au repos : c'est l'observateur qui travaille, pas une boucle.
 *
 * Sur un téléphone, la piste s'empile : les contenus se suivent, chacun sur sa
 * hauteur, sans scène collée ni jalons. Ce qui fait la tenue du site sur grand
 * écran y ferait dix-neuf écrans de défilement au pouce, et une couche fixe à
 * recomposer à chaque image.
 */
export function PisteRelais({ nombre, queue = 0, course = 1, className, children }: Props) {
  const [rang, setRang] = useState(0);
  const pisteRef = useRef<HTMLDivElement>(null);
  const empile = useEmpile();

  useEffect(() => {
    const piste = pisteRef.current;
    if (!piste || empile) return;

    const guetteur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) setRang(Number(entree.target.getAttribute("data-rang")));
        }
      },
      // Une bande d'un pixel au milieu de l'écran : le jalon qui la croise est
      // celui qu'on lit.
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const jalon of piste.querySelectorAll(".rel-jalon")) guetteur.observe(jalon);
    return () => guetteur.disconnect();
  }, [nombre, queue, course, empile]);

  // Ce qui est épinglé ne doit pas paraître bloqué : chaque couche marquée
  // dérive lentement pendant la course, d'une quantité qui lui est propre.
  // Sans ce décalage, une scène collée passe pour une page figée.
  //
  // Une valeur négative fait descendre au lieu de monter : c'est ainsi que
  // deux plans emboîtés se décollent, l'un vers le haut, l'autre vers le bas.
  useGSAP(
    () => {
      const piste = pisteRef.current;
      if (!piste || empile) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const scenes: ScrollTrigger[] = [];
      for (const couche of piste.querySelectorAll<HTMLElement>("[data-derive]")) {
        const tween = gsap.to(couche, {
          y: -Number(couche.dataset.derive),
          ease: "none",
          scrollTrigger: { trigger: piste, start: "top top", end: "bottom bottom", scrub: 0.6 },
        });
        if (tween.scrollTrigger) scenes.push(tween.scrollTrigger);
      }

      return () => {
        for (const scene of scenes) scene.kill();
      };
    },
    { scope: pisteRef, dependencies: [empile] },
  );

  // Empilé : chaque contenu occupe sa propre hauteur, à la suite du précédent.
  // Il n'y a plus de rang courant, ils sont tous là.
  if (empile) {
    const scenes = [];
    for (let position = 0; position < nombre; position += 1) {
      scenes.push(
        <div key={position} className={className ? `rel-scene ${className}` : "rel-scene"}>
          {children(position)}
        </div>,
      );
    }
    return (
      <div ref={pisteRef} className="rel-piste rel-empile">
        {scenes}
      </div>
    );
  }

  const jalons = [];
  const ecrans = nombre + queue;
  for (let position = 0; position < ecrans; position += 1) {
    // Le jalon de queue redit le dernier rang : rien ne change à l'écran.
    const dit = Math.min(position, nombre - 1);
    jalons.push(<div key={position} className="rel-jalon" data-rang={dit} aria-hidden="true" />);
  }

  return (
    <div
      ref={pisteRef}
      className="rel-piste"
      style={{ "--rel-course": course } as CSSProperties}
    >
      <div className={className ? `rel-scene ${className}` : "rel-scene"}>{children(rang)}</div>
      {jalons}
    </div>
  );
}
