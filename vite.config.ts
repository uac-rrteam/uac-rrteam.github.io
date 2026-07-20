import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { copyFileSync } from "node:fs";

/**
 * Fallback SPA pour GitHub Pages. Le site utilise react-router en mode
 * historique : un lien direct vers /fr/blog n'existe pas comme fichier, et
 * GitHub Pages renvoie sa 404. En copiant index.html vers 404.html, GitHub
 * sert quand meme l'application, qui lit alors l'URL et affiche la bonne page.
 */
function githubPagesSpaFallback(): Plugin {
  return {
    name: "gh-pages-spa-fallback",
    apply: "build",
    closeBundle() {
      const out = path.resolve(__dirname, "dist");
      copyFileSync(path.join(out, "index.html"), path.join(out, "404.html"));
    },
  };
}

// Depot de type "user/org page" (LRSIA-Ratheil-Research-Team.github.io) :
// le site est servi a la racine du domaine, donc base "/".
export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
