import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Faits tires de assets/docs/events.md.
const EVENTS = [
  {
    title: "ACP Summer School 2025, CP4SD",
    date: "25 au 29 aout 2025",
    place: "Republique du Benin, IFRI Lab Room, UAC",
    descFr:
      "Ecole d'ete avec l'Association for Constraint Programming (ACP) et le reseau A4CP : cinq jours de cours et de travaux pratiques sur la programmation par contraintes au service du developpement durable.",
    descEn:
      "Summer school with the Association for Constraint Programming (ACP) and the A4CP network: five days of lectures and hands-on work on constraint programming for sustainable development.",
    link: "https://school.a4cp.org/summer2025/index.html",
  },
  {
    title: "BWAI, Benin Workshop on Artificial Intelligence",
    date: "editions 2021, 2022, 2024, 2025",
    place: "UAC",
    descFr:
      "Atelier national annuel dont le Dr Ratheil Houndji est General co-Chairman. Il promeut les systemes intelligents made in Africa et les echanges entre chercheurs, praticiens et ingenieurs.",
    descEn:
      "Annual national workshop co-chaired by Dr Ratheil Houndji, promoting made-in-Africa intelligent systems and exchanges between researchers, practitioners and engineers.",
    link: undefined as string | undefined,
  },
];

export function Events() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        eyebrow={fr ? "Evenements" : "Events"}
        title={fr ? "Ecoles, ateliers et seminaires" : "Schools, workshops and seminars"}
        lead={
          fr
            ? "L'equipe organise ou co-organise regulierement des rencontres pour faire vivre la communaute IA au Benin et en Afrique de l'Ouest."
            : "The team regularly organises or co-organises events to grow the AI community in Benin and West Africa."
        }
      />
      <div className="mx-auto max-w-3xl space-y-4 px-5 pb-24">
        {EVENTS.map((e) => (
          <article key={e.title} className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold">{e.title}</h2>
              <span className="text-sm text-muted-foreground">{e.date}</span>
            </div>
            <p className="mt-1 text-sm text-primary">{e.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fr ? e.descFr : e.descEn}</p>
            {e.link && (
              <a href={e.link} className="mt-3 inline-block text-sm text-primary underline underline-offset-2">
                {fr ? "Site de l'evenement" : "Event website"}
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
