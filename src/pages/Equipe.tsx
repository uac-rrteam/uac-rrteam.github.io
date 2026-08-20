import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { equipe } from "@/donnees/equipe";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Equipe.css";

gsap.registerPlugin(ScrollTrigger);

const mots = {
  fr: {
    titre: "L'équipe",
    chapo:
      "Une équipe de recherche se lit d'abord par les gens qui la font. Chacun travaille un sujet propre, à l'IFRI, sur le campus d'Abomey-Calavi.",
    attente:
      "Cette liste s'étoffe. Chaque page s'ouvrira sur les travaux, les publications et les encadrements de la personne.",
  },
  en: {
    titre: "The team",
    chapo:
      "A research team is read first through the people who make it. Each works on their own subject, at IFRI, on the Abomey-Calavi campus.",
    attente:
      "This list is growing. Each page will open onto the person's work, publications and supervision.",
  },
};

/**
 * L'équipe.
 *
 * Un annuaire en lignes plutôt qu'une grille de vignettes : nous n'avons qu'un
 * portrait, et trois cadres vides à côté d'une photographie diraient surtout ce
 * qui manque. En lignes, la page est complète telle quelle, et chaque portrait
 * qui arrive s'y ajoutera sans rien casser.
 *
 * Chaque ligne mène à la page de la personne. La liste et ces pages lisent la
 * même source : une ligne ici ne peut pas dire autre chose que la page qu'elle
 * ouvre.
 */
export function Equipe() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const membres = equipe(lang);
  const dit = lang === "en" ? mots.en : mots.fr;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const entree = gsap.timeline();
      entree.fromTo(
        ".equ-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        0,
      );
      entree.fromTo(
        ".equ-chapo",
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25,
      );

      // Les membres se découvrent au défilement, ligne par ligne de sous
      // leur masque : la même apparition que partout ailleurs sur le site.
      const defaire = lignesQuiRemontent({ blocs: ".equ-membre", racine: zoneRef.current! });

      return () => {
        defaire();
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  return (
    <div className="equ" ref={zoneRef}>
      <header className="equ-entete">
        <h1 className="equ-titre">
          <span className="equ-ligne">
            <span>{dit.titre}</span>
          </span>
        </h1>
        <p className="equ-chapo">{dit.chapo}</p>
      </header>

      <ul className="equ-liste">
        {membres.map((membre) => (
          <li key={membre.slug} className="equ-membre">
            <Link className="equ-vers" to={path(`/people/${membre.slug}`)}>
              <span className="equ-nom">{membre.nom}</span>
              <span className="equ-statut">{membre.statut}</span>
              <span className="equ-sujet">{membre.sujet}</span>
              {/* La flèche tient lieu d'intitulé : le nom entier est le lien. */}
              <span className="equ-fleche" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="equ-attente">{dit.attente}</p>
    </div>
  );
}
