import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

/**
 * Shared building blocks for the Auth page, transcribed 1:1 from the
 * `Trackd Auth.dc.html` prototype. The prototype defines its own primary-button
 * style (rounded 10px / 13px padding / width 100%) that differs from the shared
 * landing `PrimaryButton` (rounded-xl / px-6 py-3.5 / inline-flex), so we keep a
 * local button here for fidelity rather than reusing the landing one.
 */

const PRIMARY_BASE_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.25), 0 8px 20px rgba(15,82,186,0.3)'
const PRIMARY_HOVER_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.3), 0 12px 28px rgba(15,82,186,0.4)'
const PRIMARY_ACTIVE_SHADOW = 'inset 0 1px 3px rgba(0,0,0,0.3)'

const primaryBase: CSSProperties = {
  width: '100%',
  padding: '13px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.22)',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
  backdropFilter: 'blur(14px)',
  color: '#fff',
  fontSize: '15px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'transform .15s ease-out, box-shadow .15s ease-out',
  boxShadow: PRIMARY_BASE_SHADOW,
}

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /** When true, applies the source's `opacity:0.5; cursor:not-allowed` styling and blocks the click. */
  disabledLook?: boolean
}

export function AuthPrimaryButton({ children, disabledLook, style, onClick, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      onClick={disabledLook ? undefined : onClick}
      style={{
        ...primaryBase,
        ...(disabledLook ? { cursor: 'not-allowed', opacity: 0.5 } : null),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabledLook) return
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = PRIMARY_HOVER_SHADOW
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = PRIMARY_BASE_SHADOW
      }}
      onMouseDown={(e) => {
        if (disabledLook) return
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
        e.currentTarget.style.boxShadow = PRIMARY_ACTIVE_SHADOW
      }}
      onMouseUp={(e) => {
        if (disabledLook) return
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = PRIMARY_HOVER_SHADOW
      }}
    >
      {children}
    </button>
  )
}

/** White "Continue with Google" button (visual only — no real OAuth exists yet). */
export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '12px',
        borderRadius: '10px',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        color: '#1F1F1F',
        fontSize: '14.5px',
        fontWeight: 600,
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'transform .15s ease-out, box-shadow .15s ease-out',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.08)'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
    >
      <svg width="17" height="17" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.5 0 10.5-2.1 14.2-5.6l-6.6-5.4C29.6 34.7 26.9 36 24 36c-5.2 0-9.6-3.1-11.3-7.6l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.4C41.9 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
        />
      </svg>
      Continue with Google
    </button>
  )
}

/** "———— OR EMAIL ————" separator. */
export function OrEmailDivider() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
      <span
        className="whitespace-nowrap font-mono text-xs"
        style={{ color: 'var(--text-3)' }}
      >
        OR EMAIL
      </span>
      <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
    </div>
  )
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

/** Labelled text input matching the prototype's field styling. */
export function TextField({ label, ...inputProps }: TextFieldProps) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[12.5px] font-semibold"
        style={{ color: 'var(--text-2)' }}
      >
        {label}
      </label>
      <AuthInput {...inputProps} />
    </div>
  )
}

/** Bare input with prototype styling — used standalone (e.g. password field with a "Forgot?" link). */
export function AuthInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-[10px] border px-3.5 py-[11px] text-[14.5px]"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--surface-alt)',
        color: 'var(--text)',
      }}
    />
  )
}

/** Selectable pill chip. `chipStyle(selected)` in the prototype. */
export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-[9px] text-[13px] font-semibold transition-all duration-150 ease-out"
      style={{
        border: `1px solid ${selected ? 'var(--border-glass)' : 'var(--border)'}`,
        background: selected ? 'var(--surface-alt)' : 'transparent',
        color: selected ? 'var(--glow-top)' : 'var(--text-2)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}
