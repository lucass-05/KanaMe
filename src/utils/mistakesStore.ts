import type { MistakeRecord, QuizMode } from '../types';

const STORAGE_KEY = 'kanaMe:mistakes:v1';

function readAll(): MistakeRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // localStorage no disponible (modo incógnito restringido, navegador
    // antiguo, almacenamiento deshabilitado) o datos corruptos: degradamos
    // a "sin historial" en vez de romper la app.
    return [];
  }
}

function writeAll(records: MistakeRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Si no se puede escribir (cuota llena, almacenamiento bloqueado),
    // simplemente no persistimos; el quiz sigue funcionando en memoria.
  }
}

function recordKeyOf(mode: QuizMode, charKey: string): string {
  return `${mode}:${charKey}`;
}

/** Incrementa (o crea) el contador de fallos para un carácter en un modo dado. */
export function registerMistake(mode: QuizMode, charKey: string): void {
  const records = readAll();
  const id = recordKeyOf(mode, charKey);
  const existing = records.find((r) => recordKeyOf(r.mode, r.key) === id);

  if (existing) {
    existing.timesWrong += 1;
    existing.lastWrongAt = Date.now();
  } else {
    records.push({ key: charKey, mode, timesWrong: 1, lastWrongAt: Date.now() });
  }

  writeAll(records);
}

/** Elimina el registro de un carácter, por ejemplo al volver a acertarlo. */
export function clearMistake(mode: QuizMode, charKey: string): void {
  const records = readAll().filter((r) => recordKeyOf(r.mode, r.key) !== recordKeyOf(mode, charKey));
  writeAll(records);
}

/** Devuelve todos los fallos guardados, opcionalmente filtrados por modo. */
export function getMistakes(mode?: QuizMode): MistakeRecord[] {
  const records = readAll();
  return mode ? records.filter((r) => r.mode === mode) : records;
}

/** Número total de caracteres distintos pendientes de repaso. */
export function getMistakeCount(): number {
  return readAll().length;
}

/** Borra todo el historial de fallos. */
export function clearAllMistakes(): void {
  writeAll([]);
}
