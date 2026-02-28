import { useEffect } from 'react'
import type { Character, CharacterProgress } from '../../domain/types'
import { ZONES } from '../../data/zones'
import { refreshWowheadTooltips } from '../../adapters/wowhead/tooltips'
import ZoneHeader from './ZoneHeader'
import ChapterGroup from './ChapterGroup'

export default function ZoneDrillDown({
  character,
  zoneId,
  progress,
  onBack,
}: {
  character: Character
  zoneId: string
  progress: CharacterProgress
  onBack: () => void
}) {
  const zoneDef = ZONES.find((z) => z.zoneId === zoneId)
  const zone = progress.campaign.find((z) => z.zoneId === zoneId)

  // Refresh Wowhead tooltips when quest links render
  useEffect(() => {
    if (zone) refreshWowheadTooltips()
  }, [zone])

  if (!zoneDef || !zone) return null

  // Group quests by chapter using the zone definition
  const chapters = zoneDef.chapters.map((chapterDef) => {
    const chapterQuestIds = new Set(chapterDef.quests.map((q) => q.questId))
    const quests = zone.quests.filter((q) => chapterQuestIds.has(q.questId))
    return { name: chapterDef.name, quests }
  })

  return (
    <div className="min-h-dvh bg-bg-deep">
      <ZoneHeader
        zone={zone}
        zoneDef={zoneDef}
        characterName={character.name}
        onBack={onBack}
      />

      <div className="space-y-6 px-6 py-8 sm:px-10">
        {chapters.map((chapter) => (
          <ChapterGroup
            key={chapter.name}
            name={chapter.name}
            quests={chapter.quests}
            zoneColor={zoneDef.color}
          />
        ))}
      </div>
    </div>
  )
}
