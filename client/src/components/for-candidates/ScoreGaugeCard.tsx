export default function ScoreGaugeCard() {
  return (
    <div
      className="flex min-w-[280px] flex-[1_1_380px] items-center justify-center rounded-2xl border p-[26px] [animation:revealUp_.6s_ease-out_both]"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Static illustrative compatibility gauge (non-interactive) */}
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth={9} />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="var(--glow-top)"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={314}
          strokeDashoffset={47}
        />
      </svg>
    </div>
  )
}
