import { useState } from 'react'
import { defaultReminders, type ApplicationStatus, type CandidateApp, type Reminder, type ReminderType } from './data'
import StatCards from './StatCards'
import KanbanBoard from './KanbanBoard'
import PipelineTable from './PipelineTable'
import CalendarView from './CalendarView'
import ReminderModal from './ReminderModal'

type ViewMode = 'kanban' | 'table' | 'calendar'

interface PipelineTabProps {
  apps: CandidateApp[]
  searchQuery: string
  onMoveCard: (id: number, status: ApplicationStatus) => void
  onOpenDetail: (id: number) => void
}

export default function PipelineTab({ apps, searchQuery, onMoveCard, onOpenDetail }: PipelineTabProps) {
  const [view, setView] = useState<ViewMode>('kanban')
  const [monthOffset, setMonthOffset] = useState(0)
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders)
  const [modalDayKey, setModalDayKey] = useState<string | null>(null)

  const q = searchQuery.trim().toLowerCase()
  const filtered = q ? apps.filter((a) => (a.company + ' ' + a.role).toLowerCase().includes(q)) : apps

  const now = new Date()
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const monthWord = viewDate.toLocaleString('en-US', { month: 'long' })

  const saveReminder = (label: string, type: ReminderType) => {
    if (!modalDayKey) return
    const day = Number(modalDayKey.split('-').pop())
    const monthKey = modalDayKey.slice(0, modalDayKey.lastIndexOf('-'))
    const newId = Math.max(0, ...reminders.map((r) => r.id)) + 1
    setReminders((rs) => [...rs, { id: newId, monthKey, day, label, type }])
  }

  const toggleBase = 'rounded-lg px-4 py-[7px] text-[13px] font-semibold transition-colors duration-150'
  const toggleStyle = (active: boolean) =>
    active
      ? { background: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer', border: 'none' as const }
      : { background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', border: 'none' as const }

  return (
    <div>
      <StatCards apps={apps} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-fit items-center gap-0.5 rounded-[10px] p-[3px]" style={{ border: '1px solid var(--border)' }} role="tablist" aria-label="Pipeline view">
          <button type="button" role="tab" aria-selected={view === 'kanban'} onClick={() => setView('kanban')} className={toggleBase} style={toggleStyle(view === 'kanban')}>
            Kanban
          </button>
          <button type="button" role="tab" aria-selected={view === 'table'} onClick={() => setView('table')} className={toggleBase} style={toggleStyle(view === 'table')}>
            Table
          </button>
          <button type="button" role="tab" aria-selected={view === 'calendar'} onClick={() => setView('calendar')} className={toggleBase} style={toggleStyle(view === 'calendar')}>
            Calendar
          </button>
        </div>
        <div className="text-[12px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
          {filtered.length} of {apps.length}
        </div>
      </div>

      {view === 'kanban' && <KanbanBoard apps={filtered} onMoveCard={onMoveCard} onOpenDetail={onOpenDetail} />}
      {view === 'table' && <PipelineTable apps={filtered} onOpenDetail={onOpenDetail} />}
      {view === 'calendar' && (
        <CalendarView
          monthOffset={monthOffset}
          reminders={reminders}
          onPrevMonth={() => setMonthOffset((o) => o - 1)}
          onNextMonth={() => setMonthOffset((o) => o + 1)}
          onDayClick={(monthKey, day) => setModalDayKey(`${monthKey}-${day}`)}
        />
      )}

      {modalDayKey && (
        <ReminderModal
          dayKey={modalDayKey}
          monthWord={monthWord}
          reminders={reminders}
          onClose={() => setModalDayKey(null)}
          onSave={saveReminder}
          onDelete={(id) => setReminders((rs) => rs.filter((r) => r.id !== id))}
        />
      )}
    </div>
  )
}
