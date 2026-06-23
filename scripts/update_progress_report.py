#!/usr/bin/env python3
"""Generate the notes progress dashboard from Markdown front matter and content."""

from __future__ import annotations

import html
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NOTES_DIR = ROOT / "Notes"
OUTPUT = NOTES_DIR / "progress.md"
ADMIN_DATA_OUTPUT = ROOT / "assets" / "data" / "admin-dashboard.json"
ADMIN_BODY_OUTPUT = ROOT / "_includes" / "admin-dashboard-body.html"


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


def admin_payload(reports: list[NoteReport]) -> dict[str, object]:
    unit_reports = [report for report in reports if report.kind == "unit"]
    by_parent: dict[str, list[NoteReport]] = defaultdict(list)
    status_counts = Counter(report.status for report in unit_reports)
    issue_counts = Counter(issue for report in unit_reports for issue in report.issues)

    for report in unit_reports:
        by_parent[report.parent].append(report)

    avg = round(sum(report.progress for report in unit_reports) / len(unit_reports)) if unit_reports else 0
    complete = sum(1 for report in unit_reports if report.progress >= 95)
    below_review = sum(1 for report in unit_reports if report.progress < 80)
    placeholders = sum(1 for report in unit_reports if any("placeholder" in issue.lower() for issue in report.issues))
    missing_practice = sum(1 for report in unit_reports if "missing practice" in report.issues)
    missing_solutions = sum(1 for report in unit_reports if "missing solutions" in report.issues or "practice without solutions" in report.issues)

    courses = []
    for parent, items in sorted(by_parent.items()):
        course_avg = round(sum(item.progress for item in items) / len(items))
        courses.append(
            {
                "name": parent,
                "pages": len(items),
                "average_progress": course_avg,
                "complete_pages": sum(1 for item in items if item.progress >= 95),
                "below_review_pages": sum(1 for item in items if item.progress < 80),
            }
        )

    pages = []
    for report in sorted(unit_reports, key=lambda item: (item.progress, item.parent.lower(), item.title.lower())):
        pages.append(
            {
                "title": report.title,
                "parent": report.parent,
                "path": report.path.relative_to(ROOT).as_posix(),
                "permalink": report.permalink,
                "kind": report.kind,
                "status": report.status,
                "progress": report.progress,
                "issues": report.issues,
                "next_step": report.next_step,
            }
        )

    return {
        "generated_at": date.today().isoformat(),
        "summary": {
            "unit_pages": len(unit_reports),
            "all_pages": len(reports),
            "average_progress": avg,
            "complete_pages": complete,
            "below_review_pages": below_review,
            "pages_with_placeholders": placeholders,
            "missing_practice_pages": missing_practice,
            "missing_solutions_pages": missing_solutions,
        },
        "status_counts": dict(sorted(status_counts.items())),
        "top_issues": [{"issue": issue, "count": count} for issue, count in issue_counts.most_common(10)],
        "courses": courses,
        "priority_pages": pages[:15],
        "pages": pages,
    }


