import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { pageContenu, projets } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Recherche.css";

/** La page recherche lit son introduction dans content/pages et ses projets dans content/projects. */
export function Recherche() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const page = pageContenu(lang, "research");
  const liste = projets(lang);
  const projetsTitre = lang === "en" ? "Research projects" : "Projets de recherche";
  const [axes, fin] = page?.corps.split(/\n(?=## Publications)/, 2) ?? ["", ""];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const entree = gsap.timeline();
      entree.fromTo(
        ".rch-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
      );
      entree.fromTo(
        ".rch-chapo",
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25,
      );
      const defaire = lignesQuiRemontent({ blocs: ".rch-leve", racine: zoneRef.current! });
      return () => { defaire(); entree.kill(); };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  if (!page) return null;

  return (
    <div className="rch" ref={zoneRef} key={lang}>
      <header className="rch-entete">
        <h1 className="rch-titre"><span className="rch-ligne"><span>{page.titre}</span></span></h1>
        <p className="rch-chapo">{page.resume}</p>
      </header>

      <section className="rch-bloc rch-page-md rch-leve">
        <Markdown>{axes}</Markdown>
      </section>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{projetsTitre}</h2>
        <ul className="rch-projets">
          {liste.map((projet, rang) => (
            <li key={projet.slug} className="rch-leve">
              <p className="rch-projet-index" aria-hidden="true">{String(rang + 1).padStart(2, "0")}</p>
              <div className="rch-projet-corps">
                <h3 className="rch-projet-nom">
                  <Link to={path(`/research/projects/${projet.slug}`)}>{projet.titre}</Link>
                </h3>
                <p className="rch-projet-dit">{projet.resume}</p>
              </div>
              <p className="rch-projet-role">
                <span>{projet.periode}</span>
                {projet.role ? <span>{projet.role}</span> : null}
                {projet.financement ? <span>{projet.financement}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {fin ? (
        <section className="rch-bloc rch-page-md rch-leve">
          <Markdown>{fin}</Markdown>
        </section>
      ) : null}
    </div>
  );
}
