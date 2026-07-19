import type { CSSProperties, ReactNode } from 'react'
import type { Role } from './types'
import { AuthPrimaryButton } from './authPrimitives'

interface RolePickerProps {
  role: Role | null
  onSelectRole: (role: Role) => void
  onContinue: () => void
  onBack: () => void
}

const cardBase: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '16px',
  borderRadius: '12px',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'transform .15s ease-out, border-color .15s ease-out, background-color .15s ease-out',
}

function cardStyle(selected: boolean): CSSProperties {
  return {
    ...cardBase,
    border: `1px solid ${selected ? 'var(--border-glass)' : 'var(--border)'}`,
    background: selected ? 'var(--surface-alt)' : 'transparent',
  }
}

function CheckMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--glow-top)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="m5 12 5 5 9-11" />
    </svg>
  )
}

function RoleCard({
  selected,
  icon,
  title,
  subtitle,
  onClick,
}: {
  selected: boolean
  icon: ReactNode
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button style={cardStyle(selected)} onClick={onClick}>
      <div
        className="flex items-center justify-center"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '11px',
          background: 'var(--surface-alt)',
          border: '1px solid var(--border-glass)',
          color: 'var(--glow-top)',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-[15px] font-bold">{title}</div>
        <div className="text-[12.5px]" style={{ color: 'var(--text-3)' }}>
          {subtitle}
        </div>
      </div>
      {selected && <CheckMark />}
    </button>
  )
}

export default function RolePicker({ role, onSelectRole, onContinue, onBack }: RolePickerProps) {
  return (
    <>
      <h2 className="mb-2 text-[26px] font-extrabold tracking-[-0.01em]">How will you use Trackd?</h2>
      <p className="mb-7 text-[14.5px]" style={{ color: 'var(--text-2)' }}>
        This sets up your workspace next.
      </p>

      <div className="mb-6 flex flex-col gap-3">
        <RoleCard
          selected={role === 'candidate'}
          onClick={() => onSelectRole('candidate')}
          title="I'm a candidate"
          subtitle="Track applications & optimize with AI"
          icon={
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          }
        />
        <RoleCard
          selected={role === 'recruiter'}
          onClick={() => onSelectRole('recruiter')}
          title="I'm hiring"
          subtitle="Post roles & review pre-vetted applicants"
          icon={
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="7" height="7" rx="1.4" />
              <rect x="13" y="4" width="7" height="7" rx="1.4" />
              <rect x="4" y="13" width="7" height="7" rx="1.4" />
              <rect x="13" y="13" width="7" height="7" rx="1.4" />
            </svg>
          }
        />
      </div>

      <AuthPrimaryButton onClick={onContinue} disabledLook={!role}>
        Continue →
      </AuthPrimaryButton>
      <p className="mt-[18px] text-center text-[13px]">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onBack()
          }}
          style={{ color: 'var(--text-3)' }}
        >
          ← Back
        </a>
      </p>
    </>
  )
}
