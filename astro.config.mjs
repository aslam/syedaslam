// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// Import PostCSS plugins using ES Module syntax
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  site: 'https://aslam.github.io',
  base: '/syedaslam',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: { // Add this vite section
    css: {
      postcss: {
        plugins: [
          tailwindcss, // Use the imported module directly
          autoprefixer, // Use the imported module directly
        ],
      },
    },
  },
});
