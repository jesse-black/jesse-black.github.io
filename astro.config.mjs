// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import icon from 'astro-icon';

import rehypeCodeBlockHeader from './src/rehype/rehype-code-block-header.js';

// https://astro.build/config
export default defineConfig({
	site: 'https://jesseblack.net',
	integrations: [mdx(), sitemap(), icon()],
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
		},
		rehypePlugins: [rehypeCodeBlockHeader],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
