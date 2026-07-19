import { APPLICANT_DATA, RECRUITER_BULLETS } from '../../lib/landingData'
import type { RecruiterBulletIcon } from '../../lib/landingData'
import { NexusIcon, SearchIcon, SyncIcon, CheckIcon } from './icons'

const bulletIcons: Record<RecruiterBulletIcon, React.ComponentType<{ size?: number; className?: string }>> = {
  search: SearchIcon,
  sync: SyncIcon,
  status: CheckIcon,
  nexus: NexusIcon,
}

export default function ForRecruiters() {
  return (
    <section
      id="recruiters"
      className="mx-auto max-w-[1180px] border-t px-[clamp(20px,5vw,32px)] py-[clamp(60px,9vw,100px)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="mb-11 max-w-[560px] [animation:revealUp_.6s_ease-out_both]">
        <div
          className="mb-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.06em]"
          style={{ color: 'var(--glow-top)' }}
        >
          For recruiters
        </div>
        <h2 className="mb-3 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em]" style={{ textWrap: 'pretty' }}>
          Signal, not noise.
        </h2>
        <p className="text-base leading-[1.6]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
          See every applicant the way you'd want to be seen — pre-vetted, scored, and searchable,
          without touching your ATS.
        </p>
      </div>

      <div className="flex flex-wrap gap-7">
        <div
          className="min-w-[300px] flex-[2_1_480px] overflow-hidden rounded-2xl border [animation:revealUp_.6s_ease-out_both]"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="flex items-center justify-between border-b px-[18px] py-3.5"
            style={{ borderColor: 'var(--border)' }}
          >
            <span
              className="font-mono text-[12.5px] font-semibold tracking-[0.04em]"
              style={{ color: 'var(--text-3)' }}
            >
              SENIOR FRONTEND ENGINEER · 47 APPLICANTS
            </span>
            <span
              className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}
            >
              <SearchIcon />
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {['Candidate', 'Match', 'Stage', 'Source'].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap border-b px-[18px] py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.04em]"
                      style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}
                    >
                      {h}
                    </th>
                  ))}
                  <th
                    className="whitespace-nowrap border-b px-[18px] py-2.5 text-right text-[11px] font-semibold uppercase tracking-[0.04em]"
                    style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {APPLICANT_DATA.map((row) => (
                  <tr
                    key={row.name}
                    className="transition-colors duration-150"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td className="border-b px-[18px] py-3" style={{ borderColor: 'var(--border)' }}>
                      <div className="font-semibold" style={{ color: 'var(--text)' }}>
                        {row.name}
                      </div>
                      <div className="text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                        {row.role}
                      </div>
                    </td>
                    <td className="min-w-[110px] border-b px-[18px] py-3" style={{ borderColor: 'var(--border)' }}>
                      <div className="mb-1 font-mono text-xs" style={{ color: 'var(--glow-top)' }}>
                        {row.match}%
                      </div>
                      <div className="h-1 w-[70px] overflow-hidden rounded-sm" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-sm" style={{ background: 'var(--glow-top)', width: `${row.match}%` }} />
                      </div>
                    </td>
                    <td
                      className="whitespace-nowrap border-b px-[18px] py-3"
                      style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}
                    >
                      {row.stage}
                    </td>
                    <td
                      className="whitespace-nowrap border-b px-[18px] py-3"
                      style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}
                    >
                      {row.source}
                    </td>
                    <td className="whitespace-nowrap border-b px-[18px] py-3 text-right" style={{ borderColor: 'var(--border)' }}>
                      <button
                        className="mr-1.5 cursor-pointer rounded-full border px-3 py-1.5 text-[11.5px] font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5"
                        style={{ borderColor: 'var(--border-glass)', background: 'linear-gradient(135deg, var(--brand), var(--brand-2))' }}
                      >
                        Interview
                      </button>
                      <button
                        className="cursor-pointer rounded-full border px-3 py-1.5 text-[11.5px] font-semibold"
                        style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}
                      >
                        Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex min-w-[280px] flex-[1_1_300px] flex-col gap-5">
          {RECRUITER_BULLETS.map((item) => {
            const Icon = bulletIcons[item.icon]
            return (
              <div key={item.title} className="flex gap-3.5 [animation:revealUp_.6s_ease-out_both]">
                <div
                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border-glass)', color: 'var(--glow-top)' }}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className="mb-1 text-[15.5px] font-bold">{item.title}</h3>
                  <p className="text-[13.5px] leading-[1.55]" style={{ color: 'var(--text-2)', textWrap: 'pretty' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
