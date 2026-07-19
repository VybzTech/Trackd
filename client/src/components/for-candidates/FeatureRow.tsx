import type { ReactNode } from 'react'

interface FeatureRowProps {
  icon: ReactNode
  title: string
  body: string
  media: ReactNode
  /**
   * When true the media renders first in the DOM and the row uses
   * flex-wrap-reverse (matching the source's alternating rows). On narrow
   * screens this keeps the text block stacked above the media in every row.
   */
  mediaFirst?: boolean
}

function IconChip({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
    >
      {children}
    </div>
  )
}

function TextBlock({ icon, title, body }: Pick<FeatureRowProps, 'icon' | 'title' | 'body'>) {
  return (
    <div className="min-w-[280px] flex-[1_1_380px] [animation:revealUp_.6s_ease-out_both]">
      <IconChip>{icon}</IconChip>
      <h2 className="mb-2.5 text-2xl font-extrabold tracking-[-0.01em]">{title}</h2>
      <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
        {body}
      </p>
    </div>
  )
}

export default function FeatureRow({ icon, title, body, media, mediaFirst = false }: FeatureRowProps) {
  const text = <TextBlock icon={icon} title={title} body={body} />

  return (
    <div className={`flex items-center gap-9 ${mediaFirst ? 'flex-wrap-reverse' : 'flex-wrap'}`}>
      {mediaFirst ? (
        <>
          {media}
          {text}
        </>
      ) : (
        <>
          {text}
          {media}
        </>
      )}
    </div>
  )
}
