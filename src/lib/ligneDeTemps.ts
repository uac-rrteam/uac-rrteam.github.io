// Ligne de temps maison, sans dependance d animation.
//
// De quoi jouer une animation d'entrée chronométrée sans GSAP : des pistes qui
// démarrent à un instant donné, durent un temps donné, et écrivent une valeur
// entre 0 et 1 adoucie par une courbe.
//
// Les heroes sont presque tous bâtis là-dessus : rien n'est accroché au
// défilement, tout se déroule en secondes depuis l'ouverture de la page.

/** Les courbes de GSAP, reprises telles quelles. */
export const COURBE = {
  lineaire: (avancee: number) => avancee,

  /** `expo.out` : part très vite, s'arrête en douceur. */
  expoSortie: (avancee: number) => (avancee === 1 ? 1 : 1 - Math.pow(2, -10 * avancee)),

  /**
   * `expo.inOut` : quasi immobile au départ, puis d'un coup.
   *
   * Volontairement non normalisée, comme chez eux : à l'instant zéro elle vaut
   * 0,0005 et non 0. C'est invisible, mais la recaler décalerait toute la
   * courbe et ferait démarrer le mouvement plus tôt.
   */
  expoEntreeSortie: (avancee: number) => {
    if (avancee === 0 || avancee === 1) return avancee
    const double = avancee * 2
    if (double < 1) return 0.5 * Math.pow(2, 10 * (double - 1))
    return 0.5 * (2 - Math.pow(2, -10 * (double - 1)))
  },

  /** `power4.out` : quintique, malgré son nom. */
  quintSortie: (avancee: number) => 1 - Math.pow(1 - avancee, 5),

  /** `power3.out` : quartique. */
  quartSortie: (avancee: number) => 1 - Math.pow(1 - avancee, 4),

  /** `power2.inOut` : cubique des deux côtés. */
  cubeEntreeSortie: (avancee: number) => {
    if (avancee < 0.5) return 4 * avancee * avancee * avancee
    return 1 - Math.pow(-2 * avancee + 2, 3) / 2
  },

  /** `power3.inOut` : quartique des deux côtés. */
  quartEntreeSortie: (avancee: number) => {
    if (avancee < 0.5) return 8 * Math.pow(avancee, 4)
    return 1 - Math.pow(-2 * avancee + 2, 4) / 2
  },

  /** `power4.inOut` : quintique des deux côtés. */
  quintEntreeSortie: (avancee: number) => {
    if (avancee < 0.5) return 16 * Math.pow(avancee, 5)
    return 1 - Math.pow(-2 * avancee + 2, 5) / 2
  },

  /** `power2.in` : cubique, mais qui part de rien et accélère. */
  cubeEntree: (avancee: number) => avancee * avancee * avancee,

  /** `power2.out` : cubique. */
  cubeSortie: (avancee: number) => 1 - Math.pow(1 - avancee, 3),

  /** `power1.out` : carrée. C'est aussi la courbe par défaut de GSAP. */
  carreSortie: (avancee: number) => 1 - Math.pow(1 - avancee, 2),

  /** `sine.out` : un quart de sinusoïde, la plus douce des sorties. */
  sinusSortie: (avancee: number) => Math.sin((avancee * Math.PI) / 2),

  /** `power1.inOut` : carrée des deux côtés. */
  carreEntreeSortie: (avancee: number) => {
    if (avancee < 0.5) return 2 * avancee * avancee
    return 1 - Math.pow(-2 * avancee + 2, 2) / 2
  },
}

