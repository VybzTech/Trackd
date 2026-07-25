import { useEffect, useState } from 'react'
import {
  STAGE_FILTERS,
  FUNNEL_STAGES,
  STAGE_META,
  type Candidate,
  type Job,
  type RecruiterStage,
} from './data'
import { SegmentButton, StageBadge, MatchCell, SectionLabel, StatCard, TableScroll } from './ui'
import { RowActions } from './RowActions'

export interface StatCardData {
  label: string
  value: string
  delta: string
  deltaAccent: boolean
}

const TH =
  'whitespace-nowrap border-b px-4 py-[11px] text-[11px] font-semibold uppercase tracking-[0.04em]'

export default function RolesTab({
  statCards,
  jobs,
  candidatesByJob,
  activeJobId,
  onSelectJob,
  stageFilter,
  onStageFilter,
  searchQuery,
  openPipelineSignal,
  onOpenDetail,
  onSetStage,
}: {
  statCards: StatCardData[]
  jobs: Job[]
  candidatesByJob: Record<number, Candidate[]>
  activeJobId: number
  onSelectJob: (id: number) => void
  stageFilter: RecruiterStage | 'all'
  onStageFilter: (s: RecruiterStage | 'all') => void
  searchQuery: string
  /** Bumped by the parent when a role is deep-linked (e.g. from Overview) — jumps the mobile drill-in to the pipeline. */
  openPipelineSignal?: number
  onOpenDetail: (candId: number, jobId: number) => void
  onSetStage: (jobId: number, candId: number, stage: RecruiterStage) => void
}) {
  // Below md the two-pane layout can't fit (needs ~600px); switch to a
  // drill-in: pick a role from the list, then view its pipeline with a back
  // button. At md+ both panes render side-by-side as before.
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true,
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const sync = () => setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // Deep-link from Overview: jump the mobile drill-in straight to the pipeline.
  // (Skips the initial 0 value so it only reacts to real bumps.)
  useEffect(() => {
    if (openPipelineSignal) setMobileOpen(true)
  }, [openPipelineSignal])

  const activeJob = jobs.find((j) => j.id === activeJobId) ?? jobs[0]
  const jobCandidates = candidatesByJob[activeJob.id] ?? []

  const handleSelectJob = (id: number) => {
    onSelectJob(id)
    if (!isDesktop) setMobileOpen(true)
  }

  const q = searchQuery.trim().toLowerCase()
  const byStage = stageFilter === 'all' ? jobCandidates : jobCandidates.filter((c) => c.stage === stageFilter)
  const filtered = q ? byStage.filter((c) => (c.name + ' ' + c.headline).toLowerCase().includes(q)) : byStage

  const funnelCounts = FUNNEL_STAGES.map((st) => ({
    stage: st,
    count: jobCandidates.filter((c) => c.stage === st).length,
  }))
  const funnelTotal = funnelCounts.reduce((a, b) => a + b.count, 0)

  const rolesList = (
    <>
      <SectionLabel className="mb-1 px-1">Open roles</SectionLabel>
      {jobs.map((j) => {
        const active = j.id === activeJobId && (isDesktop || mobileOpen)
        const count = (candidatesByJob[j.id] ?? []).length
        return (
          <button
            key={j.id}
            onClick={() => handleSelectJob(j.id)}
            className="w-full rounded-[10px] border px-3.5 py-3 text-left transition-all duration-150 ease-out"
            style={{
              padding: '12px 14px',
              borderColor: active ? 'var(--border-glass)' : 'var(--border)',
              background: active ? 'var(--surface-alt)' : 'transparent',
            }}
          >
            <div className="mb-1 truncate text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>
              {j.title}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                {count} applicants
              </span>
              {j.isNew && (
                <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--glow-top)' }}>
                  NEW
                </span>
              )}
            </div>
          </button>
        )
      })}
    </>
  )

  const pipeline = (
    <>
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="min-w-0 shrink">
          <div className="mb-0.5 truncate text-[15px] font-bold">{activeJob.title}</div>
          <div className="whitespace-nowrap text-xs" style={{ color: 'var(--text-3)' }}>
            {activeJob.location} · {activeJob.comp}
          </div>
        </div>
        <div
          className="flex shrink-0 flex-wrap gap-0.5 rounded-[10px] border p-[3px]"
          style={{ borderColor: 'var(--border)' }}
        >
          {STAGE_FILTERS.map((f) => (
            <SegmentButton key={f.key} label={f.label} active={stageFilter === f.key} onClick={() => onStageFilter(f.key)} />
          ))}
        </div>
      </div>

      {/* Funnel bar */}
      <div className="mb-2 flex h-2 gap-1.5">
        {funnelCounts.map(({ stage, count }, i) => {
          const pct = funnelTotal ? Math.max(6, (count / funnelTotal) * 100) : 100 / funnelCounts.length
          return (
            <div
              key={stage}
              className="rounded-[4px] transition-[flex] duration-300 ease-out"
              style={{ flex: pct, background: STAGE_META[stage].color, opacity: 0.9 - i * 0.06 }}
              title={`${STAGE_META[stage].label}: ${count}`}
            />
          )
        })}
      </div>
      {/* Legend — makes the two shared-cyan segments (Applied/Screening) read as intentional */}
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {funnelCounts.map(({ stage, count }) => (
          <span key={stage} className="inline-flex items-center gap-1.5 text-[11.5px]" style={{ color: 'var(--text-2)' }}>
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: STAGE_META[stage].color }} />
            {STAGE_META[stage].label} {count}
          </span>
        ))}
      </div>

      <TableScroll>
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {['Candidate', 'Match', 'Stage', 'Source'].map((h) => (
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
                <td colSpan={5} className="px-4 py-10 text-center text-[13px]" style={{ color: 'var(--text-3)' }}>
                  No candidates in this stage.
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr
                key={c.id}
                tabIndex={0}
                role="button"
                aria-label={`Open ${c.name}`}
                onClick={() => onOpenDetail(c.id, activeJob.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onOpenDetail(c.id, activeJob.id)
                  }
                }}
                className="cursor-pointer transition-colors duration-150"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="whitespace-nowrap font-semibold" style={{ color: 'var(--text)' }}>
                    {c.name}
                  </div>
                  <div className="whitespace-nowrap text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                    {c.headline}
                  </div>
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
                    onInterview={() => onSetStage(activeJob.id, c.id, 'interview')}
                    onReject={() => onSetStage(activeJob.id, c.id, 'rejected')}
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

  return (
    <>
      <div className="mb-6 grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {isDesktop ? (
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex min-w-[220px] flex-[0_0_260px] flex-col gap-2">{rolesList}</div>
          <div className="min-w-[320px] flex-1">{pipeline}</div>
        </div>
      ) : mobileOpen ? (
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="mb-4 inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-2 text-[13px] font-semibold transition-colors duration-150 ease-out"
            style={{ padding: '9px 14px', borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All roles
          </button>
          {pipeline}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">{rolesList}</div>
      )}
    </>
  )
}
