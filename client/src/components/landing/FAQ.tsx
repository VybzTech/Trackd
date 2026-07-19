import { FAQ_DATA } from '../../lib/landingData'
import { ChevronDownIcon } from './icons'

interface FAQProps {
  openIndex: number | null
  onToggle: (index: number) => void
}

export default function FAQ({ openIndex, onToggle }: FAQProps) {
  return (
    <section
      id="faq"
      className="mx-auto max-w-[800px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mb-10 text-center [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          FAQ
        </div>
        <h2 className="text-[clamp(26px,3.6vw,36px)] font-extrabold tracking-[-0.02em]">Questions, answered.</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {FAQ_DATA.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.q} className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => onToggle(i)}
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
                  <p className="px-5 pb-[18px] text-sm leading-[1.6]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
