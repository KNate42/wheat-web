// Статусы: done | wip | todo
const ROADMAP = [
  { title: 'Модель данных: поля, культуры, сорта', status: 'wip' },
  { title: 'Импорт погодных и почвенных данных', status: 'wip' },
  { title: 'Прогноз урожайности', status: 'todo' },
  { title: 'Оценка рисков болезней и вредителей', status: 'todo' },
  { title: 'Рекомендации по удобрениям и поливу', status: 'todo' },
  { title: 'Объяснение рекомендаций', status: 'todo' },
];
const LABEL = { done: 'готово', wip: 'в работе', todo: 'в планах' };

const list = document.getElementById('roadmap-list');
for (const r of ROADMAP) {
  const li = document.createElement('li');
  li.className = r.status;
  li.innerHTML = '<span></span><span class="st"></span>';
  li.firstChild.textContent = r.title;
  li.lastChild.textContent = LABEL[r.status];
  list.appendChild(li);
}

document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
  const text = document.getElementById(b.dataset.target).innerText;
  try { await navigator.clipboard.writeText(text); b.textContent = 'Скопировано'; }
  catch { b.textContent = 'Не вышло'; }
  setTimeout(() => (b.textContent = 'Копировать'), 1500);
}));

const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch {}
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
});
