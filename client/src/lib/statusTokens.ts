/**
 * Canonical 5-stage application status model. Fixed, non-negotiable —
 * sourced from docs/mockData.ts / CLAUDE.md. These colors are used
 * identically everywhere a stage appears (Kanban, table, badges, charts)
 * across both the Candidate and Recruiter dashboards.
 */

export type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer Received' | 'Rejected/Closed'

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Saved: '#1d4ed8',
  Applied: '#06b6d4',
  Interviewing: '#f59e0b',
  'Offer Received': '#10b981',
  'Rejected/Closed': '#ef4444',
}

export const STATUS_ORDER: ApplicationStatus[] = ['Saved', 'Applied', 'Interviewing', 'Offer Received', 'Rejected/Closed']

export const STATUS_SHORT_LABELS: Record<ApplicationStatus, string> = {
  Saved: 'Saved',
  Applied: 'Applied',
  Interviewing: 'Interviewing',
  'Offer Received': 'Offer',
  'Rejected/Closed': 'Rejected',
}
