import "./FiletSegmente.css";

interface Props {
  total: number;
  rang: number;
  /** Sur fond nuit, les segments s'écrivent en clair. */
  ton?: "clair" | "sombre";
}

/**
 * Le filet, coupé en autant de segments qu'il y a de contenus.
 *
 * Le site de référence ne trace jamais une ligne continue sous ses chiffres :
 * il la coupe, et chaque segment dit une position dans la série. C'est un
 * repère de lecture, pas une bordure, et c'est ce qui évite d'empiler des
 * traits qui ne disent rien.
 */
export function FiletSegmente({ total, rang, ton = "sombre" }: Props) {
  const segments = [];
  for (let position = 0; position < total; position += 1) {
    segments.push(
      <span key={position} data-vu={position <= rang ? "" : undefined} />,
    );
  }

  return (
    <div className={`fil fil-${ton}`} aria-hidden="true">
      {segments}
    </div>
  );
}
