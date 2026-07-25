import { useMemo, useState } from 'react'
import type { Theme } from '../../lib/landingData'
import { cap, type Flag, type FlagStatus } from './adminData'
import {
  Badge,
  FilterTabs,
  PAD_CARD,
  RADIUS_CARD,
  ResultsCount,
  flagStatusTone,
  severityTone,
  smBtnStyle,
  smPrimaryBtnStyle,
} from './adminUi'

type FilterKey = 'all' | FlagStatus
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'escalated', label: 'Escalated' },
  { key: 'resolved', label: 'Resolved' },
]

export default function ModerationTab({
  flags,
  searchQuery,
  theme,
  onEscalate,
  onResolve,
}: {
  flags: Flag[]
  searchQuery: string
  theme: Theme
  onEscalate: (id: number) => void
  onResolve: (id: number) => void
}) {
  const [statusFilter, setStatusFilter] = useState<FilterKey>('all')

  const filtered = useMemo(() => {
    const byStatus = statusFilter === 'all' ? flags : flags.filter((f) => f.status === statusFilter)
    const q = searchQuery.trim().toLowerCase()
    return q ? byStatus.filter((f) => f.subject.toLowerCase().includes(q)) : byStatus
  }, [flags, statusFilter, searchQuery])

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <FilterTabs options={FILTERS} value={statusFilter} onChange={setStatusFilter} />
        <ResultsCount>
          {filtered.length} of {flags.length}
        </ResultsCount>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((f) => {
          const canEscalate = f.status === 'open'
          const canResolve = f.status !== 'resolved'
          return (
            <div
              key={f.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: RADIUS_CARD,
                padding: PAD_CARD,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
                animation: 'revealUp .25s ease-out both',
              }}
            >
              <div style={{ flex: 1, minWidth: 220 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <Badge tone={severityTone(f.severity)} theme={theme} upper>
                    {cap(f.severity)}
                  </Badge>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cap(f.type)}
                  </span>
                  <Badge tone={flagStatusTone(f.status)} theme={theme}>
                    {cap(f.status)}
                  </Badge>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6, lineHeight: 1.4 }}>
                  {f.subject}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  Reported by {f.reporter} · {f.date}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {canEscalate && (
                  <button onClick={() => onEscalate(f.id)} style={smPrimaryBtnStyle}>
                    Escalate
                  </button>
                )}
                {canResolve && (
                  <button onClick={() => onResolve(f.id)} style={smBtnStyle}>
                    Resolve
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
