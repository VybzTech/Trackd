# TRACKD — Frontend Architecture Documentation

**Project Title:** TRACKD — AI-Powered Job Application Tracker
**Prepared By:** VybzTech Inc.
**Document Version:** 1.0 (Draft)
**Date Prepared:** June 2026
**Classification:** CONFIDENTIAL

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Project Structure](#2-project-structure)
3. [Route Architecture](#3-route-architecture)
4. [State Management](#4-state-management)
5. [Component Architecture](#5-component-architecture)
6. [Design System](#6-design-system)
7. [API Integration Layer](#7-api-integration-layer)
8. [Performance Standards](#8-performance-standards)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Browser Support](#10-browser-support)

---

## 1. Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | React | 18.x | Component-based; large ecosystem; concurrent features for UI responsiveness |
| Build Tool | Vite | 5.x | Fast HMR; optimised production bundles; replaces CRA |
| Language | TypeScript | 5.x | Type safety across API contracts, component props, and Zustand stores |
| Styling | Tailwind CSS | 3.x | Utility-first; consistent design tokens; eliminates custom CSS maintenance |
| Animations | Framer Motion | 11.x | Declarative animations for view transitions, side panel slide-in, and card interactions |
| Global State | Zustand | 4.x | Lightweight client-side state store; avoids Redux boilerplate at this scale |
| Server State | TanStack Query | 5.x | Server state caching, background refetch, and optimistic updates |
| Routing | React Router | 6.x | Declarative nested routes; layout-level route protection |
| Forms | React Hook Form | 7.x | Performant uncontrolled form management; paired with Zod for schema validation |
| Validation | Zod | 3.x | Runtime schema validation for all form inputs and API response parsing |
| Charts | Recharts | 2.x | React-native charting; responsive containers; composable chart primitives |
| Calendar | FullCalendar | 6.x | Full-featured calendar with drag-and-drop event support |
| Drag & Drop | dnd-kit | 6.x | Accessible, keyboard-navigable drag-and-drop for the Kanban board |
| Tables | TanStack Table | 8.x | Headless table engine; sorting, filtering, and pagination built in |
| PDF Preview | react-pdf | 7.x | Client-side PDF canvas rendering for the resume preview in the canvas pane |
| Icons | Lucide React | Current | Consistent icon set; tree-shakeable; matches the design system aesthetic |
| Auth | Firebase JS SDK | 10.x | Client-side Firebase Auth; Google OAuth and email/password flows |
| Toast Notifications | Sonner | Current | Lightweight, accessible toast library; supports promise-based toasts for async actions |

---

## 2. Project Structure

```
src/
├── app/
│   ├── router.tsx              # All route definitions
│   ├── providers.tsx           # Wrapped providers: QueryClient, Auth, Theme
│   └── main.tsx                # Application entry point
│
├── pages/
│   ├── Landing/
│   ├── Auth/
│   │   ├── Login/
│   │   └── Signup/
│   ├── Onboarding/
│   ├── Ingestion/
│   ├── Dashboard/
│   ├── Analytics/
│   ├── Profile/
│   ├── ProPage/
│   └── Pricing/
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageHeader.tsx
│   ├── auth/
│   │   ├── ProtectedRoute.tsx
│   │   └── ProGate.tsx
│   ├── ingestion/
│   ├── dashboard/
│   │   ├── kanban/
│   │   ├── calendar/
│   │   └── table/
│   ├── analytics/
│   ├── pro/
│   │   ├── canvas/
│   │   ├── editor/
│   │   └── insights/
│   └── shared/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ConfirmModal.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       └── Toast.tsx
│
├── stores/
│   ├── auth.store.ts
│   ├── jobs.store.ts
│   ├── ingestion.store.ts
│   └── ui.store.ts
│
├── hooks/
│   ├── useJobs.ts
│   ├── useIngestion.ts
│   ├── useAnalytics.ts
│   ├── useProPage.ts
│   └── useAuth.ts
│
├── services/
│   ├── api.client.ts           # Base axios/fetch instance with auth headers
│   ├── jobs.service.ts
│   ├── ingestion.service.ts
│   ├── analytics.service.ts
│   ├── pro.service.ts
│   └── user.service.ts
│
├── types/
│   ├── job.types.ts
│   ├── user.types.ts
│   ├── analytics.types.ts
│   └── api.types.ts
│
├── utils/
│   ├── date.utils.ts
│   ├── status.utils.ts
│   └── format.utils.ts
│
└── styles/
    └── globals.css             # Tailwind base imports; CSS custom properties
```

---

## 3. Route Architecture

| Route | Page Component | Auth Level | Notes |
|---|---|---|---|
| / | LandingPage | Public | Marketing page; CTA to /auth/signup |
| /auth/login | LoginPage | Public | Redirects to /dashboard if already authenticated |
| /auth/signup | SignupPage | Public | Redirects to /onboarding after successful registration |
| /onboarding | OnboardingFlow | Authenticated | Shown only if user.onboardingComplete === false; skips to /dashboard otherwise |
| /ingest | IngestionPage | Authenticated | — |
| /dashboard | DashboardPage | Authenticated | Defaults to Kanban view; view preference persisted in localStorage |
| /analytics | AnalyticsPage | Authenticated | — |
| /profile | ProfilePage | Authenticated | — |
| /jobs/:id | ProPage | Authenticated | ProGate wrapper checks plan; Free users see upgrade modal |
| /pricing | PricingPage | Public | Free vs Pro comparison; upgrade CTA links to billing |

### Route Protection

```
<ProtectedRoute>
  Checks: Firebase Auth currentUser exists
  On fail: Redirect to /auth/login with returnTo query param
</ProtectedRoute>

<ProGate jobId={params.id}>
  Checks: currentUser.plan === "pro"
  On fail: Renders ProUpgradeModal overlay
  On pass: Renders ProPage content
</ProGate>
```

---

## 4. State Management

### 4.1 Architecture Decision

Server state (remote data) is managed exclusively by TanStack Query. Client-side UI state is managed by Zustand. These two concerns are intentionally separated — server data does not live in Zustand stores, and Zustand stores do not trigger API calls.

### 4.2 Zustand Stores

**auth.store.ts**

| Field | Type | Description |
|---|---|---|
| currentUser | FirebaseUser \| null | The signed-in Firebase user object |
| plan | "free" \| "pro" | User's current subscription tier |
| onboardingComplete | boolean | Whether the onboarding flow has been completed |
| loading | boolean | Auth state loading flag |

**jobs.store.ts**

| Field | Type | Description |
|---|---|---|
| viewMode | "kanban" \| "calendar" \| "table" | Active dashboard view; persisted to localStorage |
| activeJobId | string \| null | Currently focused job for Pro page context |
| filters | JobFilters | Active filter state for table view |
| selectedJobIds | string[] | Selected rows for bulk actions in table view |

**ingestion.store.ts**

| Field | Type | Description |
|---|---|---|
| rawInput | string | Contents of the Smart Input Area |
| parsedData | ParsedJobData \| null | The structured output from the parse API call |
| confidence | ConfidenceMap | Per-field confidence ratings from the parse response |
| panelOpen | boolean | Whether the side panel is visible |
| commitStatus | "idle" \| "loading" \| "success" \| "error" | State of the commit action |

**ui.store.ts**

| Field | Type | Description |
|---|---|---|
| sidebarCollapsed | boolean | Sidebar expansion state; persisted to localStorage |
| activeModal | string \| null | ID of the currently open modal |
| theme | "light" \| "dark" | User theme preference; persisted to localStorage |

### 4.3 TanStack Query Keys

| Key | Scope | Data Fetched |
|---|---|---|
| ["jobs"] | Global | All jobs for the authenticated user |
| ["jobs", jobId] | Per job | Single job document |
| ["analytics", "summary"] | Global | KPI card values |
| ["analytics", "timeline", { from, to, groupBy }] | Parameterised | Timeline chart data |
| ["analytics", "breakdown"] | Global | Status, source, and role breakdown data |
| ["user", "profile"] | Global | Authenticated user's full profile |
| ["pro", jobId, "insights"] | Per job | Match score, missing skills, ATS risk |
| ["pro", jobId, "resume"] | Per job | AI resume bullet suggestions |

### 4.4 Cache Invalidation Rules

| Trigger | Invalidated Keys |
|---|---|
| Job status updated | ["jobs"], ["jobs", jobId], ["analytics", "summary"], ["analytics", "timeline", *], ["analytics", "breakdown"] |
| New job committed | ["jobs"], all ["analytics", *] |
| Job archived or deleted | ["jobs"], all ["analytics", *] |
| User profile updated | ["user", "profile"] |
| AI insights generated | ["pro", jobId, "insights"] |
| Resume confirmed after upload | ["user", "profile"] |

---

## 5. Component Architecture

### 5.1 Layout Components

**AppShell**

- Renders the Sidebar and a main content area
- Wraps all authenticated pages
- Handles mobile sidebar toggle via ui.store

**Sidebar**

| Element | Behaviour |
|---|---|
| Logo | Links to /dashboard |
| Nav Links | Ingest, Dashboard, Analytics, Profile — active link highlighted via React Router's NavLink |
| Plan Badge | Shows "FREE" or "PRO" badge; clicking "FREE" navigates to /pricing |
| Collapse Toggle | Collapses sidebar to icon-only mode; state persisted to localStorage |
| User Avatar | Shows auth user photo or initials; click opens a dropdown with Profile link and Sign Out |

**PageHeader**

- Accepts title, subtitle, and an optional actions slot (right-aligned buttons)
- Used consistently on every page for visual rhythm

### 5.2 Ingestion Components

**SmartInputArea**

| Behaviour | Detail |
|---|---|
| Paste detection | onPaste event fires; auto-populates field; sets rawInput in ingestion.store |
| URL detection | Regex checks if pasted string begins with http:// or https:// on change |
| Character count | Displayed below the textarea; Parse button disabled below 20 characters |
| Keyboard shortcut | Ctrl/Cmd + Enter triggers Parse if the button is enabled |

**SidePanel**

| Behaviour | Detail |
|---|---|
| Animation | Framer Motion slide-in from right (translateX: 100% → 0); 250ms ease |
| Field groups | Role, Company, Compensation, Timeline, Technical Requirements — each collapsible |
| Confidence indicators | Green / amber / red dot adjacent to the field label |
| Empty state | If no fields parsed, panel shows a gentle prompt: "We couldn't extract enough data. Try pasting the full job description." |

**FieldInput**

- Controlled input synced to the parsedData object in ingestion.store
- Confidence colour reflected as a left border accent on each input
- All fields optional — users may leave any field blank

### 5.3 Dashboard Components

**ViewSwitcher**

- Segmented control: Kanban / Calendar / Table
- Selection updates viewMode in jobs.store and persists to localStorage
- Smooth content transition via Framer Motion AnimatePresence

**KanbanBoard**

| Behaviour | Detail |
|---|---|
| Library | dnd-kit (DndContext, SortableContext, useSortable) |
| Drop zones | Five columns, each a droppable container |
| Drag events | onDragEnd fires the PATCH /jobs/:id API call with the new status |
| Optimistic update | TanStack Query optimistic update applied immediately; reverted on error |
| Empty columns | Show a ghost card with a "+ Add Job" prompt linking to the Ingestion page |

**JobCard**

| Element | Detail |
|---|---|
| Company logo | Auto-fetched via Clearbit Logo API or favicon fallback |
| Status badge | Colour-coded pill matching the column colour |
| Match score | Circular mini-gauge (Pro only); hidden for Free users |
| Context menu | Triggered by kebab icon or right-click: View Pro Page, Archive, Delete |
| Click target | Clicking the card body (not the context menu) navigates to /jobs/:id |

**JobTable**

| Behaviour | Detail |
|---|---|
| Engine | TanStack Table v8 headless |
| Sorting | Click column header; icon indicates sort direction |
| Filtering | Filter bar above table; multi-select chips for Status and Source |
| Row selection | Checkbox per row; header checkbox for select all |
| Bulk actions | Toolbar appears when rows are selected: Archive Selected, Delete Selected |
| Pagination | 25 rows per page; cursor-based pagination via /jobs?cursor= |

### 5.4 Analytics Components

**KPICard**

- Displays a single metric: label, value, and a trend indicator (up/down arrow with percentage change vs. previous period)
- Four cards in a responsive 2×2 or 4×1 grid

**TimelineChart**

- Recharts AreaChart
- Responsive container wrapping
- Tooltip shows exact count per week/month on hover
- Grouping toggle (week / month) in the chart header

**PipelineDonut**

- Recharts PieChart with innerRadius set to donut proportion
- Legend below chart
- Clicking a segment filters the jobs list (via jobs.store filters)

**SourceBar**

- Recharts BarChart (horizontal layout)
- Sources sorted by count descending

### 5.5 Pro Page Components

**ProPageLayout**

- ResizablePanel split: left 55%, right 45%
- Resize handle allows user to adjust split manually
- On viewport width < 1024px: tabs replace the split (Resume / Editor / Insights)

**ResumeCanvas**

- react-pdf Document component rendering the resume template
- Template populated from the confirmed UserProfile plus accepted AI edits
- Live re-renders when content state changes (debounced at 150ms to prevent excessive renders)
- Download button calls GET /pro/:jobId/resume/download and triggers browser file save

**ContentEditor**

| Tab | Content |
|---|---|
| Summary | Single textarea; AI suggestion chip appears above if available |
| Experience | List of ExperienceEntry items; each role has an expandable bullet list; bullets are individually editable textareas |
| Skills | Tag input; AI flags missing skills from the job description in amber |
| Education | Simple form fields: institution, degree, year |

**AISuggestionChip**

| Element | Behaviour |
|---|---|
| Suggested text | Displayed in a shaded chip above the relevant field |
| Accept button | Replaces field content; chip disappears; change tracked in local accepted edits state |
| Dismiss button | Hides chip without changing content; dismissed state persisted for the session |

**AIInsightsPanel**

| Element | Detail |
|---|---|
| Match Score Gauge | SVG circular gauge; percentage displayed in the centre; colour: green ≥70%, amber 40–69%, red <40% |
| Missing Skills | Chip tags in red; tooltip on hover showing where the skill appeared in the job description |
| ATS Risk Badge | Low / Medium / High badge; expandable list of flagged terms |
| Generate Insights Button | Shown when insights have not yet been generated for this job; triggers POST /pro/:jobId/match |

**CoverLetterGenerator**

| Element | Behaviour |
|---|---|
| Tone Selector | Segmented control: Professional / Confident / Conversational |
| Generate Button | Triggers POST /pro/:jobId/cover-letter; shows inline loading state |
| Output Textarea | Editable; min-height 300px; expands with content |
| Word Count | Displayed below the output area |
| Download Button | Triggers GET /pro/:jobId/cover-letter/download |
| Copy Button | Copies full textarea content to clipboard; shows a brief "Copied!" confirmation |
| Regenerate Button | Clears output and re-calls the API; shows confirmation modal if output has been manually edited |

---

## 6. Design System

### 6.1 Colour Tokens

| Token | Hex Value | Usage |
|---|---|---|
| brand-primary | #1A1A2E | Page backgrounds, primary text |
| brand-accent | #4F8EF7 | Buttons, active nav, links, interactive elements |
| brand-accent-dark | #0D47A1 | Section headings, hover states |
| surface-default | #F8F9FA | Card backgrounds, table row alternates |
| surface-elevated | #FFFFFF | Modals, popovers, input backgrounds |
| status-success | #16A34A | Offer status, positive indicators, success toasts |
| status-warning | #F59E0B | Amber suggestions, medium ATS risk, warning states |
| status-danger | #DC2626 | Rejected status, high ATS risk, error toasts, destructive actions |
| status-info | #3B82F6 | Applied status, informational toasts |
| text-primary | #1A1A2E | Body copy, headings |
| text-secondary | #6B7280 | Captions, metadata, helper text, placeholders |
| text-disabled | #9CA3AF | Disabled form fields and buttons |
| border-default | #D1D5DB | Card borders, dividers, table lines |
| border-focus | #4F8EF7 | Input focus rings |

### 6.2 Typography

| Scale | Size | Weight | Usage |
|---|---|---|---|
| Display | 36px | 700 | Hero text, cover page |
| Heading 1 | 28px | 700 | Page titles |
| Heading 2 | 22px | 600 | Section headings |
| Heading 3 | 18px | 600 | Subsection labels, card headings |
| Body Large | 16px | 400 | Primary paragraph copy |
| Body | 14px | 400 | Secondary copy, form labels |
| Caption | 12px | 400 | Metadata, timestamps, helper text |
| Label | 12px | 500 | Badge text, status labels |

Font family: `Inter, system-ui, -apple-system, sans-serif`

### 6.3 Spacing Scale

Follows an 4px base grid: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px

### 6.4 Border Radius

| Context | Value |
|---|---|
| Buttons | 8px |
| Cards | 12px |
| Inputs | 8px |
| Modals | 16px |
| Badges / Chips | 999px (fully rounded) |

### 6.5 Shadow Scale

| Level | Value | Usage |
|---|---|---|
| sm | 0 1px 2px rgba(0,0,0,0.05) | Inputs, subtle card lift |
| md | 0 4px 6px rgba(0,0,0,0.07) | Cards, dropdowns |
| lg | 0 10px 15px rgba(0,0,0,0.10) | Modals, popovers |

### 6.6 Status Colour Mapping

| Status | Background | Text | Border |
|---|---|---|---|
| bookmarked | #F3F4F6 | #374151 | #D1D5DB |
| applied | #EFF6FF | #1D4ED8 | #BFDBFE |
| interviewing | #FFFBEB | #B45309 | #FDE68A |
| offer | #F0FDF4 | #15803D | #BBF7D0 |
| rejected | #FEF2F2 | #B91C1C | #FECACA |

---

## 7. API Integration Layer

### 7.1 API Client

A singleton fetch wrapper is instantiated once with the Firebase ID token injected before each request from the auth store. All service files import from this client. The token is refreshed automatically when Firebase detects expiry.

### 7.2 Optimistic Updates

Optimistic updates are applied for all user-initiated status changes to prevent perceived lag on the Kanban board:

| Action | Optimistic Update | Rollback Condition |
|---|---|---|
| Drag job to new column | Job status updated in cache immediately | PATCH /jobs/:id returns an error |
| Archive job | Job removed from active list immediately | DELETE /jobs/:id returns an error |
| Accept AI suggestion | Field content updated in local state immediately | No API call at accept time; saved on Pro page exit |

### 7.3 Loading States

| Scenario | UI Treatment |
|---|---|
| Jobs list loading | Skeleton cards in Kanban columns; skeleton rows in Table |
| Analytics loading | Skeleton chart placeholders with the correct aspect ratio |
| Pro page insights loading | Skeleton gauge and skeleton chip list |
| Parse API in-flight | Parse button shows spinner; input area dimmed |
| Commit API in-flight | Commit button shows spinner; all side panel fields locked |
| PDF download in-flight | Download button shows progress indicator |

---

## 8. Performance Standards

| Metric | Target | Measurement Method |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5 seconds | Lighthouse CI in staging |
| First Input Delay (FID) | < 100ms | Lighthouse CI |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse CI |
| Dashboard load (50 jobs) | < 3 seconds (P95) | Playwright performance measurement |
| Kanban drag-to-update (optimistic) | < 50ms perceived | Manual verification |
| Resume canvas re-render on edit | < 200ms | React Profiler measurement |
| Bundle size (initial JS) | < 300KB gzipped | Vite bundle analyser |

---

## 9. Accessibility Requirements

| Requirement | Standard |
|---|---|
| Colour contrast | WCAG AA minimum (4.5:1 for body text; 3:1 for large text and UI components) |
| Keyboard navigation | All interactive elements reachable and operable via keyboard |
| Focus indicators | Visible focus rings on all focusable elements; never removed with outline: none without a replacement |
| Screen reader support | All images and icon-only buttons carry descriptive aria-label attributes |
| Drag and drop | dnd-kit provides keyboard-accessible drag-and-drop; users can move cards via keyboard alone |
| Form labels | All form inputs are associated with a visible label or an aria-label |
| Error messages | All validation errors are programmatically associated with their input via aria-describedby |
| Modal focus trap | Focus is trapped within open modals; Escape key closes all modals |
| Skip to content | A visually hidden skip link is the first focusable element on every authenticated page |
| Motion | All animations respect the prefers-reduced-motion media query; reduced to instant transitions where set |

---

## 10. Browser Support

| Browser | Minimum Version | Notes |
|---|---|---|
| Chrome | 100 | Primary development and testing environment |
| Firefox | 110 | Full support; tested in CI |
| Edge | 100 | Chromium-based; same support as Chrome |
| Safari | 16 | CSS gap and subgrid tested; WebKit-specific issues tracked separately |
| Chrome (Android) | 100 | Mobile web; responsive layout only — no native features used |
| Safari (iOS) | 16 | Mobile web; touch drag-and-drop verified with dnd-kit |

**Not supported:** Internet Explorer (any version). No polyfills or workarounds will be applied for IE.

---

*TRACKD Frontend Architecture Documentation | VybzTech Inc. | Version 1.0 Draft | June 2026 | CONFIDENTIAL*