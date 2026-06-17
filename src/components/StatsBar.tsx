interface StatsBarProps {
  correct: number;
  wrong: number;
}

export function StatsBar({ correct, wrong }: StatsBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 font-mono text-sm">
      <span style={{ color: 'var(--moss)' }}>
        Aciertos <strong className="text-base">{correct}</strong>
      </span>
      <span aria-hidden="true" style={{ color: 'var(--line-strong)' }}>
        /
      </span>
      <span style={{ color: 'var(--inkan)' }}>
        Errores <strong className="text-base">{wrong}</strong>
      </span>
    </div>
  );
}
