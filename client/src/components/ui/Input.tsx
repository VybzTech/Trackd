import React from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  help?: string
  /** Switches border/ring to the danger token and tints help text. */
  error?: boolean
  /** Optional leading icon (16px). */
  icon?: React.ReactNode
}

export function Input({ label, help, error = false, icon = null, className, ...rest }: InputProps) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      {icon ? (
        <div className="input-group">
          <span className="input-icon">{icon}</span>
          <input className={`input${error ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`} {...rest} />
        </div>
      ) : (
        <input className={`input${error ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`} {...rest} />
      )}
      {help && <div className={`field-help${error ? ' is-error' : ''}`}>{help}</div>}
    </div>
  )
}
