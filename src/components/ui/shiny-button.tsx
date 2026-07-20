import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import "./shiny-button.css";

interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Bouton d'action PRINCIPALE. Un seul par ecran : c'est ce qui lui donne son poids. */
export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <button className={cn("shiny-cta", className)} {...props}>
      <span>{children}</span>
    </button>
  );
}
