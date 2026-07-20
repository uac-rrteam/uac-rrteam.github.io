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
