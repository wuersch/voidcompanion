import type {
  CharacterProgress,
  CampaignZone,
  PathfinderProgress,
  FactionRenown,
} from './types'
import type { CharacterAchievementData } from '../ports/api'
import { ZONES } from '../data/zones'
import { PATHFINDER_ACHIEVEMENT_ID, PATHFINDER_CRITERIA } from '../data/pathfinder'
import { MIDNIGHT_FACTIONS } from '../data/factions'

export function assembleProgress(
  achievements: CharacterAchievementData,
  completedQuestIds: number[],
  reputations: FactionRenown[],
): CharacterProgress {
  const completedSet = new Set(completedQuestIds)
  const achievementMap = new Map(
    achievements.achievements.map((a) => [a.id, a.completed]),
  )

  // Map from achievement ID → ordered array of child criteria completion
  const criteriaMap = new Map<number, Array<{ id: number; completed: boolean }>>()
  for (const a of achievements.achievements) {
    if (a.criteria) {
      criteriaMap.set(
        a.id,
        a.criteria.map((cc) => ({ id: cc.id, completed: cc.completed })),
      )
    }
  }

  const campaign: CampaignZone[] = ZONES.map((zone) => {
    const quests = zone.chapters.flatMap((chapter) =>
      chapter.quests.map((q) => ({
        questId: q.questId,
        questName: q.questName,
        completed: completedSet.has(q.questId),
        chapter: chapter.name,
        factionAlternative: q.factionAlternative,
      })),
    )
    return {
      zoneId: zone.zoneId,
      zoneName: zone.zoneName,
      achievementId: zone.achievementId,
      quests,
      completedQuests: quests.filter((q) => q.completed).length,
      totalQuests: quests.length,
    }
  })

  const pathfinder: PathfinderProgress = {
    achievementId: PATHFINDER_ACHIEVEMENT_ID,
    completed: achievementMap.get(PATHFINDER_ACHIEVEMENT_ID) ?? false,
    criteria: PATHFINDER_CRITERIA.map((c) => {
      const parentCompleted = achievementMap.get(c.achievementId) ?? false
      const childCriteria = criteriaMap.get(c.achievementId) ?? []
      return {
        achievementId: c.achievementId,
        name: c.name,
        completed: parentCompleted,
        subCriteria: c.subCriteria.map((sc, i) => ({
          id: sc.id,
          name: sc.name,
          type: sc.type,
          completed: parentCompleted || (childCriteria[i]?.completed ?? false),
        })),
      }
    }),
  }

  const renown = reputations.filter((r) =>
    MIDNIGHT_FACTIONS.has(r.factionId),
  )

  return { campaign, pathfinder, renown }
}
