// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://shoaib4567.github.io',
  base: '/seo-for-automotive',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
