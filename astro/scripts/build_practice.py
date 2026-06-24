#!/usr/bin/env python3
"""Aggregate every note's Practice + Solutions into per-course practice pages.

Walks the notes sidebar (src/sidebar.json), and for each unit page that has a
`## Practice` section, lifts that section and the matching `## Solutions`
section verbatim. Worked examples in the body are NOT included -- only the
Practice/Solutions blocks. Pages are grouped by their sidebar course (the unit's
immediate parent group) and written to src/content/docs/practiceproblems/, one
markdown file per course, with each unit as a section. A practice.md overview
links to them.

Headings inside each lifted block are demoted one level so the unit title sits
at H2, "Practice"/"Solutions" at H3, and "MCQ"/"FRQ"/"Solution N" at H4. The
generated files are plain markdown, so KaTeX math and theorem boxes render the
same way they do on the source notes.

Re-run after editing notes: `python3 scripts/build_practice.py`.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ASTRO = Path(__file__).resolve().parents[1]
DOCS = ASTRO / "src" / "content" / "docs"
SIDEBAR = ASTRO / "src" / "sidebar.json"
OUT_DIR = DOCS / "practiceproblems"

GENERATED_NOTE = (
    "_Auto-collected from the practice sections of each unit's notes "
    "(`scripts/build_practice.py`). Edit the source notes, not this page._"
)

# The competition-prep groups are the only Physics/Chemistry content, so present
# them under the plain subject name (kept in sync with scripts/notes_progress.py).
COURSE_RENAME = {
    "Physics Competition Prep": "Physics",
    "Chemistry Competition Prep": "Chemistry",
}


def split_front_matter(text: str) -> tuple[str, str]:
    if not text.startswith("---\n"):
        return "", text
    end = text.find("\n---", 4)
    if end == -1:
        return "", text
    return text[4:end], text[end + 4:].lstrip("\n")


def slugify(label: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")
    return s or "course"


def route_to_path(link: str) -> Path:
    # "/notes/ap/chem/kinetics/" -> docs/notes/ap/chem/kinetics.md
    rel = link.strip("/")
    return DOCS / (rel + ".md")


def count_problems(section: str) -> int:
    """Numbered problems (`1.`, `2.`, …) in a practice block."""
    return len(re.findall(r"(?m)^\s*\d+\.\s", section))


def demote_headings(block: str) -> str:
    """Add one '#' to every ATX heading line so the unit title can be H2."""
    out = []
    for line in block.splitlines():
        m = re.match(r"^(#{1,5})(\s)", line)
        if m:
            line = "#" + line
        out.append(line)
    return "\n".join(out)


# `## Practice` (or `## Practice Problems`) up to the next H2; then `## Solutions`
# to the next H2 (or end of file). Captures the heading line itself too.
def extract_section(body: str, head_re: str) -> str:
    pattern = re.compile(
        r"^##\s+" + head_re + r"\s*$.*?(?=^##\s|\Z)",
        flags=re.IGNORECASE | re.MULTILINE | re.DOTALL,
    )
    m = pattern.search(body)
    return m.group(0).rstrip() if m else ""


def course_units() -> list[tuple[str, list[tuple[str, str]]]]:
    """Ordered [(course_label, [(unit_label, link), ...])] from the sidebar.

    A unit's course is the label of its immediate parent group.
    """
    courses: dict[str, list[tuple[str, str]]] = {}
    order: list[str] = []

    def add(course: str, label: str, link: str) -> None:
        course = COURSE_RENAME.get(course, course)
        if course not in courses:
            courses[course] = []
            order.append(course)
        courses[course].append((label, link))

    def walk(items: list, parent: str) -> None:
        for it in items:
            if "items" in it:
                walk(it["items"], it["label"])
            elif "link" in it:
                add(parent, it["label"], it["link"])

    walk(json.loads(SIDEBAR.read_text()), "Notes")
    return [(c, courses[c]) for c in order]


def build_unit_block(unit_label: str, link: str, practice: str, solutions: str) -> str:
    parts = [f"## {unit_label}", "", f"[Full notes →]({link})", ""]
    parts.append(demote_headings(practice))
    if solutions:
        parts.append("")
        parts.append(demote_headings(solutions))
    return "\n".join(parts).rstrip() + "\n"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    # Every page here is generated; clear stale ones (e.g. renamed courses) first.
    for old in OUT_DIR.glob("*.md"):
        old.unlink()

    overview_rows: list[tuple[str, str, int]] = []  # (course, slug, unit count)
    order = 1
    for course, units in course_units():
        blocks: list[str] = []
        for unit_label, link in units:
            path = route_to_path(link)
            if not path.exists():
                continue
            _, body = split_front_matter(path.read_text(encoding="utf-8"))
            practice = extract_section(body, r"Practice(?:\s+Problems)?")
            # Skip empty "## Practice Problems" outlines (e.g. landing pages).
            if not practice or count_problems(practice) == 0:
                continue
            solutions = extract_section(body, r"Solutions")
            blocks.append(build_unit_block(unit_label, link, practice, solutions))

        if not blocks:
            continue

        slug = slugify(course)
        front = (
            "---\n"
            f'title: "{course} — Practice"\n'
            f"sidebar:\n"
            f'  label: "{course}"\n'
            f"  order: {order}\n"
            "prev: false\n"
            "next: false\n"
            "tableOfContents:\n"
            "  maxHeadingLevel: 2\n"
            "---\n\n"
        )
        intro = (
            f"All practice problems and solutions for **{course}**, organized by unit. "
            "Worked examples stay on the unit pages.\n\n"
            f"{GENERATED_NOTE}\n\n"
        )
        (OUT_DIR / f"{slug}.md").write_text(front + intro + "\n".join(blocks), encoding="utf-8")
        overview_rows.append((course, slug, len(blocks)))
        order += 1

    # Overview / landing page that links to each generated course page.
    lines = [
        "---",
        "title: Practice Problems",
        "sidebar:",
        "  label: Overview",
        "  order: 0",
        "prev: false",
        "next: false",
        "---",
        "",
        "Every unit's practice problems and solutions, collected and organized by unit. "
        "Pick a course below. (Worked examples remain on the individual note pages.)",
        "",
        GENERATED_NOTE,
        "",
    ]
    for course, slug, count in overview_rows:
        noun = "unit" if count == 1 else "units"
        lines.append(f"- [{course}](/practiceproblems/{slug}/) — {count} {noun}")
    lines.append("")
    (OUT_DIR / "practice.md").write_text("\n".join(lines), encoding="utf-8")

    total_units = sum(c for _, _, c in overview_rows)
    print(
        f"wrote {len(overview_rows)} course page(s) + overview to "
        f"{OUT_DIR.relative_to(ASTRO)}: {total_units} units with practice"
    )


if __name__ == "__main__":
    main()
