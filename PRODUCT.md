# Product

## Register

product

## Users

Two distinct user types on one shared data spine:

- **Candidates** — job seekers actively applying, using Trackd to capture postings with zero manual typing, track a real pipeline (Kanban/table/calendar), and get AI-driven compatibility scoring and resume/cover-letter help before they submit. Context: often mid-search, checking status across many simultaneous applications, frequently on a laptop between other tasks.
- **Recruiters** — hiring for open roles, using Trackd as a pre-vetted, structured, searchable view of applicants that sits on top of (not replacing) their existing ATS. Context: triaging volume, scanning for signal fast, moving candidates through stages with minimal clicks.
- **Platform admins** (Phase B, `Trackd Dashboard Admin`) — internal Trackd operators overseeing companies, candidate accounts, job postings, moderation, and support across the marketplace. Not a customer-facing persona; an internal ops console.

## Product Purpose

Trackd fixes the operational mess of a job search and the noise problem of hiring: it captures every opportunity, structures raw text/links into clean data, and puts it into a live pipeline both sides read and write to. Success looks like a candidate never losing track of an application and knowing exactly what to fix before submitting, and a recruiter seeing signal instead of generic AI-inflated resumes.

## Brand Personality

Precise, structured, unshowy. The interface should read like a well-built instrument, not a marketing surface — Linear/Vercel-grade structural restraint: hairline borders as the primary separation technique, tight type, fast and precise motion (150-220ms, no bounce). Confidence comes from density and clarity, not decoration.

## Anti-references

- Generic SaaS admin templates: stock indigo-600 buttons, default Tailwind gray cards, colorful purple-bar admin kits (Horizon UI / FlyonUI default skins).
- Filament-style form-heavy, cluttered admin UI.
- Any default component-library theming left unstripped — borrowed structural patterns (data-table pagination, filter bars, dashboard-shell grids) are fine to reference, their default skins are not.
- Stacked decorative treatments (blur + shadow + glow + gradient border all at once) on ordinary content surfaces — reserve any tactile/dimensional treatment for a single deliberate signature element, never apply it everywhere.

## Design Principles

1. **The prototype is the design.** `client/trackd-design-inspiration/project/*.dc.html` are pixel-exact specs, not inspiration — implementation should extend their register (flat `#09090B` dark / `#F3F6FF` light, Geist/Geist Mono, hairline borders), not reinterpret it.
2. **Restraint over decoration.** Hairline borders at ~10% opacity are the primary separation technique. No side-stripe borders, no gradient text, no glassmorphism-as-default.
3. **Data density with clarity.** These are working tools used many times a day — prioritize scanability (compact tables, clear KPI rows, fast filtering) over decorative flourish. Cards are the lazy answer; use them only when genuinely the best affordance.
4. **The fixed status-color contract is sacred.** Saved `#1d4ed8`, Applied `#06b6d4`, Interviewing `#f59e0b`, Offer Received `#10b981`, Rejected/Closed `#ef4444` — sourced from `docs/mockData.ts`, used identically everywhere a stage appears (Kanban, table, badges, charts). Never restyled or reinterpreted per-view.
5. **Dark is primary, light is a fully-supported peer.** `useTheme` already flips a complete CSS-custom-property token set (`client/src/index.css`) — every new surface must work in both, not just be designed for dark and left broken in light.

## Accessibility & Inclusion

WCAG AA contrast on every text/background pairing (dark and light theme both) — check explicitly, glass/dark surfaces are the easiest place to fail this without noticing. Keyboard focus states must look as considered as hover states. Respect `prefers-reduced-motion` (already implemented globally in `client/src/index.css`). Kanban/drag-and-drop interactions need a keyboard-operable alternative, not mouse-only.
