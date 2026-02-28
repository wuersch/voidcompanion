# Midnight Leveling Companion

A client-side web app that tracks World of Warcraft: Midnight expansion leveling progress across multiple characters. Authenticate with Battle.net, sync your characters, and view detailed progress for campaign quests, Pathfinder achievement, and faction renown.

## Status

**Functionally complete** — all screens implemented, pending Azure Static Web Apps deployment.

## Tech Stack

- React 19 + Vite 7 + TypeScript 5.9
- Tailwind CSS v4 with custom theme
- Blizzard OAuth 2.0 (authorization code flow, client secret in SPA)
- IndexedDB (via Dexie.js) for client-side persistence
- Azure Static Web Apps

## Disclaimer

This is a non-commercial fan project and is not affiliated with or endorsed by Blizzard Entertainment. All Blizzard artwork and trademarks are the property of Blizzard Entertainment, Inc.

See [docs/PRD.md](docs/PRD.md) for full product requirements.
