import glob
import os
import re
from datetime import datetime


def parse_date(s):
    for fmt in ('%Y-%m-%d', '%b %d %Y', '%B %d %Y', '%b %d, %Y', '%B %d, %Y'):
        try:
            return datetime.strptime(s.strip(), fmt)
        except ValueError:
            continue
    return datetime.min


posts = []
for filepath in (
    glob.glob('src/content/blog/**/*.md', recursive=True)
    + glob.glob('src/content/blog/**/*.mdx', recursive=True)
):
    content = open(filepath).read()
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m:
        continue
    fm = {}
    for line in m.group(1).splitlines():
        match = re.match(r"^(\w+):\s*['\"]?(.*?)['\"]?\s*$", line)
        if match:
            fm[match.group(1)] = match.group(2)
    slug = os.path.splitext(os.path.basename(filepath))[0]
    posts.append((
        parse_date(fm.get('pubDate', '')),
        fm.get('pubDate', '').strip(),
        slug,
        fm.get('title', slug),
        fm.get('description', ''),
    ))

posts.sort(reverse=True)

lines = [
    '# jesse-black.github.io',
    '',
    'My blog at [jesseblack.net](https://jesseblack.net).',
    '',
    '## Posts',
    '',
]
for _, pub_date, slug, title, desc in posts:
    url = f'https://jesseblack.net/blog/{slug}/'
    lines.append(f'- **[{title}]({url})** — {desc} _({pub_date})_')
lines.append('')

with open('README.md', 'w') as f:
    f.write('\n'.join(lines))
