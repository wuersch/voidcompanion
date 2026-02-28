import type { FactionRenown } from '../../domain/types'
import ProgressBar from '../shared/ProgressBar'

// Map specific faction names to zone accent colors; default to gold
const FACTION_COLORS: Record<string, string> = {
  'Sunwell Reclamation': 'var(--color-gold)',
  'Amani Coalition': 'var(--color-zone-zulaman)',
  'Haranir Dreamweavers': 'var(--color-zone-harandar)',
  'Army of the Light': 'var(--color-void-light)',
}

export default function RenownRow({ faction }: { faction: FactionRenown }) {
  const percent =
    faction.maxLevel > 0
      ? Math.round((faction.currentLevel / faction.maxLevel) * 100)
      : 0

  const color = FACTION_COLORS[faction.factionName] ?? 'var(--color-gold)'

  return (
    <div className="flex items-center gap-4">
      <span className="w-[200px] shrink-0 truncate text-sm font-medium text-text-primary max-sm:w-[140px]">
        {faction.factionName}
      </span>
      <div className="flex-1">
        <ProgressBar percent={percent} fillColor={color} height={10} />
      </div>
      <span className="shrink-0 font-mono text-[13px] font-semibold text-text-secondary">
        {faction.currentLevel} / {faction.maxLevel}
      </span>
    </div>
  )
}
