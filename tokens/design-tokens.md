# Design token conventions, mined from Michele's own shipped projects

Not a style guide written from theory — every rule below is backed by a pattern
that actually repeats across two or more of: astra-app, voyce-community,
invest-your-time, orbit-analytics, growthpilot, marys-log, ricettario,
pixel-siege.

## Color: one neutral pair + exactly one named accent

Every project defines brand colors as named CSS variables (`@theme` / `:root`),
never raw Tailwind grays scattered through components. Pattern is always:
one background/foreground neutral pair, plus **one** accent color family (often
with a `-dark` / `-light` or `-deep` / `-soft` variant). Never a rainbow palette,
never a generic purple-to-blue AI gradient (none found anywhere in the audit).

Examples:
- astra-app: `--color-astra-primary:#04107e`, `-dark:#020a52`, `-accent:#3b4ad0`, `-light:#edeff9` — sampled from the logo, comment says so.
- voyce-community: `#003399` blue + `#FFCC00` gold (EU palette, deliberate).
- invest-your-time: `--gold:#f2b544` single accent on a dark surface, plus semantic `--gain`/`--loss`.
- marys-log: near-mono editorial, single `--color-accent:#15803d`.
- pixel-siege: warm neutral `#f7f7f5`/`#1c1917` + single `--gold:#f0b429`.
- orbit-analytics: warm bordeaux `oklch(42% .11 18)` — chosen specifically to avoid the cool-gray default of the react-zen library it's built on (see its docs/DECISIONS.md for the load-order bug this caused).

**Rule for new projects:** pick one accent, define it as a named token, derive
tints/shades from it. Don't reach for a second accent color unless there's a
real semantic need (gain/loss, positive/negative).

## Fonts: default is Geist, swap deliberately for domain warmth

Geist / Geist Mono (`next/font/google`) is the default across the more recent
projects (marys-log, pixel-siege, invest-your-time). It is **not** a blind
default — ricettario swaps in `Georgia, "Times New Roman", serif` specifically
for the food/recipe domain, invest-your-time adds `Fraunces` for editorial
headings, voyce-community uses `Aboreto` + `Abhaya_Libre` as a distinctive
display/serif pair, and astra-app uses **no web font at all** — a plain system
stack (`ui-sans-serif, system-ui, -apple-system, ...`).

`orbit-analytics` is the one outlier using Inter, which is the generic
AI-startup default this pattern otherwise avoids — treat it as a candidate for
a deliberate swap, not the model to copy.

**Rule for new projects:** default to Geist + Geist Mono if there's no reason
to do otherwise. Swap to a serif/display font only when the domain calls for
warmth, editorial feel, or a distinct brand voice — and pick something specific
(Fraunces, Aboreto), never Poppins/Manrope/DM Sans as a "premium" default.

## Border-radius: sparse and intentional, not squircles-everywhere

Radius is used per-element with intent: `rounded-full` for pills, avatars, and
badges; `rounded-xl`/`rounded-2xl` for cards; sharp/flat (`rounded-sm` or less)
for editorial UIs like marys-log. The discipline is: **one dominant radius
scale per project**, not `rounded-3xl` on every surface.

**ricettario is the counter-example** — `rounded-full` ×80, `rounded-2xl` ×27,
`rounded-xl` ×18, `rounded-3xl` ×3 in one codebase. That reads as templated /
AI-slop-adjacent. Don't copy it; it's flagged in `no-design-slop` as the
pattern to avoid.

**Rule for new projects:** pick 2-3 radius values max (e.g. `full` for pills,
`xl` for cards, `md` for inputs) and hold the line. If more than half your
surfaces are `rounded-2xl`+, that's the squircle-everywhere smell.

## Reusable atoms

- **PillNav / SiteHeader** (`components/nav/`) — sliding-highlight pill nav,
  Logo+Nav+CTA header. Source: invest-your-time, already hand-copied once into
  orbit-analytics.
- **StatCard / Badge** (`components/dashboard/`) — dashboard stat tile and
  tone-based pill badge. Source: growthpilot.
- **GroupedToggleFlow** (`components/flow/`) — the "ReactFlow-as-static-diagram"
  technique: fixed grid layout, all interactions disabled, edges colored by
  selection state. Source: astra-app's permission editor. Use for any
  "toggle items within named groups, render as a diagram" UI — not just
  permissions.
