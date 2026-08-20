import "./GrandNombre.css";

interface Props {
  /** Ce que le nombre compte, en deux lignes au plus. */
  libelle: string;
  valeur: string;
  /** Une précision facultative, posée sous le libellé. */
  note?: string;
}

/**
 * Le grand nombre.
 *
 * Un filet fin sur toute la largeur, le libellé minuscule en capitales sous
 * son extrémité gauche, et le nombre énorme et très léger aligné à droite.
 * C'est la manière exacte dont une équipe de recherche montre ses chiffres :
 * le chiffre est le héros, la phrase se contente de le nommer.
 *
 * Aucun nombre ici n'est décoratif, tous sont sourçables.
 */
export function GrandNombre({ libelle, valeur, note }: Props) {
  return (
    <figure className="gn">
      <div className="gn-filet" />
      <div className="gn-corps">
        <figcaption className="gn-libelle">
          {libelle}
          {note ? <span className="gn-note">{note}</span> : null}
        </figcaption>
        <p className="gn-valeur">{valeur}</p>
      </div>
    </figure>
  );
}
