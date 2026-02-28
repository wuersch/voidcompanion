import type { Character } from '../../domain/types'
import { CLASS_COLORS } from '../../data/classColors'
import { ArrowLeft } from '../shared/Icons'
import bgImage from '../../../assets/key-art-against-the-void.jpg'

function relativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  if (seconds < 60) return rtf.format(-seconds, 'second')
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (hours < 24) return rtf.format(-hours, 'hour')
  const days = Math.round(hours / 24)
  return rtf.format(-days, 'day')
}

export default function DetailHeader({
  character,
  onBack,
}: {
  character: Character
  onBack: () => void
}) {
  const classColor = CLASS_COLORS[character.classId] ?? '#9ca3af'

  return (
    <header className="relative h-[200px] overflow-hidden">
      {/* Background key art */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/80 to-bg-deep/[0.93]" />

      {/* Content */}
      <div className="relative flex h-full items-center gap-6 px-6 py-8 sm:px-10">
        {/* Back arrow */}
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 cursor-pointer text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Avatar */}
        {character.avatarUrl ? (
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="h-24 w-24 shrink-0 rounded-2xl border-2 border-border-glow object-cover"
          />
        ) : (
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-border-glow text-3xl font-bold text-bg-deep"
            style={{ backgroundColor: classColor }}
          >
            {character.name.charAt(0)}
          </div>
        )}

        {/* Hero info */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <h1 className="truncate font-display text-2xl font-bold text-text-primary sm:text-[28px]">
            {character.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-sm font-semibold text-gold">
              Level {character.level}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: classColor }}
            />
            <span className="text-sm text-text-secondary">
              {character.raceName} {character.className}
            </span>
            {character.specName && (
              <span className="text-sm text-text-dim">{character.specName}</span>
            )}
          </div>
          <p className="text-xs text-text-dim">
            Last synced {relativeTime(character.lastSynced)}
          </p>
        </div>
      </div>
    </header>
  )
}
