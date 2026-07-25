import CtaLink from './CtaLink'
import { PRO_FEATURES } from './data'

export default function ProPanel() {
  return (
    <div
      className="rounded-[20px] border p-[clamp(28px,4vw,44px)] [animation:revealUp_.6s_ease-out_both]"
      style={{ borderColor: 'var(--border-glass)', background: 'var(--surface-alt)' }}
    >
      <div className="mx-auto mb-8 max-w-[560px] text-center">
        <div
          className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          Trackd Pro
        </div>
        <h2
          className="mb-3 text-[clamp(24px,3.6vw,32px)] font-extrabold tracking-[-0.01em]"
          style={{ textWrap: 'pretty' }}
        >
          The edge, when it matters most.
        </h2>
        <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
          Insights turns your history into a coach — not just a tracker.
        </p>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {PRO_FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-[14px] border p-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <h3 className="mb-1.5 text-[14.5px] font-bold">{f.title}</h3>
            <p className="text-[13px] leading-[1.5]" style={{ color: 'var(--text-3)' }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 text-center">
        <CtaLink to="/#pricing" className="rounded-xl px-6 py-3 text-sm" shadow={false}>
          See Pro plan
        </CtaLink>
      </div>
    </div>
  )
}
