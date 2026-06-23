'use client';

import { Sidebar } from './sidebar';
import { Header } from './header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-80">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-auto mt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
