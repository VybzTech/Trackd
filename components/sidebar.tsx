'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Inbox,
  BarChart3,
  User,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/inbox', icon: Inbox, label: 'Inbox' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-700 flex flex-col p-4 z-40"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="mb-8 flex items-center justify-between">
        <motion.div
          animate={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <span className="font-heading text-lg font-bold text-white">Trackd</span>
        </motion.div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-slate-400 hover:text-white"
        >
          <ChevronLeft
            className="w-5 h-5"
            style={{
              transform: expanded ? 'scaleX(-1)' : 'scaleX(1)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--vybz-blue)] rounded-r-lg"
                />
              )}

              <Icon className="w-5 h-5 flex-shrink-0 ml-1" />

              <motion.span
                animate={{
                  opacity: expanded ? 1 : 0,
                  width: expanded ? 'auto' : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className="pt-4 border-t border-slate-700">
        <button className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <User className="w-5 h-5 flex-shrink-0" />
          <motion.span
            animate={{
              opacity: expanded ? 1 : 0,
              width: expanded ? 'auto' : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium overflow-hidden whitespace-nowrap"
          >
            Sign out
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
