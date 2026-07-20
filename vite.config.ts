import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Depot de type "user/org page" (LRSIA-Ratheil-Research-Team.github.io) :
// le site est servi a la racine du domaine, donc base "/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
