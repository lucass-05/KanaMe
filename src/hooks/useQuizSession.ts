import { useCallback, useMemo, useState } from 'react';
import type { KanaEntry, KanjiEntry, QuizResult } from '../types';
import { shuffle } from '../utils/shuffle';
import {
  formatExpectedSolution,
  getKanaAcceptedAnswers,
  getKanjiAcceptedAnswers,
  isAnswerCorrect,
} from '../utils/answerMatching';

type Entry = KanaEntry | KanjiEntry;

export type FeedbackState =
  | { status: 'idle' }
  | { status: 'correct' }
  | { status: 'wrong'; expected: string };

interface UseQuizSessionOptions {
  pool: Entry[];
  isTestMode: boolean;
}

interface UseQuizSessionResult {
  currentEntry: Entry | null;
  feedback: FeedbackState;
  correctCount: number;
  wrongCount: number;
  progress: { current: number; total: number } | null;
  isFinished: boolean;
  testResults: QuizResult[];
  submitAnswer: (answer: string) => void;
  advance: () => void;
  restart: () => void;
}

function getAcceptedAnswers(entry: Entry): string[] {
  return 'romaji' in entry ? getKanaAcceptedAnswers(entry) : getKanjiAcceptedAnswers(entry);
}

function getPromptLabel(entry: Entry): string {
  return 'romaji' in entry ? entry.char : entry.kanji;
}

/**
 * Gestiona una sesión de quiz, tanto en modo libre (infinito, sin
 * puntuación final) como en modo test (recorre el pool una vez y arroja
 * una nota final con el detalle de fallos).
 */
export function useQuizSession({ pool, isTestMode }: UseQuizSessionOptions): UseQuizSessionResult {
  const [order, setOrder] = useState<Entry[]>(() => shuffle(pool));
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>({ status: 'idle' });
  const [testResults, setTestResults] = useState<QuizResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentEntry = order[index] ?? null;

  const pickNextFreeEntry = useCallback(() => {
    if (pool.length === 0) return;
    const nextIndex = Math.floor(Math.random() * pool.length);
    setOrder((prev) => {
      const next = [...prev];
      next[0] = pool[nextIndex];
      return next;
    });
    setIndex(0);
  }, [pool]);

  const submitAnswer = useCallback(
    (rawAnswer: string) => {
      if (!currentEntry || feedback.status !== 'idle') return;
      const accepted = getAcceptedAnswers(currentEntry);
      const correct = isAnswerCorrect(rawAnswer, accepted);
      const expected = formatExpectedSolution(currentEntry);

      if (correct) {
        setCorrectCount((c) => c + 1);
        setFeedback({ status: 'correct' });
      } else {
        setWrongCount((w) => w + 1);
        setFeedback({ status: 'wrong', expected });
      }

      if (isTestMode) {
        setTestResults((prev) => [
          ...prev,
          {
            prompt: getPromptLabel(currentEntry),
            givenAnswer: rawAnswer.trim(),
            correctAnswer: expected,
            wasCorrect: correct,
          },
        ]);
      }
    },
    [currentEntry, feedback.status, isTestMode],
  );

  const advance = useCallback(() => {
    setFeedback({ status: 'idle' });

    if (isTestMode) {
      if (index + 1 >= order.length) {
        setIsFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    } else {
      pickNextFreeEntry();
    }
  }, [index, isTestMode, order.length, pickNextFreeEntry]);

  const restart = useCallback(() => {
    setOrder(shuffle(pool));
    setIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setFeedback({ status: 'idle' });
    setTestResults([]);
    setIsFinished(false);
  }, [pool]);

  const progress = useMemo(() => {
    if (!isTestMode) return null;
    return { current: index + 1, total: order.length };
  }, [index, isTestMode, order.length]);

  return {
    currentEntry,
    feedback,
    correctCount,
    wrongCount,
    progress,
    isFinished,
    testResults,
    submitAnswer,
    advance,
    restart,
  };
}
