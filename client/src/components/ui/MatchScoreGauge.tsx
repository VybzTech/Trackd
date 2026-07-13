// React import not required with the react-jsx transform
import { motion } from 'framer-motion'

export interface MatchScoreGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { box: 40, stroke: 4, valueClass: 'text-xs' },
  md: { box: 72, stroke: 6, valueClass: 'text-lg' },
  lg: { box: 160, stroke: 8, valueClass: 'text-5xl' },
}

/** red < 40, amber 40-69, green >= 70, per docs/Trackd.md Section 6. */
function scoreColor(score: number) {
  if (score >= 70) return '#10b981'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

/**
 * Signature motif (docs/Trackd.md 2.1 / 6): conic-gradient-style ring gauge,
 * reused at 3 sizes. Adapted from the original hand-built gauge in ProPage.
 */
export function MatchScoreGauge({ score, size = 'md' }: MatchScoreGaugeProps) {
  const { box, stroke, valueClass } = SIZES[size]
  const radius = (box - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const color = scoreColor(score)
  const gradientId = `match-score-gauge-${size}`

  return (
    <div className="relative" style={{ width: box, height: box }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${box} ${box}`}>
        <circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          stroke="rgba(173, 255, 255, 0.15)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${(score / 100) * circumference} ${circumference}` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-mono font-semibold text-white ${valueClass}`}>{score}</span>
      </div>
    </div>
  )
}
