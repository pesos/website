import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://pesos.example.org',
  output: 'static',
  build: { format: 'directory' },
});
