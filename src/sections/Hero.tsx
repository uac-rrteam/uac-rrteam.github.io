import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useLang } from "@/i18n/lang";

/**
 * Section d'ouverture du site.
 * Parti pris : editorial et aligne a gauche, une seule action principale.
 * Aucun degrade, aucun effet decoratif : le titre et la phrase portent tout.
 */
export function Hero() {
  const { t, path } = useLang();
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // gsap.context isole l'animation dans ce sous-arbre et nettoie tout au demontage.
    const ctx = gsap.context(() => {
      // On ne fait PAS bouger la page quand l'utilisateur a demande moins de mouvement.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-reveal]", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28">
      <h1
        data-reveal
        className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
      >
        {t("hero.title")}
      </h1>

      <div data-reveal className="mt-8 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
        <p>{t("hero.lead")}</p>
        <p className="text-foreground">{t("hero.lead2")}</p>
      </div>

      <div data-reveal className="mt-10 flex flex-wrap items-center gap-5">
        <ShinyButton>{t("hero.cta")}</ShinyButton>
        <Link
          to={path("/people")}
          className="border-b border-border pb-0.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          {t("hero.ctaSecondary")}
        </Link>
      </div>

      <div data-reveal className="mt-16 flex items-center gap-4 border-t border-border pt-6">
        <img
          src="/imgs/people/vinasetan-ratheil.png"
          alt="Portrait du Dr Vinasetan Ratheil Houndji"
          width={44}
          height={44}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover"
        />
        <p className="text-sm text-muted-foreground">{t("hero.ledBy")}</p>
      </div>
    </section>
  );
}
