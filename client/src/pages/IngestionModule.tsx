import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'
import { generateMockJob } from '../lib/mockData'
import { confidenceColor } from '../lib/statusTokens'
import { GlassCard, Button } from '../components/ui'
import { PageHeader } from '../components/layout/PageHeader'

export default function IngestionModule() {
  const [pasteContent, setPasteContent] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedJob, setExtractedJob] = useState<any>(null)
  const [showPanel, setShowPanel] = useState(false)

  const addOpportunity = useAppStore((state) => state.addOpportunity)
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  const getConfidenceIcon = (level: number) => {
    if (level >= 80) return <FiCheck />
    if (level >= 50) return <FiAlertCircle />
    return <FiX />
  }

  const ConfidencePill = ({ level }: { level: number }) => {
    const color = confidenceColor(level)
    return (
      <div
        className="px-2 py-1 rounded-full text-xs flex items-center gap-1"
        style={{ backgroundColor: `${color}26`, border: `1px solid ${color}4d`, color }}
      >
        {getConfidenceIcon(level)}
        {level}%
      </div>
    )
  }

  const processInput = async () => {
    if (!pasteContent && !urlInput) {
      toast.error('Please provide a job posting or URL')
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      const mockJob = generateMockJob()
      setExtractedJob(mockJob)
      setShowPanel(true)
      toast.success('Job extracted successfully!')
      setIsProcessing(false)
    }, 1200)
  }

  const commitOpportunity = () => {
    if (extractedJob) {
      addOpportunity(extractedJob)
      toast.success('Opportunity added to pipeline!')
      setShowPanel(false)
      setExtractedJob(null)
      setPasteContent('')
      setUrlInput('')
    }
  }

  return (
    <div>
      <PageHeader
        title="Ingestion Module"
        subtitle="Add new opportunities to your pipeline"
        right={
          <Button variant="secondary" size="sm" onClick={() => setCurrentView('dashboard')}>
            Go to Dashboard
          </Button>
        }
      />

      <div className="px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Paste Console */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard>
                <h2 className="font-display text-lg font-semibold text-white mb-4">Smart Paste Console</h2>
                <textarea
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  placeholder="Paste entire job posting here..."
                  className="w-full h-48 glass-surface rounded-xl px-4 py-3 text-white placeholder:text-[var(--text-tint-2)] focus:outline-none focus:ring-2 focus:ring-[var(--glow-top)]/40 font-mono text-sm resize-none"
                />
                <p className="text-xs mt-2" style={{ color: 'var(--text-tint-2)' }}>
                  Paste the full job description and we'll extract company, role, compensation, and tech stack
                </p>
              </GlassCard>
            </motion.div>

            {/* URL Input */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard>
                <h2 className="font-display text-lg font-semibold text-white mb-4">URL Stream Input</h2>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/job-posting"
                  className="w-full h-10 glass-surface rounded-xl px-4 text-white placeholder:text-[var(--text-tint-2)] focus:outline-none focus:ring-2 focus:ring-[var(--glow-top)]/40"
                />
                <p className="text-xs mt-2" style={{ color: 'var(--text-tint-2)' }}>
                  Provide a URL to a job posting and we'll fetch and extract the details
                </p>
              </GlassCard>
            </motion.div>

            {/* Process Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={processInput}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Extract & Analyze'
              )}
            </Button>
          </div>

          {/* Extracted Job Panel */}
          <AnimatePresence>
            {showPanel && extractedJob && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="lg:col-span-1 h-fit sticky top-6"
              >
                <GlassCard>
                  <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center justify-between">
                    Extracted Data
                    <button
                      onClick={() => setShowPanel(false)}
                      className="transition-colors hover:text-white"
                      style={{ color: 'var(--text-tint-2)' }}
                    >
                      <FiX size={20} />
                    </button>
                  </h3>

                  <div className="space-y-4">
                    {/* Company */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tint-2)' }}>Company</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{extractedJob.company}</p>
                        <ConfidencePill level={extractedJob.confidenceScores?.company || 85} />
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tint-2)' }}>Role</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{extractedJob.role}</p>
                        <ConfidencePill level={extractedJob.confidenceScores?.role || 90} />
                      </div>
                    </div>

                    {/* Compensation */}
                    {extractedJob.compensation && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tint-2)' }}>Compensation</p>
                        <p className="text-white font-mono font-medium">
                          ${extractedJob.compensation.min}k - ${extractedJob.compensation.max}k {extractedJob.compensation.currency}
                        </p>
                      </div>
                    )}

                    {/* Stack */}
                    {extractedJob.stack && extractedJob.stack.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tint-2)' }}>Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {extractedJob.stack.map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ backgroundColor: 'rgba(82,232,255,0.12)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Commit Button */}
                    <Button variant="primary" onClick={commitOpportunity} className="w-full mt-2" style={{ background: 'var(--status-offer)' }}>
                      <FiCheck size={18} />
                      Commit to Pipeline
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
