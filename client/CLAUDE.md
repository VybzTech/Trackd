# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope

This file covers `client/` only. See the repo-root `CLAUDE.md` for the overall Trackd architecture (`server/`, `extension/`, data flow between them). **The root CLAUDE.md's description of `client/` is stale** — it documents a Zustand-driven dashboard app (`appStore.ts`, `Dashboard`/`IngestionModule`/`ProPage` views, Kanban/Table/Calendar, a `dark`/`accent` Tailwind config) that has since been deleted from this directory. As of now, `client/src` contains only the marketing landing page described below; the dashboard app has not been rebuilt here yet. Check actual files before assuming anything from the root doc or from `docs/TRACKD.md` currently exists in this directory.

## Commands

```
npm run dev       # start Vite dev server on http://localhost:3000
npm run build     # production build (tsc -b && vite build is NOT wired up — see below)
npm run preview   # preview production build
```

No lint or test scripts are configured. `npm run build` runs `vite build` only — TypeScript errors are not checked as part of the build; use your editor's TS server or run `tsc --noEmit` manually to type-check.

## Architecture

- **No router, no global state store.** `src/App.tsx` renders `<Landing />` unconditionally — that's the entire app. There is no Zustand store, no view-switching logic, and no `pages/Dashboard.tsx` in this checkout.
- **`src/pages/Landing.tsx`** is the single page, composed from section components in `src/components/landing/` (`Navbar`, `Hero`, `HowItWorks`, `ForCandidates`, `ForRecruiters`, `Pricing`, `FAQ`, `Contact`, `FinalCTA`, `Footer`, `RoleModal`). It owns all page-level state (scroll position, active nav section via `IntersectionObserver`, role-selection modal, pricing toggle, FAQ accordion, demo match-score slider) and passes it down as props — no context providers.
- **`src/lib/landingData.ts`** holds static content/config for the landing page (nav items, kanban/applicant demo data, pricing tiers, FAQ copy, etc.) plus shared types like `Theme` and `Role`.
- **`src/hooks/useTheme.ts`** manages dark/light theme, persisted to `localStorage` under `trackd-theme` and applied via `data-theme` attribute on `<html>`, defaulting to `dark`.
- **Styling: Tailwind CSS v4, CSS-first config — no `tailwind.config.js`.** Theme customization (`@theme`) and all design tokens live directly in `src/index.css` as CSS custom properties (`--bg`, `--surface`, `--brand`, `--glow-mid/top`, `--text`, `--border`, `--glass-bg`, etc.), with a `:root[data-theme='light']` override block for light mode. Components read tokens via `var(--token)` in inline styles or Tailwind arbitrary values, not Tailwind theme colors — there is no `dark`/`accent` Tailwind palette in this codebase currently. `postcss.config.js` uses `@tailwindcss/postcss` + `autoprefixer`.
- **The 5 job-status colors are a fixed data contract** (per root CLAUDE.md) even though the dashboard views that display them aren't currently in this directory: Saved `#1d4ed8`, Applied `#06b6d4`, Interviewing `#f59e0b`, Offer Received `#10b981`, Rejected/Closed `#ef4444`. Preserve these exact values if/when Kanban/Table/Calendar views are reintroduced.
- Fonts are declared via CSS variables (`--font-sans`, `--font-mono`) in `@theme`, currently set to Geist/Geist Mono — this differs from the root doc's Inter/Space Grotesk spec in `docs/TRACKD.md`.
