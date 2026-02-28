import type { CampaignZone } from '../../domain/types'
import type { ZoneDef } from '../../data/zones'
import { ChevronLeft } from '../shared/Icons'
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
  const percent =
    zone.totalQuests > 0
      ? Math.round((zone.completedQuests / zone.totalQuests) * 100)
      : 0

  return (
    <header className="relative h-[200px] overflow-hidden">
      {/* Zone key art background */}
      <img
        src={zoneDef.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/[0.73] to-bg-deep/[0.93]" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end gap-2.5 px-6 py-8 sm:px-10">
        {/* Back link */}
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Back to {characterName}</span>
        </button>

        {/* Zone title */}
        <h1 className="font-display text-2xl font-bold text-text-primary sm:text-[32px]">
          {zone.zoneName}
        </h1>

        {/* Achievement name */}
        <p className="text-base text-gold-dark">{zoneDef.achievementName}</p>

        {/* Progress row */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[13px] font-semibold text-text-secondary">
            {zone.completedQuests} / {zone.totalQuests} Quests
          </span>
          <div className="w-[300px] max-w-full">
            <ProgressBar percent={percent} fillColor={zoneDef.color} height={10} />
          </div>
        </div>
      </div>
    </header>
  )
}
