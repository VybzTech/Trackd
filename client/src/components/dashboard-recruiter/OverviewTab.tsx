import { ACTIVITY_FEED, type Candidate, type Job } from './data'
import { SectionLabel, StatCard } from './ui'
import type { StatCardData } from './RolesTab'

export default function OverviewTab({
  statCards,
  jobs,
  candidatesByJob,
  onOpenRolePending,
}: {
  statCards: StatCardData[]
  jobs: Job[]
  candidatesByJob: Record<number, Candidate[]>
  onOpenRolePending: (jobId: number) => void
}) {
  const needsAttention = jobs
    .map((j) => ({ job: j, pending: (candidatesByJob[j.id] ?? []).filter((c) => c.stage === 'applied').length }))
    .filter((x) => x.pending > 0)
    .sort((a, b) => b.pending - a.pending)
    .slice(0, 3)

  return (
    <>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Welcome back, Alex.</h2>
      <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>
        Here's how hiring is trending across your open roles.
      </p>

      <div
        className="mb-7 grid gap-3.5"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
      >
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[280px] flex-[1_1_320px]">
          <SectionLabel className="mb-3">Needs attention</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {needsAttention.length === 0 && (
              <div className="rounded-[12px] border p-3.5 text-[13px]" style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
                Nothing awaiting review — you're all caught up.
              </div>
            )}
            {needsAttention.map((x) => (
              <button
                key={x.job.id}
                onClick={() => onOpenRolePending(x.job.id)}
                className="flex w-full items-center gap-3 rounded-[12px] border p-3.5 text-left transition-all duration-150 ease-out hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border)', background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>
                    {x.job.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                    {x.pending} awaiting review
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-[3px] font-mono text-[11px] font-bold"
                  style={{
                    background: 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))',
                    borderColor: 'var(--border-glass)',
                    color: 'var(--glow-top)',
                  }}
                >
                  {x.pending}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-[280px] flex-[1_1_320px]">
          <SectionLabel className="mb-3">Recent activity</SectionLabel>
          <div className="flex flex-col gap-3.5 rounded-[14px] border p-4" style={{ borderColor: 'var(--border)' }}>
            {ACTIVITY_FEED.map((a) => (
              <div key={a.text} className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'var(--glow-top)' }}
                />
                <div className="flex-1">
                  <div className="text-[13px] leading-[1.4]" style={{ color: 'var(--text)' }}>
                    {a.text}
                  </div>
                  <div className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>
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
