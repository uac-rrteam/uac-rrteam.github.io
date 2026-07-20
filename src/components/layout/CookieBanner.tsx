import { useEffect, useState } from "react";
import { useLang } from "@/i18n/lang";

const STORAGE_KEY = "lrsia-cookie-ok";

/**
 * Bandeau cookies, presentation reprise de micro1 : pilule claire centree en
 * bas de l'ecran, texte a gauche, bouton Accepter a droite. Une fois accepte,
 * le choix est memorise et le bandeau ne revient plus.
 *
 * Honnetete du contenu : ce site n'utilise que le stockage local du navigateur
 * pour retenir le theme et la langue. Le texte le dit tel quel, sans pretendre
 * a un pistage qui n'existe pas.
 */
export function CookieBanner() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [visible, setVisible] = useState(false);

  // Monté cote client seulement : on lit le choix apres le premier rendu pour
  // eviter d'afficher puis cacher le bandeau (flash) chez qui a deja accepte.
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/95 py-2 pl-5 pr-2 text-sm shadow-lg backdrop-blur-md">
        <p className="text-muted-foreground">
          {fr
            ? "Ce site utilise le stockage local pour retenir vos preferences (theme, langue)."
            : "This site uses local storage to remember your preferences (theme, language)."}
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {fr ? "Accepter" : "Accept"}
        </button>
      </div>
    </div>
  );
}
