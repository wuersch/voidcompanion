import type { CampaignZone } from '../../domain/types'
import { ZONES } from '../../data/zones'
import SectionHeader from '../shared/SectionHeader'
import ZoneRow from './ZoneRow'

export default function CampaignSection({
  campaign,
  onSelectZone,
}: {
  campaign: CampaignZone[]
  onSelectZone: (zoneId: string) => void
}) {
  return (
    <section className="space-y-5">
      <SectionHeader label="CAMPAIGN PROGRESS" />
      <div className="space-y-3">
        {campaign.map((zone) => {
          const zoneDef = ZONES.find((z) => z.zoneId === zone.zoneId)
          if (!zoneDef) return null
          return (
            <ZoneRow
              key={zone.zoneId}
              zone={zone}
              zoneDef={zoneDef}
              onSelect={() => onSelectZone(zone.zoneId)}
            />
          )
        })}
      </div>
    </section>
  )
}
