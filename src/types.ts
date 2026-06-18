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

/** Una entrada de quiz junto con el modo al que pertenece originalmente. */
export type SourcedEntry = (KanaEntry | KanjiEntry) & { sourceMode: QuizMode };


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

/** Registro de un carácter fallado, persistido en localStorage. */
export interface MistakeRecord {
  /** Identificador estable: el propio carácter o kanji. */
  key: string;
  mode: QuizMode;
  timesWrong: number;
  lastWrongAt: number;
}