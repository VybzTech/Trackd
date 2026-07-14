# Trackd BRD and Technical Specification

Version: 1.0
Date: 2026-07-12
Status: Draft for review

## Executive Summary

Trackd is a modern talent workflow platform designed to bring structure, speed, and clarity to the way opportunities are captured, reviewed, and managed. The product is positioned as a practical alternative to fragmented spreadsheets, inbox overload, and disconnected recruiting tools. It begins as a focused workflow system for capturing job opportunities, validating data, and managing progress through a simple lifecycle, while also creating a foundation for future AI-driven matching, resume tailoring, and recruiter automation.

### Business Value

Trackd addresses a clear pain point for both recruiters and job seekers: the cost of manual coordination across multiple systems. By reducing repetitive data entry, creating a single review flow, and improving visibility into opportunity status, the product improves productivity and decision-making while lowering the operational friction of everyday hiring and job-search workflows.

### Market Opportunity

The product serves a broad but specific audience: recruiters and talent teams that need cleaner pipeline visibility, and job seekers who need a more structured way to manage applications. The opportunity is strongest in the mid-market and professional job-search segment where users are active, high-volume, and willing to pay for time-saving workflow improvements.

### Commercial Model

A hybrid commercial approach is recommended:
- Free tier for individuals managing a small pipeline
- Pro tier for advanced tracking, analytics, and workflow support
- Recruiter or team tier for shared visibility, notes, collaboration, and premium reporting

### Strategic Goals

- Make opportunity capture fast and intuitive
- Create a highly usable review and approval workflow
- Support both recruiter and candidate use cases from one shared platform
- Build a modular foundation for future AI-assisted features

### Success Criteria

The product should be considered successful if it can reliably reduce manual tracking effort, increase user retention, and provide a clear path from ingestion to action for both recruiters and candidates.

## 1. Product Summary

Trackd is a Vite + React + TypeScript application designed to help talent teams and job seekers manage opportunities in a structured, intelligent workflow. The product begins as a lightweight application tracking and review system that ingests job data from links, pasted text, or extension-based capture, stores it in a consistent structure, and supports review, status changes, analytics, and future AI-assisted tailoring.

The initial product focus is recruiter-first: a clean review and management experience for hiring teams, with candidate-facing workflows included as a secondary but important extension of the same data model.

## 2. Product Vision

Trackd transforms job and applicant tracking from a fragmented, manual process into a reliable, searchable, reviewable workflow. The product should reduce friction, improve visibility, and create a strong foundation for future automation such as match scoring, cover-letter generation, resume tailoring, and follow-up workflows.

## 3. Assumptions from Product Discovery

- Primary audience: recruiters and hiring teams first
- MVP scope: ingestion and tracking first, not full AI application generation
- Monetization approach: hybrid model with free and paid tiers
- Recruiter scope in MVP: basic visibility, pipeline updates, and notes rather than full ATS replacement

## 4. Problem Statement

Modern recruiting and job searching are often handled across spreadsheets, email, ATS portals, chat messages, and browser tabs. This creates:

- Lost context and duplicate records
- Slow status updates
- Poor visibility into candidate or application progress
- Inconsistent job data capture
- Limited ability to act on opportunities quickly

Trackd solves this by providing a single system for ingesting, reviewing, tracking, and acting on opportunities.

## 5. Goals and Non-Goals

### Goals

- Reduce manual entry of job and application data
- Improve visibility across application lifecycle stages
- Support both recruiter and candidate-facing workflows in one platform
- Create a scalable and modular foundation for future automation
- Keep the initial build lean, fast, and easy to maintain

### Non-Goals

- Replacing full ATS systems in the first release
- Full AI-generated application submission workflows in MVP
- Complex enterprise workflow automation beyond basic pipeline management
- Multi-tenant recruiting enterprise suite in v1

## 6. Target Audience and Primary Personas

### Primary Persona: Recruiter / Talent Ops

Needs:
- Fast intake of opportunities and applicants
- Simple pipeline visibility
- Status updates without switching tools
- Basic notes and tagging
- Clean review experience with low friction

### Secondary Persona: Job Seeker / Candidate

Needs:
- A simple way to capture job listings
- A personal tracking board
- A place to store job details, notes, and follow-up status
- Future support for match scoring and resume tailoring

### Secondary Persona: Hiring Manager

Needs:
- Quick visibility over candidate readiness and stage progress
- Clear summaries without digging into full system details

