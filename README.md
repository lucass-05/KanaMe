# 習字 — Quiz de Hiragana, Katakana y Kanji

Aplicación web para practicar lectura de **hiragana**, **katakana** y **kanji N5**
mediante un quiz interactivo, con modo de práctica libre y modo test con nota final.

## Características

- **Tres modos de práctica**: hiragana, katakana y kanji N5, seleccionables desde
  una pantalla de bienvenida.
- **Datos en JSON**: todos los caracteres (`src/data/hiragana.json`,
  `katakana.json`, `kanji.json`) viven en archivos de datos independientes del
  código, sin sílabas compuestas de dos caracteres (きゃ, しゃ, etc.).
- **Validación flexible para kanji**: en el modo kanji se acepta cualquiera de
  las lecturas en romaji (incluyendo variantes con okurigana, p. ej. `hito(tsu)`
  se acepta como `hito` o `hitotsu`) o la traducción en español o en inglés.
- **Modo práctica libre**: caracteres aleatorios sin límite, con contador de
  aciertos y errores en vivo.
- **Modo test**: recorre todo el conjunto una vez, mostrando barra de progreso y,
  al terminar, una nota sobre 10 junto con el detalle de los fallos y su solución
  correcta.
- **Feedback inmediato**: al fallar, se muestra siempre la respuesta esperada.

## Stack técnico

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

## Build de producción

```bash
npm run build
npm run preview
```

Los archivos estáticos se generan en `dist/`.

## Publicar en GitHub Pages

El proyecto ya está configurado para publicarse en `https://<tu-usuario>.github.io/KanaMe/`
mediante GitHub Actions (`.github/workflows/deploy.yml`).

Pasos en GitHub (solo la primera vez):

1. Crea el repositorio con el nombre exacto **KanaMe** y sube este proyecto
   (`git init`, `git add .`, `git commit -m "Initial commit"`, `git remote add origin ...`,
   `git push -u origin main`).
2. En el repositorio: **Settings → Pages → Build and deployment → Source**, elige
   **GitHub Actions**.
3. Haz cualquier push a la rama `main` (o usa la pestaña **Actions → Deploy a
   GitHub Pages → Run workflow** para lanzarlo manualmente la primera vez).
4. Al cabo de un par de minutos la web estará disponible en
   `https://<tu-usuario>.github.io/KanaMe/`.

> Si en el futuro cambias el nombre del repositorio, actualiza también el valor
> de `base` en `vite.config.ts` para que coincida (`base: '/NuevoNombre/'`).

## Estructura del proyecto

```
src/
├── components/      # Componentes de UI reutilizables
├── data/             # Fuentes de datos JSON (hiragana, katakana, kanji)
├── hooks/             # Lógica de estado del quiz (useQuizSession)
├── pages/             # Pantallas: bienvenida y quiz
├── styles/            # Tokens de diseño y estilos globales
├── utils/             # Normalización y validación de respuestas
└── types.ts           # Tipos compartidos del dominio
```

## Ampliar los datos

Para añadir más caracteres o kanji, basta con editar los archivos JSON en
`src/data/`. Cada entrada de kanji admite varias lecturas:

```json
{
  "kanji": "山",
  "pronunciaciones": ["san", "yama"],
  "traduccionES": "montaña",
  "traduccionEn": "mountain"
}
```
