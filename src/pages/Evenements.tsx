import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";
import { evenementsContenu, pageContenu } from "@/donnees/contenu";
import { actualites } from "@/donnees/actualites";
import { Markdown } from "@/components/content/Markdown";
import { lignesQuiRemontent } from "@/animations/lignesQuiRemontent";
import "./Evenements.css";

/** Un index concis : chaque détail vit dans content/events et sur sa propre page. */
export function Evenements() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const { lang, path } = useLang();
  const page = pageContenu(lang, "events");
  const evenements = evenementsContenu(lang);
  const datesEvenements = new Set(evenements.map((item) => item.date));
  const nouvelles = actualites(lang).filter((item) => !datesEvenements.has(item.date));
  const liste = [
    ...evenements.map((item) => ({
      cle: `event-${item.slug}`,
      date: item.date,
      periode: item.periode,
      lieu: item.lieu,
      titre: item.titre,
      resume: item.resume,
      vers: path(`/events/${item.slug}`),
      type: lang === "en" ? "Event" : "Événement",
    })),
    ...nouvelles.map((item) => ({
      cle: `news-${item.cle}`,
      date: item.date,
      periode: item.quand,
      lieu: lang === "en" ? "Team news" : "Actualité de l'équipe",
      titre: item.titre,
      resume: item.dit,
      vers: item.liens?.[0]?.vers,
      type: lang === "en" ? "News" : "Actualité",
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

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
          <li key={item.cle} className="evt-entree evt-leve">
            <p className="evt-annee">{item.date.slice(0, 4)}</p>
            <div className="evt-repere">
              <time className="evt-date" dateTime={item.date}>{item.periode}</time>
              <span className="evt-lieu">{item.lieu}</span>
              <span className="evt-type">{item.type}</span>
            </div>
            <div>
              <h2>
                {item.vers?.startsWith("/") ? (
                  <Link to={item.vers}>{item.titre}</Link>
                ) : item.vers ? (
                  <a href={item.vers} target="_blank" rel="noreferrer">{item.titre}</a>
                ) : item.titre}
              </h2>
              <p className="evt-resume">{item.resume}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