def render_admin_body(payload: dict[str, object]) -> str:
    summary = payload["summary"]
    courses = payload["courses"]
    priority_pages = payload["priority_pages"]
    top_issues = payload["top_issues"]

    def metric(label: str, value: object) -> str:
        return f'<div class="admin-metric"><strong>{html.escape(str(value))}</strong><span>{html.escape(label)}</span></div>'

    lines = [
        '<div class="admin-actions">',
        '  <a class="admin-action" href="{{ \'/notes/progress/\' | relative_url }}">Open Progress Page</a>',
        '  <a class="admin-action" href="https://analytics.google.com/" rel="noopener" target="_blank">Open Google Analytics</a>',
        '  <button class="admin-action admin-action--button" id="admin-lock-button" type="button">Lock</button>',
        "</div>",
        "",
        '<section class="admin-section">',
        "  <h2>Notes Overview</h2>",
        '  <div class="admin-metric-grid">',
        f'    {metric("unit pages", summary["unit_pages"])}',
        f'    {metric("all notes pages", summary["all_pages"])}',
        f'    {metric("average progress", str(summary["average_progress"]) + "%")}',
        f'    {metric("complete pages", summary["complete_pages"])}',
        f'    {metric("below review", summary["below_review_pages"])}',
        f'    {metric("with placeholders", summary["pages_with_placeholders"])}',
        f'    {metric("missing practice", summary["missing_practice_pages"])}',
        f'    {metric("missing solutions", summary["missing_solutions_pages"])}',
        "  </div>",
        "</section>",
        "",
        '<section class="admin-section">',
        "  <h2>Course Progress</h2>",
        '  <div class="admin-course-list">',
    ]

    for course in courses:
        lines.extend(
            [
                '    <div class="admin-course">',
                f'      <div class="admin-course__head"><strong>{html.escape(course["name"])}</strong><span>{course["pages"]} pages</span></div>',
                f'      {progress_bar(course["average_progress"])}',
                f'      <div class="admin-course__meta">{course["complete_pages"]} complete &middot; {course["below_review_pages"]} below review</div>',
                "    </div>",
            ]
        )

    lines.extend(
        [
            "  </div>",
            "</section>",
            "",
            '<section class="admin-section">',
            "  <h2>Priority Pages</h2>",
            '  <table class="notes-progress-table admin-priority-table">',
            "    <thead>",
            "      <tr>",
            "        <th>Page</th>",
            "        <th>Course</th>",
            "        <th>Status</th>",
            "        <th>Progress</th>",
            "        <th>Main Issues</th>",
            "        <th>Next Step</th>",
            "      </tr>",
            "    </thead>",
            "    <tbody>",
        ]
    )

    for page in priority_pages:
        issues = ", ".join(page["issues"][:3]) if page["issues"] else "none flagged"
        lines.extend(
            [
                "      <tr>",
                f'        <td><a href="{{{{ \'{page["permalink"]}\' | relative_url }}}}">{html.escape(page["title"])}</a><br><small>{html.escape(page["path"])}</small></td>',
                f'        <td>{html.escape(page["parent"])}</td>',
                f'        <td><span class="note-status note-status--{html.escape(page["status"])}">{html.escape(page["status"])}</span></td>',
                f'        <td>{progress_bar(page["progress"])}</td>',
                f'        <td>{html.escape(issues)}</td>',
                f'        <td>{html.escape(page["next_step"])}</td>',
                "      </tr>",
            ]
        )

    lines.extend(
        [
            "    </tbody>",
            "  </table>",
            "</section>",
            "",
            '<section class="admin-section">',
            "  <h2>Issue Counts</h2>",
            '  <div class="admin-issue-list">',
        ]
    )

    for item in top_issues:
        lines.append(
            f'    <div class="admin-issue"><span>{html.escape(item["issue"])}</span><strong>{item["count"]}</strong></div>'
        )

    lines.extend(
        [
            "  </div>",
            "</section>",
            "",
            '<section class="admin-section">',
            "  <h2>Google Analytics</h2>",
            '  <div class="admin-ga-panel">',
            "    <p>Google Analytics tracking is installed through the site tag. Live private analytics cannot be safely pulled into a public GitHub Pages page without exposing credentials.</p>",
            "    <p>Use the button above to open the GA dashboard, or embed a Looker Studio report here later if you create a shareable report URL.</p>",
            "    <dl>",
            "      <div>",
            "        <dt>Measurement ID</dt>",
            "        <dd><code>G-868QCS9DJP</code></dd>",
            "      </div>",
            "      <div>",
            "        <dt>Tracking Status</dt>",
            "        <dd>Tag present in <code>_includes/head_custom.html</code></dd>",
            "      </div>",
            "    </dl>",
            "  </div>",
            "</section>",
            "",
        ]
    )

    return "\n".join(lines)


def main() -> None:
    paths = sorted(NOTES_DIR.rglob("*.md"))
    reports = [report_for(path) for path in paths if path != OUTPUT]
    payload = admin_payload(reports)
    OUTPUT.write_text(render(reports), encoding="utf-8")
    ADMIN_DATA_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    ADMIN_DATA_OUTPUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    ADMIN_BODY_OUTPUT.write_text(render_admin_body(payload), encoding="utf-8")
    print(
        f"wrote {OUTPUT.relative_to(ROOT)}, {ADMIN_DATA_OUTPUT.relative_to(ROOT)}, "
        f"and {ADMIN_BODY_OUTPUT.relative_to(ROOT)} with {len(reports)} pages"
    )


if __name__ == "__main__":
    main()
