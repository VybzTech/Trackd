// React import not required with the react-jsx transform
import { motion } from 'framer-motion'
import { FiMenu, FiGrid, FiInbox, FiLogOut } from 'react-icons/fi'
import { useAppStore } from '../../store/appStore'
import { IconChip } from '../ui/IconChip'

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: <FiGrid size={18} /> },
  { key: 'ingestion', label: 'Ingestion', icon: <FiInbox size={18} /> },
] as const

export interface SidebarProps {
  expanded: boolean
  onToggle: () => void
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  const currentView = useAppStore((s) => s.currentView)
  const setCurrentView = useAppStore((s) => s.setCurrentView)
  const user = useAppStore((s) => s.user)

  return (
    <motion.aside
      animate={{ width: expanded ? 240 : 84 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
      className="glass-surface flex-shrink-0 flex flex-col gap-6 p-4 h-screen sticky top-0 overflow-hidden"
      style={{ borderRadius: 0 }}
    >
      <IconChip
        icon={<FiMenu size={18} />}
        onClick={onToggle}
        aria-label="Toggle sidebar"
      />

      <nav className="flex flex-col gap-2">
        {NAV.map((item) => {
          const isActive = currentView === item.key
          return (
            <button
              key={item.key}
              onClick={() => setCurrentView(item.key)}
              className="relative flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-display transition-colors"
              style={{ color: isActive ? '#ffffff' : 'var(--text-tint-2)' }}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                  style={{ background: 'var(--glow-top)' }}
                />
              )}
              <IconChip as="div" icon={item.icon} active={isActive} />
              {expanded && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <div className="h-px" style={{ background: 'var(--border-glass)' }} />
        {user && (
          <div className="flex items-center gap-3 px-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
              style={{ background: 'var(--brand-primary)' }}
            >
              {user.name?.[0]?.toUpperCase() || '?'}
            </div>
            {expanded && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-white truncate">{user.name}</span>
                <span className="text-xs" style={{ color: 'var(--text-tint-2)' }}>Free</span>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-display transition-colors hover:bg-[var(--status-rejected)]/15 hover:text-[var(--status-rejected)]"
          style={{ color: 'var(--text-tint-2)' }}
        >
          <IconChip as="div" icon={<FiLogOut size={18} />} />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
