// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://iqbalhasbi.my.id',
  // Public pages are prerendered; only Keystatic's /keystatic + /api/keystatic run on the Worker.
  // ponytail: dev runs without the adapter — Keystatic local mode needs Node fs, workerd dev can't load it.
  adapter: isDev ? undefined : cloudflare({ prerenderEnvironment: 'node', imageService: 'compile' }),
  integrations: [
    react(),
    keystatic(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', id: 'id' } },
      filter: (page) => !page.includes('/keystatic'),
    }),
  ],
  i18n: { defaultLocale: 'en', locales: ['en', 'id'], routing: { prefixDefaultLocale: false } },
});
