export type Region = 'us' | 'eu' | 'kr' | 'tw'

export type Character = {
  id: string // "{realm}-{name}" slug
  name: string
  realm: string
  level: number
  classId: number
  className: string
  raceId: number
  raceName: string
  specName: string
  avatarUrl: string
  lastSynced: Date
}

export type CampaignZone = {
  zoneId: string
  zoneName: string
  achievementId: number
  quests: Quest[]
  completedQuests: number
  totalQuests: number
}

export type Quest = {
  questId: number
  questName: string
  completed: boolean
  chapter?: string
}

export type PathfinderProgress = {
  achievementId: number
  completed: boolean
  criteria: PathfinderCriterion[]
}

export type PathfinderSubCriterion = {
  id: number
  name: string
  type: string
  completed: boolean
}

export type PathfinderCriterion = {
  achievementId: number
  name: string
  completed: boolean
  subCriteria: PathfinderSubCriterion[]
}

export type FactionRenown = {
  factionId: number
  factionName: string
  currentLevel: number
  maxLevel: number
}

export type CharacterProgress = {
  campaign: CampaignZone[]
  pathfinder: PathfinderProgress
  renown: FactionRenown[]
}

export type SyncState = {
  lastSyncTimestamp: Date | null
  isSyncing: boolean
  error: string | null
}
