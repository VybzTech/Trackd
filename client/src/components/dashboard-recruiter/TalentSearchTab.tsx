import { useState } from 'react'
import { YEARS_OPTS, initials, type TalentProfile } from './data'
import { Pill, Toggle, Avatar, TableScroll, PILL_ACTION, CONTROL_PAD } from './ui'

const TH = 'whitespace-nowrap border-b px-4 py-[11px] text-[11px] font-semibold uppercase tracking-[0.04em]'

export function AvailabilityBadge({ available, size = 'sm' }: { available: boolean; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border font-semibold ${size === 'md' ? 'px-2.5 py-1 text-[11px]' : 'px-2 py-[3px] text-[11px]'}`}
      style={
        available
          ? {
              background: 'color-mix(in srgb, var(--glow-top) 12%, var(--surface))',
              borderColor: 'var(--border-glass)',
              color: 'var(--glow-top)',
            }
          : { background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-2)' }
      }
    >
      {available ? 'Open to work' : 'Not looking'}
    </span>
  )
}

export default function TalentSearchTab({
  pool,
  query,
  availableOnly,
  onToggleAvailable,
  locationFilter,
  onLocationFilter,
  skillFilter,
  onSkillFilter,
  minYears,
  onMinYears,
  sentIds,
  onOpenPreview,
  onReachOut,
}: {
  pool: TalentProfile[]
  query: string
  availableOnly: boolean
  onToggleAvailable: () => void
  locationFilter: string
  onLocationFilter: (v: string) => void
  skillFilter: string
  onSkillFilter: (v: string) => void
  minYears: number
  onMinYears: (v: number) => void
  sentIds: number[]
  onOpenPreview: (id: number) => void
  onReachOut: (id: number) => void
}) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const uniqueLocations = ['all', ...Array.from(new Set(pool.map((t) => t.location)))]
  const uniqueSkills = ['all', ...Array.from(new Set(pool.flatMap((t) => t.skills)))]

  const activeFilterCount =
    (locationFilter !== 'all' ? 1 : 0) + (skillFilter !== 'all' ? 1 : 0) + (minYears > 0 ? 1 : 0) + (availableOnly ? 1 : 0)

  const q = query.trim().toLowerCase()
  let filtered = availableOnly ? pool.filter((t) => t.available) : pool.slice()
  if (locationFilter !== 'all') filtered = filtered.filter((t) => t.location === locationFilter)
  if (skillFilter !== 'all') filtered = filtered.filter((t) => t.skills.includes(skillFilter))
  if (minYears > 0) filtered = filtered.filter((t) => t.years >= minYears)
  if (q)
    filtered = filtered.filter((t) =>
      (t.name + ' ' + t.headline + ' ' + t.location + ' ' + t.skills.join(' ')).toLowerCase().includes(q),
    )

  return (
    <>
      <h2 className="mb-1.5 text-[22px] font-extrabold tracking-[-0.01em]">Talent Search</h2>
      <p className="mb-[18px] text-sm" style={{ color: 'var(--text-2)' }}>
        Browse candidates across the whole Trackd network and reach out directly.
      </p>

      {/* Mobile: filters collapse behind a toggle; desktop shows them inline. */}
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-150 ease-out md:hidden"
          style={{ padding: CONTROL_PAD.pill, borderColor: 'var(--border)', color: 'var(--text-2)' }}
        >
          Filters
          {activeFilterCount > 0 && (
            <span
              className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 font-mono text-[10.5px] font-bold text-white"
              style={{ background: 'var(--brand-2)' }}
            >
              {activeFilterCount}
            </span>
          )}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease-out' }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
          {filtered.length} of {pool.length} candidates
        </div>
      </div>

      <div className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {uniqueLocations.map((loc) => (
            <Pill
              key={loc}
              label={loc === 'all' ? 'All locations' : loc}
              active={locationFilter === loc}
              onClick={() => onLocationFilter(loc)}
            />
          ))}
        </div>
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {uniqueSkills.map((sk) => (
            <Pill key={sk} label={sk === 'all' ? 'All skills' : sk} active={skillFilter === sk} onClick={() => onSkillFilter(sk)} />
          ))}
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex flex-wrap gap-1.5">
            {YEARS_OPTS.map((y) => (
              <Pill key={y} label={y === 0 ? 'Any experience' : `${y}+ yrs`} active={minYears === y} onClick={() => onMinYears(y)} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold" style={{ color: 'var(--text-2)' }}>
              Open to work only
            </span>
            <Toggle on={availableOnly} onToggle={onToggleAvailable} label="Show only candidates open to work" />
          </div>
        </div>
      </div>

      <TableScroll>
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {['Candidate', 'Skills', 'Location', 'Experience', 'Status'].map((h) => (
                <th key={h} className={`text-left ${TH}`} style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                  {h}
                </th>
              ))}
              <th className={`hidden text-right md:table-cell ${TH}`} style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[13px]" style={{ color: 'var(--text-3)' }}>
                  No candidates match these filters.
                </td>
              </tr>
            )}
            {filtered.map((t) => {
              const sent = sentIds.includes(t.id)
              return (
                <tr
                  key={t.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Preview ${t.name}`}
                  onClick={() => onOpenPreview(t.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onOpenPreview(t.id)
                    }
                  }}
                  className="cursor-pointer transition-colors duration-150"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-alt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2.5">
                      <Avatar text={initials(t.name)} size={30} />
                      <div className="min-w-0">
                        <div className="whitespace-nowrap font-semibold" style={{ color: 'var(--text)' }}>
                          {t.name}
                        </div>
                        <div className="whitespace-nowrap text-[11.5px]" style={{ color: 'var(--text-3)' }}>
                          {t.headline}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex max-w-[220px] flex-wrap gap-1.5">
                      {t.skills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="whitespace-nowrap rounded-full border px-2 py-[3px] text-[10.5px]"
                          style={{ background: 'var(--surface-alt)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-3" style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}>
                    {t.location}
                  </td>
                  <td
                    className="whitespace-nowrap border-b px-4 py-3 font-mono"
                    style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}
                  >
                    {t.years} yrs
                  </td>
                  <td className="border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
                    <AvailabilityBadge available={t.available} />
                  </td>
                  <td className="hidden border-b px-4 py-3 text-right md:table-cell" style={{ borderColor: 'var(--border)' }}>
                    <button
                      type="button"
                      disabled={sent}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!sent) onReachOut(t.id)
                      }}
                      className={`${PILL_ACTION} border`}
                      style={
                        sent
                          ? { padding: CONTROL_PAD.pill, borderColor: 'var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'default' }
                          : { padding: CONTROL_PAD.pill, borderColor: 'var(--border-glass)', background: 'var(--surface-alt)', color: 'var(--glow-top)', cursor: 'pointer' }
                      }
                    >
                      {sent ? 'Sent ✓' : 'Reach out'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableScroll>
    </>
  )
}