## 7. Product Positioning

Trackd is positioned as a lightweight, modern application and opportunity tracker for recruiting teams and job seekers who want structure without the complexity of heavy enterprise software.

### Positioning Statement

Trackd helps users collect, review, and manage opportunities in one polished workspace, combining ingestion, organization, and simple workflow automation in a modern Vite-based experience.

## 8. MVP Definition

### MVP Scope

The MVP should include:

1. Authentication and account setup
2. Onboarding profile capture
3. Ingestion of job opportunities from:
   - URL input
   - pasted text
   - browser extension capture
4. Structured parsing and validation of job data
5. Inbox review workflow for unverified or partially parsed records
6. Application record creation and storage
7. Status tracking board with basic lifecycle stages
8. Basic notes, tags, and search/filtering
9. Recruiter-facing review dashboard
10. Basic analytics and activity summary

### Out of Scope for MVP

- Full ATS integration
- Automatic job application submission
- Multi-user recruiting team permissions beyond basic access
- Advanced AI match scoring
- Full resume generation engine
- Complex reporting and forecasting

## 9. Phase 2 and Phase 3 Features

### Phase 2

- AI-assisted job parsing improvements
- Match score against saved user profile
- Suggested resume edits
- Cover letter draft generation
- Follow-up email drafting
- Better recruiter collaboration and comments
- Saved templates and reusable workflows

### Phase 3

- Full AI co-pilot experience
- Advanced analytics and trend insights
- Automation rules and triggers
- Expanded recruiter workflows and approvals
- Exportable reports and summaries
- Candidate-facing application workspace with tailored resume generation

## 10. Core User Stories

### Candidate / Job Seeker

- As a job seeker, I want to capture a job posting quickly so I can track it without manual copying.
- As a job seeker, I want to review extracted job details before saving them so I can correct errors.
- As a job seeker, I want to see the status of each opportunity so I can manage my workflow clearly.
- As a job seeker, I want to add notes and tags so I can remember important context.

### Recruiter / Talent Ops

- As a recruiter, I want to review job opportunities and applicants in one place so I can manage work efficiently.
- As a recruiter, I want to update a record’s status quickly so the pipeline stays current.
- As a recruiter, I want to add internal notes so collaborators can understand context.
- As a recruiter, I want to search and filter records so I can focus on key opportunities.

## 11. Functional Requirements

### 11.1 Authentication and User Setup

- Email and password sign-up/sign-in
- Google OAuth sign-in
- Basic onboarding profile form
- Resume upload or text paste
- User preferences storage

### 11.2 Ingestion

- Accept job URL input from the web app
- Accept pasted raw text
- Accept browser extension-sourced payloads
- Normalize and validate input
- Send data to parsing workflow

### 11.3 Review Inbox

- Display ingested records in a pending review state
- Show extracted fields with confidence or completeness indicators
- Allow user to verify and edit content
- Allow user to approve and commit records to the active system

### 11.4 Application Tracking

- Create application records from approved inbox items
- Display records in a board or table view
- Support status transitions such as:
  - inbox_pending
  - bookmarked
  - applied
  - interviewing
  - rejected
  - offer
  - stale
- Allow notes and tags
- Support search and filters

### 11.5 Recruiter Workflow

- View records with recruiter-friendly fields
- Add internal notes and follow-up reminders
- Change status from a simple action panel
- Filter by company, role, status, source, or tag

### 11.6 Analytics

- Application volume by time period
- Active pipeline breakdown
- Source distribution
- Stale or inactive records count

## 12. Data Model

The system should use a flexible, extensible schema that can grow without frequent rewrites.

### Core Entities

#### User

- id
- email
- auth_provider
- full_name
- created_at
- updated_at

#### Profile

- id
- user_id
- target_roles
- skills
- preferred_locations
- experience_level
- resume_text
- resume_score
- cover_letter_baseline
- created_at
- updated_at

#### JobApplication

- id
- user_id
- source
- job_link
- company_name
- company_industry
- role_title
- role_level
- work_mode
- compensation_min
- compensation_max
- compensation_currency
- status
- status_history
- tags
- notes
- rating
- created_at
- updated_at

#### InboxItem

- id
- user_id
- raw_payload
- parsed_payload
- confidence_score
- is_verified
- created_at
- updated_at

#### ApplicationEvent

- id
- application_id
- event_type
- event_note
- created_at

