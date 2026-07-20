import type { CandidateApp } from './data'

interface StatCardsProps {
  apps: CandidateApp[]
}

/**
 * The four KPI figures as one connected panel with hairline dividers, rather
 * than four separate bordered boxes (PRODUCT.md law 3 — don't reflexively box
 * every number). The dividers are 1px grid gaps that reveal the container's
 * border-colored background, so they stay clean at any wrap/row count and in
 * both themes.
 */
export default function StatCards({ apps }: StatCardsProps) {
  const totalActive = apps.filter((a) => a.status !== 'Offer Received' && a.status !== 'Rejected/Closed').length
  const interviews = apps.filter((a) => a.status === 'Interviewing').length
  const offers = apps.filter((a) => a.status === 'Offer Received').length
  const avgMatch = apps.length ? Math.round(apps.reduce((s, a) => s + a.match, 0) / apps.length) : 0

  const cards = [
    { label: 'Active applications', value: String(totalActive), delta: '+2 this week', accent: true },
    { label: 'Interviews', value: String(interviews), delta: 'this month', accent: false },
    { label: 'Offers', value: String(offers), delta: 'active', accent: false },
    { label: 'Avg. compatibility', value: avgMatch + '%', delta: '+4 vs last month', accent: true },
  ]

  return (
    <div
      className="mb-6 grid gap-px overflow-hidden rounded-2xl"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--border)',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      }}
    >
      {cards.map((c) => (
        <div key={c.label} className="px-5 py-4" style={{ background: 'var(--bg)' }}>
          <div className="mb-2 text-[12px]" style={{ color: 'var(--text-3)' }}>
            {c.label}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.value}
            </span>
            <span
              className="text-[11.5px]"
              style={c.accent ? { color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' } : { color: 'var(--text-3)' }}
            >
              {c.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
