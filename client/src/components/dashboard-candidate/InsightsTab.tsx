import { useState } from 'react'
import {
  COVER_LETTER_DEFECTS,
  HIRED_PATTERNS,
  RESUME_DEFECTS,
  SKILL_GAP_DATA,
  STATUS_COLORS,
  STATUS_ORDER,
  defectSeverityStyle,
  type CandidateApp,
} from './data'

interface InsightsTabProps {
  apps: CandidateApp[]
  onUpgrade: () => void
}

type DocView = 'resume' | 'coverLetter'

const TREND_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function InsightsTab({ apps, onUpgrade }: InsightsTabProps) {
  const [docView, setDocView] = useState<DocView>('resume')

  const avgMatch = apps.length ? Math.round(apps.reduce((s, a) => s + a.match, 0) / apps.length) : 0
  const trendVals = [71, 74, 77, 79, 82, avgMatch]

  // Fixed status-color contract reaches every chart, not just Kanban/table —
  // the funnel is tinted per-stage with STATUS_COLORS across all 5 stages.
  const funnelStages = STATUS_ORDER.map((status) => ({
    status,
    count: apps.filter((a) => a.status === status).length,
  }))
  const funnelTotal = apps.length || 1

  const gapCounts: Record<string, number> = {}
  apps.forEach((a) => a.missing.forEach((m) => (gapCounts[m] = (gapCounts[m] || 0) + 1)))
  const gapChips = Object.entries(gapCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  const defects = docView === 'resume' ? RESUME_DEFECTS : COVER_LETTER_DEFECTS
  const atsScore = 72
  const atsDash = 138 - (atsScore / 100) * 138

  const toggleBase = 'rounded-lg px-4 py-[7px] text-[13px] font-semibold transition-colors duration-150'
  const toggleStyle = (active: boolean) =>
    active ? { background: 'var(--surface-2)', color: 'var(--text)', cursor: 'pointer' as const, border: 'none' as const } : { background: 'transparent', color: 'var(--text-3)', cursor: 'pointer' as const, border: 'none' as const }

  return (
    <div>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Insights</h2>
      <p className="mb-7 text-[14px]" style={{ color: 'var(--text-2)' }}>
        How your search is trending, and what's holding scores back.
      </p>

      <div className="mb-6 rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--border)' }}>
        <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
          Avg. compatibility, last 6 months
        </div>
        <div className="flex items-end gap-3" style={{ height: 120 }}>
          {trendVals.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                style={{
                  width: '100%',
                  maxWidth: 28,
                  height: `${v}%`,
                  borderRadius: '6px 6px 0 0',
                  background: i === trendVals.length - 1 ? 'var(--glow-top)' : 'var(--border-glass)',
                }}
              />
              <span className="text-[10.5px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                {TREND_MONTHS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[260px] flex-1 basis-72 rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-3.5 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Pipeline conversion
          </div>
          <div className="mb-3 flex gap-1.5" style={{ height: 8 }}>
            {funnelStages.map(({ status, count }) => (
              <div
                key={status}
                title={`${status}: ${count}`}
                style={{
                  flex: Math.max(6, (count / funnelTotal) * 100),
                  borderRadius: 4,
                  background: STATUS_COLORS[status],
                  opacity: 0.88,
                  transition: 'flex .3s ease-out',
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {funnelStages.map(({ status, count }) => (
              <span key={status} className="flex items-center gap-1.5 text-[11.5px]" style={{ color: 'var(--text-2)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_COLORS[status], flexShrink: 0 }} />
                {status}: {count}
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-[260px] flex-1 basis-72 rounded-2xl p-5 sm:p-6" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-3.5 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Most common gaps
          </div>
          <div className="flex flex-wrap gap-2">
            {gapChips.length === 0 && (
              <span className="text-[12.5px]" style={{ color: 'var(--text-3)' }}>
                No recorded skill gaps yet.
              </span>
            )}
            {gapChips.map(([label, count]) => (
              <span key={label} className="rounded-full px-3 py-1.5 text-[12px]" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                {label} ×{count}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Document reviewer
          </div>
          <div className="flex w-fit gap-0.5 rounded-[10px] p-[3px]" style={{ border: '1px solid var(--border)' }}>
            <button type="button" onClick={() => setDocView('resume')} className={toggleBase} style={toggleStyle(docView === 'resume')}>
              Resume
            </button>
            <button type="button" onClick={() => setDocView('coverLetter')} className={toggleBase} style={toggleStyle(docView === 'coverLetter')}>
              Cover letter
            </button>
          </div>
        </div>

        {docView === 'coverLetter' && (
          <div className="mb-4 flex flex-wrap gap-2.5">
            <button type="button" className="rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold" style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}>
              Upload your template
            </button>
            <button
              type="button"
              className="rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white"
              style={{ border: 'none', background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)', cursor: 'pointer' }}
            >
              Generate tailored letter →
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-start gap-5">
          <div className="min-w-[280px] flex-1 basis-96 rounded-2xl p-6 sm:p-8" style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
            {docView === 'resume' ? (
              <>
                <div className="mb-1 text-[19px] font-extrabold">Jordan Rivera</div>
                <div className="mb-4.5 text-[12.5px]" style={{ color: 'var(--text-3)' }}>
                  Frontend Engineer · San Francisco, CA · jordan@example.com
                </div>
                <p className="mb-4.5 text-[13px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
                  Frontend engineer with 5 years building design systems and high-traffic web apps. Focused on performance, accessibility, and developer experience.
                </p>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
                  Experience
                </div>
                <div className="mb-3.5">
                  <div className="mb-1 text-[13.5px] font-bold">
                    Senior Frontend Engineer — Acme Software <span className="font-medium" style={{ color: 'var(--text-3)' }}>· 2022–Present</span>
                  </div>
                  <ul className="flex flex-col gap-1 pl-4.5">
                    <li className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                      Led migration of the design system to React 18, cutting bundle size 30%.
                    </li>
                    <li className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                      Partnered with product to ship the onboarding redesign, improving activation 12%.
                    </li>
                  </ul>
                </div>
                <div className="mb-4.5">
                  <div className="mb-1 text-[13.5px] font-bold">
                    Frontend Engineer — Beta Labs <span className="font-medium" style={{ color: 'var(--text-3)' }}>· 2019–2022</span>
                  </div>
                  <ul className="pl-4.5">
                    <li className="text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                      Built an internal component library adopted by 6 product teams.
                    </li>
                  </ul>
                </div>
                <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
                  Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'TypeScript', 'Design Systems', 'Accessibility', 'Next.js'].map((s) => (
                    <span key={s} className="rounded-full px-2.5 py-1.5 text-[11.5px]" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[13px] leading-[1.75]" style={{ color: 'var(--text-2)' }}>
                Dear Hiring Team,
                <br />
                <br />
                I'm writing to apply for the Senior Frontend Engineer role. I've spent the last five years building design systems and performant web applications, and I'm excited about the opportunity to bring that experience to your team.
                <br />
                <br />
                In my current role at Acme Software, I led a React 18 migration that cut bundle size by 30% and partnered closely with product on an onboarding redesign that lifted activation by 12%. I'd welcome the chance to bring the same focus on craft and measurable impact here.
                <br />
                <br />
                Thank you for your consideration.
                <br />
                <br />
                Jordan Rivera
              </p>
            )}
          </div>

          <div className="min-w-[260px] flex-1 basis-72">
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
              {defects.length} issues found
            </div>
            <div className="flex flex-col gap-2.5">
              {defects.map((d) => (
                <div key={d.title} className="rounded-xl p-3.5" style={{ border: '1px solid var(--border)' }}>
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span style={defectSeverityStyle(d.severity)}>{d.severity.charAt(0).toUpperCase() + d.severity.slice(1)}</span>
                    <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>
                      {d.title}
                    </span>
                  </div>
                  <p className="mb-2.5 text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
                    {d.desc}
                  </p>
                  <button type="button" className="rounded-full px-3.5 py-2 text-[11.5px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer' }}>
                    Fix with AI →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl p-6 sm:p-8" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}>
        <div className="mx-auto mb-7 max-w-[560px] text-center">
          <div className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}>
            Trackd Pro
          </div>
          <h3 className="mb-2.5 text-[20px] font-extrabold sm:text-[26px]">Unlock deeper insights.</h3>
          <p className="text-[13.5px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
            See exactly what's between you and an offer — not just where you stand.
          </p>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div className="rounded-2xl p-5" style={{ background: 'var(--surface)' }}>
            <div className="mb-3.5 flex items-center gap-3.5">
              <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="5" />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  fill="none"
                  stroke="var(--glow-top)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="138"
                  style={{ strokeDashoffset: atsDash, transition: 'stroke-dashoffset .5s ease-out' }}
                />
              </svg>
              <div>
                <div className="text-[20px] font-extrabold" style={{ color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}>
                  {atsScore}/100
                </div>
                <div className="text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                  ATS score
                </div>
              </div>
            </div>
            <p className="mb-3.5 text-[12.5px] leading-[1.5]" style={{ color: 'var(--text-2)' }}>
              3 quick fixes could take you above 85 — missing keywords and unquantified bullets are the biggest drag.
            </p>
            <button
              type="button"
              className="w-full rounded-[10px] py-2.5 text-[12.5px] font-semibold text-white"
              style={{ border: '1px solid rgba(255,255,255,0.22)', background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)', cursor: 'pointer' }}
            >
              Boost with AI
            </button>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'var(--surface)' }}>
            <h4 className="mb-3 text-[14px] font-bold">Resume vs. what recruiters want</h4>
            <div className="mb-3.5 flex flex-col gap-2.5">
              {SKILL_GAP_DATA.map((sg) => (
                <div key={sg.label}>
                  <div className="mb-1 text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                    {sg.label}
                  </div>
                  <div className="flex gap-1">
                    <div className="h-[5px] flex-1 overflow-hidden rounded-[3px]" style={{ background: 'var(--border)' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: 'var(--glow-top)', width: `${sg.yours}%` }} />
                    </div>
                    <div className="h-[5px] flex-1 overflow-hidden rounded-[3px]" style={{ background: 'var(--border)' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: 'var(--info)', width: `${sg.market}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3.5 flex gap-3.5 text-[10.5px]" style={{ color: 'var(--text-3)' }}>
              <span className="flex items-center gap-1.5">
                <span style={{ width: 7, height: 7, borderRadius: 2, background: 'var(--glow-top)' }} />
                You
              </span>
              <span className="flex items-center gap-1.5">
                <span style={{ width: 7, height: 7, borderRadius: 2, background: 'var(--info)' }} />
                Market demand
              </span>
            </div>
            <button type="button" className="w-full rounded-[10px] py-2.5 text-[12.5px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer' }}>
              See full gap report
            </button>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'var(--surface)' }}>
            <h4 className="mb-3 text-[14px] font-bold">What got others hired</h4>
            <div className="mb-3.5 flex flex-col gap-2.5">
              {HIRED_PATTERNS.map((p) => (
                <div key={p} className="flex items-start gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--glow-top)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="m5 12 5 5 9-11" />
                  </svg>
                  <span className="text-[12px] leading-[1.45]" style={{ color: 'var(--text-2)' }}>
                    {p}
                  </span>
                </div>
              ))}
            </div>
            <button type="button" className="w-full rounded-[10px] py-2.5 text-[12.5px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer' }}>
              See all patterns
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button type="button" onClick={onUpgrade} className="inline-block rounded-[10px] px-6 py-2.5 text-[13.5px] font-semibold text-white" style={{ border: '1px solid rgba(255,255,255,0.22)', background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)', cursor: 'pointer' }}>
            See Pro plan
          </button>
        </div>
      </div>
    </div>
  )
}
