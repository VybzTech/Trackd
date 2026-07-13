# TRACKD — ARCHITECTURAL SPECIFICATION & SYSTEM DESIGN CONTEXT
Target System Context for Claude AI Deployment
Version: 2.0 (Comprehensive Two-Way Ecosystem Edition)
Date: July 2026

NOTE: This file has been integrated with the companion design/build document `docs/TRACK'D.md` and now serves as the single canonical Trackd system design file. 

Decisions applied during this merge:
- Sidebar: retained (collapsed 84px / expanded 240px). The drawer-toggle behavior and nav structure remain.
- Logout: now requires a confirmation step before signing the user out.
- Mobile nav: bottom tab bar (icon-only) with a maximum of 5 items is enabled.
- Light-mode: a light-mode plan has been added as an interchangeable design variant (see "Design Variant — Light Mode Plan" below); structural reference: `docs/Navbar.jpg`.

If you want any of these choices changed (or prefer the archive removed), tell me and I'll update the file.

## Design Variant — Light Mode Plan

Purpose: Provide a fully interchangeable light theme variant that mirrors the dark/glass layout while preserving color semantics and accessibility.

Implementation guidance:
- Implement theme tokens as CSS variables in `src/styles/tokens.css` for both dark and light variants (e.g. `--bg-ground`, `--bg-ground-light`).
- Add a top-level `data-theme="light|dark"` attribute on the `html` element and toggle it from the app settings; Tailwind utility classes should read neutral shades while colors come from CSS variables for easy swapping.
- Keep status colors unchanged (the five fixed status colors remain identical in both themes).
- Adjust glass surface opacity and border contrast for light backgrounds (lighter frosted backdrop, stronger subtle borders to preserve legibility).
- Reference structural layout from `docs/Navbar.jpg` for interchangeable sidebar and bottom-tab placement across themes.


## IMPLEMENTATION SPECIFICATION (DEVELOPER READY)

### 1. MVP Scope
Trackd should launch as a focused, Vite-based product that helps users ingest opportunities, review parsed data, and manage pipeline status across both candidate and recruiter workflows.

Core MVP capabilities:
- Authentication and onboarding
- Profile setup with resume or background details
- Ingestion from URL, pasted text, or browser extension payload
- Inbox review and correction flow
- Confirmed application records with status tracking
- Basic recruiter-side review and notes
- Search, filtering, and simple analytics

Out of scope for the first release:
- Full ATS replacement
- Automatic application submission
- Deep enterprise permissions and workflow automation
- Advanced AI generation beyond basic tailored material previews

### 2. Recommended Stack
- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- Motion: Framer Motion
- State/data: TanStack Query, Zustand, React Hook Form, Zod
- Backend/auth/data: Supabase Auth, Supabase Postgres, Row Level Security
- Optional enrichment service: serverless function or lightweight API for parsing and validation
- AI layer: optional Gemini-based parsing or enrichment in later phases

### 3. Feature Modules
- Auth and onboarding
- Profile setup and resume intake
- Inbox review for unverified records
- Applications board and detail view
- Recruiter review workspace
- Analytics summary and stale-record handling

### 4. Core Data Contracts
- User
- Profile
- JobApplication
- InboxItem
- ApplicationEvent
- ResumeTemplate

Recommended record fields:
- id, user_id, source, job_link, company, role, compensation, timeline, status, status_history, requirements, notes, tags, rating
- recruiter-specific fields such as internal notes, follow-up flags, and assigned owner can be added later

### 5. API Surface
- POST /auth/sign-in
- POST /auth/sign-up
- POST /auth/google
- GET /profile
- POST /profile
- POST /inbox/ingest
- GET /inbox
- POST /inbox/:id/approve
- GET /applications
- GET /applications/:id
- PATCH /applications/:id/status
- POST /applications/:id/events
- GET /analytics/summary

All API calls should return predictable JSON and use standard error codes.

### 6. Lifecycle Rules
- inbox_pending: newly ingested and awaiting review
- bookmarked: saved for later attention
- applied: submitted or queued
- interviewing: active engagement
- rejected: no longer active
- offer: positive outcome
- stale: inactive for too long

Lifecycle behavior:
- Records left unchanged for 10+ days in applied or interviewing states should trigger a follow-up prompt or stale flag
- Records inactive for 30+ days should move to an archive or history view
- Every status or note update should generate an event entry

### 7. Delivery Plan
- Sprint 1: project bootstrapping, auth, onboarding, schema, Supabase setup
- Sprint 2: ingestion, inbox review, record creation, and edit flow
- Sprint 3: board and detail view, recruiter workspace, filtering, notes, and tags
- Sprint 4: analytics, stale handling, testing, and launch hardening

### 8. Risks and Success Metrics
Key risks:
- Parsing quality varies across job sources
- Extension permissions may differ by site
- Scope creep from AI features
- Data quality issues from noisy input

Success metrics:
- Ingestion completion rate
- Review-to-approval conversion rate
- Active records per user
- Weekly status updates
- Free-to-paid conversion rate for premium features

1. PRODUCT VISION & EXECUTIVE ECOSYSTEM SUMMARYTRACKD is an enterprise-grade, two-way job tech platform designed to eliminate candidate maintenance fatigue and automate tracking. It bridges the gap between active job discovery and corporate hiring infrastructure, transforming the job application process from a passive ledger into a live network.  Dual-Role Platform Engine  ┌────────────────────────────────────────────────────────────────────────┐
  │                           TRACKD ECOSYSTEM                             │
  └───────────────────┬────────────────────────────────┬───────────────────┘
                      ▼                                ▼
       ┌──────────────────────────────┐ ┌──────────────────────────────┐
       │   CANDIDATE WORKSPACE        │ │   RECRUITER WORKSPACE        │
       │   • 3-Method Ingestion Stream│ │   • Direct ATS Sync (OAuth)  │
       │   • Explore Deck (Scrapers)  │ │   • Auto-Status Promotion    │
       │   • Real-Time Pipeline View  │ │   • Pre-Vetted Candidate Hub │
       │   • Pro Live Resume Canvas   │ │   • External Board Linkings  │
       └──────────────────────────────┘ └──────────────────────────────┘
