import type { PathfinderCriterion } from '../../domain/types'
import { Circle, CircleCheck, ChevronRight } from '../shared/Icons'

export default function AchievementCriterion({
  criterion,
  questStats,
  onSelect,
}: {
  criterion: PathfinderCriterion
  questStats?: { completed: number; total: number }
  onSelect: () => void
}) {
  const subs = criterion.subCriteria ?? []
  const completedCount = subs.filter((sc) => sc.completed).length
  const totalCount = subs.length

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-bg-elevated"
    >
      {criterion.completed ? (
        <CircleCheck size={18} className="shrink-0 text-gold" />
      ) : (
        <Circle size={18} className="shrink-0 text-text-dim" />
      )}
      <span
        className={`flex-1 text-sm ${
          criterion.completed ? 'text-text-primary' : 'text-text-secondary'
        }`}
      >
        {criterion.name}
      </span>
      {(questStats || totalCount > 0) && (
        <span className="shrink-0 rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-text-dim">
          {questStats && !criterion.completed
            ? `${questStats.total > 0 ? Math.round((questStats.completed / questStats.total) * 100) : 0}%`
            : `${completedCount}/${totalCount}`}
        </span>
      )}
      <ChevronRight size={14} className="shrink-0 text-text-dim" />
    </button>
  )
}
