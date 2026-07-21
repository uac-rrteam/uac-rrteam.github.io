import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/i18n/lang";

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    const root = stackRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
      const total = cards.length;
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>("[data-inner]");
        if (!inner) return;
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
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="membres" className="mx-2 mt-2 rounded-[1.25rem] bg-background px-2 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {fr ? "Celles et ceux qui font la recherche" : "The people behind the research"}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
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
    <article className="overflow-hidden rounded-[1.25rem] border border-border bg-card p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] md:p-12">
      <div className="flex items-start justify-between gap-6">
        <span className={`font-display text-sm font-semibold ${accent}`}>{number}</span>
        {member.lead && (
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            {fr ? "Animateur de l'equipe" : "Team lead"}
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary text-2xl font-semibold ring-2 ${ring}`}
          aria-hidden
        >
          {initials}
        </div>
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
  );
}
