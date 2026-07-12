import React from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import JobCard from './JobCard'

const STATUSES = [
  { key: 'saved', label: 'Saved', color: 'bg-slate-500/20' },
  { key: 'applied', label: 'Applied', color: 'bg-blue-500/20' },
  { key: 'interviewing', label: 'Interviewing', color: 'bg-cyan-500/20' },
  { key: 'offer', label: 'Offer Received', color: 'bg-green-500/20' },
  { key: 'rejected', label: 'Rejected/Closed', color: 'bg-red-500/20' }
]

export default function KanbanBoard() {
  const opportunities = useAppStore((state) => state.opportunities)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {STATUSES.map((status) => {
        const items = opportunities.filter((opp) => opp.status === status.key)

        return (
          <motion.div
            key={status.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${status.color} backdrop-blur border border-blue-500/20 rounded-lg p-4`}
          >
            <h3 className="font-semibold text-white mb-4 flex items-center justify-between">
              {status.label}
              <span className="bg-blue-600/50 text-white text-xs px-2 py-1 rounded">
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
                <div className="text-center py-8 text-slate-500 text-sm">
                  No items yet
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
