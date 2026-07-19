import { Link } from 'react-router-dom'

interface FooterLink {
  label: string
  to: string
}

interface MinimalFooterProps {
  links: FooterLink[]
}

export default function MinimalFooter({ links }: MinimalFooterProps) {
  return (
    <footer className="border-t px-[clamp(20px,5vw,32px)] py-7 text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
      © 2026 Trackd. All rights reserved.
      {links.map((link) => (
        <span key={link.to}>
          {' '}
          ·{' '}
          <Link to={link.to} className="transition-colors duration-150" style={{ color: 'var(--text-3)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--glow-top)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}>
            {link.label}
          </Link>
        </span>
      ))}
    </footer>
  )
}
