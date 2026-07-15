# TRACKD — Design System & AI Build Master Prompt

**Companion to:** `TRACKD_PRD.pdf` (v1.0 Draft, July 2026) and `mockData.ts`
**Purpose:** This is the single document that sits between the PRD and the code. The PRD says *what* TRACKD must do. This document says *what it must look and feel like*, *how the UI is structured into modules*, and *the exact prompt to hand any AI coding agent* to start building it against your existing React + Vite + Tailwind + TanStack + react-icons scaffold and a `json-server` mock.

Read it top to bottom once. After that, treat Section 10 (The Master Build Prompt) as the thing you actually paste into your AI tool at the start of each build session — everything above it is the reasoning you and I did to arrive at that prompt, kept here so either of us can revisit *why* a decision was made.

---

## 0. How This Maps to What You Gave Me

Before designing anything, here's what each source actually contributed — worth stating explicitly so nothing gets designed on vibes alone:

| Source | Role |
|---|---|
| `TRACKD_PRD.pdf` | Authoritative feature scope, the 5-status lifecycle, the 3 dashboard views, the 5 analytics charts, AI Insights + Resume Canvas + Cover Letter specs, and the Phase 1 sprint plan (Weeks 1–12). Every screen in this doc traces back to a numbered PRD section. |
| `mockData.ts` | The actual data contract — `JobApplication`, `UserProfile`, `mockAnalyticsSummary`. Critically, this file **already hardcodes the 5 status colors** (`#1d4ed8`, `#06b6d4`, `#f59e0b`, `#10b981`, `#ef4444`) for the pipeline donut. That's not a moodboard suggestion — it's live in your codebase, so the Kanban columns, table status pills, and calendar dots must reuse these exact values rather than inventing new ones. |
| `Main_Design.png` | Your **primary visual language** — the one you explicitly said to build components from. Dark-to-blue glass gradient background, floating glass panel cards with soft shadow, pill-shaped bottom nav with a glowing gradient active state, rounded glass icon chips. This is the aesthetic anchor for the whole app. |
| `Navbar.jpg` (Velto) | Sidebar structure reference — icon+label nav rows, a persistent action item pinned to the bottom of the nav (their "Help Center"), light content area to the right of a dark sidebar. |
| `Bluu.jpg` (Shades of Blue) | The literal color source. Named, psychologically-grounded blues rather than a generic `slate-900` dark-mode default. |
| `62213...jpg` (Stakent) | Closest mood match to `Main_Design.png` in an actual dashboard context — dark navy shell, glass stat cards with sparklines, icon+label sidebar, a gradient CTA panel, a small account chip pinned above the fold at the bottom of the sidebar. |
| `e58521...webp` | Dense dashboard reference — KPI cards, a bar chart, a donut ("Sales by Category"), and a filterable status-badge table. Structurally, this is your Analytics page + Table view in miniature. |
| `Analtics_dashboard.jpg` | Light-theme, but structurally useful: KPI cards → chart → radial/arc stat → calendar widget → table, in that order. This ordering informs the Analytics page layout even though we invert it to dark/glass. |

---

## 1. Design Direction — Three Named Choices

Rather than default to "dark mode dashboard #0f172a," here are the three deliberate calls this system makes, so you can push back on any of them before we build:

