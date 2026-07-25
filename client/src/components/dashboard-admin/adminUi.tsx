import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { Theme } from '../../lib/landingData'
import type {
  AccountStatus,
  FlagStatus,
  IncidentSeverity,
  IncidentStatus,
  RoleStatus,
  Severity,
  TicketStatus,
} from './adminData'

/**
 * ── Colour law for this dashboard ────────────────────────────────────────
 * STATE SIGNALS (account / flag / ticket / incident status, severity, and
 * risk score) use ONE restrained semantic vocabulary — three tones:
 *   • neutral  — calm / resting / done (active, resolved, closed, filled, low, info)
 *   • warning  — needs attention, not yet bad (open, flagged, monitoring, medium)
 *   • critical — bad / urgent (suspended, escalated, high, critical incident)
 * Nothing else gets a colour: an ops operator scans for amber/red, so the
 * default resting state is quiet grey.
 *
 * BRAND CHROME (KPI deltas, chart series, activity dots, primary buttons,
 * focus rings, the "operational" pill, reply-author names) stays on the
 * cyan/blue brand accent (var(--glow-top) / var(--info)). It is never a
 * state signal, so it never enters the semantic vocabulary.
 *
 * Amber & red are the only hues added on top of the prototype's blue/grey
 * register — semantic status colour, exactly the Linear/Vercel pattern, not
 * a decorative admin-kit palette. Text hues are theme-dependent (computed
 * from `theme`, not baked into shared index.css) so both themes hit WCAG AA.
 */
export type Tone = 'neutral' | 'warning' | 'critical'

interface ToneColors {
  color: string
  background: string
  borderColor: string
}

export function toneColors(tone: Tone, theme: Theme): ToneColors {
  const dark = theme === 'dark'
  if (tone === 'warning') {
    return dark
      ? { color: '#f2b84b', background: 'rgba(240,178,70,0.13)', borderColor: 'rgba(240,178,70,0.34)' }
      : { color: '#8a5600', background: 'rgba(180,120,20,0.13)', borderColor: 'rgba(180,120,20,0.30)' }
  }
  if (tone === 'critical') {
    return dark
      ? { color: '#f4707c', background: 'rgba(244,112,124,0.13)', borderColor: 'rgba(244,112,124,0.34)' }
      : { color: '#b02631', background: 'rgba(176,38,49,0.11)', borderColor: 'rgba(176,38,49,0.28)' }
  }
  // neutral
  return {
    color: 'var(--text-2)',
    background: 'var(--surface-2, var(--surface-alt))',
    borderColor: 'var(--border)',
  }
}

/** Bare hue for a tone (mono numbers, ring strokes) — no chip background. */
export function toneHue(tone: Tone, theme: Theme): string {
  if (tone === 'neutral') return 'var(--text-3)'
  return toneColors(tone, theme).color
}

// ── status → tone mappers (pure) ────────────────────────────────────────
export function accountStatusTone(s: AccountStatus): Tone {
  return s === 'suspended' ? 'critical' : s === 'flagged' ? 'warning' : 'neutral'
}
export function flagStatusTone(s: FlagStatus): Tone {
  return s === 'escalated' ? 'critical' : s === 'open' ? 'warning' : 'neutral'
}
export function severityTone(s: Severity): Tone {
  return s === 'high' ? 'critical' : s === 'medium' ? 'warning' : 'neutral'
}
export function roleStatusTone(_s: RoleStatus): Tone {
  // Every posting-status maps to neutral: an open/filled/closed posting is a
  // normal lifecycle state, not something an operator needs flagged. The
  // "flagged" boolean (rendered as a warning dot) carries the attention signal.
  return 'neutral'
}
export function ticketStatusTone(s: TicketStatus): Tone {
  return s === 'escalated' ? 'critical' : s === 'open' ? 'warning' : 'neutral'
}
export function incidentSeverityTone(s: IncidentSeverity): Tone {
  return s === 'critical' ? 'critical' : s === 'warning' ? 'warning' : 'neutral'
}
export function incidentStatusTone(s: IncidentStatus): Tone {
  return s === 'monitoring' ? 'warning' : 'neutral'
}
export function riskTone(risk: number): Tone {
  return risk >= 60 ? 'critical' : risk >= 30 ? 'warning' : 'neutral'
}

/**
 * ── Spacing & shape scale ────────────────────────────────────────────────
 * A deliberate 2-tier padding rhythm and a small radius set, shared by every
 * tab/drawer so the whole dashboard reads as one system (no per-instance
 * one-off values):
 *   • PAD_CARD (24)    — standard cards: KPI stats, list-item cards, tables,
 *                        activity/report panels.
 *   • PAD_FEATURE (32) — hero/feature panels: the growth chart, the large
 *                        Settings section cards.
 *   • RADIUS_CARD (14) — every card/panel.  RADIUS_TILE (12) — nested mini
 *                        tiles inside a surface.  RADIUS_BTN (10) — every
 *                        button and input.  999 is reserved for badges/pills.
 */
export const PAD_CARD = 24
export const PAD_FEATURE = 32
export const RADIUS_CARD = 14
export const RADIUS_TILE = 12
export const RADIUS_BTN = 10

