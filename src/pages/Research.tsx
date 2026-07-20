import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

/**
 * Page-chapeau Recherche.
 * A terme, elle pointera vers des sous-pages ou des billets par theme.
 * Pour l'instant, elle presente les grands sujets sans rien inventer.
 */
const TOPICS = [
  { fr: "Apprentissage automatique", en: "Machine learning" },
  { fr: "Optimisation combinatoire", en: "Combinatorial optimisation" },
  { fr: "Programmation par contraintes", en: "Constraint programming" },
  { fr: "Traitement du langage naturel", en: "Natural language processing" },
  { fr: "Vision par ordinateur", en: "Computer vision" },
  { fr: "Internet des objets", en: "Internet of Things" },
];

export function Research() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        eyebrow={fr ? "Recherche" : "Research"}
        title={fr ? "Nos travaux" : "Our work"}
        lead={
          fr
            ? "Des methodes d'IA et d'optimisation pensees pour des problemes concrets, avec un fil conducteur : produire une recherche utile au contexte africain et beninois."
            : "AI and optimisation methods designed for concrete problems, with one guiding thread: research useful to the African and Beninese context."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div key={t.fr} className="rounded-lg border border-border bg-card px-5 py-4 text-sm font-medium">
              {fr ? t.fr : t.en}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