1. **Palette is inherited, not invented.** The 5 status colors are locked from `mockData.ts` (non-negotiable — they're load-bearing data, used in analytics today). Everything else — the background glow, the sidebar, the glass surfaces — is built from the *Shades of Blue* sheet you provided, each hue used for the psychological role it names (Navy for ground/authority, Persian for confidence/CTAs, Electric for alertness/focus states).
2. **Typography reinforces "command centre."** The PRD's own words for TRACKD are "the command centre that fixes the operational problem." So the type system leans HUD/instrument-panel: a geometric display face for headings, a neutral workhorse for body copy, and — distinctively — a monospace face reserved *only* for numbers (match scores, KPIs, dates, timestamps). That third face is what stops this from reading as a generic SaaS dashboard.
3. **One signature motif, reused everywhere.** The match-score gauge (a circular conic-gradient ring) is the single most "TRACKD" visual object in the PRD. Instead of confining it to the Pro page, it echoes at small scale as the active-nav glow in the sidebar and as the corner ambient light on glass cards. One shape, three sizes, tying the whole app together — rather than three unrelated decorative flourishes.

---

## 2. Design System Foundations

### 2.1 Color Tokens

**Status colors — fixed, from `mockData.ts`. Do not restyle these.**

| Status | Hex | Used for |
|---|---|---|
| Saved | `#1d4ed8` | Kanban column 1, table pill, calendar dot, donut segment |
| Applied | `#06b6d4` | Kanban column 2, table pill, calendar dot, donut segment |
| Interviewing | `#f59e0b` | Kanban column 3, table pill, calendar dot, donut segment |
| Offer Received | `#10b981` | Kanban column 4, table pill, calendar dot, donut segment |
| Rejected/Closed | `#ef4444` | Kanban column 5, table pill, calendar dot, donut segment |

**Atmosphere & UI — from the Blue Psychology sheet, each with an assigned job:**

| Token | Hex | Role | Psychology (your sheet) |
|---|---|---|---|
| `--bg-ground` | `#000871` (Navy) | Deepest point of the background gradient, bottom of viewport | Strength, authority, intelligence |
| `--bg-mid` | `#241571` (Midnight) | Sidebar base surface, modal backdrops | Mystery, depth, elegance |
| `--brand-primary` | `#2438BD` (Persian) | Primary buttons, active nav pill, links | Confidence, sophistication, ambition |
| `--brand-secondary` | `#0F52BA` (Sapphire) | Secondary buttons, focus borders | Truth, nobility, loyalty |
| `--glow-mid` | `#007FFF` (Azure) | Mid-gradient stop, hover states | Clarity, freedom, serenity |
| `--glow-top` | `#52E8FF` (Electric) | Top-of-screen glow, focus rings, drag-active highlight | Intensity, innovation, alertness |
| `--accent-info` | `#007BA7` (Cerulean) | Info banners, AI-insight highlights | Inspiration, renewal, clarity |
| `--accent-energy` | `#0AFFFF` (Aqua) | "New"/"AI-suggested" badges — never used for status, to avoid clashing with Offer's emerald | Vibrancy, energy, healing |
| `--text-tint-1` | `#70B8FF` (Argentina) | Secondary text on dark surfaces | Openness, tranquility |
| `--text-tint-2` | `#99CCFF` (Sky) | Muted labels, placeholder text | Lightness, calm, aspiration |
| `--border-glass` | `#ADFFFF` (Celeste) at 8–12% opacity | Glass card borders, dividers | Gentleness, freshness |

**Background gradient (the "ground to glow" spec you described):**

```css
.app-shell {
  background:
    radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82, 232, 255, 0.16), transparent 65%),
    linear-gradient(to top,
      #000871 0%,
      #0B1148 30%,
      #182466 55%,
      #1F2E86 75%,
      #2438BD 100%
    );
  background-attachment: fixed;
  min-height: 100vh;
}
```
Bottom stays dark and authoritative; the top opens into the Electric-blue glow, exactly like the `Main_Design.png` reference. Fixed attachment means the glow doesn't reset per-scroll on long pages (Table/Analytics).

### 2.2 Typography

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** | Geometric, slightly technical — carries the "command centre" personality. Use 600–700 weight only. |
| Body / UI copy | **Inter** | Neutral, extremely legible at small sizes — this is a data-dense app, body face needs to disappear into the content. |
| Data / numerals | **JetBrains Mono** | Reserved *exclusively* for numbers: match scores, KPI figures, dates, currency, timestamps. This is the signature typographic choice — it's what makes the KPI cards and match-score gauge feel like instrument readouts rather than generic stat cards. |

All three are open-source / free on Google Fonts — no licensing blocker.

### 2.3 The Glass Recipe

Every elevated surface in the app — sidebar, cards, modals, side panel — uses one recipe, so nothing looks like it came from a different kit:

```css
.glass-surface {
  background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(173, 255, 255, 0.10); /* --border-glass */
  border-radius: 1.25rem; /* rounded-2xl+ */
  box-shadow:
    0 8px 32px rgba(0, 8, 113, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

**Icon chips** (the "padded, popped-out, iOS-glass" look you asked for) use the same recipe at smaller scale:

```css
.icon-chip {
  width: 2.5rem; height: 2.5rem; /* 40px, use 2.75rem for primary nav */
  display: flex; align-items: center; justify-content: center;
  border-radius: 0.875rem; /* rounded-xl */
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.icon-chip:hover { transform: translateY(-2px); }
.icon-chip.active {
  box-shadow: 0 0 0 1px rgba(82,232,255,0.4), 0 0 24px rgba(82,232,255,0.35);
}
```

### 2.4 Spacing, Radius, Motion

- Radius scale: `0.75rem` (chips/badges) → `1.25rem` (cards) → `1.75rem` (sidebar, modals). Nothing sharp-cornered anywhere — it breaks the glass-iOS language.
- Spacing: Tailwind default scale, but card internal padding is fixed at `p-5` (mobile) / `p-6` (desktop) everywhere — consistency here matters more than per-card tuning.
- Motion: transitions only, no page-load choreography. Card hover lift (`translateY(-2px)`), status-pill color transition on drag-drop (200ms), drawer collapse/expand (220ms width transition). Respect `prefers-reduced-motion` — disable the lift and glow-pulse, keep instant state changes.

---

## 3. Layout Architecture

```
┌────┬─────────────────────────────────────────────────────────┐
│ ▤  │  Job Pipeline          [Kanban] [Calendar] [Table]  🔍 🔔│  ← page header: title
│────│─────────────────────────────────────────────────────────│    left, view-switch
│ ⌂  │                                                          │    tabs Notion-style
│ 🗂 │   ╭──────────╮  ╭──────────╮  ╭──────────╮  ╭──────────╮ │    top-right
│ 📊 │   │ Saved    │  │ Applied  │  │Interview │  │  Offer   │ │
│ ✨ │   │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │  │          │ │
│ 👤 │   │ │ card │ │  │ │ card │ │  │ │ card │ │  │  (empty  │ │
│    │   │ └──────┘ │  │ └──────┘ │  │ └──────┘ │  │  state)  │ │
│────│   ╰──────────╯  ╰──────────╯  ╰──────────╯  ╰──────────╯ │
│ ⚙  │                                                          │
│    │                                                          │
│ 👤R│ ← account chip (avatar, name, Free/Pro badge)             │
│ ⎋  │ ← logout, pinned via mt-auto                              │
└────┴─────────────────────────────────────────────────────────┘
  ↑ sidebar: 84px collapsed / 240px expanded
    drawer toggle (▤) sits at the very top, above the logo mark
```

**Sidebar (from `Navbar.jpg` + `62213...jpg`):**
- Drawer toggle icon lives at the top of the sidebar itself — clicking it animates sidebar width between collapsed (icon-only, 84px) and expanded (icon+label, 240px). State persists in memory for the session.
- Nav items: `icon-chip` + label, in a vertical list. Active item gets the glow-ring halo (Section 2.3) plus a 3px left accent bar in that section's theme color.
- Bottom of the nav (flex `mt-auto`, not absolutely positioned — so it always sits at the bottom of whatever viewport height): a divider, then a compact account chip (avatar, name, Free/Pro badge — mirrors Stakent's "Ryan Crawford · PRO"), then **Logout** as its own icon+label row, styled with a subtle red tint on hover so it reads as a distinct, slightly destructive action.

**Main content (to the right, per your spec):**
- Every page opens with a header row: page title on the left, and — where a page has multiple views or filters — icon+label tab buttons on the right (Kanban/Calendar/Table on the Dashboard; date-range filter on Analytics; Summary/Experience/Skills/Education on the Resume Canvas). This is the "Notion-style" pattern you described, applied consistently rather than only on one page.
- All content below the header sits in `glass-surface` cards on top of the ambient gradient. Nothing floats directly on the bare gradient except the header row itself.

**Responsive behavior:** below `md` breakpoint, the sidebar collapses to a fixed bottom tab bar (icon-only, 5 primary items max) — same pattern as `Main_Design.png`'s bottom nav, which already solves this for you visually.

---

## 4. Information Architecture — Screen Inventory

| # | Screen | PRD Section | Notes |
|---|---|---|---|
| 1 | Onboarding (4-step wizard) | Sprint 3 | Resume upload → extraction → confirm profile → done |
| 2 | Ingestion (Smart Paste / URL) + Side Panel | §4, §4.3 | Side panel slides from the right, confidence-colored fields |
| 3 | Dashboard — Kanban (default) | §5.1 | 5 fixed columns, drag-and-drop, per-card match score badge (Pro) |
| 4 | Dashboard — Calendar | §5.2 | Applied-date + deadline markers, month/week/day |
| 5 | Dashboard — Table | §5.3 | TanStack Table, inline status edit, bulk actions |
| 6 | Analytics | §6 | 4 KPI cards + 5 charts, date-range filter (30/90/All) |
| 7 | Pro Page — AI Insights | §7 | Match score gauge, ATS keyword risk, bullet suggestions |
| 8 | Pro Page — Resume Canvas | §8.1 | Split pane: live preview + tabbed editor |
| 9 | Pro Page — Cover Letter | §8.2 | Tone selector, generate, editable output |
| 10 | Profile / Settings | §8.3, US-12 | Career prefs, resume re-upload, plan status |
| 11 | ProGate modal (global) | US-11 | Shown over any Pro feature when the user is Free tier |

---

## 5. Modular Component Architecture

Per your instruction — every stage/module is self-contained, Tailwind-first, with its own `index.css` for anything Tailwind utilities can't express cleanly (font-face, CSS variables, the one or two bespoke glass/gauge rules per module).

```
src/
├── styles/
│   ├── tokens.css            # :root variables from Section 2.1, font-face imports
│   └── index.css              # @tailwind base/components/utilities + tokens.css import
│
├── layout/
│   ├── AppShell/
│   │   ├── AppShell.jsx        # gradient background wrapper, grid: sidebar | main
│   │   └── index.css
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   ├── SidebarNavItem.jsx
│   │   ├── AccountChip.jsx
│   │   └── index.css           # drawer width transition, active-glow rule
│   └── PageHeader/
│       ├── PageHeader.jsx      # title + slot for view-tabs/filters
│       ├── ViewTabs.jsx         # the Notion-style icon+label switch
│       └── index.css
│
├── shared/
│   ui/
│   │   ├── GlassCard.jsx
│   │   ├── IconChip.jsx
│   │   ├── StatusPill.jsx      # reads the 5 fixed status colors
│   │   ├── MatchScoreGauge.jsx # the signature motif, sized via prop
│   │   ├── EmptyState.jsx
│   │   ├── Skeleton.jsx
│   │   └── index.css
│   ├── hooks/
│   │   ├── useJobs.js          # TanStack Query: list/create/update job
│   │   ├── useProfile.js
│   │   └── useAnalytics.js
│   └── lib/
│       ├── apiClient.js        # base fetch wrapper, points at json-server
│       ├── statusMachine.js    # the allowed-transitions matrix, §5.4 — single source of truth
│       └── formatters.js       # currency, relative dates
│
├── modules/
│   ├── ingestion/
│   │   ├── components/ (SmartPasteInput, UrlInput, IngestionSidePanel, ConfidenceField)
│   │   └── index.css
│   ├── dashboard/
│   │   ├── kanban/
│   │   │   ├── components/ (KanbanBoard, KanbanColumn, KanbanCard)
│   │   │   └── index.css       # column tint per status, drag-active ring
│   │   ├── calendar/
│   │   │   ├── components/ (CalendarView, DeadlineMarker, QuickViewModal)
│   │   │   └── index.css       # FullCalendar theme overrides
│   │   └── table/
│   │       ├── components/ (JobsTable, StatusDropdownCell, BulkActionsBar)
│   │       └── index.css       # TanStack Table row/cell overrides
│   ├── analytics/
│   │   ├── components/ (KpiCard, ApplicationsOverTimeChart, PipelineDonut, SourceBarChart, TopRolesList, TimeInStageCards)
│   │   └── index.css
│   ├── pro-insights/
│   │   ├── components/ (MatchScorePanel, AtsKeywordRisk, BulletSuggestionChip)
│   │   └── index.css
│   ├── resume-canvas/
│   │   ├── components/ (ResumePreviewPane, ContentEditorTabs, SuggestionChip)
│   │   └── index.css
│   ├── cover-letter/
│   │   ├── components/ (ToneSelector, GeneratedLetterEditor)
│   │   └── index.css
│   └── profile/
│       ├── components/ (ProfileForm, ResumeReuploadCard, PlanBadge)
│       └── index.css
│
└── app/
    ├── routes/ (one file per screen in Section 4, thin — compose module components)
    └── providers/ (QueryClientProvider, AuthProvider stub)
```

**Convention:** each module's `index.css` is scoped under a single root class matching the module (e.g. `.kanban-board { ... }` using `@layer components { @apply ... }`), imported only by that module's own components. Nothing in a module's CSS should ever need to reach outside its own root class — if it does, that rule belongs in `shared/ui` instead.

---

## 6. Signature Component Specs

**KanbanCard** (built from `mockJobs` shape + the `Main_Design.png` glass-card language):
- `glass-surface`, 3px left accent bar in the card's status color
- Header row: `companyLogoUrl` in a small `icon-chip`, `jobTitle` (Space Grotesk, 600), `companyName` (Inter, muted)
- Meta row: `seniorityLevel` + `workMode` as small pills
- Corner: `matchScore` as a mini `MatchScoreGauge` (Pro only — hidden with a lock glyph for Free)
- Footer row: `source` icon + `appliedDate` (JetBrains Mono), `deadline` as a countdown chip that shifts from Sky → amber → red as it approaches
- Drag handle affordance appears on hover only

**MatchScoreGauge** (the signature motif): conic-gradient ring, color interpolated red→amber→green per the PRD's own thresholds (< 40 red, 40–69 amber, ≥ 70 green), center shows the score in JetBrains Mono. Three sizes: `sm` (kanban corner badge), `md` (table cell), `lg` (Pro page hero).

**KpiCard**: `glass-surface`, label in Inter/Sky, value in JetBrains Mono at display size, small trend indicator reusing the status-color logic (green up / red down) — matches the "This month vs last" pattern from `Analtics_dashboard.jpg` and `e58521...webp`.

---

## 7. Data Contracts & Mock Server Setup

Your `db.json` for `json-server`, derived directly from `mockData.ts` (no shape changes — it's already clean):

```json
{
  "jobs": [ /* mockJobs array, as-is */ ],
  "profile": { /* mockProfile object, as-is */ },
  "analyticsSummary": { /* mockAnalyticsSummary object, as-is */ }
}
```

- `jobs` is an array → json-server gives you full REST + filtering/sorting for free: `GET /jobs?status=Interviewing`, `GET /jobs?_sort=deadline&_order=asc`.
- `profile` and `analyticsSummary` are top-level objects (not arrays) → json-server automatically serves them as **singular resources**: `GET /profile`, `PUT /profile` — no `/profile/:id` needed.
- **Known divergence to flag now:** in production, `analyticsSummary` will be computed live by the Go backend from Firestore, not stored. Keep it static in the mock for now, but don't wire any "edit analytics" UI against it — it exists only so the Analytics screens have real numbers to render against during frontend build.
- Add one field the mock doesn't have yet but the PRD requires for US-11 (ProGate): `profile.tier: "Free" | "Pro"`. Toggle it manually in `db.json` to test both gated and ungated states without needing real auth yet.

**TanStack Query hook plan:**
- `useJobs()` → `queryKey: ['jobs']`, powers Kanban/Calendar/Table simultaneously (single source, three views)
- `useUpdateJobStatus()` → mutation with optimistic update; also appends a client-side `historyLog` entry so the Kanban→Analytics loop is testable before the real backend logs transitions
- `useProfile()`, `useAnalyticsSummary()` — straightforward reads

**`statusMachine.js`** — encode the PRD §5.4 transition table once, use it everywhere status can change (Kanban drop target validation, Table's inline dropdown options):
```js
export const ALLOWED_TRANSITIONS = {
  Saved: ['Applied', 'Rejected/Closed'],
  Applied: ['Interviewing', 'Rejected/Closed'],
  Interviewing: ['Offer Received', 'Rejected/Closed'],
  'Offer Received': [],
  'Rejected/Closed': [],
};
```

---

## 8. Open Decisions Before Build

A short list of things I assumed — flag any you want changed before this goes into a build prompt for real:

1. **Sidebar collapsed width** — assumed 84px (icon-only, still shows tooltips on hover). Confirm that's tight enough / not too tight.
2. **Dark-only vs. light toggle** — everything above assumes TRACKD is dark-glass only, no light theme. The PRD doesn't mention a light mode; confirming that's intentional.
3. **Logout confirmation** — assumed no confirm modal (single click, matches most SaaS apps). Flag if you want a confirm step.
4. **Mobile sidebar** — assumed bottom tab bar with 5 items max below `md`. If you have more than 5 top-level nav destinations once Settings/Profile are added, we need a "More" overflow item.

---

## 9. Recommended Build Sequence

The PRD's Sprint plan (Section 12) is a **full-stack** plan — Go router, Firestore, Gemini, etc. run in parallel with frontend. Since you're building the UI against `json-server` + mock data right now, here's the frontend-specific sequencing that de-risks the PRD's Sprint 4 crunch (Kanban + Calendar + Table all due in a 2-week window) by starting UI work earlier than the backend track requires it:

| Phase | Maps to PRD Sprint | Deliverable |
|---|---|---|
| **0 — Foundations** | Parallel to Sprint 1 (Weeks 1–2) | Design tokens (`tokens.css`), `AppShell`, `Sidebar` with drawer toggle + logout, `json-server` running against the `db.json` above. This is pure frontend and has zero backend dependency — start it immediately rather than waiting for Sprint 1's auth work to land. |
| **1 — Core shared UI** | Parallel to Sprint 1–2 | `GlassCard`, `IconChip`, `StatusPill`, `MatchScoreGauge`, `EmptyState`, `Skeleton` — build these once, correctly, before any module consumes them. |
| **2 — Kanban** | Aligns with Sprint 4, but start early | Highest-value, most-visible screen. Build against mock `jobs` data — drag-and-drop, status transitions via `statusMachine.js`, optimistic updates. This can be demo-ready well before Sprint 4 if started in parallel with Phase 0/1. |
| **3 — Table + Calendar** | Sprint 4 | Same underlying `useJobs()` hook as Kanban — proves the "three views, one data source" requirement from §5. |
| **4 — Ingestion + Side Panel** | Sprint 2 (backend), frontend can mock the Gemini response shape and build the confidence-indicator UI without waiting on the real endpoint. |
| **5 — Analytics** | Sprint 6, but the static `analyticsSummary` mock means charts can be built any time after Phase 1 — don't wait until Sprint 6 to start. |
| **6 — Pro Page (Insights + Resume Canvas + Cover Letter)** | Sprint 5 | Heaviest module — build `MatchScorePanel` and `ResumeCanvas` split-pane last, since they lean on the signature gauge and the most editing-heavy UI in the app. |
| **7 — Profile/Onboarding + ProGate** | Sprint 3 | Can trail behind Kanban — lower visual risk, well-understood pattern (form + wizard). |
| **8 — Polish pass** | Sprint 6 | Empty states, loading skeletons, error boundaries, `prefers-reduced-motion`, WCAG 2.1 AA pass (PRD §10 — this is a hard NFR, not optional). |

**The single biggest schedule win available to you:** because every mock resource (`jobs`, `profile`, `analyticsSummary`) already matches the real Firestore document shape from `mockData.ts`, the entire frontend in Phases 0–6 can be built and demoed to stakeholders *before* the Go backend or Gemini integration exists at all. When Sprint 2's real ingestion endpoint lands, you swap `apiClient.js`'s base URL and nothing else changes.

---

## 10. The Master Build Prompt

Copy everything in the fenced block below into a fresh AI coding session (Claude Code or otherwise) once your React + Vite + Tailwind + TanStack + react-icons scaffold and `json-server` are running. It's self-contained — it doesn't assume the AI has read the rest of this document.

```markdown
# TRACKD — Frontend Build Instructions

You are building the frontend UI for TRACKD, an AI job-application tracker, on top of an
existing React + Vite + Tailwind + TanStack (Query + Table) + react-icons scaffold. Data comes
from a `json-server` instance serving three resources: `jobs` (array), `profile` (object),
`analyticsSummary` (object) — shapes defined in `mockData.ts`, already in the repo. Do not
alter that data shape.

## Non-negotiable design tokens

Background (apply once, at the app-shell level, fixed):
  radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82,232,255,0.16), transparent 65%),
  linear-gradient(to top, #000871 0%, #0B1148 30%, #182466 55%, #1F2E86 75%, #2438BD 100%)

Status colors — FIXED, sourced from mockData.ts, used identically across Kanban/Table/Calendar/
Analytics. Never restyle these:
  Saved            #1d4ed8
  Applied          #06b6d4
  Interviewing     #f59e0b
  Offer Received   #10b981
  Rejected/Closed  #ef4444

UI/atmosphere palette (from a Blue Psychology reference — use for everything that is NOT a
status color):
  --bg-ground      #000871
  --bg-mid         #241571
  --brand-primary  #2438BD
  --brand-secondary #0F52BA
  --glow-mid       #007FFF
  --glow-top       #52E8FF
  --accent-info    #007BA7
  --accent-energy  #0AFFFF
  --text-tint-1    #70B8FF
  --text-tint-2    #99CCFF
  --border-glass   rgba(173,255,255,0.10)

Typography:
  Display/headings → Space Grotesk, 600-700 weight only
  Body/UI          → Inter
  Numbers ONLY (scores, KPIs, dates, currency, timestamps) → JetBrains Mono
  All three via Google Fonts, self-host or @import — no licensing issue.

Glass surface recipe (every elevated panel — sidebar, cards, modals, side panel):
  background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(173,255,255,0.10);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0,8,113,0.35), inset 0 1px 0 rgba(255,255,255,0.06);

