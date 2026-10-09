<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  const phases = ['Сев', 'Всходы', 'Кущение', 'Трубка', 'Колошение', 'Созревание'];
</script>

<Block bind:shown span="m" tone="plum" label="Фазы развития">
  <div class="wrap" class:on={shown}>
    <span class="tag">02 · фазы развития</span>
    <h2>Каждая фаза — с датой</h2>
    <div class="row">
      {#each phases as p, i}
        <div class="ph" style:--i={i} style:--h="{12 + i * 16}%">
          <div class="pot">
            <span class="stem"></span>
            {#if i > 0}<span class="leaf l"></span>{/if}
            {#if i > 1}<span class="leaf r"></span>{/if}
            {#if i > 3}<span class="spike"></span>{/if}
          </div>
          <span class="dot"></span>
          <small>{p}</small>
        </div>
      {/each}
      <span class="track"></span>
    </div>
    <p class="muted">Прогноз показывает, когда сорт войдёт в каждую фазу — от сева до созревания.</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 16px; }
  .tag { align-self: flex-start; color: var(--gold); }
  .row { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; padding-top: 10px; }
  .ph { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .pot { position: relative; width: 100%; height: 150px; }
  .stem { position: absolute; bottom: 0; left: calc(50% - 2px); width: 4px; height: var(--h); max-height: 100%; background: var(--gold); border-radius: 4px;
          transform-origin: bottom; transform: scaleY(0); transition: transform .8s var(--spring); transition-delay: calc(.6s + var(--i) * .18s); }
  .leaf { position: absolute; bottom: calc(var(--h) * .35); width: 22px; height: 10px; background: var(--gold); opacity: .75;
          transform: scale(0); transition: transform .5s var(--spring); transition-delay: calc(1s + var(--i) * .18s); }
  .leaf.l { right: 50%; border-radius: 100% 0 100% 0; transform-origin: right; }
  .leaf.r { left: 50%; bottom: calc(var(--h) * .55); border-radius: 0 100% 0 100%; transform-origin: left; }
  .spike { position: absolute; left: calc(50% - 6px); bottom: calc(var(--h) - 4px); width: 12px; height: 34px; border-radius: 50%; background: var(--gold);
           transform: scale(0); transform-origin: bottom; transition: transform .6s var(--spring); transition-delay: calc(1.2s + var(--i) * .18s); }
  .on .stem, .on .leaf, .on .spike { transform: none; }
  .dot { position: relative; z-index: 1; width: 14px; height: 14px; border-radius: 50%; background: var(--plum); border: 3px solid var(--gold);
         transform: scale(0); transition: transform .4s var(--spring); transition-delay: calc(.3s + var(--i) * .18s); }
  .on .dot { transform: none; }
  .track { position: absolute; left: 8%; right: 8%; top: calc(10px + 150px + 10px + 6px); height: 2px; background: color-mix(in oklab, var(--gold) 60%, transparent);
           transform: scaleX(0); transform-origin: left; transition: transform 1.3s var(--ease) .2s; }
  .on .track { transform: none; }
  small { font-size: .72rem; opacity: .8; text-align: center; }
  @media (max-width: 500px) { small { font-size: .6rem; } .pot { height: 110px; } .track { top: calc(10px + 110px + 10px + 6px); } }
</style>
