import { ArrowLeft } from './shared/Icons'

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-dvh bg-bg-deep px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex cursor-pointer items-center gap-2 bg-transparent text-sm text-text-secondary transition-colors hover:text-gold"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="font-display text-2xl font-semibold tracking-wide text-gold">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary">
          <section>
            <h2 className="mb-2 font-display text-base font-semibold text-text-primary">
              Your data stays in your browser
            </h2>
            <p>
              All character and progress data is stored locally in your browser
              using IndexedDB. Nothing is sent to any server we operate — there
              is no backend.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold text-text-primary">
              No tracking, no cookies, no ads
            </h2>
            <p>
              This app does not use analytics, tracking pixels, advertising
              networks, or cookies of any kind.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold text-text-primary">
              Battle.net authentication
            </h2>
            <p>
              When you log in, you authenticate directly with Blizzard's
              Battle.net OAuth service. The resulting access token is stored in
              your browser's sessionStorage and is automatically cleared when you
              close the tab.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold text-text-primary">
              API calls go directly to Blizzard
            </h2>
            <p>
              All World of Warcraft API requests are made directly from your
              browser to Blizzard's servers. We never proxy, intercept, or store
              these requests.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-base font-semibold text-text-primary">
              Open source
            </h2>
            <p>
              This app is open-source under the MIT license. You can inspect
              every line of code to verify these claims for yourself.
            </p>
          </section>
        </div>

        <p className="mt-12 text-xs text-text-dim">
          A fan-made companion app. Not affiliated with Blizzard Entertainment.
        </p>
      </div>
    </div>
  )
}
