<script>
  import Block from '../lib/Block.svelte';
  import { VARIETIES } from '../data.js';
  let shown = $state(false);
  let active = $state(null);

  const W = 260, H = 200, P = 14;
  const colors = ['var(--gold)', 'var(--plum)', 'color-mix(in oklab, var(--plum) 45%, var(--cream))'];
  // логистическая кривая роста; у позднего сорта она сдвинута вправо
  const curve = k => Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    const y = 1 / (1 + Math.exp(-11 * (t - 0.42 * k)));
    return `${i ? 'L' : 'M'}${(P + t * (W - 2 * P)).toFixed(1)} ${(H - P - y * (H - 2 * P)).toFixed(1)}`;
  }).join(' ');
</script>

<Block bind:shown span="s" tone="soft" label="Сорта">
  <div class="wrap" class:on={shown}>
    <span class="tag">01 · сорта</span>
    <svg viewBox="0 0 {W} {H}" role="img" aria-label="Условные кривые роста трёх сортов">
      {#each [0.25, 0.5, 0.75] as g}<line class="grid" x1={P} x2={W - P} y1={H - P - g * (H - 2 * P)} y2={H - P - g * (H - 2 * P)} />{/each}
      {#each VARIETIES as v, i}
        <path class="c" class:dim={active && active !== v.id} style:--d="{0.3 + i * 0.35}s" style:stroke={colors[i]} pathLength="1" d={curve(v.k)} />
      {/each}
    </svg>
    <div class="legend">
      {#each VARIETIES as v, i}
        <button style:--d="{1 + i * 0.12}s" style:--c={colors[i]} onpointerenter={() => (active = v.id)} onpointerleave={() => (active = null)} onfocus={() => (active = v.id)} onblur={() => (active = null)}>
          <i></i>{v.name}<small>{v.kind}</small>
        </button>
      {/each}
    </div>
    <h2>У каждого сорта — свой темп</h2>
    <p class="muted">Прогноз строится под конкретный сорт, а&nbsp;не «пшеницу вообще». Кривые условные.</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 16px; }
    svg { width: 100%; height: auto; }
  .grid { stroke: color-mix(in oklab, var(--plum) 18%, transparent); stroke-dasharray: 3 5; }
  .c { fill: none; stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.3s var(--ease), opacity .25s; transition-delay: var(--d), 0s; }
  .on .c { stroke-dashoffset: 0; }
  .c.dim { opacity: .15; }
  .legend { display: flex; flex-direction: column; gap: 6px; }
  button { all: unset; cursor: pointer; display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: .92rem; padding: 4px 8px; border-radius: 10px;
           opacity: 0; transform: translateX(-14px); transition: opacity .4s, transform .5s var(--spring), background .2s; transition-delay: var(--d), var(--d), 0s; }
  .on button { opacity: 1; transform: none; }
  button:hover, button:focus-visible { background: var(--cream); }
  button i { width: 18px; height: 4px; border-radius: 4px; background: var(--c); }
  button small { margin-left: auto; font-weight: 500; opacity: .65; }
</style>
