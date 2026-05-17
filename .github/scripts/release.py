import os
import re
import sys

tag = os.environ['TAG']
slug = tag
notes_file = sys.argv[1]

file_path = None
for ext in ('md', 'mdx'):
    candidate = f'src/content/blog/{slug}.{ext}'
    if os.path.isfile(candidate):
        file_path = candidate
        break

if file_path is None:
    print(f"::error::No blog post found for slug '{slug}' (tried .md and .mdx)", file=sys.stderr)
    sys.exit(1)

content = open(file_path).read()
m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
if not m:
    print(f"::error::No frontmatter found in {file_path}", file=sys.stderr)
    sys.exit(1)

fm = {}
for line in m.group(1).splitlines():
    match = re.match(r"^(\w+):\s*['\"]?(.*?)['\"]?\s*$", line)
    if match:
        fm[match.group(1)] = match.group(2)

title = fm.get('title', slug)
description = fm.get('description', '')
pub_date = fm.get('pubDate', '')
url = f'https://jesseblack.net/blog/{slug}/'

with open(notes_file, 'w') as f:
    f.write(f'**[Read on jesseblack.net →]({url})**\n\n---\n\n> {description}\n\nPublished: {pub_date}\n')

with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
    f.write(f'title={title}\n')
