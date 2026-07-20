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
 * Le titre-surtitre est volontairement absent (refuse). Le sens vient du texte
 * lui-meme, qui se revele au scroll, ponctue par la charte du logo.
 */
export function Laboratoire() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <section
      id="laboratoire"
      className="relative mx-2 mt-2 overflow-hidden rounded-[1.25rem] bg-card px-6 py-24 md:px-14 md:py-36"
    >
      {/* Fiole : signe du laboratoire, trait fin, liquide bleu, bulle rouge. */}
      <FlaskGlyph className="pointer-events-none absolute right-6 top-10 h-24 w-24 text-border md:right-16 md:h-40 md:w-40" />

      <div className="mx-auto max-w-6xl">
        <RevealText
          tokens={fr ? MANIFESTO_FR : MANIFESTO_EN}
          className="max-w-5xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
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

/** Fiole de laboratoire en trait fin. Liquide bleu et bulle rouge : la charte. */
function FlaskGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* Contour de la fiole */}
      <path
        d="M26 6h12M28 6v16L14 50a4 4 0 0 0 3.6 6h28.8A4 4 0 0 0 50 50L36 22V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Liquide bleu */}
      <path
        d="M20.5 40 32 34l11.5 6 4.2 8.4A3 3 0 0 1 45 53H19a3 3 0 0 1-2.7-4.6L20.5 40Z"
        fill="hsl(var(--lrsia-blue) / 0.9)"
      />
      {/* Bulles */}
      <circle cx="30" cy="46" r="2" fill="hsl(var(--lrsia-red))" />
      <circle cx="37" cy="49" r="1.4" fill="white" fillOpacity="0.9" />
    </svg>
  );
}
