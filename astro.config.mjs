// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Served from the GitHub Pages user site for now; swap to the custom
	// domain (https://dravenehslab.com) once it is registered and bound.
	site: 'https://dravenye.github.io',
	// English is the default locale and lives at the site root (/blog, /about).
	// Chinese will be added later under /zh/ — English URLs never move.
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh'],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [mdx(), sitemap()],
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
