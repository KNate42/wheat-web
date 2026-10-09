import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// base './' — относительные пути, работает и локально, и на GitHub Pages
export default defineConfig({
  plugins: [svelte()],
  base: './',
});
