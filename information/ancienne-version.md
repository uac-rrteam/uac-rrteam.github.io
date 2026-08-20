# Ancienne version du site, archive de reference

Etat du code au 2026-08-19, avant la reprise complete sur la direction
artistique (voir `DIRECTION-ARTISTIQUE.md`).

Ce fichier n'est pas du code vivant. Il sert a retrouver un texte, une donnee
ou une tournure de l'ancienne interface quand on en a besoin. Les contenus de
fond, equipe, laboratoire et evenements, restent dans `assets/docs/` et
`information/`, qui font foi.


---

## `src/App.tsx`

```tsx
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { LangProvider } from "@/i18n/lang";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { DEFAULT_LANG } from "@/i18n/dictionary";
import { Home } from "@/pages/Home";
import { Lrsia } from "@/pages/about/Lrsia";
import { Team } from "@/pages/about/Team";
import { Research } from "@/pages/Research";
import { People } from "@/pages/People";
import { Events } from "@/pages/Events";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";

/** Coquille commune a toutes les pages : la langue vient du prefixe d'URL. */
function LangLayout() {
  const { pathname } = useLocation();
  // L'accueil porte sa propre nav plein ecran (disposition micro1). Les pages
  // internes utilisent la barre standard.
  const isHome = /^\/(fr|en)\/?$/.test(pathname);

  return (
    <LangProvider>
      <SmoothScroll>
        <ScrollToTop />
        {!isHome && <SiteHeader />}
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <CookieBanner />
      </SmoothScroll>
    </LangProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<Home />} />
        <Route path="about/lrsia" element={<Lrsia />} />
        <Route path="about/team" element={<Team />} />
        <Route path="research" element={<Research />} />
        <Route path="people" element={<People />} />
        <Route path="events" element={<Events />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Route>
      {/* Toute URL sans prefixe de langue part sur le francais. */}
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
    </Routes>
  );
}

```

---

## `src/index.css`

```css
@import "tailwindcss";

/* Dark mode pilote par la classe .dark sur <html>, pas par prefers-color-scheme.
   Sans cette ligne, Tailwind v4 ignore le choix de l'utilisateur. */
@custom-variant dark (&:where(.dark, .dark *));

/* ==========================================================================
   PALETTE, direction artistique de la Ratheil Research Team
   Voir DIRECTION-ARTISTIQUE.md, section 7.

   Elle sort du ratel et de rien d'autre : le noir de son corps donne le fond
   sombre, le gris os de son manteau donne le fond clair, et le miel qu'il
   chasse donne l'accent. Mellivora veut dire mangeur de miel.

   Le fond sombre est un bleu tres profond, pas un noir neutre : c'est ce qui
   permet d'y ramener toutes les photographies par etalonnage, et c'est sur un
   bleu nuit que le miel ressort, jamais sur un gris.

   Les logos LRSIA, IFRI et UAC restent en signature institutionnelle mais ne
   dictent plus la palette. Le socle herite d'e-freeshop est remplace.

   Aucune couleur en dur ailleurs que dans ce bloc.
   ========================================================================== */

@font-face {
  font-family: "Wura mi";
  src: url("/fonts/wuramibygemmas/WuraMiByGemmaS-ExtraLight.woff2") format("woff2");
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: "Wura mi";
  src: url("/fonts/wuramibygemmas/WuraMiByGemmaS-Light.woff2") format("woff2");
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: "Wura mi";
  src: url("/fonts/wuramibygemmas/WuraMiByGemmaS.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Wura mi";
  src: url("/fonts/wuramibygemmas/WuraMiByGemmaS-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

:root {
  /* Thème clair : le gris os du manteau. */
  --background: 90 4% 91%;
  --foreground: 225 33% 7%;

  --card: 60 8% 95%;
  --card-foreground: 225 33% 7%;

  --primary: 225 33% 7%;
  --primary-foreground: 90 4% 91%;

  --secondary: 60 8% 95%;
  --secondary-foreground: 225 33% 7%;

  --muted: 60 8% 95%;
  --muted-foreground: 225 12% 38%;

  /* Le miel ne porte JAMAIS de texte sur fond clair : il y tombe a 1,8:1.
     C'est --miel-encre qui prend le relais, a 5,6:1. */
  --accent: 35 80% 57%;
  --accent-foreground: 225 33% 7%;
  --miel: 35 80% 57%;
  --miel-encre: 33 79% 30%;

  /* Etats du vocabulaire visuel. Un etat n'est jamais signale par l'accent :
     le miel dit la marque, ces couleurs disent la resolution. */
  --assigne: 160 36% 48%;
  --elague: 3 51% 50%;

  --border: 90 4% 80%;
  --input: 90 4% 80%;
  --ring: 35 80% 57%;
}

.dark {
  /* Thème sombre : le noir bleute du corps. */
  --background: 225 47% 6%;
  --foreground: 220 7% 92%;

  --card: 228 42% 12%;
  --card-foreground: 220 7% 92%;

  --primary: 220 7% 92%;
  --primary-foreground: 225 47% 6%;

  --secondary: 228 42% 12%;
  --secondary-foreground: 220 7% 92%;

  --muted: 228 42% 12%;
  --muted-foreground: 220 7% 62%;

  /* Sur fond sombre le miel donne 8,5:1 : il peut porter du texte. */
  --accent: 35 80% 57%;
  --accent-foreground: 225 47% 6%;
  --miel: 35 80% 57%;
  --miel-encre: 35 80% 57%;

  --assigne: 160 36% 48%;
  --elague: 4 65% 65%;

  --border: 228 36% 18%;
  --input: 228 36% 18%;
  --ring: 35 80% 57%;
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-miel: hsl(var(--miel));
  --color-miel-encre: hsl(var(--miel-encre));
  --color-assigne: hsl(var(--assigne));
  --color-elague: hsl(var(--elague));

  --font-sans: "Wura mi", "Segoe UI", system-ui, sans-serif;
  --font-display: "Wura mi", "Segoe UI", system-ui, sans-serif;
  --font-lecture: "Newsreader", Georgia, "Times New Roman", serif;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Grain de fond en mode sombre, repris d'e-freeshop.
   Pose SOUS le contenu (z-index -1) : les surfaces opaques restent nettes. */
.dark body {
  isolation: isolate;
}
.dark body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 0.16 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 220px 220px;
}

/* Scrollbar masquee sur tout le site : le defilement reste actif, la barre
   n'est plus visible (demande Cephas). */
html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge ancien */
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none; /* Chromium, Safari */
}

/* Le filet tricolore du logo : trois traits bleu/rouge/bleu.
   Seul endroit ou le rouge et le bleu se touchent, comme dans le logo. */
.filet-lrsia {
  height: 3px;
  width: 100%;
  background: linear-gradient(
    to bottom,
    hsl(var(--lrsia-blue)) 0 1px,
    transparent 1px 2px,
    hsl(var(--lrsia-red)) 2px 3px
  );
}

/* ==========================================================================
   prose-lrsia, mise en forme du contenu Markdown des articles.
   Un seul endroit ou le style du contenu est defini : les .md restent nus.
   ========================================================================== */
.prose-lrsia {
  max-width: 44rem;
  line-height: 1.75;
  color: hsl(var(--foreground));
}
.prose-lrsia > * + * {
  margin-top: 1.15em;
}
.prose-lrsia h2 {
  margin-top: 2em;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.prose-lrsia h3 {
  margin-top: 1.6em;
  font-size: 1.2rem;
  font-weight: 600;
}
.prose-lrsia a {
  color: hsl(var(--primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}
.prose-lrsia ul,
.prose-lrsia ol {
  padding-left: 1.4em;
}
.prose-lrsia ul {
  list-style: disc;
}
.prose-lrsia ol {
  list-style: decimal;
}
.prose-lrsia li + li {
  margin-top: 0.4em;
}
.prose-lrsia blockquote {
  border-left: 2px solid hsl(var(--primary));
  padding-left: 1em;
  color: hsl(var(--muted-foreground));
  font-style: italic;
}
.prose-lrsia code {
  background: hsl(var(--muted));
  padding: 0.15em 0.4em;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}
.prose-lrsia img {
  border-radius: var(--radius-lg);
  border: 1px solid hsl(var(--border));
}

/* Grain fin pose PAR-DESSUS la video du hero. Contrairement au grain de fond
   (.dark body::before), celui-ci s'applique sur un calque plein cadre au-dessus
   du media : d'ou une classe dediee, sans dependance au theme. */
.hero-grain {
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: 200px 200px;
  mix-blend-mode: overlay;
}

/* Bascule instantanee : coupe TOUTES les transitions le temps d'un frame
   (navigateurs sans View Transitions, ou preference reduced-motion). */
html.theme-instant,
html.theme-instant *,
html.theme-instant *::before,
html.theme-instant *::after {
  transition: none !important;
  animation-duration: 0s !important;
}

/* View Transitions : revelation circulaire au switch de theme. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2;
}

/* ==========================================================================
   Animations des illustrations (fiole, reseau de neurones).
   Legeres (transform/opacity uniquement). Coupees par prefers-reduced-motion
   via la regle globale plus bas.
   ========================================================================== */
@keyframes lrsia-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes lrsia-bubble {
  0% { transform: translateY(2px); opacity: 0; }
  25% { opacity: 1; }
  100% { transform: translateY(-12px); opacity: 0; }
}
@keyframes lrsia-node {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}
@keyframes lrsia-flow {
  to { stroke-dashoffset: -14; }
}

.anim-float { animation: lrsia-float 5s ease-in-out infinite; }
.anim-bubble { animation: lrsia-bubble 2.4s ease-in-out infinite; }
.anim-node { animation: lrsia-node 2.4s ease-in-out infinite; }
.anim-flow {
  stroke-dasharray: 4 4;
  animation: lrsia-flow 1.1s linear infinite;
}

/* Respect systematique de la preference d'accessibilite */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

```

---

## `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { EcranDeChargement } from "@/components/chargement/EcranDeChargement";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* Monte au-dessus du routeur : l'ecran ne doit apparaitre qu'au premier
          chargement, jamais entre deux pages. */}
      <EcranDeChargement />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

```

---

## `src/components/chargement/EcranDeChargement.css`

```css
/* Ecran de chargement — Ratheil Research Team */

.chg {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(24px, 5vw, 64px);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  will-change: transform;
}

/* Le texte que seul un lecteur d'ecran entend. Le compteur visible est
   marque aria-hidden : il dirait le nombre trois fois par seconde. */
