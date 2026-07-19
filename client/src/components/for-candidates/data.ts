export interface ProFeature {
  title: string
  desc: string
}

// Transcribed verbatim from "Trackd For Candidates.dc.html" (PRO_FEATURES).
export const PRO_FEATURES: ProFeature[] = [
  {
    title: 'Resume vs. what recruiters want',
    desc: 'See the gap between your resume and what similar roles actually screen for.',
  },
  {
    title: 'ATS score & resume booster',
    desc: 'A live ATS score plus one-tap fixes for missing keywords and formatting risks.',
  },
  {
    title: 'Cover letters, generated',
    desc: 'Tailored cover letters per role — start from your own template or ours.',
  },
  {
    title: 'What got others hired',
    desc: "Patterns from candidates who converted, that you're not doing yet.",
  },
  {
    title: 'Your conversion rate',
    desc: 'Applied → interview → offer, tracked over time, by role type and source.',
  },
]

// Transcribed verbatim from source (HEAT_LEVELS): 21 cells for a 7×3 grid.
export const HEAT_LEVELS: number[] = [0, 1, 1, 2, 0, 3, 1, 0, 2, 1, 1, 0, 4, 2, 1, 0, 1, 2, 0, 1, 3]
