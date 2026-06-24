'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Job } from '@/types';
import { RiCloseLine, RiDownloadLine, RiFlashlightLine, RiFileCopyLine } from 'react-icons/ri';

interface AIGenerationModalProps {
  job: Job;
  onClose: () => void;
  onGenerate?: (coverLetter: string) => void;
}

function buildCoverLetter(
  jobTitle: string,
  companyName: string,
  relevantSkill: string,
  stack: string,
  industry: string,
): string {
  return `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at ${companyName}. With my extensive experience in ${relevantSkill} and a proven track record of delivering high-impact solutions, I am confident in my ability to contribute meaningfully to your team from day one.

Throughout my career, I have developed deep expertise in the technologies that are central to this role — particularly ${stack}. I thrive in fast-paced environments and consistently deliver quality work that scales. My passion for the ${industry} space, combined with a systematic engineering approach, positions me uniquely to add immediate, compounding value to your organization.

What draws me most to ${companyName} is your commitment to innovation and technical excellence. I have followed your work closely and am genuinely excited by the engineering challenges this role presents. I am confident that my background aligns strongly with what you are looking for.

I would love the opportunity to discuss how my experience can accelerate your team's goals. Thank you sincerely for your consideration.

Best regards,
Alex Chen
alex@example.com | linkedin.com/in/alexchen | github.com/alexchen`;
}

export function AIGenerationModal({ job, onClose, onGenerate }: AIGenerationModalProps) {
  const [displayText, setDisplayText] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  const jobTitle = job.role.title;
  const companyName = job.company.name;
  const relevantSkill = job.technicalRequirements?.requiredSkills?.[0] || 'software development';
  const stack = job.technicalRequirements?.stack?.join(', ') || 'modern technologies';
  const industry = job.company.industry || 'technology';

  const finalCoverLetter = buildCoverLetter(jobTitle, companyName, relevantSkill, stack, industry);

  useEffect(() => {
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= finalCoverLetter.length) {
        setDisplayText(finalCoverLetter.slice(0, charIndex));
        charIndex++;
      } else {
        setIsGenerating(false);
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [finalCoverLetter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalCoverLetter).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full flex flex-col max-h-[82vh] shadow-3d-lift"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/70">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: isGenerating ? 360 : 0 }}
                transition={{ duration: 1.8, repeat: isGenerating ? Infinity : 0, ease: 'linear' }}
                className="w-8 h-8 rounded-lg bg-[var(--vybz-blue)]/15 flex items-center justify-center"
              >
                <RiFlashlightLine className="w-4 h-4 text-[var(--vybz-blue)]" />
              </motion.div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {isGenerating ? 'Generating Cover Letter…' : 'Cover Letter Ready'}
                </h2>
                <p className="text-xs text-slate-500">{job.company.name} · {job.role.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>

          {/* AI Match score bar */}
          {job.aiInsights?.matchScore && (
            <div className="px-6 py-3 border-b border-slate-700/50 flex items-center gap-3">
              <span className="text-xs text-slate-400">Match Score</span>
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.aiInsights.matchScore}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400 rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-white">{job.aiInsights.matchScore}%</span>
            </div>
          )}

          {/* Streaming Text */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="text-[13px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
              {displayText}
              {isGenerating && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-[2px] h-[14px] bg-[var(--vybz-blue)] ml-0.5 align-middle"
                />
              )}
            </div>
          </div>

          {/* Footer — appears when done */}
          <AnimatePresence>
            {!isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 px-6 py-4 border-t border-slate-700/70"
              >
                <button
                  onClick={handleCopy}
                  className="btn-3d flex items-center gap-2 px-4 py-2 text-sm text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg"
                >
                  <RiFileCopyLine className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={onClose}
                  className="btn-3d px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => { onGenerate?.(finalCoverLetter); onClose(); }}
                  className="btn-3d-primary flex items-center gap-2 px-4 py-2 text-sm ml-auto rounded-lg"
                >
                  <RiDownloadLine className="w-4 h-4" />
                  Export PDF
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
