# component-library

A copy-paste library, not an npm package — matches how you already reuse code
(orbit-analytics has the NavPill hand-copied from invest-your-time with a
comment citing it). Grab the file you need, drop it into the consuming
project's `components/` folder, wire up the CSS variables it expects, done.
No build step, no version to keep in sync, no monorepo to maintain.

## Setting up a new machine

```
curl -fsSL https://raw.githubusercontent.com/mfmatozza/component-library/main/install.sh | bash
```

Clones this repo to `~/component-library` (or pulls if it's already there)
and symlinks `claude-skills/no-design-slop` into `~/.claude/skills/`, so the
skill loads automatically in any Claude Code session on that machine.

To pick up changes made on another machine: `git -C ~/component-library pull`.

Every component here is generalized from something you already shipped and
used more than once — see each file's header comment for its source. Nothing
in here is invented from scratch; see `tokens/design-tokens.md` for the
evidence behind the conventions.

## Components

- `components/nav/pill-nav.tsx` + `header.tsx` — sliding-pill nav and the
  Logo+Nav+CTA sticky header built around it. Requires `framer-motion` and
  the CSS variables `--surface`, `--border`, `--text`, `--text-muted` on the
  consuming project.
- `components/dashboard/stat-card.tsx` + `badge.tsx` — dashboard stat tile and
  tone-based pill badge. Tailwind only, no extra deps.
- `components/flow/grouped-toggle-flow.tsx` — the "ReactFlow-as-static-diagram"
  pattern for toggling items within named groups (permissions, feature flags,
  notification settings, module access). Requires `@xyflow/react`.

## Tokens

`tokens/design-tokens.md` — color, font, and radius conventions mined from
your own projects, with the receipts (which project, which file, which
values) for each rule.

## When adding a new component

Only add something here once it's proven itself in two shipped projects, or
you've generalized a strong one-off you know you'll reuse. Don't pre-build
components you don't have a real use for yet — that's the same "add
abstractions beyond what the task requires" mistake this library exists to
avoid. Log the decision in `docs/DECISIONS.md`.
