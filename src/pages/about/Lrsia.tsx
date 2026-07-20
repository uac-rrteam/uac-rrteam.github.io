import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Contenu factuel tire de assets/docs/about-lrsia.md. Ne rien inventer ici.
const DOMAINES = [
  "Genie logiciel",
  "Securite informatique",
  "Internet et multimedia",
  "Reseaux et systemes d'information",
  "Intelligence artificielle",
  "Internet des objets (IoT)",
];

export function Lrsia() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        eyebrow="IFRI, Universite d'Abomey-Calavi"
        title={fr ? "Le LRSIA en bref" : "About LRSIA"}
        lead={
          fr
            ? "Laboratoire de Recherche en Sciences Informatiques et Applications, unite de recherche de l'IFRI, cree en 2017."
            : "Laboratory for Research in Computer Science and Applications, a research unit of IFRI, founded in 2017."
        }
      />
      <div className="mx-auto max-w-3xl space-y-6 px-5 pb-24 text-base leading-relaxed text-muted-foreground">
        <p>
          {fr
            ? "Le laboratoire a pour but de mener des recherches pour le developpement durable dans les pays en developpement, en partenariat avec d'autres laboratoires partageant la meme vision."
            : "The lab conducts research for sustainable development in developing countries, in partnership with other labs sharing the same vision."}
        </p>
        <div>
          <p className="mb-3 font-medium text-foreground">
            {fr ? "Six grands domaines de l'informatique portes par l'IFRI :" : "Six major fields carried by IFRI:"}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {DOMAINES.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <p>
          {fr
            ? "Le LRSIA est dirige par le Professeur Eugene C. Ezin. Il est signataire de la Declaration de Montreal pour un developpement responsable de l'intelligence artificielle."
            : "LRSIA is led by Professor Eugene C. Ezin and is a signatory of the Montreal Declaration for a Responsible Development of Artificial Intelligence."}
        </p>
      </div>
    </>
  );
}
