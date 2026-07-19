import { Link } from 'react-router-dom'

const linkClasses = 'text-[13.5px] transition-colors duration-150'
const linkStyle = { color: 'var(--text-2)' }
const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--glow-top)')
const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--text-2)')

export default function Footer() {
  return (
    <footer className="border-t px-[clamp(20px,5vw,32px)] pb-7 pt-12" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto mb-9 flex max-w-[1180px] flex-wrap justify-between gap-10">
        <div className="max-w-[340px] flex-[1_1_280px]">
          <div className="mb-3 flex items-baseline gap-px text-xl font-extrabold">
            Trackd<span style={{ color: 'var(--glow-top)' }}>.</span>
          </div>
          <p className="text-[13.5px] leading-[1.6]" style={{ color: 'var(--text-3)' }}>
            The autonomous career engine for candidates and recruiters — one data spine, both
            sides of the hire.
          </p>
        </div>
        <div className="flex flex-wrap gap-14">
          <div>
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
              Product
            </div>
            <div className="flex flex-col gap-2.5">
              <Link to="/for-candidates" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                For candidates
              </Link>
              <Link to="/for-recruiters" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                For recruiters
              </Link>
              <a href="#pricing" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                Pricing
              </a>
            </div>
          </div>
          <div>
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
              Company
            </div>
            <div className="flex flex-col gap-2.5">
              <Link to="/faq" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                FAQ
              </Link>
              <Link to="/privacy" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                Privacy Policy
              </Link>
              <a href="#contact" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                Contact
              </a>
              <a href="#top" className={linkClasses} style={linkStyle} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto max-w-[1180px] border-t pt-5 text-xs"
        style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}
      >
        © 2026 Trackd. All rights reserved.
      </div>
    </footer>
  )
}
