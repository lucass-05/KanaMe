import { useEffect, useState } from 'react';
import type { KanaEntry, KanjiEntry, QuizMode, SourcedEntry } from '../types';
import { useQuizSession } from '../hooks/useQuizSession';
import { QuizHeader } from '../components/QuizHeader';
import { QuizCard } from '../components/QuizCard';
import { ProgressBar } from '../components/ProgressBar';
import { StatsBar } from '../components/StatsBar';
import { TestResults } from '../components/TestResults';

export type QuizPageMode = QuizMode | 'review';

interface ModeConfig {
  title: string;
  subtitle: string;
  accentVar: string;
  placeholder: string;
}

const MODE_CONFIG: Record<QuizPageMode, ModeConfig> = {
  hiragana: {
    title: 'ひらがな',
    subtitle: 'Escribe la lectura en romaji',
    accentVar: 'var(--inkan)',
    placeholder: 'romaji, p. ej. ka',
  },
  katakana: {
    title: 'カタカナ',
    subtitle: 'Escribe la lectura en romaji',
    accentVar: 'var(--ai)',
    placeholder: 'romaji, p. ej. ka',
  },
  kanji: {
    title: '漢字 N5',
    subtitle: 'Escribe cualquier lectura o traducción (ES o EN)',
    accentVar: 'var(--moss)',
    placeholder: 'lectura o significado',
  },
  review: {
    title: '復習 — Repaso',
    subtitle: 'Recorre una vez tus caracteres con más fallos',
    accentVar: 'var(--inkan)',
    placeholder: 'romaji, lectura o significado',
  },
};

interface QuizPageProps {
  mode: QuizPageMode;
  pool: SourcedEntry[];
  onBack: () => void;
}

function getPromptChar(entry: KanaEntry | KanjiEntry): string {
  return 'romaji' in entry ? entry.char : entry.kanji;
}

export function QuizPage({ mode, pool, onBack }: QuizPageProps) {
  const config = MODE_CONFIG[mode];
  const isReview = mode === 'review';

  // El repaso siempre funciona como un recorrido único (como el modo test):
  // tiene principio y fin, y al acertar el carácter sale del almacén de fallos.
  const [isTestMode, setIsTestMode] = useState(isReview);
  const effectiveTestMode = isReview ? true : isTestMode;

  const session = useQuizSession({ pool, isTestMode: effectiveTestMode });

  // Reinicia la sesión limpiamente cada vez que se cambia de modo libre <-> test
  useEffect(() => {
    session.restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveTestMode]);

  if (effectiveTestMode && session.isFinished) {
    return (
      <div className="w-full max-w-md mx-auto">
        <QuizHeader
          title={config.title}
          subtitle={config.subtitle}
          accentVar={config.accentVar}
          isTestMode={effectiveTestMode}
          onToggleTestMode={setIsTestMode}
          onBack={onBack}
          hideTestToggle={isReview}
        />
        <TestResults
          results={session.testResults}
          accentVar={config.accentVar}
          onRestart={session.restart}
          onBackToMenu={onBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <QuizHeader
        title={config.title}
        subtitle={config.subtitle}
        accentVar={config.accentVar}
        isTestMode={effectiveTestMode}
        onToggleTestMode={setIsTestMode}
        onBack={onBack}
        hideTestToggle={isReview}
      />

      <div className="mb-6">
        {effectiveTestMode && session.progress ? (
          <ProgressBar current={session.progress.current} total={session.progress.total} />
        ) : (
          <StatsBar correct={session.correctCount} wrong={session.wrongCount} />
        )}
      </div>

      {session.currentEntry ? (
        <QuizCard
          promptChar={getPromptChar(session.currentEntry)}
          feedback={session.feedback}
          accentVar={config.accentVar}
          placeholder={config.placeholder}
          onSubmit={session.submitAnswer}
          onAdvance={session.advance}
        />
      ) : (
        <p className="text-center" style={{ color: 'var(--sumi-soft)' }}>
          {isReview
            ? 'No tienes caracteres pendientes de repaso. ¡Buen trabajo!'
            : 'No hay datos disponibles para este modo.'}
        </p>
      )}

      {!effectiveTestMode && (
        <button
          onClick={session.restart}
          className="mt-6 mx-auto block font-mono text-xs transition-opacity hover:opacity-70"
          style={{ color: 'var(--sumi-soft)' }}
        >
          Reiniciar contador
        </button>
      )}
    </div>
  );
}