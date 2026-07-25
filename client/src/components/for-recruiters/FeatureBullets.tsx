import { BULLETS } from './data'

export default function FeatureBullets() {
  return (
    <div className="flex flex-wrap gap-7">
      {BULLETS.map(({ title, desc, Icon }) => (
        <div
          key={title}
          className="flex min-w-[220px] flex-[1_1_220px] gap-3.5 [animation:revealUp_.6s_ease-out_both]"
        >
          <div
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] border"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
          >
            <Icon />
          </div>
          <div>
            <h3 className="mb-1 text-[15.5px] font-bold">{title}</h3>
            <p className="text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
