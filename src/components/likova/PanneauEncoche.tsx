import type { HTMLAttributes, ReactNode } from "react";
import "./PanneauEncoche.css";

type Coin = "haut-gauche" | "haut-droit";

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Le coin retiré. Chez Likova c'est toujours un coin haut. */
  coin?: Coin;
  ton?: "clair" | "sombre";
  /** Taille de l'entaille, en pourcentage du panneau. */
  entaille?: { x: number; y: number };
  children?: ReactNode;
}

/**
 * Le panneau à encoche : le seul conteneur du site.
 *
 * Un rectangle dont un coin est retiré par un plus petit rectangle. Pas
 * d'angle arrondi, pas d'ombre portée, pas de liseré : la forme suffit.
 *
 * Chez Likova l'encoche est un ornement. Ici elle dit quelque chose de vrai :
 * un rectangle entaillé, c'est un domaine dont une valeur a été retirée, la
 * primitive même de la résolution sous contraintes. Voir
 * DIRECTION-ARTISTIQUE.md §4.
 *
 * Le tracé passe par le point de l'angle rentrant, sans quoi le clip-path
 * relie les deux bords par une diagonale au lieu d'une marche.
 */
export function PanneauEncoche({
  coin = "haut-gauche",
  ton = "sombre",
  entaille = { x: 34, y: 18 },
  className,
  style,
  children,
  ...reste
}: Props) {
  const { x, y } = entaille;

  let trace: string;
  if (coin === "haut-gauche") {
    trace = `polygon(${x}% 0, 100% 0, 100% 100%, 0 100%, 0 ${y}%, ${x}% ${y}%)`;
  } else {
    trace = `polygon(0 0, ${100 - x}% 0, ${100 - x}% ${y}%, 100% ${y}%, 100% 100%, 0 100%)`;
  }

  return (
    <div
      className={className ? `pan pan-${ton} ${className}` : `pan pan-${ton}`}
      data-coin={coin}
      style={{ clipPath: trace, ...style }}
      {...reste}
    >
      {children}
    </div>
  );
}