.chg-invisible {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Le domaine : toutes les valeurs encore possibles, alignees. */
/* Le domaine tient toute la largeur : c'est l'ensemble des valeurs
   possibles, pas un temoin de progression relegue dans un coin. */
.chg-domaine {
  display: flex;
  align-items: flex-end;
  gap: clamp(6px, 1.2vw, 14px);
  width: 100%;
  height: clamp(34px, 7vw, 82px);
  margin-top: clamp(18px, 3vw, 34px);
}

.chg-cellule {
  flex: 1;
  height: 100%;
  transform-origin: bottom;
  background: hsl(var(--miel));
  transition:
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Une valeur retiree du domaine ne disparait pas : elle s'affaisse et laisse
   sa trace. C'est ce qui donne a la reduction son sens de lecture. */
.chg-cellule[data-eteinte] {
  transform: scaleY(0.09);
  opacity: 0.24;
}

.chg-compteur {
  display: flex;
  justify-content: flex-end;
  line-height: 0.78;
}

.chg-nombre {
  font-family: var(--font-display), sans-serif;
  font-weight: 200;
  font-size: clamp(64px, 17vw, 220px);
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 700px) {
  .chg-domaine {
    height: 56px;
  }
}

/* Sans mouvement, l'ecran reste lisible et informatif : il montre l'etat du
   domaine, il ne joue simplement plus la resolution. */
@media (prefers-reduced-motion: reduce) {
  .chg-cellule {
    transition: none;
  }
}

```

---

## `src/components/chargement/EcranDeChargement.tsx`

```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useProgressionReelle } from "@/hooks/useProgressionReelle";
import "./EcranDeChargement.css";

/** Le domaine de depart. Quatorze valeurs possibles, quatorze pas au compteur. */
const CELLULES = 14;

/* Les durees et les courbes viennent du lot Codrops d'origine : 0,7 s en
   power3.inOut pour effacer le compteur, 1,4 s en power4 pour la sortie. On
   ne les invente pas, c'est ce qui donne au depart son autorite. */
const EFFACEMENT = 0.7;
const SORTIE = 1.4;

/**
 * Ecran de chargement.
 *
 * Le vocabulaire vient de la programmation par contraintes : au depart toutes
 * les valeurs sont encore possibles, et resoudre consiste a en eteindre. Le
 * chargement d'une page, c'est exactement ca. Les cellules ne decorent donc
 * pas le compteur : elles sont le compteur, montre autrement.
 *
 * Le nombre affiche est arrondi au quatorzieme le plus proche. Il avance par
 * crans, comme le `steps(14)` de Codrops, sans jamais annoncer un chiffre qui
 * ne corresponde a rien de charge.
 */
export function EcranDeChargement({ onFini }: { onFini?: () => void }) {
  const { avancee, pret } = useProgressionReelle();

  // Une ref, pas un etat : mettre a jour un etat dont l'effet depend le
  // relance, et son nettoyage tue la timeline GSAP a la frame suivante.
  const parti = useRef(false);

  const panneauRef = useRef<HTMLDivElement>(null);
  const compteurRef = useRef<HTMLDivElement>(null);
  const domaineRef = useRef<HTMLDivElement>(null);

  // Arrondi au cran : le nombre monte par paliers au lieu de defiler.
  const cran = Math.round(avancee * CELLULES);
  const affiche = Math.round((cran / CELLULES) * 100);

  useEffect(() => {
    if (!pret || parti.current) return;
    parti.current = true;

    const panneau = panneauRef.current;
    if (!panneau) return;

    const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sobre) {
      panneau.style.display = "none";
      onFini?.();
      return;
    }

    const restantes = domaineRef.current?.querySelectorAll(".chg-cellule") ?? [];

    const scene = gsap.timeline({ onComplete: () => onFini?.() });

    scene
      .addLabel("resolution", 0)
      // Les cellules encore allumees s'eteignent de proche en proche : la
      // propagation finale, celle qui ne laisse qu'une valeur.
      .to(restantes, {
        duration: 0.5,
        ease: "power3.inOut",
        scaleY: 0,
        opacity: 0,
        stagger: { each: 0.03, from: "end" },
      }, "resolution")
      .to(compteurRef.current, {
        duration: EFFACEMENT,
        ease: "power3.inOut",
        opacity: 0,
      }, "resolution+=0.2")
      // Le panneau se retire vers le haut. Pas de fondu : une page qui se
      // decouvre vaut mieux qu'une page qui apparait.
      .to(panneau, {
        duration: SORTIE,
        ease: "power4.inOut",
        yPercent: -100,
      }, "resolution+=0.45")
      .set(panneau, { display: "none" });

    return () => {
      scene.kill();
    };
  }, [pret, onFini]);

  return (
    <div ref={panneauRef} className="chg" role="status" aria-live="polite">
      <p className="chg-invisible">Chargement, {affiche} pour cent</p>

      <div ref={compteurRef} className="chg-compteur" aria-hidden="true">
        <span className="chg-nombre">{String(affiche).padStart(3, "0")}</span>
      </div>
      <div ref={domaineRef} className="chg-domaine" aria-hidden="true">
        {Array.from({ length: CELLULES }, (_, rang) => (
          <span
            key={rang}
            className="chg-cellule"
            data-eteinte={rang < cran ? "" : undefined}
          />
        ))}
      </div>

    </div>
  );
}

```

---

## `src/components/content/Markdown.tsx`

```tsx
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

```

---

## `src/components/content/RevealText.tsx`

```tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Un mot du texte revele. `color` teinte le mot avec la charte du logo :
 * "blue" = bleu LRSIA, "red" = rouge LRSIA. Sinon il prend la couleur du texte.
 */
export interface Token {
  text: string;
  color?: "blue" | "red";
}

/**
 * Texte grand format qui se revele au scroll : chaque mot part faible (donc
 * gris) et monte en pleine opacite au fil du defilement, en cascade. Comme la
 * couleur finale est deja posee (blanc/noir, ou bleu/rouge pour les mots de
 * marque), l'opacite fait tout : faible = gris, pleine = teinte vive.
 *
 * C'est l'effet de la reference : le texte "s'allume" a mesure qu'on descend.
 * Respecte prefers-reduced-motion (tout est affiche, sans animation).
 */
export function RevealText({ tokens, className }: { tokens: Token[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          // Plage de scroll large (top 82% -> bottom 12%) : la revelation
          // s'etale sur presque toute la traversee de la section, donc lente.
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 12%",
            scrub: 0.8,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [tokens]);

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <span
          key={i}
          data-word
          className={cn(t.color === "blue" && "text-primary", t.color === "red" && "text-accent")}
        >
          {t.text}
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

```

---

## `src/components/layout/CookieBanner.tsx`

```tsx
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/lang";

const STORAGE_KEY = "lrsia-cookie-ok";

/**
 * Bandeau cookies, presentation reprise de micro1 : pilule claire centree en
 * bas de l'ecran, texte a gauche, bouton Accepter a droite. Une fois accepte,
 * le choix est memorise et le bandeau ne revient plus.
 *
 * Honnetete du contenu : ce site n'utilise que le stockage local du navigateur
 * pour retenir le theme et la langue. Le texte le dit tel quel, sans pretendre
 * a un pistage qui n'existe pas.
 */
export function CookieBanner() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const [visible, setVisible] = useState(false);

  // Monté cote client seulement : on lit le choix apres le premier rendu pour
  // eviter d'afficher puis cacher le bandeau (flash) chez qui a deja accepte.
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/95 py-2 pl-5 pr-2 text-sm shadow-lg backdrop-blur-md">
        <p className="text-muted-foreground">
          {fr
            ? "Ce site utilise le stockage local pour retenir vos preferences (theme, langue)."
            : "This site uses local storage to remember your preferences (theme, language)."}
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {fr ? "Accepter" : "Accept"}
        </button>
      </div>
    </div>
  );
}

```

---

## `src/components/layout/HeroVeil.tsx`

```tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Voile "brume qui monte", repris du front SOVREAN (Landing.tsx) et adapte a
 * nos tokens HSL. Il appartient a la SECTION QUI MONTE : accroche au-dessus
 * d'elle (`bottom: calc(100% - 4px)`), il deborde vers le haut et balaie le
 * hero du bas vers le haut au fil du defilement.
 *
 * Deux bandes qui ne forment qu'un voile a l'oeil, mais separees pour la perf :
 * - `brume` : un aplat degrade (couleur de la page) dont l'opacite monte au
 *   scrub, puis qui se DEPLOIE tout seul (scaleY) une fois un seuil franchi,
 *   jusqu'a recouvrir le hero.
 * - `flou` : un `backdrop-filter` (le bord flou du voile) qui NE s'etire pas
 *   (le flou coute cher, proportionnel a sa surface). On le coupe des que le
 *   recouvrement est fini, car il resterait actif et couteux sous l'aplat.
 *
 * A placer en tete du bloc de contenu `relative z-10`, le hero etant `sticky`
 * en dessous (voir Home).
 */
export function HeroVeil({ triggerId = "hero" }: { triggerId?: string }) {
  const brume = useRef<HTMLDivElement>(null);
  const flou = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = brume.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setFlou = (valeur: string) => {
      const bande = flou.current;
      if (!bande) return;
      bande.style.setProperty("backdrop-filter", valeur);
      bande.style.setProperty("-webkit-backdrop-filter", valeur);
    };

    const ctx = gsap.context(() => {
      // 1) Les deux bandes montent ensemble en opacite (au scrub), avant le
      //    deploiement, pour que celui-ci n'etire pas une brume transparente.
      gsap.fromTo(
        [el, flou.current].filter(Boolean),
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: `#${triggerId}`, start: "top top", end: "16% top", scrub: true },
        },
      );

      // 2) Le deploiement, joue une fois au passage du seuil (autonome).
      const deploiement = gsap.to(el, {
        scaleY: 8,
        duration: 1.15,
        ease: "power2.inOut",
        paused: true,
        onComplete: () => setFlou("none"),
      });

      ScrollTrigger.create({
        trigger: `#${triggerId}`,
        start: "30% top",
        onEnter: () => deploiement.play(),
        onLeaveBack: () => {
          setFlou("");
          deploiement.reverse();
        },
      });
    });

    return () => ctx.revert();
  }, [triggerId]);

  return (
    <>
      {/* Bande floutee : le bord du voile. Hauteur fixe, ne s'etire jamais. */}
      <div
        ref={flou}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-20 h-[19vh] backdrop-blur-[6px]"
        style={{
          bottom: "calc(100% - 4px)",
          opacity: 0,
          WebkitMaskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
          maskImage: "linear-gradient(to top, #000 30%, transparent 100%)",
        }}
      />
      {/* Brume : l'aplat degrade qui se deploie pour recouvrir le hero. */}
      <div
        ref={brume}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-20 h-[19vh]"
        style={{ bottom: "calc(100% - 4px)", opacity: 0, transformOrigin: "bottom center" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top,
              hsl(var(--background)) 0%,
              hsl(var(--background) / 0.92) 26%,
              hsl(var(--background) / 0.6) 55%,
              hsl(var(--background) / 0.22) 80%,
              transparent 100%)`,
          }}
        />
      </div>
    </>
  );
}

```

---

## `src/components/layout/PageIntro.tsx`

```tsx
import type { ReactNode } from "react";

/** En-tete commun des pages internes : titre et chapeau, sans surtitre. */
export function PageIntro({ title, lead }: { title: string; lead?: ReactNode }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:pt-20">
      <h1 className="max-w-3xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h1>
      {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </header>
  );
}

```

---

## `src/components/layout/ScrollToTop.tsx`

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Remet le scroll en haut a chaque changement de page (hors ancres). */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

```

---

## `src/components/layout/SiteFooter.tsx`

```tsx
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/i18n/lang";
import { LANGS } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlassSurface } from "@/components/ui/glass-surface";
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
    <div className="px-2 pb-2">
      <footer className="relative overflow-hidden rounded-[1.25rem] bg-foreground text-background">
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
                <img src="/imgs/logos/logoifri.png" alt="IFRI" width={68} height={68} className="h-16 w-auto opacity-90" />
                <img src="/imgs/logos/logouac.png" alt="UAC" width={68} height={68} className="h-16 w-auto opacity-90" />
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

            <div className="flex items-center gap-3 [&_[role=radiogroup]]:border-transparent [&_[role=radiogroup]]:bg-transparent [&_button[aria-checked=true]]:bg-background [&_button[aria-checked=true]]:text-foreground [&_button[aria-checked=false]]:text-background/60 [&_button[aria-checked=false]:hover]:text-background">
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
              <GlassSurface width={118} height={40} borderRadius={20} backgroundOpacity={0.1} className="text-background">
                <ThemeToggle />
              </GlassSurface>
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
  // Bouton en surface de verre (GlassSurface). Le bouton porte le clic, la
  // GlassSurface porte l'apparence : elle refracte le contenu du footer.
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="inline-flex transition-transform active:scale-95"
    >
      <GlassSurface width={46} height={46} borderRadius={23} backgroundOpacity={0.12} className="text-background">
        <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
      </GlassSurface>
    </button>
  );
}

