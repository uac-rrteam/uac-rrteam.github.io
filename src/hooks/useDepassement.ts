import { useEffect, useState } from "react";

/**
 * Dit si une section a été dépassée.
 *
 * Sert aux éléments permanents qui doivent s'effacer tant qu'on est sur
 * l'ouverture : le logotype de l'en-tête et le repère de défilement n'ont rien
 * à dire pendant qu'on lit le premier écran, et ils encombreraient le panneau.
 *
 * Si la cible n'existe pas sur la page, on considère qu'elle est déjà
 * dépassée : une page sans ouverture montre ses repères tout de suite.
 */
export function useDepassement(id: string, part = 0.75) {
  const [depasse, setDepasse] = useState(false);

  useEffect(() => {
    const cible = document.getElementById(id);
    if (!cible) {
      setDepasse(true);
      return;
    }

    const guetteur = new IntersectionObserver(([entree]) => setDepasse(!entree.isIntersecting), {
      rootMargin: `-${part * 100}% 0px 0px 0px`,
    });
    guetteur.observe(cible);
    return () => guetteur.disconnect();
  }, [id, part]);

  return depasse;
}
