const LEFT_BULLETS = [
  'Structured pipeline, synced across Kanban, table & calendar',
  'Compatibility scoring before you ever hit submit',
  'ATS-ready resume edits in one click',
]

/** Left decorative panel (hidden on mobile in the source via showLeftPanel). */
export default function DecorativePanel() {
  return (
    <div
      className="relative flex min-h-0 max-w-[520px] shrink-0 grow-0 basis-[42%] flex-col justify-between gap-8 overflow-y-auto border-r p-11 px-11 py-12"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Aurora glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          inset: '-10%',
          background:
            'radial-gradient(55% 55% at 25% 20%, color-mix(in srgb, var(--brand) 45%, transparent), transparent 70%), radial-gradient(50% 50% at 85% 75%, color-mix(in srgb, var(--glow-top) 28%, transparent), transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'auroraShift 18s ease-in-out infinite',
          filter: 'blur(50px)',
          opacity: 0.6,
        }}
      />
      {/* Drifting dots */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '22%',
          right: '14%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--glow-top)',
          opacity: 0.5,
          animation: 'driftXY 8s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: '60%',
          left: '10%',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1px solid var(--border-glass)',
          opacity: 0.5,
          animation: 'driftXY 10s ease-in-out infinite .5s',
        }}
      />

      <div className="relative">
        <div
          className="mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11.5px]"
          style={{ borderColor: 'var(--border-glass)', color: 'var(--text-2)' }}
        >
          <span
            className="shrink-0 rounded-full"
            style={{ width: '6px', height: '6px', background: 'var(--energy)' }}
          />
          AUTONOMOUS CAREER ENGINE
        </div>
        <h1
          className="mb-7 font-extrabold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(28px,3.6vw,38px)', lineHeight: 1.12, textWrap: 'pretty' }}
        >
          Track everything.
          <br />
          Miss nothing.
        </h1>
        <div className="flex flex-col gap-4">
          {LEFT_BULLETS.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--glow-top)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
              >
                <path d="m5 12 5 5 9-11" />
              </svg>
              <span className="text-sm leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative rounded-[14px] border p-[18px]"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)' }}
      >
        <p
          className="mb-3 text-[13.5px] leading-[1.6]"
          style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
        >
          "I stopped losing track of applications the day I started using Trackd. The compatibility
          score alone saved me a dozen rewrites."
        </p>
        <div className="flex items-center gap-2">
          <div
            className="shrink-0 rounded-full"
            style={{
              width: '26px',
              height: '26px',
              background: 'var(--surface)',
              border: '1px solid var(--border-glass)',
            }}
          />
          <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            Early candidate, Trackd beta
          </span>
        </div>
      </div>
    </div>
  )
}