/**
 * Wordmark geant avec effet torche. Grand mais proportions NATURELLES (on
 * n'etire pas les lettres). La couche haute est revelee par un halo radial qui
 * suit la souris. Le halo est pose DIRECTEMENT sur le DOM via une ref, sans
 * passer par un state : ainsi le footer ne se re-rend pas a chaque mouvement de
 * souris, ce qui evite le lag ressenti.
 */
function TorchWordmark({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLParagraphElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    const top = topRef.current;
    if (!rect || !top) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mask = `radial-gradient(circle 320px at ${x}px ${y}px, black 0%, black 32%, transparent 80%)`;
    top.style.opacity = "1";
    top.style.webkitMaskImage = mask;
    top.style.maskImage = mask;
  };
  const onLeave = () => {
    if (topRef.current) topRef.current.style.opacity = "0";
  };

  const base = "text-center font-display text-[12vw] font-bold leading-none tracking-[-0.04em]";

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative mt-6 w-full select-none overflow-hidden" aria-hidden>
      <p className={cn(base, "text-background/[0.06]")}>{word}</p>
      <p
        ref={topRef}
        className={cn(base, "absolute inset-0 text-background opacity-0 transition-opacity duration-300")}
        style={{ WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
      >
        {word}
      </p>
    </div>
  );
}

```

---

## `src/components/layout/SiteHeader.tsx`

```tsx
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

```

---

## `src/components/ui/apple-tahoe-liquid-glass-button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Bouton "liquid glass" (Apple Tahoe), bouton d'action SECONDAIRE du site.
// Adapte du composant fourni : "use client" retire (inutile sous Vite), et la
// demo framer-motion ecartee. Le viewport WebGL de refraction n'est pas monte
// ici : sur une surface pleine (footer), il n'aurait aucune image a refracter.
// Utilise seul, LiquidGlassButton retombe sur son rendu "svg" et garde son
// biseau de verre (specular + ombres), ce qui suffit pour un bouton isole.

// --- Types & Interfaces ---
export interface LiquidGlassViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  bgImage: string;
  fallbackMode?: "webgl" | "blur";
  children?: React.ReactNode;
}

export interface LiquidGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

interface LiquidGlassContextType {
  registerButton: (id: string, element: HTMLButtonElement) => void;
  unregisterButton: (id: string) => void;
  mode: "svg" | "webgl" | "blur";
}

// --- Context Configuration ---
const LiquidGlassContext = React.createContext<LiquidGlassContextType | null>(null);

const BINS = 24;
const DISP_SCALE = 35;
const LIGHT_SOURCE = { x: 0.5, y: 0.0 }; // Fixed scene light source (top-center)

