// Static content + data model for the Recruiter dashboard.
// Transcribed from `trackd-design-inspiration/project/Trackd Dashboard Recruiter.dc.html`.
//
// STAGE NORMALIZATION (deliberate, user-approved deviation from the source):
// The source prototype used applied/screening/interview/offer with no rejected
// state. We normalize to a recruiter-appropriate subset of the canonical
// 5-stage model in `src/lib/statusTokens.ts`:
//   applied    -> Applied         (#06b6d4)
//   screening  -> Applied's hue   (#06b6d4)  — a Trackd sub-stage before Interview,
//                                              borrows the nearest canonical color
//                                              rather than inventing a 6th hue.
//   interview  -> Interviewing    (#f59e0b)
//   offer      -> Offer Received  (#10b981)
//   rejected   -> Rejected/Closed (#ef4444)  — added here; the source has no reject
//                                              state, but recruiters need one.
// There is no "Saved" stage on this side — it's a candidate-only pre-application
// concept that doesn't apply to recruiter-viewed applicants.

import { STATUS_COLORS } from '../../lib/statusTokens'

export type RecruiterStage = 'applied' | 'screening' | 'interview' | 'offer' | 'rejected'

export interface StageMeta {
  label: string
  /** Canonical status color used ONLY as a dot/badge marker — never as body text (AA). */
  color: string
}

export const STAGE_META: Record<RecruiterStage, StageMeta> = {
  applied: { label: 'Applied', color: STATUS_COLORS.Applied },
  screening: { label: 'Screening', color: STATUS_COLORS.Applied }, // borrows Applied's hue
  interview: { label: 'Interview', color: STATUS_COLORS.Interviewing },
  offer: { label: 'Offer', color: STATUS_COLORS['Offer Received'] },
  rejected: { label: 'Rejected', color: STATUS_COLORS['Rejected/Closed'] },
}

export interface StageFilterDef {
  key: RecruiterStage | 'all'
  label: string
}

// Stage-filter pills (adds Rejected vs. the source's 5).
export const STAGE_FILTERS: StageFilterDef[] = [
  { key: 'all', label: 'All' },
  { key: 'applied', label: 'Applied' },
  { key: 'screening', label: 'Screening' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: 'Rejected' },
]

// Progression stages shown in the funnel bar. Rejected is intentionally
// excluded — it's a terminal off-ramp, not a step in the hire progression.
export const FUNNEL_STAGES: RecruiterStage[] = ['applied', 'screening', 'interview', 'offer']

export interface Candidate {
  id: number
  name: string
  headline: string
  match: number
  stage: RecruiterStage
  source: string
  skills: string[]
}

export interface Job {
  id: number
  title: string
  location: string
  comp: string
  isNew: boolean
}

export const JOBS: Job[] = [
  { id: 1, title: 'Senior Frontend Engineer', location: 'Remote', comp: '$150–190k', isNew: false },
  { id: 2, title: 'Product Designer', location: 'SF / Remote', comp: '$130–165k', isNew: true },
  { id: 3, title: 'Backend Engineer', location: 'NYC / Remote', comp: '$145–180k', isNew: false },
]

