// React import not required with the react-jsx transform
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
      className="glass-surface p-4 cursor-pointer transition-all group"
    >
      <div className="space-y-3">
        {/* Company & Role */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tint-2)' }}>
            {job.company}
          </p>
          <p className="text-white font-semibold font-display group-hover:text-[var(--glow-top)] transition-colors line-clamp-2">
            {job.role}
          </p>
        </div>

        {/* Compensation */}
        {job.compensation && (
          <p className="font-mono font-semibold text-sm" style={{ color: 'var(--accent-info)' }}>
            ${job.compensation.min}k - ${job.compensation.max}k
          </p>
        )}

        {/* Tech Stack */}
        {job.stack && job.stack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.stack.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(82,232,255,0.12)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
              >
                {tech}
              </span>
            ))}
            {job.stack.length > 2 && (
              <span className="text-xs px-2 py-1" style={{ color: 'var(--text-tint-2)' }}>+{job.stack.length - 2}</span>
            )}
          </div>
        )}

        {/* Match Score */}
        {job.matchScore && (
          <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--border-glass)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tint-2)' }}>Match Score</span>
            <span className="font-mono font-semibold text-white">{job.matchScore}%</span>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="pt-2 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--glow-top)' }}
        >
          View Details
          <FiArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}
