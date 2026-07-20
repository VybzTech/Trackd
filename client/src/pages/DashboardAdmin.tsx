import { useState } from 'react'
import DashboardShell from '../components/dashboard/DashboardShell'
import { useTheme } from '../hooks/useTheme'
import {
  ADMIN_USERS,
  CAND_ACCOUNTS,
  COMPANIES,
  FLAGS,
  NAV_ITEMS,
  ROLE_POSTINGS,
  SUPPORT_TICKETS,
  TITLE_MAP,
  type AdminRole,
  type AdminTab,
  type AdminUser,
  type CandAccount,
  type Company,
  type Flag,
  type RolePosting,
  type SupportTicket,
} from '../components/dashboard-admin/adminData'
import { NavIcon, PlusIcon } from '../components/dashboard-admin/adminIcons'
import OverviewTab from '../components/dashboard-admin/OverviewTab'
import RecruitersTab from '../components/dashboard-admin/RecruitersTab'
import CandidatesTab from '../components/dashboard-admin/CandidatesTab'
import RolesTab from '../components/dashboard-admin/RolesTab'
import ModerationTab from '../components/dashboard-admin/ModerationTab'
import SupportTab from '../components/dashboard-admin/SupportTab'
import ReportsTab, { type ReportPeriod } from '../components/dashboard-admin/ReportsTab'
import SystemTab from '../components/dashboard-admin/SystemTab'
import SettingsTab from '../components/dashboard-admin/SettingsTab'
import DrawerPanel, { type DrawerType } from '../components/dashboard-admin/DrawerPanel'
import { primaryBtnStyle } from '../components/dashboard-admin/adminUi'

