'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApplyCanvas } from '@/components/apply-canvas';
import { ContentEditor } from '@/components/content-editor';
import { mockJobs, mockResume } from '@/lib/mock-data';
import {
  RiDownloadLine,
  RiFlashlightLine,
  RiFileTextLine,
  RiFilePdfLine,
  RiFileWordLine,
  RiArrowLeftLine,
  RiCheckLine,
} from 'react-icons/ri';
import Link from 'next/link';

interface ApplyPageProps {
  params: Promise<{ jobId: string }>;
}

const COVER_LETTER_LINES = [
  'Dear Hiring Manager,',
  '',
  "I am excited to apply for this position. With my background in building scalable applications and a deep passion for crafting excellent user experiences, I am confident that I will make an immediate and meaningful contribution to your team.",
  '',
  "My experience aligns directly with the technical requirements outlined in the job description. I have spent the last several years working with the exact stack mentioned — delivering products that serve thousands of users with high reliability and performance.",
  '',
  "What excites me most about this opportunity is the chance to work on challenging engineering problems with a world-class team. I am particularly drawn to your company's culture of excellence and the impact your products have on real people.",
  '',
  "I look forward to the opportunity to discuss how my skills and enthusiasm align with your needs. Thank you sincerely for considering my application.",
  '',
  'Best regards,',
  'Alex Chen',
];

export default function ApplyPage({ params }: ApplyPageProps) {
  const { jobId } = use(params);
  const job = mockJobs.find((j) => j.id === jobId) ?? mockJobs[0];
  const [resumeContent, setResumeContent] = useState(mockResume);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLines, setGeneratedLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [exportState, setExportState] = useState<Record<string, 'idle' | 'loading' | 'done'>>({
    'Resume PDF': 'idle', 'Resume DOCX': 'idle', 'Cover PDF': 'idle', 'Cover DOCX': 'idle',
  });

  function handleGenerate() {
    setIsGenerating(true);
    setGeneratedLines([]);
    setIsDone(false);

    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < COVER_LETTER_LINES.length) {
        setGeneratedLines((prev) => [...prev, COVER_LETTER_LINES[lineIdx]]);
        lineIdx++;
      } else {
        setIsGenerating(false);
        setIsDone(true);
        clearInterval(interval);
      }
    }, 160);
  }

  function handleExport(key: string) {
    setExportState((s) => ({ ...s, [key]: 'loading' }));
    setTimeout(() => {
      setExportState((s) => ({ ...s, [key]: 'done' }));
      setTimeout(() => setExportState((s) => ({ ...s, [key]: 'idle' })), 2500);
    }, 1200);
  }

  const ExportBtn = ({
    label,
    icon: Icon,
    exportKey,
  }: {
    label: string;
    icon: React.ElementType;
    exportKey: string;
  }) => {
    const state = exportState[exportKey];
    return (
      <button
        onClick={() => handleExport(exportKey)}
        className="btn-3d flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/60 rounded-lg transition-all"
        disabled={state === 'loading'}
      >
        {state === 'done' ? (
          <RiCheckLine className="w-4 h-4 text-green-400" />
        ) : state === 'loading' ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full"
          />
        ) : (
          <Icon className="w-4 h-4" />
        )}
        {state === 'done' ? 'Downloaded!' : label}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <RiArrowLeftLine className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white font-heading leading-tight">{job.role.title}</h1>
            <p className="text-sm text-slate-500">{job.company.name} · Apply Workspace</p>
          </div>
        </div>

        {/* Download Group */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 border border-slate-700/60 rounded-lg shadow-3d-flat">
            <span className="text-[10px] font-semibold text-slate-500 px-2 uppercase tracking-wide">Resume</span>
            <ExportBtn label="PDF" icon={RiFilePdfLine} exportKey="Resume PDF" />
            <ExportBtn label="DOCX" icon={RiFileWordLine} exportKey="Resume DOCX" />
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 border border-slate-700/60 rounded-lg shadow-3d-flat">
            <span className="text-[10px] font-semibold text-slate-500 px-2 uppercase tracking-wide">Cover</span>
            <ExportBtn label="PDF" icon={RiFilePdfLine} exportKey="Cover PDF" />
            <ExportBtn label="DOCX" icon={RiFileWordLine} exportKey="Cover DOCX" />
          </div>
        </div>
      </motion.div>

      {/* Split Canvas + Editor */}
      <div className="grid grid-cols-2 gap-5 flex-1 min-h-0 overflow-hidden">
        {/* Left: Resume Preview Canvas */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col min-h-0"
        >
          <div className="flex items-center gap-2 mb-3 flex-shrink-0">
            <RiFileTextLine className="w-4 h-4 text-slate-500" />
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live Preview</h2>
          </div>
          <div className="flex-1 overflow-auto rounded-xl border border-slate-700/50 shadow-3d-flat">
            <ApplyCanvas resumeContent={resumeContent} />
          </div>
        </motion.div>

        {/* Right: Content Controls */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col min-h-0"
        >
          <div className="flex items-center gap-2 mb-3 flex-shrink-0">
            <RiFlashlightLine className="w-4 h-4 text-[var(--vybz-blue)]" />
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Content Controls</h2>
          </div>
          <div className="flex-1 overflow-auto">
            <ContentEditor content={resumeContent} onChange={setResumeContent} job={job} />
          </div>
        </motion.div>
      </div>

      {/* AI Generation Zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-shrink-0 card-3d border border-[var(--vybz-blue)]/20 bg-[var(--vybz-blue)]/4 space-y-4"
      >
        {/* Zone Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--vybz-blue)]/15 flex items-center justify-center">
              <RiFlashlightLine className="w-4 h-4 text-[var(--vybz-blue)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Generation Zone</h3>
              <p className="text-xs text-slate-500">ATS-optimised cover letter · tailored to this role</p>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-3d-primary flex items-center gap-2 px-4 py-2 text-sm rounded-lg disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                />
                Generating…
              </>
            ) : (
              <>
                <RiFlashlightLine className="w-4 h-4" />
                {isDone ? 'Regenerate' : 'Generate Cover Letter'}
              </>
            )}
          </button>
        </div>

        {/* Streaming Output */}
        <AnimatePresence>
          {(isGenerating || isDone) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/50 border border-slate-700/60 rounded-lg p-4 font-mono text-[12px] text-slate-300 leading-relaxed min-h-[80px] max-h-[220px] overflow-y-auto">
                {generatedLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={line === '' ? 'h-3' : ''}
                  >
                    {line}
                  </motion.p>
                ))}
                {isGenerating && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity }}
                    className="inline-block w-[2px] h-[12px] bg-[var(--vybz-blue)] ml-0.5 align-middle"
                  />
                )}
              </div>

              {/* Export Row */}
              {isDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mt-3"
                >
                  <span className="text-xs text-slate-500 mr-1">Export cover letter:</span>
                  <ExportBtn label="PDF" icon={RiFilePdfLine} exportKey="Cover PDF" />
                  <ExportBtn label="DOCX" icon={RiFileWordLine} exportKey="Cover DOCX" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
