import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import FAQPage from './pages/FAQPage'
import Privacy from './pages/Privacy'
import ForCandidatesPage from './pages/ForCandidatesPage'
import ForRecruitersPage from './pages/ForRecruitersPage'
import ScrollToTop from './components/ScrollToTop'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
