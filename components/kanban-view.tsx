'use client';

import { motion } from 'framer-motion';
import { Job, JobStatus } from '@/types';
import { Bookmark, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface KanbanViewProps {
  jobs: Job[];
  onSelectJob?: (job: Job) => void;
}

const statuses: JobStatus[] = ['Bookmarked', 'Applied', 'Interviewing', 'Offer'];

export function KanbanView({ jobs, onSelectJob }: KanbanViewProps) {
  const getJobsByStatus = (status: JobStatus) => {
    return jobs.filter((job) => job.status === status);
  };

  const getStatusColor = (status: JobStatus) => {
    const colors: Record<JobStatus, string> = {
      Bookmarked: 'from-slate-400 to-slate-500',
      Applied: 'from-blue-400 to-blue-500',
      Interviewing: 'from-purple-400 to-purple-500',
      Offer: 'from-green-400 to-green-500',
      Rejected: 'from-red-400 to-red-500',
    };
    return colors[status];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {statuses.map((status) => {
        const statusJobs = getJobsByStatus(status);
        return (
          <div key={status} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(status)}`}
              />
              <h3 className="text-sm font-semibold text-slate-300">
                {status}
              </h3>
              <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
                {statusJobs.length}
              </span>
            </div>

            {/* Jobs Column */}
            <div className="flex-1 space-y-3">
              {statusJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onSelectJob?.(job)}
                  className="card-3d cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate text-sm">
                        {job.role.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {job.company.name}
                      </p>
                      {job.aiInsights?.matchScore && (
                        <div className="mt-2 flex items-center gap-1">
                          <div className="w-full h-1 bg-slate-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400"
                              style={{
                                width: `${job.aiInsights.matchScore}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-300 ml-1">
                            {job.aiInsights.matchScore}%
                          </span>
                        </div>
                      )}
                    </div>
                    <Bookmark className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-[var(--vybz-blue)]" />
                  </div>
                </motion.div>
              ))}

              {/* Empty State */}
              {statusJobs.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-xs">No jobs yet</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
