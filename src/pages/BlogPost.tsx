import { Link, useParams } from "react-router-dom";
import { PageIntro } from "@/components/layout/PageIntro";
import { Markdown } from "@/components/content/Markdown";
import { useLang } from "@/i18n/lang";
import { getArticle } from "@/lib/content";

export function BlogPost() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const fr = lang === "fr";
  const article = slug ? getArticle(slug, lang) : undefined;

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-muted-foreground">{fr ? "Article introuvable." : "Article not found."}</p>
        <Link to={path("/blog")} className="mt-4 inline-block text-primary underline underline-offset-2">
          {fr ? "Retour aux actualites" : "Back to news"}
        </Link>
      </div>
    );
  }

  return (
    <article>
      <PageIntro
        eyebrow={article.date}
        title={article.title}
        lead={article.summary || undefined}
      />
      <div className="mx-auto max-w-3xl px-5 pb-24">
        <Markdown>{article.body}</Markdown>
        <Link to={path("/blog")} className="mt-12 inline-block text-sm text-primary underline underline-offset-2">
          {fr ? "Retour aux actualites" : "Back to news"}
        </Link>
      </div>
    </article>
  );
}
