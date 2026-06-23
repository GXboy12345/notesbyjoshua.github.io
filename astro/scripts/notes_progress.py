#!/usr/bin/env python3
"""Score each Astro note for completeness (stub..complete) and emit JSON.

Reads src/content/docs/notes/**/*.md, infers a 0-100 progress score from the
content (length, headings, worked examples, practice/solutions, placeholders),
and writes src/data/notes-progress.json for the admin progress page.

Adapted from the old Jekyll scripts/update_progress_report.py for Astro content:
theorem boxes are now <div class="theorem-box"> (no markdown="1"), the H1 is the
front-matter title, and course grouping comes from src/sidebar.json.
"""

from __future__ import annotations

import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

ASTRO = Path(__file__).resolve().parents[1]
NOTES = ASTRO / "src" / "content" / "docs" / "notes"
SIDEBAR = ASTRO / "src" / "sidebar.json"
OUT = ASTRO / "src" / "data" / "notes-progress.json"

STATUS_ORDER = [
    ("stub", 0, 15),
    ("outline", 15, 30),
    ("draft", 30, 60),
    ("developing", 60, 80),
    ("review", 80, 95),
    ("complete", 95, 101),
]


def status_for(progress: int) -> str:
    for status, low, high in STATUS_ORDER:
        if low <= progress < high:
            return status
    return "complete"


def split_front_matter(text: str) -> tuple[str, str]:
    if not text.startswith("---\n"):
        return "", text
    end = text.find("\n---", 4)
    if end == -1:
        return "", text
    fm = text[4:end]
    body = text[end + 4:].lstrip("\n")
    return fm, body


def fm_title(fm: str) -> str:
    m = re.search(r"^title:\s*(.+?)\s*$", fm, flags=re.MULTILINE)
    return m.group(1).strip().strip('"').strip("'") if m else ""


