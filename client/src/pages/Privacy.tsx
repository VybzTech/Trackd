import { useEffect, useState, type CSSProperties } from 'react'
import { useTheme } from '../hooks/useTheme'
import MinimalHeader from '../components/landing/MinimalHeader'
import MinimalFooter from '../components/landing/MinimalFooter'

interface TocSection {
  id: string
  label: string
}

// Verbatim from the source `SECTIONS` array (TOC labels differ from the
// section <h2> headings by design).
const SECTIONS: TocSection[] = [
  { id: 'commitment', label: 'Our commitment' },
  { id: 'collect', label: 'Information we collect' },
  { id: 'use', label: 'How we use it' },
  { id: 'candidate-privacy', label: 'Candidate privacy' },
  { id: 'recruiter-privacy', label: 'Recruiter privacy' },
  { id: 'sharing', label: 'Sharing & third parties' },
  { id: 'security', label: 'Security practices' },
  { id: 'rights', label: 'Your rights' },
  { id: 'retention', label: 'Data retention' },
  { id: 'children', label: "Children's privacy" },
  { id: 'changes', label: 'Policy changes' },
  { id: 'contact', label: 'Contact us' },
]

const sectionStyle: CSSProperties = { marginBottom: '40px', scrollMarginTop: '24px' }
const h2Style: CSSProperties = { fontSize: '20px', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '12px' }
const bodyStyle: CSSProperties = { fontSize: '14.5px', color: 'var(--text-2)', lineHeight: 1.7, textWrap: 'pretty' }
const listItemStyle: CSSProperties = { fontSize: '14.5px', color: 'var(--text-2)', lineHeight: 1.6 }
const strongStyle: CSSProperties = { color: 'var(--text)' }

