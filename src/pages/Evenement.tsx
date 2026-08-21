import { Link, Navigate, useParams } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { evenement } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { LienIcone } from "@/components/content/LienIcone";
import "./DetailContenu.css";

export function Evenement() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const item = evenement(lang, slug);
  if (!item) return <Navigate to={path("/events")} replace />;

  return (
    <article className="detail-contenu">
      <Link className="detail-retour" to={path("/events")}>
        {lang === "en" ? "Events" : "Événements"}
      </Link>
      <header className="detail-entete">
        <p className="detail-meta">{item.periode} · {item.lieu}</p>
        <h1>{item.titre}</h1>
        <p className="detail-resume">{item.resume}</p>
      </header>
      {item.image ? <img className="detail-image" src={item.image} alt={item.titre} /> : null}
      <Markdown>{item.corps}</Markdown>
      {item.liens.length ? (
        <p className="detail-liens">
          {item.liens.map((lien) => <LienIcone key={lien.vers} intitule={lien.intitule} vers={lien.vers} />)}
        </p>
      ) : null}
    </article>
  );
}
