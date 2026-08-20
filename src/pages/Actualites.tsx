import { useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { actualites } from "@/donnees/actualites";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Actualites.css";

/**
 * Les actualités.
 *
 * Un fil, pas une grille de cartes : ce qui compte ici est la suite des
 * choses, et une date en regard de chaque entrée se lit plus vite qu'un
 * bandeau au-dessus. Les entrées les plus récentes viennent d'abord, dans
 * l'ordre de la source ; aucune n'est triée par le code, un mois seul ne se
 * trie pas sans lui inventer un jour.
 */
export function Actualites() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const dit = actualites(lang);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const entree = gsap.timeline();
      entree.fromTo(
        ".act-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        0,
      );
      entree.fromTo(
        ".act-chapo",
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25,
      );

      const defaire = lignesQuiRemontent({ blocs: ".act-leve", racine: zoneRef.current! });

      return () => {
        defaire();
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  return (
    <div className="act" ref={zoneRef} key={lang}>
      <header className="act-entete">
        <h1 className="act-titre">
          <span className="act-ligne">
            <span>{dit.titre}</span>
          </span>
        </h1>
        <p className="act-chapo">{dit.chapo}</p>
      </header>

      <ol className="act-fil">
        {dit.entrees.map((entree) => (
          <li key={entree.cle} className="act-entree act-leve">
            <p className="act-quand">{entree.quand}</p>
            <div className="act-corps">
              <h2>{entree.titre}</h2>
              {/* Le corps vient d'un fichier Markdown : gras, listes et liens
                  y sont donc permis, sans que personne ait à toucher au code. */}
              <div className="act-dit">
                <Markdown remarkPlugins={[remarkGfm]}>{entree.dit}</Markdown>
              </div>
              {entree.liens ? (
                <p className="act-liens">
                  {entree.liens.map((lien) => (
                    <a key={lien.vers} href={lien.vers} target="_blank" rel="noreferrer">
                      {lien.intitule}
                    </a>
                  ))}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <section className="act-suivre">
        <h2 className="act-section act-leve">{dit.ailleursTitre}</h2>
        <p className="act-liens act-leve">
          {dit.ailleurs.map((lien) => (
            <a key={lien.vers} href={lien.vers} target="_blank" rel="noreferrer">
              {lien.intitule}
            </a>
          ))}
        </p>
      </section>
    </div>
  );
}
