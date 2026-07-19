import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { MOCK_RESUME, MOCK_COVER_LETTER_TEMPLATES } from '../lib/mockData'
import { GlassCard, Button, MatchScoreGauge, IconChip } from '../components/ui'

export default function ProPage() {
  const { selectedOpportunity, setCurrentView, setSelectedOpportunity } = useAppStore()
  const [coverLetterStyle, setCoverLetterStyle] = useState<'professional' | 'confident' | 'conversational'>('professional')

  if (!selectedOpportunity) {
    return (
      <div className="app-shell flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mb-4" style={{ color: 'var(--text-tint-2)' }}>No opportunity selected</p>
          <Button variant="primary" onClick={() => setCurrentView('dashboard')}>
            Back to Dashboard
          </Button>
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
    <div>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4">
        <IconChip icon={<FiArrowLeft size={20} />} onClick={handleBack} aria-label="Back" />
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">{selectedOpportunity.role}</h1>
          <p style={{ color: 'var(--text-tint-2)' }}>{selectedOpportunity.company}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Pane: Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl h-fit overflow-y-auto max-h-96"
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
            {/* Match Score Gauge */}
            <GlassCard className="flex flex-col items-center py-8">
              <h3 className="font-display text-lg font-semibold text-white mb-6 text-center">Match Score</h3>
              <MatchScoreGauge score={selectedOpportunity.matchScore || 0} size="lg" />
              <p className="text-center text-sm mt-4" style={{ color: 'var(--text-tint-2)' }}>
                Your profile aligns well with this opportunity
              </p>
            </GlassCard>

            {/* ATS Keywords Analysis */}
            <GlassCard>
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiCheck size={20} style={{ color: 'var(--accent-info)' }} />
                ATS Keyword Analysis
              </h3>
              <div className="space-y-2">
                {selectedOpportunity.atsKeywords?.map((keyword, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl glass-surface"
                  >
                    <FiCheck size={18} style={{ color: 'var(--status-offer)' }} className="flex-shrink-0" />
                    <span className="text-white font-medium">{keyword}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: 'var(--text-tint-2)' }}>
                Keywords in your resume that match the job posting
              </p>
            </GlassCard>

            {/* Bullet Suggestions */}
            <GlassCard>
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiAlertCircle size={20} style={{ color: 'var(--status-interviewing)' }} />
                Suggested Resume Bullets
              </h3>
              <div className="space-y-2">
                {[
                  'Led redesign of core product increasing user engagement by 35%',
                  'Implemented automated testing framework reducing bugs by 60%',
                  'Mentored junior engineers and conducted code reviews',
                ].map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-xl glass-surface hover:-translate-y-0.5 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold mt-1" style={{ color: 'var(--status-interviewing)' }}>•</span>
                      <div className="flex-1">
                        <p className="text-sm" style={{ color: 'var(--text-tint-1)' }}>{bullet}</p>
                        <button
                          className="text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--status-interviewing)' }}
                        >
                          Accept Snippet
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Cover Letter Generator */}
            <GlassCard>
              <h3 className="font-display text-lg font-semibold text-white mb-4">Cover Letter Generator</h3>

              {/* Style Selector */}
              <div className="flex gap-2 mb-4">
                {(['professional', 'confident', 'conversational'] as const).map((style) => (
                  <motion.button
                    key={style}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCoverLetterStyle(style)}
                    className="px-3 py-2 rounded-xl font-display font-medium text-sm transition-all capitalize"
                    style={
                      coverLetterStyle === style
                        ? { background: 'var(--brand-primary)', color: '#fff' }
                        : { color: 'var(--text-tint-2)' }
                    }
                  >
                    {style}
                  </motion.button>
                ))}
              </div>

              {/* Generated Cover Letter */}
              <div className="rounded-xl p-4 max-h-48 overflow-y-auto glass-surface">
                <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-tint-1)' }}>
                  {getCoverLetter()}
                </p>
              </div>

              <Button variant="primary" className="w-full mt-4">
                Copy to Clipboard
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
