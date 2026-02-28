import type { Quest } from '../../domain/types'
import { CircleCheck, Loader, Circle } from '../shared/Icons'
import QuestRow from './QuestRow'

type ChapterStatus = 'complete' | 'in-progress' | 'locked'

function getStatus(quests: Quest[]): ChapterStatus {
  if (quests.length === 0) return 'locked'
  const completed = quests.filter((q) => q.completed).length
  if (completed === quests.length) return 'complete'
  if (completed > 0) return 'in-progress'
  return 'locked'
}

export default function ChapterGroup({
  name,
  quests,
  zoneColor,
}: {
  name: string
  quests: Quest[]
  zoneColor: string
}) {
  const status = getStatus(quests)
  const completed = quests.filter((q) => q.completed).length

  const borderColor =
    status === 'locked' ? 'var(--color-border-subtle)' : zoneColor

  const countColor =
    status === 'complete'
      ? 'text-gold'
      : status === 'in-progress'
        ? 'text-void-light'
        : 'text-text-dim'

  return (
    <div
      className="border-l-[3px] pl-5"
      style={{ borderColor }}
    >
      {/* Chapter header */}
      <div className="flex items-center justify-between py-2">
        <h3
          className={`font-display text-base font-semibold ${
            status === 'locked' ? 'text-text-dim' : 'text-text-primary'
          }`}
        >
          {name}
        </h3>
        <div className={`flex items-center gap-1.5 ${countColor}`}>
          {status === 'complete' ? (
            <CircleCheck size={16} />
          ) : status === 'in-progress' ? (
            <Loader size={16} />
          ) : (
            <Circle size={16} />
          )}
          <span className="font-mono text-xs font-semibold">
            {completed}/{quests.length}
          </span>
        </div>
      </div>

      {/* Quest list */}
      <div className="space-y-0.5 pb-2">
        {quests.map((q) => (
          <QuestRow key={q.questId} quest={q} />
        ))}
      </div>
    </div>
  )
}
