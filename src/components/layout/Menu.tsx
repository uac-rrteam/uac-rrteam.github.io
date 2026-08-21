import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { LANGS } from "@/i18n/dictionary";
import "./Menu.css";

interface Props {
  ouvert: boolean;
  onFermer: () => void;
}

/**
 * Le menu.
 *
 * Il s'ouvre comme tout le reste du site : un panneau clair dont le bord
 * descend en marche, la moitié droite avant la gauche. Pas de tiroir qui
 * glisse, pas de fondu.
 *
 * Les entrées sont écrites grand et maigre, dans la seule autre taille de
 * texte que le site s'autorise. Le numéro devant chacune dit son rang, pas
 * une décoration : on sait combien il y en a et où on en est.
 */
export function Menu({ ouvert, onFermer }: Props) {
  const { t, path, lang } = useLang();
  const { pathname } = useLocation();

  /* Changer de langue garde la page ouverte : on remplace le préfixe et rien
     d'autre. Renvoyer à l'accueil obligerait à refaire tout le chemin, et
     personne ne change de langue pour recommencer. */
  const enLangue = (autre: string) => {
    const morceaux = pathname.split("/").filter(Boolean);
    morceaux[0] = autre;
    return `/${morceaux.join("/")}`;
  };
  const panneauRef = useRef<HTMLDivElement>(null);

  const entrees = [
    { vers: "/about", texte: t("nav.about") },
    { vers: "/research", texte: t("nav.research") },
    { vers: "/people", texte: t("nav.people") },
    { vers: "/events", texte: t("nav.events") },
    { vers: "/blog", texte: t("nav.blog") },
  ];

  // Échap ferme, comme partout ailleurs. Le défilement du fond est bloqué tant
  // que le menu est là, sinon la page bouge sous le panneau.
  useEffect(() => {
    if (!ouvert) return;

    const auClavier = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") onFermer();
    };
    document.addEventListener("keydown", auClavier);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", auClavier);
      document.documentElement.style.overflow = "";
    };
  }, [ouvert, onFermer]);

  useGSAP(
    () => {
      const panneau = panneauRef.current;
      if (!panneau) return;

      const bords = { gauche: ouvert ? 100 : 0, droite: ouvert ? 100 : 0 };

      function poser() {
        panneau!.style.clipPath = `polygon(0 ${bords.gauche}%, 50% ${bords.gauche}%, 50% ${bords.droite}%, 100% ${bords.droite}%, 100% 100%, 0 100%)`;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        panneau.style.clipPath = "none";
        return;
      }

      poser();
      const scene = gsap.timeline({ onUpdate: poser });
      const arrivee = ouvert ? 0 : 100;
      scene.to(bords, { droite: arrivee, duration: 0.7, ease: "power3.inOut" }, 0);
      scene.to(bords, { gauche: arrivee, duration: 0.7, ease: "power3.inOut" }, 0.12);

      if (ouvert) {
        scene.fromTo(
          ".men-entree",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.65, ease: "power3.out", stagger: 0.06 },
          0.3,
        );
      }

      return () => scene.kill();
    },
    { scope: panneauRef, dependencies: [ouvert] },
  );

  return (
    <div ref={panneauRef} className="men" data-ouvert={ouvert ? "" : undefined} aria-hidden={!ouvert}>
      <nav className="men-liste">
        {entrees.map((entree, rang) => (
          <span key={entree.vers} className="men-masque">
            <Link className="men-entree" to={path(entree.vers)} onClick={onFermer}>
              <em>{String(rang + 1).padStart(2, "0")}</em>
              {entree.texte}
            </Link>
          </span>
        ))}
      </nav>

      {/* Les deux langues, sous les entrées. La courante reste affichée, mais
          éteinte : sans elle on ne saurait pas dans laquelle on est. */}
      <p className="men-langues">
        {LANGS.map((code) => (
          <Link
            key={code}
            to={enLangue(code)}
            className="men-langue"
            data-active={code === lang ? "" : undefined}
            aria-current={code === lang ? "true" : undefined}
            onClick={onFermer}
          >
            {code.toUpperCase()}
          </Link>
        ))}
      </p>

      {/* Le pied court sur toute la largeur, centré : c'est la signature du
          panneau, pas une note en marge. */}
      <p className="men-pied">
        <span>
          Laboratoire de Recherche en Sciences Informatiques et Applications, IFRI,
          Université d&apos;Abomey-Calavi, Cotonou
        </span>
        <span className="men-pied-nom">Ratheil Research Team</span>
      </p>
    </div>
  );
}
