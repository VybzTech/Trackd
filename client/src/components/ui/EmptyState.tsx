import React from 'react'
import { GlassCard } from './GlassCard'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center py-16 gap-3">
      {icon && <div className="icon-chip w-12 h-12 text-[var(--glow-top)]">{icon}</div>}
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      {description && <p className="text-sm max-w-sm" style={{ color: 'var(--text-tint-2)' }}>{description}</p>}
      {action}
    </GlassCard>
  )
}
