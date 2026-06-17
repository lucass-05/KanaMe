interface QuizHeaderProps {
  title: string;
  subtitle: string;
  accentVar: string;
  isTestMode: boolean;
  onToggleTestMode: (testMode: boolean) => void;
  onBack: () => void;
}

export function QuizHeader({
  title,
  subtitle,
  accentVar,
  isTestMode,
  onToggleTestMode,
  onBack,
}: QuizHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <button
        onClick={onBack}
        className="self-start font-mono text-xs tracking-wide flex items-center gap-1.5 transition-opacity hover:opacity-70"
        style={{ color: 'var(--sumi-soft)' }}
        aria-label="Volver al menú principal"
      >
        <span aria-hidden="true">←</span> menú
      </button>

      <div className="text-center">
        <h1 className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--sumi)' }}>
          {title}
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--sumi-soft)' }}>
          {subtitle}
        </p>
      </div>

      <div
        className="inline-flex rounded-full p-1 font-mono text-xs"
        style={{ background: 'var(--washi-deep)', border: '1px solid var(--line)' }}
        role="tablist"
        aria-label="Modo de práctica"
      >
        <button
          role="tab"
          aria-selected={!isTestMode}
          onClick={() => onToggleTestMode(false)}
          className="px-4 py-1.5 rounded-full transition-colors"
          style={{
            background: !isTestMode ? '#fff' : 'transparent',
            color: !isTestMode ? accentVar : 'var(--sumi-soft)',
            boxShadow: !isTestMode ? '0 1px 3px rgba(28,26,23,0.1)' : 'none',
          }}
        >
          Práctica libre
        </button>
        <button
          role="tab"
          aria-selected={isTestMode}
          onClick={() => onToggleTestMode(true)}
          className="px-4 py-1.5 rounded-full transition-colors"
          style={{
            background: isTestMode ? '#fff' : 'transparent',
            color: isTestMode ? accentVar : 'var(--sumi-soft)',
            boxShadow: isTestMode ? '0 1px 3px rgba(28,26,23,0.1)' : 'none',
          }}
        >
          Modo test
        </button>
      </div>
    </div>
  );
}
