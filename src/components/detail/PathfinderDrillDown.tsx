import { useEffect } from 'react'
import type { Character, CharacterProgress, PathfinderCriterion } from '../../domain/types'
import { PATHFINDER_CRITERIA } from '../../data/pathfinder'
import { ZONES } from '../../data/zones'
import { refreshWowheadTooltips } from '../../adapters/wowhead/tooltips'
import { ChevronLeft, Circle, CircleCheck } from '../shared/Icons'
import ProgressBar from '../shared/ProgressBar'
import WowheadLink from '../shared/WowheadLink'
import ChapterGroup from './ChapterGroup'
import bgImage from '../../../assets/key-art-against-the-void.jpg'

export default function PathfinderDrillDown({
  character,
  achievementId,
  progress,
  onBack,
}: {
  character: Character
  achievementId: number
  progress: CharacterProgress
  onBack: () => void
}) {
  const criterionDef = PATHFINDER_CRITERIA.find((c) => c.achievementId === achievementId)
  const criterion = progress.pathfinder.criteria.find((c) => c.achievementId === achievementId)

  useEffect(() => {
    refreshWowheadTooltips()
  }, [criterion])

  if (!criterionDef || !criterion) return null

  // Try to find matching zone (questline criteria share achievementId with zones)
  const zoneDef = ZONES.find((z) => z.achievementId === achievementId)
  const campaignZone = progress.campaign.find((z) => z.achievementId === achievementId)

  const isQuestline = zoneDef != null && campaignZone != null
  const headerImage = zoneDef?.image ?? bgImage
  const headerColor = zoneDef?.color ?? 'var(--color-void)'

  // Questline criteria: use required quest counts; exploration: use sub-criteria counts
  const requiredQuests = isQuestline ? campaignZone!.quests.filter((q) => !q.factionAlternative) : []
  const completedCount = isQuestline ? requiredQuests.filter((q) => q.completed).length : criterion.subCriteria.filter((sc) => sc.completed).length
  const totalCount = isQuestline ? requiredQuests.length : criterion.subCriteria.length
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const progressLabel = isQuestline ? 'Quests' : 'Criteria'

  return (
    <div className="min-h-dvh bg-bg-deep">
      {/* Header */}
      <header className="relative h-[200px] overflow-hidden">
        <img
          src={headerImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/[0.73] to-bg-deep/[0.93]" />

        <div className="relative flex h-full flex-col justify-end gap-2.5 px-6 py-8 sm:px-10">
          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
          >
            <ChevronLeft size={16} />
            <span className="text-sm">Back to {character.name}</span>
          </button>

          <h1 className="font-display text-2xl font-bold text-text-primary sm:text-[32px]">
            {criterion.name}
          </h1>

          <WowheadLink
            type="achievement"
            id={achievementId}
            className="text-base text-gold-dark hover:text-gold"
          >
            View on Wowhead
          </WowheadLink>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[13px] font-semibold text-text-secondary">
              {completedCount} / {totalCount} {progressLabel}
            </span>
            <div className="w-[300px] max-w-full">
              <ProgressBar percent={percent} fillColor={headerColor} height={10} />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="space-y-6 px-6 py-8 sm:px-10">
        {isQuestline ? (
          <QuestlineCriteria
            criterion={criterion}
            zoneDef={zoneDef}
            campaignZone={campaignZone}
          />
        ) : (
          <ExplorationCriteria criterion={criterion} />
        )}
      </div>
    </div>
  )
}

/** Questline criteria: sub-criteria map to zone chapters with quest lists. */
function QuestlineCriteria({
  criterion,
  zoneDef,
  campaignZone,
}: {
  criterion: PathfinderCriterion
  zoneDef: (typeof ZONES)[number]
  campaignZone: CharacterProgress['campaign'][number]
}) {
  // Match sub-criteria to chapters positionally
  return (
    <>
      {criterion.subCriteria.map((sc, i) => {
        const chapterDef = zoneDef.chapters[i]
        if (!chapterDef) {
          // Fallback: show as simple row if no chapter match
          return (
            <div key={sc.id} className="flex items-center gap-2.5">
              {sc.completed ? (
                <CircleCheck size={18} className="text-gold" />
              ) : (
                <Circle size={18} className="text-text-dim" />
              )}
              <span className={`text-sm ${sc.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                {sc.name}
              </span>
            </div>
          )
        }

        // Get quests for this chapter from the campaign zone progress
        const chapterQuestIds = new Set(chapterDef.quests.map((q) => q.questId))
        const quests = campaignZone.quests.filter((q) => chapterQuestIds.has(q.questId))

        return (
          <ChapterGroup
            key={sc.id}
            name={sc.name}
            quests={quests}
            zoneColor={zoneDef.color}
          />
        )
      })}
    </>
  )
}

/** Exploration criteria: simple list of sub-achievement completion status. */
function ExplorationCriteria({
  criterion,
}: {
  criterion: PathfinderCriterion
}) {
  return (
    <div className="space-y-3">
      {criterion.subCriteria.map((sc) => (
        <div
          key={sc.id}
          className="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-surface px-4 py-3"
        >
          {sc.completed ? (
            <CircleCheck size={20} className="shrink-0 text-gold" />
          ) : (
            <Circle size={20} className="shrink-0 text-text-dim" />
          )}
          <WowheadLink
            type="achievement"
            id={sc.id}
            className={`flex-1 text-sm ${
              sc.completed ? 'text-text-primary hover:text-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {sc.name}
          </WowheadLink>
        </div>
      ))}
    </div>
  )
}