/**
 * Une bézier cubique de CSS, résolue numériquement.
 *
 * Plusieurs démos déclarent leur propre courbe par `CustomEase.create(...)`
 * plutôt que d'en prendre une du catalogue. Le point (x1, y1) et le point
 * (x2, y2) sont ceux qu'on lit dans leur code, dans le même ordre.
 *
 * On cherche le paramètre du tracé qui donne l'abscisse voulue, puis on lit
 * l'ordonnée à ce paramètre. Newton converge en trois ou quatre tours sur ces
 * courbes ; la bissection sert de filet quand la pente s'aplatit.
 */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const surAxe = (t: number, a: number, b: number) => {
    const inverse = 1 - t
    return 3 * inverse * inverse * t * a + 3 * inverse * t * t * b + t * t * t
  }
  const pente = (t: number, a: number, b: number) => {
    const inverse = 1 - t
    return 3 * inverse * inverse * a + 6 * inverse * t * (b - a) + 3 * t * t * (1 - b)
  }

  return (avancee: number) => {
    if (avancee <= 0) return 0
    if (avancee >= 1) return 1

    let t = avancee
    for (let essai = 0; essai < 5; essai += 1) {
      const ecart = surAxe(t, x1, x2) - avancee
      if (Math.abs(ecart) < 1e-5) return surAxe(t, y1, y2)
      const derivee = pente(t, x1, x2)
      if (Math.abs(derivee) < 1e-6) break
      t -= ecart / derivee
    }

    let bas = 0
    let haut = 1
    t = avancee
    while (haut - bas > 1e-5) {
      if (surAxe(t, x1, x2) < avancee) bas = t
      else haut = t
      t = (bas + haut) / 2
    }
    return surAxe(t, y1, y2)
  }
}

/**
 * Une courbe donnée par un chemin, comme les `CustomEase.create(nom, "M0,0 C…")`.
 *
 * Plusieurs démos dessinent leur courbe en deux morceaux plutôt que d'en
 * choisir une du catalogue. Chaque morceau est une bézier cubique entre deux
 * points de passage ; ramené à son propre carré, il redevient une bézier
 * unitaire, celle que `bezier()` sait déjà résoudre.
 *
 * S'écrit avec les points du chemin, dans l'ordre : le départ, puis trois
 * points par morceau (les deux contrôles et l'arrivée).
 */
export function chemin(...points: [number, number][]) {
  const morceaux: { x0: number; x1: number; y0: number; y1: number; courbe: (a: number) => number }[] = []

  for (let index = 1; index + 2 < points.length + 1; index += 3) {
    const [x0, y0] = points[index - 1]
    const [cx1, cy1] = points[index]
    const [cx2, cy2] = points[index + 1]
    const [x1, y1] = points[index + 2]
    const largeur = x1 - x0
    const hauteur = y1 - y0
    morceaux.push({
      x0,
      x1,
      y0,
      y1,
      courbe: bezier(
        (cx1 - x0) / largeur,
        (cy1 - y0) / hauteur,
        (cx2 - x0) / largeur,
        (cy2 - y0) / hauteur
      ),
    })
  }

  return (avancee: number) => {
    if (avancee <= 0) return 0
    if (avancee >= 1) return 1
    const morceau = morceaux.find((piece) => avancee <= piece.x1) ?? morceaux[morceaux.length - 1]
    const part = (avancee - morceau.x0) / (morceau.x1 - morceau.x0)
    return morceau.y0 + (morceau.y1 - morceau.y0) * morceau.courbe(part)
  }
}

export type Piste = {
  /** Instant de départ, en secondes depuis le début. */
  debut: number
  duree: number
  courbe?: (avancee: number) => number
  /** Retard ajouté à chaque élément d'un groupe. */
  decalage?: number
  /** Combien d'éléments le groupe compte, si `decalage` est posé. */
  nombre?: number
  /**
   * Écrit l'état.
   *
   * `poser(avancee)` pour une piste simple, `poser(avancee, rang)` pour un
   * groupe décalé : elle est alors appelée une fois par élément.
   */
  poser: (avancee: number, rang: number) => void
}

/**
 * Une suite de pistes jouée en temps réel.
 *
 * Chaque piste n'est écrite que si son avancée a bougé : une animation de six
 * secondes dont la moitié des pistes sont à l'arrêt ne coûte alors presque
 * rien.
 */
export class LigneDeTemps {
  private pistes: Piste[]
  private ecrits: number[][]
  private fin: number

