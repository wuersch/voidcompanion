import { useState, useCallback, useMemo } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useCharacters } from '../../hooks/useCharacters'
import { useSync } from '../../hooks/useSync'
import { useCachedProgress } from '../../hooks/useCachedProgress'
import DashboardTopBar from './DashboardTopBar'
import DashboardFilterBar from './DashboardFilterBar'
import type { SortKey } from './DashboardFilterBar'
import CharacterGrid from './CharacterGrid'
import type { Character } from '../../domain/types'
import bgImage from '../../../assets/key-art-against-the-void.jpg'

export default function CharacterDashboard({
  onSelectCharacter,
  onPrivacy,
}: {
  onSelectCharacter: (character: Character) => void
  onPrivacy: () => void
}) {
  const { logout } = useAuth()
  const { characters, isLoading, setCharacters } = useCharacters()
  const { syncState, sync } = useSync()

  const [realmFilter, setRealmFilter] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [searchQuery, setSearchQuery] = useState('')

  const characterIds = useMemo(
    () => characters.map((c) => c.id),
    [characters],
  )
  const progressMap = useCachedProgress(characterIds)

  const handleSync = useCallback(async () => {
    try {
      const fresh = await sync()
      setCharacters(fresh)
    } catch {
      // error is already in syncState
    }
  }, [sync, setCharacters])

  const realms = useMemo(
    () => [...new Set(characters.map((c) => c.realm))].sort(),
    [characters],
  )

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = q
      ? characters.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.realm.toLowerCase().includes(q),
        )
      : characters

    list = realmFilter ? list.filter((c) => c.realm === realmFilter) : list

    list = [...list].sort((a, b) => {
      if (sortKey === 'level') return b.level - a.level
      if (sortKey === 'realm') return a.realm.localeCompare(b.realm) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })

    return list
  }, [characters, searchQuery, realmFilter, sortKey])

  return (
    <div className="relative min-h-dvh bg-bg-deep">
      {/* Background key art at low opacity */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />

      {/* Content */}
      <div className="relative flex min-h-dvh flex-col">
        <DashboardTopBar
          lastSync={syncState.lastSyncTimestamp}
          isSyncing={syncState.isSyncing}
          onSync={handleSync}
          onLogout={logout}
        />

        <main className="flex-1 px-6 py-6">
          {/* Error banner */}
          {syncState.error && (
            <div className="mb-4 rounded-lg border border-crimson/30 bg-crimson/10 px-4 py-2 text-sm text-crimson">
              {syncState.error}
            </div>
          )}

          {/* Filter bar — only show when we have characters */}
          {characters.length > 0 && (
            <div className="mb-6">
              <DashboardFilterBar
                realms={realms}
                activeRealm={realmFilter}
                onRealmChange={setRealmFilter}
                sortKey={sortKey}
                onSortChange={setSortKey}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          )}

          <CharacterGrid
            characters={filtered}
            progressMap={progressMap}
            isLoading={isLoading}
            onSync={handleSync}
            onSelect={onSelectCharacter}
          />
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 text-center text-xs text-text-dim">
          A fan-made companion app. Not affiliated with Blizzard Entertainment.
          {' · '}
          <button
            type="button"
            onClick={onPrivacy}
            className="cursor-pointer bg-transparent text-text-dim underline transition-colors hover:text-gold"
          >
            Privacy
          </button>
        </footer>
      </div>
    </div>
  )
}
