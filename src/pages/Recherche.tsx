import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { LIENS_VITRINE, REPERTOIRES, publications, recherche } from "@/donnees/recherche";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Recherche.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * La recherche.
 *
 * Une page longue, lue d'un bout à l'autre : les axes, les projets financés, le
 * travail du moment, les thèses, ce que tout cela produit, et les publications.
 * Elle ne cache rien derrière des onglets, parce qu'un laboratoire se juge sur
 * ce qu'il montre en entier.
 *
 * Chaque bloc porte sa source. Les thèses des personnes qui ont une page ici
 * mènent à leur page : la liste et les profils lisent la même vérité, il ne
 * peut donc pas y avoir deux versions d'un sujet de thèse.
 */
export function Recherche() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const dit = recherche(lang);
  const articles = publications();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const entree = gsap.timeline();
      entree.fromTo(
        ".rch-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        0,
      );
      entree.fromTo(
        ".rch-chapo",
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25,
      );

      // Le reste se découvre au défilement : chaque bloc remonte ligne par
      // ligne de sous son masque, l'apparition commune à tout le site.
      const defaire = lignesQuiRemontent({ blocs: ".rch-leve", racine: zoneRef.current! });

      return () => {
        defaire();
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  // Les publications sont rangées par année : on groupe à l'affichage plutôt
  // que dans les données, où l'ordre chronologique se relit d'un coup d'œil.
  const parAnnee = new Map<number, typeof articles>();
  for (const article of articles) {
    const lot = parAnnee.get(article.annee);
    if (lot) lot.push(article);
    else parAnnee.set(article.annee, [article]);
  }

  return (
    <div className="rch" ref={zoneRef} key={lang}>
      <header className="rch-entete">
        <h1 className="rch-titre">
          <span className="rch-ligne">
            <span>{dit.titre}</span>
          </span>
        </h1>
        <p className="rch-chapo">{dit.chapo}</p>
      </header>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{dit.axesTitre}</h2>
        <ul className="rch-axes">
          {dit.axes.map((axe) => (
            <li key={axe.titre} className="rch-leve">
              <h3>{axe.titre}</h3>
              <p>{axe.dit}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{dit.projetsTitre}</h2>
        <p className="rch-intro rch-leve">{dit.projetsChapo}</p>
        <ul className="rch-projets">
          {dit.projets.map((projet) => (
            <li key={projet.nom} className="rch-leve">
              <p className="rch-projet-quand">{projet.annees}</p>
              <div className="rch-projet-corps">
                <h3 className="rch-projet-nom">{projet.nom}</h3>
                <p className="rch-projet-dit">{projet.dit}</p>
              </div>
              {/* Le rôle et le financeur : ce sont eux qui distinguent un projet
                  mené d'un projet auquel on participe. */}
              <p className="rch-projet-role">
                <span>{projet.role}</span>
                <span>{projet.financement}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Le travail du moment, sur toute la largeur : c'est le seul bloc de la
          page qui prend la parole plutôt que d'énumérer. */}
      <section className="rch-vitrine">
        <h2 className="rch-section rch-leve">{dit.vitrineTitre}</h2>
        <div className="rch-vitrine-corps">
          <div className="rch-vitrine-dire">
            <h3 className="rch-vitrine-titre rch-leve">{dit.vitrine.titre}</h3>
            <p className="rch-vitrine-quand rch-leve">{dit.vitrine.soustitre}</p>
            {dit.vitrine.propos.map((paragraphe) => (
              <p key={paragraphe.slice(0, 32)} className="rch-leve">
                {paragraphe}
              </p>
            ))}
            <p className="rch-vitrine-liens rch-leve">
              {LIENS_VITRINE.map((lien) => (
                <a key={lien.vers} href={lien.vers} target="_blank" rel="noreferrer">
                  {lien.intitule}
                </a>
              ))}
            </p>
          </div>

          <aside className="rch-vitrine-cote">
            <ul className="rch-vitrine-chiffres rch-leve">
              {dit.vitrine.chiffres.map((chiffre) => (
                <li key={chiffre.libelle}>
                  <strong>{chiffre.valeur}</strong>
                  <span>{chiffre.libelle}</span>
                </li>
              ))}
            </ul>
            <ul className="rch-vitrine-auteurs rch-leve">
              {dit.vitrine.auteurs.map((auteur) => (
                <li key={auteur}>{auteur}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{dit.thesesTitre}</h2>
        <p className="rch-intro rch-leve">{dit.thesesChapo}</p>
        <ul className="rch-theses">
          {dit.theses.map((these) => (
            <li key={these.titre} className="rch-leve">
              <h3>{these.titre}</h3>
              <p className="rch-these-qui">
                {these.slug ? (
                  <Link to={path(`/people/${these.slug}`)}>{these.qui}</Link>
                ) : (
                  <span>{these.qui}</span>
                )}
                <span className="rch-these-cadre">{these.cadre}</span>
              </p>
            </li>
          ))}
        </ul>

        <h2 className="rch-section rch-leve rch-section-suite">{dit.coencadrementsTitre}</h2>
        <ul className="rch-theses">
          {dit.coencadrements.map((these) => (
            <li key={these.titre} className="rch-leve">
              <h3>{these.titre}</h3>
              <p className="rch-these-qui">
                {these.slug ? (
                  <Link to={path(`/people/${these.slug}`)}>{these.qui}</Link>
                ) : (
                  <span>{these.qui}</span>
                )}
                <span className="rch-these-cadre">{these.cadre}</span>
                {these.annees ? <span className="rch-these-cadre">{these.annees}</span> : null}
                {these.etat ? <span className="rch-these-etat">{these.etat}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{dit.piecesTitre}</h2>
        <p className="rch-intro rch-leve">{dit.piecesChapo}</p>
        <div className="rch-champs">
          {dit.champs.map((champ) => (
            <section key={champ.nom} className="rch-champ rch-leve">
              <h3>{champ.nom}</h3>
              <ul>
                {champ.pieces.map((piece) => (
                  <li key={piece.nom}>
                    <strong>{piece.nom}</strong>
                    <span>{piece.dit}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="rch-bloc">
        <h2 className="rch-section rch-leve">{dit.publicationsTitre}</h2>
        <p className="rch-intro rch-leve">{dit.publicationsChapo}</p>
        <p className="rch-repertoires rch-leve">
          {REPERTOIRES.map((repertoire) => (
            <a key={repertoire.vers} href={repertoire.vers} target="_blank" rel="noreferrer">
              {repertoire.intitule}
            </a>
          ))}
        </p>

        {Array.from(parAnnee, ([annee, lot]) => (
          <div key={annee} className="rch-annee">
            <p className="rch-annee-nombre rch-leve">{annee}</p>
            <ul className="rch-publications">
              {lot.map((article) => (
                <li key={article.titre} className="rch-leve">
                  <h3>{article.titre}</h3>
                  <p>{article.ref}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
