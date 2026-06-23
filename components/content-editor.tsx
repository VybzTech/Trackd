'use client';

import { motion } from 'framer-motion';
import { Job } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Zap } from 'lucide-react';
import { AIGenerationModal } from './ai-modal';
import { useState } from 'react';

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
  job: Job;
}

export function ContentEditor({
  content,
  onChange,
  job,
}: ContentEditorProps) {
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
          <TabsTrigger value="summary" className="data-[state=active]:bg-slate-600">
            <FileText className="w-4 h-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="tailored" className="data-[state=active]:bg-slate-600">
            <Zap className="w-4 h-4 mr-2" />
            AI Tailored
          </TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
              Professional Summary
            </label>
            <textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              className="input-inset w-full px-4 py-3 text-sm h-48 resize-none font-mono"
              placeholder="Edit your resume content..."
            />
          </div>

          <div className="flex gap-2">
            <button className="btn-3d flex-1">Save Changes</button>
            <button className="btn-3d flex-1">Revert</button>
          </div>
        </TabsContent>

        {/* AI Tailored Tab */}
        <TabsContent value="tailored" className="space-y-4 mt-4">
          <div className="card-3d p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">
                Job Requirements vs Your Resume
              </h3>
              <div className="space-y-2 text-sm">
                {job.technicalRequirements?.keywords?.map((kw, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-[var(--vybz-blue)] rounded-full" />
                    <span className="text-slate-300">{kw}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAIModal(true)}
              className="btn-3d-primary w-full flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Generate Tailored Content
            </button>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Modal */}
      {showAIModal && (
        <AIGenerationModal
          job={job}
          onClose={() => setShowAIModal(false)}
          onGenerate={(coverLetter) => {
            console.log('Generated cover letter:', coverLetter);
            setShowAIModal(false);
          }}
        />
      )}
    </motion.div>
  );
}
