import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import FAQPage from './pages/FAQPage'
import Privacy from './pages/Privacy'
import ForCandidatesPage from './pages/ForCandidatesPage'
import ForRecruitersPage from './pages/ForRecruitersPage'
import ScrollToTop from './components/ScrollToTop'

// Dashboards are large, authenticated-only surfaces reached after sign-in —
// code-split so the marketing/auth pages don't ship dashboard JS up front.
const DashboardCandidate = lazy(() => import('./pages/DashboardCandidate'))
const DashboardRecruiter = lazy(() => import('./pages/DashboardRecruiter'))
const DashboardAdmin = lazy(() => import('./pages/DashboardAdmin'))

function DashboardFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--text-3)' }}>
      Loading…
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/for-candidates" element={<ForCandidatesPage />} />
        <Route path="/for-recruiters" element={<ForRecruitersPage />} />
        <Route
          path="/dashboard/candidate"
          element={
            <Suspense fallback={<DashboardFallback />}>
              <DashboardCandidate />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/recruiter"
          element={
            <Suspense fallback={<DashboardFallback />}>
              <DashboardRecruiter />
            </Suspense>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <Suspense fallback={<DashboardFallback />}>
              <DashboardAdmin />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
