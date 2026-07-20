import { HEAT_BY_DAY, WEEKDAY_LABELS, type Reminder } from './data'

interface CalendarViewProps {
  monthOffset: number
  reminders: Reminder[]
  onPrevMonth: () => void
  onNextMonth: () => void
  onDayClick: (monthKey: string, day: number) => void
}

export default function CalendarView({ monthOffset, reminders, onPrevMonth, onNextMonth, onDayClick }: CalendarViewProps) {
  const now = new Date()
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const calYear = viewDate.getFullYear()
  const calMonth = viewDate.getMonth()
  const monthLabel = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const firstWeekday = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const thisMonthKey = calYear + '-' + calMonth
  const maxHeat = Math.max(1, ...Object.values(HEAT_BY_DAY))

  const remindersForDay = (day: number) => reminders.filter((r) => r.monthKey === thisMonthKey && r.day === day)

  const navBtn = 'flex items-center justify-center rounded-lg text-[16px] leading-none transition-colors duration-150'

  return (
    <div className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
      <div className="mb-[18px] flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          aria-label="Previous month"
          className={navBtn}
          style={{ width: 30, height: 30, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
        >
          ‹
        </button>
        <span className="text-[14.5px] font-bold">{monthLabel}</span>
        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Next month"
          className={navBtn}
          style={{ width: 30, height: 30, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
        >
          ›
        </button>
      </div>

      <div className="mb-2 grid gap-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {WEEKDAY_LABELS.map((w) => (
          <div key={w} className="text-center text-[10.5px] font-semibold uppercase" style={{ color: 'var(--text-3)' }}>
            {w}
          </div>
        ))}
      </div>

      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`pad-${i}`} style={{ visibility: 'hidden' }} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const count = HEAT_BY_DAY[day] || 0
          const bg =
            count === 0 ? 'var(--surface-alt)' : `color-mix(in srgb, var(--glow-top) ${Math.round((count / maxHeat) * 90)}%, var(--surface))`
          const dayReminders = remindersForDay(day)
          return (
            <button
              key={day}
              type="button"
              onClick={() => onDayClick(thisMonthKey, day)}
              className="flex flex-col items-center justify-center rounded-[9px] p-1 transition-[transform,border-color] duration-150 hover:-translate-y-0.5"
              style={{ aspectRatio: '1', border: '1px solid var(--border)', background: bg, cursor: 'pointer' }}
              aria-label={`${monthLabel.split(' ')[0]} ${day}${count ? `, ${count} applications` : ''}${dayReminders.length ? `, ${dayReminders.length} reminders` : ''}`}
            >
              <span className="text-[11.5px] font-bold" style={count > 0 ? { color: 'var(--text)' } : { color: 'var(--text-2)' }}>
                {day}
              </span>
              <span className="text-[9px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>
                {count > 0 ? `${count} apps` : ''}
              </span>
              <div className="mt-0.5 flex gap-[3px]" style={{ height: 6 }}>
                {dayReminders.map((r) => (
                  <span
                    key={r.id}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: r.type === 'interview' ? 'var(--glow-top)' : 'var(--info)' }}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-[18px] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-3)' }}>
          <span>Fewer applications</span>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--border)' }} />
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'color-mix(in srgb, var(--glow-top) 35%, var(--surface))' }} />
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'color-mix(in srgb, var(--glow-top) 65%, var(--surface))' }} />
          <span style={{ width: 12, height: 12, borderRadius: 3, background: 'color-mix(in srgb, var(--glow-top) 95%, var(--surface))' }} />
          <span>More</span>
        </div>
        <div className="flex items-center gap-3.5 text-[11.5px]" style={{ color: 'var(--text-2)' }}>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--glow-top)' }} />
            Interview
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--info)' }} />
            Deadline
          </span>
        </div>
      </div>
    </div>
  )
}
