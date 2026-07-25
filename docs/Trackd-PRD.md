# TRACKD — Product Requirements Document (PRD)

**Version:** 2.0 (Curated) | **Date:** July 2026
**Companion docs:** `01-Trackd-BRD.md` (business case), `03-Trackd-Architecture-and-Features.md` (module map + data model), `mockData.ts` (candidate-side data shape — authoritative,  do not change shape)

---

## 1. Product Vision

TRACKD turns job hunting and hiring into the same clean data pipeline, viewed from two sides. A job posting, once ingested, becomes one structured record that a candidate tracks and a recruiter triages — never two disconnected systems pretending to talk to each other.

**North Star Metric (candidate):** minutes from job discovery to a tailored, downloaded application package.
**North Star Metric (recruiter):** minutes from "role opens" to a shortlist of 5–10 candidates worth a real look.

---

## 2. Personas

### Candidate — Persona A: The Volume Applicant
Chioma, 27, Software Engineer. Applies to 8–15 roles/week across 4 platforms. Loses track of where she applied, sends near-identical cover letters, misses follow-up windows. Wants to log a job in under 30 seconds and see at a glance what needs attention.

### Candidate — Persona B: The Strategic Applicant
David, 34, Product Manager. Applies to 2–4 senior roles/month, each requiring real customization. Spends 2–3 hours per application. Wants AI-assisted tailoring that tells him exactly which resume sections to rewrite per job.

### Candidate — Persona C: The Passive Tracker
Amara, 29, UX Designer. Not actively hunting but saves interesting roles. Bookmarks and forgets them. Wants a frictionless save mechanism and deadline visibility without over-engineering.

### Recruiter — Persona D: Talent Ops
See `01-Trackd-BRD.md §4` for full detail. Core need: a shortlist of real candidates in minutes, without a new login that adds work instead of removing it.

---

## 3. End-to-End Flows

### 3.1 Candidate flow

| Step | Action | System response |
|---|---|---|
| 1 | Signs up / logs in (email or Google, via Supabase Auth) | Session created; first-time users route to onboarding |
| 2 | Onboarding: uploads resume, sets target roles and experience level | Claude extracts a structured UserProfile; user reviews and confirms before it's saved |
| 3 | Pastes a job URL or description into Ingestion | Backend cleans input, sends to Claude with a strict JSON schema (Gemini Flash as automatic fallback) |
| 4 | Reviews the side panel of parsed fields, each with a confidence indicator | Fields are editable; user corrects anything wrong |
| 5 | Clicks Commit | Record written to Supabase; Dashboard refreshes |
| 6 | Works the pipeline in Kanban / Calendar / Table | All three views read the same data; a status change in one reflects instantly in the others |
| 7 | Opens a job's Pro page | Resume canvas, AI insights, and cover letter tool load for that specific job |
| 8 | Accepts or dismisses AI resume suggestions, generates a cover letter, downloads both as PDF | Canvas updates live; PDFs render server-side for consistency across browsers |
| 9 | Checks Analytics | KPI cards and charts reflect live pipeline data |

### 3.2 Recruiter flow

| Step | Action | System response |
|---|---|---|
| 1 | Signs up as a recruiter/company account; creates a Company workspace | Company record created; recruiter becomes its first admin |
| 2 | Posts a role (manual entry or link to an external posting) | Role appears in that Company's job list; candidates applying through TRACKD are tied to it |
| 3 | Opens Applications grid for that role | Sees all TRACKD-side applicants, each with an AI match score and verified-badge status |
| 4 | Filters/searches candidates | Grid narrows by score, skills, seniority, source |
| 5 | Opens a candidate's Storyline in the Recruiter Hub | Sees skills, experience arc, and fit summary — not a flat resume dump |
| 6 | Clicks a Simulated Integration action ("Move to Interview," "Reject," "Shortlist") | Candidate's own Kanban status updates instantly; candidate receives a transactional email |

---

## 4. Feature Specifications (Candidate Side)

Full field-by-field UI specs for Ingestion, Dashboard, Analytics, Profile, and Pro Page carry over unchanged from the original TRACKD PRD (see `TRACKD_PRD.pdf` §4–§8) — that spec is already production-grade and nothing about the two-sided pivot changes candidate-side field behavior. Summarized:

| Module | Purpose | Key components |
|---|---|---|
| Ingestion | Zero-typing job capture | Smart Paste console, URL input, confidence-scored side panel, Commit gate (Company + Role required) |
| Inbox | Holding area before commit; also receives batch results from the `Sift` scraper's Explore feed | List of pending records awaiting review/commit |
| Explore | Marketplace of scraped listings from `Sift` (Python scraper, already built) | Card grid, "Add to Pipeline" action per listing |
| Dashboard | Daily working view of the pipeline | Kanban (5 columns), Calendar (applied dates + deadlines), Table (sort/filter/bulk actions) |
| Analytics | Honest performance data, not encouragement | 4 KPI cards, 5 charts (see `TRACKD_PRD.pdf §6`) |
| Profile | Editable identity + resume source of truth | Onboarding wizard, resume re-upload, completeness score |
| Pro Page | Per-job AI workspace | Resume canvas (split-pane), match score gauge, ATS keyword risk, cover letter generator (3 tones) |

