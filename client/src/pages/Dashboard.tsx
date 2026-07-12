import React from 'react'
import { motion } from 'framer-motion'
import { FiLayout, FiGrid, FiCalendar, FiPlus, FiLogOut } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import KanbanBoard from '../components/KanbanBoard'
import TableView from '../components/TableView'
import CalendarView from '../components/CalendarView'

export default function Dashboard() {
  const { opportunities, dashboardView, setDashboardView, setCurrentView } = useAppStore()

  const handleLogout = () => {
    setCurrentView('landing')
  }

  const stats = {
    active: opportunities.length,
    applied: opportunities.filter(o => o.status === 'applied').length,
    interviewing: opportunities.filter(o => o.status === 'interviewing').length,
    offers: opportunities.filter(o => o.status === 'offer').length
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-surface/50 backdrop-blur border-b border-blue-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600/20 hover:bg-slate-600/40 text-white rounded-lg transition-colors"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active', value: stats.active, color: 'from-blue-500' },
              { label: 'Applied', value: stats.applied, color: 'from-cyan-500' },
              { label: 'Interviewing', value: stats.interviewing, color: 'from-amber-500' },
              { label: 'Offers', value: stats.offers, color: 'from-green-500' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} to-transparent bg-opacity-10 border border-blue-500/20 rounded-lg p-4`}
              >
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-medium mr-2">View:</span>
            {[
              { view: 'kanban', icon: FiLayout, label: 'Kanban' },
              { view: 'table', icon: FiGrid, label: 'Table' },
              { view: 'calendar', icon: FiCalendar, label: 'Calendar' }
            ].map(({ view, icon: Icon, label }) => (
              <motion.button
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDashboardView(view as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  dashboardView === view
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-brand-surface/40 border border-blue-500/20 text-slate-300 hover:border-blue-500/50'
                }`}
              >
                <Icon size={18} />
                {label}
              </motion.button>
            ))}

            <div className="flex-1" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('ingestion')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FiPlus size={18} />
              Add Opportunity
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {opportunities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-brand-surface/40 backdrop-blur border border-blue-500/20 rounded-lg p-12 text-center"
          >
            <p className="text-xl text-slate-400 mb-4">No opportunities yet</p>
            <p className="text-slate-500 mb-6">Start by adding a new job opportunity to your pipeline</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('ingestion')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              <FiPlus size={18} />
              Add Your First Opportunity
            </motion.button>
          </motion.div>
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
