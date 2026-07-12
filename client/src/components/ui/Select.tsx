import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  help?: string
  error?: boolean
}

export function Select({ label, help, error = false, children, className, ...rest }: SelectProps) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <select className={`select${error ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </select>
      {help && <div className={`field-help${error ? ' is-error' : ''}`}>{help}</div>}
    </div>
  )
}
