import { useState } from 'react'
import { STATUS_COLORS, STATUS_ORDER, matchChipStyle, type ApplicationStatus, type CandidateApp } from './data'

interface KanbanBoardProps {
  apps: CandidateApp[]
  onMoveCard: (id: number, status: ApplicationStatus) => void
  onOpenDetail: (id: number) => void
}

export default function KanbanBoard({ apps, onMoveCard, onOpenDetail }: KanbanBoardProps) {
  const [dragId, setDragId] = useState<number | null>(null)
  const [overStatus, setOverStatus] = useState<ApplicationStatus | null>(null)

  const moveByOffset = (app: CandidateApp, offset: number) => {
    const idx = STATUS_ORDER.indexOf(app.status)
    const next = STATUS_ORDER[Math.min(STATUS_ORDER.length - 1, Math.max(0, idx + offset))]
    if (next !== app.status) onMoveCard(app.id, next)
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-end gap-1 text-[11px] font-medium sm:hidden" style={{ color: 'var(--text-3)' }} aria-hidden="true">
        Swipe across stages<span aria-hidden="true">→</span>
      </div>
      <div
        className="grid gap-3 overflow-x-auto pb-3 sm:gap-4"
        style={{ gridTemplateColumns: `repeat(${STATUS_ORDER.length}, minmax(220px, 1fr))`, scrollSnapType: 'x proximity', scrollPaddingLeft: 4 }}
      >
      {STATUS_ORDER.map((status) => {
        const cards = apps.filter((a) => a.status === status)
        const color = STATUS_COLORS[status]
        const isOver = overStatus === status
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault()
              if (overStatus !== status) setOverStatus(status)
            }}
            onDragLeave={(e) => {
              // only clear when leaving the column entirely
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverStatus((s) => (s === status ? null : s))
            }}
            onDrop={(e) => {
              e.preventDefault()
              if (dragId != null) onMoveCard(dragId, status)
              setDragId(null)
              setOverStatus(null)
            }}
            className="min-w-0 rounded-2xl p-3 transition-colors duration-150"
            style={{
              border: `1px solid ${isOver ? 'var(--border-glass)' : 'var(--border)'}`,
              background: isOver ? `color-mix(in srgb, ${color} 8%, var(--surface-alt))` : 'var(--surface-alt)',
              scrollSnapAlign: 'start',
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span className="text-[12.5px] font-bold uppercase tracking-[0.04em]" style={{ color: 'var(--text-2)' }}>
                  {status}
                </span>
              </span>
              <span
                className="rounded-full px-2 py-px text-[11.5px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-3)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {cards.length}
              </span>
            </div>

            <div className="flex flex-col gap-2.5" style={{ minHeight: 60 }}>
              {cards.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    setDragId(a.id)
                    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragEnd={() => {
                    setDragId(null)
                    setOverStatus(null)
                  }}
                  onClick={() => onOpenDetail(a.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault()
                      moveByOffset(a, 1)
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault()
                      moveByOffset(a, -1)
                    }
                  }}
                  className="flex w-full items-center gap-2.5 rounded-full border p-2 pr-3.5 text-left transition-[transform,border-color] duration-150 hover:-translate-y-0.5"
                  style={{
                    borderColor: dragId === a.id ? 'var(--border-glass)' : 'var(--border)',
                    background: 'var(--surface)',
                    cursor: 'grab',
                    opacity: dragId === a.id ? 0.5 : 1,
                    animation: 'revealUp .2s ease-out both',
                  }}
                  aria-label={`${a.role} at ${a.company}, ${a.match}% match, ${a.status}. Use left and right arrow keys to change stage.`}
                >
                  <span
                    className="flex items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ width: 34, height: 34, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}
                  >
                    {a.company[0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold" style={{ color: 'var(--text)' }}>
                      {a.role}
                    </span>
                    <span className="block truncate text-[11px]" style={{ color: 'var(--text-3)' }}>
                      {a.company}
                    </span>
                  </span>
                  <span className="flex-shrink-0 text-right">
                    <span style={{ ...matchChipStyle(a.match), display: 'inline-block', marginBottom: 2 }}>{a.match}%</span>
                    <span className="block text-[10px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                      {a.applied}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}
