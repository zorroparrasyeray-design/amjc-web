import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zorroparrasyeray-design.github.io',
  base: '/amjc-web',
  build: { format: 'file' },
  trailingSlash: 'ignore',
});
