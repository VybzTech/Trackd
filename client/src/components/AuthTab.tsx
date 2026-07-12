import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/appStore'

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
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-dark to-blue-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-brand-surface/80 backdrop-blur border border-blue-500/20 rounded-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">TRACKD</h1>
            <p className="text-slate-400">Your Command Centre for Job Tracking</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-8 bg-brand-dark/50 p-1 rounded-lg">
            {['Sign In', 'Sign Up'].map((tab, i) => (
              <button
                key={i}
                onClick={() => setIsLogin(i === 0)}
                className={`flex-1 py-2 px-4 rounded font-semibold transition-all ${
                  (isLogin && i === 0) || (!isLogin && i === 1)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-brand-dark border border-blue-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-brand-dark border border-blue-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-blue-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
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
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
