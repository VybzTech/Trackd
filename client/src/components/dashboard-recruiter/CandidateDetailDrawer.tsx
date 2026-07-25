import { STAGE_META, type Candidate } from './data'
import { DrawerShell, CloseButton, GhostButton, PrimaryButton, Avatar, SectionLabel } from './ui'

// Circle circumference for r=26: 2 * PI * 26 ≈ 163 (matches source's stroke-dasharray="163").
const CIRCUMFERENCE = 163

export default function CandidateDetailDrawer({
  candidate,
  onClose,
  onInterview,
  onReject,
}: {
  candidate: Candidate
  onClose: () => void
  onInterview: () => void
  onReject: () => void
}) {
  const initials = candidate.name.split(' ').map((w) => w[0]).join('')
  const dashOffset = CIRCUMFERENCE - (candidate.match / 100) * CIRCUMFERENCE

  return (
    <DrawerShell onClose={onClose} width={420} z={96} labelledBy="candidate-detail-name">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar text={initials} size={38} />
          <div>
            <div id="candidate-detail-name" className="text-[17px] font-bold">
              {candidate.name}
            </div>
            <div className="text-[13px]" style={{ color: 'var(--text-2)' }}>
              {candidate.headline}
            </div>
          </div>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      <div className="mb-5 flex items-center gap-4 rounded-[14px] border p-6" style={{ borderColor: 'var(--border)' }}>
        <svg width={64} height={64} viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
          <circle cx={32} cy={32} r={26} fill="none" stroke="var(--border)" strokeWidth={6} />
          <circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke="var(--glow-top)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset, transition: 'stroke-dashoffset .5s ease-out' }}
          />
        </svg>
        <div>
          <div className="font-mono text-[22px] font-extrabold" style={{ color: 'var(--glow-top)' }}>
            {candidate.match}%
          </div>
          <div className="text-xs" style={{ color: 'var(--text-3)' }}>
            Compatibility with role
          </div>
        </div>
      </div>

      <div className="mb-5">
        <SectionLabel className="mb-2.5">Top skills</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((sk) => (
            <span
              key={sk}
              className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold"
              style={{
                background: 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))',
                borderColor: 'var(--border-glass)',
                color: 'var(--glow-top)',
              }}
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <SectionLabel className="mb-2.5">Source &amp; stage</SectionLabel>
        <div className="flex items-center gap-4 text-[13px]" style={{ color: 'var(--text-2)' }}>
          <span>{candidate.source}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: STAGE_META[candidate.stage].color }} />
            {STAGE_META[candidate.stage].label}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <PrimaryButton onClick={onInterview} className="w-full justify-center">
          Move to Interview
        </PrimaryButton>
        <div className="flex gap-2.5">
          <GhostButton onClick={onReject} className="flex-1">
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: STAGE_META.rejected.color }} />
            Reject
          </GhostButton>
          <GhostButton onClick={onClose} className="flex-1">
            Close
          </GhostButton>
        </div>
      </div>
    </DrawerShell>
  )
}
