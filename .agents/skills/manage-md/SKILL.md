---
name: manage-md
description: Create, update, and maintain the AGENTS.md file for any project to keep Codex's context current, accurate, and concise across sessions. Use at the start of a new project, after any significant code change, refactor, or session, or when asked to "update AGENTS.md", "log this session", "document what changed", or "keep context fresh". Also trigger when AGENTS.md doesn't exist yet and the project would benefit from one.
---

# AGENTS.md Manager

Keep `AGENTS.md` accurate, concise, and under 200 lines at all times.

## Purpose

`AGENTS.md` is Codex's working memory for a project. It prevents repeated mistakes, carries forward conventions, and eliminates re-explaining context every session.

## When to Update

- After completing a feature or refactor
- After discovering a gotcha or non-obvious pattern
- After changing architecture, tooling, or conventions
- At the end of any significant session

## What to Record

Only record information that would otherwise need to be re-explained next session. Skip anything obvious from reading the code.

**High-value entries:**
- Why a non-obvious architectural decision was made
- A pattern the project uses consistently (e.g., "all API calls go through `lib/api.ts`, never fetch directly")
- A gotcha that caused a bug or wasted time
- A convention that differs from common defaults
- A summary of what changed this session

**Skip:**
- Things obvious from the code
- One-off notes that won't matter next session
- Verbose explanations that belong in a README

---

## AGENTS.md Structure

```markdown
# AGENTS.md — [Project Name]

## Overview
One paragraph: what this project is, the stack, and the main entry points.

## Architecture
Key structural decisions and why they were made.
Reference other docs: see `ARCHITECTURE.md`, `README.md`.

## Patterns
Recurring patterns Codex should follow without being asked.
- [Pattern]: [One-line description]

## Conventions
Project-specific rules that differ from common defaults.
- [Convention]: [What it is and why]

## Gotchas
Non-obvious issues that have caused bugs or confusion.
- [Gotcha]: [What happens and how to avoid it]

## Updates
Reverse-chronological log of significant session changes.
- [Date]: [What changed in 1–2 lines]

## References
- README.md — Setup and deployment
- ARCHITECTURE.md — System design
- [other relevant docs]
```

---

## Update Workflow

1. **Review** what changed or was discussed this session
2. **Add** new patterns, gotchas, or conventions discovered
3. **Log** the session summary under `Updates` (1–2 lines, dated)
4. **Trim** if the file exceeds 200 lines:
   - Summarize older `Updates` entries into one line: `"[Date range]: [Summary]"`
   - Move verbose architecture notes to `ARCHITECTURE.md` and add a reference
5. **Never duplicate** content already in referenced docs

## Hard Constraints

- **Max 200 lines.** Trim before adding if near the limit.
- **No duplicate content.** If it's in `README.md`, reference it, don't repeat it.
- **No verbose explanations.** If it needs more than 3 lines, it belongs in a referenced doc.
- **No stale entries.** Remove notes that no longer apply.