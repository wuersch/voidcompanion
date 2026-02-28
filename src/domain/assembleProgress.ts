import type {
  CharacterProgress,
  CampaignZone,
  PathfinderProgress,
  FactionRenown,
} from './types'
import type { CharacterAchievementData } from '../ports/api'
import { ZONES } from '../data/zones'
import { PATHFINDER_ACHIEVEMENT_ID, PATHFINDER_CRITERIA } from '../data/pathfinder'

export function assembleProgress(
  achievements: CharacterAchievementData,
  completedQuestIds: number[],
  reputations: FactionRenown[],
): CharacterProgress {
  const completedSet = new Set(completedQuestIds)
  const achievementMap = new Map(
    achievements.achievements.map((a) => [a.id, a.completed]),
  )

  const campaign: CampaignZone[] = ZONES.map((zone) => {
    const quests = zone.chapters.flatMap((chapter) =>
      chapter.quests.map((q) => ({
        questId: q.questId,
        questName: q.questName,
        completed: completedSet.has(q.questId),
        chapter: chapter.name,
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
    criteria: PATHFINDER_CRITERIA.map((c) => ({
      achievementId: c.achievementId,
      name: c.name,
      completed: achievementMap.get(c.achievementId) ?? false,
    })),
  }

  return { campaign, pathfinder, renown: reputations }
}
