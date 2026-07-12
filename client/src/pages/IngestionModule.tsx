import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'
import { generateMockJob } from '../lib/mockData'

export default function IngestionModule() {
  const [pasteContent, setPasteContent] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedJob, setExtractedJob] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

  const addOpportunity = useAppStore((state) => state.addOpportunity)
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return 'bg-green-500/20 border-green-500/50 text-green-300'
    if (level >= 50) return 'bg-amber-500/20 border-amber-500/50 text-amber-300'
    return 'bg-red-500/20 border-red-500/50 text-red-300'
  }

  const getConfidenceIcon = (level: number) => {
    if (level >= 80) return <FiCheck className="text-green-400" />
    if (level >= 50) return <FiAlertCircle className="text-amber-400" />
    return <FiX className="text-red-400" />
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
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-surface/50 backdrop-blur border-b border-blue-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Ingestion Module</h1>
            <p className="text-slate-400 text-sm">Add new opportunities to your pipeline</p>
          </div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-slate-600/20 hover:bg-slate-600/40 text-white rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Input Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Paste Console */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Smart Paste Console</h2>
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder="Paste entire job posting here..."
                className="w-full h-48 bg-brand-dark border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 font-mono text-sm resize-none"
              />
              <p className="text-slate-500 text-xs mt-2">
                Paste the full job description and we'll extract company, role, compensation, and tech stack
              </p>
            </motion.div>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-4">URL Stream Input</h2>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/job-posting"
                className="w-full bg-brand-dark border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
              <p className="text-slate-500 text-xs mt-2">
                Provide a URL to a job posting and we'll fetch and extract the details
              </p>
            </motion.div>

            {/* Process Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={processInput}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Extract & Analyze'
              )}
            </motion.button>
          </div>

          {/* Extracted Job Panel */}
          <AnimatePresence>
            {showPanel && extractedJob && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="lg:col-span-1 bg-brand-surface/60 backdrop-blur border border-blue-500/20 rounded-lg p-6 h-fit sticky top-24"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                  Extracted Data
                  <button
                    onClick={() => setShowPanel(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </h3>

                <div className="space-y-4">
                  {/* Company */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">COMPANY</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">{extractedJob.company}</p>
                      <div className={`px-2 py-1 rounded border text-xs flex items-center gap-1 ${getConfidenceColor(extractedJob.confidenceScores?.company || 85)}`}>
                        {getConfidenceIcon(extractedJob.confidenceScores?.company || 85)}
                        {extractedJob.confidenceScores?.company || 85}%
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">ROLE</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">{extractedJob.role}</p>
                      <div className={`px-2 py-1 rounded border text-xs flex items-center gap-1 ${getConfidenceColor(extractedJob.confidenceScores?.role || 90)}`}>
                        {getConfidenceIcon(extractedJob.confidenceScores?.role || 90)}
                        {extractedJob.confidenceScores?.role || 90}%
                      </div>
                    </div>
                  </div>

                  {/* Compensation */}
                  {extractedJob.compensation && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">COMPENSATION</p>
                      <p className="text-white font-medium">
                        ${extractedJob.compensation.min}k - ${extractedJob.compensation.max}k {extractedJob.compensation.currency}
                      </p>
                    </div>
                  )}

                  {/* Stack */}
                  {extractedJob.stack && extractedJob.stack.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-2">TECH STACK</p>
                      <div className="flex flex-wrap gap-2">
                        {extractedJob.stack.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Commit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={commitOpportunity}
                    className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCheck size={18} />
                    Commit to Pipeline
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
