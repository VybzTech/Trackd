'use client';

import { useState } from 'react';
import { DashboardSummary } from '@/components/dashboard-summary';
import { KanbanView } from '@/components/kanban-view';
import { DetailPanel } from '@/components/detail-panel';
import { mockJobs, mockStats } from '@/lib/mock-data';
import { Job } from '@/types';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">Dashboard</h1>
          <p className="text-slate-400 mt-1">Track your job applications at a glance</p>
        </div>
        <button className="btn-3d-primary">+ New Job</button>
      </motion.div>

      {/* Summary Cards */}
      <DashboardSummary stats={mockStats} />

      {/* Main Content with Detail Panel */}
      <div className="flex gap-6 h-[calc(100vh-400px)]">
        {/* Kanban View */}
        <div className="flex-1 overflow-hidden">
          <KanbanView jobs={mockJobs} onSelectJob={setSelectedJob} />
        </div>

        {/* Detail Panel */}
        {selectedJob && (
          <DetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </div>
    </div>
  );
}
