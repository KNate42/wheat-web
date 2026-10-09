<script>
  import Hero from './blocks/Hero.svelte';
  import Varieties from './blocks/Varieties.svelte';
  import Weather from './blocks/Weather.svelte';
  import Growth from './blocks/Growth.svelte';
  import Demo from './blocks/Demo.svelte';
  import Steps from './blocks/Steps.svelte';
  import Roadmap from './blocks/Roadmap.svelte';
  import Closing from './blocks/Closing.svelte';
</script>

<header id="top">
  <a class="logo" href="#top"><span class="seed"></span>WheatDDS</a>
  <nav>
    <a href="#demo">Демо</a>
    <a href="#roadmap">Статус</a>
  </nav>
</header>

<main>
  <Hero /><Varieties />
  <Growth /><Weather />
  <Demo />
  <Steps /><Roadmap />
  <Closing />
</main>

<footer>WheatDDS · Wheat Decision Support System</footer>

<style>
  header { max-width: 1240px; margin: 0 auto; padding: 18px 16px; display: flex; justify-content: space-between; align-items: center; }
  .logo { display: flex; align-items: center; gap: 10px; font: 900 1.1rem var(--display); text-decoration: none; }
  .seed { width: 14px; height: 22px; border-radius: 50%; background: var(--gold); transform: rotate(25deg); box-shadow: -8px 4px 0 -2px var(--plum); }
  nav { display: flex; gap: 6px; }
  nav a { text-decoration: none; font-weight: 700; padding: 8px 14px; border-radius: 12px; transition: background .2s; }
  nav a:hover { background: var(--plum-soft); }
  main { max-width: 1240px; margin: 0 auto; padding: 0 16px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; }
  footer { max-width: 1240px; margin: 0 auto; padding: 28px 16px 40px; font-size: .9rem; opacity: .6; }
</style>
