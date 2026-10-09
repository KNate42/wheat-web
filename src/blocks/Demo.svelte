<script>
  import { fly } from 'svelte/transition';
  import Block from '../lib/Block.svelte';
  import { VARIETIES, PHASES } from '../data.js';
  let shown = $state(false);

  let variety = $state('b');
  let sow = $state(0); // дней от 20 апреля
  let season = $state('normal');
  const SEASONS = { cold: { name: 'Прохладный', t: 14 }, normal: { name: 'Обычный', t: 17 }, warm: { name: 'Тёплый', t: 20 } };

  const START = new Date(2026, 3, 20);
  const fmt = d => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + Math.round(n));

  // Условная модель: дни до фазы = сумма температур × коэффициент сорта / средняя температура
  let forecast = $derived.by(() => {
    const v = VARIETIES.find(x => x.id === variety);
    const t = SEASONS[season].t;
    const sowDate = addDays(START, sow);
    const total = (PHASES.at(-1).gdd * v.k) / t;
    return {
      sowDate, total,
      items: PHASES.map(p => {
        const days = (p.gdd * v.k) / t;
        return { ...p, days, date: addDays(sowDate, days) };
      }),
    };
  });
  const key = $derived(`${variety}-${sow}-${season}`);
</script>

<Block bind:shown span="xl" tone="sand" id="demo" label="Демо прогноза">
  <div class="wrap" class:on={shown}>
    <div class="controls">
      <span class="tag">04 · демо</span>
      <h2>Покрути условия — увидишь прогноз</h2>
      <p class="muted note">Условные сорта и упрощённая модель — только чтобы показать идею. Это не реальный прогноз.</p>

      <div class="group" role="radiogroup" aria-label="Сорт">
        {#each VARIETIES as v}
          <button role="radio" aria-checked={variety === v.id} class:sel={variety === v.id} onclick={() => (variety = v.id)}>{v.name}<small>{v.kind}</small></button>
        {/each}
      </div>
      <label>Дата сева <b>{fmt(forecast.sowDate)}</b>
        <input type="range" min="0" max="40" bind:value={sow} style:--p="{(sow / 40) * 100}%"></label>
      <div class="group" role="radiogroup" aria-label="Сезон">
        {#each Object.entries(SEASONS) as [k, s]}
          <button role="radio" aria-checked={season === k} class:sel={season === k} onclick={() => (season = k)}>{s.name}<small>~{s.t}°C</small></button>
        {/each}
      </div>
    </div>

    <div class="out" aria-live="polite">
      {#key key}
        <div class="res" in:fly={{ y: 16, duration: 380 }}>
          <p class="sum"><b>{Math.round(forecast.total)}</b> дней до созревания</p>
          <ul>
            {#each forecast.items as it, i}
              <li style:--i={i}>
                <span class="name">{it.name}</span>
                <span class="track"><i style:width="{(it.days / forecast.total) * 100}%"></i></span>
                <span class="date">{fmt(it.date)}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/key}
    </div>
  </div>
</Block>

<style>
  .wrap { display: grid; grid-template-columns: 1fr 1.1fr; gap: 36px; align-items: stretch; }
  .controls { display: flex; flex-direction: column; gap: 16px; }
  .note { font-size: .88rem; margin-top: -4px; }
  label { display: flex; flex-direction: column; gap: 8px; font-weight: 700; }
  label b { font-family: var(--display); }
  input[type=range] { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 10px; cursor: pointer;
    background: linear-gradient(90deg, var(--plum) var(--p), color-mix(in oklab, var(--plum) 15%, transparent) var(--p)); }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 26px; height: 26px; border-radius: 50%; background: var(--gold); border: 4px solid var(--cream); box-shadow: 0 2px 8px -2px var(--plum); }
  input[type=range]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: var(--gold); border: 4px solid var(--cream); }
  .group { display: flex; flex-wrap: wrap; gap: 8px; }
  .group button { font: 700 .9rem 'Manrope', sans-serif; padding: 9px 14px; border-radius: 12px; border: 1.5px solid var(--plum); background: transparent; color: var(--plum); cursor: pointer; transition: all .2s; display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2; }
  .group button small { font-weight: 500; opacity: .7; font-size: .75rem; }
  .group button.sel { background: var(--plum); color: var(--cream); }
  .out { background: var(--plum); color: var(--cream); border-radius: 22px; padding: 26px; min-height: 300px;
         transform: translateX(40px) skewX(-4deg); opacity: 0; transition: transform .9s var(--spring) .3s, opacity .5s .3s; }
  .on .out { transform: none; opacity: 1; }
  .sum { font-size: 1.05rem; margin-bottom: 18px; }
  .sum b { font: 900 2.6rem var(--display); color: var(--gold); margin-right: 6px; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
  li { display: grid; grid-template-columns: 120px 1fr 100px; gap: 12px; align-items: center; font-size: .92rem; }
  .name { font-weight: 700; }
  .date { text-align: right; opacity: .85; }
  .track { height: 8px; border-radius: 8px; background: color-mix(in oklab, var(--cream) 12%, transparent); overflow: hidden; }
  .track i { display: block; height: 100%; border-radius: 8px; background: var(--gold); transform-origin: left; animation: grow .7s var(--ease) both; animation-delay: calc(var(--i) * 70ms); }
  @keyframes grow { from { transform: scaleX(0); } }
  @media (max-width: 760px) { .wrap { grid-template-columns: 1fr; } li { grid-template-columns: 1fr 90px; } .track { grid-column: 1 / -1; grid-row: 2; } }
</style>
