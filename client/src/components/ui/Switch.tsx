import React from 'react'

export interface SwitchProps {
  label?: React.ReactNode
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Switch({ label, checked, onChange, ...rest }: SwitchProps) {
  return (
    <label className="row" style={{ cursor: 'pointer' }}>
      <span className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
        <span className="switch-track" />
        <span className="switch-thumb" />
      </span>
      {label && <span className="t-body-sm" style={{ color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  )
}
