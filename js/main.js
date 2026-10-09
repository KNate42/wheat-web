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

// Бегущая строка
const words = ['данные', 'прогноз', 'риски', 'урожай', 'полив', 'удобрения', 'решения'];
const row = words.map(w => `${w} ✦ `).join('');
document.getElementById('track').textContent = row.repeat(4);

// Поле колосьев
const field = document.getElementById('field');
const cols = ['#ffd75e', '#c9f23d', '#ff9a3c', '#fff2c4', '#4cc9f0'];
const n = Math.min(70, Math.floor(innerWidth / 18));
for (let i = 0; i < n; i++) {
  const s = document.createElement('div');
  s.className = 'stalk';
  const h = 25 + Math.random() * 70;
  s.style.cssText = `left:${(i / n) * 100 + Math.random()}%;height:${h}%;--d:${(2 + Math.random() * 2.5).toFixed(2)}s;--c:${cols[i % cols.length]};animation-delay:${-Math.random() * 3}s`;
  const ear = document.createElement('div');
  ear.className = 'ear';
  for (let k = 0; k < 5; k++) {
    const g = document.createElement('div');
    g.className = 'g';
    g.style.top = `${k * 14 - 6}px`;
    g.style.transform = `rotate(${k % 2 ? 28 : -28}deg)`;
    ear.appendChild(g);
  }
  s.appendChild(ear);
  field.appendChild(s);
}

// Свечение за курсором
const glow = document.getElementById('glow');
addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

// Появление блоков
document.querySelectorAll('article, .flow li, .roadmap li, .result').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Демо-подсказка (упрощённые иллюстративные правила)
const $ = id => document.getElementById(id);
function render() {
  const m = +$('moist').value, t = +$('temp').value, p = $('phase').value;
  $('vm').textContent = m; $('vt').textContent = t;
  let lvl = 'ok', title = 'Условия в норме', why = [];
  if (m < 25) { lvl = 'bad'; title = 'Нужен полив'; why.push(`влажность ${m}% — низкая`); }
  else if (m > 80) { lvl = 'warn'; title = 'Риск переувлажнения и болезней'; why.push(`влажность ${m}% — высокая`); }
  if (t > 32) { lvl = 'bad'; title = 'Тепловой стресс'; why.push(`${t}°C — жарко для культуры`); }
  else if (t < 0 && p !== 'sow') { lvl = lvl === 'bad' ? lvl : 'warn'; title = lvl === 'warn' && title === 'Условия в норме' ? 'Риск заморозков' : title; why.push(`${t}°C — возможны заморозки`); }
  if (p === 'ear' && m < 40 && lvl === 'ok') { lvl = 'warn'; title = 'Критичная фаза: следите за влагой'; why.push('колошение чувствительно к недостатку воды'); }
  if (p === 'ripe' && m > 60 && lvl === 'ok') { lvl = 'warn'; title = 'Планируйте уборку по погоде'; why.push('высокая влажность при созревании'); }
  if (!why.length) why.push('показатели укладываются в типичный диапазон');
  const r = $('result');
  r.className = 'result in ' + (lvl === 'ok' ? '' : lvl);
  const label = { ok: 'Всё хорошо', warn: 'Внимание', bad: 'Действовать' }[lvl];
  r.innerHTML = `<span class="lvl">${label}</span><h3></h3><b>Почему:</b><ul></ul>`;
  r.querySelector('h3').textContent = title;
  why.forEach(w => { const li = document.createElement('li'); li.textContent = w; r.querySelector('ul').appendChild(li); });
}
['moist', 'temp', 'phase'].forEach(id => $(id).addEventListener('input', render));
render();
