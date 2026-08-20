import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import "./PiedDePage.css";

gsap.registerPlugin(ScrollTrigger);

/** De combien le contenu du pied part remonté, en pourcentage de sa hauteur. */
const RETRAIT = -35;

/** Le sigle qui se pose au bas du site, une lettre à la fois. */
const SIGLE = "LRSIA";

/* Les institutions dont l'équipe relève. Elles restent en signature, elles ne
   dictent pas la palette : voir DIRECTION-ARTISTIQUE.md §7. */
const TUTELLES = [
  { nom: "IFRI", fichier: "logoifri", vers: "https://ifri.uac.bj" },
  { nom: "Université d'Abomey-Calavi", fichier: "logouac", vers: "https://uac.bj" },
];

/**
 * Le pied de page, qui se déplie en entrant dans le cadre.
 *
 * Il ne fait que deux tiers d'écran et rogne ce qui dépasse. Son contenu
 * commence remonté de trente-cinq pour cent et redescend à sa place au fil de
 * son arrivée : il avance donc moins vite que la page, et l'on voit les
 * informations descendre au lieu de les trouver déjà posées.
 *
 * Le sigle du laboratoire tient le bas. Chaque lettre monte depuis sa ligne en
 * s'étirant puis reprend sa forme, accrochée au défilement : c'est le
 * défilement qui joue l'animation, pas une horloge, si bien qu'on peut la
 * remonter en revenant en arrière.
 */
export function PiedDePage() {
  const piedRef = useRef<HTMLElement>(null);
  const { t, path, lang } = useLang();

  const rubriques = [
    { vers: "/research", texte: t("nav.research") },
    { vers: "/people", texte: t("nav.people") },
    { vers: "/events", texte: t("nav.events") },
    { vers: "/news", texte: t("nav.blog") },
  ];

  const adresse =
    lang === "en"
      ? ["LRSIA, IFRI", "Université d'Abomey-Calavi", "Abomey-Calavi, Benin"]
      : ["LRSIA, IFRI", "Université d'Abomey-Calavi", "Abomey-Calavi, Bénin"];

  useGSAP(
    () => {
      const pied = piedRef.current;
      if (!pied) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Le dépliement suppose un pied plus court que l'écran, qui sert de
      // fenêtre. Sur mobile le pied prend la hauteur de son contenu : la boîte
      // remontée y laisserait un vide sous elle, on ne le joue donc pas.
      const large = gsap.matchMedia();
      large.add("(min-width: 46.0625rem)", () => {
        // La course va du moment où le haut du pied touche le bas de l'écran
        // jusqu'à ce que son propre bas y arrive : la hauteur du pied, exactement.
        const glissade = gsap.fromTo(
          ".pied-boite",
          { yPercent: RETRAIT },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: pied, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
          },
        );

        return () => {
          glissade.scrollTrigger?.kill();
          glissade.kill();
        };
      });

      // Les lettres du sigle montent en s'étirant, puis reprennent leur forme.
      // L'étirement est ce qui donne le poids : sans lui, elles glissent.
      const lettres = gsap.fromTo(
        ".pied-lettre",
        { yPercent: 118, scaleY: 2.3, scaleX: 0.72, opacity: 0 },
        {
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          opacity: 1,
          ease: "back.inOut(2)",
          stagger: 0.09,
          scrollTrigger: {
            trigger: pied,
            start: "top bottom-=8%",
            end: "bottom bottom",
            scrub: 0.9,
          },
        },
      );

      return () => {
        large.revert();
        lettres.scrollTrigger?.kill();
        lettres.kill();
      };
    },
    { scope: piedRef },
  );

  return (
    <footer className="pied" ref={piedRef}>
      <div className="pied-boite">
        <div className="pied-haut">
          <nav className="pied-rubriques" aria-label={lang === "en" ? "Sections" : "Rubriques"}>
            {rubriques.map((rubrique) => (
              <Link key={rubrique.vers} className="pied-lien" to={path(rubrique.vers)}>
                {rubrique.texte}
              </Link>
            ))}
          </nav>

          <address className="pied-adresse">
            {adresse.map((ligne) => (
              <span key={ligne}>{ligne}</span>
            ))}
          </address>

          <div className="pied-signature">
            <ul className="pied-tutelles">
              {TUTELLES.map((tutelle) => (
                <li key={tutelle.nom}>
                  <a href={tutelle.vers} target="_blank" rel="noreferrer">
                    <img
                      src={`/imgs/logos/${tutelle.fichier}.webp`}
                      width={120}
                      height={120}
                      alt={tutelle.nom}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="pied-annee">{new Date().getFullYear()}</p>
          </div>
        </div>

        <p className="pied-sigle" aria-label={SIGLE}>
          {Array.from(SIGLE).map((lettre, rang) => (
            <span key={`${lettre}-${rang}`} className="pied-masque" aria-hidden="true">
              <span className="pied-lettre">{lettre}</span>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
