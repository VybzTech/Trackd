'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingState } from '@/types';
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiUpload2Line,
  RiCheckLine,
  RiPuzzleLine,
  RiPinDistanceLine,
  RiShieldCheckLine,
  RiFlashlightLine,
} from 'react-icons/ri';
import { FaChrome } from 'react-icons/fa';

interface OnboardingWizardProps {
  onComplete?: (state: OnboardingState) => void;
}

const STEP_LABELS = ['Career Details', 'Resume Intake', 'Extension Setup'];

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.32, ease: 'easeOut' } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48, transition: { duration: 0.18 } }),
};

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [state, setState] = useState<OnboardingState>({
    step: 1,
    targetJobTitle: '',
    targetIndustry: '',
    experienceLevel: '',
    resumeText: '',
  });
  const [dir, setDir] = useState(1);
  const [dragging, setDragging] = useState(false);

  function goNext() {
    if (state.step < 3) {
      setDir(1);
      setState((s) => ({ ...s, step: (s.step + 1) as 1 | 2 | 3 }));
    } else {
      onComplete?.(state);
    }
  }

  function goBack() {
    if (state.step > 1) {
      setDir(-1);
      setState((s) => ({ ...s, step: (s.step - 1) as 1 | 2 | 3 }));
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--vybz-blue)]/5 blur-[130px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--vybz-blue)] to-blue-800 flex items-center justify-center shadow-3d-flat">
              <RiFlashlightLine className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold text-white font-heading tracking-tight">Trackd</span>
          </div>
          <p className="text-slate-500 text-sm">Set up your personalised job search engine</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const done = state.step > stepNum;
            const active = state.step === stepNum;
            return (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    done
                      ? 'bg-green-500/15 border border-green-500/30 text-green-400'
                      : active
                      ? 'bg-[var(--vybz-blue)] text-white shadow-3d-flat'
                      : 'bg-slate-800 border border-slate-700/60 text-slate-500'
                  }`}
                >
                  {done ? (
                    <RiCheckLine className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-4 text-center">{stepNum}</span>
                  )}
                  <span>{label}</span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`w-6 h-px transition-colors ${done ? 'bg-green-500/40' : 'bg-slate-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-md shadow-3d-lift">
          <div className="p-7 min-h-[340px] relative">
            <AnimatePresence mode="wait" custom={dir}>
              {/* Step 1: Career Details */}
              {state.step === 1 && (
                <motion.div
                  key="step-1"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5 absolute inset-7"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white font-heading mb-1">Career Details</h2>
                    <p className="text-sm text-slate-500">Help Trackd understand your goals</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">
                        Target Job Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Senior Frontend Engineer"
                        value={state.targetJobTitle}
                        onChange={(e) => setState((s) => ({ ...s, targetJobTitle: e.target.value }))}
                        className="input-inset w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-600 rounded-lg bg-slate-800/60 border border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">
                          Industry
                        </label>
                        <select
                          value={state.targetIndustry}
                          onChange={(e) => setState((s) => ({ ...s, targetIndustry: e.target.value }))}
                          className="input-inset w-full px-4 py-2.5 text-sm text-white bg-slate-800/60 border border-slate-700/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
                        >
                          <option value="">Select…</option>
                          <option value="tech">Tech / Software</option>
                          <option value="fintech">Fintech</option>
                          <option value="ai">AI / ML</option>
                          <option value="design">Design Tools</option>
                          <option value="startup">Startup</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">
                          Experience Level
                        </label>
                        <select
                          value={state.experienceLevel}
                          onChange={(e) => setState((s) => ({ ...s, experienceLevel: e.target.value }))}
                          className="input-inset w-full px-4 py-2.5 text-sm text-white bg-slate-800/60 border border-slate-700/60 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
                        >
                          <option value="">Select…</option>
                          <option value="Entry">Entry (0–2 yrs)</option>
                          <option value="Mid">Mid (3–5 yrs)</option>
                          <option value="Senior">Senior (5+ yrs)</option>
                          <option value="Lead">Lead / Staff</option>
                          <option value="Executive">Executive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Resume Intake */}
              {state.step === 2 && (
                <motion.div
                  key="step-2"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5 absolute inset-7"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white font-heading mb-1">Resume Intake</h2>
                    <p className="text-sm text-slate-500">Paste or drag in your resume text</p>
                  </div>

                  {/* Drag-Drop Zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      const text = e.dataTransfer.getData('text');
                      if (text) setState((s) => ({ ...s, resumeText: text }));
                    }}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
                      dragging
                        ? 'border-[var(--vybz-blue)] bg-[var(--vybz-blue)]/8'
                        : 'border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/30'
                    }`}
                  >
                    <RiUpload2Line className={`w-7 h-7 mx-auto mb-2 transition-colors ${dragging ? 'text-[var(--vybz-blue)]' : 'text-slate-500'}`} />
                    <p className="text-sm text-slate-400">Drag & drop your resume file here</p>
                    <p className="text-xs text-slate-600 mt-1">PDF · DOC · TXT</p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700/50" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-slate-900/80 text-[11px] text-slate-600 uppercase tracking-widest">or paste</span>
                    </div>
                  </div>

                  <textarea
                    placeholder="Paste your resume text here…"
                    value={state.resumeText}
                    onChange={(e) => setState((s) => ({ ...s, resumeText: e.target.value }))}
                    className="input-inset w-full px-4 py-3 text-sm text-white placeholder:text-slate-600 rounded-lg bg-slate-800/60 border border-slate-700/60 h-36 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all font-mono"
                  />
                </motion.div>
              )}

              {/* Step 3: Extension Calibration */}
              {state.step === 3 && (
                <motion.div
                  key="step-3"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5 absolute inset-7"
                >
                  <div>
                    <h2 className="text-lg font-bold text-white font-heading mb-1">Extension Setup</h2>
                    <p className="text-sm text-slate-500">Activate one-click job capture from any site</p>
                  </div>

                  {/* Chrome Web Store Card */}
                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 shadow-3d-flat">
                    <div className="flex items-start gap-4">
                      {/* Extension Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--vybz-blue)] to-blue-800 flex items-center justify-center flex-shrink-0 shadow-3d-flat">
                        <RiPuzzleLine className="w-7 h-7 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-white">Trackd Extension</h3>
                          <span className="text-[10px] font-semibold px-2 py-0.5 bg-green-500/15 border border-green-500/25 text-green-400 rounded-full">
                            Free
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">
                          Scrapes job data from LinkedIn, Indeed, and more. Push directly to your Trackd inbox in one click.
                        </p>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-sm bg-amber-400" />
                          ))}
                          <span className="text-[10px] text-slate-500 ml-1">4.9 · 2,400 users</span>
                        </div>

                        <button className="btn-3d-primary flex items-center gap-2 px-4 py-2 text-xs rounded-lg">
                          <FaChrome className="w-3.5 h-3.5" />
                          Add to Chrome — It&apos;s Free
                        </button>
                      </div>
                    </div>

                    {/* Instruction row */}
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-2">
                      {[
                        { Icon: RiPuzzleLine, text: 'Click "Add to Chrome" above to install from the Web Store' },
                        { Icon: RiPinDistanceLine, text: 'Pin the Trackd icon to your toolbar for instant access' },
                        { Icon: RiShieldCheckLine, text: 'Browse any job board — click the icon to capture & send to inbox' },
                      ].map(({ Icon, text }, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-md bg-[var(--vybz-blue)]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-3 h-3 text-[var(--vybz-blue)]" />
                          </div>
                          <p className="text-[12px] text-slate-400 leading-snug">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 text-center">
                    You can also add jobs manually later — skip this step if you prefer.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Nav */}
          <div className="flex items-center justify-between px-7 py-4 border-t border-slate-700/60 bg-slate-900/40">
            {state.step > 1 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <RiArrowLeftLine className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={goNext}
              className="btn-3d-primary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl"
            >
              {state.step === 3 ? (
                <>
                  <RiCheckLine className="w-4 h-4" />
                  Finish Setup
                </>
              ) : (
                <>
                  Continue
                  <RiArrowRightLine className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
