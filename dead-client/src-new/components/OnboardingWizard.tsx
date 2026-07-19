import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiArrowLeft, FiUpload, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'
import { GlassCard, Button, Input } from './ui'

const ROLES = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full Stack Engineer',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'DevOps Engineer',
  'Mobile Engineer',
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
          targetRoles: selectedRoles,
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
    exit: { opacity: 0, x: -100 },
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
        <GlassCard className="p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome to TRACKD</h1>
            <p style={{ color: 'var(--text-tint-2)' }}>Step {step + 1} of 3 — Let's get you set up</p>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full mt-4 overflow-hidden glass-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / 3) * 100}%` }}
                className="h-full"
                style={{ background: 'linear-gradient(90deg, var(--brand-primary), var(--glow-top))' }}
              />
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="font-display text-xl font-semibold text-white mb-6">Profile Setup</h2>
                <div className="space-y-4">
                  <Input
                    label="Job Title"
                    type="text"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    placeholder="e.g., Senior React Developer"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tint-2)' }}>
                      Professional Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full glass-surface rounded-xl px-4 py-3 text-white placeholder:text-[var(--text-tint-2)] focus:outline-none focus:ring-2 focus:ring-[var(--glow-top)]/40 resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step-1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="font-display text-xl font-semibold text-white mb-6">Resume Upload</h2>
                <div
                  className="rounded-2xl p-12 text-center cursor-pointer transition-colors glass-surface"
                  style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: 'var(--border-glass)' }}
                >
                  <FiUpload size={48} className="mx-auto mb-4" style={{ color: 'var(--glow-top)' }} />
                  <p className="text-white font-semibold mb-2">Drag your resume here</p>
                  <p className="text-sm" style={{ color: 'var(--text-tint-2)' }}>or click to browse (PDF, DOCX)</p>
                </div>
                <p className="text-sm mt-4 text-center" style={{ color: 'var(--text-tint-2)' }}>
                  We'll extract your experience to match with opportunities
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}>
                <h2 className="font-display text-xl font-semibold text-white mb-6">Target Roles</h2>
                <p className="mb-6" style={{ color: 'var(--text-tint-2)' }}>Select roles you&apos;re interested in:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ROLES.map((role) => {
                    const selected = selectedRoles.includes(role)
                    return (
                      <motion.button
                        key={role}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedRoles((prev) =>
                            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
                          )
                        }}
                        className="p-3 rounded-xl transition-all text-left font-medium glass-surface"
                        style={{
                          borderColor: selected ? 'var(--glow-top)' : 'var(--border-glass)',
                          color: selected ? '#fff' : 'var(--text-tint-1)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{role}</span>
                          {selected && <FiCheck size={18} style={{ color: 'var(--glow-top)' }} />}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4 mt-12">
            <Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <FiArrowLeft size={18} />
              Previous
            </Button>

            <div className="flex-1" />

            <Button
              variant="primary"
              onClick={() => {
                if (step < 2) {
                  setStep(step + 1)
                } else {
                  handleComplete()
                }
              }}
              disabled={isLoading || (step === 2 && selectedRoles.length === 0)}
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
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
