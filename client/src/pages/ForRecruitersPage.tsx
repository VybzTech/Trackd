import { useTheme } from '../hooks/useTheme'
import MinimalHeader from '../components/landing/MinimalHeader'
import MinimalFooter from '../components/landing/MinimalFooter'
import Hero from '../components/for-recruiters/Hero'
import PostRoleSection from '../components/for-recruiters/PostRoleSection'
import FeatureBullets from '../components/for-recruiters/FeatureBullets'
import ApplicantTable from '../components/for-recruiters/ApplicantTable'
import ClosingCTA from '../components/for-recruiters/ClosingCTA'

export default function ForRecruitersPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <MinimalHeader
        theme={theme}
        toggleTheme={toggleTheme}
        crossLink={{ label: 'For candidates', to: '/for-candidates' }}
        showSignIn
        cta={{ label: 'Start hiring', to: '/auth?screen=signup&role=recruiter' }}
      />

      <main>
        <Hero />

        <section className="mx-auto flex max-w-[1080px] flex-col gap-16 px-[clamp(20px,5vw,32px)] pb-[clamp(56px,8vw,90px)]">
          <PostRoleSection />
          <FeatureBullets />
          <ApplicantTable />
          <ClosingCTA />
        </section>
      </main>

      <MinimalFooter
        links={[
          { label: 'FAQ', to: '/faq' },
          { label: 'Privacy', to: '/privacy' },
        ]}
      />
    </div>
  )
}
