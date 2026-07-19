// Icons transcribed verbatim from the "Trackd For Recruiters" design prototype.
// Kept local to this page's directory to avoid touching shared landing/icons.tsx.

// --- Card icons (18x18, stroke-width 1.7) ---

export function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.4" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.4" />
    </svg>
  )
}

export function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3.5h6l4 4v13h-14v-17Z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  )
}

// --- Feature-bullet icons (16x16, stroke-width 1.8) ---

export function BulletSearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function BulletScoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.6 2.6" />
    </svg>
  )
}

export function BulletStatusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-11" />
    </svg>
  )
}

export function BulletTeamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M3 20c0-3 2.2-5.4 5-5.4s5 2.4 5 5.4" />
      <path d="M14 20c.3-2.3 1.8-4 3.6-4.4" />
    </svg>
  )
}
