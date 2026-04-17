# jesse-black.github.io

Personal blog for [jesseblack.net](https://jesseblack.net), built with Astro and deployed via GitHub Pages from a public repository.

## Tech stack

- **Framework**: Astro 6.x (static output)
- **Package manager**: pnpm
- **Content**: Markdown and MDX via Astro Content Collections
- **Integrations**: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, `astro-icon`
- **Font**: Atkinson (local woff files in `src/assets/fonts/`)

## Project layout

```
src/
  assets/        # Images, fonts, and other static assets
  components/    # Reusable Astro components
  content/
    blog/        # Blog posts as .md or .mdx files
  layouts/       # Page layout components
  pages/         # File-based routes (.astro, .md, .mdx)
  styles/        # Global CSS
  consts.ts      # Site-wide constants (title, description, etc.)
  content.config.ts  # Content collection schema definitions
public/          # Copied verbatim to build output (favicons, etc.)
```

## Common commands

```sh
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build to ./dist/
pnpm preview    # Preview the production build locally
pnpm check      # Run type checks and diagnostics
```

## Writing blog posts

Add a `.md` or `.mdx` file to `src/content/blog/`. Required frontmatter:

```yaml
---
title: "Post title"
description: "Short description for SEO and previews"
pubDate: "YYYY-MM-DD"
# optional:
updatedDate: "YYYY-MM-DD"
heroImage: ./path-to-image.jpg
---
```

## Deployment

The site is deployed automatically via GitHub Actions to GitHub Pages on push to `main`. The built output targets `https://jesseblack.net` (configured in `astro.config.mjs` as `site`).

Because the repo is public, avoid committing secrets or draft content you don't want visible.
