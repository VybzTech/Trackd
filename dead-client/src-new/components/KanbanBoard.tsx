// React import not required with the react-jsx transform
import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import { STATUS_COLOR, STATUS_LABEL, STATUS_ORDER } from '../lib/statusTokens'
import { GlassCard } from './ui'
import JobCard from './JobCard'

export default function KanbanBoard() {
  const opportunities = useAppStore((state) => state.opportunities)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {STATUS_ORDER.map((status) => {
        const items = opportunities.filter((opp) => opp.status === status)
        const color = STATUS_COLOR[status]

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="relative overflow-hidden h-full">
              <span className="absolute inset-x-0 top-0 h-[2px]" style={{ background: color }} />
              <h3 className="font-display font-semibold text-white mb-4 flex items-center justify-between">
                {STATUS_LABEL[status]}
                <span
                  className="text-xs font-mono px-2 py-1 rounded"
                  style={{ backgroundColor: `${color}26`, color }}
                >
                  {items.length}
                </span>
              </h3>

              <div className="space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <JobCard job={item} />
                  </motion.div>
                ))}

                {items.length === 0 && (
                  <div className="text-center py-8 text-sm" style={{ color: 'var(--text-tint-2)' }}>
                    No items yet
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )
      })}
    </div>
  )
}
