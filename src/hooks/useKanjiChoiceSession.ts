import { useCallback, useState } from 'react';
import type { KanjiChoiceQuestion, KanjiEntry } from '../types';
import { buildKanjiChoiceQuestion } from '../utils/kanjiChoice.ts';

export type ChoiceFeedbackState =
  | { status: 'idle' }
  | { status: 'answered'; selectedKanji: string; wasCorrect: boolean };

interface UseKanjiChoiceSessionOptions {
  dataset: KanjiEntry[];
}

interface UseKanjiChoiceSessionResult {
  question: KanjiChoiceQuestion | null;
  feedback: ChoiceFeedbackState;
  correctCount: number;
  wrongCount: number;
  selectOption: (kanji: KanjiEntry) => void;
  advance: () => void;
  restart: () => void;
}

/**
 * Gestiona la sesión del modo "Kanji · Elige": práctica libre e infinita,
 * sin nota final ni integración con el almacén de fallos (a diferencia de
 * los demás modos, este vive de forma independiente).
 */
export function useKanjiChoiceSession({
  dataset,
}: UseKanjiChoiceSessionOptions): UseKanjiChoiceSessionResult {
  const [question, setQuestion] = useState<KanjiChoiceQuestion | null>(() =>
    buildKanjiChoiceQuestion(dataset),
  );
  const [feedback, setFeedback] = useState<ChoiceFeedbackState>({ status: 'idle' });
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const selectOption = useCallback(
    (kanji: KanjiEntry) => {
      if (!question || feedback.status !== 'idle') return;
      const wasCorrect = kanji.kanji === question.correctKanji.kanji;

      if (wasCorrect) {
        setCorrectCount((c) => c + 1);
      } else {
        setWrongCount((w) => w + 1);
      }

      setFeedback({ status: 'answered', selectedKanji: kanji.kanji, wasCorrect });
    },
    [question, feedback.status],
  );

  const advance = useCallback(() => {
    setFeedback({ status: 'idle' });
    setQuestion(buildKanjiChoiceQuestion(dataset));
  }, [dataset]);

  const restart = useCallback(() => {
    setCorrectCount(0);
    setWrongCount(0);
    setFeedback({ status: 'idle' });
    setQuestion(buildKanjiChoiceQuestion(dataset));
  }, [dataset]);

  return {
    question,
    feedback,
    correctCount,
    wrongCount,
    selectOption,
    advance,
    restart,
  };
}