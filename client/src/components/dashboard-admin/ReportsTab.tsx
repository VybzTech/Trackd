import { useMemo, useState } from 'react'
import { AUDIT_LOG, PAST_REPORTS, type AuditEntry } from './adminData'
import { CheckIcon } from './adminIcons'
import { FilterTabs, SectionLabel, StatCard, statGridStyle } from './adminUi'

export type ReportPeriod = '7d' | '30d' | '90d' | 'ytd'
const PERIOD_OPTIONS: { key: ReportPeriod; label: string }[] = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
  { key: 'ytd', label: 'Year to date' },
]
const PERIOD_LABEL: Record<ReportPeriod, string> = {
  '7d': 'the last 7 days',
  '30d': 'the last 30 days',
  '90d': 'the last 90 days',
  ytd: 'year to date',
}

type CategoryKey = 'all' | AuditEntry['category']
const CATEGORY_OPTIONS: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'account', label: 'Account' },
  { key: 'moderation', label: 'Moderation' },
  { key: 'support', label: 'Support' },
  { key: 'billing', label: 'Billing' },
  { key: 'system', label: 'System' },
]

export default function ReportsTab({
  reportPeriod,
  onChangePeriod,
  reportGenerated,
  auditSearchQuery,
}: {
  reportPeriod: ReportPeriod
  onChangePeriod: (p: ReportPeriod) => void
  reportGenerated: boolean
  auditSearchQuery: string
}) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryKey>('all')

  const auditRows = useMemo(() => {
    const q = auditSearchQuery.trim().toLowerCase()
    return AUDIT_LOG.filter(
      (a) =>
        (categoryFilter === 'all' || a.category === categoryFilter) &&
        (!q || (a.actor + ' ' + a.action + ' ' + a.target).toLowerCase().includes(q)),
    )
  }, [categoryFilter, auditSearchQuery])

  const stats = [
    { label: 'Total events', value: String(AUDIT_LOG.length * 4), delta: reportPeriod, deltaAccent: false },
    {
      label: 'Account actions',
      value: String(AUDIT_LOG.filter((a) => a.category === 'account').length * 3),
      delta: 'suspend/reinstate/invite',
      deltaAccent: false,
    },
    {
      label: 'Moderation actions',
      value: String(AUDIT_LOG.filter((a) => a.category === 'moderation').length * 3),
      delta: 'escalate/resolve/remove',
      deltaAccent: true,
    },
    { label: 'Active admins', value: '4', delta: 'logged actions this period', deltaAccent: false },
  ]

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 4 }}>
            Reports &amp; audit trail
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
            Review platform activity for any period, or generate a report to export.
          </p>
        </div>
        <FilterTabs options={PERIOD_OPTIONS} value={reportPeriod} onChange={onChangePeriod} />
      </div>

      <div style={{ ...statGridStyle, marginBottom: 28 }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {reportGenerated && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 18px',
            border: '1px solid var(--border-glass)',
            background: 'color-mix(in srgb, var(--glow-top) 8%, var(--surface))',
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <span style={{ color: 'var(--glow-top)', flexShrink: 0, display: 'flex' }}>
            <CheckIcon size={18} />
          </span>
          <span style={{ fontSize: 13.5, color: 'var(--text)', flex: 1 }}>
            Report generated for {PERIOD_LABEL[reportPeriod]} — ready to download.
          </span>
          <button
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: '7px 14px',
              borderRadius: 999,
              border: '1px solid var(--border-glass)',
              background: 'var(--surface)',
              color: 'var(--glow-top)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Download PDF
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 420px', minWidth: 320 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <SectionLabel>Audit log</SectionLabel>
            <FilterTabs options={CATEGORY_OPTIONS} value={categoryFilter} onChange={setCategoryFilter} />
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Actor', 'Action', 'Target', 'Time'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '10px 14px',
                        color: 'var(--text-3)',
                        fontWeight: 600,
                        fontSize: 10.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        borderBottom: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditRows.map((row) => (
                  <tr key={row.id}>
                    <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{row.actor}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{row.role}</div>
                    </td>
                    <td
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--text-2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.action}
                    </td>
                    <td
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--text-2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.target}
                    </td>
                    <td
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--border)',
                        color: 'var(--text-3)',
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ flex: '1 1 260px', minWidth: 240 }}>
          <SectionLabel style={{ marginBottom: 12 }}>Past reports</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PAST_REPORTS.map((r) => (
              <div key={r.id} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 10 }}>
                  {r.period} · generated {r.generated}
                </div>
                <button
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: 999,
                    border: '1px solid var(--border-glass)',
                    background: 'var(--surface-alt)',
                    color: 'var(--glow-top)',
                    cursor: 'pointer',
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
