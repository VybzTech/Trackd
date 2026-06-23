'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ApplyCanvas } from '@/components/apply-canvas';
import { ContentEditor } from '@/components/content-editor';
import { mockJobs } from '@/lib/mock-data';
import { mockResume } from '@/lib/mock-data';
import { Download, Zap } from 'lucide-react';

interface ApplyPageProps {
  params: {
    jobId: string;
  };
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const job = mockJobs.find((j) => j.id === params.jobId) || mockJobs[0];
  const [resumeContent, setResumeContent] = useState(mockResume);
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  return (
    <div className="space-y-6 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white font-heading">{job.role.title}</h1>
          <p className="text-slate-400 mt-1">{job.company.name}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-3d flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Resume
          </button>
          <button
            onClick={() => setShowCoverLetter(!showCoverLetter)}
            className="btn-3d-primary flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Generate Cover Letter
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        {/* Left: Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden flex flex-col"
        >
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
            Resume Preview
          </h2>
          <div className="flex-1 overflow-auto">
            <ApplyCanvas resumeContent={resumeContent} />
          </div>
        </motion.div>

        {/* Right: Content Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="overflow-hidden flex flex-col"
        >
          <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
            Edit Content
          </h2>
          <div className="flex-1 overflow-auto">
            <ContentEditor
              content={resumeContent}
              onChange={setResumeContent}
              job={job}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
