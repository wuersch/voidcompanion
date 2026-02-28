import { useAuth } from '../hooks/useAuth'

export default function AuthenticatedShell() {
  const { logout } = useAuth()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-deep px-6">
      <h1 className="font-display text-2xl text-gold">
        Welcome, Adventurer
      </h1>
      <p className="mt-2 text-text-secondary">
        Character dashboard coming soon.
      </p>
      <button
        type="button"
        onClick={logout}
        className="mt-8 cursor-pointer rounded-lg border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-secondary transition-colors hover:border-gold/30 hover:text-text-primary"
      >
        Logout
      </button>
    </div>
  )
}
