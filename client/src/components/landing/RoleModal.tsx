import { CandidateIcon, CheckIcon, CloseIcon, RecruiterIcon } from './icons'

export type Role = 'candidate' | 'recruiter'

interface RoleModalProps {
  open: boolean
  confirmed: boolean
  selectedRole: Role | null
  onClose: () => void
  onSelectRole: (role: Role) => void
  onConfirm: () => void
}

const cardBase =
  'flex w-full cursor-pointer items-center gap-3.5 rounded-xl p-4 text-left transition-[transform,border-color,background-color] duration-150 ease-out'

export default function RoleModal({ open, confirmed, selectedRole, onClose, onSelectRole, onConfirm }: RoleModalProps) {
  if (!open) return null

  const candidateSel = selectedRole === 'candidate'
  const recruiterSel = selectedRole === 'recruiter'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 [animation:fadeIn_.15s_ease-out_both]"
      style={{ background: 'rgba(0,4,30,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-[18px] border p-6 [animation:scaleIn_.18s_ease-out_both] [box-shadow:0_30px_80px_rgba(0,0,0,0.5)]"
        style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {!confirmed && (
          <>
            <div className="mb-1.5 flex items-center justify-between">
              <h3 className="text-[19px] font-bold">How will you use Trackd?</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent"
                style={{ color: 'var(--text-3)' }}
              >
                <CloseIcon />
              </button>
            </div>
            <p className="mb-[22px] text-[13.5px]" style={{ color: 'var(--text-3)' }}>
              You'll create your account next.
            </p>

            <div className="mb-5 flex flex-col gap-3">
              <button
                onClick={() => onSelectRole('candidate')}
                className={cardBase}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: candidateSel ? 'var(--border-glass)' : 'var(--border)',
                  background: candidateSel ? 'var(--surface-alt)' : 'transparent',
                }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                  style={{ background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
                >
                  <CandidateIcon />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[14.5px] font-bold">I'm a candidate</div>
                  <div className="text-[12.5px]" style={{ color: 'var(--text-3)' }}>
                    Track applications &amp; optimize with AI
                  </div>
                </div>
                {candidateSel && (
                  <span className="shrink-0" style={{ color: 'var(--glow-top)' }}>
                    <CheckIcon size={18} />
                  </span>
                )}
              </button>
              <button
                onClick={() => onSelectRole('recruiter')}
                className={cardBase}
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: recruiterSel ? 'var(--border-glass)' : 'var(--border)',
                  background: recruiterSel ? 'var(--surface-alt)' : 'transparent',
                }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border"
                  style={{ background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
                >
                  <RecruiterIcon />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[14.5px] font-bold">I'm hiring</div>
                  <div className="text-[12.5px]" style={{ color: 'var(--text-3)' }}>
                    Post roles &amp; review pre-vetted applicants
                  </div>
                </div>
                {recruiterSel && (
                  <span className="shrink-0" style={{ color: 'var(--glow-top)' }}>
                    <CheckIcon size={18} />
                  </span>
                )}
              </button>
            </div>
            <button
              onClick={onConfirm}
              disabled={!selectedRole}
              className="w-full rounded-xl border-none py-3.5 text-sm font-semibold transition-[transform,opacity] duration-150"
              style={
                selectedRole
                  ? {
                      cursor: 'pointer',
                      opacity: 1,
                      background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                      color: '#fff',
                    }
                  : { cursor: 'not-allowed', opacity: 0.45, background: 'var(--surface-alt)', color: 'var(--text-3)' }
              }
            >
              {candidateSel ? 'Continue as candidate →' : recruiterSel ? 'Continue as recruiter →' : 'Choose one to continue'}
            </button>
          </>
        )}

        {confirmed && (
          <div className="px-0 py-3 pb-1 text-center">
            <div
              className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full border"
              style={{ background: 'var(--surface-alt)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
            >
              <CheckIcon size={24} />
            </div>
            <h3 className="mb-2 text-lg font-bold">
              {candidateSel ? "You're set — candidate workspace next." : "You're set — recruiter workspace next."}
            </h3>
            <p className="mb-6 text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-3)' }}>
              Account creation &amp; onboarding are the next build step — we'll pick this up right
              where you left off.
            </p>
            <button
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl border py-3.5 text-sm font-semibold"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
