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
  output: 'static',
  site: 'https://aslam.github.io',
  base: '/syedaslam',
  trailingSlash: 'never',
  build: {
    assets: '_astro',
  },
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
        },
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
});
