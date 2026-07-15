# TRACKD — Design System Update Prompt

**Version:** 2.0 (Curated) | **Date:** July 2026
**Use:** Paste the fenced block in §2 into Claude / Claude Design to (re)generate the design system. §1 is the reasoning — keep it for context, don't paste it.
**Reference files to attach alongside this prompt:** `mockData.ts`, `Bluu.jpg`, `Navbar.jpg`, `Main_Design.png`, `62213a30f86db80cfdf57e8c8866982b.jpg`, and the concept preview `trackd-design-concept.html` built in this session as a literal starting point — ask Claude Design to refine that file rather than start from zero.

---

## 1. What changed and why (context, not part of the prompt)

The design direction went through a real pivot mid-project, and this version is the reconciliation, not a discard of everything before it:

- **Pass 1** was "iOS glass / HUD command centre" — heavy glass, glow, Space Grotesk everywhere.
- **Pass 2** pivoted hard to Vercel/Linear restraint — hairline borders, Geist fonts, almost no glass.
- **Pass 3 (this one)** is the actual synthesis you described: Linear's *structural* restraint (hairline borders, tight type, fast motion) combined with genuine **liquid-glass icon chips** — the Apple "new iOS" tactile, layered, almost-alive glass look — reserved specifically for icon chips and nav elements, not smeared across every card. That's not a contradiction; it's the same move Linear itself makes: a mostly-flat product with one or two deliberately tactile details.

Two of your descriptions are interpreted, not literal, and are flagged as open items in §3 — confirm or correct them before this goes into a full build.

---

## 2. The prompt