export const CANDIDATES_BY_JOB: Record<number, Candidate[]> = {
  1: [
    { id: 11, name: 'Maya Alvarez', headline: 'Senior Frontend Engineer · 6 yrs', match: 94, stage: 'interview', source: 'Trackd', skills: ['React', 'TypeScript', 'Next.js'] },
    { id: 12, name: 'Daniel Osei', headline: 'Frontend Engineer · 5 yrs', match: 88, stage: 'screening', source: 'Trackd', skills: ['Vue', 'React', 'CSS'] },
    { id: 13, name: 'Priya Nandakumar', headline: 'Full-stack Engineer · 7 yrs', match: 81, stage: 'applied', source: 'Referral', skills: ['Node.js', 'React', 'AWS'] },
    { id: 14, name: 'Ken Ishida', headline: 'Frontend Engineer · 4 yrs', match: 76, stage: 'applied', source: 'Trackd', skills: ['React', 'Redux'] },
    { id: 15, name: 'Sofia Marin', headline: 'Senior Engineer · 8 yrs', match: 91, stage: 'offer', source: 'Trackd', skills: ['React', 'TypeScript', 'GraphQL'] },
    // Added rejected sample so the Rejected stage isn't purely theoretical.
    { id: 16, name: 'Tom Becker', headline: 'Frontend Engineer · 3 yrs', match: 58, stage: 'rejected', source: 'Trackd', skills: ['jQuery', 'CSS'] },
  ],
  2: [
    { id: 21, name: 'Theo Brandt', headline: 'Product Designer · 5 yrs', match: 89, stage: 'interview', source: 'Trackd', skills: ['Figma', 'Design systems'] },
    { id: 22, name: 'Nina Kowalski', headline: 'Product Designer · 3 yrs', match: 74, stage: 'applied', source: 'Trackd', skills: ['Figma', 'User research'] },
  ],
  3: [
    { id: 31, name: 'Omar Haddad', headline: 'Backend Engineer · 6 yrs', match: 86, stage: 'screening', source: 'Referral', skills: ['Node.js', 'Postgres', 'AWS'] },
    { id: 32, name: 'Grace Liu', headline: 'Backend Engineer · 4 yrs', match: 79, stage: 'applied', source: 'Trackd', skills: ['Python', 'Postgres'] },
    // Added rejected sample.
    { id: 33, name: 'Elias Vogt', headline: 'Backend Engineer · 5 yrs', match: 49, stage: 'rejected', source: 'Indeed', skills: ['PHP', 'MySQL'] },
  ],
}

export interface TalentStoryEntry {
  year: string
  title: string
  desc: string
}

export interface TalentProfile {
  id: number
  name: string
  headline: string
  years: number
  location: string
  skills: string[]
  available: boolean
  story: TalentStoryEntry[]
}

export const TALENT_POOL: TalentProfile[] = [
  {
    id: 1, name: 'Amara Chen', headline: 'Senior Frontend Engineer', years: 7, location: 'SF / Remote', skills: ['React', 'TypeScript', 'GraphQL'], available: true,
    story: [
      { year: '2018', title: 'Frontend Engineer, Lumen', desc: 'Joined as the 2nd frontend hire; built the checkout flow from scratch.' },
      { year: '2020', title: 'Senior Engineer, Lumen', desc: 'Shipped a component library adopted by 4 product teams.' },
      { year: '2023', title: 'Senior Engineer, Current Co.', desc: 'Led the React 18 migration, cutting bundle size 28%.' },
    ],
  },
  {
    id: 2, name: 'Luis Fontaine', headline: 'Product Designer', years: 5, location: 'NYC', skills: ['Figma', 'Design systems'], available: true,
    story: [
      { year: '2019', title: 'Product Designer, Studio Nine', desc: 'Designed onboarding flows for 3 B2B SaaS clients.' },
      { year: '2022', title: 'Senior Designer, Current Co.', desc: 'Built and shipped the company’s first design system.' },
    ],
  },
  {
    id: 3, name: 'Hana Kobayashi', headline: 'Backend Engineer', years: 6, location: 'Remote', skills: ['Node.js', 'Postgres', 'AWS'], available: false,
    story: [
      { year: '2019', title: 'Backend Engineer, DataForge', desc: 'Built the billing service handling 2M+ transactions/mo.' },
      { year: '2022', title: 'Senior Backend Engineer, Current Co.', desc: 'Migrated core services to AWS, improving uptime to 99.98%.' },
    ],
  },
  {
    id: 4, name: 'Marcus Webb', headline: 'Full-stack Engineer', years: 4, location: 'Austin / Remote', skills: ['React', 'Node.js'], available: true,
    story: [
      { year: '2021', title: 'Software Engineer, Bright Labs', desc: 'Shipped end-to-end features across a React/Node stack.' },
      { year: '2023', title: 'Full-stack Engineer, Current Co.', desc: 'Owns the internal admin tooling used by 40+ staff.' },
    ],
  },
  {
    id: 5, name: 'Ines Duarte', headline: 'Staff Engineer', years: 9, location: 'Remote', skills: ['Go', 'Kubernetes', 'AWS'], available: true,
    story: [
      { year: '2016', title: 'Backend Engineer, Corex', desc: 'Built the first version of the payments infra.' },
      { year: '2019', title: 'Senior Engineer, Corex', desc: 'Led migration to Kubernetes, cutting infra cost 35%.' },
      { year: '2023', title: 'Staff Engineer, Current Co.', desc: 'Sets technical direction for the platform team.' },
    ],
  },
  {
    id: 6, name: 'Sam Okafor', headline: 'Product Designer', years: 3, location: 'SF', skills: ['Figma', 'User research'], available: false,
    story: [
      { year: '2021', title: 'Junior Designer, Studio Nine', desc: 'Ran user research for 3 major feature launches.' },
      { year: '2023', title: 'Product Designer, Current Co.', desc: 'Owns the mobile app design end-to-end.' },
    ],
  },
  {
    id: 7, name: 'Petra Novak', headline: 'Frontend Engineer', years: 5, location: 'Remote', skills: ['Vue', 'React', 'CSS'], available: true,
    story: [
      { year: '2019', title: 'Frontend Engineer, Northwind', desc: 'Built the marketing site and internal style guide.' },
      { year: '2022', title: 'Frontend Engineer, Current Co.', desc: 'Migrated legacy Vue app to React incrementally.' },
    ],
  },
  {
    id: 8, name: 'Diego Ramos', headline: 'Data Engineer', years: 6, location: 'NYC / Remote', skills: ['Python', 'Spark', 'AWS'], available: true,
    story: [
      { year: '2018', title: 'Data Analyst, Corex', desc: 'Built the first reporting pipeline for the finance team.' },
      { year: '2021', title: 'Data Engineer, Current Co.', desc: 'Rebuilt the data warehouse on Spark, 10x throughput.' },
    ],
  },
]