Icon chips (nav items, card headers): 40-44px square, rounded-xl, same glass recipe at smaller
scale, hover = translateY(-2px), active = 0 0 24px rgba(82,232,255,0.35) glow ring.

Signature motif: a circular conic-gradient "match score gauge" — red below 40, amber 40-69,
green 70+, JetBrains Mono numeral centered. Build it once as <MatchScoreGauge size="sm|md|lg" />
and reuse it as: (a) a small badge on Kanban card corners, (b) a cell in the Table view,
(c) the hero element on the Pro Insights page. This is the one recurring visual signature —
don't introduce competing decorative motifs elsewhere.

## Layout — non-negotiable

- Sidebar, fixed left. Collapsed = 84px icon-only, expanded = 240px icon+label. A drawer-toggle
  icon sits at the TOP of the sidebar (above/beside the logo) and controls this state.
- Sidebar nav items: icon-chip + label, active state gets a 3px left accent bar + glow-ring halo.
- Bottom of sidebar (flex, mt-auto — not absolute positioning): divider → compact account chip
  (avatar, name, Free/Pro badge from profile.tier) → Logout as its own icon+label row with a
  subtle red-tinted hover.
- Main content sits to the RIGHT of the sidebar. Every page opens with a header row: page title
  left, icon+label view-switch tabs or filters right (Notion-style pattern) — e.g. Kanban /
  Calendar / Table tabs on the Dashboard page, a date-range filter on Analytics.
