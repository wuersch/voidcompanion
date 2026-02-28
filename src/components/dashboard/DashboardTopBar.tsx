import logoImage from '../../../assets/wow-midnight-logo.png'
import { relativeTime } from '../../utils/format'

function SyncSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-gold"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

export default function DashboardTopBar({
  lastSync,
  isSyncing,
  onSync,
  onLogout,
}: {
  lastSync: Date | null
  isSyncing: boolean
  onSync: () => void
  onLogout: () => void
}) {
  return (
    <header className="flex items-center gap-4 border-b border-border-subtle bg-bg-surface/80 px-6 py-3 backdrop-blur-sm">
      {/* Left: logo + title */}
      <img
        src={logoImage}
        alt="Midnight"
        className="h-8 w-auto"
      />
      <span className="hidden font-display text-sm font-semibold tracking-wider text-gold-dark sm:inline">
        LEVELING COMPANION
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sync info */}
      {lastSync && (
        <span className="text-xs text-text-dim">
          Synced {relativeTime(lastSync)}
        </span>
      )}

      {/* Sync button */}
      <button
        type="button"
        onClick={onSync}
        disabled={isSyncing}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-gold/30 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSyncing ? <SyncSpinner /> : null}
        {isSyncing ? 'Syncing...' : 'Sync'}
      </button>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="cursor-pointer rounded-lg border border-border-subtle bg-bg-elevated px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-crimson/30 hover:text-crimson"
      >
        Logout
      </button>
    </header>
  )
}
