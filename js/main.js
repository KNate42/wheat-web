// Статусы: done | wip | todo
const ROADMAP = [
  { title: 'DomainParticipant и базовые сущности', status: 'wip' },
  { title: 'Автообнаружение участников (Discovery)', status: 'wip' },
  { title: 'Транспорт UDP', status: 'todo' },
  { title: 'Транспорт shared memory', status: 'todo' },
  { title: 'QoS: reliability, durability, history', status: 'todo' },
  { title: 'Генерация типов из IDL', status: 'todo' },
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
