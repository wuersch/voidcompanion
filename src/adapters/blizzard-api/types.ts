/** Raw response shapes from the Blizzard WoW Profile API. */

export type RawAccountProfile = {
  wow_accounts: Array<{
    characters: Array<{
      character: { href: string }
      name: string
      id: number
      realm: { slug: string; name: string }
      playable_class: { id: number; name: string }
      playable_race: { id: number; name: string }
      level: number
    }>
  }>
}

export type RawCharacterMedia = {
  assets: Array<{
    key: string
    value: string
  }>
}

export type RawAchievements = {
  achievements: Array<{
    id: number
    achievement: { id: number; name: string }
    completed_timestamp?: number
  }>
}

export type RawCompletedQuests = {
  quests: Array<{
    id: number
    name: string
  }>
}

export type RawReputations = {
  reputations: Array<{
    faction: { id: number; name: string }
    standing: { renown_level?: number; max_renown_level?: number }
  }>
}