#### ResumeTemplate

- id
- user_id
- template_name
- template_content
- created_at

### Recommended Storage Approach

Use a relational model in Supabase Postgres with JSONB fields for flexible nested data where needed.

## 13. API Design

The frontend should communicate with a lightweight backend service or serverless API layer. The API should be simple and predictable.

### Authentication Endpoints

- POST /auth/sign-in
- POST /auth/sign-up
- POST /auth/google
- POST /auth/sign-out

### Profile Endpoints

- GET /profile
- POST /profile
- PUT /profile
- POST /profile/resume-parse

### Inbox Endpoints

- POST /inbox/ingest
- GET /inbox
- PUT /inbox/:id
- POST /inbox/:id/approve
- DELETE /inbox/:id

### Application Endpoints

- GET /applications
- GET /applications/:id
- POST /applications
- PUT /applications/:id
- PATCH /applications/:id/status
- POST /applications/:id/events

### Analytics Endpoints

- GET /analytics/summary
- GET /analytics/sources
- GET /analytics/stale

### API Conventions

- JSON payloads only
- Standardized error responses
- Consistent status codes
- Authenticated requests only
- Pagination for large lists



# UI SYSTEMS

- https://www.untitledui.com/blog/react-component-libraries#7-reshaped   7
- https://www.relume.ai/   5
- https://horizon-ui.com/   7
- Framer AI   8


DESING SYSTEM LIBRARIES
- https://storybook.js.org/  5
- https://franken-ui.dev/   5
- https://floatui.com/   7
- https://shadcnstudio.com/
- https://www.typeui.sh/    8
- https://open-design.ai/agents/codex-design/   7
- https://filamentphp.com/   7
- https://ui.aceternity.com/   6
- https://flyonui.com/mcp  7


# TRACKD User Features

CANDIDATE
Basic Features
--
Smart Ingestion Pipeline: Multiple frictionless methods to add jobs, including a browser extension crawler for active job pages, a "Smart Paste" console for raw text/links, and URL stream ingestion.

Interactive Kanban Dashboard: A visual taskboard to manage applications through lifecycle stages (e.g., Saved, Applied, Interviewing, Rejected).

Pipeline Tracking: Toggleable interface states between Kanban, Table, and Calendar views to track deadlines and response milestones.

Pro Features
---
AI Optimization Nexus: An advanced, split-screen workspace offering AI-driven resume parsing and editing directly on a canvas.

Explore Deck: Access to a unified marketplace board aggregating active job listings scraped from multiple platforms.

Tailored Application Building: AI-assisted generation of tailored cover letters and resume edits based on a match-score analysis against specific job descriptions.

Compatibility Scoring: Color-interpolating circular meter providing real-time feedback on how well a candidate's profile matches a specific job role.

ATS Optimization Tools: Checklist highlighting missing keywords and interactive text-replacement chips to improve resume compatibility with Applicant Tracking Systems.



RECRUITER
Basic Features
---
Recruiter Hub Mode: A switchable workspace layout that transforms the interface into an enterprise hiring desk framework.

Applicant Tracking Grids: View incoming applications from candidates in an organized, searchable format.

Candidate Search & Filtering: Specialized tools to filter and manage incoming applicants.

Pro Features
---
Job Posting & Update Management: Ability to upload job opportunities directly and manage them within the ecosystem. Tracking stuffs on other job boards and posting actual opportunities for tracking and applicant management.

Automated Applicant Status Updates: Action buttons that trigger mock status promotions, simulating ATS webhook updates while sending real-time transactional tracking emails directly back to the candidate's dashboard.

Applicant Nexus Sync: Two-way integration where recruiter updates on job postings directly inform and update the status of candidates applying via Trackd. A quick proctor interview can even be scheduled in the pro version.












## 14. Lifecycle Rules

The system should manage records over time to prevent clutter and improve actionability.

### Status Lifecycle

- inbox_pending: newly ingested and not yet approved
- bookmarked: saved for later review
- applied: submitted or queued for submission
- interviewing: active interview process
- rejected: no longer active
- offer: positive outcome
- stale: inactive for too long without updates

### Lifecycle Rules

- Records in applied or interviewing status that remain unchanged for more than 10 days should be marked as stale or prompted for follow-up
- Stale records should appear in a follow-up queue rather than the main active board
- Records older than 30 days with no meaningful updates should be archived or moved to history
- Every status change should create an event record

