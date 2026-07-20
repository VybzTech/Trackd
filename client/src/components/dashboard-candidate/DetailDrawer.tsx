import { useEffect } from 'react'
import { ADVANCE_ORDER, primaryBtnStyle, statusDotStyle, type ApplicationStatus, type CandidateApp } from './data'
import { CloseIcon } from './icons'

interface DetailDrawerProps {
  app: CandidateApp
  onClose: () => void
  onMove: (id: number, status: ApplicationStatus) => void
}

export default function DetailDrawer({ app, onClose, onMove }: DetailDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const dashOffset = 163 - (app.match / 100) * 163

  let advanceLabel: string
  let advance: () => void
  if (app.status === 'Offer Received') {
    advanceLabel = 'Accepted ✓'
    advance = onClose
  } else if (app.status === 'Rejected/Closed') {
    advanceLabel = 'Reopen → Saved'
    advance = () => {
      onMove(app.id, 'Saved')
      onClose()
    }
  } else {
    advanceLabel = 'Advance stage →'
    advance = () => {
      const idx = ADVANCE_ORDER.indexOf(app.status)
      const next = ADVANCE_ORDER[Math.min(idx + 1, ADVANCE_ORDER.length - 1)]
      onMove(app.id, next)
      onClose()
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[95]"
        style={{ background: 'rgba(0,0,0,0.5)', animation: 'fadeIn .15s ease-out both' }}
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 right-0 top-0 z-[96] overflow-y-auto p-6"
        style={{ width: 'min(420px, 100vw)', background: 'var(--surface)', borderLeft: '1px solid var(--border)', animation: 'slideInRight .25s ease-out both' }}
        role="dialog"
        aria-modal="true"
        aria-label={`${app.role} at ${app.company}`}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-[10px] text-[14px] font-bold"
              style={{ width: 38, height: 38, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}
            >
              {app.company[0]}
            </div>
            <div>
              <div className="text-[17px] font-bold">{app.company}</div>
              <div className="text-[13px]" style={{ color: 'var(--text-2)' }}>
                {app.role}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center rounded-lg"
            style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', flexShrink: 0 }}
          >
            <CloseIcon size={15} />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-2.5 text-[12.5px]" style={{ color: 'var(--text-3)' }}>
          <span className="flex items-center gap-1.5">
            <span style={statusDotStyle(app.status, 7)} />
            <span style={{ color: 'var(--text-2)' }}>{app.status}</span>
          </span>
          <span>·</span>
          <span>{app.location}</span>
          <span>·</span>
          <span>{app.comp}</span>
        </div>

        <div className="mb-5 flex items-center gap-4 rounded-2xl p-4" style={{ border: '1px solid var(--border)' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--glow-top)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="163"
              style={{ strokeDashoffset: dashOffset, transition: 'stroke-dashoffset .5s ease-out' }}
            />
          </svg>
          <div>
            <div className="text-[22px] font-extrabold" style={{ color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}>
              {app.match}%
            </div>
            <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
              Compatibility score
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Matched
          </div>
          <div className="flex flex-wrap gap-2">
            {app.matched.map((m) => (
              <span
                key={m}
                className="rounded-lg px-2.5 py-1.5 text-[12px] font-semibold"
                style={{ background: 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
              >
                {m}
              </span>
            ))}
            {app.matched.length === 0 && (
              <span className="text-[12.5px]" style={{ color: 'var(--text-3)' }}>
                No matched skills recorded yet.
              </span>
            )}
          </div>
        </div>

        {app.missing.length > 0 && (
          <div className="mb-6">
            <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
              Missing
            </div>
            <div className="flex flex-wrap gap-2">
              {app.missing.map((m) => (
                <span
                  key={m}
                  className="rounded-lg px-2.5 py-1.5 text-[12px] line-through"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[10px] py-2.5 text-[13.5px] font-semibold"
            style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}
          >
            Close
          </button>
          <button type="button" onClick={advance} className="flex-1 justify-center" style={{ ...primaryBtnStyle, justifyContent: 'center' }}>
            {advanceLabel}
          </button>
        </div>
      </div>
    </>
  )
}
