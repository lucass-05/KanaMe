import type { KanaEntry, KanjiEntry, QuizMode, SourcedEntry } from '../types';
import { getMistakes } from './mistakesStore';

function getEntryKey(entry: KanaEntry | KanjiEntry): string {
  return 'romaji' in entry ? entry.char : entry.kanji;
}

export function withSourceMode(
  entries: (KanaEntry | KanjiEntry)[],
  mode: QuizMode,
): SourcedEntry[] {
  return entries.map((entry) => ({ ...entry, sourceMode: mode }));
}

/**
 * Reconstruye el pool de repaso: para cada fallo guardado en localStorage,
 * busca la entrada completa en los datos del modo correspondiente. Si un
 * carácter ya no existe en los datos (por ejemplo, tras editar el JSON),
 * se omite en silencio.
 */
export function buildReviewPool(datasets: Record<QuizMode, (KanaEntry | KanjiEntry)[]>): SourcedEntry[] {
  const mistakes = getMistakes();
  const pool: SourcedEntry[] = [];

  for (const mistake of mistakes) {
    const dataset = datasets[mistake.mode];
    const found = dataset.find((entry) => getEntryKey(entry) === mistake.key);
    if (found) {
      pool.push({ ...found, sourceMode: mistake.mode });
    }
  }

  return pool;
}
