# Client Rulebook

## General Principles
- Next.js (App Router) is the core framework.
- Use Tailwind CSS for styling exclusively. No inline styles unless absolutely necessary for dynamic calculations.
- Use `react-icons` only for iconography consistently.

## Component Design
- Components should be modular, reusable, and placed in `components/`.
- Use the `cn` utility (`lib/utils.ts`) to merge Tailwind classes cleanly.

## Logging
- Import and use the custom logger (`lib/logger.ts`) to differentiate log levels (`info`, `warn`, `error`, `success`) rather than `console.log`.
