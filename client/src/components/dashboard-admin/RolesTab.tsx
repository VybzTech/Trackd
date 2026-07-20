import { useMemo, useState } from 'react'
import type { Theme } from '../../lib/landingData'
import { cap, type RolePosting } from './adminData'
import {
  Badge,
  ClickRow,
  FilterTabs,
  ResultsCount,
  TableShell,
  roleStatusTone,
  tdMono,
  tdMuted,
  tdStyle,
  toneHue,
} from './adminUi'

type FilterKey = 'all' | 'open' | 'filled' | 'closed' | 'flagged'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'filled', label: 'Filled' },
  { key: 'closed', label: 'Closed' },
  { key: 'flagged', label: 'Flagged' },
]

export default function RolesTab({
  roles,
  searchQuery,
  theme,
  onSelect,
}: {
  roles: RolePosting[]
  searchQuery: string
  theme: Theme
  onSelect: (id: number) => void
}) {
  const [statusFilter, setStatusFilter] = useState<FilterKey>('all')

  const filtered = useMemo(() => {
    const byStatus =
      statusFilter === 'all'
        ? roles
        : statusFilter === 'flagged'
          ? roles.filter((r) => r.flagged)
          : roles.filter((r) => r.status === statusFilter)
    const q = searchQuery.trim().toLowerCase()
    return q ? byStatus.filter((r) => (r.title + ' ' + r.company).toLowerCase().includes(q)) : byStatus
  }, [roles, statusFilter, searchQuery])

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
          {filtered.length} of {roles.length}
        </ResultsCount>
      </div>

      <TableShell headers={['Role', 'Company', 'Applicants', 'Status', 'Posted']}>
        {filtered.map((r) => (
          <ClickRow key={r.id} onClick={() => onSelect(r.id)}>
            <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text)' }}>
              {r.title}
              {r.flagged && (
                <span
                  aria-label="Flagged"
                  title="Flagged for review"
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: toneHue('warning', theme),
                    marginLeft: 8,
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </td>
            <td style={tdMuted}>{r.company}</td>
            <td style={tdMuted}>{r.applicants}</td>
            <td style={tdStyle}>
              <Badge tone={roleStatusTone(r.status)} theme={theme}>
                {cap(r.status)}
              </Badge>
            </td>
            <td style={tdMono}>{r.posted}</td>
          </ClickRow>
        ))}
      </TableShell>
    </>
  )
}
