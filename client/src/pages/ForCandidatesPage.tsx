import { useTheme } from '../hooks/useTheme'
import MinimalHeader from '../components/landing/MinimalHeader'
import MinimalFooter from '../components/landing/MinimalFooter'
import { DocumentIcon, KanbanIcon, TimerIcon } from '../components/landing/icons'
import CandidatesHero from '../components/for-candidates/CandidatesHero'
import FeatureRow from '../components/for-candidates/FeatureRow'
import IngestionCard from '../components/for-candidates/IngestionCard'
import TrackCard from '../components/for-candidates/TrackCard'
import ScoreGaugeCard from '../components/for-candidates/ScoreGaugeCard'
import ProPanel from '../components/for-candidates/ProPanel'
import Testimonial from '../components/for-candidates/Testimonial'
import CtaLink from '../components/for-candidates/CtaLink'

export default function ForCandidatesPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <MinimalHeader
        theme={theme}
        toggleTheme={toggleTheme}
        crossLink={{ label: 'For recruiters', to: '/for-recruiters' }}
        showSignIn
        cta={{ label: 'Get started free', to: '/auth?screen=signup&role=candidate' }}
      />

      <main>
        <CandidatesHero />

        <section className="mx-auto flex max-w-[1080px] flex-col gap-16 px-[clamp(20px,5vw,32px)] pb-[clamp(56px,8vw,90px)]">
          <FeatureRow
            mediaFirst
            icon={<DocumentIcon />}
            title="Capture any posting, instantly."
            body="Paste a link, paste a wall of copied text, or click the Trackd extension on the tab you're already reading. Everything lands in your Ingestion queue, structured and ready to verify before it joins your pipeline."
            media={<IngestionCard />}
          />

          <FeatureRow
            icon={<KanbanIcon />}
            title="Track it your way."
            body="Work your pipeline as a Kanban board, a sortable table, or a calendar heatmap that shows application volume by day and lets you set reminders for interviews and deadlines. Move a card once — every view updates."
            media={<TrackCard />}
          />

          <FeatureRow
            mediaFirst
            icon={<TimerIcon />}
            title="Know your odds before you apply."
            body="Every job gets a live compatibility score against your resume — skills, seniority, and keyword coverage — plus exactly what's missing, so you can fix it before you hit submit instead of guessing after a rejection."
            media={<ScoreGaugeCard />}
          />

          <ProPanel />

          <Testimonial />

          <div className="text-center">
            <h2 className="mb-4 text-[clamp(26px,4vw,36px)] font-extrabold tracking-[-0.02em]">
              Stop guessing. Start tracking.
            </h2>
            <CtaLink to="/auth?screen=signup&role=candidate" className="rounded-xl px-6 py-3.5 text-[15px]">
              Get started free
            </CtaLink>
          </div>
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
