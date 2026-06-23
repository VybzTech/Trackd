'use client';

import { motion } from 'framer-motion';
import { Job } from '@/types';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface InboxListProps {
  jobs: Job[];
  selectedId?: string;
  onSelect: (job: Job) => void;
}

export function InboxList({ jobs, selectedId, onSelect }: InboxListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      {jobs.map((job) => (
        <motion.button
          key={job.id}
          variants={itemVariants}
          onClick={() => onSelect(job)}
          className={`w-full text-left p-4 rounded-lg transition-all ${
            selectedId === job.id
              ? 'bg-slate-700 border border-[var(--vybz-blue)]'
              : 'bg-slate-800 border border-slate-700 hover:bg-slate-700/50'
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Status Badge */}
            {job.description && job.technicalRequirements ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-white truncate">
                  {job.role.title}
                </p>
                <span className="text-xs font-medium px-2 py-1 bg-slate-600 rounded-full text-slate-200 flex-shrink-0">
                  {job.source}
                </span>
              </div>
              <p className="text-sm text-slate-400 truncate">
                {job.company.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {job.createdAt.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </motion.button>
      ))}

      {jobs.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-sm">No jobs in inbox</p>
        </div>
      )}
    </motion.div>
  );
}
