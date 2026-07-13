import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { STATUS_COLOR, STATUS_LABEL, STATUS_ORDER } from '../lib/statusTokens'
import { GlassCard, IconChip } from './ui'

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 1))
  const opportunities = useAppStore((state) => state.opportunities)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getOpportunitiesForDate = (day: number) => {
    return opportunities.filter((opp) => {
      if (!opp.applicationDeadline) return false
      const oppDate = new Date(opp.applicationDeadline)
      return (
        oppDate.getDate() === day &&
        oppDate.getMonth() === currentDate.getMonth() &&
        oppDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <GlassCard>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-semibold text-white">{monthName}</h3>
          <div className="flex gap-2">
            <IconChip icon={<FiChevronLeft size={18} />} onClick={handlePrevMonth} />
            <IconChip icon={<FiChevronRight size={18} />} onClick={handleNextMonth} />
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold py-2" style={{ color: 'var(--text-tint-2)' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayOpportunities = day ? getOpportunitiesForDate(day) : []
            const isToday =
              day &&
              new Date().getDate() === day &&
              new Date().getMonth() === currentDate.getMonth() &&
              new Date().getFullYear() === currentDate.getFullYear()

            return (
              <div
                key={index}
                className="aspect-square rounded-xl transition-colors"
                style={
                  day
                    ? {
                        border: `1px solid ${isToday ? 'var(--glow-top)' : 'var(--border-glass)'}`,
                        background: isToday ? 'rgba(82,232,255,0.1)' : 'rgba(255,255,255,0.03)',
                      }
                    : { background: 'transparent', border: '1px solid transparent' }
                }
              >
                {day && (
                  <div className="h-full flex flex-col p-2">
                    <span
                      className="text-xs font-semibold mb-1 font-mono"
                      style={{ color: isToday ? 'var(--glow-top)' : 'var(--text-tint-1)' }}
                    >
                      {day}
                    </span>
                    <div className="space-y-1 flex-1 overflow-y-auto">
                      {dayOpportunities.map((opp) => {
                        const color = STATUS_COLOR[opp.status]
                        return (
                          <motion.div
                            key={opp.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="rounded px-1 py-0.5 text-xs text-white truncate"
                            style={{ backgroundColor: `${color}4d` }}
                            title={`${opp.company} - ${opp.role}`}
                          >
                            {opp.company}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs">
          {STATUS_ORDER.map((status) => (
            <div key={status} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: STATUS_COLOR[status] }} />
              <span style={{ color: 'var(--text-tint-2)' }}>{STATUS_LABEL[status]}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
