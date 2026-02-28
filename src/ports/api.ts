import type { Character, FactionRenown } from '../domain/types'

/** Raw achievement data from the Blizzard API, before domain transformation. */
export type CharacterAchievementData = {
  achievements: Array<{
    id: number
    completed: boolean
    completedTimestamp: number | null
    criteria?: Array<{ id: number; completed: boolean }>
  }>
}

export interface ApiPort {
  getAccountCharacters(token: string): Promise<Character[]>
  getCharacterMedia(
    token: string,
    realm: string,
    name: string,
  ): Promise<{ avatarUrl: string }>
  getCharacterAchievements(
    token: string,
    realm: string,
    name: string,
  ): Promise<CharacterAchievementData>
  getCompletedQuests(
    token: string,
    realm: string,
    name: string,
  ): Promise<number[]>
  getReputations(
    token: string,
    realm: string,
    name: string,
  ): Promise<FactionRenown[]>
}
