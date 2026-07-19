---
name: trackd-design
description: Use this skill to generate well-branded interfaces and assets for Trackd, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, and shared component conventions for Trackd's "glass HUD" design system.
user-invocable: true
---

Read `docs/Trackd.md` at the repo root first — it is the authoritative design spec (visual identity, layout architecture, component specs, and status-color rules).

## Where things live in this repo

- Full design spec (canonical): `docs/Trackd.md`
- Design tokens + glass/icon-chip recipes: `client/src/styles/tokens.css` (entry point, imported once by `client/src/index.css`)
- Shared React primitives (`GlassCard`, `IconChip`, `StatusPill`, `MatchScoreGauge`, `EmptyState`, `Skeleton`, `Button`, `Input`): `client/src/components/ui/`
- App shell (gradient wrapper, collapsible sidebar, page header): `client/src/components/layout/` (`AppShell.tsx`, `Sidebar.tsx`, `PageHeader.tsx`)
- Fixed status-color map (non-negotiable, sourced from `docs/Trackd.md` — Saved `#1d4ed8`, Applied `#06b6d4`, Interviewing `#f59e0b`, Offer `#10b981`, Rejected `#ef4444`): `client/src/lib/statusTokens.ts`

## Non-negotiable rules (see docs/Trackd.md for full detail)

- The 5 status colors above are fixed and load-bearing — never restyle or reinterpret them per-file.
- Typography: Space Grotesk for headings (600/700), Inter for body/UI, JetBrains Mono *exclusively* for numbers (scores, KPIs, dates, currency, timestamps).
- Every elevated surface uses the `.glass-surface` recipe (blur, glass border, soft shadow) — nothing flat/opaque.
- Always check `client/src/components/ui/` for an existing primitive before writing new markup/styles for a card, icon button, status pill, score gauge, empty state, or loading skeleton.
- Create every `client/src/components/ui/` primitive in TypeScript/TSX (no .jsx files).
- All `.tsx` files must include proper TypeScript types and prop interfaces for accessibility and maintainability.
- Create granular sub-component when building the UI to ensure things are reusable and testable.

Note: an earlier pass in this repo briefly wired in a different, unrelated "Halo" design system pulled from a Codex.ai/design project. That wiring was reverted — `docs/Trackd.md` is the system actually in use.
