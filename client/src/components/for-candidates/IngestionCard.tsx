const shimmerClass =
  'h-2 rounded-[3px] [animation:shimmerSweep_2.2s_linear_infinite] [background-size:300%_100%]'
const shimmerStyle = { background: 'linear-gradient(90deg, var(--border), var(--border-glass), var(--border))' }

const TAGS = ['Staff Engineer', '$170–210k', 'Extension capture']

export default function IngestionCard() {
  return (
    <div
      className="min-w-[280px] flex-[1_1_380px] rounded-2xl border p-6 [animation:revealUp_.6s_ease-out_both]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mb-3.5 font-mono text-[11px] tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
        INGESTION
      </div>
      <div className="mb-3.5 rounded-[10px] border p-3.5" style={{ borderColor: 'var(--border)' }}>
        <div className={`mb-2 w-[88%] ${shimmerClass}`} style={shimmerStyle} />
        <div className={`w-[64%] ${shimmerClass} [animation-delay:.3s]`} style={shimmerStyle} />
      </div>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-[11px] py-1.5 text-[11.5px]"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--text-2)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
