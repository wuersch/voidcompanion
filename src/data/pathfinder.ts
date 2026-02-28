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
      { id: 61857, name: 'Explore Harandar', type: 'exploration' },
      { id: 61858, name: 'Explore Silvermoon', type: 'exploration' },
      { id: 61859, name: 'Explore the Voidstorm', type: 'exploration' },
    ],
  },
  {
    achievementId: 41802,
    name: 'Eversong In Reprise',
    subCriteria: [
      { id: 41807, name: 'A Song of Sunrise', type: 'chapter' },
      { id: 41808, name: 'The Scorched Grove', type: 'chapter' },
      { id: 41809, name: 'Echoes of the Sunwell', type: 'chapter' },
    ],
  },
  {
    achievementId: 41803,
    name: "For Zul'Aman!",
    subCriteria: [
      { id: 41810, name: 'Spirits of the Amani', type: 'chapter' },
      { id: 41811, name: 'Wrath of the Loa', type: 'chapter' },
      { id: 41812, name: "Zul'jin's Legacy", type: 'chapter' },
    ],
  },
  {
    achievementId: 41804,
    name: 'One Does Not Simply Walk Into Harandar',
    subCriteria: [
      { id: 41813, name: 'The Haranir Enclaves', type: 'chapter' },
      { id: 41814, name: 'Roots of the Worldtree', type: 'chapter' },
      { id: 41815, name: 'Twilight of the Grove', type: 'chapter' },
    ],
  },
  {
    achievementId: 41805,
    name: "Arator's Journey",
    subCriteria: [
      { id: 41816, name: 'Return to Silvermoon', type: 'chapter' },
      { id: 41817, name: 'The Sunwell Restored', type: 'chapter' },
      { id: 41818, name: "Arator's Resolve", type: 'chapter' },
    ],
  },
  {
    achievementId: 41806,
    name: 'Breaching the Voidstorm',
    subCriteria: [
      { id: 41819, name: 'Into the Maelstrom', type: 'chapter' },
      { id: 41820, name: 'Void Incursion', type: 'chapter' },
      { id: 41821, name: "Xal'atath's Gambit", type: 'chapter' },
    ],
  },
]
