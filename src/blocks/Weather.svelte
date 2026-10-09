<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);

  // пример недели — иллюстрация
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const temp = [14, 17, 21, 19, 15, 12, 16];
  const rain = [0, 2, 0, 8, 14, 5, 1];
  const W = 320, H = 160, P = 20;
  const x = i => P + (i * (W - 2 * P)) / (days.length - 1);
  const yT = t => H - 50 - ((t - 10) / 12) * (H - 80);
  const line = temp.map((t, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${yT(t).toFixed(1)}`).join(' ');
</script>

<Block bind:shown span="m" tone="cream" label="Условия сезона">
  <div class="wrap" class:on={shown}>
    <span class="tag">03 · условия сезона</span>
    <h2>Прогноз учитывает условия</h2>
    <svg viewBox="0 0 {W} {H}" role="img" aria-label="Пример: температура и осадки за неделю">
      {#each rain as r, i}
        <rect class="bar" style:--d="{0.2 + i * 0.08}s" x={x(i) - 9} y={H - 26 - r * 3} width="18" height={r * 3 + 0.01} rx="4" />
      {/each}
      <path class="t" pathLength="1" d={line} />
      {#each temp as t, i}
        <g class="pt" style:--d="{0.9 + i * 0.1}s">
          <circle cx={x(i)} cy={yT(t)} r="5" />
          <text x={x(i)} y={yT(t) - 12}>{t}°</text>
        </g>
        <text class="day" x={x(i)} y={H - 6}>{days[i]}</text>
      {/each}
    </svg>
    <p class="muted">Рост зависит от погоды: например, от температуры и осадков.</p>
    <p class="muted small"><i class="k gold"></i>температура <i class="k plum"></i>осадки, мм · пример данных</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 14px; }
  svg { width: 100%; height: auto; overflow: visible; }
  .bar { fill: var(--plum-soft); stroke: var(--plum-2); stroke-width: 1; transform-box: fill-box; transform-origin: bottom; transform: scaleY(0); transition: transform .7s var(--spring) var(--d); }
  .on .bar { transform: none; }
  .t { fill: none; stroke: var(--gold); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.4s var(--ease) .5s; }
  .on .t { stroke-dashoffset: 0; }
  .pt { opacity: 0; transform: translateY(6px); transition: all .4s var(--ease) var(--d); }
  .on .pt { opacity: 1; transform: none; }
  .pt circle { fill: var(--cream); stroke: var(--gold); stroke-width: 3; }
  text { font: 700 11px 'Manrope', sans-serif; fill: var(--plum); text-anchor: middle; }
  .day { opacity: .6; }
  .small { font-size: .85rem; }
  .k { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin: 0 4px 0 10px; vertical-align: middle; }
  .k:first-child { margin-left: 0; }
  .k.gold { background: var(--gold); } .k.plum { background: var(--plum-soft); border: 1px solid var(--plum-2); }
</style>
