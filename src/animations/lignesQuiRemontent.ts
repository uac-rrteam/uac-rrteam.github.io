import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* L'apparition des textes du site : chaque bloc remonte ligne par ligne de
   sous son masque quand il entre dans l'écran.

   Les valeurs viennent de la démonstration d'origine et ne s'inventent pas :
   une seconde pour qu'une ligne se pose, un dixième de retard sur la
   précédente, et un départ quand le sommet du bloc passe les trois quarts de
   l'écran. La courbe est quintique, celle que GSAP nomme power4. */
const DUREE = 1;
const DECALAGE = 0.1;
const REPERE = "top 75%";

/* La cascade d'un bloc ne dépasse pas cette durée. Un dixième de retard par
   ligne va bien pour les trois ou quatre lignes d'un paragraphe ; sur une
   section de soixante-dix lignes, il étalerait l'apparition sur sept
   secondes, et le lecteur serait parti avant la fin. */
const CASCADE_MAX = 0.8;

/** Ce qu'on masque : les blocs de texte, pas leurs conteneurs. */
const FEUILLES = "h1, h2, h3, h4, p, li, strong, span, a";

/* Les éléments qu'on fabrique portent des noms à eux, et ce n'est pas une
   coquetterie. Découpés en `span`, les mots héritaient des règles de la page
   qui visent les `span` : plusieurs les mettent en `display: block`, si bien
   que chaque mot devenait sa propre ligne et que des sections entières
   s'affichaient en colonne, un mot par ligne. Un nom d'élément inconnu du
   document n'est ciblé par aucune feuille, et se comporte en ligne par
   défaut. */
const MOT = "lqr-mot";
const MASQUE = "lqr-masque";
const LIGNE = "lqr-ligne";

/**
 * Découpe un bloc en lignes, chacune dans son propre masque.
 *
 * Les lignes ne se décident pas à l'écriture : elles dépendent de la largeur
 * réelle de la colonne et de la police effectivement chargée. On pose donc un
 * élément par mot, on laisse le navigateur composer, on relève où il a coupé,
 * puis on regroupe.
 */
function decouper(bloc: HTMLElement): HTMLElement[] {
  const texte = bloc.dataset.texteOrigine ?? bloc.textContent ?? "";
  if (!texte.trim()) return [];
  bloc.dataset.texteOrigine = texte;

  const mots: HTMLElement[] = [];
  const fragment = document.createDocumentFragment();

  for (const morceau of texte.split(/(\s+)/)) {
    if (!morceau) continue;
    // Les espaces restent de vrais nœuds texte : enfermées dans une balise,
    // elles deviennent insécables et le paragraphe ne trouve plus où couper.
    if (!morceau.trim()) {
      fragment.append(document.createTextNode(morceau));
      continue;
    }
    const mot = document.createElement(MOT);
    mot.textContent = morceau;
    fragment.append(mot);
    mots.push(mot);
  }

  bloc.replaceChildren(fragment);

  // Deux pixels de tolérance : les accents et les jambages font varier le
  // sommet à l'intérieur d'une même ligne, et fabriquent sinon des lignes
  // fantômes d'un seul mot.
  const groupes: HTMLElement[][] = [];
  let sommetPrecedent = Number.NaN;
  for (const mot of mots) {
    const sommet = mot.offsetTop;
    if (Number.isNaN(sommetPrecedent) || Math.abs(sommet - sommetPrecedent) > 2) {
      groupes.push([]);
      sommetPrecedent = sommet;
    }
    groupes[groupes.length - 1].push(mot);
  }

  const masques = groupes.map((groupe, rang) => {
    const masque = document.createElement(MASQUE);
    const ligne = document.createElement(LIGNE);
    ligne.append(document.createTextNode(groupe.map((mot) => mot.textContent).join(" ")));

    // Une espace en fin de ligne, sauf la dernière : invisible à la
    // composition, mais sans elle le texte copié soude les deux mots de la
    // coupure et la lecture d'écran les prononce collés.
    if (rang < groupes.length - 1) ligne.append(document.createTextNode(" "));

    masque.append(ligne);
    return masque;
  });

  bloc.replaceChildren(...masques);
  return masques.map((masque) => masque.firstElementChild as HTMLElement);
}

/**
 * Les feuilles de texte d'un bloc : celles qui n'ont que du texte dedans.
 *
 * Une feuille déjà découpée reste une feuille, et c'est le point à ne pas
 * rater. Après un premier passage, elle porte des masques : à la relecture
 * elle n'a donc plus l'air d'une feuille, et ce sont les lignes elles-mêmes,
 * qui n'ont pas d'enfant, qu'on prenait pour du texte neuf. Le second
 * découpage imbriquait alors des masques dans les masques, et une partie du
 * texte ne remontait plus jamais. Le marquage posé au premier passage tranche.
 */
function feuilles(bloc: HTMLElement): HTMLElement[] {
  const trouvees: HTMLElement[] = [];
  const candidats = bloc.matches(FEUILLES)
    ? [bloc, ...bloc.querySelectorAll<HTMLElement>(FEUILLES)]
    : [...bloc.querySelectorAll<HTMLElement>(FEUILLES)];

  for (const candidat of candidats) {
    if (candidat.closest(MASQUE)) continue;
    if (candidat.dataset.texteOrigine !== undefined) {
      trouvees.push(candidat);
      continue;
    }
    // Un élément qui porte d'autres éléments n'est pas une feuille : ce sont
    // ses enfants qu'on découpera. Et un lien découpé perdrait sa cible, donc
    // il remonte d'un seul tenant, dans son propre masque.
    if (candidat.childElementCount > 0) continue;
    if (!candidat.textContent?.trim()) continue;
    trouvees.push(candidat);
  }

  return trouvees;
}

