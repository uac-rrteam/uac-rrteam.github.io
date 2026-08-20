import "./Affirmation.css";

/**
 * Le paragraphe d'affirmation.
 *
 * Capitales, très maigre, immense, et la première ligne poussée vers la droite
 * comme un alinéa inversé. C'est ce qui distingue une déclaration du texte
 * courant, sans avoir besoin ni de guillemets ni d'un encadré.
 *
 * Le texte est passé en un seul morceau : c'est la mise en page qui décide où
 * ça se coupe, jamais des retours forcés qui casseraient sur un autre écran.
 */
export function Affirmation({ children }: { children: string }) {
  return <p className="aff">{children}</p>;
}
