// Local mock data + shared helpers for the Candidate Dashboard.
//
// Transcribed from the source prototype
// (trackd-design-inspiration/project/Trackd Dashboard Candidate.dc.html),
// normalized from the prototype's 4-stage model (saved/applied/interviewing/
// offer) to the canonical 5-stage model in src/lib/statusTokens.ts by keying
// every record directly on the canonical `status` label — the same field name
// and value set used by docs/mockData.ts — and ADDING a 5th stage,
// 'Rejected/Closed', which the prototype lacks entirely (see the two rejected
// sample apps below so the column/filter/legend are never empty).

import type { CSSProperties } from 'react'
import { STATUS_COLORS, STATUS_ORDER, type ApplicationStatus } from '../../lib/statusTokens'

export type { ApplicationStatus }
export { STATUS_COLORS, STATUS_ORDER }

// Linear "advance" path stops at Offer Received — Rejected/Closed is a terminal
// side-state you reach by drag/drop, never by advancing a stage.
export const ADVANCE_ORDER: ApplicationStatus[] = STATUS_ORDER.slice(0, 4)

export interface CandidateApp {
  id: number
  status: ApplicationStatus
  company: string
  role: string
  match: number
  location: string
  comp: string
  applied: string
  matched: string[]
  missing: string[]
}

export const INITIAL_APPS: CandidateApp[] = [
  { id: 1, status: 'Applied', company: 'Stripe', role: 'Senior Product Designer', match: 88, location: 'Remote', comp: '$150–180k', applied: 'Jun 2', matched: ['Figma', 'Design systems', 'Prototyping'], missing: ['Motion design'] },
  { id: 2, status: 'Applied', company: 'Figma', role: 'Frontend Engineer', match: 81, location: 'Remote', comp: '$140–165k', applied: 'Jun 5', matched: ['React', 'TypeScript'], missing: ['GraphQL'] },
  { id: 3, status: 'Interviewing', company: 'Vercel', role: 'Senior Frontend Engineer', match: 94, location: 'Remote', comp: '$160–190k', applied: 'May 28', matched: ['React', 'Next.js', 'TypeScript', 'Edge functions'], missing: [] },
  { id: 4, status: 'Offer Received', company: 'Linear', role: 'Design Engineer', match: 91, location: 'Remote', comp: '$150–175k', applied: 'May 20', matched: ['React', 'Design systems', 'Motion'], missing: [] },
  { id: 5, status: 'Saved', company: 'Notion', role: 'Product Designer', match: 76, location: 'Remote', comp: '$130–155k', applied: '—', matched: ['Figma'], missing: ['Systems thinking', 'User research'] },
  { id: 6, status: 'Saved', company: 'Ramp', role: 'Backend Engineer', match: 69, location: 'NYC / Remote', comp: '$145–170k', applied: '—', matched: ['Node.js'], missing: ['Kubernetes', 'Postgres'] },
  { id: 7, status: 'Applied', company: 'Ashby', role: 'Frontend Engineer', match: 84, location: 'Remote', comp: '$135–160k', applied: 'Jun 8', matched: ['React', 'TypeScript'], missing: ['Testing'] },
  { id: 8, status: 'Interviewing', company: 'Brex', role: 'Senior Designer', match: 87, location: 'SF / Remote', comp: '$155–180k', applied: 'Jun 1', matched: ['Figma', 'Design systems'], missing: ['Illustration'] },
  // 5th-stage additions (not in the source prototype):
  { id: 9, status: 'Rejected/Closed', company: 'Retool', role: 'Product Designer', match: 62, location: 'Remote', comp: '$140–170k', applied: 'May 9', matched: ['Figma'], missing: ['Motion', 'Systems thinking'] },
  { id: 10, status: 'Rejected/Closed', company: 'Coinbase', role: 'Frontend Engineer', match: 58, location: 'Remote', comp: '$150–185k', applied: 'Apr 24', matched: ['React'], missing: ['GraphQL', 'Web3'] },
]

// ── Explore (Pro) ──────────────────────────────────────────────────────────
export interface ExploreJob {
  id: number
  company: string
  role: string
  location: string
  remote: boolean
  comp: string
  stack: string[]
  match: number
}

