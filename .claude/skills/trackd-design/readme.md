# Trackd Design System

Trackd is described as an enterprise job site whose autonomy is built on **transparency, live updates, and AI interactivity** — a hiring platform where pipeline state, candidate scoring, and offers are always current and always visible.

## Sources

- **Codebase (ground truth):** a mounted design-system export named **"Halo"**, at `halo/` in this project's attachments — `halo/DESIGN.md` (full token + component spec), `halo/metadata.json` (palette/fonts/icon pack), `halo/css/system.css` (the compiled CSS), and `halo/html/{cover,preview}.html`. Halo is a dark, architectural system ("the interface should fade and the data should glow") and is the structural and visual foundation of everything in this project — colors, type scale, radii, shadows, motion, and component anatomy are all carried over from it near-verbatim.
- **Uploaded reference images** (`uploads/`): a mood board of unrelated third-party product screens (a Peugeot e-bike shop app, a "Velto" B2B dashboard, "teid" food-delivery panel, "TalentSync" and "Crextio" HR/hiring dashboards, "Stakent" crypto staking app, a personal finance app, an onboarding flow, and a "Shades of Blue" color-psychology sheet). None of these are Trackd's own product — no file or folder in the upload set is attributed to Trackd. They were used only as **directional mood references** (glassy dark dashboards, stat-tile-driven layouts, hiring/HR content patterns like onboarding checklists and employee counts) — not copied as source-of-truth UI. If any of these belong to a real product, do not reuse their proprietary layouts beyond the general dashboard patterns already reflected in Halo.
- No Trackd logo, wordmark file, or brand mark was supplied. See **Iconography** below.

## What's in this project

- `styles.css` — the single entry stylesheet (import list only).
- `tokens/` — colors, typography, spacing/radius/shadow/motion, fonts.
- `base/` — reset + the utility component classes (`.btn`, `.card`, `.stat-tile`, `.chip`, `.tabs`, `.check`, `.switch`, `.nav`, …) every React component below is built on.
- `guidelines/` — 18 foundation specimen cards (colors, type, spacing, radius, elevation, motion, brand) shown in the Design System tab.
- `assets/icons/` — 9 Lucide SVGs copied from the Halo source; remaining icons load from the Lucide CDN.
- `components/` — reusable React primitives, grouped by concern.
- `ui_kits/hiring-console/` — a full, click-through recreation of a Trackd employer hiring console.

## Components

Grouped by concern, one file pair (`.jsx` + `.d.ts` + `.prompt.md`) each:

