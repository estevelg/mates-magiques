import { defineConfig } from 'vitest/config';

// `base: './'` makes the built asset paths relative, so the app works when
// served from any static host, including GitHub Pages project subpaths.
export default defineConfig({
  base: './',
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
