import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { MOCK_RESUME, MOCK_COVER_LETTER_TEMPLATES } from '../lib/mockData'

export default function ProPage() {
  const { selectedOpportunity, setCurrentView, setSelectedOpportunity } = useAppStore()
  const [coverLetterStyle, setCoverLetterStyle] = useState<'professional' | 'confident' | 'conversational'>('professional')

  if (!selectedOpportunity) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No opportunity selected</p>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleBack = () => {
    setSelectedOpportunity(null)
    setCurrentView('dashboard')
  }

  const getCoverLetter = () => {
    const template = MOCK_COVER_LETTER_TEMPLATES[coverLetterStyle]
    return template
      .replace('{company}', selectedOpportunity.company)
      .replace('{role}', selectedOpportunity.role)
      .replace('{years}', '5')
      .replace('{stack}', selectedOpportunity.stack?.join(', ') || 'relevant technologies')
      .replace('{mission}', 'innovation and excellence')
      .replace('{achievement1}', 'a high-impact feature')
      .replace('{achievement2}', 'a team of engineers')
      .replace('{achievement3}', 'system performance by 40%')
      .replace('{learning}', 'software engineering best practices')
      .replace('{domain}', 'web development')
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-surface/50 backdrop-blur border-b border-blue-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 bg-brand-surface/40 border border-blue-500/20 rounded-lg text-white hover:border-blue-500/50 transition-colors"
            >
              <FiArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedOpportunity.role}</h1>
              <p className="text-slate-400">{selectedOpportunity.company}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Pane: Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-gray-900 rounded-lg p-8 shadow-xl h-fit overflow-y-auto max-h-96"
          >
            <div className="space-y-4 text-sm leading-relaxed whitespace-pre-line font-mono">
              {MOCK_RESUME}
            </div>
          </motion.div>

          {/* Right Pane: AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Match Score Circular Gauge */}
            <div className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">Match Score</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(selectedOpportunity.matchScore || 0) * 2.83} 283`}
                      animate={{ strokeDasharray: [`0 283`, `${(selectedOpportunity.matchScore || 0) * 2.83} 283`] }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-white">{selectedOpportunity.matchScore}%</p>
                      <p className="text-slate-400 text-sm">Match</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">
                Your profile aligns well with this opportunity
              </p>
            </div>

            {/* ATS Keywords Analysis */}
            <div className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiCheck size={20} className="text-cyan-400" />
                ATS Keyword Analysis
              </h3>
              <div className="space-y-2">
                {selectedOpportunity.atsKeywords?.map((keyword, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-brand-dark/50 rounded border border-cyan-500/20"
                  >
                    <FiCheck size={18} className="text-green-400 flex-shrink-0" />
                    <span className="text-white font-medium">{keyword}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-4">
                Keywords in your resume that match the job posting
              </p>
            </div>

            {/* Bullet Suggestions */}
            <div className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiAlertCircle size={20} className="text-amber-400" />
                Suggested Resume Bullets
              </h3>
              <div className="space-y-2">
                {[
                  'Led redesign of core product increasing user engagement by 35%',
                  'Implemented automated testing framework reducing bugs by 60%',
                  'Mentored junior engineers and conducted code reviews'
                ].map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 bg-brand-dark/50 rounded border border-amber-500/20 hover:border-amber-500/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-amber-400 text-sm font-semibold mt-1">•</span>
                      <div className="flex-1">
                        <p className="text-slate-300 text-sm">{bullet}</p>
                        <button className="text-amber-400 text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Accept Snippet
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cover Letter Generator */}
            <div className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cover Letter Generator</h3>
              
              {/* Style Selector */}
              <div className="flex gap-2 mb-4">
                {(['professional', 'confident', 'conversational'] as const).map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCoverLetterStyle(style)}
                    className={`px-3 py-2 rounded font-medium text-sm transition-all capitalize ${
                      coverLetterStyle === style
                        ? 'bg-blue-600 text-white'
                        : 'bg-brand-dark border border-blue-500/20 text-slate-300 hover:border-blue-500/50'
                    }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>

              {/* Generated Cover Letter */}
              <div className="bg-brand-dark/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {getCoverLetter()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Copy to Clipboard
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
