// Inline per-row applicant actions: Interview (primary), Reject (records a
// rejection), Pass (dismiss without recording — matches the source's no-op).
// Reject is distinguished from Pass by a rejected-color dot + hover tint, NOT
// by red body text (which would fail WCAG AA on the light theme).

import type { MouseEvent } from 'react'
import { STAGE_META } from './data'
import { PILL_ACTION, BRAND_GRADIENT, CONTROL_PAD } from './ui'

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
        className={`${PILL_ACTION} border text-white hover:-translate-y-0.5`}
        style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border-glass)', background: BRAND_GRADIENT }}
      >
        Interview
      </button>
      <button
        type="button"
        onClick={(e) => stop(e, onReject)}
        className={`${PILL_ACTION} border`}
        style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
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
        className={`${PILL_ACTION} border`}
        style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border)', color: 'var(--text-3)', background: 'transparent' }}
      >
        Pass
      </button>
    </div>
  )
}
