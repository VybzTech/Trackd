---
name: frontend-taste
description: Encodes a specific, non-generic frontend design taste — Vercel/Linear-grade restraint, precise motion, and modern CSS craft — that this user wants applied by default, not just when explicitly asked for "good design." Use this whenever building, reviewing, or advising on any UI, component, landing page, design system, or frontend code, including work inside Codex Design or Codex. Also consult this before choosing fonts, colors, spacing, shadows, or animation timing for any frontend output, and when reviewing someone else's frontend work for quality or "does this look generic."
---

# Frontend Taste

A standing set of defaults for frontend/UI work, distilled from building TRACKD. The benchmark is Vercel and Linear: confidence through restraint, precision over decoration. Apply these rules by default — don't wait to be asked for "polish."

## The core instinct

When in doubt, remove an effect rather than add one. The most common way AI-generated UI reads as generic is stacking decoration: glassmorphism + drop shadow + glow + gradient border + bounce animation, all on the same card. Pick the one effect that's doing real work and cut the rest.

## Typography

- Minimize typeface count. Two is the target: one variable sans for both display and body (let weight/size carry hierarchy, not a second display face), one mono reserved for numbers/data/code.
- Default to **Geist Sans** + **Geist Mono** when nothing else is specified — they're free, and they're the literal source of the Vercel look. Inter + JetBrains Mono is the next-best pairing if Geist isn't available.
- Never leave a project on the Tailwind default stack (`ui-sans-serif`/system fonts) — that's the single fastest tell of unfinished work.
- State the specific type scale (e.g. a 1.25 ratio) rather than picking sizes ad hoc.

## Color

- Build gradients and color interpolation in **OKLCH**, not raw hex/RGB — RGB interpolation muddies dark-to-bright transitions (e.g. navy-to-electric-blue goes grey through the middle).
- Every color needs a stated reason — pulled from a real source (a psychology sheet, existing brand data, an accessibility constraint) — never "picked because it looked nice." If you can't name why a hex was chosen, don't ship it.
- Semantic/status colors, once locked against real data, are locked. Don't restyle them for a visual refresh — that breaks the data contract.

## Spacing & structure

- Use `clamp()` for fluid type and spacing instead of jumping values at breakpoints.
- Pick one radius scale (e.g. 3 steps) and use it everywhere — inconsistent per-component rounding reads as unfinished.
- Favor hairline 1px borders at low opacity over heavy box-shadows for surface separation — this is most of what makes Linear's UI feel precise instead of soft.

## Motion

- Default timing is fast and precise: 150–250ms, with a stated custom cubic-bezier — not a library default and never a slow floaty ease.
- Motion should communicate cause and effect (a press, a drag, a dismiss) — it's not decoration. If an animation doesn't clarify what just happened, cut it.
- Never animate more than one or two properties on the same element at once (pick fade *or* slide *or* scale — not all three).
- Always respect `prefers-reduced-motion` by disabling non-essential motion outright, not just slowing it down.

## Accessibility is part of the aesthetic, not a compliance pass

- Check every new color pairing against WCAG AA contrast before it ships, especially on dark or glass surfaces — that's exactly where accidental low-contrast text hides.
- Keyboard focus states need to look as considered as hover states. A UI that only looks good with a mouse isn't finished.

## One signature motif, not three

Every product should have exactly one recurring visual signature, reused at multiple scales, rather than a different decorative idea per screen. Identify it early (in TRACKD's case: the match-score gauge, echoed in the sidebar glow and card corners) and resist the urge to add a second one.

## Anti-patterns — actively flag these, don't just avoid them silently

- Purple-to-blue gradient text with no stated rationale
- Glassmorphism + shadow + glow + gradient border, all at once, on the same element
- Default Tailwind `slate`/`gray` dark mode with no considered palette
- The "icon in a circle" pattern repeated identically across every card with no visual hierarchy
- Fade + slide + scale, simultaneously, on every element that enters the viewport

## When proposing frontend work

State the specific values up front and name the reasoning — hex codes, rem values, ms timing, easing curves, the font choice — rather than silently defaulting to whatever a component library ships with. If a choice doesn't have a stated reason, that's the signal it was generic.