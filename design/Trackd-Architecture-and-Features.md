# TRACKD — Design Architecture & Feature List (Per Module)

**Version:** 2.0 (Curated) | **Date:** July 2026
**Purpose:** The map between the PRD's *what* and the Frontend/Backend docs' *how*. One module = one folder, one owner, one clear feature list.

---

## 1. System Architecture

```
                    ┌───────────────────────────┐
                    │   React + Vite Frontend    │
                    │  (Candidate + Recruiter UI)│
                    └─────────────┬─────────────┘
                                  │ HTTPS
                                  ▼
                    ┌───────────────────────────┐
                    │  Thin AI/PDF Edge Layer    │   Supabase Edge Functions
                    │  (ingestion parse, match,  │   (Deno/TS) — see Backend doc
                    │   resume/cover-letter,     │   for why this layer exists
                    │   PDF render)              │   alongside direct-to-DB writes
                    └──────┬───────────┬─────────┘
                           │           │
                 ┌─────────▼───┐   ┌───▼─────────────┐
                 │ Claude API  │   │ Gemini Flash     │
                 │ (primary)   │   │ (automatic       │
                 │             │   │  fallback)       │
                 └─────────────┘   └──────────────────┘

                    ┌───────────────────────────┐
                    │  Supabase                  │
                    │  • Postgres (RLS-scoped)   │
                    │  • Auth (GoTrue)           │
                    │  • Storage (resumes, PDFs) │
                    │  • Realtime (optional, for │
                    │    live Kanban sync)       │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │  Sift (Python scraper,     │
                    │  already built) — feeds    │
                    │  the Explore module        │
                    └───────────────────────────┘
```

Most reads and simple writes (status changes, notes, tags) go **directly from the React client to Supabase**, gated by Row Level Security — this is the whole point of choosing Supabase over a hand-rolled backend. The thin edge-function layer exists only for the things RLS-scoped client writes can't safely do: calling Claude/Gemini with a secret API key, and rendering PDFs server-side for consistent output. Keep that layer as small as possible; don't grow it into a second backend by habit.

---

## 2. Module Map

```
src/
├── modules/
│   ├── ingestion/         (candidate) Smart Paste, URL input, side panel
│   ├── inbox/             (candidate) pending records awaiting commit
│   ├── explore/           (candidate) Sift scraper feed
│   ├── dashboard/
│   │   ├── kanban/        (candidate)
│   │   ├── calendar/      (candidate)
│   │   └── table/         (candidate)
│   ├── analytics/         (candidate)
│   ├── profile/           (candidate)
│   ├── pro-insights/      (candidate) match score, ATS risk, bullet suggestions
│   ├── resume-canvas/     (candidate)
│   ├── cover-letter/      (candidate)
│   ├── companies/         (recruiter) workspace + role posting
│   ├── applications/      (recruiter) applicant tracking grid
│   └── recruiter-hub/     (recruiter) Storyline + Simulated Integration
│
├── shared/
│   ├── ui/                GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton
│   ├── hooks/              useJobs, useProfile, useAnalytics, useApplications, useCompany
│   └── lib/                supabaseClient.js, statusMachine.js, formatters.js
│
├── layout/                 AppShell, Sidebar, PageHeader (shared across both sides —
│                            the sidebar simply shows a different nav set per account type)
└── app/
    └── routes/              one file per screen, thin — composes module components
```

Both sides share `shared/ui` and the AppShell/Sidebar — this is why building them together is feasible in one release rather than doubling the work. A recruiter account and a candidate account are both just "a signed-in user" at the routing layer; the nav set and available modules differ by `account_type`, not by a separate app.

---

## 3. Feature List Per Module

| Module | Side | Core features | Depends on |
|---|---|---|---|
| Ingestion | Candidate | Smart Paste console, URL input, Claude/Gemini extraction, confidence-scored side panel, Commit gate | Claude API, statusMachine |
| Inbox | Candidate | Pending-record list, approve/edit/discard | Ingestion, Explore |
| Explore | Candidate | Scraped listing cards from Sift, "Add to Pipeline" | Sift (external, already built) |
| Dashboard — Kanban | Candidate | 5-column drag-drop board, per-card match badge | statusMachine, useJobs |
| Dashboard — Calendar | Candidate | Applied-date + deadline markers, month/week/day | useJobs |
| Dashboard — Table | Candidate | Sort, multi-select filter, inline status edit, bulk actions | useJobs, statusMachine |
| Analytics | Candidate | 4 KPI cards, 5 charts, date-range filter | useAnalytics |
| Profile | Candidate | Onboarding wizard, resume re-upload, completeness score | Claude API (resume extraction) |
| Pro Insights | Candidate | Match score gauge, ATS keyword risk, bullet suggestions | Claude API (match/resume) |
| Resume Canvas | Candidate | Split-pane live preview + tabbed editor, PDF download | Edge function (PDF render) |
| Cover Letter | Candidate | 3-tone generator, editable output, PDF download | Claude API, Edge function |
| Companies | Recruiter | Workspace creation, role posting (reuses ingestion schema) | Claude API |
| Applications | Recruiter | Applicant grid, filter/search, per-role view | useApplications |
| Recruiter Hub | Recruiter | Candidate Storyline, fit scorecard, Simulated Integration actions | Claude API (match), transactional email |

---

## 4. Data Model Overview (Supabase / Postgres)

Core tables — full column-level detail lives in `04-Trackd-Backend.md`. This is the relationship map:

```
users (Supabase Auth)
  └─ profiles (1:1)              — candidate resume/profile data
  └─ companies_members (M:N)     — links a user to one or more companies as a recruiter

companies
  └─ roles (1:N)                 — a posted job, owned by a company

applications                      — THE shared spine: one row per (candidate × job)
  ├─ candidate_id → users
  ├─ role_id → roles (nullable — a candidate-ingested job may not map to a TRACKD-posted role)
  ├─ status, status_history (jsonb)
  ├─ ai_insights (jsonb)          — match score, missing skills, ATS risk
  └─ source                       — smart_paste | url | sift_explore | recruiter_posting
```

`applications` is deliberately the single shared table both sides read/write, scoped by RLS: a candidate sees only their own rows; a recruiter sees only rows where `role_id` belongs to a company they're a member of. This is what makes "one data spine, two UIs" real rather than aspirational.

---

## 5. Status Lifecycle (candidate-facing, unchanged from original PRD)

```
Saved → Applied → Interviewing → Offer Received (terminal)
                              → Rejected/Closed (terminal)
Applied → Rejected/Closed (terminal)
Saved → Rejected/Closed (terminal)
```

Recruiter Simulated Integration actions (Shortlist, Move to Interview, Reject) map onto this same status machine from the other side — a recruiter's "Move to Interview" click is the same state transition as the candidate dragging their own card, just triggered by the other party. One `statusMachine.js`, imported by both the Kanban drag handler and the Recruiter Hub action buttons — never duplicated.

---

*TRACKD Architecture & Feature List | v2.0 Curated | July 2026 | CONFIDENTIAL*
