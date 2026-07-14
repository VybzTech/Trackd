---
name: tech-debt
description: Scan a project's codebase for technical debt, deprecated patterns, and long-term maintenance risks. Use when asked to audit code quality, identify refactoring opportunities, or assess long-term health of a codebase. Trigger on phrases like "scan for tech debt", "audit the codebase", "what needs refactoring", "code health check", or when reviewing a project before a major release or new feature sprint.
---

# Technical Debt Audit

Scan the codebase and produce a prioritized debt report across six categories.

## Scan Categories

**Architecture**
- Circular dependencies, oversized components, duplicated business logic
- Mixed responsibilities (components doing too much)
- Dead code, unused imports, orphaned files

**React / Frontend**
- Giant `useEffect` blocks handling multiple concerns
- Duplicated or derived state that should be computed
- Unnecessary context updates triggering excess renders
- Missing or incorrect dependency arrays

**Backend**
- Duplicated queries or business logic inside controllers
- Missing database transactions around multi-step writes
- Missing or inconsistent input validation
- Unhandled async errors

**Configuration**
- Hardcoded values that belong in environment variables
- Duplicated constants across files
- Stale feature flags or dead config branches

**Performance**
- Repeated API calls for the same data (missing cache/memo)
- N+1 query patterns
- Large bundle imports (import entire library vs. tree-shaken)
- Unnecessary re-renders on unchanged props

**Maintainability**
- `TODO`, `FIXME`, `HACK`, `XXX` comments
- Deprecated API usage
- Inconsistent naming conventions
- Missing or outdated documentation

---

## Output Format

Group findings by severity. For each item:

```
[SEVERITY] Short title
File: path/to/file.ts — Line: N
Issue: One-line description of the problem
Risk: Why this matters long-term
Fix: Concrete refactoring suggestion
Effort: Small | Medium | Large
```

## Output Formatting Rubric (Priority)
Create a structured Markdown report of the technical debt found. Group items strictly by their Severity Level.

### 🔴 Critical (Fix Immediately: Risk of breakage, security flaws, or data loss)
### 🟠 High (Fix Soon: Severe performance hits, heavy duplication, tight coupling)
### 🟡 Medium (Clean up when touching nearby code: Degrades maintainability over time)
### 🔵 Low (Nice-to-have: Minor formatting, cleanups, linting tweaks)

For EVERY single item discovered, you MUST use the following format:
- **Location:** `[File Path]` (Approx. Line `[Num]` or closest Function/Component Name if exact line is ambiguous)
- **Problem:** [One-line description + short code snippet if relevant]
- **Impact:** [Why this matters for long-term maintenance]
- **Effort Estimate:** [Small (under 1hr) | Medium (1-4hrs) | Large (4hrs+)]
- **Recommended Fix:** 
  ```[language]
  // Provide the precise refactored code or architectural fix here

### Severity Levels

| Level | Definition |
|-------|-----------|
| **Critical** | Can break the app, cause data loss, or create security exposure. Fix immediately. |
| **High** | Performance issues, tight coupling, or duplicated logic that compounds over time. Fix soon. |
| **Medium** | Won't break things now but will cause pain during future changes. Fix when touching nearby code. |
| **Low** | Minor cleanup, naming, or formatting. Fix opportunistically. |

---

## Summary Section

End the report with:

```
## Summary

Total issues: N
Critical: N | High: N | Medium: N | Low: N

Top 3 priorities:
1. [Item] — [Why it's the most urgent]
2. [Item]
3. [Item]

Estimated total refactor effort: Small | Medium | Large
```