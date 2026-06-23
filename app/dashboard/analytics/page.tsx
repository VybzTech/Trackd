'use client';

import { motion } from 'framer-motion';
import { mockJobs } from '@/lib/mock-data';
import { RiBarChartBoxLine, RiPieChartLine, RiTrendingUpLine, RiArrowUpLine } from 'react-icons/ri';

export default function AnalyticsPage() {
  const statusBreakdown = {
    Bookmarked: mockJobs.filter((j) => j.status === 'Bookmarked').length,
    Applied: mockJobs.filter((j) => j.status === 'Applied').length,
    Interviewing: mockJobs.filter((j) => j.status === 'Interviewing').length,
    Offer: mockJobs.filter((j) => j.status === 'Offer').length,
    Rejected: mockJobs.filter((j) => j.status === 'Rejected').length,
  };

  const topSkills = mockJobs
    .flatMap((j) => j.technicalRequirements?.stack ?? [])
    .reduce<Record<string, number>>((acc, skill) => {
      acc[skill] = (acc[skill] ?? 0) + 1;
      return acc;
    }, {});

  const topSources = mockJobs.reduce<Record<string, number>>((acc, job) => {
    const src = job.source ?? 'Unknown';
    acc[src] = (acc[src] ?? 0) + 1;
    return acc;
  }, {});

  const maxSkillCount = Math.max(...Object.values(topSkills), 1);
  const maxSourceCount = Math.max(...Object.values(topSources), 1);

  const statusConfig: Record<string, { fill: string; barClass: string }> = {
    Bookmarked: { fill: '#64748b', barClass: 'bg-slate-500' },
    Applied: { fill: '#0052FF', barClass: 'bg-[var(--vybz-blue)]' },
    Interviewing: { fill: '#a855f7', barClass: 'bg-purple-500' },
    Offer: { fill: '#22c55e', barClass: 'bg-green-500' },
    Rejected: { fill: '#ef4444', barClass: 'bg-red-500' },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5 max-w-5xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white font-heading tracking-tight">Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Insights across your entire job search pipeline</p>
      </motion.div>

      {/* Status Overview — SVG Bar Chart */}
      <motion.div variants={itemVariants} className="card-3d space-y-5">
        <div className="flex items-center gap-2">
          <RiBarChartBoxLine className="w-4 h-4 text-[var(--vybz-blue)]" />
          <h2 className="text-sm font-semibold text-white">Pipeline Status</h2>
          <span className="ml-auto text-xs text-slate-500">{mockJobs.length} total applications</span>
        </div>

        {/* SVG Bar Chart */}
        <svg width="100%" height="120" viewBox="0 0 500 120" preserveAspectRatio="none">
          {Object.entries(statusBreakdown).map(([status, count], i) => {
            const total = Object.values(statusBreakdown).reduce((a, b) => a + b, 0) || 1;
            const barH = (count / total) * 90;
            const x = i * 100 + 10;
            const y = 100 - barH;
            const cfg = statusConfig[status];
            return (
              <g key={status}>
                <rect
                  x={x}
                  y={y}
                  width={80}
                  height={barH}
                  rx={6}
                  fill={cfg.fill}
                  opacity={0.8}
                />
                <text x={x + 40} y={y - 6} textAnchor="middle" fill="#94a3b8" fontSize={9}>
                  {count}
                </text>
                <text x={x + 40} y={115} textAnchor="middle" fill="#64748b" fontSize={9}>
                  {status.slice(0, 5)}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Two-column charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Skills Matrix */}
        <motion.div variants={itemVariants} className="card-3d space-y-4">
          <div className="flex items-center gap-2">
            <RiTrendingUpLine className="w-4 h-4 text-[var(--vybz-blue)]" />
            <h2 className="text-sm font-semibold text-white">Top Required Skills</h2>
          </div>

          <div className="space-y-2.5">
            {Object.entries(topSkills)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 7)
              .map(([skill, count], idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[12px] text-slate-300 w-20 truncate flex-shrink-0">{skill}</span>
                  <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxSkillCount) * 100}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: idx * 0.06 }}
                      className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400 rounded-full"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 w-4 text-right">{count}</span>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Application Sources */}
        <motion.div variants={itemVariants} className="card-3d space-y-4">
          <div className="flex items-center gap-2">
            <RiPieChartLine className="w-4 h-4 text-[var(--vybz-blue)]" />
            <h2 className="text-sm font-semibold text-white">Top App Sources</h2>
          </div>

          <div className="space-y-2.5">
            {Object.entries(topSources)
              .sort(([, a], [, b]) => b - a)
              .map(([source, count], idx) => (
                <motion.div
                  key={source}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-slate-300">{source}</span>
                    <div className="flex items-center gap-1">
                      <RiArrowUpLine className="w-3 h-3 text-[var(--vybz-blue)]" />
                      <span className="text-[12px] font-semibold text-[var(--vybz-blue)]">{count}</span>
                    </div>
                  </div>
                  <div className="h-1 bg-slate-700/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxSourceCount) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.07 }}
                      className="h-full bg-gradient-to-r from-[var(--vybz-blue)]/60 to-[var(--vybz-blue)] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Match Score Distribution */}
      <motion.div variants={itemVariants} className="card-3d space-y-4">
        <div className="flex items-center gap-2">
          <RiBarChartBoxLine className="w-4 h-4 text-[var(--vybz-blue)]" />
          <h2 className="text-sm font-semibold text-white">AI Match Scores</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {mockJobs.map((job) => {
            const score = job.aiInsights?.matchScore ?? 0;
            const color =
              score >= 90 ? 'from-green-500 to-emerald-600' :
              score >= 75 ? 'from-[var(--vybz-blue)] to-blue-500' :
              'from-amber-500 to-orange-500';
            return (
              <div key={job.id} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 space-y-2">
                <p className="text-[11px] font-semibold text-slate-300 truncate">{job.company.name}</p>
                <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent font-heading`}>
                  {score > 0 ? `${score}%` : '—'}
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
