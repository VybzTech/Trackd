import { Link } from 'react-router-dom'
import type { Theme } from '../../lib/landingData'
import { MoonIcon, SunIcon } from './icons'
import Logo from '../Logo'

interface CrossLink {
  label: string
  to: string
}

interface AuthCta {
  label: string
  to: string
}

interface MinimalHeaderProps {
  theme: Theme
  toggleTheme: () => void
  /** "← Back to Trackd" link back to the landing page (FAQ, Privacy) */
  showBackLink?: boolean
  /** Cross-audience link (For Candidates ↔ For Recruiters) */
  crossLink?: CrossLink
  /** Sign in link, routes to /auth?screen=signin */
  showSignIn?: boolean
  /** Primary CTA pill button, e.g. "Get started free" / "Start hiring" */
  cta?: AuthCta
}

export default function MinimalHeader({ theme, toggleTheme, showBackLink, crossLink, showSignIn, cta }: MinimalHeaderProps) {
  return (
    <header
      className="sticky top-0 z-[60] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b px-[clamp(20px,5vw,32px)] py-3.5"
      style={{
        borderColor: 'var(--border)',
        background: 'color-mix(in srgb, var(--bg) 78%, transparent)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div className="flex items-center gap-5">
        <Link to="/" className="flex shrink-0 items-center">
          <Logo height={19} />
        </Link>
        {showBackLink && (
          <Link
            to="/"
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            ← Back to Trackd
          </Link>
        )}
        {crossLink && (
          <Link
            to={crossLink.to}
            className="text-sm font-medium transition-colors duration-150"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--glow-top)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            {crossLink.label} →
          </Link>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 hover:-translate-y-0.5 lg:h-[34px] lg:w-[34px]"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-glass)'
            e.currentTarget.style.color = 'var(--glow-top)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-2)'
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        {showSignIn && (
          <Link
            to="/auth?screen=signin"
            className="shrink-0 whitespace-nowrap px-1.5 py-2 text-sm font-medium transition-colors duration-150"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            Sign in
          </Link>
        )}

        {cta && (
          <Link
            to={cta.to}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] px-[18px] py-[9px] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.25),0_8px_20px_rgba(15,82,186,0.3)] backdrop-blur-[14px] transition-transform duration-150 hover:-translate-y-0.5"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </header>
  )
}
