/**
 * Aucune extension PostCSS : Tailwind v4 passe par le plugin Vite
 * (`@tailwindcss/vite`), pas par PostCSS.
 *
 * Ce fichier n'est pas inutile pour autant. Sans lui, PostCSS remonte
 * l'arborescence à la recherche d'une configuration et peut tomber sur celle
 * d'un projet parent, avec une autre version de Tailwind. La compilation
 * échoue alors sur des directives qui n'existent pas dans notre version, avec
 * un message qui pointe une ligne de `index.css` sans rapport.
 *
 * Le déclarer vide arrête la recherche ici.
 */
export default { plugins: {} };
