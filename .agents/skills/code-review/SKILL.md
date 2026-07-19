---
name: code-review
description: Perform a Staff Engineer-level code review covering correctness, security, performance, architecture, and best practices. Use when asked to review code, audit a PR, or assess code quality before merging. Trigger on phrases like "review this code", "check my PR", "code audit", "review this component/API/function", or when a file or diff is shared and quality feedback is needed.
---

# Code Review

Review the provided code like a Staff Engineer. Be direct, specific, and constructive.

## Review Checklist

**Security**
- SQL injection, XSS, CSRF vulnerabilities
- Exposed secrets or API keys in code
- Missing authorization checks on routes or mutations
- Unsafe use of `eval`, `dangerouslySetInnerHTML`, or `innerHTML`
- User input passed directly to queries, commands, or file paths

**Correctness & Business Logic**
- Logic errors, off-by-one bugs, incorrect conditionals
- Race conditions on async operations
- Missing edge case handling (null, empty, zero, max values)
- API contract violations (wrong status codes, missing fields)

**Error Handling**
- Unhandled promise rejections
- Missing try-catch on I/O operations
- Generic error messages that leak internals or hide root cause
- No logging on caught errors

**Performance**
- N+1 query patterns
- Missing indexes for filtered or sorted columns
- Expensive computations inside render or hot paths
- Unnecessary re-renders (React: missing memo, stable refs)
- Large imports not tree-shaken

**Architecture & Maintainability**
- Single responsibility violations (component/function doing too much)
- Tight coupling between modules that should be independent
- Prop drilling that should use context or state management
- Magic numbers and strings without named constants

**TypeScript**
- Unsafe `any` usage
- Unsafe type assertions (`as Type` without guards)
- Missing or overly permissive interfaces
- Optional chaining misuse masking actual nullability issues

**Testing**
- Untested critical paths (auth, payments, data mutations)
- Missing error-path test cases
- Flaky tests (time-dependent, order-dependent, network-dependent)

---

## Output Format

Group findings by severity. For each issue:

```
[SEVERITY] Short title
File: path/to/file.ts — Line: N
Problem: What is wrong and why
Impact: What breaks or degrades if this isn't fixed
Fix: Exact suggestion or corrected code snippet
```

### Severity Levels

| Level | Definition |
|-------|-----------|
| 🔴 **Critical** | Security vulnerability, data corruption risk, broken auth, race condition. Block merge. |
| 🟠 **High** | Performance bottleneck, duplicate logic, broken error handling, missing loading/error states. Fix before ship. |
| 🟡 **Medium** | Readability, naming, type safety, missing comments, magic numbers. Fix when touching the file. |
| 🔵 **Low** | Formatting, minor cleanup, refactoring opportunities. Nice to have. |

---

## Summary Section

End the review with:

```
## Review Summary

Verdict: ✅ Approve | 🔄 Approve with fixes | ❌ Request changes

Critical: N | High: N | Medium: N | Low: N

Must fix before merge:
- [Item 1]
- [Item 2]

Overall assessment: 2–3 sentence honest evaluation of the code quality,
what's done well, and what the biggest risk is.
```