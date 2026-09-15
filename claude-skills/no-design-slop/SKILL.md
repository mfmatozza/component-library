---
name: no-design-slop
description: Keep new UI/component/frontend work consistent with Michele's own established conventions instead of generic AI-generated defaults — colors, fonts, border-radius, component reuse, and code-level AI tells (em dashes in comments/metadata, cliché microcopy). Use when building or reviewing a new UI, scaffolding a project, picking a header/nav/dashboard component, choosing fonts or colors, or auditing existing frontend code for AI-slop patterns.
---

# No design slop

You are matching Michele's actual shipped taste, mined from his own projects
(astra-app, voyce-community, invest-your-time, orbit-analytics, growthpilot,
marys-log, ricettario, pixel-siege), not applying generic "good design"
opinions. The full evidence lives in `~/component-library/tokens/design-tokens.md`
— read it before making token decisions on a new project. The reusable
components themselves live in `~/component-library/components/`.

## Two jobs

**Build (default).** Before writing new UI, check `~/component-library` for a
component that already does this (nav header, stat card, badge, grouped-toggle
diagram). Copy and adapt it rather than writing a fresh one. Apply the token
rules below when choosing colors/fonts/radius for anything new.

**Audit.** The user asks to check a file, PR, or whole project for AI-slop.
Walk the checklist below, name each pattern found with file:line, and give the
fix in a few words. Don't rewrite unless asked.

## Checklist

**Component reuse.** Before building a header/nav, dashboard stat tile,
badge, or a "toggle items within groups, show as a diagram" UI, check
`~/component-library/components/` first. If nothing fits, build it, and if
it's clearly going to be reused, propose adding it to the library.

**Color.** One neutral surface pair + exactly one named accent color family,
defined as CSS variables/`@theme` tokens — never raw Tailwind grays scattered
through components, never a second accent without a real semantic need
(gain/loss, positive/negative), never a purple-to-blue or pink-to-orange
generic SaaS gradient. See `design-tokens.md` for the exact palettes already
in use per project — reuse one if this is a sibling/related project, otherwise
pick a new single accent.

**Fonts.** Default to Geist + Geist Mono. Swap to a specific serif/display
font (not a vague "premium" pick) only when the domain calls for warmth or a
distinct voice — precedent: Fraunces for editorial headings, Georgia for a
recipe app, Aboreto+Abhaya_Libre for a community brand. Flag bare `Inter`,
`Poppins`, `Manrope`, or `DM Sans` used without a stated reason — that's the
generic-AI-SaaS default, not a deliberate choice.

**Border-radius.** Pick 2-3 radius values for the whole project (e.g. `full`
for pills/avatars/badges, `xl` for cards, `md` for inputs) and hold the line.
Flag it when more than half the surfaces in a file are `rounded-2xl` or
larger, or when `rounded-full` is used on things that aren't pills/avatars —
that's the squircle-everywhere pattern (ricettario is the internal
counter-example: `rounded-full` ×80, `rounded-2xl` ×27 in one codebase).

**Glassmorphism / gradients.** A subtle `bg-surface/80 backdrop-blur` on a
sticky header (already in the PillNav header) is fine — that's restraint, not
slop. Flag heavy frosted-glass cards, glowing gradient borders, or blob-shaped
gradient backgrounds; none of that appears in any audited project and it
reads as templated.

**Icons.** `lucide-react` is the default icon set already in use
(invest-your-time, orbit-analytics, ricettario). Don't introduce a second icon
library in the same project without a reason.

**Em dashes in code.** Despite the stated hatred of em dashes, they leak into
every audited codebase — almost always in code comments and metadata/title
strings, not visible body copy (e.g. `"GustoLabs — Ricette, piano pasti e
lista della spesa"`, doc-comment blocks explaining rationale). When writing or
reviewing comments, docstrings, `<title>` tags, or any user-visible copy: no
em dashes. Use a period, comma, or parentheses instead. This is the most
common concrete AI-tell in this codebase — check it specifically, it won't be
obvious from a casual read.

**Cliché microcopy.** Same banned list as the `no-ai-slop` writing skill
applies to UI copy: unlock, seamless, elevate, empower, supercharge,
effortless, revolutionize, "transform your...", "your all-in-one...". None
found in the audited projects so far — keep it that way.

**AI-authored comment voice.** Comments should explain a non-obvious *why*
(a constraint, a workaround, an invariant) in plain, direct language — like
the astra-app examples already in this codebase ("A permissions grid, not a
canvas: nothing to drag..."). Flag comments that restate what the code
obviously does, or that read like generated documentation (multi-paragraph
blocks, "This component is responsible for...").

## Workflow

1. If this is a new project or a new major UI surface, read
   `~/component-library/tokens/design-tokens.md` first.
2. Check `~/component-library/components/` for an existing component before
   building one.
3. For an audit, grep the target for `—` (em dash), count `rounded-` class
   usage by value, check the font import(s), and check for a defined
   neutral+accent token pair. Report findings with file:line.
4. For a build, apply the checklist while writing, don't retrofit it after.
