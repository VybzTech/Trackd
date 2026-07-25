import type { Theme } from '../../lib/landingData'
import { INCIDENTS, cap } from './adminData'
import {
  Badge,
  SectionLabel,
  StatCard,
  TableShell,
  incidentSeverityTone,
  incidentStatusTone,
  statGridStyle,
  tdMono,
  tdMuted,
  tdStyle,
} from './adminUi'

const STATS = [
  { label: 'API uptime (30d)', value: '99.98%', delta: 'SLA met', deltaAccent: true },
  { label: 'Avg response time', value: '142ms', delta: '-8ms vs last week', deltaAccent: true },
  { label: 'Error rate', value: '0.03%', delta: 'within threshold', deltaAccent: false },
  { label: 'Requests today', value: '2.4M', delta: 'peak 08:00–10:00', deltaAccent: false },
]

export default function SystemTab({ theme }: { theme: Theme }) {
  return (
    <>
      <div style={{ ...statGridStyle, marginBottom: 24 }}>
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <SectionLabel style={{ marginBottom: 12 }}>Incident log</SectionLabel>
      <TableShell headers={['Service', 'Severity', 'Status', 'Time', 'Message']}>
        {INCIDENTS.map((inc) => (
          <tr key={inc.id}>
            <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text)' }}>{inc.service}</td>
            <td style={tdStyle}>
              <Badge tone={incidentSeverityTone(inc.severity)} theme={theme} upper>
                {cap(inc.severity)}
              </Badge>
            </td>
            <td style={tdStyle}>
              <Badge tone={incidentStatusTone(inc.status)} theme={theme}>
                {cap(inc.status)}
              </Badge>
            </td>
            <td style={tdMono}>{inc.time}</td>
            <td style={{ ...tdMuted, whiteSpace: 'normal', minWidth: 220 }}>{inc.message}</td>
          </tr>
        ))}
      </TableShell>
    </>
  )
}
