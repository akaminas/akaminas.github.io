// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages *user* site: served from the domain root, so no `base` is set.
// If a custom domain is added later, change `site` only; nothing else depends on it.
export default defineConfig({
  site: 'https://akaminas.github.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  // No client-side view transitions or prefetch: keeps the JS footprint minimal and
  // the network behaviour easy to audit.
  prefetch: false,
});
