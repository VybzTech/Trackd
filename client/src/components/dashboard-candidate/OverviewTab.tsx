import { useState } from 'react'
import { ACTIVITY_FEED, matchChipStyle, type CandidateApp, type NextGoal } from './data'
import { CheckIcon } from './icons'

interface OverviewTabProps {
  displayName: string
  apps: CandidateApp[]
  nextGoal: NextGoal
  onGoalChange: (goal: NextGoal) => void
  onOpenApp: (id: number) => void
}

const AI_SUGGESTION = 'Tailor your resume for the Vercel Frontend Engineer role'

export default function OverviewTab({ displayName, apps, nextGoal, onGoalChange, onOpenApp }: OverviewTabProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(nextGoal.text)

  const totalActive = apps.filter((a) => a.status !== 'Offer Received' && a.status !== 'Rejected/Closed').length
  const interviews = apps.filter((a) => a.status === 'Interviewing').length
  const offers = apps.filter((a) => a.status === 'Offer Received').length
  const avgMatch = apps.length ? Math.round(apps.reduce((s, a) => s + a.match, 0) / apps.length) : 0
  const stats = [
    { label: 'Active applications', value: String(totalActive), delta: '+2 this week', accent: true },
    { label: 'Interviews', value: String(interviews), delta: 'this month', accent: false },
    { label: 'Offers', value: String(offers), delta: 'active', accent: false },
    { label: 'Avg. compatibility', value: avgMatch + '%', delta: '+4 vs last month', accent: true },
  ]

  const spotlight = apps.filter((a) => a.status === 'Interviewing' || a.status === 'Offer Received').slice(0, 3)

  const firstName = displayName.split(' ')[0]

  return (
    <div>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Welcome back, {firstName}.</h2>
      <p className="mb-6 text-[14px]" style={{ color: 'var(--text-2)' }}>
        Here's where your search stands today.
      </p>

      <div className="mb-7 grid gap-px overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--border)', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {stats.map((c) => (
          <div key={c.label} className="px-5 py-4" style={{ background: 'var(--bg)' }}>
            <div className="mb-2 text-[12px]" style={{ color: 'var(--text-3)' }}>
              {c.label}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-mono)' }}>
                {c.value}
              </span>
              <span className="text-[11.5px]" style={c.accent ? { color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' } : { color: 'var(--text-3)' }}>
                {c.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl p-[18px]"
        style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}
      >
        <button
          type="button"
          onClick={() => onGoalChange({ ...nextGoal, done: !nextGoal.done })}
          aria-label="Toggle goal done"
          aria-pressed={nextGoal.done}
          className="flex items-center justify-center rounded-lg transition-all duration-150"
          style={{
            width: 26,
            height: 26,
            border: `1.5px solid ${nextGoal.done ? 'var(--glow-top)' : 'var(--border)'}`,
            background: nextGoal.done ? 'var(--glow-top)' : 'transparent',
            color: '#000871',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {nextGoal.done && <CheckIcon size={14} />}
        </button>
        <div className="min-w-[200px] flex-1">
          <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Next goal
            {nextGoal.source === 'ai' && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[9.5px] font-bold"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
              >
                AI SUGGESTED
              </span>
            )}
          </div>
          {editing ? (
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="w-full rounded-lg px-3 py-2 text-[14px]"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            />
          ) : (
            <div
              className="text-[14.5px] font-semibold"
              style={{ color: nextGoal.done ? 'var(--text-3)' : 'var(--text)', textDecoration: nextGoal.done ? 'line-through' : 'none' }}
            >
              {nextGoal.text}
            </div>
          )}
        </div>
        <div className="flex flex-shrink-0 gap-2">
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg px-3.5 py-2 text-[12px] font-semibold"
                style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const t = draft.trim()
                  if (!t) return
                  onGoalChange({ text: t, source: 'user', done: false })
                  setEditing(false)
                }}
                className="rounded-lg px-3.5 py-2 text-[12px] font-semibold"
                style={{ border: '1px solid var(--border-glass)', background: 'var(--surface)', color: 'var(--glow-top)', cursor: 'pointer' }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setDraft(nextGoal.text)
                  setEditing(true)
                }}
                className="rounded-lg px-3.5 py-2 text-[12px] font-semibold"
                style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onGoalChange({ text: AI_SUGGESTION, source: 'ai', done: false })}
                className="rounded-lg px-3.5 py-2 text-[12px] font-semibold"
                style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}
              >
                Suggest one
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="min-w-[280px] flex-1 basis-80">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Continue where you left off
          </div>
          <div className="flex flex-col gap-2.5">
            {spotlight.length === 0 && (
              <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>
                Nothing in Interviewing or Offer yet — check back once a stage advances.
              </p>
            )}
            {spotlight.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onOpenApp(a.id)}
                className="flex w-full items-center gap-3 rounded-xl p-3.5 text-left transition-[transform,border-color] duration-150 hover:-translate-y-0.5"
                style={{ border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }}
              >
                <div
                  className="flex items-center justify-center rounded-lg text-[12px] font-bold"
                  style={{ width: 32, height: 32, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}
                >
                  {a.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-bold" style={{ color: 'var(--text)' }}>
                    {a.company}
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                    {a.role}
                  </div>
                </div>
                <span style={matchChipStyle(a.match)}>{a.match}%</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-[280px] flex-1 basis-80">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
            Recent activity
          </div>
          <div className="flex flex-col gap-3.5 rounded-2xl p-4" style={{ border: '1px solid var(--border)' }}>
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--glow-top)' }} />
                <div className="flex-1">
                  <div className="text-[13px] leading-snug" style={{ color: 'var(--text)' }}>
                    {a.text}
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
