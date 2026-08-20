import { useEffect, useRef } from "react";
import { LigneDeTemps, bezier, jouer, type Piste } from "@/lib/ligneDeTemps";
import "./EntreeMonogramme.css";

/** La courbe que la démo d'origine se fabrique : `CustomEase '.8, 0, .3, 1'`. */
const HOP = bezier(0.8, 0, 0.3, 1);

// Rapports relevés dans la démo, exprimés en fraction du corps du titre pour
// tenir quelle que soit la taille d'écran.
const RAPPORT_SIGLE = 14 / 6; // le nombre passe de 6rem à 14rem
const ECHELLE_INITIALE = 0.75;
const REMONTEE_INITIALE = -2.75 / 6; // l'initiale se pose en exposant
const DEPASSEMENT = 3.25 / 6; // elle va trop loin, puis revient
const ESPACE_MONOGRAMME = 0.0625; // blanc entre l'initiale et le nombre, en em du nombre

/* Trois groupes, pas deux : un espace enferme dans un masque en inline-block
   avec overflow hidden s ecrase a zero. Les blancs restent donc dans le JSX,
   entre les groupes, ou rien ne les masque. */
const NOM = ["Ratheil", "Research", "Team"];

/** 229 est l'indicatif téléphonique du Bénin. Le sigle dit donc l'équipe et
    d'où elle vient : R229. Rien d'inventé. */
const NOMBRE = "229";

/** Deux repères seulement, posés en diagonale : l'institution en haut à
    gauche, la thèse de l'équipe en bas à droite.
 *
 * Chaque phrase est découpée à la lettre qui porte le sigle. Un rang pair est
 * une initiale, un rang impair la suite du mot : IFRI et AI se lisent d'un
 * coup, sans avoir à décomposer la phrase. */
const ETIQUETTES = [
  ["I", "nstitut de ", "F", "ormation et de ", "R", "echerche en ", "I", "nformatique"],
  ["A", "rtificial ", "I", "ntelligence for Societal Impact"],
];

/**
 * Découpe un mot en lettres masquées, chacune prête à coulisser.
 *
 * La première peut recevoir une classe de plus : c'est elle qui survivra au
 * départ des autres.
 */
function lettres(mot: string, classePremiere?: string) {
  return Array.from(mot).map((caractere, rang) => (
    <span
      // Les lettres d'un mot figé ne changent jamais d'ordre.
      key={`${caractere}-${rang}`}
      className={rang === 0 && classePremiere ? `ent-lettre ${classePremiere}` : "ent-lettre"}
    >
      <span>{caractere}</span>
    </span>
  ));
}

/**
 * Le monogramme, rendu deux fois : une fois animé, une fois figé sur son état
 * final. Les deux se superposent au pixel près, si bien que la coupure en deux
 * moitiés reste invisible jusqu'à ce qu'elles s'écartent.
 */
function Monogramme() {
  return (
    <>
      <div className="ent-nom">
        <h1>
          {lettres(NOM[0], "ent-initiale")} {lettres(NOM[1])} {lettres(NOM[2])}
        </h1>
      </div>
      <div className="ent-sigle">
        <h1>{lettres(NOMBRE)}</h1>
      </div>
    </>
  );
}

/**
 * Entrée du site.
 *
 * Le nom de l'équipe monte lettre par lettre, puis toutes ses lettres
 * redescendent sauf la première. Le nombre arrive par la droite, l'initiale
 * glisse à sa rencontre, rétrécit et se pose en exposant : R229 est formé. Le
 * sigle se coupe alors en deux dans le sens de la hauteur, les deux moitiés
 * s'écartent, et le site apparaît par la fente.
 *
 * La démo d'origine découvrait une scène interne. Ici les deux moitiés sont un
 * voile posé au-dessus du site, qui vit déjà derrière : rien n'est dupliqué, et
 * la page est déjà interactive au moment où elle se montre.
 */
