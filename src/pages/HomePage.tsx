import type { QuizPageMode } from './QuizPage';
import { ModeCard } from '../components/ModeCard';
import hiragana from '../data/hiragana.json';
import katakana from '../data/katakana.json';
import kanji from '../data/kanji.json';

interface HomePageProps {
  onSelectMode: (mode: QuizPageMode) => void;
  reviewCount: number;
}

export function HomePage({ onSelectMode, reviewCount }: HomePageProps) {
  const hasMistakes = reviewCount > 0;

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--inkan)' }}>
        KanaMe - Aprende japonés!
      </p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl" style={{ color: 'var(--sumi)' }}>
        Quiz de japonés
      </h1>
      <p className="mt-3 max-w-md mx-auto" style={{ color: 'var(--sumi-soft)' }}>
        Elige qué quieres practicar. Cada modo tiene su propia práctica libre y un modo test con
        nota final.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <ModeCard
          sampleChar="あ"
          label="Hiragana"
          description="Sílabas básicas del japonés"
          accentVar="var(--inkan)"
          count={hiragana.length}
          onSelect={() => onSelectMode('hiragana')}
        />
        <ModeCard
          sampleChar="ア"
          label="Katakana"
          description="Sílabas para palabras extranjeras"
          accentVar="var(--ai)"
          count={katakana.length}
          onSelect={() => onSelectMode('katakana')}
        />
        <ModeCard
          sampleChar="一"
          label="Kanji N5"
          description="Caracteres del nivel inicial JLPT"
          accentVar="var(--moss)"
          count={kanji.length}
          onSelect={() => onSelectMode('kanji')}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => hasMistakes && onSelectMode('review')}
          disabled={!hasMistakes}
          className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-mono text-sm transition-opacity disabled:cursor-default disabled:opacity-50 hover:opacity-80"
          style={{
            border: '1px solid var(--line-strong)',
            color: 'var(--sumi)',
            background: '#fff',
          }}
        >
          <span aria-hidden="true" style={{ color: 'var(--inkan)' }}>
            復
          </span>
          {hasMistakes
            ? `Repasar fallos (${reviewCount})`
            : 'Sin fallos pendientes de repasar'}
        </button>
      </div>
    </div>
  );
}