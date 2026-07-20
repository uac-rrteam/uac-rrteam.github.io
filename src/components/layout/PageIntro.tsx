import type { ReactNode } from "react";

/** En-tete commun des pages internes : eyebrow, titre, chapeau. */
export function PageIntro({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: ReactNode }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:pt-20">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p>
      )}
      <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h1>
      {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </header>
  );
}
