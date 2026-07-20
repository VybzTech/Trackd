import type { Theme } from '../../lib/landingData'
import { cap, type Flag } from './adminData'
import { Badge, LiftButton, SectionLabel, StatCard, severityTone, statGridStyle } from './adminUi'

const GROWTH_MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const CAND_SERIES = [980, 1120, 1050, 1300, 1480, 1620]
const REC_SERIES = [12, 18, 15, 22, 28, 34]

const ACTIVITY_FEED = [
  { text: 'Notion posting suspended pending review — Product Designer', time: '1h ago' },
  { text: 'New recruiter workspace onboarded — Ashby', time: '3h ago' },
  { text: 'Escalation opened — Ramp compensation dispute', time: '5h ago' },
  { text: 'Nina Kowalski account flagged for review', time: '6h ago' },
  { text: 'Grace Liu account suspended', time: '1d ago' },
]

export default function OverviewTab({
  flags,
  theme,
  onGoModeration,
}: {
  flags: Flag[]
  theme: Theme
  onGoModeration: () => void
}) {
  const openEscalations = flags.filter((f) => f.status !== 'resolved').length

  const stats = [
    { label: 'Total candidates', value: '18,420', delta: '+1,240 this month', deltaAccent: true },
    { label: 'Total recruiters', value: '342', delta: '+9 this week', deltaAccent: true },
    { label: 'Open roles', value: '1,180', delta: '74 new this week', deltaAccent: false },
    { label: 'Open escalations', value: String(openEscalations), delta: 'needs review', deltaAccent: true },
  ]

  const candMax = Math.max(...CAND_SERIES)
  const recMax = Math.max(...REC_SERIES)

  const needsAttention = flags
    .filter((f) => f.status !== 'resolved')
    .sort((a, b) => (a.severity === 'high' ? -1 : 1) - (b.severity === 'high' ? -1 : 1))
    .slice(0, 3)

  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 6 }}>
        System overview
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24 }}>
        Platform-wide health across every recruiter and candidate on Trackd.
      </p>

      <div style={{ ...statGridStyle, marginBottom: 24 }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Marketplace growth — dual-series bar chart (brand-chrome colours) */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <SectionLabel>Marketplace growth, last 6 months</SectionLabel>
          <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: 'var(--text-2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--glow-top)' }} />
              Candidates
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--info)' }} />
              Recruiters
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
          {GROWTH_MONTHS.map((m, i) => (
            <div
              key={m}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '100%' }}>
                <div
                  style={{
                    width: 10,
                    height: `${(CAND_SERIES[i] / candMax) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    background: 'var(--glow-top)',
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: `${(REC_SERIES[i] / recMax) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    background: 'var(--info)',
                    opacity: 0.85,
                  }}
                />
              </div>
              <span style={{ fontSize: 10.5, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                {m}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <SectionLabel style={{ marginBottom: 12 }}>Needs attention</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {needsAttention.map((f) => (
              <LiftButton
                key={f.id}
                onClick={onGoModeration}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12 }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: 'var(--text)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f.subject}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    {cap(f.type)} · {f.date}
                  </div>
                </div>
                <Badge tone={severityTone(f.severity)} theme={theme}>
                  {cap(f.severity)}
                </Badge>
              </LiftButton>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <SectionLabel style={{ marginBottom: 12 }}>Recent activity</SectionLabel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 16,
            }}
          >
            {ACTIVITY_FEED.map((a) => (
              <div key={a.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--glow-top)',
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
