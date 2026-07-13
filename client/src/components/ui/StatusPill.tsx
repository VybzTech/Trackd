// React import not required with the react-jsx transform
import type { JobOpportunity } from '../../store/appStore'
import { STATUS_COLOR, STATUS_LABEL } from '../../lib/statusTokens'

export interface StatusPillProps {
  status: JobOpportunity['status']
  className?: string
}

/** Reads the fixed status-color map (docs/Trackd.md 2.1) — never restyle per-file. */
export function StatusPill({ status, className }: StatusPillProps) {
  const color = STATUS_COLOR[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${className || ''}`}
      style={{ backgroundColor: `${color}26`, color, border: `1px solid ${color}4d` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {STATUS_LABEL[status]}
    </span>
  )
}
