import { useMemo, useState, type CSSProperties } from 'react'
import type { Theme } from '../../lib/landingData'
import { cap, initialsOf, type SupportTicket, type TicketStatus } from './adminData'
import { Badge, FilterTabs, LiftButton, ResultsCount, StatCard, statGridStyle, ticketStatusTone } from './adminUi'

type FilterKey = 'all' | TicketStatus
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'replied', label: 'Replied' },
  { key: 'escalated', label: 'Escalated' },
  { key: 'closed', label: 'Closed' },
]

const roleTagStyle = (role: 'candidate' | 'recruiter'): CSSProperties => ({
  fontSize: 10.5,
  fontWeight: 700,
  padding: '3px 9px',
  borderRadius: 999,
  background: 'var(--surface-2, var(--surface-alt))',
  border: '1px solid var(--border)',
  color: role === 'recruiter' ? 'var(--info)' : 'var(--text-2)',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
})

export default function SupportTab({
  tickets,
  searchQuery,
  theme,
  onSelect,
}: {
  tickets: SupportTicket[]
  searchQuery: string
  theme: Theme
  onSelect: (id: number) => void
}) {
  const [statusFilter, setStatusFilter] = useState<FilterKey>('all')

  const openCount = tickets.filter((t) => t.status === 'open' || t.status === 'escalated').length
  const stats = [
    { label: 'Open tickets', value: String(openCount), delta: 'needs response', deltaAccent: true },
    { label: 'Avg. first response', value: '3.2h', delta: '-40min vs last week', deltaAccent: true },
    { label: 'Resolved this week', value: '18', delta: '92% CSAT', deltaAccent: false },
    {
      label: 'Escalated',
      value: String(tickets.filter((t) => t.status === 'escalated').length),
      delta: 'trust & safety',
      deltaAccent: false,
    },
  ]

  const filtered = useMemo(() => {
    const byStatus = statusFilter === 'all' ? tickets : tickets.filter((t) => t.status === statusFilter)
    const q = searchQuery.trim().toLowerCase()
    return q
      ? byStatus.filter((t) => (t.name + ' ' + t.subject + ' ' + t.email).toLowerCase().includes(q))
      : byStatus
  }, [tickets, statusFilter, searchQuery])

  return (
    <>
      <div style={{ ...statGridStyle, marginBottom: 24 }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

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
          {filtered.length} of {tickets.length}
        </ResultsCount>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((t) => (
          <LiftButton
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--surface-2, var(--surface-alt))',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12.5,
                fontWeight: 700,
                color: 'var(--text-2)',
                flexShrink: 0,
              }}
            >
              {initialsOf(t.name)}
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
                <span style={roleTagStyle(t.role)}>{cap(t.role)}</span>
                <Badge tone={ticketStatusTone(t.status)} theme={theme}>
                  {cap(t.status)}
                </Badge>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginBottom: 4 }}>{t.subject}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                {t.email} · {t.date}
              </div>
            </div>
          </LiftButton>
        ))}
      </div>
    </>
  )
}
