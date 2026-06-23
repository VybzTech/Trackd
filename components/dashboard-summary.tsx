'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from '@/types';
import { RiBriefcaseLine, RiUserVoiceLine, RiTrophyLine, RiBookmarkLine } from 'react-icons/ri';

interface DashboardSummaryProps {
  stats: DashboardStats;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

const CARDS = (stats: DashboardStats) => [
  {
    icon: RiBriefcaseLine,
    label: 'Total Applications',
    value: stats.totalApplications,
    sub: `${stats.applied} active`,
    gradient: 'from-[var(--vybz-blue)] to-blue-700',
    glow: 'rgba(0,82,255,0.2)',
  },
  {
    icon: RiUserVoiceLine,
    label: 'Interviewing',
    value: stats.interviewing,
    sub: 'In progress',
    gradient: 'from-purple-500 to-purple-700',
    glow: 'rgba(168,85,247,0.2)',
  },
  {
    icon: RiTrophyLine,
    label: 'Offers',
    value: stats.offers,
    sub: stats.offers > 0 ? 'Congratulations!' : 'Keep going',
    gradient: 'from-emerald-500 to-green-700',
    glow: 'rgba(16,185,129,0.2)',
  },
  {
    icon: RiBookmarkLine,
    label: 'Bookmarked',
    value: stats.bookmarked,
    sub: 'Saved to review',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.2)',
  },
];

export function DashboardSummary({ stats }: DashboardSummaryProps) {
  const cards = CARDS(stats);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="card-3d cursor-default group relative overflow-hidden"
          >
            {/* Glow bg */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top left, ${card.glow}, transparent 70%)` }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 mb-2">{card.label}</p>
                <p className="text-3xl font-bold text-white font-heading leading-none mb-1">
                  {card.value}
                </p>
                <p className="text-[11px] text-slate-600">{card.sub}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 shadow-3d-flat group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
