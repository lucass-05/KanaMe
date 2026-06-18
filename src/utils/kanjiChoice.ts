import type { KanjiChoiceQuestion, KanjiEntry } from '../types';
import { shuffle } from './shuffle';

const OPTIONS_COUNT = 4;

/**
 * Construye una pregunta del modo "Kanji · Elige": escoge un kanji al azar
 * como respuesta correcta, le añade tres distractores distintos del mismo
 * pool y mezcla el orden de las cuatro opciones. Requiere al menos
 * `OPTIONS_COUNT` entradas en el dataset para poder formar la pregunta.
 */
export function buildKanjiChoiceQuestion(dataset: KanjiEntry[]): KanjiChoiceQuestion | null {
  if (dataset.length < OPTIONS_COUNT) return null;

  const shuffled = shuffle(dataset);
  const correctKanji = shuffled[0];
  const distractors = shuffled.slice(1, OPTIONS_COUNT);
  const options = shuffle([correctKanji, ...distractors]);

  return {
    promptTranslation: correctKanji.traduccionES,
    correctKanji,
    options,
  };
}