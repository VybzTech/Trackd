import React from 'react'

export interface BadgeProps {
  tone?: 'default' | 'success' | 'warning' | 'info' | 'danger'
  label?: string
}

export function Badge({ tone = 'default', label }: BadgeProps) {
  return (
    <span className="row" style={{ gap: '8px' }}>
      <span className="badge-dot" data-tone={tone === 'default' ? undefined : tone} />
      {label && <span className="t-body-sm" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>}
    </span>
  )
}
