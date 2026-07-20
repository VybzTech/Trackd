// Static mock content for the platform-Admin dashboard, transcribed 1:1 from
// `trackd-design-inspiration/project/Trackd Dashboard Admin.dc.html`.
// Only the INITIAL constants live here — all mutable copies are held as state
// in DashboardAdmin.tsx (resolving a flag must update the Overview KPIs, etc.).

export type AccountStatus = 'active' | 'flagged' | 'suspended'
export type FlagStatus = 'open' | 'escalated' | 'resolved'
export type Severity = 'low' | 'medium' | 'high'
export type RoleStatus = 'open' | 'filled' | 'closed'
export type TicketStatus = 'open' | 'replied' | 'escalated' | 'closed'
export type IncidentSeverity = 'info' | 'warning' | 'critical'
export type IncidentStatus = 'monitoring' | 'resolved'
export type AdminRole = 'Super Admin' | 'Support' | 'Moderator'

export interface Company {
  id: number
  name: string
  plan: string
  seatsUsed: number
  seats: number
  openRoles: number
  hires: number
  status: AccountStatus
  lastActive: string
}

export interface CandAccount {
  id: number
  name: string
  email: string
  status: AccountStatus
  applications: number
  signup: string
  risk: number
  flags: string[]
}

export interface RolePosting {
  id: number
  title: string
  company: string
  applicants: number
  status: RoleStatus
  posted: string
  flagged: boolean
}

export interface Flag {
  id: number
  type: 'profile' | 'posting' | 'dispute'
  subject: string
  severity: Severity
  status: FlagStatus
  reporter: string
  date: string
}

export interface Incident {
  id: number
  service: string
  severity: IncidentSeverity
  status: IncidentStatus
  time: string
  message: string
}

export interface TicketReply {
  author: string
  time: string
  text: string
}

export interface SupportTicket {
  id: number
  name: string
  email: string
  role: 'candidate' | 'recruiter'
  subject: string
  message: string
  status: TicketStatus
  date: string
  replies: TicketReply[]
}

export interface AdminUser {
  id: number
  name: string
  email: string
  role: AdminRole
}

export interface AuditEntry {
  id: number
  actor: string
  role: string
  action: string
  target: string
  category: 'account' | 'moderation' | 'support' | 'billing' | 'system'
  time: string
}

export interface PastReport {
  id: number
  name: string
  period: string
  generated: string
}

export type AdminTab =
  | 'overview'
  | 'recruiters'
  | 'candidates'
  | 'roles'
  | 'moderation'
  | 'support'
  | 'reports'
  | 'system'
  | 'settings'

export const NAV_ITEMS: { key: AdminTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'recruiters', label: 'Recruiters' },
  { key: 'candidates', label: 'Candidates' },
  { key: 'roles', label: 'Roles' },
  { key: 'moderation', label: 'Moderation' },
  { key: 'support', label: 'Support' },
  { key: 'reports', label: 'Reports' },
  { key: 'system', label: 'System' },
  { key: 'settings', label: 'Settings' },
]

export const TITLE_MAP: Record<AdminTab, string> = {
  overview: 'Overview',
  recruiters: 'Recruiters',
  candidates: 'Candidates',
  roles: 'Roles',
  moderation: 'Moderation',
  support: 'Support',
  reports: 'Reports',
  system: 'System',
  settings: 'Settings',
}

