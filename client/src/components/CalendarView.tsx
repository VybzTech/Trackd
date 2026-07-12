import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'

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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      saved: 'bg-slate-500/30',
      applied: 'bg-blue-500/30',
      interviewing: 'bg-cyan-500/30',
      offer: 'bg-green-500/30',
      rejected: 'bg-red-500/30'
    }
    return colors[status] || 'bg-slate-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{monthName}</h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevMonth}
            className="p-2 bg-brand-surface/40 border border-blue-500/20 rounded-lg text-white hover:border-blue-500/50 transition-colors"
          >
            <FiChevronLeft size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextMonth}
            className="p-2 bg-brand-surface/40 border border-blue-500/20 rounded-lg text-white hover:border-blue-500/50 transition-colors"
          >
            <FiChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-slate-400 py-2">
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
              className={`aspect-square rounded-lg border transition-colors ${
                day
                  ? isToday
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-blue-500/20 bg-brand-surface/20 hover:border-blue-500/50'
                  : 'bg-transparent border-transparent'
              }`}
            >
              {day && (
                <div className="h-full flex flex-col p-2">
                  <span
                    className={`text-xs font-semibold mb-1 ${
                      isToday ? 'text-blue-400' : 'text-slate-300'
                    }`}
                  >
                    {day}
                  </span>
                  <div className="space-y-1 flex-1 overflow-y-auto">
                    {dayOpportunities.map((opp) => (
                      <motion.div
                        key={opp.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`${getStatusColor(opp.status)} rounded px-1 py-0.5 text-xs text-white truncate`}
                        title={`${opp.company} - ${opp.role}`}
                      >
                        {opp.company}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        {[
          { label: 'Saved', color: 'bg-slate-500/30' },
          { label: 'Applied', color: 'bg-blue-500/30' },
          { label: 'Interviewing', color: 'bg-cyan-500/30' },
          { label: 'Offer', color: 'bg-green-500/30' },
          { label: 'Rejected', color: 'bg-red-500/30' }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
