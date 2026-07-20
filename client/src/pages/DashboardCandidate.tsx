import { useState } from 'react'
import DashboardShell, { type DashboardNavItem } from '../components/dashboard/DashboardShell'
import { useTheme } from '../hooks/useTheme'
import {
  INITIAL_APPS,
  primaryBtnStyle,
  type ApplicationStatus,
  type CandidateApp,
  type DraftApp,
  type NextGoal,
} from '../components/dashboard-candidate/data'
import { ExploreIcon, IngestionIcon, InsightsIcon, OverviewIcon, PipelineIcon, PlusIcon, SettingsIcon } from '../components/dashboard-candidate/icons'
import OverviewTab from '../components/dashboard-candidate/OverviewTab'
import IngestionTab from '../components/dashboard-candidate/IngestionTab'
import PipelineTab from '../components/dashboard-candidate/PipelineTab'
import ExploreTab from '../components/dashboard-candidate/ExploreTab'
import InsightsTab from '../components/dashboard-candidate/InsightsTab'
import SettingsTab from '../components/dashboard-candidate/SettingsTab'
import DetailDrawer from '../components/dashboard-candidate/DetailDrawer'

type TabKey = 'overview' | 'ingestion' | 'pipeline' | 'explore' | 'insights' | 'settings'

const PAGE_TITLES: Record<TabKey, string> = {
  overview: 'Overview',
  ingestion: 'Ingestion',
  pipeline: 'Pipeline',
  explore: 'Explore',
  insights: 'Insights',
  settings: 'Settings',
}

const DISPLAY_NAME = 'Jordan Rivera'

export default function DashboardCandidate() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<TabKey>('pipeline')
  const [apps, setApps] = useState<CandidateApp[]>(INITIAL_APPS)
  const [detailId, setDetailId] = useState<number | null>(null)
  const [isPro, setIsPro] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [nextGoal, setNextGoal] = useState<NextGoal>({ text: 'Follow up with Vercel recruiter', source: 'user', done: false })

  const moveCard = (id: number, status: ApplicationStatus) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const addApp = (input: { company: string; role: string; location: string; comp: string; match?: number; matched?: string[] }) => {
    setApps((prev) => {
      const newId = Math.max(0, ...prev.map((a) => a.id)) + 1
      return [
        ...prev,
        {
          id: newId,
          status: 'Saved',
          company: input.company,
          role: input.role,
          match: input.match ?? 78,
          location: input.location,
          comp: input.comp,
          applied: '—',
          matched: input.matched ?? [],
          missing: [],
        },
      ]
    })
  }

  const commitDraft = (draft: DraftApp) => {
    addApp({ company: draft.company, role: draft.role, location: draft.location, comp: draft.comp, match: 78, matched: draft.tags })
  }

  const togglePlan = () => setIsPro((v) => !v)

  const navItems: DashboardNavItem[] = [
    { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
    { id: 'ingestion', label: 'Ingestion', icon: <IngestionIcon /> },
    { id: 'pipeline', label: 'Pipeline', icon: <PipelineIcon /> },
    { id: 'explore', label: 'Explore', icon: <ExploreIcon /> },
    { id: 'insights', label: 'Insights', icon: <InsightsIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ]

  const sidebarExtra = isPro ? (
    <div className="rounded-xl p-3.5" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}>
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-[12.5px] font-bold" style={{ color: 'var(--glow-top)' }}>
          Trackd Pro
        </span>
        <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: 'var(--surface)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}>
          ACTIVE
        </span>
      </div>
      <div className="text-[11.5px] leading-[1.5]" style={{ color: 'var(--text-3)' }}>
        Explore, ATS scoring &amp; AI cover letters are all unlocked.
      </div>
    </div>
  ) : (
    <div className="rounded-xl p-3.5" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}>
      <div className="mb-1 text-[12.5px] font-bold" style={{ color: 'var(--glow-top)' }}>
        Upgrade to Pro
      </div>
      <div className="mb-2.5 text-[11.5px] leading-[1.5]" style={{ color: 'var(--text-3)' }}>
        Unlock Explore, AI resume rewrites &amp; deeper scoring.
      </div>
      <button
        type="button"
        onClick={togglePlan}
        className="block w-full rounded-lg py-2 text-center text-[12.5px] font-semibold text-white"
        style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer' }}
      >
        See Pro plan
      </button>
    </div>
  )

  const headerActions =
    activeTab === 'pipeline' ? (
      <button type="button" onClick={() => setActiveTab('ingestion')} style={primaryBtnStyle}>
        <PlusIcon />
        <span className="whitespace-nowrap">Add application</span>
      </button>
    ) : undefined

  const activeApp = apps.find((a) => a.id === detailId) ?? null

  return (
    <DashboardShell
      theme={theme}
      toggleTheme={toggleTheme}
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabKey)}
      pageTitle={PAGE_TITLES[activeTab]}
      sidebarExtra={sidebarExtra}
      identityName={DISPLAY_NAME}
      identitySubtitle="Candidate"
      showSearch={activeTab === 'pipeline'}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search applications..."
      headerActions={headerActions}
    >
      {activeTab === 'overview' && (
        <OverviewTab displayName={DISPLAY_NAME} apps={apps} nextGoal={nextGoal} onGoalChange={setNextGoal} onOpenApp={(id) => setDetailId(id)} />
      )}
      {activeTab === 'ingestion' && <IngestionTab onCommit={commitDraft} />}
      {activeTab === 'pipeline' && (
        <PipelineTab apps={apps} searchQuery={searchQuery} onMoveCard={moveCard} onOpenDetail={(id) => setDetailId(id)} />
      )}
      {activeTab === 'explore' && (
        <ExploreTab
          isPro={isPro}
          onUpgrade={togglePlan}
          onSave={(job) => addApp({ company: job.company, role: job.role, location: job.location, comp: job.comp, match: job.match, matched: job.stack })}
        />
      )}
      {activeTab === 'insights' && <InsightsTab apps={apps} onUpgrade={togglePlan} />}
      {activeTab === 'settings' && <SettingsTab isPro={isPro} onTogglePlan={togglePlan} />}

      {activeApp && <DetailDrawer app={activeApp} onClose={() => setDetailId(null)} onMove={moveCard} />}
    </DashboardShell>
  )
}
