<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  const text = 'Каждая рекомендация показывает *данные*, на которых построена, *логику*, которая её дала, и *уверенность*. Решение — всегда за агрономом.';
  const words = text.split(' ').map(w => ({ w: w.replaceAll('*', ''), key: w.includes('*') }));
</script>

<Block bind:shown span="m" tone="cream" label="Объяснимость">
  <div class="wrap" class:on={shown}>
    <span class="tag">06 · объяснимость</span>
    <p class="big">
      {#each words as x, i}
        <span class="w" class:key={x.key} style:--i={i}>{x.w}</span>{' '}
      {/each}
    </p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 22px; justify-content: space-between; height: 100%; }
  .tag { align-self: flex-start; }
  .big { font: 700 clamp(1.3rem, 2.5vw, 1.9rem)/1.3 var(--display); }
  .w { display: inline-block; filter: blur(10px); opacity: .08; transform: translateY(.3em);
       transition: filter .7s var(--ease), opacity .7s, transform .7s var(--ease); transition-delay: calc(.2s + var(--i) * 70ms); }
  .on .w { filter: none; opacity: 1; transform: none; }
  .key { background: linear-gradient(var(--gold), var(--gold)) no-repeat 0 92% / 0% 30%; transition: filter .7s, opacity .7s, transform .7s, background-size .6s var(--ease); }
  .on .key { background-size: 100% 30%; transition-delay: calc(.2s + var(--i) * 70ms), calc(.2s + var(--i) * 70ms), calc(.2s + var(--i) * 70ms), 1.9s; }
</style>
