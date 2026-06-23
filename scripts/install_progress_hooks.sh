#!/usr/bin/env sh
set -eu

repo_root="$(git rev-parse --show-toplevel)"
hooks_dir="$repo_root/.git/hooks"

install_hook() {
  hook_name="$1"
  hook_path="$hooks_dir/$hook_name"

  if [ -f "$hook_path" ]; then
    backup_path="$hook_path.backup.$(date +%Y%m%d%H%M%S)"
    cp "$hook_path" "$backup_path"
    printf 'Backed up existing %s hook to %s\n' "$hook_name" "$backup_path"
  fi

  cp "$repo_root/scripts/hooks/$hook_name" "$hook_path"
  chmod +x "$hook_path"
  printf 'Installed %s hook\n' "$hook_name"
}

install_hook pre-commit
install_hook pre-push
