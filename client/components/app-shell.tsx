'use client';

import { Sidebar } from './sidebar';
import { Header } from './header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar — part of flex flow, animates its own width */}
      <Sidebar />

      {/* Main content — flex-1 fills remaining width automatically */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky header — no fixed offset needed */}
        <Header />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
