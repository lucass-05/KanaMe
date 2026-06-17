import { useState } from 'react';
import type { QuizMode } from './types';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import hiragana from './data/hiragana.json';
import katakana from './data/katakana.json';
import kanji from './data/kanji.json';

export default function App() {
  const [mode, setMode] = useState<QuizMode | null>(null);

  function renderActiveView() {
    switch (mode) {
      case 'hiragana':
        return <QuizPage mode="hiragana" pool={hiragana} onBack={() => setMode(null)} />;
      case 'katakana':
        return <QuizPage mode="katakana" pool={katakana} onBack={() => setMode(null)} />;
      case 'kanji':
        return <QuizPage mode="kanji" pool={kanji} onBack={() => setMode(null)} />;
      default:
        return <HomePage onSelectMode={setMode} />;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:py-16">
      {renderActiveView()}
    </main>
  );
}
