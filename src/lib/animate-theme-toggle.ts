// Bascule de theme avec revelation circulaire depuis le point de clic,
// via l'API View Transitions. Adaptee d'e-freeshop (implementation Amoussou).
// Navigateurs sans startViewTransition : bascule instantanee via .theme-instant.

type SetThemeFn = (theme: string) => void;

export function animateThemeToggle(
  event: React.MouseEvent | MouseEvent,
  nextTheme: string,
  setTheme: SetThemeFn,
) {
  const root = document.documentElement;
  const start = document.startViewTransition?.bind(document);

  if (!start || prefersReducedMotion()) {
    root.classList.add("theme-instant");
    setTheme(nextTheme);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-instant"));
    });
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = start(() => {
    setTheme(nextTheme);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 1600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
