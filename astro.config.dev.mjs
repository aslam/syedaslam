// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// Import PostCSS plugins using ES Module syntax
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Development configuration (no base path)
export default defineConfig({
  output: 'static',
  site: 'https://aslam.github.io',
  // No base path for local development
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
});
