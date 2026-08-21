import { Link } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { billets, pageContenu } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import "./Blog.css";

export function Blog() {
  const { lang, path } = useLang();
  const page = pageContenu(lang, "blog");
  const articles = billets(lang);

  return (
    <div className="blg">
      <header className="blg-entete">
        <p className="blg-repere">Ratheil Research Team</p>
        <h1>{page?.titre ?? "Blog"}</h1>
        <p>{page?.resume}</p>
      </header>

      {articles.length ? (
        <ol className="blg-liste">
          {articles.map((article) => (
            <li key={article.slug}>
              <p className="blg-date">{article.date}</p>
              <div>
                <h2><Link to={path(`/blog/${article.slug}`)}>{article.titre}</Link></h2>
                {article.resume ? <p>{article.resume}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <section className="blg-vide" aria-live="polite">
          <Markdown>{page?.corps ?? ""}</Markdown>
        </section>
      )}
    </div>
  );
}
