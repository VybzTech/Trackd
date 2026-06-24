'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardSummary } from '@/components/dashboard-summary';
import { KanbanView } from '@/components/kanban-view';
import { CalendarView } from '@/components/calendar-view';
import { DetailPanel } from '@/components/detail-panel';
import { mockStats } from '@/lib/mock-data';
import { useJobs } from '@/hooks/use-jobs';
import { Job } from '@/types';
import { RiLayoutColumnLine, RiCalendar2Line, RiAddLine } from 'react-icons/ri';

type ViewMode = 'kanban' | 'calendar';

export default function DashboardPage() {
  const { jobs } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white font-heading tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track your job search pipeline</p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-800 border border-slate-700/60 rounded-lg p-0.5 shadow-3d-flat">
            {([
              { mode: 'kanban', Icon: RiLayoutColumnLine, label: 'Pipeline' },
              { mode: 'calendar', Icon: RiCalendar2Line, label: 'Calendar' },
            ] as { mode: ViewMode; Icon: React.ElementType; label: string }[]).map(({ mode, Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                  viewMode === mode
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {viewMode === mode && (
                  <motion.div
                    layoutId="view-pill"
                    className="absolute inset-0 bg-[var(--vybz-blue)] rounded-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <button className="btn-3d-primary flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg">
            <RiAddLine className="w-4 h-4" />
            Add Job
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <DashboardSummary stats={mockStats} />

      {/* Main Workspace */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* View Content */}
        <div className={`flex-1 overflow-auto ${viewMode === 'kanban' ? '' : 'card-3d !p-5'}`}>
          <AnimatePresence mode="wait">
            {viewMode === 'kanban' ? (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <KanbanView jobs={jobs} onSelectJob={setSelectedJob} />
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <CalendarView jobs={jobs} onSelectJob={setSelectedJob} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detail Panel — slides in from right */}
        <AnimatePresence>
          {selectedJob && (
            <DetailPanel
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
