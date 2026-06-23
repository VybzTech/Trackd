'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Upload, Zap } from 'lucide-react';
import { OnboardingState } from '@/types';

interface OnboardingWizardProps {
  onComplete?: (state: OnboardingState) => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [state, setState] = useState<OnboardingState>({
    step: 1,
    targetJobTitle: '',
    targetIndustry: '',
    experienceLevel: '',
    resumeText: '',
  });

  const handleNext = () => {
    if (state.step < 3) {
      setState((prev) => ({ ...prev, step: (prev.step + 1) as 1 | 2 | 3 }));
    } else {
      onComplete?.(state);
    }
  };

  const handleBack = () => {
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: (prev.step - 1) as 1 | 2 | 3 }));
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-2 font-heading">Trackd</h1>
          <p className="text-slate-400 text-lg">Get started with your job tracking journey</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12 justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full transition-all ${
                state.step >= i
                  ? 'bg-[var(--vybz-blue)] w-8'
                  : 'bg-slate-600 w-2'
              }`}
              animate={{ width: state.step >= i ? 32 : 8 }}
            />
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {/* Step 1: Career Details */}
            {state.step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    What&apos;s your target job title?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Frontend Engineer"
                    value={state.targetJobTitle}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        targetJobTitle: e.target.value,
                      }))
                    }
                    className="input-inset w-full px-4 py-3 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Preferred industry?
                  </label>
                  <select
                    value={state.targetIndustry}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        targetIndustry: e.target.value,
                      }))
                    }
                    className="input-inset w-full px-4 py-3 text-white bg-slate-700/50"
                  >
                    <option value="">Select an industry...</option>
                    <option value="tech">Tech</option>
                    <option value="fintech">Fintech</option>
                    <option value="ai">AI/ML</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Experience level
                  </label>
                  <select
                    value={state.experienceLevel}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        experienceLevel: e.target.value,
                      }))
                    }
                    className="input-inset w-full px-4 py-3 text-white bg-slate-700/50"
                  >
                    <option value="">Select level...</option>
                    <option value="Entry">Entry Level (0-2 years)</option>
                    <option value="Mid">Mid Level (3-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                    <option value="Lead">Lead (7+ years)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Resume Upload */}
            {state.step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    Upload or paste your resume
                  </label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-[var(--vybz-blue)] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-300">
                        Drag and drop your resume, or click to select
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC, or TXT</p>
                    </div>

                    <textarea
                      placeholder="Or paste your resume text here..."
                      value={state.resumeText}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          resumeText: e.target.value,
                        }))
                      }
                      className="input-inset w-full px-4 py-3 text-white placeholder:text-slate-500 h-48 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Extension Setup */}
            {state.step === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center py-6">
                  <Zap className="w-12 h-12 text-[var(--vybz-blue)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Extension Ready!
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Install the Trackd browser extension to automatically track jobs as you browse.
                  </p>
                </div>

                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Trackd Extension</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Available on Chrome Web Store
                      </p>
                      <button className="mt-3 inline-flex items-center gap-2 text-[var(--vybz-blue)] hover:text-[var(--vybz-blue-dark)] font-semibold text-sm">
                        Add to Chrome
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          {state.step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="btn-3d-primary flex items-center gap-2"
          >
            {state.step === 3 ? 'Complete' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
