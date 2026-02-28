import type { Quest } from '../../domain/types'
import { Circle, CircleCheck } from '../shared/Icons'
import WowheadLink from '../shared/WowheadLink'

export default function QuestRow({ quest }: { quest: Quest }) {
  const textClass = quest.factionAlternative
    ? 'text-sm text-text-dim'
    : quest.completed
      ? 'text-sm text-gold-dark hover:text-gold'
      : 'text-sm text-text-secondary hover:text-text-primary'

  return (
    <div className="flex items-center gap-2.5 py-1">
      {quest.completed ? (
        <CircleCheck size={16} className="shrink-0 text-gold" />
      ) : (
        <Circle size={16} className="shrink-0 text-text-dim" />
      )}
      <WowheadLink type="quest" id={quest.questId} className={textClass}>
        {quest.questName}
      </WowheadLink>
      {quest.factionAlternative && (
        <span className="text-xs text-text-dim">(faction alt)</span>
      )}
    </div>
  )
}
