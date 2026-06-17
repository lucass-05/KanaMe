interface BrushUnderlineProps {
  /** Cambia en cada nuevo carácter para forzar el reinicio de la animación */
  animationKey: string;
  colorVar?: string;
}

/**
 * Trazo de pincel estilizado, como el remate de un kanji escrito a mano.
 * Se "dibuja" cada vez que aparece un carácter nuevo.
 */
export function BrushUnderline({ animationKey, colorVar = 'var(--inkan)' }: BrushUnderlineProps) {
  return (
    <svg
      key={animationKey}
      viewBox="0 0 220 28"
      className="w-32 sm:w-40"
      aria-hidden="true"
    >
      <path
        d="M8 14 C 40 22, 80 4, 120 12 C 150 18, 180 8, 212 14"
        fill="none"
        stroke={colorVar}
        strokeWidth="4"
        strokeLinecap="round"
        className="brush-stroke"
      />
    </svg>
  );
}
