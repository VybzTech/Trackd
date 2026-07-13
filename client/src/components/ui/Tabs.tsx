import React from 'react'

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  active?: string
  onChange?: (value: string) => void
}

export function Tabs({ items = [], active, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`tab${item.value === active ? ' is-active' : ''}`}
          role="tab"
          aria-selected={item.value === active}
          onClick={() => onChange && onChange(item.value)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  )
}
