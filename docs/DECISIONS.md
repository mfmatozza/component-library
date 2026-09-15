# Decisions

## 2026-09-15 — Pushed to a private GitHub repo, skill folded in as a symlink

Moved `no-design-slop` from a standalone `~/.claude/skills/` folder into
`claude-skills/no-design-slop/` inside this repo, and replaced the original
location with a symlink. One source of truth, tracked by git, and it loads
automatically in Claude Code on any machine after running `install.sh`
(which recreates the symlink). Repo is private — the code itself has nothing
sensitive in it, but `tokens/design-tokens.md` documents internals of
several private projects, so private is the safer default. Flip to public
later if that stops mattering.

## 2026-09-15 — Copy-paste library, not an npm package

Considered a private npm package / monorepo workspace. Rejected: your projects
aren't a monorepo, each has its own Tailwind/Next setup, and you've already
proven the copy-paste pattern works (orbit-analytics hand-copied the NavPill
from invest-your-time). A package would add a publish/version step for no
real benefit at this scale. Revisit only if the number of consuming projects
gets large enough that drift across copies becomes a real cost.

## 2026-09-15 — Generalized components keep their semantic-token dependency

`pill-nav.tsx` and `header.tsx` still assume `--surface`, `--border`, `--text`,
`--text-muted` CSS variables exist in the consuming project, rather than
hardcoding Tailwind grays. This matches the convention already found across
every audited project (named tokens, not raw grays) — see
`tokens/design-tokens.md`. Consuming projects that don't have these tokens yet
need to add them; that's intentional friction to keep the discipline.

## 2026-09-15 — GroupedToggleFlow keeps astra-app's ReactFlow-as-static-diagram technique, not the free-form-canvas pattern

The generalization only changes the data shape (groups/items instead of
sections/pages) and lets the selected color be passed in. It deliberately does
not add dragging, panning, zooming, or connecting — those were switched off on
purpose in the source (it's a toggle grid, not a diagram editor) and adding
them back would defeat the pattern.
