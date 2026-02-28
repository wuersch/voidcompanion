import type { PathfinderCriterion } from '../../domain/types'
import { Circle, CircleCheck } from '../shared/Icons'
import WowheadLink from '../shared/WowheadLink'

export default function AchievementCriterion({
  criterion,
}: {
  criterion: PathfinderCriterion
}) {
  return (
    <div className="flex items-center gap-2.5">
      {criterion.completed ? (
        <CircleCheck size={18} className="shrink-0 text-gold" />
      ) : (
        <Circle size={18} className="shrink-0 text-text-dim" />
      )}
      <WowheadLink
        type="achievement"
        id={criterion.achievementId}
        className={
          criterion.completed
            ? 'text-sm text-text-primary hover:text-gold'
            : 'text-sm text-text-secondary hover:text-text-primary'
        }
      >
        {criterion.name}
      </WowheadLink>
    </div>
  )
}
