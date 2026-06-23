'use client';

import { motion } from 'framer-motion';
import { Job } from '@/types';
import { RiCheckboxCircleLine, RiAlertLine, RiLinkedinBoxLine, RiGlobalLine } from 'react-icons/ri';

interface InboxListProps {
  jobs: Job[];
  selectedId?: string;
  onSelect: (job: Job) => void;
}

const SOURCE_ICON: Record<string, React.ElementType> = {
  LinkedIn: RiLinkedinBoxLine,
};

function isComplete(job: Job) {
  return !!(job.description && job.technicalRequirements && job.compensation?.min);
}

const BADGE_LABELS: Array<{ check: (j: Job) => boolean; label: string; color: string }> = [
  {
    check: (j) => !j.compensation?.min,
    label: 'Missing Salary',
    color: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  },
  {
    check: (j) => !j.technicalRequirements?.stack?.length,
    label: 'No Stack Info',
    color: 'bg-red-500/15 border-red-500/30 text-red-400',
  },
];

export function InboxList({ jobs, selectedId, onSelect }: InboxListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      className="space-y-2"
    >
      {jobs.map((job) => {
        const complete = isComplete(job);
        const SourceIcon = SOURCE_ICON[job.source ?? ''] ?? RiGlobalLine;
        const flags = BADGE_LABELS.filter((b) => b.check(job));

        return (
          <motion.button
            key={job.id}
            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
            onClick={() => onSelect(job)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all ${
              selectedId === job.id
                ? 'bg-[var(--vybz-blue)]/8 border-[var(--vybz-blue)]/40 shadow-3d-flat'
                : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Status indicator */}
              {complete ? (
                <RiCheckboxCircleLine className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <RiAlertLine className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              )}

              <div className="flex-1 min-w-0">
                {/* Title + Source */}
                <div className="flex items-start justify-between gap-1.5 mb-1">
                  <p className="text-[13px] font-semibold text-white truncate">{job.role.title}</p>
                  <span className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-slate-700/60 border border-slate-600/50 rounded-md text-slate-300 flex-shrink-0">
                    <SourceIcon className="w-3 h-3" />
                    {job.source}
                  </span>
                </div>

                <p className="text-xs text-slate-500 truncate mb-2">{job.company.name}</p>

                {/* Flag badges */}
                {flags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {flags.map((f) => (
                      <span
                        key={f.label}
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${f.color}`}
                      >
                        {f.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date */}
                <p className="text-[10px] text-slate-600 mt-1.5">
                  {job.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}

      {jobs.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-sm text-slate-600">Inbox is empty</p>
        </div>
      )}
    </motion.div>
  );
}
