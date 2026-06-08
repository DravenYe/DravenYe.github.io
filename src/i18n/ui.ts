// Lightweight i18n layer. English is the default locale and lives at the site
// root; Chinese lives under /zh/. UI strings are keyed here; long-form content
// lives in locale-specific content collections.

export const defaultLang = 'en';

export const languages: Record<string, string> = {
	en: 'EN',
	zh: '中文',
};

export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.projects': 'Projects',
		'nav.blog': 'Writing',
		'nav.about': 'About',
		'footer.newsletter': 'Newsletter',
		'footer.headline': 'Build assets, not followers.',
		'footer.blurb':
			"New essays on EHS, process safety, and the AI tools I build — delivered when there's something worth saying. No noise, no daily updates.",
		'footer.subscribe': 'Subscribe on Substack',
		'footer.rights': 'All rights reserved.',
		'projects.all': 'All projects →',
		'blog.all': 'All writing →',
		'post.back': '← Writing',
		'project.back': '← Projects',
		'project.github': 'View on GitHub',
		'project.demo': 'Live demo',
	},
	zh: {
		'nav.home': '首页',
		'nav.projects': '项目',
		'nav.blog': '文章',
		'nav.about': '关于',
		'footer.newsletter': '订阅',
		'footer.headline': '积累作品，而非粉丝。',
		'footer.blurb':
			'关于 EHS、工艺安全，以及我亲手搭建的 AI 工具——有值得说的内容时才更新。不追流量，不日更。',
		'footer.subscribe': '在 Substack 订阅',
		'footer.rights': '版权所有。',
		'projects.all': '全部项目 →',
		'blog.all': '全部文章 →',
		'post.back': '← 文章',
		'project.back': '← 项目',
		'project.github': '在 GitHub 查看',
		'project.demo': '在线演示',
	},
} as const;

export type Lang = keyof typeof ui;

/** Derive the active locale from the request URL ("/zh/..." → "zh"). */
export function getLangFromUrl(url: URL): Lang {
	const [, seg] = url.pathname.split('/');
	if (seg in ui) return seg as Lang;
	return defaultLang;
}

/** Translator bound to a locale, with English fallback. */
export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)['en']): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Prefix a root-relative path with the locale ("/blog" → "/zh/blog"). */
export function localizePath(path: string, lang: Lang): string {
	if (lang === defaultLang) return path;
	if (path === '/') return '/zh/';
	return `/zh${path}`;
}

/** Map the current path to its counterpart in the other locale. */
export function alternatePath(url: URL, lang: Lang): string {
	const path = url.pathname;
	if (lang === 'zh') {
		const stripped = path.replace(/^\/zh/, '');
		return stripped === '' ? '/' : stripped;
	}
	return path === '/' ? '/zh/' : `/zh${path}`;
}
