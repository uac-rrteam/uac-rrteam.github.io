import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Rendu d'un corps Markdown en HTML stylise.
 * Le style vit ici, une seule fois : les .md restent du contenu pur, sans
 * la moindre classe. C'est ce qui permet a un chercheur d'ecrire un article
 * sans connaitre Tailwind.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-lrsia">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
