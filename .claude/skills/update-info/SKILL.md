---
name: update-info
description: Keep the /info directory (architectural "project memory" docs — PROJECT_OVERVIEW, ARCHITECTURE, DOMAIN_MODEL, BUSINESS_RULES, FILE_LIFECYCLE, REPORT_LIFECYCLE, USER_ROLES_AND_PERMISSIONS, MOVEMENT_ENGINE, FILE_HISTORY_SYSTEM, REPORT_HISTORY_SYSTEM, LIABILITY_SYSTEM, DOCUMENT_MANAGEMENT, UI_PATTERNS, API_STRUCTURE, TECHNICAL_DECISIONS, KNOWN_PROBLEMS_AND_FIXES, DESIGN_PRINCIPLES, FUTURE_ROADMAP) accurate against the actual current codebase, not just appended-to. Use after any significant code change, bug fix, or feature (the same checkpoints as manage-md — the two run together), when asked to "update the info docs", "sync /info", "fix the docs", or when a doc's described behavior turns out to contradict what the code actually does. These docs were originally seeded by ChatGPT from a description of the intended system, not the real implementation, so treat every existing claim in them as unverified until checked against code.
---

# /info Directory Manager

Keep every file in `info/` a **true, current description of the running system** — not aspirational, not generic, not left over from the original ChatGPT-authored seed.

## Why this skill exists

`info/*.md` was originally generated from a description of the *intended* system, before most of the real implementation existed. As real features shipped, the docs were not kept in lockstep — several (`MOVEMENT_ENGINE.md` is a known offender) describe idealized tables and workflows (`file_moves`, `file_department_history`, generic "Notifications" sections) that don't match the actual schema (`Moves` JSON column with `moveRequest`/`internalMove`, `file_actions`/`report_actions` tables, `MoveHistory` field). Treat any doc content as a **claim to verify against the current code**, not a fact to trust and extend.

## When to run

- Immediately after implementing a fix or feature this session, in the same pass as (or right after) `manage-md` — same checkpoints: after a significant code change, after a bug is found and fixed, at the end of a working round.
- When a user correction reveals that a doc's described behavior no longer matches reality (see the project's `feedback_manage_md_on_correction` memory — corrections should be logged immediately, not deferred).
- When asked directly to sync/update/fix the `/info` docs.

## Division of labor vs. `manage-md`

- `manage-md` owns `CLAUDE.md` — Claude's own working-memory file (patterns, gotchas, conventions, a *dated changelog* of sessions). Terse, session-oriented, capped at 200 lines.
- `update-info` owns `info/*.md` — the project's own architectural documentation for *human and future-Claude* readers, organized by domain (lifecycle, permissions, movement engine, etc.), not by session. No line cap per file, but no padding either — every sentence should be true and load-bearing.
- Don't duplicate: if something is purely a "Claude, remember this gotcha" note, it belongs in `CLAUDE.md`. If it's "this is how the file/report lifecycle actually works," it belongs in the relevant `info/` doc.
- `info/KNOWN_PROBLEMS_AND_FIXES.md` is the exception that already behaves like a changelog (dated `Problem N` entries) — keep that pattern, don't try to convert it to pure architecture description.

## Workflow

1. **Identify which docs are touched by this session's change.** Use `info/README.md`'s index to map the change's domain to a doc (e.g. a tile-scoping fix → `REPORT_LIFECYCLE.md`/`FILE_LIFECYCLE.md`; a permission-gating fix → `USER_ROLES_AND_PERMISSIONS.md`; an endpoint/param change → `API_STRUCTURE.md`).
2. **Read the actual current code for that domain before touching the doc** — don't infer from the doc's existing text or from memory of what you *think* the code does. For this repo that means reading the relevant `server/apis/*.py` and/or `client/src/**` files fresh, not trusting a prior session's summary.
3. **Compare, then correct — don't just append.** If a doc's existing description contradicts the code (e.g. references a table/column that doesn't exist, describes a workflow step that isn't implemented, states a scoping rule that was since changed), **rewrite that section** to match reality. Only append new sections for genuinely new, previously-undocumented behavior.
4. **Prefer concrete over generic.** Replace vague ChatGPT-toned prose ("Notifications improve operational awareness") with what's actually true and specific (which statuses/roles trigger which real behavior, real field/table names, real file paths). If something described doesn't exist in the codebase at all (aspirational content with no implementation), either delete it or clearly mark it as unimplemented/future — don't leave it stated as current fact.
5. **Update `info/README.md`'s index** if a doc's scope changes enough that its one-line summary is no longer accurate.
6. **Cross-check `KNOWN_PROBLEMS_AND_FIXES.md`** for entries that describe a bug in behavior now-corrected elsewhere in `/info` — make sure the "fixed" state matches what the architecture docs describe as current.

## What NOT to do

- Don't rewrite a whole doc top-to-bottom "for thoroughness" when only one section is affected by the current change — scope the edit to what's actually verified this pass, note in the response if other sections still look unverified/suspect for a future pass.
- Don't invent implementation detail that isn't actually in the code just to fill out a doc's structure.
- Don't duplicate content that's already accurately captured in `CLAUDE.md` — link/reference instead (`CLAUDE.md` already does this in the other direction, e.g. "See `info/KNOWN_PROBLEMS_AND_FIXES.md` Problem 3").
