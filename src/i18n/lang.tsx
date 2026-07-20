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
