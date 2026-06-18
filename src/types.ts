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

/** Pregunta del modo "Kanji · Elige": traducción arriba, cuatro kanjis para escoger. */
export interface KanjiChoiceQuestion {
  promptTranslation: string;
  correctKanji: KanjiEntry;
  options: KanjiEntry[];
}

/**
 * Todas las vistas seleccionables desde el menú principal: los modos que
 * pasan por QuizPage (kana/kanji/repaso) más el modo independiente
 * "Kanji · Elige", que tiene su propia página y mecánica.
 */
export type AppView = QuizMode | 'review' | 'kanjiChoice';