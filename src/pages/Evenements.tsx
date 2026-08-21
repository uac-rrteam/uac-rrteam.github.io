import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { evenementsContenu, pageContenu } from "@/donnees/contenu";
import { Markdown } from "@/components/content/Markdown";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Evenements.css";

/** Un index concis : chaque détail vit dans content/events et sur sa propre page. */
export function Evenements() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const page = pageContenu(lang, "events");
  const liste = evenementsContenu(lang);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const entree = gsap.timeline();
      entree.fromTo(".evt-ligne > span", { yPercent: 122 }, { yPercent: 0, duration: 0.9, ease: "power3.out" });
      entree.fromTo(".evt-chapo", { yPercent: 24, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.25);
      const defaire = lignesQuiRemontent({ blocs: ".evt-leve", racine: zoneRef.current! });
      return () => { defaire(); entree.kill(); };
    },
    { scope: zoneRef, dependencies: [lang] },
  );

  if (!page) return null;

  return (
    <div className="evt" ref={zoneRef} key={lang}>
      <header className="evt-entete">
        <h1 className="evt-titre"><span className="evt-ligne"><span>{page.titre}</span></span></h1>
        <p className="evt-chapo">{page.resume}</p>
        <div className="evt-introduction"><Markdown>{page.corps}</Markdown></div>
      </header>

      <ol className="evt-liste">
        {liste.map((item) => (
          <li key={item.slug} className="evt-entree evt-leve">
            <p className="evt-annee">{item.date.slice(0, 4)}</p>
            <div className="evt-repere">
              <time className="evt-date" dateTime={item.date}>{item.periode}</time>
              <span className="evt-lieu">{item.lieu}</span>
            </div>
            <div>
              <h2><Link to={path(`/events/${item.slug}`)}>{item.titre}</Link></h2>
              <p className="evt-resume">{item.resume}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
