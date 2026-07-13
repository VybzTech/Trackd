import React from 'react'

export interface NavLink {
  label: string
  href?: string
}

export interface NavBarProps {
  brand?: string
  links?: NavLink[]
  active?: string
  right?: React.ReactNode
}

export function NavBar({ brand = 'Trackd', links = [], active, right }: NavBarProps) {
  return (
    <nav className="nav">
      <a className="nav-brand" href="#">
        <span className="nav-brand-mark" />
        {brand}
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.label} className="nav-link" href={l.href || '#'} aria-current={l.label === active ? 'page' : undefined}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="row">{right}</div>
    </nav>
  )
}
