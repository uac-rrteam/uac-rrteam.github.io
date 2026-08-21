import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { useDepassement } from "@/hooks/useDepassement";
import { Menu } from "./Menu";
import "./EnTete.css";

/**
 * L'en-tête permanent.
 *
 * Trois blocs seulement, posés aux extrémités : le trait qui ouvre le menu à
 * gauche, le logotype juste après lui, et les entrées à droite en capitales
 * minuscules. Rien au centre.
 *
 * Le logotype n'apparaît qu'une fois l'ouverture passée : tant qu'on est
 * dessus, le nom est déjà écrit en grand dans le panneau, et le répéter en
 * haut ne dirait rien de plus.
 */
export function EnTete() {
  const { t, path } = useLang();
  // Le nom ne se montre qu'une fois l'ouverture entièrement sortie. Avant, le
  // relais est tenu par le logotype de l'ouverture, qui a rétréci jusqu'à
  // cette place exacte : deux noms au même endroit se verraient.
  const nomVisible = useDepassement("ouverture", 1);
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Sur les pages de lecture, le texte défile sans fin sous l'en-tête et vient
  // s'écrire dans ses lettres. L'accueil n'en a pas besoin : ses sections sont
  // composées avec la place de l'en-tête, et un voile sombre y salirait la
  // coiffe claire de l'ouverture.
  const { pathname } = useLocation();
  const enLecture = pathname.replace(/\/$/, "").split("/").length > 2;

  return (
    <>
      {enLecture && !menuOuvert ? <div className="ent-voile" data-clair="" aria-hidden="true" /> : null}
      <header className="ent-tete" data-menu={menuOuvert ? "" : undefined}>
        <div className="ent-tete-gauche">
          <button
            type="button"
            className="ent-tete-menu"
            aria-label={t("nav.menu")}
            aria-expanded={menuOuvert}
            onClick={() => setMenuOuvert((etat) => !etat)}
          >
            <span />
            <span />
          </button>
          {/* Le nom referme le menu au passage : cliqué panneau ouvert, il
              menait à l'accueil sans qu'on voie rien s'y passer. */}
          <Link
            to={path("/")}
            className="ent-tete-nom"
            data-visible={nomVisible ? "" : undefined}
            onClick={() => setMenuOuvert(false)}
          >
            Ratheil Research Team
          </Link>
        </div>

        <nav className="ent-tete-liens" aria-label={t("nav.menu")} onClick={() => setMenuOuvert(false)}>
          <Link to={path("/research")}>{t("nav.research")}</Link>
          <Link to={path("/people")}>{t("nav.people")}</Link>
          <Link to={path("/events")}>{t("nav.events")}</Link>
        </nav>
      </header>

      {/* Hors de l'en-tête : celui-ci est en fusion « différence », et le
          panneau clair du menu en hériterait, couleurs inversées. */}
      <Menu ouvert={menuOuvert} onFermer={() => setMenuOuvert(false)} />
    </>
  );
}
