import { useRef, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { personne, personneSuivante, projets } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { LienIcone } from "@/components/content/LienIcone";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Profil.css";

const mots = {
  fr: { retour: "L'équipe", projets: "Projets associés", ailleurs: "Liens", suite: "Ensuite" },
  en: { retour: "The team", projets: "Related projects", ailleurs: "Links", suite: "Next" },
};

/** Une page membre entièrement alimentée par content/people/<slug>.<lang>.md. */
export function Profil() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const zoneRef = useRef<HTMLElement>(null);
  const membre = personne(lang, slug);
  const dit = lang === "en" ? mots.en : mots.fr;

  useGSAP(
    () => {
      if (!membre || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const entree = gsap.timeline();
      entree.fromTo(
        ".pro-mot > span",
        { yPercent: 124 },
        { yPercent: 0, duration: 0.95, ease: "power3.out", stagger: 0.08 },
      );
      entree.fromTo(
        ".pro-jour",
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        0.2,
      );
      entree.fromTo(
        ".pro-voile",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.inOut" },
        0.15,
      );
      const defaire = lignesQuiRemontent({ blocs: ".pro-leve", racine: zoneRef.current! });
      return () => {
        defaire();
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [slug, lang] },
  );

  if (!membre) return <Navigate to={path("/people")} replace />;
  const apres = personneSuivante(lang, membre.slug);
  const associes = projets(lang).filter((projet) => membre.projets.includes(projet.slug));
  const morceaux = membre.nom.split(" ");

  return (
    <article className="pro" ref={zoneRef} key={`${lang}-${slug}`}>
      <header className="pro-ouverture">
        <Link className="pro-retour pro-jour" to={path("/people")}>{dit.retour}</Link>
        <div
          className="pro-tete"
          data-seul={membre.portrait ? undefined : ""}
          style={{ "--pro-lignes": morceaux.length } as CSSProperties}
        >
          <div className="pro-mots">
            <h1 className="pro-nom">
              {morceaux.map((mot, rang) => (
                <span key={`${mot}-${rang}`} className="pro-mot"><span>{mot}</span></span>
              ))}
            </h1>
            <p className="pro-statut pro-jour">{membre.statut}</p>
            <p className="pro-sujet pro-jour">{membre.sujet}</p>
          </div>
          {membre.portrait ? (
            <div className="pro-voile">
              <div className="pro-cadre">
                <img
                  className="pro-portrait"
                  src={`/imgs/people/${membre.portrait}.webp`}
                  srcSet={`/imgs/people/${membre.portrait}-520.webp 520w, /imgs/people/${membre.portrait}.webp 852w`}
                  sizes="(max-width: 46rem) 78vw, 34vw"
                  width={852}
                  height={990}
                  alt={`${lang === "en" ? "Portrait of" : "Portrait de"} ${membre.nom}`}
                  decoding="async"
                />
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <section className="pro-bloc pro-biographie pro-leve">
        <Markdown>{membre.corps}</Markdown>
      </section>

      {associes.length ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.projets}</h2>
          <ul className="pro-charges">
            {associes.map((projet) => (
              <li key={projet.slug} className="pro-leve">
                <Link to={path(`/research/projects/${projet.slug}`)}>{projet.titre}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {membre.liens.length ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.ailleurs}</h2>
          <ul className="pro-liens">
            {membre.liens.map((lien) => (
              <li key={lien.vers} className="pro-leve">
                <LienIcone intitule={lien.intitule} vers={lien.vers} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="pro-suite">
        <Link className="pro-leve" to={path(`/people/${apres.slug}`)}>
          <span className="pro-suite-dit">{dit.suite}</span>
          <span className="pro-suite-nom">{apres.nom}</span>
        </Link>
      </nav>
    </article>
  );
}