- All content below the header row lives in glass-surface cards. Nothing sits directly on the
  bare gradient except the header row.
- Below the `md` breakpoint, the sidebar collapses into a fixed bottom tab bar, icon-only,
  max 5 items.

## Module architecture — non-negotiable

Build every screen as a self-contained module under src/modules/<name>/, each with its own
components/ folder and its own index.css. The index.css should hold ONLY what Tailwind
utilities can't express cleanly (font-face imports go in styles/tokens.css once, not per
module) — e.g. the conic-gradient gauge rule, a drag-active ring, FullCalendar/TanStack Table
theme overrides. Scope every module's CSS under a single root class matching the module name
(e.g. `.kanban-board { @apply ...; }`) so nothing leaks across modules. Shared primitives
(GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton) live once in
src/shared/ui/ and are imported by every module — do not reimplement them per module.

Folder tree to create:
  src/styles/{tokens.css, index.css}
  src/layout/{AppShell, Sidebar, PageHeader}/  (each with index.css)
  src/shared/ui/  (GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton + index.css)
  src/shared/hooks/  (useJobs, useProfile, useAnalytics — TanStack Query)
  src/shared/lib/  (apiClient.js, statusMachine.js, formatters.js)
  src/modules/ingestion/
  src/modules/dashboard/{kanban, calendar, table}/
  src/modules/analytics/
  src/modules/pro-insights/
  src/modules/resume-canvas/
  src/modules/cover-letter/
  src/modules/profile/