interface Reglage {
  /** Le sélecteur des blocs à faire remonter, dans la portée donnée. */
  blocs: string;
  racine: HTMLElement;
}

/**
 * Installe l'apparition sur une page.
 *
 * Rend une fonction de nettoyage. Le découpage est refait à la redimension et
 * une fois les polices arrivées : relevé avant, il compterait les lignes de la
 * police de secours, qui n'a ni la même chasse ni les mêmes coupures.
 */
export function lignesQuiRemontent({ blocs, racine }: Reglage) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const cibles = [...racine.querySelectorAll<HTMLElement>(blocs)];
  if (!cibles.length) return () => {};

  // Une ligne posée reste posée : on retient les blocs déjà joués pour que le
  // redécoupage ne les remette pas sous leur masque.
  const joues = new WeakSet<HTMLElement>();
  let lignesPar = new Map<HTMLElement, HTMLElement[]>();

  function preparer() {
    lignesPar = new Map();
    for (const cible of cibles) {
      const lignes: HTMLElement[] = [];
      for (const feuille of feuilles(cible)) lignes.push(...decouper(feuille));
      lignesPar.set(cible, lignes);
      gsap.set(lignes, { yPercent: joues.has(cible) ? 0 : 100 });
    }
  }

  function poser(cible: HTMLElement) {
    const lignes = lignesPar.get(cible);
    if (!lignes?.length) return;
    joues.add(cible);
    gsap.set(lignes, { yPercent: 0 });
  }

  function jouer(cible: HTMLElement, retard: number) {
    const lignes = lignesPar.get(cible);
    if (!lignes?.length) return;
    joues.add(cible);
    gsap.to(lignes, {
      yPercent: 0,
      duration: DUREE,
      ease: "power4.out",
      stagger: lignes.length > 1 ? Math.min(DECALAGE, CASCADE_MAX / (lignes.length - 1)) : 0,
      delay: retard,
      overwrite: "auto",
    });
  }

  preparer();

  // Un observateur par lot plutôt que par bloc : une page de recherche compte
  // plus de cent blocs, et ils entrent par paquets.
  const lots = ScrollTrigger.batch(cibles, {
    start: REPERE,
    once: true,
    onEnter: (elements) => {
      // Le retard d'un bloc sur son voisin est plafonné : un saut de dix
      // écrans fait entrer quatre-vingt-dix blocs dans le même lot, et le
      // dernier serait servi cinq secondes plus tard.
      elements.forEach((element, rang) => jouer(element as HTMLElement, Math.min(rang * 0.06, 0.5)));
    },
  });

  /* Le filet de sécurité, et il est indispensable.
     Un bloc au repos est caché sous son masque : s'il n'est jamais annoncé, il
     ne s'affiche jamais. Or un saut de défilement (barre tirée d'un coup,
     ancre, retour sur la page) fait passer des blocs sans qu'ils soient vus
     entrer. On rattrape à l'arrêt du défilement : ce qui a dépassé le repère
     est joué, et ce qui est déjà sorti par le haut est posé sans animation,
     puisque personne ne l'a regardé arriver. */
  function rattraper() {
    // En bas de page, il n'y a plus de course : un bloc du dernier quart ne
    // franchira jamais son repère, et resterait caché pour de bon.
    const enBas = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    for (const cible of cibles) {
      if (joues.has(cible)) continue;
      const boite = cible.getBoundingClientRect();
      const visible = boite.top < window.innerHeight && boite.bottom > 0;
      if (boite.top > window.innerHeight * 0.75 && !(enBas && visible)) continue;
      if (boite.bottom < 0) poser(cible);
      else jouer(cible, 0);
    }
  }

  /* Le rattrapage est branché sur le défilement de la fenêtre, pas sur
     l'événement `scrollEnd` de ScrollTrigger : avec un défilement lissé et des
     sauts programmés, celui-ci ne se produit pas toujours, et le filet ne
     servait alors à rien. Vérifié par la mesure. */
  let veille = 0;
  function auDefilement() {
    window.clearTimeout(veille);
    veille = window.setTimeout(rattraper, 120);
  }

  window.addEventListener("scroll", auDefilement, { passive: true });

  let attente = 0;
  function auRedimensionnement() {
    window.clearTimeout(attente);
    attente = window.setTimeout(() => {
      preparer();
      ScrollTrigger.refresh();
    }, 150);
  }

  window.addEventListener("resize", auRedimensionnement);
  document.fonts?.ready.then(() => {
    preparer();
    ScrollTrigger.refresh();
  });

  return () => {
    window.clearTimeout(attente);
    window.clearTimeout(veille);
    window.removeEventListener("resize", auRedimensionnement);
    window.removeEventListener("scroll", auDefilement);
    for (const lot of lots) lot.kill();
    /* On ne remet pas le texte d'origine dans les blocs, et c'est important.
       React met le DOM à jour AVANT de jouer le nettoyage de l'effet
       précédent : restaurer ici réécrivait l'ancien texte par-dessus le
       nouveau, et un bloc de la page suivante gardait le contenu de la
       précédente. Un redécoupage part de `data-texte-origine`, donc rien ne
       se perd. */
  };
}
