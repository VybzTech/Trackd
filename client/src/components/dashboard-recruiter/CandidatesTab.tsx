import type { MouseEvent } from 'react'
import {
  STAGE_FILTERS,
  SUCCESS_STORIES,
  initials,
  type Candidate,
  type Job,
  type RecruiterStage,
} from './data'
import { SegmentButton, StageBadge, MatchCell, Avatar, TableScroll, PILL_ACTION, BRAND_GRADIENT, CONTROL_PAD } from './ui'
import { RowActions } from './RowActions'

const TH = 'whitespace-nowrap border-b px-4 py-[11px] text-[11px] font-semibold uppercase tracking-[0.04em]'

interface FlatCandidate extends Candidate {
  jobId: number
}

export default function CandidatesTab({
  jobs,
  candidatesByJob,
  stageFilter,
  onStageFilter,
  searchQuery,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onBulkInterview,
  onClearSelection,
  onOpenDetail,
  onSetStage,
}: {
  jobs: Job[]
  candidatesByJob: Record<number, Candidate[]>
  stageFilter: RecruiterStage | 'all'
  onStageFilter: (s: RecruiterStage | 'all') => void
  searchQuery: string
  selectedIds: number[]
  onToggleSelect: (id: number) => void
  onToggleSelectAll: (ids: number[]) => void
  onBulkInterview: () => void
  onClearSelection: () => void
  onOpenDetail: (candId: number, jobId: number) => void
  onSetStage: (jobId: number, candId: number, stage: RecruiterStage) => void
}) {
  const jobTitle: Record<number, string> = {}
  jobs.forEach((j) => (jobTitle[j.id] = j.title))

  const flat: FlatCandidate[] = []
  Object.keys(candidatesByJob).forEach((jid) => {
    candidatesByJob[Number(jid)].forEach((c) => flat.push({ ...c, jobId: Number(jid) }))
  })

  const q = searchQuery.trim().toLowerCase()
  const byStage = stageFilter === 'all' ? flat : flat.filter((c) => c.stage === stageFilter)
  const filtered = q ? byStage.filter((c) => (c.name + ' ' + c.headline).toLowerCase().includes(q)) : byStage

  const allSelected = filtered.length > 0 && filtered.every((c) => selectedIds.includes(c.id))
  const stopToggle = (e: MouseEvent, id: number) => {
    e.stopPropagation()
    onToggleSelect(id)
  }

  return (
    <>
      {/* Success stories */}
      <div className="mb-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
          Success stories on Trackd
        </div>
        <div className="flex gap-3.5 overflow-x-auto pb-1">
          {SUCCESS_STORIES.map((s) => (
            <div
              key={s.name}
              className="flex-[0_0_260px] rounded-[14px] border p-6"
              style={{ borderColor: 'var(--border-glass)', background: 'var(--surface-alt)' }}
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <Avatar text={initials(s.name)} size={32} accent />
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold" style={{ color: 'var(--text)' }}>
                    {s.name}
                  </div>
                  <div className="truncate text-[11px]" style={{ color: 'var(--text-3)' }}>
                    {s.role}
                  </div>
                </div>
                <span
                  className="ml-auto shrink-0 rounded-full border px-2 py-[3px] text-[10px] font-bold"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
                >
                  HIRED
                </span>
              </div>
              <p className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                "{s.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + count */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-0.5 rounded-[10px] border p-[3px]" style={{ borderColor: 'var(--border)' }}>
          {STAGE_FILTERS.map((f) => (
            <SegmentButton key={f.key} label={f.label} active={stageFilter === f.key} onClick={() => onStageFilter(f.key)} />
          ))}
        </div>
        <div className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
          {filtered.length} of {flat.length}
        </div>
      </div>

      {/* Bulk bar */}
      {selectedIds.length > 0 && (
        <div
          className="mb-3 flex flex-wrap items-center gap-3 rounded-[14px] border px-4 py-2.5"
          style={{ borderColor: 'var(--border-glass)', background: 'var(--surface-alt)' }}
        >
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            {selectedIds.length} selected
          </span>
          <button
            type="button"
            onClick={onBulkInterview}
            className={`${PILL_ACTION} border text-white`}
            style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border-glass)', background: BRAND_GRADIENT }}
          >
            Move to Interview
          </button>
          <button
            type="button"
            onClick={onClearSelection}
            className={`${PILL_ACTION} ml-auto border`}
            style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
          >
            Clear selection
          </button>
        </div>
      )}

      <TableScroll>
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              <th className="border-b px-4 py-[11px]" style={{ width: 20, borderColor: 'var(--border)' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  aria-label="Select all candidates"
                  onChange={() => onToggleSelectAll(filtered.map((c) => c.id))}
                  className="cursor-pointer"
                />
              </th>
              {['Candidate', 'Role', 'Match', 'Stage', 'Source'].map((h) => (
                <th key={h} className={`text-left ${TH}`} style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                  {h}
                </th>
              ))}
              <th className={`hidden text-right md:table-cell ${TH}`} style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[13px]" style={{ color: 'var(--text-3)' }}>
                  No candidates match this filter.
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr
                key={c.id}
                tabIndex={0}
                role="button"
                aria-label={`Open ${c.name}`}
                onClick={() => onOpenDetail(c.id, c.jobId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpenDetail(c.id, c.jobId)
                  }
                }}
                className="cursor-pointer transition-colors duration-150"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }} onClick={(e) => stopToggle(e, c.id)}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    aria-label={`Select ${c.name}`}
                    onChange={() => {}}
                    className="pointer-events-none cursor-pointer"
                  />
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="whitespace-nowrap font-semibold" style={{ color: 'var(--text)' }}>
                    {c.name}
                  </div>
                  <div className="whitespace-nowrap text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                    {c.headline}
                  </div>
                </td>
                <td className="whitespace-nowrap border-b px-4 py-3" style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}>
                  {jobTitle[c.jobId] ?? '—'}
                </td>
                <td className="min-w-[100px] border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <MatchCell match={c.match} />
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <StageBadge stage={c.stage} />
                </td>
                <td className="whitespace-nowrap border-b px-4 py-3" style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}>
                  {c.source}
                </td>
                <td className="hidden border-b px-4 py-3 md:table-cell" style={{ borderColor: 'var(--border)' }}>
                  <RowActions
                    onInterview={() => onSetStage(c.jobId, c.id, 'interview')}
                    onReject={() => onSetStage(c.jobId, c.id, 'rejected')}
                    onPass={() => {}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </>
  )
}