```markdown
# TRACKD — Design System (v2, Liquid-Glass-on-Linear)

You are updating the existing TRACKD design system, not starting from scratch. A working
concept file (trackd-design-concept.html, attached) already demonstrates the target direction —
treat it as the literal starting point and refine it, don't diverge from it without a reason.

## Design language in one sentence
Linear/Vercel-grade structural restraint (hairline borders, tight type, fast precise motion)
as the base, with genuine "liquid glass" icon chips — layered, tactile, almost-alive, in the
register of Apple's newer iOS design language — reserved for icon chips and nav elements as
the one deliberately tactile detail. Everything else stays flat and quiet.

## Palette — do not invent new hues
Status colors are FIXED, sourced from mockData.ts, used identically everywhere. Never restyle:
  Saved            #1d4ed8
  Applied          #06b6d4
  Interviewing     #f59e0b
  Offer Received   #10b981
  Rejected/Closed  #ef4444

Atmosphere palette, from the attached Bluu.jpg (Shades of Blue) sheet — each hue used for the
psychological role it names, interpolated in OKLCH (not raw hex/RGB) wherever it's a gradient,
so the dark-to-glow transition stays clean instead of muddy:
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

Main canvas background (fixed, ground-to-glow, brightens toward the TOP):
  radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82,232,255,0.16), transparent 65%),
  linear-gradient(to top, #000871 0%, #0B1148 30%, #182466 55%, #1F2E86 75%, #2438BD 100%)

Sidebar surface fade — the OPPOSITE direction from the main canvas (brighter near the top,
where the drawer toggle sits, settling darker toward the bottom near the account chip) —
this mirrored relationship between the two panels is intentional and load-bearing, not a bug:
  linear-gradient(to bottom, rgba(255,255,255,0.09), rgba(255,255,255,0.02) 55%, rgba(0,4,40,0.25))

## Typography
  Display/headings → Geist Sans, 600 weight only — weight carries hierarchy, don't add a
    second display face
  Body/UI          → Geist Sans, 400/500
  Numbers ONLY (scores, KPIs, dates, currency, timestamps) → Geist Mono
  Fallback stack if Geist isn't available: Inter for sans, ui-monospace for mono

## The "TV-like" frame
The whole app shell should read like a wide, glowing instrument display, not a bare webpage:
a very subtle outer vignette (radial darkening at the corners, barely visible) and a soft
inset shadow at the viewport edge give the sense of a screen rather than a flat page. Keep
this extremely subtle — it should register as "premium" on close inspection, not as a literal
TV bezel graphic. The concept file's `.device`/`.screen` wrapper is the reference for how
restrained this should stay.

## Liquid-glass icon chips (the one deliberately tactile element)
Nav icon chips (sidebar, collapsed or expanded) use a genuinely dimensional glass recipe —
layered highlight gradient (light top-left, fading to near-transparent), a soft inner bevel
via a top inset highlight and a darker bottom inset shadow, and a real drop shadow that
deepens on hover. Active state adds a cyan glow ring. This should look clickable and slightly
alive, the way current iOS glass icons do — reference `62213...jpg` (Stakent) and
`Navbar.jpg` (Velto) for the sidebar structure this sits inside, and the concept file for
the actual CSS recipe already built. This glass treatment is reserved for icon chips only —
do not apply the same stacked-shadow recipe to ordinary content cards; those stay flat,
hairline-bordered, Linear-style.

## Floating background icon field
A sparse field of 10-15 low-opacity (12-18%) job-related icons (briefcase, document,
building, bar-chart, calendar, mail) drifts slowly across the full app-shell background,
independent of sidebar collapse/expand state — the field never resets or hides when the
sidebar toggles. On cursor proximity, nearby icons disperse with a soft spring/repulsion
effect (~130px radius, eased return). Icons read as dimensional (drop-shadow, slight
scale/rotation variance) even where the implementation is DOM/CSS rather than true WebGL —
see the "3D-look-now, WebGL-later" note below. Respect prefers-reduced-motion: kill drift and
repulsion entirely, keep instant/static icon placement.

3D-look-now, WebGL-later: build this as DOM elements with Framer Motion physics first (fast
to ship, easy to make accessible). A true react-three-fiber rebuild of the same effect is a
good Phase 2 / skill-building upgrade once the rest of the app is stable — don't block v1 on it.

## Kanban card stacking — the "you can see the light" concept
Interpretation to confirm with the design owner before treating as final spec: each Kanban
column shows ONE fully-detailed focused card at the top (glass-free, hairline border, 3px
left status-color accent, logo chip, title, company, pills, corner match-score gauge,
footer with source + deadline chip), followed by the rest of that column's jobs as slim,
draggable PILL rows (single line: status dot, title, mini match score) rather than full
cards. When more pills exist than fit in view, don't just cut off or scroll silently — show
a thin glowing sliver beneath the visible pills/column header, tinted with the hidden
entries' status color, hinting that more is stacked there. Reference `62213...jpg`'s "Active
Staking" list (the compact pill rows under a focused expanded card) as the structural model.

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
Every text/background pairing passes WCAG AA contrast — check explicitly, glass and dark
surfaces are the easiest place to fail this without noticing. Keyboard focus states need to
look as considered as hover states. dnd-kit keyboard drag support stays wired, not stripped
for visual polish.

## Two-sided nav
The sidebar's nav set switches on account type. Candidate: Pipeline, Inbox, Explore,
Analytics, Profile. Recruiter: Companies, Applications, Recruiter Hub, Analytics, Profile.
Same icon-chip recipe, same structure, different icon set — this is one design system serving
two account types, not two different apps.

Build against messy, realistic data (see mockData.ts for the candidate shape) — an empty
column, an overflowing column with the stacking effect actually triggered, a red-zone match
score, a deadline three days out. Ask before moving from this design-system pass into full
screen-by-screen build.
```

---

## 3. Open items to confirm before this becomes the final, locked spec

1. **Sidebar fade direction** — confirmed as "opposite" per your description; I chose brighter-at-top for the sidebar (mirroring where the toggle sits) fading darker toward the account chip. Flip it if you meant the reverse.
2. **Stacked-pill Kanban behavior** — this is my synthesis of your description against the Stakent reference, not something you'd already fully specified. Look at the concept file's stack, and correct anything that doesn't match what you pictured — especially whether the "focused card" should be the newest entry, a pinned/priority entry, or something else entirely.
3. **True 3D vs. CSS-3D-look** — the plan ships a convincingly dimensional DOM/Framer Motion version now, with a real WebGL (react-three-fiber) rebuild as a deliberate Phase 2 skill-building step, per your own earlier interest in leveling up your Three.js work on this exact project. Confirm that sequencing works, or say if you want to attempt the WebGL version for v1.
4. **Recruiter-side icon set** — I picked Companies/Applications/Recruiter Hub as the three recruiter-specific nav destinations; confirm these are the right three before they're locked into the icon-chip build.

*TRACKD Design System Prompt | v2.0 Curated | July 2026 | CONFIDENTIAL*
