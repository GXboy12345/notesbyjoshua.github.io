#!/usr/bin/env python3
"""Generate the notes progress dashboard from Markdown front matter and content."""

from __future__ import annotations

import html
import re
from dataclasses import dataclass
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NOTES_DIR = ROOT / "Notes"
OUTPUT = NOTES_DIR / "progress.md"


STATUS_ORDER = [
    ("stub", 0, 15),
    ("outline", 15, 30),
    ("draft", 30, 60),
    ("developing", 60, 80),
    ("review", 80, 95),
    ("complete", 95, 100),
]


@dataclass
class NoteReport:
    path: Path
    title: str
    parent: str
    permalink: str
    kind: str
    status: str
    progress: int
    issues: list[str]
    next_step: str


def split_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text

    end = text.find("\n---", 4)
    if end == -1:
        return {}, text

    raw = text[4:end].strip()
    body = text[end + 4 :].lstrip("\n")
    data: dict[str, str] = {}

    for line in raw.splitlines():
        if ":" not in line or line.startswith(" "):
            continue
        key, value = line.split(":", 1)
        value = value.strip().strip('"').strip("'")
        data[key.strip()] = value

    return data, body


def clamp(value: int, low: int = 0, high: int = 100) -> int:
    return max(low, min(high, value))


def status_for_progress(progress: int) -> str:
    for status, low, high in STATUS_ORDER:
        if low <= progress < high:
            return status
    return "complete"


def first_h1(body: str) -> str:
    match = re.search(r"^#\s+(.+?)\s*$", body, flags=re.MULTILINE)
    return match.group(1).strip() if match else ""


