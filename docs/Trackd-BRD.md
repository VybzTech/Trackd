# TRACKD — Business Requirements Document (BRD)

**Version:** 2.0 (Curated) | **Date:** July 2026 | **Status:** Draft for stakeholder review
**Supersedes:** All prior BRD drafts in this project. See `09-Excluded-and-Superseded.md` for what changed and why.

---

## 1. Executive Summary

TRACKD is a two-sided job-market platform. On one side, candidates capture, track, and optimize job applications through an AI-assisted pipeline. On the other, recruiters get a noise-free, pre-vetted view of candidates without needing to rip out their existing ATS. Both sides ship together in v1 — this is not a phased candidate-only launch. The two sides share one data spine: a job/application record, structured on ingestion, that both a candidate and a recruiter can act on.

The candidate side is the acquisition engine — free, immediately useful, easy to fall in love with. The recruiter side is the monetization and defensibility engine — it's what turns a personal tracker into a platform with network effects. Building both from day one means the data model, the AI insight layer, and the "Simulated Integration" mechanic (below) are load-bearing from the first release, not bolted on later.

### Business Value

Candidates lose hours to re-entering the same data across a search cycle and get no feedback loop on why they're not hearing back. Recruiters drown in AI-generated, keyword-stuffed applications with no reliable signal. TRACKD fixes both sides of the same broken exchange: candidates get a real pipeline and AI-tailored materials; recruiters get a pre-scored, verified feed instead of five hundred flat PDFs.

### The Recruiter's Actual Reason to Switch

Recruiters don't adopt a new tool because it's tidier — they adopt it because it saves hours and reduces risk. TRACKD's pitch is specific: an AI match score and ATS-keyword matrix that let a recruiter triage candidates in minutes instead of hours, without needing IT approval to connect a new system to Greenhouse/Lever/Workday on day one.

### Simulated Integration — the mechanic that makes this possible

Real ATS integration (OAuth into Greenhouse, Workday, etc.) requires enterprise IT sign-off and security review — a multi-month sales cycle that kills early adoption. TRACKD's Recruiter Hub instead behaves *as if* that integration exists: a recruiter clicks "Move to Interview" inside TRACKD, and the platform instantly updates the candidate's Kanban board and sends them a transactional email — with no real webhook to a third-party ATS required. To the candidate it feels like the employer has a sophisticated tracking system. To the recruiter it's a zero-friction, zero-IT-ticket workflow. Real ATS webhook sync (Merge.to / Unified.to class integrations) is the natural Phase 2 upgrade once recruiters are hooked on the workflow — not a v1 requirement.

### Commercial Model

| Tier | Audience | Price | Included |
|---|---|---|---|
| Free | Candidates | $0 | Unlimited ingestion, Kanban/Calendar/Table dashboard, basic analytics, profile |
| Pro | Candidates | $9/month | Everything in Free + resume canvas, AI cover letters, match scoring, ATS keyword analysis |
| Recruiter | Recruiters/companies | Usage-based (per active job posting or per seat — TBD in pricing workshop) | Applicant Tracking Grid, candidate search/filtering, Recruiter Hub, Simulated Integration actions |

Recruiter tier pricing is intentionally left open here — it needs a dedicated pricing workshop with real recruiter interviews before a number goes in front of a customer. Don't treat the placeholder as a commitment.

### Strategic Goals

- Make opportunity capture effectively free of manual typing, on both sides of the marketplace
- Give recruiters a genuine reason to triage inside TRACKD instead of their inbox or spreadsheet
- Keep the free candidate tier good enough to drive organic acquisition on its own
- Build the data model once so Phase 2's real ATS integrations are a webhook swap, not a rebuild

### Success Criteria

Candidate side: reduced time from "found a job" to "tracked and applied," measurable response-rate improvement for Pro users. Recruiter side: measurable reduction in time-to-shortlist versus their prior process, and voluntary return usage (recruiters coming back without a sales nudge) as the real signal that Simulated Integration is working.

---

## 2. Problem Statement

### 2.1 Candidate side

| Pain point | Detail |
|---|---|
| Fragmentation | Job details live across tabs, screenshots, and a spreadsheet nobody updates past week three |
| Repetition | The same data gets retyped for every application; by application 15, quality visibly drops |
| No feedback loop | No visibility into response rate, time-to-response, or which platforms actually convert |
| Generic materials | Cover letters and resumes aren't tailored per role, which measurably hurts ATS pass-through |

### 2.2 Recruiter side