export const AUDIT_LOG: AuditEntry[] = [
  { id: 1, actor: 'Sam Patel', role: 'Super Admin', action: 'Suspended workspace', target: 'Ramp', category: 'account', time: 'Jul 17, 14:02' },
  { id: 2, actor: 'Elena Cho', role: 'Moderator', action: 'Escalated flag', target: 'Nina Kowalski', category: 'moderation', time: 'Jul 16, 09:41' },
  { id: 3, actor: 'System', role: 'Automated', action: 'Suspended account (risk score)', target: 'Grace Liu', category: 'moderation', time: 'Jul 12, 03:10' },
  { id: 4, actor: 'Marcus Webb', role: 'Support', action: 'Replied to ticket', target: 'Priya Shah', category: 'support', time: 'Jul 16, 11:20' },
  { id: 5, actor: 'Priya Shah', role: 'Super Admin', action: 'Invited admin', target: 'Elena Cho', category: 'account', time: 'Jul 14, 16:33' },
  { id: 6, actor: 'Sam Patel', role: 'Super Admin', action: 'Enabled maintenance mode', target: 'Platform', category: 'system', time: 'Jul 11, 22:15' },
  { id: 7, actor: 'System', role: 'Automated', action: 'Removed listing (flagged)', target: 'Backend Engineer @ Ramp', category: 'moderation', time: 'Jul 10, 08:05' },
  { id: 8, actor: 'Sam Patel', role: 'Super Admin', action: 'Reinstated account', target: 'Priya Nandakumar', category: 'account', time: 'Jul 9, 13:47' },
  { id: 9, actor: 'Elena Cho', role: 'Moderator', action: 'Resolved flag', target: 'Product Designer @ Notion', category: 'moderation', time: 'Jul 8, 10:12' },
  { id: 10, actor: 'Sam Patel', role: 'Super Admin', action: 'Updated billing plan', target: 'Stripe', category: 'billing', time: 'Jul 5, 17:30' },
]

export const PAST_REPORTS: PastReport[] = [
  { id: 1, name: 'Q2 2026 Platform Summary', period: 'Apr 1 – Jun 30, 2026', generated: 'Jul 1' },
  { id: 2, name: 'June Moderation Report', period: 'Jun 1 – Jun 30, 2026', generated: 'Jul 1' },
  { id: 3, name: 'May Billing & Growth Report', period: 'May 1 – May 31, 2026', generated: 'Jun 2' },
]

export const COMPANIES: Company[] = [
  { id: 1, name: 'Acme Inc.', plan: 'Growth', seatsUsed: 12, seats: 15, openRoles: 3, hires: 24, status: 'active', lastActive: '2h ago' },
  { id: 2, name: 'Stripe', plan: 'Enterprise', seatsUsed: 40, seats: 50, openRoles: 8, hires: 61, status: 'active', lastActive: '15m ago' },
  { id: 3, name: 'Vercel', plan: 'Enterprise', seatsUsed: 18, seats: 20, openRoles: 5, hires: 33, status: 'active', lastActive: '1h ago' },
  { id: 4, name: 'Linear', plan: 'Growth', seatsUsed: 6, seats: 10, openRoles: 2, hires: 14, status: 'active', lastActive: '3h ago' },
  { id: 5, name: 'Notion', plan: 'Enterprise', seatsUsed: 22, seats: 25, openRoles: 4, hires: 40, status: 'active', lastActive: '30m ago' },
  { id: 6, name: 'Ramp', plan: 'Starter', seatsUsed: 9, seats: 10, openRoles: 1, hires: 8, status: 'suspended', lastActive: '5d ago' },
  { id: 7, name: 'Brex', plan: 'Growth', seatsUsed: 15, seats: 15, openRoles: 3, hires: 19, status: 'active', lastActive: '4h ago' },
  { id: 8, name: 'Ashby', plan: 'Starter', seatsUsed: 5, seats: 10, openRoles: 2, hires: 6, status: 'active', lastActive: '1d ago' },
]

