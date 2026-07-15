# TRACKD — Legal & Compliance Framework

**Version:** 2.0 (Curated) | **Date:** July 2026
**Status:** Template — requires qualified legal counsel review before public launch. This document is not legal advice.

---

## 1. Terms of Service — key provisions

### 1.1 Service description
TRACKD is a two-sided platform: a job-application tracking and AI-optimization service for candidates, and an applicant-triage workspace for recruiters/companies. TRACKD is not an employment agency and does not guarantee employment outcomes for candidates or hiring outcomes for recruiters. **Simulated Integration status updates are TRACKD-native actions, not connections to any third-party ATS** — this must be stated plainly in-product and in marketing copy, not just buried in Terms, since implying real ATS integration when none exists would be a misrepresentation risk.

### 1.2 Eligibility
| Requirement | Detail |
|---|---|
| Minimum age | 16, for both candidate and recruiter accounts |
| Recruiter accounts | Must represent a real company they're authorized to post roles for; TRACKD reserves the right to verify this and suspend accounts that don't |

### 1.3 Intellectual property
| Asset | Ownership |
|---|---|
| Candidate-uploaded resumes | Owned by the candidate; TRACKD holds a limited licence to process for service delivery |
| Recruiter-posted role content | Owned by the recruiter/company; TRACKD holds a limited licence to display it to candidates and to run it through the same AI extraction pipeline as candidate-side ingestion |
| AI-generated outputs (cover letters, resume edits, match scores) | Owned by the candidate on generation; TRACKD makes no ownership claim |
| Job descriptions pasted from third-party sites | Third-party copyright; the user pasting them is responsible for their own compliance with the originating site's terms |

### 1.4 AI-generated content disclaimer
AI outputs — extraction, match scores, resume/cover-letter suggestions — are produced by Claude (Anthropic), with Gemini Flash as an automatic fallback provider. TRACKD does not guarantee accuracy, completeness, or improved outcomes from AI-generated content on either side of the platform: match scores are algorithmic estimates for candidates, and fit summaries are the same kind of estimate for recruiters — neither constitutes professional advice or a hiring recommendation. Both parties are responsible for their own review before acting on AI output.

### 1.5 Anti-discrimination and employment-law posture
Because TRACKD now sits between candidates and recruiters, not just as a candidate-side tool, this needs an explicit clause it didn't need before: **TRACKD's AI match score and ATS-risk tooling must not be represented, marketed, or configured as a hiring decision tool.** It's a triage aid. Recruiters remain solely responsible for their own compliance with applicable employment and anti-discrimination law (e.g., Title VII, EEOC guidance in the US; NDPR-adjacent fair-processing principles in Nigeria; equivalent regimes elsewhere) in how they use match scores to make actual hiring decisions. Flag this for counsel specifically — algorithmic hiring tools are an active regulatory area (NYC Local Law 144 and similar bias-audit requirements are the kind of thing that needs a real legal review, not a template clause).

### 1.6 Billing
| Term | Detail |
|---|---|
| Candidate Pro | $9/month, monthly billing, cancel anytime, no partial refunds |
| Recruiter tier | Pricing TBD (see BRD §1) — billing terms to be finalized alongside the pricing workshop, not assumed here |
| Payment processing | Stripe; TRACKD never stores card data |

### 1.7 Governing law
Nigerian law (Federal Republic of Nigeria), without regard to conflict-of-law provisions, except where local mandatory law in a user's jurisdiction requires otherwise.

---

## 2. Privacy — what changed for the two-sided model

The core privacy policy structure (data collected, purposes, retention, cookies, user rights) carries over from the prior draft largely unchanged for the candidate side. What's new:

### 2.1 Recruiter-side data processing
When a candidate applies through TRACKD to a TRACKD-native role, their profile/resume data becomes visible to the recruiter(s) at the owning company, scoped by the RLS policies in the Backend doc. This needs its own disclosure in the Privacy Policy: **candidates must be told, at the point of applying through a TRACKD-native role, that their data will be shared with the specific recruiter/company**, not just processed internally by TRACKD.

### 2.2 TRACKD's role shifts per side
For candidate data shared with a recruiter, TRACKD is best understood as a data processor acting on the recruiter's behalf for that specific disclosure, while remaining the data controller for its own AI-processing and product-analytics purposes. This dual role should be reviewed by counsel — it's more complex than the candidate-only version of this document needed to address.

---

## 3. Sub-Processor Register (updated)

| Sub-processor | Service | Data categories | Location | Transfer basis |
|---|---|---|---|---|
| Supabase | Database, auth, file storage | All categories | Varies by Supabase project region — confirm and disclose | SCCs / Supabase DPA |
| Anthropic (Claude API) | AI extraction, matching, generation — primary | Resume text, job/role descriptions | Confirm per Anthropic's DPA | Anthropic DPA |
| Google (Gemini API) | AI extraction — automatic fallback only | Resume text, job/role descriptions (only on Claude failure) | USA | Google DPA / SCCs |
| Stripe | Payment processing | Billing name and address | USA/EU | Stripe DPA |

This replaces the prior Firebase/GCP Firestore/Gemini-only register in full.

---

## 4. Regulatory Compliance Register

| Regulation | Applicability | Notes for the two-sided model |
|---|---|---|
| NDPR (Nigeria) | Applies — Nigerian user base on both sides | Register as data controller with NITDA; recruiter-side data sharing disclosure required |
| GDPR (EU/EEA) | Applies to EU/EEA users on either side | Legal basis needed for candidate→recruiter data sharing specifically, not just AI processing |
| CCPA (California) | Applies to California users | Standard disclosure + deletion rights |
| COPPA | Global, under-13 protection | Minimum age 16 enforced at signup for both account types |
| Algorithmic hiring regulations (e.g., NYC Local Law 144-class rules) | Applies if/when recruiters in covered jurisdictions use match scores in actual hiring decisions | **New for this version — needs dedicated counsel review before any recruiter-facing scoring feature markets itself as decision support** |
| PCI-DSS | Payment processing | Fully delegated to Stripe |
| WCAG 2.1 AA | Global best practice | Applies to both candidate and recruiter UI |

---

## 5. Compliance Action Checklist

| # | Action | Owner |
|---|---|---|
| 1 | Engage legal counsel to review this document before public launch | Product Owner |
| 2 | Register as data controller with NITDA (NDPR) | Legal Counsel |
| 3 | Execute Supabase DPA | Product Owner |
| 4 | Execute Anthropic DPA (Claude API) | Product Owner |
| 5 | Execute Google DPA (Gemini fallback usage) | Product Owner |
| 6 | Execute Stripe DPA | Product Owner |
| 7 | Draft and implement the candidate→recruiter data-sharing disclosure at the point of application | VybzTech / Legal |
| 8 | Get specific counsel input on algorithmic-hiring-tool regulation before marketing match scores to recruiters as decision support | Legal Counsel |
| 9 | Implement AI-processing consent step in both onboarding flows | VybzTech |
| 10 | Implement account deletion with 30-day purge for both account types | VybzTech |
| 11 | WCAG 2.1 AA audit across both candidate and recruiter UI | QA |
| 12 | Pre-launch security review (OWASP-class scan, plus explicit RLS policy review per table) | VybzTech |

---

*TRACKD Legal & Compliance Framework | v2.0 Curated | July 2026 | CONFIDENTIAL — Not legal advice*
