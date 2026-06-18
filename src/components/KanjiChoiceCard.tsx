import { useEffect } from 'react';
import type { KanjiChoiceQuestion, KanjiEntry } from '../types';
import type { ChoiceFeedbackState } from '../hooks/useKanjiChoiceSession';
import { BrushUnderline } from './BrushUnderline';

interface KanjiChoiceCardProps {
  question: KanjiChoiceQuestion;
  feedback: ChoiceFeedbackState;
  accentVar: string;
  onSelect: (kanji: KanjiEntry) => void;
  onAdvance: () => void;
}

/** Color de fondo/borde de cada opción según el estado de la respuesta. */
function getOptionStyle(
  kanji: KanjiEntry,
  question: KanjiChoiceQuestion,
  feedback: ChoiceFeedbackState,
  accentVar: string,
): React.CSSProperties {
  if (feedback.status === 'idle') {
    return {
      background: 'var(--washi)',
      border: '1.5px solid var(--line-strong)',
      color: 'var(--sumi)',
    };
  }

  const isCorrectAnswer = kanji.kanji === question.correctKanji.kanji;
  const isSelected = kanji.kanji === feedback.selectedKanji;

  if (isCorrectAnswer) {
    return {
      background: 'var(--moss)',
      border: '1.5px solid var(--moss)',
      color: '#fff',
    };
  }

  if (isSelected && !isCorrectAnswer) {
    return {
      background: 'var(--inkan)',
      border: '1.5px solid var(--inkan)',
      color: '#fff',
    };
  }

  return {
    background: 'var(--washi)',
    border: '1.5px solid var(--line)',
    color: 'var(--sumi-soft)',
    opacity: 0.6,
  };
}

export function KanjiChoiceCard({
  question,
  feedback,
  accentVar,
  onSelect,
  onAdvance,
}: KanjiChoiceCardProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && feedback.status !== 'idle') {
        onAdvance();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback.status, onAdvance]);

  return (
    <div
      className={`rounded-2xl p-8 sm:p-12 text-center transition-shadow ${
        feedback.status === 'answered' && !feedback.wasCorrect ? 'shake' : ''
      }`}
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        boxShadow: '0 1px 2px rgba(28, 26, 23, 0.04), 0 12px 24px -12px rgba(28, 26, 23, 0.12)',
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <p
          key={question.promptTranslation}
          className="font-display fade-up select-none"
          style={{ fontSize: 'clamp(2rem, 7vw, 2.75rem)', lineHeight: 1.2, color: 'var(--sumi)' }}
        >
          {question.promptTranslation}
        </p>
        <BrushUnderline animationKey={question.promptTranslation} colorVar={accentVar} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {question.options.map((option) => (
          <button
            key={option.kanji}
            type="button"
            onClick={() => onSelect(option)}
            disabled={feedback.status !== 'idle'}
            className="font-display rounded-xl py-5 transition-transform active:scale-95 disabled:cursor-default"
            style={{
              fontSize: '2.25rem',
              ...getOptionStyle(option, question, feedback, accentVar),
            }}
          >
            {option.kanji}
          </button>
        ))}
      </div>

      <div className="mt-6 h-7 flex items-center justify-center" aria-live="polite">
        {feedback.status === 'answered' && feedback.wasCorrect && (
          <span className="stamp-in font-medium" style={{ color: 'var(--moss)' }}>
            正解 — Correcto
          </span>
        )}
        {feedback.status === 'answered' && !feedback.wasCorrect && (
          <span className="stamp-in font-medium" style={{ color: 'var(--inkan)' }}>
            Solución: <strong>{question.correctKanji.kanji}</strong>
          </span>
        )}
      </div>

      {feedback.status !== 'idle' && (
        <button
          type="button"
          onClick={onAdvance}
          className="mt-2 px-6 py-2.5 rounded-lg font-medium text-white transition-transform active:scale-95"
          style={{ background: 'var(--sumi)' }}
        >
          Siguiente
        </button>
      )}
    </div>
  );
}