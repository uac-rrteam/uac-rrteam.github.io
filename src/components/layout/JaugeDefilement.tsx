import { useEffect, useRef, useState } from "react";
import { useDepassement } from "@/hooks/useDepassement";
import "./JaugeDefilement.css";

export interface Repere {
  id: string;
  titre: string;
}

/**
 * Le repère de défilement, sur le bord gauche.
 *
 * Il remplace la barre native, qui est masquée. Une graduation par section
 * réelle de la page, une colonne de miel qui monte à mesure de la lecture, et
 * le nom de la section atteinte écrit à la verticale au niveau courant.
 *
 * Il n'est pas décoratif : il dit où on en est et dans quelle section, ce
 * qu'aucune barre native ne dit. On peut cliquer une graduation pour y aller.
 *
 * L'avancée ne passe pas par l'état de React. Elle est écrite directement sur
 * les deux éléments qui la portent : un rendu React par image de défilement
 * doublait le temps de chaque image, et la hauteur du document, relue à chaque
 * fois, forçait en plus un calcul de mise en page. Seule la section courante,
 * qui change rarement, reste un état.
 */
export function JaugeDefilement({ reperes }: { reperes: Repere[] }) {
  // Rien ne s'affiche tant qu'on est sur l'ouverture : le panneau du hero
  // colle au bord gauche, et une tige qui le traverserait serait une balafre.
  const visible = useDepassement("ouverture", 0.9);
  const [niveaux, setNiveaux] = useState<number[]>([]);
  const [courante, setCourante] = useState(0);

  const mercureRef = useRef<HTMLDivElement>(null);
  const avanceeRef = useRef<HTMLDivElement>(null);
  const jaugeRef = useRef<HTMLElement>(null);
  // La course du document, mesurée hors de la boucle de défilement.
  const courseRef = useRef(0);
  const niveauxRef = useRef<number[]>([]);

  niveauxRef.current = niveaux;

  // Où chaque section tombe sur la hauteur totale du document. Recalculé au
  // redimensionnement : les sections changent de hauteur avec la largeur.
  useEffect(() => {
    function mesurer() {
      const course = document.documentElement.scrollHeight - window.innerHeight;
      if (course <= 0) return;
      courseRef.current = course;
      setNiveaux(
        reperes.map((repere) => {
          const section = document.getElementById(repere.id);
          if (!section) return 0;
          return Math.min(1, section.offsetTop / course);
        }),
      );
    }

    mesurer();
    window.addEventListener("resize", mesurer);
    // Les images et les polices déplacent les sections après le premier rendu.
    const differe = window.setTimeout(mesurer, 600);
    return () => {
      window.removeEventListener("resize", mesurer);
      window.clearTimeout(differe);
    };
  }, [reperes]);

  useEffect(() => {
    let demande = 0;
    let derniere = -1;

    // Les graduations sont relevées une fois, pas à chaque image : une requête
    // dans le document par image de défilement coûte autant que ce qu'elle
    // sert à éviter.
    const marques = jaugeRef.current
      ? [...jaugeRef.current.querySelectorAll<HTMLElement>("[data-niveau]")].map((noeud) => ({
          noeud,
          seuil: Number(noeud.dataset.niveau),
        }))
      : [];

    function suivre() {
      demande = 0;
      const course = courseRef.current;
      if (course <= 0) return;

      const avancee = Math.min(1, Math.max(0, window.scrollY / course));

      if (mercureRef.current) mercureRef.current.style.transform = `scaleY(${avancee})`;
      if (avanceeRef.current) avanceeRef.current.style.transform = `scaleX(${avancee})`;

      // Les graduations franchies sont marquées par un attribut, écrit lui
      // aussi à la main : le CSS s'occupe du reste.
      for (const { noeud, seuil } of marques) {
        if (avancee >= seuil - 0.02) noeud.setAttribute("data-atteinte", "");
        else noeud.removeAttribute("data-atteinte");
      }

      // La section courante est la dernière dont le niveau a été dépassé. Elle
      // seule passe par React, et seulement quand elle change.
      let rang = 0;
      for (let position = 0; position < niveauxRef.current.length; position += 1) {
        if (avancee >= niveauxRef.current[position] - 0.02) rang = position;
      }
      if (rang !== derniere) {
        derniere = rang;
        setCourante(rang);
      }
    }

    // Une seule lecture par image : le défilement tire des dizaines d'évènements.
    function planifier() {
      if (!demande) demande = requestAnimationFrame(suivre);
    }

    suivre();
    window.addEventListener("scroll", planifier, { passive: true });
    return () => {
      window.removeEventListener("scroll", planifier);
      if (demande) cancelAnimationFrame(demande);
    };
  }, [niveaux.length]);

  function rejoindre(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside
      ref={jaugeRef}
      className="jauge"
      data-visible={visible ? "" : undefined}
      aria-label="Progression de lecture"
    >
      {/* Sur petit écran il n'y a pas de gouttière pour une colonne : le même
          repère se couche en filet sous l'en-tête, avec ses graduations. */}
      <div className="jauge-filet">
        <div ref={avanceeRef} className="jauge-avancee" />
        {niveaux.map((niveau, rang) => (
          <span
            key={`f-${reperes[rang].id}`}
            className="jauge-cran"
            style={{ left: `${niveau * 100}%` }}
            data-niveau={niveau}
          />
        ))}
      </div>

      <div className="jauge-tige">
        <div ref={mercureRef} className="jauge-mercure" />
        {niveaux.map((niveau, rang) => (
          <button
            key={reperes[rang].id}
            type="button"
            className="jauge-graduation"
            style={{ top: `${niveau * 100}%` }}
            data-niveau={niveau}
            aria-current={rang === courante ? "true" : undefined}
            onClick={() => rejoindre(reperes[rang].id)}
          >
            <span className="jauge-trait" />
            <span className="jauge-nom">{reperes[rang].titre}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
