import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/i18n/lang";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
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
  return (
    <LangProvider>
      <SmoothScroll>
        <ScrollToTop />
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
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
