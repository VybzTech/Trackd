# TRACKD — Backend Doc

**Version:** 2.0 (Curated) | **Date:** July 2026
**Stack:** Supabase (Postgres + Auth + Storage) + a thin edge-function layer for AI and PDF work. No Firestore, no Firebase, no standalone Go service — see `09-Excluded-and-Superseded.md` for why that changed.

---

## 1. Why Supabase, and where the line sits

Supabase gives you Postgres, auth, file storage, and Row Level Security in one managed service — the React app talks to it **directly** for almost everything: reading jobs, updating a status, adding a note, posting a role. No custom REST layer to build or maintain for CRUD.

The one thing a browser client can never safely do is hold a secret API key. So there's a small edge-function layer (Supabase Edge Functions, Deno/TypeScript) that exists *only* for:
1. Calling Claude/Gemini (needs a secret key)
2. Rendering PDFs server-side (needs a secret-holding process, not something a client can do)

### 1.1 Why this replaces Go specifically, not just "why Supabase"

The original Go service did five jobs: HTTP routing/auth middleware, calling Gemini, cleaning scraped HTML (goquery), validating data before writes, and rendering PDFs (chromedp/headless Chrome). Point by point, against what's left once Supabase is the database:

| Original Go job | Who does it now | Why that's enough |
|---|---|---|
| Auth middleware, JWT verification | Supabase Auth + RLS | RLS evaluates `auth.uid()` on every query at the database layer — there's no handler code that can forget to check it, which is a stronger guarantee than a hand-written middleware chain |
| Routing, request validation | Supabase client SDK + Zod on the client, Postgres constraints on the server | For plain CRUD (status change, note, tag) there's no business logic complex enough to need a router in front of it |
| Calling Gemini/Claude with a secret key | Supabase Edge Function (`callAI()`) | This is exactly the workload edge functions are built for: short-lived, secret-holding, calls-an-external-API-and-writes-back. Go bought you nothing here that Deno/TypeScript doesn't |
| Cleaning scraped HTML before AI extraction | Same edge function, using a Deno-compatible HTML parser (e.g. `deno-dom`) | Equivalent capability to `goquery`, same runtime as the AI call, no second language needed |
| Rendering PDFs via headless Chrome | **This is the one real gap — see §7 below** | Headless Chrome is a full browser process; Supabase Edge Functions (V8 isolates) cannot spawn one. This was accurately flagged as open in the prior version of this doc and is now resolved, not just noted |

The honest summary: nothing about dropping Go was "one Claude subscription will cover it." A subscription to Claude.ai (the chat product) is irrelevant here and was never the plan — what you're integrating is the **Claude API** (Anthropic's developer platform), which is pay-per-token, not feature-gated the way a chat plan is. It's exactly as capable inside an edge function as it would be inside a Go handler; the token cost and rate limits are the same either way. The actual question was never "is Claude enough" — it was "where does the secret-holding server-side code live," and for everything except PDF rendering, an edge function is a lighter answer than a standalone service without losing capability.

If you ever find yourself adding a third reason to route something through the edge layer instead of a direct RLS-scoped client write, stop and ask whether RLS can just handle it — that's the whole point of this stack.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Database | Supabase Postgres | Relational, RLS built in, generous free tier |
| Auth | Supabase Auth (GoTrue) | Email/password + Google OAuth out of the box; issues JWTs the client already knows how to use |
| Storage | Supabase Storage | Resume uploads, generated PDF files, signed URLs |
| AI — primary | Claude API (Anthropic) | Structured JSON extraction, resume/cover-letter generation, match scoring |
| AI — fallback | Gemini Flash | Automatic fallback if Claude errors, times out, or rate-limits |
| Edge functions | Supabase Edge Functions (Deno) | AI orchestration, PDF rendering — the only place secrets live |
| PDF rendering | `@react-pdf/renderer`, run inside a Supabase Edge Function | Generates the PDF programmatically from a component tree — no headless browser needed, so it stays inside the same edge function as everything else. See §7 for the fallback if this doesn't hold up. |

