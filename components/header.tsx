'use client';

import { Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-80 right-0 h-16 bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm z-30 flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="input-inset w-full pl-10 pr-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--vybz-blue)] to-blue-900 flex items-center justify-center text-white font-semibold text-sm hover:ring-2 ring-[var(--vybz-blue)] ring-offset-2 ring-offset-slate-800 transition-all">
          AC
        </button>
      </div>
    </header>
  );
}
