# TRACKD — Design System (v3, Liquid-Glass-on-Linear)

**Changelog vs v2:** same core direction, unchanged palette and load-bearing status colors. Added:
an Inspiration Ledger (so future-you knows why each reference is or isn't in here), a motion
calibration note sourced from Framer's interaction register, an optional Analytics heatmap
variant, and explicit rules for borrowing *structure* vs *skin* from component libraries — because
that distinction is the difference between "inspired by Linear" and "looks like every other
Tailwind admin template."

---

## Inspiration Ledger — why each source earns (or doesn't earn) its place

Rated against what TRACKD actually needs, not just general quality:

| Source | Category | Take this | Leave this |
|---|---|---|---|
| TypeUI | Named AI design-skills + MCP | The *pattern*: a versioned, named design skill (their "Atlas," "Minimal," "Kinetic") is exactly what your own `frontend-taste` skill file should look like — worth formalizing TRACKD's system the same way | Their actual visual skins — none are the liquid-glass-on-Linear register you're building |
| ShadCN Studio | shadcn/ui blocks, MCP, theme generator | Structural reference for Table view and dashboard shell — hairline borders, restrained density, is the closest thing on this list to genuine Linear/Vercel register | Their default theme colors — TRACKD's OKLCH atmosphere palette replaces this entirely |
| Horizon UI / FlyonUI / Filament | Tailwind or Laravel admin-dashboard kits | Component *structure* only — data-table pagination patterns, stat-card layout grids, dashboard shell scaffolding | Any of their default skins (colorful SaaS-template blue/purple, or Filament's form-heavy admin look) |
| FloatUI | Plain Tailwind copy-paste components | Completeness reference for less-glamorous components (form fields, list rows) when you need a fast structural starting point | The visual skin entirely — stock indigo-600 buttons, default Tailwind gray cards |
| Framer AI | Motion-native site builder | The best reference on this list for the floating-icon drift/repulsion feel and page-transition polish — study how it times entrance/exit, not how it lays out | N/A — it's not a layout or color reference |
| open-design.ai codex-design | AI design agent | Same bucket as TypeUI — a process reference (agent-assisted, systemized design), useful if you ever formalize a Claude-Design workflow doc | Not a visual reference |
| Relume | AI wireframe/sitemap generator | Section-flow planning for the **landing page only** (hero → problem → walkthrough → pricing → CTA ordering) | Never for the dashboard — it's pre-visual, wireframe-only, and dashboards aren't its use case |

**Your own attached images are the stronger signal.** Two specifically:
- **Bike-shop 3D glass mockup** — the single best literal reference for the tactile icon-chip
  recipe below: layered highlight, real drop shadow, dimensional feel against a blue gradient.
  This is what "genuinely alive" means for the icon chips, more than any text description can convey.
- **Dark KPI/donut/bar dashboard** (white collapsible sidebar, revenue bar chart, "Sales by
  Category" donut, filterable status table) — confirms the Analytics ordering already in this
  doc (KPI cards → area/bar chart → donut → table) and the collapsible-sidebar chevron pattern.

Two images are explicitly **not** pulled from: the light warm-toned HR dashboard and the generic
purple-bar admin template — both are useful only as a contrast check confirming the dark-glass
direction is the right call for TRACKD, not as sources to draw from.

---

## Design language in one sentence
Linear/Vercel-grade structural restraint (hairline borders, tight type, fast precise motion)
as the base, with genuine "liquid glass" icon chips — layered, tactile, almost-alive, in the
register of Apple's newer iOS design language — reserved for icon chips and nav elements as
the one deliberately tactile detail. Everything else stays flat and quiet.

## Palette — do not invent new hues
Status colors are FIXED, sourced from mockData.ts, used identically everywhere. Never restyle:
```
Saved            #1d4ed8
Applied          #06b6d4
Interviewing     #f59e0b
Offer Received   #10b981
Rejected/Closed  #ef4444
```

Atmosphere palette, from the Bluu.jpg (Shades of Blue) sheet — each hue used for the
psychological role it names, interpolated in OKLCH (not raw hex/RGB) wherever it's a gradient,
so the dark-to-glow transition stays clean instead of muddy:
```
--bg-ground       #000871   Navy    — deepest point of the background, strength/authority
--bg-mid          #241571   Midnight — sidebar base surface, modal backdrops
--brand-primary   #2438BD   Persian — primary buttons, active nav accent
--brand-secondary #0F52BA   Sapphire — secondary buttons, focus borders
--glow-mid        #007FFF   Azure   — mid-gradient stop, hover states
--glow-top        #52E8FF   Electric — top-of-screen glow, focus rings, icon-chip highlight
--accent-info     #007BA7   Cerulean — info banners, AI-insight highlights
--accent-energy   #0AFFFF   Aqua    — "new"/"AI-suggested" badges only, never status
--text-tint-1     #70B8FF   Argentina — secondary text on dark surfaces
--text-tint-2     #99CCFF   Sky     — muted labels, placeholders
--border-glass    rgba(173,255,255,0.10–0.16)
```

Main canvas background (fixed, ground-to-glow, brightens toward the TOP):
```css
radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82,232,255,0.16), transparent 65%),
linear-gradient(to top, #000871 0%, #0B1148 30%, #182466 55%, #1F2E86 75%, #2438BD 100%)
```

Sidebar surface fade — the OPPOSITE direction from the main canvas (brighter near the top,
where the drawer toggle sits, settling darker toward the bottom near the account chip) —
this mirrored relationship between the two panels is intentional and load-bearing, not a bug:
```css
linear-gradient(to bottom, rgba(255,255,255,0.09), rgba(255,255,255,0.02) 55%, rgba(0,4,40,0.25))
```

## Typography
```
Display/headings → Geist Sans, 600 weight only — weight carries hierarchy, don't add a
  second display face
Body/UI          → Geist Sans, 400/500
Numbers ONLY (scores, KPIs, dates, currency, timestamps) → Geist Mono
Fallback stack if Geist isn't available: Inter for sans, ui-monospace for mono
```

## The "TV-like" frame
The whole app shell should read like a wide, glowing instrument display, not a bare webpage:
a very subtle outer vignette (radial darkening at the corners, barely visible) and a soft
inset shadow at the viewport edge give the sense of a screen rather than a flat page. Keep
this extremely subtle — it should register as "premium" on close inspection, not as a literal
TV bezel graphic.

## Liquid-glass icon chips (the one deliberately tactile element)
Nav icon chips (sidebar, collapsed or expanded) use a genuinely dimensional glass recipe —
layered highlight gradient (light top-left, fading to near-transparent), a soft inner bevel
via a top inset highlight and a darker bottom inset shadow, and a real drop shadow that
deepens on hover. Active state adds a cyan glow ring. This should look clickable and slightly
alive, the way current iOS glass icons do.

**Primary visual reference: the attached bike-shop 3D mockup** — its floating glass product
cards over a blue gradient are the clearest real-world proof of the effect you're after: soft
edge highlight, dimensional shadow, rounded-square containment. Reference `62213...jpg`
(Stakent) and `Navbar.jpg` (Velto) for the sidebar structure this sits inside. This glass
treatment is reserved for icon chips only — do not apply the same stacked-shadow recipe to
ordinary content cards; those stay flat, hairline-bordered, Linear-style.

## Floating background icon field
A sparse field of 10-15 low-opacity (12-18%) job-related icons (briefcase, document,
building, bar-chart, calendar, mail) drifts slowly across the full app-shell background,
independent of sidebar collapse/expand state — the field never resets or hides when the
sidebar toggles. On cursor proximity, nearby icons disperse with a soft spring/repulsion
effect (~130px radius, eased return). Icons read as dimensional (drop-shadow, slight
scale/rotation variance) even where the implementation is DOM/CSS rather than true WebGL.
Respect prefers-reduced-motion: kill drift and repulsion entirely, keep instant/static
icon placement.

3D-look-now, WebGL-later: build this as DOM elements with Framer Motion physics first. A true
react-three-fiber rebuild of the same effect is a good Phase 2 / skill-building upgrade once
the rest of the app is stable — don't block v1 on it.

**Motion calibration note (from studying Framer-built sites):** the sites that feel genuinely
premium almost never use a single spring config everywhere — entrance motion is slightly
slower and more damped than hover/repulsion motion, which snaps back fast. Apply that same
split here: icon *drift* (ambient, embedded, low awareness) should feel slow and loose;
cursor *repulsion* (a direct response to input) should feel immediate and tightly damped.
Using one spring curve for both is the most common reason a "physics-based" background ends
up feeling like a generic parallax effect instead of something alive.

## Kanban card stacking — the "you can see the light" concept
Each Kanban column shows ONE fully-detailed focused card at the top (glass-free, hairline
border, 3px left status-color accent, logo chip, title, company, pills, corner match-score
gauge, footer with source + deadline chip), followed by the rest of that column's jobs as
slim, draggable PILL rows (single line: status dot, title, mini match score) rather than full
cards. When more pills exist than fit in view, show a thin glowing sliver beneath the visible
pills/column header, tinted with the hidden entries' status color, hinting that more is
stacked there. Reference `62213...jpg`'s "Active Staking" list (the compact pill rows under a
focused expanded card) as the structural model.

## Analytics — an optional addition worth trying
Alongside the existing Applications Over Time area chart, consider a second, denser view: a
GitHub-style contribution heatmap (day-by-week grid, intensity = ingestion/status-change
activity that week) — the kind shown in the TalentSync reference image. It's a genuinely
different read on the same data (rhythm and consistency, not just volume), fits the
"instrument panel" character better than a second line chart would, and is a distinctive,
non-generic touch for a portfolio-grade build. Treat as optional/stretch, not required for v1
— don't let it delay the core 5-chart set from the PRD.

## Component structure — where to borrow, where never to
This is the rule that keeps "inspired by Linear" from turning into "looks like a Tailwind
admin template":
- **Borrow structure from library kits** (ShadCN Studio, Horizon UI, FlyonUI, Filament,
  FloatUI) for things that are genuinely just structural problems — data-table pagination and
  filter-bar layout, dashboard-shell grid proportions, multi-step form scaffolding. These are
  solved problems; no need to reinvent the DOM structure.
- **Never borrow skin** — colors, shadows, border treatments, default component theming —
  from any of the above. Every visual property traces back to the tokens in this document.
  If a borrowed structural pattern arrives with its own default Tailwind gray/indigo styling,
  strip it before it touches the codebase.
- **Relume is landing-page-only** — its output (section ordering, wireframe flow) is useful
  exclusively for planning the marketing page's information architecture. It has no role in
  the authenticated app.
- **Framer AI is a motion reference, not a layout reference** — study timing and easing
  curves from Framer-built sites, never copy a layout from one.

## Restraint rules — inherited from the Linear pivot, still true
- Radius scale: chips/pills fully rounded or ~12px, cards 16px, sidebar/modals up to 20px —
  consistent, not ad hoc per component
- Motion: 150-220ms, custom cubic-bezier, never a default ease or slow floaty timing. Card
  hover = small immediate lift. Kanban drag = confident pick-up scale + slight overshoot
  settle on drop.
- Ordinary cards and surfaces (not icon chips) use a 1px hairline border at ~10% opacity as
  the PRIMARY separation technique — not blur+shadow+glow+gradient-border stacked together.
  Restraint everywhere except the icon chips, which is precisely why that one detail reads
  as deliberate rather than decorative.

## Accessibility — non-negotiable
Every text/background pairing passes WCAG AA contrast — check this explicitly, glass and dark
surfaces are the easiest place to fail it without noticing. Keyboard focus states need to
look as considered as hover states. dnd-kit keyboard drag support stays wired, not stripped
for visual polish.

## Two-sided nav
The sidebar's nav set switches on account type. Candidate: Pipeline, Inbox, Explore,
Analytics, Profile. Recruiter: Companies, Applications, Recruiter Hub, Analytics, Profile.
Same icon-chip recipe, same structure, different icon set — this is one design system serving
two account types, not two different apps.

---

Build against messy, realistic data (see mockData.ts for the candidate shape) — an empty
column, an overflowing column with the stacking effect actually triggered, a red-zone match
score, a deadline three days out. Ask before moving from this design-system pass into full
screen-by-screen build.