export default function DashboardAdmin() {
  const { theme, toggleTheme } = useTheme()

  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  // ── Cross-tab mutable data (Overview/Support stats derive from these) ──
  const [companies, setCompanies] = useState<Company[]>(COMPANIES)
  const [candAccounts, setCandAccounts] = useState<CandAccount[]>(CAND_ACCOUNTS)
  const [roles, setRoles] = useState<RolePosting[]>(ROLE_POSTINGS)
  const [flags, setFlags] = useState<Flag[]>(FLAGS)
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(ADMIN_USERS)

  // ── Header search, one query per searchable tab (feeds the shell's box) ─
  const [recSearchQuery, setRecSearchQuery] = useState('')
  const [candSearchQuery, setCandSearchQuery] = useState('')
  const [roleSearchQuery, setRoleSearchQuery] = useState('')
  const [flagSearchQuery, setFlagSearchQuery] = useState('')
  const [ticketSearchQuery, setTicketSearchQuery] = useState('')
  const [auditSearchQuery, setAuditSearchQuery] = useState('')

  // ── Drawer ──
  const [drawerType, setDrawerType] = useState<DrawerType>(null)
  const [drawerId, setDrawerId] = useState<number | null>(null)
  const [ticketReplyDraft, setTicketReplyDraft] = useState('')

  // ── Reports ──
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('30d')
  const [reportGenerated, setReportGenerated] = useState(false)

  // ── Settings / platform controls ──
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [pauseSignups, setPauseSignups] = useState(false)
  const [lockdownActive, setLockdownActive] = useState(false)

  const closeDrawer = () => {
    setDrawerType(null)
    setDrawerId(null)
  }
  const openDrawer = (type: DrawerType, id: number) => {
    setDrawerType(type)
    setDrawerId(id)
    if (type === 'ticket') setTicketReplyDraft('')
  }

  const activeCompany = drawerType === 'company' ? companies.find((c) => c.id === drawerId) ?? null : null
  const activeCandidate = drawerType === 'candidate' ? candAccounts.find((c) => c.id === drawerId) ?? null : null
  const activeRole = drawerType === 'role' ? roles.find((r) => r.id === drawerId) ?? null : null
  const activeTicket = drawerType === 'ticket' ? tickets.find((t) => t.id === drawerId) ?? null : null

  const navItems = NAV_ITEMS.map((n) => ({ id: n.key, label: n.label, icon: <NavIcon tab={n.key} /> }))

  const sidebarExtra = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        margin: '0 12px 10px',
        borderRadius: 10,
        background: 'var(--surface-alt)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: 'var(--glow-top)',
          flexShrink: 0,
          animation: 'pulseDot 2s ease-in-out infinite',
        }}
      />
      <span style={{ fontSize: 11.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
        All systems operational
      </span>
    </div>
  )

  // One search box lives in the shell header; which tab's query it edits
  // depends on activeTab (mirrors the source's per-tab <sc-if> search inputs).
  const searchByTab: Partial<
    Record<AdminTab, { value: string; onChange: (v: string) => void; placeholder: string }>
  > = {
    recruiters: { value: recSearchQuery, onChange: setRecSearchQuery, placeholder: 'Search recruiters...' },
    candidates: { value: candSearchQuery, onChange: setCandSearchQuery, placeholder: 'Search candidates...' },
    roles: { value: roleSearchQuery, onChange: setRoleSearchQuery, placeholder: 'Search postings...' },
    moderation: { value: flagSearchQuery, onChange: setFlagSearchQuery, placeholder: 'Search flags...' },
    support: { value: ticketSearchQuery, onChange: setTicketSearchQuery, placeholder: 'Search tickets...' },
    reports: { value: auditSearchQuery, onChange: setAuditSearchQuery, placeholder: 'Search audit log...' },
  }
  const activeSearch = searchByTab[activeTab]

  const headerActions =
    activeTab === 'reports' ? (
      <button
        onClick={() => setReportGenerated(true)}
        style={{ ...primaryBtnStyle, flexShrink: 0 }}
      >
        <PlusIcon />
        <span style={{ whiteSpace: 'nowrap' }}>Generate report</span>
      </button>
    ) : undefined

  return (
    <DashboardShell
      theme={theme}
      toggleTheme={toggleTheme}
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as AdminTab)}
      pageTitle={TITLE_MAP[activeTab]}
      sidebarExtra={sidebarExtra}
      identityName="Sam Patel"
      identitySubtitle="Super Admin · Trackd"
      showSearch={Boolean(activeSearch)}
      searchValue={activeSearch?.value}
      onSearchChange={activeSearch?.onChange}
      searchPlaceholder={activeSearch?.placeholder}
      headerActions={headerActions}
    >
      {activeTab === 'overview' && (
        <OverviewTab flags={flags} theme={theme} onGoModeration={() => setActiveTab('moderation')} />
      )}

      {activeTab === 'recruiters' && (
        <RecruitersTab
          companies={companies}
          searchQuery={recSearchQuery}
          theme={theme}
          onSelect={(id) => openDrawer('company', id)}
        />
      )}

      {activeTab === 'candidates' && (
        <CandidatesTab
          candidates={candAccounts}
          searchQuery={candSearchQuery}
          theme={theme}
          onSelect={(id) => openDrawer('candidate', id)}
        />
      )}

      {activeTab === 'roles' && (
        <RolesTab
          roles={roles}
          searchQuery={roleSearchQuery}
          theme={theme}
          onSelect={(id) => openDrawer('role', id)}
        />
      )}

      {activeTab === 'moderation' && (
        <ModerationTab
          flags={flags}
          searchQuery={flagSearchQuery}
          theme={theme}
          onEscalate={(id) =>
            setFlags((fs) => fs.map((f) => (f.id === id ? { ...f, status: 'escalated' } : f)))
          }
          onResolve={(id) =>
            setFlags((fs) => fs.map((f) => (f.id === id ? { ...f, status: 'resolved' } : f)))
          }
        />
      )}

      {activeTab === 'support' && (
        <SupportTab
          tickets={tickets}
          searchQuery={ticketSearchQuery}
          theme={theme}
          onSelect={(id) => openDrawer('ticket', id)}
        />
      )}

      {activeTab === 'reports' && (
        <ReportsTab
          reportPeriod={reportPeriod}
          onChangePeriod={(p) => {
            setReportPeriod(p)
            setReportGenerated(false)
          }}
          reportGenerated={reportGenerated}
          auditSearchQuery={auditSearchQuery}
        />
      )}

      {activeTab === 'system' && <SystemTab theme={theme} />}

      {activeTab === 'settings' && (
        <SettingsTab
          adminUsers={adminUsers}
          onAddAdmin={(name, email, role: AdminRole) =>
            setAdminUsers((prev) => {
              const newId = Math.max(0, ...prev.map((a) => a.id)) + 1
              return [...prev, { id: newId, name, email, role }]
            })
          }
          maintenanceMode={maintenanceMode}
          onToggleMaintenance={() => setMaintenanceMode((v) => !v)}
          pauseSignups={pauseSignups}
          onToggleSignups={() => setPauseSignups((v) => !v)}
          lockdownActive={lockdownActive}
          onToggleLockdown={() => setLockdownActive((v) => !v)}
        />
      )}

      <DrawerPanel
        drawerType={drawerType}
        theme={theme}
        company={activeCompany}
        candidate={activeCandidate}
        role={activeRole}
        ticket={activeTicket}
        replyDraft={ticketReplyDraft}
        onReplyDraftChange={setTicketReplyDraft}
        onClose={closeDrawer}
        onToggleCompanyStatus={() => {
          if (!activeCompany) return
          setCompanies((cs) =>
            cs.map((c) =>
              c.id === activeCompany.id ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' } : c,
            ),
          )
        }}
        onToggleCandidateStatus={() => {
          if (!activeCandidate) return
          setCandAccounts((cs) =>
            cs.map((c) =>
              c.id === activeCandidate.id
                ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' }
                : c,
            ),
          )
        }}
        onToggleRoleListing={() => {
          if (!activeRole) return
          setRoles((rs) =>
            rs.map((r) => (r.id === activeRole.id ? { ...r, status: r.status === 'closed' ? 'open' : 'closed' } : r)),
          )
        }}
        onClearRoleFlag={() => {
          if (!activeRole) return
          setRoles((rs) => rs.map((r) => (r.id === activeRole.id ? { ...r, flagged: false } : r)))
        }}
        onSendTicketReply={() => {
          const text = ticketReplyDraft.trim()
          if (!text || !activeTicket) return
          setTickets((ts) =>
            ts.map((t) =>
              t.id === activeTicket.id
                ? { ...t, status: 'replied', replies: [...t.replies, { author: 'Sam Patel', time: 'Just now', text }] }
                : t,
            ),
          )
          setTicketReplyDraft('')
        }}
        onToggleTicketClosed={() => {
          if (!activeTicket) return
          setTickets((ts) =>
            ts.map((t) => (t.id === activeTicket.id ? { ...t, status: t.status === 'closed' ? 'open' : 'closed' } : t)),
          )
        }}
      />
    </DashboardShell>
  )
}