// ── Badge ───────────────────────────────────────────────────────────────
export function Badge({
  tone,
  theme,
  children,
  upper = false,
}: {
  tone: Tone
  theme: Theme
  children: ReactNode
  upper?: boolean
}) {
  const c = toneColors(tone, theme)
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: upper ? 11 : 11.5,
        fontWeight: upper ? 700 : 600,
        padding: '4px 10px',
        borderRadius: 999,
        background: c.background,
        border: `1px solid ${c.borderColor}`,
        color: c.color,
        whiteSpace: 'nowrap',
        textTransform: upper ? 'uppercase' : 'none',
        letterSpacing: upper ? '0.03em' : undefined,
      }}
    >
      {children}
    </span>
  )
}

// ── KPI stat card ───────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  delta,
  deltaAccent,
}: {
  label: string
  value: string
  delta: string
  deltaAccent?: boolean
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: RADIUS_CARD,
        padding: PAD_CARD,
        animation: 'revealUp .3s ease-out both',
      }}
    >
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 26,
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: 11.5,
            color: deltaAccent ? 'var(--glow-top)' : 'var(--text-3)',
            fontFamily: deltaAccent ? 'var(--font-mono)' : undefined,
          }}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}

export const statGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 14,
}

export function SectionLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-3)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Segmented filter control ────────────────────────────────────────────
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[]
  value: T
  onChange: (key: T) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 2,
        padding: 3,
        borderRadius: RADIUS_BTN,
        border: '1px solid var(--border)',
        width: 'fit-content',
        maxWidth: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {options.map((o) => {
        const active = o.key === value
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            style={{
              flexShrink: 0,
              whiteSpace: 'nowrap',
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color .15s ease-out, color .15s ease-out',
              background: active ? 'var(--surface-2, var(--surface-alt))' : 'transparent',
              color: active ? 'var(--text)' : 'var(--text-3)',
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function ResultsCount({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
      {children}
    </div>
  )
}

// ── Table primitives (shared across the 5 data tables) ──────────────────
const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '11px 16px',
  color: 'var(--text-3)',
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  borderBottom: '1px solid var(--border)',
  whiteSpace: 'nowrap',
}

/**
 * Bordered table card. The inner track scrolls horizontally when the table is
 * wider than the viewport (mobile) and a right-edge fade appears as a visible
 * "there's more →" cue, hiding itself once scrolled to the end. This is the ONE
 * responsive-table pattern used across every admin data table.
 */
export function TableShell({ headers, children }: { headers: string[]; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [showCue, setShowCue] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const check = () =>
      setShowCue(el.scrollWidth - el.clientWidth > 2 && el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    el.addEventListener('scroll', check, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', check)
    }
  }, [children, headers])

  return (
    <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: RADIUS_CARD }}>
      <div ref={trackRef} style={{ overflowX: 'auto', borderRadius: RADIUS_CARD, scrollbarWidth: 'thin' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {showCue && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 1,
            bottom: 1,
            right: 1,
            width: 40,
            borderRadius: `0 ${RADIUS_CARD}px ${RADIUS_CARD}px 0`,
            pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent, var(--bg))',
          }}
        />
      )}
    </div>
  )
}

export const tdStyle: CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  whiteSpace: 'nowrap',
}
export const tdMuted: CSSProperties = { ...tdStyle, color: 'var(--text-2)' }
export const tdMono: CSSProperties = {
  ...tdStyle,
  color: 'var(--text-3)',
  fontFamily: 'var(--font-mono)',
}

/** Clickable table row with a subtle hover fill (keyboard-focusable). */
export function ClickRow({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  const [hover, setHover] = useState(false)
  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      style={{
        cursor: 'pointer',
        transition: 'background-color .15s ease-out',
        backgroundColor: hover ? 'var(--surface-alt)' : 'transparent',
      }}
    >
      {children}
    </tr>
  )
}

/** Card/button that lifts on hover — used for tickets, needs-attention items. */
export function LiftButton({
  onClick,
  children,
  style,
}: {
  onClick: () => void
  children: ReactNode
  style?: CSSProperties
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        textAlign: 'left',
        border: '1px solid',
        borderColor: hover ? 'var(--border-glass)' : 'var(--border)',
        borderRadius: RADIUS_CARD,
        padding: PAD_CARD,
        background: 'transparent',
        cursor: 'pointer',
        transition: 'transform .15s ease-out, border-color .15s ease-out',
        transform: hover ? 'translateY(-2px)' : 'none',
        color: 'var(--text)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

/**
 * ── Button system ────────────────────────────────────────────────────────
 * Two sizes, ONE radius (RADIUS_BTN = 10). `md` (~40px tall) is the primary
 * page/drawer action; `sm` (~35px, comfortable thumb target) is a row action.
 * The brand gradient marks the primary action; outline marks the secondary.
 */
const BRAND_GRADIENT =
  'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)'

// md primary (brand) — the gradient action from the shell
export const primaryBtnStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '10px 16px',
  borderRadius: RADIUS_BTN,
  border: '1px solid rgba(255,255,255,0.22)',
  background: BRAND_GRADIENT,
  color: '#fff',
  fontSize: 13.5,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
}

// md secondary — outline
export const ghostBtnStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: RADIUS_BTN,
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--text)',
  fontWeight: 600,
  fontSize: 13.5,
  cursor: 'pointer',
}

// sm primary (brand) — compact row action
export const smPrimaryBtnStyle: CSSProperties = {
  ...primaryBtnStyle,
  padding: '9px 14px',
  fontSize: 12,
}

// sm secondary — compact outline row action
export const smBtnStyle: CSSProperties = {
  padding: '9px 14px',
  borderRadius: RADIUS_BTN,
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--text-2)',
  fontWeight: 600,
  fontSize: 12,
  cursor: 'pointer',
}
