import { Elevation } from "./Elevation";
import { SigleBwai } from "./SigleBwai";
import { TissuNeuronal } from "./TissuNeuronal";
import { Tournee } from "./Tournee";

/** Les quatre plans de fond, un par chiffre. */
export type Illustration = "elevation" | "reseau" | "sigle" | "tournee";

/**
 * Le plan de fond d'un chiffre.
 *
 * Le site de référence pose derrière chacun de ses nombres une vue du
 * bâtiment : l'image dit de quoi le chiffre parle. Nous n'avons pas de
 * bâtiment, mais nous avons mieux : quatre dessins qui montrent chacun le
 * travail que le nombre annonce, et qui sont calculés plutôt que tracés à la
 * main. Neuf niveaux pour neuf années, un tissu neuronal pour les domaines,
 * le sigle de l'atelier pour ses éditions, une tournée résolue pour l'école d'été
 * de programmation par contraintes.
 *
 * Cet aiguillage n'a délibérément ni état ni animation : chaque dessin porte
 * la sienne, dans sa propre portée. Un timeline monté ici irait chercher les
 * éléments des dessins voisins.
 */
export function IllustrationChiffre({ illustration }: { illustration: Illustration }) {
  if (illustration === "elevation") return <Elevation />;
  if (illustration === "reseau") return <TissuNeuronal />;
  if (illustration === "sigle") return <SigleBwai />;
  return <Tournee />;
}
