import { useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/i18n/lang";
import { LANGS } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LiquidGlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { cn } from "@/lib/utils";

/**
 * Pied de page.
 * Structure reprise d'e-freeshop a l'identique : carte arrondie (rounded-3xl)
 * qui "sort" de la page, surface inversee (bg-foreground / text-background),
 * colonnes de liens, ligne du bas avec theme, langue et retour en haut en
 * boutons neomorphiques.
 * En bas, le grand mot LRSIA centre, revele par un effet torche au survol
 * (repris du footer GemmaS).
 */
export function SiteFooter() {
  const { t, path, lang } = useLang();
  const location = useLocation();
  const fr = lang === "fr";
  const pathWithoutLang = location.pathname.replace(/^\/(fr|en)/, "") || "";

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
    <div className="px-3 pb-3 md:px-6 md:pb-6">
      <footer className="relative overflow-hidden rounded-3xl bg-foreground text-background">
        <div className="relative mx-auto max-w-6xl px-6 pt-10 md:px-10 md:pt-12">
          <div className="grid gap-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <img
                src="/imgs/logos/lrsia-sans-fond.png"
                alt="Logo du LRSIA"
                width={130}
                height={48}
                className="h-10 w-auto"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
                {fr
                  ? "Ratheil Research Team, LRSIA, IFRI, Universite d'Abomey-Calavi, Benin."
                  : "Ratheil Research Team, LRSIA, IFRI, University of Abomey-Calavi, Benin."}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <img src="/imgs/logos/logoifri.png" alt="IFRI" width={40} height={40} className="h-8 w-auto opacity-90" />
                <img src="/imgs/logos/logouac.png" alt="UAC" width={40} height={40} className="h-8 w-auto opacity-90" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-2">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-background/50">{col.title}</p>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={path(l.to)}
                          className="inline-flex items-center text-sm text-background/80 transition-all duration-200 hover:translate-x-0.5 hover:text-background"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Ligne du bas : credit, langue, theme, retour en haut. */}
          <div className="mt-8 flex flex-col-reverse items-center justify-between gap-6 border-t border-background/10 pt-6 md:flex-row">
            <p className="text-sm text-background/60">
              &copy; {new Date().getFullYear()} LRSIA, Ratheil Research Team.
            </p>

            <div className="flex items-center gap-3 [&_[role=radiogroup]]:border-background/20 [&_[role=radiogroup]]:bg-transparent [&_button[aria-checked=true]]:bg-background [&_button[aria-checked=true]]:text-foreground [&_button[aria-checked=false]]:text-background/60 [&_button[aria-checked=false]:hover]:text-background">
              <div className="flex items-center gap-1 text-sm">
                {LANGS.map((code) => (
                  <Link
                    key={code}
                    to={`/${code}${pathWithoutLang}`}
                    className={cn(
                      "rounded-sm px-2 py-1 uppercase transition-colors",
                      code === lang ? "text-background" : "text-background/50 hover:text-background",
                    )}
                    aria-current={code === lang ? "true" : undefined}
                  >
                    {code}
                  </Link>
                ))}
              </div>
              <ThemeToggle />
              <BackToTop label={fr ? "Retour en haut" : "Back to top"} />
            </div>
          </div>
        </div>

        {/* Grand mot LRSIA centre, revele par la torche. */}
        <TorchWordmark word="LRSIA" />
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function BackToTop({ label }: { label: string }) {
  // Bouton d'action secondaire : rendu "liquid glass" (le deuxieme bouton
  // fourni). Padding reduit pour un bouton flottant compact.
  return (
    <LiquidGlassButton
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="!rounded-full !px-4 !py-3.5"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
    </LiquidGlassButton>
  );
}

/**
 * Wordmark geant centre avec effet torche.
 * Deux couches du meme mot : la basse reste faiblement visible, la haute
 * (pleine opacite) n'apparait que sous un halo radial qui suit la souris.
 * Rendu en texte, pas en SVG : la marque LRSIA n'a pas de logotype vectoriel
 * pour ce mot, et Outfit en gras fait un lettrage propre.
 */
function TorchWordmark({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };
  const onLeave = () => setPos((p) => ({ ...p, active: false, x: -9999, y: -9999 }));

  const mask = `radial-gradient(circle 300px at ${pos.x}px ${pos.y}px, black 0%, black 30%, transparent 80%)`;
  const base: ReactNode = word;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mt-6 w-full select-none overflow-hidden"
      aria-hidden
    >
      {/* Couche basse : presence constante, tres discrete. */}
      <p className="whitespace-nowrap text-center font-display text-[15vw] font-bold leading-[0.78] tracking-tighter text-background/[0.07]">
        {base}
      </p>
      {/* Couche haute : revelee par la torche. */}
      <p
        className={cn(
          "absolute inset-0 whitespace-nowrap text-center font-display text-[15vw] font-bold leading-[0.78] tracking-tighter text-background transition-opacity duration-300",
          pos.active ? "opacity-100" : "opacity-0",
        )}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {base}
      </p>
    </div>
  );
}
