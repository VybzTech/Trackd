import React, { useState } from 'react'
import { Sidebar } from './Sidebar'

export interface AppShellProps {
  children: React.ReactNode
}

/** Gradient background wrapper + collapsible sidebar | main grid (docs/Trackd.md 3). */
export function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="app-shell flex">
      <Sidebar expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  )
}
