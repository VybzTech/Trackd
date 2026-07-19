import { create } from 'zustand'

export interface JobOpportunity {
  id: string
  company: string
  role: string
  status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected'
  compensation?: { min: number; max: number; currency: string }
  stack?: string[]
  atsKeywords?: string[]
  applicationDeadline?: string
  matchScore?: number
  sourceUrl?: string
  notes?: string
}

export interface UserProfile {
  name: string
  email: string
  resume?: string
  targetRoles?: string[]
}

interface AppStore {
  currentView: 'landing' | 'auth' | 'onboarding' | 'ingestion' | 'dashboard' | 'pro'
  setCurrentView: (view: string) => void
  
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  
  opportunities: JobOpportunity[]
  addOpportunity: (opp: JobOpportunity) => void
  updateOpportunity: (id: string, updates: Partial<JobOpportunity>) => void
  removeOpportunity: (id: string) => void
  
  dashboardView: 'kanban' | 'table' | 'calendar'
  setDashboardView: (view: 'kanban' | 'table' | 'calendar') => void
  
  selectedOpportunity: JobOpportunity | null
  setSelectedOpportunity: (opp: JobOpportunity | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  currentView: 'landing',
  setCurrentView: (view: string) => set({ currentView: view as any }),
  
  user: null,
  setUser: (user: UserProfile) => set({ user }),
  
  opportunities: [],
  addOpportunity: (opp: JobOpportunity) => set((state) => ({
    opportunities: [...state.opportunities, opp]
  })),
  updateOpportunity: (id: string, updates: Partial<JobOpportunity>) => set((state) => ({
    opportunities: state.opportunities.map((opp) => 
      opp.id === id ? { ...opp, ...updates } : opp
    )
  })),
  removeOpportunity: (id: string) => set((state) => ({
    opportunities: state.opportunities.filter((opp) => opp.id !== id)
  })),
  
  dashboardView: 'kanban',
  setDashboardView: (view: 'kanban' | 'table' | 'calendar') => set({ dashboardView: view }),
  
  selectedOpportunity: null,
  setSelectedOpportunity: (opp: JobOpportunity | null) => set({ selectedOpportunity: opp }),
}))
