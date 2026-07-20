import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useLang } from "@/i18n/lang";
import { LANGS, type TranslationKey } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

// Sous-menu du laboratoire : chaque entree a un titre et une description
// courte, dans l'esprit du menu "Intelligence" de micro1.
const LAB_ITEMS = [
  { to: "/about/lrsia", titleKey: "nav.lrsia", descKey: "lab.lrsiaDesc" },
  { to: "/about/team", titleKey: "nav.team", descKey: "lab.teamDesc" },
  { to: "/research", titleKey: "nav.research", descKey: "lab.researchDesc" },
] as const;

const TOP_LINKS = [
  { to: "/people", key: "nav.people" },
  { to: "/events", key: "nav.events" },
  { to: "/blog", key: "nav.blog" },
] as const;

/**
 * Section d'ouverture plein ecran, disposition micro1 : nav a gauche, logo
 * centre, action a droite, titre centre. Fond video en boucle avec un grain
 * par-dessus pour un rendu premium. Le texte reste clair, quel que soit le
 * theme du reste du site, car il se pose sur une video sombre.
 */
export function Hero() {
  const { t, path, lang } = useLang();
  const location = useLocation();
  const rootRef = useRef<HTMLElement>(null);
  const pathWithoutLang = location.pathname.replace(/^\/(fr|en)/, "") || "";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-reveal]", { y: 16, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.06 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950 text-white">
      {/* -------- Fond video + grain -------- */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/imgs/hero-poster.jpg"
      >
        {/* Deposer la video ici : public/videos/hero.mp4 (montagnes + oiseaux). */}
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* Voile sombre : lisibilite du texte sur la video, sans couleur ajoutee. */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      {/* Grain fin par-dessus la video. */}
      <div className="hero-grain absolute inset-0 opacity-[0.5]" aria-hidden="true" />

      {/* -------- Nav en surimpression -------- */}
      <header className="relative z-30 px-5 pt-6 sm:px-8">
        <div className="grid grid-cols-2 items-start gap-4 lg:grid-cols-3">
          {/* Gauche : liens empiles, le laboratoire en menu deroulant */}
          <nav className="hidden flex-col items-start gap-1.5 lg:flex" aria-label="Navigation principale">
            <LabDropdown />
            {TOP_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={path(item.to)}
                className={({ isActive }) =>
                  cn(
                    "w-fit text-[15px] text-white/65 transition-colors hover:text-white",
                    isActive && "text-white",
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
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Droite : theme, langue, action */}
          <div className="flex items-center justify-end gap-3">
            <div className="hidden items-center gap-1 text-sm sm:flex">
              {LANGS.map((code) => (
                <Link
                  key={code}
                  to={`/${code}${pathWithoutLang}`}
                  className={cn(
                    "rounded-sm px-1.5 py-1 uppercase transition-colors",
                    code === lang ? "text-white" : "text-white/55 hover:text-white",
                  )}
                  aria-current={code === lang ? "true" : undefined}
                >
                  {code}
                </Link>
              ))}
            </div>
            {/* Bouton forme micro1 : rectangle arrondi (pas un pill), boite fleche
                a droite legerement arrondie. */}
            <Link
              to={path("/research")}
              className="group inline-flex items-center gap-2 rounded-xl bg-white py-1.5 pl-4 pr-1.5 text-sm font-medium text-neutral-900"
            >
              {t("hero.cta")}
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* -------- Titre centre -------- */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        <h1
          data-reveal
          className="max-w-5xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {t("hero.title")}
        </h1>
        <p data-reveal className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {t("hero.lead2")}
        </p>
      </div>

      {/* Theme toggle discret en bas, hors du flux du hero media. */}
      <div className="relative z-20 flex justify-center pb-6 [&_[role=radiogroup]]:border-white/20 [&_[role=radiogroup]]:bg-white/5 [&_button[aria-checked=true]]:bg-white [&_button[aria-checked=true]]:text-neutral-900 [&_button[aria-checked=false]]:text-white/60 [&_button[aria-checked=false]:hover]:text-white">
        <ThemeToggle />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Menu deroulant "Le laboratoire" : ouvre au survol et au focus clavier. */
function LabDropdown() {
  const { t, path } = useLang();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    // Petit delai : evite que le menu se ferme en traversant le vide entre le
    // libelle et le panneau.
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className="flex items-center gap-1 text-[15px] font-medium text-white transition-colors"
        aria-expanded={open}
        onFocus={show}
        onClick={() => setOpen((v) => !v)}
      >
        {t("nav.lab")}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} strokeWidth={2} />
      </button>

      <div
        className={cn(
          "absolute left-0 top-full w-72 origin-top-left pt-3 transition-all duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-1 opacity-0",
        )}
        onFocus={show}
        onBlur={hide}
      >
        <div className="rounded-2xl border border-white/10 bg-neutral-900/95 p-2 backdrop-blur-md">
          {LAB_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={path(item.to)}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
            >
              <p className="text-[15px] font-medium text-white">{t(item.titleKey as TranslationKey)}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-white/55">{t(item.descKey as TranslationKey)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
