import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { projet } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { LienIcone } from "@/components/content/LienIcone";
import "./DetailContenu.css";

export function Projet() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const item = projet(lang, slug);
  if (!item) return <Navigate to={path("/research")} replace />;

  return (
    <article className="detail-contenu">
      <Link className="detail-retour" to={path("/research")}>
        {lang === "en" ? "Research" : "Recherche"}
      </Link>
      <header className="detail-entete">
        <p className="detail-meta">{item.periode}</p>
        <h1>{item.titre}</h1>
        <p className="detail-resume">{item.resume}</p>
        {item.role || item.financement ? (
          <p className="detail-infos">{[item.role, item.financement].filter(Boolean).join(" · ")}</p>
        ) : null}
      </header>
      {item.collaborateurs.length ? (
        <section className="detail-collaborateurs">
          <h2>{lang === "en" ? "Collaborators and partners" : "Collaborateurs et partenaires"}</h2>
          <ul>
            {item.collaborateurs.map((nom) => <li key={nom}>{nom}</li>)}
          </ul>
        </section>
      ) : null}
      <Markdown>{item.corps}</Markdown>
      {item.liens.length ? (
        <p className="detail-liens">
          {item.liens.map((lien) => <LienIcone key={lien.vers} intitule={lien.intitule} vers={lien.vers} />)}
        </p>
      ) : null}
    </article>
  );
}
