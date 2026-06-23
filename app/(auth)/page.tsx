'use client';

import { motion } from 'framer-motion';
import { Chrome, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 font-heading">Trackd</h1>
          <p className="text-slate-400">
            AI-powered job tracking for your career
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm space-y-4"
        >
          {/* Google OAuth Button */}
          <button className="btn-3d w-full !bg-white !text-slate-900 hover:!bg-slate-100 flex items-center justify-center gap-3 font-semibold">
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="you@example.com"
              className="input-inset w-full px-4 py-3 text-white placeholder:text-slate-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-inset w-full px-4 py-3 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Login Button */}
          <Link
            href="/welcome"
            className="btn-3d-primary w-full flex items-center justify-center gap-2 mt-6"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p variants={itemVariants} className="text-center text-sm text-slate-400 mt-8">
          Don&apos;t have an account?{' '}
          <button className="text-[var(--vybz-blue)] hover:text-[var(--vybz-blue-dark)] font-semibold">
            Sign up
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
