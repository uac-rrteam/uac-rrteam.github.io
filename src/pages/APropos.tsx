import { useLang } from "@/i18n/lang";
import { pageContenu } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import join from "../../content/join.md?raw";
import "./DetailContenu.css";

export function APropos() {
  const { lang } = useLang();
  const page = pageContenu(lang, "about");
  if (!page) return null;
  return (
    <article className="detail-contenu detail-page">
      <header className="detail-entete">
        <h1>{page.titre}</h1>
        <p className="detail-resume">{page.resume}</p>
      </header>
      <Markdown>{page.corps}</Markdown>
      <section className="detail-join">
        <Markdown>{join.replace(/^# /, "## ")}</Markdown>
      </section>
    </article>
  );
}