// --- Viewport Wrapper Component ---
export const LiquidGlassViewport = React.forwardRef<HTMLDivElement, LiquidGlassViewportProps>(
  ({ bgImage, fallbackMode = "webgl", className, children, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const feImage0Ref = React.useRef<SVGFEImageElement>(null);
    const feImage1Ref = React.useRef<SVGFEImageElement>(null);

    const filterId0 = React.useId().replace(/:/g, "-") + "0";
    const filterId1 = React.useId().replace(/:/g, "-") + "1";

    const [mode, setMode] = React.useState<"svg" | "webgl" | "blur">("svg");
    const buttonsRef = React.useRef<Record<string, HTMLButtonElement>>({});

    const activeFilter = React.useRef(0);
    const lastKeyRef = React.useRef("");
    const lastMapRef = React.useRef<{
      width: number;
      height: number;
      data: Uint8ClampedArray;
      url: string;
    } | null>(null);

    // WebGL context refs
    const glRef = React.useRef<WebGLRenderingContext | null>(null);
    const glProgRef = React.useRef<WebGLProgram | null>(null);
    const glTexRef = React.useRef<{ bg?: WebGLTexture; disp?: WebGLTexture }>({});
    const glLocRef = React.useRef<Record<string, WebGLUniformLocation | null>>({});
    const glReadyRef = React.useRef(false);

    // Dynamic Displacement Generator
    const generateSmoothConvexMap = React.useCallback((width: number, height: number, renderMode: string) => {
      const w = Math.max(1, Math.round(width) || 0);
      const h = Math.max(1, Math.round(height) || 0);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const power = 3.5;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const nx = (x / w) * 2 - 1;
          const ny = (y / h) * 2 - 1;
          const d = Math.pow(Math.abs(nx), power) + Math.pow(Math.abs(ny), power);

          let r = 128,
            g = 128,
            a = 0;

          if (d <= 1) {
            const curveMagnitude = Math.sin(Math.pow(d, 0.8) * Math.PI);
            const dx = -nx * curveMagnitude;
            const dy = -ny * curveMagnitude;

            r = Math.round(128 + dx * 127);
            g = Math.round(128 + dy * 127);
            a = 255;
          }

          const index = (y * w + x) * 4;
          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = 128;
          data[index + 3] = renderMode === "webgl" ? a : 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const url = canvas.toDataURL("image/png");
      lastMapRef.current = { width: w, height: h, data, url };
      return url;
    }, []);

    const analyzeRefraction = React.useCallback((lightAz: number) => {
      if (!lastMapRef.current) return null;
      const { width, height, data } = lastMapRef.current;
      const profile = new Array(BINS).fill(0);
      const counts = new Array(BINS).fill(0);
      let sumX = 0,
        sumY = 0,
        sumMag = 0;

      const step = 2;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const i = (y * width + x) * 4;
          const bx = (data[i] - 128) / 127;
          const by = (data[i + 1] - 128) / 127;
          const mag = Math.hypot(bx, by);
          if (mag < 0.02) continue;

          const ang = Math.atan2(by, bx);
          const facing = Math.max(0, Math.cos(ang - lightAz));
          const bright = mag * (0.35 + 0.65 * facing);

          sumX += Math.cos(ang) * bright;
          sumY += Math.sin(ang) * bright;
          sumMag += bright;

          let bin = Math.floor(((ang + Math.PI) / (2 * Math.PI)) * BINS) % BINS;
          if (bin < 0) bin += BINS;
          profile[bin] += bright;
          counts[bin]++;
        }
      }

      let maxP = 0;
      for (let b = 0; b < BINS; b++) {
        if (counts[b]) profile[b] /= counts[b];
        if (profile[b] > maxP) maxP = profile[b];
      }
      if (maxP > 0) {
        for (let b = 0; b < BINS; b++) profile[b] /= maxP;
      }

      const domAngle = Math.atan2(sumY, sumX);
      const samples = Math.max(1, (width * height) / (step * step));
      const magnitude = Math.min(1, (sumMag / samples) * 6);

      return { profile, domAngle, magnitude };
    }, []);

    const buildConicGradient = React.useCallback((profile: number[], fromDeg: number) => {
      const stops: string[] = [];
      for (let b = 0; b <= BINS; b++) {
        const idx = b % BINS;
        const t = profile[idx];
        const deg = (b / BINS) * 360;
        const op = (0.07 + t * 0.63).toFixed(3);
        stops.push(`rgba(255,255,255,${op}) ${deg.toFixed(1)}deg`);
      }
      return `conic-gradient(from ${fromDeg.toFixed(1)}deg at 50% 50%, ${stops.join(", ")})`;
    }, []);

    const initWebGL = React.useCallback(
      (canvas: HTMLCanvasElement) => {
        try {
          const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
          if (!gl) return false;

          const vs = `attribute vec2 p; varying vec2 uv; void main() { uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
          const fs = `
          precision highp float; varying vec2 uv; uniform sampler2D bg; uniform sampler2D disp;
          uniform vec2 res; uniform vec4 rect; uniform float scale;
          void main() {
            vec2 frag = vec2(uv.x * res.x, (1.0 - uv.y) * res.y);
            vec2 local = (frag - rect.xy) / rect.zw;
            vec3 outc = texture2D(bg, uv).rgb;
            if (local.x >= 0.0 && local.x <= 1.0 && local.y >= 0.0 && local.y <= 1.0) {
              vec4 dm = texture2D(disp, vec2(local.x, local.y));
              if (dm.a > 0.01) {
                vec2 d = (dm.rg - 0.5) * 2.0 * scale;
                vec2 s = (frag + d) / res;
                outc = texture2D(bg, vec2(s.x, 1.0 - s.y)).rgb;
              }
            }
            gl_FragColor = vec4(outc, 1.0);
          }
        `;
          const sh = (t: number, s: string) => {
            const o = gl.createShader(t);
            if (!o) throw new Error("Could not create shader");
            gl.shaderSource(o, s);
            gl.compileShader(o);
            return o;
          };
          const prog = gl.createProgram();
          if (!prog) return false;
          gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
          gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
          gl.linkProgram(prog);
          gl.useProgram(prog);

          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
          const loc = gl.getAttribLocation(prog, "p");
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

          glRef.current = gl;
          glProgRef.current = prog;
          glLocRef.current = {
            bg: gl.getUniformLocation(prog, "bg"),
            disp: gl.getUniformLocation(prog, "disp"),
            res: gl.getUniformLocation(prog, "res"),
            rect: gl.getUniformLocation(prog, "rect"),
            scale: gl.getUniformLocation(prog, "scale"),
          };
          glTexRef.current = { bg: gl.createTexture() || undefined, disp: gl.createTexture() || undefined };

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            if (!glRef.current || !glTexRef.current.bg) return;
            bindTex(gl, glTexRef.current.bg, img, 0);
            glReadyRef.current = true;
          };
          img.onerror = () => {
            glReadyRef.current = false;
            fallbackToCSSBlur();
          };
          img.src = bgImage;
          return true;
        } catch {
          return false;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [bgImage],
    );

    const bindTex = (gl: WebGLRenderingContext, tex: WebGLTexture, src: TexImageSource, unit: number) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    const glSetDisplacement = React.useCallback((url: string) => {
      const gl = glRef.current;
      const dispTex = glTexRef.current.disp;
      if (!gl || !dispTex) return;
      const img = new Image();
      img.onload = () => bindTex(gl, dispTex, img, 1);
      img.src = url;
    }, []);

    const fallbackToCSSBlur = React.useCallback(() => {
      setMode("blur");
    }, []);

    const registerButton = React.useCallback(
      (id: string, element: HTMLButtonElement) => {
        buttonsRef.current[id] = element;
        const btnW = element.offsetWidth || 180;
        const btnH = element.offsetHeight || 60;
        element.style.borderRadius = `${btnH / 2}px`;

        const mapData = generateSmoothConvexMap(btnW, btnH, mode);
        if (mapData) {
          if (mode === "svg") {
            feImage0Ref.current?.setAttribute("href", mapData);
            feImage1Ref.current?.setAttribute("href", mapData);
          } else if (mode === "webgl") {
            glSetDisplacement(mapData);
          }
        }
      },
      [mode, generateSmoothConvexMap, glSetDisplacement],
    );

    const unregisterButton = React.useCallback((id: string) => {
      delete buttonsRef.current[id];
    }, []);

    // --- Dynamic Coordinates Viewport Tracking Loop ---
    React.useEffect(() => {
      const container = containerRef.current;
      const target = targetRef.current;
      const canvas = canvasRef.current;
      if (!container) return;

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const isSafariMac = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      let detectedMode: "svg" | "webgl" | "blur" = "svg";
      if (isIOS || isSafariMac) detectedMode = fallbackMode === "webgl" ? "webgl" : "blur";

      setMode(detectedMode);

      if (detectedMode === "webgl" && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        initWebGL(canvas);
      }

      let animationFrameId: number;

      const loop = () => {
        const buttons = Object.values(buttonsRef.current);
        if (buttons.length === 0) {
          animationFrameId = requestAnimationFrame(loop);
          return;
        }

        const btn = buttons[0];
        const rect = btn.getBoundingClientRect();
        const pRect = container.getBoundingClientRect();

        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        if (pRect.width > 0 && pRect.height > 0) {
          const currentX = (btnCenterX - pRect.left) / pRect.width;
          const currentY = (btnCenterY - pRect.top) / pRect.height;

          const dx = LIGHT_SOURCE.x - currentX;
          const dy = LIGHT_SOURCE.y - currentY;
          const lightAz = Math.atan2(dy, dx);

          const key = lightAz.toFixed(2);
          if (key !== lastKeyRef.current) {
            lastKeyRef.current = key;
            const analysis = analyzeRefraction(lightAz);
            if (analysis) {
              const intensity = 0.4 + analysis.magnitude * 0.6;
              const cosVal = -Math.cos(analysis.domAngle) * intensity;
              const sinVal = -Math.sin(analysis.domAngle) * intensity;
              const lightAngleDeg = (analysis.domAngle * 180) / Math.PI + 90;
              const rimGradient = buildConicGradient(analysis.profile, lightAngleDeg);

              btn.style.setProperty("--cos", cosVal.toString());
              btn.style.setProperty("--sin", sinVal.toString());
              btn.style.setProperty("--light-angle", `${lightAngleDeg}deg`);
              btn.style.setProperty("--rim-intensity", analysis.magnitude.toString());
              btn.style.setProperty("--rim-gradient", rimGradient);
            }
          }
        }

        if (detectedMode === "svg" && target) {
          const localLeft = rect.left - pRect.left;
          const localTop = rect.top - pRect.top;

          const currentFeImage = activeFilter.current === 0 ? feImage0Ref.current : feImage1Ref.current;
          if (currentFeImage) {
            currentFeImage.setAttribute("x", localLeft.toString());
            currentFeImage.setAttribute("y", localTop.toString());
            currentFeImage.setAttribute("width", rect.width.toString());
            currentFeImage.setAttribute("height", rect.height.toString());
          }
          target.style.filter = `url(#${activeFilter.current === 0 ? filterId0 : filterId1})`;
          activeFilter.current = 1 - activeFilter.current;
        } else if (detectedMode === "webgl" && glReadyRef.current && canvas) {
          const gl = glRef.current;
          const prog = glProgRef.current;
          if (gl && prog) {
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(prog);
            gl.uniform1i(glLocRef.current.bg, 0);
            gl.uniform1i(glLocRef.current.disp, 1);
            gl.uniform2f(glLocRef.current.res, canvas.width, canvas.height);

            const localLeft = rect.left - pRect.left;
            const localTop = rect.top - pRect.top;

            gl.uniform4f(glLocRef.current.rect, localLeft, localTop, rect.width, rect.height);
            gl.uniform1f(glLocRef.current.scale, DISP_SCALE);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          }
        }
        animationFrameId = requestAnimationFrame(loop);
      };

      animationFrameId = requestAnimationFrame(loop);

      const handleResize = () => {
        if (!containerRef.current) return;
        if (canvas) {
          canvas.width = containerRef.current.clientWidth;
          canvas.height = containerRef.current.clientHeight;
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        const gl = glRef.current;
        if (gl) {
          if (glTexRef.current.bg) gl.deleteTexture(glTexRef.current.bg);
          if (glTexRef.current.disp) gl.deleteTexture(glTexRef.current.disp);
          if (glProgRef.current) gl.deleteProgram(glProgRef.current);
        }
      };
    }, [analyzeRefraction, buildConicGradient, initWebGL, glSetDisplacement, fallbackToCSSBlur, fallbackMode, filterId0, filterId1]);

    const contextValue = React.useMemo(
      () => ({
        registerButton,
        unregisterButton,
        mode,
      }),
      [registerButton, unregisterButton, mode],
    );

    return (
      <LiquidGlassContext.Provider value={contextValue}>
        <div
          ref={ref ?? containerRef}
          className={cn("relative w-full h-full overflow-hidden bg-black select-none", className)}
          {...props}
        >
          <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 w-full h-full pointer-events-none z-0", mode === "webgl" ? "block" : "hidden")}
          />

          <div
            ref={targetRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden will-change-[filter] [transform:translateZ(0)]"
            style={{ filter: mode === "svg" ? `url(#${filterId0})` : "none" }}
          >
            <div
              className="absolute inset-0 w-[102%] h-[102%] -left-[1%] -top-[1%] bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          </div>

          <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id={filterId0} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feImage ref={feImage0Ref} href="" x="0" y="0" width="200" height="80" result="lens" preserveAspectRatio="none" />
                <feFlood floodColor="rgb(128,128,128)" result="neutral" />
                <feComposite in="lens" in2="neutral" operator="over" result="dispMap" />
                <feDisplacementMap in="SourceGraphic" in2="dispMap" scale={DISP_SCALE.toString()} xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id={filterId1} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feImage ref={feImage1Ref} href="" x="0" y="0" width="200" height="80" result="lens" preserveAspectRatio="none" />
                <feFlood floodColor="rgb(128,128,128)" result="neutral" />
                <feComposite in="lens" in2="neutral" operator="over" result="dispMap" />
                <feDisplacementMap in="SourceGraphic" in2="dispMap" scale={DISP_SCALE.toString()} xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {children}
        </div>
      </LiquidGlassContext.Provider>
    );
  },
);
LiquidGlassViewport.displayName = "LiquidGlassViewport";

// --- Glass Button Component ---
export const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(LiquidGlassContext);
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const activeRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;
    const buttonId = React.useId();

    React.useEffect(() => {
      if (context && activeRef.current) {
        context.registerButton(buttonId, activeRef.current);
      }
      return () => {
        if (context) {
          context.unregisterButton(buttonId);
        }
      };
    }, [context, activeRef, buttonId]);

    const renderMode = context ? context.mode : "svg";

    return (
      <button
        ref={activeRef}
        className={cn(
          "relative select-none pointer-events-auto inline-flex items-center justify-center px-12 py-5 border-0 bg-transparent cursor-pointer outline-none origin-center transition-transform duration-[400ms] ease-[cubic-bezier(0.4,1.5,0.3,1)] active:scale-[0.96]",
          className,
        )}
        style={
          {
            "--cos": "0",
            "--sin": "0",
            "--light-angle": "0deg",
            "--rim-intensity": "0.6",
            "--rim-gradient": "none",
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Specular layer / bevel highlight styles */}
        <span
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
          style={{
            background: renderMode === "webgl" ? "transparent" : "color-mix(in srgb, white 25%, transparent)",
            backdropFilter: renderMode === "webgl" ? "none" : "blur(2px) saturate(180%) brightness(1.05)",
            WebkitBackdropFilter: renderMode === "webgl" ? "none" : "blur(1px) saturate(180%) brightness(1.05)",
            backgroundImage:
              renderMode === "webgl"
                ? "none"
                : "radial-gradient(circle at calc(50% - var(--cos) * 50%) calc(50% - var(--sin) * 50%), rgba(255,255,255,0.2) 0%, transparent 60%)",
            boxShadow: `
              inset 0 0 0 1px color-mix(in srgb, white calc(var(--rim-intensity) * 20%), transparent),
              inset calc(var(--cos) * 1.8px) calc(var(--sin) * 3px) 0px -2px color-mix(in srgb, white calc(var(--rim-intensity) * 90%), transparent),
              inset calc(var(--cos) * -2px) calc(var(--sin) * -2px) 0px -2px color-mix(in srgb, white calc(var(--rim-intensity) * 80%), transparent),
              inset calc(var(--cos) * -3px) calc(var(--sin) * -8px) 1px -6px color-mix(in srgb, white calc(var(--rim-intensity) * 60%), transparent),
              inset calc(var(--cos) * -0.3px) calc(var(--sin) * -1px) 4px 0px color-mix(in srgb, black 12%, transparent),
              inset calc(var(--cos) * -1.5px) calc(var(--sin) * 2.5px) 0px -2px color-mix(in srgb, black 20%, transparent),
              inset calc(var(--cos) * 0px) calc(var(--sin) * 3px) 4px -2px color-mix(in srgb, black 20%, transparent),
              inset calc(var(--cos) * 2px) calc(var(--sin) * -6.5px) 1px -4px color-mix(in srgb, black 10%, transparent),
              calc(var(--cos) * 4px) calc(var(--sin) * 4px) 10px 0px color-mix(in srgb, black 15%, transparent),
              calc(var(--cos) * 9px) calc(var(--sin) * 9px) 18px 0px color-mix(in srgb, black 10%, transparent)
            `,
          }}
        />

        {/* Highlight outer rim */}
        <span
          className="absolute inset-0 z-10 rounded-[inherit] p-[1px] pointer-events-none"
          style={{
            background: "var(--rim-gradient)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            opacity: "calc(0.62 + var(--rim-intensity) * 0.24)",
          }}
        />

        {/* Inner label wrapper */}
        <span className="relative z-20 text-sm font-semibold tracking-wide text-black/85 select-none pointer-events-none flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);
LiquidGlassButton.displayName = "LiquidGlassButton";

```

---

## `src/components/ui/glass-surface.css`

```css
.glass-surface {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.26s ease-out;
}

/* Leger mouvement au survol, en plus de l'ondulation de la refraction :
   la surface "respire" comme un bouton de verre qu'on touche. */
.glass-surface--interactive {
  transition:
    opacity 0.26s ease-out,
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.glass-surface--interactive:hover {
  transform: scale(1.05);
}
.glass-surface--interactive:active {
  transform: scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .glass-surface--interactive:hover,
  .glass-surface--interactive:active {
    transform: none;
  }
}

.glass-surface__filter {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0;
  z-index: -1;
}

.glass-surface__content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: inherit;
  position: relative;
  z-index: 1;
}

.glass-surface--svg {
  background: light-dark(hsl(0 0% 100% / var(--glass-frost, 0)), hsl(0 0% 0% / var(--glass-frost, 0)));
  backdrop-filter: var(--filter-id, url(#glass-filter)) saturate(var(--glass-saturation, 1));
  box-shadow:
    0 0 2px 1px light-dark(color-mix(in oklch, black, transparent 85%), color-mix(in oklch, white, transparent 65%)) inset,
    0 0 10px 4px light-dark(color-mix(in oklch, black, transparent 90%), color-mix(in oklch, white, transparent 85%)) inset,
    0px 4px 16px rgba(17, 17, 26, 0.05),
    0px 8px 24px rgba(17, 17, 26, 0.05),
    0px 16px 56px rgba(17, 17, 26, 0.05),
    0px 4px 16px rgba(17, 17, 26, 0.05) inset,
    0px 8px 24px rgba(17, 17, 26, 0.05) inset,
    0px 16px 56px rgba(17, 17, 26, 0.05) inset;
}

.glass-surface--fallback {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.2),
    0 2px 16px 0 rgba(31, 38, 135, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
}

@media (prefers-color-scheme: dark) {
  .glass-surface--fallback {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .glass-surface--fallback {
    background: rgba(255, 255, 255, 0.4);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
  }
  .glass-surface--fallback::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: inherit;
    z-index: -1;
  }
}

@supports not (backdrop-filter: blur(10px)) {
  @media (prefers-color-scheme: dark) {
    .glass-surface--fallback {
      background: rgba(0, 0, 0, 0.4);
    }
    .glass-surface--fallback::before {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

.glass-surface:focus-visible {
  outline: 2px solid light-dark(#007aff, #0a84ff);
  outline-offset: 2px;
}

```

---

## `src/components/ui/glass-surface.tsx`

```tsx
import { useEffect, useRef, useState, useId, type CSSProperties, type ReactNode } from "react";
import "./glass-surface.css";

// GlassSurface (React Bits), variante JS + CSS, convertie en TypeScript.
// Surface de verre avec refraction : un filtre SVG deplace ce qui est DERRIERE
// la surface (backdrop-filter). L'effet ne se voit donc que pose sur un fond
// (video, contenu), pas sur du vide. Chromium seulement pour le vrai filtre ;
// Safari / Firefox retombent sur un verre floute (--fallback).

type Channel = "R" | "G" | "B";

interface GlassSurfaceProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: Channel;
  yChannel?: Channel;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
}

export function GlassSurface({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {},
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute("scale", (distortionScale + offset).toString());
        ref.current.setAttribute("xChannelSelector", xChannel);
        ref.current.setAttribute("yChannelSelector", yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effet d'eau au survol : on fait "onduler" la distorsion des trois canaux
  // (base -> pic -> base) sur une courbe en sinus, comme une goutte qui
  // deforme la surface. La CSS ajoute en plus un leger grossissement.
  const rippleRaf = useRef<number | undefined>(undefined);
  const runRipple = () => {
    if (rippleRaf.current) cancelAnimationFrame(rippleRaf.current);
    const duration = 620;
    const start = performance.now();
    const channels: Array<[typeof redChannelRef, number]> = [
      [redChannelRef, redOffset],
      [greenChannelRef, greenOffset],
      [blueChannelRef, blueOffset],
    ];
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const wave = Math.sin(p * Math.PI); // 0 -> 1 -> 0
      channels.forEach(([ref, offset]) => {
        // Pic a 1,7x la distorsion de repos : l'ondulation se voit sans casser.
        const scale = distortionScale * (1 + wave * 0.7) + offset;
        ref.current?.setAttribute("scale", scale.toString());
      });
      if (p < 1) rippleRaf.current = requestAnimationFrame(tick);
    };
    rippleRaf.current = requestAnimationFrame(tick);
  };

  const supportsSVGFilters = () => {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    if (isWebkit || isFirefox) return false;
    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== "";
  };

  const containerStyle: CSSProperties = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    ["--glass-frost" as string]: backgroundOpacity,
    ["--glass-saturation" as string]: saturation,
    ["--filter-id" as string]: `url(#${filterId})`,
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={runRipple}
      className={`glass-surface glass-surface--interactive ${svgSupported ? "glass-surface--svg" : "glass-surface--fallback"} ${className}`}
      style={containerStyle}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}

```

---

## `src/components/ui/shiny-button.css`

```css
/* ShinyButton, bouton d'ACTION PRINCIPALE du site.

   Adapte du composant fourni. Trois changements par rapport a l'original :
   1. Le CSS sort du composant. L'original utilisait <style jsx>, une
      fonctionnalite de Next.js qui n'existe pas sous Vite : garde tel quel,
      le bloc aurait ete rendu comme du texte dans la page.
   2. L'import de la police Inter est retire. Le site n'a qu'une police, Outfit,
      chargee une seule fois dans index.html. Une seconde famille chargee ici
      aurait ajoute une requete bloquante pour un seul bouton.
   3. Les couleurs passent par les tokens : le halo est le bleu LRSIA, pas un
      "blue" en dur. Le bouton suit donc le theme clair et sombre.

   Les @property sont indispensables : sans eux, un angle ou un pourcentage
   CSS n'est pas interpolable et l'animation saute au lieu de tourner. */

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@property --gradient-angle-offset {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@property --gradient-percent {
  syntax: "<percentage>";
  initial-value: 5%;
  inherits: false;
}

@property --gradient-shine {
  syntax: "<color>";
  initial-value: white;
  inherits: false;
}

.shiny-cta {
  --shiny-cta-bg: 0 0% 0%;
  --shiny-cta-bg-subtle: 0 0% 10%;
  --shiny-cta-fg: 0 0% 100%;
  --shiny-cta-highlight: var(--lrsia-blue);
  --shiny-cta-highlight-subtle: 217 100% 76%;
  --animation: gradient-angle linear infinite;
  --duration: 3s;
  --shadow-size: 2px;
  --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

  isolation: isolate;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline-offset: 4px;
  padding: 0.9rem 2rem;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 360px;
  color: hsl(var(--shiny-cta-fg));
  background:
    linear-gradient(hsl(var(--shiny-cta-bg)), hsl(var(--shiny-cta-bg))) padding-box,
    conic-gradient(
        from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
        transparent,
        hsl(var(--shiny-cta-highlight)) var(--gradient-percent),
        var(--gradient-shine) calc(var(--gradient-percent) * 2),
        hsl(var(--shiny-cta-highlight)) calc(var(--gradient-percent) * 3),
        transparent calc(var(--gradient-percent) * 4)
      )
      border-box;
  box-shadow: inset 0 0 0 1px hsl(var(--shiny-cta-bg-subtle));
  transition: var(--transition);
  transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
}

.shiny-cta::before,
.shiny-cta::after,
.shiny-cta span::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  translate: -50% -50%;
  z-index: -1;
}

.shiny-cta:active {
  translate: 0 1px;
}

/* Trame de points */
.shiny-cta::before {
  --size: calc(100% - var(--shadow-size) * 3);
  --position: 2px;
  --space: calc(var(--position) * 2);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(
      circle at var(--position) var(--position),
      white calc(var(--position) / 4),
      transparent 0
    )
    padding-box;
  background-size: var(--space) var(--space);
  background-repeat: space;
  mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
  border-radius: inherit;
  opacity: 0.4;
  z-index: -1;
}

/* Reflet interieur */
.shiny-cta::after {
  --animation: shimmer linear infinite;
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(-50deg, transparent, hsl(var(--shiny-cta-highlight)), transparent);
  mask-image: radial-gradient(circle at bottom, transparent 40%, black);
  opacity: 0.6;
}

.shiny-cta span {
  z-index: 1;
}

.shiny-cta span::before {
  --size: calc(100% + 1rem);
  width: var(--size);
  height: var(--size);
  box-shadow: inset 0 -1ex 2rem 4px hsl(var(--shiny-cta-highlight));
  opacity: 0;
  transition: opacity var(--transition);
  animation: calc(var(--duration) * 1.5) breathe linear infinite;
}

.shiny-cta,
.shiny-cta::before,
.shiny-cta::after {
  animation:
    var(--animation) var(--duration),
    var(--animation) calc(var(--duration) / 0.4) reverse paused;
  animation-composition: add;
}

.shiny-cta:is(:hover, :focus-visible) {
  --gradient-percent: 20%;
  --gradient-angle-offset: 95deg;
  --gradient-shine: hsl(var(--shiny-cta-highlight-subtle));
}

.shiny-cta:is(:hover, :focus-visible),
.shiny-cta:is(:hover, :focus-visible)::before,
.shiny-cta:is(:hover, :focus-visible)::after {
  animation-play-state: running;
}

.shiny-cta:is(:hover, :focus-visible) span::before {
  opacity: 1;
}

/* Focus clavier visible : obligation d'accessibilite, le outline-offset seul
   ne suffit pas si le navigateur ne dessine pas d'anneau par defaut. */
.shiny-cta:focus-visible {
  outline: 2px solid hsl(var(--ring));
}

@keyframes gradient-angle {
  to {
    --gradient-angle: 360deg;
  }
}

@keyframes shimmer {
  to {
    rotate: 360deg;
  }
}

@keyframes breathe {
  from,
  to {
    scale: 1;
  }
  50% {
    scale: 1.2;
  }
}

```

---

## `src/components/ui/shiny-button.tsx`

```tsx
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import "./shiny-button.css";

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Bouton d'action PRINCIPALE. Un seul par ecran : c'est ce qui lui donne son poids. */
export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <button className={cn("shiny-cta", className)} {...props}>
      <span>{children}</span>
    </button>
  );
}

```

---

## `src/components/ui/theme-toggle.tsx`

```tsx
import { Sun, Monitor, Moon } from "lucide-react";
import { type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { animateThemeToggle } from "@/lib/animate-theme-toggle";

const OPTIONS = [
  { value: "light", label: "Clair", Icon: Sun },
  { value: "system", label: "Systeme", Icon: Monitor },
  { value: "dark", label: "Sombre", Icon: Moon },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  function handleClick(e: MouseEvent, next: (typeof OPTIONS)[number]["value"]) {
    // Revelation circulaire seulement pour un vrai changement clair/sombre.
    // Sinon (retour au meme mode effectif), bascule instantanee.
    const nextEffective =
      next === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : next;
    if (resolvedTheme === nextEffective) {
      setTheme(next);
      return;
    }
    animateThemeToggle(e, next, (t) => setTheme(t as typeof next));
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-border bg-background p-0.5", className)}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive ? "true" : "false"}
            aria-label={label}
            onClick={(e) => handleClick(e, value)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}

```

---

## `src/hooks/useProgressionReelle.ts`

```tsx
import { useEffect, useRef, useState } from "react";

/**
 * Avancement reel du chargement de la page, entre 0 et 1.
 *
 * Le lot Codrops dont vient la mecanique de compteur simule sa progression :
 * un tween de 1,5 s qui compte dans le vide pendant que les images chargent
 * ailleurs. On garde son tic-tac et on jette le mensonge. Ici chaque
 * increment correspond a quelque chose de reellement pret : une police
 * chargee, une image decodee, le document parcouru.
 *
 * Deux garde-fous. Un temps minimum, sinon l'ecran clignote sur une bonne
 * connexion et on ne voit rien. Un temps maximum, sinon une image morte
 * bloque l'entree du site indefiniment.
 */
export function useProgressionReelle(
  { minimum = 900, maximum = 8000 }: { minimum?: number; maximum?: number } = {},
) {
  const [avancee, setAvancee] = useState(0);
  const [pret, setPret] = useState(false);
  const depart = useRef(performance.now());

  useEffect(() => {
    let vivant = true;
    const debut = depart.current;

    const taches: Promise<unknown>[] = [];

    // Les polices : elles decident de la mise en page, il faut les attendre
    // sinon la premiere image du site est un saut typographique.
    taches.push(document.fonts.ready);

    // Les images deja dans le document. `decode` attend le decodage complet,
    // pas seulement le telechargement : c'est lui qui coute a l'affichage.
    for (const image of document.images) {
      taches.push(
        image.decode().catch(() => undefined),
      );
    }

    // Le chargement complet de la page, feuilles de style comprises.
    if (document.readyState !== "complete") {
      taches.push(new Promise((resoudre) => window.addEventListener("load", resoudre, { once: true })));
    }

    const total = taches.length || 1;
    let faites = 0;

    const rafraichir = () => {
      if (!vivant) return;
      // On mele l'avancement des taches et le temps minimum ecoule, sinon la
      // barre saute a 100 avant que l'oeil ait suivi.
      const partTaches = faites / total;
      const partTemps = Math.min(1, (performance.now() - debut) / minimum);
      setAvancee(Math.min(partTaches, partTemps));
    };

    for (const tache of taches) {
      tache.then(() => {
        faites += 1;
        rafraichir();
      });
    }

    const horloge = window.setInterval(rafraichir, 60);

    const terminer = () => {
      if (!vivant) return;
      vivant = false;
      window.clearInterval(horloge);
      setAvancee(1);
      setPret(true);
    };

    Promise.all(taches).then(() => {
      const reste = Math.max(0, minimum - (performance.now() - debut));
      window.setTimeout(terminer, reste);
    });

    const secours = window.setTimeout(terminer, maximum);

    return () => {
      vivant = false;
      window.clearInterval(horloge);
      window.clearTimeout(secours);
    };
  }, [minimum, maximum]);

  return { avancee, pret };
}

```

---

## `src/hooks/useReveal.ts`

```tsx
import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Revele au scroll les elements marques [data-reveal] dans le conteneur.
 * Entree "lourde" facon agence : montee ample, fondu et leger flou qui se
 * resorbe, sur une courbe a forte deceleration (power4.out). Chaque element se
 * declenche a son entree dans le viewport, une seule fois.
 * Respecte prefers-reduced-motion (rien ne bouge, tout reste visible).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((item) => {
        gsap.from(item, {
          y: 44,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

```

---

## `src/i18n/dictionary.ts`

```tsx
/** Les deux langues du site. Le francais est la langue par defaut. */
export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

/* Un seul objet par langue, mises a plat par cle "section.champ".
   Le francais fait foi : toute cle absente de l'anglais retombe dessus
   (voir traduire() dans lang.tsx). */
const fr = {
  "nav.lab": "Le laboratoire",
  "nav.lrsia": "Le LRSIA",
  "nav.team": "L'equipe",
  "nav.research": "Recherche",
  "nav.people": "Membres",
  "nav.events": "Evenements",
  "nav.blog": "Actualites",

  "lab.lrsiaDesc": "Le laboratoire, sa direction et ses domaines",
  "lab.teamDesc": "La Ratheil Research Team et ses axes",
  "lab.researchDesc": "Nos travaux et methodes",

  "hero.title": "L'intelligence artificielle au service de l'impact societal",
  "hero.lead":
    "La Ratheil Research Team concoit des methodes d'intelligence artificielle et d'optimisation combinatoire pour des problemes concrets, dans un contexte de ressources limitees.",
  "hero.lead2": "Agriculture, sante, education, optimisation pour le bien commun.",
  "hero.cta": "Decouvrir nos travaux",
  "hero.ctaSecondary": "Rencontrer l'equipe",
  "hero.ledBy": "Equipe animee par le Dr Vinasetan Ratheil Houndji",
} as const;

const en: Partial<Record<keyof typeof fr, string>> = {
  "nav.lab": "The lab",
  "nav.lrsia": "About LRSIA",
  "nav.team": "The team",
  "nav.research": "Research",
  "nav.people": "People",
  "nav.events": "Events",
  "nav.blog": "News",

  "lab.lrsiaDesc": "The lab, its direction and fields",
  "lab.teamDesc": "The Ratheil Research Team and its focus",
  "lab.researchDesc": "Our work and methods",

  "hero.title": "Artificial Intelligence for Societal Impact",
  "hero.lead":
    "The Ratheil Research Team designs artificial intelligence and combinatorial optimisation methods for concrete problems, in a low-resource setting.",
  "hero.lead2": "Agriculture, health, education, optimisation for the common good.",
  "hero.cta": "Explore our work",
  "hero.ctaSecondary": "Meet the team",
  "hero.ledBy": "Team led by Dr Vinasetan Ratheil Houndji",
};

export type TranslationKey = keyof typeof fr;

export const dictionaries = { fr, en } as const;

```

---

## `src/i18n/lang.tsx`

```tsx
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_LANG, dictionaries, isLang, type Lang, type TranslationKey } from "./dictionary";

interface LangValue {
  lang: Lang;
  /** Traduit une cle. Retombe sur le francais si l'anglais ne la couvre pas encore. */
  t: (key: TranslationKey) => string;
  /** Prefixe un chemin interne avec la langue courante : "/research" -> "/en/research". */
  path: (to: string) => string;
}

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const { lang: raw } = useParams();
  const lang = isLang(raw) ? raw : DEFAULT_LANG;

  const value = useMemo<LangValue>(
    () => ({
      lang,
      t: (key) => dictionaries[lang][key] ?? dictionaries.fr[key],
      path: (to) => `/${lang}${to.startsWith("/") ? to : `/${to}`}`.replace(/\/$/, "") || `/${lang}`,
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang doit etre appele sous un LangProvider");
  return value;
}

```

---

## `src/lib/animate-theme-toggle.ts`

```tsx
// Bascule de theme avec revelation circulaire depuis le point de clic,
// via l'API View Transitions. Adaptee d'e-freeshop (implementation Amoussou).
// Navigateurs sans startViewTransition : bascule instantanee via .theme-instant.

type SetThemeFn = (theme: string) => void;

export function animateThemeToggle(
  event: React.MouseEvent | MouseEvent,
  nextTheme: string,
  setTheme: SetThemeFn,
) {
  const root = document.documentElement;
  const start = document.startViewTransition?.bind(document);

  if (!start || prefersReducedMotion()) {
    root.classList.add("theme-instant");
    setTheme(nextTheme);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-instant"));
    });
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = start(() => {
    setTheme(nextTheme);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 1600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

```

---

## `src/lib/content.ts`

```tsx
import type { Lang } from "@/i18n/dictionary";

/**
 * Chargement des articles depuis content/blog/*.md.
 *
 * Regle du projet : ajouter un article = deposer un fichier .md dans
 * content/blog/. Aucun code a toucher. Vite les ramasse tous a la
 * compilation via import.meta.glob : la liste n'est ecrite nulle part.
 *
 * Convention de nom : <slug>.<lang>.md  (ex: cp4sd-2025.fr.md).
 * La langue est deduite du nom, pas d'un champ a remplir a la main.
 */

export interface Article {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  summary: string;
  author?: string;
  cover?: string;
  tags: string[];
  /** Corps Markdown, sans le frontmatter. */
  body: string;
}

// eager: true -> les fichiers sont inlines dans le bundle. Un site vitrine a
// peu d'articles ; pas besoin de charger chaque .md en requete separee.
const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/**
 * Parseur de frontmatter minimal (bloc --- en tete).
 * Volontairement simple : cle: valeur par ligne, et les tags en liste
 * "[a, b, c]". Pas de YAML complet, on n'en a pas besoin et une lib de plus
 * serait du poids pour rien.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = value;
  }
  return { data, body: match[2] };
}

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const articles: Article[] = Object.entries(files)
  .map(([path, raw]) => {
    const name = path.split("/").pop() ?? "";
    const [slug, lang] = name.replace(/\.md$/, "").split(".");
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      lang: (lang === "en" ? "en" : "fr") as Lang,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      author: data.author,
      cover: data.cover,
      tags: parseTags(data.tags),
      body: body.trim(),
    };
  })
  // Plus recent d'abord.
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Tous les articles d'une langue, du plus recent au plus ancien. */
export function listArticles(lang: Lang): Article[] {
  const inLang = articles.filter((a) => a.lang === lang);
  // Repli sur le francais si une langue n'a encore aucun article traduit.
  return inLang.length > 0 ? inLang : articles.filter((a) => a.lang === "fr");
}

/** Un article precis, avec repli sur la version francaise si besoin. */
export function getArticle(slug: string, lang: Lang): Article | undefined {
  return (
    articles.find((a) => a.slug === slug && a.lang === lang) ??
    articles.find((a) => a.slug === slug && a.lang === "fr")
  );
}

```

---

## `src/lib/utils.ts`

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind : la derniere gagne en cas de conflit. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

## `src/pages/Blog.tsx`

```tsx
import { Link } from "react-router-dom";
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";
import { listArticles } from "@/lib/content";

export function Blog() {
  const { lang, path } = useLang();
  const fr = lang === "fr";
  const articles = listArticles(lang);

  return (
    <>
      <PageIntro
        title={fr ? "Actualites de l'equipe" : "Team news"}
        lead={
          fr
            ? "Comptes rendus d'evenements, avancees et vie du laboratoire."
            : "Event reports, research progress and lab life."
        }
      />
      <div className="mx-auto max-w-3xl px-5 pb-24">
        {articles.length === 0 ? (
          <p className="text-muted-foreground">{fr ? "Aucun article pour le moment." : "No articles yet."}</p>
        ) : (
          <ul className="divide-y divide-border">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={path(`/blog/${a.slug}`)} className="group block py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                      {a.title}
                    </h2>
                    {a.date && <time className="shrink-0 text-sm text-muted-foreground">{a.date}</time>}
                  </div>
                  {a.summary && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

```

---

## `src/pages/BlogPost.tsx`

```tsx
import { Link, useParams } from "react-router-dom";
import { PageIntro } from "@/components/layout/PageIntro";
import { Markdown } from "@/components/content/Markdown";
import { useLang } from "@/i18n/lang";
import { getArticle } from "@/lib/content";

export function BlogPost() {
  const { lang, path } = useLang();
  const { slug } = useParams();
  const fr = lang === "fr";
  const article = slug ? getArticle(slug, lang) : undefined;

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-muted-foreground">{fr ? "Article introuvable." : "Article not found."}</p>
        <Link to={path("/blog")} className="mt-4 inline-block text-primary underline underline-offset-2">
          {fr ? "Retour aux actualites" : "Back to news"}
        </Link>
      </div>
    );
  }

  return (
    <article>
      <PageIntro title={article.title} lead={article.summary || undefined} />
      <div className="mx-auto max-w-3xl px-5 pb-24">
        {article.date && <time className="text-sm text-muted-foreground">{article.date}</time>}
        <div className="mt-8" />
        <Markdown>{article.body}</Markdown>
        <Link to={path("/blog")} className="mt-12 inline-block text-sm text-primary underline underline-offset-2">
          {fr ? "Retour aux actualites" : "Back to news"}
        </Link>
      </div>
    </article>
  );
}

```

---

## `src/pages/Events.tsx`

```tsx
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Faits tires de assets/docs/events.md.
const EVENTS = [
  {
    title: "ACP Summer School 2025, CP4SD",
    date: "25 au 29 aout 2025",
    place: "Republique du Benin, IFRI Lab Room, UAC",
    descFr:
      "Ecole d'ete avec l'Association for Constraint Programming (ACP) et le reseau A4CP : cinq jours de cours et de travaux pratiques sur la programmation par contraintes au service du developpement durable.",
    descEn:
      "Summer school with the Association for Constraint Programming (ACP) and the A4CP network: five days of lectures and hands-on work on constraint programming for sustainable development.",
    link: "https://school.a4cp.org/summer2025/index.html",
  },
  {
    title: "BWAI, Benin Workshop on Artificial Intelligence",
    date: "editions 2021, 2022, 2024, 2025",
    place: "UAC",
    descFr:
      "Atelier national annuel dont le Dr Ratheil Houndji est General co-Chairman. Il promeut les systemes intelligents made in Africa et les echanges entre chercheurs, praticiens et ingenieurs.",
    descEn:
      "Annual national workshop co-chaired by Dr Ratheil Houndji, promoting made-in-Africa intelligent systems and exchanges between researchers, practitioners and engineers.",
    link: undefined as string | undefined,
  },
];

export function Events() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "Ecoles, ateliers et seminaires" : "Schools, workshops and seminars"}
        lead={
          fr
            ? "L'equipe organise ou co-organise regulierement des rencontres pour faire vivre la communaute IA au Benin et en Afrique de l'Ouest."
            : "The team regularly organises or co-organises events to grow the AI community in Benin and West Africa."
        }
      />
      <div className="mx-auto max-w-3xl space-y-4 px-5 pb-24">
        {EVENTS.map((e) => (
          <article key={e.title} className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-semibold">{e.title}</h2>
              <span className="text-sm text-muted-foreground">{e.date}</span>
            </div>
            <p className="mt-1 text-sm text-primary">{e.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fr ? e.descFr : e.descEn}</p>
            {e.link && (
              <a href={e.link} className="mt-3 inline-block text-sm text-primary underline underline-offset-2">
                {fr ? "Site de l'evenement" : "Event website"}
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

```

---

## `src/pages/Home.tsx`

```tsx
import { Hero } from "@/sections/Hero";
import { HeroVeil } from "@/components/layout/HeroVeil";
import { Laboratoire } from "@/sections/Laboratoire";
import { Membres } from "@/sections/Membres";

/**
 * Page d'accueil, landing complete.
 *
 * Recouvrement du hero (facon gemini.google / SOVREAN) : le hero reste colle
 * en haut (`sticky`, z-0), et tout le contenu vient se poser DESSUS (`z-10`,
 * fond opaque). Le voile "brume qui monte" (HeroVeil) fait la transition entre
 * les deux, du bas vers le haut.
 */
export function Home() {
  return (
    <>
      <div className="sticky top-0 z-0 h-[100dvh] overflow-hidden">
        <Hero />
      </div>

      {/* Le contenu qui monte. Fond opaque pour couvrir entierement le hero
          (y compris les petits interstices entre panneaux). */}
      <div className="relative z-10 bg-background">
        <HeroVeil triggerId="hero" />
        <Laboratoire />
        <Membres />
      </div>
    </>
  );
}

```

---

## `src/pages/People.tsx`

```tsx
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

/**
 * Membres de l'equipe.
 * IMPORTANT : liste incomplete, Cephas fournira le reste. On n'ajoute
 * AUCUN nom qui ne soit pas dans assets/docs/people-ratheil-team.md.
 */
const MEMBERS = [
  { name: "Marie Melene TONOU", focus: "AI & Neuroinformatics", linkedin: "https://www.linkedin.com/in/marie-melene-tonou/" },
  { name: "Marianne Omonlola BALOGOUN", focus: "AI & Telecommunications", linkedin: "https://www.linkedin.com/in/marianne-a-omonlola-balogoun-3bbb00175/" },
  { name: "Linuse TIKPON", focus: "AI & Optimization", linkedin: "https://www.linkedin.com/in/linuse-tikpon-80a1b81a5/" },
];

export function People() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "L'equipe" : "The team"}
        lead={
          fr
            ? "Doctorant.es et chercheur.ses de la Ratheil Research Team. Cette liste s'etoffera au fil des contributions."
            : "PhD candidates and researchers of the Ratheil Research Team. This list will grow over time."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border border-border bg-card p-6 sm:col-span-2 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {fr ? "Animateur de l'equipe" : "Team lead"}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src="/imgs/people/vinasetan-ratheil.png"
                alt="Portrait du Dr Vinasetan Ratheil Houndji"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-display text-lg font-semibold">Dr Vinasetan Ratheil Houndji</h2>
                <p className="text-sm text-muted-foreground">
                  {fr
                    ? "Professeur Associe, UAC. Chef du Departement Genie Logiciel, IFRI."
                    : "Associate Professor, UAC. Head of Software Engineering Department, IFRI."}
                </p>
                <a href="https://ratheil.info" className="text-sm text-primary underline underline-offset-2">
                  ratheil.info
                </a>
              </div>
            </div>
          </article>

          {MEMBERS.map((m) => (
            <article
              key={m.name}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/55"
            >
              <h2 className="font-display text-base font-semibold">{m.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {fr ? "Doctorant.e" : "PhD candidate"} &middot; {m.focus}
              </p>
              <a href={m.linkedin} className="mt-3 inline-block text-sm text-primary underline underline-offset-2">
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

```

---

## `src/pages/Research.tsx`

```tsx
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

/**
 * Page-chapeau Recherche.
 * A terme, elle pointera vers des sous-pages ou des billets par theme.
 * Pour l'instant, elle presente les grands sujets sans rien inventer.
 */
const TOPICS = [
  { fr: "Apprentissage automatique", en: "Machine learning" },
  { fr: "Optimisation combinatoire", en: "Combinatorial optimisation" },
  { fr: "Programmation par contraintes", en: "Constraint programming" },
  { fr: "Traitement du langage naturel", en: "Natural language processing" },
  { fr: "Vision par ordinateur", en: "Computer vision" },
  { fr: "Internet des objets", en: "Internet of Things" },
];

export function Research() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "Nos travaux" : "Our work"}
        lead={
          fr
            ? "Des methodes d'IA et d'optimisation pensees pour des problemes concrets, avec un fil conducteur : produire une recherche utile au contexte africain et beninois."
            : "AI and optimisation methods designed for concrete problems, with one guiding thread: research useful to the African and Beninese context."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => (
            <div key={t.fr} className="rounded-lg border border-border bg-card px-5 py-4 text-sm font-medium">
              {fr ? t.fr : t.en}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

```

---

## `src/pages/about/Lrsia.tsx`

```tsx
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Contenu factuel tire de assets/docs/about-lrsia.md. Ne rien inventer ici.
const DOMAINES = [
  "Genie logiciel",
  "Securite informatique",
  "Internet et multimedia",
  "Reseaux et systemes d'information",
  "Intelligence artificielle",
  "Internet des objets (IoT)",
];

export function Lrsia() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "Le LRSIA en bref" : "About LRSIA"}
        lead={
          fr
            ? "Laboratoire de Recherche en Sciences Informatiques et Applications, unite de recherche de l'IFRI, cree en 2017."
            : "Laboratory for Research in Computer Science and Applications, a research unit of IFRI, founded in 2017."
        }
      />
      <div className="mx-auto max-w-3xl space-y-6 px-5 pb-24 text-base leading-relaxed text-muted-foreground">
        <p>
          {fr
            ? "Le laboratoire a pour but de mener des recherches pour le developpement durable dans les pays en developpement, en partenariat avec d'autres laboratoires partageant la meme vision."
            : "The lab conducts research for sustainable development in developing countries, in partnership with other labs sharing the same vision."}
        </p>
        <div>
          <p className="mb-3 font-medium text-foreground">
            {fr ? "Six grands domaines de l'informatique portes par l'IFRI :" : "Six major fields carried by IFRI:"}
          </p>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {DOMAINES.map((d) => (
              <li key={d} className="border-l border-border pl-3 text-foreground">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <p>
          {fr
            ? "Le LRSIA est dirige par le Professeur Eugene C. Ezin. Il est signataire de la Declaration de Montreal pour un developpement responsable de l'intelligence artificielle."
            : "LRSIA is led by Professor Eugene C. Ezin and is a signatory of the Montreal Declaration for a Responsible Development of Artificial Intelligence."}
        </p>
      </div>
    </>
  );
}

```

---

## `src/pages/about/Team.tsx`

```tsx
import { PageIntro } from "@/components/layout/PageIntro";
import { useLang } from "@/i18n/lang";

// Axes tires de assets/docs/about-ratheil-team-work.md.
const AXES = [
  {
    fr: "IA pour l'agriculture",
    en: "AI for agriculture",
    descFr: "Modelisation des rendements, detection de maladies et de ravageurs des cultures.",
    descEn: "Yield modelling, detection of crop diseases and pests.",
  },
  {
    fr: "IA pour la sante",
    en: "AI for health",
    descFr: "Maladies cardiovasculaires, maladie renale chronique, maladies non transmissibles, epilepsie.",
    descEn: "Cardiovascular diseases, chronic kidney disease, non-communicable diseases, epilepsy.",
  },
  {
    fr: "Optimisation pour le bien commun",
    en: "Optimisation for the common good",
    descFr: "Equite des jeux de donnees et des modeles, problemes de tournees de vehicules en logistique.",
    descEn: "Fairness of datasets and models, vehicle routing problems in logistics.",
  },
  {
    fr: "IA pour l'education",
    en: "AI for education",
    descFr: "Analyse des performances des etudiants, detection de la triche, systemes de recommandation.",
    descEn: "Student performance analysis, cheating detection, recommendation systems.",
  },
];

export function Team() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <>
      <PageIntro
        title={fr ? "L'intelligence artificielle au service de l'impact societal" : "Artificial Intelligence for Societal Impact"}
        lead={
          fr
            ? "Equipe animee par le Dr Vinasetan Ratheil Houndji, Professeur Associe a l'UAC et Chef du Departement Genie Logiciel de l'IFRI."
            : "A team led by Dr Vinasetan Ratheil Houndji, Associate Professor at UAC and Head of the Software Engineering Department at IFRI."
        }
      />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {AXES.map((axe) => (
            <article
              key={axe.fr}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/55"
            >
              <h2 className="font-display text-lg font-semibold">{fr ? axe.fr : axe.en}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fr ? axe.descFr : axe.descEn}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

```

---

## `src/providers/SmoothScroll.tsx`

```tsx
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll fluide (Lenis) branche sur GSAP ScrollTrigger.
 *
 * Pourquoi les deux ensemble : Lenis remplace le scroll natif par une
 * interpolation douce, mais du coup ScrollTrigger ne "voit" plus le vrai
 * defilement. On lui redonne la main a chaque frame de Lenis
 * (ScrollTrigger.update) et on laisse gsap.ticker piloter l'horloge de Lenis.
 * C'est ce couplage qui permet le parallax, le reveal de texte et le
 * chevauchement des sections sans a-coups.
 *
 * Accessibilite : si l'utilisateur demande moins de mouvement, on n'active
 * PAS le scroll fluide. Le site garde alors le defilement natif du navigateur.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Mode "lerp" plutot que "duration" : le scroll suit le doigt/la molette
    // de pres (lerp 0.1) au lieu de glisser longtemps apres l'arret. Plus
    // smooth ET plus reactif, sans la sensation de lourdeur.
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // gsap.ticker compte en secondes, Lenis attend des millisecondes.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

```

---

## `src/providers/ThemeProvider.tsx`

```tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Gestion du theme, equivalent React pur de next-themes (e-freeshop tourne
 * sous Next, nous sous Vite, donc pas de lib importable telle quelle).
 *
 * Trois choix : clair, systeme, sombre. "systeme" suit la preference de l'OS
 * et se met a jour en direct si elle change. La classe .dark est posee sur
 * <html>, exactement comme le fait next-themes, pour que les variants dark:*
 * de Tailwind et le bloc .dark de index.css fonctionnent sans changement.
 */
type Theme = "light" | "system" | "dark";
type Resolved = "light" | "dark";

interface ThemeValue {
  theme: Theme;
  resolvedTheme: Resolved;
  setTheme: (t: Theme) => void;
}

const STORAGE_KEY = "lrsia-theme";
const ThemeContext = createContext<ThemeValue | null>(null);

function systemPref(): Resolved {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(resolved: Resolved) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme) || "system",
  );
  const [resolvedTheme, setResolved] = useState<Resolved>(() =>
    theme === "system" ? systemPref() : theme,
  );

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  // Recalcule le theme effectif quand le choix change, et le pose sur <html>.
  useEffect(() => {
    const resolved = theme === "system" ? systemPref() : theme;
    setResolved(resolved);
    apply(resolved);
  }, [theme]);

  // En mode systeme, suit les changements de preference de l'OS en direct.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = systemPref();
      setResolved(resolved);
      apply(resolved);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme doit etre appele sous un ThemeProvider");
  return value;
}

```

---

## `src/sections/Hero.tsx`

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useLang } from "@/i18n/lang";
import { LANGS, type TranslationKey } from "@/i18n/dictionary";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlassSurface } from "@/components/ui/glass-surface";
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
      // Pas d'effet de scale sur le hero : le faire reculer revele son bord
      // sombre, ce qui donnait ce "noir au scroll" indesirable. Le recouvrement
      // vient de la section suivante (claire) qui remonte par-dessus.
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      // Panneau arrondi, cadre fin (m-2), memes marges que le footer.
      // Scene sombre FIXE (plus de video) : fond quasi noir + grain discret.
      className="relative m-2 flex min-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-[1.25rem] bg-neutral-950 text-white"
    >
      {/* Grain tres discret pour la matiere, plus de media. */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />

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
                width={240}
                height={88}
                className="h-16 w-auto md:h-20"
              />
            </Link>
          </div>

          {/* Droite : theme, langue, action */}
          <div className="flex items-center justify-end gap-2.5">
            <div className="hidden [&_[role=radiogroup]]:border-transparent [&_[role=radiogroup]]:bg-transparent [&_button[aria-checked=true]]:bg-white [&_button[aria-checked=true]]:text-neutral-900 [&_button[aria-checked=false]]:text-white/70 [&_button[aria-checked=false]:hover]:text-white sm:block">
              <GlassSurface width={118} height={40} borderRadius={20} backgroundOpacity={0.08} className="text-white">
                <ThemeToggle />
              </GlassSurface>
            </div>
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
            {/* CTA en surface de verre : refracte la video derriere, ne masque
                pas le fond. */}
            <Link
              to={path("/research")}
              aria-label={t("hero.cta")}
              className="group inline-flex transition-transform active:scale-95"
            >
              <GlassSurface width={224} height={44} borderRadius={12} backgroundOpacity={0.08} className="text-white">
                <span className="flex items-center gap-2 px-2 text-[13px] font-medium">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </GlassSurface>
            </Link>
          </div>
        </div>
      </header>

      {/* -------- Titre centre -------- */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 pb-24 text-center">
        <h1
          data-reveal
          className="max-w-4xl text-balance font-display text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
        >
          {t("hero.title")}
        </h1>
        <p data-reveal className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          {t("hero.lead2")}
        </p>
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

```

---

## `src/sections/Laboratoire.tsx`

```tsx
import { useLang } from "@/i18n/lang";
import { RevealText, type Token } from "@/components/content/RevealText";

// Manifeste en gros format, revele au scroll. Les mots marques d'une couleur
// portent la charte du logo (bleu, rouge). Uniquement des faits verifies.
const MANIFESTO_FR: Token[] = [
  { text: "Le" }, { text: "LRSIA" }, { text: "met" }, { text: "l'" },
  { text: "intelligence", color: "blue" }, { text: "artificielle", color: "blue" },
  { text: "au" }, { text: "service" }, { text: "de" }, { text: "l'" },
  { text: "impact", color: "red" }, { text: "societal", color: "red" }, { text: "." },
  { text: "Agriculture," }, { text: "sante," }, { text: "education" }, { text: ":" },
  { text: "nous" }, { text: "concevons" }, { text: "des" }, { text: "methodes" },
  { text: "d'optimisation" }, { text: "pensees" }, { text: "pour" }, { text: "le" },
  { text: "bien" }, { text: "commun." },
];

const MANIFESTO_EN: Token[] = [
  { text: "LRSIA" }, { text: "puts" },
  { text: "artificial", color: "blue" }, { text: "intelligence", color: "blue" },
  { text: "at" }, { text: "the" }, { text: "service" }, { text: "of" },
  { text: "societal", color: "red" }, { text: "impact", color: "red" }, { text: "." },
  { text: "Agriculture," }, { text: "health," }, { text: "education" }, { text: ":" },
  { text: "we" }, { text: "design" }, { text: "optimisation" }, { text: "methods" },
  { text: "built" }, { text: "for" }, { text: "the" }, { text: "common" }, { text: "good." },
];

/**
 * Premiere section de contenu sous le hero : le LRSIA en gros format.
 * Le manifeste occupe toute la largeur, aligne a gauche (disposition de la
 * reference), et se revele au scroll. Deux illustrations animees, sobres :
 * la fiole (le labo) et un reseau de neurones (l'IA).
 */
export function Laboratoire() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <section
      id="laboratoire"
      className="relative mx-2 mt-2 overflow-hidden rounded-[1.25rem] bg-background px-6 py-24 md:px-14 md:py-36"
    >
      {/* Fiole animee (le labo), en haut a droite. */}
      <Flask className="pointer-events-none absolute right-6 top-10 h-24 w-24 text-border md:right-16 md:h-36 md:w-36" />
      {/* Tete de robot animee (l'IA), en bas a gauche (un peu plus haut que
          ne l'etait le reseau). */}
      <RobotHead className="pointer-events-none absolute bottom-8 left-4 h-24 w-24 text-border md:bottom-14 md:left-12 md:h-36 md:w-36" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <RevealText
          tokens={fr ? MANIFESTO_FR : MANIFESTO_EN}
          className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <p className="mx-auto mt-16 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          {fr
            ? "Unite de recherche de l'IFRI a l'Universite d'Abomey-Calavi, creee en 2017 et dirigee par le Professeur Eugene C. Ezin. Signataire de la Declaration de Montreal pour une intelligence artificielle responsable."
            : "A research unit of IFRI at the University of Abomey-Calavi, founded in 2017 and led by Professor Eugene C. Ezin. Signatory of the Montreal Declaration for a responsible artificial intelligence."}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Fiole de laboratoire : elle flotte doucement, des bulles montent. */
function Flask({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="anim-float h-full w-full">
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
          <path
            d="M26 6h12M28 6v16L14 50a4 4 0 0 0 3.6 6h28.8A4 4 0 0 0 50 50L36 22V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Liquide bleu */}
          <path d="M20.5 41 32 35l11.5 6 3.7 7.4A3 3 0 0 1 44.5 53h-25a3 3 0 0 1-2.7-4.6L20.5 41Z" fill="hsl(var(--lrsia-blue) / 0.9)" />
          {/* Bulles qui montent (delais decales) */}
          <circle className="anim-bubble" style={{ animationDelay: "0s" }} cx="28" cy="46" r="1.8" fill="hsl(var(--lrsia-red))" />
          <circle className="anim-bubble" style={{ animationDelay: "0.8s" }} cx="34" cy="48" r="1.3" fill="white" fillOpacity="0.9" />
          <circle className="anim-bubble" style={{ animationDelay: "1.5s" }} cx="31" cy="44" r="1.1" fill="hsl(var(--lrsia-blue))" />
        </svg>
      </div>
    </div>
  );
}

/** Tete de robot : elle flotte, l'antenne et les yeux pulsent. Signe de l'IA. */
function RobotHead({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="anim-float h-full w-full">
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-full" aria-hidden>
          {/* Antenne + dot qui pulse */}
          <line x1="32" y1="10" x2="32" y2="18" stroke="currentColor" strokeWidth="2" />
          <circle className="anim-node" cx="32" cy="8" r="2.4" fill="hsl(var(--lrsia-red))" />
          {/* Tete */}
          <rect x="14" y="18" width="36" height="30" rx="8" stroke="currentColor" strokeWidth="2" />
          {/* Oreilles */}
          <rect x="10" y="26" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="50" y="26" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
          {/* Yeux (bleus, arrondis, pulsent en decale) : plus doux */}
          <circle className="anim-node" cx="25" cy="32" r="3.6" fill="hsl(var(--lrsia-blue))" />
          <circle className="anim-node" style={{ animationDelay: "0.5s" }} cx="39" cy="32" r="3.6" fill="hsl(var(--lrsia-blue))" />
          {/* Sourire simple */}
          <path d="M26 40q6 5 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}

```

---

## `src/sections/Membres.tsx`

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/i18n/lang";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Membres connus a ce jour (source : assets/docs/people-ratheil-team.md).
// La liste sera completee. On n'invente aucun nom.
interface Member {
  name: string;
  roleFr: string;
  roleEn: string;
  link?: string;
  linkLabel?: string;
  lead?: boolean;
  accent: "blue" | "red";
  photo?: string;
}

const MEMBERS: Member[] = [
  {
    name: "Dr Vinasetan Ratheil Houndji",
    roleFr: "Animateur de l'equipe, Professeur Associe a l'UAC",
    roleEn: "Team lead, Associate Professor at UAC",
    link: "https://ratheil.info",
    linkLabel: "ratheil.info",
    lead: true,
    accent: "blue",
    photo: "/imgs/people/vinasetan-ratheil.png",
  },
  {
    name: "Marie Melene TONOU",
    roleFr: "Doctorante, IA & neuro-informatique",
    roleEn: "PhD candidate, AI & neuroinformatics",
    link: "https://www.linkedin.com/in/marie-melene-tonou/",
    linkLabel: "LinkedIn",
    accent: "red",
  },
  {
    name: "Marianne Omonlola BALOGOUN",
    roleFr: "Doctorante, IA & telecommunications",
    roleEn: "PhD candidate, AI & telecommunications",
    link: "https://www.linkedin.com/in/marianne-a-omonlola-balogoun-3bbb00175/",
    linkLabel: "LinkedIn",
    accent: "blue",
  },
  {
    name: "Linuse TIKPON",
    roleFr: "Doctorante, IA & optimisation",
    roleEn: "PhD candidate, AI & optimisation",
    link: "https://www.linkedin.com/in/linuse-tikpon-80a1b81a5/",
    linkLabel: "LinkedIn",
    accent: "red",
  },
];

const STACK_OFFSET = 28; // px de decalage vertical entre deux cartes.

/**
 * Section Membres, cartes empilees facon lenis.dev (repris du portfolio Ehoud,
 * reecrit en GSAP pour rester sur notre pile). Chaque carte est `sticky` : au
 * scroll, la suivante monte et se pose par-dessus la precedente, qui retrecit
 * un peu (profondeur). Respecte prefers-reduced-motion (simple liste empilee).
 */
export function Membres() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = stackRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
      const total = cards.length;
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>("[data-inner]");
        if (!inner) return;

        // 1) Entree "lourde" : la carte monte, se defloute et apparait a son
        //    arrivee dans le viewport, une seule fois.
        gsap.from(inner, {
          y: 60,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });

        // 2) Empilement : la carte retrecit a mesure que les suivantes se
        //    posent dessus (profondeur).
        const targetScale = 1 - (total - 1 - i) * 0.05;
        gsap.to(inner, {
          scale: targetScale,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            endTrigger: root,
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    },
    { scope: stackRef },
  );

  return (
    <section id="membres" className="mx-2 mt-2 rounded-[1.25rem] bg-background px-2 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {fr ? "Celles et ceux qui font la recherche" : "The people behind the research"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {fr
            ? "L'equipe animee par le Dr Ratheil Houndji. La liste s'etoffe au fil des travaux."
            : "The team led by Dr Ratheil Houndji. It grows as the work grows."}
        </p>
      </div>

      <div ref={stackRef} className="relative mt-10">
        {MEMBERS.map((m, i) => (
          <div key={m.name} data-card className="sticky top-0 flex min-h-svh items-center justify-center px-2 md:px-4">
            <div
              data-inner
              className="relative w-full max-w-5xl origin-top will-change-transform"
              style={{ top: `${i * STACK_OFFSET}px` }}
            >
              <MemberCard member={m} index={i} fr={fr} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function MemberCard({ member, index, fr }: { member: Member; index: number; fr: boolean }) {
  const number = String(index + 1).padStart(2, "0");
  const accent = member.accent === "blue" ? "text-primary" : "text-accent";
  const ring = member.accent === "blue" ? "ring-primary/40" : "ring-accent/40";
  const initials = member.name
    .replace(/^Dr\s+/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    // Double-bezel : coque externe (bac) + coeur interne (plaque), rayons
    // concentriques, pour un rendu de materiel usine plutot qu'une carte plate.
    <div className="rounded-[1.5rem] bg-secondary/40 p-1.5 ring-1 ring-border">
      <article className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-card p-8 shadow-[inset_0_1px_1px_hsl(0_0%_100%/0.06)] md:p-12">
        <div className="flex items-start justify-between gap-6">
          <span className={`font-display text-sm font-semibold ${accent}`}>{number}</span>
          {member.lead && (
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {fr ? "Animateur de l'equipe" : "Team lead"}
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`Portrait de ${member.name}`}
              width={80}
              height={80}
              className={`h-20 w-20 shrink-0 rounded-full object-cover ring-2 ${ring}`}
            />
          ) : (
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary text-2xl font-semibold ring-2 ${ring}`}
              aria-hidden
            >
              {initials}
            </div>
          )}
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">{member.name}</h3>
            <p className="mt-2 text-muted-foreground">{fr ? member.roleFr : member.roleEn}</p>
            {member.link && (
              <a
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-3 inline-block text-sm underline underline-offset-2 ${accent}`}
              >
                {member.linkLabel}
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

```