export const CAND_ACCOUNTS: CandAccount[] = [
  { id: 1, name: 'Jordan Rivera', email: 'jordan@example.com', status: 'active', applications: 6, signup: 'Mar 12', risk: 8, flags: [] },
  { id: 2, name: 'Maya Alvarez', email: 'maya.alvarez@mail.com', status: 'active', applications: 9, signup: 'Jan 30', risk: 4, flags: [] },
  { id: 3, name: 'Daniel Osei', email: 'daniel.osei@mail.com', status: 'active', applications: 5, signup: 'Feb 18', risk: 12, flags: [] },
  { id: 4, name: 'Priya Nandakumar', email: 'priya.n@mail.com', status: 'flagged', applications: 11, signup: 'Apr 2', risk: 64, flags: ['Duplicate profile suspected'] },
  { id: 5, name: 'Ken Ishida', email: 'ken.ishida@mail.com', status: 'active', applications: 3, signup: 'May 9', risk: 6, flags: [] },
  { id: 6, name: 'Sofia Marin', email: 'sofia.marin@mail.com', status: 'active', applications: 7, signup: 'Jan 5', risk: 10, flags: [] },
  { id: 7, name: 'Theo Brandt', email: 'theo.brandt@mail.com', status: 'active', applications: 4, signup: 'Jun 1', risk: 5, flags: [] },
  { id: 8, name: 'Nina Kowalski', email: 'nina.k@mail.com', status: 'flagged', applications: 2, signup: 'Jul 10', risk: 71, flags: ['Unverified identity', 'Signup velocity anomaly'] },
  { id: 9, name: 'Omar Haddad', email: 'omar.haddad@mail.com', status: 'active', applications: 8, signup: 'Mar 22', risk: 9, flags: [] },
  { id: 10, name: 'Grace Liu', email: 'grace.liu@mail.com', status: 'suspended', applications: 1, signup: 'Feb 2', risk: 82, flags: ['Fake job offer scam reported'] },
]

export const ROLE_POSTINGS: RolePosting[] = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Acme Inc.', applicants: 5, status: 'open', posted: 'Jun 1', flagged: false },
  { id: 2, title: 'Product Designer', company: 'Acme Inc.', applicants: 2, status: 'open', posted: 'Jun 20', flagged: false },
  { id: 3, title: 'Backend Engineer', company: 'Acme Inc.', applicants: 2, status: 'open', posted: 'May 15', flagged: false },
  { id: 4, title: 'Senior Product Designer', company: 'Stripe', applicants: 14, status: 'open', posted: 'May 2', flagged: false },
  { id: 5, title: 'Senior Frontend Engineer', company: 'Vercel', applicants: 22, status: 'open', posted: 'Apr 28', flagged: false },
  { id: 6, title: 'Design Engineer', company: 'Linear', applicants: 9, status: 'filled', posted: 'Mar 10', flagged: false },
  { id: 7, title: 'Product Designer', company: 'Notion', applicants: 6, status: 'open', posted: 'Jun 15', flagged: true },
  { id: 8, title: 'Backend Engineer', company: 'Ramp', applicants: 3, status: 'closed', posted: 'Feb 9', flagged: true },
  { id: 9, title: 'Senior Designer', company: 'Brex', applicants: 8, status: 'open', posted: 'Jun 1', flagged: false },
  { id: 10, title: 'Frontend Engineer', company: 'Ashby', applicants: 4, status: 'open', posted: 'Jun 8', flagged: false },
]

export const FLAGS: Flag[] = [
  { id: 1, type: 'profile', subject: 'Nina Kowalski — unverified identity, signup velocity anomaly', severity: 'high', status: 'open', reporter: 'System', date: 'Jul 17' },
  { id: 2, type: 'posting', subject: 'Backend Engineer @ Ramp — misleading compensation range', severity: 'high', status: 'escalated', reporter: 'Candidate report', date: 'Jul 15' },
  { id: 3, type: 'profile', subject: 'Priya Nandakumar — duplicate account suspected', severity: 'medium', status: 'open', reporter: 'System', date: 'Jul 16' },
  { id: 4, type: 'dispute', subject: 'Stripe vs. candidate — interview no-show dispute', severity: 'low', status: 'open', reporter: 'Recruiter', date: 'Jul 14' },
  { id: 5, type: 'profile', subject: 'Grace Liu — fake job offer scam reported', severity: 'high', status: 'escalated', reporter: 'Candidate report', date: 'Jul 12' },
  { id: 6, type: 'posting', subject: 'Product Designer @ Notion — spam flag from 3 users', severity: 'medium', status: 'resolved', reporter: 'Candidate report', date: 'Jul 10' },
  { id: 7, type: 'dispute', subject: 'Brex — candidate withdrew after signed offer', severity: 'low', status: 'resolved', reporter: 'Recruiter', date: 'Jul 8' },
]

