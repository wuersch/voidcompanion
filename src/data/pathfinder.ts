/** Midnight Pathfinder meta-achievement and its 6 criteria. */

export type PathfinderSubCriterionDef = {
  id: number
  name: string
  type: string
}

export type PathfinderCriterionDef = {
  achievementId: number
  name: string
  subCriteria: PathfinderSubCriterionDef[]
}

export const PATHFINDER_ACHIEVEMENT_ID = 61839

export const PATHFINDER_CRITERIA: PathfinderCriterionDef[] = [
  {
    achievementId: 61854,
    name: 'The Midnight Explorer',
    subCriteria: [
      { id: 61855, name: 'Explore Eversong Woods', type: 'exploration' },
      { id: 61856, name: "Explore Zul'Aman", type: 'exploration' },
      { id: 61520, name: 'Explore Harandar', type: 'exploration' },
      { id: 61857, name: 'Explore Voidstorm', type: 'exploration' },
    ],
  },
  {
    achievementId: 41802,
    name: 'Eversong In Reprise',
    subCriteria: [
      { id: 86745, name: 'Whispers in the Twilight', type: 'questline' },
      { id: 86650, name: 'Ripple Effects', type: 'questline' },
      { id: 86636, name: 'Shadowfall', type: 'questline' },
    ],
  },
  {
    achievementId: 41803,
    name: "For Zul'Aman!",
    subCriteria: [
      { id: 86652, name: 'Dis Was Our Land', type: 'questline' },
      { id: 91958, name: 'Where War Slumbers', type: 'questline' },
      { id: 86666, name: "Path of de Hash'ey", type: 'questline' },
      { id: 91062, name: 'De Amani Never Die', type: 'questline' },
    ],
  },
  {
    achievementId: 41804,
    name: 'One Does Not Simply Walk Into Harandar',
    subCriteria: [
      { id: 86944, name: 'Of Caves and Cradles', type: 'questline' },
      { id: 86898, name: 'Emergence', type: 'questline' },
      { id: 86890, name: 'Call of the Goddess', type: 'questline' },
    ],
  },
  {
    achievementId: 41805,
    name: "Arator's Journey",
    subCriteria: [
      { id: 89338, name: 'The Path of Light', type: 'questline' },
      { id: 86903, name: 'Regrets of the Past', type: 'questline' },
    ],
  },
  {
    achievementId: 41806,
    name: 'Breaching the Voidstorm',
    subCriteria: [
      { id: 86565, name: 'Into the Abyss', type: 'questline' },
      { id: 86522, name: 'Dawn of Reckoning', type: 'questline' },
      { id: 86545, name: "The Night's Veil", type: 'questline' },
    ],
  },
]
