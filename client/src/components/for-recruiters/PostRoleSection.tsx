import { LinkIcon, DocIcon } from './icons'

const structuredTags = ['Work output', 'Attitude', 'Culture fit', '+3 more']

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border"
      style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
    >
      {children}
    </div>
  )
}

export default function PostRoleSection() {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-[560px] text-center [animation:revealUp_.6s_ease-out_both]">
        <h2 className="mb-3 text-[clamp(24px,3.6vw,32px)] font-extrabold tracking-[-0.01em]" style={{ textWrap: 'pretty' }}>
          Two ways to post a role.
        </h2>
        <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
          Already have the listing somewhere? Link it. Starting from scratch? Fill in the structured
          form — either way it lands in Job Openings, ready to receive applicants.
        </p>
      </div>

      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        <div
          className="rounded-2xl border p-6 [animation:revealUp_.6s_ease-out_both]"
          style={{ borderColor: 'var(--border)' }}
        >
          <CardIcon>
            <LinkIcon />
          </CardIcon>
          <h3 className="mb-2 text-[17px] font-bold">Paste a link</h3>
          <p className="text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
            Already hosted on your career page, a job board, or even a Google Form? Paste the URL and
            Trackd keeps it discoverable and scoreable without duplicating your workflow.
          </p>
        </div>

        <div
          className="rounded-2xl border p-6 [animation:revealUp_.6s_ease-out_both]"
          style={{ borderColor: 'var(--border)' }}
        >
          <CardIcon>
            <DocIcon />
          </CardIcon>
          <h3 className="mb-2 text-[17px] font-bold">Full structured posting</h3>
          <p className="mb-3.5 text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
            Fill in comp, stack, and — critically — the signals that drive better matches: years of
            experience, seniority, and what you actually value in a hire.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {structuredTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2.5 py-[5px] text-[11px]"
                style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--text-2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
