import { Link } from 'react-router-dom'

const primaryCta = {
  border: '1px solid rgba(255,255,255,0.22)',
  background:
    'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 20px rgba(15,82,186,0.3)',
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-[clamp(20px,5vw,32px)] pb-[clamp(48px,7vw,72px)] pt-[clamp(56px,9vw,90px)] text-center">
      <div
        className="pointer-events-none absolute inset-x-[-10%] top-[-20%] h-[460px]"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 25%, color-mix(in srgb, var(--brand) 45%, transparent), transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'auroraShift 16s ease-in-out infinite',
          filter: 'blur(60px)',
          opacity: 0.5,
        }}
      />
      <div className="relative mx-auto max-w-[680px] [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3.5 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          For recruiters
        </div>
        <h1
          className="mb-[18px] text-[clamp(32px,5.5vw,54px)] font-extrabold leading-[1.06] tracking-[-0.03em]"
          style={{ textWrap: 'pretty' }}
        >
          Signal, not noise.
        </h1>
        <p
          className="mx-auto mb-[30px] max-w-[520px] text-[16.5px] leading-[1.6]"
          style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
        >
          See every applicant the way you'd want to be seen — pre-vetted, scored, and searchable,
          without touching your ATS.
        </p>
        <Link
          to="/auth?screen=signup&role=recruiter"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-transform duration-150 ease-out hover:-translate-y-0.5"
          style={primaryCta}
        >
          Start hiring
        </Link>
      </div>
    </section>
  )
}
