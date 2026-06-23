'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, TrendingUp, Bookmark } from 'lucide-react';
import { DashboardStats } from '@/types';

interface DashboardSummaryProps {
  stats: DashboardStats;
}

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

export function DashboardSummary({ stats }: DashboardSummaryProps) {
  const summaryCards = [
    {
      icon: Briefcase,
      label: 'Total Applications',
      value: stats.totalApplications,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: TrendingUp,
      label: 'Interviewing',
      value: stats.interviewing,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: CheckCircle,
      label: 'Offers',
      value: stats.offers,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Bookmark,
      label: 'Bookmarked',
      value: stats.bookmarked,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {summaryCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="card-3d group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-white font-heading">
                  {card.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
