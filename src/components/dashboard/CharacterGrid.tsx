import type { Character, CharacterProgress } from '../../domain/types'
import CharacterCard from './CharacterCard'

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated">
      <div className="flex items-center gap-4 p-4">
        <div className="h-16 w-16 shrink-0 rounded-xl bg-bg-deep" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-28 rounded bg-bg-deep" />
          <div className="h-4 w-20 rounded bg-bg-deep" />
          <div className="h-3 w-24 rounded bg-bg-deep" />
        </div>
        <div className="h-10 w-10 shrink-0 rounded-full bg-bg-deep" />
      </div>
      <div className="flex justify-around border-t border-border-subtle px-4 py-3">
        <div className="h-8 w-16 rounded bg-bg-deep" />
        <div className="h-8 w-16 rounded bg-bg-deep" />
        <div className="h-8 w-16 rounded bg-bg-deep" />
      </div>
    </div>
  )
}

export default function CharacterGrid({
  characters,
  progressMap,
  isLoading,
  onSync,
  onSelect,
}: {
  characters: Character[]
  progressMap: Map<string, CharacterProgress>
  isLoading: boolean
  onSync: () => void
  onSelect: (character: Character) => void
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg text-text-secondary">No characters yet</p>
        <p className="mt-1 text-sm text-text-dim">
          Sync your account to load your characters from Battle.net
        </p>
        <button
          type="button"
          onClick={onSync}
          className="mt-6 cursor-pointer rounded-xl bg-linear-to-b from-gold to-gold-dark px-5 py-2.5 font-body text-sm font-semibold text-bg-deep transition-all hover:brightness-110 active:brightness-95"
        >
          Sync Now
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((c) => (
        <CharacterCard
          key={c.id}
          character={c}
          progress={progressMap.get(c.id)}
          onClick={() => onSelect(c)}
        />
      ))}
    </div>
  )
}
