import { PRICING_FREE_FEATURES, PRICING_PRO_FEATURES, PRO_ANNUAL_PRICE, PRO_MONTHLY_PRICE } from '../../lib/landingData'
import { CheckIcon } from './icons'
import { PrimaryButton, SecondaryButton } from './Buttons'

interface PricingProps {
  annual: boolean
  onToggle: () => void
  onGetStarted: () => void
}

export default function Pricing({ annual, onToggle, onGetStarted }: PricingProps) {
  const proPrice = annual ? PRO_ANNUAL_PRICE : PRO_MONTHLY_PRICE
  const proNote = annual ? 'Billed annually' : 'For candidates who want the edge'

  return (
    <section
      id="pricing"
      className="mx-auto max-w-[1180px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mx-auto mb-10 max-w-[560px] text-center [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          Pricing
        </div>
        <h2 className="mb-3.5 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
          Free to start. Pro when you need the edge.
        </h2>
        <div className="mt-2 inline-flex items-center gap-2.5 rounded-full border p-[5px]" style={{ borderColor: 'var(--border)' }}>
          <span
            className="rounded-full px-3.5 py-[7px] text-[13px] font-semibold"
            style={{ color: annual ? 'var(--text-3)' : 'var(--text)' }}
          >
            Monthly
          </span>
          <button
            onClick={onToggle}
            aria-label="Toggle billing"
            className="relative h-6 w-[42px] cursor-pointer rounded-full border"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)' }}
          >
            <span
              className="absolute top-0.5 h-[18px] w-[18px] rounded-full transition-[left] duration-150"
              style={{ left: annual ? '20px' : '2px', background: 'var(--glow-top)' }}
            />
          </button>
          <span
            className="rounded-full px-3.5 py-[7px] text-[13px] font-semibold"
            style={{ color: annual ? 'var(--text)' : 'var(--text-3)' }}
          >
            Annual <span style={{ color: 'var(--glow-top)' }}>−20%</span>
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[820px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div
          className="rounded-[18px] border p-8 transition-transform duration-150 ease-out [animation:revealUp_.6s_ease-out_both] hover:-translate-y-0.5"
          style={{ borderColor: 'var(--border)' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-glass)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <h3 className="mb-1.5 text-base font-bold" style={{ color: 'var(--text-2)' }}>
            Free
          </h3>
          <div className="mb-1.5 flex items-baseline gap-1">
            <span className="text-[40px] font-extrabold">$0</span>
            <span className="text-[13px]" style={{ color: 'var(--text-3)' }}>
              /mo
            </span>
          </div>
          <p className="mb-6 text-[13.5px]" style={{ color: 'var(--text-3)' }}>
            For candidates getting started
          </p>
          <SecondaryButton onClick={onGetStarted} className="mb-6 w-full">
            Get started free
          </SecondaryButton>
          {PRICING_FREE_FEATURES.map((f) => (
            <div key={f} className="mb-3 flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0" style={{ color: 'var(--glow-top)' }}>
                <CheckIcon size={15} />
              </span>
              <span className="text-[13.5px] leading-[1.4]" style={{ color: 'var(--text-2)' }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        <div
          className="relative rounded-[18px] border p-8 transition-transform duration-150 ease-out [animation:revealUp_.6s_ease-out_both] hover:-translate-y-0.5"
          style={{ borderColor: 'var(--border-glass)', background: 'var(--surface-alt)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="absolute -top-3 right-7 rounded-full px-3 py-[5px] text-[11px] font-bold tracking-[0.03em] text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-2))' }}
          >
            MOST POPULAR
          </div>
          <h3 className="mb-1.5 text-base font-bold" style={{ color: 'var(--glow-top)' }}>
            Pro
          </h3>
          <div className="mb-1.5 flex items-baseline gap-1">
            <span className="text-[40px] font-extrabold">${proPrice}</span>
            <span className="text-[13px]" style={{ color: 'var(--text-3)' }}>
              /mo
            </span>
          </div>
          <p className="mb-6 text-[13.5px]" style={{ color: 'var(--text-3)' }}>
            {proNote}
          </p>
          <PrimaryButton onClick={onGetStarted} className="mb-6 w-full">
            Go Pro
          </PrimaryButton>
          {PRICING_PRO_FEATURES.map((f) => (
            <div key={f} className="mb-3 flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0" style={{ color: 'var(--glow-top)' }}>
                <CheckIcon size={15} />
              </span>
              <span className="text-[13.5px] leading-[1.4]" style={{ color: 'var(--text-2)' }}>
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-7 text-center text-[13px]" style={{ color: 'var(--text-3)' }}>
        Hiring at scale?{' '}
        <a href="#recruiters" style={{ color: 'var(--glow-top)' }}>
          Recruiter workspace pricing →
        </a>
      </p>
    </section>
  )
}
