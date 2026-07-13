import React from 'react'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean
}

/** The .glass-surface recipe (docs/Trackd.md 2.3) as a component. */
export function GlassCard({ padded = true, className, children, ...rest }: GlassCardProps) {
  return (
    <div
      className={`glass-surface ${padded ? 'p-5 md:p-6' : ''} ${className || ''}`}
      {...rest}
    >
      {children}
    </div>
  )
}
