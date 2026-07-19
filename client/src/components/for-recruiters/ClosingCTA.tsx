import { Link } from 'react-router-dom'

const primaryCta = {
  border: '1px solid rgba(255,255,255,0.22)',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(15,82,186,0.3)',
}

export default function ClosingCTA() {
  return (
    <div className="text-center">
      <h2 className="mb-2.5 text-[clamp(26px,4vw,36px)] font-extrabold tracking-[-0.02em]">
        Hiring at scale?
      </h2>
      <p className="mb-6 text-[15px]" style={{ color: 'var(--text-2)' }}>
        Workspace pricing scales with seats and hiring volume.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/auth?screen=signup&role=recruiter"
          className="inline-block rounded-xl px-[26px] py-[13px] text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5"
          style={primaryCta}
        >
          Start hiring
        </Link>
        <Link
          to="/#contact"
          className="inline-flex items-center rounded-xl border px-[26px] py-[13px] text-[15px] font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5"
          style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          Talk to sales →
        </Link>
      </div>
    </div>
  )
}
