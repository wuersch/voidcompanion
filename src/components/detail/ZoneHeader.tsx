import type { CampaignZone } from '../../domain/types'
import type { ZoneDef } from '../../data/zones'
import { completionPercent } from '../../utils/format'
import { ChevronLeft } from '../shared/Icons'
import DrillDownHeader from '../shared/DrillDownHeader'
import ProgressBar from '../shared/ProgressBar'

export default function ZoneHeader({
  zone,
  zoneDef,
  characterName,
  onBack,
}: {
  zone: CampaignZone
  zoneDef: ZoneDef
  characterName: string
  onBack: () => void
}) {
  const percent = completionPercent(zone.completedQuests, zone.totalQuests)

  return (
    <DrillDownHeader image={zoneDef.image}>
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
      >
        <ChevronLeft size={16} />
        <span className="text-sm">Back to {characterName}</span>
      </button>

      <h1 className="font-display text-2xl font-bold text-text-primary sm:text-[32px]">
        {zone.zoneName}
      </h1>

      <p className="text-base text-gold-dark">{zoneDef.achievementName}</p>

      <div className="flex items-center gap-4">
        <span className="font-mono text-[13px] font-semibold text-text-secondary">
          {zone.completedQuests} / {zone.totalQuests} Quests
        </span>
        <div className="w-[300px] max-w-full">
          <ProgressBar percent={percent} fillColor={zoneDef.color} height={10} />
        </div>
      </div>
    </DrillDownHeader>
  )
}
