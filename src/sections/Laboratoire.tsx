import { useLang } from "@/i18n/lang";
import { RevealText, type Token } from "@/components/content/RevealText";

// Manifeste en gros format, revele au scroll. Les mots marques d'une couleur
// portent la charte du logo (bleu, rouge). Uniquement des faits verifies.
const MANIFESTO_FR: Token[] = [
  { text: "Le" }, { text: "LRSIA" }, { text: "met" }, { text: "l'" },
  { text: "intelligence", color: "blue" }, { text: "artificielle", color: "blue" },
  { text: "au" }, { text: "service" }, { text: "de" }, { text: "l'" },
  { text: "impact", color: "red" }, { text: "societal", color: "red" }, { text: "." },
  { text: "Agriculture," }, { text: "sante," }, { text: "education" }, { text: ":" },
  { text: "nous" }, { text: "concevons" }, { text: "des" }, { text: "methodes" },
  { text: "d'optimisation" }, { text: "pensees" }, { text: "pour" }, { text: "le" },
  { text: "bien" }, { text: "commun." },
];

const MANIFESTO_EN: Token[] = [
  { text: "LRSIA" }, { text: "puts" },
  { text: "artificial", color: "blue" }, { text: "intelligence", color: "blue" },
  { text: "at" }, { text: "the" }, { text: "service" }, { text: "of" },
  { text: "societal", color: "red" }, { text: "impact", color: "red" }, { text: "." },
  { text: "Agriculture," }, { text: "health," }, { text: "education" }, { text: ":" },
  { text: "we" }, { text: "design" }, { text: "optimisation" }, { text: "methods" },
  { text: "built" }, { text: "for" }, { text: "the" }, { text: "common" }, { text: "good." },
];

/**
 * Premiere section de contenu sous le hero : le LRSIA en gros format.
 * Le manifeste occupe toute la largeur, aligne a gauche (disposition de la
 * reference), et se revele au scroll. Deux illustrations animees, sobres :
 * la fiole (le labo) et un reseau de neurones (l'IA).
 */
export function Laboratoire() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <section
      id="laboratoire"
      className="relative mx-2 mt-2 overflow-hidden rounded-[1.25rem] bg-background px-6 py-24 md:px-14 md:py-36"
    >
      {/* Fiole animee (le labo), en haut a droite. */}
      <Flask className="pointer-events-none absolute right-6 top-10 h-24 w-24 text-border md:right-16 md:h-36 md:w-36" />
      {/* Tete de robot animee (l'IA), en bas a gauche (un peu plus haut que
          ne l'etait le reseau). */}
      <RobotHead className="pointer-events-none absolute bottom-8 left-4 h-24 w-24 text-border md:bottom-14 md:left-12 md:h-36 md:w-36" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <RevealText
          tokens={fr ? MANIFESTO_FR : MANIFESTO_EN}
          className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          {fr
            ? "Unite de recherche de l'IFRI a l'Universite d'Abomey-Calavi, creee en 2017 et dirigee par le Professeur Eugene C. Ezin. Signataire de la Declaration de Montreal pour une intelligence artificielle responsable."
            : "A research unit of IFRI at the University of Abomey-Calavi, founded in 2017 and led by Professor Eugene C. Ezin. Signatory of the Montreal Declaration for a responsible artificial intelligence."}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Fiole de laboratoire : elle flotte doucement, des bulles montent. */
function Flask({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="anim-float h-full w-full">
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
          <path
            d="M26 6h12M28 6v16L14 50a4 4 0 0 0 3.6 6h28.8A4 4 0 0 0 50 50L36 22V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Liquide bleu */}
          <path d="M20.5 41 32 35l11.5 6 3.7 7.4A3 3 0 0 1 44.5 53h-25a3 3 0 0 1-2.7-4.6L20.5 41Z" fill="hsl(var(--lrsia-blue) / 0.9)" />
          {/* Bulles qui montent (delais decales) */}
          <circle className="anim-bubble" style={{ animationDelay: "0s" }} cx="28" cy="46" r="1.8" fill="hsl(var(--lrsia-red))" />
          <circle className="anim-bubble" style={{ animationDelay: "0.8s" }} cx="34" cy="48" r="1.3" fill="white" fillOpacity="0.9" />
          <circle className="anim-bubble" style={{ animationDelay: "1.5s" }} cx="31" cy="44" r="1.1" fill="hsl(var(--lrsia-blue))" />
        </svg>
      </div>
    </div>
  );
}

/** Tete de robot : elle flotte, l'antenne et les yeux pulsent. Signe de l'IA. */
function RobotHead({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="anim-float h-full w-full">
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
          {/* Antenne + dot qui pulse */}
          <line x1="32" y1="10" x2="32" y2="18" stroke="currentColor" strokeWidth="2" />
          <circle className="anim-node" cx="32" cy="8" r="2.4" fill="hsl(var(--lrsia-red))" />
          {/* Tete */}
          <rect x="14" y="18" width="36" height="30" rx="8" stroke="currentColor" strokeWidth="2" />
          {/* Oreilles */}
          <rect x="10" y="26" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="50" y="26" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          {/* Yeux (bleus, arrondis, pulsent en decale) : plus doux */}
          <circle className="anim-node" cx="25" cy="32" r="3.6" fill="hsl(var(--lrsia-blue))" />
          <circle className="anim-node" style={{ animationDelay: "0.5s" }} cx="39" cy="32" r="3.6" fill="hsl(var(--lrsia-blue))" />
          {/* Sourire simple */}
          <path d="M26 40q6 5 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}
