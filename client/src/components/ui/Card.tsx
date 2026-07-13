import React from 'react'

export interface CardProps {
  /** base = surface tier; elevated = elevated tier + shadow; media = top gradient block; accent = 2px signal-colored top hairline. */
  variant?: 'base' | 'elevated' | 'media' | 'accent'
  /** Signal token for the top hairline when variant="accent". */
  accent?: 'success' | 'warning' | 'info' | 'danger'
  eyebrow?: string
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Card({ variant = 'base', accent, eyebrow, title, children, footer, className, style }: CardProps) {
  const classes = [
    'card',
    variant === 'elevated' ? 'card-elevated' : '',
    variant === 'accent' ? 'card-accent' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} data-accent={variant === 'accent' ? accent : undefined} style={style}>
      {variant === 'media' && <div className="card-media" />}
      {eyebrow && <div className="card-eyebrow">{eyebrow}</div>}
      {title && <h3 className="card-title">{title}</h3>}
      {children && <div className="card-body">{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
