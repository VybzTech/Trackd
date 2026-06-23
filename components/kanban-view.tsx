'use client';

import { motion } from 'framer-motion';
import { Job, JobStatus } from '@/types';
import {
  RiBookmarkLine,
  RiSendPlaneLine,
  RiUserVoiceLine,
  RiTrophyLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

interface KanbanViewProps {
  jobs: Job[];
  onSelectJob?: (job: Job) => void;
}

const COLUMNS: { status: JobStatus; Icon: React.ElementType; color: string; badge: string }[] = [
  { status: 'Bookmarked', Icon: RiBookmarkLine, color: 'text-slate-400', badge: 'bg-slate-700 text-slate-300' },
  { status: 'Applied', Icon: RiSendPlaneLine, color: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-300' },
  { status: 'Interviewing', Icon: RiUserVoiceLine, color: 'text-purple-400', badge: 'bg-purple-500/15 text-purple-300' },
  { status: 'Offer', Icon: RiTrophyLine, color: 'text-green-400', badge: 'bg-green-500/15 text-green-300' },
];

const dotColors: Record<JobStatus, string> = {
  Bookmarked: 'bg-slate-500',
  Applied: 'bg-[var(--vybz-blue)]',
  Interviewing: 'bg-purple-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
};

export function KanbanView({ jobs, onSelectJob }: KanbanViewProps) {
  return (
    <div className="grid grid-cols-4 gap-3 h-full">
      {COLUMNS.map(({ status, Icon, color, badge }) => {
        const colJobs = jobs.filter((j) => j.status === status);
        return (
          <div key={status} className="flex flex-col min-h-0">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <h3 className="text-xs font-semibold text-slate-300 flex-1">{status}</h3>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>
                {colJobs.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
              {colJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => onSelectJob?.(job)}
                  className="card-3d cursor-pointer group hover:border-slate-600 transition-colors p-3"
                >
                  {/* Company logo placeholder */}
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-sm flex-shrink-0 select-none">
                      {job.company.logo ?? job.company.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white truncate leading-tight">
                        {job.role.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{job.company.name}</p>
                    </div>
                    <RiArrowRightSLine className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5" />
                  </div>

                  {/* Work Mode + Level */}
                  {(job.role.workMode || job.role.level) && (
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {job.role.workMode && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 border border-slate-700/60 rounded text-slate-400">
                          {job.role.workMode}
                        </span>
                      )}
                      {job.role.level && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-700/50 border border-slate-700/60 rounded text-slate-400">
                          {job.role.level}
                        </span>
                      )}
                    </div>
                  )}

                  {/* AI Match Score */}
                  {job.aiInsights?.matchScore && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Match</span>
                        <span className="text-[10px] font-bold text-slate-300">
                          {job.aiInsights.matchScore}%
                        </span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${job.aiInsights.matchScore}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.04 }}
                          className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Salary */}
                  {job.compensation?.min && (
                    <p className="text-[10px] text-slate-500 mt-2">
                      ${(job.compensation.min / 1000).toFixed(0)}k
                      {job.compensation.max ? `–$${(job.compensation.max / 1000).toFixed(0)}k` : '+'}
                    </p>
                  )}
                </motion.div>
              ))}

              {colJobs.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-[11px] text-slate-600">No jobs here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
