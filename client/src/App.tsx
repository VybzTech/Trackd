import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './store/appStore'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import IngestionModule from './pages/IngestionModule'
import ProPage from './pages/ProPage'

export default function App() {
  const currentView = useAppStore((state) => state.currentView)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {currentView === 'landing' && <Landing />}
      {currentView === 'auth' && <Landing showAuth={true} />}
      {currentView === 'onboarding' && <Landing showOnboarding={true} />}
      {currentView === 'ingestion' && <IngestionModule />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'pro' && <ProPage />}
      <Toaster position="top-right" />
    </div>
  )
}
