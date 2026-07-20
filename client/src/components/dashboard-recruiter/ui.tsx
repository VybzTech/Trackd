// Shared primitives for the Recruiter dashboard. Kept small and composable so
// tabs/drawers/modals don't each re-declare the same button/pill/toggle styles.

import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { STAGE_META, type RecruiterStage } from './data'
import { CloseIcon } from './icons'

/** Signature raised gradient button (primary CTA). */
export function PrimaryButton({
  children,
  onClick,
  className = '',
  type = 'button',
  style,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  style?: CSSProperties
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[9px] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${className}`}
      style={{
        border: '1px solid rgba(255,255,255,0.22)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(15,82,186,0.3)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

/** Neutral outline button. */
export function GhostButton({
  children,
  onClick,
  className = '',
  ariaLabel,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[9px] border px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-150 ease-out ${className}`}
      style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {children}
    </button>
  )
}

/** Selectable rounded pill (filter chips, seniority/values selectors). */
export function Pill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-150 ease-out"
      style={
        active
          ? { background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }
          : { background: 'transparent', borderColor: 'var(--border)', color: 'var(--text-2)' }
      }
    >
      {label}
    </button>
  )
}

/** Segmented control tab (used for stage filters and modal mode switch). */
export function SegmentButton({
  label,
  active,
  onClick,
  grow = false,
}: {
  label: string
  active: boolean
  onClick: () => void
  grow?: boolean
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-150 ease-out ${grow ? 'flex-1' : ''}`}
      style={{
        border: 'none',
        background: active ? 'var(--surface-2)' : 'transparent',
        color: active ? 'var(--text)' : 'var(--text-3)',
      }}
    >
      {label}
    </button>
  )
}

/** iOS-style toggle switch, keyboard + screen-reader operable. */
export function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className="relative shrink-0 rounded-full border transition-colors duration-150"
      style={{
        width: 42,
        height: 24,
        borderColor: 'var(--border-glass)',
        background: on ? 'var(--surface-alt)' : 'var(--surface-2)',
      }}
    >
      <span
        className="absolute rounded-full transition-all duration-150 ease-out"
        style={{
          top: 2,
          left: on ? 20 : 2,
          width: 18,
          height: 18,
          background: on ? 'var(--glow-top)' : 'var(--text-3)',
        }}
      />
    </button>
  )
}

/** KPI stat card. */
export function StatCard({ label, value, delta, deltaAccent }: { label: string; value: string; delta: string; deltaAccent?: boolean }) {
  return (
    <div
      className="rounded-[14px] border px-[18px] py-4 [animation:revealUp_.3s_ease-out_both]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mb-2 text-xs" style={{ color: 'var(--text-3)' }}>
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className="font-mono text-[26px] font-extrabold tracking-[-0.02em]"
          style={{ color: 'var(--text)' }}
        >
          {value}
        </span>
        <span
          className={deltaAccent ? 'font-mono text-[11.5px]' : 'text-[11.5px]'}
          style={{ color: deltaAccent ? 'var(--glow-top)' : 'var(--text-3)' }}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}

/**
 * Stage badge: neutral high-contrast label + a colored status dot.
 * The dot (not the text) carries the fixed status color, so contrast passes
 * WCAG AA in both themes regardless of the status hue.
 */
export function StageBadge({ stage }: { stage: RecruiterStage }) {
  const meta = STAGE_META[stage]
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11.5px] font-semibold"
      style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
    >
      <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: meta.color }} />
      {meta.label}
    </span>
  )
}

/** Match percentage cell: mono value + thin progress bar (brand accent). */
export function MatchCell({ match }: { match: number }) {
  return (
    <>
      <div className="mb-1 font-mono text-xs" style={{ color: 'var(--glow-top)' }}>
        {match}%
      </div>
      <div className="h-1 w-16 overflow-hidden rounded-sm" style={{ background: 'var(--border)' }}>
        <div className="h-full rounded-sm" style={{ background: 'var(--glow-top)', width: `${match}%` }} />
      </div>
    </>
  )
}

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`text-xs font-semibold uppercase tracking-[0.04em] ${className}`}
      style={{ color: 'var(--text-3)' }}
    >
      {children}
    </div>
  )
}

/** Text/email/textarea field with label, matching the source form styling. */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea = false,
  rows = 3,
  hint,
  optional = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  textarea?: boolean
  rows?: number
  hint?: string
  optional?: boolean
}) {
  const fieldStyle: CSSProperties = {
    borderColor: 'var(--border)',
    background: 'var(--surface-alt)',
    color: 'var(--text)',
  }
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1.5 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
        {label}
        {optional && (
          <span className="font-medium" style={{ color: 'var(--text-3)' }}>
            {' '}
            (optional)
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none rounded-[10px] border px-3.5 py-2.5 text-[13.5px]"
          style={fieldStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-[10px] border px-3.5 py-2.5 text-[14px]"
          style={fieldStyle}
        />
      )}
      {hint && (
        <p className="mt-2 text-[11.5px] leading-[1.5]" style={{ color: 'var(--text-3)' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

/** Centered modal shell with overlay, scale-in, and Escape-to-close. */
export function ModalShell({
  onClose,
  children,
  maxWidth = 440,
  labelledBy,
}: {
  onClose: () => void
  children: ReactNode
  maxWidth?: number
  labelledBy?: string
}) {
  useEscapeClose(onClose)
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.55)', animation: 'fadeIn .15s ease-out both' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="max-h-[88vh] w-full overflow-y-auto rounded-2xl border p-6 sm:p-7"
        style={{
          maxWidth,
          background: 'var(--surface)',
          borderColor: 'var(--border-glass)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          animation: 'scaleIn .18s ease-out both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

/** Right-side drawer shell with overlay, slide-in, and Escape-to-close. */
export function DrawerShell({
  onClose,
  children,
  width = 420,
  z = 96,
  labelledBy,
}: {
  onClose: () => void
  children: ReactNode
  width?: number
  z?: number
  labelledBy?: string
}) {
  useEscapeClose(onClose)
  return (
    <>
      <div
        className="fixed inset-0"
        style={{ zIndex: z - 1, background: 'rgba(0,0,0,0.5)', animation: 'fadeIn .15s ease-out both' }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="fixed bottom-0 right-0 top-0 overflow-y-auto border-l p-6"
        style={{
          zIndex: z,
          width: `min(${width}px, 100vw)`,
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          animation: 'slideInRight .25s ease-out both',
        }}
      >
        {children}
      </div>
    </>
  )
}

/** Small round icon button used for closing drawers. */
export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClose}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150"
      style={{ border: 'none', background: 'transparent', color: 'var(--text-3)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
    >
      <CloseIcon />
    </button>
  )
}

/** Avatar circle with initials. */
export function Avatar({ text, size = 32, accent = false }: { text: string; size?: number; accent?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{
        width: size,
        height: size,
        fontSize: size <= 30 ? 11.5 : size <= 38 ? 14 : 15,
        background: 'var(--surface-2)',
        border: `1px solid ${accent ? 'var(--border-glass)' : 'var(--border)'}`,
        color: accent ? 'var(--glow-top)' : 'var(--text-2)',
      }}
    >
      {text}
    </div>
  )
}

function useEscapeClose(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
}
