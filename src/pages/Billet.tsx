import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { billet } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import "./DetailContenu.css";

export function Billet() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const article = billet(lang, slug);
  if (!article) return <Navigate to={path("/blog")} replace />;

  return (
    <article className="detail-contenu billet">
      <Link className="detail-retour" to={path("/blog")}>Blog</Link>
      <header className="detail-entete">
        <p className="detail-meta">{article.date}</p>
        <h1>{article.titre}</h1>
        {article.resume ? <p className="detail-resume">{article.resume}</p> : null}
        {article.auteur ? <p className="detail-infos">{article.auteur}</p> : null}
      </header>
      {article.image ? <img className="detail-image" src={article.image} alt={article.titre} /> : null}
      <Markdown>{article.corps}</Markdown>
    </article>
  );
}
