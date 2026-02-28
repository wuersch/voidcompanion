function formatRealm(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export type SortKey = 'name' | 'level' | 'realm'

export default function DashboardFilterBar({
  realms,
  activeRealm,
  onRealmChange,
  sortKey,
  onSortChange,
}: {
  realms: string[]
  activeRealm: string | null
  onRealmChange: (realm: string | null) => void
  sortKey: SortKey
  onSortChange: (key: SortKey) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Realm pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onRealmChange(null)}
          className={`cursor-pointer rounded-full px-3 py-1 text-sm transition-colors ${
            activeRealm === null
              ? 'bg-void text-text-primary'
              : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
          }`}
        >
          All Characters
        </button>
        {realms.map((realm) => (
          <button
            key={realm}
            type="button"
            onClick={() => onRealmChange(realm)}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm transition-colors ${
              activeRealm === realm
                ? 'bg-void text-text-primary'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
            }`}
          >
            {formatRealm(realm)}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sort dropdown */}
      <select
        value={sortKey}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        className="cursor-pointer rounded-lg border border-border-subtle bg-bg-elevated px-3 py-1.5 text-sm text-text-secondary outline-none focus:border-void"
      >
        <option value="name">Sort: Name</option>
        <option value="level">Sort: Level</option>
        <option value="realm">Sort: Realm</option>
      </select>
    </div>
  )
}
