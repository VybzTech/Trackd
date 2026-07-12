import React from 'react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
  return (
    <label className="check">
      <input type="checkbox" {...rest} />
      {label}
    </label>
  )
}
