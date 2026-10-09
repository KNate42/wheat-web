<script>
  import { inview, tilt } from './actions.js';

  // span: s=4, m=6, l=8, xl=12 колонок; tone: cream | plum | soft | sand
  let { shown = $bindable(false), span = 'm', tone = 'cream', id, label, children } = $props();
</script>

<!-- наблюдаем внешний слой: у него нет clip-path, иначе IntersectionObserver его «не видит» -->
<section {id} class="block {span}" class:on={shown} aria-label={label}
  use:inview={() => (shown = true)} use:tilt>
  <div class="face {tone}">
    <div class="inner">{@render children?.()}</div>
  </div>
</section>

<style>
  .block {
    --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
    grid-column: span 12;
    transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
    transition: transform .4s var(--ease);
  }
  .face {
    position: relative; height: 100%; border-radius: 28px; overflow: hidden;
    /* блок «разворачивается» снизу вверх */
    clip-path: inset(100% 0 0 0 round 28px);
    transition: clip-path 1.1s var(--ease);
  }
  .on .face { clip-path: inset(0 0 0 0 round 28px); }
  .face::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(500px circle at var(--mx) var(--my), color-mix(in oklab, var(--gold) 16%, transparent), transparent 60%);
    opacity: 0; transition: opacity .3s;
  }
  .block:hover .face::after { opacity: 1; }
  .inner { position: relative; height: 100%; padding: clamp(22px, 3vw, 36px); }

  .cream { background: var(--cream); box-shadow: inset 0 0 0 1.5px var(--line); }
  .sand  { background: var(--cream-2); }
  .soft  { background: var(--plum-soft); }
  .plum  { background: var(--plum); color: var(--cream); }

  @media (min-width: 860px) {
    .s  { grid-column: span 4; }
    .m  { grid-column: span 6; }
    .l  { grid-column: span 8; }
    .xl { grid-column: span 12; }
  }
</style>
