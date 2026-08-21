import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useLang } from "@/i18n/lang";
import "./BasculeTheme.css";

/* startViewTransition n'est pas encore dans les types du DOM. On decrit juste
   ce qu'on utilise plutot que d'elargir la definition globale. */
type DocumentAvecTransition = Document & {
  startViewTransition?: (rappel: () => void) => { ready: Promise<void> };
};

/**
 * La bascule clair / sombre de l'en-tete.
 *
 * Deux etats seulement a l'ecran, soleil ou lune. Le troisieme choix du
 * ThemeProvider, "systeme", reste la valeur de depart : tant qu'on n'a pas
 * clique, le site suit la preference du systeme d'exploitation. Le premier clic
 * fige un choix explicite, qui est retenu d'une visite a l'autre.
 *
 * Le changement est revele par un cercle qui s'ouvre depuis le bouton. C'est le
 * navigateur qui fait le fondu, via l'API View Transitions ; s'il ne la connait
 * pas, ou si la personne a demande moins d'animations, la bascule est seche.
 */
export function BasculeTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLang();
  const boutonRef = useRef<HTMLButtonElement>(null);

  const enClair = resolvedTheme === "light";
  const suivant = enClair ? "dark" : "light";

  function basculer() {
    const bouton = boutonRef.current;
    const doc = document as DocumentAvecTransition;
    const anime =
      typeof doc.startViewTransition === "function" &&
      bouton !== null &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!anime) {
      setTheme(suivant);
      return;
    }

    // La classe est posee a la main dans le rappel : le navigateur y attend le
    // DOM deja a jour, or React n'applique la sienne qu'au tour suivant. Les
    // deux ecritures donnent la meme valeur, la seconde ne change rien.
    const transition = doc.startViewTransition!(() => {
      document.documentElement.classList.toggle("dark", suivant === "dark");
    });
    setTheme(suivant);

    const cadre = bouton!.getBoundingClientRect();
    const x = cadre.left + cadre.width / 2;
    const y = cadre.top + cadre.height / 2;
    // Le rayon qui couvre le coin le plus eloigne, sinon le cercle s'arrete
    // avant d'avoir revele toute la page.
    const rayon = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${rayon}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 460,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* Transition interrompue, par exemple deux clics coup sur coup. */
      });
  }

  return (
    <button
      ref={boutonRef}
      type="button"
      className="bth"
      onClick={basculer}
      aria-label={enClair ? t("theme.versSombre") : t("theme.versClair")}
      title={enClair ? t("theme.versSombre") : t("theme.versClair")}
    >
      {/* La cle force le remplacement de l'icone, donc rejoue son apparition. */}
      {enClair ? (
        <Moon key="lune" size={19} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Sun key="soleil" size={19} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
