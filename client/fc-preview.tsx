import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './src/index.css'
import ForCandidatesPage from './src/pages/ForCandidatesPage'

// Throwaway preview harness — mounts only ForCandidatesPage so it can be
// verified while App.tsx's sibling pages are still being built by other agents.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ForCandidatesPage />
    </BrowserRouter>
  </StrictMode>,
)
