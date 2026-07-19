// Data transcribed verbatim from the "Trackd For Recruiters" design prototype
// (BULLETS and APPLICANTS arrays in its <script type="text/x-dc"> block).
import type { ComponentType } from 'react'
import { BulletSearchIcon, BulletScoreIcon, BulletStatusIcon, BulletTeamIcon } from './icons'

export interface RecruiterBullet {
  title: string
  desc: string
  Icon: ComponentType
}

export const BULLETS: RecruiterBullet[] = [
  { title: 'Search & filtering', desc: 'Filter every applicant by score, skill, seniority, or source — live, as you type.', Icon: BulletSearchIcon },
  { title: 'Compatibility scoring', desc: 'Every applicant arrives pre-scored against your posting’s requirements.', Icon: BulletScoreIcon },
  { title: 'Automated status updates', desc: 'One click moves a candidate to Interview — their dashboard updates instantly.', Icon: BulletStatusIcon },
  { title: 'Team workspaces', desc: 'Share roles, pipeline, and notes across your whole hiring team.', Icon: BulletTeamIcon },
]

export interface Applicant {
  name: string
  match: number
  stage: string
}

export const APPLICANTS: Applicant[] = [
  { name: 'Maya Alvarez', match: 94, stage: 'Interview' },
  { name: 'Daniel Osei', match: 88, stage: 'Screening' },
  { name: 'Sofia Marin', match: 91, stage: 'Offer' },
]
