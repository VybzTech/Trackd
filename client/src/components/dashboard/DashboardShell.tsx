import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Theme } from '../../lib/landingData'
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../landing/icons'

export interface DashboardNavItem {
  id: string
  label: string
  icon: ReactNode
}

interface DashboardShellProps {
  theme: Theme
  toggleTheme: () => void
  navItems: DashboardNavItem[]
  activeTab: string
  onTabChange: (id: string) => void
  pageTitle: string
  /** Rendered under the nav list, above the identity block (e.g. Admin's status pill, Candidate's Pro upsell). */
  sidebarExtra?: ReactNode
  /** User's display name + role line, shown at the bottom of the sidebar. */
  identityName: string
  identitySubtitle: string
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  /** Rendered on the right side of the topbar, next to the theme toggle. */
  headerActions?: ReactNode
  children: ReactNode
}

/**
 * Shared shell for the three authenticated dashboards (Candidate, Recruiter,
 * Admin). Structure transcribed from the three .dc.html prototypes, which
 * share one shell "recipe" byte-for-byte: 240px sidebar, 64px topbar, mobile
 * overlay drawer below 960px, flat nav-button active state (gradient pill,
 * not a glass chip).
 */
export default function DashboardShell({
  theme,
  toggleTheme,
  navItems,
  activeTab,
  onTabChange,
  pageTitle,
  sidebarExtra,
  identityName,
  identitySubtitle,
  showSearch,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  headerActions,
  children,
}: DashboardShellProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 960)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [activeTab])

  const handleTabChange = (id: string) => {
    onTabChange(id)
    setSidebarOpen(false)
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-5 py-5">
        <Link
          to="/"
          className="flex shrink-0 items-baseline gap-px whitespace-nowrap text-[18px] font-extrabold tracking-[-0.02em]"
          style={{ color: 'var(--text)' }}
        >
          Trackd<span style={{ color: 'var(--glow-top)' }}>.</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const active = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[13.5px] font-semibold transition-all duration-150"
              style={
                active
                  ? {
                      color: '#fff',
                      background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.2), 0 4px 12px rgba(15,82,186,0.3)',
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
              <span className="flex shrink-0 items-center justify-center" style={{ width: 18, height: 18 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {sidebarExtra}

      <div className="flex items-center gap-2.5 border-t px-4 py-4" style={{ borderColor: 'var(--border)' }}>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: 'var(--surface-alt)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
        >
          {identityName.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            {identityName}
          </div>
          <div className="truncate text-[11px]" style={{ color: 'var(--text-3)' }}>
            {identitySubtitle}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 hover:-translate-y-0.5"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'transparent' }}
        >
          {theme === 'dark' ? <SunIcon size={14} /> : <MoonIcon size={14} />}
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {!isMobile && (
        <aside
          className="flex h-screen w-[240px] shrink-0 flex-col border-r"
          style={{ borderColor: 'var(--border)', position: 'sticky', top: 0 }}
        >
          {sidebarContent}
        </aside>
      )}

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-[70] flex" style={{ animation: 'fadeIn .15s ease-out both' }}>
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,4,30,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="relative flex h-full w-[260px] flex-col"
            style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', animation: 'slideInRight .25s ease-out both' }}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header
          className="sticky top-0 z-[60] flex h-16 shrink-0 items-center justify-between gap-4 border-b px-5"
          style={{
            borderColor: 'var(--border)',
            background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border"
                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
              >
                <MenuIcon size={15} />
              </button>
            )}
            <h1 className="truncate text-[16px] font-bold tracking-[-0.01em]">{pageTitle}</h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {showSearch && (
              <div className="relative hidden sm:block">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
                  <SearchIcon size={13} />
                </span>
                <input
                  type="text"
                  value={searchValue ?? ''}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder={searchPlaceholder ?? 'Search…'}
                  className="w-[200px] rounded-lg border py-1.5 pl-8 pr-3 text-[13px] transition-[width] duration-150 focus:w-[260px]"
                  style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
                />
              </div>
            )}
            {headerActions}
            {isMobile && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
              >
                {theme === 'dark' ? <SunIcon size={14} /> : <MoonIcon size={14} />}
              </button>
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 p-5 sm:p-7">{children}</main>
      </div>

      {isMobile && sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
          className="fixed right-4 top-4 z-[80] flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          <CloseIcon size={14} />
        </button>
      )}
    </div>
  )
}
