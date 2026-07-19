import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { NAV_ITEMS } from '../lib/landingData'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import ForCandidates from '../components/landing/ForCandidates'
import ForRecruiters from '../components/landing/ForRecruiters'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import Contact from '../components/landing/Contact'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import RoleModal from '../components/landing/RoleModal'
import type { Role } from '../components/landing/RoleModal'

export default function Landing() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('product')

  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const [pricingAnnual, setPricingAnnual] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [demoScore, setDemoScore] = useState(72)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 76
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const openRoleModal = (preselect: Role | null) => {
    setSelectedRole(preselect)
    setRoleModalOpen(true)
  }

  const closeRoleModal = () => setRoleModalOpen(false)

  const confirmRole = () => {
    if (selectedRole) navigate(`/auth?screen=signup&role=${selectedRole}`)
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        scrolled={scrolled}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onGetStarted={() => openRoleModal(null)}
      />

      <main id="top">
        <Hero onGetStarted={() => openRoleModal('candidate')} onImHiring={() => openRoleModal('recruiter')} />
        <HowItWorks />
        <ForCandidates demoScore={demoScore} onDemoScoreChange={setDemoScore} />
        <ForRecruiters />
        <Pricing annual={pricingAnnual} onToggle={() => setPricingAnnual((v) => !v)} onGetStarted={() => openRoleModal('candidate')} />
        <FAQ openIndex={openFaqIndex} onToggle={(i) => setOpenFaqIndex((cur) => (cur === i ? null : i))} />
        <Contact />
        <FinalCTA onGetStarted={() => openRoleModal('candidate')} onImHiring={() => openRoleModal('recruiter')} />
      </main>

      <Footer />

      <RoleModal
        open={roleModalOpen}
        confirmed={false}
        selectedRole={selectedRole}
        onClose={closeRoleModal}
        onSelectRole={setSelectedRole}
        onConfirm={confirmRole}
      />
    </div>
  )
}
