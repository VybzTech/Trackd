'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Zap } from 'lucide-react';
import { Job } from '@/types';
import { useState, useEffect } from 'react';

interface AIGenerationModalProps {
  job: Job;
  onClose: () => void;
  onGenerate: (coverLetter: string) => void;
}

const mockCoverLetter = `Dear Hiring Manager,

I am excited to apply for the ${jobTitle} position at ${companyName}. With my extensive experience in ${relevantSkill} and proven track record of delivering high-impact solutions, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have developed deep expertise in the technologies and methodologies critical to this role, particularly in ${stack}. My passion for ${industry} combined with my technical skills positions me uniquely to add immediate value to your organization.

I am particularly drawn to this opportunity because of your company's commitment to innovation and excellence. I am excited about the prospect of collaborating with your talented team and contributing to your mission.

Thank you for considering my application. I look forward to discussing how my skills and experience align with your needs.

Best regards,
Alex Chen`;

export function AIGenerationModal({
  job,
  onClose,
  onGenerate,
}: AIGenerationModalProps) {
  const [displayText, setDisplayText] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const jobTitle = job.role.title;
  const companyName = job.company.name;
  const relevantSkill = job.technicalRequirements?.requiredSkills?.[0] || 'software development';
  const stack = job.technicalRequirements?.stack?.join(', ') || 'modern technologies';
  const industry = job.company.industry || 'technology';

  const finalCoverLetter = mockCoverLetter
    .replace('${jobTitle}', jobTitle)
    .replace('${companyName}', companyName)
    .replace('${relevantSkill}', relevantSkill)
    .replace('${stack}', stack)
    .replace('${industry}', industry);

  // Simulate streaming text generation
  useEffect(() => {
    if (!isGenerating) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= finalCoverLetter.length) {
        setDisplayText(finalCoverLetter.slice(0, charIndex));
        charIndex++;
      } else {
        setIsGenerating(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [isGenerating, finalCoverLetter]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-96 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: isGenerating ? 360 : 0 }}
                transition={{ duration: 2, repeat: isGenerating ? Infinity : 0 }}
              >
                <Zap className="w-5 h-5 text-[var(--vybz-blue)]" />
              </motion.div>
              <h2 className="text-lg font-semibold text-white">
                {isGenerating ? 'Generating Cover Letter...' : 'Cover Letter Generated'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
              {displayText}
              {isGenerating && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-slate-300 ml-1"
                />
              )}
            </div>
          </div>

          {/* Footer */}
          {!isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 p-6 border-t border-slate-700"
            >
              <button
                onClick={onClose}
                className="btn-3d flex-1"
              >
                Close
              </button>
              <button
                onClick={() => onGenerate(finalCoverLetter)}
                className="btn-3d-primary flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