---

## 3. Data Model

See `03-Trackd-Architecture-and-Features.md §4` for the relationship diagram. Table-level detail:

### `profiles` (1:1 with `auth.users`)
`id, full_name, avatar_url, current_title, location, tier (free|pro), profile_completeness, onboarding_completed, summary, skills (jsonb), experience (jsonb), education (jsonb), resume_url, resume_uploaded_at`

### `companies`
`id, name, industry, size, logo_url, created_by, created_at`

### `company_members`
`company_id, user_id, role (admin|member)` — join table; v1 only needs `admin`, structured now so team seats are a Phase 2 UI change, not a schema change

### `roles` (a recruiter's posted job)
`id, company_id, title, description_raw, parsed_data (jsonb — same shape as candidate-side job extraction), status (open|paused|filled), created_at`

### `applications` (the shared spine — see Architecture doc)
`id, candidate_id, role_id (nullable), company_data (jsonb), role_data (jsonb), compensation (jsonb), status, status_history (jsonb[]), source, ai_insights (jsonb), tags (text[]), archived, created_at, updated_at`

### Row Level Security — the core policies
- `profiles`: a user can read/write only their own row
- `applications`: a candidate can read/write only rows where `candidate_id = auth.uid()`; a recruiter can **read** (not write candidate-owned fields) rows where `role_id` belongs to a `roles` row whose `company_id` they're a member of
- `roles`: readable by anyone (for the candidate-side Explore feed, if a role is TRACKD-native); writable only by members of the owning company
- Status changes from the recruiter side (Simulated Integration actions) go through a Postgres function/RPC that's allowed to update the `status` and `status_history` fields specifically, without granting recruiters broad write access to the rest of a candidate's application row

---

## 4. AI Integration

### 4.1 Provider routing
Every AI call goes through one internal function (`callAI(prompt, schema)`), not called directly from feature code. That function tries Claude first; on error, timeout, or rate limit, it automatically retries once against Gemini Flash with the same schema. This is what makes "switch providers" a one-file change instead of a rewrite.

### 4.2 Calls

| Call | Trigger | Input | Output |
|---|---|---|---|
| Job extraction | Ingestion parse (candidate or recruiter role posting — same schema) | Cleaned job text | Structured job JSON |
| Resume extraction | Onboarding / resume re-upload | Resume text | Structured UserProfile JSON |
| Match & score | Pro page load (candidate) or Applications grid (recruiter) | UserProfile + job data | Match score, missing skills, ATS risk |
| Resume bullet edits | Pro page, Resume Canvas | UserProfile + job data + existing bullets | Rewritten bullet suggestions |
| Cover letter | Pro page, Cover Letter Generator | UserProfile + job data + tone | Cover letter text |

### 4.3 Schema enforcement
All extraction calls pass a strict JSON schema; the edge function validates the response against it before it ever reaches Postgres. A malformed or incomplete response is rejected — the fallback provider is tried once, and if both fail, the client gets a clear error with the input left editable. Nothing partially-parsed is ever silently written.

---

## 5. Auth Flow

```
Client → Supabase Auth (email/OAuth) → JWT issued
Client → Supabase Postgres/Storage, JWT attached automatically → RLS evaluates auth.uid()
Client → Edge Function (AI/PDF calls), JWT attached → function verifies JWT, then uses its own
         service-role key to call Claude/Gemini and write results back to Postgres
```

`account_type` (candidate | recruiter) lives on the `profiles`/`company_members` relationship, not as a special auth role — a person can, in principle, hold both a candidate profile and recruiter membership on a company with the same login.

---

## 6. File Storage

| Bucket | Path pattern | Access |
|---|---|---|
| `resumes` | `{userId}/{timestamp}_resume.pdf` | Private, signed URL, 1-hour expiry |
| `generated-docs` | `{userId}/{applicationId}/{type}_{timestamp}.pdf` | Private, signed URL, 5-minute expiry, regenerated on demand rather than cached long-term |

