import React from 'react'

function sparkPath(data: number[], w: number, h: number) {
  if (!data || data.length < 2) return ''
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const stepX = w / (data.length - 1)
  return data
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * stepX).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
    .join(' ')
}

export interface StatTileProps {
  size?: 'sm' | 'md' | 'lg'
  /** Top 2px hairline + sparkline color. */
  tone?: 'default' | 'success' | 'warning' | 'info' | 'danger'
  eyebrow?: string
  /** Large monospace metric, e.g. "128" or "$1.2M". */
  value?: string | number
  /** Trend chip text, e.g. "+12.4%". */
  delta?: string
  deltaTone?: 'success' | 'warning' | 'info' | 'danger' | 'neutral'
  foot?: string
  /** Numeric series rendered as an inline sparkline polyline. */
  spark?: number[]
}

export function StatTile({ size = 'md', tone = 'default', eyebrow, value, delta, deltaTone = 'success', foot, spark }: StatTileProps) {
  const dims: [number, number] = size === 'sm' ? [72, 24] : size === 'lg' ? [120, 40] : [96, 32]
  return (
    <div className={`stat-tile${size !== 'md' ? ` stat-${size}` : ''}`} data-tone={tone === 'default' ? undefined : tone}>
      <div className="stat-head">
        <span className="stat-eyebrow">{eyebrow}</span>
        {delta && <span className="chip" data-tone={deltaTone}>{delta}</span>}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-meta">
        <span className="stat-foot">{foot}</span>
        {spark && (
          <svg className="stat-spark" viewBox={`0 0 ${dims[0]} ${dims[1]}`} fill="none">
            <path d={sparkPath(spark, dims[0], dims[1])} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  )
}
