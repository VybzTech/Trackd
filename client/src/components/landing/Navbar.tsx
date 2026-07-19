import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../../lib/landingData'
import type { Theme } from '../../lib/landingData'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'

interface NavbarProps {
  theme: Theme
  toggleTheme: () => void
  scrolled: boolean
  activeNav: string
  onNavClick: (id: string) => void
  onGetStarted: () => void
}

export default function Navbar({ theme, toggleTheme, scrolled, activeNav, onNavClick, onGetStarted }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNav = (id: string) => {
    onNavClick(id)
    setMobileMenuOpen(false)
  }

  return (
    <div
      className="sticky top-0 z-[60] flex justify-center transition-[padding] duration-300"
      style={{ padding: scrolled ? '16px clamp(16px,4vw,32px) 0' : '0' }}
    >
      <div className="relative w-full transition-[max-width] duration-300" style={{ maxWidth: scrolled ? '960px' : '100%' }}>
        <nav
          className="pointer-events-auto flex items-center justify-between gap-4 transition-all duration-300"
          style={
            scrolled
              ? {
                  padding: '8px 8px 8px 20px',
                  borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
                  backdropFilter: 'blur(18px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
                }
              : {
                  padding: '14px clamp(20px,4vw,32px)',
                  borderRadius: 0,
                  borderBottom: '1px solid var(--border)',
                  background: 'color-mix(in srgb, var(--bg) 78%, transparent)',
                  backdropFilter: 'blur(14px)',
                }
          }
        >
          <a
            href="#top"
            className="flex shrink-0 items-baseline gap-px whitespace-nowrap text-[19px] font-extrabold tracking-[-0.02em]"
            style={{ color: 'var(--text)' }}
          >
            Trackd<span style={{ color: 'var(--glow-top)' }}>.</span>
          </a>

          <div className="hidden min-w-0 items-center gap-0.5 overflow-hidden lg:flex">
            {NAV_ITEMS.map((link) => {
              const active = activeNav === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNav(link.id)
                  }}
                  className="rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-150"
                  style={
                    active
                      ? {
                          color: '#fff',
                          background:
                            'linear-gradient(180deg,color-mix(in srgb,var(--brand-2) 85%,white 15%),var(--brand-2) 45%,var(--brand) 100%)',
                          backdropFilter: 'blur(12px)',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(15,82,186,0.3)',
                        }
                      : { color: 'var(--text-2)', background: 'transparent' }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text)'
                      e.currentTarget.style.background = 'var(--surface-alt)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-2)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 hover:-translate-y-0.5"
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

            <Link
              to="/auth?screen=signin"
              className="hidden shrink-0 whitespace-nowrap px-1.5 py-2 text-sm font-medium transition-colors duration-150 lg:inline-block"
              style={{ color: 'var(--text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
            >
              Sign in
            </Link>
            <button
              onClick={onGetStarted}
              className="hidden shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] px-[18px] py-[9px] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.25),0_8px_20px_rgba(15,82,186,0.3)] backdrop-blur-[14px] transition-transform duration-150 hover:-translate-y-0.5 lg:inline-flex"
            >
              Get started
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border lg:hidden"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        <div
          className="absolute left-0 right-0 top-[calc(100%+10px)] flex origin-top flex-col rounded-[20px] border p-[18px_20px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-300 lg:hidden"
          style={{
            borderColor: 'var(--border-glass)',
            background: 'var(--surface)',
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transform: mobileMenuOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
            opacity: mobileMenuOpen ? 1 : 0,
          }}
        >
          {NAV_ITEMS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault()
                handleNav(link.id)
              }}
              className="px-1 py-1.5 text-base font-semibold"
              style={{ color: 'var(--text)' }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2.5 border-t pt-3.5" style={{ borderColor: 'var(--border)' }}>
            <Link
              to="/auth?screen=signin"
              className="flex-1 rounded-[10px] border py-2.5 text-center font-semibold"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              Sign in
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onGetStarted()
              }}
              className="flex-1 cursor-pointer whitespace-nowrap rounded-[10px] border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] py-2.5 text-center font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_rgba(15,82,186,0.3)]"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
