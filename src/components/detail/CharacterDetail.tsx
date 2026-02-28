import { useEffect } from 'react'
import type { Character, CharacterProgress } from '../../domain/types'
import { useProgress } from '../../hooks/useProgress'
import {
  loadWowheadTooltips,
  refreshWowheadTooltips,
} from '../../adapters/wowhead/tooltips'
import DetailHeader from './DetailHeader'
import CampaignSection from './CampaignSection'
import PathfinderSection from './PathfinderSection'
import RenownSection from './RenownSection'

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-10 px-6 py-8 sm:px-10">
      {/* Section header skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-48 rounded bg-bg-elevated" />
        <div className="h-0.5 w-[60px] bg-bg-elevated" />
      </div>
      {/* Zone row skeletons */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-border-subtle bg-bg-surface p-2.5"
        >
          <div className="hidden h-[50px] w-[80px] rounded-lg bg-bg-elevated sm:block" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-bg-elevated" />
            <div className="h-2 w-full rounded bg-bg-elevated" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CharacterDetail({
  character,
  onBack,
  onSelectZone,
  onSelectPathfinder,
}: {
  character: Character
  onBack: () => void
  onSelectZone: (zoneId: string, progress: CharacterProgress) => void
  onSelectPathfinder: (achievementId: number, progress: CharacterProgress) => void
}) {
  const { progress, isLoading, error } = useProgress(character)

  useEffect(() => {
    loadWowheadTooltips()
  }, [])

  // Refresh Wowhead tooltips when progress data renders
  useEffect(() => {
    if (progress) refreshWowheadTooltips()
  }, [progress])

  return (
    <div className="min-h-dvh bg-bg-deep">
      <DetailHeader character={character} onBack={onBack} />

      {/* Error banner */}
      {error && (
        <div className="mx-6 mt-4 rounded-lg border border-crimson/30 bg-crimson/10 px-4 py-2 text-sm text-crimson sm:mx-10">
          {progress
            ? `Showing cached data. Failed to refresh: ${error}`
            : error}
        </div>
      )}

      {isLoading && !progress ? (
        <DetailSkeleton />
      ) : progress ? (
        <div className="space-y-10 px-6 py-8 sm:px-10">
          <CampaignSection
            campaign={progress.campaign}
            onSelectZone={(zoneId) => onSelectZone(zoneId, progress)}
          />
          <PathfinderSection
            pathfinder={progress.pathfinder}
            onSelectCriterion={(achievementId) => onSelectPathfinder(achievementId, progress)}
          />
          <RenownSection renown={progress.renown} />
        </div>
      ) : null}
    </div>
  )
}
