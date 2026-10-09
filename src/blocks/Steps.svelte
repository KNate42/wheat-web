<script>
  import Block from '../lib/Block.svelte';
  let shown = $state(false);
  const steps = [
    { t: 'Выбираешь сорт', d: 'из базы сортов с их параметрами' },
    { t: 'Задаёшь условия', d: 'дата сева и данные сезона' },
    { t: 'Получаешь прогноз', d: 'даты наступления фаз развития' },
  ];
</script>

<Block bind:shown span="s" tone="soft" label="Как будет работать">
  <div class="wrap" class:on={shown}>
    <span class="tag">05 · как будет работать</span>
    <ol>
      {#each steps as s, i}
        <li style:--i={i}>
          <b>{i + 1}</b>
          <div><h3>{s.t}</h3><p class="muted">{s.d}</p></div>
        </li>
      {/each}
      <span class="rail"></span>
    </ol>
  </div>
</Block>

<style>
  .wrap { display: flex; flex-direction: column; gap: 22px; }
  ol { position: relative; list-style: none; margin: 0; padding: 0; display: grid; gap: 18px; perspective: 700px; }
  .rail { position: absolute; left: 21px; top: 22px; bottom: 22px; width: 2px; background: var(--plum); transform: scaleY(0); transform-origin: top; transition: transform 1.2s var(--ease) .2s; }
  .on .rail { transform: none; }
  li { position: relative; z-index: 1; display: flex; gap: 14px; align-items: center; background: var(--cream); border-radius: 18px; padding: 14px;
       transform: rotateY(-95deg); transform-origin: left; opacity: 0; transition: transform .8s var(--spring), opacity .3s; transition-delay: calc(.3s + var(--i) * .3s); }
  .on li { transform: none; opacity: 1; }
  li b { flex: none; width: 30px; height: 30px; margin-left: -1px; border-radius: 50%; display: grid; place-items: center; background: var(--plum); color: var(--gold); font-family: var(--display); }
  h3 { font-size: 1rem; }
  p { font-size: .88rem; }
</style>
