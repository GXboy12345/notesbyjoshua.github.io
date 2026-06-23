#!/usr/bin/env python3
"""Migrate Jekyll notes (../Notes/*.md) into Starlight content (src/content/docs/notes/).

Transforms performed per file:
  * Jekyll front matter -> Starlight front matter (title + sidebar.order).
  * Liquid links/srcs  {{ '/x' | relative_url }}  ->  /x
  * <div ... markdown="1">  ->  <div ...>     (Starlight/remark parses markdown in HTML blocks)
  * Strip the leading "# Title" H1 (Starlight renders the title from front matter).

Routing: destination path is derived from each note's `permalink`, so existing
URLs are preserved exactly (e.g. /notes/ap/chem/atomicstrucprop/).

Idempotent: rewrites the docs/notes tree from scratch each run.
"""

from __future__ import annotations

import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

ASTRO = Path(__file__).resolve().parents[1]
REPO = ASTRO.parent
NOTES_SRC = REPO / "Notes"
DOCS_OUT = ASTRO / "src" / "content" / "docs"
ASSETS_SRC = REPO / "assets"
ASSETS_OUT = ASTRO / "public" / "assets"

LIQUID_URL = re.compile(r"\{\{\s*['\"]([^'\"]+)['\"]\s*\|\s*(?:relative_url|absolute_url)\s*\}\}")
MARKDOWN_ATTR = re.compile(r'\s+markdown="1"')
FIRST_H1 = re.compile(r"^#\s+.+?\s*$", re.MULTILINE)


def split_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---", 4)
    if end == -1:
        return {}, text
    raw = text[4:end].strip()
    body = text[end + 4:].lstrip("\n")
    data: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line or line.startswith(" "):
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"').strip("'")
    return data, body