Max resume upload: 5MB, PDF only, validated server-side (client-side checks are advisory only).

---

## 7. PDF Generation — the resolved decision

This was left as an open question in the prior version of this doc. Here's the actual resolution, not just a flag.

**Primary approach: `@react-pdf/renderer` inside a Supabase Edge Function.** This library builds a PDF programmatically from a declarative component tree (`<Document>`, `<Page>`, `<Text>`, `<View>` — it reads like React, but outputs PDF primitives directly rather than "printing" a rendered HTML page). Because it never spins up an actual browser, it runs fine inside a Deno edge function, which keeps PDF generation on the same infrastructure as the AI calls — no separate service, no separate deploy. This is the resume and cover-letter PDF path for v1.

**The real trade-off to know about:** the Resume Canvas's on-screen live preview (built as ordinary React/Tailwind components, per the Frontend doc) and the downloaded PDF (built as `@react-pdf/renderer` components) are two separate component trees rendering the same content. They can drift out of visual sync if one is updated and the other isn't — this is the actual cost of avoiding a headless browser, and it's worth knowing up front rather than discovering it three sprints in. Mitigate it by sharing the *data* transformation (one function that turns UserProfile + accepted edits into a plain content object) and keeping the two component trees as thin, independently-styled renderers of that same object — not by trying to literally reuse JSX between them, which doesn't work across the two rendering models.

**Fallback, only if that trade-off proves unworkable:** a small, single-purpose rendering service (Go+chromedp or Node+Puppeteer — language doesn't matter here, it's a one-job service) deployed to Fly.io, Render, or Cloud Run, called from the edge function instead of running `@react-pdf/renderer` locally. This is not "bring Go back as the backend" — it would be one narrowly-scoped service that does exactly one thing, sitting behind the same edge-function call site so nothing else in the architecture changes if you end up needing it.

---

## 8. Security

| Requirement | Implementation |
|---|---|
| Auth | Supabase Auth JWT validated on every request; RLS is the actual enforcement layer, not just a middleware check |
| Data isolation | RLS policies scoped per table as above; no query can cross a tenant boundary by construction |
| Secrets | Claude/Gemini API keys and the Supabase service-role key live only in edge function environment config, never shipped to the client |
| HTTPS | Enforced everywhere; no HTTP fallback |
| Rate limiting | Per-user limits on AI-calling endpoints specifically (these are the expensive/abusable ones) — 10/minute is a reasonable v1 starting point |
| File validation | MIME type and size checked server-side on every upload |

---

## 9. Error Handling

| Failure | Handling |
|---|---|
| Claude returns malformed JSON | Rejected before write; Gemini Flash retried automatically |
| Both providers fail | Client sees a clear, specific error; input remains editable, nothing is lost |
| PDF render fails | Error toast with a retry action; no partial file is ever served |
| RLS denies a write | Client gets a 403-equivalent with a plain-language message, never a raw Postgres error |

---

## 10. Infrastructure & Cost (Phase 1 scale)

| Service | Tier | Est. monthly cost |
|---|---|---|
| Supabase | Free → Pro ($25/mo) once past free-tier row/storage limits | $0–25 |
| Claude API | Pay-per-use | Usage-dependent; monitor token cost per extraction call |
| Gemini Flash | Pay-per-use, fallback only | Low — only fires on Claude failure |
| Edge function hosting (incl. `@react-pdf/renderer` PDF generation) | Included in Supabase | $0 |
| Fallback PDF rendering service (only if §7's fallback is triggered) | Small always-on instance (Fly.io/Render free-to-low tier) | $0–7 |

This is meaningfully cheaper and simpler to operate than the original Firestore + Firebase Auth + standalone Go microservice design — one platform (Supabase) instead of three separate GCP services to wire together.

---

*TRACKD Backend Doc | v2.0 Curated | July 2026 | CONFIDENTIAL*
