import type { JobOpportunity } from '../store/appStore'

/**
 * Fixed pipeline status colors — non-negotiable, per docs/Trackd.md Section 2.1.
 * Reused identically across Kanban columns, table pills, and calendar dots.
 */
export const STATUS_COLOR: Record<JobOpportunity['status'], string> = {
  saved: '#1d4ed8',
  applied: '#06b6d4',
  interviewing: '#f59e0b',
  offer: '#10b981',
  rejected: '#ef4444',
}

export const STATUS_LABEL: Record<JobOpportunity['status'], string> = {
  saved: 'Saved',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer Received',
  rejected: 'Rejected/Closed',
}

export const STATUS_ORDER: JobOpportunity['status'][] = [
  'saved',
  'applied',
  'interviewing',
  'offer',
  'rejected',
]

/** Ingestion-confidence color (distinct from the fixed status palette). */
export function confidenceColor(score: number): string {
  if (score >= 80) return '#10b981'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}