def words(body: str) -> int:
    cleaned = re.sub(r"<[^>]+>", " ", body)
    return len(re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?", cleaned))


def has_section(body: str, names: tuple[str, ...]) -> bool:
    pattern = r"^##\s+(" + "|".join(re.escape(n) for n in names) + r")\s*$"
    return bool(re.search(pattern, body, flags=re.IGNORECASE | re.MULTILINE))


def count_links(body: str) -> int:
    return len(re.findall(r"\[[^\]]+\]\([^)]+\)", body))


def clamp(v: int, lo: int = 0, hi: int = 100) -> int:
    return max(lo, min(hi, v))


def is_index(body: str) -> bool:
    # Course/subject landing pages: short, link-heavy, or list units/subjects.
    if has_section(body, ("Units", "Subjects", "Quick Reference")):
        return True
    return words(body) < 400 and count_links(body) >= 3


def score_index(body: str) -> tuple[int, list[str]]:
    issues: list[str] = []
    links = count_links(body)
    headings = len(re.findall(r"^##\s+", body, flags=re.MULTILINE))
    placeholders = len(re.findall(r"Placeholder|TODO|coming soon", body, re.IGNORECASE))
    structure = 30
    navigation = min(30, links * 5 + headings * 3)
    if links < 2:
        issues.append("few navigation links")
    coverage = min(25, round(min(words(body), 500) / 500 * 25))
    polish = 15
    if placeholders:
        polish -= min(10, placeholders * 3)
        issues.append("has TODOs/placeholders")
    return clamp(structure + navigation + coverage + max(0, polish)), issues


def score_unit(fm: str, body: str) -> tuple[int, list[str]]:
    issues: list[str] = []
    word_count = words(body)
    headings = len(re.findall(r"^##\s+", body, flags=re.MULTILINE))
    theorem_boxes = len(re.findall(r'<div class="theorem-box"', body))
    examples = len(re.findall(r"\*\*Example\.\*\*", body))
    proofs = len(re.findall(r"\*\*Proof \(.+?\)\.\*\*", body))
    placeholders = len(re.findall(r"Placeholder|TODO", body, re.IGNORECASE))
    practice = has_section(body, ("Practice", "Practice Problems"))
    solutions = has_section(body, ("Solutions",))

    # Front matter is uniform in Astro (title always present), so structure is a
    # flat baseline; content components below do the differentiating.
    structure = 15 if fm_title(fm) else 5

    coverage = min(25, round(min(word_count, 1400) / 1400 * 18) + min(headings, 7))
    if word_count < 450:
        issues.append("thin explanations")

    example_score = min(15, theorem_boxes * 3 + examples * 2 + proofs * 2)
    if theorem_boxes == 0 and word_count > 700:
        issues.append("few or no worked boxes")

    practice_score = 15 if practice else 0
    solutions_score = 15 if solutions else 0
    if not practice:
        issues.append("missing practice")
    if practice and not solutions:
        issues.append("practice without solutions")
    elif not solutions:
        issues.append("missing solutions")

    polish = 10
    if placeholders:
        polish -= min(6, placeholders * 2)
        issues.append("has TODOs/placeholders")

    total = structure + coverage + example_score + practice_score + solutions_score + max(0, polish)
    return clamp(total), issues


NEXT_STEPS = [
    ("thin explanations", "Expand core explanations"),
    ("few or no worked boxes", "Add worked examples"),
    ("missing practice", "Add practice problems"),
    ("practice without solutions", "Add matching solutions"),
    ("missing solutions", "Add solutions"),
    ("has TODOs/placeholders", "Resolve placeholders"),
    ("few navigation links", "Improve navigation links"),
]


def next_step(issues: list[str]) -> str:
    for needle, action in NEXT_STEPS:
        if any(needle in i for i in issues):
            return action
    return "Review for accuracy" if not issues else "Run a focused review"


def route_for(path: Path) -> str:
    rel = path.relative_to(ASTRO / "src" / "content" / "docs").with_suffix("").as_posix()
    return "/" + rel + "/"


def course_map() -> dict[str, str]:
    """route -> course label, from the generated sidebar tree."""
    mapping: dict[str, str] = {}
    if not SIDEBAR.exists():
        return mapping

    def walk(items, label):
        for it in items:
            if "items" in it:
                walk(it["items"], it["label"])
            elif "link" in it:
                mapping[it["link"]] = label

    for it in json.loads(SIDEBAR.read_text()):
        if "items" in it:
            walk(it["items"], it["label"])
        elif "link" in it:
            mapping[it["link"]] = "Notes"
    return mapping


def main() -> None:
    courses = course_map()
    entries = []
    for path in sorted(NOTES.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        fm, body = split_front_matter(text)
        route = route_for(path)
        if is_index(body):
            kind = "index"
            progress, issues = score_index(body)
        else:
            kind = "unit"
            progress, issues = score_unit(fm, body)
        entries.append({
            "title": fm_title(fm) or path.stem,
            "route": route,
            "course": courses.get(route, "Notes"),
            "kind": kind,
            "status": status_for(progress),
            "progress": progress,
            "issues": issues[:3],
            "next_step": next_step(issues),
        })

    units = [e for e in entries if e["kind"] == "unit"]
    avg = round(sum(e["progress"] for e in units) / len(units)) if units else 0
    summary = {
        "generated_at": date.today().isoformat(),
        "unit_pages": len(units),
        "all_pages": len(entries),
        "average_progress": avg,
        "below_complete": sum(1 for e in units if e["progress"] < 95),
        "with_placeholders": sum(1 for e in units if any("placeholder" in i.lower() for i in e["issues"])),
    }
    # Least-done first — most actionable.
    entries.sort(key=lambda e: (e["progress"], e["course"].lower(), e["title"].lower()))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"summary": summary, "pages": entries}, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ASTRO)}: {len(entries)} pages, avg {avg}% across {len(units)} units")


if __name__ == "__main__":
    main()