## 15. Success Metrics

### Product Metrics

- Number of jobs successfully ingested per user per week
- Review-to-approval conversion rate
- Number of active pipeline records per user
- Number of status updates per week
- Stale record rate

### Engagement Metrics

- Daily active users
- Weekly active users
- Feature adoption for inbox, board, and recruiter view
- Retention after first 7 and 30 days

### Business Metrics

- Free-to-paid conversion rate
- Monthly recurring revenue from premium users
- Enterprise pilot signups
- Recruiter workflow adoption rate

## 16. Risk Register

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Parsing quality varies across sites | High | Use staged inbox review before commit |
| Browser extension permissions break on some sites | Medium | Support manual paste and URL fallback |
| Data quality issues from unstructured input | High | Validate and allow user correction |
| Scope creep from AI features | High | Keep MVP narrow and phase features separately |
| Auth and data privacy concerns | High | Use Supabase Auth, RLS, and clear privacy controls |
| Overly complex UX for early users | Medium | Favor a simple review-first workflow |

## 17. Technical Architecture

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- TanStack Query
- Zustand
- React Hook Form + Zod

### Backend / Services

- Supabase for authentication, database, and row-level security
- Lightweight API layer or serverless functions for parsing and enrichment
- Optional use of Gemini or similar AI model for structured extraction in later phases

### Data Layer

- Supabase Postgres
- JSONB for flexible field storage
- File storage for resume uploads and export assets

### Recommended Folder Structure

- src/components
- src/features/auth
- src/features/onboarding
- src/features/inbox
- src/features/applications
- src/features/recruiter
- src/features/analytics
- src/features/profile
- src/lib
- src/types
- src/hooks
- src/utils

## 18. Recommended Technical Approach for MVP

### Frontend Experience

- Landing page and auth flow
- Onboarding profile capture
- Inbox review screen
- Applications board or table view
- Recruiter summary view
- Basic analytics overview

### Backend / Storage Approach

- Supabase Auth for sign-in and user identity
- Supabase Postgres for records
- Simple serverless function for parsing enrichment
- Clear separation between inbox and committed records

## 19. Delivery Plan

### Sprint 1

- Project setup with Vite React TypeScript
- Auth flow and onboarding UI
- Database schema and Supabase integration
- Basic application list and status model

### Sprint 2

- Inbox ingestion workflow
- Manual review and edit flow
- Record creation and storage
- Basic search/filtering

### Sprint 3

- Recruiter view and status updates
- Notes and tags
- Analytics summary
- Basic polish and refinement

### Sprint 4

- Testing, validation, and MVP launch prep
- Bug fixes and cleanup
- Feedback loop and next-phase prioritization

## 20. Recommended Commercial Model

### Free Tier

- Basic account
- Limited number of records
- Core tracking and review features

### Pro Tier

- Advanced filters and analytics
- More saved records
- Better inbox workflow and export tools
- Priority support

### Recruiter / Team Tier

- Shared workflow
- Team notes and collaboration
- Admin-style visibility
- Premium analytics and reporting

## 21. Conclusion

Trackd has strong product potential because it solves a real and recurring pain point for both recruiters and job seekers: the inability to manage opportunities clearly, quickly, and consistently. The best path is to start lean, prove the core workflow, and build trust through a clean, reliable product experience before expanding into AI-heavy automation.

The MVP should focus on making ingestion, review, and tracking feel effortless. If that core experience is strong, the product can grow into a more powerful platform for matching, tailoring, and recruiter collaboration.



# TRACKD — Business Requirements Document (BRD)

