// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Jesse Black';
export const SITE_DESCRIPTION = 'Notes on agents and staying human.';
export const AUTHOR_NAME = 'Jesse Black';
export const GITHUB_PROFILE_URL = 'https://github.com/jesse-black';

export const GITHUB_REPO = 'jesse-black/jesse-black.github.io';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const DISCUSSIONS_URL = `${GITHUB_REPO_URL}/discussions`;
export const BLOG_SOURCE_URL = `${GITHUB_REPO_URL}/blob/main/src/content/blog`;
export const BLOG_RAW_SOURCE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/src/content/blog`;

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
