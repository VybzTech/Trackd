import type { Theme } from '../../lib/landingData'
import { cap, type CandAccount, type Company, type RolePosting, type SupportTicket } from './adminData'
import { DrawerCloseIcon } from './adminIcons'
import {
  Badge,
  RADIUS_BTN,
  RADIUS_CARD,
  RADIUS_TILE,
  accountStatusTone,
  ghostBtnStyle,
  primaryBtnStyle,
  riskTone,
  ticketStatusTone,
  toneHue,
  roleStatusTone,
} from './adminUi'

export type DrawerType = 'company' | 'candidate' | 'role' | 'ticket' | null

const closeIconBtnStyle = {
  width: 32,
  height: 32,
  borderRadius: RADIUS_BTN,
  border: 'none',
  background: 'transparent',
  color: 'var(--text-3)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
} as const

const drawerHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 20,
} as const

const statTileStyle = {
  border: '1px solid var(--border)',
  borderRadius: RADIUS_TILE,
  padding: 14,
} as const

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={statTileStyle}>
      <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{value}</div>
    </div>
  )
}

const RISK_RING_CIRCUMFERENCE = 163

export default function DrawerPanel({
  drawerType,
  theme,
  company,
  candidate,
  role,
  ticket,
  replyDraft,
  onReplyDraftChange,
  onClose,
  onToggleCompanyStatus,
  onToggleCandidateStatus,
  onToggleRoleListing,
  onClearRoleFlag,
  onSendTicketReply,
  onToggleTicketClosed,
}: {
  drawerType: DrawerType
  theme: Theme
  company: Company | null
  candidate: CandAccount | null
  role: RolePosting | null
  ticket: SupportTicket | null
  replyDraft: string
  onReplyDraftChange: (v: string) => void
  onClose: () => void
  onToggleCompanyStatus: () => void
  onToggleCandidateStatus: () => void
  onToggleRoleListing: () => void
  onClearRoleFlag: () => void
  onSendTicketReply: () => void
  onToggleTicketClosed: () => void
}) {
  if (!drawerType) return null

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 95,
          background: 'rgba(0,0,0,0.5)',
          animation: 'fadeIn .15s ease-out both',
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(420px, 100vw)',
          zIndex: 96,
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          padding: 24,
          overflowY: 'auto',
          animation: 'slideInRight .25s ease-out both',
        }}
      >
        {drawerType === 'company' && company && (
          <CompanyDrawer company={company} theme={theme} onClose={onClose} onToggleStatus={onToggleCompanyStatus} />
        )}
        {drawerType === 'candidate' && candidate && (
          <CandidateDrawer
            candidate={candidate}
            theme={theme}
            onClose={onClose}
            onToggleStatus={onToggleCandidateStatus}
          />
        )}
        {drawerType === 'ticket' && ticket && (
          <TicketDrawer
            ticket={ticket}
            theme={theme}
            replyDraft={replyDraft}
            onReplyDraftChange={onReplyDraftChange}
            onClose={onClose}
            onSendReply={onSendTicketReply}
            onToggleClosed={onToggleTicketClosed}
          />
        )}
        {drawerType === 'role' && role && (
          <RoleDrawer
            role={role}
            theme={theme}
            onClose={onClose}
            onToggleListing={onToggleRoleListing}
            onClearFlag={onClearRoleFlag}
          />
        )}
      </div>
    </>
  )
}

function CompanyDrawer({
  company,
  theme,
  onClose,
  onToggleStatus,
}: {
  company: Company
  theme: Theme
  onClose: () => void
  onToggleStatus: () => void
}) {
  const suspended = company.status === 'suspended'
  return (
    <>
      <div style={drawerHeaderStyle}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{company.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{company.plan} plan</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={closeIconBtnStyle}>
          <DrawerCloseIcon />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Badge tone={accountStatusTone(company.status)} theme={theme}>
          {cap(company.status)}
        </Badge>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Last active {company.lastActive}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <StatTile label="Seats used" value={`${company.seatsUsed}/${company.seats}`} />
        <StatTile label="Open roles" value={company.openRoles} />
        <StatTile label="Total hires" value={company.hires} />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onClose} style={{ ...ghostBtnStyle, flex: 1 }}>
          Close
        </button>
        <button
          onClick={onToggleStatus}
          style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}
        >
          {suspended ? 'Reinstate workspace' : 'Suspend workspace'}
        </button>
      </div>
    </>
  )
}

