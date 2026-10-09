<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  const cards = [
    { k: 'Полив', t: 'Отложить на 2 дня', why: 'прогноз осадков, влажность почвы в норме' },
    { k: 'Обработка', t: 'В окно без дождя', why: 'риск смыва препарата при осадках' },
    { k: 'Уборка', t: 'Планировать по прогнозу', why: 'зерно близко к спелости, впереди дожди' },
  ];
</script>

<Block bind:shown span="l" tone="sand" label="Рекомендации">
  <div class="wrap" class:on={shown}>
    <div class="text">
      <span class="tag">05 · рекомендации</span>
      <h2>Не цифры, а&nbsp;конкретные действия</h2>
      <p class="muted">Удобрения, полив, обработки, уборка. Каждая карточка — что делать и почему. Примеры ниже — иллюстрация.</p>
    </div>
    <div class="deck">
      {#each cards as c, i}
        <article class="card" style:--i={i}>
          <small>{c.k}</small>
          <h3>{c.t}</h3>
          <p><b>Почему:</b> {c.why}</p>
        </article>
      {/each}
    </div>
  </div>
</Block>

<style>
  .wrap { display: grid; grid-template-columns: 1fr 1.2fr; gap: 28px; align-items: center; min-height: 300px; }
  .text { display: flex; flex-direction: column; gap: 14px; }
  .tag { align-self: flex-start; }
  .deck { position: relative; height: 290px; perspective: 900px; }
  .card {
    position: absolute; left: 50%; top: 50%; width: min(270px, 80%); padding: 20px; border-radius: 20px;
    background: var(--cream); border: 1.5px solid var(--line); box-shadow: 0 20px 40px -24px var(--plum);
    --fan: calc((var(--i) - 1) * 9deg);
    transform: translate(-50%, -160%) rotateX(80deg) rotate(calc(var(--fan) * 3));
    opacity: 0;
    transition: transform .9s var(--spring), opacity .4s, box-shadow .3s;
    transition-delay: calc(.3s + var(--i) * .22s);
  }
  .card:nth-child(2) { background: var(--plum); color: var(--cream); }
  .on .card { opacity: 1; transform: translate(calc(-50% + (var(--i) - 1) * 64px), calc(-50% + (var(--i) - 1) * 14px)) rotate(var(--fan)); }
  .deck:hover .card { transition-delay: 0s; transform: translate(calc(-50% + (var(--i) - 1) * 84px), calc(-50% + (var(--i) - 1) * -6px)) rotate(calc(var(--fan) * 1.6)); }
  .card small { font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--gold); }
  .card h3 { font-size: 1.15rem; margin: 6px 0 10px; }
  .card p { font-size: .88rem; opacity: .8; }
  @media (max-width: 700px) { .wrap { grid-template-columns: 1fr; } .deck:hover .card { transform: translate(calc(-50% + (var(--i) - 1) * 64px), calc(-50% + (var(--i) - 1) * 14px)) rotate(var(--fan)); } }
</style>
