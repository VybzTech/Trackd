import { initials, type TalentProfile } from './data'
import { DrawerShell, CloseButton, GhostButton, PrimaryButton, Avatar, SectionLabel } from './ui'
import { AvailabilityBadge } from './TalentSearchTab'

export default function TalentPreviewDrawer({
  talent,
  sent,
  onClose,
  onReachOut,
}: {
  talent: TalentProfile
  sent: boolean
  onClose: () => void
  onReachOut: () => void
}) {
  return (
    <DrawerShell onClose={onClose} width={460} z={98} labelledBy="talent-preview-name">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar text={initials(talent.name)} size={44} accent />
          <div>
            <div id="talent-preview-name" className="text-[17px] font-bold">
              {talent.name}
            </div>
            <div className="text-[13px]" style={{ color: 'var(--text-2)' }}>
              {talent.headline}
            </div>
          </div>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      <div className="mb-[18px] flex flex-wrap items-center gap-2.5">
        <AvailabilityBadge available={talent.available} size="md" />
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
          {talent.location} · {talent.years} years experience
        </span>
      </div>

      <div className="mb-6">
        <SectionLabel className="mb-2.5">Skills</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {talent.skills.map((sk) => (
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

      <div className="mb-7">
        <SectionLabel className="mb-3.5">Career story</SectionLabel>
        {talent.story.map((m, i) => (
          <div
            key={m.year}
            className="relative pb-[22px] pl-5"
            style={{ borderLeft: `2px solid ${i === talent.story.length - 1 ? 'transparent' : 'var(--border)'}` }}
          >
            <span
              className="absolute rounded-full"
              style={{
                left: -6,
                top: 2,
                width: 10,
                height: 10,
                background: 'var(--glow-top)',
                border: '2px solid var(--surface)',
                boxShadow: '0 0 0 2px var(--border-glass)',
              }}
            />
            <div className="mb-1 font-mono text-[11.5px] font-bold" style={{ color: 'var(--glow-top)' }}>
              {m.year}
            </div>
            <div className="mb-1 text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>
              {m.title}
            </div>
            <div className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
              {m.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5">
        <GhostButton onClick={onClose} className="flex-1">
          Close
        </GhostButton>
        <PrimaryButton onClick={sent ? undefined : onReachOut} className="flex-1">
          {sent ? 'Message sent ✓' : 'Reach out'}
        </PrimaryButton>
      </div>
    </DrawerShell>
  )
}
