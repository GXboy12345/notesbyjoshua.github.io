#!/bin/sh
# Activate the tracked git hooks in scripts/git-hooks. Run once after cloning:
#   sh scripts/install-hooks.sh
set -eu

root="$(git rev-parse --show-toplevel)"
git -C "$root" config core.hooksPath scripts/git-hooks
chmod +x "$root"/scripts/git-hooks/* 2>/dev/null || true

echo "Git hooks installed (core.hooksPath = scripts/git-hooks)."
echo "Note formatting will be checked on commit (staged notes) and push (all notes)."
