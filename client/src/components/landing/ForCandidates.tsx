import { DocumentIcon, KanbanIcon, TimerIcon, ChecklistIcon } from './icons'

interface ForCandidatesProps {
  demoScore: number
  onDemoScoreChange: (value: number) => void
}

const cardClasses =
  'rounded-2xl border p-[26px] transition-[transform,border-color] duration-150 ease-out [animation:revealUp_.6s_ease-out_both] hover:-translate-y-0.5'

function FeatureCard({ children, minWidth }: { children: React.ReactNode; minWidth?: boolean }) {
  return (
    <div
      className={`${cardClasses} ${minWidth ? 'min-w-[280px]' : ''}`}
      style={{ borderColor: 'var(--border)' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {children}
    </div>
  )
}

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
    >
      {children}
    </div>
  )
}

export default function ForCandidates({ demoScore, onDemoScoreChange }: ForCandidatesProps) {
  const demoOffset = 240 - (demoScore / 100) * 240

  return (
    <section
      id="candidates"
      className="mx-auto max-w-[1180px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex flex-wrap items-start gap-10">
        <div className="min-w-[280px] flex-[1_1_340px] lg:sticky lg:top-[110px] lg:self-start [animation:revealUp_.6s_ease-out_both]">
          <div
            className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
            style={{ color: 'var(--glow-top)' }}
          >
            For candidates
          </div>
          <h2 className="mb-3 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
            Your job search, structured.
          </h2>
          <p className="text-base leading-[1.6]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
            Stop copy-pasting into spreadsheets. Trackd turns raw job posts into a living pipeline
            — and tells you exactly what to fix before you apply.
          </p>
        </div>

        <div className="flex min-w-[280px] flex-[1_1_480px] flex-col gap-5">
          <FeatureCard minWidth>
            <IconChip>
              <DocumentIcon />
            </IconChip>
            <h3 className="mb-2 text-lg font-bold">Smart Ingestion Pipeline</h3>
            <p className="mb-5 max-w-[420px] text-sm leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              Paste a link or a wall of text. Trackd extracts role, comp, stack, and requirements
              in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <div
                className="min-w-[160px] flex-[1_1_180px] rounded-[10px] border p-3 font-mono text-[11px] leading-[1.6]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}
              >
                <div
                  className="mb-1.5 h-2 w-[90%] rounded-[3px] [animation:shimmerSweep_2.4s_linear_infinite] [background-size:300%_100%]"
                  style={{ background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))' }}
                />
                <div
                  className="mb-1.5 h-2 w-[70%] rounded-[3px] [animation:shimmerSweep_2.4s_linear_infinite_.3s] [background-size:300%_100%]"
                  style={{ background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))' }}
                />
                <div
                  className="h-2 w-[80%] rounded-[3px] [animation:shimmerSweep_2.4s_linear_infinite_.6s] [background-size:300%_100%]"
                  style={{ background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))' }}
                />
              </div>
              <span className="shrink-0" style={{ color: 'var(--text-3)' }}>
                →
              </span>
              <div className="flex min-w-[180px] flex-[1_1_180px] flex-wrap gap-1.5">
                {['Senior Frontend', '$150–180k', 'React · TS'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-[5px] text-[11px]"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--text-2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FeatureCard>

          <FeatureCard>
            <IconChip>
              <KanbanIcon />
            </IconChip>
            <h3 className="mb-2 text-lg font-bold">Kanban Pipeline</h3>
            <p className="mb-[18px] text-sm leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              Drag a card, the status updates everywhere — Kanban, table, and calendar stay in
              sync.
            </p>
            <div className="flex gap-1.5">
              <div className="h-16 flex-1 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }} />
              <div
                className="h-16 flex-1 rounded-lg border"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', boxShadow: '0 0 0 1px var(--border-glass) inset' }}
              >
                <div
                  className="mx-auto mt-2 h-2 w-[80%] rounded-[3px] opacity-70 [animation:floatY2_3s_ease-in-out_infinite]"
                  style={{ background: 'var(--glow-top)' }}
                />
              </div>
              <div className="h-16 flex-1 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }} />
            </div>
          </FeatureCard>

          <FeatureCard>
            <IconChip>
              <TimerIcon />
            </IconChip>
            <h3 className="mb-2 text-lg font-bold">Compatibility Score</h3>
            <p className="mb-3.5 text-sm leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              Drag it — see how the score visualizes at any confidence level.
            </p>
            <div className="relative mb-3.5 flex items-center justify-center">
              <svg width="92" height="92" viewBox="0 0 92 92" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="46" cy="46" r="38" fill="none" stroke="var(--border)" strokeWidth={7} />
                <circle
                  cx="46"
                  cy="46"
                  r="38"
                  fill="none"
                  stroke="var(--glow-top)"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeDasharray={240}
                  style={{ strokeDashoffset: demoOffset, transition: 'stroke-dashoffset .1s ease-out' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-xl font-extrabold" style={{ color: 'var(--glow-top)' }}>
                  {demoScore}%
                </span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={demoScore}
              onChange={(e) => onDemoScoreChange(Number(e.target.value))}
              className="mt-1.5 w-full"
            />
          </FeatureCard>

          <FeatureCard minWidth>
            <IconChip>
              <ChecklistIcon />
            </IconChip>
            <h3 className="mb-2 text-lg font-bold">ATS Optimization</h3>
            <p className="mb-[18px] max-w-[420px] text-sm leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              Missing keywords, flagged inline. Swap in one tap — no rewriting from scratch.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-lg border px-3 py-[7px] text-xs line-through"
                style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-3)' }}
              >
                team player
              </span>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                →
              </span>
              <span
                className="rounded-lg border px-3 py-[7px] text-xs font-semibold"
                style={{
                  background: 'color-mix(in srgb, var(--glow-top) 16%, var(--surface))',
                  borderColor: 'var(--border-glass)',
                  color: 'var(--glow-top)',
                }}
              >
                cross-functional collaboration
              </span>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}