function CandidateDrawer({
  candidate,
  theme,
  onClose,
  onToggleStatus,
}: {
  candidate: CandAccount
  theme: Theme
  onClose: () => void
  onToggleStatus: () => void
}) {
  const suspended = candidate.status === 'suspended'
  const ringColor = toneHue(riskTone(candidate.risk), theme)
  const offset = RISK_RING_CIRCUMFERENCE - (candidate.risk / 100) * RISK_RING_CIRCUMFERENCE
  return (
    <>
      <div style={drawerHeaderStyle}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{candidate.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{candidate.email}</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={closeIconBtnStyle}>
          <DrawerCloseIcon />
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: '1px solid var(--border)',
          borderRadius: RADIUS_CARD,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <svg width={64} height={64} viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
          <circle cx={32} cy={32} r={26} fill="none" stroke="var(--border)" strokeWidth={6} />
          <circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke={ringColor}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={RISK_RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset .5s ease-out' }}
          />
        </svg>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: ringColor }}>
            {candidate.risk}/100
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Risk score</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <Badge tone={accountStatusTone(candidate.status)} theme={theme}>
          {cap(candidate.status)}
        </Badge>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
          {candidate.applications} applications · signed up {candidate.signup}
        </span>
      </div>
      {candidate.flags.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 10,
            }}
          >
            Flags
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {candidate.flags.map((fl) => (
              <div
                key={fl}
                style={{
                  fontSize: 12.5,
                  padding: '8px 12px',
                  borderRadius: RADIUS_BTN,
                  background: 'color-mix(in srgb, var(--glow-top) 10%, var(--surface))',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text)',
                }}
              >
                {fl}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onClose} style={{ ...ghostBtnStyle, flex: 1 }}>
          Close
        </button>
        <button onClick={onToggleStatus} style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}>
          {suspended ? 'Reinstate account' : 'Suspend account'}
        </button>
      </div>
    </>
  )
}

function TicketDrawer({
  ticket,
  theme,
  replyDraft,
  onReplyDraftChange,
  onClose,
  onSendReply,
  onToggleClosed,
}: {
  ticket: SupportTicket
  theme: Theme
  replyDraft: string
  onReplyDraftChange: (v: string) => void
  onClose: () => void
  onSendReply: () => void
  onToggleClosed: () => void
}) {
  const roleTagStyle = {
    fontSize: 10.5,
    fontWeight: 700,
    padding: '3px 9px',
    borderRadius: 999,
    background: 'var(--surface-2, var(--surface-alt))',
    border: '1px solid var(--border)',
    color: ticket.role === 'recruiter' ? 'var(--info)' : 'var(--text-2)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.03em',
  }
  return (
    <>
      <div style={drawerHeaderStyle}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{ticket.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{ticket.email}</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={closeIconBtnStyle}>
          <DrawerCloseIcon />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={roleTagStyle}>{cap(ticket.role)}</span>
        <Badge tone={ticketStatusTone(ticket.status)} theme={theme}>
          {cap(ticket.status)}
        </Badge>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{ticket.date}</span>
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 6 }}>{ticket.subject}</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{ticket.message}</p>
      </div>
      {ticket.replies.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {ticket.replies.map((r, i) => (
            <div
              key={i}
              style={{
                border: '1px solid var(--border-glass)',
                background: 'var(--surface-alt)',
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--glow-top)', marginBottom: 4 }}>
                {r.author} · {r.time}
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>
          Reply
        </label>
        <textarea
          rows={4}
          placeholder="Write a response…"
          value={replyDraft}
          onChange={(e) => onReplyDraftChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--surface-alt)',
            color: 'var(--text)',
            fontSize: 13.5,
            resize: 'none',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={onClose} style={{ ...ghostBtnStyle, flex: 1 }}>
          Close
        </button>
        <button
          onClick={onSendReply}
          style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}
        >
          Send reply
        </button>
      </div>
      <button
        onClick={onToggleClosed}
        style={{
          width: '100%',
          padding: 11,
          borderRadius: 10,
          border: '1px solid var(--border)',
          background: 'transparent',
          color: 'var(--text-2)',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer',
        }}
      >
        {ticket.status === 'closed' ? 'Reopen ticket' : 'Mark as closed'}
      </button>
    </>
  )
}

function RoleDrawer({
  role,
  theme,
  onClose,
  onToggleListing,
  onClearFlag,
}: {
  role: RolePosting
  theme: Theme
  onClose: () => void
  onToggleListing: () => void
  onClearFlag: () => void
}) {
  const closed = role.status === 'closed'
  return (
    <>
      <div style={drawerHeaderStyle}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{role.title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{role.company}</div>
        </div>
        <button onClick={onClose} aria-label="Close" style={closeIconBtnStyle}>
          <DrawerCloseIcon />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <Badge tone={roleStatusTone(role.status)} theme={theme}>
          {cap(role.status)}
        </Badge>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
          {role.applicants} applicants · posted {role.posted}
        </span>
      </div>
      {role.flagged && (
        <div
          style={{
            fontSize: 12.5,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'color-mix(in srgb, var(--glow-top) 10%, var(--surface))',
            border: '1px solid var(--border-glass)',
            color: 'var(--text)',
            marginBottom: 20,
          }}
        >
          This posting has been flagged and is pending review.
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={onClose} style={{ ...ghostBtnStyle, flex: 1 }}>
          Close
        </button>
        <button
          onClick={onToggleListing}
          style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}
        >
          {closed ? 'Restore listing' : 'Remove listing'}
        </button>
      </div>
      {role.flagged && (
        <button
          onClick={onClearFlag}
          style={{
            width: '100%',
            padding: 11,
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-2)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Clear flag
        </button>
      )}
    </>
  )
}
