import React from 'react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
}

/** Notion-style header row: title left, view-tabs/filters right (docs/Trackd.md 3). */
export function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap px-6 py-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: 'var(--text-tint-2)' }}>{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </div>
  )
}
