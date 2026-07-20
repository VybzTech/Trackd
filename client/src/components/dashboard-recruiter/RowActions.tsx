// Inline per-row applicant actions: Interview (primary), Reject (records a
// rejection), Pass (dismiss without recording — matches the source's no-op).
// Reject is distinguished from Pass by a rejected-color dot + hover tint, NOT
// by red body text (which would fail WCAG AA on the light theme).

import type { MouseEvent } from 'react'
import { STAGE_META } from './data'

function stop(e: MouseEvent, fn?: () => void) {
  e.stopPropagation()
  fn?.()
}

export function RowActions({
  onInterview,
  onReject,
  onPass,
}: {
  onInterview: () => void
  onReject: () => void
  onPass: () => void
}) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        type="button"
        onClick={(e) => stop(e, onInterview)}
        className="rounded-full border px-3 py-1.5 text-[11.5px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5"
        style={{
          borderColor: 'var(--border-glass)',
          background:
            'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
        }}
      >
        Interview
      </button>
      <button
        type="button"
        onClick={(e) => stop(e, onReject)}
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-150 ease-out"
        style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = STAGE_META.rejected.color
          e.currentTarget.style.color = 'var(--text)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text-2)'
        }}
      >
        <span className="h-[6px] w-[6px] rounded-full" style={{ background: STAGE_META.rejected.color }} />
        Reject
      </button>
      <button
        type="button"
        onClick={(e) => stop(e, onPass)}
        className="rounded-full border px-3 py-1.5 text-[11.5px] font-semibold"
        style={{ borderColor: 'var(--border)', color: 'var(--text-3)', background: 'transparent' }}
      >
        Pass
      </button>
    </div>
  )
}
