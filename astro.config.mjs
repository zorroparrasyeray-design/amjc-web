import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.amjesuscaido.es',
  base: '/',
  build: { format: 'file' },
  trailingSlash: 'ignore',
});
