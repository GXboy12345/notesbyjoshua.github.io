#!/usr/bin/env python3
"""Lint Astro notes for formatting and KaTeX/math-syntax problems.

A small, dependency-free "ruff for notes". It enforces the conventions in
`how-to-write-notes.md` (see repo root) and catches the math/markup mistakes
that silently break Starlight + rehype-katex rendering — unclosed `$$`,
mismatched `\\left`/`\\right`, stray `</div>`, and so on.

Usage:
    python3 scripts/check_notes.py                  # lint all notes
    python3 scripts/check_notes.py path/to/note.md  # lint specific files
    python3 scripts/check_notes.py --fix            # apply safe auto-fixes, then lint
    python3 scripts/check_notes.py --strict         # warnings fail too
    python3 scripts/check_notes.py --quiet          # errors only

--fix only applies the deterministic, content-preserving fixes (single '$' →
'$$', dropping markdown="1", blank lines around theorem boxes). Ambiguous
structural problems (unclosed '$$', unbalanced braces/divs/\\left-\\right,
missing title) are reported for a human to fix, never guessed at.

Exit status is 0 when clean (1 with --strict and warnings), 1 on any error.
This is what the pre-commit / pre-push git hooks run; install them once with
`scripts/install-hooks.sh` from the repo root.

A file may opt out entirely with an HTML comment anywhere in it:
    <!-- check-notes: disable -->
which is how the generated practice pages skip duplicate reporting.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path

ASTRO = Path(__file__).resolve().parents[1]
NOTES = ASTRO / "src" / "content" / "docs" / "notes"

DISABLE_MARKER = "check-notes: disable"

# Errors break rendering or page structure → they block commits/pushes.
# Warnings are style/consistency nits → reported, but non-fatal unless --strict.
ERROR = "error"
WARN = "warning"


@dataclass
class Finding:
    line: int
    col: int
    level: str
    code: str
    message: str


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def line_starts(text: str) -> list[int]:
    """Char offset of the start of each line (1-indexed lines)."""
    starts = [0]
    for i, ch in enumerate(text):
        if ch == "\n":
            starts.append(i + 1)
    return starts


def loc(starts: list[int], offset: int) -> tuple[int, int]:
    """(line, col) for a char offset, both 1-indexed."""
    # binary search would be faster, but notes are small.
    line = 0
    for i, s in enumerate(starts):
        if s > offset:
            break
        line = i
    return line + 1, offset - starts[line] + 1


def mask(text: str, pattern: re.Pattern) -> str:
    """Blank out regions matching `pattern`, preserving length and newlines.

    Used to hide fenced code blocks, inline code, and front matter so their
    contents do not get counted as math or markup.
    """
    def blank(m: re.Match) -> str:
        return "".join("\n" if c == "\n" else " " for c in m.group(0))

    return pattern.sub(blank, text)


FENCED_CODE = re.compile(r"(?ms)^[ \t]*(`{3,}|~{3,}).*?^[ \t]*\1[ \t]*$")
INLINE_CODE = re.compile(r"`[^`\n]+`")
FRONT_MATTER = re.compile(r"(?s)\A---\n.*?\n---")

# Column separators in \begin{array}{ccc|c} / \begin{tabular}{…} preambles are
# NOT absolute value — they must never be flagged or rewritten.
ARRAY_COLSPEC = re.compile(r"\\begin\{(?:array|tabular)\}\s*\{[^{}]*\}")
# A '|' that belongs to a sized/paired delimiter, not a bare absolute value.
_BAR_PREFIX = re.compile(
    r"\\(?:left|right|big|Big|bigg|Bigg|biggl|Biggl|biggr|Biggr)$")


def abs_value_pipes(content: str) -> list[int]:
    """Offsets within a math span of '|' used as absolute value.

    Excludes: escaped '\\|', sized/paired bars (\\left| \\right| \\big| …), and
    column separators inside \\begin{array}{…}/\\begin{tabular}{…} preambles.
    """
    masked = ARRAY_COLSPEC.sub(lambda m: m.group(0).replace("|", " "), content)
    res: list[int] = []
    for m in re.finditer(r"\|", masked):
        before = content[:m.start()]
        if before.endswith("\\"):           # \| (norm) or escaped pipe
            continue
        if _BAR_PREFIX.search(before):       # \left| … \right|, \big| …
            continue
        res.append(m.start())
    return res


# --------------------------------------------------------------------------- #
# Checks
# --------------------------------------------------------------------------- #

def check_front_matter(text: str, starts: list[int], out: list[Finding]) -> None:
    if not text.startswith("---\n"):
        out.append(Finding(1, 1, ERROR, "E101",
                            "missing YAML front matter (file must start with '---')"))
        return
    end = text.find("\n---", 4)
    if end == -1:
        out.append(Finding(1, 1, ERROR, "E101", "front matter is not closed with '---'"))
        return
    fm = text[4:end]
    if not re.search(r"^title:\s*\S", fm, flags=re.MULTILINE):
        out.append(Finding(1, 1, ERROR, "E102",
                            "front matter is missing a non-empty 'title:'"))


def _check_math_span(content: str, base: int, starts: list[int], out: list[Finding]) -> None:
    """Validate the LaTeX inside one `$$…$$` span (content offsets are absolute)."""
    line, col = loc(starts, base)

    # Prose/markdown leaking into a math span almost always means an unclosed $$.
    # (Bold markers and blank lines never occur inside valid display math. We do
    # NOT key off "](" — it shows up legitimately as \right](… in LaTeX.)
    if "**" in content:
        out.append(Finding(line, col, ERROR, "E202",
                            "math span contains markdown bold ('**') — likely an unclosed '$$'"))
    elif "\n\n" in content:
        out.append(Finding(line, col, ERROR, "E202",
                            "math span crosses a blank line — likely an unclosed '$$'"))

    # Braces, ignoring escaped \{ and \}.
    stripped = re.sub(r"\\[{}]", "", content)
    depth = 0
    bad = False
    for ch in stripped:
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth < 0:
                bad = True
                break
    if bad or depth != 0:
        out.append(Finding(line, col, ERROR, "E203",
                            "unbalanced { } braces in math"))

    n_left = len(re.findall(r"\\left\b|\\left(?=[([{|.])", content))
    n_right = len(re.findall(r"\\right\b|\\right(?=[)\]}|.])", content))
    if n_left != n_right:
        out.append(Finding(line, col, ERROR, "E204",
                            f"\\left/\\right mismatch ({n_left} \\left, {n_right} \\right)"))

    envs: list[str] = []
    ok = True
    for m in re.finditer(r"\\(begin|end)\{([^}]*)\}", content):
        if m.group(1) == "begin":
            envs.append(m.group(2))
        else:
            if not envs or envs.pop() != m.group(2):
                ok = False
                break
    if not ok or envs:
        out.append(Finding(line, col, ERROR, "E205",
                            "\\begin/\\end environment mismatch in math"))

    # Absolute value via raw pipes; the style guide wants \lvert … \rvert.
    # (Column separators and \left|/\big| bars are not flagged — see
    # abs_value_pipes. Auto-fixable with --fix.)
    if abs_value_pipes(content):
        out.append(Finding(line, col, WARN, "W405",
                            "raw '|' for absolute value — use \\lvert … \\rvert "
                            "(\\left|…\\right| for tall bars); fixable with --fix"))


def check_math(text: str, starts: list[int], out: list[Finding]) -> None:
    positions = [m.start() for m in re.finditer(r"\$\$", text)]
    if len(positions) % 2 == 1:
        line, col = loc(starts, positions[-1])
        out.append(Finding(line, col, ERROR, "E201",
                           f"odd number of '$$' delimiters ({len(positions)}) — a display "
                           "math block is unclosed"))
    for i in range(0, len(positions) - 1, 2):
        open_pos, close_pos = positions[i], positions[i + 1]
        content = text[open_pos + 2:close_pos]
        _check_math_span(content, open_pos, starts, out)

    # Convention: all math uses '$$…$$', never single '$'. After blanking the
    # '$$' pairs, any remaining single '$' is a violation. (Equal-length blanking
    # preserves offsets.) Each lone '$' is flagged; an odd total additionally
    # means an inline span is unclosed.
    no_double = re.sub(r"\$\$", "  ", text)
    singles = [m.start() for m in re.finditer(r"(?<!\\)\$", no_double)]
    for off in singles:
        line, col = loc(starts, off)
        out.append(Finding(line, col, ERROR, "E206",
                            "single '$' math delimiter — use '$$…$$' for all math"))

    # LaTeX-style math delimiters that remark-math does not render. Guard against
    # '\\[2pt]' line-break spacing, where the '[' follows a doubled backslash.
    for m in re.finditer(r"(?<!\\)\\[()\[\]]", text):
        line, col = loc(starts, m.start())
        out.append(Finding(line, col, WARN, "W406",
                            r"LaTeX delimiter '\( \) \[ \]' won't render — use '$$…$$'"))


def check_divs(text: str, starts: list[int], out: list[Finding]) -> None:
    opens = list(re.finditer(r"<div\b[^>]*>", text))
    closes = list(re.finditer(r"</div\s*>", text))
    if len(opens) != len(closes):
        line, col = loc(starts, (opens or closes)[0].start()) if (opens or closes) else (1, 1)
        out.append(Finding(line, col, ERROR, "E301",
                           f"unbalanced <div> tags ({len(opens)} open, {len(closes)} close)"))

    for m in opens:
        line, col = loc(starts, m.start())
        tag = m.group(0)
        if 'class="theorem-box"' in tag or "class='theorem-box'" in tag:
            if "markdown=" in tag:
                out.append(Finding(line, col, WARN, "W401",
                                   'theorem-box uses markdown="1" — drop it (Astro/MDX leftover)'))
            # Markdown inside a div needs a blank line after the opening tag.
            after = text[m.end():m.end() + 2]
            if not after.startswith("\n\n"):
                out.append(Finding(line, col, WARN, "W402",
                                   "no blank line after <div class=\"theorem-box\"> — "
                                   "markdown inside may not render"))

    for m in closes:
        # Blank line before </div> as well.
        before = text[max(0, m.start() - 2):m.start()]
        if not before.endswith("\n\n"):
            line, col = loc(starts, m.start())
            out.append(Finding(line, col, WARN, "W402",
                               "no blank line before </div> — markdown inside may not render"))


def check_jekyll_leftovers(text: str, starts: list[int], out: list[Finding]) -> None:
    for m in re.finditer(r"\{\{.*?\}\}|relative_url", text):
        line, col = loc(starts, m.start())
        out.append(Finding(line, col, WARN, "W403",
                           "Jekyll/Liquid leftover (e.g. relative_url, {{ … }}) — "
                           "Astro uses plain '/assets/…' paths"))


# --------------------------------------------------------------------------- #
# Driver
# --------------------------------------------------------------------------- #

def lint_text(text: str) -> list[Finding]:
    if DISABLE_MARKER in text:
        return []
    starts = line_starts(text)
    masked = mask(text, FRONT_MATTER)
    masked = mask(masked, FENCED_CODE)
    masked = mask(masked, INLINE_CODE)

    out: list[Finding] = []
    check_front_matter(text, starts, out)
    check_math(masked, starts, out)
    check_divs(masked, starts, out)
    check_jekyll_leftovers(masked, starts, out)
    out.sort(key=lambda f: (f.line, f.col))
    return out


# --------------------------------------------------------------------------- #
# Auto-fix (the safe, unambiguous subset only)
# --------------------------------------------------------------------------- #

def _protected_ranges(text: str) -> list[tuple[int, int]]:
    """Char ranges (front matter, fenced/inline code) that fixes must not touch."""
    ranges: list[tuple[int, int]] = []
    for pat in (FRONT_MATTER, FENCED_CODE, INLINE_CODE):
        ranges.extend((m.start(), m.end()) for m in pat.finditer(text))
    return ranges


def fix_text(text: str) -> tuple[str, int]:
    """Apply only the deterministic, content-preserving fixes.

    - E206: lone '$' → '$$'   (outside code/front matter, leaving '$$' and '\\$')
    - W401: drop markdown="1" on a <div>
    - W402: blank line right after <div class="theorem-box"> and before </div>

    The ambiguous structural problems (unclosed '$$', unbalanced braces/divs/
    \\left-\\right, missing title) are intentionally NOT touched. Returns the new
    text and a rough count of edits.
    """
    if DISABLE_MARKER in text:
        return text, 0

    before = text
    prot = _protected_ranges(text)
    edits = 0

    def protected(i: int) -> bool:
        return any(a <= i < b for a, b in prot)

    # E206: double up lone '$' (count each conversion).
    out: list[str] = []
    i, n = 0, len(text)
    while i < n:
        if protected(i):
            out.append(text[i])
            i += 1
            continue
        ch = text[i]
        if ch == "\\" and i + 1 < n:        # keep escapes like \$
            out.append(text[i:i + 2])
            i += 2
        elif ch == "$":
            if i + 1 < n and text[i + 1] == "$":
                out.append("$$")            # already '$$' — leave as is
                i += 2
            else:
                out.append("$$")            # lone '$' → '$$'
                edits += 1
                i += 1
        else:
            out.append(ch)
            i += 1
    text = "".join(out)

    # W401: <div class="theorem-box" markdown="1"> → <div class="theorem-box">
    text, c = re.subn(r'(<div\b[^>]*?)\s+markdown=(["\'])1\2', r"\1", text)
    edits += c

    # W402: blank line after a theorem-box opening tag …
    text, c = re.subn(r'(<div class="theorem-box"[^>]*>)\n(?!\n)', r"\1\n\n", text)
    edits += c
    # … and before any closing tag.
    text, c = re.subn(r"([^\n])\n(</div\s*>)", r"\1\n\n\2", text)
    edits += c

    # W405: absolute-value '|…|' → \lvert … \rvert, inside '$$' math spans only.
    # Genuine bars are paired left-to-right (open→\lvert, close→\rvert). A span
    # with an odd count of genuine bars is left untouched (ambiguous). Column
    # separators, table pipes, and \left|/\big| bars are never touched.
    prot = _protected_ranges(text)
    dollars = [m.start() for m in re.finditer(r"\$\$", text) if not protected(m.start())]
    if len(dollars) >= 2:
        pieces: list[str] = []
        cur = 0
        for k in range(0, len(dollars) - 1, 2):
            open_pos, close_pos = dollars[k], dollars[k + 1]
            pieces.append(text[cur:open_pos + 2])      # text + opening '$$'
            span = text[open_pos + 2:close_pos]
            pipes = abs_value_pipes(span)
            if pipes and len(pipes) % 2 == 0:
                buf: list[str] = []
                last = 0
                for idx, p in enumerate(pipes):
                    buf.append(span[last:p])
                    delim = "\\lvert" if idx % 2 == 0 else "\\rvert"
                    nxt = span[p + 1] if p + 1 < len(span) else ""
                    # A trailing letter would merge into the command name.
                    buf.append(delim + " " if nxt.isalpha() else delim)
                    last = p + 1
                buf.append(span[last:])
                span = "".join(buf)
                edits += len(pipes) // 2
            pieces.append(span)
            cur = close_pos                            # next slice starts at closing '$$'
        pieces.append(text[cur:])
        text = "".join(pieces)

    return (text, edits) if text != before else (before, 0)


def collect_targets(args: list[str]) -> list[Path]:
    if not args:
        return sorted(NOTES.rglob("*.md"))
    files: list[Path] = []
    for a in args:
        p = Path(a)
        if p.is_dir():
            files.extend(sorted(p.rglob("*.md")))
        elif p.suffix == ".md":
            files.append(p)
    return files


def main(argv: list[str]) -> int:
    strict = "--strict" in argv
    quiet = "--quiet" in argv
    do_fix = "--fix" in argv
    paths = [a for a in argv if not a.startswith("--")]
    files = collect_targets(paths)

    total_err = total_warn = total_fixed = 0
    for path in files:
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError) as exc:  # pragma: no cover
            print(f"{path}: could not read ({exc})", file=sys.stderr)
            total_err += 1
            continue
        if do_fix:
            fixed, edits = fix_text(text)
            if edits:
                path.write_text(fixed, encoding="utf-8")
                text = fixed
                total_fixed += edits
                rel0 = path.relative_to(ASTRO) if path.is_relative_to(ASTRO) else path
                print(f"{rel0}: fixed {edits} issue(s)")
        findings = lint_text(text)
        rel = path.relative_to(ASTRO) if path.is_relative_to(ASTRO) else path
        for f in findings:
            if f.level == ERROR:
                total_err += 1
            else:
                total_warn += 1
                if quiet:
                    continue
            print(f"{rel}:{f.line}:{f.col}: {f.level} [{f.code}] {f.message}")

    n = len(files)
    fixed_note = f", {total_fixed} issue(s) auto-fixed" if do_fix and total_fixed else ""
    if total_err == 0 and total_warn == 0:
        print(f"check-notes: {n} file(s) clean ✓{fixed_note}")
    else:
        print(f"check-notes: {n} file(s) checked — {total_err} error(s), "
              f"{total_warn} warning(s){fixed_note}")

    if total_err:
        return 1
    if strict and total_warn:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
