import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/i18n/lang";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { EnTete } from "@/components/layout/EnTete";
import { DEFAULT_LANG } from "@/i18n/dictionary";
import { Accueil } from "@/pages/Accueil";
import { Equipe } from "@/pages/Equipe";
import { Profil } from "@/pages/Profil";
import { Recherche } from "@/pages/Recherche";
import { Evenements } from "@/pages/Evenements";
import { Evenement } from "@/pages/Evenement";
import { Projet } from "@/pages/Projet";
import { APropos } from "@/pages/APropos";
/* La seule page qui rende du Markdown, donc la seule à charger le moteur qui
   va avec : quarante-huit kilo-octets compressés que les autres pages n'ont
   aucune raison de payer. Elle arrive en morceau séparé, au moment où on
   l'ouvre. */
const Actualites = lazy(() =>
  import("@/pages/Actualites").then((module) => ({ default: module.Actualites })),
);

/**
 * Coquille commune à toutes les pages : la langue vient du préfixe d'URL.
 *
 * L'entrée n'est pas ici mais au-dessus du routeur, dans main.tsx : elle ne
 * doit jouer qu'au premier chargement, jamais entre deux pages.
 *
 * Le pied de page n'est pas ici non plus. Il se déplie sur toute sa hauteur et
 * conclut le parcours de l'accueil ; sous une page de lecture, il en doublerait
 * la longueur pour ne rien conclure du tout. C'est donc l'accueil qui le porte.
 */
function CoquilleLangue() {
  return (
    <LangProvider>
      <SmoothScroll>
        <ScrollToTop />
        <EnTete />
        <main>
          <Outlet />
        </main>
      </SmoothScroll>
    </LangProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/:lang" element={<CoquilleLangue />}>
        <Route index element={<Accueil />} />
        <Route path="research" element={<Recherche />} />
        <Route path="research/projects/:slug" element={<Projet />} />
        <Route path="events" element={<Evenements />} />
        <Route path="events/:slug" element={<Evenement />} />
        <Route path="about" element={<APropos />} />
        <Route
          path="news"
          element={
            <Suspense fallback={null}>
              <Actualites />
            </Suspense>
          }
        />
        <Route path="people" element={<Equipe />} />
        <Route path="people/:slug" element={<Profil />} />
      </Route>
      {/* Toute URL sans préfixe de langue part sur le français. */}
      <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
    </Routes>
  );
}
