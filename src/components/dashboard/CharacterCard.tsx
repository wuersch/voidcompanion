import type { Character } from '../../domain/types'
import { CLASS_COLORS } from '../../data/classColors'
import StatBadge from './StatBadge'

function formatRealm(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function CharacterCard({ character }: { character: Character }) {
  const classColor = CLASS_COLORS[character.classId] ?? '#9ca3af'

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated transition-colors hover:border-void/40">
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
        <StatBadge label="Campaign" value="—" />
        <StatBadge label="Pathfinder" value="—" />
        <StatBadge label="Renown" value="—" />
      </div>
    </div>
  )
}
