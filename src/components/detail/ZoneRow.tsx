import type { CampaignZone } from '../../domain/types'
import type { ZoneDef } from '../../data/zones'
import ProgressBar from '../shared/ProgressBar'
import { ChevronRight } from '../shared/Icons'

function chapterProgress(zone: CampaignZone, zoneDef: ZoneDef): string {
  let completed = 0
  for (const chapter of zoneDef.chapters) {
    const chapterQuestIds = new Set(chapter.quests.map((q) => q.questId))
    const chapterQuests = zone.quests.filter((q) => chapterQuestIds.has(q.questId))
    if (chapterQuests.length > 0 && chapterQuests.every((q) => q.completed))
      completed++
  }
  return `Chapter ${completed}/${zoneDef.chapters.length}`
}

export default function ZoneRow({
  zone,
  zoneDef,
  onSelect,
}: {
  zone: CampaignZone
  zoneDef: ZoneDef
  onSelect: () => void
}) {
  const percent =
    zone.totalQuests > 0
      ? Math.round((zone.completedQuests / zone.totalQuests) * 100)
      : 0

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-border-subtle bg-bg-surface p-2.5 pr-4 text-left transition-colors hover:border-white/10"
    >
      {/* Thumbnail */}
      <img
        src={zoneDef.image}
        alt={zone.zoneName}
        className="hidden h-[50px] w-[80px] shrink-0 rounded-lg object-cover sm:block"
      />

      {/* Zone info */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-display text-base font-semibold text-text-primary">
            {zone.zoneName}
          </span>
          <span className="shrink-0 text-[13px] text-text-secondary">
            {chapterProgress(zone, zoneDef)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar
            percent={percent}
            fillColor={zoneDef.color}
          />
          <span className="shrink-0 font-mono text-xs font-semibold text-text-secondary">
            {percent}%
          </span>
        </div>
      </div>

      <ChevronRight className="shrink-0 text-text-dim" size={20} />
    </button>
  )
}
