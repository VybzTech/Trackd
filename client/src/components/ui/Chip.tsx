import React from 'react'

export type Tone = 'default' | 'success' | 'warning' | 'info' | 'danger' | 'neutral'

export interface ChipProps {
  tone?: Tone
  icon?: React.ReactNode
  children?: React.ReactNode
}

export function Chip({ tone = 'default', icon = null, children }: ChipProps) {
  return (
    <span className="chip" data-tone={tone === 'default' ? undefined : tone}>
      {icon}
      {children}
    </span>
  )
}