- **forms/**: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
- **feedback/**: `Chip`, `Badge`
- **data/**: `Card`, `StatTile`
- **navigation/**: `Tabs`, `NavBar`

This is the full component inventory defined by the Halo source spec (`halo/DESIGN.md` → Components section: Button, Input/field, Card, Checkbox/Radio, Switch, Tabs, Chip, Stat Tile, plus the Nav primitives used in its preview page). No components were invented beyond this set.

**Intentional additions:** `Textarea` and `Select` are not separately called out in the Halo spec, but its CSS (`.textarea`, `.select`) defines them with the same input anatomy — added as siblings to `Input` for form completeness. `Badge` (a status dot, `.badge-dot` in the source CSS) was split out from `Chip` since the source styles it as a distinct, smaller primitive.

## UI Kit — Hiring Console

`ui_kits/hiring-console/index.html` is a click-through employer console: **Dashboard** (live stat tiles, activity feed, AI Copilot panel), **Jobs** (postings table), **Candidates** (AI-scored pipeline board), **Analytics** (hiring funnel), **Settings** (transparency/live-sync preferences). This is an original composition of Trackd's product — built from Halo's components and visual system, since no existing Trackd product screens were supplied — following the brief's "transparency, live update, AI interactivity" pillars (live-activity feed, AI Copilot card, AI candidate scores, live-sync toggles).

## Content Fundamentals

Voice, inferred from the Halo spec's own writing and applied to Trackd's job-site context:

- **Tone:** calm, declarative, technical-but-warm. Short sentences, no hype adjectives ("revolutionary", "game-changing"). Example from source: *"the interface should fade and the data should glow."*
- **Perspective:** second person for product copy and UI labels ("Your active stakings", "Post a job"); the system description itself uses third person/passive when explaining concepts.
- **Casing:** sentence case for headings and buttons ("Post a job", not "Post A Job"). Uppercase is reserved for eyebrows/labels (`label-sm` token) with wide tracking — never for full sentences.
- **Numerals:** always tabular/monospace (JetBrains Mono) wherever a number needs to align or carry weight — metrics, hex codes, timestamps, IDs.
- **Emoji:** none. No emoji anywhere in the source spec or its component set; keep Trackd copy emoji-free.
- **Vibe:** precise, architectural, quietly confident — a console for people who want signal, not noise. Applied to Trackd: emphasize live/real-time language ("Live", "as it happens", "updates in real time") to reflect the transparency pillar, and "Trackd AI" as a named, visible actor in copy (e.g. "Trackd AI flagged a strong match") rather than invisible automation.

## Visual Foundations

- **Colors:** a tight three-tier dark neutral spine — `background` #0A0B0F (page canvas) → `surface` #14151C (cards/panels/inputs) → `elevated` #1E2029 (modals/popovers/active states) — separated by 1px hairline borders, not shadows. One brand indigo (`#5B6BFF`) carries every action and focus state. Four signal hues (success lime `#2BE08C`, warning amber `#F5D547`, info cyan `#3DD7E5`, danger magenta `#FF3A5C`) are reserved for status/trend/emphasis and always paired with an icon or label, never used as the only signal.
- **Type:** Inter (400/500/600/700) for all UI, headline, and body text; JetBrains Mono for every metric, hex token, timestamp, and ID so numerics align in columns. Display sizes carry tight negative tracking (-0.03em) and are used once per page at most.
- **Spacing:** 4px base scale (4/8/16/24/40/64/80). Section rhythm is 64–80px between major sections, 24px between cards in a section, 16px inline gutters. Container caps at 1200px with `clamp(20px, 4vw, 48px)` side padding.
- **Backgrounds:** flat surfaces only — no photography, no hand-drawn illustration, no repeating texture/pattern. The one exception is a soft radial-gradient wash (`.card-media`, hero panels) using indigo/cyan at low opacity over the surface tiers, and a subtle top-of-page radial glow behind the nav on marketing-style pages. No full-bleed imagery.
- **Animation:** fast and quiet. Durations: 120ms (fast), 150ms (base), 240ms (slow), all on a single easing curve `cubic-bezier(0.2, 0.6, 0.2, 1)`. No bounce, no springy overshoot. Reduced-motion is respected everywhere (durations collapse to ~0).
- **Hover states:** controls lift one surface tier (`surface` → `elevated`) rather than gaining a shadow; primary/danger buttons brighten to their `-hover` token; tertiary buttons gain a surface-tint background. Links shift from `primary` to `primary-hover`.
- **Press states:** primary/secondary buttons translate down 1px and (for primary) drop to the `-pressed` token — a physical, mechanical press, not a color-only change.
- **Borders:** uniformly 1px (`--border-width`); a 1.5px "thick" variant is reserved for emphasized strokes on hero/callout surfaces. Borders — not shadows — draw almost all component geometry.
- **Shadows:** used sparingly and only for floating surfaces (modals, popovers, drawers) — `shadow-md`/`shadow-lg`, both very soft, high-opacity-black, low-spread. Flat components (cards at rest, buttons, inputs) never carry a shadow. The only "glow" permitted is the 3px indigo `focus-ring` on focus states.
- **Corners:** never sharp. 6px (checkboxes, small pills) / 10px (buttons, inputs, tabs container) / 16px (cards, stat tiles, panels) / 24px (hero/feature surfaces) / full pill (tabs, switches, chips, badges).
- **Cards:** 16px radius, 1px hairline border, 24px internal padding, no shadow at rest (elevated variant adds `elevated` tier fill + `shadow-md`). Hover only strengthens the border. A 2px colored top hairline (`card-accent`) is the sole "colored border" motif, and it is reserved for status emphasis, not decoration.
- **Layout rules:** 64px top nav with a hairline bottom border, brand mark left, controls right; the Hiring Console's left sidebar is fixed at 232px. No sticky/floating action buttons beyond the top bar.
- **Transparency & blur:** the top nav uses a translucent background (`rgba(10,11,15,0.72)`) with `backdrop-filter: blur(10px)` when sticky over scrolling content — the only place blur is used. No frosted-glass panels elsewhere.
- **Imagery color vibe:** none supplied for Trackd itself; where imagery is implied (e.g. `card-media` gradients), it stays cool — indigo/cyan — matching the palette. No warm tones, no grain, no photography treatment defined.
- **3D / depth feel:** depth comes from the three surface tiers and hairline borders "stacking" rather than literal 3D transforms, shadows, or skeuomorphism — a flatter, more architectural read than a heavy-shadow "3D card" look. If a more literal 3D/glossy feel (as in some mood references) is wanted, flag it for a follow-up pass — it would be a deliberate departure from the Halo source.

## Iconography

- **Library:** Lucide (https://lucide.dev, ISC license) — the system's single icon set, per the Halo source spec. Do not mix in other icon libraries or hand-drawn glyphs.
- **Stroke:** 1.5–1.75px, `currentColor` fill-none, so icons inherit their container's text color and tint automatically with hover/tone states.
- **Sourcing:** 9 icons used in the Halo source examples (`search`, `sun`, `moon`, `layers`, `zap`, `check`, `bell`, `settings`, `user`) are copied as static SVGs into `assets/icons/`. Additional icons used in the Hiring Console (`layout-dashboard`, `briefcase`, `users`, `bar-chart-2`, `sparkles`) are loaded live from the official Lucide CDN (`unpkg.com/lucide`) rather than hand-drawn — call `lucide.createIcons()` after mounting `<i data-lucide="name">` placeholders.

  **In this repo specifically**, production code uses the `lucide-react` npm package instead of the CDN + `data-lucide` pattern (already a project dependency, and idiomatic for React re-renders) — swap any `<i data-lucide="x">` reference from this design system into an equivalent `lucide-react` `<X />` import when porting.
- **Emoji / unicode icons:** none. The source system uses no emoji and no unicode glyphs as icons.
- **Sizes:** 12px (chips) / 14px (tabs) / 16px (buttons, inputs, nav) / 18–20px (icon-only buttons, avatars-adjacent controls).

## Fonts

Inter and JetBrains Mono, both loaded from Google Fonts (`tokens/fonts.css`) exactly as specified in the Halo source — **no substitution was needed**, these were already the source's chosen faces and no custom/brand typeface files were supplied.

## Index

- `styles.css` — entry stylesheet
- `tokens/colors.css`, `tokens/typography.css`, `tokens/effects.css`, `tokens/fonts.css`
- `base/reset.css`, `base/components.css`
- `guidelines/*.html` — 18 specimen cards (Colors ×4, Type ×3, Spacing ×5, Brand ×2, plus Motion/Elevation)
- `assets/icons/*.svg` — 9 copied Lucide icons
- `components/forms/` — Button, Input, Textarea, Select, Checkbox, Radio, Switch
- `components/feedback/` — Chip, Badge
- `components/data/` — Card, StatTile
- `components/navigation/` — Tabs, NavBar
- `ui_kits/hiring-console/` — Sidebar, TopBar, DashboardScreen, JobsScreen, PipelineScreen, AnalyticsScreen, SettingsScreen, index.html
- `SKILL.md` — portable skill definition for using this system elsewhere
