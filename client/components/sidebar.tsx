'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiDashboardLine, RiInboxLine, RiBarChartLine, RiUser3Line, RiLogoutBoxLine, RiRocketLine } from 'react-icons/ri';

const navItems = [
  { href: '/dashboard', icon: RiDashboardLine, label: 'Dashboard' },
  { href: '/dashboard/inbox', icon: RiInboxLine, label: 'Inbox' },
  { href: '/dashboard/analytics', icon: RiBarChartLine, label: 'Analytics' },
  { href: '/dashboard/profile', icon: RiUser3Line, label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      initial={{ width: 68 }}
      animate={{ width: expanded ? 220 : 68 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="h-screen bg-slate-900 border-r border-slate-700/60 flex flex-col py-5 z-40 flex-shrink-0 overflow-hidden"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--vybz-blue)] to-blue-800 flex items-center justify-center flex-shrink-0 shadow-3d-flat">
          <RiRocketLine className="w-4 h-4 text-white" />
        </div>
        <motion.span
          animate={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
          transition={{ duration: 0.18 }}
          className="font-heading text-base font-bold text-white overflow-hidden whitespace-nowrap"
        >
          Trackd
        </motion.span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? 'bg-[var(--vybz-blue)]/12 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--vybz-blue)] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-lg bg-[var(--vybz-blue)]/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                </>
              )}

              <Icon className="w-[18px] h-[18px] flex-shrink-0 relative z-10" />

              <motion.span
                animate={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
                transition={{ duration: 0.18 }}
                className="text-[13px] font-medium overflow-hidden whitespace-nowrap relative z-10"
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="px-2 pt-4 border-t border-slate-700/60">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/70 transition-all duration-150">
          <RiLogoutBoxLine className="w-[18px] h-[18px] flex-shrink-0" />
          <motion.span
            animate={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
            transition={{ duration: 0.18 }}
            className="text-[13px] font-medium overflow-hidden whitespace-nowrap"
          >
            Sign out
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
