import { HEAT_LEVELS } from './data'

function heatBackground(level: number): string {
  return level === 0
    ? 'var(--border)'
    : `color-mix(in srgb, var(--glow-top) ${level * 25}%, var(--surface))`
}

export default function TrackCard() {
  return (
    <div
      className="min-w-[280px] flex-[1_1_380px] rounded-2xl border p-6 [animation:revealUp_.6s_ease-out_both]"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Mini 3-column Kanban */}
      <div className="flex gap-1.5">
        <div className="h-20 flex-1 rounded-lg border" style={{ background: 'var(--surface-alt)', borderColor: 'var(--border)' }} />
        <div
          className="h-20 flex-1 rounded-lg border"
          style={{
            background: 'var(--surface-alt)',
            borderColor: 'var(--border-glass)',
            boxShadow: '0 0 0 1px var(--border-glass) inset',
          }}
        >
          <div
            className="mx-auto mt-2.5 h-2 w-[75%] rounded-[3px] opacity-70 [animation:floatY2_3s_ease-in-out_infinite]"
            style={{ background: 'var(--glow-top)' }}
          />
        </div>
        <div className="h-20 flex-1 rounded-lg border" style={{ background: 'var(--surface-alt)', borderColor: 'var(--border)' }} />
      </div>

      {/* Calendar heatmap: 7×3 grid of square cells */}
      <div className="mt-3.5 grid grid-cols-7 gap-1">
        {HEAT_LEVELS.map((level, i) => (
          <div
            key={i}
            className="w-full rounded-[3px] pt-[100%]"
            style={{ background: heatBackground(level) }}
          />
        ))}
      </div>
    </div>
  )
}
