# wheat-web

Лендинг WheatDDS (Wheat Decision Support System) — прогноз роста сортов пшеницы. Svelte 5 + Vite.

```bash
npm install
npm run dev      # разработка, http://localhost:5173
npm run build    # сборка в dist/
```

- Блоки лендинга — `src/blocks/`, общая обёртка с анимацией появления — `src/lib/Block.svelte`.
- Статусы roadmap, условные сорта и фазы для демо — `src/data.js`.
- Цвета — `src/app.css` (база `#fffdf5` и `#3b1c4a`).

Деплой: GitHub Pages через `.github/workflows/pages.yml` при пуше — https://knate42.github.io/wheat-web/
