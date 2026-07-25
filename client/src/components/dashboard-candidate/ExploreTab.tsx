import { useMemo, useState } from 'react'
import { EXPLORE_JOBS, primaryBtnStyle } from './data'
import { SearchIcon } from './icons'

interface ExploreTabProps {
  isPro: boolean
  onUpgrade: () => void
  onSave: (job: { company: string; role: string; location: string; comp: string; match: number; stack: string[] }) => void
}

export default function ExploreTab({ isPro, onUpgrade, onSave }: ExploreTabProps) {
  const [query, setQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [stackFilters, setStackFilters] = useState<string[]>([])
  const [savedIds, setSavedIds] = useState<number[]>([])

  const locations = useMemo(() => ['all', ...new Set(EXPLORE_JOBS.map((j) => j.location))], [])
  const stacks = useMemo(() => [...new Set(EXPLORE_JOBS.flatMap((j) => j.stack))], [])

  const q = query.trim().toLowerCase()
  const filtered = EXPLORE_JOBS.filter((j) => {
    const matchesQ = !q || (j.company + ' ' + j.role + ' ' + j.stack.join(' ') + ' ' + j.location).toLowerCase().includes(q)
    const matchesRemote = !remoteOnly || j.remote
    const matchesLoc = locationFilter === 'all' || j.location === locationFilter
    const matchesStack = stackFilters.length === 0 || stackFilters.every((t) => j.stack.includes(t))
    return matchesQ && matchesRemote && matchesLoc && matchesStack
  }).sort((a, b) => b.match - a.match)

  const toggleStack = (tech: string) => setStackFilters((s) => (s.includes(tech) ? s.filter((t) => t !== tech) : [...s, tech]))

  const pillStyle = (active: boolean) => ({
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer' as const,
    border: `1px solid ${active ? 'var(--border-glass)' : 'var(--border)'}`,
    background: active ? 'var(--surface-alt)' : 'transparent',
    color: active ? 'var(--glow-top)' : 'var(--text-2)',
  })

  if (!isPro) {
    return (
      <div className="mx-auto my-16 max-w-[420px] rounded-3xl p-6 sm:p-8 text-center" style={{ border: '1px solid var(--border-glass)', background: 'var(--surface-alt)' }}>
        <div className="mb-3.5 text-[12.5px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}>
          Trackd Pro
        </div>
        <h3 className="mb-2.5 text-[22px] font-extrabold">Explore is a Pro feature.</h3>
        <p className="mb-6 text-[14px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
          Browse and filter every open role on Trackd by skill, company, tech stack, and location — ranked by your live compatibility score.
        </p>
        <button type="button" onClick={onUpgrade} style={{ ...primaryBtnStyle, padding: '12px 24px', fontSize: 14, justifyContent: 'center' }}>
          Upgrade to Pro
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Explore</h2>
      <p className="mb-5 text-[14px]" style={{ color: 'var(--text-2)' }}>
        Browse every open role on Trackd, ranked by your compatibility.
      </p>

      <div className="relative mb-4 max-w-[420px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
          <SearchIcon size={14} />
        </span>
        <input
          type="text"
          placeholder="Search by skill, company, tech stack, location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-[9px] py-2.5 pl-8 pr-3.5 text-[13.5px]"
          style={{ border: '1px solid var(--border)', background: 'var(--surface-alt)', color: 'var(--text)' }}
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {locations.map((loc) => (
          <button key={loc} type="button" onClick={() => setLocationFilter(loc)} style={pillStyle(locationFilter === loc)}>
            {loc === 'all' ? 'All locations' : loc}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex flex-wrap gap-1.5">
          {stacks.map((tech) => (
            <button key={tech} type="button" onClick={() => toggleStack(tech)} style={pillStyle(stackFilters.includes(tech))}>
              {tech}
            </button>
          ))}
        </div>
        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              Remote only
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={remoteOnly}
              onClick={() => setRemoteOnly((v) => !v)}
              className="relative flex-shrink-0"
              style={{ width: 42, height: 24, borderRadius: 999, border: '1px solid var(--border-glass)', background: remoteOnly ? 'var(--surface-alt)' : 'var(--surface-2)', cursor: 'pointer' }}
            >
              <span
                className="absolute top-0.5 rounded-full transition-[left] duration-150"
                style={{ width: 18, height: 18, left: remoteOnly ? 20 : 2, background: remoteOnly ? 'var(--glow-top)' : 'var(--text-3)' }}
              />
            </button>
          </div>
          <div className="text-[12px]" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
            {filtered.length} of {EXPLORE_JOBS.length} roles
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-end gap-1 text-[11px] font-medium sm:hidden" style={{ color: 'var(--text-3)' }} aria-hidden="true">
        Swipe to see more<span aria-hidden="true">→</span>
      </div>
      <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {['Role', 'Company', 'Match', 'Location', 'Stack', 'Action'].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap border-b px-4 py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.04em]"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-3)', textAlign: h === 'Action' ? 'right' : 'left' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => {
              const saved = savedIds.includes(job.id)
              return (
                <tr
                  key={job.id}
                  className="transition-colors duration-150"
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-alt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td className="whitespace-nowrap border-b px-4 py-3 font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                    {job.role}
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-3" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                    {job.company}
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-3" style={{ borderColor: 'var(--border)', color: 'var(--glow-top)', fontFamily: 'var(--font-mono)' }}>
                    {job.match}%
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-3" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                    {job.location}
                  </td>
                  <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex max-w-[220px] flex-wrap gap-1">
                      {job.stack.map((s) => (
                        <span key={s} className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px]" style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-3 text-right" style={{ borderColor: 'var(--border)' }}>
                    <button
                      type="button"
                      disabled={saved}
                      onClick={() => {
                        onSave({ company: job.company, role: job.role, location: job.location, comp: job.comp, match: job.match, stack: job.stack })
                        setSavedIds((ids) => [...ids, job.id])
                      }}
                      className="rounded-full px-3.5 py-2 text-[11.5px] font-semibold"
                      style={
                        saved
                          ? { border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'default' }
                          : { border: '1px solid var(--border-glass)', background: 'var(--surface-alt)', color: 'var(--glow-top)', cursor: 'pointer' }
                      }
                    >
                      {saved ? 'Saved ✓' : 'Save to Pipeline'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
