import { useEffect, useState } from 'react'
import { primaryBtnStyle, type Reminder, type ReminderType } from './data'

interface ReminderModalProps {
  dayKey: string
  monthWord: string
  reminders: Reminder[]
  onClose: () => void
  onSave: (label: string, type: ReminderType) => void
  onDelete: (id: number) => void
}

export default function ReminderModal({ dayKey, monthWord, reminders, onClose, onSave, onDelete }: ReminderModalProps) {
  const [label, setLabel] = useState('')
  const [type, setType] = useState<ReminderType>('interview')

  const day = Number(dayKey.split('-').pop())
  const dateLabel = `${monthWord} ${day}`
  const dayReminders = reminders.filter((r) => r.monthKey === dayKey.slice(0, dayKey.lastIndexOf('-')) && r.day === day)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const save = () => {
    const trimmed = label.trim()
    if (!trimmed) return
    onSave(trimmed, type)
    setLabel('')
  }

  const toggleBase = 'flex-1 rounded-lg px-4 py-[7px] text-[13px] font-semibold transition-colors duration-150'
  const toggleStyle = (active: boolean) =>
    active ? { background: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer', border: 'none' } : { background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', border: 'none' }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5"
      style={{ background: 'rgba(0,0,0,0.55)', animation: 'fadeIn .15s ease-out both' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Reminders for ${dateLabel}`}
    >
      <div
        className="w-full rounded-2xl p-5 sm:p-6"
        style={{ maxWidth: 400, background: 'var(--surface)', border: '1px solid var(--border-glass)', animation: 'scaleIn .18s ease-out both', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-1 text-[17px] font-bold">{dateLabel}</h3>
        <p className="mb-4 text-[12.5px]" style={{ color: 'var(--text-3)' }}>
          Set a reminder for an interview or application deadline.
        </p>

        {dayReminders.length > 0 && (
          <div className="mb-[18px] flex flex-col gap-2">
            {dayReminders.map((r) => (
              <div key={r.id} className="flex items-center gap-2.5 rounded-[9px] px-3 py-2.5" style={{ border: '1px solid var(--border)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.type === 'interview' ? 'var(--glow-top)' : 'var(--info)', flexShrink: 0 }} />
                <span className="flex-1 text-[13px]" style={{ color: 'var(--text)' }}>
                  {r.label}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(r.id)}
                  aria-label="Remove reminder"
                  style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-[18px] flex flex-col gap-3">
          <input
            type="text"
            placeholder="e.g. Vercel — onsite interview"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
            }}
            className="w-full rounded-[9px] px-3 py-2.5 text-[13.5px]"
            style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
          />
          <div className="flex w-fit gap-0.5 rounded-[10px] p-[3px]" style={{ border: '1px solid var(--border)' }}>
            <button type="button" onClick={() => setType('interview')} className={toggleBase} style={toggleStyle(type === 'interview')}>
              Interview
            </button>
            <button type="button" onClick={() => setType('deadline')} className={toggleBase} style={toggleStyle(type === 'deadline')}>
              Deadline
            </button>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[10px] py-2.5 text-[13.5px] font-semibold"
            style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}
          >
            Close
          </button>
          <button type="button" onClick={save} className="flex-1 justify-center" style={{ ...primaryBtnStyle, justifyContent: 'center' }}>
            Add reminder
          </button>
        </div>
      </div>
    </div>
  )
}
