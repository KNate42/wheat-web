// Срабатывает один раз, когда элемент попадает в экран
export function inview(node, onShow) {
  const io = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { onShow(); io.disconnect(); } },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}

// Лёгкий 3D-наклон блока и блик за курсором
export function tilt(node) {
  const noMotion = matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches;
  if (noMotion) return;
  const set = (k, v) => node.style.setProperty(k, v);
  const move = e => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    set('--rx', `${(-y * 3).toFixed(2)}deg`);
    set('--ry', `${(x * 3).toFixed(2)}deg`);
    set('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    set('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const leave = () => { set('--rx', '0deg'); set('--ry', '0deg'); };
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', leave);
  return {
    destroy() {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', leave);
    },
  };
}
