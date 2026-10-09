<script>
  import Block from '../lib/Block.svelte';
  import { ROADMAP, STATUS } from '../data.js';
  let shown = $state(false);
</script>

<Block bind:shown span="m" tone="plum" id="roadmap" label="Статус разработки">
  <div class="wrap" class:on={shown}>
    <span class="tag">07 · статус</span>
    <h2>Что уже растёт</h2>
    <ul>
      {#each ROADMAP as r, i}
        <li class={r.status} style:--i={i} style:--p="{r.progress}%">
          <span class="name">{r.title}</span>
          <span class="st">{STATUS[r.status]}</span>
          <span class="bar"><i></i></span>
        </li>
      {/each}
    </ul>
    <p class="muted hint">Статусы правятся в <code>src/data.js</code>.</p>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 16px; }
  .tag { align-self: flex-start; color: var(--gold); }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
  li { display: grid; grid-template-columns: 1fr auto; gap: 6px 12px; align-items: center;
       clip-path: inset(0 100% 0 0); transform: translateX(-20px); transition: clip-path .7s var(--ease), transform .7s var(--ease); transition-delay: calc(.2s + var(--i) * .1s); }
  .on li { clip-path: inset(0 0 0 0); transform: none; }
  .name { font-weight: 700; font-size: .95rem; }
  .st { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; padding: 3px 9px; border-radius: 99px; border: 1px solid color-mix(in oklab, var(--cream) 40%, transparent); }
  .wip .st { background: var(--gold); color: var(--plum); border-color: var(--gold); }
  .done .st { background: var(--cream); color: var(--plum); }
  .bar { grid-column: 1 / -1; height: 4px; border-radius: 4px; background: color-mix(in oklab, var(--cream) 14%, transparent); overflow: hidden; }
  .bar i { display: block; height: 100%; width: var(--p); background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform 1.2s var(--ease); transition-delay: calc(.8s + var(--i) * .1s); }
  .on .bar i { transform: none; }
  .hint { font-size: .85rem; }
  code { color: var(--gold); }
</style>
