import CtaLink from './CtaLink'

export default function CandidatesHero() {
  return (
    <section className="relative overflow-hidden px-[clamp(20px,5vw,32px)] py-[clamp(56px,9vw,90px)] pb-[clamp(48px,7vw,72px)] text-center">
      {/* Aurora glow */}
      <div
        className="pointer-events-none absolute inset-x-[-10%] top-[-20%] h-[460px] opacity-50 [animation:auroraShift_16s_ease-in-out_infinite] [background-size:200%_200%] blur-[60px]"
        style={{
          background:
            'radial-gradient(55% 55% at 50% 25%, color-mix(in srgb, var(--brand) 45%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[680px] [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3.5 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          For candidates
        </div>
        <h1
          className="mb-[18px] text-[clamp(32px,5.5vw,54px)] font-extrabold leading-[1.06] tracking-[-0.03em]"
          style={{ textWrap: 'pretty' }}
        >
          Your job search, finally structured.
        </h1>
        <p
          className="mx-auto mb-[30px] max-w-[520px] text-[16.5px] leading-[1.6]"
          style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
        >
          Stop copy-pasting into spreadsheets. Trackd turns raw job posts into a living pipeline,
          scores your fit before you apply, and tells you exactly what to fix.
        </p>
        <CtaLink to="/auth?screen=signup&role=candidate" className="rounded-xl px-[26px] py-[13px] text-[15px]">
          Get started free
        </CtaLink>
        <p className="mt-3.5 font-mono text-[12.5px]" style={{ color: 'var(--text-3)' }}>
          Free forever · No credit card
        </p>
      </div>
    </section>
  )
}
