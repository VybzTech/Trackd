import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Primary = solid indigo, Secondary = surface + strong border, Tertiary = text-only, Danger = magenta fill. */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  /** Height: sm 32px, md 40px (default), lg 48px. */
  size?: 'sm' | 'md' | 'lg'
  /** Optional leading icon element (16-20px, inherits currentColor). */
  icon?: React.ReactNode
  /** Render as a square icon-only button (no label). */
  iconOnly?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon = null,
  iconOnly = false,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '',
    iconOnly ? 'btn-icon' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {icon}
      {!iconOnly && children}
    </button>
  )
}
