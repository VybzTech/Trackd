'use client';

import { motion } from 'framer-motion';

interface ApplyCanvasProps {
  resumeContent: string;
}

export function ApplyCanvas({ resumeContent }: ApplyCanvasProps) {
  // Parse resume content into sections for display
  const sections = resumeContent.split('\n\n').filter((s) => s.trim());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-3d !bg-white !text-slate-900 p-8 max-w-2xl mx-auto shadow-2xl"
    >
      <div className="space-y-6 text-sm">
        {sections.map((section, idx) => {
          const lines = section.split('\n');
          const isHeading = lines[0].match(/^[A-Z\s&]+$/);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={isHeading ? 'space-y-2' : ''}
            >
              {isHeading ? (
                <>
                  <h2 className="text-lg font-bold uppercase tracking-wide border-b border-slate-300 pb-2">
                    {lines[0]}
                  </h2>
                  <div className="space-y-1 text-xs leading-relaxed">
                    {lines.slice(1).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs leading-relaxed whitespace-pre-wrap">
                  {section}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
