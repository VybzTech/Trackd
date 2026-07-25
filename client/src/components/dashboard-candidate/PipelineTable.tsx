import { useState } from 'react'
import { STATUS_ORDER, statusBadgeStyle, statusDotStyle, type ApplicationStatus, type CandidateApp } from './data'

interface PipelineTableProps {
  apps: CandidateApp[]
  onOpenDetail: (id: number) => void
}

type SortKey = 'company' | 'role' | 'status' | 'match' | 'applied'
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string; align?: 'right' }[] = [
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Stage' },
  { key: 'match', label: 'Match' },
  { key: 'applied', label: 'Applied' },
]

export default function PipelineTable({ apps, onOpenDetail }: PipelineTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('match')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [stageFilter, setStageFilter] = useState<ApplicationStatus | 'all'>('all')

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'match' ? 'desc' : 'asc')
    }
  }

  const filtered = stageFilter === 'all' ? apps : apps.filter((a) => a.status === stageFilter)
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'match') cmp = a.match - b.match
    else if (sortKey === 'status') cmp = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    else cmp = String(a[sortKey]).localeCompare(String(b[sortKey]))
    return sortDir === 'asc' ? cmp : -cmp
  })

  const thBase =
    'cursor-pointer select-none whitespace-nowrap border-b px-4 py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150'

  const filterPills: (ApplicationStatus | 'all')[] = ['all', ...STATUS_ORDER]

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {filterPills.map((p) => {
          const active = stageFilter === p
          return (
            <button
              key={p}
              type="button"
              onClick={() => setStageFilter(p)}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors duration-150"
              style={{
                border: `1px solid ${active ? 'var(--border-glass)' : 'var(--border)'}`,
                background: active ? 'var(--surface-alt)' : 'transparent',
                color: active ? 'var(--glow-top)' : 'var(--text-2)',
                cursor: 'pointer',
              }}
            >
              {p !== 'all' && <span style={statusDotStyle(p, 6)} />}
              {p === 'all' ? 'All stages' : p}
            </button>
          )
        })}
      </div>

      <div className="mb-2 flex items-center justify-end gap-1 text-[11px] font-medium sm:hidden" style={{ color: 'var(--text-3)' }} aria-hidden="true">
        Swipe to see more<span aria-hidden="true">→</span>
      </div>
      <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  onClick={() => toggleSort(col.key)}
                  className={thBase}
                  style={{ borderColor: 'var(--border)', color: sortKey === col.key ? 'var(--text-2)' : 'var(--text-3)' }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <span style={{ opacity: sortKey === col.key ? 1 : 0, fontSize: 9 }}>{sortDir === 'asc' ? '▲' : '▼'}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr
                key={a.id}
                onClick={() => onOpenDetail(a.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onOpenDetail(a.id)
                }}
                className="cursor-pointer transition-colors duration-150"
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-alt)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="whitespace-nowrap border-b px-4 py-3 font-semibold" style={{ borderColor: 'var(--border)' }}>
                  {a.company}
                </td>
                <td className="whitespace-nowrap border-b px-4 py-3" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                  {a.role}
                </td>
                <td className="whitespace-nowrap border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <span style={statusBadgeStyle(a.status)}>
                    <span style={statusDotStyle(a.status, 6)} />
                    {a.status}
                  </span>
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)', minWidth: 100 }}>
                  <div className="mb-1 text-[12px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--glow-top)' }}>
                    {a.match}%
                  </div>
                  <div className="overflow-hidden rounded-full" style={{ width: 64, height: 4, background: 'var(--border)' }}>
                    <div style={{ height: '100%', borderRadius: 999, background: 'var(--glow-top)', width: `${a.match}%` }} />
                  </div>
                </td>
                <td
                  className="whitespace-nowrap border-b px-4 py-3"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}
                >
                  {a.applied}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-[13px]" style={{ color: 'var(--text-3)' }}>
                  No applications in this stage.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
