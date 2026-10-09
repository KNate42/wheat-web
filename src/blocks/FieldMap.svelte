<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);

  const N = 9;
  // детерминированный «рельеф» поля — иллюстрация, не реальные данные
  const cells = Array.from({ length: N * N }, (_, k) => {
    const r = Math.floor(k / N), c = k % N;
    const v = 0.5 + 0.28 * Math.sin(r * 0.7 + 1) * Math.cos(c * 0.55) + 0.18 * Math.sin((r + c) * 0.9);
    return { r, c, v: Math.max(0.05, Math.min(1, v)) };
  });
  let hover = $state(null);
</script>

<Block bind:shown span="s" tone="sand" label="Учёт полей">
  <div class="wrap" class:on={shown}>
    <span class="tag">01 · поля</span>
    <div class="grid" style:--n={N} role="img" aria-label="Иллюстрация карты состояния поля">
      {#each cells as cell}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span class="cell" style:--d="{(cell.r + cell.c) * 45}ms" style:--v="{Math.round(cell.v * 100)}%"
          onpointerenter={() => (hover = cell)} onpointerleave={() => (hover = null)}></span>
      {/each}
      <span class="scan"></span>
    </div>
    <h2>Каждое поле — в&nbsp;данных</h2>
    <p class="muted">Участки, сорта, севооборот и история обработок. {#if hover}<b>Ячейка {hover.r + 1}:{hover.c + 1} — индекс {hover.v.toFixed(2)}</b>{:else}Наведи на карту.{/if}</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 16px; height: 100%; }
  .grid { position: relative; display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 4px; aspect-ratio: 1; overflow: hidden; border-radius: 14px; }
  .cell {
    border-radius: 5px; background: color-mix(in oklab, var(--gold) var(--v), var(--plum));
    transform: scale(0) rotate(45deg); transition: transform .55s var(--spring), filter .2s; transition-delay: var(--d);
  }
  .on .cell { transform: none; }
  .cell:hover { transform: scale(1.25) !important; transition-delay: 0s; filter: brightness(1.15); z-index: 1; }
  .scan { position: absolute; left: 0; right: 0; height: 30%; top: -30%; pointer-events: none;
          background: linear-gradient(to bottom, transparent, color-mix(in oklab, var(--cream) 55%, transparent), transparent); }
  .on .scan { animation: scan 2.6s var(--ease) 1.1s 1 both; }
  @keyframes scan { to { top: 100%; } }
</style>
