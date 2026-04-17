// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Jesse Black';
export const SITE_DESCRIPTION = 'Notes on agents and staying human.';
export const AUTHOR_NAME = 'Jesse Black';
export const GITHUB_PROFILE_URL = 'https://github.com/jesse-black';

export const GITHUB_REPO = 'https://github.com/jesse-black/jesse-black.github.io';
export const DISCUSSIONS_URL = `${GITHUB_REPO}/discussions`;
export const BLOG_SOURCE_URL = `${GITHUB_REPO}/blob/main/src/content/blog`;

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
];