export default function Privacy() {
  const { theme, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('commitment')

  // Mobile detection — matches the source's `window.innerWidth <= 860` resize listener.
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Scroll-spy — mirrors the source IntersectionObserver config.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const tocStyle: CSSProperties = isMobile
    ? { display: 'none' }
    : { position: 'sticky', top: '24px', width: '220px', flexShrink: 0 }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative' }}>
      <MinimalHeader theme={theme} toggleTheme={toggleTheme} showBackLink />

      {/* Hero */}
      <div
        style={{
          position: 'relative',
          padding: 'clamp(48px,8vw,72px) clamp(20px,5vw,32px) 20px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="pointer-events-none"
          style={{
            position: 'absolute',
            inset: '-30% -20% auto',
            height: '280px',
            background:
              'radial-gradient(50% 50% at 50% 30%, color-mix(in srgb, var(--brand) 40%, transparent), transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'auroraShift 16s ease-in-out infinite',
            filter: 'blur(50px)',
            opacity: 0.5,
          }}
        />
        <div style={{ position: 'relative', animation: 'revealUp .5s ease-out both' }}>
          <div
            className="font-mono"
            style={{
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--glow-top)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Legal
          </div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Privacy Policy
          </h1>
          <p className="font-mono" style={{ fontSize: '13.5px', color: 'var(--text-3)' }}>
            Last updated July 1, 2026
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '20px clamp(20px,5vw,32px) 100px',
          display: 'flex',
          gap: '56px',
          alignItems: 'flex-start',
        }}
      >
        {/* Sticky TOC (hidden on mobile) */}
        <nav style={tocStyle}>
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 600,
              color: 'var(--text-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            On this page
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {SECTIONS.map((s) => {
              const active = activeSection === s.id
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    fontSize: '13px',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'var(--glow-top)' : 'var(--text-3)',
                    background: active ? 'var(--surface-alt)' : 'transparent',
                    transition: 'all .15s ease-out',
                  }}
                >
                  {s.label}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, maxWidth: '640px' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '36px', textWrap: 'pretty' }}>
            Trackd exists to give candidates and recruiters one honest, structured record of a hire. That only works if you
            trust us with your data — this page explains exactly what we collect, why, and how you stay in control of it.
          </p>

          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Team collaborating around a laptop"
            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '44px' }}
          />

          <section id="commitment" style={sectionStyle}>
            <h2 style={h2Style}>1. Our commitment</h2>
            <p style={bodyStyle}>
              We collect only what's needed to structure your applications, score compatibility, and keep the marketplace
              trustworthy — never to sell to advertisers. Candidate and recruiter data are kept in separate,
              permission-scoped workspaces.
            </p>
          </section>

          <section id="collect" style={sectionStyle}>
            <h2 style={h2Style}>2. Information we collect</h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>Depending on your role, we collect:</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', listStyle: 'disc' }}>
              <li style={listItemStyle}>
                <strong style={strongStyle}>Candidates:</strong> resume content, work history, skills, job preferences, saved
                and submitted applications, and ingestion sources (pasted links/text, extension captures).
              </li>
              <li style={listItemStyle}>
                <strong style={strongStyle}>Recruiters:</strong> company and team details, job postings, and applicant review
                activity within your workspace.
              </li>
              <li style={listItemStyle}>
                <strong style={strongStyle}>Everyone:</strong> account credentials, device and usage data, and support
                communications.
              </li>
            </ul>
          </section>

          <section id="use" style={sectionStyle}>
            <h2 style={h2Style}>3. How we use your information</h2>
            <p style={bodyStyle}>
              We use your data to structure job postings, compute compatibility and ATS scores, generate AI resume and cover
              letter suggestions, operate the pipeline views, prevent fraud and abuse, and improve the matching models —
              never to build advertising profiles.
            </p>
          </section>

          <section id="candidate-privacy" style={sectionStyle}>
            <h2 style={h2Style}>4. Candidate privacy</h2>
            <p style={bodyStyle}>
              A recruiter only ever sees applications you explicitly submit to one of their postings — never your saved jobs,
              other applications, notes, or compatibility scores for roles you haven't applied to. Your resume is never
              shared with a third party for purposes outside scoring and matching.
            </p>
          </section>

          <section id="recruiter-privacy" style={sectionStyle}>
            <h2 style={h2Style}>5. Recruiter &amp; company privacy</h2>
            <p style={bodyStyle}>
              Workspace data — postings, pipeline notes, teammate activity — is isolated to your company account. Trackd's
              platform admins can access workspace data only for security investigations, abuse moderation, or at your
              explicit support request.
            </p>
          </section>

          <section id="sharing" style={sectionStyle}>
            <h2 style={h2Style}>6. Data sharing &amp; third parties</h2>
            <p style={bodyStyle}>
              We share limited data with vetted sub-processors that keep Trackd running — cloud hosting, email delivery, and
              product analytics — each bound by a data processing agreement. We do not sell personal data, and never share
              candidate data with recruiters outside submitted applications.
            </p>
          </section>

          <section id="security" style={sectionStyle}>
            <h2 style={{ ...h2Style, marginBottom: '16px' }}>7. Security practices</h2>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Encrypted code on a screen"
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '16px' }}
            />
            <p style={bodyStyle}>
              Data is encrypted in transit and at rest. Access to production systems is role-based and logged, and our
              moderation team continuously monitors for account takeover, fraudulent postings, and scraping.
            </p>
          </section>

          <section id="rights" style={sectionStyle}>
            <h2 style={h2Style}>8. Your rights &amp; choices</h2>
            <p style={bodyStyle}>
              You can access, export, correct, or delete your data at any time from Settings. Where local law grants
              additional rights (e.g. GDPR, CCPA), we honor those in full — contact privacy@trackd.io to exercise them.
            </p>
          </section>

          <section id="retention" style={sectionStyle}>
            <h2 style={h2Style}>9. Data retention</h2>
            <p style={bodyStyle}>
              We retain account data for as long as it's active. After you request deletion, data is removed from production
              within 30 days and from backups within 90, except where we're legally required to retain records longer.
            </p>
          </section>

          <section id="children" style={sectionStyle}>
            <h2 style={h2Style}>10. Children's privacy</h2>
            <p style={bodyStyle}>
              Trackd is not directed at anyone under 16, and we do not knowingly collect data from children. If you believe a
              minor has created an account, contact us and we'll remove it.
            </p>
          </section>

          <section id="changes" style={sectionStyle}>
            <h2 style={h2Style}>11. Changes to this policy</h2>
            <p style={bodyStyle}>
              We'll post material changes here with an updated date, and notify account holders by email for changes that
              materially affect how we handle your data.
            </p>
          </section>

          <section id="contact" style={{ scrollMarginTop: '24px' }}>
            <h2 style={h2Style}>12. Contact us</h2>
            <p style={{ ...bodyStyle, marginBottom: '20px' }}>
              Questions about this policy or a specific request? Reach our privacy team directly.
            </p>
            <a
              href="mailto:privacy@trackd.io"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.22)',
                background:
                  'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '13.5px',
              }}
            >
              privacy@trackd.io
            </a>
          </section>
        </main>
      </div>

      <MinimalFooter links={[{ label: 'FAQ', to: '/faq' }]} />
    </div>
  )
}
