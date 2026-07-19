// React import not required with the react-jsx transform
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { GlassCard, Button } from '../components/ui'
import AuthTab from '../components/AuthTab'
import OnboardingWizard from '../components/OnboardingWizard'

interface LandingProps {
  showAuth?: boolean
  showOnboarding?: boolean
}

const FEATURES = [
  { title: 'Multi-View Dashboard', desc: 'Kanban, Table, Calendar layouts' },
  { title: 'AI-Powered Matching', desc: 'Match scores & ATS keyword analysis' },
  { title: 'Smart Ingestion', desc: 'Paste URLs or job postings instantly' },
]

export default function Landing({ showAuth = false, showOnboarding = false }: LandingProps) {
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  if (showOnboarding) {
    return <OnboardingWizard />
  }

  if (showAuth) {
    return <AuthTab />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-display text-6xl font-bold mb-6 text-white">
          Track Your Path to{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--glow-mid), var(--glow-top))' }}
          >
            Your Dream Role
          </span>
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-tint-1)' }}>
          TRACKD empowers you to monitor, analyze, and optimize your job application pipeline with AI-powered insights and professional-grade analytics.
        </p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard className="text-left h-full">
                <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p style={{ color: 'var(--text-tint-2)' }}>{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="primary" size="lg" onClick={() => setCurrentView('auth')} className="mx-auto shadow-xl">
          Launch Command Centre
          <FiArrowRight />
        </Button>
      </motion.div>

      {/* Dashboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-24"
      >
        <GlassCard padded={false} className="p-8 aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <p style={{ color: 'var(--text-tint-1)' }}>Dashboard Preview</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-tint-2)' }}>Multi-view job tracking interface</p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
