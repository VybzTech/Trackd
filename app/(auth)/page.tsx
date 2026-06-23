'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { RiArrowRightLine, RiEyeLine, RiEyeOffLine, RiRocketLine } from 'react-icons/ri';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exiting, setExiting] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setExiting(true);
    setTimeout(() => router.push('/welcome'), 600);
  }

  function handleGoogle() {
    setExiting(true);
    setTimeout(() => router.push('/welcome'), 600);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--vybz-blue)]/6 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/8 blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {!exiting && (
          <motion.div
            key="login"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-sm relative z-10"
          >
            {/* Logo Mark */}
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--vybz-blue)] to-blue-800 flex items-center justify-center mb-4 shadow-3d-lift">
                <RiRocketLine className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white font-heading tracking-tight">Trackd</h1>
              <p className="text-slate-500 text-sm mt-1.5">AI-powered job search command centre</p>
            </motion.div>

            {/* Auth Card */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-7 backdrop-blur-md shadow-3d-lift space-y-5"
            >
              {/* Google OAuth */}
              <button
                onClick={handleGoogle}
                className="btn-3d w-full flex items-center justify-center gap-3 py-2.5 bg-white text-slate-800 hover:bg-slate-50 font-semibold rounded-xl text-sm border border-slate-200"
              >
                <FcGoogle className="w-5 h-5 flex-shrink-0" />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/60" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-slate-900/80 text-[11px] text-slate-500 uppercase tracking-widest">
                    or email
                  </span>
                </div>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 tracking-wide">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-inset w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-600 rounded-lg bg-slate-800/50 border border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-inset w-full px-4 py-2.5 pr-10 text-sm text-white placeholder:text-slate-600 rounded-lg bg-slate-800/50 border border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPass ? <RiEyeOffLine className="w-4 h-4" /> : <RiEyeLine className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button type="button" className="text-xs text-[var(--vybz-blue)] hover:underline">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-3d-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl mt-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <RiArrowRightLine className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Footer */}
            <motion.p variants={itemVariants} className="text-center text-xs text-slate-600 mt-6">
              Don&apos;t have an account?{' '}
              <button className="text-[var(--vybz-blue)] hover:text-blue-400 font-semibold transition-colors">
                Create account
              </button>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
