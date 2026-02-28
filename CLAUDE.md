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
- Blizzard OAuth 2.0 (authorization code flow, client secret in SPA, EU default)
- IndexedDB (via Dexie.js) for local persistence
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
├── domain/
│   ├── types.ts             # Domain model (Character, Quest, SyncState, etc.)
│   └── assembleProgress.ts  # Pure fn: raw API data + curated quest data → CharacterProgress
├── ports/
│   ├── api.ts         # ApiPort interface (Blizzard API contract)
│   ├── auth.ts        # AuthPort interface (OAuth contract)
│   ├── storage.ts     # StoragePort interface (persistence contract)
│   ├── PortsContext.ts # React context for dependency injection
│   ├── context.tsx    # PortsProvider component
│   └── usePorts.ts    # usePorts() hook
├── adapters/
│   ├── blizzard-auth/
│   │   ├── config.ts              # OAuth constants from VITE_ env vars
│   │   ├── session.ts             # sessionStorage wrappers (token + CSRF state)
│   │   └── BlizzardAuthAdapter.ts # AuthPort implementation
│   ├── blizzard-api/
│   │   ├── types.ts               # Raw Blizzard API response types
│   │   ├── transforms.ts          # Raw → domain type transformers
│   │   └── BlizzardApiAdapter.ts  # ApiPort implementation
│   ├── dexie-storage/
│   │   └── DexieStorageAdapter.ts # StoragePort implementation (IndexedDB)
│   └── wowhead/
│       └── tooltips.ts            # Wowhead power.js loader + refreshLinks helper
├── data/
│   ├── classColors.ts # WoW class ID → hex color mapping
│   ├── factions.ts    # Midnight faction ID allowlist (4 factions)
│   ├── pathfinder.ts  # Pathfinder achievement ID + 6 criteria with sub-criteria definitions
│   └── zones.ts       # Static curated zone/chapter/quest data (210 quests from Wowhead)
├── hooks/
│   ├── useAuth.ts           # Auth state hook (isAuthenticated, login, logout)
│   ├── useCharacters.ts     # Load characters from storage on mount
│   ├── useSync.ts           # Sync characters from Blizzard API → storage
│   ├── useProgress.ts       # On-demand fetch + cache progress for one character
│   └── useCachedProgress.ts # Load cached progress for all characters (dashboard badges)
└── components/
    ├── LandingPage.tsx      # Landing/auth screen
    ├── CallbackHandler.tsx  # OAuth callback loading/error screen
    ├── shared/
    │   ├── Icons.tsx        # Inline Lucide SVG icons (ArrowLeft, Circle, CircleCheck, etc.)
    │   ├── ProgressBar.tsx  # Horizontal fill bar with configurable color/height
    │   ├── SectionHeader.tsx # Uppercase Cinzel label with gold underline
    │   └── WowheadLink.tsx  # <a> linking to Wowhead with tooltip support
    ├── dashboard/
    │   ├── CharacterDashboard.tsx  # Main dashboard orchestrator
    │   ├── DashboardTopBar.tsx     # Logo, sync button, logout
    │   ├── DashboardFilterBar.tsx  # Search input + realm pills + sort dropdown
    │   ├── CharacterGrid.tsx       # Responsive card grid + skeletons + empty state
    │   ├── CharacterCard.tsx       # Character card with avatar, info, real stat badges
    │   └── StatBadge.tsx           # Small label + value badge
    └── detail/
        ├── CharacterDetail.tsx      # Detail view orchestrator (useProgress + 3 sections)
        ├── DetailHeader.tsx         # Key art bg + avatar + hero info + back arrow
        ├── CampaignSection.tsx      # Section header + ZoneRow list
        ├── ZoneRow.tsx              # Zone thumbnail + progress bar + chapter count
        ├── PathfinderSection.tsx     # 3-col grid of achievement criteria
        ├── AchievementCriterion.tsx  # Circle/check icon + criterion name
        ├── RenownSection.tsx        # Faction renown bars
        ├── RenownRow.tsx            # Faction name + progress bar + level count
        ├── ZoneDrillDown.tsx        # Zone quest view orchestrator
        ├── ZoneHeader.tsx           # Zone key art + title + total progress
        ├── ChapterGroup.tsx         # Left border accent + chapter status + quest list
        └── QuestRow.tsx             # Quest completion icon + Wowhead-linked name
```

## Development Progress

### Completed
- [x] **Project scaffolding**: Vite + React + TypeScript + Tailwind v4
- [x] **Design system extraction**: All tokens from .pen → Tailwind theme
- [x] **Landing page shell**: Background key art, gradient overlay, logo, CTA button, footer
- [x] **Ports & adapters architecture**: Domain types + port interfaces (ApiPort, AuthPort, StoragePort) + React Context DI
- [x] **Blizzard OAuth**: Authorization code flow with Battle.net (client secret in SPA, sessionStorage token, EU default)
- [x] **IndexedDB storage adapter**: Dexie.js behind StoragePort (characters, progress, syncState tables)
- [x] **Blizzard API adapter**: ApiPort implementation with profile/media/achievements/quests/reputations endpoints
- [x] **Character dashboard**: Top bar, realm filter/sort, responsive character card grid, sync flow, skeleton loading
- [x] **Character detail view**: On-demand progress sync, campaign zones with quest progress, Pathfinder criteria, renown bars
- [x] **Zone drill-down**: Per-quest checklist grouped by chapter, chapter status icons
- [x] **Curated quest data**: 210 quests across 15 chapters from 5 zone story achievements (sourced from Wowhead)
- [x] **Wowhead tooltips**: Lazy-loaded power.js, hover tooltips on quest/achievement links
- [x] **App navigation**: Conditional rendering with browser back button support (pushState/popstate)
- [x] **Real stat badges**: Dashboard character cards show cached campaign/pathfinder/renown progress
- [x] **Character search**: Filter bar text input filters characters by name or realm
- [x] **Percentage badges**: Campaign/Pathfinder/Renown badges show quest-level percentages
- [x] **Item level display**: iLvl on character cards and detail header, fetched via character summary API
- [x] **Midnight faction filter**: Renown section shows only 4 Midnight factions (IDs in `src/data/factions.ts`)
- [x] **Pathfinder sub-criteria**: Expandable criteria with completion badges and indented sub-items

### Next Up
- [ ] **GitHub Pages deployment**: CI/CD pipeline
