import type { KanjiEntry } from '../types';
import { useKanjiChoiceSession } from '../hooks/useKanjiChoiceSession';
import { QuizHeader } from '../components/QuizHeader';
import { KanjiChoiceCard } from '../components/KanjiChoiceCard.tsx';
import { StatsBar } from '../components/StatsBar';

const ACCENT_VAR = 'var(--moss)';

interface KanjiChoicePageProps {
  dataset: KanjiEntry[];
  onBack: () => void;
}

/**
 * Modo "Kanji · Elige": se muestra la traducción de un kanji aleatorio y
 * hay que escoger, entre cuatro kanjis, el que corresponde a esa
 * traducción. Solo existe como práctica libre e infinita: no tiene modo
 * test ni se integra con el almacén de fallos de los demás modos.
 */
export function KanjiChoicePage({ dataset, onBack }: KanjiChoicePageProps) {
  const session = useKanjiChoiceSession({ dataset });

  return (
    <div className="w-full max-w-md mx-auto">
      <QuizHeader
        title="漢字 · Elige"
        subtitle="Escoge el kanji que corresponde a la traducción"
        accentVar={ACCENT_VAR}
        isTestMode={false}
        onToggleTestMode={() => {}}
        onBack={onBack}
        hideTestToggle
      />

      <div className="mb-6">
        <StatsBar correct={session.correctCount} wrong={session.wrongCount} />
      </div>

      {session.question ? (
        <KanjiChoiceCard
          question={session.question}
          feedback={session.feedback}
          accentVar={ACCENT_VAR}
          onSelect={session.selectOption}
          onAdvance={session.advance}
        />
      ) : (
        <p className="text-center" style={{ color: 'var(--sumi-soft)' }}>
          No hay suficientes kanjis para generar opciones.
        </p>
      )}

      <button
        onClick={session.restart}
        className="mt-6 mx-auto block font-mono text-xs transition-opacity hover:opacity-70"
        style={{ color: 'var(--sumi-soft)' }}
      >
        Reiniciar contador
      </button>
    </div>
  );
}