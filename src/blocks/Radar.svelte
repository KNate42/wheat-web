<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  // примеры угроз для пшеницы — для иллюстрации
  const blips = [
    { x: 64, y: 30, name: 'ржавчина', d: 1.0 },
    { x: 28, y: 62, name: 'септориоз', d: 1.6 },
    { x: 70, y: 72, name: 'тля', d: 2.2 },
  ];
</script>

<Block bind:shown span="s" tone="soft" label="Риски болезней и вредителей">
  <div class="wrap" class:on={shown}>
    <span class="tag">04 · риски</span>
    <div class="radar" role="img" aria-label="Радар рисков: пример предупреждений">
      <span class="ring" style:--s=".33"></span><span class="ring" style:--s=".66"></span><span class="ring" style:--s="1"></span>
      <span class="sweep"></span>
      {#each blips as b}
        <span class="blip" style:left="{b.x}%" style:top="{b.y}%" style:--d="{b.d}s"><em>{b.name}</em></span>
      {/each}
    </div>
    <h2>Риск — заранее, а&nbsp;не&nbsp;по факту</h2>
    <p class="muted">Предупреждения о болезнях и вредителях и окна для обработок.</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 16px; }
  .radar { position: relative; aspect-ratio: 1; border-radius: 50%; background: var(--plum); overflow: hidden;
           transform: scale(.2) rotate(-90deg); opacity: 0; transition: transform 1s var(--spring), opacity .4s; }
  .on .radar { transform: none; opacity: 1; }
  .ring { position: absolute; inset: calc((1 - var(--s)) * 50%); border-radius: 50%; border: 1px solid color-mix(in oklab, var(--cream) 22%, transparent); }
  .sweep { position: absolute; inset: 0; border-radius: 50%;
           background: conic-gradient(from 0deg, color-mix(in oklab, var(--gold) 55%, transparent), transparent 70deg); }
  .on .sweep { animation: spin 3.2s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .blip { position: absolute; width: 12px; height: 12px; margin: -6px; border-radius: 50%; background: var(--gold); transform: scale(0); }
  .on .blip { animation: pop .5s var(--spring) var(--d) both; }
  .blip::after { content: ''; position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--gold); }
  .on .blip::after { animation: ping 1.8s ease-out calc(var(--d) + .3s) infinite; }
  .blip em { position: absolute; left: 16px; top: -4px; font: 700 .7rem 'Manrope'; font-style: normal; color: var(--cream); white-space: nowrap; }
  @keyframes pop { to { transform: scale(1); } }
  @keyframes ping { from { transform: scale(1); opacity: 1; } to { transform: scale(3.2); opacity: 0; } }
</style>
