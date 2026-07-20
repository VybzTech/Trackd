import { useState } from 'react'
import DashboardShell, { type DashboardNavItem } from '../components/dashboard/DashboardShell'
import { useTheme } from '../hooks/useTheme'
import {
  CANDIDATES_BY_JOB,
  INITIAL_SETTINGS,
  INITIAL_TEAM,
  JOBS,
  TALENT_POOL,
  type Candidate,
  type CompanySettings,
  type Job,
  type RecruiterStage,
  type TeamMember,
} from '../components/dashboard-recruiter/data'
import { OverviewIcon, RolesIcon, TalentIcon, CandidatesIcon, SettingsIcon, PlusIcon } from '../components/dashboard-recruiter/icons'
import OverviewTab from '../components/dashboard-recruiter/OverviewTab'
import RolesTab from '../components/dashboard-recruiter/RolesTab'
import CandidatesTab from '../components/dashboard-recruiter/CandidatesTab'
import TalentSearchTab from '../components/dashboard-recruiter/TalentSearchTab'
import SettingsTab from '../components/dashboard-recruiter/SettingsTab'
import CandidateDetailDrawer from '../components/dashboard-recruiter/CandidateDetailDrawer'
import TalentPreviewDrawer from '../components/dashboard-recruiter/TalentPreviewDrawer'
import OutreachModal from '../components/dashboard-recruiter/OutreachModal'
import PostRoleModal, { type NewRoleFormState } from '../components/dashboard-recruiter/PostRoleModal'
import { PrimaryButton } from '../components/dashboard-recruiter/ui'

type TabKey = 'overview' | 'roles' | 'talent' | 'candidates' | 'settings'