export const SUCCESS_STORIES = [
  { name: 'Maya Alvarez', role: 'Senior Frontend Engineer', company: 'Acme Inc.', quote: 'Hired in 3 weeks after applying through Trackd.' },
  { name: 'Sofia Marin', role: 'Senior Engineer', company: 'Acme Inc.', quote: 'Went from applied to offer in 12 days.' },
  { name: 'Theo Brandt', role: 'Product Designer', company: 'Acme Inc.', quote: 'Matched at 89% compatibility — hired within a month.' },
]

export const ACTIVITY_FEED = [
  { text: 'Maya Alvarez moved to Interview — Senior Frontend Engineer', time: '2h ago' },
  { text: 'New applicant — Product Designer', time: '5h ago' },
  { text: 'Offer extended — Sofia Marin', time: '1d ago' },
  { text: 'Role published — Backend Engineer', time: '3d ago' },
]

export const SENIORITY_OPTS = ['Junior', 'Mid', 'Senior', 'Staff+']
export const URGENCY_OPTS = ['Exploratory', 'Actively hiring', 'Urgent — backfill']
export const VALUE_OPTS = ['Work output', 'Attitude', 'Culture fit', 'Efficiency', 'Feedback receptiveness', 'Ownership', 'Collaboration']

export const YEARS_OPTS = [0, 3, 5, 8]

export interface TeamMember {
  id: number
  name: string
  email: string
  role: string
}

export const INITIAL_TEAM: TeamMember[] = [
  { id: 1, name: 'Alex Kim', email: 'alex@acme.com', role: 'Admin' },
  { id: 2, name: 'Priya Rao', email: 'priya@acme.com', role: 'Recruiter' },
]

export interface CompanySettings {
  companyName: string
  fullName: string
  email: string
  website: string
  size: string
  industry: string
}

export const INITIAL_SETTINGS: CompanySettings = {
  companyName: 'Acme Inc.',
  fullName: 'Alex Kim',
  email: 'alex@acme.com',
  website: 'acme.com',
  size: '51–200 employees',
  industry: 'Software',
}

export function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('')
}
