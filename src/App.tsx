import { useMemo, useState } from 'react';
import type { AppView, QuizMode } from './types';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { KanjiChoicePage } from './pages/KanjiChoicePage.tsx';
import { withSourceMode, buildReviewPool } from './utils/buildPools';
import hiragana from './data/hiragana.json';
import katakana from './data/katakana.json';
import kanji from './data/kanji.json';

export type { AppView };

const DATASETS: Record<QuizMode, typeof hiragana | typeof kanji> = {
  hiragana,
  katakana,
  kanji,
};

export default function App() {
  const [activeMode, setActiveMode] = useState<AppView | null>(null);

  const hiraganaPool = useMemo(() => withSourceMode(hiragana, 'hiragana'), []);
  const katakanaPool = useMemo(() => withSourceMode(katakana, 'katakana'), []);
  const kanjiPool = useMemo(() => withSourceMode(kanji, 'kanji'), []);

  // Se reconstruye cada vez que se entra al menú o al repaso, para reflejar
  // los fallos más recientes guardados en localStorage.
  const reviewPool = useMemo(
    () => buildReviewPool(DATASETS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeMode],
  );

  function renderActiveView() {
    switch (activeMode) {
      case 'hiragana':
        return <QuizPage mode="hiragana" pool={hiraganaPool} onBack={() => setActiveMode(null)} />;
      case 'katakana':
        return <QuizPage mode="katakana" pool={katakanaPool} onBack={() => setActiveMode(null)} />;
      case 'kanji':
        return <QuizPage mode="kanji" pool={kanjiPool} onBack={() => setActiveMode(null)} />;
      case 'review':
        return <QuizPage mode="review" pool={reviewPool} onBack={() => setActiveMode(null)} />;
      case 'kanjiChoice':
        return <KanjiChoicePage dataset={kanji} onBack={() => setActiveMode(null)} />;
      default:
        return (
          <HomePage
            onSelectMode={setActiveMode}
            reviewCount={reviewPool.length}
          />
        );
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16">
      {renderActiveView()}
    </main>
  );
}