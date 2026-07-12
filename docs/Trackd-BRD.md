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
