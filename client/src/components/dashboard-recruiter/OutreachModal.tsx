import { ModalShell, GhostButton, PrimaryButton } from './ui'

export default function OutreachModal({
  targetName,
  draft,
  onDraftChange,
  onClose,
  onSend,
}: {
  targetName: string
  draft: string
  onDraftChange: (v: string) => void
  onClose: () => void
  onSend: () => void
}) {
  return (
    <ModalShell onClose={onClose} maxWidth={440} labelledBy="outreach-title">
      <h3 id="outreach-title" className="mb-1 text-lg font-bold">
        Reach out to {targetName}
      </h3>
      <p className="mb-4 text-[13px]" style={{ color: 'var(--text-3)' }}>
        Sent via Trackd — visible in their inbox alongside applications.
      </p>
      <textarea
        rows={5}
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Hi, I came across your profile and think you'd be a great fit for…"
        className="mb-[18px] w-full resize-none rounded-[10px] border px-3.5 py-3 text-[13.5px]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
      />
      <div className="flex gap-2.5">
        <GhostButton onClick={onClose} className="flex-1">
          Cancel
        </GhostButton>
        <PrimaryButton onClick={onSend} className="flex-1 justify-center">
          Send message
        </PrimaryButton>
      </div>
    </ModalShell>
  )
}
