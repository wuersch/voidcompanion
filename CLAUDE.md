# Midnight Leveling Companion

A WoW: Midnight expansion leveling & progress tracker for a small friends-and-family group.

## Key Resources

- **PRD**: `docs/PRD.md` — full product requirements, data model, API endpoints, architecture
- **Design file**: `design/void-touched.pen` — all screens and design system (read with Pencil MCP tools, not plain text)
- **Press kit artwork**: `design/assets/` — Blizzard press kit images used for design reference (untracked source toolbox)
- **App assets**: `assets/` — images incorporated into the app (tracked, see `assets/LICENSE.md` for attribution)

## Asset Workflow

`design/assets/` is the source toolbox (untracked press kit files). When incorporating an image into the app, copy it to `assets/` at the project root and add it to version control. This keeps the source material separate from assets actually used in the build.

## Tech Stack

- React 19 + Vite 7 + TypeScript 5.9
- Tailwind CSS v4 (CSS-based theme config in `src/index.css`)
- Google Fonts: Cinzel (display), Source Sans 3 (body), JetBrains Mono (mono)
- Blizzard OAuth 2.0 (PKCE, client-side only) — not yet implemented
- IndexedDB (via Dexie.js) for local persistence — not yet implemented
- GitHub Pages hosting — not yet configured

## Design System

The design file (`design/void-touched.pen`) contains color variables, typography definitions, and 9 reusable components following a "Void-Touched Elegance" aesthetic — deep midnight blues, void purples, and Sunwell golds.

### Tailwind Theme (src/index.css)

All 21 color tokens from the .pen file are mapped into Tailwind v4's `@theme` block:

- **Backgrounds**: `bg-deep`, `bg-surface`, `bg-elevated`, `bg-overlay`
- **Text**: `text-primary`, `text-secondary`, `text-dim`
- **Gold (Sunwell)**: `gold-light`, `gold`, `gold-dark`
- **Void**: `void-light`, `void`, `void-dark`
- **Borders**: `border-subtle`, `border-glow`
- **Accent**: `crimson`
- **Zones**: `zone-eversong`, `zone-zulaman`, `zone-harandar`, `zone-silvermoon`, `zone-voidstorm`
- **Fonts**: `font-display` (Cinzel), `font-body` (Source Sans 3), `font-mono` (JetBrains Mono)

Usage: `bg-bg-deep`, `text-gold-dark`, `font-display`, `border-border-subtle`, etc.

### Design Components (in .pen file)

9 reusable components with their IDs:

| Component | ID | Key children IDs |
|---|---|---|
| Button/Primary | `DGYpa` | `J5lf6` (label) |
| Button/Secondary | `QA4zZ` | `s5Y6P` (label) |
| Progress Bar | `CdiuF` | `jwM4y` (fill), `OVlYM` (empty) |
| Stat Badge | `8VKTP` | `B9vrm` (label), `f1pO5` (value) |
| Section Header | `KQ2Xe` | `ykgF4` (label), `ULreM` (underline) |
| Achievement Criterion | `OvBJq` | `uYeCX` (icon), `MhHgj` (label) |
| Character Card | `yuawT` | `EpSjk` (cardTop), `0Lpnv` (badges) |
| Zone Row | `osfwK` | `oApb5` (thumbnail), `v5wOT` (zoneInfo) |
| Quest Row | `MNRwL` | `AIZvO` (icon), `lyiw2` (questName) |

### Design Screens (in .pen file)

| Screen | ID | Description |
|---|---|---|
| Landing / Auth | `pSJ1T` | Background key art + overlay, centered logo/CTA |
| Character Dashboard | `d2yMA` | Top bar, filter bar, character card grid |
| Character Detail | `r7Rnn` | Header, campaign/pathfinder/renown sections |
| Zone Drill-Down | `6nYbl` | Zone header, quest list by chapter |

## Project Structure

```
src/
├── index.css          # Tailwind v4 theme + base styles
├── main.tsx           # React entry point
├── App.tsx            # App shell
├── vite-env.d.ts      # Vite type declarations
└── components/
    └── LandingPage.tsx # Landing/auth screen
```

## Development Progress

### Completed
- [x] **Project scaffolding**: Vite + React + TypeScript + Tailwind v4
- [x] **Design system extraction**: All tokens from .pen → Tailwind theme
- [x] **Landing page shell**: Background key art, gradient overlay, logo, CTA button, footer

### Next Up (PRD Phase 1 continued)
- [ ] **Ports & adapters architecture**: Define port interfaces for API, storage, and auth
- [ ] **Blizzard OAuth PKCE**: Client-side auth flow with Battle.net
- [ ] **Storage abstraction + IndexedDB adapter**: Dexie.js behind a port interface
- [ ] **Basic character list**: Fetch account characters from Blizzard API
- [ ] **GitHub Pages deployment**: CI/CD pipeline
