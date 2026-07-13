// React import not required with the react-jsx transform
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './store/appStore'
import { AppShell } from './components/layout/AppShell'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import IngestionModule from './pages/IngestionModule'
import ProPage from './pages/ProPage'

const SHELL_VIEWS = new Set(['dashboard', 'ingestion', 'pro'])

export default function App() {
  const currentView = useAppStore((state) => state.currentView)
  const useShell = SHELL_VIEWS.has(currentView)

  const content = (
    <>
      {currentView === 'landing' && <Landing />}
      {currentView === 'auth' && <Landing showAuth={true} />}
      {currentView === 'onboarding' && <Landing showOnboarding={true} />}
      {currentView === 'ingestion' && <IngestionModule />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'pro' && <ProPage />}
    </>
  )

  return (
    <div className="min-h-screen">
      {useShell ? <AppShell>{content}</AppShell> : <div className="app-shell">{content}</div>}
      <Toaster position="top-right" />
    </div>
  )
}
