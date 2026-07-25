interface LogoProps {
  /** Rendered height in px; width follows the asset's aspect ratio (~4.6:1). */
  height?: number
  className?: string
}

/**
 * Trackd wordmark from /public/logo.png (light-theme, black strokes) and
 * /public/logo-dark.png (dark-theme, white strokes — generated from the same
 * source art). Theme-swapped via CSS (`.trackd-logo-*` rules in index.css)
 * rather than a theme prop, so it drops into any component without wiring.
 */
export default function Logo({ height = 20, className = '' }: LogoProps) {
  const style = { height, width: 'auto' }
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <img src="/logo.png" alt="Trackd" style={style} className="trackd-logo-light" />
      <img src="/logo-dark.png" alt="Trackd" style={style} className="trackd-logo-dark" />
    </span>
  )
}
