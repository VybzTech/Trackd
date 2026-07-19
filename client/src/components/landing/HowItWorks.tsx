import { FLOW_STEPS } from '../../lib/landingData'

export default function HowItWorks() {
  return (
    <section
      id="product"
      className="mx-auto max-w-[1180px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mx-auto mb-14 max-w-[640px] text-center [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          How it works
        </div>
        <h2 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
          From link to offer, one spine.
        </h2>
        <p className="text-base leading-[1.6]" style={{ color: 'var(--text-2)' }}>
          One structured record. Both sides of the hire read and write to it.
        </p>
      </div>
      <div className="relative flex flex-wrap justify-between gap-7">
        <div
          className="absolute left-[6%] right-[6%] top-[22px] z-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border-glass) 15%, var(--border-glass) 85%, transparent)' }}
        />
        {FLOW_STEPS.map((step) => (
          <div key={step.num} className="relative z-[1] min-w-[150px] flex-[1_1_170px] [animation:revealUp_.6s_ease-out_both]">
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-[13px] font-bold"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
            >
              {step.num}
            </div>
            <h3 className="mb-2 text-[16.5px] font-bold">{step.title}</h3>
            <p className="text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