A. Candidate (Job Hunter) Architecture3-Method Ingestion Stream: Seamless ingestion through a heavy text-parsing Smart Paste Console, a background browser Extension Crawler, and automated URL Stream Ingestion.  Explore Deck: A unified marketplace board aggregating active job listings scraped continuously from major platforms (LinkedIn, Indeed, Techstars, etc.) served in high-performance batches.  Dynamic Pipeline Workspace: An ultra-fast interface that allows switching instantly between a Kanban Lifecycle Board (5 stages: Saved, Applied, Interviewing, Offer Received, Rejected/Closed), an interactive Dense Table Grid, and a Calendar Timeline mapping critical deadlines.  Pro Suite Workspace: Accessible to premium-tier users, featuring a split-screen Live Resume Canvas for semantic in-app markdown editing, an AI Match Score Gauge, an ATS Keyword Matrix, and an automated Tailored Cover Letter Generator supporting 3 real-time tone modifiers (Professional, Confident, Conversational).  B. Recruiter (Job Provider) ArchitectureUnified ATS Synchronization: Bypasses independent dashboard maintenance by integrating directly into native Applicant Tracking Systems (Greenhouse, Ashby, Lever, Workday).  Frictionless Posting & Links: Allows simple job opportunity creation, immediate candidate search/filtering, and automatic linking out to external job boards.  Ecosystem Feedback Loop: Modifying application status inside the corporate ATS automatically pushes a secure webhook to TRACKD, promoting the candidate's tracking step without requiring manual updates from the user.  2. COMPREHENSIVE ARCHITECTURAL TOPOLOGYTRACKD leverages a high-efficiency layout designed to scale down compute workloads through targeted microservices and direct database policies.       ┌──────────────────────┐             ┌─────────────────────┐
       │ Browser Extension /  │             │   Target Scrapers   │
       │ Candidate Smart Paste│             │  (LinkedIn, Indeed) │
       └──────────┬───────────┘             └──────────┬──────────┘
                  │                                    │
                  ▼                                    ▼
       ┌──────────────────────┐             ┌─────────────────────┐
       │ Stateless Go Engine  │             │ Python Scraper Pods │
       │ (Gemini JSON Parser) │             │  (Batch Extraction) │
       └──────────┬───────────┘             └──────────┬──────────┘
                  │                                    │
                  └─────────────────┬──────────────────┘
                                    ▼
                        ┌──────────────────────┐
                        │ Vite React Frontend /│
                        │  Supabase PostgREST  │
                        └──────────┬───────────┘
                                    ▲
          Webhooks / OAuth Loops    │     (Merge.to / Unified.to)
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                                                               ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  Greenhouse  │         │    Ashby     │         │    Lever     │         │   Workday    │
└──────────────┘         └──────────────┘         └──────────────┘         └──────────────┘
Infrastructure Layer SpecFrontend Framework: Vite React build styled via Tailwind CSS, animated seamlessly with Framer Motion, and managed with TanStack Query (v5).Core Database & Security: Supabase PostgreSQL acting as the central storage engine. Data writes flow directly from the client layer utilizing locked Row Level Security (RLS) policies configured on the authenticated user ID.Stateless Parsing Service: A Go microservice handles heavy string extraction workloads from raw extension streams or smart paste uploads. The service calls the Gemini 1.5 Flash API via native JSON Schema Enforcements to guarantee error-free data formats before writing directly to Supabase.Unified API Integrations: B2B integration platform connections (such as Merge.to, Ampersand, or Unified.to) standardize integration across diverse recruiter enterprise platforms.3. UNIFIED DESIGN SYSTEM & INTERFACE TOKENSThe interface uses a 3D HUD / Command Centre style aesthetic. It balances transparency and dark glass surfaces with clean typographic layouts to maximize readability.Color TokensA. Data Pipeline Lifecycle States (Immutable Data Sourcing)Pipeline Lifecycle StageHEX Target ColorApplication ContextSaved#1D4ED8Kanban Column 1, Spreadsheet Row Pill, Line Donut SegmentApplied#06B6D4Kanban Column 2, Spreadsheet Row Pill, Line Donut SegmentInterviewing#F59E0BKanban Column 3, Spreadsheet Row Pill, Line Donut SegmentOffer Received#10B981Kanban Column 4, Spreadsheet Row Pill, Line Donut SegmentRejected/Closed#EF4444Kanban Column 5, Spreadsheet Row Pill, Line Donut SegmentB. Architectural Theme ElementsUI Application LevelHEX Target ColorPsychological UX Mapping--bg-ground#000871 (Deep Navy)Deep viewport structural layer base.--bg-mid#241571 (Midnight Violet)Base surface layers for sidebars and card wrappers.--brand-primary#2438BD (Persian Blue)High-contrast call-to-actions, active state tabs.--glow-top#52E8FF (Electric Cyan)Focus rings, status-match rings, edge glow filters.--text-tint-1#70B8FF (Argentina Sky)Highly legible secondary labeling text.--border-glassrgba(173, 255, 255, 0.10)Translucent edge highlighting for active containers.Typography StackDisplay & Section Headers: Space Grotesk (Weights: 600, 700). Sleek, geometric font that conveys a technical, data-driven identity.Body, Forms, Copy Elements: Inter (Weights: 400, 500). Optimized for maximum UI copy clarity across dark interfaces.Numerical Readouts & Scores: JetBrains Mono (Weights: 500, 600). Used strictly for metrics, keyword counts, dates, and match score indicators to reinforce the instrument-readout aesthetic.Glass Component SpecificationCSS.glass-surface {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(173, 255, 255, 0.10);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 8, 113, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
4. STRUCTURAL ANALYSIS OF OPERATIONAL FLAWS & ECOSYSTEM MITIGATIONSBuilding a successful marketplace platform requires addressing clear behavioral and technical friction points between both user roles.Structural Flaw 1: Recruiter Portal Inactivity & Dashboard FatigueThe Reality: Corporate recruiters process dozens of applicants daily using core tools like Greenhouse or Ashby. They will not log into an external, isolated consumer app like TRACKD just to check on a candidate or click status updates.Ecosystem Mitigation: TRACKD completely hides the standalone recruiter portal for enterprise customers. Instead, it handles candidate updates programmatically via backend webhooks powered by Merge.to. When an HR manager moves a candidate from "Review" to "Interview Scheduled" inside Greenhouse, an automated webhook loop handles the status change instantly on the candidate's dashboard.  Structural Flaw 2: The Transparency Paradox & Candidate GhostingThe Reality: Candidates want total transparency (e.g., viewing application queue counts or time-spent-in-stage metrics). However, exposing this data can discourage applicants or inadvertently leak internal hiring metrics, leading to pushback from enterprise legal teams.Ecosystem Mitigation: TRACKD implements an asynchronous Dual-Channel Notification Engine. Rather than exposing real-time recruiter queue volumes, it sends deterministic transactional event notices (using services like Resend or in-app activity tickers) only when definitive state shifts occur. This keeps candidate tracking accurate and transparent without over-exposing the internal corporate pipeline.  Structural Flaw 3: Scraper Degradation & Integrity OverheadThe Reality: Automated platform scrapers degrade quickly when target job sites modify their DOM structures, class names, or anti-bot protections. If scraped data yields corrupted stacks or inaccurate salaries, candidate confidence in the Explore Deck drops sharply.Ecosystem Mitigation: TRACKD isolates the scraping framework from the core application layer. It processes jobs through localized, automated scrapers that route extraction payloads to a stateless Go parsing service. The microservice uses Gemini's strict structured JSON schemas to standardize raw data inputs, cross-verify fields against known industry databases, and tag missing values before data ever touches the candidate's workspace.Structural Flaw 4: AI Resume Inflation & Vetting OverheadThe Reality: Providing an in-app canvas that matches resumes to job roles using generative models risks creating an "AI arms race." Candidates can effortlessly generate optimized keywords, flooding recruiters with flawless documents that may misrepresent their actual skill levels.Ecosystem Mitigation: TRACKD addresses this through its signature feature: Pre-Vetted, AI-Calibrated Fit Summaries. Instead of forwarding long, keyword-stuffed PDFs to corporate systems, the platform attaches a verified compatibility scorecard directly to the recruiter's native ATS. This packet breaks down technical skills objectively, validates project source links, and assigns a verified tracking badge. This saves hours of manual review and gives recruiters a strong incentive to support the integration loop.  5. REUSABLE SYSTEM SCHEMAS (PROD-READY CONTRACT DATA MODEL)Ensure all built structures adhere explicitly to this standardized relational database definition schema:TypeScriptexport interface TrackdApplication {
  id: string; // uuid
  candidateId: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  metadata: {
    seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
    workMode: 'Remote' | 'Hybrid' | 'Onsite';
    department: string;
    industry: string;
  };
  compensation: {
    minimum: number;
    maximum: number;
    currency: string; // e.g. "USD", "EUR"
    rateType: 'Salary' | 'Hourly';
  };
  pipelineStatus: 'Saved' | 'Applied' | 'Interviewing' | 'Offer Received' | 'Rejected/Closed';
  ingestionSource: 'SmartPaste' | 'Extension' | 'UrlStream' | 'ExploreDeck';
  timeline: {
    scrapedOrCreatedDate: string; // ISO Timestamp
    submittedDate: string | null;
    interviewDates: string[]; // Dynamic timestamps array
    closingDeadline: string;
  };
  technicalProfile: {
    extractedTechStack: string[];
    aiMatchScore: number; // Monospace Display (JetBrains Mono)
    atsMissingKeywords: string[];
  };
  integrationContext: {
    isAtsSynced: boolean;
    connectedPlatformName: 'Greenhouse' | 'Ashby' | 'Lever' | 'Workday' | 'None';
    lastWebhookSyncTimestamp: string | null;
  };
}

