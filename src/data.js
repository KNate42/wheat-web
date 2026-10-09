// Статусы: done | wip | todo, progress 0–100
export const ROADMAP = [
  { title: 'Модель данных: поля, культуры, сорта', status: 'wip', progress: 45 },
  { title: 'Импорт погодных и почвенных данных', status: 'wip', progress: 30 },
  { title: 'Прогноз урожайности', status: 'todo', progress: 0 },
  { title: 'Оценка рисков болезней и вредителей', status: 'todo', progress: 0 },
  { title: 'Рекомендации по удобрениям и поливу', status: 'todo', progress: 0 },
  { title: 'Объяснение рекомендаций', status: 'todo', progress: 0 },
];
export const STATUS = { done: 'готово', wip: 'в работе', todo: 'в планах' };
