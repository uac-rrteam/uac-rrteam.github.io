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
