'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '@/types';
import Link from 'next/link';
import { AIGenerationModal } from './ai-modal';
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiFlashlightLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiAlertLine,
} from 'react-icons/ri';

interface DetailPanelProps {
  job: Job;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  Bookmarked: 'bg-slate-600/40 text-slate-300 border-slate-600/60',
  Applied: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Interviewing: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  Offer: 'bg-green-500/15 text-green-300 border-green-500/30',
  Rejected: 'bg-red-500/15 text-red-300 border-red-500/30',
};

export function DetailPanel({ job, onClose }: DetailPanelProps) {
  const [showAIModal, setShowAIModal] = useState(false);

  const matchScore = job.aiInsights?.matchScore ?? 0;
  const scoreColor =
    matchScore >= 85 ? 'from-green-400 to-emerald-500' :
    matchScore >= 65 ? 'from-[var(--vybz-blue)] to-blue-400' :
    'from-amber-400 to-orange-400';

  return (
    <>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="w-[340px] flex-shrink-0 bg-slate-800/60 border-l border-slate-700/60 flex flex-col h-full backdrop-blur-sm"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-700/60 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  statusColors[job.status] ?? statusColors.Bookmarked
                }`}
              >
                {job.status}
              </span>
              {job.source && (
                <span className="text-[10px] text-slate-500">{job.source}</span>
              )}
            </div>
            <h2 className="text-base font-bold text-white leading-snug truncate">{job.role.title}</h2>
            <p className="text-sm text-slate-400">{job.company.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Quick Facts */}
          <div className="grid grid-cols-1 gap-2.5">
            {job.role.workMode && (
              <div className="flex items-center gap-2.5 text-sm">
                <RiMapPinLine className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="text-slate-300">{job.role.workMode}</span>
                {job.role.level && <span className="text-slate-600">·</span>}
                {job.role.level && <span className="text-slate-400">{job.role.level}</span>}
              </div>
            )}
            {job.compensation?.min && (
              <div className="flex items-center gap-2.5 text-sm">
                <RiMoneyDollarCircleLine className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="text-slate-300">
                  ${job.compensation.min.toLocaleString()}
                  {job.compensation.max ? ` – $${job.compensation.max.toLocaleString()}` : '+'}{' '}
                  <span className="text-slate-500">{job.compensation.currency}</span>
                </span>
              </div>
            )}
            {job.timeline?.deadline && (
              <div className="flex items-center gap-2.5 text-sm">
                <RiTimeLine className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="text-slate-400">Deadline</span>
                <span className="text-slate-300">
                  {job.timeline.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/50" />

          {/* AI Workspace Zone */}
          {job.aiInsights && (
            <div className="card-3d !p-4 space-y-4 border border-[var(--vybz-blue)]/20 bg-[var(--vybz-blue)]/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[var(--vybz-blue)]/20 flex items-center justify-center">
                    <RiFlashlightLine className="w-3.5 h-3.5 text-[var(--vybz-blue)]" />
                  </div>
                  <span className="text-sm font-semibold text-white">AI Workspace</span>
                </div>
                <span className="text-[10px] font-semibold text-[var(--vybz-blue)] bg-[var(--vybz-blue)]/10 px-2 py-0.5 rounded-full border border-[var(--vybz-blue)]/25">
                  TRACKD AI
                </span>
              </div>

              {/* Match Score */}
              {matchScore > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Match Score</span>
                    <span className={`text-sm font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                      {matchScore}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${matchScore}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${scoreColor} rounded-full`}
                    />
                  </div>
                </div>
              )}

              {/* Matched Skills */}
              {job.aiInsights.matchedSkills && job.aiInsights.matchedSkills.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Matched Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {job.aiInsights.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/25 rounded-full text-[10px] text-green-300 font-medium"
                      >
                        <RiCheckboxCircleLine className="w-2.5 h-2.5" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {job.aiInsights.missingSkills && job.aiInsights.missingSkills.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Gaps to Address</p>
                  <div className="flex flex-wrap gap-1">
                    {job.aiInsights.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded-full text-[10px] text-amber-300 font-medium"
                      >
                        <RiAlertLine className="w-2.5 h-2.5" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Materials CTA */}
              <button
                onClick={() => setShowAIModal(true)}
                className="btn-3d-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg"
              >
                <RiFlashlightLine className="w-4 h-4" />
                Generate Tailored Materials
              </button>
            </div>
          )}

          {/* Stack Keywords */}
          {job.technicalRequirements?.stack && job.technicalRequirements.stack.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {job.technicalRequirements.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-slate-700/50 border border-slate-600/60 rounded-md text-[11px] text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Link */}
          {job.jobLink && (
            <a
              href={job.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all group"
            >
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                View Full Listing
              </span>
              <RiExternalLinkLine className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
            </a>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-slate-700/60 space-y-2">
          <Link
            href={`/dashboard/apply/${job.id}`}
            className="btn-3d-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg"
          >
            Open Apply Workspace
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* AI Generation Modal */}
      {showAIModal && (
        <AIGenerationModal
          job={job}
          onClose={() => setShowAIModal(false)}
          onGenerate={(letter) => {
            console.log('[Trackd] Cover letter generated:', letter.slice(0, 60));
          }}
        />
      )}
    </>
  );
}
