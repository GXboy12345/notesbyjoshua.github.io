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

import re
import shutil
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
    slug = permalink.strip("/")
    return DOCS_OUT / (slug + ".md")


REDIRECT_TARGET = re.compile(r"['\"]([^'\"]+)['\"]\s*\|\s*relative_url")


def transform_body(body: str) -> str:
    body = LIQUID_URL.sub(lambda m: m.group(1), body)
    body = MARKDOWN_ATTR.sub("", body)
    # Inline math delimiters \( ... \) -> $ ... $  (remark-math doesn't parse \().
    # \[ ... \] display delimiters are unused here; every \[ in the corpus is \\[Npt]
    # line-spacing inside math, which must be left untouched.
    body = body.replace(r"\(", "$").replace(r"\)", "$")
    # Drop the first H1; Starlight renders the page title itself.
    body = FIRST_H1.sub("", body, count=1).lstrip("\n")
    return body


def main() -> None:
    if DOCS_OUT.joinpath("notes").exists():
        shutil.rmtree(DOCS_OUT / "notes")

    notes = sorted(NOTES_SRC.rglob("*.md"))
    written = 0
    skipped: list[str] = []
    flags: list[str] = []
    redirects: dict[str, str] = {}

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
                redirects[permalink] = match.group(1)
                skipped.append(f"{rel} (redirect -> {match.group(1)})")
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

        dest = dest_for(permalink)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(out, encoding="utf-8")
        written += 1

    # Copy image/static assets so /assets/... URLs resolve.
    if ASSETS_SRC.exists():
        if ASSETS_OUT.exists():
            shutil.rmtree(ASSETS_OUT)
        shutil.copytree(ASSETS_SRC, ASSETS_OUT)

    # Emit redirects for astro.config.mjs to import.
    import json
    (ASTRO / "src" / "redirects.json").write_text(
        json.dumps(redirects, indent=2) + "\n", encoding="utf-8"
    )

    print(f"wrote {written} notes to {DOCS_OUT.relative_to(ASTRO)}/notes")
    print(f"wrote {len(redirects)} redirects to src/redirects.json")
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
