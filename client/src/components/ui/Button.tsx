import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'text-white',
  secondary: 'glass-surface text-white',
  ghost: 'bg-transparent text-[var(--text-tint-1)] hover:text-white',
  danger: 'text-white',
}

const SIZE_CLASS: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({ variant = 'primary', size = 'md', className, style, children, ...rest }: ButtonProps) {
  const backgroundStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: 'var(--brand-primary)' }
      : variant === 'danger'
        ? { background: 'var(--status-rejected)' }
        : {}

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium font-display transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className || ''}`}
      style={{ ...backgroundStyle, ...style }}
      {...rest}
    >
      {children}
    </button>
  )
}
