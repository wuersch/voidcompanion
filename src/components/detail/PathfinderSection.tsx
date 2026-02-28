import type { PathfinderProgress, CampaignZone } from '../../domain/types'
import SectionHeader from '../shared/SectionHeader'
import AchievementCriterion from './AchievementCriterion'

export default function PathfinderSection({
  pathfinder,
  campaign,
  onSelectCriterion,
}: {
  pathfinder: PathfinderProgress
  campaign: CampaignZone[]
  onSelectCriterion: (achievementId: number) => void
}) {
  return (
    <section className="space-y-5">
      <SectionHeader label="MIDNIGHT PATHFINDER" />
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pathfinder.criteria.map((c) => {
          const zone = campaign.find((z) => z.achievementId === c.achievementId)
          const questStats = zone
            ? (() => {
                const required = zone.quests.filter((q) => !q.factionAlternative)
                return {
                  completed: required.filter((q) => q.completed).length,
                  total: required.length,
                }
              })()
            : undefined
          return (
            <AchievementCriterion
              key={c.achievementId}
              criterion={c}
              questStats={questStats}
              onSelect={() => onSelectCriterion(c.achievementId)}
            />
          )
        })}
      </div>
    </section>
  )
}