export interface TrackdUserProfile {
  uid: string;
  fullName: string;
  targetTitles: string[];
  minimumExpectedComp: number;
  tier: 'Free' | 'Pro'; // Load bearing gating switch
  parsedResumeMarkdown: string | null;
}
6. THE MASTER BUILD PROMPT FOR CLAUDE AIMarkdown# MASTER BUILD PROMPT: TRACKD SYSTEM ARCHITECTURE GENERATION

You are the Lead Frontend Architect tasked with engineering "TRACKD," an enterprise-grade, two-way job tech platform that bridges candidate discovery pipelines with corporate ATS systems. Implement the entire core codebase utilizing React (Vite environment), Tailwind CSS, Framer Motion, and TanStack Query.

## I. VISUAL SYSTEM IDENTITY & FOUNDATIONS (NON-NEGOTIABLE)

1. Atmosphere Background (Fixed viewport layout):
   radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82, 232, 255, 0.16), transparent 65%),
   linear-gradient(to top, #000871 0%, #0B1148 30%, #182466 55%, #1F2E86 75%, #2438BD 100%)

2. Core Pipeline Stage Identification Colors (Must match application state tracking):
   - Saved:           #1D4ED8 (Persian Structural)
   - Applied:         #06B6D4 (Electric Cyan)
   - Interviewing:    #F59E0B (Amber Warning)
   - Offer Received:  #10B981 (Emerald Success)
   - Rejected/Closed: #EF4444 (Crimson Terminated)

3. Typography Scale:
   - Headings & Titles: Space Grotesk (Weights: 600, 700) - Technical HUD layout look.
   - Body & Label Copy: Inter (Weights: 400, 500) - Clean, neutral readability.
   - Values, Scores, KPIs, Dates: JetBrains Mono - Monospaced readout style.

4. Layout Framework:
   - Sidebar Fixed Left: Collapsed (84px, Icons Only), Expanded (240px, Label Mix). Handles smooth layout shifts via Framer Motion. The drawer-toggle sits at the top of the sidebar.
   - Main Canvas Content Area: Positions to the right of the sidebar. Every distinct route view must open with a sticky header row (Notion-style layout pattern): Route Title on Left, View-Switching Tab Groups or Range Filters on the right.
   - Mobile Response Strategy: Below the md breakpoint, the sidebar collapses down into a fixed bottom tab bar hosting a maximum of 5 essential navigation anchors.

## II. MODULAR ARCHITECTURE REQUISITES

Segment all elements cleanly into independent directories under `src/modules/<module-name>/`. Shared elements live in `src/shared/ui/` (`GlassCard`, `IconChip`, `StatusPill`, `MatchScoreGauge`, `EmptyState`, `Skeleton`). Provide explicit separation of files:

1. Entrance & Onboarding Module (`src/modules/onboarding/`)
   - Interactive hero showcase with a cyber-glow glass display preview.
   - Responsive tab-switched Auth controller container (Sign In / Register) utilizing a sliding Framer Motion variant tracker.
   - A high-fidelity 3-step setup wizard layout collecting target roles, an elegant drag-and-drop file upload target area with mock parsing states, and ATS source authorization toggles.

2. Ingestion & Search Engine Module (`src/modules/ingestion/`)
   - Dual-input interface splitting screen space between a dense code/text Smart Paste console and a clean URL string ingestion field.
   - Side Panel (Framer Motion right-to-left slide animation): Displays extracted job card values categorized into Company, Role, Compensation, and Stack parameters. Field groups feature micro-circular confidence pills (Green: High, Amber: Med, Red: Low) and a prominent "Commit Opportunity to Pipeline" confirmation button.
   - Explore Deck Tab: A high-density marketplace display aggregating batch job listings from major scrapers. Cards offer basic metadata and an "Instant Add to Tracker" action button.

3. Pipeline Command Workspace (`src/modules/dashboard/`)
   - Kanban Board View: Displays 5 columns using the core status identifier colors. Items display company information, a countdown milestone badge, and a top-right corner mini MatchScoreGauge. Cards support removal via an explicit archive or delete click trigger.
   - Spreadsheet Grid View: A dense, filterable TanStack Table matrix layout. Features column sort headers and inline status modification dropdowns. Changing a pipeline status must trigger a reactive state recalculation.
   - Calendar Matrix View: High-fidelity timeline grid calculating exact dates, mapping applied timelines and critical response milestones.

4. Pro Ecosystem Workspace (`src/modules/pro-workspace/`)
   - Contains a global role toggle labeled: [Candidate Mode View / Recruiter Hub Mode].
   - Candidate Mode View (Split-Screen): Left Pane displays a live-rendering, printable markdown resume preview canvas. Right Pane features a multi-tab tool engine hosting a large conic-gradient MatchScoreGauge, an ATS missing keyword checklist, and a Cover Letter generator supporting instantaneous tone shifting through 3 filter modifier chips.
   - Recruiter Hub Mode: Transitions the interface into an automated enterprise desk framework. Features candidate queue lists, profile fit scorecards, and status modification toggles that simulate sending a transactional email webhook via Resend and modifying candidate steps back through an ATS integration.

5. Global Premium Control (`src/shared/ui/ProGate`)
   - Create a reusable structural intercept component checking user tier privileges (`profile.tier: "Free" | "Pro"`). Block entry to Pro features with an overlay premium upsell dialog window when the tier matches "Free".

## III. OPERATIONAL INSTRUCTIONS

- Mock all asynchronous pipeline operations cleanly using a 1-second delay transition state. Showcase micro-loader text updates during extraction and cover letter creation routines.
- Maintain persistent component application state inside a mock database schema mirroring the exact data contract interfaces provided. No external server requests.
- Trigger explicit micro-feedback status alerts using react-hot-toast on any interface updates, card deletions, or column structural movements.
[This comprehensive architectural configuration context file is fully prepared. Use this complete system context document when deploying or processing subsequent application views with Claude AI.]

---

## Integrated Design System & Build Prompt (source: docs/TRACK'D.md)

The following content was imported from `docs/TRACK'D.md` and incorporated here for a single, canonical system design document. Where content duplicated existing sections above, `docs/Trackd.md` was treated as authoritative; this appended material provides the detailed design system, component specs, build prompt, and recommended build sequencing from the companion design doc.

# TRACKD — Design System & AI Build Master Prompt

**Companion to:** `TRACKD_PRD.pdf` (v1.0 Draft, July 2026) and `mockData.ts`
**Purpose:** This is the single document that sits between the PRD and the code. The PRD says *what* TRACKD must do. This document says *what it must look and feel like*, *how the UI is structured into modules*, and *the exact prompt to hand any AI coding agent* to start building it against your existing React + Vite + Tailwind + TanStack + react-icons scaffold and a `json-server` mock.

Read it top to bottom once. After that, treat Section 10 (The Master Build Prompt) as the thing you actually paste into your AI tool at the start of each build session — everything above it is the reasoning you and I did to arrive at that prompt, kept here so either of us can revisit *why* a decision was made.

---

## 0. How This Maps to What You Gave Me

Before designing anything, here's what each source actually contributed — worth stating explicitly so nothing gets designed on vibes alone:

| Source | Role |
|---|---|
| `TRACKD_PRD.pdf` | Authoritative feature scope, the 5-status lifecycle, the 3 dashboard views, the 5 analytics charts, AI Insights + Resume Canvas + Cover Letter specs, and the Phase 1 sprint plan (Weeks 1–12). Every screen in this doc traces back to a numbered PRD section. |
| `mockData.ts` | The actual data contract — `JobApplication`, `UserProfile`, `mockAnalyticsSummary`. Critically, this file **already hardcodes the 5 status colors** (`#1d4ed8`, `#06b6d4`, `#f59e0b`, `#10b981`, `#ef4444`) for the pipeline donut. That's not a moodboard suggestion — it's live in your codebase, so the Kanban columns, table status pills, and calendar dots must reuse these exact values rather than inventing new ones. |
| `Main_Design.png` | Your **primary visual language** — the one you explicitly said to build components from. Dark-to-blue glass gradient background, floating glass panel cards with soft shadow, pill-shaped bottom nav with a glowing gradient active state, rounded glass icon chips. This is the aesthetic anchor for the whole app. |
| `Navbar.jpg` (Velto) | Sidebar structure reference — icon+label nav rows, a persistent action item pinned to the bottom of the nav (their "Help Center"), light content area to the right of a dark sidebar. |
| `Bluu.jpg` (Shades of Blue) | The literal color source. Named, psychologically-grounded blues rather than a generic `slate-900` dark-mode default. |
| `62213...jpg` (Stakent) | Closest mood match to `Main_Design.png` in an actual dashboard context — dark navy shell, glass stat cards with sparklines, icon+label sidebar, a gradient CTA panel, a small account chip pinned above the fold at the bottom of the sidebar. |
| `e58521...webp` | Dense dashboard reference — KPI cards, a bar chart, a donut ("Sales by Category"), and a filterable status-badge table. Structurally, this is your Analytics page + Table view in miniature. |
| `Analtics_dashboard.jpg` | Light-theme, but structurally useful: KPI cards → chart → radial/arc stat → calendar widget → table, in that order. This ordering informs the Analytics page layout even though we invert it to dark/glass. |

---

## 1. Design Direction — Three Named Choices

Rather than default to "dark mode dashboard #0f172a," here are the three deliberate calls this system makes, so you can push back on any of them before we build:

1. **Palette is inherited, not invented.** The 5 status colors are locked from `mockData.ts` (non-negotiable — they're load-bearing data, used in analytics today). Everything else — the background glow, the sidebar, the glass surfaces — is built from the *Shades of Blue* sheet you provided, each hue used for the psychological role it names (Navy for ground/authority, Persian for confidence/CTAs, Electric for alertness/focus states).
2. **Typography reinforces "command centre."** The PRD's own words for TRACKD are "the command centre that fixes the operational problem." So the type system leans HUD/instrument-panel: a geometric display face for headings, a neutral workhorse for body copy, and — distinctively — a monospace face reserved *only* for numbers (match scores, KPIs, dates, timestamps). That third face is what stops this from reading as a generic SaaS dashboard.
3. **One signature motif, reused everywhere.** The match-score gauge (a circular conic-gradient ring) is the single most "TRACKD" visual object in the PRD. Instead of confining it to the Pro page, it echoes at small scale as the active-nav glow in the sidebar and as the corner ambient light on glass cards. One shape, three sizes, tying the whole app together — rather than three unrelated decorative flourishes.

---

## 2. Design System Foundations

### 2.1 Color Tokens

**Status colors — fixed, from `mockData.ts`. Do not restyle these.**

| Status | Hex | Used for |
|---|---|---|
| Saved | `#1d4ed8` | Kanban column 1, table pill, calendar dot, donut segment |
| Applied | `#06b6d4` | Kanban column 2, table pill, calendar dot, donut segment |
| Interviewing | `#f59e0b` | Kanban column 3, table pill, calendar dot, donut segment |
| Offer Received | `#10b981` | Kanban column 4, table pill, calendar dot, donut segment |
| Rejected/Closed | `#ef4444` | Kanban column 5, table pill, calendar dot, donut segment |

**Atmosphere & UI — from the Blue Psychology sheet, each with an assigned job:**

| Token | Hex | Role | Psychology (your sheet) |
|---|---|---|---|
| `--bg-ground` | `#000871` (Navy) | Deepest point of the background gradient, bottom of viewport | Strength, authority, intelligence |
| `--bg-mid` | `#241571` (Midnight) | Sidebar base surface, modal backdrops | Mystery, depth, elegance |
| `--brand-primary` | `#2438BD` (Persian) | Primary buttons, active nav pill, links | Confidence, sophistication, ambition |
| `--brand-secondary` | `#0F52BA` (Sapphire) | Secondary buttons, focus borders | Truth, nobility, loyalty |
| `--glow-mid` | `#007FFF` (Azure) | Mid-gradient stop, hover states | Clarity, freedom, serenity |
| `--glow-top` | `#52E8FF` (Electric) | Top-of-screen glow, focus rings, drag-active highlight | Intensity, innovation, alertness |
| `--accent-info` | `#007BA7` (Cerulean) | Info banners, AI-insight highlights | Inspiration, renewal, clarity |
| `--accent-energy` | `#0AFFFF` (Aqua) | "New"/"AI-suggested" badges — never used for status, to avoid clashing with Offer's emerald | Vibrancy, energy, healing |
| `--text-tint-1` | `#70B8FF` (Argentina) | Secondary text on dark surfaces | Openness, tranquility |
| `--text-tint-2` | `#99CCFF` (Sky) | Muted labels, placeholder text | Lightness, calm, aspiration |
| `--border-glass` | `#ADFFFF` (Celeste) at 8–12% opacity | Glass card borders, dividers | Gentleness, freshness |

**Background gradient (the "ground to glow" spec you described):**

```css
.app-shell {
   background:
      radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82, 232, 255, 0.16), transparent 65%),
      linear-gradient(to top,
         #000871 0%,
         #0B1148 30%,
         #182466 55%,
         #1F2E86 75%,
         #2438BD 100%
      );
   background-attachment: fixed;
   min-height: 100vh;
}
```

Bottom stays dark and authoritative; the top opens into the Electric-blue glow, exactly like the `Main_Design.png` reference. Fixed attachment means the glow doesn't reset per-scroll on long pages (Table/Analytics).

### 2.2 Typography

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Space Grotesk** | Geometric, slightly technical — carries the "command centre" personality. Use 600–700 weight only. |
| Body / UI copy | **Inter** | Neutral, extremely legible at small sizes — this is a data-dense app, body face needs to disappear into the content. |
| Data / numerals | **JetBrains Mono** | Reserved *exclusively* for numbers: match scores, KPI figures, dates, currency, timestamps. This is the signature typographic choice — it's what makes the KPI cards and match-score gauge feel like instrument readouts rather than generic stat cards. |

All three are open-source / free on Google Fonts — no licensing blocker.

### 2.3 The Glass Recipe

Every elevated surface in the app — sidebar, cards, modals, side panel — uses one recipe, so nothing looks like it came from a different kit:

```css
.glass-surface {
   background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
   backdrop-filter: blur(20px);
   -webkit-backdrop-filter: blur(20px);
   border: 1px solid rgba(173, 255, 255, 0.10); /* --border-glass */
   border-radius: 1.25rem; /* rounded-2xl+ */
   box-shadow:
      0 8px 32px rgba(0, 8, 113, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

**Icon chips** (the "padded, popped-out, iOS-glass" look you asked for) use the same recipe at smaller scale:

```css
.icon-chip {
   width: 2.5rem; height: 2.5rem; /* 40px, use 2.75rem for primary nav */
   display: flex; align-items: center; justify-content: center;
   border-radius: 0.875rem; /* rounded-xl */
   transition: transform 150ms ease, box-shadow 150ms ease;
}
.icon-chip:hover { transform: translateY(-2px); }
.icon-chip.active {
   box-shadow: 0 0 0 1px rgba(82,232,255,0.4), 0 0 24px rgba(82,232,255,0.35);
}
```

### 2.4 Spacing, Radius, Motion

- Radius scale: `0.75rem` (chips/badges) → `1.25rem` (cards) → `1.75rem` (sidebar, modals). Nothing sharp-cornered anywhere — it breaks the glass-iOS language.
- Spacing: Tailwind default scale, but card internal padding is fixed at `p-5` (mobile) / `p-6` (desktop) everywhere — consistency here matters more than per-card tuning.
- Motion: transitions only, no page-load choreography. Card hover lift (`translateY(-2px)`), status-pill color transition on drag-drop (200ms), drawer collapse/expand (220ms width transition). Respect `prefers-reduced-motion` — disable the lift and glow-pulse, keep instant state changes.

---

## 3. Layout Architecture

```
┌────┬─────────────────────────────────────────────────────────┐
│ ▤  │  Job Pipeline          [Kanban] [Calendar] [Table]  🔍 🔔│  ← page header: title
│────│─────────────────────────────────────────────────────────│    left, view-switch
│ ⌂  │                                                          │    tabs Notion-style
│ 🗂 │   ╭──────────╮  ╭──────────╮  ╭──────────╮  ╭──────────╮ │    top-right
│ 📊 │   │ Saved    │  │ Applied  │  │Interview │  │  Offer   │ │
│ ✨ │   │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │  │          │ │
│ 👤 │   │ │ card │ │  │ │ card │ │  │ │ card │ │  │  (empty  │ │
│    │   │ └──────┘ │  │ └──────┘ │  │ └──────┘ │  │  state)  │ │
│────│   ╰──────────╯  ╰──────────╯  ╰──────────╯  ╰──────────╯ │
│ ⚙  │                                                          │
│    │                                                          │
│ 👤R│ ← account chip (avatar, name, Free/Pro badge)             │
│ ⎋  │ ← logout, pinned via mt-auto                              │
└────┴─────────────────────────────────────────────────────────┘
   ↑ sidebar: 84px collapsed / 240px expanded
      drawer toggle (▤) sits at the very top, above the logo mark
```

**Sidebar (from `Navbar.jpg` + `62213...jpg`):**
- Drawer toggle icon lives at the top of the sidebar itself — clicking it animates sidebar width between collapsed (icon-only, 84px) and expanded (icon+label, 240px). State persists in memory for the session.
- Nav items: `icon-chip` + label, in a vertical list. Active item gets the glow-ring halo (Section 2.3) plus a 3px left accent bar in that section's theme color.
- Bottom of the nav (flex `mt-auto`, not absolutely positioned — so it always sits at the bottom of whatever viewport height): a divider, then a compact account chip (avatar, name, Free/Pro badge — mirrors Stakent's "Ryan Crawford · PRO"), then **Logout** as its own icon+label row, styled with a subtle red tint on hover so it reads as a distinct, slightly destructive action.

**Main content (to the right, per your spec):**
- Every page opens with a header row: page title on the left, and — where a page has multiple views or filters — icon+label tab buttons on the right (Kanban/Calendar/Table on the Dashboard; date-range filter on Analytics; Summary/Experience/Skills/Education on the Resume Canvas). This is the "Notion-style" pattern you described, applied consistently rather than only on one page.
- All content below the header sits in `glass-surface` cards on top of the ambient gradient. Nothing floats directly on the bare gradient except the header row itself.

**Responsive behavior:** below `md` breakpoint, the sidebar collapses to a fixed bottom tab bar (icon-only, 5 primary items max) — same pattern as `Main_Design.png`'s bottom nav, which already solves this for you visually.

### **On the landing page**
It shouldn't use the app shell at all (no sidebar, no glass dashboard chrome) — it's pre-auth, full-bleed, its own layout, but pulling the same fonts/colors/GlassCard primitives so it doesn't feel like a different product once someone logs in.
Structurally, for TRACKD specifically:

Hero: lead with the PRD's own framing — job hunting is an operational problem, not a motivation problem — paired with a live mini-demo of Smart Paste actually populating fields, not a screenshot. That moment is TRACKD's most differentiated feature; showing it beats describing it.
Problem section: 3–4 beats mirroring §2 (data scattered everywhere, no real performance data, generic materials), written as user-facing copy, not lifted PRD prose.
Product walkthrough: one section per pillar, each with a real in-app screenshot once the design system exists — Kanban, Analytics, AI Insights, Resume Canvas.
Free vs. Pro table — simple, since monetization is a flat freemium split.
Single CTA throughout: "Start Tracking Free" → straight into the 4-step wizard (Sprint 3). No demo booking, no logos-of-customers strip — this is a B2C tool, that stuff would ring false.

On building it exemplary rather than just complete

Get the shared primitives (GlassCard, MatchScoreGauge, IconChip) right before anything else — they're now load-bearing across every module, so a small flaw compounds instead of staying local.
Build against messy data early, which is exactly why I just expanded the mock to 15 jobs — an empty Saved column, an overflowing Interviewing column, a red-zone match score, a deadline three days out. Those edge cases need to exist on day one, not get discovered in Sprint 6.
Treat empty states and the "your analytics are stale" warning (§6.2) as real product surfaces, not afterthoughts — the PRD calls them out explicitly for a reason.
Wire Analytics against real status-change events from the start, even against json-server, so it has genuine behavior to visualize instead of being bolted on at Sprint 6.
Keep the AI's own voice honest — "a tool, not a verdict" per §7.1. That restraint should show up in how match scores, empty states, and error copy are all worded, not just in the AI panel.
Use the Kanban board as your running bar for "does this feel as considered as the rest of the app" — it's first, it's most visible, and it's the thing every other screen should be measured against.

---

## 4. Information Architecture — Screen Inventory

| # | Screen | PRD Section | Notes |
|---|---|---|---|
| 0 | Landing Page |
| 1 | Onboarding (4-step wizard) | Sprint 3 | Resume upload → extraction → confirm profile → done |
| 2 | Ingestion (Smart Paste / URL) + Side Panel | §4, §4.3 | Side panel slides from the right, confidence-colored fields |
| 3 | Dashboard — Kanban (default) | §5.1 | 5 fixed columns, drag-and-drop, per-card match score badge (Pro) |
| 4 | Dashboard — Calendar | §5.2 | Applied-date + deadline markers, month/week/day |
| 5 | Dashboard — Table | §5.3 | TanStack Table, inline status edit, bulk actions |
| 6 | Analytics | §6 | 4 KPI cards + 5 charts, date-range filter (30/90/All) |
| 7 | Pro Page — AI Insights | §7 | Match score gauge, ATS keyword risk, bullet suggestions |
| 8 | Pro Page — Resume Canvas | §8.1 | Split pane: live preview + tabbed editor |
| 9 | Pro Page — Cover Letter | §8.2 | Tone selector, generate, editable output |
| 10 | Profile / Settings | §8.3, US-12 | Career prefs, resume re-upload, plan status |
| 11 | ProGate modal (global) | US-11 | Shown over any Pro feature when the user is Free tier |

---

## 5. Modular Component Architecture

Per your instruction — every stage/module is self-contained, Tailwind-first, with its own `index.css` for anything Tailwind utilities can't express cleanly (font-face, CSS variables, the one or two bespoke glass/gauge rules per module).

```
src/
├── styles/
│   ├── tokens.css            # :root variables from Section 2.1, font-face imports
│   └── index.css              # @tailwind base/components/utilities + tokens.css import
│
├── layout/
│   ├── AppShell/
│   │   ├── AppShell.jsx        # gradient background wrapper, grid: sidebar | main
│   │   └── index.css
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   ├── SidebarNavItem.jsx
│   │   ├── AccountChip.jsx
│   │   └── index.css           # drawer width transition, active-glow rule
│   └── PageHeader/
│       ├── PageHeader.jsx      # title + slot for view-tabs/filters
│       ├── ViewTabs.jsx         # the Notion-style icon+label switch
│       └── index.css
│
├── shared/
│   ui/
│   │   ├── GlassCard.jsx
│   │   ├── IconChip.jsx
│   │   ├── StatusPill.jsx      # reads the 5 fixed status colors
│   │   ├── MatchScoreGauge.jsx # the signature motif, sized via prop
│   │   ├── EmptyState.jsx
│   │   ├── Skeleton.jsx
│   │   └── index.css
│   ├── hooks/
│   │   ├── useJobs.js          # TanStack Query: list/create/update job
│   │   ├── useProfile.js
│   │   └── useAnalytics.js
│   └── lib/
│       ├── apiClient.js        # base fetch wrapper, points at json-server
│       ├── statusMachine.js    # the allowed-transitions matrix, §5.4 — single source of truth
│       └── formatters.js       # currency, relative dates
│
├── modules/
│   ├── ingestion/
│   │   ├── components/ (SmartPasteInput, UrlInput, IngestionSidePanel, ConfidenceField)
│   │   └── index.css
│   ├── dashboard/
│   │   ├── kanban/
│   │   │   ├── components/ (KanbanBoard, KanbanColumn, KanbanCard)
│   │   │   └── index.css       # column tint per status, drag-active ring
│   │   ├── calendar/
│   │   │   ├── components/ (CalendarView, DeadlineMarker, QuickViewModal)
│   │   │   └── index.css       # FullCalendar theme overrides
│   │   └── table/
│   │       ├── components/ (JobsTable, StatusDropdownCell, BulkActionsBar)
│   │       └── index.css       # TanStack Table row/cell overrides
│   ├── analytics/
│   │   ├── components/ (KpiCard, ApplicationsOverTimeChart, PipelineDonut, SourceBarChart, TopRolesList, TimeInStageCards)
│   │   └── index.css
│   ├── pro-insights/
│   │   ├── components/ (MatchScorePanel, AtsKeywordRisk, BulletSuggestionChip)
│   │   └── index.css
│   ├── resume-canvas/
│   │   ├── components/ (ResumePreviewPane, ContentEditorTabs, SuggestionChip)
│   │   └── index.css
│   ├── cover-letter/
│   │   ├── components/ (ToneSelector, GeneratedLetterEditor)
│   │   └── index.css
│   └── profile/
│       ├── components/ (ProfileForm, ResumeReuploadCard, PlanBadge)
│       └── index.css
│
└── app/
      ├── routes/ (one file per screen in Section 4, thin — compose module components)
      └── providers/ (QueryClientProvider, AuthProvider stub)
```

**Convention:** each module's `index.css` is scoped under a single root class matching the module (e.g. `.kanban-board { ... }` using `@layer components { @apply ... }`), imported only by that module's own components. Nothing in a module's CSS should ever need to reach outside its own root class — if it does, that rule belongs in `shared/ui` instead.

---

## 6. Signature Component Specs

**KanbanCard** (built from `mockJobs` shape + the `Main_Design.png` glass-card language):
- `glass-surface`, 3px left accent bar in the card's status color
- Header row: `companyLogoUrl` in a small `icon-chip`, `jobTitle` (Space Grotesk, 600), `companyName` (Inter, muted)
- Meta row: `seniorityLevel` + `workMode` as small pills
- Corner: `matchScore` as a mini `MatchScoreGauge` (Pro only — hidden with a lock glyph for Free)
- Footer row: `source` icon + `appliedDate` (JetBrains Mono), `deadline` as a countdown chip that shifts from Sky → amber → red as it approaches
- Drag handle affordance appears on hover only

**MatchScoreGauge** (the signature motif): conic-gradient ring, color interpolated red→amber→green per the PRD's own thresholds (< 40 red, 40–69 amber, ≥ 70 green), center shows the score in JetBrains Mono. Three sizes: `sm` (kanban corner badge), `md` (table cell), `lg` (Pro page hero).

**KpiCard**: `glass-surface`, label in Inter/Sky, value in JetBrains Mono at display size, small trend indicator reusing the status-color logic (green up / red down) — matches the "This month vs last" pattern from `Analtics_dashboard.jpg` and `e58521...webp`.

---

## 7. Data Contracts & Mock Server Setup

Your `db.json` for `json-server`, derived directly from `mockData.ts` (no shape changes — it's already clean):

```json
{
   "jobs": [ /* mockJobs array, as-is */ ],
   "profile": { /* mockProfile object, as-is */ },
   "analyticsSummary": { /* mockAnalyticsSummary object, as-is */ }
}
```

- `jobs` is an array → json-server gives you full REST + filtering/sorting for free: `GET /jobs?status=Interviewing`, `GET /jobs?_sort=deadline&_order=asc`.
- `profile` and `analyticsSummary` are top-level objects (not arrays) → json-server automatically serves them as **singular resources**: `GET /profile`, `PUT /profile` — no `/profile/:id` needed.
- **Known divergence to flag now:** in production, `analyticsSummary` will be computed live by the Go backend from Firestore, not stored. Keep it static in the mock for now, but don't wire any "edit analytics" UI against it — it exists only so the Analytics screens have real numbers to render against during frontend build.
- Add one field the mock doesn't have yet but the PRD requires for US-11 (ProGate): `profile.tier: "Free" | "Pro"`. Toggle it manually in `db.json` to test both gated and ungated states without needing real auth yet.

**TanStack Query hook plan:**
- `useJobs()` → `queryKey: ['jobs']`, powers Kanban/Calendar/Table simultaneously (single source, three views)
- `useUpdateJobStatus()` → mutation with optimistic update; also appends a client-side `historyLog` entry so the Kanban→Analytics loop is testable before the real backend logs transitions
- `useProfile()`, `useAnalyticsSummary()` — straightforward reads

**`statusMachine.js`** — encode the PRD §5.4 transition table once, use it everywhere status can change (Kanban drop target validation, Table's inline dropdown options):
```js
export const ALLOWED_TRANSITIONS = {
   Saved: ['Applied', 'Rejected/Closed'],
   Applied: ['Interviewing', 'Rejected/Closed'],
   Interviewing: ['Offer Received', 'Rejected/Closed'],
   'Offer Received': [],
   'Rejected/Closed': [],
};
```

---

## 8. Open Decisions Before Build

A short list of things I assumed — flag any you want changed before this goes into a build prompt for real:

1. **Sidebar collapsed width** — assumed 84px (icon-only, still shows tooltips on hover). Confirm that's tight enough / not too tight.
2. **Dark-only vs. light toggle** — everything above assumes TRACKD is dark-glass only, no light theme. The PRD doesn't mention a light mode; confirming that's intentional.
3. **Logout confirmation** — assumed no confirm modal (single click, matches most SaaS apps). Flag if you want a confirm step.
4. **Mobile sidebar** — assumed bottom tab bar with 5 items max below `md`. If you have more than 5 top-level nav destinations once Settings/Profile are added, we need a "More" overflow item.

---

## 9. Recommended Build Sequence

The PRD's Sprint plan (Section 12) is a **full-stack** plan — Go router, Firestore, Gemini, etc. run in parallel with frontend. Since you're building the UI against `json-server` + mock data right now, here's the frontend-specific sequencing that de-risks the PRD's Sprint 4 crunch (Kanban + Calendar + Table all due in a 2-week window) by starting UI work earlier than the backend track requires it:

| Phase | Maps to PRD Sprint | Deliverable |
|---|---|---|
| **0 — Foundations** | Parallel to Sprint 1 (Weeks 1–2) | Design tokens (`tokens.css`), `AppShell`, `Sidebar` with drawer toggle + logout, `json-server` running against the `db.json` above. This is pure frontend and has zero backend dependency — start it immediately rather than waiting for Sprint 1's auth work to land. |
| **1 — Core shared UI** | Parallel to Sprint 1–2 | `GlassCard`, `IconChip`, `StatusPill`, `MatchScoreGauge`, `EmptyState`, `Skeleton` — build these once, correctly, before any module consumes them. |
| **2 — Kanban** | Aligns with Sprint 4, but start early | Highest-value, most-visible screen. Build against mock `jobs` data — drag-and-drop, status transitions via `statusMachine.js`, optimistic updates. This can be demo-ready well before Sprint 4 if started in parallel with Phase 0/1. |
| **3 — Table + Calendar** | Sprint 4 | Same underlying `useJobs()` hook as Kanban — proves the "three views, one data source" requirement from §5. |
| **4 — Ingestion + Side Panel** | Sprint 2 (backend), frontend can mock the Gemini response shape and build the confidence-indicator UI without waiting on the real endpoint. |
| **5 — Analytics** | Sprint 6, but the static `analyticsSummary` mock means charts can be built any time after Phase 1 — don't wait until Sprint 6 to start. |
| **6 — Pro Page (Insights + Resume Canvas + Cover Letter)** | Sprint 5 | Heaviest module — build `MatchScorePanel` and `ResumeCanvas` split-pane last, since they lean on the signature gauge and the most editing-heavy UI in the app. |
| **7 — Profile/Onboarding + ProGate** | Sprint 3 | Can trail behind Kanban — lower visual risk, well-understood pattern (form + wizard). |
| **8 — Polish pass** | Sprint 6 | Empty states, loading skeletons, error boundaries, `prefers-reduced-motion`, WCAG 2.1 AA pass (PRD §10 — this is a hard NFR, not optional). |

**The single biggest schedule win available to you:** because every mock resource (`jobs`, `profile`, `analyticsSummary`) already matches the real Firestore document shape from `mockData.ts`, the entire frontend in Phases 0–6 can be built and demoed to stakeholders *before* the Go backend or Gemini integration exists at all. When Sprint 2's real ingestion endpoint lands, you swap `apiClient.js`'s base URL and nothing else changes.

---

## 10. The Master Build Prompt

Copy everything in the fenced block below into a fresh AI coding session (Claude Code or otherwise) once your React + Vite + Tailwind + TanStack + react-icons scaffold and `json-server` are running. It's self-contained — it doesn't assume the AI has read the rest of this document.

```markdown
# TRACKD — Frontend Build Instructions

You are building the frontend UI for TRACKD, an AI job-application tracker, on top of an
existing React + Vite + Tailwind + TanStack (Query + Table) + react-icons scaffold. Data comes
from a `json-server` instance serving three resources: `jobs` (array), `profile` (object),
`analyticsSummary` (object) — shapes defined in `mockData.ts`, already in the repo. Do not
alter that data shape.

## Non-negotiable design tokens

Background (apply once, at the app-shell level, fixed):
   radial-gradient(ellipse 120% 60% at 50% 0%, rgba(82,232,255,0.16), transparent 65%),
   linear-gradient(to top, #000871 0%, #0B1148 30%, #182466 55%, #1F2E86 75%, #2438BD 100%)

Status colors — FIXED, sourced from mockData.ts, used identically across Kanban/Table/Calendar/
Analytics. Never restyle these:
   Saved            #1d4ed8
   Applied          #06b6d4
   Interviewing     #f59e0b
   Offer Received   #10b981
   Rejected/Closed  #ef4444

UI/atmosphere palette (from a Blue Psychology reference — use for everything that is NOT a
status color):
   --bg-ground      #000871
   --bg-mid         #241571
   --brand-primary  #2438BD
   --brand-secondary #0F52BA
   --glow-mid       #007FFF
   --glow-top       #52E8FF
   --accent-info    #007BA7
   --accent-energy  #0AFFFF
   --text-tint-1    #70B8FF
   --text-tint-2    #99CCFF
   --border-glass   rgba(173,255,255,0.10)

Typography:
   Display/headings → Space Grotesk, 600-700 weight only
   Body/UI          → Inter
   Numbers ONLY (scores, KPIs, dates, currency, timestamps) → JetBrains Mono
   All three via Google Fonts, self-host or @import — no licensing issue.

Glass surface recipe (every elevated panel — sidebar, cards, modals, side panel):
   background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
   backdrop-filter: blur(20px);
   border: 1px solid rgba(173,255,255,0.10);
   border-radius: 1.25rem;
   box-shadow: 0 8px 32px rgba(0,8,113,0.35), inset 0 1px 0 rgba(255,255,255,0.06);

Icon chips (nav items, card headers): 40-44px square, rounded-xl, same glass recipe at smaller
scale, hover = translateY(-2px), active = 0 0 24px rgba(82,232,255,0.35) glow ring.

Signature motif: a circular conic-gradient "match score gauge" — red below 40, amber 40-69,
green 70+, JetBrains Mono numeral centered. Build it once as <MatchScoreGauge size="sm|md|lg" />
and reuse it as: (a) a small badge on Kanban card corners, (b) a cell in the Table view,
(c) the hero element on the Pro Insights page. This is the one recurring visual signature —
don't introduce competing decorative motifs elsewhere.

## Layout — non-negotiable

- Sidebar, fixed left. Collapsed = 84px icon-only, expanded = 240px icon+label. A drawer-toggle
   icon sits at the TOP of the sidebar (above/beside the logo) and controls this state.
- Sidebar nav items: icon-chip + label, active state gets a 3px left accent bar + glow-ring halo.
- Bottom of sidebar (flex, mt-auto — not absolute positioning): divider → compact account chip
   (avatar, name, Free/Pro badge from profile.tier) → Logout as its own icon+label row with a
   subtle red-tinted hover.
- Main content sits to the RIGHT of the sidebar. Every page opens with a header row: page title
   left, icon+label view-switch tabs or filters right (Notion-style pattern) — e.g. Kanban /
   Calendar / Table tabs on the Dashboard page, a date-range filter on Analytics.
- All content below the header row lives in glass-surface cards. Nothing sits directly on the
   bare gradient except the header row.
- Below the `md` breakpoint, the sidebar collapses into a fixed bottom tab bar, icon-only,
   max 5 items.

## Module architecture — non-negotiable

Build every screen as a self-contained module under src/modules/<name>/, each with its own
components/ folder and its own index.css. The index.css should hold ONLY what Tailwind
utilities can't express cleanly (font-face imports go in styles/tokens.css once, not per
module) — e.g. the conic-gradient gauge rule, a drag-active ring, FullCalendar/TanStack Table
theme overrides. Scope every module's CSS under a single root class matching the module name
(e.g. `.kanban-board { @apply ...; }`) so nothing leaks across modules. Shared primitives
(GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton) live once in
src/shared/ui/ and are imported by every module — do not reimplement them per module.

Folder tree to create:
   src/styles/{tokens.css, index.css}
   src/layout/{AppShell, Sidebar, PageHeader}/  (each with index.css)
   src/shared/ui/  (GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton + index.css)
   src/shared/hooks/  (useJobs, useProfile, useAnalytics — TanStack Query)
   src/shared/lib/  (apiClient.js, statusMachine.js, formatters.js)
   src/modules/ingestion/
   src/modules/dashboard/{kanban, calendar, table}/
   src/modules/analytics/
   src/modules/pro-insights/
   src/modules/resume-canvas/
   src/modules/cover-letter/
   src/modules/profile/

## Data & status rules — non-negotiable

- Encode the allowed status transitions ONCE in shared/lib/statusMachine.js:
      Saved -> [Applied, Rejected/Closed]
      Applied -> [Interviewing, Rejected/Closed]
      Interviewing -> [Offer Received, Rejected/Closed]
      Offer Received -> [] (terminal)
      Rejected/Closed -> [] (terminal)
   Both the Kanban drag-drop validation and the Table's inline status dropdown must import
   and use this single file — never duplicate the transition rules.
- jobs is an array resource in json-server (GET/POST/PATCH /jobs), profile and
   analyticsSummary are singular object resources (GET/PUT /profile, GET /analyticsSummary,
   no /:id). Build shared/lib/apiClient.js as a thin fetch wrapper pointed at the json-server
   base URL so swapping to the real Go backend later is a one-line change.
- profile.tier ("Free" | "Pro") gates all Pro features. Any Pro-only UI (match score, ATS
   analysis, resume canvas, cover letter) must check this and render a ProGate modal/upsell
   instead of the feature when tier is "Free" — build ProGate as one shared component, not
   per-module upsell copy.

## Build order

1. AppShell + Sidebar + design tokens + json-server wiring (no feature logic yet)
2. shared/ui primitives (GlassCard, IconChip, StatusPill, MatchScoreGauge, EmptyState, Skeleton)
3. Kanban board (dnd-kit) — highest-value, most visible screen, build and polish this first
4. Table (TanStack Table) + Calendar (FullCalendar) — same useJobs() data source as Kanban
5. Ingestion Smart Paste UI + side panel (mock the parsed-field shape if the real endpoint
    isn't ready)
6. Analytics (Recharts) — 4 KPI cards + 5 charts against the static analyticsSummary mock
7. Pro Insights panel + Resume Canvas split-pane + Cover Letter generator
8. Profile/onboarding + ProGate modal
9. Polish pass: empty states, loading skeletons, error boundaries, prefers-reduced-motion,
    WCAG 2.1 AA keyboard focus and contrast check

Work through this list module by module. After each module, stop and show the result before
starting the next — don't build multiple modules silently in one pass.
```

---

That's the full research-to-prompt package. When you're ready to actually start building, hand the fenced block in Section 10 to your AI coding tool and work through the build order one module at a time — starting with Phase 0 (App Shell + Sidebar) costs you nothing while the rest of the team is still on Sprint 1.

