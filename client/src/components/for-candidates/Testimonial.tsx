export default function Testimonial() {
  return (
    <div
      className="rounded-2xl border p-6 [animation:revealUp_.6s_ease-out_both]"
      style={{ borderColor: 'var(--border)' }}
    >
      <p
        className="mb-3.5 text-[15px] leading-[1.6]"
        style={{ color: 'var(--text-2)', textWrap: 'pretty' }}
      >
        "I stopped losing track of applications the day I started using Trackd. The compatibility
        score alone saved me a dozen rewrites."
      </p>
      <div className="flex items-center gap-2.5">
        <div
          className="h-[30px] w-[30px] rounded-full border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)' }}
        />
        <span className="font-mono text-[12.5px]" style={{ color: 'var(--text-3)' }}>
          Early candidate, Trackd beta
        </span>
      </div>
    </div>
  )
}
