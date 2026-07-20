import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLang } from "@/i18n/lang";

// Domaines portes par l'IFRI (source : assets/docs/about-lrsia.md).
const DOMAINES = [
  { fr: "Genie logiciel", en: "Software engineering" },
  { fr: "Securite informatique", en: "Computer security" },
  { fr: "Internet et multimedia", en: "Internet and multimedia" },
  { fr: "Reseaux et systemes d'information", en: "Networks and information systems" },
  { fr: "Intelligence artificielle", en: "Artificial intelligence" },
  { fr: "Internet des objets", en: "Internet of Things" },
];

/**
 * Premiere section de contenu sous le hero : presentation du LRSIA.
 * Panneau arrondi, memes marges que le hero et le footer. Contenu revele au
 * scroll. Uniquement des faits verifies, rien d'invente.
 */
export function Laboratoire() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="laboratoire"
      className="mx-2 mt-2 scroll-mt-4 rounded-[1.25rem] bg-card px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-sm font-medium text-primary">
          {fr ? "Le laboratoire" : "The lab"}
        </p>
        <h2
          data-reveal
          className="mt-4 max-w-3xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        >
          {fr ? "Le LRSIA en bref" : "About LRSIA"}
        </h2>
        <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {fr
            ? "Laboratoire de Recherche en Sciences Informatiques et Applications, unite de recherche de l'IFRI a l'Universite d'Abomey-Calavi. Cree en 2017, dirige par le Professeur Eugene C. Ezin, il mene des recherches pour le developpement durable dans les pays en developpement."
            : "Laboratory for Research in Computer Science and Applications, a research unit of IFRI at the University of Abomey-Calavi. Founded in 2017, led by Professor Eugene C. Ezin, it conducts research for sustainable development in developing countries."}
        </p>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINES.map((d) => (
            <div
              data-reveal
              key={d.fr}
              className="rounded-lg border border-border px-5 py-4 text-sm font-medium transition-colors hover:border-primary/55"
            >
              {fr ? d.fr : d.en}
            </div>
          ))}
        </div>

        <p data-reveal className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {fr
            ? "Le LRSIA est signataire de la Declaration de Montreal pour un developpement responsable de l'intelligence artificielle."
            : "LRSIA is a signatory of the Montreal Declaration for a Responsible Development of Artificial Intelligence."}
        </p>
      </div>
    </section>
  );
}
