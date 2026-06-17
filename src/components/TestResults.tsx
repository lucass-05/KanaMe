import type { QuizResult } from '../types';

interface TestResultsProps {
  results: QuizResult[];
  accentVar: string;
  onRestart: () => void;
  onBackToMenu: () => void;
}

export function TestResults({ results, accentVar, onRestart, onBackToMenu }: TestResultsProps) {
  const total = results.length;
  const correctCount = results.filter((r) => r.wasCorrect).length;
  const grade = total > 0 ? ((correctCount / total) * 10).toFixed(2) : '0.00';
  const failed = results.filter((r) => !r.wasCorrect);

  return (
    <div
      className="rounded-2xl p-8 sm:p-10 fade-up"
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        boxShadow: '0 1px 2px rgba(28, 26, 23, 0.04), 0 12px 24px -12px rgba(28, 26, 23, 0.12)',
      }}
    >
      <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--sumi-soft)' }}>
        Resultado del test
      </p>
      <p className="font-display mt-2" style={{ fontSize: '3.5rem', color: accentVar, lineHeight: 1 }}>
        {grade}
        <span className="text-2xl" style={{ color: 'var(--sumi-soft)' }}>
          /10
        </span>
      </p>
      <p className="mt-1 text-sm" style={{ color: 'var(--sumi-soft)' }}>
        {correctCount} de {total} correctas
      </p>

      {failed.length > 0 ? (
        <div className="mt-8 text-left">
          <p className="font-medium text-sm mb-3" style={{ color: 'var(--inkan)' }}>
            Repasa estos fallos
          </p>
          <ul className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            {failed.map((r, i) => (
              <li
                key={`${r.prompt}-${i}`}
                className="flex items-center justify-between gap-4 rounded-lg px-4 py-2.5 text-sm"
                style={{ background: 'var(--washi)', border: '1px solid var(--line)' }}
              >
                <span className="font-display text-2xl" style={{ color: 'var(--sumi)' }}>
                  {r.prompt}
                </span>
                <span className="font-mono text-xs text-right" style={{ color: 'var(--sumi-soft)' }}>
                  tu respuesta: <span style={{ color: 'var(--inkan)' }}>{r.givenAnswer || '—'}</span>
                  <br />
                  correcta: <strong style={{ color: 'var(--moss)' }}>{r.correctAnswer}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-8 font-medium" style={{ color: 'var(--moss)' }}>
          Sin fallos. Test perfecto.
        </p>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={onRestart}
          className="px-5 py-2.5 rounded-lg font-medium text-white transition-transform active:scale-95"
          style={{ background: 'var(--inkan)' }}
        >
          Repetir test
        </button>
        <button
          onClick={onBackToMenu}
          className="px-5 py-2.5 rounded-lg font-medium transition-transform active:scale-95"
          style={{ background: 'transparent', border: '1px solid var(--line-strong)', color: 'var(--sumi)' }}
        >
          Volver al menú
        </button>
      </div>
    </div>
  );
}
