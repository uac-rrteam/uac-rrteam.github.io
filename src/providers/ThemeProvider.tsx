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
