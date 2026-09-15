#!/usr/bin/env bash
# Pull this repo down on a new machine and wire the no-design-slop skill into
# Claude Code. Safe to re-run.
#
# Usage: curl -fsSL https://raw.githubusercontent.com/mfmatozza/component-library/main/install.sh | bash

set -euo pipefail

TARGET="${COMPONENT_LIBRARY_DIR:-$HOME/component-library}"
REPO="git@github.com:mfmatozza/component-library.git"
REPO_HTTPS="https://github.com/mfmatozza/component-library.git"

if [ -d "$TARGET/.git" ]; then
  echo "Updating existing $TARGET"
  git -C "$TARGET" pull --ff-only
else
  echo "Cloning into $TARGET"
  git clone "$REPO" "$TARGET" 2>/dev/null || git clone "$REPO_HTTPS" "$TARGET"
fi

mkdir -p "$HOME/.claude/skills"
SKILL_LINK="$HOME/.claude/skills/no-design-slop"
SKILL_SRC="$TARGET/claude-skills/no-design-slop"

if [ -L "$SKILL_LINK" ] || [ -e "$SKILL_LINK" ]; then
  rm -rf "$SKILL_LINK"
fi
ln -s "$SKILL_SRC" "$SKILL_LINK"

echo "Component library ready at $TARGET"
echo "no-design-slop skill linked at $SKILL_LINK"
