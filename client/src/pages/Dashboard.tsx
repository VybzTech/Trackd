// React import not required with the react-jsx transform
import { motion } from 'framer-motion'
import { FiLayout, FiGrid, FiCalendar, FiPlus } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { GlassCard, EmptyState, Button } from '../components/ui'
import { PageHeader } from '../components/layout/PageHeader'
import KanbanBoard from '../components/KanbanBoard'
import TableView from '../components/TableView'
import CalendarView from '../components/CalendarView'

const STATS = [
  { key: 'active', label: 'Active', color: 'var(--brand-primary)' },
  { key: 'applied', label: 'Applied', color: 'var(--status-applied)' },
  { key: 'interviewing', label: 'Interviewing', color: 'var(--status-interviewing)' },
  { key: 'offers', label: 'Offers', color: 'var(--status-offer)' },
] as const

const VIEWS = [
  { view: 'kanban', icon: FiLayout, label: 'Kanban' },
  { view: 'table', icon: FiGrid, label: 'Table' },
  { view: 'calendar', icon: FiCalendar, label: 'Calendar' },
] as const

export default function Dashboard() {
  const { opportunities, dashboardView, setDashboardView, setCurrentView } = useAppStore()

  const stats = {
    active: opportunities.length,
    applied: opportunities.filter((o) => o.status === 'applied').length,
    interviewing: opportunities.filter((o) => o.status === 'interviewing').length,
    offers: opportunities.filter((o) => o.status === 'offer').length,
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Your job pipeline at a glance"
        right={
          <Button variant="primary" size="sm" onClick={() => setCurrentView('ingestion')}>
            <FiPlus size={16} /> Add Opportunity
          </Button>
        }
      />

      <div className="px-6 pb-8 flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <GlassCard className="relative overflow-hidden">
                <span
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: stat.color }}
                />
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tint-2)' }}>
                  {stat.label}
                </p>
                <p className="font-mono text-3xl font-semibold text-white mt-1">
                  {stats[stat.key]}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="tabs-group flex items-center gap-1 glass-surface p-1 rounded-2xl">
            {VIEWS.map(({ view, icon: Icon, label }) => (
              <motion.button
                key={view}
                whileTap={{ scale: 0.96 }}
                onClick={() => setDashboardView(view)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm font-medium transition-all"
                style={
                  dashboardView === view
                    ? { background: 'var(--brand-primary)', color: '#fff' }
                    : { color: 'var(--text-tint-2)' }
                }
              >
                <Icon size={16} />
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {opportunities.length === 0 ? (
          <EmptyState
            icon={<FiPlus size={18} />}
            title="No opportunities yet"
            description="Start by adding a new job opportunity to your pipeline."
            action={
              <Button variant="primary" onClick={() => setCurrentView('ingestion')}>
                <FiPlus size={16} /> Add Your First Opportunity
              </Button>
            }
          />
        ) : (
          <>
            {dashboardView === 'kanban' && <KanbanBoard />}
            {dashboardView === 'table' && <TableView />}
            {dashboardView === 'calendar' && <CalendarView />}
          </>
        )}
      </div>
    </div>
  )
}
