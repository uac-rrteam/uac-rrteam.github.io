import { useEffect, useRef, useState } from "react";

/**
 * Avancement reel du chargement de la page, entre 0 et 1.
 *
 * Le lot Codrops dont vient la mecanique de compteur simule sa progression :
 * un tween de 1,5 s qui compte dans le vide pendant que les images chargent
 * ailleurs. On garde son tic-tac et on jette le mensonge. Ici chaque
 * increment correspond a quelque chose de reellement pret : une police
 * chargee, une image decodee, le document parcouru.
 *
 * Deux garde-fous. Un temps minimum, sinon l'ecran clignote sur une bonne
 * connexion et on ne voit rien. Un temps maximum, sinon une image morte
 * bloque l'entree du site indefiniment.
 */
export function useProgressionReelle(
  { minimum = 900, maximum = 8000 }: { minimum?: number; maximum?: number } = {},
) {
  const [avancee, setAvancee] = useState(0);
  const [pret, setPret] = useState(false);
  const depart = useRef(performance.now());

  useEffect(() => {
    let vivant = true;
    const debut = depart.current;

    const taches: Promise<unknown>[] = [];

    // Les polices : elles decident de la mise en page, il faut les attendre
    // sinon la premiere image du site est un saut typographique.
    taches.push(document.fonts.ready);

    // Les images deja dans le document. `decode` attend le decodage complet,
    // pas seulement le telechargement : c'est lui qui coute a l'affichage.
    for (const image of document.images) {
      taches.push(
        image.decode().catch(() => undefined),
      );
    }

    // Le chargement complet de la page, feuilles de style comprises.
    if (document.readyState !== "complete") {
      taches.push(new Promise((resoudre) => window.addEventListener("load", resoudre, { once: true })));
    }

    const total = taches.length || 1;
    let faites = 0;

    const rafraichir = () => {
      if (!vivant) return;
      // On mele l'avancement des taches et le temps minimum ecoule, sinon la
      // barre saute a 100 avant que l'oeil ait suivi.
      const partTaches = faites / total;
      const partTemps = Math.min(1, (performance.now() - debut) / minimum);
      setAvancee(Math.min(partTaches, partTemps));
    };

    for (const tache of taches) {
      tache.then(() => {
        faites += 1;
        rafraichir();
      });
    }

    const horloge = window.setInterval(rafraichir, 60);

    const terminer = () => {
      if (!vivant) return;
      vivant = false;
      window.clearInterval(horloge);
      setAvancee(1);
      setPret(true);
    };

    Promise.all(taches).then(() => {
      const reste = Math.max(0, minimum - (performance.now() - debut));
      window.setTimeout(terminer, reste);
    });

    const secours = window.setTimeout(terminer, maximum);

    return () => {
      vivant = false;
      window.clearInterval(horloge);
      window.clearTimeout(secours);
    };
  }, [minimum, maximum]);

  return { avancee, pret };
}