export function EntreeMonogramme({ onFini }: { onFini?: () => void }) {
  const voileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const voile = voileRef.current;
    if (!voile) return;

    const finir = () => {
      voile.style.display = "none";
      onFini?.();
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finir();
      return;
    }

    const rideau = voile.querySelector<HTMLElement>(".ent-rideau")!;
    const double = voile.querySelector<HTMLElement>(".ent-double")!;

    const initiale = rideau.querySelector<HTMLElement>(".ent-initiale")!;
    const sigle = rideau.querySelector<HTMLElement>(".ent-sigle")!;
    const nomLettres = [...rideau.querySelectorAll<HTMLElement>(".ent-nom .ent-lettre > span")];
    const sigleLettres = [...rideau.querySelectorAll<HTMLElement>(".ent-sigle .ent-lettre > span")];
    const etiquettes = [...voile.querySelectorAll<HTMLElement>(".ent-etiquette > span")];

    const doubleInitiale = double.querySelector<HTMLElement>(".ent-initiale")!;
    const doubleSigle = double.querySelector<HTMLElement>(".ent-sigle")!;

    let arreter: (() => void) | undefined;

    /**
     * Où l'initiale et le nombre doivent finir.
     *
     * Le monogramme entier se centre sur l'écran : on relève les deux boîtes au
     * repos, on en déduit la largeur qu'aura l'ensemble une fois le nombre
     * agrandi, et on remonte aux translations. Codé en rem, ce calcul ne
     * vaudrait que pour un seul mot.
     */
    function releverReperes() {
      // On mesure toujours l'état neutre, jamais nos propres écritures.
      initiale.style.cssText = "";
      sigle.style.cssText = "";

      const corps = parseFloat(getComputedStyle(sigle).fontSize);
      const boiteVoile = voile!.getBoundingClientRect();
      const boiteInitiale = initiale.getBoundingClientRect();
      const boiteSigle = sigle.getBoundingClientRect();

      const largeurInitiale = boiteInitiale.width * ECHELLE_INITIALE;
      const largeurSigle = boiteSigle.width * RAPPORT_SIGLE;
      const espace = ESPACE_MONOGRAMME * corps * RAPPORT_SIGLE;
      const largeurTotale = largeurInitiale + espace + largeurSigle;

      const gaucheInitiale = boiteVoile.left + boiteVoile.width / 2 - largeurTotale / 2;
      const centreSigleVoulu = gaucheInitiale + largeurInitiale + espace + largeurSigle / 2;
      const centreSigleActuel = boiteSigle.left + boiteSigle.width / 2;

      return {
        xInitiale: gaucheInitiale - boiteInitiale.left,
        yInitiale: REMONTEE_INITIALE * corps,
        avanceeInitiale: gaucheInitiale - boiteInitiale.left + DEPASSEMENT * corps,
        xSigle: centreSigleVoulu - centreSigleActuel,
      };
    }

    /**
     * Rend le nombre net une fois qu'il a fini de grandir.
     *
     * Un texte agrandi par `scale` est tramé à sa petite taille puis étiré :
     * le 229 passait de 6 à 14 rem par un facteur 2,33 et arrivait flou, ce
     * qui se voyait d'autant plus qu'il reste ensuite près de deux secondes à
     * l'écran. On lui donne donc sa vraie taille de police et on ramène
     * l'échelle à 1. Le déplacement que cela provoque est relevé avant et
     * après, puis rendu par une translation : la boîte ne bouge pas d'un
     * pixel, seul le tramage change.
     */
    function affiner(element: HTMLElement) {
      const echelle = parseFloat(element.style.getPropertyValue("--s") || "1");
      if (echelle <= 1) return;

      const avant = element.getBoundingClientRect();
      const corps = parseFloat(getComputedStyle(element).fontSize);
      element.style.fontSize = `${corps * echelle}px`;
      element.style.setProperty("--s", "1");

      const apres = element.getBoundingClientRect();
      const x = parseFloat(element.style.getPropertyValue("--x") || "0");
      element.style.setProperty("--x", `${x + (avant.left - apres.left)}px`);
      element.style.setProperty("--dy", `${avant.top - apres.top}px`);
    }

    function batir() {
      const reperes = releverReperes();

      // Le calque du dessous porte d'emblée l'état final : c'est lui qui
      // fournira la moitié basse du monogramme quand les deux s'écarteront.
      doubleInitiale.style.setProperty("--x", `${reperes.xInitiale}px`);
      doubleInitiale.style.setProperty("--y", `${reperes.yInitiale}px`);
      doubleInitiale.style.setProperty("--s", String(ECHELLE_INITIALE));
      doubleSigle.style.setProperty("--x", `${reperes.xSigle}px`);
      doubleSigle.style.setProperty("--s", String(RAPPORT_SIGLE));
      affiner(doubleSigle);

      // Seules l'initiale et le nombre sont sortis de leur masque : à l'arrivée,
      // le reste du nom est reparti par le bas et n'a plus à se montrer.
      const visiblesAuRepos = [
        doubleInitiale.querySelector<HTMLElement>("span")!,
        ...doubleSigle.querySelectorAll<HTMLElement>(".ent-lettre > span"),
      ];
      for (const lettre of visiblesAuRepos) lettre.style.transform = "translateY(0%)";

      const pistes: Piste[] = [
        // Les étiquettes affleurent dans les coins.
        {
          debut: 0.5,
          duree: 0.75,
          decalage: 0.12,
          nombre: etiquettes.length,
          courbe: HOP,
          poser: (a, rang) => {
            etiquettes[rang].style.transform = `translateY(${-100 + 100 * a}%)`;
          },
        },
        // Le nom monte lettre par lettre.
        {
          debut: 0.5,
          duree: 0.75,
          decalage: 0.05,
          nombre: nomLettres.length,
          courbe: HOP,
          poser: (a, rang) => {
            nomLettres[rang].style.transform = `translateY(${-100 + 100 * a}%)`;
          },
        },
        // Puis il repart par le bas, l'initiale exceptée.
        {
          debut: 2,
          duree: 0.75,
          decalage: 0.05,
          nombre: nomLettres.length - 1,
          courbe: HOP,
          poser: (a, rang) => {
            nomLettres[rang + 1].style.transform = `translateY(${100 * a}%)`;
          },
        },
        // Le nombre prend sa place.
        {
          debut: 2.5,
          duree: 0.75,
          decalage: 0.075,
          nombre: sigleLettres.length,
          courbe: HOP,
          poser: (a, rang) => {
            sigleLettres[rang].style.transform = `translateY(${-100 + 100 * a}%)`;
          },
        },
        // L'initiale part à sa rencontre, et le dépasse un peu.
        {
          debut: 3.5,
          duree: 1,
          courbe: HOP,
          poser: (a) => {
            initiale.style.setProperty("--x", `${reperes.avanceeInitiale * a}px`);
          },
        },
        {
          debut: 3.5,
          duree: 1,
          courbe: HOP,
          poser: (a) => {
            sigle.style.setProperty("--x", `${reperes.xSigle * a}px`);
          },
        },
        // Elle revient, rétrécit, et se pose en exposant : le sigle est formé.
        {
          debut: 4.5,
          duree: 0.75,
          courbe: HOP,
          poser: (a) => {
            const ecart = reperes.xInitiale - reperes.avanceeInitiale;
            initiale.style.setProperty("--x", `${reperes.avanceeInitiale + ecart * a}px`);
            initiale.style.setProperty("--y", `${reperes.yInitiale * a}px`);
            initiale.style.setProperty("--s", String(1 + (ECHELLE_INITIALE - 1) * a));
          },
        },
        {
          debut: 4.5,
          duree: 0.75,
          courbe: HOP,
          poser: (a) => {
            sigle.style.setProperty("--s", String(1 + (RAPPORT_SIGLE - 1) * a));
            // Le sigle achevé, on lui rend sa netteté, puis on le tranche en
            // deux dans le sens de la hauteur.
            if (a === 1) {
              affiner(sigle);
              rideau.dataset.coupe = "";
              double.dataset.coupe = "";
            }
          },
        },
        // Les étiquettes se retirent.
        {
          debut: 5.4,
          duree: 0.75,
          decalage: 0.12,
          nombre: etiquettes.length,
          courbe: HOP,
          poser: (a, rang) => {
            etiquettes[rang].style.transform = `translateY(${100 * a}%)`;
          },
        },
        // Les deux moitiés s'écartent et le site apparaît par la fente.
        {
          debut: 5.9,
          duree: 1,
          courbe: HOP,
          poser: (a) => {
            rideau.style.transform = `translateY(${-100 * a}%)`;
            double.style.transform = `translateY(${100 * a}%)`;
          },
        },
      ];

      return jouer(new LigneDeTemps(pistes), finir);
    }

    // Une entrée de sept secondes se subit à la deuxième visite : un clic ou
    // une touche la coupe net.
    const passer = () => finir();
    window.addEventListener("pointerdown", passer, { once: true });
    window.addEventListener("keydown", passer, { once: true });

    // Les repères dépendent de la chasse réelle : rien ne se mesure avant que
    // la police d'affichage soit là.
    let vivant = true;
    document.fonts.ready.then(() => {
      if (vivant) arreter = batir();
    });

    return () => {
      vivant = false;
      arreter?.();
      window.removeEventListener("pointerdown", passer);
      window.removeEventListener("keydown", passer);
    };
  }, [onFini]);

  return (
    <div ref={voileRef} className="ent" role="presentation">
      <div className="ent-rideau">
        <Monogramme />
      </div>

      <div className="ent-double" aria-hidden="true">
        <Monogramme />
      </div>

      <div className="ent-etiquettes" aria-hidden="true">
        {ETIQUETTES.map((segments) => (
          <p key={segments.join("")} className="ent-etiquette">
            <span>
              {segments.map((segment, rang) => (
                <span
                  key={`${rang}-${segment}`}
                  className={rang % 2 === 0 ? "ent-cap" : undefined}
                >
                  {segment}
                </span>
              ))}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
