import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Axes tires de assets/docs/about-ratheil-team-work.md.
const AXES = [
  {
    fr: "IA pour l'agriculture",
    en: "AI for agriculture",
    descFr: "Modelisation des rendements, detection de maladies et de ravageurs des cultures.",
    descEn: "Yield modelling, detection of crop diseases and pests.",
  },
  {
    fr: "IA pour la sante",
    en: "AI for health",
    descFr: "Maladies cardiovasculaires, maladie renale chronique, maladies non transmissibles, epilepsie.",
    descEn: "Cardiovascular diseases, chronic kidney disease, non-communicable diseases, epilepsy.",
  },
  {
    fr: "Optimisation pour le bien commun",
    en: "Optimisation for the common good",
    descFr: "Equite des jeux de donnees et des modeles, problemes de tournees de vehicules en logistique.",
    descEn: "Fairness of datasets and models, vehicle routing problems in logistics.",
  },
  {
    fr: "IA pour l'education",
    en: "AI for education",
    descFr: "Analyse des performances des etudiants, detection de la triche, systemes de recommandation.",
    descEn: "Student performance analysis, cheating detection, recommendation systems.",
  },
];

export function Team() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "L'intelligence artificielle au service de l'impact societal" : "Artificial Intelligence for Societal Impact"}
        lead={
          fr
            ? "Equipe animee par le Dr Vinasetan Ratheil Houndji, Professeur Associe a l'UAC et Chef du Departement Genie Logiciel de l'IFRI."
            : "A team led by Dr Vinasetan Ratheil Houndji, Associate Professor at UAC and Head of the Software Engineering Department at IFRI."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {AXES.map((axe) => (
            <article
              key={axe.fr}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/55"
            >
              <h2 className="font-display text-lg font-semibold">{fr ? axe.fr : axe.en}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fr ? axe.descFr : axe.descEn}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
