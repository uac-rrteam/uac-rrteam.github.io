import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

/**
 * Membres de l'equipe.
 * IMPORTANT : liste incomplete, Cephas fournira le reste. On n'ajoute
 * AUCUN nom qui ne soit pas dans assets/docs/people-ratheil-team.md.
 */
const MEMBERS = [
  { name: "Marie Melene TONOU", focus: "AI & Neuroinformatics", linkedin: "https://www.linkedin.com/in/marie-melene-tonou/" },
  { name: "Marianne Omonlola BALOGOUN", focus: "AI & Telecommunications", linkedin: "https://www.linkedin.com/in/marianne-a-omonlola-balogoun-3bbb00175/" },
  { name: "Linuse TIKPON", focus: "AI & Optimization", linkedin: "https://www.linkedin.com/in/linuse-tikpon-80a1b81a5/" },
];

export function People() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "L'equipe" : "The team"}
        lead={
          fr
            ? "Doctorant.es et chercheur.ses de la Ratheil Research Team. Cette liste s'etoffera au fil des contributions."
            : "PhD candidates and researchers of the Ratheil Research Team. This list will grow over time."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-card p-6 sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {fr ? "Animateur de l'equipe" : "Team lead"}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src="/imgs/people/vinasetan-ratheil.png"
                alt="Portrait du Dr Vinasetan Ratheil Houndji"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-display text-lg font-semibold">Dr Vinasetan Ratheil Houndji</h2>
                <p className="text-sm text-muted-foreground">
                  {fr
                    ? "Professeur Associe, UAC. Chef du Departement Genie Logiciel, IFRI."
                    : "Associate Professor, UAC. Head of Software Engineering Department, IFRI."}
                </p>
                <a href="https://ratheil.info" className="text-sm text-primary underline underline-offset-2">
                  ratheil.info
                </a>
              </div>
            </div>
          </article>

          {MEMBERS.map((m) => (
            <article
              key={m.name}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/55"
            >
              <h2 className="font-display text-base font-semibold">{m.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {fr ? "Doctorant.e" : "PhD candidate"} &middot; {m.focus}
              </p>
              <a href={m.linkedin} className="mt-3 inline-block text-sm text-primary underline underline-offset-2">
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
