// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Jesse Black';
export const SITE_DESCRIPTION = 'Notes on agents and staying human.';
export const AUTHOR_NAME = 'Jesse Black';
export const GITHUB_PROFILE_URL = 'https://github.com/jesse-black';

export const GITHUB_REPO = 'jesse-black/jesseblack.net';
export const BLOG_SOURCE_URL = `https://github.com/${GITHUB_REPO}/blob/main/src/content/blog`;
export const BLOG_RAW_SOURCE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/src/content/blog`;

export const GISCUS_REPO_ID = 'MDEwOlJlcG9zaXRvcnkxNTU0MzU1OTI=';
export const GISCUS_CATEGORY = 'General';
export const GISCUS_CATEGORY_ID = 'DIC_kwDOCUPCSM4C6xDy';

export const SOCIAL_LINKS: { href: string; label: string; icon: string }[] = [
	{
		href: GITHUB_PROFILE_URL,
		label: `Go to ${AUTHOR_NAME}'s GitHub`,
		icon: 'simple-icons:github',
	},
	{
		href: 'https://instagram.com/jessewblack',
		label: `Go to ${AUTHOR_NAME}'s Instagram`,
		icon: 'simple-icons:instagram',
	},
	{
		href: '/rss.xml',
		label: 'RSS Feed',
		icon: 'simple-icons:rss',
	},
];
