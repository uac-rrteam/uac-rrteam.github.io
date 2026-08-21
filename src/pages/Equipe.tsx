import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { pageContenu, personnes } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Equipe.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * L'équipe
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
  const membres = personnes(lang);
  const page = pageContenu(lang, "people");

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
    <div className="equ" ref={zoneRef} key={lang}>
      <header className="equ-entete">
        <h1 className="equ-titre">
          <span className="equ-ligne">
            <span>{page?.titre}</span>
          </span>
        </h1>
        <p className="equ-chapo">{page?.resume}</p>
      </header>

      {page?.corps ? <div className="equ-note"><Markdown>{page.corps}</Markdown></div> : null}

      <div className="equ-legende" aria-hidden="true">
        <span />
        <span>{lang === "en" ? "Member" : "Membre"}</span>
        <span>{lang === "en" ? "Current topic" : "Sujet actuel"}</span>
        <span>{lang === "en" ? "Joined" : "Arrivée"}</span>
      </div>
      <ul className="equ-liste">
        {membres.map((membre, rang) => (
          <li key={membre.slug} className="equ-membre">
            <Link className="equ-vers" to={path(`/people/${membre.slug}`)}>
              <span className="equ-index" aria-hidden="true">{String(rang + 1).padStart(2, "0")}</span>
              <span className="equ-identite">
                <span className="equ-nom">{membre.nom}</span>
                <span className="equ-statut">{membre.statut}</span>
              </span>
              <span className="equ-sujet">{membre.sujet}</span>
              <span className="equ-arrivee">{membre.arrivee ?? "—"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
