import { useRef, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { personne, suivante } from "@/donnees/equipe";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Profil.css";

gsap.registerPlugin(ScrollTrigger);

const mots = {
  fr: {
    retour: "L'équipe",
    notice: "Son parcours",
    travaux: "Ses travaux",
    charges: "Ses charges",
    ailleurs: "Ailleurs",
    suite: "Ensuite",
    avec: "Avec",
    code: "Le code",
    article: "L'article",
    attente:
      "Cette page attend sa matière : les travaux, les publications et les encadrements viendront de l'intéressée.",
  },
  en: {
    retour: "The team",
    notice: "Background",
    travaux: "Work",
    charges: "Roles",
    ailleurs: "Elsewhere",
    suite: "Next",
    avec: "With",
    code: "Code",
    article: "Paper",
    attente:
      "This page is waiting for its material: work, publications and supervision will come from the person concerned.",
  },
};

/**
 * La page d'une personne.
 *
 * Elle se lit d'un bout à l'autre plutôt que d'un coup d'œil : le nom occupe
 * le premier écran, la notice vient ensuite, les charges après. C'est le même
 * parti que l'accueil, où l'on ne voit jamais quatre choses à la fois.
 *
 * Rien n'est inventé pour remplir. Une personne dont nous n'avons que le sujet
 * de thèse a une page courte, et elle le dit.
 */
export function Profil() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const zoneRef = useRef<HTMLDivElement>(null);

  const membre = personne(lang, slug);
  const dit = lang === "en" ? mots.en : mots.fr;

  useGSAP(
    () => {
      if (!membre) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const entree = gsap.timeline();

      // Le nom monte mot à mot de son masque : c'est le geste des titres du
      // reste du site, appliqué ici à ce qui est le titre de la page.
      entree.fromTo(
        ".pro-mot > span",
        { yPercent: 124 },
        { yPercent: 0, duration: 0.95, ease: "power3.out", stagger: 0.08 },
        0,
      );

      entree.fromTo(
        ".pro-jour",
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        0.2,
      );

      // Le portrait se découvre par le bas, comme un volet : il ne surgit pas,
      // il se dégage. Le masque vit sur l'enveloppe et non sur le panneau,
      // dont le clip-path porte déjà l'encoche : les deux se chassaient.
      entree.fromTo(
        ".pro-voile",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.inOut" },
        0.15,
      );

      // Le portrait dérive plus lentement que la page : c'est ce qui donne sa
      // profondeur au premier écran, sans rien coûter de plus qu'une transformation.
      const derive = gsap.to(".pro-portrait", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: { trigger: ".pro-ouverture", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // Les sections suivantes se découvrent ligne par ligne de sous leur
      // masque, comme le reste du site.
      const defaire = lignesQuiRemontent({ blocs: ".pro-leve", racine: zoneRef.current! });

      return () => {
        defaire();
        derive.scrollTrigger?.kill();
        derive.kill();
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [slug, lang] },
  );

  // Un slug inconnu renvoie à l'annuaire plutôt qu'à une page vide.
  if (!membre) return <Navigate to={path("/people")} replace />;

  const apres = suivante(lang, membre.slug);
  // Un mot par ligne : c'est leur nombre qui décide de la taille, sinon un nom
  // de quatre mots déborde l'écran là où un nom de deux flotte.
  const morceaux = membre.nom.split(" ");

  return (
    <article className="pro" ref={zoneRef}>
      <header className="pro-ouverture">
        <Link className="pro-retour pro-jour" to={path("/people")}>
          {dit.retour}
        </Link>

        {/* Sans portrait, le nom prend toute la largeur : une colonne vide à
            droite se lirait comme une photographie qui manque. */}
        <div
          className="pro-tete"
          data-seul={membre.portrait ? undefined : ""}
          style={{ "--pro-lignes": morceaux.length } as CSSProperties}
        >
          <div className="pro-mots">
            <h1 className="pro-nom">
              {morceaux.map((mot, rang) => (
                <span key={`${mot}-${rang}`} className="pro-mot">
                  <span>{mot}</span>
                </span>
              ))}
            </h1>

            <p className="pro-statut pro-jour">{membre.statut}</p>
            <p className="pro-sujet pro-jour">{membre.sujet}</p>
          </div>

          {/* Pas d'encoche sur un portrait : l'entaille tombait sur le haut du
              crâne dès que la personne se tenait du côté du coin retiré. La
              photographie garde ses quatre coins. */}
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
                  alt={`Portrait de ${membre.nom}`}
                  decoding="async"
                />
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {membre.propos ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.notice}</h2>
          <div className="pro-propos">
            {membre.propos.map((paragraphe) => (
              <p key={paragraphe.slice(0, 32)} className="pro-leve">
                {paragraphe}
              </p>
            ))}
          </div>
        </section>
      ) : (
        <section className="pro-bloc">
          <p className="pro-attente pro-leve">{dit.attente}</p>
        </section>
      )}

      {/* Les travaux, chacun avec ce qu'il dit de lui-même. Le titre porte le
          lien vers le code quand il est ouvert : c'est ce qui rend le travail
          vérifiable plutôt que seulement annoncé. */}
      {membre.travaux ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.travaux}</h2>
          <ul className="pro-travaux">
            {membre.travaux.map((travail) => (
              <li key={travail.titre} className="pro-leve">
                <p className="pro-travail-annee">{travail.annee}</p>
                <h3 className="pro-travail-titre">{travail.titre}</h3>
                {/* On ne cite les contributeurs que s'il y en a d'autres : sur sa
                    propre page, se citer soi-même ne dit rien. */}
                {travail.contributeurs.some((qui) => qui !== membre.nom) ? (
                  <p className="pro-travail-avec">
                    {dit.avec} {travail.contributeurs.join(", ")}
                  </p>
                ) : null}
                <p className="pro-travail-dit">{travail.description}</p>
                {travail.code || travail.article ? (
                  <p className="pro-travail-vers">
                    {travail.article ? (
                      <a href={travail.article} target="_blank" rel="noreferrer">
                        {dit.article}
                      </a>
                    ) : null}
                    {travail.code ? (
                      <a href={travail.code} target="_blank" rel="noreferrer">
                        {dit.code}
                      </a>
                    ) : null}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {membre.charges ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.charges}</h2>
          <ul className="pro-charges">
            {membre.charges.map((charge) => (
              <li key={charge} className="pro-leve">
                {charge}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {membre.liens ? (
        <section className="pro-bloc">
          <h2 className="pro-titre pro-leve">{dit.ailleurs}</h2>
          <ul className="pro-liens">
            {membre.liens.map((lien) => (
              <li key={lien.vers} className="pro-leve">
                <a href={lien.vers} target="_blank" rel="noreferrer">
                  {lien.intitule}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* On enchaîne d'une personne à la suivante sans repasser par la liste :
          c'est ainsi qu'on lit une équipe, de proche en proche. */}
      <nav className="pro-suite">
        <Link className="pro-leve" to={path(`/people/${apres.slug}`)}>
          <span className="pro-suite-dit">{dit.suite}</span>
          <span className="pro-suite-nom">{apres.nom}</span>
        </Link>
      </nav>
    </article>
  );
}
