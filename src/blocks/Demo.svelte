<script>
  import { fly } from 'svelte/transition';
  import Block from '../lib/Block.svelte';
  let shown = $state(false);

  let moist = $state(45);
  let temp = $state(18);
  let phase = $state('tiller');
  const PHASES = { sow: 'Сев / всходы', tiller: 'Кущение', ear: 'Колошение', ripe: 'Созревание' };

  // Упрощённые иллюстративные правила — не агрономическая рекомендация
  let res = $derived.by(() => {
    let lvl = 'ok', title = 'Условия в норме';
    const why = [];
    if (moist < 25) { lvl = 'bad'; title = 'Нужен полив'; why.push(`влажность ${moist}% — низкая`); }
    else if (moist > 80) { lvl = 'warn'; title = 'Риск переувлажнения и болезней'; why.push(`влажность ${moist}% — высокая`); }
    if (temp > 32) { lvl = 'bad'; title = 'Тепловой стресс'; why.push(`${temp}°C — жарко для культуры`); }
    else if (temp < 0 && phase !== 'sow') {
      if (lvl === 'ok') { lvl = 'warn'; title = 'Риск заморозков'; }
      why.push(`${temp}°C — возможны заморозки`);
    }
    if (lvl === 'ok' && phase === 'ear' && moist < 40) { lvl = 'warn'; title = 'Критичная фаза: следите за влагой'; why.push('колошение чувствительно к недостатку воды'); }
    if (lvl === 'ok' && phase === 'ripe' && moist > 60) { lvl = 'warn'; title = 'Планируйте уборку по погоде'; why.push('высокая влажность при созревании'); }
    if (!why.length) why.push('показатели укладываются в типичный диапазон');
    return { lvl, title, why };
  });
  const LBL = { ok: 'Всё хорошо', warn: 'Внимание', bad: 'Действовать' };
</script>

<Block bind:shown span="xl" tone="soft" id="demo" label="Демо">
  <div class="wrap" class:on={shown}>
    <div class="controls">
      <span class="tag">08 · демо</span>
      <h2>Покрути условия — получи подсказку</h2>
      <p class="muted note">Иллюстрация идеи на упрощённых правилах. Не агрономическая рекомендация.</p>
      <label>Влажность почвы <b>{moist}%</b>
        <input type="range" min="5" max="95" bind:value={moist} style:--p="{(moist - 5) / 90 * 100}%"></label>
      <label>Температура воздуха <b>{temp}°C</b>
        <input type="range" min="-5" max="40" bind:value={temp} style:--p="{(temp + 5) / 45 * 100}%"></label>
      <div class="phases" role="radiogroup" aria-label="Фаза развития">
        {#each Object.entries(PHASES) as [k, v]}
          <button role="radio" aria-checked={phase === k} class:sel={phase === k} onclick={() => (phase = k)}>{v}</button>
        {/each}
      </div>
    </div>
    <div class="out" aria-live="polite">
      <div class="level {res.lvl}"><span></span></div>
      {#key res.title}
        <div class="res" in:fly={{ y: 24, duration: 420 }}>
          <span class="badge {res.lvl}">{LBL[res.lvl]}</span>
          <h3>{res.title}</h3>
          <b>Почему:</b>
          <ul>{#each res.why as w}<li>{w}</li>{/each}</ul>
        </div>
      {/key}
    </div>
  </div>
</Block>

<style>
  .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: stretch; }
  .controls { display: flex; flex-direction: column; gap: 14px; }
  .tag { align-self: flex-start; }
  .note { font-size: .88rem; margin-top: -4px; }
  label { display: flex; flex-direction: column; gap: 8px; font-weight: 700; }
  label b { font-family: var(--display); }
  input[type=range] { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 10px; cursor: pointer;
    background: linear-gradient(90deg, var(--plum) var(--p), color-mix(in oklab, var(--plum) 15%, transparent) var(--p)); }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 26px; height: 26px; border-radius: 50%; background: var(--gold); border: 4px solid var(--cream); box-shadow: 0 2px 8px -2px var(--plum); }
  input[type=range]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: var(--gold); border: 4px solid var(--cream); }
  .phases { display: flex; flex-wrap: wrap; gap: 8px; }
  .phases button { font: 700 .88rem 'Manrope', sans-serif; padding: 9px 14px; border-radius: 12px; border: 1.5px solid var(--plum); background: transparent; color: var(--plum); cursor: pointer; transition: all .2s; }
  .phases button.sel { background: var(--plum); color: var(--cream); }
  .out { position: relative; display: grid; grid-template-columns: 14px 1fr; gap: 20px; background: var(--cream); border-radius: 22px; padding: 26px; min-height: 260px;
         transform: rotate(2deg) translateY(30px); opacity: 0; transition: transform .9s var(--spring) .3s, opacity .5s .3s; }
  .on .out { transform: none; opacity: 1; }
  .level { position: relative; border-radius: 14px; background: color-mix(in oklab, var(--plum) 10%, transparent); overflow: hidden; }
  .level span { position: absolute; inset: auto 0 0 0; border-radius: 14px; transition: height .6s var(--spring), background .4s; }
  .level.ok span { height: 33%; background: var(--plum-2); }
  .level.warn span { height: 66%; background: var(--gold); }
  .level.bad span { height: 100%; background: var(--plum); }
  .res { grid-column: 2; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
  .badge.ok { background: var(--plum-soft); } .badge.warn { background: var(--gold); } .badge.bad { background: var(--plum); color: var(--cream); }
  h3 { font-size: 1.5rem; margin: 14px 0 10px; }
  ul { margin: 6px 0 0; padding-left: 20px; }
  @media (max-width: 760px) { .wrap { grid-template-columns: 1fr; } }
</style>
