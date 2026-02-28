import type { Character, FactionRenown } from '../../domain/types'
import type { CharacterAchievementData } from '../../ports/api'
import type {
  RawAccountProfile,
  RawCharacterMedia,
  RawAchievements,
  RawCompletedQuests,
  RawReputations,
} from './types'

const MIN_LEVEL = 10

export function transformAccountCharacters(raw: RawAccountProfile): Character[] {
  const now = new Date()
  return raw.wow_accounts.flatMap((account) =>
    account.characters
      .filter((c) => c.level >= MIN_LEVEL)
      .map((c) => ({
        id: `${c.realm.slug}-${c.name.toLowerCase()}`,
        name: c.name,
        realm: c.realm.slug,
        level: c.level,
        classId: c.playable_class.id,
        className: c.playable_class.name,
        raceId: c.playable_race.id,
        raceName: c.playable_race.name,
        specName: '',
        avatarUrl: '',
        lastSynced: now,
      })),
  )
}

export function extractAvatarUrl(raw: RawCharacterMedia): string {
  return raw.assets?.find((a) => a.key === 'avatar')?.value ?? ''
}

export function transformAchievements(raw: RawAchievements): CharacterAchievementData {
  return {
    achievements: raw.achievements.map((a) => ({
      id: a.achievement.id,
      completed: a.completed_timestamp != null,
      completedTimestamp: a.completed_timestamp ?? null,
    })),
  }
}

export function transformCompletedQuests(raw: RawCompletedQuests): number[] {
  return raw.quests.map((q) => q.id)
}

export function transformReputations(raw: RawReputations): FactionRenown[] {
  return raw.reputations
    .filter((r) => r.standing.renown_level != null)
    .map((r) => ({
      factionId: r.faction.id,
      factionName: r.faction.name,
      currentLevel: r.standing.renown_level!,
      maxLevel: r.standing.max_renown_level ?? r.standing.renown_level!,
    }))
}
