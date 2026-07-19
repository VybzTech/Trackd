interface IconProps {
  size?: number
  className?: string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SunIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.5 12H2.1M21.9 12h-2.4M6.2 6.2 4.5 4.5M19.5 19.5l-1.7-1.7M6.2 17.8 4.5 19.5M19.5 4.5l-1.7 1.7" />
    </svg>
  )
}

export function MoonIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
    </svg>
  )
}

export function MenuIcon({ size = 17, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function CloseIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function CheckIcon({ size = 15, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2.2} className={className}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  )
}

export function SearchIcon({ size = 13, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={2} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function DocumentIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7} className={className}>
      <path d="M9 3.5h6l4 4v13h-14v-17Z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  )
}

export function KanbanIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7} className={className}>
      <rect x="4" y="4" width="6" height="16" rx="1.4" />
      <rect x="14" y="4" width="6" height="9" rx="1.4" />
    </svg>
  )
}

export function TimerIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.6 2.6" />
    </svg>
  )
}

export function ChecklistIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7} className={className}>
      <path d="M4 6h16M4 12h16M4 18h9" />
      <path d="m16 16 2 2 4-4" />
    </svg>
  )
}

export function SyncIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 4v4h-4M6 20v-4h4" />
    </svg>
  )
}

export function NexusIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="18" cy="6" r="2.6" />
      <circle cx="12" cy="18" r="2.6" />
      <path d="M8 7.6 11 16M16 7.6 13 16M8.6 6h6.8" />
    </svg>
  )
}

export function MailIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function SupportIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M12 8v4l2.6 2.6" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

export function SocialIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M17.5 6.5h.01" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
    </svg>
  )
}

export function CandidateIcon({ size = 17, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function RecruiterIcon({ size = 17, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </svg>
  )
}