## Data & status rules — non-negotiable

- Encode the allowed status transitions ONCE in shared/lib/statusMachine.js:
    Saved -> [Applied, Rejected/Closed]
    Applied -> [Interviewing, Rejected/Closed]
    Interviewing -> [Offer Received, Rejected/Closed]
    Offer Received -> [] (terminal)
    Rejected/Closed -> [] (terminal)
  Both the Kanban drag-drop validation and the Table's inline status dropdown must import
  and use this single file — never duplicate the transition rules.
- jobs is an array resource in json-server (GET/POST/PATCH /jobs), profile and
  analyticsSummary are singular object resources (GET/PUT /profile, GET /analyticsSummary,
  no /:id). Build shared/lib/apiClient.js as a thin fetch wrapper pointed at the json-server
  base URL so swapping to the real Go backend later is a one-line change.
- profile.tier ("Free" | "Pro") gates all Pro features. Any Pro-only UI (match score, ATS
  analysis, resume canvas, cover letter) must check this and render a ProGate modal/upsell
  instead of the feature when tier is "Free" — build ProGate as one shared component, not
  per-module upsell copy.

## Build order

1. AppShell + Sidebar + design tokens + json-server wiring (no feature logic yet)
2. shared/ui primitives (GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton)
3. Kanban board (dnd-kit) — highest-value, most visible screen, build and polish this first
4. Table (TanStack Table) + Calendar (FullCalendar) — same useJobs() data source as Kanban
5. Ingestion Smart Paste UI + side panel (mock the parsed-field shape if the real endpoint
   isn't ready)
6. Analytics (Recharts) — 4 KPI cards + 5 charts against the static analyticsSummary mock
7. Pro Insights panel + Resume Canvas split-pane + Cover Letter generator
8. Profile/onboarding + ProGate modal
9. Polish pass: empty states, loading skeletons, error boundaries, prefers-reduced-motion,
   WCAG 2.1 AA keyboard focus and contrast check

Work through this list module by module. After each module, stop and show the result before
starting the next — don't build multiple modules silently in one pass.
```

---

That's the full research-to-prompt package. When you're ready to actually start building, hand the fenced block in Section 10 to your AI coding tool and work through the build order one module at a time — starting with Phase 0 (App Shell + Sidebar) costs you nothing while the rest of the team is still on Sprint 1.








On the landing page
You're right that I skipped it — I jumped straight to the onboarding wizard as "screen #1." It shouldn't use the app shell at all (no sidebar, no glass dashboard chrome) — it's pre-auth, full-bleed, its own layout, but pulling the same fonts/colors/GlassCard primitives so it doesn't feel like a different product once someone logs in.
Structurally, for TRACKD specifically:

Hero: lead with the PRD's own framing — job hunting is an operational problem, not a motivation problem — paired with a live mini-demo of Smart Paste actually populating fields, not a screenshot. That moment is TRACKD's most differentiated feature; showing it beats describing it.
Problem section: 3–4 beats mirroring §2 (data scattered everywhere, no real performance data, generic materials), written as user-facing copy, not lifted PRD prose.
Product walkthrough: one section per pillar, each with a real in-app screenshot once the design system exists — Kanban, Analytics, AI Insights, Resume Canvas.
Free vs. Pro table — simple, since monetization is a flat freemium split.
Single CTA throughout: "Start Tracking Free" → straight into the 4-step wizard (Sprint 3). No demo booking, no logos-of-customers strip — this is a B2C tool, that stuff would ring false.

On building it exemplary rather than just complete

Get the shared primitives (GlassCard, MatchScoreGauge, IconChip) right before anything else — they're now load-bearing across every module, so a small flaw compounds instead of staying local.
Build against messy data early, which is exactly why I just expanded the mock to 15 jobs — an empty Saved column, an overflowing Interviewing column, a red-zone match score, a deadline three days out. Those edge cases need to exist on day one, not get discovered in Sprint 6.
Treat empty states and the "your analytics are stale" warning (§6.2) as real product surfaces, not afterthoughts — the PRD calls them out explicitly for a reason.
Wire Analytics against real status-change events from the start, even against json-server, so it has genuine behavior to visualize instead of being bolted on at Sprint 6.
Keep the AI's own voice honest — "a tool, not a verdict" per §7.1. That restraint should show up in how match scores, empty states, and error copy are all worded, not just in the AI panel.
Use the Kanban board as your running bar for "does this feel as considered as the rest of the app" — it's first, it's most visible, and it's the thing every other screen should be measured against.


Can Cluade Desigin achieve this and how detailed please... I need my frontend skills to start being top-notch considering i've been doing this 5 years adn im just get conversant with three js and i need more pro design/Frontend skills that sets me apart

On leveling up your frontend/design craft — five years in and "conversant with Three.js" means generic advice won't help you. Here's what actually moves the needle from solid to distinctive:

CSS past the fundamentals. The gap between "AI dashboard" and "premium product" usually lives in: custom cubic-bezier easing (never ease-in-out), clamp() for fluid type/spacing instead of breakpoint jumps, and — directly relevant to your gradient background — interpolating gradients in OKLCH instead of RGB/hex. A dark-navy-to-electric-blue gradient in raw hex often goes muddy through the middle; OKLCH keeps it perceptually clean. Small technical detail, huge visual payoff for exactly the effect you're building.
Motion as its own discipline, not a library default. Read up on the classic 12 animation principles adapted to UI (anticipation, overlap, easing) — then build Framer Motion transitions with real thought behind timing, not default springs. For your Kanban drag-and-drop specifically, the physics of the drop (a tiny overshoot-and-settle) is what makes it feel expensive.
Three.js → react-three-fiber. Since you're already dabbling and your stack is React, @react-three/fiber + drei is the idiomatic path — and there's a concrete project sitting right in your app: build the AppShell's glow background as an actual WebGL shader (subtle animated noise + gradient) instead of a CSS gradient. It's the single most "sets me apart" upgrade available to you right now, and it's not decorative — it's your signature background.
Study systems, not screenshots. Refactoring UI (book) is the highest-leverage resource for a developer building design instinct without becoming a designer. For ongoing reference: Mobbin for pattern libraries, and just reading the actual CSS of Linear, Vercel, and Raycast — all close cousins of the dark-glass aesthetic you're going for.
Accessibility as craft, not compliance. Glass/blur-heavy dark UIs are notoriously bad for contrast and focus visibility — most portfolios in this style fail WCAG without noticing. Nailing contrast and keyboard focus on a glassmorphic UI specifically is rarer, and it's a genuine differentiator, not just a checkbox.




Wowww you really got me, the vercel linear look and aesthetic design is what I want to go for and the worst part is the Background idea is epic and we can just have maybe random job related icons floating around with low opacity and diff sizes that dispers(react) to cursor effects(hover/click) and I think you hit the nail on the head with accessibility, the new css features (oklch , I had to look that one up and clamp, seen it recently feels pretty useful) and the motion effect, thanks for the advice by the way. I want to make few changes incorporating what we’ve discussed and what you suggested give the step by step way to achieve my frontend skill upgrade using this project and building on my skills. Iwant your honest output in a single prompt that I would be adding to Claude design as I decided to move forward with a pro plan. Think I’ll make payment tonight and see how fast I can get Trackd! 😁 also wanted to add these skills to my Claude skill set, taste and impeccable style skills.




Love this direction — and building the icon-dispersal idea into the same background component as the shader is the right call. Let me tie it all together.
Reconciling the pivot
Vercel/Linear isn't a teardown of what we built — it's a dial turned toward restraint. Concretely:

Fonts: swap Space Grotesk for Geist Sans (Vercel's own typeface, free) for all display/UI text, and Geist Mono for numbers. Two typefaces total, not three — Linear's whole language is "weight and size do the hierarchy work," not more fonts.
Surfaces: dial the glass back. Hairline 1px borders at ~10% opacity become the primary separator, not blur+shadow+glow stacked together. That's the actual technical difference between "iOS glass" and "Linear precise."
Motion: faster and sharper — 150–220ms with a custom easing curve, not the slower floaty timing glass UIs default to.
Background: keep the OKLCH ground-to-glow gradient — that part already IS the Vercel/Linear move (they use exactly this kind of restrained gradient-as-signature).

The floating icon background
Build it in two passes rather than jumping straight to WebGL:
v1 — ship this now: DOM-based, react-icons positioned absolutely, useMotionValue/useSpring from Framer Motion driving a repulsion field off cursor position. ~15–18 icons, low opacity, varied size. Fast to build, easy to make accessible (kill it entirely under prefers-reduced-motion), and it'll already look great.
v2 — stretch goal, once M6 below rolls around: rebuild the same effect in react-three-fiber as actual sprites/particles. Same visual outcome, but now you're building it on graphics primitives instead of DOM nodes — that's where the real Three.js skill lives.
Your skill-upgrade path, mapped to the build
MilestoneBuildSkill it teachesM0Type scale + OKLCH gradient, hand-written in plain CSS before touching Tailwind configOKLCH color math, clamp() fluid type — feel why it works before abstracting itM1AppShell + Sidebar, hand-written cubic-bezier for the collapse/expandCustom easing, hairline-border surfaces over default shadowsM2Floating icon background v1 (Framer Motion springs)Physics-based motion in React, proper prefers-reduced-motion handlingM3Kanban (dnd-kit) — pick-up scale + overshoot-settle on dropMulti-stage choreography, accessible drag-and-drop (keyboard alt + ARIA live region)M4Analytics (Recharts), one signature chart treatment reusedData-dense layout disciplineM5Contrast audit across every glass surface you've builtAccessibility as a design pass, not a checkboxM6Rebuild the background in react-three-fiberThree.js deepened on a project you already understand functionally
Keep Refactoring UI open as a constant companion, lean on Josh Comeau for the CSS/motion mechanics at M0–M2, Emil Kowalski for motion craft at M2–M3, and Rauno Freiberg's work as your interaction-polish reference throughout.






# TRACKD — Kanban Prototype (Vercel/Linear-grade precision)

GOAL: Build the primary Job Pipeline / Kanban screen for TRACKD, an AI job-application
tracker, as an interactive prototype. This screen sets the visual bar for the entire app —
build it at the highest level of polish, in the register of Vercel and Linear's product UI:
precise, restrained, confident through subtraction rather than decoration.

AUDIENCE: Individual job seekers using this daily as a command-center; the aesthetic should
read as premium developer-tool-grade, not consumer/playful.

LAYOUT:
- Fixed left sidebar, 84px collapsed / 240px expanded, toggled by a drawer icon at the TOP
  of the sidebar. Icon+label nav rows. Bottom of sidebar (pinned via flex, not floating): a
  divider, a compact account chip, then Logout as its own row.
- Main content to the right. Page header row: "Job Pipeline" title on the left, [Kanban]
  [Calendar] [Table] icon+label tabs on the right, Notion-style.
- Below the header: 5 Kanban columns — Saved, Applied, Interviewing, Offer Received,
  Rejected/Closed — each holding job cards.

BACKGROUND — the signature element:
- Base: a vertical gradient, dark at the bottom rising into a lighter glowing blue at the
  top, interpolated in OKLCH (not RGB) so the transition stays clean instead of muddy.
- Layered on top: a sparse field of ~15-18 low-opacity, varied-size job-related icons
  (briefcase, document/resume, building, bar chart, mail, calendar) floating slowly. On
  cursor proximity, nearby icons disperse away from the pointer with a soft spring/repulsion
  effect; on click, a small extra ripple of dispersion. Icons stay low-opacity (8-15%) at
  rest so they never compete with foreground content. This needs to be a genuinely
  interactive layer, not a static decorative image.

TYPOGRAPHY: Geist Sans for all UI/display text (weight carries hierarchy — do not add a
second display face), Geist Mono reserved only for numbers: match scores, KPIs, dates.

SURFACES — restrained, not maximalist glass:
- Cards use a 1px hairline border at ~10% opacity as the primary separation technique, a
  light backdrop-blur, and a soft ambient shadow — but NOT blur + shadow + glow + gradient
  border all stacked together. Restraint over decoration.
- One consistent corner-radius scale used everywhere, not ad hoc per component.

MOTION: Fast and precise — 150-220ms, custom cubic-bezier, never a default ease or a slow
floaty timing. Card hover: a small, immediate lift. Kanban drag: a confident pick-up scale
plus a settle-with-slight-overshoot on drop — this should feel expensive, not bouncy.

STATUS COLORS — fixed, do not restyle, these are real production data already in use:
  Saved            #1d4ed8
  Applied          #06b6d4
  Interviewing     #f59e0b
  Offer Received   #10b981
  Rejected/Closed  #ef4444
Each column gets a subtle top-edge accent in its status color; each card gets a 3px left
accent bar in the same color.

CARD CONTENT (per job — see attached mockData.ts for the real shape): company logo, job
title, company name, seniority + work mode as small pills, a circular match-score gauge
badge in the top-right corner (conic-gradient ring, red <40 / amber 40-69 / green 70+),
source icon + applied date in Geist Mono, and a deadline countdown chip that shifts from
neutral to amber to red as it approaches.

ACCESSIBILITY: every text/background pairing must pass WCAG AA contrast — check this
explicitly, since dark glass surfaces are the easiest place to accidentally fail it. Keyboard
focus states need to look as considered as hover states.

I've attached the full design system doc and mockData.ts — use them for anything not
specified above, and populate real-looking cards from the mock job data rather than
placeholder Lorem Ipsum. Build the Kanban board first; ask before starting Calendar or Table.