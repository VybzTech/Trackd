import { useMemo, useState } from 'react'
import type { Theme } from '../../lib/landingData'
import { cap, type CandAccount } from './adminData'
import {
  Badge,
  ClickRow,
  FilterTabs,
  ResultsCount,
  TableShell,
  accountStatusTone,
  riskTone,
  tdMono,
  tdMuted,
  tdStyle,
} from './adminUi'

const FILTERS: { key: 'all' | CandAccount['status']; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'flagged', label: 'Flagged' },
  { key: 'suspended', label: 'Suspended' },
]

export default function CandidatesTab({
  candidates,
  searchQuery,
  theme,
  onSelect,
}: {
  candidates: CandAccount[]
  searchQuery: string
  theme: Theme
  onSelect: (id: number) => void
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | CandAccount['status']>('all')

  const filtered = useMemo(() => {
    const byStatus = statusFilter === 'all' ? candidates : candidates.filter((c) => c.status === statusFilter)
    const q = searchQuery.trim().toLowerCase()
    return q ? byStatus.filter((c) => (c.name + ' ' + c.email).toLowerCase().includes(q)) : byStatus
  }, [candidates, statusFilter, searchQuery])

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
          {filtered.length} of {candidates.length}
        </ResultsCount>
      </div>

      <TableShell headers={['Candidate', 'Applications', 'Risk', 'Status', 'Signed up']}>
        {filtered.map((c) => (
          <ClickRow key={c.id} onClick={() => onSelect(c.id)}>
            <td style={tdStyle}>
              <div style={{ fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{c.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{c.email}</div>
            </td>
            <td style={tdMuted}>{c.applications}</td>
            <td style={tdStyle}>
              <Badge tone={riskTone(c.risk)} theme={theme}>
                {c.risk}/100
              </Badge>
            </td>
            <td style={tdStyle}>
              <Badge tone={accountStatusTone(c.status)} theme={theme}>
                {cap(c.status)}
              </Badge>
            </td>
            <td style={tdMono}>{c.signup}</td>
          </ClickRow>
        ))}
      </TableShell>
    </>
  )
}