export const INCIDENTS: Incident[] = [
  { id: 1, service: 'Auth (SSO)', severity: 'warning', status: 'monitoring', time: 'Jul 17, 06:40', message: 'Google SSO callback errors — 0.4% of logins' },
  { id: 2, service: 'Matching Engine', severity: 'info', status: 'resolved', time: 'Jul 17, 09:12', message: 'Elevated latency in scoring pipeline (12m)' },
  { id: 3, service: 'API Gateway', severity: 'critical', status: 'resolved', time: 'Jul 14, 22:03', message: 'Rate-limit misconfiguration caused 502s for 8 min' },
  { id: 4, service: 'Smart Ingestion', severity: 'info', status: 'resolved', time: 'Jul 12, 14:20', message: 'Parser model deploy, brief queue backlog' },
  { id: 5, service: 'Notifications', severity: 'warning', status: 'resolved', time: 'Jul 9, 03:15', message: 'Email delivery delay via provider (45m)' },
  { id: 6, service: 'Database', severity: 'info', status: 'resolved', time: 'Jul 3, 11:00', message: 'Scheduled maintenance, read replicas' },
]

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: 1, name: 'Jordan Rivera', email: 'jordan@example.com', role: 'candidate', subject: 'Extension not capturing job posts', message: "I installed the Trackd extension but clicking it on LinkedIn job posts doesn't add anything to my Ingestion queue.", status: 'open', date: 'Jul 17', replies: [] },
  { id: 2, name: 'Priya Shah (Notion)', email: 'priya.shah@notion.so', role: 'recruiter', subject: 'Billing question on seat count', message: 'We added 3 new teammates this week — when does the seat count update on our invoice?', status: 'replied', date: 'Jul 16', replies: [{ author: 'Marcus Webb', time: 'Jul 16', text: 'Seats update immediately and prorate on your next invoice — no action needed on your end.' }] },
  { id: 3, name: 'Ken Ishida', email: 'ken.ishida@mail.com', role: 'candidate', subject: 'Cover letter generator stuck loading', message: 'The AI cover letter tool has been spinning for 10+ minutes on the Insights page.', status: 'open', date: 'Jul 17', replies: [] },
  { id: 4, name: 'Sam Torres (Brex)', email: 'sam.torres@brex.com', role: 'recruiter', subject: 'Duplicate applicant showing twice', message: 'One candidate appears twice in our Candidates tab for the same role — possible dedupe bug.', status: 'open', date: 'Jul 15', replies: [] },
  { id: 5, name: 'Nina Kowalski', email: 'nina.k@mail.com', role: 'candidate', subject: 'Account flagged in error', message: 'My account shows as flagged but I only have one profile — can someone review?', status: 'escalated', date: 'Jul 16', replies: [{ author: 'Elena Cho', time: 'Jul 16', text: "Escalated to trust & safety for manual review — we'll follow up within 24h." }] },
  { id: 6, name: 'Theo Brandt', email: 'theo.brandt@mail.com', role: 'candidate', subject: 'Feature request: export pipeline to CSV', message: 'Would love a way to export my Pipeline table view for my own records.', status: 'closed', date: 'Jul 10', replies: [{ author: 'Sam Patel', time: 'Jul 11', text: 'Logged for the roadmap, thanks for the suggestion!' }] },
  { id: 7, name: 'Dana Wu (Ashby)', email: 'dana.wu@ashby.com', role: 'recruiter', subject: 'Cannot post role via link', message: 'Pasting our career page URL returns "unable to parse" every time.', status: 'open', date: 'Jul 17', replies: [] },
]

export const ADMIN_USERS: AdminUser[] = [
  { id: 1, name: 'Sam Patel', email: 'sam@trackd.io', role: 'Super Admin' },
  { id: 2, name: 'Priya Shah', email: 'priya@trackd.io', role: 'Super Admin' },
  { id: 3, name: 'Marcus Webb', email: 'marcus@trackd.io', role: 'Support' },
  { id: 4, name: 'Elena Cho', email: 'elena@trackd.io', role: 'Moderator' },
]

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
}
