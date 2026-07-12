# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

Trackd is an AI-driven job-application tracker split into three independently-run projects with no shared build/package tooling:

- `client/` — the web frontend (React 19 + Vite + TypeScript + Tailwind CSS v4 + Zustand)
- `server/` — a Go HTTP API that the browser extension posts scraped job data to
- `extension/` — a Manifest V3 Chrome extension that scrapes job postings from the active tab and forwards them to `server/`
- `docs/` — product/design reference docs (PRD, design system spec `docs/TRACKD.md`, mock data)

Each of `client/`, `server/`, and `extension/` has its own `rulebook.md` with project-specific conventions — read the relevant one before making changes in that directory.

**Note:** `client/` was recently migrated from a Next.js App Router scaffold to a Vite + React SPA (the old `app/`, `components/`, `hooks/`, `types/` directories at the repo's `client/` root were deleted). Current source lives under `client/src/`. Don't resurrect patterns from the old Next.js layout.

## Commands

### client/ (React + Vite)
```
cd client
npm run dev       # start Vite dev server on http://localhost:3000
npm run build     # production build
npm run preview   # preview production build
```
No lint or test scripts are configured yet.

### server/ (Go)
```
cd server
go run main.go    # starts API on http://localhost:8080
go build ./...    # compile check
go vet ./...      # static analysis
```

### extension/ (Chrome Manifest V3)
No build step — load `extension/` directly as an unpacked extension via `chrome://extensions`. After editing `content.js`, `popup.js`, or `manifest.json`, reload the extension in Chrome.
**Debugging tip:** the extension popup closes (and clears its console) when you click outside it. Right-click the popup and choose "Inspect" to keep DevTools open and see `window.logger` output live.

## Architecture

### Data flow: extension → server → client
The extension's `content.js` scrapes the active tab's job posting DOM, `popup.js` POSTs the payload to the Go server at `http://localhost:8080/api/v1/jobs/scrape`, and the server currently appends the raw payload to `server/data.txt` as a holding area (no database yet — ingestion is not yet wired into the client's job list).

### server/ (Go, stdlib only)
- `main.go` — single-file `net/http` mux; all routes are prefixed `/api/v1/` (per `server/rulebook.md`)
- `logger/logger.go` — custom colored logger (`logger.Info/Success/Warn/Error`); use this instead of `fmt.Print` in route handlers
- CORS is wide open (`Access-Control-Allow-Origin: *`) to allow the unpacked extension's origin during development

### client/ (React SPA)
- `src/App.tsx` — root component; view switching is driven entirely by `currentView` in the Zustand store (`landing`, `auth`, `onboarding`, `ingestion`, `dashboard`, `pro`) rather than a router
- `src/store/appStore.ts` — single Zustand store (`useAppStore`) holding `currentView`, `user`, `opportunities` (job list, CRUD actions), `dashboardView` (kanban/table/calendar), and `selectedOpportunity`. This is the canonical shape for a job record (`JobOpportunity`) — status is one of `saved | applied | interviewing | offer | rejected`
- `src/pages/` — top-level views (`Landing`, `Dashboard`, `IngestionModule`, `ProPage`), each composing components from `src/components/`
- `src/lib/mockData.ts` — mock job/resume data generator for local development
- Tailwind config (`tailwind.config.js`) defines a `dark` shade scale and `accent` colors (blue/teal/amber/rose); `fontFamily.sans` is Inter

### Design system direction (docs/TRACKD.md)
`docs/TRACKD.md` specifies a target dark "glass" design system (deep-blue gradient background, `glass-surface` blurred panels, a signature conic-gradient `MatchScoreGauge` motif, Space Grotesk/Inter/JetBrains Mono type system) and a module-per-feature source layout (`src/modules/<name>/components + index.css`). The current `client/src` implementation predates/diverges from this spec (simpler `dark`/`accent` Tailwind palette, flat `pages/`+`components/` layout, no module-scoped CSS). Treat `docs/TRACKD.md` as the target direction to move toward, not the current state — check actual files before assuming a component, token, or folder from that doc already exists.

One fixed, non-negotiable data contract from the design doc: the 5 job-status colors are sourced from mock data and must stay identical across every view (Kanban/Table/Calendar/Analytics) — Saved `#1d4ed8`, Applied `#06b6d4`, Interviewing `#f59e0b`, Offer Received `#10b981`, Rejected/Closed `#ef4444`.
