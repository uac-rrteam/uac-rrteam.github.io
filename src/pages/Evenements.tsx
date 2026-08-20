import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { VUES, evenements } from "@/donnees/evenements";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import { LogoTrace } from "@/components/visuels/LogoTrace";
import { deriveDouce } from "@/animations/deriveDouce";
import "./Evenements.css";

/**
 * Les événements.
 *
 * Le BWAI d'abord, puisque c'est celui que l'équipe porte : ce qu'il est, ce
 * qu'on peut y présenter, qui le fait tenir, et à quoi ressemblait l'édition
 * précédente. Les autres rendez-vous viennent après, en liste.
 *
 * Les photographies sont celles de l'organisation du BWAI, servies depuis nos
 * fichiers plutôt qu'appelées chez eux : un site qui bouge ne doit pas pouvoir
 * vider les images du nôtre.
 */
export function Evenements() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const dit = evenements(lang);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const entree = gsap.timeline();
      entree.fromTo(
        ".evt-ligne > span",
        { yPercent: 122 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        0,
      );
      entree.fromTo(
        ".evt-chapo",
        { yPercent: 24, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.25,
      );

      const defaire = lignesQuiRemontent({ blocs: ".evt-leve", racine: zoneRef.current! });

      // Les photographies se découvrent par le bas, sans texte à découper.
      const vues = gsap.utils.toArray<HTMLElement>(".evt-vue");
      const decouvertes = vues.map((vue) =>
        gsap.fromTo(
          vue,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: vue, start: "top 88%", once: true },
          },
        ),
      );

      const sansDerive = deriveDouce(zoneRef.current!, ".evt-derive");

      return () => {
        defaire();
        sansDerive();
        for (const decouverte of decouvertes) {
          decouverte.scrollTrigger?.kill();
          decouverte.kill();
        }
        entree.kill();
      };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  return (
    <div className="evt" ref={zoneRef}>
      <header className="evt-entete">
        <h1 className="evt-titre">
          <span className="evt-ligne">
            <span>{dit.titre}</span>
          </span>
        </h1>
        <p className="evt-chapo">{dit.chapo}</p>
      </header>

      {/* L'affiche : le rendez-vous en cours prend toute la largeur, avec sa
          date en grand. C'est la seule information qu'un visiteur pressé
          cherche sur cette page. */}
      <section className="evt-affiche">
        <h2 className="evt-section evt-leve">{dit.afficheTitre}</h2>
        <div className="evt-affiche-corps">
          <div className="evt-affiche-dire">
            <h3 className="evt-affiche-nom evt-leve">{dit.edition}</h3>
            {dit.presentation.map((paragraphe) => (
              <p key={paragraphe.slice(0, 32)} className="evt-leve">
                {paragraphe}
              </p>
            ))}
            <p className="evt-liens evt-leve">
              {dit.liens.map((lien) => (
                <a key={lien.vers} href={lien.vers} target="_blank" rel="noreferrer">
                  {lien.intitule}
                </a>
              ))}
            </p>
          </div>

          <aside className="evt-affiche-cote">
            <p className="evt-rang evt-leve">{dit.rang}</p>
            <p className="evt-quand evt-leve">{dit.dates}</p>
            <p className="evt-ou evt-leve">{dit.lieu}</p>
            <LogoTrace alt="Logo du Benin Workshop on Artificial Intelligence" />
          </aside>
        </div>
      </section>

      <section className="evt-bloc">
        <h2 className="evt-section evt-leve">{dit.formatsTitre}</h2>
        <p className="evt-intro evt-leve">{dit.formatsChapo}</p>
        <ul className="evt-formats">
          {dit.formats.map((format) => (
            <li key={format.nom} className="evt-leve">
              <p className="evt-format-quoi">{format.categorie}</p>
              <h3>{format.nom}</h3>
              <p className="evt-format-dit">{format.dit}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="evt-bloc">
        <h2 className="evt-section evt-leve">{dit.comiteTitre}</h2>
        <p className="evt-intro evt-leve">{dit.comiteChapo}</p>
        <div className="evt-poles">
          {dit.poles.map((pole) => (
            <section key={pole.nom} className="evt-pole evt-leve">
              <h3>{pole.nom}</h3>
              <p className="evt-pole-quoi">{pole.intitule}</p>
              <ul>
                {pole.membres.map((membre) => (
                  <li key={membre.nom}>
                    {membre.slug ? (
                      <Link to={path(`/people/${membre.slug}`)}>{membre.nom}</Link>
                    ) : (
                      <span>{membre.nom}</span>
                    )}
                    {membre.role ? <em>{membre.role}</em> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="evt-bloc">
        <h2 className="evt-section evt-leve">{dit.imagesTitre}</h2>
        <p className="evt-intro evt-leve">{dit.imagesChapo}</p>
        {/* Une mosaïque plutôt qu'une grille régulière : les photographies
            n'ont ni le même cadrage ni la même définition, et un carré imposé
            à toutes couperait les têtes. */}
        <div className="evt-vues">
          {VUES.map((vue) => (
            <figure key={vue.fichier} className="evt-vue zoom-doux">
              {/* Le calque de dérive : le cadre tient la découpe, ce calque le
                  déplacement, l'image l'échelle. */}
              <div className="evt-derive">
              <img
                src={`/imgs/bwai/${vue.fichier}.webp`}
                srcSet={
                  vue.seule
                    ? undefined
                    : `/imgs/bwai/${vue.fichier}-640.webp 640w, /imgs/bwai/${vue.fichier}.webp 1024w`
                }
                sizes="(max-width: 46rem) 92vw, 46vw"
                alt={vue.alt}
                loading="lazy"
                decoding="async"
              />
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="evt-bloc">
        <h2 className="evt-section evt-leve">{dit.autresTitre}</h2>
        <p className="evt-intro evt-leve">{dit.autresChapo}</p>
        <ul className="evt-autres">
          {dit.autres.map((rendezvous) => (
            <li key={rendezvous.nom} className="evt-leve">
              <p className="evt-autre-quand">{rendezvous.quand}</p>
              <div>
                <h3>
                  {rendezvous.vers ? (
                    <a href={rendezvous.vers} target="_blank" rel="noreferrer">
                      {rendezvous.nom}
                    </a>
                  ) : (
                    rendezvous.nom
                  )}
                </h3>
                <p className="evt-autre-dit">{rendezvous.dit}</p>
              </div>
              <p className="evt-autre-ou">{rendezvous.ou}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
