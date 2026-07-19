import { APPLICANTS } from './data'

const headCellClass =
  'whitespace-nowrap border-b px-[18px] py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.04em]'

export default function ApplicantTable() {
  return (
    <div
      className="overflow-hidden rounded-2xl border [animation:revealUp_.6s_ease-out_both]"
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {['Candidate', 'Match', 'Stage'].map((h) => (
                <th key={h} className={headCellClass} style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPLICANTS.map((row) => (
              <tr key={row.name}>
                <td className="border-b px-[18px] py-3 font-semibold" style={{ borderColor: 'var(--border)' }}>
                  {row.name}
                </td>
                <td
                  className="border-b px-[18px] py-3 font-mono"
                  style={{ color: 'var(--glow-top)', borderColor: 'var(--border)' }}
                >
                  {row.match}%
                </td>
                <td className="border-b px-[18px] py-3" style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}>
                  {row.stage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
