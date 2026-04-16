// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Jesse Black\'s Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

export const GITHUB_REPO = 'https://github.com/jesse-black/jesse-black.github.io';
export const DISCUSSIONS_URL = `${GITHUB_REPO}/discussions`;
export const BLOG_SOURCE_URL = `${GITHUB_REPO}/blob/main/src/content/blog`;

export const SOCIAL_LINKS: { href: string; label: string; icon: string }[] = [
	{
		href: 'https://github.com/jesse-black',
		label: "Go to Jesse's GitHub",
		icon: 'simple-icons:github',
	},
	{
		href: 'https://instagram.com/jessewblack',
		label: "Go to Jesse's Instagram",
		icon: 'simple-icons:instagram',
	},
];
