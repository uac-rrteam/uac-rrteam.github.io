import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { EntreeMonogramme } from "@/components/entree/EntreeMonogramme";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* Monte au-dessus du routeur : l'entree ne joue qu'au premier chargement,
          jamais entre deux pages. */}
      <EntreeMonogramme />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
