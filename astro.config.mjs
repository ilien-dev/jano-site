// @ts-check
import { defineConfig } from 'astro/config';
import { rename, rmdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

// Cloudflare serves the nearest 404.html above a missing path, but Astro writes
// src/pages/es/404.astro to es/404/index.html. Move it to es/404.html.
const nestedNotFound = {
  name: 'nested-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const out = fileURLToPath(dir);
      await rename(`${out}es/404/index.html`, `${out}es/404.html`);
      await rmdir(`${out}es/404`);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://jano.ilien.dev',
  build: { inlineStylesheets: 'always' },
  integrations: [nestedNotFound],
  vite: {
    plugins: [tailwindcss()]
  }
});
