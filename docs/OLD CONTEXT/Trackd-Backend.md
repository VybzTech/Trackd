# TRACKD — Backend Architecture Documentation

**Project Title:** TRACKD — AI-Powered Job Application Tracker
**Prepared By:** VybzTech Inc.
**Document Version:** 1.0 (Draft)
**Date Prepared:** June 2026
**Classification:** CONFIDENTIAL

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [API Design](#3-api-design)
4. [Data Models & Schemas](#4-data-models--schemas)
5. [AI Integration — Gemini API](#5-ai-integration--gemini-api)
6. [Authentication & Authorisation](#6-authentication--authorisation)
7. [File Storage](#7-file-storage)
8. [PDF Generation](#8-pdf-generation)
9. [Infrastructure & Hosting](#9-infrastructure--hosting)
10. [Security Requirements](#10-security-requirements)
11. [Error Handling Standards](#11-error-handling-standards)
12. [Logging & Observability](#12-logging--observability)

---

## 1. Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Runtime | Go (Golang) | 1.22+ | Compiled, concurrent, low-memory footprint — optimal for Cloud Run cold-start performance |
| HTTP Router | Chi | v5 | Lightweight, idiomatic middleware chain; no reflection overhead |
| Database | GCP Firestore (Native Mode) | Current | Serverless, horizontally scalable NoSQL; native real-time listeners; document model fits the job schema |
| Authentication | Firebase Auth | Current | Handles OAuth, JWT issuance, email verification — eliminates auth engineering burden |
| AI Layer | Google Gemini 1.5 Flash | Current | Fast inference, cost-efficient, supports structured JSON output via function calling |
| File Storage | GCP Cloud Storage | Current | Resume PDF uploads and generated document serving via signed URLs |
| Hosting | GCP Cloud Run | Current | Serverless containers; scales to zero; fits free tier for Phase 1 traffic volumes |
| PDF Generation | chromedp (headless Chrome) | Current | Server-side PDF rendering; consistent output across all browsers and operating systems |
| HTML Parsing | goquery | Current | Go port of jQuery-like DOM traversal; strips irrelevant markup before AI submission |
| Configuration | GCP Secret Manager | Current | API keys and service credentials stored and retrieved at runtime; never in environment files |

---

## 2. System Architecture Overview

```
[React Frontend]
      │
      │ HTTPS / REST
      ▼
[GCP Cloud Run — Go Backend]
      │
      ├──► [Firebase Auth]          JWT validation on every request
      │
      ├──► [GCP Firestore]          Primary data store (users, applications)
      │
      ├──► [GCP Cloud Storage]      Resume PDFs, generated document files
      │
      ├──► [Google Gemini API]      AI extraction, matching, generation
      │
      └──► [chromedp / PDF engine]  Server-side PDF rendering
```

### Request Lifecycle

```
Client Request
  │
  ▼
Chi Router
  │
  ├── Auth Middleware        (validates Firebase JWT; attaches userId to context)
  ├── Rate Limit Middleware  (per-user request throttle)
  ├── Logging Middleware     (structured JSON log per request)
  ├── CORS Middleware        (origin allowlist)
  │
  ▼
Route Handler
  │
  ├── Input Validation       (struct binding + Zod-equivalent Go validation)
  ├── Business Logic         (service layer)
  ├── Firestore / Storage    (data access layer)
  ├── Gemini API Call        (where applicable)
  │
  ▼
JSON Response
```

---

## 3. API Design

### 3.1 Base URL & Versioning

**Production:** `https://api.trackd.io/v1`
**Staging:** `https://api-staging.trackd.io/v1`

All authenticated endpoints require the header:
```
Authorization: Bearer <firebase_id_token>
```

### 3.2 Response Envelope

All API responses follow a consistent envelope:

```json
{
  "success": true,
  "data": { },
  "error": null,
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": "2026-06-01T12:00:00Z"
  }
}
```

On error:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Role title is required.",
    "field": "role.title"
  },
  "meta": {
    "requestId": "uuid-v4",
    "timestamp": "2026-06-01T12:00:00Z"
  }
}
```

### 3.3 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /auth/verify | Validates Firebase JWT; returns TRACKD session context | No |
| POST | /auth/onboarding | Stores initial user preferences after first login | Yes |

### 3.4 Ingestion Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /ingest/parse | Accepts URL or raw text; returns parsed JobData JSON for preview | Yes |
| POST | /ingest/commit | Writes confirmed JobData to Firestore; returns the created document | Yes |

**POST /ingest/parse — Request Body:**
```json
{
  "input": "string — URL or raw job description text",
  "inputType": "url | text | auto"
}
```

**POST /ingest/parse — Response (success):**
```json
{
  "success": true,
  "data": {
    "parsed": { },
    "confidence": {
      "company.name": "high",
      "compensation.min": "low"
    },
    "inputType": "url"
  }
}
```

**POST /ingest/commit — Request Body:**
```json
{
  "jobData": { }
}
```

### 3.5 Job Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /jobs | Returns all non-archived jobs for the authenticated user | Yes |
| GET | /jobs/:id | Returns a single job document | Yes |
| PATCH | /jobs/:id | Updates job fields; status changes append to statusHistory | Yes |
| DELETE | /jobs/:id | Soft-deletes a job (sets archived: true, archivedAt: timestamp) | Yes |

**GET /jobs — Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| status | string | Filter by status value |
| source | string | Filter by source |
| from | ISO 8601 date | Filter by createdAt >= from |
| to | ISO 8601 date | Filter by createdAt <= to |
| limit | integer | Default 50; max 100 |
| cursor | string | Firestore document cursor for pagination |

**PATCH /jobs/:id — Status Transition Rules:**

| Current Status | Allowed Next Statuses |
|---|---|
| bookmarked | applied, rejected |
| applied | interviewing, rejected |
| interviewing | offer, rejected |
| offer | (terminal — no further transitions) |
| rejected | (terminal — no further transitions) |

Any status transition outside this matrix returns a `400 INVALID_TRANSITION` error.

### 3.6 Pro / AI Endpoints

All Pro endpoints require the authenticated user to have `plan: "pro"` in their Firestore document. Requests from Free-tier users return `403 PLAN_REQUIRED`.

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | /pro/:jobId/match | Generates match score, missing skills, and ATS analysis | Yes (Pro) |
| POST | /pro/:jobId/resume | Returns AI-generated resume bullet edits for this job | Yes (Pro) |
| POST | /pro/:jobId/cover-letter | Generates a tailored cover letter | Yes (Pro) |
| GET | /pro/:jobId/resume/download | Streams a server-rendered PDF of the tailored resume | Yes (Pro) |
| GET | /pro/:jobId/cover-letter/download | Streams a server-rendered PDF of the cover letter | Yes (Pro) |

**POST /pro/:jobId/cover-letter — Request Body:**
```json
{
  "tone": "professional | confident | conversational"
}
```

### 3.7 Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /analytics/summary | Returns KPI cards: total, response rate, offer rate, avg time to response | Yes |
| GET | /analytics/timeline | Returns application count grouped by week for time-series charting | Yes |
| GET | /analytics/breakdown | Returns count by status, source, and top roles/companies | Yes |

**GET /analytics/timeline — Query Parameters:**

| Parameter | Type | Default |
|---|---|---|
| from | ISO 8601 date | 90 days ago |
| to | ISO 8601 date | today |
| groupBy | week \| month | week |

### 3.8 User Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | /user/profile | Returns the authenticated user's full profile | Yes |
| PATCH | /user/profile | Updates editable profile fields | Yes |
| POST | /user/resume/upload | Accepts resume PDF; triggers Gemini extraction; returns extracted UserProfile for review | Yes |
| POST | /user/resume/confirm | Saves the confirmed UserProfile to Firestore after user review | Yes |
| DELETE | /user | Queues account and all associated data for deletion within 30 days | Yes |

---

## 4. Data Models & Schemas

### 4.1 User Document

**Firestore collection:** `users/{userId}`

```go
type User struct {
    ID          string           `firestore:"id"`
    Email       string           `firestore:"email"`
    DisplayName string           `firestore:"displayName"`
    Plan        string           `firestore:"plan"`         // "free" | "pro"
    Profile     ExtractedProfile `firestore:"profile"`
    Preferences UserPreferences  `firestore:"preferences"`
    ResumeURL   string           `firestore:"resumeUrl"`
    CreatedAt   time.Time        `firestore:"createdAt"`
    UpdatedAt   time.Time        `firestore:"updatedAt"`
}

type ExtractedProfile struct {
    Skills     []string           `firestore:"skills"`
    Experience []ExperienceEntry  `firestore:"experience"`
    Education  []EducationEntry   `firestore:"education"`
    Summary    string             `firestore:"summary"`
    Tone       string             `firestore:"tone"`
}

type ExperienceEntry struct {
    Company   string   `firestore:"company"`
    Title     string   `firestore:"title"`
    StartDate string   `firestore:"startDate"`
    EndDate   string   `firestore:"endDate"`
    Bullets   []string `firestore:"bullets"`
}

type EducationEntry struct {
    Institution string `firestore:"institution"`
    Degree      string `firestore:"degree"`
    Year        string `firestore:"year"`
}

type UserPreferences struct {
    TargetRoles     []string `firestore:"targetRoles"`
    WorkMode        string   `firestore:"workMode"`
    ExperienceLevel string   `firestore:"experienceLevel"`
}
```

### 4.2 Job Application Document

**Firestore collection:** `users/{userId}/applications/{applicationId}`

```go
type JobApplication struct {
    ID           string               `firestore:"id"`
    UserID       string               `firestore:"userId"`
    JobLink      string               `firestore:"jobLink"`
    Company      CompanyData          `firestore:"company"`
    Role         RoleData             `firestore:"role"`
    Compensation CompensationData     `firestore:"compensation"`
    Timeline     TimelineData         `firestore:"timeline"`
    Status       string               `firestore:"status"`
    StatusHistory []StatusEvent       `firestore:"statusHistory"`
    TechRequirements TechData         `firestore:"technicalRequirements"`
    AIInsights   AIInsightsData       `firestore:"aiInsights"`
    Tags         []string             `firestore:"tags"`
    Source       string               `firestore:"source"`
    Archived     bool                 `firestore:"archived"`
    ArchivedAt   *time.Time           `firestore:"archivedAt"`
    CreatedAt    time.Time            `firestore:"createdAt"`
    UpdatedAt    time.Time            `firestore:"updatedAt"`
}

type CompanyData struct {
    Name     string `firestore:"name"`
    Industry string `firestore:"industry"`
    Size     string `firestore:"size"`
    Notes    string `firestore:"notes"`
}

type RoleData struct {
    Title      string `firestore:"title"`
    Department string `firestore:"department"`
    Level      string `firestore:"level"`
    WorkMode   string `firestore:"workMode"`
}

type CompensationData struct {
    Min      float64  `firestore:"min"`
    Max      float64  `firestore:"max"`
    Currency string   `firestore:"currency"`
    Type     string   `firestore:"type"`
    Equity   string   `firestore:"equity"`
    Benefits []string `firestore:"benefits"`
}

type TimelineData struct {
    DetectedDate time.Time  `firestore:"detectedDate"`
    AppliedDate  *time.Time `firestore:"appliedDate"`
    Deadline     *time.Time `firestore:"deadline"`
}

type StatusEvent struct {
    Status    string    `firestore:"status"`
    ChangedAt time.Time `firestore:"changedAt"`
    Notes     string    `firestore:"notes"`
}

type TechData struct {
    Stack    []string `firestore:"stack"`
    Keywords []string `firestore:"keywords"`
}

type AIInsightsData struct {
    MatchScore       int      `firestore:"matchScore"`
    MissingSkills    []string `firestore:"missingSkills"`
    ATSKeywordsRisk  string   `firestore:"atsKeywordsRisk"`
    SuggestedBullets []string `firestore:"suggestedBullets"`
    CoverLetter      string   `firestore:"coverLetter"`
    GeneratedAt      *time.Time `firestore:"generatedAt"`
}
```

### 4.3 Gemini JSON Extraction Schema

The following schema is passed to Gemini as a function definition, enforcing structured output from job description text:

```json
{
  "company": {
    "name": "string",
    "industry": "string",
    "size": "string"
  },
  "role": {
    "title": "string",
    "department": "string",
    "level": "string",
    "workMode": "string"
  },
  "compensation": {
    "min": "number",
    "max": "number",
    "currency": "string",
    "type": "string",
    "equity": "string",
    "benefits": ["string"]
  },
  "timeline": {
    "deadline": "string (ISO 8601 or null)"
  },
  "technicalRequirements": {
    "stack": ["string"],
    "keywords": ["string"]
  },
  "source": "string"
}
```

Go validates all required fields before writing to Firestore. Missing required fields return a 422 with the specific field name.

---

## 5. AI Integration — Gemini API

### 5.1 Prompt Architecture

All Gemini calls follow a two-part prompt structure:

- **System prompt:** Defines the AI's role (e.g., *"You are a structured data extractor. Return only valid JSON matching the schema provided. Do not add commentary or explanation."*)
- **User prompt:** Contains the content to be processed (cleaned job text, resume text, or combined context)

### 5.2 AI Call Reference

| Call | Endpoint Trigger | Input | Output | Estimated Tokens |
|---|---|---|---|---|
| Resume Extraction | POST /user/resume/upload | Resume plain text + extraction schema | UserProfile JSON | ~2,000 |
| Job Extraction | POST /ingest/parse | Cleaned job body text + job schema | JobApplication JSON | ~1,500 |
| Match & Score | POST /pro/:jobId/match | UserProfile JSON + JobData JSON | Match score, missing skills, ATS risk | ~2,500 |
| Resume Bullet Edits | POST /pro/:jobId/resume | UserProfile + JobData + existing bullets | Rewritten bullet suggestions per section | ~2,000 |
| Cover Letter | POST /pro/:jobId/cover-letter | UserProfile + JobData + tone preference | Cover letter text | ~1,800 |

### 5.3 Error Handling for AI Calls

| Failure Mode | Backend Handling |
|---|---|
| Gemini returns malformed JSON | Response rejected before Firestore write; 422 returned to client |
| Gemini API timeout (>12 seconds) | Request cancelled; 504 returned with retry instruction |
| Gemini returns partial schema | Fields missing from required set are flagged; partial data returned with low-confidence indicators |
| Gemini API rate limit hit | Exponential backoff with 3 retries; 429 returned to client if all retries exhausted |

### 5.4 Token Monitoring

- Per-request token counts are logged as structured fields on every Gemini call
- A per-user daily token budget is enforced at the application layer (not API level)
- Alerts are configured for average tokens per request exceeding predefined thresholds

---

## 6. Authentication & Authorisation

### 6.1 Authentication Flow

```
Client                    Firebase Auth            Go Backend
  │                            │                       │
  ├── Sign in (Google/Email) ──►                       │
  │                            │                       │
  │◄── Firebase ID Token ──────┤                       │
  │                            │                       │
  ├── API Request + Bearer Token ────────────────────► │
  │                            │                       │
  │                            │◄── Verify Token ──────┤
  │                            ├── Decoded Claims ────► │
  │                            │                       ├── Attach userId to context
  │                            │                       ├── Execute handler
  │◄──────────────────── Response ────────────────────┤
```

### 6.2 JWT Middleware

- Every request to a protected endpoint passes through the auth middleware
- The middleware verifies the Firebase ID token signature and expiry
- The decoded `uid` is attached to the request context
- All Firestore reads and writes are scoped to the authenticated `userId` — cross-user data access is architecturally prevented

### 6.3 Authorisation Tiers

| Tier | Check | Enforcement |
|---|---|---|
| Authenticated | Valid Firebase JWT | Auth middleware on all protected routes |
| Pro | User document `plan == "pro"` | ProGuard middleware on all /pro/* routes |
| Admin (future) | Reserved for internal tooling | Not in Phase 1 scope |

---

## 7. File Storage

### 7.1 Resume Uploads

| Property | Value |
|---|---|
| Storage bucket | `trackd-user-files` |
| Path pattern | `resumes/{userId}/{timestamp}_resume.pdf` |
| Max file size | 5 MB |
| Allowed MIME types | application/pdf |
| Access | Private; served via time-limited signed URL (1-hour expiry) |
| On re-upload | New file written; previous file retained for 30 days then deleted |

### 7.2 Generated PDF Documents

| Property | Value |
|---|---|
| Storage bucket | `trackd-generated-docs` |
| Path pattern | `generated/{userId}/{jobId}/{type}_{timestamp}.pdf` |
| Access | Private; served via time-limited signed URL (5-minute expiry) for download |
| Retention | 7 days; regenerated on demand |

---

## 8. PDF Generation

Server-side PDF generation is used for both resume and cover letter downloads. Browser print-to-PDF is not used due to rendering inconsistencies across environments.

### 8.1 Resume PDF

- The Go backend renders the resume using a headless Chrome instance (via chromedp) loading the resume template as an HTML page populated with the user's confirmed content and AI-accepted edits
- The rendered HTML is converted to PDF with print margins set and passed back to the client as a binary stream
- Filename format: `{FirstName}_{LastName}_{CompanyName}_Resume.pdf`

### 8.2 Cover Letter PDF

- The Go backend renders the cover letter text into a single-page letter template via the same chromedp pipeline
- Filename format: `{FirstName}_{LastName}_{CompanyName}_CoverLetter.pdf`

---

## 9. Infrastructure & Hosting

### 9.1 Phase 1 Infrastructure

| Service | Purpose | Tier | Estimated Monthly Cost |
|---|---|---|---|
| GCP Cloud Run | Go backend hosting | Free (2M requests/month) | $0 |
| GCP Firestore | Primary database | Free (1 GiB storage, 50K reads/day) | $0 |
| GCP Cloud Storage | File storage | Free (5 GB) | $0 |
| Firebase Auth | Authentication | Free (Spark plan — 10K auth/month) | $0 |
| Firebase Hosting | React frontend CDN | Free (10 GB storage, 360 MB/day transfer) | $0 |
| Gemini API | AI extraction and generation | Pay-per-use | ~$5–15 at Phase 1 traffic |
| GCP Secret Manager | Secrets and API keys | Free (up to 6 secrets) | $0 |
| Domain | trackd.io | Annual registration | ~$12/year |
| **Total** | | | **~$5–15/month** |

### 9.2 Scaling Triggers

| Trigger | Action |
|---|---|
| Cloud Run concurrency > 80 | Auto-scale to additional container instances |
| Cloud Run idle for 15 minutes | Scale to zero |
| Firestore reads exceed 40K/day (80% of free limit) | Audit read patterns; implement client-side caching with TanStack Query |
| Gemini token cost exceeds $50/month | Review per-call token budgets; consider upgrading to Gemini API paid tier |

### 9.3 Environment Separation

| Environment | Purpose | Domain |
|---|---|---|
| Development | Local development | localhost:8080 |
| Staging | Pre-production QA and stakeholder review | staging.trackd.io |
| Production | Live user traffic | trackd.io / api.trackd.io |

---

## 10. Security Requirements

| Requirement | Implementation |
|---|---|
| JWT validation | Every protected endpoint validates the Firebase ID token before executing any handler logic |
| Data isolation | All Firestore queries are scoped to the authenticated userId; no cross-user data access is possible at the query level |
| HTTPS enforcement | Cloud Run is configured to reject all HTTP traffic and redirect to HTTPS |
| CORS policy | Origin allowlist restricted to trackd.io and staging.trackd.io domains |
| Rate limiting | Per-user rate limits applied at the middleware layer; 60 requests per minute for standard endpoints, 10 per minute for AI endpoints |
| Secret management | All API keys (Gemini, Firebase service account) stored in GCP Secret Manager; never in code or environment variable files |
| Input validation | All incoming request bodies are validated against Go struct definitions before any processing begins |
| File upload validation | MIME type and file size validated server-side on resume uploads; client-side checks are advisory only |
| OWASP Top 10 | Validated via OWASP ZAP scan before production launch (Phase 1 release gate) |
| Dependency auditing | `go mod verify` and `govulncheck` run in CI on every push |

---

## 11. Error Handling Standards

### 11.1 HTTP Status Code Conventions

| Code | Usage |
|---|---|
| 200 | Successful GET or PATCH |
| 201 | Successful resource creation (POST /ingest/commit) |
| 400 | Invalid request body or business rule violation |
| 401 | Missing or expired Firebase JWT |
| 403 | Valid JWT but insufficient permissions (e.g., Free user accessing Pro endpoint) |
| 404 | Resource not found (job ID does not exist for this user) |
| 422 | Structurally valid request but processing failed (e.g., Gemini returned invalid schema) |
| 429 | Rate limit exceeded |
| 500 | Unhandled server error |
| 504 | Upstream timeout (Gemini API) |

### 11.2 Error Code Conventions

All error responses include a machine-readable `code` string in addition to the human-readable `message`:

| Code | Meaning |
|---|---|
| VALIDATION_ERROR | Request body failed struct validation |
| INVALID_TRANSITION | Status change violates the allowed transition matrix |
| PLAN_REQUIRED | Pro feature accessed by Free-tier user |
| NOT_FOUND | Requested resource does not exist for this user |
| AI_EXTRACTION_FAILED | Gemini returned unusable output |
| AI_TIMEOUT | Gemini API did not respond within the configured deadline |
| RATE_LIMITED | Per-user rate limit exceeded |
| INTERNAL_ERROR | Unhandled server error; logged with requestId for investigation |

---

## 12. Logging & Observability

### 12.1 Structured Logging

All log entries are emitted as JSON to stdout (captured by Cloud Run and forwarded to GCP Cloud Logging):

```json
{
  "level": "info",
  "requestId": "uuid-v4",
  "userId": "firebase-uid",
  "method": "POST",
  "path": "/v1/ingest/parse",
  "statusCode": 200,
  "durationMs": 4230,
  "geminiTokensUsed": 1482,
  "timestamp": "2026-06-01T12:00:00Z"
}
```

### 12.2 Alert Thresholds

| Metric | Alert Threshold |
|---|---|
| P95 ingestion response time | > 10 seconds |
| 5xx error rate | > 1% of requests in any 5-minute window |
| Gemini API error rate | > 5% of AI calls in any 15-minute window |
| Cloud Run instance count | > 5 concurrent instances (unexpected traffic spike) |
| Firestore daily reads | > 40,000 (80% of free tier limit) |

---

*TRACKD Backend Architecture Documentation | VybzTech Inc. | Version 1.0 Draft | June 2026 | CONFIDENTIAL*