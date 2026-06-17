import { useEffect, useRef, useState } from 'react';
import type { FeedbackState } from '../hooks/useQuizSession';
import { BrushUnderline } from './BrushUnderline';

interface QuizCardProps {
  promptChar: string;
  feedback: FeedbackState;
  accentVar: string;
  placeholder: string;
  onSubmit: (answer: string) => void;
  onAdvance: () => void;
}

export function QuizCard({
  promptChar,
  feedback,
  accentVar,
  placeholder,
  onSubmit,
  onAdvance,
}: QuizCardProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (feedback.status === 'idle') {
      setValue('');
      inputRef.current?.focus();
    }
  }, [feedback.status, promptChar]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (feedback.status !== 'idle') {
      onAdvance();
      return;
    }
    if (!value.trim()) return;
    onSubmit(value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && feedback.status !== 'idle') {
      onAdvance();
    }
  }

  return (
    <div
      className={`rounded-2xl p-8 sm:p-12 text-center transition-shadow ${
        feedback.status === 'wrong' ? 'shake' : ''
      }`}
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        boxShadow: '0 1px 2px rgba(28, 26, 23, 0.04), 0 12px 24px -12px rgba(28, 26, 23, 0.12)',
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <p
          key={promptChar}
          className="font-display fade-up select-none"
          style={{ fontSize: 'clamp(4.5rem, 18vw, 7rem)', lineHeight: 1, color: 'var(--sumi)' }}
        >
          {promptChar}
        </p>
        <BrushUnderline animationKey={promptChar} colorVar={accentVar} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={feedback.status !== 'idle'}
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full max-w-xs text-center text-lg rounded-lg px-4 py-3 outline-none transition-colors disabled:opacity-60"
          style={{
            border: `1.5px solid ${feedback.status === 'idle' ? 'var(--line-strong)' : 'var(--line)'}`,
            background: 'var(--washi)',
            color: 'var(--sumi)',
          }}
        />

        <div className="h-7 flex items-center justify-center" aria-live="polite">
          {feedback.status === 'correct' && (
            <span className="stamp-in font-medium" style={{ color: 'var(--moss)' }}>
              正解 — Correcto
            </span>
          )}
          {feedback.status === 'wrong' && (
            <span className="font-medium" style={{ color: 'var(--inkan)' }}>
              Solución: <strong>{feedback.expected}</strong>
            </span>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg font-medium text-white transition-transform active:scale-95"
          style={{ background: feedback.status === 'idle' ? 'var(--inkan)' : 'var(--sumi)' }}
        >
          {feedback.status === 'idle' ? 'Comprobar' : 'Siguiente'}
        </button>
      </form>
    </div>
  );
}
