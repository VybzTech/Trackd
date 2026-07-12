import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'

const STATUS_OPTIONS = [
  { key: 'saved', label: 'Saved' },
  { key: 'applied', label: 'Applied' },
  { key: 'interviewing', label: 'Interviewing' },
  { key: 'offer', label: 'Offer' },
  { key: 'rejected', label: 'Rejected' }
]

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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      saved: 'bg-slate-500/20 text-slate-300',
      applied: 'bg-blue-500/20 text-blue-300',
      interviewing: 'bg-cyan-500/20 text-cyan-300',
      offer: 'bg-green-500/20 text-green-300',
      rejected: 'bg-red-500/20 text-red-300'
    }
    return colors[status] || 'bg-slate-500/20 text-slate-300'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg overflow-hidden"
    >
      {/* Header Controls */}
      <div className="p-4 border-b border-blue-500/20 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">All Opportunities</h3>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-brand-dark border border-blue-500/20 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
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
            <tr className="border-b border-blue-500/10 bg-brand-surface/20">
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Company</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Role</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Salary</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Status</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Match</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-300">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {sortedOpportunities.map((opp, i) => (
              <motion.tr
                key={opp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedOpportunity(opp)}
                className="border-b border-blue-500/10 hover:bg-brand-surface/30 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 text-white font-medium">{opp.company}</td>
                <td className="px-6 py-4 text-slate-300">{opp.role}</td>
                <td className="px-6 py-4 text-slate-400">
                  {opp.compensation ? `$${opp.compensation.min}k-${opp.compensation.max}k` : '-'}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={opp.status}
                    onChange={(e) => {
                      e.stopPropagation()
                      updateOpportunity(opp.id, { status: e.target.value as any })
                    }}
                    className={`${getStatusColor(opp.status)} border border-blue-500/20 rounded px-3 py-1 text-sm font-medium focus:outline-none`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-white font-medium">
                  {opp.matchScore ? `${opp.matchScore}%` : '-'}
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {opp.applicationDeadline
                    ? new Date(opp.applicationDeadline).toLocaleDateString()
                    : '-'}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedOpportunities.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No opportunities found
        </div>
      )}
    </motion.div>
  )
}
