'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';

export default function AnalyticsPage() {
  // Calculate statistics
  const statusBreakdown = {
    bookmarked: mockJobs.filter((j) => j.status === 'Bookmarked').length,
    applied: mockJobs.filter((j) => j.status === 'Applied').length,
    interviewing: mockJobs.filter((j) => j.status === 'Interviewing').length,
    offers: mockJobs.filter((j) => j.status === 'Offer').length,
    rejected: mockJobs.filter((j) => j.status === 'Rejected').length,
  };

  const topSkills = mockJobs
    .flatMap((j) => j.technicalRequirements?.stack || [])
    .reduce((acc: Record<string, number>, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

  const topSources = mockJobs.reduce((acc: Record<string, number>, job) => {
    acc[job.source || 'Unknown'] = (acc[job.source || 'Unknown'] || 0) + 1;
    return acc;
  }, {});

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white font-heading">Analytics</h1>
        <p className="text-slate-400 mt-1">Track your job search progress</p>
      </motion.div>

      {/* Status Breakdown */}
      <motion.div
        variants={itemVariants}
        className="card-3d space-y-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[var(--vybz-blue)]" />
          <h2 className="text-lg font-semibold text-white">Application Status</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(statusBreakdown).map(([status, count]) => {
            const colors: Record<string, string> = {
              bookmarked: 'from-slate-400 to-slate-500',
              applied: 'from-blue-400 to-blue-500',
              interviewing: 'from-purple-400 to-purple-500',
              offers: 'from-green-400 to-green-500',
              rejected: 'from-red-400 to-red-500',
            };

            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-slate-700/30 rounded-lg text-center"
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${
                    colors[status]
                  } flex items-center justify-center text-white font-bold text-lg mb-2`}
                >
                  {count}
                </div>
                <p className="text-xs font-semibold text-slate-300 capitalize">
                  {status}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Top Skills */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-6"
      >
        {/* Skills Chart */}
        <div className="card-3d space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[var(--vybz-blue)]" />
            <h2 className="text-lg font-semibold text-white">Top Skills</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(topSkills)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([skill, count]) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-sm text-slate-300 flex-1">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(count / Math.max(...Object.values(topSkills))) * 100}%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-[var(--vybz-blue)] to-blue-400"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 w-6">
                      {count}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Top Sources */}
        <div className="card-3d space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[var(--vybz-blue)]" />
            <h2 className="text-lg font-semibold text-white">Application Sources</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(topSources).map(([source, count]) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
              >
                <span className="text-sm text-slate-300">{source}</span>
                <span className="text-sm font-semibold text-[var(--vybz-blue)]">
                  {count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
