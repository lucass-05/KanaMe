interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--washi-deep)', border: '1px solid var(--line)' }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Pregunta ${current} de ${total}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: 'var(--inkan)' }}
        />
      </div>
      <p className="font-mono text-xs mt-2" style={{ color: 'var(--sumi-soft)' }}>
        {current} / {total}
      </p>
    </div>
  );
}