export const EXPLORE_JOBS: ExploreJob[] = [
  { id: 1, company: 'Anthropic', role: 'Applied AI Engineer', location: 'Remote', remote: true, comp: '$180–220k', stack: ['Python', 'PyTorch'], match: 91 },
  { id: 2, company: 'Vercel', role: 'Senior Frontend Engineer', location: 'SF / Remote', remote: true, comp: '$160–200k', stack: ['React', 'TypeScript', 'Next.js'], match: 94 },
  { id: 3, company: 'Stripe', role: 'Senior Product Designer', location: 'NYC', remote: false, comp: '$150–185k', stack: ['Figma', 'Design systems'], match: 78 },
  { id: 4, company: 'Notion', role: 'Product Designer', location: 'SF / Remote', remote: true, comp: '$135–165k', stack: ['Figma', 'Prototyping'], match: 83 },
  { id: 5, company: 'Ramp', role: 'Backend Engineer', location: 'NYC / Remote', remote: true, comp: '$160–190k', stack: ['Node.js', 'Postgres'], match: 76 },
  { id: 6, company: 'Linear', role: 'Design Engineer', location: 'Remote', remote: true, comp: '$150–180k', stack: ['React', 'CSS', 'Figma'], match: 88 },
  { id: 7, company: 'Scale AI', role: 'Frontend Engineer', location: 'SF / Remote', remote: true, comp: '$150–185k', stack: ['React', 'TypeScript'], match: 85 },
  { id: 8, company: 'Discord', role: 'Backend Engineer', location: 'Remote', remote: true, comp: '$155–195k', stack: ['Elixir', 'Postgres'], match: 69 },
  { id: 9, company: 'Retool', role: 'Product Designer', location: 'Remote', remote: true, comp: '$140–170k', stack: ['Figma', 'Design systems'], match: 80 },
]

// ── Ingestion ──────────────────────────────────────────────────────────────
export interface ExtensionCapture {
  id: number
  company: string
  role: string
  location: string
  comp: string
  tags: string[]
  capturedAt: string
  committed: boolean
}

export const EXTENSION_CAPTURES: ExtensionCapture[] = [
  { id: 1, company: 'Ramp', role: 'Backend Engineer', location: 'NYC / Remote', comp: '$160–190k', tags: ['Node.js', 'Postgres'], capturedAt: '10 min ago', committed: false },
  { id: 2, company: 'Discord', role: 'Frontend Engineer', location: 'Remote', comp: '$140–170k', tags: ['React', 'TypeScript'], capturedAt: '2h ago', committed: false },
  { id: 3, company: 'Airtable', role: 'Product Designer', location: 'SF / Remote', comp: '$135–160k', tags: ['Figma', 'Design systems'], capturedAt: '1d ago', committed: false },
]

export interface ParsedPoolItem {
  company: string
  role: string
  location: string
  comp: string
  tags: string[]
}

export const PARSE_POOL: ParsedPoolItem[] = [
  { company: 'Anthropic', role: 'Applied AI Engineer', location: 'Remote', comp: '$180–220k', tags: ['Python', 'LLMs', 'Evaluation'] },
  { company: 'Scale AI', role: 'Frontend Engineer', location: 'SF / Remote', comp: '$150–185k', tags: ['React', 'TypeScript'] },
  { company: 'Retool', role: 'Product Designer', location: 'Remote', comp: '$140–170k', tags: ['Figma', 'Prototyping'] },
]

export interface DraftApp {
  source: 'paste' | 'extension'
  extId: number | null
  company: string
  role: string
  location: string
  comp: string
  tags: string[]
}

// ── Insights ───────────────────────────────────────────────────────────────
export type DefectSeverity = 'high' | 'medium' | 'low'
export interface Defect {
  severity: DefectSeverity
  title: string
  desc: string
}

export const RESUME_DEFECTS: Defect[] = [
  { severity: 'high', title: 'Missing quantifiable impact', desc: '3 of 4 experience bullets lack a measurable outcome (%, $, time saved).' },
  { severity: 'medium', title: 'Keyword gaps vs. target roles', desc: 'Missing "GraphQL" and "Kubernetes" — both appear in 60%+ of roles you’ve saved.' },
  { severity: 'medium', title: 'Generic summary', desc: 'Your summary reads similarly to 40% of applicants for this role type.' },
  { severity: 'low', title: 'Inconsistent date formatting', desc: 'Mixing "Jan 2023" and "01/2023" across entries.' },
]

export const COVER_LETTER_DEFECTS: Defect[] = [
  { severity: 'high', title: 'No company-specific detail', desc: 'This letter could apply to any company — mention something specific to the role.' },
  { severity: 'medium', title: 'Opening line is generic', desc: '"I am writing to apply for..." — recruiters skim past this in the first sentence.' },
  { severity: 'low', title: 'Runs slightly long', desc: 'At 480 words, this is longer than the ~250 word sweet spot for a first read.' },
]

export interface SkillGap {
  label: string
  yours: number
  market: number
}

export const SKILL_GAP_DATA: SkillGap[] = [
  { label: 'TypeScript', yours: 90, market: 85 },
  { label: 'System Design', yours: 55, market: 80 },
  { label: 'GraphQL', yours: 20, market: 75 },
  { label: 'Kubernetes', yours: 10, market: 60 },
]

export const HIRED_PATTERNS: string[] = [
  'Tailoring the summary per role: 2.3× more likely to reach interview',
  'Following up within 48 hours: response rate nearly doubled',
  'Quantified impact in bullets: 40% higher recruiter response',
]

