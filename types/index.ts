/**
 * Universal data types for Trackd job tracking application
 */

export type JobStatus = 'Bookmarked' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface StatusHistoryEntry {
  status: JobStatus;
  changedAt: Date;
  notes?: string;
}

export interface Company {
  name: string;
  industry?: string;
  scale?: 'Startup' | 'Scale-up' | 'Mid-market' | 'Enterprise';
  logo?: string;
}

export interface Role {
  title: string;
  level?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  workMode?: 'Remote' | 'Hybrid' | 'On-site';
  department?: string;
}

export interface Compensation {
  min?: number;
  max?: number;
  currency?: string;
  equity?: string;
  bonus?: string;
}

export interface Timeline {
  detectedDate?: Date;
  appliedDate?: Date;
  deadline?: Date;
  interviewDate?: Date;
}

export interface TechnicalRequirements {
  stack?: string[];
  keywords?: string[];
  requiredSkills?: string[];
  niceToHave?: string[];
}

export interface AIInsights {
  matchScore?: number;
  missingSkills?: string[];
  matchedSkills?: string[];
  tailoredMaterials?: {
    coverLetter?: string;
    resumeEdits?: string[];
  };
}

export interface Job {
  id: string;
  jobLink?: string;
  source?: 'LinkedIn' | 'Indeed' | 'Glassdoor' | 'Extension' | 'Smart Paste' | 'Manual';
  company: Company;
  role: Role;
  compensation?: Compensation;
  timeline?: Timeline;
  status: JobStatus;
  statusHistory?: StatusHistoryEntry[];
  description?: string;
  technicalRequirements?: TechnicalRequirements;
  aiInsights?: AIInsights;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume {
  id: string;
  rawText: string;
  sections: {
    summary?: string;
    experience?: ExperienceEntry[];
    skills?: string[];
    education?: EducationEntry[];
    certifications?: string[];
  };
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperienceEntry {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  resume?: Resume;
  targetRoles?: string[];
  targetIndustries?: string[];
  skills?: string[];
  experienceLevel?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalApplications: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
  bookmarked: number;
}

export interface OnboardingState {
  step: 1 | 2 | 3;
  targetJobTitle?: string;
  targetIndustry?: string;
  experienceLevel?: string;
  resumeText?: string;
}
