import { useMemo, useState } from 'react'
import type { Theme } from '../../lib/landingData'
import { cap, type Company } from './adminData'
import {
  Badge,
  ClickRow,
  FilterTabs,
  ResultsCount,
  TableShell,
  accountStatusTone,
  tdMono,
  tdMuted,
  tdStyle,
} from './adminUi'

const FILTERS: { key: 'all' | Company['status']; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'suspended', label: 'Suspended' },
]

export default function RecruitersTab({
  companies,
  searchQuery,
  theme,
  onSelect,
}: {
  companies: Company[]
  searchQuery: string
  theme: Theme
  onSelect: (id: number) => void
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | Company['status']>('all')

  const filtered = useMemo(() => {
    const byStatus = statusFilter === 'all' ? companies : companies.filter((c) => c.status === statusFilter)
    const q = searchQuery.trim().toLowerCase()
    return q ? byStatus.filter((c) => c.name.toLowerCase().includes(q)) : byStatus
  }, [companies, statusFilter, searchQuery])

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
          {filtered.length} of {companies.length}
        </ResultsCount>
      </div>

      <TableShell headers={['Company', 'Plan', 'Seats', 'Open roles', 'Hires', 'Status', 'Last active']}>
        {filtered.map((c) => (
          <ClickRow key={c.id} onClick={() => onSelect(c.id)}>
            <td style={{ ...tdStyle, fontWeight: 700 }}>{c.name}</td>
            <td style={tdMuted}>{c.plan}</td>
            <td style={{ ...tdMuted, fontFamily: 'var(--font-mono)' }}>
              {c.seatsUsed}/{c.seats}
            </td>
            <td style={tdMuted}>{c.openRoles}</td>
            <td style={tdMuted}>{c.hires}</td>
            <td style={tdStyle}>
              <Badge tone={accountStatusTone(c.status)} theme={theme}>
                {cap(c.status)}
              </Badge>
            </td>
            <td style={tdMono}>{c.lastActive}</td>
          </ClickRow>
        ))}
      </TableShell>
    </>
  )
}
