import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface CtaLinkProps {
  to: string
  children: ReactNode
  /** Extra utility classes for size/radius (padding, rounding, text size). */
  className?: string
  /** Drop the elevation shadow (the "See Pro plan" button omits it in the source). */
  shadow?: boolean
}

/**
 * The brand-gradient pill/link used for every navigation CTA on the For
 * Candidates page. Mirrors the gradient + border + shadow of MinimalHeader's
 * cta, rendered as a react-router Link (the source CTAs are <a href> nav, not
 * buttons).
 */
export default function CtaLink({ to, children, className = '', shadow = true }: CtaLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/22 font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5 ${className}`}
      style={{
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
        boxShadow: shadow ? 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(15,82,186,0.3)' : undefined,
      }}
    >
      {children}
    </Link>
  )
}
