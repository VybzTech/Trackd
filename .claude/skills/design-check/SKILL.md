---
name: design-check
description: Perform a 3-pass responsive UI design review on a web page or component, using screenshots at mobile, tablet, and desktop viewports to systematically identify and fix visual, layout, and UX issues until the UI reaches ~95% polish. Use when asked to "check the design", "audit the UI", "design review", "check responsiveness", or when working on a frontend page and quality feedback is needed. Also trigger after layout changes, new components, or before a feature ships.
---

# Design Check (3-Pass Responsive Review)

Achieve ~95% UI polish through three targeted passes using screenshots at three viewports.

## Setup

Before starting, capture screenshots at:
- **Mobile**: 375px wide
- **Tablet**: 768px wide
- **Desktop**: 1440px wide

Use Chrome DevTools → device toolbar → "Capture screenshot", or the Claude Pro browser, or a Chrome screenshot extension.

---

## Pass 1: Foundation

**Goal:** Fix layout, spacing, and visual hierarchy before anything else. These are the most costly to fix later.

**Checklist**

Layout
- [ ] No horizontal scroll at any viewport
- [ ] Content reflows correctly at each breakpoint (no broken flex/grid)
- [ ] Mobile nav is accessible and doesn't overlap content

Spacing
- [ ] Padding and margins follow a consistent scale (4/8/16/24/32px)
- [ ] No elements cramped against edges or floating in excess whitespace
- [ ] Section gaps are proportional and predictable

Visual Hierarchy
- [ ] Font sizes create a clear heading → body → caption scale
- [ ] The primary CTA is the most visually prominent interactive element
- [ ] Color draws the eye to what matters, not away from it

Images & Media
- [ ] Images scale without distortion at all viewports
- [ ] No broken image placeholders
- [ ] Video or iframe embeds are responsive

**Issue Format**

```
[P1] Short title
Viewport: Mobile | Tablet | Desktop | All
Severity: Critical | High | Medium | Low
Issue: What's wrong
Fix: What to change
```

---

## Pass 2: Refinement

**Goal:** Polish interactivity, contrast, and typography. The UI should feel intentional and accessible.

**Checklist**

Contrast & Color
- [ ] Body text passes WCAG AA (4.5:1 contrast ratio minimum)
- [ ] Large text / headings pass WCAG AA (3:1 minimum)
- [ ] Color is not the only differentiator (icons or labels also distinguish states)

Interactive States
- [ ] Buttons have visible hover, active, and disabled states
- [ ] Links are distinguishable from body text
- [ ] Form inputs have focus, filled, error, and success states
- [ ] All interactive elements have a visible focus ring (keyboard nav)

Typography
- [ ] Body line length is 45–75 characters (not full-width on desktop)
- [ ] Line height is comfortable (1.5–1.75 for body text)
- [ ] No text overlapping or clipping at any viewport
- [ ] Font weights are used intentionally (not just one weight throughout)

Touch & Sizing
- [ ] All tap targets are at least 44×44px on mobile
- [ ] Buttons and inputs have adequate padding (not cramped)

**Same issue format as Pass 1.**

---

## Pass 3: Polish

**Goal:** Remove anything that makes the UI feel unfinished. Micro-interactions, edge cases, perception.

**Checklist**

Micro-Interactions
- [ ] Hover and transition animations are 150–300ms (not jarring, not sluggish)
- [ ] Button press has subtle feedback (scale, shadow, or color shift)
- [ ] Page or route transitions feel intentional, not abrupt

Edge Cases
- [ ] Long text (long names, emails, URLs) doesn't break layout (`text-overflow`, `word-break`)
- [ ] Empty states are designed — not blank or broken
- [ ] Error states are visible and explain what to do next
- [ ] Loading states provide clear feedback (skeleton, spinner, or progress)

Mobile-Specific
- [ ] Modals and drawers have an obvious close action
- [ ] Dropdowns don't overflow the viewport
- [ ] No layout breakage in landscape orientation

Production Readiness
- [ ] No placeholder text remains ("Lorem ipsum", "TODO", "Coming soon")
- [ ] No broken image icons
- [ ] Favicon is present
- [ ] No console errors or warnings

**Same issue format as Pass 1.**

---

## Scoring

Track score after each pass to measure progress:

| Score | Meaning |
|-------|---------|
| 90–100 | Production-ready. Ship it. |
| 80–89 | Good quality. One more pass to hit 90+. |
| 70–79 | Acceptable MVP. Foundational work done, needs refinement. |
| < 70 | Not ready. Foundational issues block polish work. |

**Target: 95+ after Pass 3.**

Record progress:
```
Pass 1: __/100 → [N issues found, N fixed]
Pass 2: __/100 → [N issues found, N fixed]
Pass 3: __/100 → [Ready | Needs one more round]
```

---

## Common Gotchas

- **Forgotten hover states** — always check buttons and links on desktop
- **Mobile nav overlapping content** — use `position: sticky` + correct z-index, or ensure body has `padding-top` to offset a fixed nav
- **Contrast looks fine visually but fails WCAG** — use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify
- **Long strings breaking layout** — add `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` or `word-break: break-word` depending on context
- **Touch targets too small** — padding counts toward touch target size; increase padding before increasing font size