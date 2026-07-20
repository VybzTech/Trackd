import { VALUE_OPTS, initials, type CompanySettings, type TeamMember } from './data'
import { Field, Pill, Toggle, PrimaryButton, GhostButton, Avatar } from './ui'

function SettingsCard({ title, children, subtitle }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border p-5" style={{ borderColor: 'var(--border)' }}>
      <div className="mb-1 text-[13px] font-bold">{title}</div>
      {subtitle && (
        <p className="mb-3.5 text-xs" style={{ color: 'var(--text-3)' }}>
          {subtitle}
        </p>
      )}
      <div className={subtitle ? '' : 'mt-4'}>{children}</div>
    </div>
  )
}

export default function SettingsTab({
  settings,
  onSettingsChange,
  team,
  onRemoveTeamMember,
  inviteName,
  inviteEmail,
  onInviteNameChange,
  onInviteEmailChange,
  onAddTeamMember,
  defaultValues,
  onToggleDefaultValue,
  notifyEmail,
  onToggleNotify,
  slackConnected,
  onToggleSlack,
  atsSyncEnabled,
  onToggleAtsSync,
}: {
  settings: CompanySettings
  onSettingsChange: (patch: Partial<CompanySettings>) => void
  team: TeamMember[]
  onRemoveTeamMember: (id: number) => void
  inviteName: string
  inviteEmail: string
  onInviteNameChange: (v: string) => void
  onInviteEmailChange: (v: string) => void
  onAddTeamMember: () => void
  defaultValues: string[]
  onToggleDefaultValue: (v: string) => void
  notifyEmail: boolean
  onToggleNotify: () => void
  slackConnected: boolean
  onToggleSlack: () => void
  atsSyncEnabled: boolean
  onToggleAtsSync: () => void
}) {
  return (
    <>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Settings</h2>
      <p className="mb-7 text-sm" style={{ color: 'var(--text-2)' }}>
        Manage your company profile, team, hiring defaults, and integrations.
      </p>

      <div className="flex max-w-[620px] flex-col gap-6">
        <SettingsCard title="Company profile">
          <div className="mb-[18px] flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] border text-[11px] font-semibold"
              style={{ borderColor: 'var(--border)', color: 'var(--text-3)', background: 'var(--surface-alt)' }}
            >
              Logo
            </div>
            <p className="text-xs leading-[1.5]" style={{ color: 'var(--text-3)' }}>
              Shown to candidates on your job postings.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-3">
              <Field label="Company name" value={settings.companyName} onChange={(v) => onSettingsChange({ companyName: v })} />
              <Field label="Website" value={settings.website} onChange={(v) => onSettingsChange({ website: v })} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Field label="Company size" value={settings.size} onChange={(v) => onSettingsChange({ size: v })} />
              <Field label="Industry" value={settings.industry} onChange={(v) => onSettingsChange({ industry: v })} />
            </div>
            <Field label="Your name" value={settings.fullName} onChange={(v) => onSettingsChange({ fullName: v })} />
            <Field label="Contact email" type="email" value={settings.email} onChange={(v) => onSettingsChange({ email: v })} />
          </div>
        </SettingsCard>

        <SettingsCard title="Team & seats">
          <div className="mb-[18px] flex flex-col gap-2.5">
            {team.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-[10px] border px-3 py-2.5"
                style={{ borderColor: 'var(--border)' }}
              >
                <Avatar text={initials(m.name)} size={30} />
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap text-[13.5px] font-semibold" style={{ color: 'var(--text)' }}>
                    {m.name}
                  </div>
                  <div className="whitespace-nowrap text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                    {m.email}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
                >
                  {m.role}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${m.name}`}
                  onClick={() => onRemoveTeamMember(m.id)}
                  className="h-6 w-6 shrink-0"
                  style={{ border: 'none', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
            <input
              type="text"
              placeholder="Name"
              value={inviteName}
              onChange={(e) => onInviteNameChange(e.target.value)}
              className="flex-[1_1_140px] rounded-[9px] border px-3 py-2.5 text-[13px]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={inviteEmail}
              onChange={(e) => onInviteEmailChange(e.target.value)}
              className="flex-[1_1_160px] rounded-[9px] border px-3 py-2.5 text-[13px]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
            />
            <PrimaryButton onClick={onAddTeamMember} className="whitespace-nowrap">
              Invite
            </PrimaryButton>
          </div>
        </SettingsCard>

        <SettingsCard title="Default hiring values" subtitle={'Pre-fills "What matters most" when you post a new role.'}>
          <div className="flex flex-wrap gap-2">
            {VALUE_OPTS.map((label) => (
              <Pill key={label} label={label} active={defaultValues.includes(label)} onClick={() => onToggleDefaultValue(label)} />
            ))}
          </div>
        </SettingsCard>

        <SettingsCard title="Billing">
          <div className="flex flex-wrap items-center justify-between gap-3.5">
            <div>
              <div className="mb-0.5 text-[14.5px] font-bold" style={{ color: 'var(--text)' }}>
                Growth plan
              </div>
              <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                2 seats used · Renews Aug 14
              </div>
            </div>
            <GhostButton>Manage plan</GhostButton>
          </div>
        </SettingsCard>

        <SettingsCard title="Integrations">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-semibold">Slack notifications</div>
                <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                  New applicant alerts posted to a channel
                </div>
              </div>
              <Toggle on={slackConnected} onToggle={onToggleSlack} label="Slack notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-semibold">ATS sync</div>
                <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                  Two-way sync with your existing ATS
                </div>
              </div>
              <Toggle on={atsSyncEnabled} onToggle={onToggleAtsSync} label="ATS sync" />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Preferences">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13.5px] font-semibold">Email notifications</div>
              <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                New applicant &amp; stage change alerts
              </div>
            </div>
            <Toggle on={notifyEmail} onToggle={onToggleNotify} label="Email notifications" />
          </div>
        </SettingsCard>

        <SettingsCard title="Danger zone">
          <p className="mb-3.5 text-xs" style={{ color: 'var(--text-3)' }}>
            Permanently delete this workspace and all role and candidate data.
          </p>
          <GhostButton>Delete workspace</GhostButton>
        </SettingsCard>
      </div>
    </>
  )
}