  constructor(pistes: Piste[]) {
    this.pistes = pistes
    this.ecrits = pistes.map((piste) => new Array(piste.nombre ?? 1).fill(Number.NaN))
    this.fin = pistes.reduce(
      (tard, piste) =>
        Math.max(tard, piste.debut + piste.duree + (piste.decalage ?? 0) * ((piste.nombre ?? 1) - 1)),
      0
    )
  }

  /** Durée totale, en secondes. */
  get duree() {
    return this.fin
  }

  /** Pose l'état à un instant donné. Renvoie `true` si quelque chose a bougé. */
  poser(temps: number) {
    let bouge = false

    for (let index = 0; index < this.pistes.length; index += 1) {
      const piste = this.pistes[index]
      const memoire = this.ecrits[index]
      const nombre = piste.nombre ?? 1
      const decalage = piste.decalage ?? 0
      const courbe = piste.courbe ?? COURBE.lineaire

      for (let rang = 0; rang < nombre; rang += 1) {
        const brute = (temps - piste.debut - rang * decalage) / piste.duree

        // Une piste qui n'a pas commencé n'écrit rien du tout, pas même sa
        // valeur de départ. Sans cela, une piste tardive pose son état initial
        // dès la première image et écrase celle qui joue encore, ou déclenche
        // trop tôt ce qu'elle avait à faire une seule fois. L'état de départ
        // appartient à la feuille de style, pas à l'ordonnanceur.
        if (brute < 0) continue

        const fini = brute >= 1
        const avancee = courbe(fini ? 1 : brute)

        // Au millième : en deçà, aucune écriture ne change un pixel à l'écran.
        //
        // La toute dernière écriture fait exception et se reconnaît à sa
        // marque : elle doit tomber sur l'avancée exacte, sinon l'arrondi la
        // confond avec l'image précédente et la saute. Une piste finirait
        // alors à 0,9996 au lieu de 1, et ce qui ne se joue qu'à l'arrivée ne
        // se jouerait jamais.
        const marque = fini ? Number.POSITIVE_INFINITY : Math.round(avancee * 1000) / 1000
        if (marque === memoire[rang]) continue
        memoire[rang] = marque
        piste.poser(avancee, rang)
        bouge = true
      }
    }

    return bouge
  }

  /** Oublie ce qui a été écrit, pour rejouer depuis le début. */
  oublier() {
    for (const memoire of this.ecrits) memoire.fill(Number.NaN)
  }
}

/**
 * Fait tourner une ligne de temps, et s'arrête quand elle est finie.
 *
 * Renvoie de quoi tout défaire. La boucle se met en veille avec l'onglet, et
 * ne redémarre pas une animation déjà jouée.
 */
export function jouer(ligne: LigneDeTemps, surFin?: () => void) {
  let temps = 0
  let horodatage = 0
  let boucle = 0

  function tourner(maintenant: number) {
    // Le temps réel, sauf après une très longue image : GSAP fait de même et
    // compte alors 33 ms (son `lagSmoothing(500, 33)`). Plafonner plus bas,
    // à un dixième de seconde, faisait prendre du retard à toute la ligne dès
    // que quelques images dépassaient 100 ms.
    const brut = horodatage ? (maintenant - horodatage) / 1000 : 0
    const secondes = brut > 0.5 ? 0.033 : brut
    horodatage = maintenant
    temps += secondes

    ligne.poser(temps)

    if (temps < ligne.duree) {
      boucle = requestAnimationFrame(tourner)
    } else {
      boucle = 0
      surFin?.()
    }
  }

  function reprendre() {
    if (!boucle && temps < ligne.duree && !document.hidden) {
      horodatage = 0
      boucle = requestAnimationFrame(tourner)
    }
  }

  ligne.poser(0)
  boucle = requestAnimationFrame(tourner)
  document.addEventListener('visibilitychange', reprendre)

  return () => {
    if (boucle) cancelAnimationFrame(boucle)
    document.removeEventListener('visibilitychange', reprendre)
  }
}
