<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  const lines = ['Знать', 'заранее,', 'как вырастет'];
</script>

<Block bind:shown span="xl" tone="plum" label="WheatDDS">
  <div class="wrap" class:on={shown}>
    <h2 class="huge">
      {#each lines as l, i}<span class="line" style:--i={i}><span>{l}</span></span>{/each}
    </h2>
    <div class="side">
      <p>WheatDDS — прогноз роста сортов пшеницы. Проект в разработке.</p>
      <a class="btn gold" href="#top">Наверх ↑</a>
    </div>
  </div>
</Block>

<style>
  .wrap { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; flex-wrap: wrap; min-height: 320px; }
  .huge { font-size: clamp(2.6rem, 8vw, 6.4rem); font-weight: 900; text-transform: uppercase; line-height: .95; }
  .line { display: block; overflow: hidden; }
  .line span { display: inline-block; transform: translateY(105%); transition: transform 1s var(--ease); transition-delay: calc(.2s + var(--i) * .15s); }
  .line:nth-child(2) span { color: var(--gold); }
  .on .line span { transform: none; }
  .side { display: flex; flex-direction: column; gap: 14px; max-width: 260px; opacity: 0; transition: opacity .8s .9s; }
  .on .side { opacity: .9; }
  .side .btn { align-self: flex-start; }
</style>