// ── Calendar ───────────────────────────────────────────────────────────────
export const HEAT_BY_DAY: Record<number, number> = { 2: 1, 5: 2, 8: 1, 9: 1, 12: 2, 14: 3, 15: 1, 18: 2, 20: 1, 22: 2, 24: 1, 27: 4, 28: 1 }
export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export type ReminderType = 'interview' | 'deadline'
export interface Reminder {
  id: number
  monthKey: string
  day: number
  label: string
  type: ReminderType
}

export function defaultReminders(): Reminder[] {
  const now = new Date()
  const monthKey = now.getFullYear() + '-' + now.getMonth()
  return [
    { id: 1, monthKey, day: 14, label: 'Vercel — final interview', type: 'interview' },
    { id: 2, monthKey, day: 24, label: 'Ramp — application deadline', type: 'deadline' },
  ]
}

// ── Overview ───────────────────────────────────────────────────────────────
export interface NextGoal {
  text: string
  source: 'user' | 'ai'
  done: boolean
}

export interface ActivityItem {
  text: string
  time: string
}

export const ACTIVITY_FEED: ActivityItem[] = [
  { text: 'Moved to Interviewing — Vercel', time: '2h ago' },
  { text: 'Compatibility score updated — Brex 87%', time: '1d ago' },
  { text: 'Application saved — Notion', time: '2d ago' },
  { text: 'Offer received — Linear', time: '5d ago' },
]

// ── Settings ───────────────────────────────────────────────────────────────
export interface CandidateSettings {
  fullName: string
  email: string
  jobStatus: string
  headline: string
  phone: string
  location: string
  yearsExp: string
  links: string
  salaryRange: string
  workAuth: string
  remotePref: string
  skills: string[]
}

export const INITIAL_SETTINGS: CandidateSettings = {
  fullName: 'Jordan Rivera',
  email: 'jordan@example.com',
  jobStatus: 'Actively looking',
  headline: 'Senior Frontend Engineer',
  phone: '',
  location: 'San Francisco, CA',
  yearsExp: '5',
  links: 'linkedin.com/in/jordanrivera',
  salaryRange: '$150k–185k',
  workAuth: 'US Citizen',
  remotePref: 'Remote only',
  skills: ['React', 'TypeScript', 'Next.js', 'Design Systems'],
}

export interface StoryMilestone {
  id: number
  year: string
  title: string
  desc: string
}

export const INITIAL_MILESTONES: StoryMilestone[] = [
  { id: 1, year: '2019', title: 'Frontend Engineer, Beta Labs', desc: 'Built an internal component library adopted by 6 product teams.' },
  { id: 2, year: '2022', title: 'Senior Frontend Engineer, Acme Software', desc: 'Led migration of the design system to React 18, cutting bundle size 30%.' },
]

// ── Shared style helpers ─────────────────────────────────────────────────────

/** Match-percentage chip — colored by score threshold (NOT by stage). */
export function matchChipStyle(match: number): CSSProperties {
  const color = match >= 85 ? 'var(--glow-top)' : match >= 70 ? 'var(--text-2)' : 'var(--text-3)'
  const bg = match >= 85 ? 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))' : 'var(--surface-2)'
  const border = match >= 85 ? 'var(--border-glass)' : 'var(--border)'
  return {
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: 999,
    background: bg,
    border: `1px solid ${border}`,
    color,
    flexShrink: 0,
    fontFamily: 'var(--font-mono)',
  }
}

/**
 * Stage badge — the fixed status color appears only as a low-opacity tint +
 * a solid dot, never as the label text. Raw status hex (cyan/amber/green)
 * fails WCAG AA as text on the light-theme surfaces, so the label stays in
 * var(--text) and the color is carried by the dot. Identical treatment in
 * both themes.
 */
export function statusBadgeStyle(status: ApplicationStatus): CSSProperties {
  const c = STATUS_COLORS[status]
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11.5,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 999,
    background: `color-mix(in srgb, ${c} 13%, transparent)`,
    border: '1px solid var(--border)',
    color: 'var(--text)',
    whiteSpace: 'nowrap',
  }
}

export function statusDotStyle(status: ApplicationStatus, size = 7): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: '50%',
    background: STATUS_COLORS[status],
    flexShrink: 0,
  }
}

export function defectSeverityStyle(sev: DefectSeverity): CSSProperties {
  const base: CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: 999,
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  }
  if (sev === 'high') {
    return { ...base, background: 'color-mix(in srgb, var(--glow-top) 14%, var(--surface))', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }
  }
  if (sev === 'medium') {
    return { ...base, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--info)' }
  }
  return { ...base, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-3)' }
}

/** Primary gradient button — the single signature dimensional element. */
export const primaryBtnStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '10px 16px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.22)',
  background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
  color: '#fff',
  fontSize: 13.5,
  fontWeight: 600,
  cursor: 'pointer',
  flexShrink: 0,
  transition: 'transform .15s ease-out, box-shadow .15s ease-out',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(15,82,186,0.3)',
}