def words(body: str) -> int:
    cleaned = re.sub(r"<[^>]+>", " ", body)
    cleaned = re.sub(r"\{\{.*?\}\}", " ", cleaned)
    return len(re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?", cleaned))


def count_markdown_links(body: str) -> int:
    return len(re.findall(r"\[[^\]]+\]\([^)]+\)", body))


def classify(path: Path, fm: dict[str, str], body: str) -> str:
    title = fm.get("title", "")
    if "window.location.replace" in body or title.endswith("(redirect)"):
        return "redirect"
    if path == NOTES_DIR / "notes.md" or re.search(r"^##\s+Units\s*$", body, re.MULTILINE):
        return "index"
    if path.parent == NOTES_DIR or re.search(r"^##\s+Subjects\s*$", body, re.MULTILINE):
        return "index"
    return "unit"


def has_section(body: str, names: tuple[str, ...]) -> bool:
    pattern = r"^##\s+(" + "|".join(re.escape(name) for name in names) + r")\s*$"
    return bool(re.search(pattern, body, flags=re.IGNORECASE | re.MULTILINE))


def score_unit(path: Path, fm: dict[str, str], body: str) -> tuple[int, list[str]]:
    issues: list[str] = []
    title = fm.get("title", "")
    h1 = first_h1(body)
    word_count = words(body)
    headings = len(re.findall(r"^##\s+", body, flags=re.MULTILINE))
    theorem_boxes = body.count('<div class="theorem-box" markdown="1">')
    closing_divs = body.count("</div>")
    examples = len(re.findall(r"\*\*Example\.\*\*", body))
    proofs = len(re.findall(r"\*\*Proof \(.+?\)\.\*\*", body))
    placeholders = len(re.findall(r"Placeholder|TODO", body, flags=re.IGNORECASE))
    practice = has_section(body, ("Practice", "Practice Problems"))
    solutions = has_section(body, ("Solutions",))

    structure = 0
    required = ("layout", "title", "parent", "nav_order", "permalink")
    missing = [key for key in required if not fm.get(key)]
    structure += 5 if fm else 0
    structure += 3 if fm.get("layout") else 0
    structure += 3 if title else 0
    structure += 3 if fm.get("parent") else 0
    structure += 3 if fm.get("nav_order") else 0
    structure += 3 if fm.get("permalink") else 0
    structure = min(structure, 20)

    if missing:
        issues.append("missing front matter: " + ", ".join(missing))
    if not h1:
        issues.append("missing H1")
    elif title and h1.strip('"') != title.strip('"'):
        issues.append("title/H1 mismatch")

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
    if closing_divs < theorem_boxes:
        polish -= 4
        issues.append("possible unbalanced theorem boxes")
    if re.search(r"\$\$[^$\n]*\|[^$\n]*\$\$|\\\([^)\n]*\|[^)\n]*\\\)", body):
        issues.append("check vertical bars in math")
    polish = max(0, polish)

    return clamp(structure + coverage + example_score + practice_score + solutions_score + polish), issues


def score_index(fm: dict[str, str], body: str) -> tuple[int, list[str]]:
    issues: list[str] = []
    title = fm.get("title", "")
    h1 = first_h1(body)
    links = count_markdown_links(body)
    headings = len(re.findall(r"^##\s+", body, flags=re.MULTILINE))
    placeholders = len(re.findall(r"Placeholder|TODO|coming soon", body, flags=re.IGNORECASE))

    structure = 0
    for key in ("layout", "title", "nav_order", "permalink"):
        structure += 7 if fm.get(key) else 0
    structure = min(30, structure)
    if not fm.get("permalink"):
        issues.append("missing permalink")
    if not h1:
        issues.append("missing H1")
    elif title and h1.strip('"') != title.strip('"'):
        issues.append("title/H1 mismatch")

    navigation = min(30, links * 5 + headings * 3)
    if links < 2:
        issues.append("few navigation links")

    coverage = min(25, round(min(words(body), 500) / 500 * 25))
    polish = 15
    if placeholders:
        polish -= min(10, placeholders * 3)
        issues.append("has TODOs/placeholders")

    return clamp(structure + navigation + coverage + max(0, polish)), issues


def note_next_step(issues: list[str], kind: str) -> str:
    if not issues:
        return "Review for accuracy"
    priorities = [
        ("missing front matter", "Standardize front matter"),
        ("missing H1", "Add the page H1"),
        ("title/H1 mismatch", "Align title and H1"),
        ("thin explanations", "Expand core explanations"),
        ("few or no worked boxes", "Add worked examples"),
        ("missing practice", "Add practice problems"),
        ("practice without solutions", "Add matching solutions"),
        ("missing solutions", "Add solutions"),
        ("has TODOs/placeholders", "Resolve placeholders"),
        ("unbalanced theorem boxes", "Fix theorem-box markup"),
        ("few navigation links", "Improve navigation links"),
    ]
    for needle, action in priorities:
        if any(needle in issue for issue in issues):
            return action
    return "Run a focused review" if kind == "unit" else "Polish navigation"


def explicit_progress(fm: dict[str, str]) -> int | None:
    raw = fm.get("progress", "")
    match = re.search(r"\d+", raw)
    if not match:
        return None
    return clamp(int(match.group(0)))


def report_for(path: Path) -> NoteReport:
    text = path.read_text(encoding="utf-8")
    fm, body = split_front_matter(text)
    kind = classify(path, fm, body)

    if kind == "unit":
        inferred, issues = score_unit(path, fm, body)
    elif kind == "index":
        inferred, issues = score_index(fm, body)
    else:
        inferred, issues = score_index(fm, body)
        issues = [issue for issue in issues if issue != "few navigation links"]

    progress = explicit_progress(fm)
    if progress is None:
        progress = inferred

    status = fm.get("status") or status_for_progress(progress)
    title = fm.get("title") or first_h1(body) or path.stem
    parent = fm.get("parent") or "Notes"
    permalink = fm.get("permalink") or "/" + path.relative_to(ROOT).with_suffix("").as_posix() + "/"

    return NoteReport(
        path=path,
        title=title,
        parent=parent,
        permalink=permalink,
        kind=kind,
        status=status,
        progress=progress,
        issues=issues,
        next_step=note_next_step(issues, kind),
    )


def progress_bar(progress: int) -> str:
    label = f"{progress}%"
    return (
        '<div class="note-progress" aria-label="Progress: '
        + label
        + '">'
        + f'<span class="note-progress__fill" style="width: {progress}%"></span>'
        + f'<span class="note-progress__label">{label}</span>'
        + "</div>"
    )


def render(reports: list[NoteReport]) -> str:
    unit_reports = [report for report in reports if report.kind == "unit"]
    avg = round(sum(report.progress for report in unit_reports) / len(unit_reports)) if unit_reports else 0
    incomplete = sum(1 for report in unit_reports if report.progress < 95)
    placeholders = sum(1 for report in unit_reports if any("placeholder" in issue.lower() for issue in report.issues))

    lines = [
        "---",
        "layout: default",
        'title: "Notes Progress"',
        "parent: Notes",
        "nav_order: 99",
        "permalink: /notes/progress/",
        "has_toc: false",
        "---",
        "",
        "# Notes Progress",
        "",
        "<!-- This file is generated by scripts/update_progress_report.py. Do not edit by hand. -->",
        "",
        f"Last generated: {date.today().isoformat()}",
        "",
        '<div class="progress-summary">',
        f'<div><strong>{len(unit_reports)}</strong><span>unit pages tracked</span></div>',
        f'<div><strong>{avg}%</strong><span>average progress</span></div>',
        f'<div><strong>{incomplete}</strong><span>pages below complete</span></div>',
        f'<div><strong>{placeholders}</strong><span>pages with placeholders</span></div>',
        "</div>",
        "",
        "## Unit Notes",
        "",
        '<table class="notes-progress-table">',
        "<thead>",
        "<tr>",
        "<th>Page</th>",
        "<th>Course</th>",
        "<th>Status</th>",
        "<th>Progress</th>",
        "<th>Main Issues</th>",
        "<th>Next Step</th>",
        "</tr>",
        "</thead>",
        "<tbody>",
    ]

    for report in sorted(unit_reports, key=lambda item: (item.parent.lower(), item.progress, item.title.lower())):
        issues = ", ".join(report.issues[:3]) if report.issues else "none flagged"
        rel_path = report.path.relative_to(ROOT).as_posix()
        lines.extend(
            [
                "<tr>",
                f'<td><a href="{{{{ \'{report.permalink}\' | relative_url }}}}">{html.escape(report.title)}</a><br><small>{html.escape(rel_path)}</small></td>',
                f"<td>{html.escape(report.parent)}</td>",
                f"<td><span class=\"note-status note-status--{html.escape(report.status)}\">{html.escape(report.status)}</span></td>",
                f"<td>{progress_bar(report.progress)}</td>",
                f"<td>{html.escape(issues)}</td>",
                f"<td>{html.escape(report.next_step)}</td>",
                "</tr>",
            ]
        )

    lines.extend(["</tbody>", "</table>", "", "## Index and Redirect Pages", ""])
    lines.extend(
        [
            '<table class="notes-progress-table notes-progress-table--compact">',
            "<thead>",
            "<tr><th>Page</th><th>Type</th><th>Progress</th><th>Main Issues</th></tr>",
            "</thead>",
            "<tbody>",
        ]
    )

    for report in sorted((r for r in reports if r.kind != "unit"), key=lambda item: item.title.lower()):
        issues = ", ".join(report.issues[:3]) if report.issues else "none flagged"
        lines.extend(
            [
                "<tr>",
                f'<td><a href="{{{{ \'{report.permalink}\' | relative_url }}}}">{html.escape(report.title)}</a></td>',
                f"<td>{html.escape(report.kind)}</td>",
                f"<td>{progress_bar(report.progress)}</td>",
                f"<td>{html.escape(issues)}</td>",
                "</tr>",
            ]
        )

    lines.extend(["</tbody>", "</table>", ""])
    return "\n".join(lines)


def main() -> None:
    paths = sorted(NOTES_DIR.rglob("*.md"))
    reports = [report_for(path) for path in paths if path != OUTPUT]
    OUTPUT.write_text(render(reports), encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(ROOT)} with {len(reports)} pages")


if __name__ == "__main__":
    main()
