import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { JobOpportunity } from '../store/appStore'

interface JobCardProps {
  job: JobOpportunity
}

export default function JobCard({ job }: JobCardProps) {
  const { setSelectedOpportunity, setCurrentView } = useAppStore()

  const handleClick = () => {
    setSelectedOpportunity(job)
    setCurrentView('pro')
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="bg-brand-surface/60 backdrop-blur border border-blue-500/30 hover:border-blue-500/60 rounded-lg p-4 cursor-pointer transition-all group"
    >
      <div className="space-y-3">
        {/* Company & Role */}
        <div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{job.company}</p>
          <p className="text-white font-semibold group-hover:text-blue-300 transition-colors line-clamp-2">
            {job.role}
          </p>
        </div>

        {/* Compensation */}
        {job.compensation && (
          <p className="text-cyan-400 font-semibold text-sm">
            ${job.compensation.min}k - ${job.compensation.max}k
          </p>
        )}

        {/* Tech Stack */}
        {job.stack && job.stack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.stack.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {job.stack.length > 2 && (
              <span className="text-slate-500 text-xs px-2 py-1">+{job.stack.length - 2}</span>
            )}
          </div>
        )}

        {/* Match Score */}
        {job.matchScore && (
          <div className="flex items-center justify-between pt-2 border-t border-blue-500/20">
            <span className="text-slate-400 text-xs">Match Score</span>
            <span className="text-white font-semibold">{job.matchScore}%</span>
          </div>
        )}

        {/* CTA */}
        <motion.div className="pt-2 flex items-center gap-1 text-blue-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          View Details
          <FiArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}
