# TRACKD — Master Build Prompt (Claude Design)

**Version:** 2.0 (Curated) | **Date:** July 2026
**Use:** Once `06-Trackd-Design-System-Prompt.md` has been run and approved, paste the fenced block below to start the actual screen-by-screen build. Attach `mockData.ts` and the approved design-system output alongside it.
**Build one module at a time** — the prompt says this explicitly because it's the single biggest lever against getting an overwhelming, unreviewable wall of screens back in one pass.

---

```markdown
# TRACKD — Frontend Build Instructions

You are building the UI for TRACKD, a two-sided job-tracking platform, on a React + Vite +
TypeScript + Tailwind scaffold. Candidate-side data comes from mockData.ts (attached) — do
not alter that shape. Recruiter-side data doesn't have a finalized mock yet; derive it from
the same shape (a `roles` + `applications` relationship, per the Architecture doc) and flag
any field you had to invent so it can be reconciled with the real schema later.

Use the approved design system from the prior session as the single source of truth for
color, type, motion, and the liquid-glass icon chip recipe — don't re-derive it from
scratch here.

## Non-negotiables carried from the design system
- Status colors are fixed (see mockData.ts) — never restyle
- Geist Sans for display/UI (Inter fallback), Geist Mono strictly for numbers
- Icon chips get the liquid-glass treatment; ordinary cards stay flat/hairline-bordered
- Floating background icon field persists across sidebar collapse state, respects
  prefers-reduced-motion
- statusMachine.ts is the single source of truth for allowed status transitions — imported
  by the Kanban drag handler, the Table's status dropdown, AND the Recruiter Hub's
  Simulated Integration action buttons. Never reimplement the transition rules a second time.

## Layout — shared shell, account-type-aware nav
- Sidebar fixed left, 84px collapsed / 240px expanded, drawer toggle at the top of the
  sidebar itself. Nav set switches on account type:
  - Candidate: Pipeline, Inbox, Explore, Analytics, Profile
  - Recruiter: Companies, Applications, Recruiter Hub, Analytics, Profile
- Bottom of sidebar (flex, not absolute): divider → account chip (avatar, name, tier/role
  badge) → Logout as its own row
- Main content: every page opens with a header row — title left, view-switch tabs or
  filters right (Notion-style), same pattern on both sides
- Below md breakpoint: sidebar collapses to a bottom tab bar, icon-only, max 5 items

## Screen inventory — build in this order, stop after each and show the result

### Phase 0 — Foundations (no feature logic)
AppShell, Sidebar (both nav variants), design tokens, Supabase client wiring against a mock/
seed dataset for both `applications` and `roles`/`companies`.

### Phase 1 — Shared primitives
GlassCard, IconChip (liquid-glass recipe), StatusPill, MatchScoreGauge (sm/md/lg), EmptyState,
Skeleton, FloatingIconField (the background layer).

### Phase 2 — Candidate: Kanban
Highest-value, most visible screen on the candidate side. 5 columns, drag-drop via
statusMachine.ts, the stacked-pill overflow treatment from the design system doc, per-card
match score badge (Pro only — locked with a glyph for Free).

### Phase 3 — Candidate: Table + Calendar
Same useJobs() data source as Kanban — proves "three views, one data source."

### Phase 4 — Recruiter: Applications grid
The direct structural cousin of the candidate Table — reuse TanStack Table patterns, but
scoped to applicants-per-role instead of jobs-per-candidate. This is the fastest recruiter
screen to build well because so much can be shared with Phase 3's work.

### Phase 5 — Recruiter: Companies + Recruiter Hub
Company/role creation reuses the ingestion side-panel pattern from Phase 6 below (role
posting = the same "parse, review, commit" flow as candidate job ingestion). Recruiter Hub
adds the Candidate Storyline and the Simulated Integration action buttons, wired to the same
statusMachine.ts as the candidate Kanban.

### Phase 6 — Candidate: Ingestion + side panel
Smart Paste UI, confidence-scored field panel. Mock the parsed-field shape if the real
extraction endpoint isn't ready yet.

### Phase 7 — Candidate: Analytics
4 KPI cards + 5 charts against seed data. Don't wait until this is the last thing built —
it can be done any time after Phase 1 since it only needs static data to look real.

### Phase 8 — Candidate: Pro Page
Heaviest module — build last among candidate screens since it leans on the signature
MatchScoreGauge and the most editing-dense UI in the app. Split-pane Resume Canvas + AI
Insights + Cover Letter generator.

### Phase 9 — Profile/onboarding (both account types) + ProGate
Two onboarding flows (candidate resume wizard, recruiter company setup) sharing the same
step-wizard shell. ProGate is one shared component, not per-module upsell copy.

### Phase 10 — Landing page
No app shell — own full-bleed layout, pulling the same fonts/colors/GlassCard primitives.
Hero leads with a live mini-demo of Smart Paste actually populating fields, not a static
screenshot. Structure: hero → problem section (3-4 beats, user-facing copy not lifted PRD
prose) → product walkthrough (one section per pillar, using real in-app screenshots once
they exist) → Free/Pro/Recruiter pricing table → single CTA throughout ("Start tracking
free"). Two-sided framing belongs here too — the hero or a section immediately after it
should make clear this is a platform for both sides, not just a candidate tool with a hidden
recruiter mode.

### Phase 11 — Polish pass
Empty states, loading skeletons, error boundaries, prefers-reduced-motion audit, WCAG 2.1 AA
contrast and keyboard-focus check across every glass and gradient surface built.

## Operational rules
- Mock all async operations with a brief (under 1.5s) loading state and micro-copy updates —
  never a silent freeze
- Trigger toast micro-feedback (Sonner) on every mutation: status change, card archive,
  Simulated Integration action, commit
- Populate every screen with realistic-looking data from mockData.ts (candidate side) or a
  clearly-flagged derived mock (recruiter side) — never Lorem Ipsum
- Ask before starting the next phase; don't build multiple phases silently in one pass
```

---

*TRACKD Master Build Prompt | v2.0 Curated | July 2026 | CONFIDENTIAL*
