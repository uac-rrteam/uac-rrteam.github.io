import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/i18n/lang";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/sections/Hero";
import { DEFAULT_LANG } from "@/i18n/dictionary";

/** Coquille commune a toutes les pages : la langue vient du prefixe d'URL. */
function LangLayout() {
  return (
    <LangProvider>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
    </LangProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<Hero />} />
      </Route>
      {/* Toute URL sans prefixe de langue part sur le francais. */}
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
    </Routes>
  );
}
