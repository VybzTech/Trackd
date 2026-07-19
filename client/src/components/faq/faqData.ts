// FAQ content transcribed verbatim from the design prototype
// (trackd-design-inspiration/project/Trackd FAQ.dc.html — the `CATEGORIES` const).
// Copy is authoritative: do not paraphrase, shorten, or "fix" punctuation.
// Mixed apostrophe styles (straight ' and ’) and em-dashes are intentional.

export interface FaqItem {
  q: string
  a: string
}

export interface FaqCategory {
  id: string
  label: string
  items: FaqItem[]
}

export const CATEGORIES: FaqCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting started',
    items: [
      {
        q: 'What is Trackd?',
        a: 'Trackd is an autonomous career engine: candidates get a structured, scored pipeline for every job they apply to, and recruiters get a pre-vetted, searchable view of applicants — both sides read and write to the same record.',
      },
      {
        q: 'Is Trackd free for candidates?',
        a: 'Yes. Smart Ingestion, the Kanban/table/calendar pipeline, and unlimited applications are free permanently. Pro adds AI resume tools, ATS scoring, and cover letter generation.',
      },
      {
        q: 'How do I get started as a recruiter?',
        a: "Create a recruiter workspace from Sign up, add your company details, and post your first role — either by pasting a link to an existing posting or filling out our structured job form.",
      },
    ],
  },
  {
    id: 'how-it-works',
    label: 'How it works',
    items: [
      {
        q: 'How does Smart Ingestion work?',
        a: 'Paste a job URL or a wall of copied text and Trackd extracts the role, comp, stack, seniority, and requirements into structured fields in seconds — no manual typing.',
      },
      {
        q: 'How does the compatibility score work?',
        a: "We compare your resume against the structured job record — skills, seniority, and keyword coverage — and return a live score plus exactly what's missing, not a black-box number.",
      },
      {
        q: 'What is the browser extension and how do I install it?',
        a: "The Trackd extension captures the job posting on the tab you're viewing with one click, so it shows up ready to verify in your Ingestion queue. Install it from your candidate dashboard's Ingestion page.",
      },
    ],
  },
  {
    id: 'data-privacy',
    label: 'Data & privacy',
    items: [
      {
        q: 'Do recruiters see my full pipeline?',
        a: 'No. Recruiters only ever see applications you explicitly submit to their postings through Trackd — never your saved jobs, other applications, or your compatibility scores for other roles.',
      },
      {
        q: 'How is my resume data used to generate scores?',
        a: 'Your resume is parsed into structured skills and experience, matched against a job’s requirements to produce a score, and used to power AI suggestions. It is never sold or shared with third parties for marketing.',
      },
      {
        q: 'How do I delete my data?',
        a: 'Request deletion anytime from Settings → Danger zone. We remove your account and associated data within 30 days, except records we’re legally required to retain.',
      },
    ],
  },
  {
    id: 'recruiters-hiring',
    label: 'Recruiters & hiring',
    items: [
      {
        q: 'Can I use Trackd alongside our existing ATS?',
        a: "Yes — Trackd sits on top as a pre-vetted, structured view of applicants. It doesn't require replacing your ATS; many teams use it purely for sourcing and scoring.",
      },
      {
        q: 'How are candidates vetted before they reach me?',
        a: 'Every applicant is scored against your job’s structured requirements before you see them, and our moderation team reviews accounts flagged for suspicious activity.',
      },
      {
        q: 'Can multiple teammates access one workspace?',
        a: 'Yes. Recruiter workspaces support multiple seats with shared visibility into roles, candidates, and pipeline status — manage seats from your workspace settings.',
      },
    ],
  },
  {
    id: 'billing-plans',
    label: 'Billing & plans',
    items: [
      {
        q: "What's included in Pro?",
        a: 'Pro adds the AI Optimization Nexus (resume canvas with ATS scoring), tailored cover letter generation, deeper compatibility breakdowns, and Explore Deck marketplace access.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes, from Settings. Your plan stays active through the end of the current billing period, and you keep full access to free features afterward.',
      },
      {
        q: 'Do you offer team or enterprise pricing?',
        a: 'Yes — recruiter workspaces scale by seats and hiring volume. Contact us for a plan tailored to your team size.',
      },
    ],
  },
  {
    id: 'policies-operations',
    label: 'Policies & operations',
    items: [
      {
        q: "What's your data retention policy?",
        a: 'Active account data is retained for as long as your account exists. After a deletion request, data is purged from production within 30 days and from backups within 90.',
      },
      {
        q: 'How do you handle disputes between recruiters and candidates?',
        a: 'Our trust & safety team reviews reported disputes (e.g. no-shows, misrepresented postings) and can suspend accounts or listings that violate our terms.',
      },
      {
        q: 'Who can I contact for support?',
        a: 'Reach support@trackd.io for account issues or hello@trackd.io for everything else — we reply within one business day.',
      },
    ],
  },
]
