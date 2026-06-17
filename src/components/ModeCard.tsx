interface ModeCardProps {
  sampleChar: string;
  label: string;
  description: string;
  accentVar: string;
  count: number;
  onSelect: () => void;
}

export function ModeCard({ sampleChar, label, description, accentVar, count, onSelect }: ModeCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col items-center gap-4 rounded-2xl px-8 py-10 w-full sm:w-64 text-center transition-all hover:-translate-y-1 active:translate-y-0"
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        boxShadow: '0 1px 2px rgba(28, 26, 23, 0.04), 0 12px 24px -12px rgba(28, 26, 23, 0.12)',
      }}
    >
      <span
        className="flex items-center justify-center w-20 h-20 rounded-full font-display"
        style={{
          background: 'var(--washi-deep)',
          color: accentVar,
          fontSize: '2.25rem',
          border: `2px solid ${accentVar}`,
        }}
        aria-hidden="true"
      >
        {sampleChar}
      </span>

      <div>
        <p className="font-display text-xl" style={{ color: 'var(--sumi)' }}>
          {label}
        </p>
        <p className="mt-1 text-sm" style={{ color: 'var(--sumi-soft)' }}>
          {description}
        </p>
      </div>

      <span
        className="font-mono text-xs px-3 py-1 rounded-full"
        style={{ border: `1px solid ${accentVar}`, color: accentVar }}
      >
        {count} caracteres
      </span>
    </button>
  );
}
