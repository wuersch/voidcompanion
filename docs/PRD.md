# Midnight Leveling Companion — Product Requirements Document

## Overview

A client-side web application that tracks World of Warcraft: Midnight expansion leveling progress across multiple characters. Users authenticate with their Battle.net account, manually sync their character data, and view detailed progress for campaign quests, the Pathfinder achievement, and faction renown.

**Working name**: Midnight Leveling Companion (MLC)
**Audience**: Family & friends group (~5–15 users), with potential to grow organically
**Monetization**: None (non-commercial, compliant with Blizzard's fan site trademark guidelines)

---

## Goals

1. Show at-a-glance leveling and campaign progress across all characters on an account
2. Break down achievement progress (especially Pathfinder) to individual quest level
3. Track faction renown progress per character
4. Feel like a companion app that belongs in the Warcraft universe — not a generic SaaS dashboard
5. Keep hosting costs at zero and architecture simple enough to extend later

---

## Architecture & Technical Decisions

### Hosting
- **GitHub Pages** on a custom subdomain (e.g., `mlc.omnom.ch` or similar)
- Static site, no server-side component
- Zero hosting cost

### Frontend Stack
- **React** (Vite for build tooling)
- **TypeScript**
- **Custom design system** — no shadcn/ui, no component library. Hand-crafted UI inspired by the Midnight expansion aesthetic (see Design Direction below)
- **CSS Modules or Tailwind** for styling (team preference, but leaning Tailwind with custom theme)

### Authentication
- **Blizzard OAuth 2.0 authorization code flow** — client-side only
- User clicks "Login with Battle.net" → redirected to Blizzard → returns with auth code → exchanged for access token
- Access token stored in sessionStorage (survives page refreshes, clears on tab close)
- All Blizzard API calls made directly from the browser using the user's token
- CSRF protection via random state nonce, validated on callback

> **Note on client secret in the browser**: The original plan assumed Blizzard supported PKCE (Proof Key for Code Exchange), which would allow a pure public-client flow without a client secret. However, Blizzard's OAuth token endpoint requires a `client_secret` for the authorization code exchange, and PKCE is not supported as of early 2026. For a small friends-and-family app with no commercial use, the pragmatic choice is to embed the client secret in the SPA bundle via a build-time environment variable (`VITE_BLIZZARD_CLIENT_SECRET`). The risk is low: the secret identifies the *app*, not users — an attacker who extracts it can only make read-only Blizzard API calls under the app's identity, not access any user's data without that user's own access token. The worst case is Blizzard revoking the key, which is easily re-registered. If the app's audience grows beyond trusted users, the right fix is a lightweight token-exchange proxy (e.g. a Cloudflare Worker) that holds the secret server-side — the `AuthPort` interface already supports this swap without changing any UI code.

### Data Storage
- **IndexedDB** via Dexie.js (or similar), behind a storage abstraction interface
- Cached character data persists across browser sessions
- Manual "Sync" button fetches fresh data from Blizzard API and updates the local store
- Storage interface designed for future swap to a backend/database if needed

### Key Architectural Principle: Ports & Adapters
All external dependencies hidden behind interfaces:

```
┌─────────────────────────────────────────┐
│              React UI Layer             │
├─────────────────────────────────────────┤
│           Domain / State Layer          │
│   (characters, achievements, quests,    │
│    renown — in our own domain model)    │
├──────────┬──────────┬───────────────────┤
│ API Port │ Storage  │ Auth Port         │
│          │ Port     │                   │
├──────────┼──────────┼───────────────────┤
│ Blizzard │ IndexedDB│ Blizzard OAuth    │
│ API      │ (Dexie)  │ Auth Code         │
│ Adapter  │ Adapter  │ Adapter           │
└──────────┴──────────┴───────────────────┘
```

This means we can later:
- Swap IndexedDB for a Supabase/Firebase backend
- Add a server-side API proxy if we outgrow client-side calls
- Replace or extend the auth flow

---

## Data Model

### Character
```typescript
interface Character {
  id: string;                    // "{realm}-{name}" slug
  name: string;
  realm: string;
  level: number;
  classId: number;
  className: string;
  raceId: number;
  raceName: string;
  specName: string;
  avatarUrl: string;             // from character media endpoint
  itemLevel: number;             // equipped item level from profile summary
  lastSynced: Date;
}
```

### Campaign Progress
```typescript
interface CampaignZone {
  zoneId: string;
  zoneName: string;              // e.g., "Eversong Woods", "Zul'Aman"
  achievementId: number;         // Blizzard achievement ID
  quests: Quest[];
  completedQuests: number;
  totalQuests: number;
}

interface Quest {
  questId: number;
  questName: string;
  completed: boolean;
  chapter?: string;              // grouping within the zone storyline
}
```

### Pathfinder Progress
```typescript
interface PathfinderProgress {
  achievementId: number;         // 61839
  completed: boolean;
  criteria: PathfinderCriterion[];
}

interface PathfinderCriterion {
  achievementId: number;
  name: string;                  // e.g., "The Midnight Explorer"
  completed: boolean;
  subCriteria: PathfinderSubCriterion[];
}

interface PathfinderSubCriterion {
  id: number;                    // questline final quest ID or exploration achievement ID
  name: string;
  type: 'questline' | 'exploration';
  completed: boolean;
}
```

### Renown Progress
```typescript
interface FactionRenown {
  factionId: number;
  factionName: string;
  currentLevel: number;
  maxLevel: number;
}
```

### Midnight Faction Allowlist

The Blizzard API returns all factions (including old expansions); the app filters to only Midnight-relevant factions:

| Faction | Faction ID | Zone | Max Renown | Wowhead Guide |
|---------|-----------|------|------------|---------------|
| Silvermoon Court | 2710 | Eversong Woods | 20 | https://www.wowhead.com/guide/midnight/silvermoon-court-renown-reputation-farming-rewards |
| Amani Tribe | 2696 | Zul'Aman | 20 | https://www.wowhead.com/guide/midnight/amani-tribe-renown-reputation-farming-rewards |
| Hara'ti | 2704 | Harandar | 20 | https://www.wowhead.com/guide/midnight/harati-renown-reputation-farming-rewards |
| The Singularity | 2699 | Voidstorm | 20 | https://www.wowhead.com/guide/midnight/the-singularity-renown-reputation-farming-rewards |

### Sync State
```typescript
interface SyncState {
  lastSyncTimestamp: Date | null;
  isSyncing: boolean;
  error: string | null;
}
```

---

## Blizzard API Endpoints Used

All calls use the Profile API namespace (`profile-eu` / `profile-us`).

| Purpose | Endpoint |
|---------|----------|
| Account characters | `GET /profile/user/wow` (requires user token) |
| Character summary | `GET /profile/wow/character/{realm}/{name}` |
| Character media | `GET /profile/wow/character/{realm}/{name}/character-media` |
| Achievements | `GET /profile/wow/character/{realm}/{name}/achievements` |
| Completed quests | `GET /profile/wow/character/{realm}/{name}/quests/completed` |
| Reputations | `GET /profile/wow/character/{realm}/{name}/reputations` |

**Note**: The Blizzard API does NOT link quests to achievement criteria. The quest-to-achievement mapping must be maintained as static curated data within the app (see Quest Chain Data section).

---

## Quest Chain Data (Static / Curated)

Since the Blizzard API doesn't connect quests to storyline achievements, we maintain a static JSON data file mapping each zone's achievement to its quest chain. This data is curated once per content patch from Wowhead.

Structure:
```json
{
  "zones": [
    {
      "zoneId": "eversong-woods",
      "zoneName": "Eversong Woods",
      "achievementId": 41802,
      "achievementName": "Eversong In Reprise",
      "chapters": [
        {
          "name": "Chapter 1: ...",
          "quests": [
            { "questId": 12345, "questName": "Quest Name" }
          ]
        }
      ]
    }
  ]
}
```

**Midnight Pathfinder (Achievement 61839) criteria:**

| Criterion | Achievement ID | Type |
|-----------|---------------|------|
| The Midnight Explorer | 61854 | Exploration |
| Eversong In Reprise | 41802 | Zone story |
| For Zul'Aman! | 41803 | Zone story |
| One Does Not Simply Walk Into Harandar | 41804 | Zone story |
| Arator's Journey | 41805 | Zone story |
| Breaching the Voidstorm | 41806 | Zone story |

Each Pathfinder criterion is itself a meta-achievement with sub-criteria. The zone story criteria require completing questlines (quest chains, not individual quests). The exploration criterion requires discovering sub-zones.

**Pathfinder Sub-Criteria:**

| Criterion | Sub-criteria (quest chains / exploration) | Type |
|-----------|------------------------------------------|------|
| The Midnight Explorer (61854) | Explore Eversong Woods, Explore Zul'Aman, Explore Harandar, Explore Voidstorm | Exploration |
| Eversong In Reprise (41802) | Whispers in the Twilight, Ripple Effects, Shadowfall | Quest chain |
| For Zul'Aman! (41803) | Dis Was Our Land, Where War Slumbers, Path of de Hash'ey, De Amani Never Die | Quest chain |
| One Does Not Simply Walk Into Harandar (41804) | Of Caves and Cradles, Emergence, Call of the Goddess | Quest chain |
| Arator's Journey (41805) | The Path of Light, Regrets of the Past | Quest chain |
| Breaching the Voidstorm (41806) | Into the Abyss, Dawn of Reckoning, The Night's Veil | Quest chain |

Each quest chain sub-criterion corresponds to a storyline containing multiple individual quests. The Blizzard API tracks completion at the questline level (via the final quest in each chain), not per individual quest within the chain.

---

## Wowhead Integration

Wowhead is used in two ways:

### 1. Tooltip Embeds
Include the Wowhead tooltip script (`power.js`) so that any link to `wowhead.com/achievement=X` or `wowhead.com/quest=X` automatically shows a rich hover tooltip. This is Wowhead's officially supported integration method.

### 2. Deep Links
Every achievement and quest in the UI links to its Wowhead page. URL pattern:
- Achievements: `https://www.wowhead.com/achievement={id}/{slug}`
- Quests: `https://www.wowhead.com/quest={id}/{slug}`

---

## Screens & User Flow

### 1. Landing / Auth Screen
- App logo and Midnight-themed atmospheric background
- "Login with Battle.net" button
- Brief explanation of what the app does
- No data shown until authenticated

### 2. Character Dashboard
- Grid or list of all characters on the account (pulled after first sync)
- Each character card shows: avatar, name, realm, level, class, item level, and percentage-based progress badges (Campaign %, Pathfinder %, Renown %)
- Search/filter text field above the card grid that filters characters by name or realm as the user types
- Prominent "Sync" button with last-synced timestamp
- Filter/sort by level, class, realm

### 3. Character Detail View
- Character header: large avatar, name, class, level, spec, item level
- **Campaign Progress** section: per-zone progress bars with completion percentage
- **Pathfinder Progress** section: 6 criteria with checkmarks, links to Wowhead
- **Renown Progress** section: per-faction renown level bars
- Each section expandable for detail

### 4. Zone Quest Breakdown (expanded or separate view)
- Shows the quest chain within a zone storyline
- Grouped by chapter
- Each quest: checkbox (completed/not), quest name linked to Wowhead
- Wowhead tooltip on hover

---

## Design Direction

### Aesthetic: "Void-Touched Elegance"
The visual identity draws from the Midnight expansion's core tension: the golden warmth of the Sunwell vs. the creeping darkness of the Void. This is NOT a generic dark theme — it has atmosphere, texture, and presence.

### Design References
- Download the **Midnight Press Kits** from `blizzard.gamespress.com`:
  - "World of Warcraft Midnight gamescom Reveal" (326 MB) — key art, zone artwork, cinematic stills
  - "Midnight Pre-Expansion Update (12.0)" (50 MB) — icons, logos, "Hope Shall Rise" key art
- Use these as the source of truth for color extraction, atmospheric imagery, and visual language

### Color Palette (derived from Midnight key art)
- **Background**: Deep midnight blues and near-blacks (`#0a0b14`, `#111827`)
- **Void accents**: Rich purples and violet (`#6b21a8`, `#7c3aed`, `#a855f7`)
- **Sunwell gold**: Warm amber and gold for highlights, completed states, CTAs (`#f59e0b`, `#fbbf24`, `#d4a843`)
- **Blood Elf crimson**: Accent for Horde-aligned elements (`#991b1b`, `#dc2626`)
- **Text**: Off-white with slight warmth (`#e8e0d4`) on dark backgrounds
- **Surface cards**: Semi-transparent dark panels with subtle backdrop blur, light border glow

### Typography
- Display/headings: A fantasy-adjacent serif or decorative font — something with character that evokes Warcraft's high-fantasy aesthetic without being illegible. Consider fonts like Cinzel, Uncial Antiqua, or MedievalSharp from Google Fonts. Must feel hand-forged, not sterile.
- Body text: A clean but warm sans-serif with good readability at small sizes. Something like Source Sans 3 or Nunito — functional but not clinical.
- Monospace (for data/numbers): JetBrains Mono or Fira Code for numerical progress values.

### Visual Effects & Atmosphere
- Subtle background particle effects (floating void motes or ember-like particles)
- Soft glow effects on progress bars and completed achievements (golden pulse for completed, violet shimmer for in-progress)
- Card surfaces with noise texture overlay and subtle gradient borders
- Progress bars that feel like in-game achievement bars, not Material Design linear indicators
- Hover states with gentle luminance shifts, not just color changes
- Transitions that feel weighty and deliberate, not bouncy

### Progress Visualization
- Achievement criteria: Custom checkmarks (golden for complete, dim grey for incomplete, with a subtle glow animation on completion)
- Zone campaign progress: Segmented arc or horizontal bar showing quest completion, with chapter markers
- Pathfinder: A 6-segment radial or hexagonal layout showing each criterion
- Renown: Vertical or horizontal level bars with faction-specific accent colors
- Character level: Prominent display with XP-bar-style treatment

### Component Patterns
- **Character cards**: Dark glass-morphic panels with the character's class color as a subtle accent edge
- **Section headers**: Zone name with atmospheric background strip (from press kit zone art)
- **Quest lists**: Compact, scannable, with clear completed/incomplete visual differentiation
- **Tooltips**: Wowhead native tooltips handle item/quest/achievement hovers — don't compete with them stylistically
- **Sync button**: Prominent, with a loading animation that feels like a casting bar

### What to Avoid
- Generic component library aesthetics (no shadcn, no Material, no Bootstrap)
- Flat pastel themes — this needs depth and atmosphere
- Overly bright or high-contrast themes that don't match the "Midnight" mood
- Childish or cartoon-style elements — the tone is epic, not playful
- Copying Blizzard's exact UI styling (avoid legal issues, create something inspired but original)

---

## MVP Scope

### In Scope (v1)
- [x] Battle.net OAuth login
- [x] Manual sync of all characters on the account
- [x] Character dashboard with level and class info
- [x] Campaign progress per zone with per-quest breakdown
- [x] Pathfinder achievement progress (6 criteria)
- [x] Basic renown tracking per faction
- [x] Wowhead tooltip integration and deep links
- [x] IndexedDB persistence of synced data
- [x] Mobile-responsive layout
- [x] Zone drill-down with per-quest checklist grouped by chapter
- [x] Character search field (filter by name/realm)
- [x] Percentage-based stat badges (Campaign %, Pathfinder %, Renown %)
- [x] Item level display on character cards and detail header
- [x] Midnight faction filter (4 relevant factions only)
- [x] Pathfinder sub-criteria tracking

### Out of Scope (future)
- [ ] Multi-account support
- [ ] Sharing/comparing progress between users
- [ ] Backend API proxy
- [ ] Push notifications for sync reminders
- [ ] Historical progress tracking over time
- [ ] Alt-friendly "account-wide completion" view

---

## File Structure (Proposed)

```
src/
├── adapters/
│   ├── blizzard-api/          # Blizzard API client implementation
│   │   ├── auth.ts            # OAuth PKCE flow
│   │   ├── client.ts          # API call methods
│   │   └── transforms.ts      # API response → domain model
│   ├── storage/
│   │   └── indexeddb.ts       # Dexie-based storage adapter
│   └── wowhead/
│       └── tooltips.ts        # Wowhead script loader & link helpers
├── ports/
│   ├── api.ts                 # API port interface
│   ├── storage.ts             # Storage port interface
│   └── auth.ts                # Auth port interface
├── domain/
│   ├── types.ts               # Core domain types (Character, Quest, etc.)
│   └── quest-data/            # Static curated quest chain JSON files
│       ├── eversong-woods.json
│       ├── zulaman.json
│       ├── harandar.json
│       ├── voidstorm.json
│       └── arators-journey.json
├── hooks/
│   ├── useAuth.ts
│   ├── useCharacters.ts
│   ├── useSync.ts
│   └── useProgress.ts
├── components/
│   ├── layout/
│   ├── characters/
│   ├── progress/
│   └── common/
├── styles/
│   └── theme.css              # CSS variables, custom properties
├── App.tsx
└── main.tsx
```

---

## Development Phases

### Phase 1: Foundation
- Project scaffolding (Vite + React + TypeScript)
- Blizzard OAuth authorization code flow
- Storage abstraction + IndexedDB adapter
- Basic character list from API
- Deploy to GitHub Pages

### Phase 2: Design & UI
- Design screens in Pencil.dev using Midnight press kit assets
- Implement custom design system (colors, typography, components)
- Character dashboard with cards
- Atmospheric background and visual effects

### Phase 3: Progress Tracking ✓
- Achievement data fetching and parsing
- Pathfinder progress display
- Renown tracking
- Wowhead tooltip integration

### Phase 4: Quest Breakdown ✓
- Curate quest chain data from Wowhead for each zone (210 quests across 15 chapters, 5 zones)
- Completed quests cross-referencing
- Per-quest checklist UI within zone stories
- Zone drill-down with chapter grouping and quest status icons

---

## References

- Blizzard Developer Portal: `https://develop.battle.net/`
- Blizzard API Documentation: `https://develop.battle.net/documentation/world-of-warcraft`
- Blizzard Press Center (Midnight assets): `https://blizzard.gamespress.com/World-of-Warcraft`
- Wowhead Tooltips: `https://www.wowhead.com/tooltips`
- Wowhead Midnight Pathfinder: `https://www.wowhead.com/achievement=61839/midnight-pathfinder`
- Blizzard Trademark Guidelines: `https://www.blizzard.com/en-us/legal/8bcb0794-6641-4ce3-a573-8eb243bab342`
