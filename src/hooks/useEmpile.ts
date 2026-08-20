import { useEffect, useState } from "react";

/** En dessous, on lit avec le pouce et l'on n'épingle rien. */
export const SEUIL_EMPILE = "(max-width: 46rem)";

/**
 * Vrai quand la page doit s'empiler plutôt que de s'épingler.
 *
 * Les scènes collées valent sur un grand écran, où l'on a de la place pour
 * garder un décor pendant que le propos change. Sur un téléphone elles
 * transforment cinq idées en dix-neuf écrans de défilement, et chaque image
 * coûte le prix d'une couche fixe recomposée. On empile.
 */
export function useEmpile() {
  const [empile, setEmpile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(SEUIL_EMPILE).matches,
  );

  useEffect(() => {
    const requete = window.matchMedia(SEUIL_EMPILE);
    const suivre = () => setEmpile(requete.matches);
    suivre();
    requete.addEventListener("change", suivre);
    return () => requete.removeEventListener("change", suivre);
  }, []);

  return empile;
}
