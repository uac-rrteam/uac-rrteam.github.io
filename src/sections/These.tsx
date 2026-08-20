import { Affirmation } from "@/components/likova/Affirmation";
import "./These.css";

/**
 * La thèse de l'équipe, seule sur un écran.
 *
 * Un site de recherche doit répondre en trente secondes : ce paragraphe est
 * la réponse, et il la donne mieux seul. Un dessin derrière lui, si juste
 * soit-il, passait sous les lignes et les rendait plus difficiles à lire.
 */
export function These({ texte, signature }: { texte: string; signature: string }) {
  return (
    <section id="these" className="thes">
      <div className="thes-corps">
        <Affirmation>{texte}</Affirmation>
        <p className="thes-signature">{signature}</p>
      </div>
    </section>
  );
}
