import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import { STATUS_COLOR, STATUS_LABEL, STATUS_ORDER } from '../lib/statusTokens'
import { GlassCard } from './ui'

export default function TableView() {
  const { opportunities, updateOpportunity, setSelectedOpportunity } = useAppStore()
  const [sortBy, setSortBy] = useState<'company' | 'date' | 'score'>('date')

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    if (sortBy === 'company') return a.company.localeCompare(b.company)
    if (sortBy === 'score') return (b.matchScore || 0) - (a.matchScore || 0)
    return (
      new Date(b.applicationDeadline || '').getTime() -
      new Date(a.applicationDeadline || '').getTime()
    )
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <GlassCard padded={false} className="overflow-hidden">
        {/* Header Controls */}
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-glass)' }}>
          <h3 className="font-display text-lg font-semibold text-white">All Opportunities</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: 'var(--text-tint-2)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-surface text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="company">Company</option>
              <option value="score">Match Score</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                {['Company', 'Role', 'Salary', 'Status', 'Match', 'Deadline'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-sm font-semibold" style={{ color: 'var(--text-tint-2)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedOpportunities.map((opp, i) => {
                const color = STATUS_COLOR[opp.status]
                return (
                  <motion.tr
                    key={opp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedOpportunity(opp)}
                    className="cursor-pointer transition-colors hover:bg-white/5"
                    style={{ borderBottom: '1px solid var(--border-glass)' }}
                  >
                    <td className="px-6 py-4 text-white font-medium">{opp.company}</td>
                    <td className="px-6 py-4" style={{ color: 'var(--text-tint-1)' }}>{opp.role}</td>
                    <td className="px-6 py-4 font-mono" style={{ color: 'var(--text-tint-2)' }}>
                      {opp.compensation ? `$${opp.compensation.min}k-${opp.compensation.max}k` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={opp.status}
                        onChange={(e) => {
                          e.stopPropagation()
                          updateOpportunity(opp.id, { status: e.target.value as any })
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full px-3 py-1 text-sm font-medium focus:outline-none"
                        style={{ backgroundColor: `${color}26`, color, border: `1px solid ${color}4d` }}
                      >
                        {STATUS_ORDER.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-white font-mono font-medium">
                      {opp.matchScore ? `${opp.matchScore}%` : '-'}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm" style={{ color: 'var(--text-tint-2)' }}>
                      {opp.applicationDeadline
                        ? new Date(opp.applicationDeadline).toLocaleDateString()
                        : '-'}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedOpportunities.length === 0 && (
          <div className="p-8 text-center" style={{ color: 'var(--text-tint-2)' }}>
            No opportunities found
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
