import type { Character, CharacterProgress } from '../../domain/types'
import { CLASS_COLORS } from '../../data/classColors'
import StatBadge from './StatBadge'

function formatRealm(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function campaignSummary(progress: CharacterProgress): string {
  const done = progress.campaign.filter(
    (z) => z.completedQuests === z.totalQuests,
  ).length
  return `${done}/${progress.campaign.length}`
}

function pathfinderSummary(progress: CharacterProgress): string {
  const done = progress.pathfinder.criteria.filter((c) => c.completed).length
  return `${done}/${progress.pathfinder.criteria.length}`
}

function renownSummary(progress: CharacterProgress): string {
  if (progress.renown.length === 0) return '—'
  const max = progress.renown.filter((f) => f.currentLevel >= f.maxLevel).length
  return `${max}/${progress.renown.length}`
}

export default function CharacterCard({
  character,
  progress,
  onClick,
}: {
  character: Character
  progress?: CharacterProgress
  onClick: () => void
}) {
  const classColor = CLASS_COLORS[character.classId] ?? '#9ca3af'

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated text-left transition-colors hover:border-void/40"
    >
      {/* Card top: avatar + info + level */}
      <div className="flex items-center gap-4 p-4">
        {/* Avatar */}
        {character.avatarUrl ? (
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-bg-deep"
            style={{ backgroundColor: classColor }}
          >
            {character.name.charAt(0)}
          </div>
        )}

        {/* Name + realm + class */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-semibold text-text-primary">
            {character.name}
          </h3>
          <p className="truncate text-sm text-text-secondary">
            {formatRealm(character.realm)}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: classColor }}
            />
            <span className="text-sm text-text-dim">{character.className}</span>
          </div>
        </div>

        {/* Level badge */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold-dark">
          <span className="font-display text-sm font-bold text-gold">{character.level}</span>
        </div>
      </div>

      {/* Stat badges */}
      <div className="flex justify-around border-t border-border-subtle px-4 py-3">
        <StatBadge label="Campaign" value={progress ? campaignSummary(progress) : '—'} />
        <StatBadge label="Pathfinder" value={progress ? pathfinderSummary(progress) : '—'} />
        <StatBadge label="Renown" value={progress ? renownSummary(progress) : '—'} />
      </div>
    </button>
  )
}
