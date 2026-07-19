import { useRef } from 'react'
import { KANBAN_DATA } from '../../lib/landingData'
import { PrimaryButton, SecondaryButton } from './Buttons'

interface HeroProps {
  onGetStarted: () => void
  onImHiring: () => void
}

export default function Hero({ onGetStarted, onImHiring }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const hero = heroRef.current
    const glow = glowRef.current
    if (!hero || !glow) return
    const rect = hero.getBoundingClientRect()
    const x = e.clientX - rect.left - 280
    const y = e.clientY - rect.top - 280
    glow.style.transform = `translate(${x}px, ${y}px)`
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-[clamp(20px,5vw,32px)] py-[clamp(56px,10vw,96px)] pb-[clamp(64px,8vw,100px)]"
    >
      <div
        className="pointer-events-none absolute -inset-x-[10%] top-[-10%] h-[640px] opacity-55 [animation:auroraShift_16s_ease-in-out_infinite] [background-size:200%_200%] blur-[60px]"
        style={{
          background:
            'radial-gradient(60% 60% at 30% 20%, color-mix(in srgb, var(--brand) 55%, transparent), transparent 70%), radial-gradient(50% 50% at 80% 10%, color-mix(in srgb, var(--glow-top) 35%, transparent), transparent 70%)',
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[560px] w-[560px] rounded-full opacity-70 will-change-transform"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--glow-top) 26%, transparent), transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-[8%] top-[18%] h-2.5 w-2.5 rounded-full opacity-50 [animation:driftXY_7s_ease-in-out_infinite]"
        style={{ background: 'var(--glow-top)' }}
      />
      <div
        className="pointer-events-none absolute right-[16%] top-[65%] h-1.5 w-1.5 rounded-full opacity-60 [animation:driftXY_9s_ease-in-out_infinite_1.2s]"
        style={{ background: 'var(--energy)' }}
      />
      <div
        className="pointer-events-none absolute left-[4%] top-[40%] h-9 w-9 rounded-full border opacity-50 [animation:driftXY_11s_ease-in-out_infinite_.6s]"
        style={{ borderColor: 'var(--border-glass)' }}
      />

      <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center gap-[clamp(32px,5vw,56px)]">
        <div className="min-w-[300px] flex-[1_1_480px]">
          <div
            className="mb-[22px] inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[12.5px]"
            style={{ borderColor: 'var(--border-glass)', color: 'var(--text-2)' }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full [animation:pulseRing_2s_ease-in-out_infinite]"
              style={{ background: 'var(--energy)' }}
            />
            Now live — candidates &amp; recruiters, one system
          </div>
          <h1
            className="mb-5 text-[clamp(38px,5.4vw,64px)] font-extrabold leading-[1.04] tracking-[-0.03em]"
            style={{ textWrap: 'pretty' }}
          >
            The ultimate autonomous career engine.
          </h1>
          <p
            className="mb-8 max-w-[520px] text-[clamp(16px,1.6vw,18.5px)] leading-[1.55]"
            style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
          >
            Trackd captures every opportunity, structures it into a live pipeline, and tells you
            exactly where you stand — before you hit submit.
          </p>
          <div className="mb-[18px] flex flex-wrap gap-3">
            <PrimaryButton onClick={onGetStarted}>Get started free</PrimaryButton>
            <SecondaryButton onClick={onImHiring}>
              I'm hiring <span>→</span>
            </SecondaryButton>
          </div>
          <p className="font-mono text-[12.5px]" style={{ color: 'var(--text-3)' }}>
            Free for candidates · No credit card · 2-minute setup
          </p>
        </div>

        <div className="relative min-w-[300px] flex-[1_1_420px]">
          <div
            className="relative rounded-2xl border p-[18px] [animation:revealUp_.7s_ease-out_both]"
            style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)', backdropFilter: 'blur(6px)' }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className="font-mono text-xs font-semibold tracking-[0.04em]"
                style={{ color: 'var(--text-3)' }}
              >
                PIPELINE
              </span>
              <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                4 stages · synced
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {KANBAN_DATA.map((col) => (
                <div key={col.name} className="min-w-0">
                  <div
                    className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.05em]"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {col.name}
                  </div>
                  <div className="flex flex-col gap-2">
                    {col.cards.map((card) => (
                      <div
                        key={card.title}
                        className={`rounded-lg border p-[8px_9px] ${card.active ? '[animation:floatY_4s_ease-in-out_infinite]' : ''}`}
                        style={{
                          background: 'var(--surface)',
                          borderColor: card.active ? 'var(--border-glass)' : 'var(--border)',
                          boxShadow: card.active ? '0 0 0 1px var(--border-glass) inset' : undefined,
                        }}
                      >
                        <div
                          className="mb-[3px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-semibold"
                          style={{ color: 'var(--text)' }}
                        >
                          {card.title}
                        </div>
                        <div
                          className="overflow-hidden text-ellipsis whitespace-nowrap text-[9.5px]"
                          style={{ color: 'var(--text-3)' }}
                        >
                          {card.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="absolute -bottom-[18px] -right-[14px] flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full border [animation:floatY_4s_ease-in-out_infinite] [box-shadow:0_14px_34px_rgba(0,0,0,0.35)]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)' }}
            >
              <span className="text-[19px] font-extrabold" style={{ color: 'var(--glow-top)' }}>
                92%
              </span>
              <span className="font-mono text-[8.5px]" style={{ color: 'var(--text-3)' }}>
                MATCH
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
