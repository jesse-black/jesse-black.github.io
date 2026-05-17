#!/usr/bin/env python3
"""Update the profile README with recent blog posts."""

from __future__ import annotations

import datetime as dt
import email.utils
import html
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from typing import Iterable


BLOG_FEED_URL = "https://jesseblack.net/rss.xml"
README_PATH = "README.md"
BLOG_LIMIT = 10


@dataclass(frozen=True)
class BlogPost:
    title: str
    url: str
    published: dt.datetime
    description: str


def parse_datetime(value: str | None) -> dt.datetime:
    if not value:
        return dt.datetime.min.replace(tzinfo=dt.timezone.utc)

    value = value.strip()
    if value.endswith("Z"):
        value = value[:-1] + "+00:00"

    try:
        parsed = dt.datetime.fromisoformat(value)
    except ValueError:
        parsed = email.utils.parsedate_to_datetime(value)

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=dt.timezone.utc)
    return parsed.astimezone(dt.timezone.utc)


def fetch_blog_posts() -> list[BlogPost]:
    request = urllib.request.Request(
        BLOG_FEED_URL,
        headers={"User-Agent": "jesse-black-profile-readme-updater"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        document = ET.fromstring(response.read())

    posts: list[BlogPost] = []
    for item in document.findall("./channel/item"):
        title = text_of(item, "title")
        link = text_of(item, "link")
        published = text_of(item, "pubDate")
        description = text_of(item, "description")
        if not title or not link:
            continue
        posts.append(
            BlogPost(
                title=html.unescape(title),
                url=link,
                published=parse_datetime(published),
                description=html.unescape(description),
            )
        )

    return sorted(posts, key=lambda post: post.published, reverse=True)[:BLOG_LIMIT]


def text_of(element: ET.Element, tag: str) -> str:
    child = element.find(tag)
    if child is None or child.text is None:
        return ""
    return child.text.strip()


def render_blog_posts(items: Iterable[BlogPost]) -> str:
    blocks = []
    for post in items:
        date = post.published.strftime("%Y-%m-%d")
        blocks.append(f"### [{post.title}]({post.url})\n_{date}_\n{post.description}")
    if not blocks:
        return "_No recent posts found._"
    return "\n\n".join(blocks)


def replace_block(readme: str, name: str, content: str) -> str:
    pattern = re.compile(
        rf"<!-- {re.escape(name)} starts -->.*?<!-- {re.escape(name)} ends -->",
        re.DOTALL,
    )
    replacement = f"<!-- {name} starts -->\n{content}\n<!-- {name} ends -->"
    updated, count = pattern.subn(replacement, readme)
    if count != 1:
        raise RuntimeError(f"Could not find exactly one README block named {name!r}")
    return updated


def main() -> int:
    with open(README_PATH, encoding="utf-8") as f:
        readme = f.read()

    updated = replace_block(readme, "blog", render_blog_posts(fetch_blog_posts()))

    if updated != readme:
        with open(README_PATH, "w", encoding="utf-8") as f:
            f.write(updated)

    return 0


if __name__ == "__main__":
    sys.exit(main())
