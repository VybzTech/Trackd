export type Theme = 'dark' | 'light'

export interface NavItem {
  id: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'product', label: 'Product' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'recruiters', label: 'Recruiters' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
]

export interface KanbanCard {
  title: string
  sub: string
  active?: boolean
}

export interface KanbanColumn {
  name: string
  cards: KanbanCard[]
}

export const KANBAN_DATA: KanbanColumn[] = [
  { name: 'Saved', cards: [{ title: 'Stripe', sub: 'Product Designer' }] },
  { name: 'Applied', cards: [{ title: 'Figma', sub: 'Frontend Eng.' }] },
  { name: 'Interviewing', cards: [{ title: 'Vercel', sub: 'Senior Eng.', active: true }] },
  { name: 'Offer', cards: [{ title: 'Linear', sub: 'Design Eng.' }] },
]

export interface Applicant {
  name: string
  role: string
  match: number
  stage: string
  source: string
}

export const APPLICANT_DATA: Applicant[] = [
  { name: 'Maya Alvarez', role: 'Senior Frontend Engineer', match: 94, stage: 'Interview', source: 'Trackd' },
  { name: 'Daniel Osei', role: 'Product Designer', match: 88, stage: 'Screening', source: 'Trackd' },
  { name: 'Priya Nandakumar', role: 'Backend Engineer', match: 81, stage: 'Applied', source: 'Referral' },
  { name: 'Ken Ishida', role: 'Data Analyst', match: 76, stage: 'Applied', source: 'Trackd' },
]

export interface FlowStep {
  num: string
  title: string
  desc: string
}

export const FLOW_STEPS: FlowStep[] = [
  { num: '01', title: 'Capture', desc: 'Paste a URL, forward an email, or drop raw text — no manual entry.' },
  { num: '02', title: 'Structure', desc: 'AI extracts role, comp, stack, and deadlines into clean fields.' },
  { num: '03', title: 'Track', desc: 'Work the pipeline across Kanban, table, and calendar — always in sync.' },
  { num: '04', title: 'Optimize', desc: 'Get a match score and tailored resume edits, job by job.' },
  { num: '05', title: 'Analyze', desc: "See what's actually moving the needle, not what feels like progress." },
]

export type RecruiterBulletIcon = 'search' | 'sync' | 'status' | 'nexus'

export interface RecruiterBullet {
  title: string
  desc: string
  icon: RecruiterBulletIcon
}

export const RECRUITER_BULLETS: RecruiterBullet[] = [
  { title: 'Search & Filtering', desc: 'Filter every applicant by score, skill, seniority, or source — live, as you type.', icon: 'search' },
  { title: 'Job Posting & Sync', desc: 'Post a role once. Manage it whether candidates apply on Trackd or elsewhere.', icon: 'sync' },
  { title: 'Automated Status Updates', desc: 'One click moves a candidate to Interview — their dashboard and inbox update instantly.', icon: 'status' },
  { title: 'Applicant Nexus Sync', desc: 'Two-way sync keeps recruiter actions and candidate pipelines mirrored, no manual re-entry.', icon: 'nexus' },
]

export interface FaqEntry {
  q: string
  a: string
}

export const FAQ_DATA: FaqEntry[] = [
  { q: 'Is Trackd really free for candidates?', a: 'Yes — the core pipeline, Smart Ingestion, and all three tracking views are free, permanently. Pro adds AI resume tools, scoring, and the marketplace.' },
  { q: 'How does the compatibility score work?', a: "We compare your resume against the structured job record — skills, seniority, and keywords — and return a live score plus what's missing, not a black-box number." },
  { q: 'Do recruiters see my data automatically?', a: 'No. Recruiters only see applications you actually submit through Trackd to their postings — never your full pipeline or saved jobs.' },
  { q: 'Can recruiters use this alongside our current ATS?', a: "Yes. Trackd sits on top as a pre-vetted, structured view of applicants — it doesn't require ripping out your existing ATS." },
  { q: 'Is there a browser extension?', a: 'Yes — it captures job pages as you browse, so most postings need zero manual typing.' },
]

export const PRICING_FREE_FEATURES = [
  'Smart Ingestion from any URL or paste',
  'Kanban, table & calendar views',
  'Unlimited applications',
  'Core candidate profile',
]

export const PRICING_PRO_FEATURES = [
  'Everything in Free',
  'AI Optimization Nexus (resume canvas)',
  'Compatibility Scoring per role',
  'Tailored cover letters in seconds',
  'Explore Deck marketplace access',
  'ATS keyword optimization tools',
]

export const PRO_MONTHLY_PRICE = 19
export const PRO_ANNUAL_PRICE = 15
