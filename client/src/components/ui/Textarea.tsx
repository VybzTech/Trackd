import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  help?: string
  error?: boolean
}

export function Textarea({ label, help, error = false, className, ...rest }: TextareaProps) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <textarea className={`textarea${error ? ' is-invalid' : ''}${className ? ` ${className}` : ''}`} {...rest} />
      {help && <div className={`field-help${error ? ' is-error' : ''}`}>{help}</div>}
    </div>
  )
}
