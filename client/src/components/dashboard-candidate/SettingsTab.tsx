import { useState } from 'react'
import { INITIAL_MILESTONES, INITIAL_SETTINGS, type StoryMilestone } from './data'
import { DocIcon } from './icons'

interface SettingsTabProps {
  isPro: boolean
  onTogglePlan: () => void
}

const JOB_STATUS_OPTIONS = ['Actively looking', 'Open to offers', 'Not looking']
const WORK_AUTH_OPTIONS = ['US Citizen', 'Visa sponsorship needed', 'Work permit']
const REMOTE_OPTIONS = ['Remote only', 'Hybrid', 'On-site']

export default function SettingsTab({ isPro, onTogglePlan }: SettingsTabProps) {
  const [settings, setSettings] = useState(INITIAL_SETTINGS)
  const [newSkill, setNewSkill] = useState('')
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [autoCapture, setAutoCapture] = useState(true)
  const [milestones, setMilestones] = useState<StoryMilestone[]>(INITIAL_MILESTONES)

  const field = (key: keyof typeof settings) => ({
    value: settings[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSettings((s) => ({ ...s, [key]: e.target.value })),
  })

  const inputStyle = { border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' } as const
  const labelCls = 'mb-1.5 block text-[12.5px] font-semibold'
  const inputCls = 'w-full rounded-[9px] px-3.5 py-2.5 text-[13.5px]'

  const pillStyle = (active: boolean) => ({
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 600,
    cursor: 'pointer' as const,
    border: `1px solid ${active ? 'var(--border-glass)' : 'var(--border)'}`,
    background: active ? 'var(--surface-alt)' : 'transparent',
    color: active ? 'var(--glow-top)' : 'var(--text-2)',
  })

  const Toggle = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className="relative flex-shrink-0"
      style={{ width: 42, height: 24, borderRadius: 999, border: '1px solid var(--border-glass)', background: on ? 'var(--surface-alt)' : 'var(--surface-2)', cursor: 'pointer' }}
    >
      <span className="absolute top-0.5 rounded-full transition-[left] duration-150" style={{ width: 18, height: 18, left: on ? 20 : 2, background: on ? 'var(--glow-top)' : 'var(--text-3)' }} />
    </button>
  )

  const addMilestone = () => {
    const newId = Math.max(0, ...milestones.map((m) => m.id)) + 1
    setMilestones((ms) => [...ms, { id: newId, year: '', title: '', desc: '' }])
  }

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const val = newSkill.trim()
    if (!val) return
    setSettings((s) => ({ ...s, skills: s.skills.includes(val) ? s.skills : [...s.skills, val] }))
    setNewSkill('')
  }

  return (
    <div>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Settings</h2>
      <p className="mb-7 text-[14px]" style={{ color: 'var(--text-2)' }}>
        Manage your profile, job preferences, and account.
      </p>

      <div className="flex max-w-[620px] flex-col gap-6">
        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold">Basic info</div>
            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
            >
              Email verified
            </span>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Full name
                </label>
                <input type="text" {...field('fullName')} className={inputCls} style={inputStyle} />
              </div>
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Headline
                </label>
                <input type="text" {...field('headline')} placeholder="e.g. Senior Frontend Engineer" className={inputCls} style={inputStyle} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Email
                </label>
                <input type="email" {...field('email')} className={inputCls} style={inputStyle} />
              </div>
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Phone
                </label>
                <input type="text" {...field('phone')} placeholder="+1 (555) 000-0000" className={inputCls} style={inputStyle} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Location
                </label>
                <input type="text" {...field('location')} placeholder="San Francisco, CA" className={inputCls} style={inputStyle} />
              </div>
              <div className="min-w-[200px] flex-1">
                <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                  Years of experience
                </label>
                <input type="text" {...field('yearsExp')} placeholder="5" className={inputCls} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                Portfolio / LinkedIn / GitHub
              </label>
              <input type="text" {...field('links')} placeholder="https://…" className={inputCls} style={inputStyle} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 text-[13px] font-bold">Job preferences</div>
          <div className="flex flex-col gap-3.5">
            <div>
              <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                Job search status
              </label>
              <div className="flex flex-wrap gap-2">
                {JOB_STATUS_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => setSettings((s) => ({ ...s, jobStatus: opt }))} style={pillStyle(settings.jobStatus === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                Work authorization
              </label>
              <div className="flex flex-wrap gap-2">
                {WORK_AUTH_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => setSettings((s) => ({ ...s, workAuth: opt }))} style={pillStyle(settings.workAuth === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
                Open to remote
              </label>
              <div className="flex flex-wrap gap-2">
                {REMOTE_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => setSettings((s) => ({ ...s, remotePref: opt }))} style={pillStyle(settings.remotePref === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls} style={{ color: 'var(--text-2)' }}>
                Desired salary range
              </label>
              <input type="text" {...field('salaryRange')} placeholder="$140k–170k" className={inputCls} style={{ ...inputStyle, maxWidth: 260 }} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 text-[13px] font-bold">Documents</div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 rounded-[10px] px-3.5 py-3" style={{ border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}>
                <DocIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">Resume</div>
                <div className="text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                  Jordan_Rivera_Resume.pdf · updated Jul 2
                </div>
              </div>
              <button type="button" className="flex-shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer' }}>
                Replace
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-[10px] px-3.5 py-3" style={{ border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)', flexShrink: 0 }}>
                <DocIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">Default cover letter template</div>
                <div className="text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                  No template uploaded yet
                </div>
              </div>
              <button type="button" className="flex-shrink-0 rounded-full px-3.5 py-2 text-[12px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer' }}>
                Upload
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="text-[13px] font-bold">Career story</div>
            <button type="button" onClick={addMilestone} className="rounded-full px-3 py-1.5 text-[12px] font-semibold" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)', color: 'var(--glow-top)', cursor: 'pointer' }}>
              + Add milestone
            </button>
          </div>
          <p className="mb-4.5 text-[12px]" style={{ color: 'var(--text-3)' }}>
            This timeline is what recruiters see when they preview your profile in Talent Search.
          </p>
          {milestones.map((m, i) => (
            <div key={m.id} className="relative pb-5 pl-5" style={{ borderLeft: `2px solid ${i === milestones.length - 1 ? 'transparent' : 'var(--border)'}` }}>
              <span
                className="absolute"
                style={{ left: -6, top: 4, width: 10, height: 10, borderRadius: '50%', background: 'var(--glow-top)', border: '2px solid var(--surface)', boxShadow: '0 0 0 2px var(--border-glass)' }}
              />
              <div className="mb-2 flex flex-wrap gap-2.5">
                <input
                  type="text"
                  value={m.year}
                  onChange={(e) => setMilestones((ms) => ms.map((x) => (x.id === m.id ? { ...x, year: e.target.value } : x)))}
                  placeholder="Year"
                  className="rounded-lg px-2.5 py-2 text-[12.5px] font-bold"
                  style={{ width: 80, border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}
                />
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => setMilestones((ms) => ms.map((x) => (x.id === m.id ? { ...x, title: e.target.value } : x)))}
                  placeholder="Role, Company"
                  className="min-w-[160px] flex-1 rounded-lg px-2.5 py-2 text-[13px] font-semibold"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
                />
                <button
                  type="button"
                  onClick={() => setMilestones((ms) => ms.filter((x) => x.id !== m.id))}
                  aria-label="Remove milestone"
                  className="flex-shrink-0 rounded-lg"
                  style={{ width: 32, height: 32, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>
              <textarea
                rows={2}
                value={m.desc}
                onChange={(e) => setMilestones((ms) => ms.map((x) => (x.id === m.id ? { ...x, desc: e.target.value } : x)))}
                placeholder="What did you accomplish here?"
                className="w-full resize-none rounded-lg px-2.5 py-2 text-[12.5px]"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text-2)' }}
              />
            </div>
          ))}
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 text-[13px] font-bold">Skills</div>
          <div className="mb-3 flex flex-wrap gap-2">
            {settings.skills.map((sk) => (
              <span
                key={sk}
                className="inline-flex items-center gap-1.5 rounded-full py-1.5 pl-3 pr-1.5 text-[12px] font-semibold"
                style={{ background: 'var(--surface-alt)', border: '1px solid var(--border-glass)', color: 'var(--glow-top)' }}
              >
                {sk}
                <button
                  type="button"
                  onClick={() => setSettings((s) => ({ ...s, skills: s.skills.filter((x) => x !== sk) }))}
                  className="flex items-center justify-center"
                  style={{ width: 15, height: 15, border: 'none', background: 'transparent', color: 'var(--glow-top)', cursor: 'pointer', padding: 0 }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a skill, press Enter"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={addSkill}
            className="w-full max-w-[320px] rounded-[9px] px-3.5 py-2.5 text-[13px]"
            style={inputStyle}
          />
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 text-[13px] font-bold">Plan</div>
          <div className="flex flex-wrap items-center justify-between gap-3.5">
            <div>
              <div className="mb-0.5 text-[14.5px] font-bold">{isPro ? 'Trackd Pro' : 'Free plan'}</div>
              <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                {isPro ? 'Renews Aug 14 · $12/mo' : 'Upgrade for AI resume tools & Explore'}
              </div>
            </div>
            <button
              type="button"
              onClick={onTogglePlan}
              className="rounded-[9px] px-4.5 py-2.5 text-[13px] font-semibold"
              style={
                isPro
                  ? { border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }
                  : { border: '1px solid rgba(255,255,255,0.22)', background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-2) 85%, white 15%), var(--brand-2) 45%, var(--brand) 100%)', color: '#fff', cursor: 'pointer' }
              }
            >
              {isPro ? 'Manage plan' : 'Upgrade to Pro'}
            </button>
          </div>
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-4 text-[13px] font-bold">Preferences</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-semibold">Email notifications</div>
                <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                  Status changes &amp; new match alerts
                </div>
              </div>
              <Toggle on={notifyEmail} onClick={() => setNotifyEmail((v) => !v)} label="Toggle email notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-semibold">Extension auto-capture</div>
                <div className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                  Prompt to ingest job pages you visit
                </div>
              </div>
              <Toggle on={autoCapture} onClick={() => setAutoCapture((v) => !v)} label="Toggle extension auto-capture" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl p-5" style={{ border: '1px solid var(--border)' }}>
          <div className="mb-1.5 text-[13px] font-bold" style={{ color: 'var(--text-2)' }}>
            Danger zone
          </div>
          <p className="mb-3.5 text-[12.5px]" style={{ color: 'var(--text-3)' }}>
            Permanently delete your account and all application data.
          </p>
          <button type="button" className="rounded-[9px] px-4 py-2.5 text-[13px] font-semibold" style={{ border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer' }}>
            Delete account
          </button>
        </section>
      </div>
    </div>
  )
}
