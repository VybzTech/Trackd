import { useState } from 'react'
import MinimalHeader from '../components/landing/MinimalHeader'
import MinimalFooter from '../components/landing/MinimalFooter'
import { ChevronDownIcon } from '../components/landing/icons'
import { CATEGORIES } from '../components/faq/faqData'
import { useTheme } from '../hooks/useTheme'

// Sticky offsets diverge from the prototype: the source page had a NON-sticky
// header so its quick-nav stuck at top:0. Our shared MinimalHeader is sticky
// (top-0, z-60, ~63px tall), so the quick-nav sticks just below it and section
// scroll targets are offset to clear header + nav (prototype used 80px).
const HEADER_HEIGHT = 63
const SCROLL_MARGIN_TOP = 125

export default function FAQPage() {
  const { theme, toggleTheme } = useTheme()
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <MinimalHeader
        theme={theme}
        toggleTheme={toggleTheme}
        showBackLink
        showSignIn
        cta={{ label: 'Get started', to: '/auth?screen=signup' }}
      />

      <main className="mx-auto max-w-[820px] px-[clamp(20px,5vw,32px)] pb-[100px] pt-[clamp(48px,8vw,88px)]">
        {/* Hero */}
        <div className="relative mb-14 text-center [animation:revealUp_.5s_ease-out_both]">
          <div
            className="pointer-events-none absolute -inset-x-[20%] -top-[30%] bottom-auto h-[280px] opacity-50 blur-[50px] [animation:auroraShift_16s_ease-in-out_infinite] [background-size:200%_200%]"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 30%, color-mix(in srgb, var(--brand) 40%, transparent), transparent 70%)',
            }}
          />
          <div className="relative">
            <div
              className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
              style={{ color: 'var(--glow-top)' }}
            >
              Help center
            </div>
            <h1
              className="mb-3.5 text-[clamp(32px,5vw,48px)] font-extrabold tracking-[-0.02em]"
              style={{ textWrap: 'pretty' }}
            >
              Frequently asked questions.
            </h1>
            <p className="mx-auto max-w-[520px] text-base leading-[1.6]" style={{ color: 'var(--text-2)' }}>
              Everything on how Trackd works, what we do with your data, and how billing and support operate.
            </p>
          </div>
        </div>

        {/* Sticky category quick-nav */}
        <nav
          className="sticky z-[5] mb-11 flex flex-wrap justify-center gap-2 py-3.5"
          style={{
            top: HEADER_HEIGHT,
            background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-150"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-glass)'
                e.currentTarget.style.color = 'var(--glow-top)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-2)'
              }}
            >
              {cat.label}
            </a>
          ))}
        </nav>

        {/* Category sections */}
        {CATEGORIES.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className="mb-12"
            style={{ scrollMarginTop: SCROLL_MARGIN_TOP }}
          >
            <h2
              className="mb-4 text-xl font-extrabold tracking-[-0.01em]"
              style={{ color: 'var(--glow-top)' }}
            >
              {cat.label}
            </h2>
            <div className="flex flex-col gap-2.5">
              {cat.items.map((item, i) => {
                const key = `${cat.id}-${i}`
                const open = openKey === key
                return (
                  <div
                    key={key}
                    className="overflow-hidden rounded-xl border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <button
                      onClick={() => setOpenKey((prev) => (prev === key ? null : key))}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-5 py-[18px] text-left"
                    >
                      <span className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
                        {item.q}
                      </span>
                      <span
                        className="flex shrink-0 transition-transform duration-150"
                        style={{ color: 'var(--text-3)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <ChevronDownIcon />
                      </span>
                    </button>
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out"
                      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                    >
                      <div className="min-h-0">
                        <p
                          className="px-5 pb-[18px] text-sm leading-[1.6]"
                          style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* Still have questions? contact CTA */}
        <div
          className="mt-5 rounded-2xl border p-7 text-center"
          style={{ borderColor: 'var(--border-glass)', background: 'var(--surface-alt)' }}
        >
          <h3 className="mb-2 text-[17px] font-bold">Still have questions?</h3>
          <p className="mb-[18px] text-[13.5px]" style={{ color: 'var(--text-3)' }}>
            Our team replies within one business day.
          </p>
          <a
            href="/#contact"
            className="inline-block rounded-[10px] border border-white/22 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand-2)_85%,white_15%),var(--brand-2)_45%,var(--brand)_100%)] px-[22px] py-[11px] text-[13.5px] font-semibold text-white"
          >
            Contact support
          </a>
        </div>
      </main>

      <MinimalFooter links={[{ label: 'Privacy Policy', to: '/privacy' }]} />
    </div>
  )
}
