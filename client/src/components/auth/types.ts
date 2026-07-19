export type Screen = 'signin' | 'signup' | 'role' | 'onboard' | 'done'
export type Role = 'candidate' | 'recruiter'

export interface AuthFields {
  fullName: string
  email: string
  password: string
  targetRole: string
  experience: string | null
  jobStatus: string | null
  companyName: string
  industry: string
  companySize: string | null
  hiringRoles: string[]
  urgency: string | null
}
