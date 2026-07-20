import { Link } from "react-router-dom";
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";
import { listArticles } from "@/lib/content";

export function Blog() {
  const { lang, path } = useLang();
  const fr = lang === "fr";
  const articles = listArticles(lang);

  return (
    <>
      <PageIntro
        eyebrow={fr ? "Actualites" : "News"}
        title={fr ? "Actualites de l'equipe" : "Team news"}
        lead={
          fr
            ? "Comptes rendus d'evenements, avancees et vie du laboratoire."
            : "Event reports, research progress and lab life."
        }
      />
      <div className="mx-auto max-w-3xl px-5 pb-24">
        {articles.length === 0 ? (
          <p className="text-muted-foreground">{fr ? "Aucun article pour le moment." : "No articles yet."}</p>
        ) : (
          <ul className="divide-y divide-border">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={path(`/blog/${a.slug}`)} className="group block py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                      {a.title}
                    </h2>
                    {a.date && <time className="shrink-0 text-sm text-muted-foreground">{a.date}</time>}
                  </div>
                  {a.summary && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
