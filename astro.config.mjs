// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isCloudflare = process.env.CF_PAGES === 'true' || process.env.CF_PAGES === '1';

// https://astro.build/config
export default defineConfig({
  site: isCloudflare ? 'https://seo-for-automotive.pages.dev' : 'https://shoaib4567.github.io',
  base: isCloudflare ? '/' : '/seo-for-automotive',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
