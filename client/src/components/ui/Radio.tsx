import React from 'react'

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
}

export function Radio({ label, ...rest }: RadioProps) {
  return (
    <label className="check">
      <input type="radio" {...rest} />
      {label}
    </label>
  )
}
