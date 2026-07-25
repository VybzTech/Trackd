import { useState } from 'react'
import { initialsOf, type AdminRole, type AdminUser } from './adminData'
import { PAD_FEATURE, RADIUS_BTN, RADIUS_CARD, primaryBtnStyle } from './adminUi'

const ROLE_OPTS: AdminRole[] = ['Super Admin', 'Support', 'Moderator']

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        border: '1px solid var(--border-glass)',
        background: on ? 'var(--surface-alt)' : 'var(--surface-2, var(--surface-alt))',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 20 : 2,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: on ? 'var(--glow-top)' : 'var(--text-3)',
          transition: 'left .15s ease-out',
        }}
      />
    </button>
  )
}

export default function SettingsTab({
  adminUsers,
  onAddAdmin,
  maintenanceMode,
  onToggleMaintenance,
  pauseSignups,
  onToggleSignups,
  lockdownActive,
  onToggleLockdown,
}: {
  adminUsers: AdminUser[]
  onAddAdmin: (name: string, email: string, role: AdminRole) => void
  maintenanceMode: boolean
  onToggleMaintenance: () => void
  pauseSignups: boolean
  onToggleSignups: () => void
  lockdownActive: boolean
  onToggleLockdown: () => void
}) {
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<AdminRole>('Support')

  const submitInvite = () => {
    const name = inviteName.trim()
    const email = inviteEmail.trim()
    if (!name || !email) return
    onAddAdmin(name, email, inviteRole)
    setInviteName('')
    setInviteEmail('')
  }

  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 6 }}>
        Admin settings
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28 }}>
        Manage admin access and platform-wide controls.
      </p>

      <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: RADIUS_CARD, padding: PAD_FEATURE }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Admin users</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
            {adminUsers.map((a, i) => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 0',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'var(--surface-2, var(--surface-alt))',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--text-2)',
                    flexShrink: 0,
                  }}
                >
                  {initialsOf(a.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{a.email}</div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--glow-top)',
                    flexShrink: 0,
                  }}
                >
                  {a.role}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              paddingTop: 16,
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)' }}>Invite an admin</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                style={{
                  flex: '1 1 140px',
                  padding: '10px 12px',
                  borderRadius: RADIUS_BTN,
                  border: '1px solid var(--border)',
                  background: 'var(--surface-alt)',
                  color: 'var(--text)',
                  fontSize: 13,
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                style={{
                  flex: '1 1 160px',
                  padding: '10px 12px',
                  borderRadius: RADIUS_BTN,
                  border: '1px solid var(--border)',
                  background: 'var(--surface-alt)',
                  color: 'var(--text)',
                  fontSize: 13,
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {ROLE_OPTS.map((r) => {
                const active = inviteRole === r
                return (
                  <button
                    key={r}
                    onClick={() => setInviteRole(r)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: RADIUS_BTN,
                      fontSize: 12,
                      fontWeight: 600,
                      border: `1px solid ${active ? 'var(--border-glass)' : 'var(--border)'}`,
                      background: active ? 'var(--surface-alt)' : 'transparent',
                      color: active ? 'var(--glow-top)' : 'var(--text-2)',
                      cursor: 'pointer',
                    }}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
            <button
              onClick={submitInvite}
              style={{ ...primaryBtnStyle, alignSelf: 'flex-start', marginTop: 4 }}
            >
              Send invite
            </button>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: RADIUS_CARD, padding: PAD_FEATURE }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Platform controls</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Maintenance mode</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  Shows a banner to all users, pauses new applications
                </div>
              </div>
              <Toggle on={maintenanceMode} onClick={onToggleMaintenance} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>Pause new signups</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  Temporarily disable new recruiter and candidate accounts
                </div>
              </div>
              <Toggle on={pauseSignups} onClick={onToggleSignups} />
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: RADIUS_CARD, padding: PAD_FEATURE }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: 'var(--text-2)' }}>
            Emergency controls
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-3)', marginBottom: 14 }}>
            Immediately restrict platform access for all non-admin roles during an active incident.
          </p>
          <button
            onClick={onToggleLockdown}
            style={{
              padding: '10px 16px',
              borderRadius: RADIUS_BTN,
              border: `1px solid ${lockdownActive ? 'var(--border-glass)' : 'var(--border)'}`,
              background: lockdownActive
                ? 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))'
                : 'transparent',
              color: lockdownActive ? 'var(--glow-top)' : 'var(--text-2)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {lockdownActive ? 'Disable emergency lockdown' : 'Enable emergency lockdown'}
          </button>
        </div>
      </div>
    </>
  )
}
