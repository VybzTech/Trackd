import type { JobOpportunity } from '../store/appStore'

export type Tone = 'default' | 'success' | 'warning' | 'info' | 'danger' | 'neutral'

/** Maps a job application status to the design system's tone vocabulary. */
export const STATUS_TONE: Record<JobOpportunity['status'], Tone> = {
  saved: 'neutral',
  applied: 'info',
  interviewing: 'warning',
  offer: 'success',
  rejected: 'danger',
}

export const STATUS_LABEL: Record<JobOpportunity['status'], string> = {
  saved: 'Saved',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const STATUS_ORDER: JobOpportunity['status'][] = [
  'saved',
  'applied',
  'interviewing',
  'offer',
  'rejected',
]

/** Maps an extraction-confidence value (0-100) to the design system's tone vocabulary. */
export function confidenceTone(score: number): Tone {
  if (score >= 80) return 'success'
  if (score >= 50) return 'warning'
  return 'danger'
}
