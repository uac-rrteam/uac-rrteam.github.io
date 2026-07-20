import { Link } from "react-router-dom";
import { useLang } from "@/i18n/lang";

/**
 * Pied de page.
 * Structure inspiree de la reference (colonnes de liens + grand lettrage en
 * bas), mais sobre : pas de visuel criard, le grand mot "LRSIA" en filigrane
 * sert de signature, coupe par overflow.
 */
export function SiteFooter() {
  const { t, path, lang } = useLang();
  const fr = lang === "fr";

  const columns = [
    {
      title: fr ? "Naviguer" : "Browse",
      links: [
        { to: "/about/lrsia", label: t("nav.lab") },
        { to: "/about/team", label: t("nav.team") },
        { to: "/research", label: t("nav.research") },
      ],
    },
    {
      title: fr ? "Communaute" : "Community",
      links: [
        { to: "/people", label: t("nav.people") },
        { to: "/events", label: t("nav.events") },
        { to: "/blog", label: t("nav.blog") },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-card">
      <div className="filet-lrsia" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src="/imgs/logos/lrsia-sans-fond.png"
              alt="Logo du LRSIA"
              width={130}
              height={48}
              className="h-10 w-auto dark:brightness-110"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {fr
                ? "Ratheil Research Team, LRSIA, IFRI, Universite d'Abomey-Calavi, Benin."
                : "Ratheil Research Team, LRSIA, IFRI, University of Abomey-Calavi, Benin."}
            </p>
            <div className="mt-5 flex items-center gap-4">
              <img src="/imgs/logos/logoifri.png" alt="IFRI" width={40} height={40} className="h-8 w-auto opacity-80" />
              <img src="/imgs/logos/logouac.png" alt="UAC" width={40} height={40} className="h-8 w-auto opacity-80" />
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={path(l.to)} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-14 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LRSIA, Ratheil Research Team. {fr ? "Tous droits reserves." : "All rights reserved."}
        </p>

        {/* Grand lettrage signature, volontairement coupe par le bas. */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-4 -mb-4 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tighter text-foreground/[0.04]"
        >
          LRSIA
        </p>
      </div>
    </footer>
  );
}
