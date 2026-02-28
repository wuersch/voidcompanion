import { useState } from 'react'
import type { PathfinderCriterion } from '../../domain/types'
import { Circle, CircleCheck, ChevronRight, ChevronDown } from '../shared/Icons'
import WowheadLink from '../shared/WowheadLink'

export default function AchievementCriterion({
  criterion,
}: {
  criterion: PathfinderCriterion
}) {
  const [expanded, setExpanded] = useState(false)
  const subs = criterion.subCriteria ?? []
  const hasSubCriteria = subs.length > 0
  const completedCount = subs.filter((sc) => sc.completed).length
  const totalCount = subs.length

  return (
    <div>
      <div
        className={`flex items-center gap-2.5${hasSubCriteria ? ' cursor-pointer' : ''}`}
        onClick={hasSubCriteria ? () => setExpanded((prev) => !prev) : undefined}
      >
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
        {hasSubCriteria && (
          <>
            <span className="shrink-0 rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-text-dim">
              {completedCount}/{totalCount}
            </span>
            {expanded ? (
              <ChevronDown size={14} className="shrink-0 text-text-dim" />
            ) : (
              <ChevronRight size={14} className="shrink-0 text-text-dim" />
            )}
          </>
        )}
      </div>
      {hasSubCriteria && expanded && (
        <div className="ml-[29px] mt-2 space-y-1.5 border-l border-border-subtle pl-3">
          {subs.map((sc) => (
            <div key={sc.id} className="flex items-center gap-2">
              {sc.completed ? (
                <CircleCheck size={14} className="shrink-0 text-gold" />
              ) : (
                <Circle size={14} className="shrink-0 text-text-dim" />
              )}
              <span
                className={`text-xs ${
                  sc.completed ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {sc.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
