export default function CallbackHandler({ error }: { error: string | null }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg-deep px-6">
      {error ? (
        <>
          <p className="text-lg text-crimson">{error}</p>
          <a
            href="/"
            className="mt-6 text-sm text-text-secondary underline hover:text-text-primary"
          >
            Back to login
          </a>
        </>
      ) : (
        <>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <p className="mt-4 font-display text-sm tracking-widest text-text-secondary">
            Authenticating...
          </p>
        </>
      )}
    </div>
  )
}
