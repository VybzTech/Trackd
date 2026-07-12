import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiArrowLeft, FiUpload, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'

const ROLES = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'DevOps Engineer',
  'Mobile Engineer'
]

export default function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const [profileData, setProfileData] = useState({ title: '', bio: '' })
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const setCurrentView = useAppStore((state) => state.setCurrentView)
  const setUser = useAppStore((state) => state.setUser)
  const user = useAppStore((state) => state.user)

  const handleComplete = async () => {
    setIsLoading(true)
    setTimeout(() => {
      if (user) {
        setUser({
          ...user,
          targetRoles: selectedRoles
        })
      }
      toast.success('Onboarding complete!')
      setCurrentView('ingestion')
      setIsLoading(false)
    }, 1200)
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-dark to-blue-950 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-brand-surface/80 backdrop-blur border border-blue-500/20 rounded-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to TRACKD</h1>
            <p className="text-slate-400">Step {step + 1} of 3 - Let's get you set up</p>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-brand-dark rounded-full mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / 3) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Profile Setup</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      placeholder="e.g., Senior React Developer"
                      className="w-full bg-brand-dark border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Professional Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full bg-brand-dark border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Resume Upload</h2>
                <div className="border-2 border-dashed border-blue-500/30 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500/50 transition-colors">
                  <FiUpload size={48} className="mx-auto mb-4 text-blue-400" />
                  <p className="text-white font-semibold mb-2">Drag your resume here</p>
                  <p className="text-slate-400 text-sm">or click to browse (PDF, DOCX)</p>
                </div>
                <p className="text-slate-500 text-sm mt-4 text-center">
                  We'll extract your experience to match with opportunities
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Target Roles</h2>
                <p className="text-slate-400 mb-6">Select roles you&apos;re interested in:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ROLES.map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedRoles(prev => 
                          prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
                        )
                      }}
                      className={`p-3 rounded-lg border transition-all text-left font-medium ${
                        selectedRoles.includes(role)
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-brand-dark border-blue-500/20 text-slate-300 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{role}</span>
                        {selectedRoles.includes(role) && (
                          <FiCheck size={18} className="text-blue-400" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600/20 hover:bg-slate-600/40 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
            >
              <FiArrowLeft size={18} />
              Previous
            </motion.button>

            <div className="flex-1" />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (step < 2) {
                  setStep(step + 1)
                } else {
                  handleComplete()
                }
              }}
              disabled={isLoading || (step === 2 && selectedRoles.length === 0)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {step === 2 ? 'Complete Setup' : 'Next'}
                  <FiArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