**Project Title:** TRACKD — AI-Powered Job Application Tracker
**Prepared By:** VybzTech Inc.
**Document Version:** 1.0 (Draft — Pending Stakeholder Review)
**Date Prepared:** June 2026
**Classification:** CONFIDENTIAL
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Business Objectives & Strategic Alignment](#3-business-objectives--strategic-alignment)
4. [Monetisation Strategy](#4-monetisation-strategy)
5. [Stakeholder Register](#5-stakeholder-register)
6. [Project Scope](#6-project-scope)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Risks & Assumptions](#9-risks--assumptions)
10. [Approval & Authorisation](#10-approval--authorisation)

---

## 1. Executive Summary

TRACKD is an AI-powered job application tracking platform designed to eliminate the friction of manual data entry during job searches. By combining a React frontend, a Golang backend, and the Google Gemini API, the platform automatically extracts, structures, and tracks job applications from URLs or pasted text. A built-in AI copilot layer generates tailored resume edits and cover letters per application — transforming a passive record-keeping tool into an active career management engine.

**Market Context:** The modern job hunt is a high-volume, multi-platform operation. Candidates applying to competitive roles routinely manage applications across LinkedIn, Indeed, AngelList, and company portals simultaneously. Existing tools — spreadsheets, bookmarking extensions — offer no intelligence layer, no centralised pipeline view, and no application material generation. TRACKD fills this gap.

**Target Audience:** Mid-to-senior technical professionals, growth marketers, and multi-track job seekers managing 30+ simultaneous applications.

---

## 2. Problem Statement

### 2.1 Core Pain Points

| Pain Point | Description |
|---|---|
| Information fragmentation | Job details live across browser tabs, screenshots, and manual spreadsheet rows |
| Manual re-entry overhead | Users repeatedly copy the same data when logging new applications |
| Application blindspots | Missed follow-up windows and deadlines due to no centralised status tracking |
| Generic application materials | Cover letters and resume bullets not tailored per role, reducing ATS pass rates |
| No performance visibility | Users have no data on their own application patterns, response rates, or funnel drop-off |

### 2.2 The Opportunity

Automating the ingestion and analysis phases directly addresses these pain points. Treating each job posting as a structured data pipeline enables:

- Reduction of manual data entry by over 60%
- Surfacing of match score, missing skills, and ATS keyword gaps per role
- Generation of role-specific cover letters and resume edits within a single workspace
- A real-time analytics layer showing application volume, response rate, and pipeline health

---

## 3. Business Objectives & Strategic Alignment

### 3.1 Primary Objectives

| ID | Objective | Success Indicator |
|---|---|---|
| O1 | Eliminate manual data entry via smart ingestion | <60 seconds from paste or URL to structured dashboard entry |
| O2 | Provide real-time application pipeline visibility | Kanban, Calendar, and Table views reflect live status across all applications |
| O3 | Generate ATS-optimised application materials per job | Tailored resume edits and cover letters exportable in under 30 seconds |
| O4 | Deliver actionable analytics on job hunt performance | Analytics charts update within 5 seconds of any status change |
| O5 | Achieve freemium-to-Pro conversion at 5% within 12 months | Monthly recurring revenue target of $4,500 at 10,000 MAU |

### 3.2 Strategic Alignment

TRACKD positions itself as the command centre for the modern job hunt by:

- Moving users from reactive tracking to proactive, data-driven application strategy
- Delivering genuine free-tier value to drive organic acquisition
- Monetising through a clearly differentiated AI copilot Pro tier
- Operating on near-zero marginal infrastructure cost via GCP serverless architecture

---

## 4. Monetisation Strategy

| Tier | Price | Included Features |
|---|---|---|
| Free | $0 / month | Unlimited job ingestion, Kanban + Calendar + Table dashboard views, Basic analytics, Profile management |
| Pro | $9 / month | Everything in Free + Resume canvas editor, AI-generated cover letters, AI match scoring, ATS keyword analysis, Missing skills report, Interview prep (Phase 3) |

**ARR Projection:** At 10,000 MAU and a 5% Pro conversion rate, Year 1 ARR targets approximately $54,000 with near-zero incremental infrastructure cost. The path to $500K ARR requires approximately 50,000 MAU, achievable through SEO, community distribution, and a referral programme introduced in Phase 3.

> **Correction Note:** The original working document cited $54,000 ARR but did not account for Gemini API token costs at scale. At an estimated $0.008 per full Pro AI session, token costs at 500 Pro users remain well below $50/month — costs are not a constraint at this stage but must be monitored as usage scales.

---

## 5. Stakeholder Register

| Role | Description | Responsibilities |
|---|---|---|
| Product Owner | TRACKD Founder / Project Lead | Defines priorities, approves scope, signs off on deliverables |
| VybzTech Inc. | Development Partner | Full-stack design, build, testing, and deployment |
| End User (Free Tier) | Job seekers using core tracking features | Primary functional feedback loop; conversion targets |
| End User (Pro Tier) | Active job seekers needing AI-powered materials | Revenue stakeholder; feature validation partner |
| Investors / Advisors | Future funding stakeholders | Strategic oversight; Series A viability assessment |

---

## 6. Project Scope

### 6.1 In-Scope — Phase 1 (MVP)

- User authentication (Email/Password + Google OAuth)
- Smart Paste ingestion — URL and raw text with AI-powered structured extraction
- Dashboard — Kanban view, Calendar view, Table view
- Per-job status management with full status history log
- Basic analytics — applications over time, source breakdown, status funnel
- User profile — editable, with resume upload and onboarding data extraction
- Pro page per job — Resume canvas editor and AI cover letter generator

### 6.2 In-Scope — Phase 2 (Automation Layer)

- Browser extension (Chrome, Firefox) — one-click job saving from any job board
- AI match engine — cross-references UserProfile and JobData to produce match score and missing skills
- Email webhook integration — auto-updates application status from interview invites and rejection emails

### 6.3 In-Scope — Phase 3 (Copilot Layer)

- Interview preparation — AI-generated practice questions tailored to the specific job and company
- Predictive analytics — estimated response probability and time-to-decision benchmarks per role type
- Referral mechanics and community features

### 6.4 Out of Scope — Phase 1

- Native mobile application (iOS or Android)
- Third-party calendar sync (Google Calendar, Outlook)
- Direct job board application submission
- Team or recruiter-facing multi-seat workspace

---

## 7. Functional Requirements

### 7.1 Ingestion Module

| ID | Requirement | Priority |
|---|---|---|
| FR-IN-01 | System shall accept raw text or a URL in a multi-line input area | MUST |
| FR-IN-02 | System shall detect whether input is a URL or raw text and route accordingly | MUST |
| FR-IN-03 | Go backend shall strip HTML via goquery and pass clean body text to Gemini | MUST |
| FR-IN-04 | Cleaned text shall be submitted to Gemini with a strict JSON schema defining all expected fields | MUST |
| FR-IN-05 | A side panel shall render all parsed fields as editable inputs before the user confirms | MUST |
| FR-IN-06 | Each field shall carry a confidence indicator (high / medium / low) based on Gemini extraction certainty | SHOULD |
| FR-IN-07 | System shall write confirmed data to Firestore and refresh the dashboard on commit | MUST |
| FR-IN-08 | Commit action shall be blocked unless at minimum Company Name and Role Title are populated | MUST |

### 7.2 Dashboard Module

| ID | Requirement | Priority |
|---|---|---|
| FR-DB-01 | Dashboard shall provide three interchangeable views: Kanban, Calendar, and Table | MUST |
| FR-DB-02 | Kanban board shall support drag-and-drop status transitions across five columns | MUST |
| FR-DB-03 | Calendar view shall display jobs on their applied date and any set application deadline | MUST |
| FR-DB-04 | Table view shall support column sorting, multi-select filtering, and inline status editing | MUST |
| FR-DB-05 | A status change in any view shall propagate to all other views without a page reload | MUST |
| FR-DB-06 | Each job entry shall link to its dedicated Pro page | MUST |
| FR-DB-07 | User shall be able to archive or permanently delete any job entry | SHOULD |
| FR-DB-08 | All status transitions shall append an entry to the job's statusHistory log | MUST |

### 7.3 Analytics Module

| ID | Requirement | Priority |
|---|---|---|
| FR-AN-01 | Analytics page shall display KPI cards: total applications, response rate, and offer rate | MUST |
| FR-AN-02 | Line or area chart shall show applications submitted over time, grouped by week or month | MUST |
| FR-AN-03 | Donut chart shall show current pipeline distribution across all statuses | MUST |
| FR-AN-04 | Bar chart shall show application count by source | MUST |
| FR-AN-05 | Ranked list shall show top job titles and top companies applied to | SHOULD |
| FR-AN-06 | Average time-in-stage metric shall be surfaced for each status | SHOULD |
| FR-AN-07 | All analytics data shall refresh on page load and update within 5 seconds of any status change | MUST |

### 7.4 Profile Module

| ID | Requirement | Priority |
|---|---|---|
| FR-PR-01 | First-time users shall complete an onboarding flow covering resume upload, job title, preferred roles, and experience level | MUST |
| FR-PR-02 | Gemini shall extract a structured UserProfile JSON from the uploaded resume | MUST |
| FR-PR-03 | User shall preview and confirm the extracted profile before it is saved | MUST |
| FR-PR-04 | Profile page shall allow editing of all personal fields after onboarding | MUST |
| FR-PR-05 | User shall be able to re-upload a new resume at any time; re-upload triggers a new Gemini extraction | MUST |
| FR-PR-06 | A profile completeness score shall be surfaced to encourage data quality | SHOULD |

### 7.5 Pro Page (Per-Job)

| ID | Requirement | Priority |
|---|---|---|
| FR-PP-01 | Each tracked job shall have a dedicated Pro page accessible from the dashboard | MUST |
| FR-PP-02 | Pro page shall present a split-pane layout: left pane renders the resume canvas, right pane contains the content editor and AI insights | MUST |
| FR-PP-03 | Edits in the right content panel shall update the rendered resume canvas in real time (under 200ms) | MUST |
| FR-PP-04 | AI-suggested resume bullet edits shall pre-populate the content editor, flagged for user review (Pro tier) | MUST |
| FR-PP-05 | User shall be able to download the tailored resume as a server-rendered PDF | MUST |
| FR-PP-06 | Cover letter generator shall produce an ATS-optimised letter based on the job description and UserProfile | MUST |
| FR-PP-07 | Generated cover letter shall be editable inline and downloadable as PDF | MUST |
| FR-PP-08 | Match score, missing skills list, and ATS keyword risk level shall be displayed per job (Pro tier) | MUST |
| FR-PP-09 | Free-tier users accessing Pro features shall see an upgrade prompt modal, not a blank or broken page | MUST |

---

## 8. Non-Functional Requirements

| Category | Requirement | Target |
|---|---|---|
| Performance | Time from paste/URL submission to parsed side panel (excluding AI latency) | < 3 seconds |
| Performance | Gemini API extraction response time | < 8 seconds (P95) |
| Performance | Dashboard load time | < 3 seconds (P95) |
| Availability | Platform uptime | 99.5% monthly SLA |
| Scalability | Concurrent users supported without degradation | 1,000+ via GCP Cloud Run auto-scaling |
| Security | Authentication | Firebase Auth with JWT validation on every API call |
| Security | Data encryption | Firestore data encrypted at rest; HTTPS enforced on all routes |
| Security | Standards compliance | OWASP Top 10 validated before production launch |
| Accessibility | Standard | WCAG 2.1 AA minimum compliance |
| Browser Support | Supported environments | Chrome 100+, Firefox 110+, Edge 100+, Safari 16+ |
| Data Retention | User data deletion on account closure | Within 30 days of deletion request |
| PDF Output | Resume and cover letter PDF rendering | Server-side generation; consistent across all supported browsers |

---

## 9. Risks & Assumptions

### 9.1 Key Assumptions

- Users have access to job descriptions as copyable text or as a public URL
- Google Gemini API rate limits are sufficient for Phase 1 traffic without requiring a paid tier upgrade
- GCP Cloud Run free tier (2 million requests per month) covers Phase 1 usage volumes
- Users consent to AI processing of their resume and job description data during onboarding

### 9.2 Risk Register

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R-01 | AI hallucinations in structured extraction | High | Medium | Enforce strict Gemini JSON Schema; Go validates all fields against struct before any Firestore write |
| R-02 | Job board DOM changes break URL scraping | Medium | High | Phase 1 relies on Smart Paste (text input) only; browser extension added in Phase 2 to bypass HTML scraping |
| R-03 | GCP free tier quota exceeded under load | Low | Low | IndexedDB client caching reduces read counts; Cloud Run scales to zero when idle |
| R-04 | Gemini API pricing changes affect unit economics | Medium | Medium | Architect AI calls to be provider-agnostic; monitor token usage per request and set per-user daily limits |
| R-05 | Low Pro tier conversion reduces revenue viability | High | Medium | Free tier delivers genuine standalone value; Pro features are meaningfully differentiated, not arbitrarily withheld |
| R-06 | Resume PDF rendering inconsistency across browsers | Medium | Medium | Server-side PDF generation via headless Chrome (chromedp) or a Go PDF library; browser print-to-PDF is not used |
| R-07 | Data breach exposing user resume and job data | High | Low | Encryption at rest and in transit; least-privilege Firestore rules; JWT expiry and refresh enforcement; breach notification policy |

---

## 10. Approval & Authorisation

| Role | Name | Signature | Date |
|---|---|---|---|
| Product Owner | | | |
| Technical Lead — VybzTech | | | |
| Reviewed By | | | |

---

*TRACKD Business Requirements Document | VybzTech Inc. | Version 1.0 Draft | June 2026 | CONFIDENTIAL*
