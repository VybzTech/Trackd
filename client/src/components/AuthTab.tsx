import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'
import { GlassCard, Button, Input } from './ui'

export default function AuthTab() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setCurrentView = useAppStore((state) => state.setCurrentView)
  const setUser = useAppStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate auth delay
    setTimeout(() => {
      if (isLogin) {
        if (email && password) {
          setUser({ name: email.split('@')[0], email })
          toast.success('Logged in successfully!')
          setCurrentView('dashboard')
        } else {
          toast.error('Please fill in all fields')
        }
      } else {
        if (name && email && password) {
          setUser({ name, email })
          toast.success('Account created! Redirecting to onboarding...')
          setCurrentView('onboarding')
        } else {
          toast.error('Please fill in all fields')
        }
      }
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-white mb-2">TRACKD</h1>
            <p style={{ color: 'var(--text-tint-2)' }}>Your Command Centre for Job Tracking</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-8 glass-surface p-1 rounded-xl">
            {['Sign In', 'Sign Up'].map((tab, i) => (
              <button
                key={i}
                onClick={() => setIsLogin(i === 0)}
                className="flex-1 py-2 px-4 rounded-lg font-display font-semibold transition-all"
                style={
                  (isLogin && i === 0) || (!isLogin && i === 1)
                    ? { background: 'var(--brand-primary)', color: '#fff' }
                    : { color: 'var(--text-tint-2)' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Input
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </motion.div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<FiMail size={16} />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<FiLock size={16} />}
            />

            <Button variant="primary" size="lg" disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <FiArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-tint-2)' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold"
              style={{ color: 'var(--glow-top)' }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  )
}
