import React from 'react'

export interface IconChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  active?: boolean
  size?: 'md' | 'lg'
  as?: 'button' | 'div'
}

/** The .icon-chip recipe (docs/Trackd.md 2.3): glass square, hover lift, active glow ring. */
export function IconChip({ icon, active = false, size = 'md', as = 'button', className, ...rest }: IconChipProps) {
  const classes = [
    'icon-chip',
    active ? 'is-active' : '',
    size === 'lg' ? 'w-11 h-11' : '',
    className || '',
  ].filter(Boolean).join(' ')

  if (as === 'div') {
    return <div className={classes}>{icon}</div>
  }

  return (
    <button type="button" className={classes} {...rest}>
      {icon}
    </button>
  )
}
