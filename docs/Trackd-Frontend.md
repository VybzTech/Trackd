# TRACKD — Frontend Doc

**Version:** 2.0 (Curated) | **Date:** July 2026
**Stack:** Vite + React + TypeScript + Tailwind. No Next.js, anywhere, in any recommendation — see `09-Excluded-and-Superseded.md`.
**Visual design tokens, glass/liquid-icon recipes, and motion specs live in `06-Trackd-Design-System-Prompt.md` — this doc covers structure and behavior, not styling detail, so the two don't drift out of sync.**

---

## 1. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 | |
| Build tool | Vite 5 | Fast HMR, no CRA baggage |
| Language | TypeScript | Type safety across API contracts and props |
| Styling | Tailwind CSS | Utility-first; design tokens as CSS variables per the Design System doc |
| Animation | Framer Motion | Sidebar collapse, drag-drop physics, side panel slide-in |
| Server state | TanStack Query | Wraps all Supabase reads/writes; caching, optimistic updates |
| Client state | Zustand | UI-only state (view mode, active filters) — never server data |
| Routing | React Router 6 | Layout-level route protection, account-type-aware nav |
| Forms | React Hook Form + Zod | Form state + runtime validation |
| Charts | Recharts | Analytics module |
| Calendar | FullCalendar | Dashboard calendar view |
| Drag & drop | dnd-kit | Kanban — keyboard-accessible by default |
| Tables | TanStack Table | Dashboard table view, Applications grid |
| Backend client | `@supabase/supabase-js` | Direct client reads/writes, gated by RLS |
| Icons | Lucide React | Consistent, tree-shakeable |
| Toasts | Sonner | Micro-feedback on every mutation |

---

## 2. Project Structure

```
src/
├── app/
│   ├── router.tsx           routes for both account types
│   ├── providers.tsx        QueryClientProvider, AuthProvider, ThemeProvider
│   └── main.tsx
│
├── layout/
│   ├── AppShell/             gradient bg wrapper, sidebar | main grid
│   ├── Sidebar/               nav set switches on profile.account_type
│   └── PageHeader/
│
├── shared/
│   ├── ui/                   GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton
│   ├── hooks/                 useJobs, useProfile, useAnalytics, useApplications, useCompany
│   └── lib/                   supabaseClient.ts, statusMachine.ts, formatters.ts
│
├── modules/                   see 03-Trackd-Architecture-and-Features.md §2 for the full module list
│   ├── ingestion/ … recruiter-hub/
│
└── styles/
    ├── tokens.css             CSS variables from the Design System doc
    └── index.css              Tailwind imports + tokens
```

---

## 3. Route Architecture

| Route | Page | Account type | Notes |
|---|---|---|---|
| `/` | Landing | Public | No app shell — own full-bleed layout |
| `/auth/login`, `/auth/signup` | Auth | Public | Account type chosen at signup (candidate / recruiter) |
| `/onboarding` | Onboarding | Candidate | Resume upload → extraction → confirm |
| `/onboarding-recruiter` | Company setup | Recruiter | Create/join a company |
| `/ingest` | Ingestion | Candidate | — |
| `/dashboard` | Dashboard | Candidate | Kanban / Calendar / Table, view persisted locally |
| `/analytics` | Analytics | Candidate | — |
| `/profile` | Profile | Candidate | — |
| `/jobs/:id` | Pro Page | Candidate | ProGate wraps it; Free users see an upgrade modal, never a broken page |
| `/companies` | Companies | Recruiter | Role list per company |
| `/companies/:id/applications` | Applications grid | Recruiter | — |
| `/candidates/:id` | Recruiter Hub — Storyline | Recruiter | — |
| `/pricing` | Pricing | Public | Free / Pro / Recruiter comparison |

Route protection checks Supabase session for auth, and `profile.account_type` for which nav/route set renders — a single logged-in user with both a candidate profile and recruiter membership can switch context rather than needing two accounts (v1: switching is a simple toggle in the account menu, not a full re-auth).

---

## 4. State Management

Server state (anything from Supabase) lives exclusively in TanStack Query. Client UI state (active view, open modals, filter selections) lives in Zustand. These are never mixed — a Zustand store never triggers a network call, and TanStack Query cache is never duplicated into Zustand.

### Key hooks
- `useJobs()` — candidate applications; powers Kanban/Calendar/Table from one source
- `useUpdateJobStatus()` — optimistic status mutation; also used by the Recruiter Hub's Simulated Integration buttons, since it's the same underlying transition
- `useApplications(roleId)` — recruiter's Applications grid
- `useProfile()`, `useAnalytics()`, `useCompany()` — straightforward reads

### `statusMachine.ts`
Single source of truth for allowed transitions (see Architecture doc §5). Imported by the Kanban drop handler, the Table's inline status dropdown, and the Recruiter Hub's action buttons — never duplicated.

---

## 5. Performance & Accessibility Targets

| Metric | Target |
|---|---|
| Largest Contentful Paint | < 2.5s |
| Dashboard load (50 jobs) | < 3s (P95) |
| Applications grid load (200 applicants) | < 3s (P95) |
| Kanban drag-to-update (optimistic) | < 50ms perceived |
| Resume canvas re-render on edit | < 200ms |
| Colour contrast | WCAG 2.1 AA minimum — glass/blur surfaces get an explicit contrast check, not an assumption |
| Keyboard navigation | Every interactive element reachable and operable; dnd-kit's built-in keyboard drag support is used, not skipped |
| Motion | `prefers-reduced-motion` disables drift/parallax/lift effects; state changes remain instant |

---

## 6. Browser Support

Chrome 100+, Firefox 110+, Edge 100+, Safari 16+, plus mobile Chrome/Safari for responsive web (no native app in v1). No IE support, no polyfills for it.

---

*TRACKD Frontend Doc | v2.0 Curated | July 2026 | CONFIDENTIAL*
