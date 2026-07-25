import { PrimaryButton, SecondaryButton } from './Buttons'

interface FinalCTAProps {
  onGetStarted: () => void
  onImHiring: () => void
}

export default function FinalCTA({ onGetStarted, onImHiring }: FinalCTAProps) {
  return (
    <section
      className="relative overflow-hidden border-t px-[clamp(20px,5vw,32px)] py-[clamp(70px,10vw,110px)] text-center"
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="pointer-events-none absolute -inset-x-[10%] top-auto -bottom-[60%] h-[420px] opacity-60 blur-[60px]"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--glow-mid) 40%, transparent), transparent 72%)' }}
      />
      <div className="relative mx-auto max-w-[640px] [animation:revealUp_.6s_ease-out_both]">
        <h2 className="mb-4 text-[clamp(30px,5vw,48px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
          Stop guessing. Start tracking.
        </h2>
        <p className="mb-8 text-base" style={{ color: 'var(--text-2)' }}>
          Two minutes to set up. Free for candidates, forever.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton onClick={onGetStarted}>Get started free</PrimaryButton>
          <SecondaryButton onClick={onImHiring}>I'm hiring →</SecondaryButton>
        </div>
      </div>
    </section>
  )
}
