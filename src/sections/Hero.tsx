import { useLayoutEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useLang } from "@/i18n/lang";
import { LANGS } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/about/lrsia", key: "nav.lab" },
  { to: "/about/team", key: "nav.team" },
  { to: "/research", key: "nav.research" },
  { to: "/people", key: "nav.people" },
  { to: "/events", key: "nav.events" },
  { to: "/blog", key: "nav.blog" },
] as const;

/**
 * Section d'ouverture plein ecran, disposition reprise de micro1.ai :
 * nav verticale en haut a gauche, logo centre, action a droite, et titre
 * centre au milieu de l'ecran. Sobre : fond sombre du site plus grain, pas
 * d'image tape-a-l'oeil ni de degrade.
 */
export function Hero() {
  const { t, path, lang } = useLang();
  const location = useLocation();
  const rootRef = useRef<HTMLElement>(null);
  const pathWithoutLang = location.pathname.replace(/^\/(fr|en)/, "") || "";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-reveal]", { y: 16, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.06 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-screen flex-col bg-background">
      {/* -------- Nav en surimpression -------- */}
      <header className="relative z-20 px-5 pt-6 sm:px-8">
        <div className="grid grid-cols-2 items-start gap-4 lg:grid-cols-3">
          {/* Gauche : liens empiles */}
          <nav className="hidden flex-col gap-1.5 lg:flex" aria-label="Navigation principale">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={path(item.to)}
                className={({ isActive }) =>
                  cn(
                    "w-fit text-[15px] text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "text-foreground",
                  )
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          {/* Centre : logo */}
          <div className="flex justify-start lg:justify-center">
            <Link to={path("/")} aria-label="Accueil, LRSIA Ratheil Research Team">
              <img
                src="/imgs/logos/lrsia-sans-fond.png"
                alt="Logo du LRSIA"
                width={150}
                height={55}
                className="h-11 w-auto dark:brightness-110"
              />
            </Link>
          </div>

          {/* Droite : theme, langue, action */}
          <div className="flex items-center justify-end gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <div className="hidden items-center gap-1 text-sm sm:flex">
              {LANGS.map((code) => (
                <Link
                  key={code}
                  to={`/${code}${pathWithoutLang}`}
                  className={cn(
                    "rounded-sm px-1.5 py-1 uppercase transition-colors",
                    code === lang ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={code === lang ? "true" : undefined}
                >
                  {code}
                </Link>
              ))}
            </div>
            <Link
              to={path("/people")}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground py-1.5 pl-4 pr-1.5 text-sm font-medium text-background transition-colors"
            >
              {t("hero.cta")}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* -------- Titre centre -------- */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        <h1
          data-reveal
          className="max-w-5xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {t("hero.title")}
        </h1>
        <p data-reveal className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("hero.lead2")}
        </p>
        <p data-reveal className="mt-6 text-sm text-muted-foreground">
          {t("hero.ledBy")}
        </p>
      </div>
    </section>
  );
}
