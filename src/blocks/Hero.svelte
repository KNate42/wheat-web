<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);

  const letters = 'WheatDDS'.split('');
  // колос: пары зёрен вдоль стебля + ости
  const grains = Array.from({ length: 7 }, (_, i) => 40 + i * 24);
</script>

<Block bind:shown span="l" tone="plum" label="WheatDDS">
  <div class="hero" class:on={shown}>
    <span class="tag">Wheat Decision Support System · в разработке</span>
    <h1 aria-label="WheatDDS">
      {#each letters as ch, i}
        <span class="ch" aria-hidden="true" style:--i={i} style:--r="{(i % 2 ? 1 : -1) * (8 + i * 3)}deg">{ch}</span>
      {/each}
    </h1>
    <p class="sub">Прогноз роста конкретных сортов пшеницы: когда сорт взойдёт, раскустится, выколосится и созреет — с учётом условий сезона.</p>
    <div class="cta">
      <a class="btn gold" href="#demo">Попробовать демо</a>
      <a class="btn line" href="#roadmap">Статус проекта</a>
    </div>

    <svg class="ear" viewBox="0 0 120 260" aria-hidden="true">
      <path class="d" style:--d="0s" pathLength="1" d="M60 258 C 58 200, 62 150, 60 30" />
      {#each grains as y, i}
        <ellipse class="d g" style:--d="{0.5 + i * 0.12}s" pathLength="1" cx="47" cy={y} rx="10" ry="17" transform="rotate(-28 47 {y})" />
        <ellipse class="d g" style:--d="{0.56 + i * 0.12}s" pathLength="1" cx="73" cy={y} rx="10" ry="17" transform="rotate(28 73 {y})" />
        <path class="d a" style:--d="{1.2 + i * 0.08}s" pathLength="1" d="M41 {y - 14} L 22 {y - 52}" />
        <path class="d a" style:--d="{1.24 + i * 0.08}s" pathLength="1" d="M79 {y - 14} L 98 {y - 52}" />
      {/each}
    </svg>
  </div>
</Block>

<style>
  .hero { position: relative; min-height: 470px; display: flex; flex-direction: column; justify-content: flex-end; gap: 22px; padding-right: min(26%, 170px); }
  .tag { align-self: flex-start; color: var(--gold); }
  h1 { font-size: clamp(2.5rem, 5.8vw, 5rem); font-weight: 900; display: flex; overflow: hidden; padding-bottom: .08em; }
  .ch {
    display: inline-block; transform: translateY(115%) rotate(var(--r)); opacity: 0;
    transition: transform .9s var(--spring), opacity .4s;
    transition-delay: calc(.15s + var(--i) * 60ms);
  }
  .ch:nth-child(n+6) { color: var(--gold); }
  .on .ch { transform: none; opacity: 1; }
  .sub { max-width: 520px; font-size: 1.08rem; opacity: 0; transform: translateY(14px); transition: all .8s var(--ease) .8s; }
  .cta { display: flex; gap: 12px; flex-wrap: wrap; opacity: 0; transform: translateY(14px); transition: all .8s var(--ease) 1s; }
  .on .sub { opacity: .85; transform: none; }
  .on .cta { opacity: 1; transform: none; }

  .ear { position: absolute; right: 0; top: 0; height: 100%; max-height: 470px; width: auto; }
  .d { fill: none; stroke: var(--gold); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1;
       transition: stroke-dashoffset 1.1s var(--ease), fill .6s; transition-delay: var(--d); }
  .a { stroke-width: 1.6; opacity: .7; }
  .on .d { stroke-dashoffset: 0; }
  .on .g { fill: color-mix(in oklab, var(--gold) 22%, transparent); }
  .on .ear { animation: sway 5s ease-in-out 2.2s infinite alternate; transform-origin: 50% 100%; }
  @keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(3deg); } }

  @media (max-width: 600px) {
    .hero { padding-right: 0; min-height: 420px; }
    .ear { opacity: .25; }
  }
</style>
