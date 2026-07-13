import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

export function Input({ label, icon, className, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tint-2)' }}>
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 flex items-center" style={{ color: 'var(--text-tint-2)' }}>{icon}</span>}
        <input
          className={`w-full h-10 rounded-xl px-3 text-sm text-white glass-surface placeholder:text-[var(--text-tint-2)] focus:outline-none focus:ring-2 focus:ring-[var(--glow-top)]/40 ${icon ? 'pl-9' : ''} ${className || ''}`}
          {...rest}
        />
      </div>
    </div>
  )
}
