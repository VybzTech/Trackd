'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '@/types';
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarCheckLine, RiTimeLine } from 'react-icons/ri';

interface CalendarViewProps {
  jobs: Job[];
  onSelectJob?: (job: Job) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DayEvent = { job: Job; type: 'deadline' | 'interview' | 'applied' };

export function CalendarView({ jobs, onSelectJob }: CalendarViewProps) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const today = new Date();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Pad start + end so grid is full weeks
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function eventsForDay(day: number): DayEvent[] {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const results: DayEvent[] = [];
    for (const job of jobs) {
      if (job.timeline?.deadline?.toISOString().slice(0, 10) === iso)
        results.push({ job, type: 'deadline' });
      if (job.timeline?.interviewDate?.toISOString().slice(0, 10) === iso)
        results.push({ job, type: 'interview' });
      if (job.timeline?.appliedDate?.toISOString().slice(0, 10) === iso)
        results.push({ job, type: 'applied' });
    }
    return results;
  }

  function isToday(day: number) {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  }

  const eventColors: Record<DayEvent['type'], string> = {
    deadline: 'bg-red-500/20 text-red-300 border border-red-500/30',
    interview: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    applied: 'bg-[var(--vybz-blue)]/15 text-blue-300 border border-[var(--vybz-blue)]/30',
  };

  return (
    <div className="space-y-4">
      {/* Calendar Nav */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white font-heading">
          {MONTH_NAMES[month]} {year}
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="btn-3d p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <RiArrowLeftSLine className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewDate(new Date())}
            className="btn-3d px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:text-white"
          >
            Today
          </button>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="btn-3d p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <RiArrowRightSLine className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-slate-500 py-1.5 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((day, idx) => {
            const events = day ? eventsForDay(day) : [];
            const todayCell = day ? isToday(day) : false;

            return (
              <div
                key={idx}
                className={`min-h-[90px] p-1.5 rounded-lg border transition-colors ${
                  day
                    ? todayCell
                      ? 'border-[var(--vybz-blue)]/50 bg-[var(--vybz-blue)]/8'
                      : 'border-slate-700/50 bg-slate-800/25 hover:border-slate-600/60 hover:bg-slate-800/50'
                    : 'border-transparent'
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`block text-[11px] font-semibold mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                        todayCell
                          ? 'bg-[var(--vybz-blue)] text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {day}
                    </span>
                    <div className="space-y-0.5">
                      {events.slice(0, 3).map((ev, i) => (
                        <button
                          key={i}
                          onClick={() => onSelectJob?.(ev.job)}
                          className={`w-full text-left text-[10px] px-1.5 py-0.5 rounded truncate font-medium transition-opacity hover:opacity-80 ${eventColors[ev.type]}`}
                          title={`${ev.job.company.name} — ${ev.type}`}
                        >
                          {ev.job.company.name}
                        </button>
                      ))}
                      {events.length > 3 && (
                        <p className="text-[10px] text-slate-500 px-1">+{events.length - 3}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center gap-5 pt-3 border-t border-slate-700/50">
        {[
          { color: 'bg-red-500/20 border border-red-500/30', label: 'Deadline', icon: RiCalendarCheckLine },
          { color: 'bg-purple-500/20 border border-purple-500/30', label: 'Interview', icon: RiTimeLine },
          { color: 'bg-[var(--vybz-blue)]/15 border border-[var(--vybz-blue)]/30', label: 'Applied', icon: RiCalendarCheckLine },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
            <span className="text-[11px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
