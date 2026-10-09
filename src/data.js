// Статусы: done | wip | todo, progress 0–100
export const ROADMAP = [
  { title: 'Описание сортов и их параметров', status: 'todo', progress: 0 },
  { title: 'Данные об условиях выращивания', status: 'todo', progress: 0 },
  { title: 'Модель прогноза роста по фазам', status: 'todo', progress: 0 },
  { title: 'Проверка прогноза на реальных данных', status: 'todo', progress: 0 },
  { title: 'Интерфейс: выбор сорта и вывод прогноза', status: 'todo', progress: 0 },
];
export const STATUS = { done: 'готово', wip: 'в работе', todo: 'в планах' };

// Условные сорта для демо — не реальные сорта
export const VARIETIES = [
  { id: 'a', name: 'Сорт A', kind: 'скороспелый', k: 0.88 },
  { id: 'b', name: 'Сорт B', kind: 'среднеспелый', k: 1 },
  { id: 'c', name: 'Сорт C', kind: 'позднеспелый', k: 1.12 },
];
// Условные суммы температур до наступления фазы
export const PHASES = [
  { name: 'Всходы', gdd: 120 },
  { name: 'Кущение', gdd: 400 },
  { name: 'Выход в трубку', gdd: 700 },
  { name: 'Колошение', gdd: 1050 },
  { name: 'Созревание', gdd: 1600 },
];
