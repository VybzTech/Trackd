---
name: trackd-design
description: Use this skill to generate well-branded interfaces and assets for Trackd, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things live in this repo

- Design tokens + base CSS (compiled from this design system): `client/src/styles/design-system/` (entry: `styles.css`)
- Production React component primitives (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Chip, Badge, Card, StatTile, Tabs, NavBar): `client/src/components/ui/`
- App shell (sidebar + topbar), adapted from this system's `hiring-console` UI kit: `client/src/components/AppShell.tsx`
- Canonical source of truth (readable, editable, syncable): the `Trackd Design System` project on claude.ai/design (projectId `efaadf5f-7ebb-4301-bb9c-1b3b0541ad92`). Use the `/design-sync` skill + `DesignSync` tool to pull updates from it or push local component edits back.

Always check `client/src/components/ui/` for an existing primitive before writing new markup/styles for a button, input, card, stat tile, tab, chip, or badge.