---

## 5. Feature Specifications (Recruiter Side — new)

### 5.1 Companies
The recruiter's equivalent of a workspace/project. A Company record holds its own open roles, team members (v1: single admin), and branding basics (logo, name). Every role a recruiter posts belongs to exactly one Company.

| Component | Behaviour |
|---|---|
| Company creation | Name, industry, size — minimal friction, expandable later |
| Role posting | Title, description (pasted or linked), department, seniority, compensation band — reuses the same Claude extraction schema as candidate-side ingestion so the data shapes match |
| Role list | Each role shows applicant count, days open, and a quick status (Open / Paused / Filled) |

### 5.2 Applications (Applicant Tracking Grid)
| Component | Behaviour |
|---|---|
| Grid | One row per applicant to a specific role; columns: name, match score, status, source, applied date |
| Filtering | By score range, status, source, seniority — multi-select |
| Search | By name, skill, or keyword across resume text |
| Row click | Opens the Candidate Storyline in Recruiter Hub |

### 5.3 Recruiter Hub
| Component | Behaviour |
|---|---|
| Candidate Storyline | Visual summary of skills, experience arc, and stated fit for the specific role — not a flat PDF re-render |
| Fit scorecard | Same match-score/ATS-risk engine as the candidate's own Pro page, shown from the recruiter's side |
| Simulated Integration actions | Buttons: Shortlist, Move to Interview, Reject. Each instantly updates the candidate's own Kanban status and fires a transactional email — see `01-Trackd-BRD.md` for why this is framed honestly as "instant sync," not a real ATS webhook, in v1 |

---

## 6. User Stories & Acceptance Criteria

### Candidate
| ID | Story | Acceptance criteria |
|---|---|---|
| US-C01 | Paste a job description and have fields auto-populated | Side panel populates within 8s of clicking Parse |
| US-C02 | Correct AI-extracted fields before committing | Every field is editable; changes persist on commit |
| US-C03 | Drag a job card to update status | Status + statusHistory update within 2s; all views reflect it |
| US-C04 | See a match score for each job (Pro) | Match score, missing skills, ATS risk shown within 8s of Pro page load |
| US-C05 | Accept an AI resume suggestion | Editor and canvas update within 200ms |
| US-C06 | Download a tailored resume PDF | Correct PDF downloads within 5s |

### Recruiter
| ID | Story | Acceptance criteria |
|---|---|---|
| US-R01 | Post a role and see it live in my Company workspace | Role appears in the role list immediately; extraction runs the same as candidate-side ingestion |
| US-R02 | View all applicants to a role in one grid | Grid loads within 3s for up to 200 applicants; sortable/filterable |
| US-R03 | See why a candidate is a good fit without reading a full resume | Storyline + fit scorecard render within 5s of opening a candidate |
| US-R04 | Move a candidate to Interview with one click | Candidate's Kanban status updates within 2s; candidate receives an email within 1 minute |
| US-R05 | Search candidates by skill across all applicants to a role | Results filter live as I type, no full page reload |

---

## 7. Feature Prioritisation Matrix

| Feature | Side | Priority |
|---|---|---|
| Smart Paste + URL ingestion | Candidate | P0 |
| Kanban / Calendar / Table dashboard | Candidate | P0 |
| Onboarding + resume extraction | Candidate | P0 |
| Basic analytics | Candidate | P0 |
| Companies + role posting | Recruiter | P0 |
| Applications grid | Recruiter | P0 |
| Recruiter Hub + Simulated Integration | Recruiter | P0 |
| Pro page — resume canvas, cover letter, match score | Candidate | P0 |
| Explore feed (Sift scraper) | Candidate | P1 |
| Candidate Storyline (rich visual, not just scorecard) | Recruiter | P1 |
| Browser extension | Candidate | P2 (Phase 2) |
| Real ATS webhook sync | Recruiter | P2 (Phase 2) |
| Interview prep generator | Both | P3 (Phase 3) |
| Predictive analytics | Both | P3 (Phase 3) |

---

## 8. Edge Cases & Error States

| Scenario | Expected behaviour |
|---|---|
| URL behind a login wall | Backend returns a parse error; user is prompted to use Smart Paste instead |
| Claude returns malformed JSON | Rejected before any write; Gemini Flash retried automatically as fallback; if both fail, user sees a clear error and the input stays editable |
| Recruiter has zero applicants on a newly posted role | Empty state with copy explaining candidates are still being matched, not "no data" |
| Candidate has no jobs tracked | Empty state with a direct CTA to Ingestion |
| Simulated Integration action fires but the candidate has no verified email | Action completes and updates status; email step is skipped with an in-app note, not a silent failure |
| Two recruiters at the same Company act on the same candidate simultaneously | Last write wins; both recruiters see a toast reflecting the current true state on their next interaction |

---

*TRACKD Product Requirements Document | v2.0 Curated | July 2026 | CONFIDENTIAL*
