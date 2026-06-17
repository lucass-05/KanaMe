export type QuizMode = 'hiragana' | 'katakana' | 'kanji';

export interface KanaEntry {
  char: string;
  romaji: string;
}

export interface KanjiEntry {
  kanji: string;
  pronunciaciones: string[];
  traduccionES: string;
  traduccionEn: string;
}

export type QuizEntry = KanaEntry | KanjiEntry;

export interface QuizResult {
  prompt: string;
  givenAnswer: string;
  correctAnswer: string;
  wasCorrect: boolean;
}

export interface SessionStats {
  correct: number;
  wrong: number;
}
