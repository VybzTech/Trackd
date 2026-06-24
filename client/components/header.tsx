'use client';

import { RiSearchLine, RiBellLine, RiUser3Line } from 'react-icons/ri';

export function Header() {
  return (
    <header className="sticky top-0 h-14 bg-slate-900/90 border-b border-slate-700/60 backdrop-blur-md z-30 flex items-center px-5 gap-4 flex-shrink-0">
      {/* Search — 3D inset treatment */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search jobs, companies…"
            className="input-inset w-full pl-9 pr-4 py-2 text-[13px] text-white rounded-lg bg-slate-800/60 border border-slate-700/80 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-[var(--vybz-blue)] transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
          <RiBellLine className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--vybz-blue)] rounded-full ring-1 ring-slate-900" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-700/60" />

        {/* Profile Avatar */}
        <button className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--vybz-blue)] to-blue-800 flex items-center justify-center text-white font-semibold text-xs shadow-3d-flat group-hover:ring-2 group-hover:ring-[var(--vybz-blue)]/50 transition-all">
            AC
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[12px] font-semibold text-white leading-tight">Alex Chen</p>
            <p className="text-[10px] text-slate-500 leading-tight">Senior Engineer</p>
          </div>
        </button>
      </div>
    </header>
  );
}
