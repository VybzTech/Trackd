'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Zap, AlertCircle } from 'lucide-react';
import { Job } from '@/types';
import Link from 'next/link';

interface DetailPanelProps {
  job: Job;
  onClose: () => void;
}

export function DetailPanel({ job, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-96 bg-slate-800/50 border-l border-slate-700 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{job.role.title}</h2>
            <p className="text-slate-400 text-sm">{job.company.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Job Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Location
              </p>
              <p className="text-white mt-1">{job.role.workMode || 'Not specified'}</p>
            </div>

            {job.compensation?.min && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Compensation
                </p>
                <p className="text-white mt-1">
                  ${job.compensation.min.toLocaleString()} - $
                  {job.compensation.max?.toLocaleString() || '?'}
                  {job.compensation.currency && ` ${job.compensation.currency}`}
                </p>
              </div>
            )}

            {job.timeline?.deadline && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Application Deadline
                </p>
                <p className="text-white mt-1">
                  {job.timeline.deadline.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* AI Insights */}
          {job.aiInsights && (
            <div className="card-3d !p-4 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[var(--vybz-blue)]" />
                <h3 className="font-semibold text-white">AI Insights</h3>
              </div>

              {job.aiInsights.matchScore && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Match Score</span>
                    <span className="font-semibold text-white">
                      {job.aiInsights.matchScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${job.aiInsights.matchScore}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400"
                    />
                  </div>
                </div>
              )}

              {job.aiInsights.missingSkills &&
                job.aiInsights.missingSkills.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-300 mb-2">Missing Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {job.aiInsights.missingSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-slate-700/50 border border-slate-600 text-xs text-slate-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Job Link */}
          {job.jobLink && (
            <a
              href={job.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
            >
              <span className="text-sm font-medium text-slate-300">View Full Listing</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-700 space-y-2">
          <Link
            href={`/dashboard/apply/${job.id}`}
            className="btn-3d-primary w-full flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Generate Materials
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