| Pain point | Detail |
|---|---|
| Signal-to-noise collapse | Generative AI has made every inbound resume look flawless and keyword-optimized, whether or not the candidate is actually qualified |
| Manual triage cost | Recruiters spend hours per role reading flat PDFs to find the handful worth a real look |
| Tool fatigue | Existing ATS platforms are already the system of record; a standalone new login is dead on arrival without a genuine efficiency win |
| No structured signal from candidates | Nothing in a standard application tells a recruiter *why* this candidate fits beyond keyword overlap |

---

## 3. Goals and Non-Goals

### Goals
- Ship a working candidate pipeline and a working recruiter triage workspace in the same release
- Structure every ingested job as clean, typed data — never a free-text blob — from the very first ingestion path
- Make the AI insight layer (match score, ATS risk, resume suggestions) honest: "a tool, not a verdict," stated as product copy, not just an internal principle
- Keep the stack lean: Vite + React frontend, Supabase for data/auth, a thin AI-orchestration layer — nothing that requires a dedicated ops team to run at MVP scale

### Non-Goals (v1)
- Real ATS integration (Greenhouse/Lever/Workday webhooks) — Simulated Integration covers this until Phase 2
- Automatic job application submission on the candidate's behalf
- Multi-seat recruiter team permissions / role hierarchies (single recruiter account per company for v1)
- Native mobile apps
- Browser extension ingestion (Phase 2 — v1 ingestion is Smart Paste + URL only, feeding the same Inbox as the Python `Sift` scraper's Explore feed)

---

## 4. Target Audience

### Candidate personas
See `02-Trackd-PRD.md §2` for full persona detail (Volume Applicant, Strategic Applicant, Passive Tracker).

### Recruiter persona — Talent Ops / In-house Recruiter

| Attribute | Detail |
|---|---|
| Context | Manages 3–8 open roles at once inside an existing ATS; TRACKD is a supplementary triage layer, not a replacement |
| Behaviour | Skims applications for 10–30 seconds each; abandons tools that add a login without an immediate payoff |
| Pain point | Can't tell a genuinely strong candidate from a well-optimized generic application |
| Goal | Get to a shortlist of 5–10 real candidates per role without reading every application in full |
| Primary features used | Applications grid, Recruiter Hub, Candidate Storyline, Simulated Integration action buttons |

---

## 5. MVP Scope (both sides, v1)

| Module | Side | In scope for v1 |
|---|---|---|
| Ingestion (Smart Paste + URL) | Candidate | Yes |
| Inbox + Explore (Sift scraper feed) | Candidate | Yes |
| Dashboard (Kanban/Calendar/Table) | Candidate | Yes |
| Analytics | Candidate | Yes |
| Profile / onboarding | Candidate | Yes |
| Pro page (resume canvas, cover letter, AI insights) | Candidate | Yes |
| Companies (recruiter's job postings workspace) | Recruiter | Yes |
| Applications grid | Recruiter | Yes |
| Recruiter Hub + Candidate Storyline | Recruiter | Yes |
| Simulated Integration action buttons | Recruiter | Yes |
| Real ATS webhook sync (Merge.to-class) | Recruiter | **No — Phase 2** |
| Browser extension | Candidate | **No — Phase 2** |
| Interview prep / predictive analytics | Both | **No — Phase 3** |

---

## 6. Risk Register

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R-01 | Building both sides at once doubles v1 surface area and slips the timeline | High | High | Shared data model means dashboard/analytics/Kanban code is reused, not duplicated, across sides; sequence recruiter-side sprints after the candidate data spine is stable (see Sprint Plan in PRD) |
| R-02 | Recruiters see zero candidates on day one and bounce immediately | High | High | Seed the Recruiter Hub demo/onboarding with realistic sample candidates so day-one value is visible before organic candidate volume exists |
| R-03 | AI hallucination in structured extraction (Claude/Gemini) | High | Medium | Strict JSON schema enforcement, validated server-side before any write; user reviews every field in the ingestion side panel before commit |
| R-04 | Claude/Gemini API cost or availability shift | Medium | Medium | AI calls routed through one internal interface so switching providers is a config change, not a rewrite; Gemini Flash as automatic fallback if Claude errors or times out |
| R-05 | Recruiters perceive Simulated Integration as "fake" once they learn there's no real ATS webhook | Medium | Medium | Never claim real integration in marketing copy; frame it honestly as "instant status sync inside TRACKD" — the value (speed, no IT ticket) is real even without a literal webhook |
| R-06 | Supabase RLS misconfiguration exposes cross-tenant candidate/recruiter data | High | Low | RLS policies reviewed and tested per table before launch; recruiter access to candidate data scoped strictly to applications submitted to that recruiter's own postings |

---

## 7. Approval

| Role | Name | Date |
|---|---|---|
| Product Owner | | |
| Technical Lead | | |
| Reviewed By | | |

*TRACKD Business Requirements Document | v2.0 Curated | July 2026 | CONFIDENTIAL*
