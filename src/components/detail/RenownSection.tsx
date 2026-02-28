import type { FactionRenown } from '../../domain/types'
import SectionHeader from '../shared/SectionHeader'
import RenownRow from './RenownRow'

export default function RenownSection({
  renown,
}: {
  renown: FactionRenown[]
}) {
  if (renown.length === 0) return null

  return (
    <section className="space-y-5">
      <SectionHeader label="FACTION RENOWN" />
      <div className="space-y-4">
        {renown.map((f) => (
          <RenownRow key={f.factionId} faction={f} />
        ))}
      </div>
    </section>
  )
}
