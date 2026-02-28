import type { PathfinderProgress } from '../../domain/types'
import SectionHeader from '../shared/SectionHeader'
import AchievementCriterion from './AchievementCriterion'

export default function PathfinderSection({
  pathfinder,
  onSelectCriterion,
}: {
  pathfinder: PathfinderProgress
  onSelectCriterion: (achievementId: number) => void
}) {
  return (
    <section className="space-y-5">
      <SectionHeader label="MIDNIGHT PATHFINDER" />
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pathfinder.criteria.map((c) => (
          <AchievementCriterion
            key={c.achievementId}
            criterion={c}
            onSelect={() => onSelectCriterion(c.achievementId)}
          />
        ))}
      </div>
    </section>
  )
}
