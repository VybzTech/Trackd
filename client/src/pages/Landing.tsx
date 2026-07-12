import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import AuthTab from '../components/AuthTab'
import OnboardingWizard from '../components/OnboardingWizard'

interface LandingProps {
  showAuth?: boolean
  showOnboarding?: boolean
}

export default function Landing({ showAuth = false, showOnboarding = false }: LandingProps) {
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  if (showOnboarding) {
    return <OnboardingWizard />
  }

  if (showAuth) {
    return <AuthTab />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-dark to-blue-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 text-white">
            Track Your Path to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Your Dream Role
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            TRACKD empowers you to monitor, analyze, and optimize your job application pipeline with AI-powered insights and professional-grade analytics.
          </p>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Multi-View Dashboard', desc: 'Kanban, Table, Calendar layouts' },
              { title: 'AI-Powered Matching', desc: 'Match scores & ATS keyword analysis' },
              { title: 'Smart Ingestion', desc: 'Paste URLs or job postings instantly' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('auth')}
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch Command Centre
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl"
        >
          <div className="bg-brand-surface/60 backdrop-blur p-8 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-slate-300">Dashboard Preview</p>
              <p className="text-sm text-slate-500 mt-2">Multi-view job tracking interface</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
