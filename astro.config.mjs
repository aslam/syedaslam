// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://syedaslam.com', // Update this with your actual domain
	integrations: [mdx(), sitemap(), tailwind()],
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
			wrap: true
		}
	}
});