const NAV_ITEMS: DashboardNavItem[] = [
  { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
  { id: 'roles', label: 'Roles', icon: <RolesIcon /> },
  { id: 'talent', label: 'Talent Search', icon: <TalentIcon /> },
  { id: 'candidates', label: 'Candidates', icon: <CandidatesIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
]

const EMPTY_ROLE_FORM: NewRoleFormState = {
  title: '',
  location: '',
  comp: '',
  years: '',
  stack: '',
  desc: '',
  seniority: 'Mid',
  urgency: 'Actively hiring',
  values: ['Work output'],
}

export default function DashboardRecruiter() {
  const { theme, toggleTheme } = useTheme()

  // ── nav / page-level ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TabKey>('roles')

  // ── roles data (mutable copies of source's static seed data) ─────
  const [jobs, setJobs] = useState<Job[]>(JOBS)
  const [candidatesByJob, setCandidatesByJob] = useState<Record<number, Candidate[]>>(CANDIDATES_BY_JOB)

  // ── Roles tab state ───────────────────────────────────────────────
  const [activeJobId, setActiveJobId] = useState(1)
  const [rolesStageFilter, setRolesStageFilter] = useState<RecruiterStage | 'all'>('all')
  const [rolesSearchQuery, setRolesSearchQuery] = useState('')

  // ── Candidates tab state ──────────────────────────────────────────
  const [candStageFilter, setCandStageFilter] = useState<RecruiterStage | 'all'>('all')
  const [candSearchQuery, setCandSearchQuery] = useState('')
  const [selectedCandIds, setSelectedCandIds] = useState<number[]>([])

  // ── Candidate detail drawer ───────────────────────────────────────
  const [detailId, setDetailId] = useState<number | null>(null)
  const [detailJobId, setDetailJobId] = useState<number | null>(null)

  // ── Talent Search state ───────────────────────────────────────────
  const [talentQuery, setTalentQuery] = useState('')
  const [talentAvailableOnly, setTalentAvailableOnly] = useState(false)
  const [talentLocationFilter, setTalentLocationFilter] = useState('all')
  const [talentSkillFilter, setTalentSkillFilter] = useState('all')
  const [talentMinYears, setTalentMinYears] = useState(0)
  const [previewTalentId, setPreviewTalentId] = useState<number | null>(null)
  const [outreachId, setOutreachId] = useState<number | null>(null)
  const [outreachDraft, setOutreachDraft] = useState('')
  const [outreachSentIds, setOutreachSentIds] = useState<number[]>([])

  // ── Post-role modal ───────────────────────────────────────────────
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [postMode, setPostMode] = useState<'link' | 'form'>('form')
  const [newRoleLink, setNewRoleLink] = useState('')
  const [newRoleForm, setNewRoleForm] = useState<NewRoleFormState>(EMPTY_ROLE_FORM)

  // ── Settings state ────────────────────────────────────────────────
  const [settings, setSettings] = useState<CompanySettings>(INITIAL_SETTINGS)
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [defaultValues, setDefaultValues] = useState<string[]>(['Work output', 'Culture fit'])
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [slackConnected, setSlackConnected] = useState(false)
  const [atsSyncEnabled, setAtsSyncEnabled] = useState(false)

  // ── shared helpers ─────────────────────────────────────────────────
  function setCandidateStage(jobId: number, candId: number, stage: RecruiterStage) {
    setCandidatesByJob((prev) => ({
      ...prev,
      [jobId]: (prev[jobId] ?? []).map((c) => (c.id === candId ? { ...c, stage } : c)),
    }))
  }

  function openDetail(candId: number, jobId: number) {
    setDetailId(candId)
    setDetailJobId(jobId)
  }
  function closeDetail() {
    setDetailId(null)
    setDetailJobId(null)
  }

  const allCandidates = Object.values(candidatesByJob).flat()
  const statCards = [
    { label: 'Open roles', value: String(jobs.length), delta: '1 new this week', deltaAccent: true },
    { label: 'Interviewing', value: String(allCandidates.filter((c) => c.stage === 'interview').length), delta: 'across all roles', deltaAccent: false },
    { label: 'Screening', value: String(allCandidates.filter((c) => c.stage === 'screening').length), delta: 'awaiting decision', deltaAccent: false },
    { label: 'Offers made', value: String(allCandidates.filter((c) => c.stage === 'offer').length), delta: 'awaiting response', deltaAccent: true },
  ]

  const detailCandidate = detailId != null && detailJobId != null ? (candidatesByJob[detailJobId] ?? []).find((c) => c.id === detailId) : undefined

  const previewTalent = previewTalentId != null ? TALENT_POOL.find((t) => t.id === previewTalentId) : undefined
  const outreachTarget = outreachId != null ? TALENT_POOL.find((t) => t.id === outreachId) : undefined

  function confirmPostRole() {
    if (postMode === 'link') {
      const link = newRoleLink.trim()
      if (!link) return
      const newId = Math.max(0, ...jobs.map((j) => j.id)) + 1
      let title = 'New role'
      try {
        title = new URL(link).hostname.replace('www.', '') + ' posting'
      } catch {
        /* not a valid URL — keep the fallback title */
      }
      setJobs((prev) => [...prev, { id: newId, title, location: 'See posting', comp: '—', isNew: true }])
      setCandidatesByJob((prev) => ({ ...prev, [newId]: [] }))
      setPostModalOpen(false)
      setNewRoleLink('')
      setActiveJobId(newId)
      return
    }
    const title = newRoleForm.title.trim()
    if (!title) return
    const newId = Math.max(0, ...jobs.map((j) => j.id)) + 1
    setJobs((prev) => [
      ...prev,
      { id: newId, title, location: newRoleForm.location.trim() || 'Remote', comp: newRoleForm.comp.trim() || '—', isNew: true },
    ])
    setCandidatesByJob((prev) => ({ ...prev, [newId]: [] }))
    setPostModalOpen(false)
    setNewRoleForm(EMPTY_ROLE_FORM)
    setActiveJobId(newId)
  }

  const pageTitle =
    activeTab === 'overview' ? 'Overview' : activeTab === 'candidates' ? 'Candidates' : activeTab === 'talent' ? 'Talent Search' : activeTab === 'settings' ? 'Settings' : 'Roles'

  let headerActions: React.ReactNode = null
  if (activeTab === 'roles') {
    headerActions = (
      <PrimaryButton onClick={() => setPostModalOpen(true)}>
        <PlusIcon />
        <span className="whitespace-nowrap">Post a role</span>
      </PrimaryButton>
    )
  }

  return (
    <DashboardShell
      theme={theme}
      toggleTheme={toggleTheme}
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabKey)}
      pageTitle={pageTitle}
      identityName="Alex Kim"
      identitySubtitle="Recruiter · Acme Inc."
      showSearch={activeTab === 'roles' || activeTab === 'candidates' || activeTab === 'talent'}
      searchValue={activeTab === 'roles' ? rolesSearchQuery : activeTab === 'candidates' ? candSearchQuery : activeTab === 'talent' ? talentQuery : ''}
      onSearchChange={(v) => {
        if (activeTab === 'roles') setRolesSearchQuery(v)
        else if (activeTab === 'candidates') setCandSearchQuery(v)
        else if (activeTab === 'talent') setTalentQuery(v)
      }}
      searchPlaceholder={
        activeTab === 'roles' ? 'Search candidates...' : activeTab === 'candidates' ? 'Search all candidates...' : 'Search by skill, tech stack, location...'
      }
      headerActions={headerActions}
    >
      {activeTab === 'overview' && (
        <OverviewTab
          statCards={statCards}
          jobs={jobs}
          candidatesByJob={candidatesByJob}
          onOpenRolePending={(jobId) => {
            setActiveTab('roles')
            setActiveJobId(jobId)
            setRolesStageFilter('applied')
          }}
        />
      )}

      {activeTab === 'roles' && (
        <RolesTab
          statCards={statCards}
          jobs={jobs}
          candidatesByJob={candidatesByJob}
          activeJobId={activeJobId}
          onSelectJob={(id) => {
            setActiveJobId(id)
            setRolesStageFilter('all')
          }}
          stageFilter={rolesStageFilter}
          onStageFilter={setRolesStageFilter}
          searchQuery={rolesSearchQuery}
          onOpenDetail={openDetail}
          onSetStage={setCandidateStage}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidatesTab
          jobs={jobs}
          candidatesByJob={candidatesByJob}
          stageFilter={candStageFilter}
          onStageFilter={setCandStageFilter}
          searchQuery={candSearchQuery}
          selectedIds={selectedCandIds}
          onToggleSelect={(id) =>
            setSelectedCandIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
          onToggleSelectAll={(ids) => {
            const allSelected = ids.length > 0 && ids.every((id) => selectedCandIds.includes(id))
            setSelectedCandIds((prev) => (allSelected ? prev.filter((id) => !ids.includes(id)) : Array.from(new Set([...prev, ...ids]))))
          }}
          onBulkInterview={() => {
            const flat = Object.entries(candidatesByJob).flatMap(([jid, cands]) => cands.map((c) => ({ ...c, jobId: Number(jid) })))
            selectedCandIds.forEach((id) => {
              const c = flat.find((x) => x.id === id)
              if (c) setCandidateStage(c.jobId, c.id, 'interview')
            })
            setSelectedCandIds([])
          }}
          onClearSelection={() => setSelectedCandIds([])}
          onOpenDetail={openDetail}
          onSetStage={setCandidateStage}
        />
      )}

      {activeTab === 'talent' && (
        <TalentSearchTab
          pool={TALENT_POOL}
          query={talentQuery}
          availableOnly={talentAvailableOnly}
          onToggleAvailable={() => setTalentAvailableOnly((v) => !v)}
          locationFilter={talentLocationFilter}
          onLocationFilter={setTalentLocationFilter}
          skillFilter={talentSkillFilter}
          onSkillFilter={setTalentSkillFilter}
          minYears={talentMinYears}
          onMinYears={setTalentMinYears}
          sentIds={outreachSentIds}
          onOpenPreview={setPreviewTalentId}
          onReachOut={(id) => {
            setOutreachId(id)
            setOutreachDraft('')
          }}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsTab
          settings={settings}
          onSettingsChange={(patch) => setSettings((prev) => ({ ...prev, ...patch }))}
          team={team}
          onRemoveTeamMember={(id) => setTeam((prev) => prev.filter((m) => m.id !== id))}
          inviteName={inviteName}
          inviteEmail={inviteEmail}
          onInviteNameChange={setInviteName}
          onInviteEmailChange={setInviteEmail}
          onAddTeamMember={() => {
            const name = inviteName.trim()
            const email = inviteEmail.trim()
            if (!name || !email) return
            const newId = Math.max(0, ...team.map((m) => m.id)) + 1
            setTeam((prev) => [...prev, { id: newId, name, email, role: 'Recruiter' }])
            setInviteName('')
            setInviteEmail('')
          }}
          defaultValues={defaultValues}
          onToggleDefaultValue={(v) => setDefaultValues((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))}
          notifyEmail={notifyEmail}
          onToggleNotify={() => setNotifyEmail((v) => !v)}
          slackConnected={slackConnected}
          onToggleSlack={() => setSlackConnected((v) => !v)}
          atsSyncEnabled={atsSyncEnabled}
          onToggleAtsSync={() => setAtsSyncEnabled((v) => !v)}
        />
      )}

      {detailCandidate && detailJobId != null && (
        <CandidateDetailDrawer
          candidate={detailCandidate}
          onClose={closeDetail}
          onInterview={() => {
            setCandidateStage(detailJobId, detailCandidate.id, 'interview')
            closeDetail()
          }}
        />
      )}

      {previewTalent && (
        <TalentPreviewDrawer
          talent={previewTalent}
          sent={outreachSentIds.includes(previewTalent.id)}
          onClose={() => setPreviewTalentId(null)}
          onReachOut={() => {
            setOutreachId(previewTalent.id)
            setOutreachDraft('')
            setPreviewTalentId(null)
          }}
        />
      )}

      {outreachTarget && (
        <OutreachModal
          targetName={outreachTarget.name}
          draft={outreachDraft}
          onDraftChange={setOutreachDraft}
          onClose={() => {
            setOutreachId(null)
            setOutreachDraft('')
          }}
          onSend={() => {
            setOutreachSentIds((prev) => [...prev, outreachTarget.id])
            setOutreachId(null)
            setOutreachDraft('')
          }}
        />
      )}

      {postModalOpen && (
        <PostRoleModal
          mode={postMode}
          onModeChange={setPostMode}
          link={newRoleLink}
          onLinkChange={setNewRoleLink}
          form={newRoleForm}
          onFormChange={(patch) => setNewRoleForm((prev) => ({ ...prev, ...patch }))}
          onClose={() => setPostModalOpen(false)}
          onConfirm={confirmPostRole}
        />
      )}
    </DashboardShell>
  )
}
