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
