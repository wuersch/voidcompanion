# Midnight Leveling Companion

A WoW: Midnight expansion leveling & progress tracker for a small friends-and-family group.

## Key Resources

- **PRD**: `docs/PRD.md` — full product requirements, data model, API endpoints, architecture
- **Design file**: `design/void-touched.pen` — all screens and design system (read with Pencil MCP tools, not plain text)
- **Press kit artwork**: `design/assets/` — Blizzard press kit images used for design reference (see `design/assets/LICENSE.md` for attribution)

## Design System

The design file contains color variables, typography definitions, and 9 reusable components following a "Void-Touched Elegance" aesthetic — deep midnight blues, void purples, and Sunwell golds.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS (custom theme)
- Blizzard OAuth 2.0 (PKCE, client-side only)
- IndexedDB (via Dexie.js) for local persistence
- GitHub Pages hosting