def yaml_quote(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def dest_for(permalink: str) -> Path:
    # Astro lowercases route slugs, so normalize here to keep files, links, and
    # routes consistent (e.g. /Resources/resources/ -> /resources/resources/).
    slug = permalink.strip("/").lower()
    return DOCS_OUT / (slug + ".md")


# Internal links/srcs that point at a route (not a case-sensitive /assets/ file)
# must be lowercased to match Astro's lowercased routes.
INTERNAL_LINK = re.compile(r'(\]\(|href="|src=")(/[^)"\s]*)')


def _lower_internal(match: re.Match) -> str:
    prefix, path = match.group(1), match.group(2)
    if path.startswith("/assets/"):
        return prefix + path
    return prefix + path.lower()


REDIRECT_TARGET = re.compile(r"['\"]([^'\"]+)['\"]\s*\|\s*relative_url")


def transform_body(body: str) -> str:
    body = LIQUID_URL.sub(lambda m: m.group(1), body)
    body = MARKDOWN_ATTR.sub("", body)
    # Inline math delimiters \( ... \) -> $ ... $  (remark-math doesn't parse \().
    # \[ ... \] display delimiters are unused here; every \[ in the corpus is \\[Npt]
    # line-spacing inside math, which must be left untouched.
    body = body.replace(r"\(", "$").replace(r"\)", "$")
    body = INTERNAL_LINK.sub(_lower_internal, body)
    # Drop links to the deferred progress dashboard (not migrated yet).
    body = re.sub(r"^.*\(/notes/progress/\).*$\n?", "", body, flags=re.MULTILINE)
    # Drop the first H1; Starlight renders the page title itself.
    body = FIRST_H1.sub("", body, count=1).lstrip("\n")
    return body


def build_sidebar(nav: list[dict]) -> tuple[list[dict], set[str], set[str], list[str]]:
    """Reconstruct the sidebar tree from `parent`/`nav_order` (not folder layout).

    Returns (notes_items, prev_false_links, next_false_links, orphan_titles):
      * notes_items: Starlight sidebar entries for the Notes group.
      * prev_false / next_false: links that should hide their prev/next pagination
        button because they are the first/last page of a topic (group).
      * orphan_titles: pages whose parent has no matching page (dropped from nav).
    """
    children: dict[str, list[dict]] = defaultdict(list)
    for record in nav:
        children[record["parent"]].append(record)
    for group in children.values():
        group.sort(key=lambda r: (r["order"], r["title"].lower()))

    titles = {record["title"] for record in nav}
    orphans = [
        record["title"]
        for record in nav
        if record["parent"] and record["parent"] not in titles
    ]

    prev_false: set[str] = set()
    next_false: set[str] = set()
    ordered: list[tuple[str, str]] = []  # (link, topic label) in pagination order

    def build(record: dict, topic: str) -> dict:
        kids = children.get(record["title"], [])
        if not kids:
            ordered.append((record["link"], topic))
            return {"label": record["title"], "link": record["link"]}
        # A group: its own label is the topic for its Overview and direct children.
        label = record["title"]
        items: list[dict] = [{"label": "Overview", "link": record["link"]}]
        ordered.append((record["link"], label))
        for kid in kids:
            items.append(build(kid, label))
        return {"label": label, "items": items}

    # Root the tree at the page titled "Notes"; its children are the subjects.
    notes_record = next((r for r in nav if r["title"] == "Notes"), None)
    if notes_record is None:
        return [], prev_false, next_false, orphans
    notes_group = build(notes_record, "Notes")

    # Pagination follows the sidebar order (the `ordered` list). Hide the link
    # wherever two consecutive pages sit in different topics, plus the very
    # first/last page of the whole sequence.
    if ordered:
        prev_false.add(ordered[0][0])
        next_false.add(ordered[-1][0])
    for (link_a, topic_a), (link_b, topic_b) in zip(ordered, ordered[1:]):
        if topic_a != topic_b:
            next_false.add(link_a)
            prev_false.add(link_b)

    return notes_group["items"], prev_false, next_false, orphans


def patch_pagination(prev_false: set[str], next_false: set[str]) -> None:
    """Insert `prev: false` / `next: false` into the front matter of boundary pages."""
    for link in prev_false | next_false:
        dest = dest_for(link)
        if not dest.exists():
            continue
        text = dest.read_text(encoding="utf-8")
        lines = text.split("\n")
        extra = []
        if link in prev_false:
            extra.append("prev: false")
        if link in next_false:
            extra.append("next: false")
        # Insert right after the `title:` line (keeps them top-level in the YAML).
        for i, line in enumerate(lines):
            if line.startswith("title:"):
                lines[i + 1:i + 1] = extra
                break
        dest.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    if DOCS_OUT.joinpath("notes").exists():
        shutil.rmtree(DOCS_OUT / "notes")

    notes = sorted(NOTES_SRC.rglob("*.md"))
    written = 0
    skipped: list[str] = []
    flags: list[str] = []
    redirects: dict[str, str] = {}
    nav: list[dict] = []  # {title, parent, order, link} for sidebar reconstruction

    for path in notes:
        text = path.read_text(encoding="utf-8")
        fm, body = split_front_matter(text)
        rel = path.relative_to(REPO).as_posix()

        if path.name == "progress.md":
            skipped.append(f"{rel} (generated dashboard - deferred)")
            continue

        permalink = fm.get("permalink", "")
        if not permalink:
            skipped.append(f"{rel} (no permalink)")
            continue

        # Redirect stubs (window.location.replace) -> Astro redirects, not pages.
        if "window.location.replace" in body:
            match = REDIRECT_TARGET.search(body)
            if match:
                redirects[permalink.lower()] = match.group(1).lower()
                skipped.append(f"{rel} (redirect -> {match.group(1).lower()})")
                continue

        title = fm.get("title") or path.stem
        nav_order = fm.get("nav_order", "")

        new_fm = ["---", f"title: {yaml_quote(title)}"]
        if nav_order.strip().isdigit():
            new_fm += ["sidebar:", f"  order: {int(nav_order)}"]
        new_fm.append("---")

        new_body = transform_body(body)
        out = "\n".join(new_fm) + "\n\n" + new_body
        if not out.endswith("\n"):
            out += "\n"

        # Flag anything that may need a manual look.
        if "{{" in new_body or "{%" in new_body:
            flags.append(f"{rel} -> leftover Liquid")
        if re.search(r"\\\(|\\\[", new_body):
            flags.append(f"{rel} -> backslash-delimiter math (\\( or \\[)")

        order = int(nav_order) if nav_order.strip().lstrip("-").isdigit() else 999
        nav.append({
            "title": title,
            "parent": fm.get("parent", "").strip(),
            "order": order,
            "link": permalink.lower(),
        })

        dest = dest_for(permalink)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(out, encoding="utf-8")
        written += 1

    # Copy image/static assets so /assets/... URLs resolve.
    if ASSETS_SRC.exists():
        if ASSETS_OUT.exists():
            shutil.rmtree(ASSETS_OUT)
        shutil.copytree(ASSETS_SRC, ASSETS_OUT)

    # Reconstruct the sidebar from parent/nav_order, then hide prev/next at
    # topic boundaries so pagination never crosses into a different course.
    notes_items, prev_false, next_false, orphans = build_sidebar(nav)
    patch_pagination(prev_false, next_false)

    (ASTRO / "src" / "redirects.json").write_text(
        json.dumps(redirects, indent=2) + "\n", encoding="utf-8"
    )
    (ASTRO / "src" / "sidebar.json").write_text(
        json.dumps(notes_items, indent=2) + "\n", encoding="utf-8"
    )

    print(f"wrote {written} notes to {DOCS_OUT.relative_to(ASTRO)}/notes")
    print(f"wrote {len(redirects)} redirects to src/redirects.json")
    print(f"wrote sidebar.json ({len(notes_items)} top-level Notes entries)")
    print(f"pagination: {len(prev_false)} pages hide prev, {len(next_false)} hide next")
    if orphans:
        print(f"\norphans (parent not found, dropped from nav): {len(orphans)}")
        for title in orphans:
            print(f"  - {title}")
    if skipped:
        print("\nskipped:")
        for s in skipped:
            print(f"  - {s}")
    if flags:
        print("\nflags (manual review):")
        for f in flags:
            print(f"  - {f}")


if __name__ == "__main__":
    main()
