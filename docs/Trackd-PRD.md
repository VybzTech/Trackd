# TRACKD — Product Requirements Document (PRD)

**Project Title:** TRACKD — AI-Powered Job Application Tracker
**Prepared By:** VybzTech Inc.
**Document Version:** 1.0 (Draft)
**Date Prepared:** June 2026
**Classification:** CONFIDENTIAL

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [User Personas](#2-user-personas)
3. [End-to-End User Flow](#3-end-to-end-user-flow)
4. [Feature Specifications](#4-feature-specifications)
   - 4.1 [Ingestion Page](#41-ingestion-page)
   - 4.2 [Dashboard](#42-dashboard)
   - 4.3 [Analytics Page](#43-analytics-page)
   - 4.4 [Profile Page](#44-profile-page)
   - 4.5 [Pro Page (Per-Job)](#45-pro-page-per-job)
5. [User Stories & Acceptance Criteria](#5-user-stories--acceptance-criteria)
6. [Feature Prioritisation Matrix](#6-feature-prioritisation-matrix)
7. [Edge Cases & Error States](#7-edge-cases--error-states)

---

## 1. Product Vision

TRACKD transforms job tracking from a passive, historical record-keeping activity into an active, predictive career management engine. Every tracked job becomes a clean, structured data object that feeds coaching insights, generates tailored application materials, and surfaces performance analytics — all within a single unified workspace.

**North Star Metric:** Time from job discovery to a complete, tailored application package (cover letter + edited resume) generated and ready for download, measured in minutes.

**Phase 1 Target:** Under 5 minutes per job from first paste to tailored materials downloaded.

---

## 2. User Personas

### Persona A — The Volume Applicant

| Attribute | Detail |
|---|---|
| Profile | Chioma, 27, Software Engineer |
| Context | Actively job hunting; applying to 8–15 roles per week across 4 platforms |
| Behaviour | Copies and pastes job descriptions; tracks applications in a Google Sheet that she rarely updates |
| Pain Point | Loses track of where she applied; sends near-identical cover letters; misses follow-up windows |
| Goal | Log a job in under 30 seconds and see at a glance what needs attention next |
| Primary Features Used | Ingestion page, Dashboard (Kanban), Analytics |

### Persona B — The Strategic Applicant

| Attribute | Detail |
|---|---|
| Profile | David, 34, Product Manager |
| Context | Selectively applying to 2–4 senior roles per month; each application must be strong |
| Behaviour | Spends 2–3 hours per application manually tailoring resume bullets and writing cover letters |
| Pain Point | High time cost of customisation; no clear signal on whether his profile matches a role |
| Goal | AI-assisted tailoring that surfaces exactly which resume sections to rewrite per job |
| Primary Features Used | Ingestion page, Pro page (Resume canvas, AI insights, Cover letter), Analytics |

### Persona C — The Passive Tracker

| Attribute | Detail |
|---|---|
| Profile | Amara, 29, UX Designer |
| Context | Not actively hunting but saves interesting roles to revisit; occasional application |
| Behaviour | Bookmarks jobs in browsers and forgets them; no tracking system |
| Pain Point | No single place to return to saved opportunities; no reminder of deadlines |
| Goal | A frictionless save mechanism and deadline visibility without over-engineering |
| Primary Features Used | Ingestion page, Dashboard (Calendar view), Profile |

---

## 3. End-to-End User Flow

| Step | User Action | System Response |
|---|---|---|
| 1 | Signs up or logs in via Google or email/password | Firebase Auth creates session; first-time users are redirected to onboarding |
| 2 | Completes onboarding: uploads resume, enters preferred roles and experience level | Gemini extracts UserProfile JSON; user reviews extracted skills and experience and confirms |
| 3 | Navigates to the Ingestion page; pastes a job URL or job description text | Go backend cleans input; sends to Gemini with a strict JSON schema |
| 4 | Reviews the populated side panel showing all parsed job fields | Fields are rendered in editable inputs; user corrects any inaccuracies |
| 5 | Clicks Commit to Dashboard | Firestore document created; dashboard refreshes with the new job entry |
| 6 | Views Dashboard in preferred view mode | Real-time pipeline visible; all three views reflect the same data |
| 7 | Drags a job card to a new Kanban column to update its status | Firestore status field updated; statusHistory appended; all views refresh |
| 8 | Clicks a job card to open its Pro page | Pro page loads: resume canvas, AI insights panel, and cover letter tool |
| 9 | Reviews AI suggestions; accepts or dismisses individual bullet edits | Accepted edits update the live resume canvas |
| 10 | Clicks Download Resume | Server-side PDF generated and served for download |
| 11 | Generates a cover letter with a chosen tone | Gemini produces letter; rendered in editable text area |
| 12 | Downloads or copies the cover letter | File saved or clipboard populated |
| 13 | Visits Analytics page | Charts display volume over time, pipeline funnel, source breakdown, and KPI stats |

---

## 4. Feature Specifications

### 4.1 Ingestion Page

**Purpose:** Primary entry point for new job data. Users arrive here to log any new opportunity.

**Layout:** Full-width smart input area on the left. Collapsible structured data side panel on the right. On mobile, the panel slides up from the bottom as a sheet.

#### Components

| Component | Behaviour |
|---|---|
| Smart Input Area | Multi-line text area accepting a URL or any copied text. Placeholder copy reads: *Paste a job URL, job description, or any text you have copied.* Paste detection fires on the paste event. |
| Parse Button | Triggers the Go backend ingestion API call. Displays a loading spinner during the request. Disabled until the input contains at least 20 characters. Debounced at 300ms. |
| Side Panel | Slides in from the right after a successful parse. Organised into field groups: Role, Company, Compensation, Timeline, Technical Requirements. Collapses to a closed state if the API returns no data. |
| Confidence Indicators | Each parsed field carries a colour-coded confidence badge: green (high), amber (medium), red (low or missing). Low-confidence fields are visually emphasised to prompt manual review. |
| Field Inputs | Every field in the side panel is directly editable. Users are not locked into AI output. |
| Commit Button | Submits confirmed data to Firestore. Disabled until Company Name and Role Title are both populated. On success, shows a success toast and clears the input area. |
| Clear Button | Resets the entire ingestion form. If the side panel contains data, shows a confirmation modal before clearing. |

#### States

| State | Trigger | UI Behaviour |
|---|---|---|
| Empty | Page load or after clear | Input area visible, no side panel |
| Parsing | Parse button clicked | Spinner on button; input area locked |
| Preview | Parse complete | Side panel slides in with parsed fields |
| Error — Parse Failed | API error or Gemini failure | Error toast; side panel remains closed; input remains editable |
| Committing | Commit button clicked | Commit button shows spinner; all fields locked |
| Success | Firestore write confirmed | Success toast; form clears; user may begin a new entry |

---

### 4.2 Dashboard

**Purpose:** Central workspace for viewing and managing the full application pipeline.

**Layout:** Top toolbar with view switcher (Kanban / Calendar / Table), filter controls, and a search bar. The main content area renders the active view.

#### Kanban View

| Column | Status Value | Colour |
|---|---|---|
| Saved | bookmarked | Neutral grey |
| Applied | applied | Brand blue |
| Interviewing | interviewing | Amber |
| Offer Received | offer | Green |
| Rejected / Closed | rejected | Red |

**Job Card Contents:** Company name (with auto-fetched logo where available), job title, date logged, source badge, and match score badge for Pro users.

**Interactions:**
- Drag-and-drop between columns triggers a Firestore status update and appends an entry to statusHistory
- Each card has a context menu (kebab or right-click): View Pro Page, Archive, Delete
- Cards are sorted by updatedAt descending within each column by default

#### Calendar View

- Jobs appear on their appliedDate
- A secondary deadline indicator appears on the deadline date if one was set
- Clicking an event opens a quick-view modal showing key job fields and a link to the Pro page
- Month, Week, and Day toggle available in the toolbar

#### Table View

| Column | Sortable | Filterable |
|---|---|---|
| Company | Yes | No |
| Role Title | Yes | No |
| Status | Yes | Multi-select |
| Match Score | Yes (Pro only) | No |
| Applied Date | Yes | Date range |
| Deadline | Yes | Date range |
| Source | No | Multi-select |
| Actions | No | No |

**Table Interactions:**
- Inline status dropdown editable without navigating to the Pro page
- Row checkbox supports bulk archive or delete
- Clicking any row (outside the status dropdown) opens the Pro page

---

### 4.3 Analytics Page

**Purpose:** Gives users a data-driven view of their job hunt performance over time.

#### Chart Inventory

| Chart | Type | X-Axis | Y-Axis / Value |
|---|---|---|---|
| Applications Over Time | Area line chart | Week or month | Count of applications submitted |
| Pipeline Status Breakdown | Donut chart | — | Count per status |
| Applications by Source | Horizontal bar chart | Source name | Count |
| Top Roles Applied To | Ranked list | — | Frequency of role title |
| Top Companies Applied To | Ranked list | — | Frequency of company name |

#### KPI Cards

| Card | Calculation |
|---|---|
| Total Applications | Count of all non-archived jobs |
| Response Rate | (Interviewing + Offer) / Applied × 100% |
| Offer Rate | Offer / Applied × 100% |
| Average Time to Response | Mean days from appliedDate to first interviewing status entry in statusHistory |
| Active Pipeline | Count of jobs in Saved, Applied, or Interviewing status |

#### Filters

- Date range selector (default: last 30 days / last 90 days / all time)
- All charts and KPI cards respond to the active filter selection

---

### 4.4 Profile Page

**Purpose:** Houses editable user information and serves as the data source for the AI matching and tailoring engine.

#### Sections

| Section | Fields | Notes |
|---|---|---|
| Personal Info | Full Name, Email, Phone, Location, LinkedIn URL, Portfolio URL | Email change requires re-authentication |
| Resume | Uploaded resume file, upload timestamp, extracted skills list as tags | Re-upload triggers a new Gemini extraction and replaces the existing UserProfile |
| Career Preferences | Target job titles (multi-tag), preferred work mode (remote / hybrid / onsite), experience level | Used in AI match scoring |
| Account | Current plan (Free / Pro), billing details (Pro), notification preferences, danger zone (delete account) | Sensitive actions require confirmation modal |

#### Profile Completeness Score

A visual progress indicator showing the percentage of recommended fields that have been filled. Sections contributing to the score: personal info, resume upload, career preferences. This score is surfaced on the Profile page and as a subtle prompt in the dashboard sidebar for incomplete profiles.

#### Onboarding Flow (First Visit Only)

A four-step wizard presented to new users before they access the main application:

| Step | Content |
|---|---|
| Step 1 — Welcome | Brief product introduction; sets expectations |
| Step 2 — Resume Upload | PDF upload field; triggers Gemini extraction |
| Step 3 — Profile Review | User confirms or edits the extracted skills and experience |
| Step 4 — Preferences | Target roles, work mode, experience level; completion confirmation |

---

### 4.5 Pro Page (Per-Job)

**Purpose:** The per-job workspace where users review AI insights and produce tailored application materials.

**Access:** Linked from every job card and table row. Free-tier users who navigate to this page see a ProGate modal prompting upgrade. They are not shown a broken or empty page.

**Layout:** Split-pane. Left pane (55% width): Resume Canvas. Right pane (45% width): Content Editor and AI Insights Panel. On screens under 1024px width, panes stack vertically with tab navigation between them.

#### Left Pane — Resume Canvas

| Element | Behaviour |
|---|---|
| Rendered Resume | Print-ready resume rendered from the current UserProfile and any accepted AI edits |
| Live Sync | Canvas updates within 200ms of any content change in the right pane |
| Download Button | Triggers server-side PDF generation; file served as a named download (e.g., FirstName_LastName_CompanyName_Resume.pdf) |

#### Right Pane — Content Editor

Tabbed navigation across four sections:

| Tab | Content |
|---|---|
| Summary | Professional summary text area; AI-suggested rewrite shown as a suggestion chip if available |
| Experience | Chronological list of roles; each role's bullet points are individually editable; AI suggestions flagged per bullet |
| Skills | Tag-based skill list; AI flags skills from the job description not currently listed |
| Education | Institution, degree, graduation year; editable fields |

**AI Suggestion Chips:** Each suggestion appears inline above the relevant field. Chips show the suggested text and two actions: Accept (replaces field content with suggestion) and Dismiss (hides the chip without changing content). Accepted suggestions are tracked in local state and submitted with the Firestore update on save.

#### Right Pane — AI Insights Panel (Below Editor)

| Element | Detail |
|---|---|
| Match Score | Circular progress gauge displaying the percentage match between UserProfile and this job's requirements |
| Missing Skills | Horizontal chip list of skills present in the job description but absent from UserProfile |
| ATS Keyword Risk | Badge: Low / Medium / High, with an expandable list of flagged terms |
| Suggested Edits Count | Count of available AI suggestions across all resume sections |

#### Cover Letter Generator

| Element | Behaviour |
|---|---|
| Tone Selector | Segmented control: Professional / Confident / Conversational |
| Generate Button | Triggers Gemini API call with UserProfile + job description + selected tone |
| Output Area | Editable rich text area; rendered below AI Insights panel |
| Download Button | Server-side PDF generation of the cover letter |
| Copy Button | Copies full cover letter text to clipboard |
| Regenerate Button | Clears previous output and generates a new version; prompts confirmation before clearing |

---

## 5. User Stories & Acceptance Criteria

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | As a job seeker, I want to paste a job description and have all fields extracted automatically so I do not have to type anything manually | Given a valid job description paste, when I click Parse, then all available fields are populated in the side panel within 8 seconds |
| US-02 | As a user, I want to edit any extracted field before committing so I can correct AI errors | Given a populated side panel, when I click any field, then it becomes editable and my changes are preserved on commit |
| US-03 | As a user, I want to view all my applications in a Kanban board so I understand my pipeline at a glance | Given tracked jobs in multiple statuses, when I open the Dashboard in Kanban view, all jobs appear in their correct column |
| US-04 | As a user, I want to drag a job card to a new column and have the status update automatically | Given a job card in any column, when I drag and drop it to another column, then the status updates in Firestore and the statusHistory is appended within 2 seconds |
| US-05 | As a user, I want to see my applications on a calendar so I can track deadlines visually | Given jobs with applied dates and deadlines, when I switch to Calendar view, jobs appear on the correct dates |
| US-06 | As a user, I want to see charts showing my application activity so I can understand my own patterns | Given at least 5 tracked applications, when I visit Analytics, I see application volume over time, pipeline breakdown, and source distribution |
| US-07 | As a Pro user, I want to see a match score for each job so I know how competitive my application is | Given a saved job with AI insights loaded, when I open the Pro page, a match score percentage and missing skills list are displayed |
| US-08 | As a Pro user, I want to accept an AI resume suggestion so it is applied to my resume canvas | Given an AI suggestion chip, when I click Accept, the relevant section updates in the content editor and the canvas reflects the change within 200ms |
| US-09 | As a Pro user, I want to download a tailored resume PDF for a specific job | Given the Pro page for a job, when I click Download Resume, a correctly formatted PDF is downloaded within 5 seconds |
| US-10 | As a Pro user, I want to generate a cover letter for a job with my preferred tone | Given a job's Pro page, when I select a tone and click Generate, a relevant cover letter appears in the output area within 8 seconds |
| US-11 | As a Free user accessing the Pro page, I want to understand what I am missing and how to upgrade | Given a Free-tier user on any Pro page, when the page loads, a ProGate modal is displayed showing Pro features and an upgrade CTA before any content is revealed |
| US-12 | As a user, I want to re-upload my resume at any time and have my profile updated | Given the Profile page, when I upload a new resume PDF, a new Gemini extraction runs and the updated UserProfile replaces the previous one |

---

## 6. Feature Prioritisation Matrix

| Feature | Phase | Tier | Priority |
|---|---|---|---|
| Smart Paste ingestion | 1 | Free | P0 |
| Side panel preview with editable fields | 1 | Free | P0 |
| Kanban dashboard view | 1 | Free | P0 |
| Table dashboard view | 1 | Free | P0 |
| Calendar dashboard view | 1 | Free | P0 |
| Status drag-and-drop with history log | 1 | Free | P0 |
| User onboarding flow with resume extraction | 1 | Free | P0 |
| Profile page with editable fields | 1 | Free | P0 |
| Basic analytics charts | 1 | Free | P0 |
| Pro page — Resume canvas with live sync | 1 | Pro | P0 |
| Pro page — AI resume suggestions | 1 | Pro | P0 |
| Pro page — Cover letter generator | 1 | Pro | P0 |
| Pro page — Match score and missing skills | 1 | Pro | P0 |
| PDF download — Resume | 1 | Pro | P0 |
| PDF download — Cover letter | 1 | Pro | P1 |
| Confidence indicators on ingestion fields | 1 | Free | P1 |
| Profile completeness score | 1 | Free | P1 |
| Browser extension | 2 | Free + Pro | P1 |
| AI match engine (cross-reference UserProfile) | 2 | Pro | P1 |
| Email webhook status auto-update | 2 | Pro | P2 |
| Interview prep question generator | 3 | Pro | P2 |
| Predictive analytics | 3 | Pro | P3 |
| Referral and community features | 3 | Free + Pro | P3 |

---

## 7. Edge Cases & Error States

| Scenario | Expected Behaviour |
|---|---|
| User pastes a URL that is behind a login wall | Backend receives a redirect or 403; returns a parse error; user is prompted to use the Smart Paste text option instead |
| Gemini returns a malformed or incomplete JSON response | Go backend rejects the response before any Firestore write; a 422 error is returned; the user sees an error toast and the input remains editable |
| User submits an empty or near-empty paste | Parse button is disabled below 20 characters; if submitted via API directly, backend returns a 400 with a descriptive message |
| User has no jobs tracked when visiting Analytics | Empty state illustration with copy: *No data yet. Start tracking jobs to see your analytics.* and a CTA to the Ingestion page |
| Pro page opened for a job with no AI insights yet generated | AI Insights Panel shows a skeleton loader; a Generate Insights button is displayed for the user to trigger the match call manually |
| Resume PDF download fails server-side | Error toast with the message *Your PDF could not be generated. Please try again.* The retry button re-triggers the download endpoint |
| User loses internet connection mid-ingestion | Offline banner displayed; Parse and Commit buttons disabled; re-enabled automatically when connection is restored |
| Two browser tabs open on the same job; user edits in both | TanStack Query invalidates the cache on window focus; the most recently saved version is loaded; a stale data warning is shown if the locally edited version differs |

---

*TRACKD Product Requirements Document | VybzTech Inc. | Version 1.0 Draft | June 2026 | CONFIDENTIAL*