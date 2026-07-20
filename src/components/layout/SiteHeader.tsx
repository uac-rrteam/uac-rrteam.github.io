import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/lang";
import { cn } from "@/lib/utils";
import { LANGS } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV = [
  { to: "/about/lrsia", key: "nav.lab" },
  { to: "/about/team", key: "nav.team" },
  { to: "/research", key: "nav.research" },
  { to: "/people", key: "nav.people" },
  { to: "/events", key: "nav.events" },
  { to: "/blog", key: "nav.blog" },
] as const;

export function SiteHeader() {
  const { lang, t, path } = useLang();
  const location = useLocation();

  // Bascule de langue : on garde la page courante, on echange juste le prefixe.
  const pathWithoutLang = location.pathname.replace(/^\/(fr|en)/, "") || "";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Link to={path("/")} className="flex items-center gap-3" aria-label="Accueil, LRSIA Ratheil Research Team">
          <img
            src="/imgs/logos/lrsia-sans-fond.png"
            alt="Logo du LRSIA"
            width={104}
            height={38}
            className="h-8 w-auto dark:brightness-110"
          />
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">Ratheil Research Team</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={path(item.to)}
              className={({ isActive }) =>
                cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          <div className="flex items-center gap-1">
          {LANGS.map((code) => (
            <Link
              key={code}
              to={`/${code}${pathWithoutLang}`}
              className={cn(
                "rounded-sm px-2 py-1 uppercase transition-colors",
                code === lang ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={code === lang ? "true" : undefined}
            >
              {code}
            </Link>
          ))}
          </div>
        </div>
      </div>
      <div className="filet-lrsia" aria-hidden="true" />
    </header>
  );
}
