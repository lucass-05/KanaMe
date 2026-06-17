import type { KanaEntry, KanjiEntry } from '../types';

/**
 * Normaliza una respuesta de usuario o una lectura de referencia para poder
 * compararlas de forma tolerante: minúsculas, sin tildes, sin espacios
 * sobrantes y sin la notación de okurigana entre paréntesis, p. ej.
 * "hito(tsu)" se evalúa también como "hito" y como "hitotsu".
 */
function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // quita diacríticos (á -> a, etc.)
}

/**
 * Expande una lectura con okurigana opcional en sus variantes aceptables.
 * "yo(tsu)" -> ["yo(tsu)", "yo", "yotsu"]
 */
function expandReading(reading: string): string[] {
  const variants = new Set<string>([reading]);
  const match = reading.match(/^(.*)\((.*)\)$/);
  if (match) {
    const [, base, optional] = match;
    variants.add(base);
    variants.add(`${base}${optional}`);
  }
  return Array.from(variants).map(normalize);
}

export function getKanaAcceptedAnswers(entry: KanaEntry): string[] {
  return [normalize(entry.romaji)];
}

export function getKanjiAcceptedAnswers(entry: KanjiEntry): string[] {
  const readings = entry.pronunciaciones.flatMap(expandReading);
  const translations = [normalize(entry.traduccionES), normalize(entry.traduccionEn)];
  return Array.from(new Set([...readings, ...translations]));
}

export function isAnswerCorrect(userInput: string, acceptedAnswers: string[]): boolean {
  const normalizedInput = normalize(userInput);
  if (!normalizedInput) return false;
  return acceptedAnswers.includes(normalizedInput);
}

/** Texto legible para mostrar la solución esperada tras un fallo. */
export function formatExpectedSolution(entry: KanaEntry | KanjiEntry): string {
  if ('romaji' in entry) {
    return entry.romaji;
  }
  return entry.pronunciaciones.join(', ');
}
