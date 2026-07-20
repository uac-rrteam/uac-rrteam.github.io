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
      {/* Reseau de neurones anime (l'IA), en bas a gauche. */}
      <NeuralNet className="pointer-events-none absolute -bottom-4 left-4 h-28 w-40 text-border md:left-12 md:h-40 md:w-56" />

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

/** Reseau de neurones : les noeuds pulsent, un signal circule sur les liens. */
function NeuralNet({ className }: { className?: string }) {
  // Trois couches simples (2 -> 3 -> 1). Coordonnees a la main.
  const input = [
    { x: 12, y: 30 },
    { x: 12, y: 70 },
  ];
  const hidden = [
    { x: 50, y: 20 },
    { x: 50, y: 50 },
    { x: 50, y: 80 },
  ];
  const output = [{ x: 88, y: 50 }];

  const edges: Array<[{ x: number; y: number }, { x: number; y: number }]> = [];
  input.forEach((a) => hidden.forEach((b) => edges.push([a, b])));
  hidden.forEach((a) => output.forEach((b) => edges.push([a, b])));

  const nodes = [...input, ...hidden, ...output];

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="currentColor"
          strokeWidth="0.8"
          className="anim-flow"
          style={{ animationDelay: `${(i % 5) * 0.15}s`, opacity: 0.5 }}
        />
      ))}
      {nodes.map((n, i) => {
        // Le noeud de sortie en rouge, un noeud cache en bleu : la charte.
        const fill = i === nodes.length - 1 ? "hsl(var(--lrsia-red))" : i === 3 ? "hsl(var(--lrsia-blue))" : "currentColor";
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="3.4"
            fill={fill}
            className="anim-node"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        );
      })}
    </svg>
  );
}
